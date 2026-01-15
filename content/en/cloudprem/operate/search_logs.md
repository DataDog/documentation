---
title: Search CloudPrem Logs
description: Learn how to query and analyze your CloudPrem logs in Datadog
further_reading:
- link: "/cloudprem/ingest/"
  tag: "Documentation"
  text: "Ingest logs to CloudPrem"
- link: "/cloudprem/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting CloudPrem"
- link: "/logs/explorer/search_syntax/"
  tag: "Documentation"
  text: "Log Search Syntax"
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem is in Preview" >}}
  Join the CloudPrem Preview to access new self-hosted log management features.
{{< /callout >}}

## Explore CloudPrem logs in the Logs Explorer

1. Go to the Datadog Log Explorer.
2. On the left facet panel, select the checkbox for your index under CLOUDPREM INDEXES.

A CloudPrem index name is built with the following rule:

```
index:cloudprem-<CLUSTER_NAME>
```

## Search limitations

You cannot query CloudPrem clusters alongside other Datadog log indexes. Additionally, Flex Logs are not supported with CloudPrem.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
