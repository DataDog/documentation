<div class="alert alert-danger">Observability Pipelines compresses logs with the gzip (level 6) algorithm.</div>

The following fields are optional:
1. Enter the name of the Splunk index you want your data in. This has to be an allowed index for your HEC. See [template syntax][10051] if you want to route logs to different indexes based on specific fields in your logs.
1.  Select whether the timestamp should be auto-extracted. If set to `true`, Splunk extracts the timestamp from the message with the expected format of `yyyy-mm-dd hh:mm:ss`.
1. Optionally, set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data. See [template syntax][10051] if you want to route logs to different source types based on specific fields in your logs.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

[10051]: /observability_pipelines/destinations/#template-syntax