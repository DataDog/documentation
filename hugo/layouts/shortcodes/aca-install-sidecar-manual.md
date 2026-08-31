### Application environment variables
Because Azure Container Apps is built on Kubernetes, you cannot share environment variables between containers.

| Name | Description |
| ---- | ----------- |
| `DD_SERVICE` | How you want to tag your service. For example, `sidecar-azure`. |
| `DD_ENV` | How you want to tag your env. For example, `prod`.|
| `DD_VERSION` | How you want to tag your application version. |

### Sidecar container
1. In the Azure Portal, navigate to **Application** > **Revisions and replicas**. Select **Create new revision**.
2. On the **Container** tab, under **Container image**, select **Add**. Choose **App container**.
3. In the **Add a container** form, provide the following:
   - **Name**: `datadog`
   - **Image source**: Docker Hub or other registries
   - **Image type**: `Public`
   - **Registry login server**: `docker.io`
   - **Image and tag**: `datadog/serverless-init:<YOUR_TAG>`
   - Define your container resource allocation based on your usage.
4. Add a volume mount using [replica-scoped storage][1001]. Use type "Ephemeral storage" when creating your volume. Ensure that the name and mount path matches the mount you configured in the application container.
5. Set the environment variables in the following table:

#### Sidecar Environment variables
| Name | Description |
| ---- | ----------- |
| `DD_AZURE_SUBSCRIPTION_ID` | **Required**. Your Azure subscription ID. |
| `DD_AZURE_RESOURCE_GROUP` | **Required**. Your Azure resource group. |
| `DD_API_KEY` | **Required**. Your [Datadog API key][1002]. |
| `DD_SITE`  | Your [Datadog site][1003]. For example, `datadoghq.com`.
| `DD_SERVICE` | How you want to tag your service. For example, `sidecar-azure`. |
| `DD_ENV` | How you want to tag your env. For example, `prod`.|
| `DD_VERSION` | How you want to tag your application version. |
| `DD_SERVERLESS_LOG_PATH` | If using the agent for log collection, where you write your logs. For example, `/LogFiles/*.log`. This must match the logging path set up in [Application](#application) |

### Logging

If using the Datadog Agent for log collection, add a volume mount to the sidecar container *and* your application containers using [replica-scoped storage][1001]. Use type **Ephemeral storage** when creating your volume. The examples on this page use the volume name `logs` and the mount path `/LogFiles`.

<img src="/images/serverless/azure_container_apps/aca-volume-mount.png" alt="Adding a volume mount to a container in Azure" style="width:60%;">

[1001]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
[1002]: https://app.datadoghq.com/organization-settings/api-keys
[1003]: /getting_started/site/
