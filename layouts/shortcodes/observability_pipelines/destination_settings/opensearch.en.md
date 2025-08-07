1. Optionally, enter the name of the OpenSearch index. See [template syntax][10051] if you want to route logs to different indexes based on specific fields in your logs.
1. Optionally, toggle the switch to enable **Buffering Options** (in Preview). If left disabled, the maximum size for buffering is 500 events. If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

[10051]: /observability_pipelines/destinations/#template-syntax