---
integration_title: RSS
name: rss
kind: integration
doclevel: basic
description: Consultez des flux RSS depuis votre flux d'événements Datadog.
is_public: true
public_title: Intégration Datadog/RSS
short_description: Enregistrez les flux RSS de votre flux d'événements Datadog
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/rss.md
categories:
  - notification
  - web
ddtype: crawler
integration_id: feed
---
{{< img src="integrations/rss/rss.png" alt="Événement RSS"  >}}

## Présentation

Enregistrez des activités de flux RSS dans Datadog pour :

- Ajouter des événements à votre flux d'événements depuis des sources personnalisées.
- Discuter des flux d'événements avec votre équipe.

## Configuration

### Installation

La configuration nécessite :

- Une URL complète vers un flux RSS ou ATOM.
- Au moins un tag personnalisé par flux.

**Facultatif** : saisissez un nom d'utilisateur et un mot de passe pour accéder au flux RSS.

{{< img src="integrations/rss/rss_setup.png" alt="Configuration RSS"  >}}

### Validation

Consultez les vues [Events Stream][1] et [Events Explorer][2] pour visualiser les activités de flux RSS dans Datadog.

## Pour aller plus loin

### Documentation

- [Explorer les événements Datadog][3]

[1]: https://app.datadoghq.com/event/stream
[2]: https://app.datadoghq.com/event/explorer
[3]: https://docs.datadoghq.com/fr/events/#exploring-datadog-events