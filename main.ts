/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Evan M
 * Created on: Jan 2025
 * This program is essentially a roomba with lights and a distance calculator
*/

//variables
let neopixelStrip: neopixel.Strip = null
let distanceToObject = PingUnit.Centimeters
let traveldistance = 0
//cleanup
basic.clearScreen()
basic.showIcon(IconNames.Happy)

//neopixels
neopixelStrip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)

// loop
basic.forever(function () {
    distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters)
        sonar.ping
    if (distanceToObject > 10) {
        //move car forward and make light green
        basic.clearScreen()
        basic.showIcon(IconNames.Yes)
        neopixelStrip.show()
        neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
        neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        neopixelStrip.show()
        robotbit.StpCarMove(10, 30)
        traveldistance = traveldistance + 10
        basic.pause(250)
    } else {
        //move car back and turn 90 degrees with red light
        basic.clearScreen()
        basic.showIcon(IconNames.No)
        neopixelStrip.show()
        neopixelStrip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        neopixelStrip.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        neopixelStrip.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        neopixelStrip.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
        neopixelStrip.show()
        robotbit.StpCarMove(-10, 30)
        traveldistance = traveldistance - 10
        robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B0)
    }
})

//Show Distance Travelled
input.onButtonPressed(Button.B, function() {
    basic.showNumber(traveldistance)
    basic.clearScreen()
    basic.showIcon(IconNames.Happy)
})