---
app_id: container
categories:
- incident-teams
- kubernetes
custom_kind: integration
description: Surveillez toutes vos métriques de conteneur avec Datadog.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
title: Conteneur
---
## Section Overview

Ce check transmet un ensemble de métriques relatives aux conteneurs en cours d'exécution, quel que soit le runtime utilisé pour les lancer.

**REMARQUE** : le check `container` diffère du check `containerd`. Les checks `container` envoient des métriques standard pour tous les conteneurs détectés sur le système, quel que soit le runtime du conteneur. Le check `containerd` est dédié au runtime `containerd` et publie des métriques dans l'espace de nommage `containerd.*`.

## Configuration

### Installation

Container est un check de base de l'Agent Datadog. Il est automatiquement activé tant qu'un runtime de conteneur pris en charge est détecté. Selon votre environnement, vous devrez potentiellement configurer l'accès aux runtimes de conteneur pris en charge (Docker, containerd).

#### Installation sur des conteneurs

Pour que le check `container` s'active automatiquement, vous devez monter certains dossiers. Cette opération est gérée par le chart Helm officiel et l'Operator Datadog, en respectant la documentation pertinente de Kubernetes, Docker, ECS et ECS Fargate.

### Configuration

Le check `container` n'expose aucun paramètre de configuration spécifique. Pour personnaliser les champs communs ou forcer l'activation du check `container`, procédez comme suit :

1. Créez le fichier `container.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent.

1. [Redémarrer le Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

Le check `container` peut recueillir des métriques relatives au processeur, à la mémoire, au réseau et aux E/S des disques. Selon votre environnement (Linux/Windows, par exemple), il est possible que certaines métriques ne soient pas disponibles.

### Validation

[Exécutez la sous-commande `status` de Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) et recherchez `container` dans la section **Checks**.

## Données collectées

### Métriques

| | |
| --- | --- |
| **container.cpu.limit** <br>(gauge) | Le temps maximum d'utilisation de l'unité centrale dont dispose le conteneur<br>_Affiché en nanocore_. |
| **container.cpu.system** <br>(gauge) | L'utilisation de l'unité centrale du système de conteneurs<br>_Affichée en nanocore_. |
| **container.cpu.throttled** <br>(gauge) | Durée totale de l'étranglement du processeur<br>_Affichée en nanosecondes_. |
| **container.cpu.throttled.periods** <br>(gauge) | Nombre de périodes pendant lesquelles le conteneur a été étranglé|
| **container.cpu.usage** <br>(gauge) | L'utilisation totale de l'unité centrale du conteneur<br>_Affichée en nanocore_. |
| **container.cpu.user** <br>(gauge) | L'utilisation de l'unité centrale de l'espace utilisateur du conteneur<br>_Affiché en nanocore_. |
| **container.io.read** <br>(gauge) | Le nombre d'octets lus sur les disques par ce conteneur<br>_Affiché sous forme d'octet_. |
| **container.io.read.operations** <br>(gauge) | Le nombre d'opérations de lecture effectuées par ce conteneur|
| **container.io.write** <br>(gauge) | Le nombre d'octets écrits sur les disques par ce conteneur<br>_Affichage en octets_. |
| **container.io.write.operations** <br>(gauge) | Nombre d'opérations d'écriture effectuées par ce conteneur|
| **container.memory.cache** <br>(gauge) | L'utilisation du cache du conteneur<br>_Affiché en octets_. |
| **container.memory.commit** <br>(gauge) | L'utilisation de la mémoire du commit du conteneur<br>_Affiché sous forme d'octet_. |
| **container.memory.commit.peak** <br>(gauge) | L'utilisation de la mémoire pour le peak commit du conteneur<br>_Affiché en octet_. |
| **container.memory.kernel** <br>(gauge) | L'utilisation de la mémoire du noyau du conteneur<br>_Affichée en octets_. |
| **container.memory.limit** <br>(gauge) | La limite de mémoire du conteneur<br>_Affichée en octets_. |
| **container.memory.major_page_faults** <br>(count) | Nombre de pannes majeures survenues sur le site Page (page) |
| **container.memory.oom_events** <br>(gauge) | Nombre d'événements OOM déclenchés par le conteneur|
| **container.memory.page_faults** <br>(count) | Nombre total d'erreurs survenues sur le site Page (page) |
| **container.memory.rss** <br>(gauge) | L'utilisation du conteneur RSS<br>_Constitué d'un octet_. |
| **container.memory.soft_limit** <br>(gauge) | La limite souple de la mémoire du conteneur<br>_Affichage en octets_. |
| **container.memory.swap** <br>(gauge) | L'utilisation de l'échange de conteneurs<br>_Constitué d'octets_. |
| **container.memory.usage** <br>(gauge) | L'utilisation totale de la mémoire du conteneur<br>_Affichée en octets_. |
| **container.memory.usage.peak** <br>(gauge) | L'utilisation maximale de la mémoire enregistrée depuis que le conteneur a démarré<br>_Affiché en octets_. |
| **container.memory.working_set** <br>(gauge) | L'utilisation de l'ensemble de travail du conteneur<br>_Constitué d'un octet_. |
| **container.net.rcvd** <br>(gauge) | Nombre d'octets réseau reçus (par interface)<br>_Affiché en octets_ |
| **container.net.rcvd.packets** <br>(gauge) | Nombre de paquets réseau reçus (par interface)|
| **container.net.sent** <br>(gauge) | Le nombre d'octets réseau envoyés (par interface)<br>_Affiché sous forme d'octet_. |
| **container.net.sent.packets** <br>(gauge) | Nombre de paquets réseau envoyés (par interface)|
| **container.pid.open_files** <br>(gauge) | Le nombre de descripteurs de fichiers ouverts (Linux uniquement)|
| **container.pid.thread_count** <br>(gauge) | Le nombre de threads en cours d'exécution dans ce conteneur|
| **container.pid.thread_limit** <br>(gauge) | Le nombre maximum de threads pour ce conteneur|
| **container.restarts** <br>(gauge) | Nombre de conteneurs redémarrés|
| **container.uptime** <br>(gauge) | Le temps de fonctionnement du conteneur<br>_Affiché en secondes_. |

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).