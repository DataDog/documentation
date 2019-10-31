---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md'
display_name: Vespa
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

* Visualiser et surveiller l'état et les performances de Vespa
* Envoyer des alertes sur l'état et la disponibilité

## Implémentation

Le check Vespa n'est pas inclus avec le paquet de l'[Agent Datadog][2].

### Installation

Pour installer le check sur votre host :

1. Installez le [kit de développement][7] sur n'importe quelle machine.
2. Exécutez `ddev release build vespa` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][2].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez 
   `datadog-agent integration install -w chemin/vers/vespa/dist/<NOM_ARTEFACT>.whl`.


### Configuration

Pour configurer le check Vespa :

1. Créez un dossier `vespa.d/` dans le dossier `conf.d/` à la racine du [répertoire de configuration de l'Agent][8].
2. Créez un fichier `conf.yaml` dans le dossier `vespa.d/` précédemment créé.
3. Consultez le [fichier d'exemple vespa.d/conf.yaml][10] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` pour configurer le `consumer`, qui détermine l'ensemble de métriques transmises par le check :
    * `consumer` : consommateur pour lequel recueillir les métriques. Peut être défini sur `default` ou un [consommateur personnalisé][9]
                  à partir du services.xml de votre application Vespa.
5. [Redémarrez l'Agent][3].


### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `vespa` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "vespa" >}}


### Checks de service

**vespa.metrics_health** :<br>
Renvoie `CRITICAL` en cas d'absence de réponse de l'[API Node metrics][11] Vespa. Renvoie `WARNING` si une
réponse est renvoyée par l'[API Node metrics][11] Vespa, mais qu'une erreur de traitement est survenue. Si ce n'est pas le cas, renvoie `OK`.

**vespa.process_health** :<br>
Pour chaque processus Vespa, renvoie `CRITICAL` si le processus semble être inactif (l'[API Node metrics][11] Vespa n'a pas pu se connecter au processus).
Renvoie `WARNING` si le statut du processus est inconnu (l'[API Node metrics][11] Vespa peut se connecter au processus, mais
la réponse contient une erreur). Si ce n'est pas le cas, renvoie `OK`.

### Événements

L'intégration Vespa n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[11]: https://docs.vespa.ai/documentation/reference/metrics.html#node-metrics-api


{{< get-dependencies >}}