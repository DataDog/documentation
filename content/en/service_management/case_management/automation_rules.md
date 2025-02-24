---
title: Case automation rules
further_reading:
- link: "/service_management/case_management"
  tag: "Documentation"
  text: "Learn more about Case management"
---

## Overview

With Case Automation Rules, you can automate actions based on predefined rules, reducing manual effort, improving response times, and ensuring consistency across case workflows.

## Configuring automation rules

To configure automation rules:
1. Navigate to **[Case Management > Settings][1]**.
1. Select the project you want to create automation rules for.
1. Select **Automation**.
1. Click **New Rule**.

{{< img src="/service_management/case_management/automation_rules/create_case_automation_rule.png" alt="Your image description" style="width:100%;" >}}

Add the following to your configuration:

1. **Define a trigger** - Choose when an automation rule should run:
    1. Upon case creation
    1. When a case's status changes
    1. When a case attribute is added or deleted
1. **Select a workflow** - Leverage Workflow Automation to automate actions such as:
    1. Assigning the case to a team member
    1. Adding comments
    1. Closing a resolved case
1. **Enable and name your rule** - Set a descriptive name for the rule and choose to enable or disable it.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings