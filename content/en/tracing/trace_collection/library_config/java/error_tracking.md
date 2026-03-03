### Error Tracking

`DD_EXCEPTION_REPLAY_CAPTURE_INTERMEDIATE_SPANS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Exception Replay: when enabled (default), allows Exception Replay to handle exceptions on non-root spans as well as local root spans. When disabled, exceptions are captured only on local root spans (unless overridden by other root-only settings). Default: true.

`DD_EXCEPTION_REPLAY_CAPTURE_INTERVAL_SECONDS`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `3600`<br>
Exception Replay: minimum interval in seconds between capturing the same exception fingerprint again. Used to rate-limit repeated captures of identical exceptions. Default: 3600 seconds.

`DD_EXCEPTION_REPLAY_CAPTURE_MAX_FRAMES`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `0`<br>
Exception Replay (legacy): deprecated alias for `DD_EXCEPTION_REPLAY_MAX_FRAMES_TO_CAPTURE`. Sets the maximum number of stack frames (non-native, non-excluded, with line numbers) to instrument/capture per exception. Default: 3.

`DD_EXCEPTION_REPLAY_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Exception Replay (Live Debugging): enables the Exception Replay product. When enabled (for example via Remote Config), the tracer starts/stops the Exception Replay subsystem. This key is also accepted as a backward-compatible alias for `DD_EXCEPTION_DEBUGGING_ENABLED`.

`DD_EXCEPTION_REPLAY_MAX_EXCEPTION_ANALYSIS_LIMIT`
: **Since**: 1.54.0 <br>
**Type**: `int`<br>
**Default**: `100`<br>
Exception Replay: maximum number of exceptions per second to analyze/handle (circuit breaker). When the limit is exceeded, additional exceptions are ignored for that second. Default: 100.

`DD_EXCEPTION_REPLAY_MAX_FRAMES_TO_CAPTURE`
: **Since**: 1.54.0 <br>
**Aliases**: `DD_EXCEPTION_REPLAY_CAPTURE_MAX_FRAMES`<br>
**Type**: `int`<br>
**Default**: `3`<br>
Exception Replay: maximum number of stack frames (non-native, non-excluded, with line numbers) to instrument/capture per exception when creating exception probes. Default: 3.
