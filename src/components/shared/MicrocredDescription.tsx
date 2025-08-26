const MicrocredDescription = () => {
  return (
    <>
      <div className="mx-5">
        <h1 className="mt-10 text-keyin-bright-blue">Certification</h1>
        <p className="mb-6 text-xl">
          Upon successful completion, participants will receive a certificate acknowledging their proficiency in
          orthodontic assisting, approved by the Newfoundland and Labrador Dental Board.
        </p>
        <p className="mb-6 text-xl">
          Continuing education credits for registered dental assistants are determined by the provincial regulatory
          bodies and may vary.
        </p>
      </div>
      <div className="mx-5">
        <h1 className="mt-10 text-keyin-bright-blue">Prerequisites</h1>
        <ol className="space-y-2 list-disc list-inside">
          <li>Active registration as a Level II Dental Assistant in Newfoundland and Labrador.</li>
          <li>Completion of foundational dental assisting education.</li>
        </ol>
      </div>
      <div className="mx-5">
        <h1 className="mt-10 text-keyin-bright-blue">Course list</h1>

        {/* Mobile: Single column layout */}
        <div className="md:hidden">
          <h2 className="text-keyin-bright-blue">Theoretical Instruction (Didactic)</h2>
          <ol className="space-y-2 list-disc list-inside">
            <li>Orthodontic Principles</li>
            <li>Clear Aligner Basics: History, Principles and Treatment Goals</li>
            <li>Orthodontic Records for Treatment Planning</li>
            <li>Treatment mechanisms</li>
            <li>Infection Control and Safety</li>
            <li>Patient Communication</li>
            <li>Clinical Procedures Theory</li>
          </ol>

          <h2 className="mt-6 text-keyin-bright-blue">Practical Skill Development Topics</h2>
          <ol className="space-y-2 list-disc list-inside">
            <li>Obtaining intraoral and extraoral photographs</li>
            <li>Place and remove orthodontic separators</li>
            <li>Place and remove oral isolation devices for direct bonding</li>
            <li>Apply materials for bonding and banding procedures.</li>
            <li>Preliminary band fit for intraoral appliances</li>
            <li>Prepare teeth for banding and bonding procedures</li>
            <li>Place and bond ortho brackets, bondable attachments and fixed retainers</li>
            <li>Place and remove arch wires</li>
            <li>Trim and/or bend distal ends of arch wires</li>
            <li>Place and remove arch wire accessories:</li>
            <li>Place and remove clear aligners </li>
            <li>Place and bond attachments for clear aligners</li>
            <li>Remove bands and bonded metal attachment</li>
            <li>Determine preliminary fit of removable appliances </li>
            <li>Apply non-medicinal material to reduce irritating orthodontic components </li>
            <li>
              Provide client instructions regarding:
              <ul className="mt-2 ml-6 space-y-1 list-inside" style={{ listStyleType: 'circle' }}>
                <li>The care and use of orthodontic appliances</li>
                <li>Oral hygiene and disease control</li>
                <li>Elastic placement</li>
                <li>Proper eating habits and patient cooperation </li>
              </ul>
            </li>
            <li>Orthodontic emergencies</li>
            <li>Check integrity of bands, bonds, and attachments</li>
            <li>Cement bands and appliances</li>
            <li>Remove banding cement and bonding adhesive </li>
            <li>Selecting, fitting, and cementing orthodontic bands.</li>
            <li>Inserting orthodontic appliances.</li>
          </ol>
        </div>

        {/* Tablet and above: Three column layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {/* Column 1: Theoretical Instruction */}
          <div>
            <h2 className="text-keyin-bright-blue">Theoretical Instruction (Didactic)</h2>
            <ol className="space-y-1 list-disc list-inside">
              <li>Orthodontic Principles</li>
              <li>Clear Aligner Basics: History, Principles and Treatment Goals</li>
              <li>Orthodontic Records for Treatment Planning</li>
              <li>Treatment mechanisms</li>
              <li>Infection Control and Safety</li>
              <li>Patient Communication</li>
              <li>Clinical Procedures Theory</li>
            </ol>
          </div>

          {/* Column 2: First half of Practical Skills */}
          <div>
            <h2 className="text-keyin-bright-blue">Practical Skill Development Topics</h2>
            <ol className="space-y-1 list-disc list-inside">
              <li>Obtaining intraoral and extraoral photographs</li>
              <li>Place and remove orthodontic separators</li>
              <li>Place and remove oral isolation devices for direct bonding</li>
              <li>Apply materials for bonding and banding procedures.</li>
              <li>Preliminary band fit for intraoral appliances</li>
              <li>Prepare teeth for banding and bonding procedures</li>
              <li>Place and bond ortho brackets, bondable attachments and fixed retainers</li>
              <li>Place and remove arch wires</li>
              <li>Trim and/or bend distal ends of arch wires</li>
              <li>Place and remove arch wire accessories:</li>
              <li>Place and remove clear aligners </li>
              <li>Place and bond attachments for clear aligners</li>
              <li>Remove bands and bonded metal attachment</li>
            </ol>
          </div>

          {/* Column 3: Second half of Practical Skills */}
          <div>
            <ol className="mt-8 space-y-1 list-disc list-inside">
              <li>Determine preliminary fit of removable appliances </li>
              <li>Apply non-medicinal material to reduce irritating orthodontic components </li>
              <li>
                Provide client instructions regarding:
                <ul className="mt-2 ml-6 space-y-1 list-inside" style={{ listStyleType: 'circle' }}>
                  <li>The care and use of orthodontic appliances</li>
                  <li>Oral hygiene and disease control</li>
                  <li>Elastic placement</li>
                  <li>Proper eating habits and patient cooperation </li>
                </ul>
              </li>
              <li>Orthodontic emergencies</li>
              <li>Check integrity of bands, bonds, and attachments</li>
              <li>Cement bands and appliances</li>
              <li>Remove banding cement and bonding adhesive </li>
              <li>Selecting, fitting, and cementing orthodontic bands.</li>
              <li>Inserting orthodontic appliances.</li>
            </ol>
          </div>
        </div>

        <br />
      </div>
    </>
  )
}

export default MicrocredDescription
