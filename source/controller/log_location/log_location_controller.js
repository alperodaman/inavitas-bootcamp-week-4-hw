import pg_client from "../../adapters/database/postgresql.js";

// send log_location info by ID
export const log_location = async (req, res) => {
  const { id } = req.body;
  try {
    const _log_location = await pg_client.query(
      "SELECT vehicle_id, latitude, longitude, FROM log_location WHERE id=$1",
      [id]
    );
    if (!_log_location) {
      return res.status(404).send({ message: "log_location NOT found!" });
    }

    const vehicle = await pg_client.query("SELECT vehicle_plate, is_active FROM vehicle WHERE id=$1", [
      _log_location.vehicle_id,
    ]);

    if (!vehicle) {
      return res.status(404).send({ message: "log_location NOT found!" });
    }

    const locationObject = {
      vehicle_plate: vehicle.vehicle_plate,
      type_name: vehicle.type_name,
      type_description: vehicle.type_description,
      latitude: _log_location.latitude,
      longitude: _log_location.longitude,
    };

    return res.status(200).send({ messages: "log_location info sent successfully ", location: locationObject });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// send all log_location info
export const log_location_list = async (req, res) => {
  try {
    const log_locations = await pg_client.query("SELECT latitude, longitude FROM log_location ORDER BY id ASC");
    return res.status(200).send({ messages: "log_locations info sent successfully ", log_locations });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// created log_location info
export const log_location_add = async (req, res) => {
  const { vehicle_id, device_id, latitude, longitude } = req.body;
  const created_at = new Date();
  try {
    const log_location = await pg_client.query(
      "INSERT INTO log_location (vehicle_id, device_id, latitude, longitude, created_at) VALUES ($1, $2, $3, $4, $5)",
      [vehicle_id, device_id, latitude, longitude, created_at]
    );
    return res.status(200).send({ messages: "log_location created successfully ", log_location });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
