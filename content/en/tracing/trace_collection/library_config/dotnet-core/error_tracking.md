### Error Tracking

`DD_EXCEPTION_REPLAY_AGENTLESS_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables agentless Exception Replay uploads. Default value is false.

`DD_EXCEPTION_REPLAY_AGENTLESS_URL`
: **Type**: `string`<br>
**Default**: N/A<br>
When Agentless mode in Exception Replay is enabled we can use this configuration to force an URL for the intake

`DD_EXCEPTION_REPLAY_CAPTURE_FULL_CALLSTACK_ENABLED`
: **Type**: `boolean`<br>
**Default**: `false`<br>
Configuration key to enable capturing the variables of all the frames in exception call stack. Default value is false.

`DD_EXCEPTION_REPLAY_CAPTURE_MAX_FRAMES`
: **Type**: `int`<br>
**Default**: `4`<br>
Maximum number of frames in a call stack to capture values for.

`DD_EXCEPTION_REPLAY_ENABLED`
: **Aliases**: `DD_EXCEPTION_DEBUGGING_ENABLED`<br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables or disables Exception Replay. Default value is false (disabled).

`DD_EXCEPTION_REPLAY_MAX_EXCEPTION_ANALYSIS_LIMIT`
: **Type**: `int`<br>
**Default**: `100`<br>
Exception Replay: maximum number of exceptions per second to analyze/handle (circuit breaker). When the limit is exceeded, additional exceptions are ignored for that second. Default: 100.

`DD_EXCEPTION_REPLAY_RATE_LIMIT_SECONDS`
: **Type**: `int`<br>
**Default**: `3600`<br>
Interval used to rate-limit exception tracking. Default value is 1h.
