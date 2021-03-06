import '../vds-player';
import './vds-fake-consumer';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { Player } from '../Player';
import { MediaType, ViewType } from '../player.types';
import { FakeConsumer } from './FakeConsumer';
import {
  BufferedChangeEvent,
  BufferingChangeEvent,
  DurationChangeEvent,
  ErrorEvent,
  MediaTypeChangeEvent,
  MutedChangeEvent,
  PauseEvent,
  PlaybackEndEvent,
  PlaybackReadyEvent,
  PlaybackStartEvent,
  PlayEvent,
  PlayingEvent,
  ProviderBufferedChangeEvent,
  ProviderBufferingChangeEvent,
  ProviderDurationChangeEvent,
  ProviderErrorEvent,
  ProviderMediaTypeChangeEvent,
  ProviderMutedChangeEvent,
  ProviderPauseEvent,
  ProviderPlaybackEndEvent,
  ProviderPlaybackReadyEvent,
  ProviderPlaybackStartEvent,
  ProviderPlayEvent,
  ProviderPlayingEvent,
  ProviderReadyEvent,
  ProviderTimeChangeEvent,
  ProviderViewTypeChangeEvent,
  ProviderVolumeChangeEvent,
  ReadyEvent,
  TimeChangeEvent,
  ViewTypeChangeEvent,
  VolumeChangeEvent,
} from '../events';
import { spy } from 'sinon';

describe('provider events', () => {
  let container: HTMLDivElement;
  let player: Player;
  let provider: HTMLElement;
  let consumer: FakeConsumer;

  beforeEach(async () => {
    container = await fixture<HTMLDivElement>(html`
      <div id="container">
        <vds-player>
          <div id="fake-provider"></div>
          <vds-fake-consumer></vds-fake-consumer>
        </vds-player>
      </div>
    `);

    player = container.firstElementChild as Player;
    provider = player.firstElementChild as HTMLDivElement;
    consumer = player.querySelector('vds-fake-consumer') as FakeConsumer;
  });

  async function emitProviderUpdate(e: Event) {
    provider.dispatchEvent(e);
  }

  it('should handle play event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPlayEvent()));
    await oneEvent(player, PlayEvent.TYPE);
    expect(consumer.paused).to.equal(false);
  });

  it('should handle pause event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPauseEvent()));
    await oneEvent(player, PauseEvent.TYPE);
    expect(consumer.paused).to.equal(true);
    expect(consumer.isPlaying).to.equal(false);
  });

  it('should handle playing event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPlayingEvent()));
    await oneEvent(player, PlayingEvent.TYPE);
    expect(consumer.paused).to.equal(false);
    expect(consumer.isPlaying).to.equal(true);
  });

  it('should handle muted change event', async () => {
    const muted = true;
    setTimeout(() =>
      emitProviderUpdate(new ProviderMutedChangeEvent({ detail: muted })),
    );
    const { detail } = await oneEvent(player, MutedChangeEvent.TYPE);
    expect(detail).to.equal(muted);
    expect(consumer.muted).to.equal(muted);
  });

  it('should handle volume change event', async () => {
    const volume = 0.75;
    setTimeout(() =>
      emitProviderUpdate(new ProviderVolumeChangeEvent({ detail: volume })),
    );
    const { detail } = await oneEvent(player, VolumeChangeEvent.TYPE);
    expect(detail).to.equal(volume);
    expect(consumer.volume).to.equal(volume);
  });

  it('should handle time change event', async () => {
    const time = 50;
    setTimeout(() =>
      emitProviderUpdate(new ProviderTimeChangeEvent({ detail: time })),
    );
    const { detail } = await oneEvent(player, TimeChangeEvent.TYPE);
    expect(detail).to.equal(time);
    expect(consumer.currentTime).to.equal(time);
  });

  it('should handle duration change event', async () => {
    const duration = 50;
    setTimeout(() =>
      emitProviderUpdate(new ProviderDurationChangeEvent({ detail: duration })),
    );
    const { detail } = await oneEvent(player, DurationChangeEvent.TYPE);
    expect(detail).to.equal(duration);
    expect(consumer.duration).to.equal(duration);
  });

  it('should handle buffered change event', async () => {
    const buffered = 50;
    setTimeout(() =>
      emitProviderUpdate(new ProviderBufferedChangeEvent({ detail: buffered })),
    );
    const { detail } = await oneEvent(player, BufferedChangeEvent.TYPE);
    expect(detail).to.equal(buffered);
    expect(consumer.buffered).to.equal(buffered);
  });

  it('should handle buffering change event', async () => {
    const isBuffering = true;
    setTimeout(() =>
      emitProviderUpdate(
        new ProviderBufferingChangeEvent({ detail: isBuffering }),
      ),
    );
    const { detail } = await oneEvent(player, BufferingChangeEvent.TYPE);
    expect(detail).to.equal(isBuffering);
    expect(consumer.isBuffering).to.equal(isBuffering);
  });

  it('should handle view type (audio) change event', async () => {
    const viewType = ViewType.Audio;
    setTimeout(() =>
      emitProviderUpdate(new ProviderViewTypeChangeEvent({ detail: viewType })),
    );
    const { detail } = await oneEvent(player, ViewTypeChangeEvent.TYPE);
    expect(detail).to.equal(viewType);
    expect(consumer.viewType).to.equal(viewType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudioView).to.equal(true);
    // expect(consumer.isVideoView).to.equal(false);
    // expect(player).to.have.attribute('audio', 'true');
    // expect(player).to.not.have.attribute('video', 'true');
  });

  it('should handle view type (video) change event', async () => {
    const viewType = ViewType.Video;
    setTimeout(() =>
      emitProviderUpdate(new ProviderViewTypeChangeEvent({ detail: viewType })),
    );
    const { detail } = await oneEvent(player, ViewTypeChangeEvent.TYPE);
    expect(detail).to.equal(viewType);
    expect(consumer.viewType).to.equal(viewType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudioView).to.equal(false);
    // expect(consumer.isVideoView).to.equal(true);
    // expect(player).to.not.have.attribute('audio', 'true');
    // expect(player).to.have.attribute('video', 'true');
  });

  it('should handle view type (unknown) change event', async () => {
    const viewType = ViewType.Unknown;
    setTimeout(() =>
      emitProviderUpdate(new ProviderViewTypeChangeEvent({ detail: viewType })),
    );
    const { detail } = await oneEvent(player, ViewTypeChangeEvent.TYPE);
    expect(detail).to.equal(viewType);
    expect(consumer.viewType).to.equal(viewType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudioView).to.equal(false);
    // expect(consumer.isVideoView).to.equal(false);
    // expect(player).to.not.have.attribute('audio', 'true');
    // expect(player).to.not.have.attribute('video', 'true');
  });

  it('should handle media type (audio) change event', async () => {
    const mediaType = MediaType.Audio;
    setTimeout(() =>
      emitProviderUpdate(
        new ProviderMediaTypeChangeEvent({ detail: mediaType }),
      ),
    );
    const { detail } = await oneEvent(player, MediaTypeChangeEvent.TYPE);
    expect(detail).to.equal(mediaType);
    expect(consumer.mediaType).to.equal(mediaType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudio).to.equal(true);
    // expect(consumer.isVideo).to.equal(false);
  });

  it('should handle media type (video) change event', async () => {
    const mediaType = MediaType.Video;
    setTimeout(() =>
      emitProviderUpdate(
        new ProviderMediaTypeChangeEvent({ detail: mediaType }),
      ),
    );
    const { detail } = await oneEvent(player, MediaTypeChangeEvent.TYPE);
    expect(detail).to.equal(mediaType);
    expect(consumer.mediaType).to.equal(mediaType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudio).to.equal(false);
    // expect(consumer.isVideo).to.equal(true);
  });

  it('should handle media type (unknown) change event', async () => {
    const mediaType = MediaType.Unknown;
    setTimeout(() =>
      emitProviderUpdate(
        new ProviderMediaTypeChangeEvent({ detail: mediaType }),
      ),
    );
    const { detail } = await oneEvent(player, MediaTypeChangeEvent.TYPE);
    expect(detail).to.equal(mediaType);
    expect(consumer.mediaType).to.equal(mediaType);
    // TODO: once there's a mock media provider handle testing these.
    // expect(consumer.isAudio).to.equal(false);
    // expect(consumer.isVideo).to.equal(false);
  });

  it('should handle provider ready event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderReadyEvent()));
    await oneEvent(player, ReadyEvent.TYPE);
    expect(consumer.isProviderReady).to.equal(true);
  });

  it('should handle playback ready event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPlaybackReadyEvent()));
    await oneEvent(player, PlaybackReadyEvent.TYPE);
    expect(consumer.isPlaybackReady).to.equal(true);
  });

  it('should handle playback start event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPlaybackStartEvent()));
    await oneEvent(player, PlaybackStartEvent.TYPE);
    expect(consumer.hasPlaybackStarted).to.equal(true);
  });

  it('should handle playback end event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderPlaybackEndEvent()));
    await oneEvent(player, PlaybackEndEvent.TYPE);
    expect(consumer.hasPlaybackEnded).to.equal(true);
  });

  it('should handle error event', async () => {
    setTimeout(() => emitProviderUpdate(new ProviderErrorEvent()));
    await oneEvent(player, ErrorEvent.TYPE);
    // TODO: complete this once the error handler method is done.
  });

  it('should prevent providers events from bubbling by default', async () => {
    const callback = spy();
    container.addEventListener(ProviderPlayEvent.TYPE, callback);

    setTimeout(() => emitProviderUpdate(new ProviderPlayEvent()));
    await oneEvent(player, ProviderPlayEvent.TYPE);

    expect(callback).to.not.have.been.called;
  });

  it('should allow provider events to bubble', async () => {
    const callback = spy();

    player.allowProviderEventsToBubble = true;
    container.addEventListener(ProviderPlayEvent.TYPE, callback);

    setTimeout(() => emitProviderUpdate(new ProviderPlayEvent()));
    await oneEvent(container, ProviderPlayEvent.TYPE);

    expect(callback).to.have.been.called;
  });
});
