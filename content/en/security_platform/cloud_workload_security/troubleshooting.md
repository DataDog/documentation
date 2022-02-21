---
title: Troubleshooting
kind: documentation
description: "Troubleshooting for Cloud Workload Security."
---

## Security Agent Flare

Similar to the [Agent flare][1], you can send necessary troubleshooting information to the Datadog support team with one flare command.

If needed, the flare can be reviewed prior to sending since the flare prompts a confirmation before uploading it.

In the commands below, replace `<CASE_ID>` with your Datadog support case ID if you have one, then enter the email address associated with it.

If you don’t have a case ID, just enter your email address used to login in Datadog to create a new support case.

| Platform     | Command                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent Self tests

In order to ensure that the communication between the `security-agent` and the `system-probe` is working as expected and the Cloud Workload Security probe is able to detect system events, you can manually trigger self tests by running the following command:

| Platform     | Command                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent runtime self-test` |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent runtime self-test`             |

The self-test procedure creates some temporary files and rules to monitor them, and then triggers those rules to ensure that events are correctly propagated.

The following response appears when rules are propagated.
```
Runtime self test: OK
```

You can now see events coming from the `runtime-security-agent` in the Log Explorer.

{{< img src="security_platform/cws/self_test_logs.png" alt="Self test events in the Log Explorer" style="width:90%;">}}

[1]: /agent/troubleshooting/send_a_flare/?tab=agentv6v7
