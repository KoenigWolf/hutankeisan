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
        <p>所得税 ${incomeTax.toLocaleString()} 円 (${incomeTaxRate * 100}%)</p>
        <p>住民税 ${residentTax.toLocaleString()} 円 (${(residentTaxRate / 2) * 100}%)</p>
        <p>健康保険料 ${healthInsuranceEmployee.toLocaleString()} 円 (${(healthInsuranceRate / 2) * 100}%)</p>
        <p>厚生年金保険料 ${pensionInsuranceEmployee.toLocaleString()} 円 (${(pensionInsuranceRate / 2) * 100}%)</p>
        <p>雇用保険料 ${employmentInsuranceEmployee.toLocaleString()} 円 (${(employmentInsuranceRate / 2) * 100}%)</p>
        <p>介護保険料 ${careInsuranceEmployee.toLocaleString()} 円 (${(careInsuranceRate / 2) * 100}%)</p>
        <h3>合計負担額（社員） ${totalEmployeeDeductions.toLocaleString()} 円</h3>
        
        <h3>会社負担分</h3>
        <p>健康保険料 ${healthInsuranceEmployer.toLocaleString()} 円 (${(healthInsuranceRate / 2) * 100}%)</p>
        <p>厚生年金保険料 ${pensionInsuranceEmployer.toLocaleString()} 円 (${(pensionInsuranceRate / 2) * 100}%)</p>
        <p>雇用保険料 ${employmentInsuranceEmployer.toLocaleString()} 円 (${(employmentInsuranceRate * 2 / 3) * 100}%)</p>
        <p>労災保険料 ${laborInsuranceEmployer.toLocaleString()} 円 (${laborInsuranceRate * 100}%)</p>
        <p>子ども・子育て拠出金 ${childCareEmployer.toLocaleString()} 円 (${childCareRate * 100}%)</p>
        <p>介護保険料 ${careInsuranceEmployer.toLocaleString()} 円 (${(careInsuranceRate / 2) * 100}%)</p>
        <h3>合計負担額（会社） ${totalEmployerDeductions.toLocaleString()} 円</h3>
    `;
}

function exportExcel() {
    const resultDiv = document.getElementById('result');
    const resultText = resultDiv.innerText;
    const lines = resultText.split('\n');

    const ws_data = lines.map(line => [line]);
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "結果");

    XLSX.writeFile(wb, '給与計算結果.xlsx');
}

// ダークモードの切り替え機能
document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
