---
assets:
  dashboards:
    Linkerd - Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
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
metric_to_check: linkerd.prometheus.health
name: linkerd
public_title: Intégration Datadog/Linkerd
short_description: Surveillez la santé de vos services grâce aux métriques de Linkerd.
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

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `linkerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
Consultez le [fichier d'exemple linkerd.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                 |
|----------------------|-----------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `linkerd`                                                            |
| `<CONFIG_INIT>`      | vide ou `{}`                                                         |
| `<CONFIG_INSTANCE>`  | `{"prometheus_url": "http://%%host%%:9990/admin/metrics/prometheus"}` |

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `linkerd` dans la section Checks.

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][8] pour découvrir la liste des métriques par défaut fournies par cette intégration.

Pour Linkerd v1, consultez la [documentation relative aux métriques finagle][9] (en anglais) pour obtenir une description détaillée de certaines métriques disponibles et [ce gist][10] pour visualiser un exemple des métriques exposées par Linkerd.

Attention : certaines métriques peuvent ne pas être exposées par linkerd selon sa configuration

Pour visualiser la liste des métriques exposées par votre configuration actuelle, exécutez :
```bash
curl <linkerd_prometheus_endpoint>
```
`linkerd_prometheus_endpoint` correspond au endpoint Prometheus de linkerd. Vous devez utiliser la même valeur que la clé de configuration `prometheus_url` dans votre fichier `linkerd.yaml`.

Si vous souhaitez utiliser une métrique qui n'est pas fournie par défaut, vous pouvez ajouter une entrée dans `linkerd.yaml`.

Suivez simplement les exemples fournis dans la [configuration par défaut][4].

### Checks de service

`linkerd.prometheus.health` :
Renvoie CRITICAL si l'Agent ne parvient pas à se connecter au endpoint Prometheus. Si ce n'est pas le cas, renvoie UP.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[9]: https://twitter.github.io/finagle/guide/Metrics.html
[10]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[11]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}