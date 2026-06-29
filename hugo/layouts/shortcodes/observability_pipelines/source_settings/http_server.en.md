To configure your HTTP/S Server source, enter the following:

1. Select your authorization strategy.
1. Select the decoder you want to use on the HTTP messages. Your HTTP client logs must be in this format. **Note**: If you select `bytes` decoding, the raw log is stored in the `message` field.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][10172] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

[10172]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->
