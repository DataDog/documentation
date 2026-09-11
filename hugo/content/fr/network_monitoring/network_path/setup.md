---
description: Configuration du chemin réseau
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtenez une visibilité de bout en bout sur le réseau avec le chemin réseau
    et la surveillance SD-WAN
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guide
  text: Détection de la disponibilité des applications à l'aide de Network Insights
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: Guide
  text: Variantes de traceroute du chemin réseau
is_beta: true
title: Implémentation
---
## Aperçu {#overview}

La configuration du chemin réseau implique de configurer votre environnement pour surveiller et tracer les routes réseau entre vos services et points de terminaison. Cela aide à identifier les goulets d'étranglement, les problèmes de latence et les points de défaillance potentiels dans votre infrastructure réseau. Le chemin réseau vous permet de configurer manuellement des chemins réseau individuels, de les découvrir automatiquement ou d'utiliser les deux méthodes simultanément, en fonction de vos besoins.

**Remarque** : Si votre configuration réseau restreint le trafic sortant, suivez les instructions de configuration dans la documentation [Agent proxy configuration][2].

## Configuration {#setup}

<div class="alert alert-info">Cette page couvre la configuration du chemin réseau pour la configuration basée sur l'Agent dans Network Monitoring. Pour créer des tests de chemin réseau dans Synthetic Monitoring, voir <a href="/synthetics/network_path_tests/">Tests de chemin réseau dans Synthetic Monitoring</a>.</div>

Datadog fournit deux méthodes de collecte basées sur l'Agent. Vous pouvez utiliser l'une ou l'autre méthode seule ou combiner les deux :

| Méthode | Quand utiliser |
|--------|-------------|
| **[Tests programmés&nbsp;](#scheduled-tests)** | Surveillez des paires source-destination spécifiques que vous définissez dans la configuration de l'Agent. Idéal pour suivre un ensemble connu de points de terminaison, tels que des API critiques ou des services partenaires. |
| **[Tests dynamiques&nbsp;](#dynamic-tests)** | Découvrez et surveillez automatiquement les chemins en fonction du trafic observé par [Cloud Network Monitoring][1]. Idéal pour une visibilité large sans lister manuellement chaque destination. |

### Tests programmés {#scheduled-tests}

Vous pouvez surveiller des chemins réseau spécifiques en les définissant dans le fichier de configuration de l'Agent situé à `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

Pour commencer, copiez la [configuration d'exemple][5], supprimez l'extension `.example` et mettez-la à jour avec vos paramètres souhaités, ou utilisez l'une des configurations spécifiques à l'environnement ci-dessous. Pour optimiser les performances dans de grands environnements, consultez [augmenter le nombre de workers](#increase-the-number-of-workers).

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

<div class="alert alert-info">La version du chart Helm v3.109.1+ est requise. Pour plus d'informations, consultez la <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">documentation du chart Helm Datadog</a> et la documentation <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">pour Kubernetes et les Intégrations.</a></div>

Pour activer le chemin réseau avec Kubernetes en utilisant Helm, ajoutez ce qui suit à votre fichier `values.yaml`.

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

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

L'Agent `v7.73+` est requis.

1. Activez le module `system-probe` traceroute dans `%ProgramData%\Datadog\system-probe.yaml` en ajoutant ce qui suit :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Activez `network_path` pour surveiller les connexions CNM en créant ou en modifiant le fichier `%ProgramData%\Datadog\datadog.yaml` :

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

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

L'Agent `v7.73+` est requis.

Pour activer le chemin réseau avec Kubernetes en utilisant Helm, ajoutez ce qui suit à votre fichier `values.yaml`.
**Remarque :** La version du chart Helm v3.124.0+ est requise. Pour plus d'informations, consultez la [documentation du chart Helm Datadog][1] et la documentation pour [Kubernetes et les Intégrations][2].

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

#### Syntaxe de filtrage {#filter-syntax}

Configurez des filtres pour inclure ou exclure des domaines et des IP, vous permettant de :

- Réduire la surcharge de surveillance pour les réseaux internes
- Se concentrer sur les modèles de trafic externes
- Exclure les plages d'infrastructure connues qui ne nécessitent pas de surveillance

Pour inclure ou exclure des domaines spécifiques ou des plages d'IP des tests dynamiques, ajoutez ce qui suit à votre fichier `/etc/datadog-agent/datadog.yaml` :

```yaml
network_path:
  connections_monitoring:
    enabled: true
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

**Remarque**: 
Les filtres sont appliqués de manière séquentielle, les filtres ultérieurs ayant la priorité sur les précédents.

Par exemple, tous les domaines correspondant à `*.datadoghq.com` sont ignorés, sauf `api.datadoghq.com`.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### Résolution de l'IP publique source {#source-public-ip-resolution}

<div class="alert alert-info">La résolution de l'IP publique source est disponible dans l'Agent v7.75+.</div>

Le chemin réseau résout l'adresse IP publique de l'hôte source pour fournir une visualisation précise du chemin pour le trafic sortant vers Internet. L'Agent contacte des services de vérification d'IP externes via HTTPS pour déterminer l'IP publique de l'hôte.

Cette fonctionnalité n'est **pas requise** pour le bon fonctionnement du chemin réseau. Si ces services sont inaccessibles, le chemin réseau continue de fonctionner normalement, mais l'IP publique source n'est pas résolue et les visualisations de chemin ne montrent pas les métadonnées de l'IP source.

Si votre réseau restreint le trafic sortant et que vous souhaitez la résolution de l'IP publique source, ajoutez les URL suivantes à votre liste blanche de pare-feu :

| URL | Fournisseur |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

L'Agent essaie chaque service dans l'ordre et utilise la première réponse réussie. Toutes les requêtes sont effectuées via HTTPS (port 443).

## Dépannage {#troubleshooting}

Utilisez les directives suivantes pour résoudre les problèmes liés au chemin réseau. Si vous avez besoin d'aide supplémentaire, contactez [Datadog Support][3].

### Aucune donnée de chemin réseau dans l'interface utilisateur {#no-network-path-data-in-the-ui}

Si aucune donnée n'apparaît dans l'interface utilisateur [Network Path][4], la fonctionnalité peut ne pas être entièrement activée. Le chemin réseau nécessite ce qui suit :

1. Le module traceroute doit être activé dans votre fichier `system-probe.yaml` :

   ```yaml
   traceroute:
     enabled: true
   ```

2. Au moins une fonctionnalité de chemin réseau doit être active, telle que :

   - [Des chemins individuels](#monitor-individual-paths) configurés via le fichier `conf.d/network_path.d`.
   - Des chemins de trafic réseau [ expérimentaux](#network-traffic-paths-experimental) configurés en activant à la fois `network_path.connections_monitoring` et [Cloud Network Monitoring][1](CNM).

### Erreur : code d'état : 404 {#error-status-code-404}

Si vous rencontrez une erreur comme suit :

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - Cela indique que le module traceroute n'est pas activé. Assurez-vous que le module traceroute est activé dans votre fichier `system-probe.yaml`.



## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/fr/agent/configuration/proxy/?tab=linux
[3]: /fr/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[15]: /fr/synthetics/network_path_tests/