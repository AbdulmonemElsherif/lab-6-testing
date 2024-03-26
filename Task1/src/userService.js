class UserService {
  constructor(database) {
    this.database = database;
  }

  async createUser(user) {
    if (!user || !user.name || !user.email) {
      throw new Error("Invalid user data.");
    }

    // TODO: Generate a unique user id and add it to the user data object sent which will be saved to DB
    const newUser = {
      id: Date.now(), // Generate a unique user id
      ...user,
    };
    await this.database.save(newUser);

    return newUser;
  }

  async getUserById(userId) {
    const user = await this.database.find({ id: userId });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }

  async updateUser(userId, newData) {
    const user = await this.getUserById(userId);
    const updatedUser = { ...user, ...newData };
    await this.database.update(updatedUser);

    return updatedUser;
  }

  async deleteUser(userId) {
    const user = await this.getUserById(userId);

    await this.database.remove(user);
  }
}

module.exports = UserService;
