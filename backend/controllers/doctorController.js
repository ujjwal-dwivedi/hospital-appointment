import sql from '../db.js';

const initDoctorsTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS doctors (
      "doctorId"             SERIAL PRIMARY KEY,
      specialization         VARCHAR(100) NOT NULL,
      "maxDailyPatients"     INTEGER NOT NULL,
      "currentAppointments"  INTEGER DEFAULT 0
    )
  `;
};
initDoctorsTable();

export const addDoctor = async (req, res) => {
  try {
    const { specialization, maxDailyPatients } = req.body;

    if (!specialization || !maxDailyPatients) {
      return res.status(400).json({ error: 'specialization and maxDailyPatients are required' });
    }

    const result = await sql`
      INSERT INTO doctors (specialization, "maxDailyPatients")
      VALUES (${specialization}, ${maxDailyPatients})
      RETURNING *
    `;

    res.status(201).json({
      message: 'Doctor added successfully',
      doctor: result[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const result = await sql`
      SELECT * FROM doctors ORDER BY "doctorId"
    `;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { specialization } = req.body;

    if (!specialization) {
      return res.status(400).json({ error: 'specialization is required' });
    }

    const available = await sql`
      SELECT * FROM doctors
      WHERE LOWER(specialization) = LOWER(${specialization})
        AND "currentAppointments" < "maxDailyPatients"
      ORDER BY "currentAppointments" ASC
      LIMIT 1
    `;

    if (available.length === 0) {
      return res.status(409).json({
        error: 'No available doctors for this specialization. All slots are full.'
      });
    }

    const doctor = available[0];

    const updated = await sql`
      UPDATE doctors
      SET "currentAppointments" = "currentAppointments" + 1
      WHERE "doctorId" = ${doctor.doctorId}
      RETURNING *
    `;

    res.json({
      message: `Appointment booked successfully with Doctor ID ${doctor.doctorId}!`,
      doctor: updated[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};