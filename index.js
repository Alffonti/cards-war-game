let deckId
let computerScore = 0
let playerScore = 0
const cardsContainer = document.getElementById('cards')
const newDeckBtn  = document.getElementById('new-deck')
const drawCardsBtn  = document.getElementById('draw-cards')
const header = document.getElementById('header')
const remaining = document.getElementById('remaining')
const computerScoreEl = document.getElementById('computer-score')
const playerScoreEl = document.getElementById('player-score')

function determineHandWinner(card1, card2) {
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', 
    '10', 'JACK', 'QUEEN', 'KING', 'ACE']
    const card1ValueIndex = cardValues.indexOf(card1.value)
    const card2ValueIndex = cardValues.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        stringResult = 'Computer wins'
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
    } else if (card2ValueIndex > card1ValueIndex) {
        stringResult = 'Player wins'
        playerScore++
        playerScoreEl.textContent = `Player Score: ${playerScore}`
    } else {
        stringResult = 'Draw'
    }
    return stringResult
}

newDeckBtn.addEventListener('click', async () => {
    const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await res.json()
    deckId = data.deck_id
    remaining.textContent = `Remaining Cards: ${data.remaining}` 
})

drawCardsBtn.addEventListener('click', async () => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    remaining.textContent = `Remaining Cards: ${data.remaining}` 
    cardsContainer.children[0].innerHTML = `
        <img src='${data.cards[0].image}' class='card'>
    `
    cardsContainer.children[1].innerHTML = `
    <img src='${data.cards[1].image}' class='card'>
    `
    const winningHandText = determineHandWinner(data.cards[0], data.cards[1])
    header.innerHTML = winningHandText

    if (data.remaining === 0) {
        drawCardsBtn.disabled = true
        const winnerOfGame = computerScore > playerScore ? `Computer won the game`: playerScore > computerScore ? `Player won the game` : `It's a tie game`
        header.innerHTML = winnerOfGame
    }
})