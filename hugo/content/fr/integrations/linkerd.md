---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Linkerd - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md
display_name: Linkerd
draft: false
git_integration_title: linkerd
guid: 9aa60dff-4baf-4112-9177-f9c3814dd513
integration_id: linkerd
integration_title: Linkerd
integration_version: 3.2.0
is_public: true
custom_kind: integration
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

## Configuration

### Installation

Le check Linkerd est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `linkerd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1].
   Consultez le [fichier d'exemple linkerd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.
   **Remarque** : il s'agit d'un nouvel exemple de check OpenMetrics par défaut. Si vous avez déjà implémenté cette intégration, consultez l'[exemple pour l'ancienne version][3].

2. [Redémarrez l'Agent][4].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Linkerd v1

| Paramètre            | Valeur                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `linkerd`                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                               |
| `<CONFIG_INSTANCE>`  | `{"openmetrics_endpoint": "http://%%host%%:9990/admin/metrics/prometheus"}` |

 **Remarque** : il s'agit d'un nouvel exemple de check OpenMetrics par défaut. Si vous avez déjà implémenté cette intégration, consultez l'[exemple pour l'ancienne version][2].

##### Linkerd v2

| Paramètre            | Valeur                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `linkerd`                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                               |
| `<CONFIG_INSTANCE>`  | `{"openmetrics_endpoint": "http://%%host%%:4191/metrics"}`                  |

   **Remarque** : il s'agit d'un nouvel exemple de check OpenMetrics par défaut. Si vous avez déjà implémenté cette intégration, consultez l'[exemple pour l'ancienne version][2].


##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][3].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "linkerd", "service": "<NOM_SERVICE>"}` |

Pour augmenter le niveau de détail des logs de plan de données, consultez la section [Modification du niveau des logs de proxy][4] (en anglais).

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[4]: https://linkerd.io/2/tasks/modifying-proxy-log-level/
{{% /tab %}}
{{< /tabs >}}

### Validation

Lancez la [sous-commande status de l'Agent][3] et cherchez `linkerd` dans la section Checks.

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][4] pour découvrir la liste des métriques fournies par cette intégration.

Pour Linkerd v1, consultez le [guide sur les métriques finable][5] (en anglais) et [ce gist][6] pour visualiser un exemple des métriques exposées par Linkerd.

**Remarque** : certaines métriques peuvent ne pas être exposées par Linkerd selon sa configuration.

Pour afficher la liste des métriques exposées par votre configuration actuelle, exécutez :

```bash
curl <endpoint_prometheus_linkerd>
```

`linkerd_prometheus_endpoint` correspond au endpoint Prometheus de Linkerd. Vous devez utiliser la même valeur que la clé de configuration `prometheus_url` dans votre fichier `linkerd.yaml`.

Si vous souhaitez utiliser une métrique qui n'est pas fournie par défaut, vous pouvez ajouter une entrée dans `linkerd.yaml`.

Suivez simplement les exemples fournis dans la [configuration par défaut][7].

### Checks de service
{{< get-service-checks-from-git "linkerd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].



[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[5]: https://twitter.github.io/finagle/guide/Metrics.html
[6]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[7]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/help/