---
title: Workload Protection Agent Variables
---

The Datadog Agent has several environment variables that can be enabled for Workload Protection. This article describes the purpose of each environment variable.

| Variable                                      | Description                                                                                                            |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `DD_RUNTIME_SECURITY_CONFIG_ENABLED`          | Enables Workload Protection. Must be enabled for both the [System Probe][1] and [Security Agent][2].                  |
| `DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED` | Enables Remote Configuration for automatic updates of default Agent rules and automatic deployment of custom Agent rules. |

[1]: /glossary/#system-probe
[2]: /glossary/#security-agent