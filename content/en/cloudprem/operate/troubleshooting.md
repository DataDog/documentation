---
title: Troubleshooting
aliases:
- /cloudprem/troubleshooting/
further_reading:
- link: "/cloudprem/architecture/"
  tag: "Documentation"
  text: "CloudPrem Architecture"
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

### Cloud SQL connection issues (GKE)

**Error**: `failed to connect to metastore: connection error: pool timed out`

**Solution**: Verify Cloud SQL authorized networks include GKE node IPs:
```bash
gcloud sql instances describe cloudprem-postgres \
  --format="value(settings.ipConfiguration.authorizedNetworks)"
```

Update authorized networks if needed:
```bash
export NODE_IPS=$(kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}' | tr ' ' ',')
gcloud sql instances patch cloudprem-postgres \
  --authorized-networks=${NODE_IPS} \
  --quiet
```

**Error**: `failed to connect to metastore: invalid port number`

**Solution**: Confirm the password in the metastore URI is URL-encoded. Special characters must be escaped:
```
# Correct format
postgresql://postgres:abc%2Fdef%2Bghi%3D@IP:5432/cloudprem

# Incorrect format (fails)
postgresql://postgres:abc/def+ghi=@IP:5432/cloudprem
```

## Storage errors

If you set the wrong AWS credentials, you see this error message with `Unauthorized` in the logs of your indexers:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

If you set the wrong region, you see this error:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

### GCS storage access issues (GKE)

**Error**: `failed to write to GCS bucket`

**Solution**: Verify the service account has the correct permissions:
```bash
gsutil iam get gs://${BUCKET_NAME}
```

Grant permissions if missing:
```bash
gsutil iam ch \
  serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin \
  gs://${BUCKET_NAME}
```

### MinIO storage access issues

**Error**: `failed to put object` or `NoSuchBucket`

**Solution**: Verify MinIO connectivity and credentials:
```shell
kubectl run minio-client \
  --rm -it \
  --image=minio/mc:latest \
  --command -- bash -c "mc alias set myminio <MINIO_ENDPOINT> <ACCESS_KEY> <SECRET_KEY> && mc ls myminio/<BUCKET_NAME>"
```

Common causes:
- MinIO endpoint is not reachable from the cluster
- Incorrect access key or secret key
- The bucket does not exist
- `force_path_style_access` is not set to `true` in the storage configuration

## Workload Identity issues (GKE)

**Error**: `could not generate access token`

**Solution**: Verify the Workload Identity binding:
```bash
# Check service account annotation
kubectl get serviceaccount cloudprem-ksa -n datadog-cloudprem -o yaml | grep iam.gke.io

# Verify IAM binding
gcloud iam service-accounts get-iam-policy \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

Re-create the binding if needed:
```bash
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[datadog-cloudprem/cloudprem-ksa]"
```

## Ingestion issues

### Ingest errors on CloudPrem indexers

**Symptom:** Indexer logs show ingest errors, or the `ingest_requests.count` metric shows failures. The OP Worker may report backpressure or buffer full errors.

**Common causes:**
- **Indexers undersized:** Check CPU utilization and the `pending_merge_ops.gauge` metric. If merge operations are backing up, indexers need more CPU or additional pods.
- **Disk full:** Check `disk.available_space.gauge`. If the write-ahead log (WAL) fills up, indexers stop accepting new data. Increase persistent volume size or add more indexer pods.
- **Rate limiting:** On initial deployment or after a restart, you may see `429 Too Many Requests` errors. This is typically transient while the cluster stabilizes. If it persists, check that your indexer count matches your ingestion volume.

### OP Worker backpressure

**Symptom:** OP Worker logs show buffer full errors or dropped events. The `component_sent_event_bytes_total` metric shows drops.

**Solution:**
- Verify that the OP Worker HPA (Horizontal Pod Autoscaler) is configured. The default of 2 replicas is often insufficient for production volumes.
- Remove CPU limits on OP Worker pods to avoid CFS throttling during traffic spikes. Keep CPU requests for scheduling.

### Monitoring log loss at the collector level

To detect log loss before it reaches CloudPrem, monitor these Datadog Agent metrics:

- **`datadog.logs_client_http_destination.payloads_dropped`**: Number of log payloads dropped by the Agent when the destination is unreachable or returning errors. This is the primary metric to watch for data loss.
- **`datadog.logs.bytes_missed`**: Number of bytes from logs that could not be tailed after a file rotation (before the Agent finished reading the file).

Configure the Datadog Agent to report these metrics and set up alerts to detect log loss early.

## Search performance

### Queries timing out

**Symptom:** Search queries in Log Explorer return errors or take longer than expected. Dashboard widgets show "No Data" or loading spinners.

**Common causes:**
- **Not enough searcher pods:** Check searcher CPU utilization. If pods are at high CPU, add more replicas or increase `searcher.podSize`.
- **Wildcard queries:** Queries with contained wildcards (for example, `*:*abcd*`) are significantly more expensive than prefix or term queries. Consider using more specific query terms.
- **Large time ranges with aggregations:** Aggregation queries (timeseries, top lists, percentiles) over multi-day ranges scan large amounts of data. Narrow the time range or add more searcher resources.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
