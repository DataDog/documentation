---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    nginx_ingress_controller: assets/dashboards/overview.json
  logs:
    source: nginx-ingress-controller
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - containers
  - log collection
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md'
display_name: nginx-ingress-controller
draft: false
git_integration_title: nginx_ingress_controller
guid: 27f6a498-6b3e-41b0-bec4-68db4d3322c3
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nginx_ingress.
metric_to_check: nginx_ingress.nginx.process.count
name: nginx_ingress_controller
public_title: "Intégration Datadog/NGINX\_Ingress\_Controller"
short_description: "Surveillez des métriques relatives au NGINX\_Ingress\_Controller et au NGINX intégré."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille le [NGINX Ingress Controller][1] Kubernetes.

## Configuration

### Installation

Le check `nginx-ingress-controller` est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Si votre Agent s'exécute sur un host, modifiez le fichier `nginx_ingress_controller.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos métriques NGINX Ingress Controller. Consultez le [fichier d'exemple nginx_ingress_controller.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles. Ensuite, [redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de métriques

Par défaut, les métriques NGINX sont recueillies par le check `nginx-ingress-controller`, mais nous vous conseillons d'exécuter le check `nginx` sur le contrôleur Ingress.

Pour ce faire, faites en sorte que la page d'état NGINX soit accessible depuis l'Agent. Pour cela, utilisez le paramètre `nginx-status-ipv4-whitelist` sur le contrôleur et ajoutez les annotations Autodiscovery au pod du contrôleur.

Par exemple, ces annotations activent les checks `nginx` et `nginx-ingress-controller` et la collecte de logs :

| Paramètre            | Valeur                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<CONFIG_INIT>`      | `[{},{}]`                                                                                                          |
| `<CONFIG_INSTANCE>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

Consultez le [fichier d'exemple nginx_ingress_controller.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

**Remarque** : à partir de la version 0.23.0 de `nginx-ingress-controller`, le serveur `nginx` qui effectuait son écoute sur le port `18080` a été supprimé. Il peut être rétabli en ajoutant le `http-snippet` suivant à la ConfigMap de configuration :

```text
  http-snippet: |
    server {
      listen 18080;

      location /nginx_status {
        allow all;
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

| Paramètre      | Valeur                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<CONFIG_LOG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `nginx_ingress_controller` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### Événements

NGINX Ingress Controller n'inclut aucun événement.

### Checks de service

NGINX Ingress Controller n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/