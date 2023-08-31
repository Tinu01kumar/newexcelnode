const express = require('express');
const multer = require('multer');
const { processExcelData, addCandidates } = require('../Controller/Candidatecontroller.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('excel'), async (req, res) => {
  try {
    const filePath = req.file.path;
    
    const candidates = await processExcelData(filePath);
    const results = await addCandidates(candidates);

    const successCount = results.filter(result => result.success).length;
    const duplicateCount = results.length - successCount;

    res.status(200).json({
      successCount: successCount,
      duplicateCount: duplicateCount,
      results: results,
      message:"success"
    });

    console.log("Results:", results);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
