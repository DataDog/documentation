---
title: Sequence
description: Learn about how the sequence detection method works.
disable_toc: false
---

## Overview

The sequence method enables you to detect multi-stage attacks by identifying ordered patterns of related events, such as initial access, privilege escalation, and data exfiltration.

You can define a sequence of steps that must occur within a defined time frame and across related entities, such as a user, host, or IP address. Each sequence can combine conditions from multiple logs or signals to identify coordinated activity that might be missed by individual rules.

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="Sequence editor page showing a preview of the steps" style="width:100%;" >}}

See [Create Rule][1] for instructions on how to configure a sequence rule.

## How the sequence method works

### Detection logic

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="Sequence editor page showing three steps" style="width:100%;" >}}

Sequence detection evaluates a defined series of steps that represent distinct stages of suspicious behavior. Each step corresponds to:

- A condition such as a threshold on a log query or a signal match
- Transitions that define the order and time constraints between steps

The rule is triggered when all steps occur in the specified order and within the configured time windows.

### Linking entities

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="Sequence editor page showing a step with the group by field highlighted" style="width:100%;" >}}

The sequence of steps can be correlated across users, accounts, IP addresses, and other fields to automatically track linked entities through `group by` fields. This allows you to follow an attacker's path across different identities and systems.

### Evaluation window

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="Sequence editor page showing the evaluation window highlighted" style="width:100%;" >}}

Each transition between steps has a configurable evaluation window that determines how long the rule waits for the next step to occur. For example, a rule might trigger when `user login from an unusual location` is followed within 20 minutes by a `privilege escalation`, where the user might have gone from a standard role to an admin role.

## Configuration options

When you [create a sequence detection rule][1], you can configure these options:

| Setting | Description | Impact |
|---------|-------------|--------|
| Data type | Specify whether each query evaluates logs, signals, or rules. | Defines data sources for detection. |
| Steps | Define each detection condition, including query and threshold. | Determines which behaviors are monitored. |
| Step transitions | Define the order and time relationship between steps. | Controls when a sequence qualifies for a signal. |
| Evaluation window | After a step has occurred, the time (in seconds) to wait for the next step. | Larger windows increase detection coverage, but may result in more noise. |
| Group by fields | Fields used to link activity across steps (for example, `@usr.email`, `@ip`). | Determines how entities are correlated across queries. |

## Limits

- Sequence detection supports up to 10 steps per rule and a total evaluation window of 24 hours.
- Steps must be in a linear sequence.

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=sequence
