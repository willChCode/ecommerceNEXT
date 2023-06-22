import { Product } from '@/models/Product';
import dataBase from '@/utils/db';

const handler = async (req, res) => {
  await dataBase.connect();
  const product = await Product.findById(req.query.id);
  await dataBase.disconnect();
  res.send(product);
};
export default handler;
