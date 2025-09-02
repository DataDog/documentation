---
title: Impossible Travel
disable_toc: false
---

## Overview

The impossible travel method detects access from different locations whose distance is greater than the distance a human can travel in the time between the two access events.

## How the impossible travel method works

### Baseline user locations

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
        - It it's an impossible travel situation, Datadog checks if there is an IP transition pattern.
- You can enable "Common locations and IP transitions detection" through a toggle button in the rule editor UI.
