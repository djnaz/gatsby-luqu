const path = require('path')

exports.createPages = async ({ graphql, actions }) => {

const { data } = await graphql(`

query allPosts {
    allWpPost {
        nodes {
          id
          slug
          content
          title
        }
      }
  }

`)

data.allWpPost.nodes.forEach(node => {
    actions.createPage({
        path: node.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: { slug: node.slug, content: node.content, title: node.title }
    })
})

}