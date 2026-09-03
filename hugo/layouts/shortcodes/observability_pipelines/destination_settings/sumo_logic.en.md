The following fields are optional:

1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in `JSON`, `Logfmt`, or `Raw` text. If no decoding is selected, the decoding defaults to JSON.
1. Enter a **source name** to override the default `name` value configured for your Sumo Logic collector's source.
1. Enter a **host name** to override the default `host` value configured for your Sumo Logic collector's source.
1. Enter a **category name** to override the default `category` value configured for your Sumo Logic collector's source.
1. Click **Add Header** to add any custom header fields and values.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.
