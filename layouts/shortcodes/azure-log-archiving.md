## Log archiving

Archiving logs to Azure Blob Storage requires an App Registration. If you haven't already, follow the [automatic][1000] or [manual][1001] setup instructions to configure the integration using an App Registration. App Registrations created for archiving purposes do not need the `Monitoring Reader` role.

After configuring an App Registration, [create a log archive][1002] that writes to Azure Blob Storage.

**Note**: If your storage bucket is in a subscription being monitored through the Azure Native integration, a warning is displayed in the Azure Integration Tile about the App Registration being redundant. You can ignore this warning.

[1000]: /logs/guide/azure-automated-log-forwarding
[1001]: /logs/guide/azure-manual-log-forwarding
[1002]: /logs/log_configuration/archives/?tab=azurestorage#configure-an-archive