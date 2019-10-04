---
assets:
  dashboards: {}
  monitors: {}
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
git_integration_title: nginx_ingress_controller
guid: 27f6a498-6b3e-41b0-bec4-68db4d3322c3
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
is_public: true
kind: integration
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

## Implémentation

### Installation

Le check `nginx-ingress-controller` est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `nginx_ingress_controller.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos métriques NGINX Ingress Controller. Consultez le [fichier d'exemple nginx_ingress_controller.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

#### Collecte de logs

Rassemblez vos logs de NGINX Ingress Controller, y compris Weave NPC et Weave Kube, et envoyez-les à Datadog.

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration daemonSet][4] :

```
(...)
  env:
    (...)
    - name: DD_LOGS_ENABLED
        value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
        value: "true"
(...)
```

* Assurez-vous que le socket Docker est monté sur l'Agent Datadog comme dans [ce manifeste][5].

* [Redémarrez l'Agent][3].

### Configuration du check NGINX (facultative)

Par défaut, les métriques NGINX sont recueillies par le check `nginx-ingress-controller`, mais nous vous conseillons d'exécuter le check `nginx` sur le contrôleur Ingress.

Pour ce faire, faites en sorte que la page d'état NGINX soit accessible depuis l'Agent. Pour cela, utilisez le paramètre `nginx-status-ipv4-whitelist` sur le contrôleur et ajoutez les annotations Autodiscovery au pod du contrôleur.

Par exemple, ces annotations activent les checks `nginx` et `nginx-ingress-controller` et la collecte de logs :

```text
ad.datadoghq.com/nginx-ingress-controller.check_names: '["nginx","nginx_ingress_controller"]'
ad.datadoghq.com/nginx-ingress-controller.init_configs: '[{},{}]'
ad.datadoghq.com/nginx-ingress-controller.instances: '[{"nginx_status_url": "http://%%host%%/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]'
ad.datadoghq.com/nginx-ingress-controller.logs: '[{"service": "controller", "source":"nginx-ingress-controller"}]'
```

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `nginx_ingress_controller` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nginx_ingress_controller" >}}


### Checks de service

NGINX Ingress Controller n'inclut aucun check de service.

### Événements

NGINX Ingress Controller n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#create-manifest
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}