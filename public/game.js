console.log("esta entrando en game")
const {Client, Account, Databases, ID, Query } = Appwrite
const projectId = '650c7efaef00065fc312'
const databaseId = '65171acbeabf8bafd51e'
const collectionId = '65171af5c931b1f3888e' //highscores collection

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const account = new Account(client)
const database = new Databases(client)

console.log("esta declarando la function register")
function register(event) {
    console.log("que hay en register")
    account.create(
        ID.unique(),
        event.target.elements['register-email'].value,
        event.target.elements['register-password'].value,
        event.target.elements['register-username'].value
    ).then(response => {
        console.log('this is the response', response)
        database.createDocument( //method from appwrite specific to create the database object. First create document
            databaseId,
            collectionId,
            response.$id,
            {
                "userId": response.$id,
                "highscore": 0
            }

        ) 

        account.createEmailSession( //then create email session
            event.target.elements['register-email'].value,
            event.target.elements['register-password'].value,

        )
    }).catch(error => console.error(error))
    event.preventDefault() //prevent form from reloding the page
}