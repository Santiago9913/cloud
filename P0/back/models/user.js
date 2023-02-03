class User {
  constructor(id, name, email, password, events) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.events = events;
  }
}

module.exports = User;
