### Data Streams

`DD_DATA_STREAMS_BUCKET_DURATION_SECONDS`
: **Since**: 1.54.0 <br>
**Type**: `decimal`<br>
**Default**: `10.0`<br>
Data Streams Monitoring: bucket/flush duration in seconds (aggregation window). Controls how often DSM payloads are reported (scheduled at this interval). Default: 10 seconds.

`DD_DATA_STREAMS_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `false`<br>
Enables Data Streams Monitoring (DSM) and propagation. When enabled, the tracer registers the DSM propagator and reports pathway stats/payloads. Default: false.

`DD_DATA_STREAMS_TRANSACTION_EXTRACTORS`
: **Since**: 1.59.0 <br>
**Type**: `array`<br>
**Default**: N/A<br>
Allows configuring Data Streams extractors for transaction tracking
