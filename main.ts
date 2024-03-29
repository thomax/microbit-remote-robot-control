function stop () {
    running = false
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    radio.sendValue("running", 0)
}
input.onButtonPressed(Button.A, function () {
    start()
    music.playMelody("C C5 - - - - - - ", 268)
})
input.onButtonPressed(Button.B, function () {
    stop()
    music.playMelody("C5 C - - - - - - ", 268)
})
function start () {
    running = true
    radio.sendValue("running", 1)
}
function updateStatus () {
    basic.clearScreen()
    led.plot(2, 2)
    if (forward < -700) {
        led.plot(2, 4)
    }
    if (forward < -200) {
        led.plot(2, 3)
    }
    if (forward > 200) {
        led.plot(2, 1)
    }
    if (forward > 700) {
        led.plot(2, 0)
    }
    if (turn < -700) {
        led.plot(0, 2)
    }
    if (turn < -200) {
        led.plot(1, 2)
    }
    if (turn > 200) {
        led.plot(3, 2)
    }
    if (turn > 700) {
        led.plot(4, 2)
    }
}
let turn = 0
let forward = 0
let running = false
radio.setGroup(91)
let sensitivity = 200
basic.forever(function () {
    if (running) {
        forward = input.acceleration(Dimension.Y) * -1
        turn = input.acceleration(Dimension.X)
        updateStatus()
        if (Math.abs(forward) > sensitivity) {
            radio.sendValue("forward", forward)
        }
        if (Math.abs(turn) > sensitivity) {
            radio.sendValue("turn", turn)
        }
    }
})
