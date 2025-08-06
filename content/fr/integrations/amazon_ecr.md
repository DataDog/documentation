---
app_id: amazon_ecr
categories:
- cloud
- aws
custom_kind: integration
description: Surveillez des métriques clés d'Amazon ECR.
title: Amazon ECR
---
## Section Overview

Amazon Elastic Container Registry (Amazon ECR) est un registre de conteneurs Docker entièrement géré qui permet aux développeurs de stocker, gérer et déployer des images de conteneurs Docker en toute facilité.

Activez cette intégration pour visualiser toutes vos métriques ECR dans Datadog.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, commencez par configurer l'[intégration Amazon Web Services] (https://docs.datadoghq.com/integrations/amazon_web_services/).

### Collecte de métriques

1. Dans le [AWS integration tile](https://app.datadoghq.com/integrations/amazon-web-services), veillez à ce que `ECR` soit coché.
   dans la section concernant la collecte de métriques.
1. Installez l'intégration [Datadog - ECR] (https://app.datadoghq.com/integrations/amazon-ecr).

## Données collectées

### Métriques

| | |
| --- | --- |
| **aws.ecr.repository_pull_count** <br>(count) | Le nombre total de tirages pour les images dans le référentiel.|

### Événements

L'intégration ECR n'inclut aucun événement.

### Checks de service

L'intégration ECR n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).