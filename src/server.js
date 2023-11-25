require("dotenv").config();
const app = require("./config/app");
const { connectDB } = require("./config/database");
const PORT = process.env.PORT || 3000;

connectDB().then(
  () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
)