---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - security
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/cyral/README.md'
display_name: Cyral
draft: false
git_integration_title: cyral
guid: 2a854a73-b0da-4954-b34e-fc1cd05ba8e8
integration_id: cyral
integration_title: Cyral
is_public: true
kind: integration
maintainer: product@cyral.com
manifest_version: 1.0.0
metric_prefix: cyral.
metric_to_check: cyral.analysis_time
name: cyral
public_title: Cyral
short_description: Recueillez des métriques runtime à partir d'une instance Cyral qui surveille MySQL.
support: contrib
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller un sidecar MySQL [Cyral[1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Cyral sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][6].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-cyral==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].

### Configuration

1. Modifiez le fichier `cyral.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Cyral. Consultez le [fichier d'exemple cyral.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `cyral` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cyral" >}}


### Checks de service

Cyral n'inclut aucun check de service.

### Événements

Cyral n'inclut aucun événement.

## Dépannage

### Connexion de l'Agent impossible

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Vérifiez que le paramètre `url` dans `cyral.yaml` est correctement configuré.

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://cyral.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/