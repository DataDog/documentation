---
title: Detection rules
disable_toc: false
---

This topic explains how Workload Protection actively monitors system activity and evaluates it against a set of out-of-the-box (OOTB) rules to detect suspicious behavior.

## OOTB detection rules {#ootb-detection-rules}

Workload Protection includes out-of-the-box (OOTB) **threat detection** rules maintained by Datadog. They combine telemetry collected through Agent rules with backend expressions to raise [security signals][8] when activity looks suspicious. Browse the full catalog in [default detection rules][1], or review and tune them in the Workload Protection [detection rules][3] list in the app.

## Proactively block threats with Active Protection

By default, all OOTB Agent crypto mining threat detection rules are enabled and actively monitoring for threats.

[Active Protection][12] enables you to proactively block and terminate crypto mining threats identified by the Datadog Agent threat detection rules.

### Create the custom Agent and detection rules together {#create-the-custom-agent-and-detection-rules-together}

For how default Agent rules are packaged in policies and deployed in the app, see the [Agent rules](/security/workload_protection/detect_and_monitor/agent_rules/#ootb-rules) overview and [Policy management][21].

You can define a matching Agent rule and threat detection rule in one of these ways:

- **Assisted rule creator:** In the Datadog app, start a custom Workload Protection [detection rule][3] and use the wizard to configure both the Agent expression and the backend threat detection logic.
- **Manual rule creator:** From [Agent Configuration][9], open or create a policy and choose **Manual rule creator** to author the Agent rule first, then add a threat detection rule that references it. For UI steps and deployment, see [Policy management][21].


[1]: /security/default_rules/#cat-workload-security
[2]: /security/workload_protection/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: https://app.datadoghq.com/security/configuration/workload/setup
[8]: /security/workload_protection/security_signals
[9]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[10]: https://app.datadoghq.com/security/configuration/notification-rules
[21]: /security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: /security/workload_protection/guide/active-protection