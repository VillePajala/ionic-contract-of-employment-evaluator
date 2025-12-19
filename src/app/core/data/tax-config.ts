/**
 * Finnish Tax Configuration for 2025
 *
 * Sources:
 * - State tax: https://taxsummaries.pwc.com/finland/individual/taxes-on-personal-income
 * - Pension (TyEL): https://www.etk.fi/en/finnish-pension-system/financing-and-investments/pension-contributions/
 * - Unemployment: https://www.employmentfund.fi/Unemploymentinsurancecontribution/
 * - Health insurance: https://www.vero.fi/en/individuals/tax-cards-and-tax-returns/tax_card/tax-card-for-2025/
 */

// ============================================================================
// STATE INCOME TAX (Progressive Brackets)
// ============================================================================

export interface StateTaxBracket {
  /** Lower threshold of this bracket (inclusive) */
  threshold: number;
  /** Base tax amount at this threshold */
  baseTax: number;
  /** Marginal tax rate on income above threshold (percentage) */
  rate: number;
}

/**
 * Finnish state income tax brackets for 2025.
 * Tax is calculated as: baseTax + (income - threshold) * (rate / 100)
 */
export const STATE_TAX_BRACKETS_2025: StateTaxBracket[] = [
  { threshold: 0, baseTax: 0, rate: 12.64 },
  { threshold: 21200, baseTax: 2680, rate: 19.00 },
  { threshold: 31500, baseTax: 4637, rate: 30.25 },
  { threshold: 52100, baseTax: 10868, rate: 34.00 },
  { threshold: 88200, baseTax: 23142, rate: 41.75 },
  { threshold: 150000, baseTax: 49944, rate: 44.25 },
];

// ============================================================================
// EMPLOYEE CONTRIBUTIONS
// ============================================================================

export interface EmployeeContributions {
  /** Pension contribution for ages 17-52 (percentage) */
  pensionUnder53: number;
  /** Pension contribution for ages 53-62 (percentage) */
  pension53to62: number;
  /** Pension contribution for ages 63+ (percentage) */
  pensionOver62: number;
  /** Unemployment insurance contribution (percentage) */
  unemployment: number;
  /** Health insurance daily allowance contribution (percentage) */
  healthDailyAllowance: number;
  /** Health insurance medical care contribution (percentage) */
  healthMedical: number;
  /** Minimum yearly income for daily allowance contribution */
  healthDailyAllowanceThreshold: number;
}

/**
 * Employee contribution rates for 2025.
 */
export const EMPLOYEE_CONTRIBUTIONS_2025: EmployeeContributions = {
  pensionUnder53: 7.15,
  pension53to62: 8.65,
  pensionOver62: 7.15,
  unemployment: 0.59,
  healthDailyAllowance: 1.01,
  healthMedical: 0.51,
  healthDailyAllowanceThreshold: 16862,
};

// ============================================================================
// WORK INCOME CREDIT (Työtulovähennys)
// ============================================================================

export interface WorkIncomeCredit {
  /** Maximum credit amount in EUR */
  maxCredit: number;
  /** Maximum credit for age 65+ in EUR */
  maxCreditOver65: number;
  /** Income threshold where reduction begins */
  reductionThreshold1: number;
  /** Second income threshold for faster reduction */
  reductionThreshold2: number;
  /** Reduction rate below threshold2 (percentage) */
  reductionRate1: number;
  /** Reduction rate above threshold2 (percentage) */
  reductionRate2: number;
  /** Extra credit per child under 18 */
  childBonus: number;
  /** Extra credit per child for single parents */
  singleParentChildBonus: number;
}

/**
 * Work income credit parameters for 2025.
 * The credit reduces state and municipal taxes.
 */
export const WORK_INCOME_CREDIT_2025: WorkIncomeCredit = {
  maxCredit: 3225,
  maxCreditOver65: 4425,
  reductionThreshold1: 24250,
  reductionThreshold2: 42550,
  reductionRate1: 2.22,
  reductionRate2: 3.44,
  childBonus: 50,
  singleParentChildBonus: 100,
};

// ============================================================================
// MUNICIPALITIES
// ============================================================================

export interface Municipality {
  /** Municipality name */
  name: string;
  /** Municipal tax rate (percentage) */
  rate: number;
}

/**
 * Major Finnish municipalities with their 2025 tax rates.
 * Sorted alphabetically.
 */
export const MUNICIPALITIES_2025: Municipality[] = [
  { name: 'Espoo', rate: 5.36 },
  { name: 'Helsinki', rate: 5.30 },
  { name: 'Hämeenlinna', rate: 8.10 },
  { name: 'Joensuu', rate: 8.49 },
  { name: 'Jyväskylä', rate: 8.00 },
  { name: 'Kouvola', rate: 8.75 },
  { name: 'Kuopio', rate: 7.75 },
  { name: 'Lahti', rate: 8.25 },
  { name: 'Lappeenranta', rate: 7.75 },
  { name: 'Oulu', rate: 7.50 },
  { name: 'Pori', rate: 8.50 },
  { name: 'Rovaniemi', rate: 7.50 },
  { name: 'Seinäjoki', rate: 7.75 },
  { name: 'Tampere', rate: 7.25 },
  { name: 'Turku', rate: 7.50 },
  { name: 'Vaasa', rate: 7.00 },
  { name: 'Vantaa', rate: 5.65 },
];

/** Default municipal tax rate (average) */
export const DEFAULT_MUNICIPAL_TAX_RATE = 7.50;

// ============================================================================
// CHURCH TAX
// ============================================================================

/** Average church tax rate used when church membership is enabled */
export const CHURCH_TAX_RATE = 1.50;

// ============================================================================
// OTHER CONSTANTS
// ============================================================================

/**
 * Multiplier for converting monthly salary to yearly income.
 * Accounts for Finnish holiday pay (lomaraha = ~50% of one month).
 * 12 months + 0.5 month holiday bonus = 12.5
 */
export const YEARLY_SALARY_MULTIPLIER = 12.5;

/**
 * Age range options for pension contribution calculation.
 */
export type AgeRange = '17-52' | '53-62' | '63+';

/**
 * Get pension contribution rate based on age range.
 */
export function getPensionRate(ageRange: AgeRange): number {
  switch (ageRange) {
    case '17-52':
      return EMPLOYEE_CONTRIBUTIONS_2025.pensionUnder53;
    case '53-62':
      return EMPLOYEE_CONTRIBUTIONS_2025.pension53to62;
    case '63+':
      return EMPLOYEE_CONTRIBUTIONS_2025.pensionOver62;
  }
}
