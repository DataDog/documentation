---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    HAProxy - Overview (Prometheus): assets/dashboards/prometheus_overview.json
    haproxy: assets/dashboards/overview.json
  logs:
    source: haproxy
  metrics_metadata: metadata.csv
  monitors:
    '[HAProxy] Anomalous frontend request rate for host {{host.name}}': assets/monitors/request_rate.json
    '[HAProxy] Anomalous number of frontend 4xx HTTP responses for host: {{host.name}}': assets/monitors/frontend_5xx.json
    '[HAProxy] Anomalous number of frontend 5xx HTTP responses for host: {{host.name}}': assets/monitors/frontend_4xx.json
    '[HAProxy] Backend queue time went above 500ms for host: {{host.name}}': assets/monitors/backend_queue_time.json
    '[HAProxy] Backend response time is above 500ms for host: {{host.name}}': assets/monitors/backend_rtime.json
    '[HAProxy] High amount of backend session usage for host: {{host.name}}': assets/monitors/backend_sessions.json
    '[HAProxy] High amount of frontend session usage for host: {{host.name}}': assets/monitors/frontend_sessions.json
    '[HAProxy] High number of backend denied responses for host: {{host.name}}': assets/monitors/backend_dreq.json
    '[HAProxy] High number of frontend denied requests for host: {{host.name}}': assets/monitors/frontend_dreq.json
    '[HAProxy] Number of backend connection failures for host: {{host.name}} is above normal.': assets/monitors/backend_econ.json
    '[HAProxy] Number of client-side request error for {{host.name}} is above normal.': assets/monitors/frontend_ereq.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    haproxy_processes: assets/saved_views/haproxy_processes.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md'
description: L'intégration HAProxy vous permet de recueillir des métriques sur les performances et la disponibilité à partir de vos instances HAProxy.
display_name: HAProxy
draft: false
git_integration_title: haproxy
guid: cd935030-131f-4545-8b6a-a4ca21b8565b
integration_id: haproxy
integration_title: HAProxy
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: haproxy.
metric_to_check:
  - haproxy.frontend.bytes.in_rate
  - haproxy.frontend.bytes.in.total
name: haproxy
process_signatures:
  - haproxy
  - haproxy-master
  - haproxy-controller
public_title: Intégration Datadog/HAProxy
short_description: 'Surveillez des métriques clés concernant les requêtes, les réponses, les erreurs, les octets traités, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard HAProxy par défaut][1]

## Présentation

Enregistrez l'activité HAProxy dans Datadog pour :

- Visualiser les performances d'équilibrage de charge de HAProxy
- Être informé lorsqu'un serveur tombe en panne
- Corréler les performances de HAProxy avec le reste de vos applications

## Configuration

### Installation

Le check HAProxy est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur HAProxy.

#### Préparer HAProxy

##### Utiliser Prometheus

Pour configurer cette intégration, il est recommandé d'activer l'endpoint Prometheus sur HAProxy. Depuis la version 2 (ou la version Enterprise 1.9rc1), cet endpoint est intégré à HAProxy. Si vous utilisez une version antérieure, pensez à configurer l'[exportateur Prometheus HAProxy][3], ou configurez l'ancienne intégration basée sur les sockets décrite dans la section suivante.

1. Configurez votre `haproxy.conf` en suivant le [guide officiel][4].

2. [Activez](#configuration) le paramètre `use_prometheus` dans `haproxy.d/conf.yaml`.

3. [Redémarrez HAProxy pour activer l'endpoint Prometheus][5].

4. [Redémarrez l'Agent][6].

##### Utiliser l'endpoint stats

**Remarque** : cette stratégie de configuration est donnée à titre de référence pour les utilisateurs des versions antérieures. Si vous configurez l'intégration pour la première fois, appliquez plutôt la configuration Prometheus décrite dans la section précédente.

L'Agent recueille des métriques via un endpoint stats :

1. Configurez un endpoint dans votre fichier `haproxy.conf` :

   ```conf
     listen stats # Define a listen section called "stats"
     bind :9000 # Listen on localhost:9000
     mode http
     stats enable  # Enable stats page
     stats hide-version  # Hide HAProxy version
     stats realm Haproxy\ Statistics  # Title text for popup window
     stats uri /haproxy_stats  # Stats URI
     stats auth Username:Password  # Authentication credentials
   ```

2. [Redémarrez HAProxy pour activer l'endpoint stats][5].

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `haproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) HAProxy. Consultez le [fichier d'exemple haproxy.d/conf.yam][2] pour découvrir toutes les options de configuration disponibles.

##### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos [métriques HAProxy](#metriques) :

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Haproxy URL to connect to gather metrics.
     ## Set the according <USERNAME> and <PASSWORD> or use directly a unix stats
     ## or admin socket: unix:///var/run/haproxy.sock
     #
     - url: http://localhost/admin?stats
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

Par défaut, Haproxy envoie des logs via UDP sur le port 514. L'Agent peut effectuer une écoute afin d'obtenir ces logs sur ce port. Toutefois, il est nécessaire de procéder à une élévation des privilèges pour toute association vers un numéro de port inférieur à 1024. Pour ce faire, suivez les instructions ci-dessous. Vous pouvez également choisir d'utiliser un autre port. Dans ce cas, ignorez l'étape 3.

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce blog de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos logs HAProxy ;

   ```yaml
   logs:
     - type: udp
       port: 514
       service: <SERVICE_NAME>
       source: haproxy
   ```

    Modifiez la valeur du paramètre `service` et configurez-le pour votre environnement. Consultez le [fichier d'exemple haproxy.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. Autorisez l'accès au port 514 à l'aide de la commande `setcap` :

    ```bash
    sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
    ```

    Pour vérifier que tout fonctionne, exécutez la commande `getcap` :

    ```bash
    sudo getcap /opt/datadog-agent/bin/agent/agent
    ```

    Voici le résultat attendu :
    ```bash
    /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
    ```

    **Remarque** : exécutez cette commande `setcap` à chaque mise à niveau de l'Agent.

4. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez les [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["haproxy"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "https://%%host%%/admin?stats"}]'
```

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][2].

Définissez ensuite des [intégrations de logs][3] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"haproxy","service":"<NOM_SERVICE>"}]'
```

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][2].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
    ad.datadoghq.com/haproxy.init_configs: '[{}]'
    ad.datadoghq.com/haproxy.instances: |
      [
        {
          "url": "https://%%host%%/admin?stats"
        }
      ]
spec:
  containers:
    - name: haproxy
```

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][5].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/mongo.logs: '[{"source":"haproxy","service":"<NOM_SERVICE>"}]'
spec:
  containers:
    - name: haproxy
```

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez les [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"haproxy\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"https://%%host%%/admin?stats\"}]"
    }
  }]
}
```

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec ECS][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"haproxy\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `haproxy` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "haproxy" >}}


### Événements

Le check HAProxy n'inclut aucun événement.

### Checks de service

**haproxy.backend_up** :<br>
Convertit la page de statut HAProxy en checks de service.
Renvoie `CRITICAL` pour un service donné si HAProxy le signale comme `down`.
Renvoie `OK` pour les états `maint`, `ok` et tout autre état.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Surveillance des métriques de performance HAProxy][9]
- [Comment recueillir des métriques HAProxy][10]
- [Surveiller HAProxy avec Datadog][11]
- [Configuration multi-processus de HAProxy][12]
- [Comment recueillir des métriques HAProxy][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/prometheus/haproxy_exporter
[4]: https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
[5]: https://www.haproxy.org/download/1.7/doc/management.txt
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[10]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[11]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[12]: https://docs.datadoghq.com/fr/integrations/faq/haproxy-multi-process/