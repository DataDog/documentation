---
title: Metastore Read Replicas
description: Learn how to configure a read-only metastore backed by a database read replica to scale search in BYOC Logs
further_reading:
- link: "/byoc-logs/configure/"
  tag: "Documentation"
  text: "Configure BYOC Logs"
- link: "/byoc-logs/operate/sizing/"
  tag: "Documentation"
  text: "Size your cluster"
- link: "/byoc-logs/operate/best_practices/"
  tag: "Documentation"
  text: "Best practices"
---

## Overview

By default, indexers and searchers in a BYOC (Bring Your Own Cloud) Logs cluster all read index metadata from the same metastore database. You can deploy a read-only metastore backed by a database read replica so that searchers query the replica instead. This scales search requests independently of indexing and isolates the search path from the indexing path.

## Prerequisite: A read replica database

Prepare one or more read replica instances of your metastore PostgreSQL database.

<div class="alert alert-info">If you use Amazon Aurora, use a reader endpoint instead of an individual read-replica endpoint. A reader endpoint load-balances across available replicas and provides better availability.</div>

## Create a Kubernetes secret for the read replica

The read-only metastore requires an environment variable named `QW_METASTORE_READ_REPLICA_URI`. Set it to the connection URI for your read replica instance(s), similar to `QW_METASTORE_URI` for the primary metastore. Store this URI in a Kubernetes secret in your {{< prodname >}}BYOC Logs{{< /prodname >}} namespace:

```shell
kubectl create secret generic byoclogs-metastore-read-replica-uri \
-n <NAMESPACE_NAME> \
--from-literal QW_METASTORE_READ_REPLICA_URI="postgres://<USERNAME>:<PASSWORD>@<READ_REPLICA_ENDPOINT>:<PORT>/<DATABASE>"
```

## Deploy the read-only metastore

Add a `metastore_ro` section to your `datadog-values.yaml` file to deploy the read-only metastore. At minimum, set `metastore_ro.enabled` to `true` and configure `extraEnvFrom` to reference the secret you created:

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
metastore_ro:
  enabled: true
  extraEnvFrom:
    - secretRef:
        name: byoclogs-metastore-read-replica-uri
{{< /code-block >}}

<div class="alert alert-info">Set the remaining <code>metastore_ro</code> parameters (such as <code>podSize</code>, resource requests and limits, and node placement) to match your primary <code>metastore</code> configuration.</div>

Upgrade your Helm chart release to apply the change:

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  -n <NAMESPACE_NAME> \
  -f datadog-values.yaml
```

After the upgrade completes, searchers use the read-only metastore to serve search requests, while indexers continue to use the primary metastore.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
