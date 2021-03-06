import { buildVdsEvent } from '../../shared/events';
import { PlayerState } from '../player.types';

export const PROVIDER_EVENT_PREFIX = 'provider';

export class ProviderPlayEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-play`,
) {}

export class ProviderPauseEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-pause`,
) {}

export class ProviderPlayingEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-playing`,
) {}

export class ProviderMutedChangeEvent extends buildVdsEvent<
  PlayerState['muted']
>(`${PROVIDER_EVENT_PREFIX}-muted-change`) {}

export class ProviderVolumeChangeEvent extends buildVdsEvent<
  PlayerState['volume']
>(`${PROVIDER_EVENT_PREFIX}-volume-change`) {}

export class ProviderTimeChangeEvent extends buildVdsEvent<
  PlayerState['currentTime']
>(`${PROVIDER_EVENT_PREFIX}-time-change`) {}

export class ProviderDurationChangeEvent extends buildVdsEvent<
  PlayerState['duration']
>(`${PROVIDER_EVENT_PREFIX}-duration-change`) {}

export class ProviderBufferedChangeEvent extends buildVdsEvent<
  PlayerState['buffered']
>(`${PROVIDER_EVENT_PREFIX}-buffered-change`) {}

export class ProviderBufferingChangeEvent extends buildVdsEvent<
  PlayerState['isBuffering']
>(`${PROVIDER_EVENT_PREFIX}-buffering-change`) {}

export class ProviderViewTypeChangeEvent extends buildVdsEvent<
  PlayerState['viewType']
>(`${PROVIDER_EVENT_PREFIX}-view-type-change`) {}

export class ProviderMediaTypeChangeEvent extends buildVdsEvent<
  PlayerState['mediaType']
>(`${PROVIDER_EVENT_PREFIX}-media-type-change`) {}

export class ProviderReadyEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-provider-ready`,
) {}

export class ProviderPlaybackReadyEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-playback-ready`,
) {}

export class ProviderPlaybackStartEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-playback-start`,
) {}

export class ProviderPlaybackEndEvent extends buildVdsEvent<void>(
  `${PROVIDER_EVENT_PREFIX}-playback-end`,
) {}

export class ProviderErrorEvent extends buildVdsEvent<unknown>(
  `${PROVIDER_EVENT_PREFIX}-error`,
) {}

export const ALL_PROVIDER_EVENTS = [
  ProviderPlayEvent,
  ProviderPauseEvent,
  ProviderPlayingEvent,
  ProviderMutedChangeEvent,
  ProviderVolumeChangeEvent,
  ProviderTimeChangeEvent,
  ProviderDurationChangeEvent,
  ProviderBufferedChangeEvent,
  ProviderBufferingChangeEvent,
  ProviderViewTypeChangeEvent,
  ProviderMediaTypeChangeEvent,
  ProviderReadyEvent,
  ProviderPlaybackReadyEvent,
  ProviderPlaybackStartEvent,
  ProviderPlaybackEndEvent,
  ProviderErrorEvent,
];
