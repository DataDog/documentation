---
title: "Private Link Connectivity"
description: "Set up Data Observability: Jobs Monitoring for Databricks workspaces deployed with Private Link Connectivity using a Private Action Runner."
further_reading:
    - link: '/data_observability/jobs_monitoring/databricks'
      tag: 'Documentation'
      text: 'Data Observability: Jobs Monitoring for Databricks'
    - link: '/actions/private_actions'
      tag: 'Documentation'
      text: 'Private Action Runners'
---

<div class="alert alert-info">Monitoring Databricks via Private Link Connectivity is in Preview.</div>

Databricks workspaces deployed using [Private Link Connectivity][1] are isolated from the public internet, which prevents Datadog from accessing the Databricks APIs directly. To monitor these workspaces, deploy a [Private Action Runner][2] (PAR) in your environment. The runner polls Datadog for requests, executes them against the Databricks API locally, and sends the results back through your existing [Datadog VPC Endpoint][3].

## Architecture

Private Link monitoring is built on the Private Action Runner's [polling architecture][4]. Datadog provides a custom version of the Private Action Runner image that includes a [script][5] for querying the Databricks API.

{{< img src="data_jobs/databricks/privatelink-architecture-2.png" alt="Architecture diagram showing the Private Action Runner polling Datadog for requests, executing them against the Databricks API, and returning results through the VPC Endpoint." style="width:100%;" >}}

The request flow works as follows:

1. The [Private Action Runner][2] reaches out to the Datadog backend (either over the public internet or using [Private Link][3]) to query for pending requests. If a request is found, details are returned to the runner.
1. Databricks credentials (client ID and secret) are retrieved from secret storage. A token is generated for the session by calling the Databricks API from the runner using those credentials.
1. The runner executes the fetched query against the Databricks API. The results are returned to the runner.
1. The runner forwards the results back to the Datadog backend for processing.

All authentication to Datadog is handled by the underlying Private Action Runner. A locally configured allowlist is set on the runner during installation to restrict the actions that can be performed to only those that are necessary. You can also configure access controls within Datadog to manage which users and teams can use the runner. See [Manage access to Private Action Runners][16] for more information.

## Installation

### Step 1: Datadog prerequisites

1. Establish connectivity to Datadog API endpoints from within the VPC, using **one** of the following methods:
   - Egress to the public internet (through NAT gateway or other)
   - Egress to Datadog through Private Link VPC Endpoints or services:
     - **AWS**: [Set up VPC Endpoints][3] (available in US1, AP1, and AP2)
     - **Azure**: [Private Link service setup][6] (available in US3 only). This requires approval in the Datadog Azure account. Reach out to Datadog Support as specified in the instructions.
     - **GCP**: [Set up Private Service Connect Endpoints][7] (available in US5 and EU1)
1. Create a Datadog service account:
   1. Go to the [Service Accounts][8] page.
   1. Click **New Service Account**.
   1. Enter a name and email address for your service account.
   1. Under **Assign Roles**, select the **Datadog Standard Role**. Alternatively, select a custom role that has the `Connections Resolve` permission.
   1. Click **Create Service Account**.
1. Ensure [Remote Configuration][17] is enabled for your Datadog account.

### Step 2: Databricks prerequisites

1. Create a Databricks service principal ([Databricks documentation][9]):
   1. As a workspace admin, log in to the Databricks workspace.
   1. Click your username in the top bar and select **Settings**.
   1. Click the **Identity and access** tab.
   1. Next to **Service principals**, click **Manage**.
   1. Click **Add service principal**, then click **Add new** and enter a name.
      - Alternatively, to reuse a service principal from another workspace, select an existing service principal and skip the next step.
      <div class="alert alert-info">Datadog does not support Microsoft Entra ID managed Service Principals over Private Link.</div>
   1. Click **Add**.
1. Generate secrets for the Databricks service principal ([Databricks documentation][10]):
   1. Select the service principal created above.
   1. Click the **Secrets** tab, then click **Generate secret**.
   1. Set the secret's lifetime in days (maximum 730 days).
   1. Click **Generate**.
   1. Make the Databricks credentials available to the runner using **one** of the following methods:
      - **Cloud secret storage** (AWS Secrets Manager, AWS Parameter Store, Azure Key Vault, or Google Cloud Secret Manager): Store the credentials as a JSON blob:
        ```json
        {"client_id": "<CLIENT_ID>", "client_secret": "<CLIENT_SECRET>"}
        ```
        Make note of the secret path (AWS ARN, AKV URL, or Google Cloud resource name). You enter this in the integration tile or set it as the `DATABRICKS_SECRET_PATH` environment variable on the runner container or pod.
      - **Environment variables**: Set `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` directly on the runner container or pod. When using this method, leave the **Secret Path** field blank in the integration tile.
1. Provision workspace access and entitlements for the service principal. See [Permissions][11] for full details.
   1. Grant the service principal **Workspace Admin** privileges. This allows Datadog to manage init script installations and updates automatically. Alternatively, assign more [granular permissions][11] for monitoring jobs, clusters, and queries.
      1. Click the **Identity and access** tab.
      1. Next to **Groups**, click **Manage**.
      1. Select the **admins** group.
      1. Click **Add members** and select the service principal added above.
      1. Click **Add**.
   1. To access Databricks cost data or monitor serverless jobs, grant the service principal `CAN USE` on the SQL Warehouse and read access to [system tables][20] in Unity Catalog. See [Permissions][11] for details.

### Step 3: Set up the Private Action Runner

Set up your Private Action Runner using **one** of the following options.

{{< tabs >}}

{{% tab "Helm (Kubernetes)" %}}

1. Install the Private Action Runner into your Kubernetes cluster ([additional docs][1], [Helm chart][2]):
   1. Go to the [Private Action Runner setup][3] page.
   1. Select the **Script** option, then click **Next**.
   1. Follow the instructions under **Kubernetes**.
   1. The Private Action Runner should show up at the bottom as "successfully installed."
1. Update the existing `values.yaml` (referencing the [Helm chart values][4]):
   1. Set `image.repository` to `gcr.io/datadoghq/dd-data-observability-par`.
   1. Set `image.tag` to `1.21.0-3`.
1. Configure credentials on the Private Action Runner using one of the following methods:
    - Set the `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` environment variables directly on the runner. Leave "Secret Path" in the integration tile blank.
    - Use cloud secret storage. Ensure an identity is assigned to the pod ([Azure Workload Identity][5], [AWS IAM Role][6], or [GKE Workload Identity][7]) with permissions to read the secret created in [Step 2](#step-2-databrick-prerequisites), and provide the path to the secret either via the `DATABRICKS_SECRET_PATH` environment variable, or by providing it to the "Secret Path" field in the integration tile.
1. Restart the deployment for these changes to take effect.

[1]: https://docs.datadoghq.com/actions/private_actions/use_private_actions/?tab=kubernetes#overview
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[3]: https://app.datadoghq.com/actions/private-action-runners/new
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[5]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster?tabs=new-cluster
[6]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-association.html
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity

{{% /tab %}}

{{% tab "Docker (VM/EC2)" %}}

1. Install the Private Action Runner using Docker ([additional docs][1]):
   1. Go to the [Private Action Runner setup][2] page.
   1. Select the **Script** option, then click **Next**.
   1. Follow the instructions under **Docker**.

      **Important**: Replace `gcr.io/datadoghq/private-action-runner:v1.21.0-large` with `gcr.io/datadoghq/dd-data-observability-par:1.21.0-3`.

   1. The Private Action Runner should show up at the bottom as "successfully installed."
1. Configure credentials on the Private Action Runner using one of the following methods:
    - Set the `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` environment variables directly on the runner. Leave "Secret Path" in the integration tile blank.
    - Use cloud secret storage. Ensure an identity is assigned to the instance ([Azure Managed Identity][5], [AWS IAM Role][6], or [GCE Service Account][7]) with permissions to read the secret created in [Step 2](#step-2-databricks-prerequisites), and provide the path to the secret either through the `DATABRICKS_SECRET_PATH` environment variable, or by providing it to the "Secret Path" field in the integration tile.

1. Restart the Docker container for the changes to take effect.

[1]: https://docs.datadoghq.com/actions/private_actions/use_private_actions/?tab=kubernetes#overview
[2]: https://app.datadoghq.com/actions/private-action-runners/new
[3]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[5]: https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities?pivots=qs-configure-portal-windows-vm
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/attach-iam-role.html
[7]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances

{{% /tab %}}

{{< /tabs >}}

**Note:** Other mirrors are available if `gcr.io` is inaccessible:
- `docker.io/datadog/dd-data-observability-par`
- `public.ecr.aws/datadog/dd-data-observability-par`
- `datadoghq.azurecr.io/dd-data-observability-par`
- `asia-docker.pkg.dev/datadoghq/asia.gcr.io/dd-data-observability-par`

### Step 4: Configure Datadog

1. Attach a connection to the Private Action Runner:
   1. Go to the [Private Action Runners][12] page.
   1. Select the installed runner.
   1. Select **Finish Setup**.
   1. Select **Script**.
   1. Set **Path to File** to `/etc/data-observability/config/script.yaml`.
   1. Select **Next, Confirm Access**.
   1. Add the service account created in [Step 1](#step-1-datadog-prerequisites) with **Resolver** access. This step is required — the runner uses this service account to authenticate Datadog requests, and the integration cannot function without it.
   1. Select **Create and Test**. Verify the test results do not return an error.
1. Set up the Databricks integration:
   1. Go to the [Databricks integration][13] tile.
   1. Under **Credentials**, select **Private Action Runner**.
      1. Under **Connection**, select the connection created in the previous step.
      1. Under **Service Account**, select the service account created in [Step 1](#step-1-datadog-prerequisites).
      1. Under **Secret Path**, enter the secret path from [Step 2](#step-2-databricks-prerequisites). Leave this field blank if you set credentials using the `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` environment variables, or if you set the path using the `DATABRICKS_SECRET_PATH` environment variable on the runner.
   1. Complete the remainder of the integration setup as described in [Configure the Datadog-Databricks integration][14]:
      1. Enter the **Workspace Name**, **Workspace URL**, and **System Tables SQL Warehouse ID**.
      1. Enable the products you are interested in.
         **Note:** Model Serving behind Private Link is not supported at this time.
      1. If you enabled **Jobs Monitoring**, deploy the Datadog Agent init script to monitor jobs and clusters on classic compute. Follow the instructions in [Install the Datadog Agent][19] to set up the init script, then restart any running clusters for the changes to take effect.
   1. Click **Save Databricks Workspace**.
   1. Verify there are no errors on save.

## Validation

After completing the setup, jobs and cluster information should appear in [Data Observability: Jobs Monitoring][15] shortly.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/security/network/front-end/front-end-private-connect
[2]: https://docs.datadoghq.com/actions/private_actions/
[3]: https://docs.datadoghq.com/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us
[4]: https://docs.datadoghq.com/actions/private_actions/#how-it-works
[5]: https://docs.datadoghq.com/actions/private_actions/run_script/
[6]: https://docs.datadoghq.com/agent/guide/azure-private-link/?site=us3
[7]: https://docs.datadoghq.com/agent/guide/gcp-private-service-connect/?site=us5
[8]: https://app.datadoghq.com/organization-settings/service-accounts
[9]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals?language=Workspace%C2%A0admin%C2%A0settings#-add-service-principals-to-your-account
[10]: https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m#-step-1-create-an-oauth-secret
[11]: /data_observability/jobs_monitoring/databricks/#permissions
[12]: https://app.datadoghq.com/actions/private-action-runners/
[13]: https://app.datadoghq.com/integrations?search=databr&configPage=new&integrationId=databricks
[14]: /data_observability/jobs_monitoring/databricks/#configure-the-datadog-databricks-integration
[15]: https://app.datadoghq.com/data-jobs/
[16]: https://docs.datadoghq.com/actions/private_actions/use_private_actions/?tab=docker#manage-access
[17]: https://app.datadoghq.com/organization-settings/remote-config
[19]: /data_observability/jobs_monitoring/databricks/#install-the-datadog-agent
[20]: https://docs.databricks.com/aws/en/admin/system-tables/
