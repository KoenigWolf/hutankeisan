function calculateIncomeTax(salary) {
    const annualSalary = salary * 12; // 月給を年額に換算
    let incomeDeduction;

    // 給与所得控除の計算
    if (annualSalary <= 1800000) {
        incomeDeduction = Math.max(annualSalary * 0.4, 550000);
    } else if (annualSalary <= 3600000) {
        incomeDeduction = annualSalary * 0.3 + 180000;
    } else if (annualSalary <= 6600000) {
        incomeDeduction = annualSalary * 0.2 + 540000;
    } else if (annualSalary <= 8500000) {
        incomeDeduction = annualSalary * 0.1 + 1200000;
    } else {
        incomeDeduction = 1950000;
    }

    const basicDeduction = 480000; // 基礎控除
    const taxableIncome = annualSalary - incomeDeduction - basicDeduction;

    // 課税所得に対する所得税率の適用
    let incomeTax = 0;
    if (taxableIncome <= 1950000) {
        incomeTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 3300000) {
        incomeTax = 1950000 * 0.05 + (taxableIncome - 1950000) * 0.1;
    } else if (taxableIncome <= 6950000) {
        incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (taxableIncome - 3300000) * 0.2;
    } else if (taxableIncome <= 9000000) {
        incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (taxableIncome - 6950000) * 0.23;
    } else if (taxableIncome <= 18000000) {
        incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (taxableIncome - 9000000) * 0.33;
    } else if (taxableIncome <= 40000000) {
        incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (18000000 - 9000000) * 0.33 + (taxableIncome - 18000000) * 0.4;
    } else {
        incomeTax = 1950000 * 0.05 + (3300000 - 1950000) * 0.1 + (6950000 - 3300000) * 0.2 + (9000000 - 6950000) * 0.23 + (18000000 - 9000000) * 0.33 + (40000000 - 18000000) * 0.4 + (taxableIncome - 40000000) * 0.45;
    }

    // 月額所得税
    const monthlyIncomeTax = Math.floor(incomeTax / 12);
    return monthlyIncomeTax;
}

function calculateSalary() {
    let baseSalary = parseFloat(document.getElementById('baseSalary').value);
    let bonus = parseFloat(document.getElementById('bonus').value) || 0; // ボーナス
    let pensionCheck = document.getElementById('pensionCheck').checked;
    let careInsuranceCheck = document.getElementById('careInsuranceCheck').checked;
    let childCareCheck = document.getElementById('childCareCheck').checked;

    if (isNaN(baseSalary)) {
        alert('基本給に正しい数値を入力してください。');
        return;
    }

    baseSalary *= 10000; // 万円単位を円単位に変換
    const annualSalary = baseSalary * 12 + bonus * 10000; // 年収

    // 社員負担分の計算
    const monthlyIncomeTax = calculateIncomeTax(baseSalary);
    const incomeTax = monthlyIncomeTax;
    const residentTaxEmployee = Math.floor(annualSalary * 0.1 / 12 / 2); // 住民税の社員負担分は年収の10%を12で割ったものの半分
    const healthInsuranceEmployee = Math.floor(baseSalary * 0.0987 / 2);
    const employmentInsuranceEmployee = Math.floor(baseSalary * 0.003 / 2);
    let careInsuranceEmployee = 0;
    let pensionInsuranceEmployee = 0;

    if (careInsuranceCheck) {
        careInsuranceEmployee = Math.floor(baseSalary * 0.0173 / 2);
    }
    if (pensionCheck) {
        pensionInsuranceEmployee = Math.floor(baseSalary * 0.183 / 2);
    }

    const totalEmployeeDeductions = incomeTax + residentTaxEmployee + healthInsuranceEmployee + pensionInsuranceEmployee + employmentInsuranceEmployee + careInsuranceEmployee;
    const takeHomePay = baseSalary - totalEmployeeDeductions;

    // 会社負担分の計算
    const residentTaxEmployer = Math.floor(annualSalary * 0.1 / 12 / 2); // 住民税の会社負担分は年収の10%を12で割ったものの半分
    const healthInsuranceEmployer = Math.floor(baseSalary * 0.0987 / 2);
    const employmentInsuranceEmployer = Math.floor(baseSalary * 0.003 * 2 / 3);
    const laborInsuranceEmployer = Math.floor(baseSalary * 0.0025);
    let childCareEmployer = 0;
    let careInsuranceEmployer = 0;
    let pensionInsuranceEmployer = 0;

    if (childCareCheck) {
        childCareEmployer = Math.floor(baseSalary * 0.0036);
    }
    if (careInsuranceCheck) {
        careInsuranceEmployer = Math.floor(baseSalary * 0.0173 / 2);
    }
    if (pensionCheck) {
        pensionInsuranceEmployer = Math.floor(baseSalary * 0.183 / 2);
    }

    const totalEmployerDeductions = residentTaxEmployer + healthInsuranceEmployer + pensionInsuranceEmployer + employmentInsuranceEmployer + laborInsuranceEmployer + childCareEmployer + careInsuranceEmployer;

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="table-responsive">
            <table class="table table-dark table-bordered">
                <thead>
                    <tr>
                        <th>社員負担</th>
                        <th>年収</th>
                        <th>月収</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>額面収入</td>
                        <td>${annualSalary.toLocaleString()} 円</td>
                        <td>${(annualSalary / 12).toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>所得税</td>
                        <td>${(incomeTax * 12).toLocaleString()} 円</td>
                        <td>${incomeTax.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>住民税</td>
                        <td>${(residentTaxEmployee * 12).toLocaleString()} 円</td>
                        <td>${residentTaxEmployee.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>健康保険</td>
                        <td>${(healthInsuranceEmployee * 12).toLocaleString()} 円</td>
                        <td>${healthInsuranceEmployee.toLocaleString()} 円</td>
                    </tr>
                    ${pensionCheck ? `
                    <tr>
                        <td>厚生年金</td>
                        <td>${(pensionInsuranceEmployee * 12).toLocaleString()} 円</td>
                        <td>${pensionInsuranceEmployee.toLocaleString()} 円</td>
                    </tr>` : ''}
                    ${careInsuranceCheck ? `
                    <tr>
                        <td>介護保険</td>
                        <td>${(careInsuranceEmployee * 12).toLocaleString()} 円</td>
                        <td>${careInsuranceEmployee.toLocaleString()} 円</td>
                    </tr>` : ''}
                    <tr>
                        <td>雇用保険</td>
                        <td>${(employmentInsuranceEmployee * 12).toLocaleString()} 円</td>
                        <td>${employmentInsuranceEmployee.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>手取り額</td>
                        <td>${(takeHomePay * 12).toLocaleString()} 円</td>
                        <td>${takeHomePay.toLocaleString()} 円</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-dark table-bordered mt-4">
                <thead>
                    <tr>
                        <th>会社負担</th>
                        <th>年額</th>
                        <th>月額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>住民税</td>
                        <td>${(residentTaxEmployer * 12).toLocaleString()} 円</td>
                        <td>${residentTaxEmployer.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>健康保険</td>
                        <td>${(healthInsuranceEmployer * 12).toLocaleString()} 円</td>
                        <td>${healthInsuranceEmployer.toLocaleString()} 円</td>
                    </tr>
                    ${pensionCheck ? `
                    <tr>
                        <td>厚生年金</td>
                        <td>${(pensionInsuranceEmployer * 12).toLocaleString()} 円</td>
                        <td>${pensionInsuranceEmployer.toLocaleString()} 円</td>
                    </tr>` : ''}
                    ${careInsuranceCheck ? `
                    <tr>
                        <td>介護保険</td>
                        <td>${(careInsuranceEmployer * 12).toLocaleString()} 円</td>
                        <td>${careInsuranceEmployer.toLocaleString()} 円</td>
                    </tr>` : ''}
                    <tr>
                        <td>雇用保険</td>
                        <td>${(employmentInsuranceEmployer * 12).toLocaleString()} 円</td>
                        <td>${employmentInsuranceEmployer.toLocaleString()} 円</td>
                    </tr>
                    <tr>
                        <td>労災保険</td>
                        <td>${(laborInsuranceEmployer * 12).toLocaleString()} 円</td>
                        <td>${laborInsuranceEmployer.toLocaleString()} 円</td>
                    </tr>
                    ${childCareCheck ? `
                    <tr>
                        <td>子ども・子育て拠出金</td>
                        <td>${(childCareEmployer * 12).toLocaleString()} 円</td>
                        <td>${childCareEmployer.toLocaleString()} 円</td>
                    </tr>` : ''}
                </tbody>
            </table>
        </div>
    `;
}
