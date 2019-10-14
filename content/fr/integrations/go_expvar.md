---
aliases:
  - /fr/integrations/goexpvar
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md'
display_name: Go-Expvar
git_integration_title: go_expvar
guid: 33557f7a-5f24-43f3-9551-78432894e539
integration_id: go-expvar
integration_title: Go-Expvar
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: go_expvar.
metric_to_check: go_expvar.memstats.alloc
name: go_expvar
public_title: Intégration Datadog/Go-Expvar
short_description: Recueillez les statistiques de mémoire et les métriques instrumentées par Expvar depuis vos services Go. Go service.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Go][1]

## Présentation

Surveillez l'utilisation de la mémoire de vos services Go et recueillez des métriques instrumentées à partir du paquet Expvar de Go.

Si vous préférez instrumenter votre Go en utilisant seulement [dogstats-go][2], vous pouvez tout de même utiliser cette intégration pour recueillir des métriques relatives à la mémoire.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Go-Expvar est fourni avec l'Agent. [Installez l'Agent][4] sur les hosts qui exécutent des services Go pour recueillir des métriques.

### Configuration
#### Préparer votre service Go

Si votre service Go n'utilise pas déjà le [paquet Expvar][5], importez-le (`import "expvar"`). Si vous ne souhaitez pas instrumenter vos propres métriques avec Expvar (p. ex., si vous souhaitez seulement recueillir des métriques sur la mémoire de votre service), importez le paquet en spécifiant un identifiant vide (`import _ "expvar"`).

Si votre service n'écoute pas déjà les requêtes HTTP (avec le paquet http), [configurez une écoute][6] locale uniquement pour l'Agent Datadog.

#### Associer l'Agent

1. Modifiez le fichier `go_expvar.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7]. Consultez le [fichier d'exemple go_expvar.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

    ```yaml
        init_config:

        instances:
          - expvar_url: http://localhost:<your_apps_port>
            # optionally change the top-level namespace for metrics, e.g. my_go_app.memstats.alloc
            namespace: my_go_app # defaults to go_expvar, e.g. go_expvar.memstats.alloc
            # optionally define the metrics to collect, e.g. a counter var your service exposes with expvar.NewInt("my_func_counter")

            metrics:
              - path: my_func_counter
                # if you don't want it named my_go_app.my_func_counter
                #alias: my_go_app.preferred_counter_name
                type: counter # other valid options: rate, gauge
                #tags:
                #  - "tag_name1:tag_value1"
    ```

    Si vous ne configurez pas de liste `metrics`, l'Agent continue de recueillir les métriques memstat. Utilisez `metrics` pour indiquer à l'Agent les variables expvar qui doivent être recueillies.

2. [Redémarrez l'Agent][9] pour commencer à envoyer vos métriques Memstat et Expvar à Datadog.

#### Collecte de métriques
L'intégration Go Expar peut potentiellement générer des [métriques custom][10], ce qui peut avoir une incidence sur votre [facture][11]. Par défaut, une limite de 350 métriques est appliquée. Si vous souhaitez utiliser davantage de métriques, contactez l'[assistance Datadog][12].

### Validation

[Lancez la sous-commande status de l'Agent][13] et cherchez `go_expvar` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "go_expvar" >}}


### Événements
Le check Go-Expvar n'inclut aucun événement.

### Checks de service
Le check Go-Expvar n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

* [Instrumenter vos applications Go avec Expvar et Datadog][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://golang.org/pkg/expvar
[6]: https://golang.org/pkg/net/http/#ListenAndServe
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[11]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics
[12]: https://docs.datadoghq.com/fr/help
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/metadata.csv
[15]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog


{{< get-dependencies >}}