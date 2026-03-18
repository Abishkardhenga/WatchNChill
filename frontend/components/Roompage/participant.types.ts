export type Participant = {
  id: string
  name: string
  role: "Host" | "Guest"
  isYou?: boolean
  online?: boolean
}
