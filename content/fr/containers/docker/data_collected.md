---
aliases:
- /fr/agent/docker/data_collected
kind: documentation
title: Données Docker recueillies
---

## Intégration Docker

### Métriques

Métriques recueillies par l'Agent lorsqu'il est déployé dans un conteneur Docker :

{{< get-metrics-from-git "docker_daemon" >}}

### Événements

L'Agent Docker génère les événements suivants :

- Delete Image
- Die
- Erreur
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- Mettre à jour

### Checks de service

{{< get-service-checks-from-git "docker" >}}

**Remarque** : pour utiliser `docker.exit`, ajoutez `collect_exit_codes: true` dans votre fichier Docker `conf.yaml` et redémarrez l'Agent.

## Intégration Container

### Métriques
{{< get-metrics-from-git "container" >}}

## Intégration Containerd

### Métriques

{{< get-metrics-from-git "containerd" >}}

### Événements

Le check Containerd peut recueillir des événements. Utilisez `filters` pour sélectionner les événements pertinents. Consultez lʼexemple [`containerd.d/conf.yaml`][1] pour obtenir plus de détails.

### Checks de service

{{< get-service-checks-from-git "containerd" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default