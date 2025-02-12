import { TaxCalculationService } from './services/TaxCalculationService.js';
import { ResultTable } from './components/ResultTable.js';
import { TaxForm } from './components/TaxForm.js';

/**
 * 税金計算アプリケーション
 */
class TaxCalculatorApp {
    constructor() {
        this.taxService = new TaxCalculationService();
        this.resultTable = new ResultTable();
        this.taxForm = new TaxForm(this.handleFormSubmit.bind(this));
    }

    /**
     * フォーム送信を処理
     * @param {Object} formData フォームデータ
     */
    handleFormSubmit(formData) {
        // 基本計算
        const monthlySalary = formData.baseSalary * 10000;
        const annualSalary = monthlySalary * 12 + formData.bonus * 10000;

        // 社員負担分の計算
        const employeeDeductions = this.taxService.calculateEmployeeDeductions(
            monthlySalary,
            annualSalary,
            formData.options
        );
        const takeHomePay = monthlySalary - employeeDeductions.total;

        // 会社負担分の計算
        const employerDeductions = this.taxService.calculateEmployerDeductions(
            monthlySalary,
            annualSalary,
            formData.options
        );

        // 結果の表示
        this.resultTable.render({
            monthlySalary: annualSalary / 12,
            deductions: employeeDeductions,
            takeHomePay,
            employerDeductions
        });
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new TaxCalculatorApp();
});