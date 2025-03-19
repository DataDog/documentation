To use the CrowdStrike NG-SIEM destination, you need to set up a CrowdStrike data connector using the HEC/HTTP Event Connector. See [Step 1: Set up the HEC/HTTP event data connector][10171] for instructions. When you set up the data connector, you are given a HEC API key and URL, which you use when you configure the Observability Pipelines Worker later on.

1. Select **JSON** or **Raw** encoding in the dropdown menu.
1. Optionally, enable compressions and select an algorithm (**gzip** or **zlib**) in the dropdown menu.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

[10171]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide