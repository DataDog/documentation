To use the CrowdStrike NG-SIEM destination, you need to set up a CrowdStrike data connector using the HEC/HTTP Event Connector. See [Step 1: Set up the HEC/HTTP event data connector][10171] for instructions. When you set up the data connector, you are given a HEC API key and URL, which you use when you configure the Observability Pipelines Worker later on.

1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Optionally, enable compressions and select an algorithm (**gzip** or **zlib**) in the dropdown menu.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][10172] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

[10171]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
[10172]: /observability_pipelines/advanced_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->