import { Patient } from "../types";

const PatientInfo = ({ patient }: { patient: Patient | null }) => {
  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>
        gender: {patient.gender}<br/>
        ssn: {patient.ssn ? patient.ssn : 'Not available'}<br/>
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientInfo;