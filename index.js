import { MongoClient } from "mongodb";

main();

function main() {
  //   createDB(uri, "School");
  //   createCollection(getClient(), "School", "Teachers");
  //   createCollection(getClient(), "School", "Subjects");
  //     deleteCollection(getClient(), "School", "Teachers");
  //   deleteCollection(getClient(), "School", "Subjects");
  const teacher = {
    name: "Codamy",
    year: 2021,
  };
  const teachers = [
    {
      name: "Codamy1",
      year: 2021,
    },
    {
      name: "Codamy2",
      year: 2021,
    },
    {
      name: "Codamy3",
      year: 2021,
    },
    {
      name: "Codamy4",
      year: 2021,
    },
  ];
  const deleteFilter = {
    year: 2021,
  };
  //   addDocument(getClient(), "School", "Teachers", teachers);
  deleteDocument(getClient(), "School", "Teachers", deleteFilter);
}

function getClient() {
  const uri = "mongodb://localhost:27017/";
  return new MongoClient(uri);
}

function createDB(uri, dbName) {
  const dbUri = `${uri}${dbName}`;
  MongoClient.connect(dbUri, (err, db) => {
    console.log("Connected to database");
    db.close();
  });
}

function createCollection(client, dbName, collectionName) {
  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    //*Check if collection already exists
    currentDB
      .listCollections({ name: collectionName })
      .next(function (err, collectionInfo) {
        if (collectionInfo) {
          console.log(
            `Collection with the name ${collectionName} already exists`
          );
          db.close();
        } else {
          currentDB.createCollection(collectionName, function (err, res) {
            if (err) throw err;
            console.log(`Collection created with the name ${collectionName}`);
            db.close();
          });
        }
      });
  });
}

function deleteCollection(client, dbName, collectionName) {
  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    //*Check if collection already exists
    currentDB
      .listCollections({ name: collectionName })
      .next(function (err, collectionInfo) {
        if (collectionInfo) {
          currentDB.collection(collectionName).drop(function (err, res) {
            console.log(`${collectionName} collection was deleted`);
            db.close();
          });
        } else {
          console.log(`${collectionName} does not exist in DB ${dbName}`);
          db.close();
        }
      });
  });
}

function addDocument(client, dbName, collectionName, document) {
  try {
    client.connect(function (err, db) {
      if (err) throw err;
      let currentDB = db.db(dbName);
      //*Check if collection already exists
      currentDB
        .listCollections({ name: collectionName })
        .next(function (err, collectionInfo) {
          if (collectionInfo) {
            if (Array.isArray(document)) {
              currentDB
                .collection(collectionName)
                .insertMany(document, function () {
                  console.log(`Documents inserted Successfully`);
                  db.close();
                });
            } else {
              currentDB
                .collection(collectionName)
                .insertOne(document, function () {
                  console.log(`Document inserted Successfully`);
                  db.close();
                });
            }
          } else {
            console.log(`${collectionName} does not exist in DB ${dbName}`);
            db.close();
          }
        });
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

function deleteDocument(client, dbName, collectionName, filter) {
  try {
    client.connect(function (err, db) {
      if (err) throw err;
      let currentDB = db.db(dbName);
      //*Check if collection already exists
      currentDB
        .listCollections({ name: collectionName })
        .next(function (err, collectionInfo) {
          if (collectionInfo) {
            currentDB
              .collection(collectionName)
              .deleteMany(filter, function () {
                console.log(`Documnets were successfully deleted!`);
                db.close();
              });
          } else {
            console.log(`${collectionName} does not exist in DB ${dbName}`);
            db.close();
          }
        });
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
