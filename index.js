const fs = require("fs");
const csv = require("csvtojson");
const axios = require("axios").default;
const instance = axios.create({
  baseURL: "https://biit.cs.ut.ee/gprofiler/api/orth/orth/",
  timeout: 1000,
});

const main = async () => {
  const filename = `${__dirname}/files/ARCstela_results2.csv`;
  const result = await csv().fromFile(filename);
  const filter = result.filter(insignificantValue);
  const array = filter.map((object) => {
    return object.external_gene_name;
  });

  const request = await axios.post(
    "https://biit.cs.ut.ee/gprofiler/api/orth/orth/",
    {
      organism: "rnorvegicus",
      target: "mmusculus",
      query: array,
    }
  );

  console.log(array);
};

function insignificantValue(value) {
  return value.padj !== "NA" && Number(value.padj) <= 0.05;
}
main();
