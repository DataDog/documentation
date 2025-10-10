1. Enter your S3 bucket name.
1. Enter the AWS region.
1. Enter the custom source name.
1. Optionally, select an [AWS authentication][10083] option.
    1. Enter the ARN of the IAM role you want to assume.
    1. Optionally, enter the assumed role session name and external ID.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][10082] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

**Notes**:
- When you add the Amazon Security Lake destination, the OCSF processor is automatically added so that you can convert your logs to Parquet before they are sent to Amazon Security Lake. See [Remap to OCSF documentation][10081] for setup instructions.
- Only logs formatted by the OCSF processor are converted to Parquet.

[10081]: /observability_pipelines/processors/remap_ocsf
[10082]: /observability_pipelines/advanced_configurations/
[10083]: /observability_pipelines/destinations/amazon_security_lake/#aws-authentication