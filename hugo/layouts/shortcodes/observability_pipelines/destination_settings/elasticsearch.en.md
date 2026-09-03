The following fields are optional:

1. Enter the name for the Elasticsearch index. See [template syntax][10051] if you want to route logs to different indexes based on specific fields in your logs.
1. Enter the Elasticsearch version.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

[10051]: /observability_pipelines/destinations/#template-syntax