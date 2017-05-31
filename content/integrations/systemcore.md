---
title: Datadog-System Core Integration
integration_title: System Core
kind: integration
newhlevel: true
---

# Overview

![System Core](/static/images/syscoredash.png)

The System Core integration collects information about the host's CPU Cores. 

# Installation

No installation steps are required for this integration.

# Configuration

The only configuration step for this integration is to copy `system_core.yaml.example` to `system_core.yaml`.

# Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:


    Checks
    ======
      [...]
      system_core                                                              
      -----------                                                              
        - instance #0 [OK]                                                     
        - Collected 33 metrics, 0 events & 1 service check                     


# Metrics

For each core the following metrics are collected:

* system.core.count
* system.core.system
* system.core.user
* system.core.idle
* system.core.nice

# Events

No events are included with this integration.



