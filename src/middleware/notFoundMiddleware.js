const path = require("path");
const { NotFoundError } = require("../utils/errors");

exports.notFoundMiddleware = (req, res) => {
  //kontrollerar att det börjar med api
  const isApiPath = req.path.startsWith("/api/");

  // om path stämmer skapas ett nytt error och meddelandet skickas
  if (isApiPath) throw new NotFoundError("That endpoint does not exist");

  //om path inte börjar med api hamnar vi här och skickar status kod och filvägen som har försökt användas
  return res.status(404).sendFile(path.join(__dirname));
};
