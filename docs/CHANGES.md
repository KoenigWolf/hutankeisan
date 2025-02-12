# 変更履歴

## 2025-02-12: コードベースのリファクタリング

### モジュール構造の変更
```
src/
├── js/
│   ├── app.js                    # メインアプリケーション
│   ├── constants/
│   │   └── tax-rates.js         # 税率・控除の定数定義
│   ├── services/
│   │   └── TaxCalculationService.js  # 税金計算ロジック
│   └── components/
│       ├── ResultTable.js        # 結果表示コンポーネント
│       └── TaxForm.js           # フォーム処理コンポーネント
```

### 実装の詳細仕様

#### TaxCalculationService
- `calculateIncomeDeduction(annualSalary)`: 所得控除額の計算
- `calculateIncomeTax(monthlySalary)`: 所得税の計算
- `calculateInsurance(baseSalary, rate, divider)`: 保険料の計算
- `calculateEmployeeDeductions(monthlySalary, annualSalary, options)`: 社員負担の計算
- `calculateEmployerDeductions(monthlySalary, annualSalary, options)`: 会社負担の計算

#### ResultTable
- `createTableRow(label, monthlyAmount)`: テーブル行の生成
- `createEmployeeTable(data)`: 社員負担テーブルの生成
- `createEmployerTable(deductions)`: 会社負担テーブルの生成
- `render(data)`: 結果の表示

#### TaxForm
- `validateInput(id, label, optional)`: 入力値の検証
- `validateAndGetFormData()`: フォームデータの取得と検証
- `handleSubmit()`: フォーム送信処理
- `showError(message)`: エラー表示

### API仕様

#### TaxCalculationService
```javascript
interface DeductionOptions {
    pension: boolean;
    careInsurance: boolean;
    childCare: boolean;
}

interface EmployeeDeductions {
    incomeTax: number;
    residentTax: number;
    healthInsurance: number;
    employmentInsurance: number;
    pension?: number;
    careInsurance?: number;
    total: number;
}

interface EmployerDeductions {
    residentTax: number;
    healthInsurance: number;
    employmentInsurance: number;
    laborInsurance: number;
    pension?: number;
    careInsurance?: number;
    childCare?: number;
}
```

### 既存機能への影響
1. パフォーマンスの向上
   - 外部依存の削除によるロード時間の改善
   - モジュール分割による効率的なコード実行

2. 機能の変更なし
   - 既存の計算ロジックは維持
   - UIの動作は同一

### 設定変更
- ES Modulesの採用
  ```html
  <script type="module" src="src/js/app.js"></script>
  ```
- スタイリングをTailwindCSSに完全移行
- Bootstrap/jQueryの依存を削除

### テストケース

#### TaxCalculationService
1. 所得控除の計算
```javascript
// 年収180万円以下の場合
expect(service.calculateIncomeDeduction(1800000)).toBe(550000);

// 年収360万円の場合
expect(service.calculateIncomeDeduction(3600000)).toBe(180000);
```

2. 所得税の計算
```javascript
// 課税所得195万円以下
expect(service.calculateIncomeTax(162500)).toBe(6770);

// 課税所得330万円以下
expect(service.calculateIncomeTax(275000)).toBe(13750);
```

3. 社会保険料の計算
```javascript
// 標準報酬月額28万円の場合
const baseSalary = 280000;
expect(service.calculateInsurance(baseSalary, 0.0987)).toBe(13818);
```

#### TaxForm
1. 入力値の検証
```javascript
// 必須項目が未入力
expect(() => form.validateInput('baseSalary', '基本給')).toThrow();

// 任意項目が未入力
expect(form.validateInput('bonus', 'ボーナス', true)).toBe(0);
```

2. エラー表示
```javascript
form.showError('エラーメッセージ');
expect(document.getElementById('result').textContent).toBe('エラーメッセージ');
```

#### ResultTable
1. テーブル行の生成
```javascript
const row = resultTable.createTableRow('テスト', 100000);
expect(row).toContain('テスト');
expect(row).toContain('1,200,000');
expect(row).toContain('100,000');
```

### 今後の改善点
1. 単体テストの追加
2. E2Eテストの実装
3. 状態管理の導入
4. キャッシュ機能の実装
5. オフライン対応