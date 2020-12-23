const password = 'XXX'
const user = 'dev'
const clusterName = 'airpoll'

export const dbConnectionUri = `mongodb+srv://${user}:${password}@${clusterName}.rbtfe.mongodb.net/${clusterName}?retryWrites=true&w=majority`