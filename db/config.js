import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    const conect = await mongoose.connect(process.env.MONGO_UR, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `mongodb conncté avec success a l'adresse ${conect.connection.host} `
    );
  } catch (error) {
    console.log(`Erreur:${error.message}`);

    process.exit(1);
  }
};

export default connectDb;
