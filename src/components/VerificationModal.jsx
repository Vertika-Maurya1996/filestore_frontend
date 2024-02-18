import Blob from "blob";
import React, { useState } from "react";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { api } from "../utilities/api";
import { toast } from "react-toastify";

const VerificationModal = ({ isOpen = "", handleClose, file = "" }) => {
  const [code, setCode] = useState("");

  // verification of the code
  const handleVerification = async () => {
    try {
      let userID = localStorage.getItem("userID");
      const { data } = await api.post("/api/verifyCode", {
        code: code,
        userID: userID,
      });
      if (data.status) {
        handleFileDownload();
      } else {
        toast.error(data?.message||"Unable to downlod")
        return;
      }
    } catch (err) {
      console.log("Error");
      toast.error("Something went wrong")
    }
  };
  const handleChange = (e) => {
    if (e.target.value !== "") setCode(e.target.value);
  };

  // Download File
  const handleFileDownload = async () => {
    try {
      const response = await api.get(`/${file}`, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${file}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      handleClose();
      toast.success("Download Successful")
    } catch (err) {
      toast.error("Unable to download")
      console.log("Error downloading");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Verification</ModalHeader>
        <ModalBody>
          <Label>Enter the unique code</Label>
          <Input type="text" id="code" onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleVerification}>
            Download
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerificationModal;
