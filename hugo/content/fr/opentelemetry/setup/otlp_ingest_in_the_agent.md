---
aliases:
- /fr/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /fr/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /fr/opentelemetry/otlp_ingest_in_the_agent/
- /fr/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Ingérer des données de trace OTLP via le Datadog Agent
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingestion OTLP dans l'Agent
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentation
  text: Types de métriques OTLP
- link: /opentelemetry/runtime_metrics/
  tag: Documentation
  text: Métriques de runtime OpenTelemetry
title: Ingestion OTLP par le Datadog Agent
---
L'ingestion OTLP dans l'Agent est un moyen d'envoyer des données de télémétrie directement depuis des applications instrumentées avec des [SDK OpenTelemetry][1] vers le Datadog Agent. Depuis les versions 6.32.0 et 7.32.0, le Datadog Agent peut ingérer des traces OTLP et des [métriques OTLP][2] via gRPC ou HTTP. Depuis les versions 6.48.0 et 7.48.0, le Datadog Agent peut ingérer des logs OTLP via gRPC ou HTTP.

L'ingestion OTLP dans l'Agent vous permet d'utiliser les fonctionnalités d'observabilité de le Datadog Agent. Les données provenant d'applications instrumentées avec le SDK OpenTelemetry ne peuvent pas être utilisées dans certains produits propriétaires Datadog, tels que App and API Protection, Continuous Profiler et Ingestion Rules. [Les métriques d'exécution OpenTelemetry sont prises en charge pour certains langages][10].

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Diagramme : le SDK OpenTelemetry envoie des données via le protocole OTLP à un collecteur avec l'exportateur Datadog, qui les transfère vers la plateforme Datadog." style="width:100%;" >}}

<div class="alert alert-info">Pour voir quelles fonctionnalités Datadog sont prises en charge avec cette configuration, consultez le <a href="/opentelemetry/compatibility/">tableau de compatibilité des fonctionnalités</a> sous <b>OTel vers le Datadog Agent (OTLP)</b>.</div>

## Configuration initiale {#initial-setup}

Pour commencer, vous devez d'abord [instrumenter votre application][3] avec les SDK OpenTelemetry. Ensuite, exportez les données de télémétrie au format OTLP vers le Datadog Agent. La configuration varie en fonction du type d'infrastructure sur laquelle votre service est déployé, comme décrit sur la page ci-dessous. Bien que l'objectif soit d'être compatible avec la dernière version d'OTLP, l'ingestion OTLP dans l'Agent n'est pas compatible avec toutes les versions d'OTLP. Les versions d'OTLP compatibles avec le Datadog Agent sont celles qui sont également prises en charge par le récepteur OTLP dans l'OpenTelemetry Collector. Pour vérifier les versions exactes prises en charge, consultez le fichier `go.opentelemetry.io/collector` version dans l'Agent `go.mod`.

Lisez la documentation sur l'instrumentation OpenTelemetry pour comprendre comment diriger votre instrumentation vers l'Agent. La section `receiver` décrite ci-dessous suit le [schéma de configuration du récepteur OTLP de l'OpenTelemetry Collector][5].

<div class="alert alert-warning">La configuration prise en charge consiste en un Agent d'ingestion déployé sur chaque host générant des données OpenTelemetry. Vous ne pouvez pas envoyer de télémétrie OpenTelemetry depuis des collecteurs ou des applications instrumentées s'exécutant sur un host vers un Agent sur un host différent. Cependant, à condition que l'Agent soit local au collecteur ou à l'application instrumentée par le SDK, vous pouvez configurer plusieurs pipelines.</div>

## Activation de l'ingestion OTLP sur le Datadog Agent {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "Host" %}}

L'ingestion OTLP est désactivée par défaut, et vous pouvez l'activer en mettant à jour la configuration de votre fichier `datadog.yaml` ou en définissant des variables d'environnement. Les configurations `datadog.yaml` suivantes activent les points de terminaison sur les ports par défaut. Lorsqu'elle est activée, l'ingestion des métriques et des traces est activée par défaut. L'ingestion des logs est désactivée par défaut pour éviter une facturation inattendue des logs.

{{% otel-endpoint-note %}}

Pour gRPC, port par défaut 4317 :

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
  logs:
    enabled: false
```
Pour HTTP, port par défaut 4318 :

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
  logs:
    enabled: false
```

Alternativement, configurez les points de terminaison en fournissant le port via les variables d'environnement :

- Pour gRPC (`localhost:4317`) : `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- Pour HTTP (`localhost:4318`) : `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

Ceux-ci doivent être transmis à la fois aux processus de l'Agent principal et de l'Agent de trace. Si vous exécutez dans un environnement conteneurisé, utilisez `0.0.0.0` au lieu de `localhost` pour vous assurer que le serveur est disponible sur des interfaces non locales.

Configurez soit gRPC, soit HTTP pour cette fonctionnalité. Voici [un exemple d'application qui montre la configuration pour les deux][1].

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Suivez la [configuration de le Datadog Agent Docker][1].

2. Pour le conteneur de le Datadog Agent, définissez les variables d'environnement de endpoint suivantes et exposez le port correspondant :
   - Pour gRPC : Définissez `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` sur `0.0.0.0:4317` et exposez le port `4317`.
   - Pour HTTP : Définissez `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` sur `0.0.0.0:4318` et exposez le port `4318`.

<div class="alert alert-danger">
<strong>Problème connu</strong> : À partir de la version 7.61.0 de l'Agent, les pipelines d'ingestion OTLP peuvent échouer au démarrage dans les environnements Docker, affichant l'erreur : <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
Si vous utilisez une version affectée, vous pouvez utiliser l'une de ces solutions de contournement :<br><br>
1. Définissez la variable d'environnement <code>HOST_PROC</code> par <code>/proc</code> dans votre conteneur Docker Agent.<br>
2. Supprimez <code>/proc/:/host/proc/:ro</code> de <code>volumes</code> dans votre conteneur Docker Agent.<br>
3. Définissez <code>pid</code> par <code>host</code> dans votre conteneur Docker Agent.<br><br>
Ces configurations peuvent être appliquées via la <code>docker</code> commande ou fichier Docker compose.</div>

[1]: /fr/agent/docker/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

1.  Suivez le [guide d'installation de l'Agent Kubernetes][1] pour l'installation de base.

2.  Activez le protocole souhaité, gRPC ou HTTP, dans le manifeste `datadog-agent.yaml` de votre Opérateur :

    Pour gRPC :
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              grpc:
                enabled: true
    ```
    
    For HTTP:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      # (...)
      features:
        otlp:
          receiver:
            protocols:
              http:
                enabled: true
    ```

{{% k8s-operator-redeploy %}}

Cela active chaque protocole sur le port par défaut (`4317` pour OTLP/gRPC et `4318` pour OTLP/HTTP). Les métriques et les traces sont activées par défaut.

[1]: /fr/agent/kubernetes/
{{% /tab %}}
{{% tab "Helm" %}}

1.  Suivez le [guide d'installation de l'Agent Kubernetes][1] pour l'installation de base.

2.  Activez le protocole souhaité, gRPC ou HTTP, dans le fichier `datadog-values.yaml` de votre Helm :

    Pour gRPC :
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            grpc:
              enabled: true
    ```

    For HTTP:
    ```yaml
    datadog:
      # (...)
      otlp:
        receiver:
          protocols:
            http:
              enabled: true
    ```

{{% k8s-helm-redeploy %}}

Cela active chaque protocole sur le port par défaut (`4317` pour OTLP/gRPC et `4318` pour OTLP/HTTP). Les métriques et les traces sont activées par défaut.

[1]: /fr/agent/kubernetes/
{{% /tab %}}
{{% tab "Manuel (Daemonset)" %}}

1.  Suivez le [guide d'installation manuelle de Kubernetes][1] pour l'installation de base.

2.  Configurez les variables d'environnement suivantes dans le conteneur `trace-agent` et le conteneur `agent` principal :

    Pour gRPC :
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
    value: "0.0.0.0:4317"
    ```

    For HTTP:
    ```yaml
    name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
    value: "0.0.0.0:4318"
    ```

3. Mappez les ports de conteneur 4317 ou 4318 sur le port host pour le conteneur `agent` principal :

    Pour gRPC :
    ```yaml
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: traceportgrpc
        protocol: TCP
    ```

    For HTTP
    ```yaml
    ports:
      - containerPort: 4318
        hostPort: 4318
        name: traceporthttp
        protocol: TCP
    ```

[1]: /fr/containers/guide/kubernetes_daemonset/
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour des instructions détaillées sur l'utilisation d'OpenTelemetry avec AWS Lambda et Datadog, notamment :

- Instrumentation de vos fonctions Lambda avec OpenTelemetry
- Utilisation de la prise en charge de l'API OpenTelemetry au sein des SDK Datadog
- Envoi de traces OpenTelemetry à la Datadog Lambda Extension

Consultez la documentation Serverless pour [AWS Lambda et OpenTelemetry][100].

[100]: /fr/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### Activation de l'ingestion de logs OTLP {#enabling-otlp-logs-ingestion}

L'ingestion de logs OTLP est désactivée par défaut pour éviter une facturation inattendue. Pour l'activer, vous devez explicitement activer à la fois la collecte de logs et l'ingestion de logs OTLP.

{{< tabs >}}
{{% tab "Host" %}}

1. Activez la collecte de logs en suivant [la configuration de la collecte de logs de l'Agent host ][7] :

   ```yaml
   logs_enabled: true
   ```

2. Définissez `otlp_config.logs.enabled` sur true :

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /fr/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Définissez les variables d'environnement suivantes dans le conteneur de le Datadog Agent :

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Dans votre fichier `datadog-agent.yaml`

```yaml
spec:
  # (...)
  features:
    otlp:
      #(... enable gRPC or HTTP ingestion...)
    logCollection:
      enabled: true
  override:
    nodeAgent:
      containers:
        agent:
          env:
            - name: DD_OTLP_CONFIG_LOGS_ENABLED
              value: "true"
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Dans votre fichier `datadog-values.yaml`:

```yaml
datadog:
  # (...)
  otlp:
    #(... enable gRPC or HTTP ingestion...)
    logs:
      enabled: true
  logs:
    enabled: true
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{% tab "Manuel (Daemonset)" %}}

Définissez les variables d'environnement suivantes dans le conteneur de l'Agent principal :

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

Pour plus d'informations, consultez [la collecte de logs avec votre DaemonSet][8].

[8]: /fr/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

De nombreuses autres variables d'environnement et paramètres sont pris en charge dans le Datadog Agent. Pour un aperçu, consultez [les fichiers de configuration de l'Agent][6].

## Envoi de traces, de métriques et de logs OpenTelemetry à le Datadog Agent {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Après avoir activé l'ingestion OTLP sur le Datadog Agent, configurez votre application instrumentée par OpenTelemetry pour exporter les données de télémétrie vers le endpoint OTLP de l'Agent. Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` dans votre environnement **d'application** pour diriger les données vers l'Agent. Sans cette configuration, votre application n'envoie pas de données de télémétrie à l'Agent, même si le récepteur OTLP de l'Agent est activé.

{{< tabs >}}
{{% tab "Host" %}}
Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` dans l'environnement de votre application:

Pour gRPC :

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
```

Pour HTTP:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```
{{% /tab %}}

{{% tab "Docker" %}}
1. Pour le conteneur d'application, définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` pour pointer vers le conteneur de le Datadog Agent. Exemple :

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. Les deux conteneurs doivent être définis dans le même réseau de pont, ce qui est géré automatiquement si vous utilisez Docker Compose. Sinon, suivez l'exemple Docker dans [Tracing Docker Applications][1] pour configurer un réseau de pont avec les ports corrects.

[1]: /fr/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
Dans le fichier de déploiement de l'application, configurez le endpoint vers lequel le client OpenTelemetry envoie les traces avec la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT`.

Pour gRPC :

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # sends to gRPC receiver on port 4317
```

Pour HTTP:

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```
**Remarque** : Pour enrichir les tags de conteneur pour les métriques personnalisées, définissez les attributs de ressource appropriés dans le code de l'application où vos métriques OTLP sont générées. Par exemple, définissez l'attribut de ressource `container.id` en utilisant un [détecteur de ressources][1] de conteneur.

[1]: https://opentelemetry.io/docs/concepts/resources/#resource-detectors
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Lors de la configuration du endpoint pour l'envoi de traces, assurez-vous d'utiliser le chemin correct requis par votre bibliothèque OTLP. Certaines bibliothèques attendent que les traces soient envoyées au <code>/v1/traces</code> chemin, tandis que d'autres utilisent le chemin racine <code>/</code>.</div>

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /fr/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: /fr/agent/configuration/agent-configuration-files/
[10]: /fr/opentelemetry/runtime_metrics/