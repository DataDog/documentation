---
title: Impossible Travel
disable_toc: false
---

## Overview

The impossible travel method detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events. See [Create Rule][1] for detailed instructions on how to create an impossible travel rule.

## How the impossible travel method works

### Baseline user locations

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="A impossible travel rule's query with the baseline locations option highlighted" style="width:100%;" >}}

When you set up a query for your impossible travel rule, you can enable **Baseline User Locations** if you want Datadog to learn the common locations for each user before the rule starts creating signals.

#### Baseline user locations disabled

When **Baseline User Locations** is disabled (default):

- Each log is assessed for whether it contains a location that is impossible to travel to from an already encountered location.

- Travel is impossible between two locations if the speed of travel is higher than 1000 km/h and the distance is greater than 500km.

#### Baseline user locations enabled

When **Baseline User Locations** is enabled:

- There is a learning period of 24 hours for each user. During this time, Datadog learns the common locations (city and country) for each user and signals are not created.
- Encountered locations are forgotten after 30 days if they have not been encountered again.
- If a new location is encountered, Datadog:
    - Checks if the location is one of the common locations. If it is one of the common locations, Datadog moves on to the next log or event.
    - Checks if it's an impossible travel situation.
        - If it's not an impossible travel situation, Datadog moves on to the next log or event.
        - It it's an impossible travel situation, Datadog checks if there is an IP transition pattern. From example, if a user travels from location A to location B and that travel pattern has occurred in the past, a signal is not triggered.

[1]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule
