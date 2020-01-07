---
title: Container Integration Events
kind: faq
aliases:
- /integrations/faq/docker-ecs-kubernetes-events/
---

When monitoring containers and orchestrators (Docker, ECS, and Kubernetes) you are familiar with the events that are available once an integration has been enabled and respective configuration steps followed.

As your containerized environment grows, containers and orchestrators start emitting a high volume of events that leads to more noise in the [events stream][1], [monitors][2], and overlays.

In order to reduce noise, only "severe" and "important"-level events are listed by default.

If further access is needed to any other events in a specific integration, [reach out to Datadog support team][3] to have these events enabled for your organization.

The events below are available per integration:

| Integration | Event collected |
| ------ | ------- |
| [Docker][4] | `Delete Image` / `Die` / `Error` / `Fail` / `Kill` / `Out of memory (oom)` / `Pause` / `Restart container` / `Restart DaemonUpdate` |
| [ECS][5]| `Drain` / `Error` / `Fail` / `Out of memory` / `Pending` / `Reboot` / `Terminate` |
| [Kubernetes][6] | `Backoff` / `Conflict` / `Delete` / `DeletingAllPods` / `Didn't have enough resource` / `Error` / `Failed` / `FailedCreate` / `FailedDelete` /`FailedMount` / `FailedSync` / `Failedvalidation` / `FreeDiskSpaceFailed` / `HostPortConflict` / `InsufficientFreeCPU` / `InsufficientFreeMemory` /`InvalidDiskCapacity` / `Killing` / `KubeletsetupFailed` / `NodeNotReady` / `NodeoutofDisk` / `OutofDisk` / `Rebooted` / `TerminatedAllPods` / `Unable` / `Unhealthy` |

To access and use these events in Datadog, use the following three methods:

* [Events stream][1]
* [Monitors][2]
* [Event overlays on graphs][7]

[1]: /events
[2]: /monitors
[3]: /help
[4]: /integrations/docker_daemon
[5]: /integrations/amazon_ecs
[6]: /integrations/kubernetes
[7]: /dashboards/#event-correlation-at-view-time
