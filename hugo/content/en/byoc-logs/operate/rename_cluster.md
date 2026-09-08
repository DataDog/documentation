---
title: Rename a BYOC Logs Cluster
description: Change the cluster ID of a BYOC Logs deployment directly or with a rolling migration.
further_reading:
- link: "/byoc-logs/install/"
  tag: "Documentation"
  text: "Install BYOC Logs"
- link: "/byoc-logs/operate/monitoring/"
  tag: "Documentation"
  text: "Monitor BYOC Logs"
---

## Overview

The `config.cluster_id` Helm value identifies a BYOC Logs cluster in Datadog. Changing this value restarts the cluster nodes. Choose a rename procedure based on the deployment's availability requirements.

Renaming a cluster changes the cluster ID segment in each BYOC Logs index name from `byoc--<OLD_CLUSTER_ID>--<INDEX_NAME>` to `byoc--<NEW_CLUSTER_ID>--<INDEX_NAME>`. It also changes the `cluster_id` tag on metrics, logs, and traces emitted by the cluster. Update Log Explorer views, monitors, dashboards, and telemetry queries that reference the old index names or tag value.

## Rename with downtime

Use this procedure when temporary ingestion and search failures are acceptable.

1. Change `config.cluster_id` in the Helm values file:

   ```yaml
   config:
     cluster_id: <NEW_CLUSTER_ID>
   ```

2. Upgrade the Helm release:

   ```shell
   helm upgrade <RELEASE_NAME> datadog/cloudprem \
     --namespace <NAMESPACE_NAME> \
     --values datadog-values.yaml
   ```

3. Wait for the rollout to finish. During the rollout, nodes with different cluster IDs cannot communicate, which can interrupt ingestion and search.
4. Verify that all pods are ready and that ingestion and search have recovered.

## Rename gracefully

Use `config.additional_acceptable_cluster_ids` to allow nodes with the old and new cluster IDs to communicate during the rename. This maintains communication between nodes across the three rollouts, but pods restart during each rollout. Complete each rollout before starting the next one.

After each change to the Helm values, upgrade the release with the following command:

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

1. Configure nodes with the old cluster ID to accept the new cluster ID:

   ```yaml
   config:
     cluster_id: <OLD_CLUSTER_ID>
     additional_acceptable_cluster_ids:
       - <NEW_CLUSTER_ID>
   ```

2. Upgrade the Helm release and wait for the rollout to finish.
3. Change the cluster ID while retaining compatibility with the old cluster ID:

   ```yaml
   config:
     cluster_id: <NEW_CLUSTER_ID>
     additional_acceptable_cluster_ids:
       - <OLD_CLUSTER_ID>
   ```

4. Upgrade the Helm release and wait for the rollout to finish.
5. Remove `additional_acceptable_cluster_ids`:

   ```yaml
   config:
     cluster_id: <NEW_CLUSTER_ID>
   ```

6. Upgrade the Helm release and wait for the rollout to finish.
7. Verify that all pods are ready and that ingestion and search remain available.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
