---
title: OpenTelemetry
disable_toc: false
---

## Overview

Use Observability Pipelines' OpenTelemetry (OTel) source to collect logs from your OTel collector through HTTP or gRPC. Select and set up this source when you set up a pipeline. The information below is configured in the pipelines UI.

## Prerequisites

To use Observability Pipelines' OTel source, if your forwarders are globally configured to enable SSL, you need the appropriate TLS certificates and the password you used to create your private key.

## Set up the source in the pipeline UI

Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Configurations][10172] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS #8) format.

## Set the environment variables

TKTK

## Send logs to the Observability Pipelines Worker

TKTK