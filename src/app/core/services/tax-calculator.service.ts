import { Injectable, computed, signal } from '@angular/core';
import {
  STATE_TAX_BRACKETS_2025,
  EMPLOYEE_CONTRIBUTIONS_2025,
  WORK_INCOME_CREDIT_2025,
  YEARLY_SALARY_MULTIPLIER,
  CHURCH_TAX_RATE,
  DEFAULT_MUNICIPAL_TAX_RATE,
  getPensionRate,
  AgeRange,
} from '../data/tax-config';
import {
  CalculationResult,
  SalaryInput,
  TaxBreakdown,
  UserOptions,
} from '../models/calculation.interface';

/**
 * Service for calculating net salary from gross salary using Finnish tax rules.
 *
 * Implements true progressive state taxation and calculates all mandatory
 * employee contributions for 2025.
 *
 * Uses Angular Signals for reactive state management:
 * - `salaryInput` signal holds the current gross salary and bonus
 * - `userOptions` signal holds age range, municipality, and church membership
 * - `result` computed signal automatically recalculates when inputs change
 *
 * Example usage:
 * ```typescript
 * taxCalculator.updateSalary(3000, 0);
 * taxCalculator.updateUserOptions({ ageRange: '17-52', municipalityRate: 7.5, churchMember: false });
 * const result = taxCalculator.result();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class TaxCalculatorService {
  /**
   * Signal holding the current salary input values.
   */
  private salaryInput = signal<SalaryInput>({
    grossMonthlySalary: 0,
    yearlyBonus: 0,
  });

  /**
   * Signal holding user options for calculation.
   */
  readonly userOptions = signal<UserOptions>({
    ageRange: '17-52',
    municipalityRate: DEFAULT_MUNICIPAL_TAX_RATE,
    churchMember: false,
  });

  /**
   * Computed signal that automatically calculates the result
   * whenever salaryInput or userOptions change.
   *
   * Returns null if no valid salary is set.
   */
  readonly result = computed<CalculationResult | null>(() => {
    const input = this.salaryInput();
    const options = this.userOptions();
    if (input.grossMonthlySalary <= 0) {
      return null;
    }
    return this.calculate(input, options);
  });

  /**
   * Updates the salary input values and triggers recalculation.
   *
   * @param grossMonthlySalary - Monthly gross salary in EUR
   * @param yearlyBonus - Yearly bonus in EUR (default: 0)
   */
  updateSalary(grossMonthlySalary: number, yearlyBonus: number = 0): void {
    this.salaryInput.set({
      grossMonthlySalary,
      yearlyBonus,
    });
  }

  /**
   * Updates user options and triggers recalculation.
   */
  updateUserOptions(options: Partial<UserOptions>): void {
    this.userOptions.update((current) => ({
      ...current,
      ...options,
    }));
  }

  /**
   * Resets the calculator to initial state.
   */
  reset(): void {
    this.salaryInput.set({
      grossMonthlySalary: 0,
      yearlyBonus: 0,
    });
  }

  /**
   * Get current user options (for saving).
   */
  getCurrentUserOptions(): UserOptions {
    return this.userOptions();
  }

  /**
   * Calculates net salary with full breakdown.
   */
  private calculate(input: SalaryInput, options: UserOptions): CalculationResult {
    // Calculate yearly income from monthly salary (with holiday pay multiplier)
    // Holiday pay (lomaraha) only applies to regular salary, not bonuses
    const yearlyFromSalary = input.grossMonthlySalary * YEARLY_SALARY_MULTIPLIER;

    // Total yearly income = salary with holiday pay + bonus
    const yearlyIncome = yearlyFromSalary + input.yearlyBonus;

    // For display purposes, calculate average monthly gross
    const monthlyWithBonus = yearlyIncome / 12;

    // Calculate each component
    const stateTaxYearly = this.calculateStateTax(yearlyIncome);
    const municipalTaxYearly = yearlyIncome * (options.municipalityRate / 100);
    const churchTaxYearly = options.churchMember
      ? yearlyIncome * (CHURCH_TAX_RATE / 100)
      : 0;

    // Employee contributions
    const pensionRate = getPensionRate(options.ageRange);
    const pensionYearly = yearlyIncome * (pensionRate / 100);
    const unemploymentYearly =
      yearlyIncome * (EMPLOYEE_CONTRIBUTIONS_2025.unemployment / 100);

    // Health insurance (daily allowance only applies above threshold)
    const healthMedicalYearly =
      yearlyIncome * (EMPLOYEE_CONTRIBUTIONS_2025.healthMedical / 100);
    const healthDailyAllowanceYearly =
      yearlyIncome >= EMPLOYEE_CONTRIBUTIONS_2025.healthDailyAllowanceThreshold
        ? yearlyIncome * (EMPLOYEE_CONTRIBUTIONS_2025.healthDailyAllowance / 100)
        : 0;
    const healthInsuranceYearly = healthMedicalYearly + healthDailyAllowanceYearly;

    // Calculate work income credit
    const workIncomeCreditYearly = this.calculateWorkIncomeCredit(yearlyIncome);

    // Total gross deductions (before credit)
    const grossDeductionsYearly =
      stateTaxYearly +
      municipalTaxYearly +
      churchTaxYearly +
      pensionYearly +
      unemploymentYearly +
      healthInsuranceYearly;

    // Total deductions after work income credit
    // The credit reduces state and municipal taxes
    const totalDeductionsYearly = Math.max(
      0,
      grossDeductionsYearly - workIncomeCreditYearly
    );

    // Convert to monthly amounts
    const breakdown: TaxBreakdown = {
      stateTax: stateTaxYearly / 12,
      municipalTax: municipalTaxYearly / 12,
      churchTax: churchTaxYearly / 12,
      pensionContribution: pensionYearly / 12,
      unemploymentContribution: unemploymentYearly / 12,
      healthInsurance: healthInsuranceYearly / 12,
      workIncomeCredit: workIncomeCreditYearly / 12,
      grossDeductions: grossDeductionsYearly / 12,
      totalDeductions: totalDeductionsYearly / 12,
    };

    // Calculate net values
    const netYearlySalary = yearlyIncome - totalDeductionsYearly;
    const netMonthlySalary = netYearlySalary / 12;
    const effectiveTaxRate = (totalDeductionsYearly / yearlyIncome) * 100;

    return {
      grossMonthly: input.grossMonthlySalary,
      yearlyBonus: input.yearlyBonus,
      grossYearly: yearlyIncome,
      breakdown,
      effectiveTaxRate,
      monthlyTaxPaid: breakdown.totalDeductions,
      netMonthlySalary,
      netYearlySalary,
    };
  }

  /**
   * Calculates progressive state income tax.
   *
   * Uses the bracket system where tax is:
   * baseTax + (income - threshold) * marginalRate
   *
   * @param yearlyIncome - Total yearly taxable income
   * @returns Yearly state tax amount
   */
  private calculateStateTax(yearlyIncome: number): number {
    if (yearlyIncome <= 0) {
      return 0;
    }

    // Find the applicable bracket (highest threshold that income exceeds)
    let applicableBracket = STATE_TAX_BRACKETS_2025[0];
    for (const bracket of STATE_TAX_BRACKETS_2025) {
      if (yearlyIncome > bracket.threshold) {
        applicableBracket = bracket;
      } else {
        break;
      }
    }

    // Calculate tax: baseTax + marginal tax on excess
    const excessIncome = yearlyIncome - applicableBracket.threshold;
    const marginalTax = excessIncome * (applicableBracket.rate / 100);

    return applicableBracket.baseTax + marginalTax;
  }

  /**
   * Calculates the work income credit (työtulovähennys).
   *
   * The credit reduces state and municipal taxes and phases out at higher incomes.
   *
   * @param yearlyIncome - Total yearly earned income
   * @returns Credit amount in EUR
   */
  private calculateWorkIncomeCredit(yearlyIncome: number): number {
    const params = WORK_INCOME_CREDIT_2025;

    // Start with max credit
    let credit = params.maxCredit;

    // Apply reduction based on income
    if (yearlyIncome > params.reductionThreshold2) {
      // Reduce at higher rate above threshold2
      const reduction1 =
        (params.reductionThreshold2 - params.reductionThreshold1) *
        (params.reductionRate1 / 100);
      const reduction2 =
        (yearlyIncome - params.reductionThreshold2) * (params.reductionRate2 / 100);
      credit = credit - reduction1 - reduction2;
    } else if (yearlyIncome > params.reductionThreshold1) {
      // Reduce at lower rate between thresholds
      const reduction =
        (yearlyIncome - params.reductionThreshold1) * (params.reductionRate1 / 100);
      credit = credit - reduction;
    }

    // Credit cannot be negative
    return Math.max(0, credit);
  }
}
