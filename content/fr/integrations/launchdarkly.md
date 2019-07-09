---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md'
display_name: LaunchDarkly
git_integration_title: launchdarkly
guid: a1441ba8-be33-4123-8808-5a87cd696b64
integration_id: launchdarkly
integration_title: LaunchDarkly
is_public: true
kind: integration
maintainer: support@launchdarkly
manifest_version: 1.0.1
metric_prefix: launchdarkly_relay.
name: launchdarkly
public_title: Intégration Datadog/LaunchDarkly
short_description: Surveiller les métriques à partir du proxy de relais de LaunchDarkly
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration surveille les métriques provenant du [proxy de relais de LaunchDarkly][1], comme le nombre de connexions de flux et les requêtes d'acheminement d'API traitées par proxy.

## Implémentation

### Configuration

Après avoir configuré le [proxy de relais][2], ajoutez la section suivante au fichier `ld-relay.conf` de l'instance de votre relais LaunchDarkly :

```
[datadog]
enabled=true
statsAddr="VOTRE_ADRESSE_STATISTIQUES"
```

## Données collectées

### Métriques

Le relais recueille des métriques sur le nombre de connexions du flux et les requêtes d'acheminement d'API traitées par proxy. Consultez [la documentation relative au relais][3] (en anglais) pour en savoir plus.

### Événements

L'intégration LaunchDarkly n'inclut aucun événement.

### Checks de service

L'intégration LaunchDarkly n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance][4] Datadog.

## Pour aller plus loin

Consultez [notre blog][5] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations disponibles.

[1]: https://docs.launchdarkly.com/docs/the-relay-proxy
[2]: https://github.com/launchdarkly/ld-relay#quick-setup
[3]: https://github.com/launchdarkly/ld-relay#exporting-metrics-and-traces
[4]: https://docs.datadoghq.com/fr/help
[5]: https://www.datadoghq.com/blog


{{< get-dependencies >}}