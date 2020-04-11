const { body } = document
let result = '<br/>실행결과<br/>'

const checkMoveCarCondition = () => {
  const MOVE_CAR_CONDITION = 4
  const RANDOM_NUMBER_RANGE = 9
  return Math.floor(Math.random() * RANDOM_NUMBER_RANGE) >= MOVE_CAR_CONDITION ? true : false
}

const makeDescription = (string, parrentElem) => {
  const description = document.createElement('div')
  description.innerHTML = `${string}`
  parrentElem.append(description)
}

const checkCarsNameLength = (carNames) => {
  const MAX_CARNAME_LENGTH = 5
  for (let i = 0; i < carNames.length; i++) {
    if (carNames[i].length > MAX_CARNAME_LENGTH) return false
  }
  return true
}

const makeCars = (cars, carNames) => {
  for (let i = 0; i < carNames.length; i++) {
    cars[i] = new Car(carNames[i])
  }
}

const moveCar = (car) => {
  let printDistance = ''
  if (checkMoveCarCondition()) {
    car.go()
  }
  for (let j = 0; j < car.position; j++) {
    printDistance += '-'
  }
  result += `${car.name} : ${printDistance}<br/>`
}

const getWinner = (cars) => {
  let max = 0
  cars.map((car) => {
    if (car.position > max) max = car.position
  })
  let winner = []

  cars.map((car) => {
    if (max === car.position) winner.push(car.name)
  })

  return winner.join()
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

  if (checkCarsNameLength(carNames) === false) {
    makeDescription('에러! 자동차이름은 5이하로 해야합니다', body)
    return
  }

  let count = countInput.value
  let cars = []

  makeCars(cars, carNames)

  for (let i = 0; i < count; i++) {
    cars.map((car) => {
      moveCar(car)
    })
    result += '<br/>'
  }

  let winner = getWinner(cars)
  result += `${winner}가 최종 우승했습니다.`

  makeDescription(result, body)
})
