import moment from "moment";
import { useState } from "react";
import { MdDelete, MdDownload } from "react-icons/md";
import { Table } from "reactstrap";

import { api } from "../utilities/api";
import VerificationModal from "./VerificationModal";
import { toast } from "react-toastify";

const UserFiles = ({ data = "", getUserDetails = null }) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState("");

  const handleClose = () => {
    setModal(false);
  };

  const handleOpenModal = (file) => {
    setModal(true);
    setFile(file);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await api.post("/api/delete", { id });
      if (!data?.status) {
        toast.error("Unable to delete message");
        return;
      }
      toast.success(data?.message || "File deleted successfully");
      getUserDetails();
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      {modal && (
        <VerificationModal
          file={file}
          isOpen={modal}
          handleClose={handleClose}
        />
      )}
      <div className="ul-table mt-3">
        <Table hover striped>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>S.no.</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "20%" }}>Code</th>
              <th style={{ width: "30%" }}>Created At</th>
              <th style={{ width: "20%" }}>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="ul-table-body">
            {data.length
              ? data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>

                    <td scope="row">
                      <p
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {item?.filename || "-"}{" "}
                      </p>
                    </td>
                    <td scope="row">{item?.code}</td>
                    <td scope="row">
                      {moment(item.createdAt).format("DD-MM-YYYY") || ""}
                    </td>
                    <td scope="row">
                      <span onClick={() => handleOpenModal(item.filename)}>
                        <MdDownload size={18} />
                      </span>{" "}
                      <span onClick={() => handleDelete(item._id)}>
                        <MdDelete color="#E50505" size={18} />
                      </span>{" "}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default UserFiles;
