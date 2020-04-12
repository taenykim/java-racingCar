# java-racingCar

자동차경주 게임 저장소

https://taenykim.github.io/java-racingCar/

## 구현해야할 기능 목록

자동차들 생성 : `makeCars(cars, carNames)`

자동차 이동 : `moveCar(car)`

우승자 찾기 : `getWinner(cars)`

자동차 이름 5이하 체크 : `checkCarsNameLength(carNames)`

자동차 이동유무 판단 : `checkMoveCarCondition()`

## 🖌 memo

### 1. 중복된 기능 피하기

기존에 자동차 객체 `car` 내부 `position` 값이 있으면서도 자동차의 이동한 거리를 전역에 `carDistances` 배열에 따로 저장했었다.

> bad...!

```js
let carDistances = []
// ...
moveCar(car, carNames, carDistances)
```

> getWinner 함수에서도 불필요하게 `carDistances` 배열을 받아야한다.

```js
const getWinner = (carNames, carDistances) => {
  const max = Math.max(...carDistances)
  let winner = ''

  for (let i = 0; i < carNames.length; i++) {
    if (max === carDistances[i]) winner += `${carNames[i]},`
  }
  return winner
}
```

하지만 배열 대신 `car.position` 을 사용하면 코드도 깔끔해지고 불필요한 메모리 낭비를 막을 수 있다.

> good 👍

```js
// ...
moveCar(car)
```

```js
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
```

쓸데없는 중복은 꼭 피하고 기존 기능을 잘 활용할 것!

### 2. return, break, continue (끊어주기)

자동차이름 5글자 초과인지 검사하는 함수에서 기존의 코드는 반복문을 돌면서 조건을 만족하면 `errorCheck` 변수를 바꾸도록 했었다. 근데 해당 코드는 중간에 조건이 만족하여도 무조건 반복문을 마쳐야 한다.

> bad...!

```js
const checkCarsNameLength = (carNames) => {
  const MAX_CARNAME_LENGTH = 5
  let errorCheck = true

  for (let i = 0; i < carNames.length; i++) {
    if (carNames[i].length > MAX_CARNAME_LENGTH) errorCheck = false
  }
  return errorCheck
}
```

조건을 만족했을 때 바로 값을 return 하도록 바꿨더니 변수를 쓰지않아도 되고, 에러시, 반복문도 전부 탐색하지 않아도 되었다.

> good 👍

```js
const checkCarsNameLength = (carNames) => {
  const MAX_CARNAME_LENGTH = 5
  for (let i = 0; i < carNames.length; i++) {
    if (carNames[i].length > MAX_CARNAME_LENGTH) return false
  }
  return true
}
```
