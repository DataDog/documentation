---
categories:
  - monitoring
ddtype: crawler
dependencies: []
description: 'Affichez, recherchez et échangez sur des logs Papertrail dans votre flux d''événements Datadog.'
doc_link: 'https://docs.datadoghq.com/integrations/papertrail/'
draft: false
git_integration_title: papertrail
has_logo: true
integration_title: PaperTrail
is_public: true
kind: integration
manifest_version: '1.0'
name: papertrail
public_title: Intégration Datadog/PaperTrail
short_description: 'Affichez, recherchez et échangez sur des logs Papertrail dans votre flux d''événements Datadog.'
version: '1.0'
---
{{< img src="integrations/papertrail/papertrailexample.png" alt="Exemple Papertrail" popup="true">}}

## Présentation

Utilisez Papertrail et Datadog pour :

- Transformer vos données de log non structurées en métriques exploitables
- Éviter les informations opérationnelles cloisonnées : affichez et corrélez les métriques dérivées des logs, ainsi que les métriques associées au système et aux applications

## Configuration

### Installation

Pour enregistrer des métriques depuis Papertrail :

1. Dans l'[observateur d'événements][1] de Papertrail, enregistrez une recherche correspondant aux événements de log que vous souhaitez représenter graphiquement.
2. Donnez un nom à votre recherche et cliquez sur le bouton **Save & Setup an Alert**.
3. Choisissez Datadog dans Graphing & Metrics.
    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Notifications Papertrail" popup="true">}}

4. Choisissez la fréquence de déclenchement de vos alertes ainsi que les autres paramètres.
5. Indiquez votre clé d'API Datadog et donnez un nom à votre métrique. Vous pouvez également saisir des tags à associer avec la métrique.
    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Notification Papertrail" popup="true">}}

6. Cliquez sur le bouton **Create Alert**.

Papertrail transmettra les informations à Datadog à la fréquence choisie.

### Configuration

Aucune étape de configuration n'est requise pour cette intégration.

## Données collectées

### Métriques

L'intégration Papertrail n'inclut aucune métrique.

### Événements

L'intégration Papertrail n'inclut aucun événement.

### Checks de service

L'intégration Papertrail n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://papertrailapp.com/events
[2]: https://docs.datadoghq.com/fr/help/