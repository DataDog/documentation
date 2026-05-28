---
aliases:
- /fr/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /fr/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /fr/opentelemetry/otlp_ingest_in_the_agent/
- /fr/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Ingestion des données de trace OTLP via l'Agent Datadog
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
title: Ingestion OTLP par l'Agent Datadog
---
L'ingestion OTLP dans l'Agent est un moyen d'envoyer des données de télémétrie directement depuis des applications instrumentées avec les [SDK OpenTelemetry][1] vers l'Agent Datadog. Depuis les versions 6.32.0 et 7.32.0, l'Agent Datadog peut ingérer des traces OTLP et des [métriques OTLP][2] via gRPC ou HTTP. Depuis les versions 6.48.0 et 7.48.0, l'Agent Datadog peut ingérer des journaux OTLP via gRPC ou HTTP.

L'ingestion OTLP dans l'Agent vous permet d'utiliser les fonctionnalités d'observabilité dans l'Agent Datadog. Les données provenant d'applications instrumentées avec le SDK OpenTelemetry ne peuvent pas être utilisées dans certains produits propriétaires de Datadog, tels que App and API Protection, Continuous Profiler, et Ingestion Rules. [Les métriques d'exécution OpenTelemetry sont prises en charge pour certains langages][10].

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Diagramme : Le SDK OpenTelemetry envoie des données via le protocole OTLP à un Collector avec le Datadog Exporter, qui les transfère vers la plateforme Datadog." style="width:100%;" >}}

<div class="alert alert-info">Pour voir quelles fonctionnalités de Datadog sont prises en charge avec cette configuration, consultez le <a href="/opentelemetry/compatibility/">tableau de compatibilité des fonctionnalités</a> sous <b>OTel vers l'Agent Datadog (OTLP)</b>.</div>

## Configuration initiale {#initial-setup}

Pour commencer, vous devez d'abord [instrumenter votre application][3] avec les SDK OpenTelemetry. Ensuite, exportez les données de télémétrie au format OTLP vers l'Agent Datadog. La configuration de cela varie en fonction du type d'infrastructure sur laquelle votre service est déployé, comme décrit sur la page ci-dessous. Bien que l'objectif soit d'être compatible avec la dernière version d'OTLP, l'ingestion OTLP dans l'Agent n'est pas compatible avec toutes les versions d'OTLP. Les versions d'OTLP compatibles avec l'Agent Datadog sont celles qui sont également prises en charge par le récepteur OTLP dans le Collecteur OpenTelemetry. Pour vérifier les versions exactes prises en charge, consultez la version `go.opentelemetry.io/collector` dans le fichier `go.mod` de l'Agent.

Lisez la documentation d'instrumentation OpenTelemetry pour comprendre comment diriger votre instrumentation vers l'Agent. La `receiver` section décrite ci-dessous suit le [schéma de configuration du récepteur OTLP du Collecteur OpenTelemetry][5].

<div class="alert alert-warning">La configuration prise en charge est un Agent d'ingestion déployé sur chaque hôte générant des données OpenTelemetry. Vous ne pouvez pas envoyer de télémétrie OpenTelemetry depuis des collecteurs ou des applications instrumentées s'exécutant sur un hôte vers un Agent sur un hôte différent. Cependant, à condition que l'Agent soit local au collecteur ou à l'application instrumentée par SDK, vous pouvez configurer plusieurs pipelines.</div>

## Activation de l'ingestion OTLP sur l'Agent Datadog {#enabling-otlp-ingestion-on-the-datadog-agent}

{{< tabs >}}
{{% tab "Host" %}}

L'ingestion OTLP est désactivée par défaut, et vous pouvez l'activer en mettant à jour votre `datadog.yaml` fichier de configuration ou en définissant des variables d'environnement. Les configurations suivantes `datadog.yaml` activent les points de terminaison sur les ports par défaut. Lorsqu'elle est activée, l'ingestion des métriques et des traces est activée par défaut. L'ingestion des journaux est désactivée par défaut pour éviter des frais imprévus liés aux journaux.

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

Ceux-ci doivent être transmis à la fois aux processus de l'Agent principal et de l'Agent de traces. Si vous exécutez dans un environnement conteneurisé, utilisez `0.0.0.0` au lieu de `localhost` pour garantir que le serveur est disponible sur des interfaces non locales.

Configurez soit gRPC soit HTTP pour cette fonctionnalité. Voici [une application exemple qui montre la configuration pour les deux][1].

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
{{% /tab %}}
{{% tab "Docker" %}}

1. Suivez la [configuration de l'Agent Docker Datadog][1].

2. Pour le conteneur de l'Agent Datadog, définissez les variables d'environnement de point de terminaison suivantes et exposez le port correspondant :
   - Pour gRPC : Définissez `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` sur `0.0.0.0:4317` et exposez le port `4317`.
   - Pour HTTP : Définissez `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` sur `0.0.0.0:4318` et exposez le port `4318`.

<div class="alert alert-danger">
<strong>Problème connu</strong> : À partir de la version 7.61.0 de l'Agent, les pipelines d'ingestion OTLP peuvent échouer à démarrer dans des environnements Docker, affichant l'erreur : <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
Si vous utilisez une version affectée, vous pouvez utiliser l'une de ces solutions de contournement :<br><br>
1. Définissez la variable d'environnement <code>HOST_PROC</code> par <code>/proc</code> dans votre conteneur Docker Agent.<br>
2. Supprimez <code>/proc/:/host/proc/:ro</code> de <code>volumes</code> dans votre conteneur Docker Agent.<br>
3. Définissez <code>pid</code> par <code>host</code> dans votre conteneur Docker Agent.<br><br>
Ces configurations peuvent être appliquées soit par le <code>docker</code> commande ou le fichier Docker compose.</div>

[1]: /fr/agent/docker/
{{% /tab %}}
{{% tab "Operator Datadog" %}}

1.  Suivez le [guide d'installation de l'Agent Kubernetes][1] pour l'installation de base.

2.  Activez le protocole préféré gRPC ou HTTP dans le manifeste de votre Operator `datadog-agent.yaml` :

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

2.  Activez le protocole préféré gRPC ou HTTP dans le fichier `datadog-values.yaml` de votre Helm :

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

2.  Configurez les variables d'environnement suivantes dans le conteneur `trace-agent` et le conteneur principal `agent` :

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

3. Mappez les ports du conteneur 4317 ou 4318 au port de l'hôte pour le conteneur principal `agent` :

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

Pour des instructions détaillées sur l'utilisation d'OpenTelemetry avec AWS Lambda et Datadog, y compris :

- Instrumenter vos fonctions Lambda avec OpenTelemetry
- Utiliser le support de l'API OpenTelemetry dans les SDK Datadog
- Envoyer des traces OpenTelemetry à l'extension Lambda de Datadog

Consultez la documentation Serverless pour [AWS Lambda et OpenTelemetry][100].

[100]: /fr/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

### Activer l'ingestion des journaux OTLP {#enabling-otlp-logs-ingestion}

L'ingestion des journaux OTLP est désactivée par défaut pour éviter des frais inattendus. Pour l'activer, vous devez explicitement activer à la fois la collecte des journaux et l'ingestion des journaux OTLP.

{{< tabs >}}
{{% tab "Host" %}}

1. Activez la collecte des journaux en suivant [Host Agent Log collection setup][7] :

   ```yaml
   logs_enabled: true
   ```

2. Définir `otlp_config.logs.enabled` sur vrai :

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[7]: /fr/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

Définissez les variables d'environnement suivantes dans le conteneur de l'agent Datadog :

- `DD_LOGS_ENABLED=true`
- `DD_OTLP_CONFIG_LOGS_ENABLED=true`

{{% /tab %}}
{{% tab "Operator Datadog" %}}

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

Dans votre fichier `datadog-values.yaml` :

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

Définissez les variables d'environnement suivantes dans le conteneur de l'agent principal :

```yaml
- name: DD_LOGS_ENABLED
  value: "true"
- name: DD_OTLP_CONFIG_LOGS_ENABLED
  value: "true"
```

Pour plus d'informations, consultez [la collecte des journaux avec votre DaemonSet][8].

[8]: /fr/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}
{{< /tabs >}}

Il existe de nombreuses autres variables d'environnement et paramètres pris en charge dans l'agent Datadog. Pour obtenir un aperçu de toutes, consultez [le modèle de configuration][6].

## Envoyer des traces, des métriques et des journaux OpenTelemetry à l'agent Datadog {#sending-opentelemetry-traces-metrics-and-logs-to-datadog-agent}

Après avoir activé l'ingestion OTLP sur l'agent Datadog, configurez votre application instrumentée par OpenTelemetry pour exporter les données de télémétrie vers le point de terminaison OTLP de l'agent. Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` dans votre environnement **application** pour diriger les données vers l'agent. Sans cette configuration, votre application n'envoie pas de données de télémétrie à l'Agent, même si le récepteur OTLP de l'Agent est activé.

{{< tabs >}}
{{% tab "Host" %}}
Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` dans l'environnement de votre application :

Pour gRPC :

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
```

Pour HTTP :

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```
{{% /tab %}}

{{% tab "Docker" %}}
1. Pour le conteneur d'application, définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` pour pointer vers le conteneur de l'Agent Datadog. Exemple :

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. Les deux conteneurs doivent être définis dans le même réseau de pont, ce qui est géré automatiquement si vous utilisez Docker Compose. Sinon, suivez l'exemple Docker dans [Tracing Docker Applications][1] pour configurer un réseau de pont avec les ports corrects.

[1]: /fr/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}
Dans le fichier de déploiement de l'application, configurez le point de terminaison auquel le client OpenTelemetry envoie les traces avec la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT`.

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

Pour HTTP :

```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # sends to HTTP receiver on port 4318
```
**Remarque** : Pour enrichir les balises de conteneur pour des métriques personnalisées, définissez les attributs de ressource appropriés dans le code de l'application où vos métriques OTLP sont générées. Par exemple, définissez l'attribut de ressource `container.id` sur l'UID du pod.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Lors de la configuration du point de terminaison pour l'envoi des traces, assurez-vous d'utiliser le chemin correct requis par votre bibliothèque OTLP. Certaines bibliothèques s'attendent à ce que les traces soient envoyées à la <code>/v1/traces</code> chemin, tandis que d'autres utilisent le chemin racine <code>/</code>.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /fr/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /fr/opentelemetry/runtime_metrics/