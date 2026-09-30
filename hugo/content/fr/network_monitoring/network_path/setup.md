---
description: Configuration de Network Path
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtenez une visibilité réseau de bout en bout avec Network Path et la surveillance
    SD-WAN
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guide
  text: Détection de la disponibilité des applications à l'aide de Network Insights
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: Guide
  text: Variantes de traceroute de Network Path
is_beta: true
title: Implémentation
---
## Présentation {#overview}

La configuration de Network Path implique de configurer votre environnement pour surveiller et tracer les routes réseau entre vos services et vos endpoints. Cela permet d'identifier les goulots d'étranglement, les problèmes de latence et les points de défaillance potentiels de votre infrastructure réseau. Network Path vous permet de configurer manuellement des chemins réseau individuels, de les découvrir automatiquement ou d'utiliser les deux méthodes simultanément, selon vos besoins.

**Remarque** : Si votre configuration réseau restreint le trafic sortant, suivez les instructions de configuration dans la documentation [Agent proxy configuration][2].

## Configuration {#setup}

<div class="alert alert-info">Cette page couvre la configuration de Network Path pour la configuration basée sur l'Agent dans Network Monitoring. Pour créer des tests Network Path dans Synthetic Monitoring, consultez <a href="/synthetics/network_path_tests/">Network Path Testing in Synthetic Monitoring</a>.</div>

Datadog propose trois méthodes de collecte basées sur l'Agent. Vous pouvez utiliser une méthode seule ou combiner plusieurs méthodes :

| Méthode | Quand l'utiliser |
|--------|-------------|
| **[Tests planifiés](#scheduled-tests)** | Surveillez des paires source-destination spécifiques que vous définissez dans la configuration de l'Agent. Idéal pour suivre un ensemble connu d'endpoints, tels que des API critiques ou des services partenaires. |
| **[Tests dynamiques](#dynamic-tests)** | Découvrez et surveillez automatiquement les chemins en fonction du trafic observé par [Cloud Network Monitoring][1]. Idéal pour une visibilité étendue sans avoir à lister manuellement chaque destination. |
| **[Tests dynamiques pour NetFlow](#dynamic-tests-for-netflow-experimental)** | Exécutez automatiquement des tests Network Path depuis le host de l'Agent vers les adresses IP de destination observées dans [NetFlow Monitoring][6]. Idéal pour ajouter une visibilité des routes saut par saut au trafic NetFlow sans configurer manuellement chaque destination. |

### Tests planifiés {#scheduled-tests}

Vous pouvez surveiller des chemins réseau spécifiques en les définissant dans le fichier de configuration de l'Agent situé à `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

Pour commencer, copiez la [configuration exemple][5], supprimez l'extension `.example` et mettez-la à jour avec les paramètres souhaités, ou utilisez l'une des configurations spécifiques à l'environnement ci-dessous. Pour l'optimisation des performances dans les grands environnements, consultez [augmenter le nombre de workers](#increase-the-number-of-workers).

{{< tabs >}}
{{% tab "Linux" %}}

L'Agent `v7.59+` est requis.

1. Activez le module `system-probe` traceroute dans `/etc/datadog-agent/system-probe.yaml` en ajoutant ce qui suit :

   ```
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller de nouvelles destinations depuis cet Agent en créant ou en modifiant le fichier `/etc/datadog-agent/conf.d/network_path.d/conf.yaml` :

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration pour commencer à voir les chemins réseau.

{{% /tab %}}
{{% tab "macOS" %}}

L'Agent `v7.75+` est requis.

1. Activez le module `system-probe` traceroute dans `/opt/datadog-agent/etc/system-probe.yaml` en ajoutant ce qui suit :

   ```
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller de nouvelles destinations depuis cet Agent en créant ou en modifiant le fichier `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml` :

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration pour commencer à voir les chemins réseau.

{{% /tab %}}
{{% tab "Windows" %}}

L'Agent `v7.72+` est requis.

1. Activez le module `system-probe` traceroute dans `%ProgramData%\Datadog\system-probe.yaml` en ajoutant ce qui suit :

   ```
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller de nouvelles destinations depuis cet Agent en créant ou en modifiant le fichier `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml` :

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack, syn_socket (Windows only)
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: TCP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration pour commencer à voir les chemins réseau.

{{% /tab %}}
{{% tab "Helm" %}}

L'Agent `v7.59+` est requis.

<div class="alert alert-info">Le chart Helm v3.109.1+ est requis. Pour plus d'informations, consultez la <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">documentation du chart Helm Datadog</a> et la documentation <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">pour Kubernetes et Integrations.</a></div>

Pour activer Network Path avec Kubernetes via Helm, ajoutez ce qui suit à votre fichier `values.yaml`.

  ```yaml
  datadog:
    traceroute:
      enabled: true
    confd:
      network_path.yaml: |-
        init_config:
          min_collection_interval: 60 # in seconds, default 60 seconds
        instances:
          # configure the endpoints you want to monitor, one check instance per endpoint
          # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

          - hostname: api.datadoghq.eu # endpoint hostname or IP
            protocol: TCP
            port: 443
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
            min_collection_interval: 120 # set min_collection_interval at the instance level
          ## optional configs:
          # max_ttl: 30 # max traceroute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s
          # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
          # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
          # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

          # more endpoints
          - hostname: 1.1.1.1 # endpoint hostname or IP
            protocol: UDP
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"

```

{{% /tab %}}
{{% tab "Autodiscovery (Kubernetes)" %}}
Datadog Autodiscovery allows you to enable Network Path on a per-service basis through Kubernetes annotations. 

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, see the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a>.</div>

1. Enable the traceroute module in the Datadog `values.yaml` file, which the Network Path integration depends on.

   ```yaml
   datadog:
     traceroute:
       enabled: true
   ```

2. After the module is enabled, Datadog automatically detects Network Path annotations added to your Kubernetes pod. For more information, see [Kubernetes and Integrations][2].

   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_NAME>.checks: |
         {
           "network_path": {
             "init_config": {
               "min_collection_interval": 300
             },
             "instances": [
                   {
                     "protocol": "TCP",
                     "port": 443,
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "api.datadoghq.eu"
                   },
                   {
                     "protocol": "UDP",
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "1.1.1.1"
                   },
             ]
           }
         }
       # (...)
   spec:
     containers:
       - name: '<CONTAINER_NAME>'
   # (...)
   ```
    If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers), add pod annotations under `spec.template.metadata`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: https://docs.datadoghq.com/fr/containers/kubernetes/integrations/?tab=annotations#configuration

{{% /tab %}}
{{< /tabs >}}

#### Increase the number of workers 

Network Path monitoring for individual paths runs as an Agent Integration. The number of concurrent workers is controlled by the `check_runners` setting in the `datadog.yaml` file.

To increase the number of workers, add the following configuration to your `datadog.yaml` file:

```yaml
## @param check_runners - integer - optional - default: 4
## @env DD_CHECK_RUNNERS - integer - optional - default: 4
## The `check_runners` refers to the number of concurrent check runners available for check instance execution.
## The scheduler attempts to spread the instances over the collection interval and will _at most_ be
## running the number of check runners instances concurrently.
##
## The level of concurrency has effects on the Agent's: RSS memory, CPU load, resource contention overhead, etc.
#
check_runners: <NUMBER_OF_WORKERS>
```

### Dynamic tests 

**Prerequisites**: [CNM][1] must be enabled.

Configure dynamic tests to allow the Agent to automatically discover and monitor network paths based on actual network traffic, eliminating the need to manually configure individual endpoints. See [filter syntax](#filter-syntax) to include/exclude domain or IPs.

{{< tabs >}}
{{% tab "Linux" %}}

L'Agent `v7.73+` est requis.

1. Activez le module `system-probe` traceroute dans `/etc/datadog-agent/system-probe.yaml` en ajoutant ce qui suit :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller les connexions CNM en créant ou en modifiant le fichier `/etc/datadog-agent/datadog.yaml` :

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include

    ```

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration pour commencer à voir les chemins réseau.

[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example

{{% /tab %}}
{{% tab "Windows" %}}

L'Agent `v7.73+` est requis.

1. Activez le module `system-probe` traceroute dans `%ProgramData%\Datadog\system-probe.yaml` en ajoutant ce qui suit :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller les connexions CNM en créant ou en modifiant le fichier `%ProgramData%\Datadog\datadog.yaml` :

   <div class="alert alert-info">Si vous activez Network Path sur des <a href="/infrastructure/end_user_device_monitoring/">appareils d'utilisateurs finaux</a>, ignorez cette étape.</div>

   ```yaml
   network_path:
     connections_monitoring:
       enabled: true
     # collector:
       # workers: <NUMBER OF WORKERS> # default 4
   ```

   Pour obtenir tous les détails de configuration, consultez la [configuration exemple][3] ou utilisez ce qui suit :

   ```yaml
   network_path:
     connections_monitoring:
       ## @param enabled - bool - required - default:false
       ## Enable network path collection
       #
       enabled: true
     collector:
       ## @param workers - int - optional - default:4
       ## Number of workers that can collect paths in parallel
       ## Recommendation: leave at default
       #
       # workers: <NUMBER OF WORKERS> # default 4

       #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
       # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
       # pathtest_interval: 10m

       # @param pathtest_ttl - integer - optional - default: 35m
       # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
       # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
       # The TTL is reset each time the connection is seen again.
       # pathtest_ttl: 35m

       ## @param filters - list - optional
       ## Include or exclude specific domains or IP ranges from dynamic monitoring.
       ## Filters are applied sequentially, with later filters taking precedence.
       ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
       #
       # filters:
       #   - match_domain: '*.example.com'
       #     type: exclude
       #   - match_ip: 10.0.0.0/8
       #     type: exclude
       #   - match_domain: 'api.datadoghq.com'
       #     type: include
   ```

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration pour commencer à voir les chemins réseau.

[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example

{{% /tab %}}
{{% tab "Helm" %}}

L'Agent `v7.73+` est requis.

Pour activer Network Path avec Kubernetes via Helm, ajoutez ce qui suit à votre fichier `values.yaml`.
**Remarque :** Le chart Helm v3.124.0+ est requis. Pour plus d'informations, consultez la [documentation du chart Helm Datadog][1] et la documentation pour [Kubernetes et Integrations][2].

```yaml
datadog:
  networkPath:
    connectionsMonitoring:
      enabled: true
  ## Set to true to enable the Traceroute Module of the System Probe
  traceroute:
    enabled: true

  ## @param collector - custom object - optional
  ## Configuration related to Network Path Collector.
  #
  collector:
    ## @param workers - integer - optional - default: 4
    ## @env DD_WORKERS - integer - optional - default: 4
    ## The `workers` refers to the number of concurrent workers available for network path execution.
    #
    # workers: 4
    
    ## @param pathtest_interval - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 30m
    ## The `pathtest_interval` refers to the traceroute run interval for monitored connections.
    #
    # pathtest_interval: 30m

    ## @param pathtest_ttl - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
    ## The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
    ## The TTL is reset each time the connection is seen again.
    #
    # pathtest_ttl: 35m

    ## @param filters - list - optional
    ## Include or exclude specific domains or IP ranges from dynamic monitoring.
    ## Filters are applied sequentially, with later filters taking precedence.
    ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
    #
    # filters:
    #   - match_domain: '*.example.com'
    #     type: exclude
    #   - match_ip: 10.0.0.0/8
    #     type: exclude
    #   - match_domain: 'api.datadoghq.com'
    #     type: include

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/fr/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

### Tests dynamiques pour NetFlow (expérimental) {#dynamic-tests-for-netflow-experimental}

<div class="alert alert-info">Les tests dynamiques pour NetFlow sont expérimentaux et nécessitent l'Agent <code>v7.81+</code>. Pour activer cette fonctionnalité, contactez le support Datadog ou votre équipe de compte.</div>

Configurez les tests dynamiques pour NetFlow afin d'exécuter des tests Network Path depuis le host de l'Agent vers les adresses IP de destination observées dans les enregistrements NetFlow. Les tests dynamiques pour NetFlow ne nécessitent pas [Cloud Network Monitoring][1] ou `network_path.connections_monitoring.enabled`.

Les tests dynamiques pour NetFlow s'exécutent depuis le Datadog Agent qui collecte le trafic NetFlow. Ils ne s'exécutent pas depuis l'exportateur NetFlow, le routeur ou la source de flux d'origine. Déployez l'Agent suffisamment près des sources de flux observées pour que les traceroutes depuis cet Agent représentent les chemins que vous souhaitez étudier.

**Prérequis** :

- [NetFlow Monitoring][6] doit être configuré et recevoir des flux.
- L'Agent `v7.81+` est requis.

{{< tabs >}}
{{% tab "Linux" %}}

1. Activez le module `system-probe` traceroute dans `/etc/datadog-agent/system-probe.yaml` en ajoutant ce qui suit :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Activez les tests dynamiques pour NetFlow dans `/etc/datadog-agent/datadog.yaml` :

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` est requis car les tests dynamiques pour NetFlow ciblent les adresses IP de destination observées et le collecteur de chemin réseau ignore les cibles IP uniquement par défaut.

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration.

{{% /tab %}}
{{% tab "Windows" %}}

1. Activez le module `system-probe` traceroute dans `%ProgramData%\Datadog\system-probe.yaml` en ajoutant ce qui suit :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Activez les tests dynamiques pour NetFlow dans `%ProgramData%\Datadog\datadog.yaml` :

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` est requis car les tests dynamiques pour NetFlow ciblent les adresses IP de destination observées et le collecteur de chemin réseau ignore les cibles IP uniquement par défaut.

3. Redémarrez l'Agent après avoir effectué ces modifications de configuration.

{{% /tab %}}
{{< /tabs >}}

Une fois que l'Agent a rapporté les chemins, ouvrez l'interface utilisateur [Network Path][4] et filtrez par `origin:netflow` pour afficher les chemins générés à partir du trafic NetFlow.

### Syntaxe de filtre {#filter-syntax}

Configurez des filtres pour inclure ou exclure des domaines et des adresses IP, vous permettant de :

- Réduire la surcharge de surveillance pour les réseaux internes
- Se concentrer sur les modèles de trafic externe
- Exclure les plages d'infrastructure connues qui ne nécessitent pas de surveillance

La même liste `network_path.collector.filters` s'applique aux tests dynamiques et aux tests dynamiques pour NetFlow. Pour les tests dynamiques pour NetFlow, utilisez les filtres `match_ip` car les tests dynamiques pour NetFlow ciblent les adresses IP de destination observées.

Pour inclure ou exclure des domaines ou des plages IP spécifiques des tests dynamiques, ajoutez ce qui suit à votre fichier `/etc/datadog-agent/datadog.yaml` :

```yaml
network_path:
  collector:
    filters:
      # exclude single domain
      - match_domain: 'api.slack.com'
        type: exclude

      # exclude domain using `*` wildcard
      - match_domain: '*.datadoghq.com'      # this translates to regex '.*\.datadoghq\.com
        type: exclude
      - match_domain: '*.zoom.us'
        match_domain_strategy: wildcard      # use simple wildcard matching (wildcard matching is the default)
        type: exclude

      # exclude single IP or using CIDR notation
      - match_ip: 10.10.10.10
        type: exclude
      - match_ip: 10.20.0.0/24
        type: exclude

      # exclude using regex
      - match_domain: '.*\.zoom\.us'
        match_domain_strategy: regex         # use regex matching strategy
        type: exclude

      # include
      - match_domain: 'api.datadoghq.com'
        type: include
```

**Note** : 
Les filtres sont appliqués séquentiellement, les filtres ultérieurs ayant priorité sur les précédents.

Par exemple, tous les domaines correspondant à `*.datadoghq.com` sont ignorés, à l'exception de `api.datadoghq.com`.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### Résolution de l'adresse IP publique source {#source-public-ip-resolution}

<div class="alert alert-info">La résolution de l'adresse IP publique source est disponible dans l'Agent v7.75+.</div>

Network Path résout l'adresse IP publique du host source pour fournir une visualisation précise du chemin pour le trafic à destination d'Internet. L'Agent contacte des services externes de check d'IP via HTTPS pour déterminer l'adresse IP publique du host.

Cette fonctionnalité **n'est pas requise** pour le fonctionnement de Network Path. Si ces services sont inaccessibles, Network Path continue de fonctionner normalement, mais l'adresse IP publique source n'est pas résolue et les visualisations de chemin n'affichent pas les métadonnées de l'IP source.

Si votre réseau restreint le trafic sortant et que vous souhaitez une résolution de l'adresse IP publique source, ajoutez les URL suivantes à la liste d'autorisation de votre pare-feu :

| URL | Fournisseur |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

L'Agent essaie chaque service dans l'ordre et utilise la première réponse réussie. Toutes les requêtes sont effectuées via HTTPS (port 443).

## Dépannage {#troubleshooting}

Utilisez les directives suivantes pour résoudre les problèmes liés à Network Path. Si vous avez besoin d'aide supplémentaire, contactez le [support Datadog][3].

### Aucune donnée Network Path dans l'interface utilisateur {#no-network-path-data-in-the-ui}

Si aucune donnée n'apparaît dans l'interface utilisateur [Network Path][4], il est possible que la fonctionnalité ne soit pas entièrement activée. Network Path nécessite les éléments suivants :

1. Le module traceroute doit être activé dans votre fichier `system-probe.yaml` :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Au moins une fonctionnalité Network Path doit être active, telle que :

   - [Tests planifiés](#scheduled-tests) configurés via le fichier `conf.d/network_path.d`.
   - [Tests dynamiques](#dynamic-tests) configurés en activant à la fois `network_path.connections_monitoring.enabled` et [Cloud Network Monitoring][1].
   - [Tests dynamiques pour NetFlow](#dynamic-tests-for-netflow-experimental) configurés en activant `network_path.netflow_monitoring.enabled` et [NetFlow Monitoring][6].

### Aucune donnée de tests dynamiques pour NetFlow dans l'interface utilisateur {#no-dynamic-tests-for-netflow-data-in-the-ui}

Si aucun chemin avec `origin:netflow` n'apparaît dans l'interface utilisateur [Network Path][4], vérifiez les points suivants :

1. L'Agent est en version `7.81+`.
2. [NetFlow Monitoring][6] est activé et reçoit des flux.
3. Le module traceroute est activé dans `system-probe.yaml`.
4. `network_path.netflow_monitoring.enabled` et `network_path.collector.monitor_ip_without_domain` sont définis sur `true` dans `datadog.yaml`.
5. Votre configuration `network_path.collector.filters` n'exclut pas les adresses IP de destination que vous prévoyez de surveiller.

Les tests dynamiques pour NetFlow ignorent automatiquement les enregistrements NetFlow dont l'adresse IP source est attribuée au host de l'Agent avant que les filtres de destination ne soient évalués. Cela empêche les boucles d'auto-planification et constitue un comportement attendu. Pour les cas de NAT ou d'alias où le trafic provenant de l'Agent apparaît à partir d'une autre adresse IP source, utilisez `network_path.collector.source_excludes` pour exclure ces adresses IP sources.

Filtrez ensuite l'interface utilisateur Network Path pour `origin:netflow`.

### Erreur : code d'état : 404 {#error-status-code-404}

Si vous rencontrez une erreur telle que la suivante :

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - Ceci indique que le module traceroute n'est pas activé. Assurez-vous que le module traceroute est activé dans votre fichier `system-probe.yaml`.



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/cloud_network_monitoring/setup/
[2]: /fr/agent/configuration/proxy/?tab=linux
[3]: /fr/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[6]: /fr/network_monitoring/netflow/
[15]: /fr/synthetics/network_path_tests/