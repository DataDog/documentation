---
assets:
  dashboards:
    Envoy - Overview: assets/dashboards/envoy_overview.json
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
  - 'https://github.com/DataDog/integrations-core/blob/master/envoy/README.md'
display_name: Envoy
git_integration_title: envoy
guid: 007f4e6c-ac88-411e-ad81-f0272539b5ff
integration_id: envoy
integration_title: Envoy
is_public: true
kind: integration
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

## Implémentation

### Installation

Le check Envoy est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

#### Via Istio

Si vous utilisez Envoy avec [Istio][3], vous devez définir le [proxyAdminPort][5] d'Istio pour accéder à l'[endpoint admin][4] d'Envoy.

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

Créez un écouteur/vhost qui redirige vers l'endpoint administrateur (Envoy se connecte à lui-même), mais qui ne comporte qu'un chemin pour `/stats` ; les autres chemins génèrent une réponse statique ou une erreur. Cela permet également de réaliser une intégration adéquate aux filtres L3 pour l'authentification, par exemple.

Voici un exemple de configuration (à partir de [ce gist][6]) :

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

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `envoy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos données de performance Envoy. Consultez le [fichier d'exemple envoy.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
      ## @param stats_url - string - required
      ## The admin endpoint to connect to. It must be accessible:
      ## https://www.envoyproxy.io/docs/envoy/latest/operations/admin
      ## Add a `?usedonly` on the end if you wish to ignore
      ## unused metrics instead of reporting them as `0`.
      #
      - stats_url: http://localhost:80/stats
    ```

2. Vérifiez si l'Agent Datadog peut accéder à l'[endpoint admin][4] d'Envoy.
3. [Redémarrez l'Agent][9].

###### Filtrer les métriques

Les métriques peuvent être filtrées grâce à l'expression régulière `metric_whitelist` ou `metric_blacklist`. Si les deux paramètres sont utilisés, la liste d'inclusion (whitelist) est alors d'abord appliquée, puis la liste d'exclusion (blacklist) est appliquée sur les résultats.

Le filtrage a lieu avant l'extraction des tags. Vous pouvez donc utiliser certains tags pour choisir de conserver ou d'ignorer certaines métriques. La liste exhaustive de toutes les métriques et de tous les tags est disponible sur [metrics.py][10]. Voici un exemple d'ajout de tags pour les métriques Envoy.

```python
...
'cluster.grpc.success': {
    'tags': (
        ('<NOM_CLUSTER>', ),
        ('<SERVICE_GRPC>', '<MÉTHODE_GRPC>', ),
        (),
    ),
    ...
},
...
```

Voici `3` séquences de tags : `('<NOM_CLUSTER>')`, `('<SERVICE_GRPC>', '<MÉTHODE_GRPC>')` et `()` vide. Le nombre de séquences correspond exactement au nombre de sections de métriques. Pour cette métrique, il y a `3` sections : `cluster`, `grpc` et `success`. Envoy sépare chaque élément avec le caractère `.`. Le nom final de la métrique est donc :

`cluster.<NOM_CLUSTER>.grpc.<SERVICE_GRPC>.<MÉTHODE_GRPC>.success`

Si seuls le nom de cluster et le service gRPC vous intéressent, ajoutez le code suivant à votre liste d'inclusion :

`^cluster\.<NOM_CLUSTER>\.grpc\.<SERVICE_GRPC>\.`

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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

3. [Redémarrez l'Agent][9].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][11] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                      |
| -------------------- | ------------------------------------------ |
| `<NOM_INTÉGRATION>` | `envoy`                                    |
| `<CONFIG_INIT>`      | vide ou `{}`                              |
| `<CONFIG_INSTANCE>`  | `{"stats_url": "http://%%host%%:80/stats}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [collecte de logs avec Docker][12].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "envoy", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][13] et recherchez `envoy` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "envoy" >}}


Consultez [metrics.py][10] pour y découvrir la liste des tags envoyés par chaque métrique.

### Événements

Le check Envoy n'inclut aucun événement.

### Checks de service

**envoy.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Envoy pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://istio.io/docs/reference/config
[6]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[11]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[12]: https://docs.datadoghq.com/fr/agent/docker/log/
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/envoy/metadata.csv
[15]: https://docs.datadoghq.com/fr/help