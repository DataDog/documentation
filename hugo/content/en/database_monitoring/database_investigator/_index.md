---
title: Database Investigations in Bits Chat
description: Run database investigations in Bits Chat, with AI-powered root cause analysis grounded in your Database Monitoring data.
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
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
- link: "https://www.datadoghq.com/blog/database-investigator/"
  tag: "Blog"
  text: "Diagnose and resolve database performance issues faster with Database Investigator"
---

{{< prodname >}}Database Monitoring{{< /prodname >}} contributes a set of tools and skills to [{{< prodname >}}Bits Chat{{< /prodname >}}][1], so you can investigate the databases you monitor directly in chat. {{< prodname >}}Bits Chat{{< /prodname >}} analyzes the telemetry {{< prodname >}}Database Monitoring{{< /prodname >}} already collects. This includes health signals, query metrics, explain plans, instance and infrastructure metrics, calling APM services, related incidents, and recent events. For a database investigation, {{< prodname >}}Bits Chat{{< /prodname >}} returns a structured root cause analysis with concrete remediation steps.

{{< prodname >}}Bits Chat{{< /prodname >}} supports investigating all databases monitored by {{< prodname >}}Database Monitoring{{< /prodname >}}.

Both database administrators and the platform or application teams that own database-backed services can investigate this way. Describe an issue in plain language and {{< prodname >}}Bits Chat{{< /prodname >}} runs the investigation. Deep database expertise is not required.

Use Bits Chat to answer questions like:

- `Why is this database slow?`
- `What caused the latency spike on this query in the last hour?`
- `Is this regression isolated to one instance or fleet-wide?`
- `Which upstream service is driving the workload change?`
- `How can I reduce lock contention on this table?`

Database investigations are billed in [AI Credits][2].

{{< img src="database_monitoring/database_investigator/summary.png" alt="Bits Chat open alongside a database Summary page, starting an investigation scoped to that database instance" style="width:100%;" >}}

## Start an investigation

Start a database investigation from any of the following surfaces in {{< prodname >}}Database Monitoring{{< /prodname >}}:

- The **Investigate** button on a database **Overview** page
- A metric in the **Metrics** tab of a database host
- A **Blocking Queries** or **Deadlocks** panel
- A normalized query in **Query Metrics**
- A query sample in **Query Samples**

{{< img src="database_monitoring/database_investigator/investigate_instance.png" alt="The Investigate button highlighted on the Overview panel of a database Summary page" style="width:100%;" >}}

{{< img src="database_monitoring/database_investigator/investigate_metrics.png" alt="The Investigate button highlighted on a graph in the Metrics tab of a database host" style="width:100%;" >}}

Each of these automatically launches a {{< prodname >}}Bits Chat{{< /prodname >}} session and starts an investigation scoped to what you clicked from. You do not need to write a prompt.

You can also ask a database question from anywhere in Datadog. Click {{< ui >}}Ask Bits{{< /ui >}} in the top-right of the navigation bar, or press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.

{{< prodname >}}Bits Chat{{< /prodname >}} streams the response as it works through the investigation. It states a plan, calls Datadog services to gather evidence, and shares interim findings. The investigation ends with a structured report covering what happened, why, the supporting evidence, the root cause, and recommended fixes.

You can ask follow-up questions at any point to refine the analysis. You can also paste in external context, such as an execution plan captured outside of Datadog, and {{< prodname >}}Bits Chat{{< /prodname >}} factors it into its next steps.

{{< img src="database_monitoring/database_investigator/investigator_action.png" alt="Bits Chat reporting the root cause of a database issue, with immediate mitigation and durable remediation steps" style="width:100%;" >}}

If a recommended fix involves a SQL change (a new index, a query rewrite), {{< prodname >}}Bits Chat{{< /prodname >}} includes the SQL in its response. {{< prodname >}}Bits Chat{{< /prodname >}} never connects to your database or runs SQL against it, as recommended changes are for you to review and apply.

## Share, save, or escalate findings

After an investigation completes, you can:

- **Share the conversation**: copy the URL to deep-link a teammate into the same conversation.
- **Export to a notebook**: capture the investigation in a [Datadog notebook][3] for write-up, follow-up, or sharing in a postmortem.
- **Create an incident**: escalate the findings into a new [Datadog incident][4].

## Permissions

To run database investigations, your role must have the **Bits Chat Access** and **Database Monitoring Read** permissions. {{< prodname >}}Bits Chat{{< /prodname >}} uses your Datadog role to fetch data, so it can only access the resources you have permission to view.

## Programmatic access

The data sources that {{< prodname >}}Bits Chat{{< /prodname >}} uses for database investigations are also exposed through the [Datadog MCP server][5]. You can call them from your own AI tooling.

## Preview investigations

Investigations you ran in Database Investigator during Preview, before database investigations moved into {{< prodname >}}Bits Chat{{< /prodname >}}, are kept separately from your {{< prodname >}}Bits Chat{{< /prodname >}} conversation history. They remain available until September 30, 2026.

To reach them, click the dropdown arrow next to the **Investigate** button in {{< prodname >}}Database Monitoring{{< /prodname >}}, then select **View Preview Investigations**.

{{< img src="database_monitoring/database_investigator/view_preview_investigations.png" alt="The dropdown next to the Investigate button, with the View Preview Investigations option" style="width:100%;" >}}

The Preview Investigations panel lists your past investigations. Open one to view it, share it, or export it to a [Datadog notebook][3].

{{< img src="database_monitoring/database_investigator/preview_history.png" alt="The Preview Investigations panel listing past investigations, with a banner noting the September 30 cutoff" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /account_management/billing/ai_credits/
[3]: /notebooks/
[4]: /service_management/incident_management/
[5]: /mcp_server/
