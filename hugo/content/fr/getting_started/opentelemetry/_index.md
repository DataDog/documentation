---
further_reading:
- link: https://opentelemetry.io/docs/
  tag: Site externe
  text: Documentation OpenTelemetry
- link: /opentelemetry
  tag: Documentation
  text: Documentation OpenTelemetry pour Datadog
- link: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
  tag: Documentation
  text: Instrumentation personnalisée avec OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog
  tag: Blog
  text: Surveiller les métriques de runtime des applications instrumentées avec OTel
    dans la solution APM de Datadog
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Mettre en corrélation les événements RUM Datadog avec les traces de vos applications
    instrumentées via OTel
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter
  tag: Blog
  text: Envoyer des métriques et des traces depuis le Collector OpenTelemetry vers
    Datadog via l'exportateur Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter
  tag: Blog
  text: Transmettre des logs depuis le Collector OpenTelemetry avec l'exportateur
    Datadog
title: Premiers pas avec OpenTelemetry chez Datadog
---

{{< learning-center-callout header="Consultez \"Comprendre OpenTelemetry\" dans le centre d'apprentissage" btn_title="Inscrivez-vous" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}} 
  Apprenez les bases d'OpenTelemetry, y compris ses capacités, ses avantages, ses composants clés et la façon dont OTel et Datadog fonctionnent ensemble. 
{{< /learning-center-callout >}}

## Présentation

[OpenTelemetry][11] est un framework open source d'observabilité qui fournit aux équipes IT des protocoles et des outils standardisés pour collecter et router les données d'observabilité issues des applications logicielles. OpenTelemetry propose un format cohérent pour {{< tooltip text="l'instrumentation" tooltip="L'instrumentation est le processus consistant à ajouter du code à votre application pour capturer et transmettre à Datadog des données d'observabilité comme des traces, des métriques et des logs." >}}, la génération, la collecte et l'export des données d'observabilité applicatives (à savoir les métriques, les logs et les traces) vers des plateformes de monitoring pour analyse et visualisation.

Ce guide explique comment configurer [un exemple d'application OpenTelemetry][12] pour envoyer des données d'observabilité à Datadog à l'aide du SDK OpenTelemetry, du collector OpenTelemetry et de [Datadog Exporter][14]. Il montre également comment explorer ces données dans l'interface de Datadog.

Suivez ce guide pour :

1. [Instrumenter l'application](#instrumenter-l-application) avec l'API OpenTelemetry.
2. [Configurer l'application](#configurer-l-application) pour envoyer les données d'observabilité à Datadog
3. [Faire le lien entre les données d'observabilité](#correlation-des-donnees-d-observabilite) grâce au tagging de service unifié.
4. [Exécuter l'application](#execution-de-l-application) pour générer des données d'observabilité.
5. [Explorer les données d'observabilité](#exploration-des-donnees-d-observabilite-dans-datadog) dans l'interface Datadog 

## Prérequis

Pour compléter ce guide, vous avez besoin des éléments suivants :

1. [Créez un compte Datadog][1] si vous ne l'avez pas encore fait.
2. Configurez votre clé d'API Datadog :
   a. Trouvez ou créez votre [clé d'API Datadog][2].
   b. Exportez votre clé d'API Datadog vers une variable d'environnement :
    {{< code-block lang="sh" >}}
export DD_API_KEY=<Your API Key>
{{< /code-block >}}
3. Obtenez l'exemple d'application [Calendar][12].
   a. Clonez le dépôt `opentelemetry-examples` sur votre appareil :
    {{< code-block lang="sh" >}}
git clone https://github.com/DataDog/opentelemetry-examples.git
{{< /code-block >}}
   b. Naviguez jusqu'au répertoire `/calendar` :
    {{< code-block lang="sh" >}}
cd opentelemetry-examples/apps/rest-services/java/calendar
{{< /code-block >}}
4. Installez [Docker Compose][3].
5. (Facultatif) Utilisez Linux pour envoyer des métriques d'infrastructure.

L'application Calendar utilise les outils OpenTelemetry pour générer et collecter des métriques, des journaux et des traces. Au cours des étapes suivantes, vous découvrirez comme,t obtenir ces données d'observabilité dans Datadog.

## Instrumenter l'application

L'exemple d'application Calendar est déjà partiellement [instrumenté][15] :

1. Accédez au fichier principal `CalendarService.java` situé à l'adresse suivante : `./src/main/java/com/otel/service/CalendarService.java`.
2. Le code suivant instrumente `getDate()` à l'aide des annotations et de l'API OpenTelemetry :

   {{< code-block lang="java" disable_copy="true" filename="CalendarService.java" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    span span = span.current() ;
    span.setAttribute("peer.service", "random-date-service") ;
    ...
}
{{< /code-block >}}

Lorsque l'application Calendar s'exécute, l'appel `getDate()` génère des [traces][8] et des spans.

## Configurer l'application

### Récepteur OTLP

L'application Calendar est déjà configurée pour envoyer des données du SDK OpenTelemetry au [récepteur du protocole OpenTelemetry (OTLP)][10] dans le collector OpenTelemetry.

1. Accédez au fichier de configuration du collector situé à l'adresse suivante : `./src/main/resources/otelcol-config.yaml`.
2. Les lignes suivantes configurent le récepteur OTLP pour recevoir des métriques, des traces et des logs :

    {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
...
service:
  pipelines:
    traces:
      receivers: [otlp]
    metrics:
      receivers: [otlp]
    logs:
      receivers: [otlp]
{{< /code-block >}}

### Exportateur Datadog

L'exportateur Datadog envoie les données collectées par le récepteur OTLP au backend Datadog.

1. Accédez au fichier `otelcol-config.yaml`.
2. Les lignes suivantes configurent l'exportateur Datadog pour qu'il envoie les données d'observabilité à Datadog :

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      trace_buffer: 500
    hostname: "otelcol-docker"
    api:
      key: ${DD_API_KEY}
      site: datadoghq.com

connectors:
    datadog/connector:
      traces:
        compute_stats_by_span_kind: true

service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector] # <- update this line
      exporters: [datadog]
    traces:
      exporters: [datadog, datadog/connector]
    logs:
      exporters: [datadog]
{{< /code-block >}}
3. Définissez `exporters.datadog.api.site` comme étant votre [site Datadog][16]. Sinon, la valeur par défaut est US1.

Cette configuration permet à l'exportateur Datadog d'envoyer des métriques d'exécution, des traces et des logs à Datadog. Toutefois, l'envoi des métriques d'infrastructure nécessite une configuration supplémentaire.

### Collector OpenTelemetry

Dans cet exemple, configurez votre collector OpenTelemetry pour qu'il envoie des métriques d'infrastructure.

<div class="alert alert-info">Pour envoyer des métriques d'infrastructure depuis le collector OpenTelemetry vers Datadog, vous devez utiliser Linux. Il s'agit d'une limitation du récepteur Docker Stats.</div> 


Pour collecter des métriques de conteneur, configurez le [récepteur Docker Stats][5] dans votre exportateur Datadog :

1. Ajoutez un bloc `docker_stats` à la section `receivers` de `otel-config.yaml` :

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      # ajoutez le bloc suivant
      docker_stats:
        endpoint: unix:///var/run/docker.sock # default; if this is not the Docker socket path, update to the correct path
        metrics:
          container.network.io.usage.rx_packets:
            enabled: true
          container.network.io.usage.tx_packets:
            enabled: true
          container.cpu.usage.system:
            enabled: true
          container.memory.rss:
            enabled: true
          container.blockio.io_serviced_recursive:
            enabled: true
          container.uptime:
            enabled: true
          container.memory.hierarchical_memory_limit:
            enabled: true
{{< /code-block >}}

2. Modifiez `service.pipelines.metrics.receivers` pour inclure `docker_stats` :

   {{< code-block lang="yaml" filename="otelcol-config.yaml" collapsible="true" disable_copy="true" >}}
service:
  pipelines:
    metrics:
      receivers: [otlp, datadog/connector, docker_stats] # <- modifiez cette ligne
{{< /code-block >}}

Cette configuration permet à l'application Calendar d'envoyer des données sur les conteneurs à Datadog pour que vous puissiez les explorer dans Datadog.

### Envoyer des données d'observabilité avec OTLP

L'application Calendar utilise l'exportateur de logs OpenTelemetry dans sa configuration Logback pour envoyer des logs avec le composant de traitement OpenTelemetry (OTLP).

1. Accédez au fichier de configuration XML Logback de l'application Calendar, situé dans `/src/main/resources/logback.xml`.
2. Les lignes suivantes définissent l'appender `OpenTelemetry` :

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<appender name="OpenTelemetry" class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
    <captureExperimentalAttributes>true</captureExperimentalAttributes>
    <captureKeyValuePairAttributes>true</captureKeyValuePairAttributes>
  </appender>
{{< /code-block >}}

3. La ligne `<appender-ref ref="OpenTelemetry"/>` fait référence à l'appender `OpenTelemetry` dans la configuration au niveau racine :

   {{< code-block lang="xml" filename="logback.xml" collapsible="true" disable_copy="true" >}}
<root level="INFO">
  <appender-ref ref="console"/>
  <appender-ref ref="OpenTelemetry"/>
</root>
{{< /code-block >}}

De plus, des variables d'environnement configurent l'environnement OpenTelemetry pour exporter les logs, les métriques et les traces :

1. Accédez au fichier Docker Compose de l'application Calendar situé dans `./deploys/docker/docker-compose-otelcol.yml`.
2. La configuration `OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4317` permet d'envoyer les métriques, les traces et les logs via OTLP.

## Corrélation des données d'observabilité

Le [tagging de service unifié][6] relie les données d'observabilité dans Datadog, ce qui vous permet de naviguer entre les métriques, les traces et les logs à l'aide d'étiquettes cohérentes.

L'application Calendar est déjà configurée avec le tagging de service unifié :

1. Accédez au fichier Docker Compose de l'application Calendar à l'emplacement `./deploys/docker/docker-compose-otelcol.yml`.
2. Les lignes suivantes activent la corrélation entre les traces applicatives et les autres données d'observabilité :

   {{< code-block lang="yaml" filename="docker-compose-otelcol.yml" collapsible="true" disable_copy="true" >}}
environment:
  - OTEL_SERVICE_NAME=calendar-otel
  - OTEL_RESOURCE_ATTRIBUTES=deployment.environment=docker,host.name=otelcol-docker,service.version=<IMAGE_TAG>
{{< /code-block >}}

## Exécuter l'application

Pour commencer à générer et transmettre des données d'observabilité à Datadog, vous devez exécuter l'application Calendar avec le SDK OpenTelemetry :

1. Exécutez l'application à partir du dossier `calendar/` :

   {{< code-block lang="sh" >}}
docker compose -f deploys/docker/docker-compose-otelcol.yml up
{{< /code-block >}}
   Cette commande crée un conteneur Docker avec le collector OpenTelemetry et le service Calendar.

2. Pour vérifier que l'application Calendar fonctionne correctement, exécutez la commande suivante depuis une autre fenêtre de terminal :

   {{< code-block lang="sh" >}}
curl localhost:9090/calendar
{{< /code-block >}}

3. Vérifiez que vous recevez une réponse du type :

   {{< code-block lang="sh" >}}
{"date":"2022-12-30"}
{{< /code-block >}}

4. Exécutez la commande `curl` plusieurs fois pour vous assurer qu'au moins une trace est exportée vers le backend Datadog.

   <div class='alert alert-info'>L'application Calendar utilise le processeur d'échantillonnage probabiliste, ce qui fait que seulement 30 % des traces transmises par l'application atteignent le backend cible.</div>

Chaque appel à l'application Calendar entraîne la transmission de métriques, de traces et de logs vers le collector OpenTelemetry, puis vers l'exportateur Datadog, et enfin vers le backend Datadog.

## Explorer des données d'observabilité dans Datadog

Utilisez l'interface Datadog pour explorer les données d'observabilité de l'application Calendar.

**Remarque** : l'apparition de vos données de trace peut prendre quelques minutes.

### Métriques de runtime et d'infrastructure

Affichez les métriques de runtime et d'infrastructure pour visualiser, surveiller et mesurer les performances de vos applications, hosts, conteneurs et processus.

1. Accédez à **APM** > **Software Catalog**.
2. Survolez le service `calendar-otel` et sélectionnez **Full Page**.
3. Faites défiler l'écran jusqu'au panneau inférieur et sélectionnez :

   * **Infrastructure Metrics** pour consulter les métriques de vos conteneurs Docker, comme l'utilisation du processeur et de la mémoire.
   * **JVM Metrics** pour consulter les métriques de runtime, comme l'utilisation du tas et le nombre de threads.

   {{< img src="/getting_started/opentelemetry/infra_and_jvm2.png" alt="Afficher les métriques d'infrastructure et les métriques de runtime JVM de l'application Calendar" style="width:90%;" >}}

### Logs

Consultez les logs pour surveiller et diagnostiquer les opérations de l'application et du système.

1. Accédez à **Logs**.
2. Si d'autres logs figurent dans la liste, ajoutez `@service.name:calendar-otel` dans le champ **Search for** pour n'afficher que les logs de l'application Calendar.
2. Sélectionnez un log dans la liste pour afficher plus de détails.

{{< img src="/getting_started/opentelemetry/logs2.png" alt="Afficher les logs de l'application Calendar" style="width:90%;" >}}

### Traces

Affichez les traces et les spans pour observer l'état et les performances des requêtes traitées par votre application.

1. Accédez à **APM** > **Traces**.
2. Dans le menu de filtrage, trouvez la section **Service** et sélectionnez la facette `calendar-otel` pour afficher toutes les traces `calendar-otel` :

   {{< img src="/getting_started/opentelemetry/traces2.png" alt="Afficher les traces de l'application Calendar" style="width:90%;" >}}

3. [Explorez vos traces `calendar-OpenTelemetry`][8].

   Pour commencer, cliquez sur une trace pour ouvrir le panneau latéral de trace et afficher plus de détails sur la trace et ses spans. Par exemple, le [Flame Graph][9] indique le temps passé dans chaque composant du chemin d'exécution de Calendar :

   {{< img src="/getting_started/opentelemetry/flame_graph2.png" alt="Afficher le Flame Graph pour une trace de l'application Calendar" style="width:90%;" >}}

4. Vous pouvez sélectionner **Infrastructure**, **Metrics** ou **Logs** dans le panneau inférieur afin de corréler la trace avec d'autres données d'observabilité.

   {{< img src="/getting_started/opentelemetry/trace_logs_correlation.png" alt="Corréler une trace de l'application Calendar avec des logs" style="width:90%;" >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.docker.com/compose/install/
[4]: /fr/opentelemetry/collector_exporter/
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver/
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: /fr/tracing/glossary/#trace
[9]: https://www.datadoghq.com/knowledge-center/distributed-tracing/flame-graph/
[10]: /fr/opentelemetry/collector_exporter/otlp_receiver/
[11]: https://opentelemetry.io/
[12]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[14]: /fr/opentelemetry/collector_exporter/
[15]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[16]: /fr/getting_started/site/