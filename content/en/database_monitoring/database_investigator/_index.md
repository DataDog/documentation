---
title: Database Investigator
description: Diagnose database performance issues with AI-powered root cause analysis grounded in your Database Monitoring data.
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/recommendations/"
  tag: "Documentation"
  text: "Database Monitoring Recommendations"
- link: "/database_monitoring/query_metrics/"
  tag: "Documentation"
  text: "Exploring Query Metrics"
- link: "/database_monitoring/query_samples/"
  tag: "Documentation"
  text: "Exploring Query Samples"
---

{{< callout url="#" btn_hidden="true" header="Database Investigator is in Preview" >}}
Database Investigator is in Preview for all customers monitoring Postgres or SQL Server with Database Monitoring. MySQL and Oracle Database support is in early access: open a MySQL or Oracle Database host within Database Monitoring and click <strong>Get early access</strong> to request it. Support for other databases covered by Database Monitoring is in development.
{{< /callout >}}

Database Investigator is an AI agent inside Database Monitoring that helps you investigate, optimize, and understand the databases you monitor. It analyzes the telemetry Database Monitoring already collects including health signals, query metrics, explain plans, instance and infrastructure metrics, calling APM services, related incidents, and recent events. For investigations, it returns a structured root cause analysis with concrete remediation steps.

Both database administrators and the platform or application teams that own database-backed services can make use of Database Investigator. Describe an issue in plain language and it runs the investigation. Deep database expertise is not required.

Use Database Investigator to answer questions like:

- `Why is this database slow?`
- `What caused the latency spike on this query in the last hour?`
- `Is this regression isolated to one instance or fleet-wide?`
- `Which upstream service is driving the workload change?`
- `How can I reduce lock contention on this table?`

Database Investigator is included with Database Monitoring, and each Datadog organization can run up to 100 investigations per month.

<div class="alert alert-info">Database Investigator operates under zero-retention and zero-training agreements with the third-party AI service providers that power it. Data processed during an investigation is not retained by those providers and is not used to train or improve their models.
</div>

{{< img src="database_monitoring/database_investigator/suggested_prompts.png" alt="Database Investigator opened with suggested prompts" style="width:100%;" >}}

## Initiate Database Investigation

Open Database Investigator from any of the following surfaces in Database Monitoring:

- The **Investigate** button on a database **Overview** page
- A metric in the **Metrics** tab of a database host
- A **Blocking Queries** or **Deadlocks** panel
- A normalized query in **Query Metrics**
- A query sample in **Query Samples**

{{< img src="database_monitoring/database_investigator/overview.png" alt="Investigate button on a database Overview page" style="width:100%;" >}}

{{< img src="database_monitoring/database_investigator/metrics_tab.png" alt="Investigate option on a metric in the Metrics tab of a database host" style="width:100%;" >}}

Database Investigator opens with a suggested starting prompt based on your entry point. You can run that prompt or type your own.

Database Investigator streams its response as it works through the investigation: it states a plan, calls Datadog services to gather evidence, and shares interim findings. The investigation ends with a structured report covering what happened, why, the supporting evidence, the root cause, and recommended fixes.

You can ask follow-up questions at any point to refine the analysis, or paste in external context, such as an execution plan captured outside of Datadog. Database Investigator factors the new information into its next steps.

{{< img src="database_monitoring/database_investigator/mid_conversation.png" alt="Database Investigator running an investigation, showing tool steps and streaming findings" style="width:100%;" >}}

If a recommended fix involves a SQL change (a new index, a query rewrite), Database Investigator includes the SQL in its response. Database Investigator never connects to your database or runs SQL against it, as recommended changes are for you to review and apply.

## Share, save, or escalate findings

After an investigation completes, you can:

- **Share the conversation**: copy the URL to deep-link any teammate with Database Monitoring access into the same conversation.
- **Export to a notebook**: capture the investigation in a [Datadog notebook][1] for write-up, follow-up, or sharing in a postmortem.
- **Create an incident**: escalate the findings into a new [Datadog incident][2].

## Conversation history

Past conversations are listed in the history view inside Database Investigator. Open a previous conversation to revisit its findings or continue investigating where you left off.

{{< img src="database_monitoring/database_investigator/history.png" alt="Database Investigator conversation history list" style="width:100%;" >}}

## Permissions

To use Database Investigator, your role must have the **Database Monitoring Read** permission. Database Investigator uses your Datadog role to fetch data, so it can only access the resources you have permission to view.

## Programmatic access

The data sources that Database Investigator uses are also exposed through the [Datadog MCP server][3]. You can call them from your own AI tooling.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /service_management/incident_management/
[3]: /mcp_server/
