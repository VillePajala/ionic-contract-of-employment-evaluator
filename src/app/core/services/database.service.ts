import { Injectable, signal } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { SavedCalculation } from '../models/calculation.interface';

/**
 * Dexie database class for the salary calculator app.
 * Dexie provides a friendly wrapper around IndexedDB.
 */
class SalaryCalculatorDatabase extends Dexie {
  calculations!: Table<SavedCalculation, number>;

  constructor() {
    super('NettopalkkalaskuriDB');

    // Define database schema
    // ++id means auto-incrementing primary key
    // name and createdAt are indexed for querying
    this.version(1).stores({
      calculations: '++id, name, createdAt',
    });
  }
}

/**
 * Service for persisting salary calculations using IndexedDB via Dexie.
 *
 * Uses Angular Signals for reactive state:
 * - `calculations` signal holds the list of saved calculations
 * - The list automatically updates after save/delete operations
 *
 * Example usage:
 * ```typescript
 * await databaseService.initialize();
 * await databaseService.save({ ...result, name: 'My Job', createdAt: new Date() });
 * const saved = databaseService.calculations();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db = new SalaryCalculatorDatabase();

  /**
   * Signal holding the list of saved calculations.
   * Updated automatically after save/delete operations.
   */
  private _calculations = signal<SavedCalculation[]>([]);

  /**
   * Read-only accessor for the calculations signal.
   */
  readonly calculations = this._calculations.asReadonly();

  /**
   * Initializes the database service by loading existing calculations.
   * Should be called when the app starts.
   */
  async initialize(): Promise<void> {
    await this.loadCalculations();
  }

  /**
   * Loads all calculations from the database, sorted by creation date (newest first).
   */
  private async loadCalculations(): Promise<void> {
    try {
      const items = await this.db.calculations.orderBy('createdAt').reverse().toArray();
      this._calculations.set(items);
    } catch (error) {
      console.error('Failed to load calculations:', error);
      this._calculations.set([]);
    }
  }

  /**
   * Saves a new calculation to the database.
   *
   * @param calculation - The calculation to save
   * @returns The auto-generated ID of the saved calculation
   */
  async save(calculation: SavedCalculation): Promise<number> {
    try {
      const id = await this.db.calculations.add(calculation);
      await this.loadCalculations();
      return id;
    } catch (error) {
      console.error('Failed to save calculation:', error);
      throw error;
    }
  }

  /**
   * Deletes a calculation by its ID.
   *
   * @param id - The ID of the calculation to delete
   */
  async delete(id: number): Promise<void> {
    try {
      await this.db.calculations.delete(id);
      await this.loadCalculations();
    } catch (error) {
      console.error('Failed to delete calculation:', error);
      throw error;
    }
  }

  /**
   * Clears all calculations from the database.
   */
  async clearAll(): Promise<void> {
    try {
      await this.db.calculations.clear();
      this._calculations.set([]);
    } catch (error) {
      console.error('Failed to clear calculations:', error);
      throw error;
    }
  }
}
