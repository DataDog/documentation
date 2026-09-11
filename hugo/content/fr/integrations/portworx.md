---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md
display_name: Portworx
draft: false
git_integration_title: portworx
guid: 858a4b03-3f75-4019-8ba8-46b00d5aeb46
integration_id: portworx
integration_title: Portworx
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: paul@portworx.com
manifest_version: 1.0.0
metric_prefix: portworx.
metric_to_check: portworx.cluster.cpu_percent
name: portworx
public_title: Intégration Datadog/Portworx
short_description: Recueillez des métriques runtime à partir d'une instance Portworx.
support: contrib
supported_os:
- linux
---



## Présentation

Recueillez des métriques à partir du service Portworx en temps réel pour :

- Surveiller les performances et la santé de votre cluster Portworx
- Suivre l'utilisation du disque, la latence et le débit de volumes Portworx

## Configuration

Le check Portworx n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Portworx sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-portworx==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `portworx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Portworx. Consultez le [fichier d'exemple portworx.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
     # url of the metrics endpoint of prometheus
     - prometheus_endpoint: http://localhost:9001/metrics
    ```

2. [Redémarrez l'Agent][6].

### Validation

Lorsque vous [exécutez la sous-commande `info` de l'Agent][7], voici ce qui s'affiche :

## Compatibilité

Le check Portworx est compatible avec Portworx 1.4.0 et les versions antérieures existantes.

## Données collectées

### Métriques
{{< get-metrics-from-git "portworx" >}}


### Événements

Le check Portworx n'inclut aucun événement.

## Dépannage

### Connexion de l'Agent impossible

```text
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

Vérifiez que le paramètre `url` dans `portworx.yaml` est correctement configuré.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveillance de stockage en conteneurs sur plusieurs clouds avec Portworx et Datadog][9]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-status-and-information/
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[9]: https://www.datadoghq.com/blog/portworx-integration/