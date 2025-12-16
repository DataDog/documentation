---
title: Logstash Source
disable_toc: false
---

Use Observability Pipelines' Logstash source to receive logs from your Logstash agent. Select and set up this source when you [set up a pipeline][1].

You can also use the Logstash source to [send logs to Observability Pipelines using Filebeat][2].

## Prerequisites

{{% observability_pipelines/prerequisites/logstash%}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

- Enter the identifier for your Logstash address.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
    - If left blank, the default is used: `SOURCE_LOGSTASH_ADDRESS`.

### Optional settings

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][3] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Logstash key pass.
    - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
    - If left blank, the default is used: `SOURCE_LOGSTASH_KEY_PASS`.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

## Send logs to the Observability Pipelines Worker over Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/sources/filebeat/
[3]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/