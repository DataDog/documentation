---
title: Configure your Datadog account
description: Set up your Datadog account to access CloudPrem logs
private: true
further_reading:
- link: "/cloudprem/ingest-logs/datadog-agent/"
  tag: "Documentation"
  text: "Set up log ingestion with Datadog Agent"
- link: "/cloudprem/configure/ingress/"
  tag: "Documentation"
  text: "Configure CloudPrem Ingress"
- link: "/cloudprem/manage/"
  tag: "Documentation"
  text: "Manage and Monitor CloudPrem"
---

You need to reach out to [Datadog support](/help/) and give the public DNS of your CloudPrem cluster so that you can search into CloudPrem logs from Datadog UI.

### Searching your CloudPrem logs in the Logs Explorer

After your Datadog account is configured, you are ready to search into the `cloudprem` index by typing it in the search bar or selecting it in facets.

**Note**: You cannot query CloudPrem indexes alongside other indexes. Additionally, Flex Logs are not supported with CloudPrem indexes.

{{< img src="/cloudprem/installation/filter_index_cloudprem.png" alt="Screenshot of the Logs Explorer interface showing how to filter logs by selecting the cloudprem index in the facets panel" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
