import { Product } from '@/models/Product';
const { User } = require('@/models/User');
const { default: data } = require('@/utils/data');
import dataBase from '@/utils/db';

const handler = async (req, res) => {
  // console.log(data);
  await dataBase.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await dataBase.disconnect();
  res.send({ message: 'seeded sucessfully!' });
};
export default handler;
