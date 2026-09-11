---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptime/README.md
display_name: Uptime
draft: false
git_integration_title: uptime
guid: 5da2ddb8-ecf7-4971-a3ee-e42752efc1f5
integration_id: uptime
integration_title: Uptime
integration_version: ''
is_public: true
custom_kind: integration
maintainer: jeremy-lq
manifest_version: 1.0.0
metric_prefix: uptime
metric_to_check: uptime.response_time
name: uptime
public_title: Intégration Datadog/Uptime
short_description: Surveillez l'uptime et les performances en toute simplicité
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des événements et des métriques depuis votre application en temps réel pour :

- Suivre les downtimes ou les interruptions et les signaler.
- Visualiser les métriques de temps de réponse à partir de requêtes synthétiques.

![Graphique Uptime.com][1]

## Configuration

### Configuration

Pour activer l'intégration Datadog dans votre compte Uptime, accédez à [Notifications > Integrations][2], puis choisissez Datadog comme type de fournisseur lors de l'ajout d'un nouveau profil de notifications push.

Description des champs affichés lors de la configuration de Datadog dans votre compte Uptime :
shell
- Name : le nom de référence que vous souhaitez attribuer à votre profil Datadog. Cela peut vous aider à organiser plusieurs profils fournisseur dans votre compte Uptime.

- API key : <span class="hidden-api-key">\${api_key}</span>

- Application Key : <span class="app_key" data-name="uptime"></span>

Une fois votre profil Datadog configuré, assignez-le à un groupe de contacts depuis _Alerting > Contacts_. Pour assigner le profil, utilisez le champ **Push Notifications** dans le groupe de contacts.

## Données collectées

### Métriques
{{< get-metrics-from-git "uptime" >}}


### Événements

L'intégration Uptime envoie un événement à votre flux d'événements Datadog lorsqu'une alerte est déclenchée ou résolue.

### Checks de service

Le check Uptime n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptime/images/snapshot.png
[2]: https://uptime.com/integrations/manage/
[3]: https://github.com/DataDog/integrations-extras/blob/master/uptime/metadata.csv
[4]: https://docs.datadoghq.com/fr/help/