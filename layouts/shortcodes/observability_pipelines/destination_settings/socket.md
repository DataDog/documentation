1.  In the **Mode** dropdown menu, select the socket type to use.
1.  In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.
1.  Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    -   `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    -   `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    -   `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
