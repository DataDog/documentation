---
aliases:
- /fr/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /fr/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /fr/opentelemetry/otel_collector_datadog_exporter/
- /fr/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Envoyez des données OpenTelemetry à Datadog avec l'exportateur Datadog
  et le connecteur Datadog
further_reading:
- link: /opentelemetry/setup/collector_exporter/deploy/
  tag: Documentation
  text: Déployer l'OpenTelemetry Collector avec l'exportateur Datadog
- link: /opentelemetry/integrations/datadog_extension/
  tag: Documentation
  text: Activez l'extension Datadog pour inspecter les configurations du collecteur
    dans Fleet Automation
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envoyer des métriques, des traces et des logs depuis le Collector OpenTelemetry
    vers Datadog via l'exportateur Datadog
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: Blog
  text: Utilisez l'observabilité native OpenTelemetry avec Datadog, de l'ingestion
    à l'investigation.
- link: https://opentelemetry.io/docs/collector/
  tag: Site externe
  text: Documentation Collector
title: Configurer l'exportateur et le connecteur Datadog
---
## Présentation {#overview}

Le collecteur OpenTelemetry vous permet de collecter, traiter et exporter des données de télémétrie depuis vos applications de manière neutre vis-à-vis du fournisseur. Lorsqu'ils sont configurés avec l'[exportateur Datadog][1] et le [connecteur Datadog][29], vous pouvez envoyer vos traces, logs et métriques à Datadog sans le Datadog Agent.

<div class="alert alert-info">Pour les nouvelles configurations du collecteur OpenTelemetry, Datadog recommande l'exportateur <a href="/opentelemetry/setup/collector_exporter/">OTLP HTTP et <code>span_metrics</code> la configuration du connecteur</a>. L'exportateur Datadog et le connecteur Datadog restent pris en charge, et les configurations existantes n'ont pas besoin d'être migrées.</div>

- **Exportateur Datadog** : Transfère les données de trace, de métrique et de logs des SDK OpenTelemetry vers Datadog (sans le Datadog Agent)
- **Connecteur Datadog** : Calcule les métriques de trace à partir des données de span collectées

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagramme : le SDK OpenTelemetry dans le code envoie des données via OTLP au host exécutant le collecteur OpenTelemetry avec l'exportateur Datadog, qui les transfère vers la plateforme d'observabilité de Datadog." style="width:100%;" >}}

## Installez et configurez {#install-and-configure}

### 1 - Téléchargez le collecteur OpenTelemetry {#1-download-the-opentelemetry-collector}

Téléchargez la dernière version de la distribution OpenTelemetry Collector Contrib depuis [le référentiel du projet][3].

### 2 - Configurez l'exportateur et le connecteur Datadog {#2-configure-the-datadog-exporter-and-connector}

Pour utiliser l'exportateur Datadog et le connecteur Datadog, configurez-les dans votre [configuration du collecteur OpenTelemetry][4] :

1. Créez un fichier de configuration nommé `collector.yaml`.
1. Utilisez l'exemple de fichier suivant pour commencer.
1. Définissez votre clé Datadog API comme variable d'environnement `DD_API_KEY`.

{{% otel-endpoint-note %}}

<div class="alert alert-warning">AWS EKS Fargate n'est pas un environnement pris en charge pour le collecteur OpenTelemetry pour le moment. Le déploiement du collecteur sur EKS Fargate entraînera une facturation incorrecte de l'hôte d'infrastructure.</div>

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
      grpc:
        endpoint: 0.0.0.0:4317
  # The hostmetrics receiver is required to get correct infrastructure metrics in Datadog.
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
  # The prometheus receiver scrapes metrics needed for the OpenTelemetry Collector Dashboard.
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']

  filelog:
    include_file_path: true
    poll_interval: 500ms
    include:
      - /var/log/**/*example*/*.log

processors:
  batch:
    send_batch_max_size: 100
    send_batch_size: 10
    timeout: 10s

connectors:
  datadog/connector:

exporters:
  datadog/exporter:
    api:
      site: {{< region-param key="dd_site" >}}
      key: ${env:DD_API_KEY}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, prometheus, otlp, datadog/connector]
      processors: [batch]
      exporters: [datadog/exporter]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    logs:
      receivers: [otlp, filelog]
      processors: [batch]
      exporters: [datadog/exporter]
```

Cette configuration de base permet la réception de données OTLP via HTTP et gRPC, et configure un [processeur par lots][5].

Pour une liste complète des options de configuration de l'exportateur Datadog, consultez le [fichier de configuration exemple entièrement documenté][8]. Des options supplémentaires comme les paramètres `api::site` et `host_metadata` peuvent être pertinentes selon votre déploiement.

#### Configuration du processeur de traitement par lots {#batch-processor-configuration}

Le processeur de traitement par lots est requis pour les environnements hors développement. La configuration exacte dépend de votre charge de travail spécifique et des types de signaux.

Configurez le processeur de traitement par lots en fonction des limites d'ingestion de Datadog :

- Ingestion de traces : 3,2 Mo
- Ingestion de logs : [5 Mo non compressé][6]
- Ingestion de métriques V2 : [500 Ko ou 5 Mo après décompression][7]

Vous pourriez obtenir des erreurs `413 - Request Entity Too Large` si vous traitez par lots trop de données de télémétrie dans le processeur de traitement par lots.

### 3 - Configurez votre application {#3-configure-your-application}

Pour améliorer les métadonnées des traces et optimiser l'intégration avec Datadog :

- **Utilisez des détecteurs de ressources** : s'ils sont fournis par le SDK du langage, joignez les informations du conteneur en tant qu'attributs de ressource. Par exemple, en Go, utilisez l'option de ressource [`WithContainer()`][9].

- **Appliquez le [Unified Service Tagging][10]** : assurez-vous d'avoir configuré votre application avec les attributs de ressource appropriés pour le marquage de service unifié. Cela permet de lier la télémétrie Datadog avec des tags pour le nom du service, l'environnement de déploiement et la version du service. L'application doit définir ces tags en utilisant les conventions sémantiques OpenTelemetry : `service.name`, `deployment.environment.name` et `service.version`.

### 4 - Configurez le logger pour votre application {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagramme montrant l'hôte, le conteneur ou l'application envoyant des données au récepteur filelog dans le collecteur et l'exportateur Datadog dans le collecteur envoyant les données au backend Datadog" style="width:100%;">}}

Comme la fonctionnalité de journalisation des SDK OpenTelemetry n'est pas entièrement prise en charge (consultez votre langage spécifique dans la [documentation OpenTelemetry][11] pour plus d'informations), Datadog recommande d'utiliser une bibliothèque de journalisation standard pour votre application. Suivez la [documentation de collecte de logs][12] spécifique au langage pour configurer le logger approprié dans votre application. Datadog recommande vivement de configurer votre bibliothèque de journalisation pour générer vos logs au format JSON afin d'éviter d'avoir recours à des [règles de parsing personnalisées][13].

#### Configurez le récepteur filelog {#configure-the-filelog-receiver}

Configurez le récepteur filelog à l'aide de [operators][14]. Par exemple, s'il existe un service `checkoutservice` qui écrit des logs vers `/var/log/pods/services/checkout/0.log`, un exemple de log pourrait ressembler à ceci :

```
{"level":"info","message":"order confirmation email sent to \"jack@example.com\"","service":"checkoutservice","span_id":"197492ff2b4e1c65","timestamp":"2022-10-10T22:17:14.841359661Z","trace_id":"e12c408e028299900d48a9dd29b0dc4c"}
```

Exemple de configuration filelog :

```
filelog:
   include:
     - /var/log/pods/**/*checkout*/*.log
   start_at: end
   poll_interval: 500ms
   operators:
     - id: parse_log
       type: json_parser
       parse_from: body
     - id: trace
       type: trace_parser
       trace_id:
         parse_from: attributes.trace_id
       span_id:
         parse_from: attributes.span_id
   attributes:
     ddtags: env:staging
```

- `include` : La liste des fichiers que le récepteur suit
- `start_at: end` : Signale de lire le contenu nouvellement écrit
- `poll_internal` : Définit la fréquence d'interrogation
- Opérateurs :
    - `json_parser` : Analyse les logs JSON. Par défaut, le récepteur filelog convertit chaque ligne de log en un enregistrement de log, qui est le `body` du [modèle de données][15] des logs. Ensuite, le `json_parser` convertit le corps JSON en attributs dans le modèle de données.
    - `trace_parser` : Extrayez le `trace_id` et le `span_id` du log pour corréler les logs et les traces dans Datadog.

#### Remappez l'attribut `service.name` d'OTel vers `service` pour les logs {#remap-otels-servicename-attribute-to-service-for-logs}

Pour les versions 0.83.0 et ultérieures de l'exportateur Datadog, le champ `service` des logs OTel est renseigné en tant que `service.name` [convention sémantique OTel][25]. Cependant, `service.name` ne fait pas partie des [attributs de service][26] par défaut dans le prétraitement des logs de Datadog.

Pour que le champ `service` soit correctement renseigné dans vos logs, vous pouvez spécifier `service.name` comme source du service d'un log en configurant un [processeur de remappage de service de log][27].

{{% collapse-content title="Optionnel : Utilisation de Kubernetes" level="h4" %}}

<div class="alert alert-warning">AWS EKS Fargate n'est pas un environnement pris en charge pour le collecteur OpenTelemetry pour le moment. Le déploiement du collecteur sur EKS Fargate entraînera une facturation incorrecte de l'hôte d'infrastructure.</div>

Il existe plusieurs façons de déployer le collecteur OpenTelemetry et l'exportateur Datadog dans une infrastructure Kubernetes. Pour que le récepteur filelog fonctionne, le [déploiement Agent/DaemonSet][16] est la méthode de déploiement recommandée.

Dans les environnements conteneurisés, les applications écrivent les logs vers `stdout` ou `stderr`. Kubernetes collecte les logs et les écrit dans un emplacement standard. Vous devez monter l'emplacement sur le nœud hôte dans le Collector pour le récepteur filelog. Vous trouverez ci-dessous un [exemple d'extension][17] avec les montages requis pour l'envoi de logs.

```
apiVersion: apps/v1
metadata:
  name: otel-agent
  labels:
    app: opentelemetry
    component: otel-collector
spec:
  template:
    metadata:
      labels:
        app: opentelemetry
        component: otel-collector
    spec:
      containers:
        - name: collector
          command:
            - "/otelcol-contrib"
            - "--config=/conf/otel-agent-config.yaml"
          image: otel/opentelemetry-collector-contrib:0.154.0
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            # The k8s.pod.ip is used to associate pods for k8sattributes
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "k8s.pod.ip=$(POD_IP)"
          ports:
            - containerPort: 4318 # default port for OpenTelemetry HTTP receiver.
              hostPort: 4318
            - containerPort: 4317 # default port for OpenTelemetry gRPC receiver.
              hostPort: 4317
            - containerPort: 8888 # Default endpoint for querying metrics.
          volumeMounts:
            - name: otel-agent-config-vol
              mountPath: /conf
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      volumes:
        - name: otel-agent-config-vol
          configMap:
            name: otel-agent-conf
            items:
              - key: otel-agent-config
                path: otel-agent-config.yaml
        # Mount nodes log file location.
        - name: varlogpods
          hostPath:
            path: /var/log/pods
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

{{% /collapse-content %}}

## Exemples d'exportateur Datadog {#datadog-exporter-examples}

Le dépôt OpenTelemetry Collector Contrib fournit des exemples d'exportateur Datadog exécutables pour les tâches de configuration courantes. Les liens suivants sont épinglés à la version v0.154.0 afin que les exemples ne changent pas de manière inattendue :

- [Configuration complète du Collector][8]
- [Métriques d'hôte][34]
- [Métriques Docker][35]
- [Métriques Kafka][36]
- [Collecte de logs][37]
- [Limites de lot et de mémoire][38]
- [Configuration prête à l'emploi pour EC2][30]

Si vous utilisez une version différente de Collector, consultez les exemples inclus avec cette version. Pour les applications conteneurisées, consultez la [documentation de déploiement][33].

Configurez chacun des composants suivants selon vos besoins :

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver/" >}}Récepteur OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging/" >}}Nom d'hôte et marquage{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory/" >}}Limites de mémoire du collecteur{{< /nextlink >}}
{{< /whatsnext >}}

## Validez vos configurations de collector dans Fleet Automation {#validate-your-collector-configurations-in-fleet-automation}

Inspectez et diagnostiquez vos configurations d'OpenTelemetry Collector dans Fleet Automation en activant l'extension Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /fr/api/latest/logs/
[7]: /fr/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /fr/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /fr/logs/log_collection/?tab=host
[13]: /fr/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /fr/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /fr/logs/log_configuration/processors/service_remapper/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/ootb-ec2.yaml
[33]: /fr/opentelemetry/setup/collector_exporter/deploy/
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/host-metrics.yaml
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/docker-stats.yaml
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/kafka.yaml
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/logs.yaml
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.154.0/exporter/datadogexporter/examples/batch-memory.yaml