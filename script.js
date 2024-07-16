function calculateSalary() {
    let baseSalary = parseFloat(document.getElementById('baseSalary').value);
    let pensionCheck = document.getElementById('pensionCheck').checked;
    let careInsuranceCheck = document.getElementById('careInsuranceCheck').checked;
    let childCareCheck = document.getElementById('childCareCheck').checked;

    if (isNaN(baseSalary)) {
        alert('基本給に正しい数値を入力してください。');
        return;
    }

    baseSalary *= 10000; // 万円単位を円単位に変換

    // 税金と保険料の割合
    const incomeTaxRate = 0.05;
    const residentTaxRate = 0.10;
    const healthInsuranceRate = 0.0987;
    const employmentInsuranceRate = 0.003;
    const careInsuranceRate = 0.0173;
    const pensionInsuranceRate = 0.183;

    // 社員負担分の計算
    const incomeTax = Math.floor(baseSalary * incomeTaxRate);
    const residentTax = Math.floor(baseSalary * (residentTaxRate / 2));
    const healthInsuranceEmployee = Math.floor(baseSalary * (healthInsuranceRate / 2));
    const employmentInsuranceEmployee = Math.floor(baseSalary * (employmentInsuranceRate / 2));
    let careInsuranceEmployee = 0;
    let pensionInsuranceEmployee = 0;

    if (careInsuranceCheck) {
        careInsuranceEmployee = Math.floor(baseSalary * (careInsuranceRate / 2));
    }
    if (pensionCheck) {
        pensionInsuranceEmployee = Math.floor(baseSalary * (pensionInsuranceRate / 2));
    }

    const totalEmployeeDeductions = incomeTax + residentTax + healthInsuranceEmployee + pensionInsuranceEmployee + employmentInsuranceEmployee + careInsuranceEmployee;
    const takeHomePay = baseSalary - totalEmployeeDeductions;

    // 会社負担分の計算
    const healthInsuranceEmployer = Math.floor(baseSalary * (healthInsuranceRate / 2));
    const employmentInsuranceEmployer = Math.floor(baseSalary * (employmentInsuranceRate * 2 / 3));
    const laborInsuranceEmployer = Math.floor(baseSalary * 0.0025); // 固定値
    let childCareEmployer = 0;
    let careInsuranceEmployer = 0;
    let pensionInsuranceEmployer = 0;

    if (childCareCheck) {
        childCareEmployer = Math.floor(baseSalary * 0.0036); // 固定値
    }
    if (careInsuranceCheck) {
        careInsuranceEmployer = Math.floor(baseSalary * (careInsuranceRate / 2));
    }
    if (pensionCheck) {
        pensionInsuranceEmployer = Math.floor(baseSalary * (pensionInsuranceRate / 2));
    }

    const totalEmployerDeductions = healthInsuranceEmployer + pensionInsuranceEmployer + employmentInsuranceEmployer + laborInsuranceEmployer + childCareEmployer + careInsuranceEmployer;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3 class="mb-2">社員負担分</h3>
        <p>所得税: ${incomeTax.toLocaleString()} 円 (${incomeTaxRate * 100}%)</p>
        <p>住民税: ${residentTax.toLocaleString()} 円 (${(residentTaxRate / 2) * 100}%)</p>
        <p>健康保険料: ${healthInsuranceEmployee.toLocaleString()} 円 (${(healthInsuranceRate / 2) * 100}%)</p>
        ${pensionCheck ? `<p>厚生年金保険料: ${pensionInsuranceEmployee.toLocaleString()} 円 (${(pensionInsuranceRate / 2) * 100}%)</p>` : ''}
        <p>雇用保険料: ${employmentInsuranceEmployee.toLocaleString()} 円 (${(employmentInsuranceRate / 2) * 100}%)</p>
        ${careInsuranceCheck ? `<p>介護保険料: ${careInsuranceEmployee.toLocaleString()} 円 (${(careInsuranceRate / 2) * 100}%)</p>` : ''}
        <h3 class="mt-4 mb-2">合計（社員）: ${totalEmployeeDeductions.toLocaleString()} 円</h3>
        <h3 class="mt-2 mb-2">手取り額: ${takeHomePay.toLocaleString()} 円</h3>

        <h3 class="mt-4 mb-2">会社負担分</h3>
        <p>健康保険料: ${healthInsuranceEmployer.toLocaleString()} 円 (${(healthInsuranceRate / 2) * 100}%)</p>
        ${pensionCheck ? `<p>厚生年金保険料: ${pensionInsuranceEmployer.toLocaleString()} 円 (${(pensionInsuranceRate / 2) * 100}%)</p>` : ''}
        <p>雇用保険料: ${employmentInsuranceEmployer.toLocaleString()} 円 (${(employmentInsuranceRate * 2 / 3) * 100}%)</p>
        <p>労災保険料: ${laborInsuranceEmployer.toLocaleString()} 円 (0.25%)</p>
        ${childCareCheck ? `<p>子ども・子育て拠出金: ${childCareEmployer.toLocaleString()} 円 (0.36%)</p>` : ''}
        ${careInsuranceCheck ? `<p>介護保険料: ${careInsuranceEmployer.toLocaleString()} 円 (${(careInsuranceRate / 2) * 100}%)</p>` : ''}
        <h3 class="mt-4">合計（会社）: ${totalEmployerDeductions.toLocaleString()} 円</h3>
    `;
    resultDiv.style.display = 'block';
}

document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
