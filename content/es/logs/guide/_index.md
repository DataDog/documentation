---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de logs
disable_toc: true
kind: guía
private: true
title: Guías de logs
---

{{< whatsnext desc="Logging Without LimitsTM" >}}
    {{< nextlink href="logs/guide/access-your-log-data-programmatically" >}}Accede mediante programación a datos de log usando la API de Búsqueda de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/getting-started-lwl" >}}Guía Logging Without LimitsTM{{< /nextlink >}}
    {{< nextlink href="logs/guide/correlate-logs-with-metrics" >}}Correlacionar logs con métricas{{< /nextlink >}}
    {{< nextlink href="logs/guide/best-practices-for-log-management" >}}Prácticas recomendadas de Log Management{{< /nextlink >}}
    {{< nextlink href="logs/guide/manage_logs_and_metrics_with_terraform" >}}Administrar logs y métricas con Terraform{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Collection" >}}
    {{< nextlink href="/agent/logs/advanced_log_collection" >}}Configuraciones de recopilación de logs avanzada{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/" >}}Enviar logs de servicios de AWS con el destino de Datadog Amazon Data Firehose{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/" >}}Enviar eventos y logs a Datadog con destinos de API de Amazon EventBridge{{< /nextlink >}}
    {{< nextlink href="/logs/guide/forwarder/" >}}Configurar Datadog Lambda Forwarder{{< /nextlink >}}
    {{< nextlink href="/logs/guide/apigee" >}}Recopilar logs de Apigee{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-logging-guide/" >}}Enviar logs de Azure a Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-native-logging-guide/" >}}Enviar logs de Azure con el recurso de Datadog{{< /nextlink >}}
    {{< nextlink href="/integrations/google_cloud_platform/#log-collection" >}}Recopilar logs de Google Cloud con la plantilla de Datadog Dataflow{{< /nextlink >}}
    {{< nextlink href="/logs/guide/collect-google-cloud-logs-with-push/" >}}Recopilar logs de Google Cloud con una suscripción push Pub/Sub{{< /nextlink >}}    
    {{< nextlink href="logs/guide/collect-heroku-logs" >}}Recopilar logs de Heroku{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/" >}}Enviar logs de servicios de AWS con la función de Datadog Lambda{{< /nextlink >}}
    {{< nextlink href="logs/guide/log-collection-troubleshooting-guide" >}}Guía de solución de problemas de recopilación de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/docker-logs-collection-troubleshooting-guide" >}}Guía de solución de problemas de recopilación de logs de Docker{{< /nextlink >}}
    {{< nextlink href="logs/guide/lambda-logs-collection-troubleshooting-guide" >}}Guía de solución de problemas de recopilación de logs de Lambda{{< /nextlink >}}
    {{< nextlink href="logs/guide/setting-file-permissions-for-rotating-logs" >}}Establecer permisos de archivo para rotar logs (Linux){{< /nextlink >}}
    {{< nextlink href="/logs/guide/how-to-set-up-only-logs" >}}Usar el Datadog Agent solo para la recopilación de logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/increase-number-of-log-files-tailed" >}}Aumentar el número de archivos de log personalizados por el Agent{{< /nextlink >}}
    {{< nextlink href="/logs/guide/container-agent-to-tail-logs-from-host" >}}Usar el Container Agent para personalizar logs desde el host{{< /nextlink >}}
    {{< nextlink href="/logs/guide/mechanisms-ensure-logs-not-lost" >}}Mecanismos para asegurar que no se pierdan logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/custom-log-file-with-heightened-read-permissions" >}}Enviar logs desde un archivo de log personalizado con permisos de lectura reforzados{{< /nextlink >}}   
    {{< nextlink href="/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose" >}}Enviar logs de Amazon EKS Fargate con Amazon Data Firehose{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Processing" >}}
    {{< nextlink href="logs/guide/log-parsing-best-practice" >}}Prácticas recomendadas de parseo de logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/commonly-used-log-processing-rules" >}}Reglas de procesamiento de logs utilizadas con frecuencia{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-not-showing-expected-timestamp" >}}Logs que no muestran la marca temporal esperada{{< /nextlink >}}
    {{< nextlink href="/logs/guide/remap-custom-severity-to-official-log-status" >}}Reasignar valores de gravedad personalizados al estado de log oficial{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-show-info-status-for-warnings-or-errors" >}}Logs que muestran el estado de información de error o advertencia{{< /nextlink >}} 
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Log Queries" >}}
    {{< nextlink href="logs/guide/collect-multiple-logs-with-pagination" >}}Recopilar múltiples logs con la API de Lista de log y paginación{{< /nextlink >}}
    {{< nextlink href="/logs/guide/build-custom-reports-using-log-analytics-api/?tab=table" >}}Crear informes personalizados usando la API de análisis de log{{< /nextlink >}}
    {{< nextlink href="/logs/guide/detect-unparsed-logs/" >}}Monitorizar y consultar logs sin parseo{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="Sensitive Data Management" >}}
    {{< nextlink href="logs/guide/logs-rbac" >}}Cómo configurar RBAC para logs{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-rbac-permissions" >}}Más información sobre los permisos RBAC para logs{{< /nextlink >}}
    {{< nextlink href="/logs/guide/restrict-access-to-sensitive-data-with-rbac/" >}}Restringir el acceso a datos confidenciales con controles basados en consultas{{< /nextlink >}}
    {{< nextlink href="/logs/guide/delete_logs_with_sensitive_data/" >}}Eliminar logs con datos confidenciales{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Integrations" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}Facilitar la solución de problemas con la correlación entre productos{{< /nextlink >}}
{{< /whatsnext >}}