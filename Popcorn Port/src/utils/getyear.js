

export const generateYearRange = (startYear) => {
    const endYear = new Date().getFullYear();
    const range = Array.from({ length: endYear - startYear + 1 }, (_, index) => (endYear - index).toString());
    return range;
};
