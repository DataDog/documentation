Toggle the switch to **Enable TLS**.
- If you are using Secrets Management, enter the identifier for the key pass. See [Set secrets](#set-secrets) for the default used if the field is left blanks.
- The following certificate and key files are required:
  - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER, PEM, or CRT (X.509).
  - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER, PEM, or CERT (X.509).
  - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER, PEM, or CERT (PKCS #8) format.
  - **Notes**:
    - The configuration data directory `/var/lib/observability-pipelines-worker/config/` is automatically appended to the file paths. See [Advanced Worker Configurations][100] for more information.
    - The file must be readable by the `observability-pipelines-worker` group and user.

[100]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
