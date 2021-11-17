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

- **docker.service_up** :
    Renvoie `CRITICAL` si l'Agent n'est pas capable de recueillir la liste des conteneurs du daemon Docker. Si ce n'est pas le cas, renvoie `OK`.

- **docker.container_health** :
    Ce check de service est seulement disponible pour l'Agent v5. Renvoie `CRITICAL` si un conteneur n'est pas sain, `UNKNOWN` si l'état de santé est inconnu ou `OK` pour les autres cas.

- **docker.exit** :
    Renvoie `CRITICAL` si un conteneur est fermé avec un code de sortie différent de zéro. Si ce n'est pas le cas, renvoie `OK`.

