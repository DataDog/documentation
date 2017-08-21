---
title: Datadog-System Core Integration
integration_title: System Core
kind: integration
newhlevel: true
git_integration_title: system_core
alias:
    - integrations/systemcore
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/systemcore/syscoredash.png" alt="System Core" >}}

## Overview

This check collects the number of CPU cores on a host and CPU times (i.e. system, user, idle, etc).

## Setup
### Installation

The system_core check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host.

### Configuration

Create a file `system_core.yaml` in the Agent's `conf.d` directory:

```
init_config:

instances:
  - foo: bar
```

The Agent just needs one item in `instances` in order to enable the check. The content of the item doesn't matter.

Restart the Agent to enable the check.

### Validation

Run the Agent's `info` subcommand and look for `system_core` under the Checks section:

```
  Checks
  ======
    [...]

    system_core
    -------
      - instance #0 [OK]
      - Collected 5 metrics, 0 events & 0 service checks

    [...]
```

## Compatibility

The system_core check is compatible with all major platforms.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Depending on the platform, the check may collect other CPU time metrics, e.g. `system.core.interrupt` on Windows, `system.core.iowait` on Linux, etc.

### Events
The System Core check does not include any event at this time.

### Service Checks
The System Core check does not include any service check at this time.