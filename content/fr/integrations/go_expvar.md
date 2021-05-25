---
aliases:
  - /fr/integrations/goexpvar
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md'
display_name: Go-Expvar
draft: false
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
short_description: Recueillez les statistiques de mémoire et les métriques instrumentés par Expvar depuis votre service Go.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Go][1]

## Présentation

Surveillez la mémoire utilisée par vos services Go et recueillez des métriques instrumentées à partir du package Expvar de Go.

Si vous préférez instrumenter votre Go en utilisant seulement [dogstats-go][2], vous pouvez tout de même utiliser cette intégration pour recueillir des métriques relatives à la mémoire.

## Configuration

### Installation

Le check Go-Expvar est fourni avec l'Agent. [Installez l'Agent][3] sur les hosts qui exécutent des services Go pour recueillir des métriques.

### Configuration

#### Préparer votre service Go

Si votre service Go n'utilise pas déjà le [package Expvar][4], importez-le (`import "expvar"`). Si vous ne souhaitez pas instrumenter vos propres métriques avec Expvar (p. ex., si vous souhaitez seulement recueillir des métriques sur la mémoire de votre service), importez le paquet en spécifiant un identifiant vide (`import _ "expvar"`). Si votre service n'écoute pas déjà les requêtes HTTP (avec le package http), [configurez une écoute][5] en local uniquement pour l'Agent Datadog.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Associer l'Agent

1. Modifiez le fichier `go_expvar.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple go_expvar.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    **Remarque** : si vous ne configurez pas de liste `metrics`, l'Agent continue de recueillir les métriques memstat. Utilisez `metrics` pour indiquer à l'Agent les variables expvar qui doivent être recueillies.

2. [Redémarrez l'Agent][3].

**Remarque** : l'intégration Go Expvar peut potentiellement générer des [métriques custom][4], ce qui peut avoir une incidence sur votre [facture][5]. Par défaut, une limite de 350 métriques est appliquée. Si vous souhaitez utiliser davantage de métriques, contactez l'[assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[6]: https://docs.datadoghq.com/fr/help/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                    |
| -------------------- | ---------------------------------------- |
| `<NOM_INTÉGRATION>` | `go_expvar`                              |
| `<CONFIG_INIT>`      | vide ou `{}`                            |
| `<CONFIG_INSTANCE>`  | `{"expvar_url": "http://%%host%%:8080"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `go_expvar` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "go_expvar" >}}


### Événements

Le check Go-Expvar n'inclut aucun événement.

### Checks de service

Le check Go-Expvar n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

- [Instrumenter vos applications Go avec Expvar et Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://golang.org/pkg/expvar
[5]: https://golang.org/pkg/net/http/#ListenAndServe
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog