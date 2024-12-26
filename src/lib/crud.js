import { isValidObjectId } from 'mongoose';
import connectToDatabase from '@/lib/db/mongoose';
import { auth } from '@clerk/nextjs/server';

export const getData = async (model, populate, query) => {
  await connectToDatabase();

  // await auth.protect();
  const data = await model
    .find(
      query
        ? { ...query, deletedAt: { $eq: null } }
        : {
            deletedAt: { $eq: null },
          }
    )
    .populate(populate);

  return data;
};

export const getOneData = async (model, id) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectToDatabase();

  const isIdString = typeof id === 'string';
  if (isIdString && !isValidObjectId(id)) {
    throw new Error('Invalid id provided');
  }

  const query = isIdString
    ? { _id: id, deletedAt: { $eq: null } }
    : { ...id, deletedAt: { $eq: null } };

  const data = await model.findOne(query);
  return data;
};

export const createData = async (model, data, queryId, schema) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

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

  if (queryId) {
    const queryKey = { [queryId]: data[queryId] };

    const isExisting = await model.findOne(queryKey);
    if (isExisting) throw new Error('Data already exists');
  }

  await newData.save();
  return {
    message: `${model.modelName} added successfully`,
    id: newData._id,
  };
};

export const updateData = async (model, id, data, schema, opt = {}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  let parsedData = data;
  if (schema) {
    parsedData = schema.partial().parse(data);
  }

  await connectToDatabase();

  const isIdString = typeof id === 'string';
  if (isIdString && !isValidObjectId(id)) {
    throw new Error('Invalid id provided');
  }

  const query = isIdString ? { _id: id } : id;
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
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectToDatabase();

  const isIdString = typeof id === 'string';
  if (isIdString && !isValidObjectId(id)) {
    throw new Error('Invalid id provided');
  }

  const query = isIdString ? { _id: id } : id;
  const d = await model.findOneAndUpdate(query, {
    $set: {
      deletedAt: new Date().toISOString(),
    },
  });
  console.log('hey', d);
  return { message: `${model.modelName} deleted successfully` };
};
