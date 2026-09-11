---
aliases:
- /fr/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /fr/tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /fr/opentelemetry/otel_collector_datadog_exporter/
- /fr/opentelemetry/collector_exporter/
- /fr/opentelemetry/collector_exporter/otel_collector_datadog_exporter
description: Envoyez les données OpenTelemetry au Collecteur OpenTelemetry et à l'Exportateur
  Datadog
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Site externe
  text: Documentation Collector
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envoyer des métriques, des traces et des logs depuis le Collector OpenTelemetry
    vers Datadog via l'exportateur Datadog
- link: /opentelemetry/integrations/datadog_extension/
  tag: Documentation
  text: Activez l'extension Datadog pour inspecter les configurations du collecteur
    dans l'automatisation de flotte
title: Configurez le Collecteur OpenTelemetry
---
## Aperçu {#overview}

Le Collecteur OpenTelemetry vous permet de collecter, traiter et exporter des données de télémétrie de vos applications de manière indépendante des fournisseurs. Lorsqu'il est configuré avec l'[Exportateur Datadog][1] et le [Connecteur Datadog][29], vous pouvez envoyer vos traces, journaux et métriques à Datadog sans l'Agent Datadog.

- **Exportateur Datadog** : Transmet les données de trace, de métrique et de journaux des SDK OpenTelemetry à Datadog (sans l'Agent Datadog)
- **Connecteur Datadog** : Calcule les métriques de trace à partir des données de span collectées

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagramme : Le SDK OpenTelemetry dans le code envoie des données via OTLP à un hôte exécutant le Collecteur OpenTelemetry avec l'Exportateur Datadog, qui les transmet à la Plateforme d'Observabilité de Datadog." style="width:100%;" >}}

<div class="alert alert-info">Pour voir quelles fonctionnalités Datadog sont prises en charge avec cette configuration, consultez le <a href="/opentelemetry/compatibility/">tableau de compatibilité des fonctionnalités</a> sous <b>Full OTel</b>.</div>

## Installez et configurez {#install-and-configure}

### 1 - Téléchargez le Collecteur OpenTelemetry {#1-download-the-opentelemetry-collector}

Téléchargez la dernière version de la distribution OpenTelemetry Collector Contrib depuis [le référentiel du projet][3].

### 2 - Configurez l'Exportateur et le Connecteur Datadog {#2-configure-the-datadog-exporter-and-connector}

Pour utiliser l'Exportateur Datadog et le Connecteur Datadog, configurez-les dans votre [configuration du Collecteur OpenTelemetry][4] :

1. Créez un fichier de configuration nommé `collector.yaml`.
1. Utilisez le fichier d'exemple suivant pour commencer.
1. Définissez votre clé API Datadog comme variable d'environnement `DD_API_KEY`.

{{% otel-endpoint-note %}}

<div class="alert alert-warning">AWS EKS Fargate n'est pas un environnement pris en charge pour le Collecteur OpenTelemetry pour le moment. Déployer le Collecteur sur EKS Fargate entraînera une facturation incorrecte de l'hôte d'infrastructure.</div>

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

Cette configuration de base permet de recevoir des données OTLP via HTTP et gRPC, et configure un [processeur par lot][5].

Pour une liste complète des options de configuration pour l'exportateur Datadog, consultez le [fichier de configuration d'exemple entièrement documenté][8]. Des options supplémentaires comme les paramètres `api::site` et `host_metadata` peuvent être pertinentes en fonction de votre déploiement.

#### Configuration du processeur par lots{#batch-processor-configuration}

Le processeur par lots est requis pour les environnements non destinés au développement. La configuration exacte dépend de votre charge de travail spécifique et des types de signaux.

Configurez le processeur par lots en fonction des limites d'admission de Datadog :

- Admission des traces : 3,2 Mo
- Admission des journaux : [5 Mo non compressé][6]
- Admission des métriques V2 : [500 Ko ou 5 Mo après décompression][7]

Vous pouvez rencontrer `413 - Request Entity Too Large` erreurs si vous regroupez trop de données de télémétrie dans le processeur par lots.

### 3 - Configurez votre application {#3-configure-your-application}

Pour améliorer les métadonnées des traces et optimiser l'intégration avec Datadog :

- **Utilisez des détecteurs de ressources** : S'ils sont fournis par le SDK de langage, attachez les informations de conteneur en tant qu'attributs de ressource. Par exemple, en Go, utilisez l'option de ressource [`WithContainer()`][9].

- **Apply [Unified Service Tagging][10]** : Assurez-vous d'avoir configuré votre application avec les attributs de ressource appropriés pour unified service tagging. Cela relie la télémétrie Datadog avec des tags pour le nom du service, l'environnement de déploiement et la version du service. L'application doit définir ces tags en utilisant les conventions sémantiques OpenTelemetry : `service.name`, `deployment.environment` et `service.version`.

### 4 - Configurez le logger pour votre application {#4-configure-the-logger-for-your-application}

{{< img src="logs/log_collection/otel_collector_logs.png" alt="Un diagramme montrant l'hôte, le conteneur ou l'application envoyant des données au récepteur filelog dans le collecteur et l'exportateur Datadog dans le collecteur envoyant les données au backend Datadog." style="width:100%;">}}

Étant donné que la fonctionnalité de journalisation des SDK OpenTelemetry n'est pas entièrement prise en charge (voir votre langage spécifique dans la [documentation OpenTelemetry][11] pour plus d'informations), Datadog recommande d'utiliser une bibliothèque de journalisation standard pour votre application. Suivez la [documentation de collecte de journaux][12] spécifique au langage pour configurer le logger approprié dans votre application. Datadog encourage fortement la configuration de votre bibliothèque de journalisation pour qu'elle produise vos journaux au format JSON afin d'éviter la nécessité de [règles de parsing personnalisées][13].

#### Configurer le récepteur filelog {#configure-the-filelog-receiver}

Configurer le récepteur filelog en utilisant [opérateurs][14]. Par exemple, s'il existe un service `checkoutservice` qui écrit des journaux dans `/var/log/pods/services/checkout/0.log`, un exemple de journal pourrait ressembler à ceci :

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
- `poll_internal` : Définit la fréquence de sondage
- Opérateurs :
    - `json_parser` : Analyse les journaux JSON. Par défaut, le récepteur filelog convertit chaque ligne de journal en un enregistrement de journal, qui est le `body` du [modèle de données][15] des journaux. Ensuite, le `json_parser` convertit le corps JSON en attributs dans le modèle de données.
    - `trace_parser` : Extraire le `trace_id` et le `span_id` du journal pour corréler les journaux et les traces dans Datadog.

#### Remapper l'attribut `service.name` d'OTel à `service` pour les journaux {#remap-otels-servicename-attribute-to-service-for-logs}

Pour les versions 0.83.0 et ultérieures de Datadog Exporter, le champ `service` des journaux OTel est peuplé selon la [convention sémantique OTel][25] `service.name`. Cependant, `service.name` n'est pas l'un des [attributs de service][26] par défaut dans le prétraitement des journaux de Datadog.

Pour que le champ `service` soit correctement peuplé dans vos journaux, vous pouvez spécifier `service.name` comme source du service d'un journal en définissant un [processeur de remappage de service de journal][27].

{{% collapse-content title="Optionnel : utiliser Kubernetes" level="h4" %}}

<div class="alert alert-warning">AWS EKS Fargate n'est pas un environnement pris en charge pour le Collecteur OpenTelemetry pour le moment. Déployer le Collecteur sur EKS Fargate entraînera une facturation incorrecte de l'hôte d'infrastructure.</div>

Il existe plusieurs façons de déployer le Collecteur OpenTelemetry et le Datadog Exporter dans une infrastructure Kubernetes. Pour que le récepteur filelog fonctionne, le [déploiement Agent/DaemonSet][16] est la méthode de déploiement recommandée.

Dans des environnements conteneurisés, les applications écrivent des journaux dans `stdout` ou `stderr`. Kubernetes collecte les journaux et les écrit à un emplacement standard. Vous devez monter l'emplacement sur le nœud hôte dans le Collecteur pour le récepteur filelog. Ci-dessous se trouve un [exemple d'extension][17] avec les montages requis pour l'envoi des journaux.

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
          image: otel/opentelemetry-collector-contrib:0.71.0
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

## Configuration du Datadog Exporter prête à l'emploi{#out-of-the-box-datadog-exporter-configuration}

Vous pouvez trouver des exemples fonctionnels de configuration prête à l'emploi pour le Datadog Exporter dans le [`exporter/datadogexporter/examples` dossier][31] du projet OpenTelemetry Collector Contrib. Voir le fichier d'exemple de configuration complet, [`ootb-ec2.yaml`][30]. **Remarque** : Cet exemple est pour des applications s'exécutant directement sur un hôte EC2. Pour les applications conteneurisées, voir la [documentation de déploiement][33].

Configurez chacun des composants suivants selon vos besoins :

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}Récepteur OTLP{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Nom d'hôte et étiquettes{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Réglages des lots et de la mémoire{{< /nextlink >}}
{{< /whatsnext >}}

## Validez vos configurations de collecteur dans l'automatisation de flotte {#validate-your-collector-configurations-in-fleet-automation}

Inspectez et dépannez vos configurations de Collecteur OpenTelemetry dans l'automatisation de flotte en activant l'extension Datadog. 

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/collector/configuration/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[6]: /fr/api/latest/logs/
[7]: /fr/api/latest/metrics/#submit-metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[9]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainer
[10]: /fr/getting_started/tagging/unified_service_tagging/
[11]: https://opentelemetry.io/docs/instrumentation/
[12]: /fr/logs/log_collection/?tab=host
[13]: /fr/logs/log_configuration/parsing/
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/stanza/docs/operators
[15]: https://opentelemetry.io/docs/reference/specification/logs/data-model/
[16]: https://opentelemetry.io/docs/collector/deployment/#agent
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/daemonset.yaml
[25]: https://opentelemetry.io/docs/specs/semconv/resource/#service
[26]: /fr/logs/log_configuration/pipelines/?tab=service#service-attribute
[27]: /fr/logs/log_configuration/processors/service_remapper/
[28]: /fr/opentelemetry/schema_semantics/hostname/
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[31]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/
[32]: /fr/opentelemetry/compatibility/
[33]: /fr/opentelemetry/collector_exporter/deployment