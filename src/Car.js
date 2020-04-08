class Car {
  name
  position = 0

  constructor(name) {
    this.name = name
  }
  go() {
    this.position = this.position + 1
  }
  // 추가 기능 구현
}
