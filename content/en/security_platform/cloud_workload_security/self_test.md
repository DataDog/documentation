---
title: Troubleshooting
kind: documentation
description: "Troubleshooting for Cloud Workload Security."
---

## Self tests

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
