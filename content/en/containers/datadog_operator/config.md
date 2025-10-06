---
title: Configure the Datadog Operator
description: Configure Datadog Agent deployment options using DatadogAgent custom resource specifications and example manifests
---

You can configure the Datadog Operator by adding parameters to the spec of your `DatadogAgent` deployment.

### All configuration options

See the [configuration spec][1] in the [`DataDog/datadog-operator`][2] repo for a complete table of configuration parameters.

### Example manifests

* [Manifest with logs, APM, process, and metrics collection enabled][3]
* [Manifest with logs, APM, and metrics collection enabled][4]
* [Manifest with APM and metrics collection enabled][5]
* [Manifest with Cluster Agent][6]
* [Manifest with tolerations][7]


[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[2]: https://github.com/DataDog/datadog-operator/
[3]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-apm-hostport.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml