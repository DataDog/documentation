---
assets:
  dashboards:
    Postman API Dashboard: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/postman/README.md
display_name: Postman
draft: false
git_integration_title: postman
guid: c678faae-1fc2-420b-83af-e973441b99de
integration_id: postman
integration_title: Postman
integration_version: ''
is_public: true
custom_kind: integration
maintainer: integrations-partnerships@postman.com
manifest_version: 1.0.0
metric_prefix: postman
metric_to_check: postman.monitor.run.total_latency
name: postman
public_title: Postman
short_description: Analysez vos métriques et générez des événements dans Datadog à
  partir de vos exécutins de Postman.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

[Postman][1] est une plateforme API qui simplifie la création de nouvelles API et améliore la collaboration afin de développer des API plus performantes plus rapidement.

L'intégration vous permet de surveiller en permanence la santé de vos monitors. Vous pourrez notamment :

- Analyser les métriques associées aux exécutions de Postman Monitoring dans Datadog

- Générer des événements en cas de réussite ou d'échec d'une exécution

## Configuration

Vous trouverez des instructions détaillées dans la [documentation de Postman][2] (en anglais). Les intégrations Postman nécessitent une offre [Team, Business ou Enterprise][3] Postman.

### Configuration

1. Générez une [clé d'API][4] Datadog.
2. Connectez-vous à votre compte Postman, puis accédez à l'[intégration Datadog][5].
3. Sélectionnez Add Integration
4. Pour envoyer vos métriques de monitor et vos événements à Datadog :
   - Donnez un nom à votre intégration.
   - Sélectionnez le monitor dont vous souhaitez envoyer les données à Datadog.
   - Saisissez votre clé d'API Datadog.
   - Sélectionnez la région Datadog que vous souhaitez utiliser.
   - Vous pouvez choisir d'envoyer les événements uniquement, les métriques uniquement, ou les deux à chaque exécution.
5. Ensuite, sélectionnez Add Integration pour finir de configurer l'intégration.

![Configurer l'intégration][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "postman" >}}


### Checks de service

Postman n'inclut aucun check de service.

### Événements

Un événement est généré chaque fois qu'un monitor s'exécute dans Postman. La gravité de l'événement dépend des tests du monitor Postman :

| Gravité | Description                                                           |
|----------|-----------------------------------------------------------------------|
| `Low`    | Aucun test n'a échoué                                                 |
| `Normal` | Certains tests ont échoué ou une erreur est survenue lors de l'exécution d'un événement. |

## Dépannage

Besoin d'aide ? Contactez l'[assistance Postman][8].

[1]: https://www.postman.com/
[2]: https://learning.postman.com/docs/integrations/available-integrations/datadog/
[3]: https://www.postman.com/pricing/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://go.postman.co/integrations/service/datadog
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/postman/images/add-integration-datadog.jpeg
[7]: https://github.com/DataDog/integrations-extras/blob/master/postman/metadata.csv
[8]: https://www.postman.com/support/