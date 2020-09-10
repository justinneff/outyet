const fs = require("fs")
const yaml = require("js-yaml")
exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const ymlDoc = yaml.safeLoad(fs.readFileSync("./content/index.yaml", "utf-8"))
  ymlDoc.forEach(element => {
    createPage({
      path: element.path,
      component: require.resolve(`./src/templates/${element.type}.tsx`),
      context: {
        hashTags: element.hashTags,
        content: element.content,
        links: element.links,
      },
    })
  })
}
