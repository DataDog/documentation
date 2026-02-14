---
title: Serverless Monitoring for Azure Logic Apps
further_reading:
  - link: "/serverless/logic_apps/installation"
    tag: "Documentation"
    text: "Install Serverless Monitoring for Azure Logic Apps"
  - link: "/serverless/logic_apps/troubleshooting"
    tag: "Documentation"
    text: "Troubleshoot Serverless Monitoring for Azure Logic Apps"
---

Azure Logic Apps is a serverless orchestration service that lets developers create and manage multi-step application workflows in Azure. Datadog provides Azure Logic Apps tracing and logs through the collection of Azure diagnostic logs.

### How it works
Datadog Azure Logic Apps Monitoring uses Azure diagnostic logs sent through the [Datadog Azure Automated Log Forwarding][2]. This service runs in your Azure environment and automatically forwards logs from new Logic Apps to Datadog, providing tracing and log correlation.

### Monitor the overall health of Logic Apps in the Serverless view
The Serverless view shows key data for your Logic Apps in one place to provide a snapshot of the health of your workflows. You can access a detailed view of each Logic App to see all associated logs and traces within a certain time frame and set monitors for problematic executions.

### Visualize Azure Logic Apps execution traces
When [Logic Apps tracing is enabled][1], you can view end-to-end traces for a single Logic App execution and its associated logs, errors, and metadata. These traces enable you to identify issues in your workflow logic and reproduce bugs.

To get started, follow the [installation instructions][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/logic_apps/installation
[2]: /logs/guide/azure-automated-log-forwarding/
