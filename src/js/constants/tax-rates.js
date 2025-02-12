/**
 * 税率と控除に関する定数定義
 */

// 所得税の税率と控除額
export const INCOME_TAX = {
    BRACKETS: [
        { threshold: 1950000, rate: 0.05, deduction: 0 },
        { threshold: 3300000, rate: 0.10, deduction: 97500 },
        { threshold: 6950000, rate: 0.20, deduction: 427500 },
        { threshold: 9000000, rate: 0.23, deduction: 636000 },
        { threshold: 18000000, rate: 0.33, deduction: 1536000 },
        { threshold: 40000000, rate: 0.40, deduction: 2796000 },
        { threshold: Number.POSITIVE_INFINITY, rate: 0.45, deduction: 4796000 }
    ]
};

// 給与所得控除
export const SALARY_DEDUCTION = {
    BRACKETS: [
        { threshold: 1625000, base: 550000, rate: 0 },
        { threshold: 1800000, rate: 0.4, addition: -100000 },
        { threshold: 3600000, rate: 0.3, addition: 180000 },
        { threshold: 6600000, rate: 0.2, addition: 540000 },
        { threshold: 8500000, rate: 0.1, addition: 1200000 },
        { threshold: Number.POSITIVE_INFINITY, base: 1950000, rate: 0 }
    ]
};

// 社会保険の料率と上限・下限
export const INSURANCE_RATES = {
    // 健康保険（東京都の場合）
    HEALTH: {
        RATE: 0.0987, // 9.87%
        MIN_SALARY: 58000,
        MAX_SALARY: 1390000,
        SHARE: 2 // 折半
    },
    
    // 厚生年金
    PENSION: {
        RATE: 0.183, // 18.3%
        MIN_SALARY: 88000,
        MAX_SALARY: 650000,
        SHARE: 2 // 折半
    },
    
    // 雇用保険（一般の事業の場合）
    EMPLOYMENT: {
        EMPLOYEE_RATE: 0.003, // 0.3%
        EMPLOYER_RATE: 0.006, // 0.6%
        SHARE: 1 // 会社負担分は全額
    },
    
    // 介護保険（40歳以上65歳未満）
    CARE: {
        RATE: 0.0173, // 1.73%
        SHARE: 2 // 折半
    },
    
    // 労災保険（金融業、通信業の場合）
    LABOR: {
        RATE: 0.0025, // 0.25%
        SHARE: 1 // 会社負担
    },
    
    // 子ども・子育て拠出金
    CHILD_CARE: {
        RATE: 0.0036, // 0.36%
        SHARE: 1 // 会社負担
    }
};

// 住民税
export const RESIDENT_TAX = {
    PREFECTURAL: 0.04, // 4%
    MUNICIPAL: 0.06,   // 6%
    TOTAL: 0.10        // 10%
};

// 控除
export const DEDUCTIONS = {
    BASIC: 480000,          // 基礎控除（48万円）
    SPOUSE: 380000,         // 配偶者控除（所得要件あり）
    DEPENDENT: 380000       // 扶養控除（扶養親族1人あたり）
};

// 端数処理ルール
export const ROUNDING = {
    INSURANCE: Math.floor,  // 保険料：切り捨て
    TAX: n => Math.floor(n / 100) * 100  // 税金：100円未満切り捨て
};