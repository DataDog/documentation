---
title: Troubleshooting
aliases:
- /cloudprem/troubleshooting/
further_reading:
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "CloudPrem Architecture"
- link: "/observability_pipelines/scaling_and_performance/"
  tag: "Documentation"
  text: "Observability Pipelines Scaling and Performance"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Overview

This page provides troubleshooting guidance for common issues you may encounter when deploying or operating Datadog CloudPrem. It includes typical error messages, diagnostic steps, and tips for resolving problems related to access permissions, storage configuration, and component health. Use this guide to quickly diagnose issues or to gather context before reaching out to [Datadog support][1].


## Component health

### Pods not starting

**Check pod events:**
```bash
kubectl describe pod -n datadog-cloudprem <pod-name>
```

**Common issues:**
- Insufficient resources: Check node capacity with `kubectl describe nodes`
- Image pull errors: Verify network connectivity and image availability
- Secret not found: Verify secrets exist with `kubectl get secrets -n datadog-cloudprem`

## Access permissions

The most common errors come from access permissions to the object storage or to the metastore. To troubleshoot, use `kubectl` and verify logs from CloudPrem components: indexer pods, metastore pods, and searcher pods.

## Metastore errors

### Metastore cannot connect to PostgreSQL

**Error**: `failed to connect to metastore: connection error: pool timed out`

**Solution**: Verify that PostgreSQL is reachable from the cluster:
```shell
kubectl run psql-client \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- psql "host=<HOST> port=<PORT> dbname=<DATABASE> user=<USERNAME> password=<PASSWORD>"
```

Common causes:
- PostgreSQL is not accessible from the cluster network
- Firewall rules are blocking the connection
- Incorrect host, port, or credentials in the `cloudprem-metastore-uri` secret

**Error**: `failed to connect to metastore: invalid port number`

**Solution**: Confirm the password in the metastore URI is URL-encoded. Special characters must be escaped:
```
# Correct format
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/cloudprem

# Incorrect format (fails)
postgresql://user:abc/def+ghi=@host:5432/cloudprem
```

## Storage errors

If you set the wrong AWS/GKE/Azure credentials or region, you see this error message with kind `Unauthorized` or `Internal` in the logs of your indexers:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

Action: Check if your pod has access to the bucket.

## Ingestion issues

### Ingest errors on CloudPrem indexers

**Symptom:** Indexer logs show ingest errors, or the `ingest_requests.count` metric shows failures in the OOTB dashboard.

**Common causes:**
- **Indexers undersized:** Check CPU utilization and the `pending_merge_ops.gauge` metric. If merge operations are backing up, indexers need more CPU or additional pods.
- **Disk full:** Check `disk.available_space.gauge`. If the write-ahead log (WAL) fills up, indexers stop accepting new data. Increase persistent volume size or add more indexer pods.
- **Rate limiting:** On initial deployment or after a restart, you may see `429 Too Many Requests` errors. This is typically transient while the cluster stabilizes. If it persists, check that your indexer count matches your ingestion volume.

In case you use Observability Pipelines in front of CloudPrem, you will need to check what's happening there, see OP [Scaling and Performance][2].

## Search performance

### Queries timing out

**Symptom:** Search queries in Log Explorer return errors or take longer than expected. Dashboard widgets show "No Data" or loading spinners.

**Common causes:**
- **Not enough searcher pods:** Check searcher CPU utilization. If pods are at high CPU, add more replicas or increase `searcher.podSize`.
- **Wildcard queries with whole event search:** Queries like `*:*abcd*`) are significantly more expensive than prefix or term queries targeting one single field. Consider using more specific fields and query terms.
- **Large time ranges with aggregations:** Aggregation queries (timeseries, top lists, percentiles) over multi-day ranges scan large amounts of data. Narrow the time range or add more searcher resources.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /observability_pipelines/scaling_and_performance/
