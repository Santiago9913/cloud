class Event {
  constructor(
    id,
    name,
    category,
    place,
    address,
    startDate,
    endDate,
    isVirtual,
    owner,
    ownerId
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.place = place;
    this.address = address;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isVirtual = isVirtual;
    this.owner = owner;
    this.ownerId = ownerId;
  }
}

export { Event };
