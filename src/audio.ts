/* sound class */
class TSCanvasAudio {
    source: HTMLAudioElement;

    /* overrideable function, called when the playback ends */
    ended = (): void => {};

    constructor (url: string) {
        this.source = new Audio(url);

        this.source.addEventListener('ended', (): void => {
            this.ended();
        });
    }

    /* starts the playback of the sound */
    play = (): void => {
        this.source.play();
    }

    /* pauses the audio where it is */
    pause = (): void => {
        this.source.pause();
    }

    /* change the volume of the playback */
    setVolume = (vol: number): void => {
        this.source.volume = vol/100;
    }
}