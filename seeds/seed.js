const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const userData = require("./userData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced.");

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Users seeded.");

    for (const post of postData) {
      await Post.create({
        ...post,
      });
    }
    console.log("Posts seeded.");

    process.exit(0);
  } catch (err) {
    console.error("Failed to seed database:", err);
    process.exit(1);
  }
};

seedDatabase();