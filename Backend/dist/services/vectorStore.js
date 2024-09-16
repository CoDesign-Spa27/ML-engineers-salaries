"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDataSearch = initializeDataSearch;
exports.searchSalaryData = searchSalaryData;
const dataLoader_1 = require("./dataLoader");
let salaryData = [];
async function initializeDataSearch() {
    salaryData = await (0, dataLoader_1.loadSalaryData)();
    console.log('Data search initialized');
}
function searchSalaryData(query, limit = 3) {
    if (salaryData.length === 0) {
        throw new Error('Salary data not initialized');
    }
    // Simple search function that checks if the query appears in any field of the salary data
    const results = salaryData.filter(item => Object.values(item).some(value => value.toLowerCase().includes(query.toLowerCase())));
    return results.slice(0, limit);
}
