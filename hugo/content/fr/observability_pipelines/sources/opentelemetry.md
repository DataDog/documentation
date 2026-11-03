---
description: Apprenez à collecter des logs, des métriques ou des traces à partir d'un
  collecteur OpenTelemetry en utilisant l'Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Gérez le volume de métriques et les tags dans votre environnement avec Observability
    Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Acheminer les données OTel des applications IA vers ClickHouse et Datadog
    à l'aide d'Observability Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Source OpenTelemetry
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source OpenTelemetry (OTel) d'Observability Pipelines pour collecter des logs ou des métriques depuis votre collecteur OTel via HTTP ou gRPC.

**Remarques** :
- Si vous utilisez le collecteur Datadog Distribution of OpenTelemetry (DDOT), utilisez la source OpenTelemetry pour [envoyer des données à Observability Pipelines](#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines).
- Si vous utilisez la distribution Splunk HEC du collecteur OpenTelemetry, utilisez la [source Splunk HEC][4] pour envoyer des logs à Observability Pipelines.

### Quand utiliser cette source {#when-to-use-this-source}

Scénarios courants où vous pourriez utiliser cette source :

- Vous utilisez [OpenTelemetry][1] comme méthode standard pour collecter et acheminer des données, et vous souhaitez normaliser ces données avant de les acheminer vers différentes destinations.
- Vous collectez des données à partir de sources multiples et souhaitez les agréger dans un emplacement central pour un traitement cohérent.
    - Par exemple, si certains de vos services exportent des logs via OpenTelemetry, tandis que d'autres utilisent des agents Datadog ou d'autres [sources][2] Observability Pipelines, vous pouvez envoyer toutes vos données vers Observability Pipelines pour traitement.

## Prérequis {#prerequisites}

Si vos redirecteurs sont configurés globalement pour activer SSL, vous avez besoin des certificats TLS appropriés et du mot de passe que vous avez utilisé pour créer votre clé privée.

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants des adresses d'écoute HTTP et gRPC d'OpenTelemetry et, le cas échéant, le mot de passe de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][6]. Vous pouvez configurer un pipeline dans l'[UI][10], en utilisant l'[API][11] ou avec [Terraform][12]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source OpenTelemetry dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre adresse d'écoute HTTP. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Saisissez l'identifiant de votre adresse d'écoute gRPC. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres TLS optionnels {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

{{< img src="observability_pipelines/sources/otel_settings.png" alt="Les paramètres de la source OpenTelemetry" style="width:35%;" >}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse HTTP :
	- Référence l'adresse de socket HTTP sur laquelle l'Observability Pipelines Worker écoute les données provenant du collecteur OTel.
	- L'identifiant par défaut est `SOURCE_OTEL_HTTP_ADDRESS`.
- Identifiant de l'adresse gRPC :
	- Référence l'adresse de socket gRPC sur laquelle l'Observability Pipelines Worker écoute les données provenant du collecteur OTel.
	- L'identifiant par défaut est `SOURCE_OTEL_GRPC_ADDRESS`.
- Identifiant de la phrase secrète TLS (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_OTEL_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/opentelemetry %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyer des données à l'Observability Pipelines Worker {#send-data-to-the-observability-pipelines-worker}

Configurez vos exportateurs OTel pour pointer vers HTTP ou gRPC. Le Worker expose des ports d'écoute configurables pour chaque protocole.

<div class="alert alert-info">Les ports 4318 (HTTP) et 4317 (gRPC) indiqués ci-dessous ne sont que des exemples. Vous pouvez configurer la valeur du port pour l'un ou l'autre protocole dans le Worker. Assurez-vous que vos exportateurs OTel correspondent à la valeur de port que vous choisissez.</a></div>

{{< tabs >}}
{{% tab "Logs" %}}

### Exemple de configuration HTTP {#http-configuration-example}

Le Worker expose l'endpoint HTTP sur le port 4318, qui est le port par défaut. Vous pouvez configurer la valeur du port dans le Worker.

Par exemple, pour configurer un exportateur de logs OTel via HTTP en Python :

```python
    from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
    http_exporter = OTLPLogExporter(
        endpoint="http://worker:4318/v1/logs"
    )
```

### Exemple de configuration gRPC {#grpc-configuration-example}

Le Worker expose l'endpoint gRPC sur le port 4317, qui est le port par défaut. Vous pouvez configurer la valeur du port dans le Worker.

Par exemple, pour configurer un exportateur de logs OTel via gRPC en Python :

```python
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
    grpc_exporter = OTLPLogExporter(
        endpoint="grpc://worker:4317"
    )
```

Définissez les variables d'environnement de l'adresse de l'écouteur sur les valeurs par défaut suivantes. Si vous avez configuré des valeurs de port différentes dans le Worker, utilisez-les à la place.

- Adresse de l'écouteur HTTP : `worker:4318`
- Adresse de l'écouteur gRPC : `worker:4317`

{{% /tab %}}

{{% tab "Métriques" %}}

### Exemple de configuration HTTP {#http-configuration-example-1}

Le Worker expose l'endpoint HTTP sur le port 4318, qui est le port par défaut. Vous pouvez configurer la valeur du port dans le Worker.

Par exemple, pour configurer un exportateur de métriques OTel via HTTP en Python :

```python
    from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
    http_exporter = OTLPMetricExporter(
        endpoint="http://worker:4318/v1/metrics"
    )
```

### Exemple de configuration gRPC {#grpc-configuration-example-1}

Le Worker expose l'endpoint gRPC sur le port 4317, qui est le port par défaut. Vous pouvez configurer la valeur du port dans le Worker.

Par exemple, pour configurer un exportateur de métriques OTel via gRPC en Python :

```python
    from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
    grpc_exporter = OTLPMetricExporter(
        endpoint="grpc://worker:4317"
    )
```

Définissez les variables d'environnement de l'adresse de l'écouteur sur les valeurs par défaut suivantes. Si vous avez configuré des valeurs de port différentes dans le Worker, utilisez-les à la place.

- Adresse de l'écouteur HTTP : `worker:4318`
- Adresse de l'écouteur gRPC : `worker:4317`

{{% /tab %}}
{{< /tabs >}}

## Envoyer des données de la distribution Datadog du collecteur OpenTelemetry vers Observability Pipelines {#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines}

{{< tabs >}}
{{% tab "Logs" %}}

Pour envoyer des logs depuis la distribution Datadog du collecteur OpenTelemetry (DDOT) :
1. Déployez le collecteur DDOT à l'aide de Helm. Consultez [Installer le collecteur DDOT en tant que DaemonSet Kubernetes][5] pour obtenir des instructions.
1. [Configurez un pipeline][6] sur Observability Pipelines en utilisant la [source OpenTelemetry](#set-up-the-source-in-the-pipeline-ui).
    1. (Facultatif) Datadog recommande d'ajouter un [Edit Fields processor][7] au pipeline qui ajoute le champ `op_otel_ddot:true` si le log ne possède pas le champ `source`.
    1. Lorsque vous installez le Worker, pour les variables d'environnement de la source OpenTelemetry :
        1. Définissez votre écouteur HTTP sur `0.0.0.0:4318`.
        1. Définissez votre écouteur gRPC sur `0.0.0.0:4317`.
    1. Après avoir installé le Worker et déployé le pipeline, mettez à jour le [`otel-config.yaml`][9] du collecteur OpenTelemetry pour inclure un exportateur qui envoie les logs vers Observability Pipelines. Exemple :
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                logs:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Remarques** :
- Comme le DDOT envoie des logs vers Observability Pipelines, et non vers le Datadog Agent, les paramètres suivants ne fonctionnent pas pour l'envoi de logs depuis le DDOT vers Observability Pipelines :
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL`
- Les logs envoyés depuis le DDOT peuvent contenir des objets imbriqués qui empêchent Datadog d'analyser correctement les logs. Pour résoudre ce problème, Datadog recommande d'utiliser le [Custom Processor][8] pour aplatir l'objet imbriqué `resource`.
- Si le collecteur DDOT et l'Observability Pipelines Worker s'exécutent sur le même host, leurs ports de récepteur OTLP par défaut (4317/4318) peuvent entrer en conflit. Dans un déploiement Kubernetes classique, le collecteur et le Worker s'exécutent dans des pods distincts, ce qui ne pose donc pas de problème.

[5]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/observability_pipelines/processors/edit_fields#add-field
[8]: /fr/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}

{{% tab "Métriques" %}}

Pour envoyer des métriques depuis la distribution Datadog du collecteur OpenTelemetry (DDOT) :
1. Déployez le collecteur DDOT à l'aide de Helm. Consultez [Installer le collecteur DDOT en tant que DaemonSet Kubernetes][5] pour obtenir des instructions.
1. [Configurez un pipeline][6] sur Observability Pipelines en utilisant la [source OpenTelemetry](#set-up-the-source-in-the-pipeline-ui).
    1. (Facultatif) Datadog recommande d'ajouter un [Edit Fields processor][7] au pipeline qui ajoute le champ `op_otel_ddot:true`.
    1. Lorsque vous installez le Worker, pour les variables d'environnement de la source OpenTelemetry :
        1. Définissez votre écouteur HTTP sur `0.0.0.0:4318`.
        1. Définissez votre écouteur gRPC sur `0.0.0.0:4317`.
    1. Après avoir installé le Worker et déployé le pipeline, mettez à jour le [`otel-config.yaml`][9] du collecteur OpenTelemetry pour inclure un exportateur qui envoie les métriques à Observability Pipelines. Exemple :
        ```
        exporters:
            otlphttp:
                endpoint: http://opw-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:4318
        ...
        service:
            pipelines:
                metrics:
                    exporters: [otlphttp]
        ```
        Replace `<NAMESPACE>` with the Kubernetes namespace where the Observability Pipelines Worker is deployed (for example, `default`).
    1. Redeploy the Datadog Agent with the updated [`otel-config.yaml`][9]. For example, if the Agent is installed in Kubernetes:
        ```
        helm upgrade --install datadog-agent datadog/datadog \
        --values ./agent.yaml \
        --set-file datadog.otelCollector.config=./otel-config.yaml
        ```

**Remarques** :
- Comme DDOT envoie des métriques à Observability Pipelines, et non au Datadog Agent, les paramètres suivants ne fonctionnent pas pour l'envoi de métriques de DDOT vers Observability Pipelines :
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED`
    - `DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL`
- Les métriques envoyées depuis DDOT peuvent contenir des objets imbriqués qui empêchent Datadog d'analyser correctement les métriques. Pour résoudre ce problème, Datadog recommande d'utiliser le [Custom Processor][8] pour aplatir l'objet imbriqué `resource`.
- Si le collecteur DDOT et l'Observability Pipelines Worker s'exécutent sur le même host, leurs ports de récepteur OTLP par défaut (4317/4318) peuvent entrer en conflit. Dans un déploiement Kubernetes classique, le collecteur et le Worker s'exécutent dans des pods distincts, ce qui ne pose donc pas de problème.

[5]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/observability_pipelines/processors/edit_fields#add-field
[8]: /fr/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/collector/
[2]: /fr/observability_pipelines/sources/
[3]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[4]: /fr/observability_pipelines/sources/splunk_hec/#send-logs-from-the-splunk-distributor-of-the-opentelemetry-collector-to-observability-pipelines
[5]: /fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=datadogoperator
[6]: /fr/observability_pipelines/configuration/set_up_pipelines/
[7]: /fr/observability_pipelines/processors/edit_fields#add-field
[8]: /fr/observability_pipelines/processors/custom_processor
[9]: https://docs.datadoghq.com/fr/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/?tab=helm#configure-the-opentelemetry-collector
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /fr/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline