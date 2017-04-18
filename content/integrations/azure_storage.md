---
title: Datadog-Microsoft Azure Storage Integration
integration_title: Microsoft Azure Storage
kind: integration
git_integration_title: azure_storage
newhlevel: true
beta: true
---

# Overview



Azure Storage is the cloud storage solution for modern applications that rely on durability, availability, and scalability to meet the needs of their customers. It provides the following four services: Blob storage, Table storage, Queue storage, and File storage

Enable this integration to see in Datadog capacity (Blob only) and transaction metrics from your Azure Storage accounts. 

To turn on this feature for your account, please reach out to <support@datadoghq.com>

![dash](/static/images/azure/storage_dash.png)


# Installation

1.  If you haven't already, set up the [Main Azure Integration](/integrations/azure).
2.  For each storage account that you want to monitor, create the required monitoring tables and generate the SAS token with the Azure Storage integration setup CLI. **Instructions and a script for completing this step can be found [here](https://github.com/DataDog/azure-storage-dd)**
3.  Paste the storage account name and SAS token generated from the CLI tool into the form in the [Azure Storage Tile][1]
	
	![tile](/static/images/azure/storage_tile.png)

4.  Once you have done this for each Storage Account you wish to monitor, click Update Configuration.

**NOTE: It may take up to an hour for Azure to generate and populate the minute-metric table for a Storage Account. This delay will occur when first adding a Storage Account to monitor in Datadog**

# Metrics
<%= get_metrics_from_git()%>


[1]: https://app.datadoghq.com/account/settings#integrations/azure_storage
