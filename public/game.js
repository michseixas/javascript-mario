console.log("entrando en game")
const {Client, Account, Databases, ID, Query } = Appwrite
const projectId = '650c7efaef00065fc312'
const databaseId = '65171acbeabf8bafd51e'
const collectionId = '6517274ab45bc1c5157e' //highscores collection

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const account = new Account(client)
const database = new Databases(client)

console.log("declarando la function register")
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
        ).then(() => { //once we've created the email session, show the game display
            showDisplay()
        })
    }).catch(error => console.error(error))
    event.preventDefault() //prevent form from reloding the page
}

function login(event){

}

function showDisplay (){ // when ShowDisplay is called, the element with id "Modal" is hidden.
    const modalElement = document.getElementById('modal')
    modalElement.classList.add('hidden') 
}
showDisplay ()


//Kaboom game
function startGame (){
    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        clearColor: [0,0,0,1]
    })

    //define speed identifiers:
    const moveSpeed = 120
    const jumpForce = 360
    const bigJumpForce = 550
    let currentJumpForce = jumpForce //la currentJumpForce ya va a iniciar con 360
    const fallDeath = 400
    const enemyDeath = 20


    //Game Logic:
    let isJumping = true


    loadRoot('https://i.imgur.com/')
    loadSprite('coin', 'wbKxhcd.png')
    loadSprite('evil-shroom', 'KPO3fR9.png')
    loadSprite('brick', 'pogC9x5.png')
    loadSprite('block', 'M6rwarW.png') 
    loadSprite('mario', 'Wb1qfhK.png')
    loadSprite('mushroom', '0wMd92p.png')
    loadSprite('surprise', 'gesQ1KP.png')
    loadSprite('unboxed', 'bdrLpi6.png')
    loadSprite('pipe-top-left', 'ReTPiWY.png')
    loadSprite('pipe-top-right', 'hj2GK4n.png')
    loadSprite('pipe-bottom-left', 'c1cYSbt.png')
    loadSprite('pipe-bottom-right', 'nqQ79eI.png')
    loadSprite('blue-block', 'fVscIbn.png')
    loadSprite('blue-brick', '3e5YRQd.png')
    loadSprite('blue-steel', 'gqVoI2b.png')
    loadSprite('blue-evil-mushroom', 'SvV4ueD.png')
    loadSprite('blue-surprise', 'RMqCc1G.png')

    scene("game", ({level, score}) => {
        layers(["bg", "obj", "ui"], "obj")

        const maps = [
            [
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '                                      ',
                '==============================   ====='
            ],
            [

            ]
        ]

    const levelCfg = {
        width: 20, //width and height of images
        height: 20, 
        '=':[sprite('block'), solid()]
    }

    const gameLevel = addLevel(maps[level], levelCfg)
    })

    startGame("game", {level:0, score:0})

}
startGame ()