1. Enter the group ID.
1. Enter the topic name. If there is more than one, click **Add Field** to add additional topics..
1. Optionally, toggle to the switch to enable SASL Authentication and select the mechanism (**PLAIN**, **SCHRAM-SHA-256**, or **SCHRAM-SHA-512**) in the dropdown menu.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Optionally, click **Advanced** and click **Add Option** to add additional librdkafka options.
    a. Select an option in the dropdown menu.
    b. Enter a value for that option.
    c. Check your values against the [librdkafka documentation][10131] to make sure they have the correct type and are within the set range.
    d. Click **Add Option** to add another librdkafka option.

[10131]: https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md