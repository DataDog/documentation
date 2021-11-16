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
  - 'https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md'
display_name: Vespa
draft: false
git_integration_title: vespa
guid: 810e2a6e-4aa4-4b03-b5a4-563f3752f0eb
integration_id: vespa
integration_title: Vespa
is_public: true
kind: integration
maintainer: dd@vespa.ai
manifest_version: 1.0.0
metric_prefix: vespa.
metric_to_check: vespa.mem.heap.free.average
name: vespa
public_title: Intégration Datadog/Vespa
short_description: Surveillance de l'état et des performances du moteur de traitement big data Vespa
support: contrib
supported_os:
  - linux
---
## Présentation

Recueillez des métriques de votre système [Vespa][1] en temps réel pour :

- Visualiser et surveiller l'état et les performances de Vespa
- Envoyer des alertes sur l'état et la disponibilité

## Configuration

Le check Vespa n'est pas inclus avec le package de l'[Agent Datadog][2].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Vesoa sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```
3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

Pour configurer le check Vespa :

1. Créez un dossier `vespa.d/` dans le dossier `conf.d/` à la racine du [répertoire de configuration de l'Agent][7].
2. Créez un fichier `conf.yaml` dans le dossier `vespa.d/` précédemment créé.
3. Consultez le [fichier d'exemple vespa.d/conf.yaml][8] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` pour configurer le `consumer`, qui détermine l'ensemble de métriques transmises par le check :
   - `consumer` : consommateur pour lequel recueillir les métriques. Peut être défini sur `default` ou un [consommateur personnalisé][9]
     à partir du services.xml de votre application Vespa.
5. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `vespa` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vespa" >}}


### Checks de service

**vespa.metrics_health** :<br>
Renvoie `CRITICAL` en cas d'absence de réponse de l'[API Node metrics][10] Vespa. Renvoie `WARNING` si une réponse est renvoyée par l'[API Node metrics][10] Vespa, mais qu'une erreur de traitement est survenue. Si ce n'est pas le cas, renvoie `OK`.

**vespa.process_health** :<br>
Pour chaque processus Vespa, renvoie `CRITICAL` si le processus semble être inactif (l'[API Node metrics][10] Vespa n'a pas pu se connecter au processus).
Renvoie `WARNING` si le statut du processus est inconnu (l'[API Node metrics][10] Vespa peut se connecter au processus, mais la réponse contient une erreur). Si ce n'est pas le cas, renvoie `OK`.

### Événements

L'intégration Vespa n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[9]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[10]: https://docs.vespa.ai/documentation/reference/metrics.html#node-metrics-api