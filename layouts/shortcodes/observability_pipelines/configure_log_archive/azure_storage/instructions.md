### Create a storage account

Create an [Azure storage account][9051] if you don't already have one.

1. Navigate to [Storage accounts][9052].
1. Click **Create**.
1. Select the subscription name and resource name you want to use.
1. Enter a name for your storage account.
1. Select a region in the dropdown menu.
1. Select  **Standard** performance or **Premium** account type. and select the hot or cool access tier.
1. Click **Next**.
1. In the **Blob storage** section, select **Hot** or **Cool** storage.
1. Click **Review + create**.

### Create a storage bucket

1. In your storage account, click **Containers** under **Data storage** in the left navigation menu.
1. Click **+ Container** at the top to create a new container.
1. Enter a name for the new container. This name is used later when you set up the Observability Pipelines Azure Storage destination.

**Note**: Do not set [immutability policies][9053] because the most recent data might need to be rewritten in rare cases (typically when there is a timeout).

### Connect the Azure container to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][9054].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **Azure Storage**.
1. Select the Azure tenant and client your storage account is in.
1. Enter the name of the storage account.
1. Enter the name of the container you created earlier.
1. Optionally, enter a path.
1. Optionally, set permissions, add tags, and define the maximum scan size for rehydration. See [Advanced settings][9055] for more information.
1. Click **Save**.

See the [Log Archives documentation][9056] for additional information.

[9051]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[9052]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[9053]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[9054]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9055]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
[9056]: /logs/log_configuration/archives