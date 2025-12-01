---
title: Configure your Datadog account
description: Set up your Datadog account to access CloudPrem logs
further_reading:
- link: "/cloudprem/ingest_logs/datadog_agent/"
  tag: "Documentation"
  text: "Set up log ingestion with Datadog Agent"
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/manage/"
  tag: "Documentation"
  text: "Manage and Monitor CloudPrem"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}
## Overview

This page explains how to configure your Datadog account to access logs from your CloudPrem environment. After it's configured, you'll be able to access and search the `cloudprem` index using the Logs Explorer in the Datadog UI.

## Enabling CloudPrem log search

Before you can search CloudPrem logs in the Datadog UI, contact [Datadog support][1] and provide the public DNS of your CloudPrem cluster. This links your cluster to your Datadog account.

## Searching your CloudPrem logs in the Logs Explorer

After your Datadog account is configured, you are ready to search into the `cloudprem` index by typing it in the search bar or selecting it in facets.

**Note**: You cannot query CloudPrem indexes alongside other indexes. Additionally, Flex Logs are not supported with CloudPrem indexes.

{{< img src="/cloudprem/installation/filter_index_cloudprem.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
