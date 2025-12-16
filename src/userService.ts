/**
 * Interface for a user profile
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
}

/**
 * Service for managing user profiles
 */
export class UserService {
  private users: Map<string, UserProfile> = new Map();

  /**
   * Creates a new user profile
   * @param profile - The user profile to create
   * @returns The created user profile
   */
  createUser(profile: UserProfile): UserProfile {
    this.users.set(profile.id, profile);
    return profile;
  }

  /**
   * Retrieves a user by ID
   * @param id - The user ID
   * @returns The user profile if found, undefined otherwise
   */
  getUser(id: string): UserProfile | undefined {
    return this.users.get(id);
  }

  /**
   * Updates a user profile
   * @param id - The user ID
   * @param updates - Partial user profile updates
   * @returns The updated user profile
   * @throws Error if user not found
   */
  updateUser(id: string, updates: Partial<UserProfile>): UserProfile {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  /**
   * Deletes a user by ID
   * @param id - The user ID
   * @returns True if user was deleted, false if not found
   */
  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  /**
   * Gets all users
   * @returns Array of all user profiles
   */
  getAllUsers(): UserProfile[] {
    return Array.from(this.users.values());
  }
}
