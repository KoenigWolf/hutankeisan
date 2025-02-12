// 税率・保険料率の定数定義
const TAX_RATES = {
    INCOME_TAX_BRACKETS: [
        { threshold: 1950000, rate: 0.05 },
        { threshold: 3300000, rate: 0.10 },
        { threshold: 6950000, rate: 0.20 },
        { threshold: 9000000, rate: 0.23 },
        { threshold: 18000000, rate: 0.33 },
        { threshold: 40000000, rate: 0.40 },
        { threshold: Number.POSITIVE_INFINITY, rate: 0.45 }
    ],
    RESIDENT_TAX_RATE: 0.10,
    HEALTH_INSURANCE_RATE: 0.0987,
    PENSION_INSURANCE_RATE: 0.183,
    EMPLOYMENT_INSURANCE_EMPLOYEE_RATE: 0.003,
    EMPLOYMENT_INSURANCE_EMPLOYER_RATE: 0.006,
    LABOR_INSURANCE_RATE: 0.0025,
    CARE_INSURANCE_RATE: 0.0173,
    CHILD_CARE_RATE: 0.0036
};

// 所得控除の定数
const DEDUCTIONS = {
    BASIC: 480000,
    INCOME_BRACKETS: [
        { threshold: 1800000, base: 550000, rate: 0.4 },
        { threshold: 3600000, base: 180000, rate: 0.3 },
        { threshold: 6600000, base: 540000, rate: 0.2 },
        { threshold: 8500000, base: 1200000, rate: 0.1 },
        { threshold: Number.POSITIVE_INFINITY, base: 1950000, rate: 0 }
    ]
};

/**
 * 所得控除額を計算
 * @param {number} annualSalary 年収
 * @returns {number} 所得控除額
 */
function calculateIncomeDeduction(annualSalary) {
    const bracket = DEDUCTIONS.INCOME_BRACKETS.find(b => annualSalary <= b.threshold);
    return bracket.rate ? Math.max(annualSalary * bracket.rate, bracket.base) : bracket.base;
}

/**
 * 所得税を計算
 * @param {number} salary 月給
 * @returns {number} 月額所得税
 */
function calculateIncomeTax(salary) {
    const annualSalary = salary * 12;
    const incomeDeduction = calculateIncomeDeduction(annualSalary);
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
function calculateInsurance(baseSalary, rate, divider = 2) {
    return Math.floor(baseSalary * rate / divider);
}

/**
 * テーブル行のHTMLを生成
 * @param {string} label 項目名
 * @param {number} monthlyAmount 月額
 * @returns {string} HTML文字列
 */
function createTableRow(label, monthlyAmount) {
    return `
        <tr class="border-b border-gray-700">
            <td class="py-2 px-4">${label}</td>
            <td class="py-2 px-4 text-right">${(monthlyAmount * 12).toLocaleString()} 円</td>
            <td class="py-2 px-4 text-right">${monthlyAmount.toLocaleString()} 円</td>
        </tr>
    `;
}

/**
 * 給与計算を実行
 */
function calculateSalary() {
    try {
        // 入力値の取得と検証
        const baseSalary = getValidatedInput('baseSalary', '基本給');
        const bonus = getValidatedInput('bonus', 'ボーナス', true) || 0;
        const options = {
            pension: document.getElementById('pensionCheck').checked,
            careInsurance: document.getElementById('careInsuranceCheck').checked,
            childCare: document.getElementById('childCareCheck').checked
        };

        // 基本計算
        const monthlySalary = baseSalary * 10000;
        const annualSalary = monthlySalary * 12 + bonus * 10000;

        // 社員負担分の計算
        const employeeDeductions = calculateEmployeeDeductions(monthlySalary, annualSalary, options);
        const takeHomePay = monthlySalary - employeeDeductions.total;

        // 会社負担分の計算
        const employerDeductions = calculateEmployerDeductions(monthlySalary, annualSalary, options);

        // 結果の表示
        displayResults(
            annualSalary,
            employeeDeductions,
            takeHomePay,
            employerDeductions
        );
    } catch (error) {
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = error.message;
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-400');
        setTimeout(() => {
            resultDiv.classList.add('hidden');
            resultDiv.classList.remove('bg-red-100', 'text-red-700', 'border', 'border-red-400');
        }, 3000);
    }
}

/**
 * 入力値の検証と変換
 * @param {string} id 入力要素のID
 * @param {string} label ラベル
 * @param {boolean} [optional=false] 任意入力か
 * @returns {number} 検証済みの数値
 */
function getValidatedInput(id, label, optional = false) {
    const value = Number.parseFloat(document.getElementById(id).value);
    if (!optional && Number.isNaN(value)) {
        throw new Error(`${label}に正しい数値を入力してください。`);
    }
    return value;
}

/**
 * 社員負担分を計算
 * @param {number} monthlySalary 月給
 * @param {number} annualSalary 年収
 * @param {Object} options オプション
 * @returns {Object} 社員負担の内訳と合計
 */
function calculateEmployeeDeductions(monthlySalary, annualSalary, options) {
    const deductions = {
        incomeTax: calculateIncomeTax(monthlySalary),
        residentTax: Math.floor(annualSalary * TAX_RATES.RESIDENT_TAX_RATE / 24),
        healthInsurance: calculateInsurance(monthlySalary, TAX_RATES.HEALTH_INSURANCE_RATE),
        employmentInsurance: calculateInsurance(monthlySalary, TAX_RATES.EMPLOYMENT_INSURANCE_EMPLOYEE_RATE),
        pension: options.pension ? calculateInsurance(monthlySalary, TAX_RATES.PENSION_INSURANCE_RATE) : 0,
        careInsurance: options.careInsurance ? calculateInsurance(monthlySalary, TAX_RATES.CARE_INSURANCE_RATE) : 0
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
function calculateEmployerDeductions(monthlySalary, annualSalary, options) {
    return {
        residentTax: Math.floor(annualSalary * TAX_RATES.RESIDENT_TAX_RATE / 24),
        healthInsurance: calculateInsurance(monthlySalary, TAX_RATES.HEALTH_INSURANCE_RATE),
        employmentInsurance: calculateInsurance(monthlySalary, TAX_RATES.EMPLOYMENT_INSURANCE_EMPLOYER_RATE, 1),
        laborInsurance: calculateInsurance(monthlySalary, TAX_RATES.LABOR_INSURANCE_RATE, 1),
        pension: options.pension ? calculateInsurance(monthlySalary, TAX_RATES.PENSION_INSURANCE_RATE) : 0,
        careInsurance: options.careInsurance ? calculateInsurance(monthlySalary, TAX_RATES.CARE_INSURANCE_RATE) : 0,
        childCare: options.childCare ? calculateInsurance(monthlySalary, TAX_RATES.CHILD_CARE_RATE, 1) : 0
    };
}

/**
 * 結果を画面に表示
 * @param {number} annualSalary 年収
 * @param {Object} employeeDeductions 社員負担
 * @param {number} takeHomePay 手取り額
 * @param {Object} employerDeductions 会社負担
 */
function displayResults(annualSalary, employeeDeductions, takeHomePay, employerDeductions) {
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');

    const employeeRows = [
        createTableRow('額面収入', annualSalary / 12),
        createTableRow('所得税', employeeDeductions.incomeTax),
        createTableRow('住民税', employeeDeductions.residentTax),
        createTableRow('健康保険', employeeDeductions.healthInsurance),
        employeeDeductions.pension ? createTableRow('厚生年金', employeeDeductions.pension) : '',
        employeeDeductions.careInsurance ? createTableRow('介護保険', employeeDeductions.careInsurance) : '',
        createTableRow('雇用保険', employeeDeductions.employmentInsurance),
        createTableRow('手取り額', takeHomePay)
    ].join('');

    const employerRows = [
        createTableRow('住民税', employerDeductions.residentTax),
        createTableRow('健康保険', employerDeductions.healthInsurance),
        employerDeductions.pension ? createTableRow('厚生年金', employerDeductions.pension) : '',
        employerDeductions.careInsurance ? createTableRow('介護保険', employerDeductions.careInsurance) : '',
        createTableRow('雇用保険', employerDeductions.employmentInsurance),
        createTableRow('労災保険', employerDeductions.laborInsurance),
        employerDeductions.childCare ? createTableRow('子育て拠出', employerDeductions.childCare) : ''
    ].join('');

    resultDiv.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full bg-gray-800 text-white rounded-lg overflow-hidden mb-6">
                <thead>
                    <tr class="bg-gray-900">
                        <th class="py-2 px-4 text-left">社員負担</th>
                        <th class="py-2 px-4 text-right">年収</th>
                        <th class="py-2 px-4 text-right">月収</th>
                    </tr>
                </thead>
                <tbody>${employeeRows}</tbody>
            </table>
            <table class="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-900">
                        <th class="py-2 px-4 text-left">会社負担</th>
                        <th class="py-2 px-4 text-right">年額</th>
                        <th class="py-2 px-4 text-right">月額</th>
                    </tr>
                </thead>
                <tbody>${employerRows}</tbody>
            </table>
        </div>
    `;
}
