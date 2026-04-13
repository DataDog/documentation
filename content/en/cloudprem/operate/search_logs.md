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

1. Go to the [Datadog Log Explorer][1].
2. On the left facet panel, under **CLOUDPREM INDEXES**, select one or more indexes to search.

You can select a specific index to narrow your search, or select all indexes in a cluster to search across them.

CloudPrem index names follow this format:

```
cloudprem--<CLUSTER_NAME>--<INDEX_NAME>
```

## Search limitations

You cannot query CloudPrem indexes alongside other Datadog log indexes. Additionally, Flex Logs are not supported with CloudPrem.

[1]: https://app.datadoghq.com/logs

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
