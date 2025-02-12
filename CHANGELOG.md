# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-02-12

### Added
- 税金計算の詳細仕様書（TAX_CALCULATION_SPEC.md）
- 標準報酬月額の上限・下限チェック機能
- 地域別の保険料率対応
- 端数処理ユーティリティ
- 給与計算のサンプルケース
- 詳細なAPIドキュメント

### Changed
- 給与所得控除の計算ロジックを最新化
- 税率と控除の定義を2025年度基準に更新
- 保険料計算メソッドの改善
- テーブル表示のレイアウトを最適化

### Fixed
- 標準報酬月額の計算誤りを修正
- 端数処理の不整合を解消
- 社会保険料の按分計算の誤りを修正

## [1.1.0] - 2025-02-12

### Added
- TailwindCSSによるスタイリング
- ダークモードサポート
- レスポンシブデザイン対応
- モジュール化されたコード構造

### Changed
- jQuery/Bootstrapの依存を除去
- Vanilla JavaScriptへの移行
- コンポーネントベースの設計に変更
- ファイル構造の最適化

### Removed
- styles.cssの削除（TailwindCSSに統合）
- 外部ライブラリの依存関係
- 冗長なスタイル定義

### Fixed
- UIの表示遅延問題を解決
- モバイル表示の不具合を修正
- エラー表示の視認性を改善

## [1.0.0] - 2025-02-12

### Added
- 初期リリース
- 基本的な給与計算機能
- 社会保険料の計算
- 所得税・住民税の計算
- 手取り額の表示
- 会社負担額の表示

### Changed
- N/A

### Removed
- N/A

### Fixed
- N/A

[1.2.0]: https://github.com/username/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/username/repo/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/username/repo/releases/tag/v1.0.0