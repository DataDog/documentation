---
categories:
- Collaboration
- issue tracking
- log collection
ddtype: crawler
dependencies: []
description: Surveillez le nombre de nouveaux tickets par rapport aux tickets résolus
  et générez automatiquement des tickets à partir des monitors Datadog.
doc_link: https://docs.datadoghq.com/integrations/zendesk/
draft: false
git_integration_title: zendesk
has_logo: true
integration_id: zendesk
integration_title: Zendesk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: zendesk
public_title: Intégration Datadog/Zendesk
short_description: Surveillez le nombre de nouveaux tickets par rapport aux tickets
  résolus et générez automatiquement des tickets à partir des monitors Datadog.
team: web-integrations
version: '1.0'
---

{{< img src="integrations/zendesk/zendesk_dash.png" alt="Dashboard Zendesk" popup="true">}}

## Présentation

Zendesk est une plateforme de service client et de gestion des tickets d'assistance qui permet de recevoir, suivre et répondre aux demandes des clients. Activez cette intégration pour voir les métriques de tickets dans Datadog et créer ou mettre à jour des tickets depuis Datadog.

Intégrez Zendesk à Datadog pour :

- Surveiller et présenter graphiquement les métriques count de tickets par statut, utilisateur et taux de satisfaction.
- Recevoir un événement Datadog chaque fois qu'un nouveau ticket Zendesk est ouvert.
- Créer et mettre à jour des tickets en mentionnant `@zendesk`.

## Configuration

### Installation

Pour installer cette intégration, générez un token d'API Zendesk :

1. Accédez à la page des paramètres de l'API en cliquant sur l'icône _Admin_ en forme d'engrenage dans le menu de gauche, puis en sélectionnant _API_ dans la section *Channels* du menu.
2. Activez l'accès par token via l'option Token Access si ce n'est pas déjà fait.
3. Cliquez sur le symbole plus pour créer un nouveau token.
4. Saisissez la description du token d'API en indiquant des informations pertinentes, par exemple « Intégration Datadog/Zendesk ».
5. Copiez le token d'API. **Important** : vous devez temporairement enregistrer ce token, car il sera masqué une fois enregistré.
6. Cliquez sur _Save_.

Pour terminer la configuration de cette intégration, saisissez vos informations dans [Datadog][1] :

1. Accédez au [carré d'intégration Zendesk][2] et cliquez sur l'onglet _Configuration_.
2. Saisissez votre domaine Zendesk. Il s'agit du texte qui s'affiche devant `zendesk.com`. par exemple, si votre URL Zendesk est `https://mon-entreprise.zendesk.com`, votre domaine est `mon-entreprise`.
3. Saisissez votre nom d'utilisateur Zendesk.
4. Saisissez le token d'API Zendesk que vous avez reçu à l'étape 5 ci-dessus.
5. Cliquez sur le bouton Install Integration.

## Données collectées

### Métriques
{{< get-metrics-from-git "zendesk" >}}


### Événements

Cette intégration génère un événement chaque fois qu'un ticket Zendesk est ouvert.

### Checks de service

L'intégration Zendesk n'inclut aucun check de service.

## Pour aller plus loin

### Base de connaissances

#### Créer des tickets

Vous avez la possibilité de créer des tickets Zendesk et de les assigner à un groupe. Ajoutez d'abord le nom du groupe dans le [carré d'intégration Zendesk][2] Datadog, puis utilisez `@zendesk-nom-du-groupe` dans vos annotations et vos monitors Datadog. Par exemple, pour créer un ticket et l'assigner au groupe Zendesk _Support_, ajoutez le groupe et utilisez `@zendesk-support`,

[1]: https://app.datadoghq.com
[2]: https://app.datadoghq.com/account/settings#integrations/zendesk
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/zendesk/zendesk_metadata.csv