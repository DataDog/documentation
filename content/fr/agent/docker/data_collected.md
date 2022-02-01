---
title: Données Docker recueillies
kind: documentation
---

## Métriques

Métriques recueillies par l'Agent lorsqu'il est déployé dans un conteneur Docker :

{{< get-metrics-from-git "docker_daemon" >}}

## Événements

L'Agent Docker génère les événements suivants :

- Delete Image
- Die
- Error
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- Update

## Checks de service

{{< get-service-checks-from-git "docker" >}}
