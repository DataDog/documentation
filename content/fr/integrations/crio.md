---
aliases:
- /fr/intégrations/crio
app_id: cri-o
categories:
- incident-teams
custom_kind: integration
description: Surveillez toutes vos métriques CRI-O avec Datadog.
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
- windows
title: CRI-O
---
## Section Overview

Cette vérification permet de contrôler [CRI-O] (http://cri-o.io).

## Configuration

### Installation

L'intégration repose sur l'option `--enable-metrics` de CRI-O, qui est désactivée par défaut, lors de l'exposition des métriques activées sur `127.0.0.1:9090/metrics`.

### Configuration

1. Modifiez le fichier `crio.d/conf.yaml`, dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à collecter vos données de performance CRI-O. Voir [sample crio.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example) pour toutes les options de configuration disponibles.

1. [Redémarrer le Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

### Validation

[Exécutez la sous-commande Agent's status](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-information) et recherchez `crio` dans la section Checks.

## Données collectées

CRI-O recueille des métriques sur le nombre d'opérations effectuées par le runtime, ainsi que leur latence.
L'intégration Datadog/CRI-O recueille des métriques sur l'utilisation du processeur et de la mémoire du binaire Golang CRI-O.

### Métriques

| | |
| --- | --- |
| **crio.cpu.time** <br>(gauge) | Temps total passé par l'utilisateur et le système en secondes<br>_Affiché en secondes_. |
| **crio.mem.resident** <br>(gauge) | Taille de la mémoire résidente en octets<br>_Affichée en octets_ |
| **crio.mem.virtual** <br>(gauge) | Taille de la mémoire virtuelle en octets<br>_Affichée en octets_ |
| **crio.operations.count** <br>(count) | Comptoir des opérations du CRI-O |
| **crio.operations.latency.count** <br>(gauge) | Nombre d'opérations CRI-O latence|
| **crio.operations.latency.quantile** <br>(gauge) | Quantiles de latence des opérations CRI-O|
| **crio.operations.latency.sum** <br>(gauge) | Somme des opérations CRI-O temps de latence<br>_Indiqué en microseconde_. |

### Checks de service

**crio.prometheus.health**

Renvoie `CRITICAL` si le check ne peut pas accéder au endpoint des métriques.

Etat : ok, critique

### Événements

CRI-O n'inclut aucun événement.

### Checks de service

Voir [service_checks.json] (https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json) pour une liste des contrôles de service fournis par cette intégration.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).