---
description: Envoyez des traces depuis AWS Lambda, ECS Fargate, Azure Functions, Cloud
  Run et d'autres plateformes serverless directement vers Datadog sans Datadog Agent
  ni Collector.
further_reading:
- link: /opentelemetry/setup/otlp_ingest/
  tag: Documentation
  text: Endpoint d'ingestion OTLP Datadog
- link: /serverless/
  tag: Documentation
  text: Datadog Serverless Monitoring
title: Ingestion OTLP pour le serverless
---
## Présentation {#overview}

Envoyez des traces depuis des charges de travail serverless directement vers Datadog via HTTP/protobuf, sans nécessiter de [Datadog Agent][1] ou d'OpenTelemetry Collector. Si votre plateforme apparaît dans le tableau [Plateformes gérées][5], utilisez plutôt son endpoint dédié.

Les charges de travail serverless peuvent également envoyer des logs et des métriques via les endpoints d'ingestion généraux [logs OTLP][3] et [métriques OTLP][4]. Les attributs de ressource sur cette page s'appliquent à tous les signaux exportés par votre application.

Plateformes prises en charge :

- **AWS** : Lambda, ECS Fargate
- **Azure** : Container Apps, Web Apps (App Service), Azure Functions
- **GCP** : Cloud Run, Cloud Run Functions, GKE Autopilot

<div class="alert alert-info">Utilisez l'ingestion directe lorsqu'il n'est pas pratique d'exécuter un Collector (par exemple, avec Lambda). Si vous pouvez exécuter un Collector, consultez <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a> pour l'enrichissement des métadonnées, la normalisation et l'échantillonnage centralisé.</div>

## Prérequis {#prerequisites}

La configuration suivante s'applique à toutes les plateformes.

**Protocole** : `http/protobuf` ou `http/json`. `grpc` n'est pas pris en charge.

**En-têtes requis** :

- `dd-api-key` : Votre clé Datadog API.
- `dd-otlp-source` : Définissez sur `serverless`.
- `compute_stats` : Définissez sur `true`. Requis pour les [métriques de trace][2].

**Nom du service** : Définissez `OTEL_SERVICE_NAME` pour identifier votre service. Sans cela, des traces apparaissent sous la forme `unknown_service`.

**Attributs de ressource** : Définissez les attributs spécifiques à la plateforme avec `OTEL_RESOURCE_ATTRIBUTES`. Consultez chaque onglet de fournisseur cloud ci-dessous pour les attributs requis et facultatifs.

Identifiez les charges de travail avec les attributs de plateforme sur cette page, et non avec `host.name`. Pour les recommandations de nom d'hôte pour l'ingestion OTLP directe, consultez [Nom d'hôte et marquage][6].

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## Configuration {#setup}

<div class="alert alert-info">Selon votre <a href="/getting_started/site/">site Datadog</a>, qui est {{< region-param key=dd_datacenter code="true" >}}: Remplacez <code>${YOUR_ENDPOINT}</code> par {{< region-param key="otlp_trace_endpoint" code="true" >}} dans les exemples suivants.</div>

Sélectionnez votre fournisseur cloud pour la configuration des attributs de ressource spécifiques à la plateforme :

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda {#lambda}

La [couche Lambda AWS Distro for OpenTelemetry (ADOT)][100] fournit une instrumentation automatique et une détection des ressources pour les fonctions Lambda.

Ajoutez la couche ADOT à votre fonction Lambda et configurez les variables d'environnement suivantes :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

La couche ADOT gère automatiquement la détection des attributs de ressource. Si vous n'utilisez pas ADOT, définissez les attributs de ressource manuellement. `cloud.provider` est requis. Définissez `faas.id` (un ARN Lambda analysable) pour une identification complète de la plateforme ; si `faas.id` n'est pas disponible, définissez `cloud.platform=aws_lambda` à la place :

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

| Attribut | Requis | Description |
|---|---|---|
| `cloud.provider` | Oui | Défini sur `aws` |
| `faas.id` | Recommandé | ARN de la fonction Lambda (préféré pour l'identification de la plateforme) |
| `cloud.platform` | Conditionnel | Défini sur `aws_lambda` si `faas.id` n'est pas défini |
| `cloud.region` | Non | Région AWS |
| `faas.name` | Non | Nom de la fonction |
| `faas.version` | Non | Version de la fonction |
| `faas.instance` | Non | Identifiant d'instance |
| `faas.max_memory` | Non | Mémoire maximale configurée (octets) |
| `aws.log.group.names` | Non | Noms des groupes de logs CloudWatch (active la corrélation trace-log) |
| `aws.log.stream.names` | Non | Noms des flux de logs CloudWatch |

### ECS Fargate {#ecs-fargate}

L'identification ECS Fargate est déterminée par l'ARN de la tâche et le type de lancement, et non par `cloud.provider` ou `cloud.platform`. Configurez le SDK OpenTelemetry pour exporter les traces directement depuis votre tâche ECS :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-ecs-service"
export OTEL_RESOURCE_ATTRIBUTES="aws.ecs.task.arn=arn:aws:ecs:us-east-1:123456789012:task/my-cluster/1234567890abcdef,aws.ecs.launchtype=fargate"
```

| Attribut | Requis | Description |
|---|---|---|
| `aws.ecs.task.arn` | Oui | ARN de la tâche ECS |
| `aws.ecs.launchtype` | Oui | Défini sur `fargate` (insensible à la casse) |
| `cloud.provider` | Non | Par défaut sur `aws` |
| `cloud.platform` | Non | Par défaut sur `aws_ecs` |
| `cloud.region` | Non | Région AWS |
| `cloud.availability_zone` | Non | Zone de disponibilité |
| `aws.ecs.cluster.arn` | Non | ARN du cluster |
| `aws.ecs.task.family` | Non | Famille de définition de tâche |
| `aws.ecs.task.id` | Non | ID de tâche |
| `aws.ecs.task.revision` | Non | Révision de la définition de tâche |
| `aws.log.group.names` | Non | Noms des groupes de logs CloudWatch (active la corrélation trace-log) |
| `aws.log.stream.names` | Non | Noms des flux de logs CloudWatch |

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">Le processeur de détection de ressources Azure du collecteur OpenTelemetry ne prend en charge que les machines virtuelles. Les détecteurs de ressources Azure au niveau du SDK prennent en charge certaines plateformes (Web Apps, Functions), mais leur couverture varie selon le SDK utilisé. Définir <code>cloud.provider</code>, <code>cloud.platform</code>, et <code>cloud.resource_id</code> manuellement comme chemin fiable pour toutes les plateformes serverless Azure.</div>

### Container Apps {#container-apps}

La prise en charge du détecteur de ressources Azure pour Container Apps varie en fonction du SDK utilisé. Définissez les attributs de ressource manuellement :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps (App Service) {#web-apps-app-service}

Utilisez le package SDK du détecteur de ressources Azure (la couverture varie selon le SDK utilisé) ou définissez `OTEL_RESOURCE_ATTRIBUTES` manuellement :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions {#azure-functions}

Utilisez le package SDK du détecteur de ressources Azure (la couverture varie selon le SDK utilisé) ou définissez `OTEL_RESOURCE_ATTRIBUTES` manuellement :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### Référence des attributs de ressource {#resource-attributes-reference}

| Plateforme | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure.app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure.functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

{{% /tab %}}
{{% tab "GCP" %}}

La détection des ressources GCP fonctionne automatiquement avec le package SDK GCP Resource Detector. Ajoutez-le aux dépendances de votre application pour renseigner les attributs de ressource sans configuration manuelle.

### Cloud Run et Cloud Run Functions {#cloud-run-and-cloud-run-functions}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

Le SDK GCP Resource Detector remplit automatiquement : `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version`.

### GKE Autopilot {#gke-autopilot}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

Le SDK GCP Resource Detector remplit automatiquement : `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name`.

### Référence des attributs de ressource {#resource-attributes-reference-1}

| Plateforme | Attributs remplis par GCP Resource Detector |
|---|---|
| Cloud Run / Cloud Run Functions | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `faas.id`, `faas.instance`, `faas.name`, `faas.version` |
| GKE Autopilot | `cloud.account.id`, `cloud.platform`, `cloud.provider`, `cloud.region`, `host.id`, `k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[2]: /fr/tracing/metrics/
[3]: /fr/opentelemetry/setup/otlp_ingest/logs/
[4]: /fr/opentelemetry/setup/otlp_ingest/metrics/
[5]: /fr/opentelemetry/setup/otlp_ingest/managed_platforms/
[6]: /fr/opentelemetry/config/hostname_tagging/#direct-otlp-intake-without-a-collector