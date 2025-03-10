import DataUrlParser from "datauri/parser.js";
import path from "path";

const getDataURL = (file) => {
  const parser = new DataUrlParser();

  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataURL;
