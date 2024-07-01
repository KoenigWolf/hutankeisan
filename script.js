function calculateTaxes() {
    let salary = document.getElementById('salary').value;

    if (!salary) {
        alert('月給を入力してください。');
        return;
    }

    // 万円単位を円単位に変換
    salary = salary * 10000;

    // 保険料および税金の計算
    const incomeTaxRate = 0.05;
    const residentTaxRate = 0.10;
    const healthInsuranceRate = 0.0987;
    const pensionInsuranceRate = 0.183;
    const employmentInsuranceRate = 0.003;
    const laborInsuranceRate = 0.0025;
    const childCareRate = 0.0036;
    const careInsuranceRate = 0.0173;

    // 社員負担分の計算
    const incomeTax = Math.floor(salary * incomeTaxRate);
    const residentTax = Math.floor(salary * residentTaxRate / 2);
    const healthInsuranceEmployee = Math.floor(salary * healthInsuranceRate / 2);
    const pensionInsuranceEmployee = Math.floor(salary * pensionInsuranceRate / 2);
    const employmentInsuranceEmployee = Math.floor(salary * employmentInsuranceRate / 2);
    const careInsuranceEmployee = Math.floor(salary * careInsuranceRate / 2);

    // 会社負担分の計算
    const healthInsuranceEmployer = Math.floor(salary * healthInsuranceRate / 2);
    const pensionInsuranceEmployer = Math.floor(salary * pensionInsuranceRate / 2);
    const employmentInsuranceEmployer = Math.floor(salary * employmentInsuranceRate * 2 / 3);
    const laborInsuranceEmployer = Math.floor(salary * laborInsuranceRate);
    const childCareEmployer = Math.floor(salary * childCareRate);
    const careInsuranceEmployer = Math.floor(salary * careInsuranceRate / 2);

    // 合計の計算
    const totalEmployeeDeductions = incomeTax + residentTax + healthInsuranceEmployee + pensionInsuranceEmployee + employmentInsuranceEmployee + careInsuranceEmployee;
    const totalEmployerDeductions = healthInsuranceEmployer + pensionInsuranceEmployer + employmentInsuranceEmployer + laborInsuranceEmployer + childCareEmployer + careInsuranceEmployer;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>計算結果</h2>
        <h3>社員負担分</h3>
        <p>所得税: ${incomeTax} 円</p>
        <p>住民税: ${residentTax} 円</p>
        <p>健康保険料: ${healthInsuranceEmployee} 円</p>
        <p>厚生年金保険料: ${pensionInsuranceEmployee} 円</p>
        <p>雇用保険料: ${employmentInsuranceEmployee} 円</p>
        <h3>合計負担額（社員）: ${totalEmployeeDeductions} 円</h3>
        
        <h3>会社負担分</h3>
        <p>健康保険料: ${healthInsuranceEmployer} 円</p>
        <p>厚生年金保険料: ${pensionInsuranceEmployer} 円</p>
        <p>雇用保険料: ${employmentInsuranceEmployer} 円</p>
        <p>労災保険料: ${laborInsuranceEmployer} 円</p>
        <p>子ども・子育て拠出金: ${childCareEmployer} 円</p>
        <h3>合計負担額（会社）: ${totalEmployerDeductions} 円</h3>
    `;
}
