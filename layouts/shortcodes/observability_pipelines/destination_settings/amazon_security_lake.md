1. Enter your S3 bucket name.
1. Enter the AWS region.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

**Notes**:
- When you add the Amazon Security Lake destination, the OCSF processor is automatically added so that you can convert your logs to Parquet before they are sent to Amazon Security Lake. See [Remap to OCSF documentation][10081] for setup instructions.
- Only logs formatted by the OCSF processor are converted to Parquet.

[10081]: /observability_pipelines/processors/remap_ocsf