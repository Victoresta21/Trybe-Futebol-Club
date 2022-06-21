import * as bcryptjs from 'bcryptjs';
import ILogin from '../Interface/ILogin';
import User from '../database/models/user';
import Uservalidation from '../middleware/userValidation';
import auth from '../auth/token';

class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;

    if (!email) return { status: 400, error: { message: 'All fields must be filled' } };
    if (!password) return { status: 400, error: { message: 'All fields must be filled' } };

    const userData = await User.findOne({ where: { email } });

    if (!userData) return { status: 401, error: { message: 'Incorrect email or password' } };

    const bcryptVerify = await bcryptjs.compare(password, userData.password);
    console.log('bcryptVerify= ', bcryptVerify);
    if (!bcryptVerify) {
      return { status: 401, error: { message: 'Incorrect email or password' } };
    }

    const { token } = auth.generateToken(email, password);

    const userDataAndToken = Uservalidation.buildUserDataAndTokenObject(userData, token);

    return { status: 200, userDataAndToken };
  };

  public validate = async (authorization: string) => {
    const role = await auth.checkToken(authorization);
    if (!role) return { status: 400, error: { message: 'Jwt Check Error' } };
    return { status: 200, role };
  };
}

export default LoginService;
