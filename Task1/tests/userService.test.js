const UserService = require("./../src/userService");

// Mock database implementation for testing
class MockDatabase {
  constructor() {
    this.users = [];
  }

  async save(user) {
    this.users.push(user);
  }

  async find(query) {
    return this.users.find((user) => user.id === query.id);
  }

  async update(user) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async remove(user) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

describe("UserService", () => {
  let userService;

  beforeEach(() => {
    const mockDatabase = new MockDatabase();
    userService = new UserService(mockDatabase);
  });

  /* TODO: implement the following test case:
    1. Create User Test Case:
    ----------------------------
    Description: This test case ensures that the createUser method of the userService module correctly creates a new user in the database.
    Input: User data including name and email.
    Expected Output:
    The method should return the newly created user object with a generated unique identifier.
    The user object should contain the provided name and email.
  */
    test("creates a new user", async () => {
      const user = { name: 'Mon3m', email: 'Mon3m@example.com' };
      const newUser = await userService.createUser(user);
      expect(newUser).toHaveProperty('id');
      expect(newUser.name).toBe(user.name);
      expect(newUser.email).toBe(user.email);
    });

  /* TODO: implement the following test case:
    2. Invalid User Data Test Case:
    -------------------------------
    Description: This test case verifies that the createUser method throws an error when provided with invalid user data.
    Input: User data with missing name or email.
    Expected Output:
    The method should throw an error indicating invalid user data.
  */
    test("throws an error when creating a user with invalid data", async () => {
      const user = { name: '', email: '' };
      await expect(userService.createUser(user)).rejects.toThrow('Invalid user data.');
    });

  /* TODO: implement the following test case:
    3. Get User by ID Test Case:
    -------------------------------
    Description: This test case ensures that the getUserById method retrieves the correct user from the database based on the provided user ID.
    Input: User ID of an existing user.
    Expected Output:
    The method should return the corresponding user object.
  */
    test("gets an existing user by ID", async () => {
      const user = { id: '1', name: 'Mon3em', email: 'Mon3m@example.com' };
      await userService.createUser(user);
      const retrievedUser = await userService.getUserById('1');
      expect(retrievedUser).toEqual(user);
    });
  /* TODO: implement the following test case:
    4. Non-existent User ID Test Case:
    -------------------------------
    Description: This test case verifies that the getUserById method throws an error when provided with a non-existent user ID.
    Input: User ID that does not exist in the database.
    Expected Output:
    The method should throw an error indicating that the user was not found.
  */
    test("throws an error when getting a user with invalid ID", async () => {
      await expect(userService.getUserById('1')).rejects.toThrow('User not found.');
    });

  /* TODO: implement the following test case:
    5. Update User Test Case:
    -------------------------------
    Description: This test case ensures that the updateUser method correctly updates the data of an existing user in the database.
    Input: User ID of an existing user and new data to be updated.
    Expected Output:
    The method should return the updated user object with the new data applied.
  */
    test("updates an existing user", async () => {
      const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
      await userService.createUser(user);
      const updatedUser = await userService.updateUser('1', { name: 'Jane Doe' });
      expect(updatedUser.name).toBe('Jane Doe');
    });

  /* TODO: implement the following test case:
    6. Delete User Test Case:
    -------------------------------
    Description: This test case verifies that the deleteUser method successfully removes an existing user from the database based on the provided user ID.
    Input: User ID of an existing user.
    Expected Output:
    The user should be removed from the database.
  */
    test("deletes an existing user", async () => {
      const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
      await userService.createUser(user);
      await userService.deleteUser('1');
      await expect(userService.getUserById('1')).rejects.toThrow('User not found.');
    });
});
