---
title: Troubleshooting
kind: documentation
description: "Troubleshooting guide for Datadog Cloud Workload Security."
---

## Self tests

In order to ensure that:
- the communication between the `security-agent` and the `system-probe` is
working as expected
- the Cloud Workload Security probe is able to respond to system events

you can manually trigger self tests by running the following command:

| Platform     | Command                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent runtime self-test` |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent runtime self-test`             |

The self-test procedure creates some temporary files and rules monitoring
them, and then triggers those rules ensuring that events are correctly propagated.

If everything is working as expected, you should see:
```
Runtime self test: OK
```

In the case of an error, you should see:
```
Runtime self test: <ERROR_MESSAGE>
```
where `<ERROR_MESSAGE>` is a description of the error encountered during the test.
