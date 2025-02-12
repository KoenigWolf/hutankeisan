# 税金計算アプリケーション

## 概要
給与計算に関連する税金や保険料を計算するWebアプリケーションです。月給と賞与から、所得税、住民税、社会保険料などを計算し、社員負担額と会社負担額を表示します。

## 特徴
- モダンなUIとレスポンシブデザイン
- クリーンなコードアーキテクチャ
- 高いパフォーマンス
- 拡張性の高い設計

## 技術スタック
- HTML5
- TailwindCSS (スタイリング)
- ES Modules (モジュール管理)
- Vanilla JavaScript (ビジネスロジック)

## 主な機能

### 給与計算機能
- 基本給からの税金・保険料計算
- 賞与を含めた年間総額計算
- 社員負担と会社負担の内訳表示

### 計算項目
1. 社員負担
   - 所得税 (給与所得控除後の課税所得に基づく)
   - 住民税 (年収の10%)
   - 健康保険料
   - 厚生年金保険料 (オプション)
   - 介護保険料 (オプション)
   - 雇用保険料

2. 会社負担
   - 健康保険料
   - 厚生年金保険料 (オプション)
   - 介護保険料 (オプション)
   - 雇用保険料
   - 労災保険料
   - 子育て拠出金 (オプション)

## プロジェクト構造
```
/
├── src/
│   └── js/
│       ├── app.js                    # エントリーポイント
│       ├── constants/                # 定数定義
│       │   └── tax-rates.js
│       ├── services/                 # ビジネスロジック
│       │   └── TaxCalculationService.js
│       └── components/               # UIコンポーネント
│           ├── ResultTable.js
│           └── TaxForm.js
├── index.html                        # メインHTML
└── docs/
    └── CHANGES.md                    # 変更履歴
```

## セットアップ
1. リポジトリをクローン
```bash
git clone https://github.com/your-username/tax-calculator.git
cd tax-calculator
```

2. ローカルサーバーを起動
```bash
python -m http.server 8000
# または
php -S localhost:8000
```

3. ブラウザでアクセス
```
http://localhost:8000
```

## 使用方法
1. 月給（万円）を入力
2. 賞与（万円）がある場合は入力
3. 適用される保険料にチェック
   - 厚生年金
   - 介護保険料
   - 子育て拠出
4. 「計算」ボタンをクリック
5. 結果を確認
   - 社員負担の内訳
   - 会社負担の内訳
   - 手取り額

## 開発者向け情報

### アーキテクチャ
- モジュール化された設計
- 単一責任の原則に基づくコンポーネント分割
- 依存性注入パターンの採用
- イミュータブルなデータフロー

### コンポーネント

#### TaxCalculationService
税金計算の中核ロジックを提供します。
```javascript
const service = new TaxCalculationService();
const tax = service.calculateIncomeTax(monthlySalary);
```

#### ResultTable
計算結果の表示を担当します。
```javascript
const table = new ResultTable();
table.render(calculationResults);
```

#### TaxForm
入力フォームの処理とバリデーションを行います。
```javascript
const form = new TaxForm(handleSubmit);
```

### テスト
テストの実行方法や追加方法については [CHANGES.md](docs/CHANGES.md) を参照してください。

## 今後の改善予定
1. 単体テストの整備
2. E2Eテストの追加
3. PWA対応
4. オフライン計算機能
5. 計算履歴の保存

## ブラウザサポート
- Google Chrome (推奨)
- Firefox
- Safari
- Edge

## コントリビューション
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ 新機能を追加'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス
MITライセンスの下で公開されています。
