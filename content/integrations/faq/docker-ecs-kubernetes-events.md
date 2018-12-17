---
title: Docker, ECS, & Kubernetes Events
kind: faq
---

### Container Integration Events

When monitoring containers and orchestrators (Docker, ECS, and Kubernetes) you are familiar with the events that are available once an integration has been enabled and respective configuration steps followed.

As your containerized environment grows, containers and orchestrators start emitting a high volume of events that leads to more noise in the [events stream][1], [monitors][2], and overlays.

To ensure that you don't have to worry about the eventual noise, events provided by default are limited to only severe and important events listed below.  

If further access is needed to any other events in a specific integration, [reach out to Datadog support team][3] to have these events enabled for your organization.

## Docker, ECS, and Kubernetes Integration Details

The events below will be available per integration:

### Docker

* Delete Image
* Die
* Error
* Fail
* Kill
* Out of memory (oom)
* Pause
* Restart container
* Restart Daemon
* Update

[Learn more about Datadog-Docker integration][4]

### ECS

* Drain
* Error
* Fail
* Out of memory
* Pending
* Reboot
* Terminate

[Learn more about Datadog-AWS ECS integration][5]

### Kubernetes

* Backoff
* Conflict
* Delete
* DeletingAllPods
* Didn't have enough resource
* Error
* Failed
* FailedCreate
* FailedDelete
* FailedMount
* FailedSync
* Failedvalidation
* FreeDiskSpaceFailed
* HostPortConflict
* InsufficientFreeCPU
* InsufficientFreeMemory
* InvalidDiskCapacity
* Killing
* KubeletsetupFailed
* NodeNotReady
* NodeoutofDisk
* OutofDisk
* Rebooted
* TerminatedAllPods
* Unable
* Unhealthy

[Learn more about Datadog-Kubernetes integration][6]

To access and use these events in Datadog, use the following three methods:

* [Events stream][1]
* [Monitors][2]
* [Event overlays on graphs][7]

[1]: /graphing/event_stream
[2]: /monitors
[3]: /help
[4]: /integrations/docker_daemon
[5]: /integrations/amazon_ecs
[6]: /integrations/kubernetes
[7]: /graphing/dashboards/#event-correlation-at-view-time
