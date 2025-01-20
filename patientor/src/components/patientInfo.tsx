import { Patient, Diagnosis } from "../types";

const PatientInfo = ({ patient, diagnoses }: {
  patient: Patient | null,
  diagnoses: Diagnosis[]
}) => {

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
      <p><b>entries</b></p>
      {patient.entries?.map(e => (
        <div key={e.id}>
          <p>{e.date} <i>{e.description}</i></p>
          <ul>
            {e.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses.find(d => d.code === code)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfo;