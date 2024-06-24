To configure your Syslog source:

1. In the **Socket Type** dropdown menu, select the communication protocol you want to use: **TCP** or **UDP**.
2. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
   - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.