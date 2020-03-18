import User from "./User"

export default interface Fact {
  _id: string
  text: string
  type: string
  user: User
}
