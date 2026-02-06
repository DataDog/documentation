---
title: Case automation rules
aliases:
- /service_management/case_management/automation_rules/
further_reading:
- link: "/service_management/case_management"
  tag: "Documentation"
  text: "Learn more about Case management"
---

## Overview

Case Automation Rules streamline your incident management workflow by automatically triggering actions when specific conditions are met, allowing teams to standardize their response processes.

You can define automated actions based on three key triggers:
- **Case creation** - Automatically assign new cases to on-call team members
- **Status changes** - Trigger follow-up actions when cases move between states
- **Attribute changes** - Respond instantly when case properties like priority are modified

These capabilities deliver faster response times while reducing manual effort. Teams can focus on problem-solving instead of ticket management, ensuring consistent case handling with full audit transparency for compliance and visibility.

## Configuring automation rules

To configure automation rules:
1. Navigate to **[Case Management > Settings][1]**.
1. Select the project you want to create automation rules for.
1. Select **Automation**.
1. Click **New Rule**.

{{< img src="/incident_response/case_management/automation_rules/create_case_automation_rule.png" alt="Screenshot of the Create Automation Rule dialog in a case management system. The dialog includes steps to set when to evaluate the rule, specify workflow for rule match, name the rule, and set its status." style="width:100%;" >}}

Add the following to your configuration:

1. **Define a trigger** - Choose when an automation rule should run:
    1. Upon case creation
    1. When a case's status changes
    1. When a case attribute is added or deleted
1. **Select a workflow** - Leverage [Workflow Automation][2] to automate actions such as:
    1. Assigning the case to a team member
    1. Adding comments
    1. Closing a resolved case
1. **Enable and name your rule** - Set a descriptive name for the rule and choose to enable or disable it.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: /service_management/workflows/