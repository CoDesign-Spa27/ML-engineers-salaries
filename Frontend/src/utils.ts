interface SalaryData {
  work_year: number;
  salary_in_usd: number;
}

export interface ProcessedData {
  year: number;
  totalJobs: number;
  averageSalary: number;
}

export interface JobData {
  work_year: number;
  job_title: string;
}

export interface JobsByYear {
  job_title: string;
  count: number;
}


export function processSalaryData(data: SalaryData[]): ProcessedData[] {
  const yearMap: { [year: number]: { totalSalary: number; jobCount: number } } = {};

  data.forEach((item) => {
    if (!yearMap[item.work_year]) {
      yearMap[item.work_year] = { totalSalary: 0, jobCount: 0 };
    }
    yearMap[item.work_year].totalSalary += item.salary_in_usd;
    yearMap[item.work_year].jobCount += 1;
  });

  return Object.entries(yearMap).map(([year, { totalSalary, jobCount }]) => ({
    year: Number(year),
    totalJobs: jobCount,
    averageSalary: Math.round(totalSalary / jobCount),
  }));
}



export function JobsByYear(data: JobData[], year: number): JobsByYear[] {
  const jobMap: { [jobTitle: string]: number } = {};

  data.forEach((item) => {
    if (item.work_year === year) {
      if (!jobMap[item.job_title]) {
        jobMap[item.job_title] = 0;
      }
      jobMap[item.job_title] += 1;
    }
  });
  return Object.entries(jobMap).map(([job_title, count]) => ({
    job_title,
    count,
  }));
}
