class devices {
  constructor({ vehicle_id, surname, message } = {}) {
    this.vehicle_id = vehicle_id;
    this.device_type_id = surname;
    this.message = message;
  }
}

export { devices };
