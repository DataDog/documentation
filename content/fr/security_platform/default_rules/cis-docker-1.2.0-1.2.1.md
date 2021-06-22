---
aliases:
  - /fr/3wk-jj4-zxc
  - /fr/security_monitoring/default_rules/3wk-jj4-zxc
  - /fr/security_monitoring/default_rules/cis-docker-1.2.0-1.2.1
control: 1.2.1
disable_edit: true
framework: cis-docker
integration_id: docker
kind: documentation
rule_category:
  - Configuration d'infrastructure
scope: docker
security: conformité
source: docker
title: Partition distincte pour les conteneurs créée
type: security_rules
---
## Description

Tous les conteneurs Docker, ainsi que leurs données et métadonnées, sont stockés dans le répertoire `/var/lib/docker`. Par défaut, ce répertoire doit être monté sous les partitions `/` ou `/var`, selon la configuration du système d'exploitation Linux utilisé.

## Raison

Docker utilise `/var/lib/docker` comme répertoire par défaut. C'est à cet emplacement que sont stockés tous les fichiers connexes Docker, notamment les images. Ce répertoire peut atteindre rapidement sa limite de stockage, ce qui rendrait Docker et le host inutilisables. Ainsi, vous devez créer une partition distincte (volume logique) pour stocker vos fichiers Docker.

## Audit

Pour consulter les détails de la partition pour le point de montage de `/var/lib/docker`, exécutez ce qui suit au niveau du host Docker :

```
grep '/var/lib/docker\s' /proc/mounts 
```

Pour vérifier si le répertoire racine configuré correspond bien à un point de montage, vous pouvez également exécuter la commande suivante :

```
mountpoint -- "$(docker info -f '{{ .DockerRootDir }}')" 
```

## Remédiation

Pour les nouvelles installations, vous devez créer une partition distincte pour le point de montage de `/var/lib/docker`. Pour les systèmes déjà installés, utilisez le Logical Volume Manager (LVM) Linux pour créer une partition. 

## Impact

Aucun

## Valeur par défaut

Par défaut, `/var/lib/docker` est monté sous les partitions `/` ou `/var`, selon la configuration du système d'exploitation.

## Références

1. [https://www.projectatomic.io/docs/docker-storage-recommendation/][1]

## Contrôles CIS

Version 6.14 avec accès uniquement en cas de nécessité

[1]: https://www.projectatomic.io/docs/docker-storage-recommendation/