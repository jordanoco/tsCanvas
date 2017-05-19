/**
 * Represents a sound to be played
 * @constructor
 * @param {string} url the url to get the sound from
 */
class TSCanvasAudio {
    source: HTMLAudioElement;

    /**
     * Fired when the sound finishes playing
     */
    ended = (): void => {};

    constructor (url: string) {
        this.source = new Audio(url);

        this.source.addEventListener('ended', (): void => {
            this.ended();
        });
    }

    /**
     * Starts playing the sound
     */
    play = (): void => {
        this.source.play();
    }

    /**
     * Pauses the sound
     */
    pause = (): void => {
        this.source.pause();
    }

    /**
     * Sets the volume to play the sound at
     * @param {number} volume the volume of the sound from 0 to 100
     */
    setVolume = (vol: number): void => {
        this.source.volume = vol/100;
    }
}