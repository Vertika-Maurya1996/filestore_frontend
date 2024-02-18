import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";

import { api } from "../utilities/api";
import { toast } from "react-toastify";

const Upload = ({ getUserDetails = null }) => {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const fileRef = useRef(null);
  const handleFileChange = (e) => {
    if (e?.target?.files[0] != "") {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file != "") {
      try {
        const formData = new FormData();
        let userID = localStorage.getItem("userID");
        formData.append("filename", file);
        formData.append("userID", userID);
        const { data } = await api.post("/api/uploadFile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (!data?.status) {
          toast.error("Unable to upload file");
          return;
        }
        toast.success(data?.message || "Success");
        setCode(data?.uniqueCode);
        clearRef();
        getUserDetails();
      } catch (error) {
        console.error("Error uploading file", error);
        toast.success("Error uploading file");
      }
    } else {
      toast.info("No file Selected");
    }
  };
  const clearRef = () => {
    fileRef.current.value = null;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCode("");
      setFile("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <div className="container">
      <h5>Upload file here</h5>
      <div className="file-upload">
        <input
          type="file"
          className="dropzone me-1"
          ref={fileRef}
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload} color="primary">
          Upload
        </Button>
      </div>
      {code && <p className="text-primary">Your six digit code is-{code}</p>}
    </div>
  );
};

export default Upload;
