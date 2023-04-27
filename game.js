//variaveis globais

let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let gameStarted = false
let level = 0

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = [] // reset userClickedPattern for the next level
    level++ // incrementa o level em 1
    $("#level-title").text(`Level ${level}`) // atualiza o texto do cabeçalho

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currentColour) {
    let botao = $(`#${currentColour}`)
    botao.addClass("pressed")
    setTimeout(function () {
        botao.removeClass("pressed")
    }, 100)
}

// inicio do game

$(document).keydown(function (event) {
    if (!gameStarted) {
        gameStarted = true
        $("#level-title").text(`Level ${level}`)
        nextSequence()
    }
})

// checa o nível atual - mensagem quando erra

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        let audioWrong = new Audio("sounds/wrong.mp3")
        audioWrong.play()
        let gameOver = $("body")
        gameOver.addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(function () {
            gameOver.removeClass("game-over")
        }, 200)
        startOver()
    }
}

//reset - game over

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
}