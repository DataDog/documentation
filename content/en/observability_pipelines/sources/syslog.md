---
title: Syslog Source
disable_toc: false
---

Use Observability Pipelines' Rsyslog or Syslog-ng to receive logs sent to Rsyslog or Syslog-ng. Select and set up this source when you [set up a pipeline][1].

### Prerequisites

{{% observability_pipelines/prerequisites/syslog %}}

### Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/syslog %}}

### Send logs to the Observability Pipelines Worker over Syslog

#### rsyslog

{{% observability_pipelines/log_source_configuration/rsyslog %}}

#### syslog-ng

{{% observability_pipelines/log_source_configuration/syslog-ng %}}

[1]: /observability_pipelines/set_up_pipelines/