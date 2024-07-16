URL：　https://koenigwolf.github.io/hutankeisan/

#### 概要
この給与計算ツールは、ユーザーが入力した月給を基に各種税金や保険料を計算し、社員と会社の負担額を算出するシンプルなウェブアプリケーションです。計算結果はリアルタイムで表示されます。また、ダークモードの切り替え機能も提供されています。

#### 機能
1. **月給入力**：ユーザーは月給を万円単位で入力します。
2. **計算**：入力された月給を基に、以下の税金や保険料を計算します。
   - 所得税
   - 住民税
   - 健康保険料
   - 厚生年金保険料（選択式）
   - 雇用保険料
   - 介護保険料（選択式）
   - 子ども・子育て拠出金（選択式）
3. **表示**：計算結果は、社員と会社の負担額、および手取り額として表示されます。
4. **ダークモード**：ボタンをクリックすることで、ライトモードとダークモードを切り替えることができます。

#### 使用技術
- HTML: ツールの基本的な構造を提供。
- CSS: スタイリングとダークモードの実装。
- JavaScript: 計算ロジック、DOM操作、手取り額の計算を提供。

#### 使い方
1. 月給を入力します（万円単位）。
2. 必要に応じて「厚生年金に加入」「介護保険料に加入」「子ども・子育て拠出金に加入」のチェックボックスを選択します。
3. 「計算」ボタンをクリックします。
4. 結果が表示されます。手取り額も含まれます。
5. 「ダークモード」ボタンをクリックして、ライトモードとダークモードを切り替えます。

#### Overview
This salary calculation tool is a simple web application that calculates various taxes and insurance premiums based on the monthly salary input by the user. It computes the burden amounts for both the employee and the company, and displays the results in real-time. Additionally, a dark mode toggle feature is provided.

#### Features
1. **Monthly Salary Input**: Users enter their monthly salary in ten-thousand yen units.
2. **Calculation**: Based on the input salary, the following taxes and insurance premiums are calculated:
   - Income Tax
   - Resident Tax
   - Health Insurance Premium
   - Pension Insurance Premium (optional)
   - Employment Insurance Premium
   - Care Insurance Premium (optional)
   - Child Care Contribution (optional)
3. **Display**: The calculation results are displayed as the burden amounts for both the employee and the company, including the take-home pay.
4. **Dark Mode**: Users can toggle between light mode and dark mode by clicking a button.

#### Technologies Used
- HTML: Provides the basic structure of the tool.
- CSS: Implements styling and the dark mode feature.
- JavaScript: Provides the calculation logic, DOM manipulation, and calculation of take-home pay.

#### Usage
1. Enter the monthly salary (in ten-thousand yen units).
2. Optionally, select the checkboxes for "Pension Insurance", "Care Insurance", and "Child Care Contribution" if applicable.
3. Click the "Calculate" button.
4. The results, including the take-home pay, are displayed.
5. Click the "Dark Mode" button to toggle between light mode and dark mode.
