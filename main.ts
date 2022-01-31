function stop () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    radio.sendValue("stop", 1)
}
input.onButtonPressed(Button.A, function () {
    running = 1
    start()
})
input.onButtonPressed(Button.B, function () {
    running = 0
    stop()
})
function start () {
    while (running == 1) {
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
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
let running = 0
let sensitivity = 0
radio.setGroup(1)
sensitivity = 200
music.setVolume(24)
