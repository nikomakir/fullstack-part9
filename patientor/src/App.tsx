import { useState, useEffect } from "react";
import axios from "axios";
import { useMatch , Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import diagnoseService from './services/diagnoses';
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/patientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  const match = useMatch('/patients/:id');
  
  useEffect(() => {
    const fetchPatient = async () => {
      if (match?.params?.id) {
          const patient = await patientService.getPatient(match.params.id);
          setPatient(patient);
      } else {
        setPatient(null);
      }
    };
    void fetchPatient();
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<PatientInfo patient={patient} diagnoses={diagnoses} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
