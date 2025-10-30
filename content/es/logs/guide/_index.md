---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de logs
disable_toc: true
private: true
title: Guías de logs
---

{{< whatsnext desc="Logging Without LimitsTM" >}}
    {{< nextlink href="log/guide/access-your-loguear-data-programmatically" >}}Acceso programático a los datos de logs mediante la API de búsqueda de logs {{< /nextlink >}}
    {{< nextlink href="log/guide/getting-started-lwl" >}}Guía Logging Without LimitsTM{{< /nextlink >}}
    {{< nextlink href="tracing/other_telemetry/connect_logs_and_traces" >}}Correlacionar logs con trazas (traces){{< /nextlink >}}
    {{< nextlink href="log/guide/correlate-log-with-metrics" >}}Correlación de logs con métricas{{< /nextlink >}}
    {{< nextlink href="log/guide/best-practices-for-loguear-management" >}}Prácticas recomendadas para la gestión de logs{{< /nextlink >}}
    {{< nextlink href="log/guide/manage_logs_and_metrics_with_terraform" >}}Gestionar logs y métricas con Terraform{{< /nextlink >}}
    {{< nextlink href="log/guide/flex_compute" >}}Monitor de uso de Flex Compute{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="log Collection" >}}
    {{< nextlink href="/agent/logs/advanced_log_collection" >}}Configuraciones avanzadas de recopilación de logs {{< /nextlink >}}
    {{< nextlink href="/logs/guide/reduce_data_transfer_fees" >}}Cómo enviar logs a Datadog reduciendo las tarifas de transferencia de datos{{< /nextlink >}}
    {{< nextlink href="/logs/guide/forwarder/" >}}Configuración de Datadog Lambda Forwarder{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/" >}}Envía logs de servicios de AWS con la función Datadog Lambda{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/" >}}Envía logs de servicios de AWS con el destino Datadog Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="/logs/guide/aws-account-level-logs/" >}}Configurar suscripciones de logs a nivel de cuenta de AWS {{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/" >}}Envío de eventos y logs a Datadog con los destinos API de Amazon EventBridge{{< /nextlink >}}
    {{< nextlink href="/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose" >}}Envío de logs de Amazon EKS Fargate con Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="/logs/guide/apigee" >}}Recopilar logs de Apigee{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-logging-guide/" >}}Envío de logs de Azure a Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-automated-log-forwarding" >}}Reenvío automatizado de logs de Azure {{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-automated-logs-architecture/" >}}Arquitectura y configuración de reenvío automatizado de logs de Azure{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-native-logging-guide/" >}}Envío de logs de Azure con el recurso de Datadog {{< /nextlink >}}
    {{< nextlink href="/logs/guide/fluentbit" >}}Enviar logs de Fluent Bit{{< /nextlink >}}
    {{< nextlink href="/integrations/google_cloud_platform/#log-collection" >}}Recopilar logs de Google Cloud con la plantilla Datadog Dataflow{{< /nextlink >}}
    {{< nextlink href="/logs/guide/collect-google-cloud-logs-with-push/" >}}Recopilar logs de Google Cloud con una suscripción Pub/Sub Push{{< /nextlink >}}
    {{< nextlink href="logs/guide/collect-heroku-logs" >}}Recopilar logs de Heroku{{< /nextlink >}}
    {{< nextlink href="logs/guide/log-collection-troubleshooting-guide" >}}Guía de solución de problemas de recopilación de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/docker-logs-collection-troubleshooting-guide" >}}Guía de solución de problemas de recopilación de logs de Docker{{< /nextlink >}}
    {{< nextlink href="logs/guide/lambda-logs-collection-troubleshooting-guide" >}}Guía de solución de problemas de la recopilación de logs de Lambda {{< /nextlink >}}
    {{< nextlink href="logs/guide/setting-file-permissions-for-rotating-logs" >}}Configuración de permisos de archivo para la rotación de logs (Linux){{< /nextlink >}}
    {{< nextlink href="/logs/guide/how-to-set-up-only-logs" >}}Utiliza el Datadog Agent sólo para la recopilación de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/increase-number-of-log-files-tailed" >}}Aumentar el número de logs de archivos recopilados por el Agent{{< /nextlink >}}
    {{< nextlink href="/logs/guide/container-agent-to-tail-logs-from-host" >}}Utilizar el Agent de contenedor para el seguimiento de logs desde el Host{{< /nextlink >}}
    {{< nextlink href="/logs/guide/mechanisms-ensure-logs-not-lost" >}}Mecanismos para asegurar que los logs no se pierdan{{< /nextlink >}}
    {{< nextlink href="/logs/guide/custom-log-file-with-heightened-read-permissions" >}}Envío de logs desde un archivo personalizado de logs con permisos de lectura ampliados{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Processing" >}}
    {{< nextlink href="logs/guide/log-parsing-best-practice" >}}Prácticas recomendadas de análisis de logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/commonly-used-log-processing-rules" >}}Reglas de uso común para procesamiento de logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-not-showing-expected-timestamp" >}}Logs que no muestran la marca de tiempo esperada{{< /nextlink >}}
    {{< nextlink href="/logs/guide/remap-custom-severity-to-official-log-status" >}}Reasignación de valores personalizados de gravedad al estado oficial de los logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-show-info-status-for-warnings-or-errors" >}}Los logs muestran un estado de información para advertencias o errores{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Queries" >}}
    {{< nextlink href="logs/guide/collect-multiple-logs-with-pagination" >}}Recopilar múltiples logs con la API de Lista de log y paginación{{< /nextlink >}}
    {{< nextlink href="/logs/guide/build-custom-reports-using-log-analytics-api/?tab=table" >}}Crear informes personalizados usando la API de análisis de log{{< /nextlink >}}
    {{< nextlink href="/logs/guide/detect-unparsed-logs/" >}}Monitorizar y consultar logs sin parseo{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Análisis de logs con Notebooks" >}}
    {{< nextlink href="/logs/guide/analyze_ecommerce_ops" >}}Analizar operaciones de comercio electrónico utilizando datos de pago y opiniones de clientes{{< /nextlink >}}
    {{< nextlink href="/logs/guide/analyze_finance_operations" >}}Analizar operaciones financieras utilizando datos de pago y de transacciones{{< /nextlink >}}
    {{< nextlink href="/logs/guide/analyze_login_attempts" >}}Analizar la seguridad y la conformidad de los intentos de inicio de sesión{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Gestión de datos confidenciales" >}}
    {{< nextlink href="logs/guide/logs-rbac" >}}Configuración de RBAC para logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-rbac-permissions" >}}Más información sobre permisos RBAC para logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/manage-sensitive-logs-data-access" >}}Gestionar el acceso a datos confidenciales en logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/delete_logs_with_sensitive_data/" >}}Eliminar logs con datos confidenciales{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Integrations" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}Facilitar la solución de problemas con la correlación entre productos{{< /nextlink >}}
{{< /whatsnext >}}