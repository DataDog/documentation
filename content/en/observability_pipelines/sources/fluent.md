---
title: Fluentd and Fluent Bit Sources
disable_toc: false
---

Use Observability Pipelines' Fluentd or Fluent Bit source to receive logs from the your Fluentd or Fluent Bit agent. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/fluent %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below are for the source settings in the pipeline UI.

Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/fluent %}}

## Send logs to the Observability Pipelines Worker over Fluent

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/advanced_configurations/