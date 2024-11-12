1. Enter the name of the source project.
1. Enter the path to the Google Developer Service Account Credential JSON file. See [Prerequisites](#prerequisites) for more information.
1. Enter the subscription name.
1. Select the decoder you want to use (Bytes, GELF, JSON, syslog).
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.