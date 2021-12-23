class vehicles {
  constructor({ vehicle_plate, current_status, is_active } = {}) {
    this.vehicle_plate = vehicle_plate;
    this.current_status = current_status;
    this.is_active = is_active;
  }
}

export { vehicles };
