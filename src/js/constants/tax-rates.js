export const TAX_RATES = {
    INCOME_TAX_BRACKETS: [
        { threshold: 1950000, rate: 0.05 },
        { threshold: 3300000, rate: 0.10 },
        { threshold: 6950000, rate: 0.20 },
        { threshold: 9000000, rate: 0.23 },
        { threshold: 18000000, rate: 0.33 },
        { threshold: 40000000, rate: 0.40 },
        { threshold: Number.POSITIVE_INFINITY, rate: 0.45 }
    ],
    RESIDENT_TAX_RATE: 0.10,
    HEALTH_INSURANCE_RATE: 0.0987,
    PENSION_INSURANCE_RATE: 0.183,
    EMPLOYMENT_INSURANCE_EMPLOYEE_RATE: 0.003,
    EMPLOYMENT_INSURANCE_EMPLOYER_RATE: 0.006,
    LABOR_INSURANCE_RATE: 0.0025,
    CARE_INSURANCE_RATE: 0.0173,
    CHILD_CARE_RATE: 0.0036
};

export const DEDUCTIONS = {
    BASIC: 480000,
    INCOME_BRACKETS: [
        { threshold: 1800000, base: 550000, rate: 0.4 },
        { threshold: 3600000, base: 180000, rate: 0.3 },
        { threshold: 6600000, base: 540000, rate: 0.2 },
        { threshold: 8500000, base: 1200000, rate: 0.1 },
        { threshold: Number.POSITIVE_INFINITY, base: 1950000, rate: 0 }
    ]
};