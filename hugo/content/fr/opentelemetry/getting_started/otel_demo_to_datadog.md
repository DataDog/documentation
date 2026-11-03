---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
  - opentelemetry demo
aliases:
- /fr/opentelemetry/guide/otel_demo_to_datadog
- /fr/opentelemetry/otel_demo_to_datadog
further_reading:
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Catalog
- link: /tracing/trace_explorer/
  tag: Documentation
  text: Trace Explorer
- link: /tracing/trace_explorer/trace_queries/
  tag: Documentation
  text: Requêtes de traces
- link: /error_tracking/
  tag: Documentation
  text: Error Tracking
title: Envoi de données de la démo OpenTelemetry vers Datadog
---
## Présentation {#overview}

<div class="alert alert-info">Ce tutoriel utilise l'exportateur Datadog et le connecteur Datadog. Pour les nouvelles configurations de Collector, Datadog recommande le pipeline OTLP dans <a href="/opentelemetry/setup/collector_exporter/">Configurer le Collector OpenTelemetry</a>.</div>

La [démo OpenTelemetry][1] est une application de microservices développée par la communauté pour démontrer l'instrumentation OpenTelemetry (OTel)
et ses capacités d'observabilité. Il s'agit d'une page web de commerce électronique composée de multiples microservices communiquant entre eux via HTTP et gRPC. Tous les services sont instrumentés avec OpenTelemetry et produisent des traces, des métriques et des logs.

Cette page vous guide à travers les étapes nécessaires pour déployer la démo OpenTelemetry et envoyer ses données vers Datadog.

## Prérequis {#prerequisites}

Pour compléter ce guide, assurez-vous de disposer des éléments suivants :

1. [Créez un compte Datadog][2] si ce n'est pas déjà fait.
2. Trouvez ou créez votre [clé Datadog API][3].
3. 6 Go de RAM libre pour l'application.

Vous pouvez déployer la démo en utilisant Docker ou Kubernetes (avec Helm). Choisissez votre méthode de déploiement préférée et assurez-vous d'avoir installé les outils nécessaires :

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make (optionnel)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+
- Un cluster Kubernetes actif avec kubectl configuré pour s'y connecter

{{% /tab %}}
{{< /tabs >}}

## Configuration et déploiement de la démo {#configuring-and-deploying-the-demo}

### Clonage du dépôt {#cloning-the-repository}

Clonez le dépôt `opentelemetry-demo` sur votre appareil :

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configuration de l'OpenTelemetry Collector {#configuring-the-opentelemetry-collector}

Pour envoyer les données de télémétrie de la démo à Datadog, vous devez ajouter les composants suivants à la configuration de l'OpenTelemetry Collector :

- `Resource Processor` est un composant `optional` mais recommandé, utilisé pour définir l'attribut de ressource `deployment.environment.name`, que Datadog mappe vers le tag `env`.
- `Datadog Connector` est responsable du calcul des métriques de trace Datadog APM.
- `Datadog Exporter` est responsable de l'exportation des traces, des métriques et des logs vers Datadog.
- `Datadog Extension` est un composant `optional` qui vous permet de visualiser la configuration de l'OpenTelemetry Collector au sein de la surveillance de l'infrastructure. (En savoir plus sur [Datadog Extension][13]).

Complétez les étapes suivantes pour configurer ces composants.

{{< tabs >}}
{{% tab "Docker" %}}

1. Ouvrez le dépôt de la démo. Créez un fichier nommé `docker-compose.override.yml` dans le dossier racine.

2. Ouvrez le fichier créé. Collez le contenu suivant et définissez les variables d'environnement [Datadog site][7] et [Datadog API key][8] :

    ```yaml
    services:
      otel-collector:
        command:
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
          - "--feature-gates=datadog.EnableOperationAndResourceNameV2"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. Pour configurer l'OpenTelemetry Collector, ouvrez `src/otel-collector/otelcol-config-extras.yml` et ajoutez ce qui suit au fichier :

    ```yaml
    extensions:
      datadog/extension:
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        http:
          endpoint: "localhost:9875"
          path: "/metadata"

    exporters:
      datadog:
        traces:
          compute_stats_by_span_kind: true
          trace_buffer: 500
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            min_size: 10
            max_size: 100
            flush_timeout: 10s

    processors:
      resource:
        attributes:
          - key: deployment.environment.name
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          compute_stats_by_span_kind: true

    service:
      extensions: [datadog/extension]
      pipelines:
        traces:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource, transform/sanitize_spans]
          exporters: [otlp_grpc/jaeger, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [otlp_http/prometheus, debug, datadog]
        logs:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [opensearch, debug, datadog]
    ```

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otel-collector/otelcol-config.yml`: contains the default configuration for the collector.
    - `src/otel-collector/otelcol-config-extras.yml`: used to add extra configuration to the collector.

    <div class="alert alert-info">
    Lors de la fusion de valeurs YAML, les objets sont fusionnés et les tableaux sont remplacés.
    C'est pourquoi davantage de composants sont spécifiés dans les pipelines qu'il n'y en a réellement de configurés.
    La configuration précédente ne remplace pas les valeurs configurées dans le principal <code>otelcol-config</code> fichier.
    </div>

[7]: /fr/getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Créez un secret nommé `dd-secrets` pour stocker les secrets Datadog Site et API Key :

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Ajoutez le [chart Helm][4] OpenTelemetry à votre dépôt pour gérer et déployer la démo OpenTelemetry :

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. Créez un fichier nommé `my-values-file.yml` avec le contenu suivant :

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        extensions:
          datadog/extension:
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            http:
              endpoint: "localhost:9875"
              path: "/metadata"
        exporters:
          datadog:
            traces:
              compute_stats_by_span_kind: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            sending_queue:
              batch:
                min_size: 10
                max_size: 100
                flush_timeout: 10s

        processors:
          resource:
            attributes:
              - key: deployment.environment.name
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              compute_stats_by_span_kind: true

        service:
          extensions: [health_check, datadog/extension]
          pipelines:
            traces:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlp/jaeger, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [datadog/connector, otlp, spanmetrics]
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Lors de la fusion de valeurs YAML, les objets sont fusionnés et les tableaux sont remplacés.
    C'est pourquoi davantage de composants sont spécifiés dans les pipelines qu'il n'y en a réellement de configurés.
    La configuration précédente ne remplace pas les valeurs configurées dans le principal <code>otelcol-config</code> fichier.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### Exécution de la démo {#running-the-demo}

{{< tabs >}}
{{% tab "Docker" %}}

Si make est installé, vous pouvez utiliser la commande suivante pour démarrer la démo :

```shell
make start
```

Si `make` n'est pas installé, vous pouvez utiliser directement la commande `docker compose` :

```shell
docker compose --env-file .env --env-file .env.override up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Pour déployer l'application de démo sur Kubernetes avec Helm, exécutez la commande suivante :

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## Navigation dans l'application {#navigating-the-application}

Vous pouvez accéder à l'interface web de l'Astronomy Shop pour explorer l'application et observer comment les données de télémétrie sont générées.

{{< tabs >}}
{{% tab "Docker" %}}

Allez sur <http://localhost:8080>.

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Si vous exécutez un cluster local, vous devez rediriger le port du proxy frontend :

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. Allez sur <http://localhost:8080>.

{{% /tab %}}
{{< /tabs >}}

## Corrélation des données de télémétrie {#telemetry-data-correlation}

Les étapes d'instrumentation utilisées dans tous les services de la démo se trouvent
dans la documentation principale d'OpenTelemetry.

Vous pouvez trouver le langage dans lequel chaque service a été implémenté ainsi que sa
documentation dans le [tableau de référence des fonctionnalités linguistiques][10].

## Explorer les données OpenTelemetry dans Datadog {#exploring-opentelemetry-data-in-datadog}

Lorsque la démo OTel est en cours d'exécution, le générateur de charge intégré simule du trafic dans l'application.
Après quelques secondes, vous pouvez voir les données arriver dans Datadog.

### Catalog {#catalog}

Affichez tous les services qui font partie de la démo OTel :

1. Allez dans [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}][11].

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog.png" alt="Voir la page du catalogue avec la liste des services de l'application de démo OpenTelemetry" style="width:90%;" >}}

2. Sélectionnez {{< ui >}}Map{{< /ui >}} pour voir comment les services sont connectés. Changez {{< ui >}}Map layout{{< /ui >}} pour {{< ui >}}Cluster{{< /ui >}} ou {{< ui >}}Flow{{< /ui >}} pour voir la carte dans différents modes.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_flow.png" alt="Voir le flux de la Service Map avec tous les services connectés" style="width:90%;" >}}

3. Sélectionnez la vue {{< ui >}}Catalog{{< /ui >}}, puis sélectionnez un service pour voir un résumé des performances dans le panneau latéral.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_service.png" alt="Voir le résumé des performances et les conseils de configuration d'un service spécifique" style="width:90%;" >}}

### Trace Explorer{#trace-explorer}

Explorez les traces reçues de la démo OTel :

1. Depuis {{< ui >}}Performance{{< /ui >}} > {{< ui >}}Setup Guidance{{< /ui >}}, cliquez sur {{< ui >}}View Traces{{< /ui >}} pour ouvrir Trace Explorer, avec le service sélectionné appliqué comme filtre.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="Vue des traces avec tous les spans indexés pour le service checkout" style="width:90%;" >}}

2. Sélectionnez un span indexé pour voir les détails complets de la trace pour cette transaction.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_waterfall.png" alt="Vue de trace avec tous les spans appartenant à cette transaction spécifique" style="width:90%;" >}}

3. Naviguez à travers les onglets pour voir des détails supplémentaires :
   - Métriques d'infrastructure pour les services rapportant des Host Metrics.
   - Métriques d'exécution pour les services qui ont déjà été implémentés.
   - Entrées de log corrélées avec cette trace.
   - Liens de span liés à cette trace.

### Requêtes de trace {#trace-queries}

Datadog vous permet de filtrer et de regrouper les données OpenTelemetry reçues. Par exemple, pour trouver toutes les transactions d'un utilisateur spécifique, vous pouvez utiliser les requêtes de trace :

La démo OTel envoie `user.id` sous forme de tags de span, vous pouvez donc l'utiliser pour filtrer toutes les transactions déclenchées par l'utilisateur :

1. Depuis {{< ui >}}Info{{< /ui >}} dans le panneau latéral, survolez la ligne avec l'identifiant utilisateur, cliquez sur l'icône {{< ui >}}cog{{< /ui >}} et sélectionnez {{< ui >}}filter by @app.user.id:<user_id>{{< /ui >}}.

2. Supprimez tous les filtres précédents, en ne laissant que {{< ui >}}@app.user.id{{< /ui >}} appliqué pour afficher toutes les transactions contenant des spans avec l'identifiant utilisateur spécifié.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="Requête de trace filtrant tous les spans qui contiennent un app.user.id spécifique" style="width:90%;" >}}

### Error Tracking {#error-tracking}

La démo OpenTelemetry inclut un feature flag engine pour simuler des scénarios d'erreur.

1. Accédez à [http://localhost:8080/feature][12] pour gérer les scénarios disponibles. Consultez la [documentation de la démo OpenTelemetry][5] pour plus de détails.
2. Une fois que la démo commence à produire des erreurs, vous pouvez visualiser et localiser les services affectés dans Datadog.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="Vue Error Tracking montrant le feature flag PaymentService Fail activé" style="width:90%;" >}}

### Configuration du collecteur OpenTelemetry {#opentelemetry-collector-configuration}

L'extension Datadog vous permet de visualiser la configuration du collecteur OpenTelemetry dans Datadog sur l'une des pages suivantes :

- [Liste des infrastructures][14].
- [Resource Catalog][15].

Lors de la sélection du nom d'hôte où le collecteur est en cours d'exécution, vous pouvez visualiser sa configuration complète :

{{< img src="/getting_started/opentelemetry/otel_demo/collector_full_config.png" alt="Configuration du collecteur OpenTelemetry rendue dans Datadog" style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services
[12]: http://localhost:8080/feature
[13]: /fr/opentelemetry/integrations/datadog_extension/
[14]: https://app.datadoghq.com/infrastructure
[15]: https://app.datadoghq.com/infrastructure/catalog