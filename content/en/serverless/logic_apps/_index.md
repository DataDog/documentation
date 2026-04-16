---
title: Serverless Monitoring for Azure Logic Apps
description: Monitor Azure Logic Apps workflows with distributed traces and enhanced metrics using Datadog's Azure diagnostic log integration.
further_reading:
  - link: "/serverless/logic_apps/installation"
    tag: "Documentation"
    text: "Install Serverless Monitoring for Azure Logic Apps"
  - link: "/serverless/logic_apps/troubleshooting"
    tag: "Documentation"
    text: "Troubleshoot Serverless Monitoring for Azure Logic Apps"
---

{{< callout url=
 btn_hidden="true" header="This feature is in Preview">}}
Serverless Monitoring for Azure Logic Apps is in Preview.
{{< /callout >}}

Azure Logic Apps is a serverless orchestration service that lets developers create and manage multi-step application workflows in Azure. Datadog provides Azure Logic Apps tracing and enhanced metrics through the collection of Azure diagnostic logs.

{{< img src="serverless/logic_apps/logic_apps_trace_example.png" alt="An Azure Logic Apps trace." style="width:100%;" >}}

### How it works
Datadog Azure Logic Apps Monitoring uses Azure diagnostic logs sent through the [Datadog Azure Automated Log Forwarding][2]. This service runs in your Azure environment and automatically forwards logs to Datadog. Datadog uses these ingested logs to generate traces for your Logic App executions.

### Visualize Azure Logic Apps execution traces
These traces enable you to identify issues and bugs in your Azure Logic Apps workflow.

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/logic_apps/installation
[2]: /logs/guide/azure-automated-log-forwarding/
