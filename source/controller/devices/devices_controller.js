import pg_client from "../../adapters/database/postgresql";

// send device info by ID
export const device = async (req, res) => {
  const { id } = req.body;
  try {
    const _device = await pg_client.query(
      "SELECT vehicle_id, device_type_id, device_name, is_online, is_active FROM devices WHERE id=$1",
      [id]
    );
    if (!_device) {
      return res.status(404).send({ message: "Device NOT found!" });
    }

    const vehicle_and_device_type = await pg_client.query(
      "SELECT v.vehicle_plate as vehicle_plate, dt.type_name as type_name, dt.type_description as type_description FROM vehicle v, device_type dt WHERE v.id=$1 AND dt.id=$2",
      [device.vehicle_id, device.device_type_id]
    );

    if (!vehicle_and_device_type) {
      return res.status(404).send({ message: "Device NOT found!" });
    }

    const deviceObject = {
      device_name: device.device_name,
      is_online: device.is_online,
      is_active: device.is_active,
      vehicle_plate: vehicle_and_device_type.vehicle_plate,
      type_name: vehicle_and_device_type.type_name,
      type_description: vehicle_and_device_type.type_description,
    };

    // Burada bir şey denedim. kısa yolunu bulunca silecem hacı

    // const vehicle = await pg_client.query("SELECT vehicle_plate, is_active FROM vehicle WHERE id=$1", [
    //   device.vehicle_id,
    // ]);
    // if (!vehicle) {
    //   return res.status(404).send({ message: "Device didn't match any vehicle!" });
    // }
    // const devices_type = await pg_client.query(
    //   "SELECT type_name, type_description,is_active FROM devices_type WHERE id=$1",
    //   [device.device_type_id]
    // );
    // if (!devices_type) {
    //   return res.status(404).send({ message: "Device didn't match any device_type!" });
    // }
    // const deviceObject = {
    //   device_name: device.device_name,
    //   is_online: device.is_online,
    //   is_active: device.is_active,
    //   ...vehicle,
    //   ...devices_type,
    // };

    return res.status(200).send({ messages: "Device info sent successfully ", device: deviceObject });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// send all device info
export const device_list = async (req, res) => {
  try {
    const devices = await pg_client.query("SELECT device_name FROM devices ORDER BY id ASC");
    return res.status(200).send({ messages: "devices info sent successfully ", devices });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// created device info
export const device_add = async (req, res) => {
  const { device_name, is_online, is_active } = req.body;
  try {
    const device = await pg_client.query(
      "INSERT INTO devices (device_name, is_online, is_active) VALUES ($1, $2, $3)",
      [device_name, is_online, is_active]
    );
    return res.status(200).send({ messages: "device created successfully ", device });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// updated device info
export const device_update = async (req, res) => {
  const { id, is_online, is_active } = req.body;
  try {
    let device;
    if (current_status && is_active) {
      device = await pg_client.query("UPDATE devices SET is_online = $1, is_active = $2 WHERE id = $3", [
        is_online,
        is_active,
        id,
      ]);
    } else if (is_online) {
      device = await pg_client.query("UPDATE devices SET is_online = $1 WHERE id = $2", [is_online, id]);
    } else if (is_active) {
      device = await pg_client.query("UPDATE devices SET is_active = $1 WHERE id = $2", [is_active, id]);
    }
    return res.status(200).send({ messages: "devices updated successfully ", device });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// deleted device info
export const device_delete = async (req, res) => {
  const { id } = req.body;
  try {
    const device = await pg_client.query("DELETE FROM devices WHERE id = $1", [id]);
    return res.status(200).send({ messages: "device deleted successfully ", device });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
