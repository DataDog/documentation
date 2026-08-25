---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Envoy - Overview: assets/dashboards/envoy_overview.json
  logs:
    source: envoy
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- web
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/envoy/README.md
display_name: Envoy
draft: false
git_integration_title: envoy
guid: 007f4e6c-ac88-411e-ad81-f0272539b5ff
integration_id: envoy
integration_title: Envoy
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.server.uptime
name: envoy
public_title: Intégration Datadog/Envoy
short_description: Envoy est un proxy de périmètre et de service open source.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check recueille les métriques d'observation système distribuées d'[Envoy][1].

## Configuration

### Installation

Le check Envoy est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

#### Istio

Si vous utilisez Envoy avec [Istio][3], configurez l'intégration Envoy afin de recueillir des métriques à partir de l'endpoint de métriques proxy Istio.

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

#### Standard

Il existe deux façons de configurer l'endpoint `/stats` :

##### Endpoint stats non sécurisé

Voici un exemple de configuration de l'interface d'administration Envoy :

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### Endpoint stats sécurisé

Créez un écouteur/vhost qui redirige vers [l'endpoint administrateur][4] (Envoy se connecte à lui-même), mais qui ne comporte qu'une route pour `/stats` ; les autres routes génèrent une réponse statique ou une erreur. Cela permet également de réaliser une intégration adéquate aux filtres L3 pour l'authentification, par exemple.

L'exemple de configuration suivant provient de [envoy_secured_stats_config.json][5] :

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### Procédure à suivre

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `envoy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance Envoy. Consultez le [fichier d'exemple envoy.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
        ## @param openmetrics_endpoint - string - required
        ## The URL exposing metrics in the OpenMetrics format.
        #
      - openmetrics_endpoint: http://localhost:8001/stats/prometheus

    ```

2. Vérifiez si l'Agent Datadog peut accéder à l'[endpoint admin][3] d'Envoy.
3. [Redémarrez l'Agent][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Modifiez ensuite `envoy.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log Envoy.

   ```yaml
   logs:
     - type: file
       path: /var/log/envoy.log
       source: envoy
       service: envoy
   ```

3. [Redémarrez l'Agent][4].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[3]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                       |
| -------------------- | ------------------------------------------- |
| `<NOM_INTÉGRATION>` | `envoy`                                     |
| `<CONFIG_INIT>`      | vide ou `{}`                               |
| `<CONFIG_INSTANCE>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
 **Remarque** : la version actuelle du check (1.26.0+) utilise [OpenMetrics][2] pour la collecte de métriques, ce qui nécessite Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cette configuration][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][4].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "envoy", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[3]: https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `envoy` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "envoy" >}}


Consultez [metrics.py][7] pour y découvrir la liste des tags envoyés par chaque métrique.

### Événements

Le check Envoy n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "envoy" >}}


## Dépannage

### Problèmes courants

#### Impossible d'atteindre l'endpoint `/server_info`
- Si l'endpoint n'est pas disponible dans votre environnement Envoy, désactivez l'option `collect_server_info` dans votre configuration Envoy afin de réduire le volume des logs d'erreur.

**Remarque** : aucune donnée sur la version d'Envoy n'est recueillie.

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[8]: https://docs.datadoghq.com/fr/help/