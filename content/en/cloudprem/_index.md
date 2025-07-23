---
title: CloudPrem
description: Learn how to deploy and manage Datadog CloudPrem, a self-hosted log management solution for cost-effective log ingestion, processing, indexing, and search capabilities
private: true
---

<div class="alert alert-warning">CloudPrem is in Preview.</div>

## Overview

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="CloudPrem architecture overview showing how logs flow from sources through CloudPrem to the Datadog platform" style="width:100%;" >}}

Datadog CloudPrem is a self-hosted log management solution that enables cost-effective log ingestion, processing, indexing, and search capabilities within your own infrastructure. Built to meet data residency, stringent security, and high-volume requirements, CloudPrem integrates with the Datadog platform to provide log analysis, visualization, and alerting — all while keeping your log data at rest within your infrastructure boundaries.

## Get started

{{< whatsnext >}}
   {{< nextlink href="/cloudprem/installation/" >}}Install CloudPrem and Send Logs with the Agent {{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingress/" >}}Configure CloudPrem Ingress{{< /nextlink >}}
   {{< nextlink href="/cloudprem/aws_config" >}}Configure AWS{{< /nextlink >}}
   {{< nextlink href="/cloudprem/processing/" >}}Configure CloudPrem Log Processing{{< /nextlink >}}
   {{< nextlink href="/cloudprem/cluster/" >}}Learn more about Cluster Sizing and Operations{{< /nextlink >}}
   {{< nextlink href="/cloudprem/architecture/" >}}Learn more about CloudPrem Architecture{{< /nextlink >}}   
   {{< nextlink href="/cloudprem/troubleshooting/" >}}Troubleshooting{{< /nextlink >}}
{{< /whatsnext >}}


[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[2]: /cloudprem/installation/
[3]: /cloudprem/processing/
[4]: /cloudprem/architecture/
