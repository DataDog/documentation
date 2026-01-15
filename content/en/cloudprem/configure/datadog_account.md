---
title: Access and Search CloudPrem logs
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

After deploying your CloudPrem environment, you need to connect it to your Datadog account to search and analyze logs through the Datadog UI. This guide shows you how to enable log search for your CloudPrem cluster and start querying your self-hosted logs alongside your other Datadog workflows.

## Enabling CloudPrem log search

To search CloudPrem logs in the Datadog UI, contact [Datadog support][1] and provide the **public DNS** of your CloudPrem cluster. This links your cluster to your Datadog account.


## Searching your CloudPrem logs in the Logs Explorer

After your Datadog account is set up, you can search for your CloudPrem cluster in the Logs Explorer by selecting it from the available facets or by entering a query in the search bar.

```
index:cloudprem-<CLUSTER_NAME>
```

## Search limitations

You cannot query CloudPrem clusters alongside other Datadog log indexes. Additionally, Flex Logs are not supported with CloudPrem.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
