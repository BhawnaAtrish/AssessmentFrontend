import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CustomModal from "./Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import SelectFormControl from "./FormControl";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const filterContainerStyle = {
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.3)",
  backgroundColor: "#f0f0f0",
};

const filterFlexContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap"
};

export default function GridComponent() {
  const [isModalOpenArray, setIsModalOpenArray] = useState([]);

  const openModal = (index) => {
    const updatedArray = [...isModalOpenArray];
    updatedArray[index] = true;
    setIsModalOpenArray(updatedArray);
  };

  const closeModal = (index) => {
    const updatedArray = [...isModalOpenArray];
    updatedArray[index] = false;
    setIsModalOpenArray(updatedArray);
  };

  const [projectTechnology, setProjectTechnology] = React.useState([]);
  const [frontendTechnology, setFrontendTechnology] = React.useState([]);
  const [backendTechnology, setBackendTechnology] = React.useState([]);
  const [databaseTechnology, setDatabaseTechnology] = React.useState([]);
  const [infrastructureTechnology, setInfrastructureTechnology] = React.useState([]);

  const [selectedProjectTechnology, setSelectedProjectTechnology] = React.useState("");
  const [selectedFrontendTechnology, setSelectedFrontendTechnology] = React.useState("");
  const [selectedBackendTechnology, setSelectedBackendTechnology] = React.useState("");
  const [selectedDatabaseTechnology, setSelectedDatabaseTechnology] = React.useState("");
  const [selectedInfrastructureTechnology, setSelectedInfrastructureTechnology] = React.useState("");
  const [data, setData] = useState([]);

  const handleApplyFilter = () => {
    setData([]);

    var formdata = new FormData();
    formdata.append("project_technologies", selectedProjectTechnology);
    formdata.append("frontend_technologies", selectedFrontendTechnology);
    formdata.append("backend_technologies", selectedBackendTechnology);
    formdata.append("database_technologies", selectedDatabaseTechnology);
    formdata.append("infrastructure_technologies", selectedInfrastructureTechnology);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/project_information/filter_projects/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/project_information/get_project_list/")
      .then((response) => response.json())
      .then((data) => {
        setProjectTechnology(data.unique_technologies);
        setFrontendTechnology(data.frontend_technologies);
        setBackendTechnology(data.backend_technologies);
        setDatabaseTechnology(data.database_technologies);
        setInfrastructureTechnology(data.infrastructure_technologies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("http://127.0.0.1:8000/project_information/filter_projects/")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container fixed>
      <div style={filterContainerStyle}>
        <h2>Filter</h2>
        <div style={filterFlexContainerStyle}>
          <SelectFormControl
            label="Project Technology"
            id="project-technology-select"
            value={selectedProjectTechnology}
            onChange={(event) =>
              setSelectedProjectTechnology(event.target.value)
            }
            options={projectTechnology}
            sx={{ fontSize: "12px" }}
          />
          <SelectFormControl
            label="Frontend"
            id="frontend-technology-select"
            value={selectedFrontendTechnology}
            onChange={(event) =>
              setSelectedFrontendTechnology(event.target.value)
            }
            options={frontendTechnology}
            sx={{ fontSize: "12px" }}
          />
          <SelectFormControl
            label="Backend"
            id="backend-technology-select"
            value={selectedBackendTechnology}
            onChange={(event) =>
              setSelectedBackendTechnology(event.target.value)
            }
            options={backendTechnology}
            sx={{ fontSize: "12px" }}
          />
          <SelectFormControl
            label="Database"
            id="database-technology-select"
            value={selectedDatabaseTechnology}
            onChange={(event) =>
              setSelectedDatabaseTechnology(event.target.value)
            }
            options={databaseTechnology}
            sx={{ fontSize: "12px" }}
          />
          <SelectFormControl
            label="Infrastructure"
            id="infrastructure-technology-select"
            value={selectedInfrastructureTechnology}
            onChange={(event) =>
              setSelectedInfrastructureTechnology(event.target.value)
            }
            options={infrastructureTechnology}
            sx={{ fontSize: "12px" }}
          />
          <Button
            variant="contained"
            onClick={handleApplyFilter}
            sx={{ fontSize: "12px" }}
          >
            Apply
          </Button>
        </div>
      </div>
      <br />
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CustomModal
              isOpen={isModalOpenArray[index] || false}
              onClose={() => closeModal(index)}
              title={item.project_title}
            >
              <p>
                <b>Project Technologies:</b> {item.project_technologies}
              </p>
              <p>
                <b>Frontend Technologies:</b>
                {item.technical_skillset_frontend}
              </p>
              <p>
                <b>Backend Technologies:</b>
                {item.technical_skillset_backend}
              </p>
              <p>
                <b>Database Technologies:</b>
                {item.technical_skillset_databases}
              </p>
              <p>
                <b>Project Infrastructure Technologies:</b>
                {item.technical_skillset_infrastructre}
              </p>
              <p>
                <b>Availability Information:</b>
                {item.other_information_availability}
              </p>
            </CustomModal>
            <Item onClick={() => openModal(index)}>
              <div>
                <h3 style={{ marginBottom: "8px" }}>{item.project_title}</h3>
                <p>Click to see more details</p>
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
      <br />
    </Container >
  );
}