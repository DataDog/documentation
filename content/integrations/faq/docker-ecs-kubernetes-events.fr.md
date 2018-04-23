---
title: Événements Docker, ECS et Kubernetes
kind: faq
---

### Événements de l'intégration conteneur

Lors du monitoring des conteneurs et des orchestrateurs (Docker, ECS et Kubernetes), vous connaissez les événements disponibles une fois l'intégration activée et les étapes de configuration respectives suivies.

As your containerized environment grows, containers and orchestrators start emitting a high volume of events that leads to more noise in the [events stream][1], [monitors][2], and overlays.

To ensure that you don't have to worry about the eventual noise, events provided by default are limited to only severe and important events listed below.  

If further access is needed to any other events in a specific integration, please [reach out to us][3] to have these events enabled for your organization.

## Détails pour les intégrations Docker, ECS et Kubernetes

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
* Mémoire insuffisante
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
* Incapable
* Unhealthy

[Learn more about Datadog-Kubernetes integration][6]

To access and utilize these events in Datadog, use the following three methods:

* [Flux d'événements][1]
* [Monitors][2]
* [Event overlays on graphs][7]

[1]: /graphing/event_stream
[2]: /monitors
[3]: /help
[4]: /integrations/docker_daemon/
[5]: /integrations/amazon_ecs/
[6]: /integrations/kubernetes/
[7]: /graphing/dashboards/#event-correlation-at-view-time
