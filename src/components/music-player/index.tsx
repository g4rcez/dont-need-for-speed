import React from "react";

export class MusicPlayer extends React.Component<any, any> {
  private audioEl: any;
  private listenTracker: any;
  componentDidMount() {
    const audio = this.audioEl;

    this.updateVolume(this.props.volume);

    audio.addEventListener("error", (e: any) => {
      this.props.onError(e);
    });

    audio.addEventListener("canplay", (e: any) => {
      this.props.onCanPlay(e);
    });

    audio.addEventListener("canplaythrough", (e: any) => {
      this.props.onCanPlayThrough(e);
    });

    audio.addEventListener("play", (e: any) => {
      this.setListenTrack();
      this.props.onPlay(e);
    });

    audio.addEventListener("abort", (e: any) => {
      this.clearListenTrack();
      this.props.onAbort(e);
    });

    audio.addEventListener("ended", (e: any) => {
      this.clearListenTrack();
      this.props.onEnded(e);
    });

    audio.addEventListener("pause", (e: any) => {
      this.clearListenTrack();
      this.props.onPause(e);
    });

    audio.addEventListener("seeked", (e: any) => {
      this.props.onSeeked(e);
    });

    audio.addEventListener("loadedmetadata", (e: any) => {
      this.props.onLoadedMetadata(e);
    });

    audio.addEventListener("volumechange", (e: any) => {
      this.props.onVolumeChanged(e);
    });
  }

  setListenTrack() {
    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval;
      this.listenTracker = setInterval(() => {
        this.props.onListen(this.audioEl.currentTime);
      }, listenInterval);
    }
  }

  updateVolume(volume: number) {
    if (typeof volume === "number" && volume !== this.audioEl.volume) {
      this.audioEl.volume = volume;
    }
  }

  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      this.listenTracker = null;
    }
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    );

    const controls = !(this.props.controls === false);

    const title = this.props.title ? this.props.title : this.props.src;

    const conditionalProps = { controlsList: undefined };
    if (this.props.controlsList) {
      conditionalProps.controlsList = this.props.controlsList;
    }

    return (
      <audio
        autoPlay={this.props.autoPlay}
        className={`react-audio-player ${this.props.className}`}
        controls={controls}
        crossOrigin={this.props.crossOrigin}
        id={this.props.id}
        loop={this.props.loop}
        muted={this.props.muted}
        preload={this.props.preload}
        ref={ref => (this.audioEl = ref)}
        src={this.props.src}
        style={this.props.style}
        title={title}
        {...conditionalProps}
      >
        {incompatibilityMessage}
      </audio>
    );
  }
}

//@ts-ignore
MusicPlayer.defaultProps = {
  autoPlay: false,
  children: null,
  className: "",
  controls: false,
  controlsList: "",
  crossOrigin: null,
  id: "",
  listenInterval: 10000,
  loop: false,
  muted: false,
  onAbort: () => {},
  onCanPlay: () => {},
  onCanPlayThrough: () => {},
  onEnded: () => {},
  onError: () => {},
  onListen: () => {},
  onPause: () => {},
  onPlay: () => {},
  onSeeked: () => {},
  onVolumeChanged: () => {},
  onLoadedMetadata: () => {},
  preload: "metadata",
  src: null,
  style: {},
  title: "",
  volume: 1.0
};
