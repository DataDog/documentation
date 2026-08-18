---
title: Work item automation rules
aliases:
- /service_management/case_management/automation_rules/
- /incident_response/case_management/automation_rules/
further_reading:
- link: "/incident_response/work_management"
  tag: "Documentation"
  text: "Learn more about Work Management"
---

## Overview

Work Item Automation Rules streamline your incident management workflow by automatically triggering actions when specific conditions are met, allowing teams to standardize their response processes.

You can define automated actions based on four key triggers:
- **Work item creation** - Automatically assign new work items to on-call team members
- **Status changes** - Trigger follow-up actions when work items move between states
- **Attribute changes** - Respond instantly when work item properties like priority are modified
- **Work item approvals** - Trigger workflows when work items receive approvals or declines

These capabilities deliver faster response times while reducing manual effort. Teams can focus on problem-solving instead of work item management, ensuring consistent work item handling with full audit transparency for compliance and visibility.

## Configuring automation rules

To configure automation rules:
1. Navigate to **[Work Management > Settings][1]**.
1. Select the project you want to create automation rules for.
1. Select **Automation**.
1. Click **New Rule**.

Add the following to your configuration:

1. **Define a trigger** - Choose when an automation rule should run:
    1. Upon work item creation
    1. When a work item's status changes
    1. When a work item attribute is added or deleted
    1. When a work item receives an approval or decline
1. **Select a workflow** - Use [Workflow Automation][2] to automate actions such as:
    1. Assigning the work item to a team member
    1. Adding comments
    1. Closing a resolved work item
1. **Enable and name your rule** - Set a descriptive name for the rule and choose to enable or disable it.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /actions/workflows/