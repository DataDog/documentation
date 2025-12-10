---
title: Syslog Source
disable_toc: false
---

Use Observability Pipelines' rsyslog or syslog-ng to receive logs sent to rsyslog or syslog-ng. Select and set up this source when you [set up a pipeline][1].

You can also [forward third-party log to syslog](#forward-third-party-logs-to-syslog) and then send them to the Observability Pipelines Worker.

## Prerequisites

{{% observability_pipelines/prerequisites/syslog %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

To configure your Syslog source:

1. In the **Socket Type** dropdown menu, select the communication protocol you want to use: **TCP** or **UDP**.
2. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][6] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
   - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509) format.
   - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

## Send logs to the Observability Pipelines Worker over syslog

{{% observability_pipelines/log_source_configuration/syslog %}}

## Forward third-party logs to the Observability Pipelines Worker

Syslog is a widely used logging protocol for sending network logs to a central server. Many network devices support syslog output, so you can forward third-party logs to the Observability Pipelines's syslog source for processing and routing. Examples of these third-party services include:

### Fortinet
- [Configure log forwarding][2]
- [Configuring syslog settings][3]

### Palo Alto Networks
- [Configure log forwarding][4]
- [Forward traffic logs to a syslog server][5]

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[6]: /observability_pipelines/advanced_worker_configurations/