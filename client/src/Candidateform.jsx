import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { FaUpload } from "react-icons/fa"; // Import FontAwesome's upload icon

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
  border: 1px solid #ccc;

  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  padding: 10px;
  display: none;

`;

const UploadButton = styled.button`
  padding: 12px 20px;
  background-color: red;
  color: white;
  border: none;
  font-weight:700;
  font-size:0.8rem;
  
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;
  &:hover{
 background-color:white;
 outline:3px solid red;
 color:black;
  }
`;

const CustomMessage = styled.p`
  text-align: center;
  color: ${(props) => (props.type === "success" ? "green" : "red")};
`;

const CustomFileInput = styled.label`
  padding: 8px 16px;
  color: red;

  display: block;
  border-radius: 4rem;
  cursor: pointer;
  &:hover{
    color:aqua;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const FileName = styled.p`
  margin: 10px 0;
`;

const Candidateform = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [allduplicate, setAllduplicate] = useState(false);
  const [selectefilename, setselectedfilename] = useState("");
  const [message, setMessage] = useState("");
  const [somesuccess, setSomeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setselectedfilename(file.name);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("excel", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:9000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      setResponseReceived(true);

      const successCount = response.data.successCount;
      const duplicateCount = response.data.duplicateCount;

      if (response.data.message === "success") {
        if (successCount > 0 && duplicateCount > 0) {
         
          setSomeSuccess(true);
        } else if (successCount > 0) {
          
          setUploadSuccess(true);
        } else if (duplicateCount > 0) {
         
          setAllduplicate(true);
        }
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error uploading file");
      setResponseReceived(true);
    }
  };

  return (
    <div>
    {loading && (
      <LoaderContainer>
        <BounceLoader color="#3f51b5" size={80} />
      </LoaderContainer>
    )}
      {responseReceived ? (
      
        <div style={{textAlign:"center" , display:"flex"  ,height:"100vh" , alignItems:"center" , justifyContent:"center"  }}>
      
        

          {uploadSuccess && (
            <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
              <CustomMessage type="success">Thank you</CustomMessage>
              <CustomMessage type="success">File uploaded successfully!</CustomMessage>
              <CustomMessage type="success">Your data will be processed shortly</CustomMessage>
            </div>
          )}

          {somesuccess && (
            <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
              <CustomMessage type="success">Thank you</CustomMessage>
              <CustomMessage type="success">File uploaded successfully</CustomMessage>
              <CustomMessage style={{color:"red"}} type="success">some are duplicates data </CustomMessage>
            </div>
          )}

          {allduplicate && (
            <CustomMessage type="error">
              This file is previously stored
            </CustomMessage>
          
          )}

          {message && (
            <CustomMessage type="info">
              {message}
            </CustomMessage>
          )}
          </div>
     
      ) : (
        <FormContainer>
          <FormHeading>Candidate Form</FormHeading>
          <UploadForm onSubmit={handleSubmit}>
            <CustomFileInput>
              <FileInput
                type="file"
                name="excel"
                accept=".xlsx"
                onChange={handleFileChange}
              />
              <FaUpload style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }} />
            </CustomFileInput>
            <div style={{ paddingBottom: "10px" }}>
              {file ? (
                <div>
                  <FileName>{selectefilename}</FileName>
                </div>
              ) : (
                "Upload Excel File"
              )}
            </div>
            <UploadButton type="submit">Submit</UploadButton>
          </UploadForm>
        </FormContainer>
      )}
    </div>
  );
};

export default Candidateform;
