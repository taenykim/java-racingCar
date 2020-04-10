const { body } = document
let result = '<br/>실행결과<br/>'

const makeDescription = (string, parrentElem) => {
  const description = document.createElement('div')
  description.innerHTML = `${string}`
  parrentElem.append(description)
}

const checkCarsNameLength = (carNames) => {
  const MAX_CARNAME_LENGTH = 5
  let errorCheck = false

  for (let i = 0; i < carNames.length; i++) {
    if (carNames[i].length > MAX_CARNAME_LENGTH) errorCheck = true
  }
  return errorCheck
}

const makeCars = (cars, carNames, carDistances) => {
  for (let i = 0; i < carNames.length; i++) {
    cars[i] = new Car(carNames[i])
    carDistances[i] = 0
  }
}

const moveCar = (car, carNames, carDistances) => {
  const RANDOM_NUMBER_RANGE = 9
  const MOVE_CAR_CONDITION = 4
  let number = Math.floor(Math.random() * RANDOM_NUMBER_RANGE)
  let printDistance = ''
  if (number >= MOVE_CAR_CONDITION) {
    car.go()
    carDistances[carNames.indexOf(car.name)]++
  }
  for (let j = 0; j < car.position; j++) {
    printDistance += '-'
  }
  result += `${car.name} : ${printDistance}<br/>`
}

const getWinner = (carNames, carDistances) => {
  const max = Math.max(...carDistances)
  let winner = ''

  for (let i = 0; i < carNames.length; i++) {
    if (max === carDistances[i]) winner += `${carNames[i]},`
  }
  return winner
}

const form = document.createElement('form')
body.append(form)

makeDescription('경주할 자동차이름을 입력하세요. (이름은 쉼표(,)기준으로 구분) ', form)

const carNamesInput = document.createElement('input')
carNamesInput.type = 'text'
carNamesInput.style.width = '500px'
form.append(carNamesInput)

makeDescription('시도할 횟수는 몇회인가요?', form)

const countInput = document.createElement('input')
countInput.type = 'text'
form.append(countInput)

const button = document.createElement('button')
button.type = 'submit'
button.textContent = '입력!'
form.append(button)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let carNames = carNamesInput.value.split(',')

  if (checkCarsNameLength(carNames) === true) {
    makeDescription('에러! 자동차이름은 5이하로 해야합니다', body)
    return
  }
  let carDistances = []
  let count = countInput.value
  let cars = []

  makeCars(cars, carNames, carDistances)

  for (let i = 0; i < count; i++) {
    cars.map((car) => {
      moveCar(car, carNames, carDistances)
    })
    result += '<br/>'
  }

  let winner = getWinner(carNames, carDistances)
  result += `${winner.slice(0, winner.length - 1)}가 최종 우승했습니다.`

  makeDescription(result, body)
})
