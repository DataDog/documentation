---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- cloud
creates_events: false
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/convox/README.md
display_name: Convox
draft: false
git_integration_title: convox
guid: e8b1f8a7-8859-4c85-81bd-044400854e59
integration_id: convox
integration_title: Convox
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: convox
public_title: Intégration Datadog/Convox
short_description: Convox est une plate-forme en tant que service open source conçue
  pour garantir une confidentialité totale sans le moindre besoin de maintenance.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques de Convox en temps réel pour visualiser les performances de vos conteneurs :

![snapshot][1]

## Configuration

Consultez la documentation Convox pour [configurer Datadog][2] (en anglais).

### Déployer l'Agent Datadog

Vous pouvez déployer l'Agent Datadog en tant qu'app Convox. Pour ce faire, il vous suffit d'utiliser un manifeste `docker-compose.yml` très simple :

```shell
# consulter le référentiel
$ git clone https://github.com/convox-examples/dd-agent.git
$ cd dd-agent

# déployer le secret et l'app de l'Agent
$ convox apps create
$ convox env set API_KEY=<votre clé d'api>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

Utilisez un `count` correspondant au paramètre `InstanceCount` de votre rack.

### Mise à l'échelle automatique

Si vous activez la mise à l'échelle automatique de votre rack, vous devrez mettre à l'échelle de façon dynamique le nombre d'Agents Datadog afin qu'il corresponde au total d'instances du rack.

Consultez le [tutoriel sur l'écoute des événements ECS CloudWatch][3] (en anglais) pour obtenir des instructions à ce sujet.

## Données collectées

### Métriques

Le check Convox n'inclut aucune métrique

### Événements

Le check Convox n'inclut aucun événement.

### Checks de service

Le check Convox n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png
[2]: https://docs.convox.com/integrations/monitoring/datadog
[3]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html
[4]: https://docs.datadoghq.com/fr/help/