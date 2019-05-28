import UserModel from '../models/user';

export default async (req, res, next) => {
  try {
    const decodedUser = req.token.data;
    const user = await UserModel.findOne({ _id: decodedUser._id });
    if (!user) {
      res.status(401).end();
    }
    req.currentUser = user;
    return next();
  } catch(e) {
    return res.json(e).status(500);
  }
}