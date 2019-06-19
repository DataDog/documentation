---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md'
display_name: Linkerd
git_integration_title: linkerd
guid: 9aa60dff-4baf-4112-9177-f9c3814dd513
integration_id: linkerd
integration_title: Linkerd
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: linkerd.
metric_to_check: linkerd.rt.client.connections
name: linkerd
public_title: Intégration Datadog/Linkerd
short_description: Surveillez la santé de vos services avec des métriques provenant de linkerd.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check recueille les métriques d'observation de systèmes distribués de [Linkerd][1].

## Implémentation

### Installation

Le check Linkerd est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Modifiez le fichier `linkerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
Consultez le [fichier d'exemple linkerd.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `linkerd` dans la section Checks.

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][6] pour découvrir la liste des métriques par défaut fournies par cette intégration.

Consultez la [documentation relative aux métriques finagle][7] (en anglais) pour obtenir une description détaillée de certaines métriques disponibles.
Consultez [ce gist][8] pour obtenir un exemple des métriques exposées par linkerd.

Attention : certaines métriques peuvent ne pas être exposées par linkerd selon sa configuration

Pour visualiser la liste des métriques exposées par votre configuration actuelle, exécutez :
```bash
curl <linkerd_prometheus_endpoint>
```
`linkerd_prometheus_endpoint` correspond au endpoint Prometheus de linkerd. Vous devez utiliser la même valeur que la clé de configuration `prometheus_url` dans votre fichier `linkerd.yaml`.

Si vous devez utiliser une métrique qui n'est pas fournie par défaut, vous pouvez ajouter une entrée vers `linkerd.yaml`.

Suivez simplement les exemples qui figurent dans la [configuration par défaut][4].

### Checks de service

`linkerd.prometheus.health` :
Renvoie CRITICAL si l'Agent ne parvient pas à se connecter au endpoint Prometheus. Si ce n'est pas le cas, renvoie UP.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[7]: https://twitter.github.io/finagle/guide/Metrics.html
[8]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}