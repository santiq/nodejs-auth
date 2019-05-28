import ItemModel from '../models/item';

export default class ItemsService {
  constructor() { }

  public async GetMyItems(user): Promise<any[]> {
    return ItemModel.find({ owner: user._id }).populate({ path: 'owner', select: '-password -salt' }).exec();
  }

  public async GetItem(itemId: string, user): Promise<any[]> {
    return ItemModel.findOne({ _id: itemId, owner: user._id }).populate({ path: 'owner', select: '-password -salt' });
  }

  public async Create(itemDTO, user): Promise<any[]> {
    const item = {
      ...itemDTO,
      owner: user._id,
    }

    return ItemModel.create(item).populate({ path: 'owner', select: '-password -salt' });
  }

  public async Update(itemId, itemDTO, user): Promise<any[]> {
    const item = {
      ...itemDTO,
      _id: itemId,
      owner: user._id,
    }
    return ItemModel.findOneAndUpdate({ _id: itemId, owner: user._id }, item, { new: true }).populate({ path: 'owner', select: '-password -salt' });
  }
  public async Remove(itemId, user): Promise<any[]> {
    return ItemModel.remove({ _id: itemId, owner: user._id }).exec();
  }

}