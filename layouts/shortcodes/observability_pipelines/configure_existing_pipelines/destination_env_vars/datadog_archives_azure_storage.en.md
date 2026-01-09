#### Azure Storage

- Azure connections string to give the Worker access to your Azure Storage bucket.
   - Stored in the environment variable `DD_OP_DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.

To get the connection string:

1. Navigate to [Azure Storage accounts][9061].
1. Click **Access keys** under **Security and networking** in the left navigation menu.
1. Copy the connection string for the storage account and paste it into the **Azure connection string** field on the Observability Pipelines Worker installation page.

[9061]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts