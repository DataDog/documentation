---
title: Ticket Creation Rules
site_support_id: case_management
products:
  - name: Cloud Security
    url: /security/cloud_security_management/
    icon: cloud-security-management
  - name: Code Security
    url: /security/code_security/
    icon: security-code-security
  - name: App and API Protection
    url: /security/application_security/
    icon: app-sec
further_reading:
  - link: "/security/automation_pipelines"
    tag: "Documentation"
    text: "Automation Pipelines"
  - link: "/security/ticketing_integrations"
    tag: "Documentation"
    text: "Ticketing Integrations"
  - link: "/incident_response/case_management"
    tag: "Documentation"
    text: "Case Management"
---

{{< product-availability >}}

Configure ticket creation rules to automatically create tickets in Jira or Case Management when new findings are discovered. This approach tracks security issues in your existing engineering workflows without manual triage, helping teams respond quickly to new threats at scale. For more information about ticketing integrations with security findings, see [Ticketing Integrations][3].

## Create a ticket creation rule

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [Findings Automation][2]. Click {{< ui >}}Add a New Rule{{< /ui >}}, then select {{< ui >}}Create Ticket{{< /ui >}}. The Create a New Rule page opens.
1. Under {{< ui >}}Rule name{{< /ui >}}, enter a descriptive name for the rule; for example, "Critical vulnerabilities for engineering team".
1. Add your rule criteria into the following fields:
    - {{< ui >}}Any of these types{{< /ui >}}: The types of findings that the rule should check for. Available types include:
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secret
      - Infrastructure as Code
      - Container Image Vulnerability
      - Host Vulnerability
      - Misconfiguration
      - Attack Path
      - Identity Risk
      - API Security
    - {{< ui >}}Any of these tags or attributes{{< /ui >}}: The resource tags or attributes that must match for the rule to apply.
1. To add severity criteria to the rule, click {{< ui >}}Add Severity{{< /ui >}}.
1. Select the ticketing system and configure the ticket destination:
   - {{< ui >}}Jira{{< /ui >}}
     - {{< ui >}}Jira Account{{< /ui >}}: Select the Atlassian instance to use.
     - {{< ui >}}Space{{< /ui >}}: Select the Jira project. Verify that this space is added to the [Jira Webhook][5].
     - {{< ui >}}Ticket Type{{< /ui >}}: Select the type of Jira issue to create, for example, {{< ui >}}Task{{< /ui >}}.
     - {{< ui >}}Assignee{{< /ui >}} (optional): Specify a user to assign automatically created tickets to.
     - To add more fields to the Jira ticket Datadog creates, use {{< ui >}}Add Optional Field{{< /ui >}}.
     - Expand {{< ui >}}Data Sync Settings{{< /ui >}} to review or update the linked Case Management project and bidirectional sync configuration.
   - {{< ui >}}Case Management{{< /ui >}}
     - {{< ui >}}Case Management Project{{< /ui >}}: Select an existing Case Management project, or create one.
     - {{< ui >}}Assignee{{< /ui >}} (optional): Specify a user to assign automatically created cases to.
1. Under {{< ui >}}Rate limit{{< /ui >}}, enter the [maximum number of tickets](#daily-ticket-limit) this rule can create per UTC day.
1. To test the rule before saving, click {{< ui >}}Test Rule{{< /ui >}}, select a matching finding, and click {{< ui >}}Run Test{{< /ui >}}. After the test completes, you can view the created ticket or detach the test ticket from the finding.
1. Click {{< ui >}}Save{{< /ui >}}. The rule applies to new findings only. It can take up to a few minutes after a finding is detected to create the corresponding ticket.

**Note**: Ticket creation rules only create tickets for new findings. Datadog does not create retroactive tickets for existing findings when you create a rule.

## Identify automatically created tickets

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="Case Management ticket popup showing a case created by an Automation Rule, indicated with a lightning bolt icon, and a link to view all findings with tickets that were created from the same rule" style="width:60%;" >}}

Tickets created by a rule are marked with a lightning bolt indicator in the findings side panel and explorer views. Hovering over the indicator shows the automation rule responsible for the ticket and provides a link to the rule.

## Rule matching order

When Datadog identifies a finding, it evaluates the finding against your sequence of ticket creation rules. Starting with the first rule, if there's a match, Datadog creates a ticket using that rule's configuration and stops evaluating further. If no match occurs, Datadog moves to the next rule. This process continues until a match is found or all rules are checked without a match.

## Daily ticket limit

Each rule has a configurable daily ticket limit that resets at midnight UTC. When the limit is reached, Datadog creates one final ticket in the same project explaining that the rule hit its daily limit, then stops creating tickets for the remainder of that day. Findings that exceed the limit are not retroactively ticketed when the limit resets, but you can create tickets for them manually.

## Broken rules

If a project configuration error prevents ticket creation—for example, if the connected Jira project is no longer valid—Datadog automatically disables the rule and marks it as broken.

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="Automation Pipelines list showing a ticket creation rule with a warning tooltip that says 'Rule auto-disabled due to a ticketing integration error'" style="width:100%;" >}}

To resume automatic ticket creation, fix the project configuration and re-enable the rule.

## Disabled or deleted rules

When you disable or delete a ticket creation rule, tickets that were previously created by the rule remain attached to their findings. They are not detached or deleted.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /security/ticketing_integrations/
[5]: /integrations/jira/#configure-a-jira-webhook
