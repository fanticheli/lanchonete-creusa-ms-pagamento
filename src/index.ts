const dotenv = require("dotenv");
dotenv.config();

import { LanchoneteCreusa } from "./api";
import { MongoConnection } from "./external/mongo/mongo";
import { PostgreSQLConnection  } from "./external/postgres/postgree"

// Inicia a conexão com MongoDB
MongoConnection.start()

// Inicia a conexão com o PostGre
const postgresConnection = new PostgreSQLConnection();
postgresConnection.start(); 

const lanchoneteCreusa = new LanchoneteCreusa();
lanchoneteCreusa.start();
