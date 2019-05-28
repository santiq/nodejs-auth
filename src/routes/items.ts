import ItemsService from '../services/items';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';


export default (app) => {
  app.get('/item/', isAuth, attachCurrentUser, async (req, res) => {
    try {
      const user = req.currentUser;
      const itemServiceInstance = new ItemsService();
    
      const items = await itemServiceInstance.GetMyItems(user);
      return res.json(items).status(200);
    } catch (e) {
      return res.json(e).status(500);
    }
  })

  app.get('/item/:id', isAuth, attachCurrentUser, async (req, res) => {
    try {
      const user = req.currentUser;
      const itemId = req.params.id;

      const itemServiceInstance = new ItemsService();
      
      const items = await itemServiceInstance.GetItem(itemId, user);
      return res.json(items).status(200);
    } catch (e) {
      return res.json(e).status(500);
    }
  })

  app.post('/item/', isAuth, attachCurrentUser, async (req, res) => {
    try {
      const user = req.currentUser;
      const itemDTO = req.body.item;
      const itemServiceInstance = new ItemsService();
      const item = await itemServiceInstance.Create(itemDTO, user);
      return res.json(item).status(201);
    } catch(e) {
      return res.json(e).status(500);
    }
  })

  app.put('/item/:id', isAuth, attachCurrentUser, async (req, res) => {
    try {
      const user = req.currentUser;
      const itemDTO = req.body.item;
      const itemId = req.params.id;
    
      const itemServiceInstance = new ItemsService();
      const itemUpdated = await itemServiceInstance.Update(itemId, itemDTO, user);

      return res.json(itemUpdated).status(200);
    } catch (e) {
      return res.json(e).status(500);
    }

  })
  app.delete('/item/:id', isAuth, attachCurrentUser, async (req, res) => {
    try {
      const user = req.currentUser;
      const itemId = req.params.id;  
      const itemServiceInstance = new ItemsService();
      await itemServiceInstance.Remove(itemId, user);

      return res.json('ok').status(200);
    } catch (e) {
      return res.json(e).status(500);
    }
  })
};