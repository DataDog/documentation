---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cyral Overview: assets/dashboards/cyral_overview.json
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
git_integration_title: cyral
guid: 2a854a73-b0da-4954-b34e-fc1cd05ba8e8
integration_id: cyral
integration_title: Cyral
is_public: false
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

Pour installer le check Cyral sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build cyral` pour générer le package.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/cyral/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `cyral.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Vault. Consultez le [fichier d'exemple cyral.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_url: http://localhost:9018/metrics
    ```

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `cyral` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cyral" >}}


### Checks de service

Cyral n'inclut aucun check de service.

### Événements

Cyral n'inclut aucun événement.

## Dépannage

### Connexion impossible de l'Agent

```text
    cyral
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Vérifiez que le paramètre `url` dans `cyral.yaml` est correctement configuré.

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://cyral.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/cyral/datadog_checks/cyral/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cyral/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/