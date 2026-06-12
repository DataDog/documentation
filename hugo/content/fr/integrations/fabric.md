---
app_id: fabric
categories:
- orchestration
custom_kind: integration
description: Une bibliothèque Python et un outil en ligne de commande qui simplifie
  l'utilisation de SSH pour le déploiement d'applications et les tâches d'administration
  du système.
media: []
title: Fabric
---
## Section Overview

**Attention** : cette intégration est obsolète et n'est plus activement développée.

Associez Fabric à Datadog pour :

- Enregistrer et rechercher des événements de déploiement dans le flux d'événements
- Corréler les événements de déploiement avec les changements de métriques sur les dashboards

## Configuration

### Configuration

1. Installez le package dogapi :

   ```shell
   sudo easy_install --upgrade dogapi
   ```

   ou :

   ```shell
   sudo pip install dogapi
   ```

1. Importez dogapi et configurez votre clé d'API :

   ```python
   from dogapi.fab import setup, notify
   setup("<YOUR_DATADOG_API_KEY")
   ```

1. Ajoutez le décorateur de notification pour chaque tâche que vous souhaitez associer à Datadog. Assurez-vous que @notify ait lieu juste avant @task.

   ```python
   @notify
   @task
   def a_fabric_task(...):
       # do things
   ```

## Données collectées

### Métriques

L'intégration Fabric n'inclut aucune métrique.

### Événements

L'intégration Fabric n'inclut aucun événement.

### Checks de service

L'intégration Fabric n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).