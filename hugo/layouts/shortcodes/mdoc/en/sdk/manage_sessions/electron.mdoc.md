## Configure the session sample rate

Set `sessionSampleRate` in the main process `init` call to control the percentage of sessions to collect, from `0` to `100`. `0` collects no sessions, and `100` (default) collects all sessions.

```typescript
await init({
  // ...
  sessionSampleRate: 80,
});
```

The main process manages sessions for itself and for the renderer processes that report through it. Sampling options set in the renderer `datadogRum.init` call, including `sessionPersistence`, are ignored.

`sessionReplaySampleRate` and `profilingSampleRate` apply to sampled sessions only. With `sessionSampleRate: 0`, no session records Session Replay or is profiled.

## Session expiration

All RUM events generated during a session, from the main process and the renderer processes, share the same `session.id`. Windows opened before `init` completes send no data, including the interactions that keep the session alive. If end users interact only with such windows, the session expires after 15 minutes of inactivity and no new session starts. For details, see [Troubleshooting][1].

[1]: /real_user_monitoring/reference/troubleshooting/?platform=electron#browser-windows-opened-before-init-completes-are-not-tracked
