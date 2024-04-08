Enter the name of the Splunk index you want your data in. This has to be an allowed index for your HEC.

The following fields are optional:
1. In the **Encoding** dropdown menu, select whether you want to encode your pipeline's output in `JSON` or `Raw` text encodings. If no decoding is selected, the decoding defaults to JSON.
1.  Select whether the timestamp should be auto-extracted. If set to `true`, Splunk extracts the timestamp from the message text with the expected format of `yyyy-mm-dd hh:mm:ss`.
1. Set the `sourcetype` to override Splunk's default value, which is `httpevent` for HEC data.
