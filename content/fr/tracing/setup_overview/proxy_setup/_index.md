---
title: Tracing d'un proxy
kind: documentation
further_reading:
  - link: /tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.envoyproxy.io/'
    tag: Documentation
    text: Site Web d'Envoy
  - link: 'https://www.envoyproxy.io/docs/envoy/latest/'
    tag: Documentation
    text: Documentation Envoy
  - link: 'https://www.nginx.com/'
    tag: Documentation
    text: Site Web de NGINX
  - link: 'https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/'
    tag: Documentation
    text: NGINX Ingress Controller OpenTracing
  - link: 'https://github.com/opentracing-contrib/nginx-opentracing'
    tag: Code source
    text: Plug-in NGINX pour OpenTracing
  - link: 'https://istio.io/'
    tag: Documentation
    text: Site Web d'Istio
  - link: 'https://istio.io/docs/'
    tag: Documentation
    text: Documentation Istio
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Code source
    text: Client Datadog OpenTracing C++
aliases:
  - /fr/tracing/proxies/envoy
  - /fr/tracing/envoy/
  - /fr/tracing/proxies/nginx
  - /fr/tracing/nginx/
  - /fr/tracing/istio/
  - /fr/tracing/setup/envoy/
  - /fr/tracing/setup/nginx/
  - /fr/tracing/setup/istio/
  - /fr/tracing/proxies
  - /fr/tracing/setup_overview/envoy/
  - /fr/tracing/setup_overview/nginx/
  - /fr/tracing/setup_overview/istio/
---
Vous pouvez configurer le tracing de façon à recueillir les informations de trace liées aux proxies.

{{< tabs >}}
{{% tab "Envoy" %}}

L'APM Datadog est inclus dans Envoy v1.9.0 et les versions ultérieures.

## Activer l'APM Datadog

**Remarque** : l'exemple de configuration ci-dessous s'applique à Envoy v1.14.
D'autres exemples de configuration pour des versions plus anciennes sont disponibles [ici][1]

Trois paramètres sont requis pour activer l'APM Datadog dans Envoy :

- Un cluster pour envoyer les traces à l'Agent Datadog
- La configuration de `tracing` pour activer l'extension de l'APM Datadog
- La configuration de `http_connection_manager` pour activer le tracing

Un cluster destiné à l'envoi des traces à l'Agent Datadog doit être ajouté.

```yaml
  clusters:
  ... existing cluster configs ...
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126
```

Il est possible que vous soyez contraint de modifier la valeur du paramètre `address` si Envoy s'exécute dans un conteneur ou un environnement orchestré.

La configuration de tracing d'Envoy doit utiliser l'extension de l'APM Datadog.

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # comparé au nom du cluster
      service_name: envoy-example        # nom de service défini par l'utilisateur
```

La valeur `collector_cluster` doit correspondre au nom fourni pour le cluster de l'Agent Datadog.
Le `service_name` peut être remplacé par une valeur plus adaptée à votre utilisation d'Envoy.

Enfin, les sections `http_connection_manager` doivent inclure un bloc de configuration supplémentaire pour activer le tracing.

```yaml
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          tracing: {}
```

Une fois cette configuration terminée, les requêtes HTTP vers Envoy démarrent et propagent les traces Datadog, qui apparaissent alors dans l'interface de l'APM.

## Exemple de configuration Envoy (pour Envoy v1.14)

Un exemple de configuration est fourni ici pour montrer le placement des éléments requis pour activer le tracing avec l'APM Datadog.

```yaml
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          generate_request_id: true
          tracing: {}
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: service1
          http_filters:
          # Les traces des requêtes de check de santé ne doivent pas être échantillonnées.
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.config.filter.http.health_check.v2.HealthCheck
              pass_through_mode: false
              headers:
                - exact_match: /healthcheck
                  name: :path
          - name: envoy.filters.http.router
            typed_config: {}
          use_remote_address: true
  clusters:
  - name: service1
    connect_timeout: 0.250s
    type: strict_dns
    lb_policy: round_robin
    http2_protocol_options: {}
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # Configurer ce cluster avec l'adresse de l'Agent Datadog
  # pour l'envoi des traces.
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126

tracing:
  # Utiliser le traceur Datadog
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # comparé au nom du cluster
      service_name: envoy-example        # nom de service défini par l'utilisateur

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

## Exclure des métriques

Si vous utilisez la configuration `dog_statsd` d'Envoy pour envoyer les métriques, vous pouvez _exclure_ l'activité du cluster `datadog_agent` avec ce bloc de configuration supplémentaire :

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Variables d'environnement

Les [variables d'environnement][2] dépendent de la version du traceur C++ intégré à Envoy.

**Remarque** : les variables `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT` et `DD_TRACE_AGENT_URL` ne s'appliquent pas à Envoy, l'adresse de l'Agent Datadog étant configurée à l'aide des paramètres `cluster`.

| Version d'Envoy | Version du traceur C++ |
|---------------|--------------------|
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |




[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /fr/tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

L'APM Datadog peut prendre en charge NGINX en utilisant une combinaison de plug-ins et de configurations.
Les instructions ci-dessous utilisent le paquet NGINX disponible dans les [référentiels Linux][1] officiels et des binaires pré-compilés pour les plug-ins.

## Version open source de NGINX

### Installation des plug-ins

**Remarque** : ce plug-in ne fonctionne pas sur les distributions Linux qui utilisent des versions antérieures de `libstdc++`, notamment RHEL/Centos 7 et AmazonLinux 1.
Une solution consiste à exécuter NGINX à partir d'un conteneur Docker. Un exemple de Dockerfile est disponible [ici][2].

Les plug-ins suivants doivent être installés :

- Plug-in NGINX pour OpenTracing - [linux-amd64-nginx-${VERSION_NGINX}-ngx_http_module.so.tgz][3] : installé dans `/usr/lib/nginx/modules`
- Plug-in Datadog OpenTracing C++ - [linux-amd64-libdd_opentracing_plugin.so.gz][4] : installé à un emplacement accessible pour NGINX, p. ex. `/usr/local/lib`

Commandes pour télécharger et installer ces modules :

```bash
# Récupérer le dernier numéro de version depuis Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Installer le plug-in NGINX pour OpenTracing
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Installer le plug-in C++ Datadog pour Opentracing
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### Configuration de NGINX

La configuration de NGINX doit charger le module OpenTracing.

```nginx
# Charger le module OpenTracing
load_module modules/ngx_http_opentracing_module.so;
```

Le bloc `http` active le module OpenTracing et charge le traceur Datadog :

```nginx
    opentracing on; # Activer OpenTracing.
    opentracing_tag http_user_agent $http_user_agent; # Ajouter un tag à chaque trace.
    opentracing_trace_locations off; # Émettre une seule span par requête.

    # Charger l'implémentation de tracing Datadog et le fichier de configuration donné.
    opentracing_load_tracer /usr/local/lib/libdd_opentracing_plugin.so /etc/dd-config.json;
```

Ajoutez les lignes suivantes au bloc `location` dans le serveur où vous souhaitez effectuer le tracing :

```nginx
            opentracing_operation_name "$request_method $uri";
            opentracing_propagate_context;
```

Un fichier de configuration pour l'implémentation du tracing Datadog est également requis :

```json
{
  "environment": "prod",
  "service": "nginx",
  "operation_name_override": "nginx.handle",
  "agent_host": "localhost",
  "agent_port": 8126
}
```

La valeur `service` peut être modifiée afin d'être adaptée à votre utilisation de NGINX.
Il est possible que vous soyez contraint de modifier la valeur `agent_host` si NGINX s'exécute dans un conteneur ou un environnement orchestré.

Exemples complets :

* [nginx.conf][5]
* [dd-config.json][6]

Une fois cette configuration terminée, les requêtes HTTP transmises à NGINX initieront et propageront les traces Datadog, qui s'afficheront dans l'interface graphique de l'APM.

#### NGINX et FastCGI

Lorsque l'emplacement dessert un backend FastCGI au lieu de HTTP, le bloc `location` doit utiliser `opentracing_fastcgi_propagate_context` au lieu de `opentracing_propagate_context`.

## NGINX Ingress Controller pour Kubernetes

Les versions 0.23.0 et ultérieures du contrôleur [Kubernetes ingress-nginx][7] incluent le plug-in NGINX pour OpenTracing.

Pour activer ce plug-in, créez ou modifiez une ConfigMap en définissant `enable-opentracing: "true"` et `datadog-collector-host`, à savoir l'emplacement où les traces doivent être envoyées.
Le nom de la ConfigMap sera cité explicitement par l'argument de ligne de commande du conteneur du contrôleur nginx-ingress. Par défaut, sa valeur est `--configmap=$(POD_NAMESPACE)/nginx-configuration`.
Si ingress-nginx a été installé avec une chart helm, le nom de cette ConfigMap suivra le modèle suivant : `Nom-Version-nginx-ingress-controller`.

Le contrôleur Ingress gère les fichiers `nginx.conf` et `/etc/nginx/opentracing.json`. Le tracing est activé pour tous les blocs `location`.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Valeurs par défaut
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
```

En outre, vérifiez que les spécifications de pod de votre contrôleur nginx-ingress définissent la variable d'environnement `HOST_IP`. Ajoutez cette entrée au bloc `env:` qui contient les variables d'environnement `POD_NAME` et `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Pour définir un nom de service différent selon le contrôleur Ingress à l'aide d'annotations :

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
Ce qui précède remplace le nom de service par défaut `nginx-ingress-controller.ingress-nginx`.



[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: https://github.com/kubernetes/ingress-nginx
{{% /tab %}}
{{% tab "Istio" %}}

Datadog surveille chaque aspect de votre environnement Istio, afin que vous puissiez :
- Plonger au cœur des traces distribuées pour les applications qui effectuent des transactions sur le maillage avec l'APM (voir ci-dessous).
- Évaluer la santé d'Envoy et du plan de contrôle Istio grâce aux [logs][1].
- Consulter en détail les performances de votre maillage de services avec des [métriques][1] sur les requêtes, la bande passante et la consommation de ressources
- Mapper les communications réseau entre les conteneurs, pods et services sur le maillage avec la solution [Network Performance Monitoring][2]

Pour en savoir plus sur la surveillance de votre environnement Istio avec Datadog, [consultez l'article du blog à ce sujet][10] (en anglais).

## Configuration

L'APM Datadog est disponible pour Istio 1.1.3 et ultérieur sur les clusters Kubernetes.

### Installation de l'Agent Datadog

1. [Installez l'Agent][3].
2. [Veillez à ce que l'APM soit activé pour votre Agent][4].
3. Supprimez la mise en commentaire du paramètre `hostPort` pour que les sidecars Istio puissent se connecter à l'Agent et envoyer des traces.


### Installation et configuration d'Istio

Pour activer l'APM Datadog, une [installation Istio personnalisée][5] est requise afin de configurer deux options supplémentaires.

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

Les traces sont générées lorsque l'espace de nommage du pod dispose de la fonctionnalité d'injection de sidecar. Cette opération s'effectue en ajoutant
l'étiquette `istio-injection=enabled`.

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Les traces sont générées lorsque Istio est en mesure de déterminer si le trafic utilise un protocole basé sur HTTP. Par défaut, Istio effectue automatiquement cette vérification. Vous pouvez la configurer manuellement en nommant les ports dans le service et le déploiement de votre application. Reportez-vous à la section relative à la [sélection de protocole][6] de la documentation Istio (en anglais) pour en savoir plus.

Par défaut, le nom de service utilisé lors de la création des traces est généré à partir de l'espace de nommage et du nom du déploiement. Vous pouvez le définir manuellement en ajoutant une étiquette `app` au modèle de pod du déploiement :

```yaml
template:
  metadata:
    labels:
      app: <NOM_SERVICE>
```

Pour les [CronJobs][7], l'étiquette `app` doit être ajoutée au modèle du job, car le nom généré provient du `Job`, et non du `CronJob` de niveau supérieur.

### Variables d'environnement

Les variables d'environnement des sidecars Istio peuvent être configurées pour chaque déploiement, à l'aide de l'annotation `apm.datadoghq.com/env`.
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

Les [variables d'environnement][8] disponibles dépendent de la version du traceur C++ intégré au proxy du sidecar Istio.

| Version d'Istio | Version du traceur C++ |
|---------------|--------------------|
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Exécuter l'Agent en tant que service et déploiement

Si les Agents de votre cluster s'exécutent en tant que déploiement et service au lieu du DaemonSet par défaut, une option supplémentaire est alors nécessaire pour spécifier l'adresse DNS et le port de l'Agent.
Pour un service `datadog-agent` dans l'espace de nommage `default`, l'adresse a pour valeur `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

Si l'authentification TLS mutuelle est activée pour le cluster, alors le déploiement de l'Agent doit désactiver l'injection de sidecar. De plus, vous devez ajouter une stratégie de trafic qui désactive l'authentification TLS.

Cette annotation est ajoutée au modèle de déploiement de l'Agent.
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

Pour la version v1.4.x d'Istio, la stratégie de trafic peut être configurée à l'aide d'une DestinationRule. La version v1.5.x et les versions plus récentes d'Istio ne nécessitent pas de stratégie de trafic supplémentaire.
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

Le processus de sélection automatique du protocole peut déterminer que le trafic entre le sidecar et l'Agent s'effectue via HTTP, et ainsi activer le tracing. Cette fonction peut être désactivée en utilisant la [sélection manuelle du protocole][9] du service spécifique. Le nom du port dans le service `datadog-agent` peut être remplacé par `tcp-traceport`. Si vous utilisez Kubernetes 1.18+, vous pouvez ajouter `appProtocol: tcp` à la spécification du port.




[1]: /fr/integrations/istio/
[2]: /fr/network_monitoring/performance/setup/#istio
[3]: /fr/agent/kubernetes/
[4]: /fr/agent/kubernetes/apm/
[5]: https://istio.io/docs/setup/install/istioctl/
[6]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[7]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[8]: /fr/tracing/setup/cpp/#environment-variables
[9]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[10]: https://www.datadoghq.com/blog/istio-datadog/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}