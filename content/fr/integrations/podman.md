---
app_id: podman
categories:
- incident-teams
custom_kind: integration
description: Surveiller toutes vos métriques sur les conteneurs Podman avec Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
title: Podman
---
[Podman](https://podman.io/) est un moteur de conteneurs sans démon pour développer, gérer et exécuter des conteneurs OCI sur votre système Linux. Les conteneurs peuvent être exécutés en tant que root ou en mode sans root.

## Section Overview

L'exécution des conteneurs Podman est prise en charge par le [contrôle du conteneur Agent ] (https://docs.datadoghq.com/integrations/container/).
Ce contrôle rapporte un ensemble de métriques sur tous les conteneurs en cours d'exécution, indépendamment de la durée d'exécution utilisée pour les démarrer.

**REMARQUE** : le check `container` transmet des métriques standardisées pour tous les conteneurs identifiés sur le système, peu importe le runtime des conteneurs.

## Configuration

### Installation

Pour Monitor les conteneurs gérés par [Podman](https://podman.io/), voir les [instructions d'installation](https://docs.datadoghq.com/integrations/container/#setup) pour la [vérification du conteneur Agent ](https://docs.datadoghq.com/integrations/container/).

## Données collectées

### Métriques

Voir [metadata.csv] (https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv) pour une liste des mesures fournies par cette intégration.

## Dépannage

Besoin d'aide ? Contactez [Datadog support](https://podman.io/).