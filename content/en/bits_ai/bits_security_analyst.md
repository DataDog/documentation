---
title: Bits Security Analyst
aliases:
  - /bits_ai/bits_ai_security_analyst
further_reading:
  - link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
    tag: Blog
    text: Automate Cloud SIEM investigations with Bits AI Security Analyst
  - link: "https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026"
    tag: "Blog"
    text: "What's new in Cloud SIEM: AI-powered investigations, enhanced threat intelligence, and scalable security operations"
---

## Overview

Bits Security Analyst is an autonomous AI agent that investigates Cloud SIEM signals end to end. It queries security signals and logs, and uses data-based reasoning to help security engineers investigate threat alerts and make a recommendation on the verdict of each alert signal. By reducing manual effort and analyst fatigue, Bits Security Analyst makes security operations smoother and more efficient.

### Key capabilities

Bits Security Analyst investigations are autonomous. If a detection rule is enabled, Bits AI autonomously investigates signals associated with it.

In the [Cloud SIEM Signals Explorer][5], you can click the {{< ui >}}Bits Security Analyst{{< /ui >}} tab to only show signals that Bits AI investigated. In the Severity column, a Bits AI status displays as Investigating, until marking the signal as either Benign or Suspicious.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="The Cloud SIEM signals explorer, on the Bits Security Analyst tab" style="width:100%;" >}}

When you click a row with a Bits AI investigation, the Bits AI Investigation side panel opens:

{{< img src="bits_ai/bits_security_analyst_example.png" alt="Bits Security Analyst example detection, titled 'Okta phishing detection with FastPass origin check'." style="width:100%;" >}}

In the side panel, you can see Bits AI's investigative findings, including:
- Overall conclusion
- Key evidence used to come to that conclusion
- Investigative steps showing Bits AI's data queries, including embedded results and links to full queries
- Analysis on each investigative step

You can also take additional steps directly from the side panel:
- Create a case with pre-populated Bits AI investigation results
- Run a workflow with a SOAR blueprint
- Declare an incident
- Add a rule suppression
- Archive the signal, or view the signal with the usual Cloud SIEM interface
- Give Bits AI feedback on its analysis

Additionally, when you use Cloud SIEM notifications to send new signal alerts to Slack or Jira, Bits AI automatically updates those notifications. It includes replies showing the Bits AI investigative conclusion, with a link to the full investigation.

### Supported sources

Bits AI can run investigations on the following Security log sources:
- Amazon GuardDuty
  - [Finding categories][6] include anomalous IAM behavior, EC2 credential exfiltration and misuse, S3 data exposure, CloudTrail or S3 defense evasion, and attack sequences correlating IAM credential and S3 data compromise
- AWS CloudTrail
- Azure
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitHub
- Snowflake
- SentinelOne
- Email phishing

## Set up Bits Security Analyst

### Prerequisites

To use Bits Security Analyst:
- Ensure your organization is using a non-legacy version of Cloud SIEM. If you need assistance, contact [Datadog support][1].
- To set up Bits Security Analyst, you need the **Bits Security Analyst Config Write** [permission][2].
- To view investigations, you must have **14 days or more** of log history. If you have a shorter log history, you can still set up Bits Security Analyst, but won't see any investigations until you have that much history.

### Setup

When you enable Bits Security Analyst, Datadog analyzes your rules, including custom rules, to determine whether it can confidently investigate signals associated with them. For all eligible rules above medium severity, it starts autonomously investigating signals. 

Rule eligibility depends on whether Datadog has built the investigation capability for the log source, and whether the Agent is able to investigate the specific rule. If you have new custom rules to evaluate, or want to ask about a rule that wasn't made eligible, contact [Datadog support][1].

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Turn on the toggle to {{< ui >}}Enable Bits Security Analyst{{< /ui >}}. Additional settings appear.
1. (Optional) Configure which rules and which severities you want Bits Security Analyst to automatically investigate signals for. There are two ways to do so:
   - Click {{< ui >}}Rule Settings{{< /ui >}} to configure investigations for individual rules. You can change the minimum severity for signals to be investigated, and enable or disable individual rules for investigation.
   - Click {{< ui >}}Query Filter{{< /ui >}} to write a signal query filter, so Bits Security Analyst only investigates signals that match your filter.
1. Some log sources require credentials to run or enhance investigations by accessing logs, telemetry, or other data that isn't in Datadog. To add credentials, click {{< ui >}}Edit credentials{{< /ui >}}. In the {{< ui >}}Select or Add Connection{{< /ui >}} window that opens, follow the prompts to select an [existing connection][4] from Actions Catalog, or add a connection. Datadog securely stores and restricts all credentials using Actions Catalog.
   
   Some log sources require additional setup so you can create HTTP connections. Here's an example:
   {{< collapse-content title="Configure SentinelOne" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>In SentinelOne, ensure you have permission to create an API token. Create an S1 API service user, then assign the {{< ui >}}Viewer{{< /ui >}} role to that user.</li>
     <li>In Datadog, in the {{< ui >}}Select or Add Connection{{< /ui >}} window, in the dropdown, select {{<  ui >}}New Connection{{< /ui >}}, then click the {{< ui >}}HTTP{{< /ui >}} tile.</li>
     <li>Add the following information:
       <ul>
         <li>In the {{< ui >}}Description{{< /ui >}} field, Datadog recommends adding your token expiry date, to make it easily accessible.</li>
         <li>In the {{< ui >}}Base URL{{< /ui >}} field, enter your SentinelOne Management Console URL.</li>
         <li>Under {{< ui >}}Token Auth{{< /ui >}}:
           <ol>
             <li>Enter a name for your token in the {{< ui >}}Token Name{{< / ui >}} field, and your API token in the {{< ui >}}Token Value{{< /ui >}} field.</li>
             <li>On the {{< ui >}}Headers{{< /ui >}} tab, under {{< ui  >}}Request Headers{{< /ui >}}, click {{< ui >}}Add a Header{{< /ui >}}. Add the following two headers:
               <table>
                 <thead>
                   <tr>
                     <th>Name</th>
                     <th>Value</th>
                   </tr>
                 </thead>
                 <tr>
                   <td><code>Authorization</code></td>
                   <td><code>Bearer</code> followed by a space, then insert the  {{< ui >}}Token Name{{< /ui >}} you defined</td>
                 </tr>
                 <tr>
                   <td><code>Content-Type</code></td>
                   <td><code>application/json</code></td>
                 </tr>
               </table>
             </li>
           </ol>
       </ul>
     </li>
     <li>Click {{< ui >}}Next, Confirm Access{{< /ui >}} to verify your connection.</li>
   </ol>
   {{< /collapse-content >}}

### Add knowledge sources

You can provide additional context for Bits Security Analyst, such as details about your organization's authorization rules, policies, and environment, allowing Bits to produce more accurate investigations tailored to your organization's needs.

To add knowledge, in Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Knowledge Sources{{< /ui >}}][8]. There, you can add two kinds of knowledge:
- **General Org Context (Bits.md)**: Organization-level instructions that Bits Security Analyst should apply to all investigations.
  1. Click **Edit** to make the field editable so you can make your changes.
  1. Click **Save**.
- **Situational Context**: Investigation-specific facts that Bits Security Analyst should apply in specific situations. You can search and filter the table of context entries, and choose to view expired entries, to get an overview of existing context.
  1. Click **Create Context Entry**. In the window that opens, enter:
     1. **Title**: A short title for your entry.
     1. **Context description**: The information you want Bits Security Analyst to take into account.
     1. **Status**: Choose to enable this piece of context, or to save it without enabling it.
     1. **Expiration date** (optional): A date for Bits Security Analyst to stop taking this piece of context into account.
  1. Click **Create Entry**. The window closes and your context appears in the table.

### Get notifications for completed investigations

You can create security notification rules to get a notification when Bits Security Analyst completes an investigation. To do so, follow the instructions in [Create notification rules][7]. When specifying the tags and attributes that must be present for the notification rule to be triggered, add the tag `@workflow.bits_investigator.state:*`.

## Disable Bits Security Analyst

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Scroll to the bottom of the page. Under {{< ui >}}Disable Bits Security Analyst{{< /ui >}}, turn off the {{< ui >}}Enabled{{< /ui >}} toggle.
   <div class="alert alert-warning">Disabling Bits Security Analyst permanently resets all configuration settings.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/analyst-configuration
[4]: /actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html
[7]: /security/notifications/rules/#create-notification-rules
[8]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/knowledge-sources
