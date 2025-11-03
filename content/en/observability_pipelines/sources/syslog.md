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

{{% observability_pipelines/source_settings/syslog %}}

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