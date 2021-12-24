import pg_client from "../../adapters/database/postgresql";

// send log_temperature info by ID
export const log_temperature = async (req, res) => {
  const { id } = req.body;
  try {
    const _log_temperature = await pg_client.query("SELECT vehicle_id, read_data, FROM log_temperature WHERE id=$1", [
      id,
    ]);
    if (!_log_temperature) {
      return res.status(404).send({ message: "log_temperature NOT found!" });
    }

    const vehicle = await pg_client.query("SELECT vehicle_plate, is_active FROM vehicle WHERE id=$1", [
      _log_temperature.vehicle_id,
    ]);

    if (!vehicle) {
      return res.status(404).send({ message: "log_temperature NOT found!" });
    }

    const temperatureObject = {
      vehicle_plate: vehicle.vehicle_plate,
      type_name: vehicle.type_name,
      type_description: vehicle.type_description,
      read_data: _log_temperature.read_data,
    };

    return res.status(200).send({ messages: "log_location info sent successfully ", location: temperatureObject });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// send all log_temperature info
export const log_temperature_list = async (req, res) => {
  try {
    const log_temperatures = await pg_client.query("SELECT read_data FROM log_temperature ORDER BY id ASC");
    return res.status(200).send({ messages: "log_temperature info sent successfully ", log_temperature });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// created log_temperature info
export const log_temperature_add = async (req, res) => {
  const { vehicle_id, device_id, read_data } = req.body;
  const created_at = new Date();
  try {
    const log_temperature = await pg_client.query(
      "INSERT INTO log_temperature (vehicle_id, device_id, read_data, created_at) VALUES ($1, $2, $3, $4)",
      [vehicle_id, device_id, read_data, created_at]
    );
    return res.status(200).send({ messages: "log_temperature created successfully ", log_temperature });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
