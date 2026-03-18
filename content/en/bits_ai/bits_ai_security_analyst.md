---
title: Bits AI Security Analyst
further_reading:
  - link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
    tag: Blog
    text: Automate Cloud SIEM investigations with Bits AI Security Analyst
---

## Overview

Bits AI Security Analyst is an autonomous AI agent that investigates Cloud SIEM signals end to end. It queries security signals and logs, and uses data-based reasoning to help security engineers investigate threat alerts and make a recommendation on the verdict of each alert signal. By reducing manual effort and analyst fatigue, Bits AI Security Analyst makes security operations smoother and more efficient.

### Key capabilities

Bits AI Security Analyst investigations are autonomous. If a detection rule is enabled, Bits AI autonomously investigates signals associated with it.

In the [Cloud SIEM Signals Explorer][5], you can click the **Bits AI Security Analyst** tab to only show signals that Bits AI investigated. In the Severity column, a Bits AI status displays as Investigating, Benign, or Suspicious.

{{< img src="bits_ai/bits_ai_security_analyst_signals_explorer.png" alt="The Cloud SIEM signals explorer, on the Bits AI Security Analyst tab" style="width:100%;" >}}

When you click a row with a Bits AI investigation, the Bits AI Investigation side panel opens:

{{< img src="bits_ai/bits_ai_security_analyst_example.png" alt="Bits AI Security Analyst example detection, titled 'Okta phishing detection with FastPass origin check'." style="width:100%;" >}}

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

## Set up Bits AI Security Analyst

### Prerequisites

To use Bits AI Security Analyst:
- Ensure your organization is using a non-legacy version of Cloud SIEM. If you need assistance, contact [Datadog support][1].
- To set up Bits AI Security Analyst, you need the **Bits AI Security Analyst Config Write** [permission][2].
- To view investigations, you must have **14 days or more** of log history. If you have a shorter log history, you can still set up Bits AI Security Analyst, but won't see any investigations until you have that much history.

### Setup

As soon as you enable Bits AI Security Analyst, by default, it starts autonomously investigating signals for all eligible rules above medium severity.

1. In Datadog, go to **Security** > **Settings** > **[Bits AI Security Analyst][3]**.
1. Turn on the toggle to enable Bits AI Security Analyst. Additional settings appear.
1. (Optional) Configure which rules and which severities you want Bits AI Security Analyst to automatically investigate signals for. There are two ways to do so:
   - Click **Rule Settings** to configure investigations for individual rules. You can change the minimum severity for signals to be investigated, and enable or disable individual rules for investigation.
     <div class="alert alert-info">When you enable Bits AI Security Analyst, Datadog analyzes your custom rules to determine whether it can confidently investigate signals associated with it. If you have new custom rules to evaluate, or want to ask about a rule that wasn't made eligible, contact <a href="/help">Datadog support</a>.</div>
   - Click **Query Filter** to write a signal query filter, so Bits AI Security Analyst only investigates signals that match your filter.
1. Some log sources require credentials to run or enhance investigations by accessing logs, telemetry, or other data that isn't in Datadog. To add credentials, click **Edit credentials**. In the **Select or Add Connection** window that opens, follow the prompts to select an [existing connection][4] from Actions Catalog, or add a connection. Datadog securely stores and restricts all credentials using Actions Catalog.
   - Some log sources require additional setup so you can create HTTP connections. Here's an example:
     {{< collapse-content title="Configure SentinelOne" level="h4" expanded=false id="sentinelone" >}}
     <ol>
       <li>In SentinelOne, ensure you have permission to create an API token. Create an S1 API service user, then assign the <strong>Viewer</strong> role to that user.</li>
       <li>In Datadog, in the <strong>Select or Add Connection</strong> window, in the dropdown, select <strong>New Connection</strong>, then click the <strong>HTTP</strong> tile.</li>
       <li>Add the following information:
         <ul>
           <li>In the <strong>Description</strong> field, Datadog recommends adding your token expiry date, to make it easily accessible.</li>
           <li>In the <strong>Base URL</strong> field, enter your SentinelOne Management Console URL.</li>
           <li>Under <strong>Token Auth</strong>, enter a name for your token in the <strong>Token Name</strong> field, and your API token in the <strong>Token Value</strong> field.</li>
         </ul>
       </li>
       <li>Click <strong>Next, Confirm Access</strong> to verify your connection.</li>
     </ol>
     {{< /collapse-content >}}

## Disable Bits AI Security Analyst

1. In Datadog, go to **Security** > **Settings** > **[Bits AI Security Analyst][3]**.
1. Scroll to the bottom of the page. Under **Disable Bits AI Security Analyst**, turn off the **Enabled** toggle.
   <div class="alert alert-warning">Disabling Bits AI Security Analyst permanently resets all configuration settings.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst
[4]: /actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals