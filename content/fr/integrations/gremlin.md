---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - collaboration
  - issue tracking
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gremlin/README.md'
display_name: Gremlin
draft: false
git_integration_title: gremlin
guid: 087cb38a-d119-4db6-8c54-30700fc1f355
integration_id: gremlin
integration_title: Gremlin
is_public: true
kind: integration
maintainer: support@gremlin.com
manifest_version: 1.0.0
name: gremlin
public_title: Intégration Datadog/Gremlin
short_description: Envoyer des événements se produisant dans Gremlin à Datadog
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Affichez, réexécutez et arrêtez des attaques Gremlin directement depuis Datadog.

Intégrez Gremlin à vos [événements][1] Datadog pour fournir davantage de contexte relatif au testing de défaillance à vos workflows Datadog.

- Superposez des événements d'attaque sur vos dashboards pour identifier précisément à quel point et à quel moment vos métriques sont perturbées par Gremlin.
- Affichez, réexécutez et arrêtez des attaques Gremlin à partir de votre [flux d'événements][2] Datadog.

![snapshot][3]

## Configuration

### Configuration

Pour activer cette intégration, vous devez transmettre votre clé d'API Datadog à Gremlin. Pour ce faire, accédez à la [page relative aux intégrations][4], cliquez sur le bouton **Add** sur la ligne correspondant à **Datadog**. Vous devez alors renseigner votre **clé d'API Datadog**. Une fois saisie, l'intégration s'initialise.

- API key : <span class="hidden-api-key">\${api_key}</span>

Vous devriez commencer à voir des événements provenant de cette intégration dans votre [flux d'événements][2].

## Données collectées

### Métriques

L'intégration Gremlin ne fournit aucune métrique.

### Événements

L'intégration Gremlin envoie des événements à votre [flux d'événements Datadog][4] lorsque des attaques sont lancées ou arrêtées sur Gremlin.

### Checks de service

L'intégration Gremlin n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

Consultez [notre blog][6] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations disponibles.

[1]: https://docs.datadoghq.com/fr/getting_started/#events
[2]: https://app.datadoghq.com/event/stream
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gremlin/images/events-overlay.png
[4]: https://app.gremlin.com/settings/integrations
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://www.datadoghq.com/blog