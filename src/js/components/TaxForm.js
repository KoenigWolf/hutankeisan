/**
 * 税金計算フォームコンポーネント
 */
export class TaxForm {
    /**
     * @param {Function} onSubmit フォーム送信時のコールバック
     */
    constructor(onSubmit) {
        this.onSubmit = onSubmit;
        this.setupEventListeners();
    }

    /**
     * イベントリスナーを設定
     */
    setupEventListeners() {
        const calculateButton = document.querySelector('button[type="button"]');
        calculateButton.addEventListener('click', () => this.handleSubmit());
    }

    /**
     * フォーム送信を処理
     */
    handleSubmit() {
        try {
            const formData = this.validateAndGetFormData();
            this.onSubmit(formData);
        } catch (error) {
            this.showError(error.message);
        }
    }

    /**
     * 入力値の検証と変換
     * @param {string} id 入力要素のID
     * @param {string} label ラベル
     * @param {boolean} [optional=false] 任意入力か
     * @returns {number} 検証済みの数値
     */
    validateInput(id, label, optional = false) {
        const value = Number.parseFloat(document.getElementById(id).value);
        if (!optional && Number.isNaN(value)) {
            throw new Error(`${label}に正しい数値を入力してください。`);
        }
        return value;
    }

    /**
     * フォームデータの検証と取得
     * @returns {Object} 検証済みのフォームデータ
     */
    validateAndGetFormData() {
        const baseSalary = this.validateInput('baseSalary', '基本給');
        const bonus = this.validateInput('bonus', 'ボーナス', true) || 0;

        return {
            baseSalary,
            bonus,
            options: {
                pension: document.getElementById('pensionCheck').checked,
                careInsurance: document.getElementById('careInsuranceCheck').checked,
                childCare: document.getElementById('childCareCheck').checked
            }
        };
    }

    /**
     * エラーメッセージを表示
     * @param {string} message エラーメッセージ
     */
    showError(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = message;
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-400');

        // 3秒後にエラーメッセージを非表示
        setTimeout(() => {
            resultDiv.classList.add('hidden');
            resultDiv.classList.remove('bg-red-100', 'text-red-700', 'border', 'border-red-400');
        }, 3000);
    }
}