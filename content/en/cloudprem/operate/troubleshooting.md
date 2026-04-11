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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
