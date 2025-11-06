---
title: New Value
description: Learn about how the new value detection method works.
---

## Overview

The new value detection method alerts when attribute values that have not been seen before, such as a new user, account, API key, or object ID, appear in your logs.

See [Create Rule][1] for instructions on how to configure a new value rule.

## How the new value detection method works

A new value detection rule:

- Learns the values of the fields you have selected, such as `@userIdentity.arn`.
- Learns by recording values over a learning period or uses a threshold method that does not require a learning period. See [Learning duration](#learning-duration) for more information.
- Triggers a signal when a value appears that has not been observed within the current scope.
- Forgets a learned value if the value has not been observed for the number of days set in the [Forget value](#forget-value) option. If the value has been forgotten, the rule alerts when the value reappears.

### Configuration options

#### Detect new values

{{< img src="security/security_monitoring/detection_rules/new_value/detect_new_value.png" alt="A new value rule's query with the detect new value setting highlighted" style="width:100%;" >}}

The **Detect new value** field defines the attributes containing the values to learn. You can add up to five attributes.

#### Group-by fields

{{< img src="security/security_monitoring/detection_rules/new_value/group_by.png" alt="A new value rule's query's group by field highlighted" style="width:100%;" >}}

The `group by` field defines the scope within which new values are evaluated, such as per account.

#### Learning duration

{{< img src="security/security_monitoring/detection_rules/new_value/learning_duration.png" alt="A new value rule's query with the learning duration setting highlighted" style="width:100%;" >}}

The learning duration has the following options:
- **for all new values**: The rule triggers on any new values.
- **after the first seen value**: The rule triggers on any new values after the value has been observed once.
- **after**: Define the length of time the rule learns values for the selected fields. For example, if you select **after 7 days**, the rule learns the values for the first seven days and then triggers on any new values after the seven days. The maximum learning duration is 30 days.

#### Forget value

{{< img src="security/security_monitoring/detection_rules/new_value/forget_after.png" alt="A new value rule's other parameters section showing the forget after option" style="width:40%;" >}}

The [Forget value][2] option determines how long the rule keeps a value known. After this period has passed, the value is forgotten and the rule alerts on the value again. The maximum number of days for **Forget value** is 30 days.

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=newvalue
[2]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=newvalue#forget-value-rt-new-value