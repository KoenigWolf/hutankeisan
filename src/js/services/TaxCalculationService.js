import { TAX_RATES, DEDUCTIONS } from '../constants/tax-rates.js';

/**
 * 税金計算サービスクラス
 */
export class TaxCalculationService {
    /**
     * 所得控除額を計算
     * @param {number} annualSalary 年収
     * @returns {number} 所得控除額
     */
    calculateIncomeDeduction(annualSalary) {
        const bracket = DEDUCTIONS.INCOME_BRACKETS.find(b => annualSalary <= b.threshold);
        return bracket.rate ? Math.max(annualSalary * bracket.rate, bracket.base) : bracket.base;
    }

    /**
     * 所得税を計算
     * @param {number} monthlySalary 月給
     * @returns {number} 月額所得税
     */
    calculateIncomeTax(monthlySalary) {
        const annualSalary = monthlySalary * 12;
        const incomeDeduction = this.calculateIncomeDeduction(annualSalary);
        const taxableIncome = annualSalary - incomeDeduction - DEDUCTIONS.BASIC;

        let remainingIncome = taxableIncome;
        let totalTax = 0;
        let prevThreshold = 0;

        for (const bracket of TAX_RATES.INCOME_TAX_BRACKETS) {
            const taxableAmount = Math.min(
                Math.max(0, remainingIncome),
                bracket.threshold - prevThreshold
            );
            totalTax += taxableAmount * bracket.rate;
            remainingIncome -= taxableAmount;
            prevThreshold = bracket.threshold;

            if (remainingIncome <= 0) break;
        }

        return Math.floor(totalTax / 12);
    }

    /**
     * 保険料を計算
     * @param {number} baseSalary 基本給
     * @param {number} rate 保険料率
     * @param {number} [divider=2] 負担分割合
     * @returns {number} 保険料
     */
    calculateInsurance(baseSalary, rate, divider = 2) {
        return Math.floor(baseSalary * rate / divider);
    }

    /**
     * 社員負担分を計算
     * @param {number} monthlySalary 月給
     * @param {number} annualSalary 年収
     * @param {Object} options オプション
     * @returns {Object} 社員負担の内訳と合計
     */
    calculateEmployeeDeductions(monthlySalary, annualSalary, options) {
        const deductions = {
            incomeTax: this.calculateIncomeTax(monthlySalary),
            residentTax: Math.floor(annualSalary * TAX_RATES.RESIDENT_TAX_RATE / 24),
            healthInsurance: this.calculateInsurance(monthlySalary, TAX_RATES.HEALTH_INSURANCE_RATE),
            employmentInsurance: this.calculateInsurance(monthlySalary, TAX_RATES.EMPLOYMENT_INSURANCE_EMPLOYEE_RATE),
            pension: options.pension ? this.calculateInsurance(monthlySalary, TAX_RATES.PENSION_INSURANCE_RATE) : 0,
            careInsurance: options.careInsurance ? this.calculateInsurance(monthlySalary, TAX_RATES.CARE_INSURANCE_RATE) : 0
        };

        deductions.total = Object.values(deductions).reduce((sum, value) => sum + value, 0);
        return deductions;
    }

    /**
     * 会社負担分を計算
     * @param {number} monthlySalary 月給
     * @param {number} annualSalary 年収
     * @param {Object} options オプション
     * @returns {Object} 会社負担の内訳
     */
    calculateEmployerDeductions(monthlySalary, annualSalary, options) {
        return {
            residentTax: Math.floor(annualSalary * TAX_RATES.RESIDENT_TAX_RATE / 24),
            healthInsurance: this.calculateInsurance(monthlySalary, TAX_RATES.HEALTH_INSURANCE_RATE),
            employmentInsurance: this.calculateInsurance(monthlySalary, TAX_RATES.EMPLOYMENT_INSURANCE_EMPLOYER_RATE, 1),
            laborInsurance: this.calculateInsurance(monthlySalary, TAX_RATES.LABOR_INSURANCE_RATE, 1),
            pension: options.pension ? this.calculateInsurance(monthlySalary, TAX_RATES.PENSION_INSURANCE_RATE) : 0,
            careInsurance: options.careInsurance ? this.calculateInsurance(monthlySalary, TAX_RATES.CARE_INSURANCE_RATE) : 0,
            childCare: options.childCare ? this.calculateInsurance(monthlySalary, TAX_RATES.CHILD_CARE_RATE, 1) : 0
        };
    }
}