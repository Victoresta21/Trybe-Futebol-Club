import User from '../database/models/user';

class Uservalidation {
  static buildUserDataAndTokenObject(userData: User, token: string) {
    return {
      user: {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        email: userData.email,
      },
      token,
    };
  }
}

export default Uservalidation;
