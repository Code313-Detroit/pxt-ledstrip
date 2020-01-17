//% weight=10 color=#fa3b3b icon="\uf008" block="ledStrip"
namespace ledStrip {
    // Define
    let numofLeds = 20
    let leds: number[] = []
    let garbage: number[] = []
    leds = [3 * numofLeds]
    garbage = [3 * numofLeds]
    pins.spiFrequency(10 * 1000 * 1000)
    pins.spiMode(0)

    export enum Color {
        //% block=Blue
        Blue = 1,
        //% block=red
        Red = 2,
        //% block=Green
        Green = 3,
        //% block=purple
        Purple = 4,
        //% block=yellow
        Yellow = 5,
        //% block=cyan
        Cyan = 6,
        //% block=orange
        Orange = 7,
        //% block=white
        White = 10
    }
    export function ClearLed() {
        for (let i = 0; i <= numofLeds * 3 - 1; i++) {
            leds[i] = (0x80 | 0)
        }
    }
    //Sets LED on and corects the position of the byte
    export function ledset(pixelPosition: number, color: number) {
        if (pixelPosition <= numofLeds) {
            //Blue
            if (color == 1) {
                leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 100;
            }
            //Red
            else if (color == 2) {
                leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 100;
            }
            //Green
            else if (color == 3) {
                leds[(pixelPosition - 1) * 3 + 2] = 0x80 | 100;
            }
            //Purple
            else if (color == 4) {
                leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 100;
                leds[(pixelPosition - 1) * 3 + 2] = 0x80 | 100;
            }
            //Yellow
            else if (color == 5) {
                leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 100;
                leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 100;
            }
            //Cyan
            else if (color == 6) {
                leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 100;
                leds[(pixelPosition - 1) * 3 + 2] = 0x80 | 100;
            }
            //White
            else if (color == 10) {
                leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 100;
                leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 100;
                leds[(pixelPosition - 1) * 3 + 2] = 0x80 | 100;
            }
            //Orange
            else if (color == 7) {
                leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 100 //r;
                leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 50 //g;

            }
        }
    }
    //Set certain LED off
    export function SetLEDoff(pixelPosition: number) {
        leds[(pixelPosition - 1) * 3 + 0] = 0x80 | 0;
        leds[(pixelPosition - 1) * 3 + 1] = 0x80 | 0;
        leds[(pixelPosition - 1) * 3 + 2] = 0x80 | 0;
    }
    export function SendBuffer() {
        let ledbuf = pins.createBufferFromArray(leds)
        let garb = pins.createBufferFromArray(garbage)
        for (let j = 0; j < 3 * (numofLeds + 63) / 64; j++) {
            pins.spiWrite(0)
        }
        pins.spiTransfer(ledbuf, garb)
    }

    //% block="Set led %pixel to %color"
    //% gesture.fieldOptions.width=230
    //% gesture.fieldOptions.columns=8
    //% pixel.defl=1
    export function SetLed(pixel: number, color: Color) {
        //Set Specified LED on and to a color. 
        clearpixel(pixel)
        ledset(pixel, color)
        SendBuffer()

    }
    //% block="Clear all leds"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=8
    export function clear() {
        ClearLed()
        SendBuffer()


    }
    //% block="Clear led %pixel"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=8
    //% pixelPosition.defl=1
    export function clearpixel(pixelPosition: number) {
        SetLEDoff(pixelPosition)
        SendBuffer()
    }
    //% block="Set max LED length to %length"
    //% gesture.fieldOptions.width=220
    //% gesture.fieldOptions.columns=8
    //% length.defl=20
    export function LEDLength(length: number) {
        numofLeds = length
    }
}
ledStrip.clear()
