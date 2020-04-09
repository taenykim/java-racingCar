const { body } = document
let result = '<br/>실행결과<br/>'

const makeDescription = (string, divElem) => {
  const description = document.createElement('div')
  description.innerHTML = `${string}`
  divElem.append(description)
}

const makeCars = (cars, carNames, distances) => {
  for (let i = 0; i < carNames.length; i++) {
    cars[i] = new Car(carNames[i])
    distances[i] = 0
  }
}

const moveCar = (car, carNames, distances) => {
  let number = Math.floor(Math.random() * 9)
  let printDistance = ''
  if (number >= 4) {
    car.go()
    distances[carNames.indexOf(car.name)]++
  }
  for (let j = 0; j < car.position; j++) {
    printDistance += '-'
  }
  result += `${car.name} : ${printDistance}<br/>`
}

const getWinner = (carNames, distances) => {
  const max = Math.max(...distances)
  let winner = ''

  for (let i = 0; i < carNames.length; i++) {
    if (max === distances[i]) winner += `${carNames[i]},`
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
  let count = countInput.value
  let cars = []
  let distances = []

  makeCars(cars, carNames, distances)

  for (let i = 0; i < count; i++) {
    cars.map((car) => {
      moveCar(car, carNames, distances)
    })
    result += '<br/>'
  }

  let winner = getWinner(carNames, distances)
  result += `${winner.slice(0, winner.length - 1)}가 최종 우승했습니다.`

  makeDescription(result, body)
})
