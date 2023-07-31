---
title: Runtime Anomaly Detection
kind: documentation
further_reading:
- link: "/security/cloud_workload_security/setup"
  tag: "Documentation"
  text: "Setting Up CWS"
- link: "/security/cloud_workload_security/security_profiles"
  tag: "Documentation"
  text: "CWS Security Profiles"
---

Runtime Anomaly Detection provides out of the box detection of unusual behavior on your _containerized_ workloads, using a model based on [CWS Security Profiles][6].


## Compatibility

- Datadog Agent 7.47 or later.
- [CWS enabled][1].
- Runtime Anomaly Detection enabled: review [CWS setup instructions][2] to learn how to enable it.

## Overview

*Available for containerized workloads running agent version 7.47 and above.*

Runtime Anomaly Detection in Cloud Workload Security allows your security agents to observe processes spawned by your applications, along with network traffic and file accesses. It can then alert you when the runtime behavior of your containers change.

By profiling your application as it runs, Runtime Anomaly Detection can detect attacks within containerized environments. Designed to integrate seamlessly with rule-based detections, Anomaly Detection helps aggregate suspicious activity directly from your agent, complementing rules that detect a wide array of attacks with detailed context on unusual behavior within your application’s environment. Anomaly Detection, unlike rule-based approaches, can identify when workloads:
- launch new custom commands (such as cryptominers),
- access local files for the first time, or
- make new DNS resolutions (e.g. to exfiltrate data).

## How it works

Once Runtime Anomaly Detection is activated, CWS agents start recording the normal behavior of your containerized workloads: commands run, file accesses, and DNS resolutions. This behavior is aggregated across all running containers with the same short image name and stored as Security Profiles.

After a learning period, your agents can begin detecting anomalies. The learning duration varies depending on the workload’s activity, by default taking between 48 and 120 hours.

As soon as the learning period is over, the agent begins evaluating new anomalous behavior and sending anomaly events to Datadog. Datadog’s platform aggregates these events by container and confirms that the anomalous behavior is not present in the Security Profile.

If the behavior is not known in the profile, then the event (or events) are then surfaced as Security Signals. Signals are updated dynamically based on any newly detected anomalous behavior in the same container.



## Inspect a Runtime Anomaly Signal

*For more information about investigating Security Signals, see the Security [Signals Explorer docs][4].*

Runtime Anomaly Detection Signals allow you to evaluate runtime behavior. When new anomalies are surfaced, you can escalate them using Case Management or Incidents. If you investigate and find they are benign, similar signals can be suppressed and the behavior can be added to the service’s Security Profile, indicating that it is expected behavior for the application.

The Overview tab on Anomaly Detection Security Signals have three main sections, visible here:

{{< img src="security/cws/security_profiles/runtime-anomaly-detection-signal-sidepanel.png" alt="A CWS runtime anomaly detection signal with three parts described below." width="50%">}}

- What Happened explains which container was impacted and describes how to evaluate the signal. Here, we see that a container with the short image name “cws-webapp-v2” was impacted.
- Suggested Next Steps provides essential pivots into Datadog observability tools such as Infrastructure Monitoring, access to the Security Profile to review known behavior for the service, and links to escalate the workflow using Case Management or Incidents, along with any custom-defined workflows. If the signal is benign, you can add it to the Security Profile of your workload to mark it as normal activity and avoid generating signals if the same behavior is observed again.
- Anomaly Detected displays a list of Anomaly Events in chronological order. Here, we see that a shell script was downloaded, made executable, and launched.

## Notifications

Notifications can be used to alert you via slack or email when anomaly signals are generated. They can also be used to trigger webhooks or Datadog Workflows, enabling automated remediation pipelines. This is done with [Security Notification Rules][3]. To specifically target anomaly signals in a notification rule, use the rule criteria `rule_id:anomaly_detection`.

## Audit Trail for Anomaly Signals Actions

As an administrator or security team member, you can use [Datadog Audit Trail][5] to see what actions your team is taking within the Cloud Security Product. As an individual, you can see a stream of your own actions. Audit trails for security signals are provided without additional configuration.


### Navigate to Organization Settings and select Audit Trail under Compliance.

To exclusively show Audit Logs generated by actions taken in Cloud Security Management:
- use the following query: `@evt.name:"Cloud Security Platform"`
- or select the “Cloud Security Platform” facet under the “Event Name” facet.

To exclusively show Audit Logs generated by actions taken on security signals:
- use the following query: `@asset.type:security_signal`
- or select the “security_signal” facet under the “Asset Type” facet.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_workload_security/setup
[2]: /security/cloud_workload_security/setup?tab=kuberneteshelm#configure-the-cws-agent
[3]: /security/notifications/rules/
[4]: /security/explorer/#inspect-a-security-signal
[5]: /account_management/audit_trail/#overview
[6]: /security/cloud_workload_security/security_profiles
