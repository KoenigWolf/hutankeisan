import { INCOME_TAX, SALARY_DEDUCTION, INSURANCE_RATES, RESIDENT_TAX, DEDUCTIONS, ROUNDING } from '../constants/tax-rates.js';

/**
 * 税金計算サービスクラス
 */
export class TaxCalculationService {
    /**
     * 標準報酬月額を計算
     * @param {number} salary 月給
     * @param {Object} limits 上限・下限値
     * @returns {number} 標準報酬月額
     */
    calculateStandardMonthlyRemuneration(salary, limits) {
        return Math.max(Math.min(salary, limits.MAX_SALARY), limits.MIN_SALARY);
    }

    /**
     * 給与所得控除を計算
     * @param {number} annualSalary 年収
     * @returns {number} 給与所得控除額
     */
    calculateSalaryDeduction(annualSalary) {
        const bracket = SALARY_DEDUCTION.BRACKETS.find(b => annualSalary <= b.threshold);
        if (bracket.base) {
            return bracket.base;
        }
        return Math.floor(annualSalary * bracket.rate + bracket.addition);
    }

    /**
     * 所得税を計算
     * @param {number} monthlySalary 月給
     * @param {number} bonus ボーナス
     * @returns {number} 月額所得税
     */
    calculateIncomeTax(monthlySalary, bonus = 0) {
        const annualSalary = monthlySalary * 12 + bonus;
        const salaryDeduction = this.calculateSalaryDeduction(annualSalary);
        const taxableIncome = annualSalary - salaryDeduction - DEDUCTIONS.BASIC;

        if (taxableIncome <= 0) {
            return 0;
        }

        const bracket = INCOME_TAX.BRACKETS.find(b => taxableIncome <= b.threshold);
        const tax = taxableIncome * bracket.rate - bracket.deduction;
        return ROUNDING.TAX(Math.max(0, tax) / 12);
    }

    /**
     * 保険料を計算
     * @param {number} salary 給与
     * @param {Object} insuranceConfig 保険設定
     * @returns {number} 保険料
     */
    calculateInsurance(salary, insuranceConfig) {
        let baseSalary = salary;
        if (insuranceConfig.MIN_SALARY) {
            baseSalary = this.calculateStandardMonthlyRemuneration(
                salary,
                insuranceConfig
            );
        }
        const amount = baseSalary * insuranceConfig.RATE;
        return ROUNDING.INSURANCE(amount / insuranceConfig.SHARE);
    }

    /**
     * 社員負担分を計算
     * @param {number} monthlySalary 月給
     * @param {number} bonus ボーナス
     * @param {Object} options オプション
     * @returns {Object} 社員負担の内訳と合計
     */
    calculateEmployeeDeductions(monthlySalary, bonus, options) {
        const annualSalary = monthlySalary * 12 + bonus;
        const deductions = {
            incomeTax: this.calculateIncomeTax(monthlySalary, bonus),
            residentTax: ROUNDING.TAX(annualSalary * RESIDENT_TAX.TOTAL / 12),
            healthInsurance: this.calculateInsurance(monthlySalary, INSURANCE_RATES.HEALTH),
            employmentInsurance: this.calculateInsurance(monthlySalary, {
                RATE: INSURANCE_RATES.EMPLOYMENT.EMPLOYEE_RATE,
                SHARE: 1
            })
        };

        // オプションの保険料を計算
        if (options.pension) {
            deductions.pension = this.calculateInsurance(monthlySalary, INSURANCE_RATES.PENSION);
        }
        if (options.careInsurance) {
            deductions.careInsurance = this.calculateInsurance(monthlySalary, INSURANCE_RATES.CARE);
        }

        // 合計を計算
        deductions.total = Object.values(deductions).reduce((sum, value) => sum + value, 0);
        return deductions;
    }

    /**
     * 会社負担分を計算
     * @param {number} monthlySalary 月給
     * @param {number} bonus ボーナス
     * @param {Object} options オプション
     * @returns {Object} 会社負担の内訳
     */
    calculateEmployerDeductions(monthlySalary, bonus, options) {
        const annualSalary = monthlySalary * 12 + bonus;
        const deductions = {
            residentTax: ROUNDING.TAX(annualSalary * RESIDENT_TAX.TOTAL / 12),
            healthInsurance: this.calculateInsurance(monthlySalary, INSURANCE_RATES.HEALTH),
            employmentInsurance: this.calculateInsurance(monthlySalary, {
                RATE: INSURANCE_RATES.EMPLOYMENT.EMPLOYER_RATE,
                SHARE: 1
            }),
            laborInsurance: this.calculateInsurance(monthlySalary, INSURANCE_RATES.LABOR)
        };

        // オプションの保険料を計算
        if (options.pension) {
            deductions.pension = this.calculateInsurance(monthlySalary, INSURANCE_RATES.PENSION);
        }
        if (options.careInsurance) {
            deductions.careInsurance = this.calculateInsurance(monthlySalary, INSURANCE_RATES.CARE);
        }
        if (options.childCare) {
            deductions.childCare = this.calculateInsurance(monthlySalary, INSURANCE_RATES.CHILD_CARE);
        }

        return deductions;
    }

    /**
     * 手取り額を計算
     * @param {number} monthlySalary 月給
     * @param {number} bonus ボーナス
     * @param {Object} options オプション
     * @returns {number} 手取り額
     */
    calculateNetSalary(monthlySalary, bonus, options) {
        const deductions = this.calculateEmployeeDeductions(monthlySalary, bonus, options);
        return monthlySalary - deductions.total;
    }
}