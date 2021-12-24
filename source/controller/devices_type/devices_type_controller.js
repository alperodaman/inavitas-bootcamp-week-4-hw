import pg_client from "../../adapters/database/postgresql.js";

// send device_type info by ID
export const device_type = async (req, res) => {
  const { id } = req.body;
  try {
    const _device_type = await pg_client.query("SELECT type_name, type_description FROM devices_type WHERE id=$1", [
      id,
    ]);
    if (!_device_type) {
      return res.status(404).send({ message: "Device type NOT found!" });
    }
    return res.status(200).send({ messages: "Device type info sent successfully ", _device_type });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// send all device_type info
export const device_type_list = async (req, res) => {
  try {
    const device_type = await pg_client.query("SELECT type_name, type_description FROM devices_type ORDER BY id ASC");
    return res.status(200).send({ messages: "device type info sent successfully ", device_type });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// created device_type info
export const device_type_add = async (req, res) => {
  const { type_name, type_description, is_active } = req.body;
  try {
    const device_type = await pg_client.query(
      "INSERT INTO devices_type (type_name, type_description, is_active) VALUES ($1, $2, $3)",
      [type_name, type_description, is_active]
    );
    return res.status(200).send({ messages: "device type created successfully ", device_type });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// deleted device_type info
export const device_type_delete = async (req, res) => {
  const { id } = req.body;
  try {
    const device_type = await pg_client.query("DELETE FROM devices_type WHERE id = $1", [id]);
    return res.status(200).send({ messages: "device type deleted successfully ", device_type });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
