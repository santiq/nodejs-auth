import AuthService from '../services/auth';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

export default (app) => {

  app.post('/user/login', async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.Login(email, password);
      return res.status(200).json({ user, token }).end();
    } catch(e) {
      return res.json(e).status(500).end();
    }
  })

  // The middlewares need to be placed this way because they depend upong each other
  app.post('/user/login-as', isAuth, attachCurrentUser, checkRole('admin'), async (req, res) => {
    try {
      const email = req.body.user.email;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LoginAs(email);
      return res.status(200).json({ user, token }).end();
    } catch(e) {
      console.log('Error in login as user: ', e);
      return res.json(e).status(500).end();
    }
  })

  app.post('/user/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body.user;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.SignUp(email, password, name);
      return res.json({ user, token }).status(200).end();
    } catch (e) {
      return res.json(e).status(500).end();
    }
  })

};