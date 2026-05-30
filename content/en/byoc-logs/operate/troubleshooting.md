---
title: Troubleshooting
aliases:
- /cloudprem/troubleshooting/
- /cloudprem/operate/troubleshooting/
further_reading:
- link: "/byoc-logs/architecture/"
  tag: "Documentation"
  text: "BYOC Logs Architecture"
- link: "/observability_pipelines/scaling_and_performance/"
  tag: "Documentation"
  text: "Observability Pipelines Scaling and Performance"
---

{{< callout btn_hidden="true" header="Limited Availability" >}}
  BYOC Logs is in Limited Availability.
{{< /callout >}}

## Overview

This page provides troubleshooting guidance for common issues you may encounter when deploying or operating Datadog BYOC Logs. It includes typical error messages, diagnostic steps, and tips for resolving problems related to access permissions, storage configuration, and component health. Use this guide to quickly diagnose issues or to gather context before reaching out to [Datadog support][1].


## Component health

### Pods not starting

**Check pod events:**
```bash
kubectl describe pod -n datadog-byoc-logs <pod-name>
```

**Common issues:**
- Insufficient resources: Check node capacity with `kubectl describe nodes`
- Image pull errors: Verify network connectivity and image availability
- Secret not found: Verify secrets exist with `kubectl get secrets -n datadog-byoc-logs`

## Access permissions

The most common errors come from access permissions to the object storage or to the metastore. To troubleshoot, use `kubectl` and verify logs from BYOC Logs components: indexer pods, metastore pods, and searcher pods.

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
- Incorrect host, port, or credentials in the `byoc-logs-metastore-uri` secret

**Error**: `failed to connect to metastore: invalid port number`

**Solution**: Confirm the password in the metastore URI is URL-encoded. Special characters must be escaped:
```
# Correct format
postgresql://user:abc%2Fdef%2Bghi%3D@host:5432/byoc-logs

# Incorrect format (fails)
postgresql://user:abc/def+ghi=@host:5432/byoc-logs
```

### Index not found or multiple clusters in the console

**Symptom:** Indexer logs repeatedly show:
```
ERROR quickwit: command failed error=metastore error `index `datadog` not found`
```

The cluster eventually crashes, and the BYOC Logs console shows multiple clusters where you expect one.

**Cause:** The metastore URI is not set correctly, so the metastore falls back to a local file-backed store. Each time the metastore pod restarts, the file is wiped and a fresh metastore is created—all index metadata is lost. An earlier error in the logs often points to the misconfiguration:

```
ERROR quickwit: command failed error=failed to resolve metastore uri postgresql://user:***redacted***@<host>/<database>
```

**Solution:** Verify the metastore URI is set correctly. Port-forward to the metastore pod and inspect the running configuration:

```bash
kubectl port-forward -n datadog-byoc-logs <pod-name> 7280:7280
curl -s http://localhost:7280/api/v1/config
```

Confirm `metastore_uri` points to your PostgreSQL instance. If the password contains special characters, verify it is URL-encoded (see [Metastore cannot connect to PostgreSQL](#metastore-cannot-connect-to-postgresql)).

## Storage errors

If you set the wrong AWS/GKE/Azure credentials or region, you see this error message with kind `Unauthorized` or `Internal` in the logs of your indexers:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

Action: Check if your pod has access to the bucket.

## Ingestion issues

### Ingest errors on BYOC Logs indexers

**Symptom:** Indexer logs show ingest errors, or the `ingest_requests.count` metric shows failures in the OOTB dashboard.

**Common causes:**
- **Indexers undersized:** Check CPU utilization and the `pending_merge_ops.gauge` metric. If merge operations are backing up, indexers need more CPU or additional pods.
- **Disk full:** Check `disk.available_space.gauge`. If the write-ahead log (WAL) fills up, indexers stop accepting new data. Increase persistent volume size or add more indexer pods.

In case you use Observability Pipelines in front of BYOC Logs, you will need to check what's happening there, see OP [Scaling and Performance][2].

### Occasional 429 (Too Many Requests) errors

A low rate of 429 errors is not a problem in itself. The Datadog Agent or Observability Pipelines buffers payloads and retries the request automatically.

429s usually mean the cluster is temporarily short on shards. Common triggers:

- On initial deployment or after a restart, while the cluster stabilizes
- Ingestion throughput increased quickly
- An indexer pod went down
- Ingestion paused for a while and shards scaled down

The real concern is sustained 429s that overflow the client buffer. If 429s persist, the cluster is likely undersized—add indexer pods or increase `indexer.podSize`.

**Monitor for client-side log loss:** Watch the following Datadog Agent metrics to detect dropped logs:

| Metric | What it measures |
|--------|------------------|
| `datadog.logs.bytes_missed` | Bytes from logs that could not be tailed after a file rotation (the Agent had not finished reading the previous file). |
| `datadog.logs_client_http_destination.payloads_dropped` | Log payloads dropped because of HTTP errors. The Agent retries on almost all errors, so a non-zero value indicates a real issue. |

If either metric is rising, contact Datadog support.

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
