const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT); // 옵션 제거
    console.log("DB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // 실패 시 프로세스 종료
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = dbConnect;
