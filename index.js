const https = require("https");
const url = "https://dragonball-api.com/api/characters";


const getDataWithCallback = (cb) => {
  https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => data += chunk);
    res.on("end", () => cb(null, JSON.parse(data)));
  }).on("error", (err) => cb(err, null));
};


const getDataWithPromise = () => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", (err) => reject(err));
  });
};


const getDataWithAsyncAwait = async () => {
  const data = await getDataWithPromise();
  return data;
};



console.log("Callback Example:");
getDataWithCallback((err, result) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log(result); 
  }

  console.log("\nPromise Example:");
  getDataWithPromise()
    .then((result) => {
      console.log(result);

      console.log("\nAsync/Await Example:");
      return getDataWithAsyncAwait();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log("Error:", err));
});
