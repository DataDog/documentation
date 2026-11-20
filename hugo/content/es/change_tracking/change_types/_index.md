---
description: Aprenda qué tipos de cambios monitorea Change Tracking, de qué función
  de Datadog proviene cada tipo y cómo activar el seguimiento para cada uno.
title: Tipos de cambios rastreados
---
Change Tracking recopila cambios de múltiples productos de Datadog. No hay un producto independiente de Change Tracking que deba comprar y, en la mayoría de los casos, tampoco hay un Agent ni una integración independientes que deba instalar. Si está enviando la telemetría subyacente, los cambios ya se están rastreando.

Utilice la información de esta página para confirmar:

- De qué función de Datadog proviene el tipo de cambio.
- Qué necesita configurar, si es que necesita algo.

## Tipos de cambios admitidos {#supported-change-types}

### Deployments {#deployments}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Implementaciones de código backend | APM | Debe haber una etiqueta `version` presente en el servicio. Consulte [Unified Service Tagging][11] para configurar la etiqueta. |
| Implementaciones de frontend | RUM | Configure el [seguimiento de implementaciones de RUM][2]. |
| Actualizaciones de manifiesto de implementación de Kubernetes | Datadog Agent en Kubernetes | Agregue una etiqueta `service` a su YAML de Kubernetes siempre que sea posible. |

### Feature Flags {#feature-flags}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Datadog Feature Flags | Datadog Feature Flags | Se rastrean automáticamente. |
| LaunchDarkly | Integración de LaunchDarkly | Configure la [integración de LaunchDarkly][3]. |
| Cualquier otro proveedor de Feature Flags | Events API | Envíe los cambios de Feature Flags como eventos personalizados mediante la [Events API][4]. |
| Evaluaciones de Feature Flags de frontend | RUM | Configure el [seguimiento de Feature Flags de RUM][5]. |

Consulte [Track Feature Flag Changes][6] para la configuración y opciones avanzadas.

### Cambios en la infraestructura {#infrastructure-changes}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Cambios en la configuración y recursos de la nube (AWS) {{< tooltip text="in Preview" tooltip="Esta función está en versión preliminar y se limita a una pequeña muestra de cambios en los recursos de la nube. Para solicitar acceso, consulte la documentación de Resource Collection." >}} | Infrastructure Monitoring | Habilite [Resource Collection][12] y, opcionalmente, el reenvío de eventos del proveedor de la nube. |
| Eventos de escala de despliegue de Kubernetes | Integración de Kubernetes | Habilite [Kubernetes audit logging][13]. |
| Fallos de pod CrashLoopBackOff | Integración de Kubernetes | Agregue una etiqueta `service` a su YAML de Kubernetes siempre que sea posible. |

### Cambios en la base de datos {#database-changes}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Cambios de esquema en PostgreSQL, SQL Server y MySQL | Database Monitoring | Consulte [Exploring Database Schemas][7] y [Correlate Database Monitoring and Traces][8]. |
| Cambios en los índices e índices de búsqueda de MongoDB y en la configuración de PostgreSQL y SQL Server | Database Monitoring | [Correlate Database Monitoring and Traces][8]. |

Consulte [Database Monitoring][14] para la configuración y opciones avanzadas.

### Comportamiento de streaming y aplicaciones {#streaming-and-application-behavior}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Actualizaciones de esquema de Kafka | Data Streams Monitoring | Configure [Data Streams Monitoring][9]. |
| Picos de tráfico | APM | Se rastrean automáticamente con [APM][15]. |
| Alertas de Watchdog | Watchdog | Se rastrean automáticamente. Consulte [Watchdog][10] para conocer los requisitos por alerta. |

### Cambios personalizados {#custom-changes}

| Tipo de cambio | Proviene de | Cómo habilitar |
| --- | --- | --- |
| Cualquier otro cambio que desee rastrear | Events API | Envíe eventos de cambio mediante la [Events API][4]. |

[2]: /es/real_user_monitoring/guide/setup-rum-deployment-tracking/
[3]: /es/integrations/launchdarkly/#setup
[4]: /es/api/latest/events/
[5]: /es/real_user_monitoring/feature_flag_tracking/
[6]: /es/change_tracking/change_types/feature_flags/
[7]: /es/database_monitoring/schema_explorer/
[8]: /es/database_monitoring/connect_dbm_and_apm/
[9]: /es/data_streams/
[10]: /es/watchdog/
[11]: /es/getting_started/tagging/unified_service_tagging/
[12]: /es/infrastructure/resource_catalog/resource_changes/
[13]: /es/integrations/kubernetes_audit_logs/
[14]: /es/database_monitoring/
[15]: /es/tracing/