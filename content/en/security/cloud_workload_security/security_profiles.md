---
title: CWS Security Profiles
kind: documentation
---

Security profile are auto generated once you have enabled activity dumps in the agent.  There are settings on how many workload containers are profiled at the same time (default: 3) and for what period of time (default: 30 minutes).  These parameters will be configurable via the UI in the next release update. There will be no ability for customers to create their own security profile.  This is behavior learning so we are capturing what the workload is actually doing across all similar workloads in the customer environment.

Datadog Cloud Security Management reduces an organization's alerting signal-to-noise ratio by using Workload Security Profiles, which create a baseline out of a workload's typical behavior in order to surface unusual activity. For example, an attacker may attempt to launch a new cron job on a host in order to execute malicious code. Datadog Cloud Security Management can automatically flag this kind of activity as suspicious behavior in the Security Overview Page.

Security Profiles provide an opportunity to simplify this process by applying suppressions validated against current workload behavior.

Suppression suggestions

## Explore security profiles

main page/tab
detailed view includes:

- commonality score
- interactive graph/explorer
- links to (Related Signals, Infrastructure containers page, Activity Dumps)

## Suppress signals based on suggested actions

...