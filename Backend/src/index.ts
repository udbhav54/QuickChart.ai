import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// connections and listeneres

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server Open & Connected To Database"));
  })
  .catch((err) => console.log(err));
