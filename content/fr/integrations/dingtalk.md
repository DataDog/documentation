---
app_id: dingtalk
categories:
- collaboration
- notifications
custom_kind: integration
description: DingTalk est une plateforme de communication et de collaboration d'entreprise
  gratuite et tout-en-un.
media: []
title: DingTalk
---
## Section Overview

Intégrez DingTalk à Datadog pour :

- Être informé des événements et des alertes Datadog dans DingTalk
- Partager des messages et des graphiques avec votre groupe DingTalk

## Installation

L'intégration DingTalk est installée avec le Datadog [DingTalk integration tile] (https://app.datadoghq.com/integrations/dingtalk).

## Configuration

Pour intégrer Datadog à votre groupe DingTalk :

1. Dans l'application DingTalk, accédez à _Messages_. Cliquez ensuite sur le groupe auquel vous souhaitez ajouter une intégration Datadog.
1. Dans le coin supérieur droit, cliquez sur l'icône _Group Settings_ (qui ressemble à une ellipse) et sélectionnez _Group Robot_.
1. Dans le menu Group Robot, sélectionnez Datadog et cliquez sur `Add`.
1. Saisissez un nom pour le robot et cliquez sur `Finished`. Vous obtenez alors une adresse de webhook.
1. Copiez l'adresse de webhook et cliquez sur `Finished`.
1. Sur la [tuile d'intégration] de DingTalk (https://app.datadoghq.com/integrations/dingtalk), saisissez le groupe DingTalk dans lequel vous avez ajouté l'intégration Datadog dans le champ _Nom du groupe_ et collez l'adresse du webhook dans le champ _Robot Webhook du groupe_. Les noms de groupe peuvent contenir des lettres, des chiffres et des traits de soulignement.
1. Cliquez sur _Install Configuration_ (ou sur _Update Configuration_).

Après avoir installé ou mis à jour l'intégration, vous pouvez utiliser la fonction [`@-notification` ] (https://docs.datadoghq.com/monitors/notifications/#notification) avec votre nom de groupe DingTalk.

## Données collectées

### Métriques

L'intégration DingTalk ne fournit aucune métrique.

### Événements

L'intégration DingTalk n'inclut aucun événement.

### Checks de service

L'intégration DingTalk n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).