---
title: Detection rules
disable_toc: false
---

## Overview

Detection rules describe the backend logic used to detect threats in your environment by analyzing [Agent events][1]. When a detection rule matches, Workload Protection generates a [security signal][2] that you can investigate and respond to in the Datadog app.

Detection rules combine one or more Agent rules (referenced with `@agent.rule_id`), apply detection methods such as thresholds or anomalies, suppress noise, and route alerts to the right teams. Agent rules collect runtime telemetry on the host; detection rules turn that telemetry into prioritized threat detections.

This page explains how out-of-the-box (OOTB) detection rules work and how to create custom detection rules in the Datadog app.

## OOTB detection rules {#ootb-detection-rules}

Workload Protection includes OOTB **threat detection** rules maintained by Datadog. They combine telemetry collected through Agent rules with backend expressions to raise security signals when activity looks suspicious. Browse the full catalog in [default detection rules][3], or review and tune them in the Workload Protection [detection rules][4] list in the app.

## Create a custom detection rule

To create a custom detection rule, go to the Workload Protection [detection rules][4] page and click **New Rule**. You can also use the **Assisted rule creator** to configure both the Agent rule and the detection rule in a single flow. See [Create the custom Agent and detection rules together](#create-the-custom-agent-and-detection-rules-together).

The rule editor walks you through five steps.

### Step 1: Define your real-time rule

Select the detection method you want to use:

- **Threshold**: Define a time window and the number of matching events required to trigger a signal. For example, trigger when more than 5 matching events occur within 5 minutes.
- **New value**: Trigger when a tracked attribute appears with a value that has not been observed before.
- **Anomaly**: Trigger when event volume or behavior deviates from the expected baseline.
- **Content anomaly**: Trigger when the content of matching events is statistically unusual compared to historical data.

### Step 2: Define search query

Define the query that selects which [Agent events][1] the rule evaluates. The search query determines which events are considered when deciding whether to emit a signal.

You can:

- Filter on **event types** (for example `exec`, `open`, `dns`, or `network`) to focus on specific runtime activity.
- Filter on **specific fields** inside Agent events to refine the query and make the detection more precise. For example, filter on `@process.executable.path`, `@file.path`, or `@agent.rule_id`.
- Combine multiple conditions to scope the rule to a subset of your infrastructure or workloads.

For **threshold** rules, also define the **lookback window**—the period over which Datadog counts matching events before comparing the count to your rule conditions.

Use the [Agent Events explorer][6] to test your query and validate which events match before you publish the rule.

### Step 3: Define rule conditions

Set the limits that determine when the rule emits a signal. You can create **multiple cases**, each associated with a different severity level.

For example, with a threshold rule you might define:

- **Critical** when more than 10 matching events occur within 5 minutes.
- **High** when more than 5 matching events occur within 5 minutes.
- **Medium** when more than 2 matching events occur within 5 minutes.

In the **Add notify** section, optionally configure who receives a notification when the rule triggers. You can add individual recipients or rely on [notification rules][7] to manage alerting across multiple detection rules.

### Step 4: Describe your playbook

Configure the **title** and **description** of the signal that appears when you open it in the [Signals Explorer][2].

1. Enter a **Rule name**. The name appears in the detection rules list and becomes the title of the generated security signal.
2. In the **Rule message** section, use [notification variables][8] and Markdown to describe what happened and how responders should act. Template variables inject dynamic context from the triggering Agent events directly into the signal and its notifications.
3. Use the **Tag resulting signals** dropdown menu to add tags to generated signals. For example, `security:attack` or `technique:T1059-command-and-scripting-interpreter`.

### Step 5: Create a suppression

Optionally add a **suppression query** to reduce noise by excluding specific infrastructure or events from this rule. Suppressions help prevent signals from being generated when matching activity is expected or benign.

For example, to exclude a known automation user from a rule, add a suppression query such as `@usr.name:automation-bot`.

This step also provides an **overview of the number of matching events** in the past, so you can estimate how often the rule would have triggered before you save it. Use this preview to tune your query, thresholds, or suppressions and avoid excessive alert volume.

For more information on suppressions across detection rules, see [Suppressions][9].

## Create the custom Agent and detection rules together {#create-the-custom-agent-and-detection-rules-together}

For how default Agent rules are packaged in policies and deployed in the app, see the [Agent rules][10] overview and [Policy management][11].

You can define a matching Agent rule and threat detection rule in one of these ways:

- **Assisted rule creator:** In the Datadog app, start a custom Workload Protection [detection rule][4] and use the wizard to configure both the Agent expression and the backend threat detection logic.
- **Manual rule creator:** From [Agent Configuration][12], open or create a policy and choose **Manual rule creator** to author the Agent rule first, then add a threat detection rule that references it. For UI steps and deployment, see [Policy management][11].

[1]: /security/workload_protection/investigate_and_triage/agent_events
[2]: /security/workload_protection/investigate_and_triage/security_signals
[3]: /security/default_rules/#cat-workload-security
[4]: https://app.datadoghq.com/security/configuration/rules?product=cws
[5]: /security/workload_protection/respond_and_report/active_protection
[6]: https://app.datadoghq.com/security/agent-events
[7]: /security/notifications/rules/
[8]: /security/notifications/variables/
[9]: /security/suppressions/
[10]: /security/workload_protection/detect_and_monitor/agent_rules
[11]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: https://app.datadoghq.com/security/configuration/workload/agent-rules
