---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/bonsai/README.md
display_name: Bonsai
draft: false
git_integration_title: bonsai
guid: 3c3a1e28-7fd3-443e-a3e1-0c223326a572
integration_id: bonsai
integration_title: Intégration
integration_version: ''
is_public: true
maintainer: dev@onemorecloud.com
manifest_version: 1.0.0
metric_prefix: bonsai.
metric_to_check: bonsai.req.total
name: bonsai
public_title: Intégration Datadog/Bonsai
short_description: Bonsai Managed Elasticsearch
support: contrib
supported_os:
  - linux
  - windows
---
## Présentation

Suivez les métriques associées aux requêtes de vos clusters Bonsai pour :

- Visualiser les performances de vos clusters
- Corréler les performances de recherche avec celles des applications
- Créer des alertes

![snapshot][1]

## Configuration

Pour intégrer votre cluster à Datadog, vous devez envoyer votre clé d'API à l'application Bonsai.

### Obtenir la clé d'API

Dans Datadog, accédez à [Integrations --> API][2] et copiez votre clé d'API.

![snapshot][3]

### Envoyer la clé d'API

Accédez à [Bonsai --> Clusters][4] et cliquez sur le cluster que vous souhaitez intégrer. Sélectionnez l'onglet Manage et faites défiler jusqu'à atteindre le bas de la page.

Collez votre clé d'API dans la section « Datadog Integration » et cliquez sur « Activate Datadog ».

![snapshot][5]

### Vérifier

Si votre clé est valide, l'intégration apparaît alors comme active.

![snapshot][6]

Après quelques minutes, les métriques liées aux requêtes sont disponibles dans votre dashboard Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "bonsai" >}}


Les métriques sont taguées en fonction de leur cluster, vous permettant ainsi de les filtrer. Voici à quoi ressemblent les tags :

```text
cluster:my-cluster-slug
```

### Événements

L'intégration Bonsai n'inclut aucun événement.

### Checks de service

L'intégration Bonsai n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png
[4]: https://app.bonsai.io/clusters
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png
[7]: https://github.com/DataDog/integrations-extras/blob/master/bonsai/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/