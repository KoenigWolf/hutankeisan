/**
 * 結果表示用テーブルコンポーネント
 */
export class ResultTable {
    /**
     * テーブル行のHTMLを生成
     * @param {string} label 項目名
     * @param {number} monthlyAmount 月額
     * @returns {string} HTML文字列
     */
    createTableRow(label, monthlyAmount) {
        return `
            <tr class="border-b border-gray-700">
                <td class="py-2 px-4">${label}</td>
                <td class="py-2 px-4 text-right">${(monthlyAmount * 12).toLocaleString()} 円</td>
                <td class="py-2 px-4 text-right">${monthlyAmount.toLocaleString()} 円</td>
            </tr>
        `;
    }

    /**
     * 社員負担テーブルを生成
     * @param {Object} data テーブルデータ
     * @returns {string} テーブルHTML
     */
    createEmployeeTable(data) {
        const rows = [
            this.createTableRow('額面収入', data.monthlySalary),
            this.createTableRow('所得税', data.deductions.incomeTax),
            this.createTableRow('住民税', data.deductions.residentTax),
            this.createTableRow('健康保険', data.deductions.healthInsurance),
            data.deductions.pension ? this.createTableRow('厚生年金', data.deductions.pension) : '',
            data.deductions.careInsurance ? this.createTableRow('介護保険', data.deductions.careInsurance) : '',
            this.createTableRow('雇用保険', data.deductions.employmentInsurance),
            this.createTableRow('手取り額', data.takeHomePay)
        ].join('');

        return this.wrapTableWithHeader('社員負担', rows);
    }

    /**
     * 会社負担テーブルを生成
     * @param {Object} deductions 会社負担データ
     * @returns {string} テーブルHTML
     */
    createEmployerTable(deductions) {
        const rows = [
            this.createTableRow('住民税', deductions.residentTax),
            this.createTableRow('健康保険', deductions.healthInsurance),
            deductions.pension ? this.createTableRow('厚生年金', deductions.pension) : '',
            deductions.careInsurance ? this.createTableRow('介護保険', deductions.careInsurance) : '',
            this.createTableRow('雇用保険', deductions.employmentInsurance),
            this.createTableRow('労災保険', deductions.laborInsurance),
            deductions.childCare ? this.createTableRow('子育て拠出', deductions.childCare) : ''
        ].join('');

        return this.wrapTableWithHeader('会社負担', rows);
    }

    /**
     * テーブルのヘッダー付きラッパーを生成
     * @param {string} title テーブルタイトル
     * @param {string} rows テーブル行のHTML
     * @returns {string} 完全なテーブルHTML
     */
    wrapTableWithHeader(title, rows) {
        return `
            <table class="w-full bg-gray-800 text-white rounded-lg overflow-hidden mb-6">
                <thead>
                    <tr class="bg-gray-900">
                        <th class="py-2 px-4 text-left">${title}</th>
                        <th class="py-2 px-4 text-right">年額</th>
                        <th class="py-2 px-4 text-right">月額</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    }

    /**
     * 結果を表示
     * @param {Object} data 表示データ
     */
    render(data) {
        const resultDiv = document.getElementById('result');
        resultDiv.classList.remove('hidden');
        
        resultDiv.innerHTML = `
            <div class="overflow-x-auto">
                ${this.createEmployeeTable(data)}
                ${this.createEmployerTable(data.employerDeductions)}
            </div>
        `;
    }
}