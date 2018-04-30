---
description: Track key Azure Storage metrics.
git_integration_title: azure_storage
integration_title: Microsoft Azure Storage
kind: integration
newhlevel: true
placeholder: true
title: Datadog-Microsoft Azure Storage Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/azure/storage_dash.png" >}}

## Overview

Azure Storage is the cloud storage solution for modern applications that rely on durability, availability, and scalability to meet the needs of their customers. It provides the following four services: Blob storage, Table storage, Queue storage, and File storage

Enable this integration to see capacity and transaction metrics from Azure Storage in Datadog (Capacity metrics are only available for Blob storage).

## Setup
### Installation

1.  If you haven't already, set up the [Main Azure Integration](/integrations/azure).
2.  For each storage account that you want to monitor, create the required monitoring tables and generate the SAS token with the Azure Storage integration setup CLI. **Instructions and a script for completing this step can be found [here](https://github.com/DataDog/azure-storage-dd)**
3.  Paste the storage account name and SAS token generated from the CLI tool into the form in the [Azure Storage Tile][1]

	{{< img src="integrations/azure/storage_tile.png" >}}

4.  Once you have done this for each Storage Account you wish to monitor, click Update Configuration.

<div class="alert alert-info">
It may take up to an hour for Azure to generate and populate the minute-metric table for a Storage Account. This delay will occur when first adding a Storage Account to monitor in Datadog
</div>

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

[1]: https://app.datadoghq.com/account/settings#integrations/azure_storage
