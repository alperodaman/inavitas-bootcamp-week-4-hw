import pg_client from "../../adapters/database/postgresql.js";

// send vehicle info by ID
export const vehicle = async (req, res) => {
  const { id } = req.body;
  try {
    const _vehicle = await pg_client.query("SELECT vehicle_plate, is_active FROM vehicle WHERE id=$1", [id]);
    if (!_vehicle) {
      return res.status(404).send({ message: "Vehicle NOT found!" });
    }
    return res.status(200).send({ messages: "Vehicle info sent successfully ", vehicle });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// send all vehicles info
export const vehicle_list = async (req, res) => {
  try {
    const vehicles = await pg_client.query("SELECT vehicle_plate, is_active FROM vehicle ORDER BY id ASC");
    return res.status(200).send({ messages: "Vehicles info sent successfully ", vehicles });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// created vehicle info
export const vehicle_add = async (req, res) => {
  const { vehicle_plate, current_status, is_active } = req.body;
  try {
    const vehicle = await pg_client.query(
      "INSERT INTO vehicle (vehicle_plate, current_status, is_active) VALUES ($1, $2, $3)",
      [vehicle_plate, current_status, is_active]
    );
    return res.status(200).send({ messages: "Vehicle created successfully ", vehicle });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// updated vehicle info
export const vehicle_update = async (req, res) => {
  const { id, current_status, is_active } = req.body;
  try {
    let vehicle;
    if (current_status && is_active) {
      vehicle = await pg_client.query("UPDATE vehicle SET current_status = $1, is_active = $2 WHERE id = $3", [
        current_status,
        is_active,
        id,
      ]);
    } else if (current_status) {
      vehicle = await pg_client.query("UPDATE vehicle SET current_status = $1 WHERE id = $2", [current_status, id]);
    } else if (is_active) {
      vehicle = await pg_client.query("UPDATE vehicle SET is_active = $1 WHERE id = $2", [is_active, id]);
    }
    return res.status(200).send({ messages: "Vehicle updated successfully ", vehicle });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// deleted vehicle info
export const vehicle_delete = async (req, res) => {
  const { id } = req.body;
  try {
    const vehicle = await pg_client.query("DELETE FROM vehicle WHERE id = $1", [id]);
    return res.status(200).send({ messages: "Vehicle deleted successfully ", vehicle });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
