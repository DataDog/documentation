---
title: Docker, ECS, & Kubernetes Events
kind: faq
---

### Container Integration Events

When monitoring containers and orchestrators (Docker, ECS & Kubernetes) you are familiar with the events that are available once an integration has been enabled and respective configuration steps followed.

As your containerized environment grows, containers and orchestrators start emitting a high volume of events that leads to more noise in the [events stream](/graphing/event_stream), [monitors](/monitors) and overlays.

To ensure that you don't have to worry about the eventual noise, events provided by default are limited to only severe and important events listed below.  

If further access is needed to any other events in a specific integration, please [reach out to us](/help) to have these events enabled for your organization.

## Docker, ECS & Kubernetes Integration Details

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

[Learn more about Datadog-Docker integration](/integrations/docker_daemon/)

### ECS

* Drain
* Error
* Fail
* Out of memory
* Pending
* Reboot
* Terminate

[Learn more about Datadog-AWS ECS integration](/integrations/amazon_ecs/)

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

[Learn more about Datadog-Kubernetes integration](/integrations/kubernetes/)

To access and utilize these events in Datadog, you can use the following three methods:

* [Events stream](/graphing/event_stream)
* [Monitors](/monitors)
* [Event overlays on graphs](/graphing/dashboards/#event-correlation-at-view-time)