---
aliases:
- /fr/metrics/open_telemetry/
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: En savoir plus sur OpenTelemetry
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: GitHub
  text: Envoyer des métriques et des traces depuis le Collector OpenTelemetry vers
    Datadog via l'exportateur Datadog
title: Envoyer des métriques depuis OpenTelemetry vers Datadog
---

## Présentation

[OpenTelemetry][1] (OTel) est un framework d'observabilité open source qui offre aux équipes informatiques des protocoles et des outils normalisés pour recueillir et acheminer des données de télémétrie. Créé en tant que projet incubateur par la [Cloud Native Computing Foundation][2] (CNCF), OTel propose un format standard pour instrumenter, générer et recueillir des données de télémétrie sur vos applications (notamment des métriques, des logs et des traces), qui sont ensuite transmises aux plateformes de surveillance en vue de leur analyse.

## Configuration

Il existe deux façons d'envoyer des métriques OTel à Datadog : via l'Agent Datadog, ou via le Collector OTel. En utilisant l'Agent Datadog, vous pourrez tirer parti de toutes les [fonctionnalités de l'Agent][3]. Si vous avez besoin d'une solution plus universelle, utilisez le Collector OTel.

### Utilisation de l'Agent Datadog

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="SDK/Bibliothèques OTel, bibliothèque de tracing Datadog, intégrations Datadog -> Agent Datadog -> Datadog" style="width:100%;">}}



#### Configuration

1. [Instrumentez vos applications avec les SDK OpenTelemetry][4].
2. [Activez l'ingestion OTLP][5] sur l'Agent Datadog.
3. [Envoyez les données de télémétrie OTLP][6] depuis votre système à Datadog.

### Utilisation du Collector OTel

{{< img src="metrics/otel/datadog_exporter.png" alt="Bibliothèque d'instrumentation de l'application, intégrations cloud et autres solutions de surveillance (par ex. Prometheus) -> exportateur Datadog dans le Collector OTel -> Datadog" style="width:100%;">}}

Cette méthode facilite la collecte de données de télémétries depuis des sources autres que les SDK OTel (telles que d'autres bibliothèques, Prometheus, etc.), ainsi que leur transmission vers d'autres plateformes. 

#### Configuration

1. [Instrumentez votre système avec OpenTelemetry][4].
2. Consultez la [documentation relative au Collector OTel][7] pour installer la distribution `opentelemetry-collector-contrib` ou toute autre distribution comprenant l'exportateur Datadog.
3. Ajoutez un exportateur `datadog` dans votre [fichier YAML de configuration OTel][8]. L'exemple de fichier suivant contient la configuration minimum requise pour recueillir des métriques système :
   ```yaml
   receivers:
     hostmetrics:
       scrapers:
         load:
         cpu:
         disk:
         filesystem:
         memory:
         network:
         paging:
         process:

   processors:
     batch:
       timeout: 10s

   exporters:
     datadog:
       api:
         key: "<API key>"
         site: "<Datadog site>"

   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [batch]
         exporters: [datadog]
   ```
   Ajoutez votre [clé d'API Datadog][9] et votre [site][10] (par défaut, ce dernier est défini sur `datadoghq.com`).
   Consultez l'[exemple de fichier de configuration][11] pour découvrir les autres options disponibles.

##### Utiliser le Collector OTel avec l'Agent Datadog

Si vous souhaitez utiliser le Collector OTel tout en tirant parti de l'ensemble des fonctionnalités de Datadog, choisissez la méthode suivante :

**SDK/bibliothèques OTel** -> **Collector OTel** avec l'exportateur OTLP -> **Agent Datadog** -> **Datadog**

#### Configuration

1. [Instrumentez votre système avec OpenTelemetry][4].
2. [Activez l'ingestion OTLP via gRPC][5] sur l'Agent Datadog.
3. Ajoutez un exportateur OTLP dans votre [fichier YAML de configuration OTel][8]. Pointez l'exportateur vers l'endpoint de l'Agent Datadog. Par exemple, si votre Agent Datadog effectue l'écoute sur le port 4317 et que vous exécutez le Collector OTel sur le même host, vous pouvez définir l'exportateur comme suit :
   ```yaml
   receivers:
     otlp:
         protocols:
             grpc:
               # Set to different port from Datadog Agent OTLP ingest 
               # Point your instrumented application to port '5317' if using gRPC.
               endpoint: "0.0.0.0:5317" 
             http:
               # Set to different port from Datadog Agent OTLP ingest 
               # Point your instrumented application to port '5318' if using HTTP.
               endpoint: "0.0.0.0:5318"

     hostmetrics:
       scrapers:
         load:
         cpu:
         disk:
         filesystem:
         memory:
         network:
         paging:
         process:

   processors:
     batch:
       timeout: 10s

   exporters:
     otlp:
       endpoint:
         key: "0.0.0.0:4317"
         tls:
           insecure: true

   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [batch]
         exporters: [otlp]
   ```
   Si vous utilisez un environnement conteneurisé, assurez-vous que le paramètre `endpoint` est défini sur le hostname approprié pour l'Agent Datadog.

## Dashboards prêts à l'emploi

Datadog propose des dashboards prêts à l'emploi que vous pouvez copier et personnaliser. Pour utiliser les dashboards OpenTelemetry de Datadog, accédez à **Dashboards** > **Dashboards list** et recherchez `opentelemetry`:

{{< img src="metrics/otel/dashboard.png" alt="La liste des dashboards avec deux dashboards OpenTelemetry prêts à l'emploi visibles : Host Metrics et Collector Metrics." style="width:80%;">}}

Le dashboard **Host Metrics** permet de visualiser les données recueillies depuis le [récepteur de métriques de host][12]. Le dashboard **Collector Metrics** affiche touts les autres types de métriques recueillies, en fonction du [récepteur de métriques][13] que vous avez choisi d'activer.




## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://www.datadoghq.com/pricing/?product=infrastructure#infrastructure
[4]: https://opentelemetry.io/docs/instrumentation/
[5]: /fr/opentelemetry/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[6]: /fr/opentelemetry/otlp_ingest_in_the_agent/?tab=host#sending-otlp-traces-from-the-application-to-datadog-agent
[7]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[8]: https://opentelemetry.io/docs/collector/configuration/
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /fr/getting_started/site/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter/examples
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver