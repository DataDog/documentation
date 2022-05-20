---
title: OpenTelemetry et OpenTracing
kind: documentation
description: Utiliser des standards ouverts pour générer les traces de vos applications
further_reading:
  - link: https://opentelemetry.io/docs/collector/
    tag: OpenTelemetry
    text: Documentation Collector
  - link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
    tag: Blog
    text: Partenariat de Datadog avec OpenTelemetry
  - link: /tracing/connect_logs_and_traces/opentelemetry
    tag: Documentation
    text: Associer vos traces OpenTelemetry à vos logs
  - link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
    tag: Blog
    text: En savoir plus sur la couche Lambda gérée AWS pour OpenTelemetry
aliases: null
---
Datadog prend en charge un large éventail de standards ouverts, notamment [OpenTelemetry][1] et [OpenTracing][2].

## Exportateur Datadog pour le Collector OpenTelemetry

Le Collector OpenTelemetry est un agent distinct indépendant conçu pour la collecte et l'exportation de données de télémétrie émises par de nombreux processus. Datadog propose [un exportateur au sein du Collector OpenTelemetry][3] afin de recevoir des données de traces et de métriques provenant des kits de développement OpenTelemetry. Cet exportateur permet également de transmettre des données à Datadog (sans l'Agent Datadog). Il fonctionne avec tous les langages pris en charge et vous offre la possibilité d'[associer vos traces OpenTelemtry à vos logs d'application](#associer-vos-traces-opentelemetry-a-vos-logs).

Vous pouvez [déployer le Collector OpenTelemetry via l'une des méthodes disponibles][4] et le configurer en ajoutant l'exportateur `datadog` à votre [fichier de configuration YAML pour OpenTelemetry][5], avec votre [clé d'API Datadog][6] :

```
datadog:
  api:
    key: "<CLÉ_API>"
```
Pour envoyer les données vers un autre [site Datadog][7], définissez également le paramètre `site` :
```
datadog:
  api:
    key: "<clé d'API>"
    site: {{< region-param key="dd_site" code="true" >}}
```

Sur chaque application instrumentée avec OpenTelemetry, définissez les attributs de ressource `deployment.environment`, `service.name` et `service.version` en utilisant [le kit de développement de votre langage][1]. En guise d'alternative, vous pouvez également configurer l'environnement, le nom du service et la version du service au niveau du Collector pour un tagging de service unifié. Pour ce faire, vous pouvez suivre l'[exemple de fichier de configuration][8]. L'exportateur tente automatiquement d'obtenir un hostname en vérifiant les sources suivantes dans cet ordre, et en enchaînant avec la source suivante si la source en cours n'est pas disponible ou n'est pas valide :

1. Hostname défini dans la ressource OTLP
1. Hostname défini manuellement dans la configuration de l'exportateur
1. Hostname EC2 différent de celui par défaut (dans le cas d'une instance EC2)
1. ID d'instance EC2 (dans le cas d'une instance EC2)
1. Nom de domaine complet
1. Hostname du système d'exploitation

### Ingestion de traces OpenTelemetry avec le Collector

Pour configurer le Collector OpenTelemetry, ajoutez un [pipeline][9] à votre fichier `otel-collector-configuration.yml`. Indiquez le chemin relatif vers ce fichier de configuration lors du démarrage du Collector en le transmettant via l'argument de ligne de commande `--config=<chemin/vers/fichier_configuration>`. Pour découvrir des exemples afin de mieux comprendre comment indiquer un fichier de configuration, consultez les [instructions de configuration en fonction de votre environnement](#configuration-en-fonction-de-l-environnement) ci-dessous ou la [documentation relative au Collector OpenTelemetry][10].

L'exportateur suppose que vous disposez d'un pipeline qui utilise l'exportateur `datadog` et inclut un [processeur batch][11] configuré avec les réglages suivants :
  - Un paramètre `timeout` obligatoire, défini sur `10s` (10 secondes). Pour obtenir des statistiques liées aux traces, il est nécessaire de transmettre des lots représentant 10 secondes de traces à l'API Datadog.
  <div class="alert alert-info"><strong>Attention :</strong> en l'absence du paramètre <code>timeout</code>, les métriques liées aux traces, y compris <code>.hits</code>, <code>.errors</code> et <code>.duration</code> pour différents services et ressources de service, sont inexactes durant certaines périodes.</div>

<div class="alert alert-warning">
L'exportateur Datadog pour le Collector OpenTelemetry est actuellement disponible en version bêta. Il peut utiliser une quantité importante de ressources processeur et mémoire. Selon votre environnement de production, la configuration du pipeline et du processeur de traitement par lots peut nécessiter plusieurs itérations avant de pouvoir obtenir des métriques précises. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> si l'exportateur ne fonctionne pas comme prévu.
</div>

Voici un exemple de pipeline de traces configuré avec un récepteur `otlp`, un processeur `batch`, un processeur `resourcedetection` et un exportateur `datadog` :

```
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 10s
  resourcedetection:
    detectors: [gce, ecs, ec2, azure, system]

exporters:
  datadog/api:
    env: prod
    service: myservice
    version: myversion

    tags:
      - example:tag

    api:
      key: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      site: datadoghq.eu

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch, resourcedetection]
      exporters: [datadog/api]
```

### Configuration en fonction de l'environnement

#### Host

1. Téléchargez le binaire approprié depuis la [dernière version du projet GitHub][12].

2. Créez un fichier `otel_collector_config.yaml`. [Voici un exemple de modèle](#ingestion-de-traces-opentelemetry-avec-le-collector) pour démarrer. Il permet d'activer le récepteur OTLP du Collector et l'exportateur Datadog.

3. Lancez le fichier téléchargé sur le host, en spécifiant le fichier de configuration yaml à l'aide du paramètre `--config`. Par exemple :

      ```
      otelcontribcol_linux_amd64 --config otel_collector_config.yaml
      ```

#### Docker

Lancez un conteneur dédié au Collector OpenTelemetry pour recevoir des traces depuis le [host installé](#recevoir-des-traces-depuis-un-host) ou depuis d'[autres conteneurs](#recevoir-des-traces-depuis-d-autres-conteneurs).

##### Recevoir des traces depuis un host

1. Créez un fichier `otel_collector_config.yaml`. [Voici un exemple de modèle](#ingestion-de-traces-opentelemetry-avec-le-collector) pour démarrer. Il permet d'activer le récepteur OTLP du Collector et l'exportateur Datadog.

2. Choisissez une image Docker publiée, telle que [`otel/opentelemetry-collector-contrib:latest`][13].

3.  Déterminez les ports à ouvrir sur votre conteneur. Les traces OpenTelemetry sont envoyées au Collector OpenTelemetry via TCP ou UDP sur plusieurs ports, qui doivent être exposés sur le conteneur. Par défaut, les traces sont envoyées via OTLP/gRPC sur le port `55680`, mais d'autres protocoles courants utilisent les ports suivants :

      - Zipkin/HTTP sur le port `9411`
      - Jaeger/gRPC sur le port `14250`
      - Jaeger/HTTP sur le port `14268`
      - Jaeger/Compact sur le port (UDP) `6831`
      - OTLP/gRPC sur le port `55680`
      - OTLP/HTTP sur le port `55681`

4. Exécutez le conteneur avec les ports configurés et un fichier `otel_collector_config.yaml`. Par exemple :

      ```
      $ docker run \
      -p 55680:55680 \
      -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
      otel/opentelemetry-collector-contrib
      ```

5. Configurez votre application avec les attributs de ressource adéquats pour le tagging de service unifié en [ajoutant des métadonnées](#exportateur-datadog-pour-le-collector-opentelemetry)

##### Recevoir des traces depuis d'autres conteneurs

1. Créez un fichier `otel_collector_config.yaml`. [Voici un exemple de modèle](#ingestion-de-traces-opentelemetry-avec-le-collector) pour démarrer. Il permet d'activer le récepteur OTLP du Collector et l'exportateur Datadog.


2. Configurez votre application avec les attributs de ressource adéquats pour le tagging de service unifié en les métadonnées [indiquées ici](#exportateur-datadog-pour-le-collector-opentelemetry)

3. Créez un réseau Docker :

    ```
    docker network create <NETWORK_NAME>
    ```

4. Exécutez le conteneur du Collector OpenTelemetry et le conteneur de l'application au sein du même réseau. **Remarque** : avant d'exécuter le conteneur de l'application, assurez-vous que la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` configurée utilise le hostname approprié pour le Collector OpenTelemetry. Dans l'exemple ci-dessous, il s'agit de `opentelemetry-collector`.

    ```
    # Datadog Agent
    docker run -d --name opentelemetry-collector \
              --network <NETWORK_NAME> \
              -v $(pwd)/otel_collector_config.yaml:/etc/otel/config.yaml \
              otel/opentelemetry-collector-contrib

    # Application
    docker run -d --name app \
              --network <NETWORK_NAME> \
              -e OTEL_EXPORTER_OTLP_ENDPOINT=http://opentelemetry-collector:55680 \
              company/app:latest
    ```

#### Kubernetes

Le Collector OpenTelemetry peut être exécuté dans deux types de [scénarios de déploiement][4] :

- En tant qu'agent du Collector OpenTelemetry fonctionnant sur le même host que l'application dans un sidecar ou un daemonset ; ou

- En tant que service autonome, par exemple un conteneur ou un déploiement, généralement propre à chaque cluster, datacenter ou région.

Pour bien surveiller les métadonnées appropriées dans Datadog, exécutez le Collector OpenTelemetry Collector en mode agent sur chacun des nœuds Kubernetes.

Si vous souhaitez déployer le Collector OpenTelemetry en tant que daemonset, utilisez l'[exemple de configuration ci-dessous](#exemple-de-configuration-du-collector-opentelemetry-pour-kubernetes) pour vous guider.

Sur le conteneur de l'application, utilisez l'API Downward pour récupérer l'IP du host. Le conteneur de l'application requiert une variable d'environnement qui pointe vers `status.hostIP`. Les SDK d'application OpenTelemetry s'attendent à ce que celle-ci soit intitulée `OTEL_EXPORTER_OTLP_ENDPOINT`. Utilisez l'[exemple de configuration ci-dessous](#exemple-de-configuration-du-collector-opentelemetry-pour-kubernetes) pour vous guider.

##### Exemple de configuration du Collector OpenTelemetry pour Kubernetes

Un exemple de manifeste Kubernetes complet permettant de déployer le Collector OpenTelemetry en tant que daemonset ou en tant que service autonome [est disponible ici][14]. Modifiez cet exemple en fonction de votre environnement. Les principales sections spécifiques à Datadog sont les suivantes :

1. L'exemple montre comment déployer le Collector OpenTelemetry en [mode agent via un daemonset][15], qui recueille les métadonnées pertinentes spécifiques à chaque pod et chaque nœud Kubernetes, puis transmet les données de télémétrie à un Collector OpenTelemetry en [mode autonome][16]. Ce Collector OpenTelemetry en mode autonome exporte ensuite les données vers le backend de Datadog. Voir un [schéma illustrant ce modèle de déploiement][17].

2. Lorsqu'un Collector OpenTelemetry est déployé en tant qu'agent via un daemonset, dans le daemonset, `spec.containers.env` doit utiliser l'API Downward pour récupérer le `status.podIP` et l'ajouter à la variable d'environnement `OTEL_RESOURCE_ATTRIBUTES`. Cette information est ensuite utilisée par les processeurs `resourcedetection` et `k8sattributes` du Collector OpenTelemetry, qui doivent être inclus avec un processeur `batch` et ajoutés au pipeline `traces`.

   Dans la section `spec.containers.env` du daemonset :

    ```yaml
      # ...
      env:
         # Get pod ip so that k8sattributes can tag resources
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
          # This is picked up by the resource detector
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "k8s.pod.ip=$(POD_IP)"
      # ...
    ```

   Dans la section `processors` du `data.otel-agent-config` de la ConfigMap `otel-agent-conf` :

    ```yaml
      # ...
      # The resource detector injects the pod IP
      # to every metric so that k8sattributes can
      # fetch information afterwards.
      resourcedetection:
        detectors: [env]
        timeout: 5s
        override: false
      # The k8sattributes processor in the Agent is in passthrough mode
      # so that it only tags with the minimal info for the
      # collector k8sattributes to complete
      k8sattributes:
        passthrough: true
      # ...
    ```

   Dans la section `service.pipelines.traces` du `data.otel-agent-config` de la ConfigMap `otel-agent-conf` :

    ```yaml
      # ...
      # resourcedetection must come before k8sattributes
      processors: [batch, resourcedetection, k8sattributes]
      # ...
    ```

3. Si vous utilisez un Collector OpenTelemetry en tant que service autonome qui reçoit les traces depuis les collectors en aval et les exporte au backend de Datadog, ajoutez un processeur `batch` configuré avec un `timeout` de `10s` et le processeur `k8sattributes` activé. Ces processeurs doivent être inclus avec l'exportateur `datadog` et ajoutés au pipeline `traces`.

    Dans la section `processors` du `data.otel-collector-config` de la ConfigMap `otel-collector-conf` :

    ```yaml
      # ...
      batch:
        timeout: 10s
      k8sattributes:
      # ...
    ```

    Dans la section `exporters` du `data.otel-collector-config` de la ConfigMap `otel-collector-conf` :

    ```yaml
      exporters:
        datadog:
          api:
            key: <YOUR_API_KEY>
    ```

    Dans la section `service.pipelines.traces` du `data.otel-collector-config` de la ConfigMap `otel-collector-conf` :

    ```yaml
      # ...
      processors: [batch, k8sattributes]
      exporters: [datadog]
      # ...
    ```
<div class="alert alert-warning">Si vous obtenez l'erreur <code>unknown processors type "k8sattributes" for k8sattributes</code>, passez à la dernière version du Collector OpenTelemetry (v0.37.0 ou ultérieur).</div>

##### Exemple de configuration d'application OpenTelemetry pour Kubernetes

Outre la configuration du Collector OpenTelemetry, assurez-vous que les SDK OpenTelemetry qui sont installés dans une application transmettent les données de télémétrie en configurant la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` avec l'IP du host. Utilisez l'API Downward pour récupérer l'IP du host et définissez-la comme variable d'environnement. Cette dernière sera ensuite interpolée une fois la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` configurée :

```
apiVersion: apps/v1
kind: Deployment
...
spec:
  containers:
  - name: <NOM_CONTENEUR>
    image: <IMAGE_CONTENEUR>/<TAG>
    env:
      - name: HOST_IP
        valueFrom:
          fieldRef:
            fieldPath: status.hostIP
        # Ces paramètres sont récupérés par les SDK OpenTelemetry
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: "http://$(HOST_IP):55680"
```

Pour en savoir plus et obtenir d'autres exemples de configurations possibles pour votre Collector, consultez [la documentation relative à la configuration du Collector OpenTelemetry][5].

#### Exécuter le Collector en même temps que l'Agent Datadog

Si vous souhaitez exécuter le Collector OpenTelemetry en même temps qu'un Agent Datadog existant sur un host, remplacez l'exportateur Datadog par un exportateur OTLP qui pointe vers l'Agent Datadog :

1. Activez l'ingestion OTLP de l'Agent Datadog via gRPC en suivant les instructions fournies dans la [section dédiée](#ingestion-otlp-dans-l-agent-datadog).

2. Dans la configuration du Collector OpenTelemetry, définissez un exportateur OTLP qui pointe vers l'endpoint de l'Agent Datadog. Par exemple, si votre Agent Datadog effectue l'écoute sur le port 4317 et qu'il est exécuté sur le même host, vous pouvez définir l'exportateur comme suit :
   ```yaml
   exporters:
     otlp:
       endpoint: "0.0.0.0:4317"
       tls:
        insecure: true
   ```
   En cas d'exécution dans un environnement conteneurisé, assurez-vous que le paramètre `endpoint` est défini sur le hostname approprié pour l'Agent Datadog.

3. Dans la configuration du Collector OpenTelemetry, remplacez les utilisations de l'exportateur Datadog dans vos pipelines de métriques et de traces par l'exportateur OTLP. Par exemple, si vous utilisez l'exportateur Datadog dans un pipeline de métriques et un pipeline de traces, appliquez la configuration suivante :
   ```yaml
   pipelines:
     metrics:
      receivers: [...]
      processors: [...]
      exporters: [nop/1, nop/2, otlp] # replaced 'datadog' by 'otlp'
    traces:
      receivers: [...]
      processors: [...]
      exporters: [nop/3, nop/4, otlp] # replaced 'datadog' by 'otlp'
   ```

Cette configuration assure la cohérence des métadonnées de host et centralise la configuration des tags et des alias de host.

## Ingestion OTLP dans l'Agent Datadog

<div class="alert alert-warning">Cette fonctionnalité est en version bêta. Son comportement et sa configuration sont susceptibles d'évoluer.</div>

À partir des versions 6.32.0 et 7.32.0, l'Agent Datadog prend en charge l'ingestion des traces et métriques OTLP via gRPC et HTTP.

La configuration de l'ingestion OTLP se fait à partir du fichier `datadog.yaml`. La configuration suivante permet d'activer les endpoints HTTP et gRPC sur les ports par défaut (4317 pour gRPC et 4318 pour HTTP) :

```yaml
experimental:
  otlp:
    receiver:
      protocols:
        grpc:
        http:
```

La section `receiver` suit le [schéma de configuration OTLP du Collector OpenTelemetry][18].
Vous pouvez également configurer les endpoints en spécifiant le port via les variables d'environnement `DD_OTLP_GRPC_PORT` et `DD_OTLP_HTTP_PORT`. Ces variables doivent être transmises à l'Agent principal et à l'Agent de traces.

Consultez la [documentation relative à l'instrumentation OpenTelemetry][19] pour comprendre comment pointer votre instrumentation vers l'Agent, et [contactez l'assistance Datadog][20] pour en savoir plus sur cette fonctionnalité ou nous faire part de vos commentaires.

## Associer vos traces OpenTelemetry à vos logs

Pour associer vos traces OpenTelemetry à vos logs et ainsi profiter des données de contexte offertes par les traces OpenTelemetry lorsque vous surveillez et analysez vos logs d'application, consultez la section [Associer vos traces OpenTelemetry à vos logs][21] pour obtenir des instructions et des exemples de code correspondant au langage utilisé.

## Solutions alternatives

Datadog vous conseille d'utiliser l'exportateur Datadog pour le Collector OpenTelemetry ou l'ingestion OTLP dans l'Agent Datadog avec les clients de tracing OpenTelemetry. Toutefois, si cette méthode ne fonctionne pas pour vous :

  - Tous les langages pris en charge permettent également d'[envoyer des données OpenTracing à Datadog][22].

  - [Python][23], [Ruby][24] et [NodeJS][25] bénéficient également d'exportateurs de spans OpenTelemetry vers Datadog spécifiques au langage utilisé. Ils permettent d'exporter les traces directement depuis les clients de tracing OpenTelemetry vers un Agent Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[5]: https://opentelemetry.io/docs/collector/configuration/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/config.yaml
[9]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#pipelines
[10]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/examples
[11]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batch-processor
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest
[13]: https://hub.docker.com/r/otel/opentelemetry-collector-contrib/tags
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/example/example_k8s_manifest.yaml
[15]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-an-agent
[16]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/design.md#running-as-a-standalone-collector
[17]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/images/opentelemetry-service-deployment-models.png
[18]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[19]: https://opentelemetry.io/docs/instrumentation/
[20]: https://docs.datadoghq.com/fr/help/
[21]: /fr/tracing/connect_logs_and_traces/opentelemetry
[22]: /fr/tracing/setup_overview/open_standards/java
[23]: /fr/tracing/setup_overview/open_standards/python#opentelemetry
[24]: /fr/tracing/setup_overview/open_standards/ruby#opentelemetry
[25]: /fr/tracing/setup_overview/open_standards/nodejs#opentelemetry