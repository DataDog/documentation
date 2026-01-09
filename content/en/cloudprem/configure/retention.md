---
title: Retention Policy
description: Learn how to configure data retention for CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Retention policy

The retention policy specifies how long data is stored before being deleted. By default, the retention period is set to 30 days. Data is automatically removed daily by the janitor, which deletes splits (index files) older than the defined retention threshold.

To change the retention period, update the `cloudprem.index.retention` parameter in the Helm chart values file, then upgrade the Helm release and optionally restart the janitor pod to apply the changes immediately:

1. Update the retention period in the Helm chart values file with a human-readable string (for example, `15 days`, `6 months`, or `3 years`):
{{< code-block lang="yaml" filename="datadog-values.yaml">}}
cloudprem:
  index:
    retention: 6 months
{{< /code-block >}}

2. Upgrade the Helm chart release:

    ```shell
    helm upgrade <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

3. Restart the janitor pod (optional but recommended for immediate effect):

    ```shell
    kubectl delete pod -l app.kubernetes.io/component=janitor -n <NAMESPACE_NAME>
    ```
