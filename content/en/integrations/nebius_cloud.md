---
categories:
    - cloud
    - log collection
description: Collect logs from Nebius AI Cloud.
doc_link: /integrations/nebius_cloud/
has_logo: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/nebius_cloud.md']
integration_title: Nebius Cloud
is_public: true
custom_kind: integration
name: nebius_cloud
public_title: Datadog-Nebius Cloud Integration
short_description: Collect logs from Nebius AI Cloud.
version: '1.0'
integration_id: "nebius-cloud"
---

## Overview

[Nebius AI Cloud][1] is a GPU-first cloud provider offering large-scale compute, managed Kubernetes, object storage, and AI/ML services. Connect Nebius to Datadog to forward logs from your Nebius projects to [Log Management][2].

## Setup

### Create a service account

Datadog uses a Nebius [service account][3] with a read-only `viewer` role to pull logs from your projects.

1. In the [Nebius console][4], go to **Administration** > **IAM** > **Service accounts** and click **Create**.
2. Enter a name (for example, `datadog-integration`) and click **Create**.
3. On the service account page, click **Assign roles** and add the **`viewer`** role.
4. Click the service account name, go to the **Authorized keys** tab, and click **Create authorized key**.
5. Download the credentials JSON file. It contains your `sa_private_key`, `sa_public_key_id`, and `sa_service_account_id`.
6. Copy your **Tenant ID** from **Administration** > **Organization**.

### Issue a static API key

Nebius requires a separate static API key scoped to observability services for log access.

Run the following command using the [Nebius CLI][5]:

```shell
nebius iam static-key issue \
  --name datadog-logs \
  --account-service-account-id <SERVICE_ACCOUNT_ID> \
  --service=OBSERVABILITY
```

Copy the key value from the output. This is your `static_api_key`.

### Configure the integration

Open the [Datadog-Nebius Cloud integration tile][6] and enter the following values:

| Field | Where to find it |
|---|---|
| **Tenant ID** | **Administration** > **Organization** in the Nebius console |
| **Service Account ID** | `sa_service_account_id` field in the credentials JSON file |
| **Public Key ID** | `sa_public_key_id` field in the credentials JSON file |
| **Private Key** | `sa_private_key` field in the credentials JSON file |
| **Static API Key** | Output of the `nebius iam static-key issue` command |

## Collected data

### Logs

The Nebius Cloud integration collects logs from the following services:

| Log source | Description |
|---|---|
| Kubernetes control plane (`sp_mk8s_control_plane`) | Control plane logs for managed Kubernetes clusters |
| Kubernetes audit logs (`sp_mk8s_audit_logs`) | Audit logs for managed Kubernetes clusters |
| Audit events | Tenant-level control plane audit events |
| Compute serial console (`sp_serial`) | Serial console output from compute instances |
| Cloud apps (`sp_cloudapps`) | Logs from serverless jobs and AI inference endpoints |
| PostgreSQL (`sp_postgres`) | Database logs from managed PostgreSQL clusters |
| MLflow (`sp_mlflow`) | Experiment tracking logs from MLflow clusters |

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://nebius.com/
[2]: /logs/
[3]: https://docs.nebius.com/iam/service-accounts/authorized-keys
[4]: https://console.nebius.com
[5]: https://docs.nebius.com/cli/install
[6]: https://app.datadoghq.com/integrations/nebius-cloud
[7]: /help/
