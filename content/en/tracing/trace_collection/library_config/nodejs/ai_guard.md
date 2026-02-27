### AI Guard

`DD_AI_GUARD_ENABLED`
: **Since**: 5.83.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables AI Guard request inspection in the tracer; when disabled, AI Guard checks are skipped.

`DD_AI_GUARD_ENDPOINT`
: **Since**: 5.83.0 <br>
**Type**: `string`<br>
**Default**: N/A<br>
AI Guard: sets the base endpoint URL for the AI Guard REST API. If unset, defaults to `https://app.<DD_SITE>/api/v2/ai-guard` (the tracer appends `/evaluate`).

`DD_AI_GUARD_MAX_CONTENT_SIZE`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `524288`<br>
Max size of the content property set in the meta-struct

`DD_AI_GUARD_MAX_MESSAGES_LENGTH`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `16`<br>
Maximum number of conversational messages allowed to be set in the meta-struct

`DD_AI_GUARD_TIMEOUT`
: **Since**: 5.83.0 <br>
**Type**: `int`<br>
**Default**: `10000`<br>
Timeout used in calls to the AI Guard REST API in milliseconds (default 5000)
