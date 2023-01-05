import { gql } from "apollo-server-express";

const typeDefs = gql`
type Product {
    _id: ID,
    title: String,
    price: String,
    description: String,
    image: String,
    stock: String
}

type Query {
    hello: String
}
`

export default typeDefs