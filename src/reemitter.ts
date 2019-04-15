export type EventPayloadMap<P> = {
  readonly [event: string]: P;
};

export type EventPayloadListener<
  M extends EventPayloadMap<P>,
  E extends keyof M,
  P = any
> = (payload: M[E]) => void;

export class Reemitter<M> {
  //{[key in keyof M]: Function[]};
  private readonly listeners: {
    [E in keyof M]?: EventPayloadListener<M, E>[];
  };
  // private readonly listeners: Map<keyof M, EventPayloadListener<M, E>[]>

  constructor() {
    this.listeners = {};
  }

  on<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void {
    const existingListeners = this.listeners[event] || [];
    existingListeners.push(listener);
    this.listeners[event] = existingListeners;
  }

  off<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void {
    
  }

  emit<E extends keyof M>(event: E, payload: M[E]): boolean {
    const existingListeners = this.listeners[event]

    if (existingListeners) {
      existingListeners.forEach(listener => listener(payload));

      return true
    }

    return false;
  }
}