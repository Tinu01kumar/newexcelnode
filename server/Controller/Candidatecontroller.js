const exceljs = require('exceljs');
const async = require('async');
const Candidate=require('../model/candidateModel.js')

async function processExcelData(filePath) {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  const candidates = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber !== 1) {
      candidates.push({
        name: row.getCell(1).value,
        email: row.getCell(2).value,
        mobile: row.getCell(3).value,
        dateOfBirth: row.getCell(4).value, 
        workExperience: row.getCell(5).value,
        resumeTitle: row.getCell(6).value,
        currentLocation: row.getCell(7).value,
        postalAddress: row.getCell(8).value,
        currentEmployer: row.getCell(9).value,
        currentDesignation: row.getCell(10).value,
    
      });
    }
  });

  return candidates;
}

async function addCandidates(candidates) {
  const results = [];

  await async.eachSeries(candidates, async (candidate) => {
    try {
      const existingCandidate = await Candidate.findOne({ email: candidate.email });

      if (existingCandidate) {
        results.push({ success: false, message: `Duplicate candidate with email ${candidate.email}` });
      } else {
        const newCandidate = new Candidate(candidate);
        await newCandidate.save();
        results.push({ success: true, message: 'Candidate added successfully' });
      }
    } catch (error) {
      results.push({ success: false, message: 'Error adding candidate' });
    }
  });

  return results;
}


module.exports = { processExcelData, addCandidates };
