export type EventPayloadMap<P> = {
  readonly [event: string]: P;
};

export type EventPayloadListener<
  M extends EventPayloadMap<P>,
  E extends keyof M,
  P = any
> = (payload: M[E]) => void;

export class Reemitter<M> {
  private readonly listeners: {
    [E in keyof M]?: Set<EventPayloadListener<M, E>>;
  };

  constructor() {
    this.listeners = {};
  }

  on<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void {
    const existingListeners = this.listeners[event] || new Set();
    existingListeners.add(listener);
    this.listeners[event] = existingListeners;
  }

  off<E extends keyof M>(event: E, listener: EventPayloadListener<M, E>): void {
    const existingListeners = this.listeners[event];

    if (existingListeners) {
      existingListeners.delete(listener);
    }
  }

  emit<E extends keyof M>(event: E, payload: M[E]): boolean {
    const existingListeners = this.listeners[event];

    if (existingListeners) {
      existingListeners.forEach(listener => listener(payload));

      return true
    }

    return false;
  }
}