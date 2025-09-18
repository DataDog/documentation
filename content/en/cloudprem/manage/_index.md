---
title: Manage and monitor CloudPrem
description: Learn how to monitor, maintain, and operate your CloudPrem deployment
---

{{< callout btn_hidden="true" >}}
  Datadog CloudPrem is in Preview.
{{< /callout >}}

## Retention Policy

The retention policy specifies the duration for which data is retained before deletion. By default, the retention period is configured to 30 days. Data removal is performed automatically on a daily basis by the janitor, which deletes splits (index files) older than the defined retention threshold.

To modify the retention period, update the `seed.retention` parameter in the Helm chart values file using a human-readable string (for example, `15 days`, `6 months`, or `3 years`). After making this change, apply it by upgrading the Helm release with the `helm upgrade` command to ensure the new retention policy is enforced. Finally, you may restart the janitor pod, which will cause the new configuration to take effect immediately rather than waiting for the next scheduled evaluation.

1. Update the retention period:
{{< code-block lang="yaml" filename="datadog-values.yaml">}}
seed:
  retention: 6 months
{{< /code-block >}}

2. Upgrade the Helm chart release:
```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  -n <NAMESPACE_NAME> \
  -f datadog-values.yaml
```

3. Restart the janitor pod:
```shell
kubectl delete pod -l app.kubernetes.io/component=janitor -n <NAMESPACE_NAME>
```

## Dashboards

CloudPrem provides an Out-Of-The-Box dashboard which monitors CloudPrem's key metrics:
- RED metrics for ingest, search and metastore requests.
- Indexing throughput, pending merge metric and object storage GET/PUT metrics

As soon as your CloudPrem cluster is connected to Datadog, the OOTB dashboard is automatically created. You can have access to it in your [dashboards page][1].

<!-- ## Alerts, autoscaling, upgrades

Coming soon. -->

[1]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1
