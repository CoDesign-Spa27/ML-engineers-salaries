"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSalaryData = loadSalaryData;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
async function loadSalaryData() {
    return new Promise((resolve, reject) => {
        const data = [];
        fs_1.default.createReadStream('./salaries.csv')
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            data.push(row);
        })
            .on('end', () => {
            console.log('CSV data loaded successfully');
            resolve(data);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
}
