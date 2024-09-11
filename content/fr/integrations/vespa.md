---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md
display_name: Vespa
draft: false
git_integration_title: vespa
guid: 810e2a6e-4aa4-4b03-b5a4-563f3752f0eb
integration_id: vespa
integration_title: Vespa
integration_version: 1.1.0
is_public: true
custom_kind: integration
maintainer: dd@vespa.ai
manifest_version: 1.0.0
metric_prefix: vespa.
metric_to_check: vespa.mem.heap.free.average
name: vespa
public_title: Intégration Datadog/Vespa
short_description: Surveillance de l'état et des performances du moteur de traitement
  big data Vespa
support: contrib
supported_os:
- linux
---



## Présentation

Recueillez des métriques de votre système [Vespa][1] en temps réel pour :

- Visualiser et surveiller l'état et les performances de Vespa
- Envoyer des alertes sur l'état et la disponibilité

## Configuration

Le check Vespa n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Vespa sur votre host. Consultez la rubrique [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

Pour configurer le check Vespa :

1. Créez un dossier `vespa.d/` dans le dossier `conf.d/` à la racine du [répertoire de configuration de l'Agent][5].
2. Créez un fichier `conf.yaml` dans le dossier `vespa.d/` précédemment créé.
3. Consultez le [fichier d'exemple vespa.d/conf.yaml][6] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` pour configurer le `consumer`, qui détermine l'ensemble de métriques transmises par le check :
   - `consumer` : consommateur pour lequel recueillir les métriques. Peut être défini sur `default` ou sur un [consommateur personnalisé][7].
     à partir du services.xml de votre application Vespa.
5. [Redémarrez l'Agent][8].

### Validation

Lancez la [sous-commande status de l'Agent][9] et cherchez `vespa` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vespa" >}}


### Événements

L'intégration Vespa n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "vespa" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[7]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/vespa/assets/service_checks.json
[12]: https://docs.datadoghq.com/fr/help/