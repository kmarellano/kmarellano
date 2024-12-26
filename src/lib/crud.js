import connectToDatabase from '@/lib/db/mongoose';

export const getData = async (model, populate) => {
  await connectToDatabase();

  const data = await model.find().populate(populate);
  return data;
};

export const getOneData = async (model, id) => {
  await connectToDatabase();

  const query = typeof id === 'string' ? { _id: id } : id;
  const data = await model.findOne(query);
  return data;
};

export const createData = async (model, data, queryId, schema) => {
  let parsedData = data;
  if (schema) {
    parsedData = schema.parse(data);
  }

  await connectToDatabase();

  const currentDate = Date.now();
  const newData = new model({
    ...parsedData,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  let queryKey = queryId ? { [queryId]: data[queryId] } : {};

  const isExisting = await model.findOne(queryKey);
  if (isExisting) throw new Error('Data already exists');

  await newData.save();
  return {
    message: `${model.modelName} added successfully`,
    id: newData._id,
  };
};

export const updateData = async (model, id, data, schema, opt = {}) => {
  let parsedData = data;
  if (schema) {
    parsedData = schema.partial().parse(data);
  }

  await connectToDatabase();

  const query = typeof id === 'string' ? { _id: id } : id;
  const updatedData = await model.findOneAndUpdate(
    query,
    { ...parsedData, updatedAt: Date.now() },
    { ...opt, new: true }
  );

  return {
    message: `${model.modelName} updated successfully`,
    data: updatedData,
  };
};

export const deleteData = async (model, id) => {
  await connectToDatabase();

  const query = typeof id === 'string' ? { _id: id } : id;
  await model.findOneAndDelete(query);
  return { message: `${model.modelName} deleted successfully` };
};
