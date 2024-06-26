---
kind: guía
title: Guía de uso avanzado del etiquetado unificado
---

## Información general

Esta guía muestra formas de configurar y migrar al [etiquetado de servicio unificado][1] según casos de uso específicos.

## Etiquetas personalizadas

Puedes seguir utilizando las etiquetas `env` `service` y `version` tal y como están configuradas para el etiquetado de servicio unificado. Sin embargo, si deseas lograr una experiencia de etiquetado unificado con tus propias etiquetas personalizadas, hay varias opciones disponibles que se enumeran a continuación.

**Nota**: Mientras que algunos productos admiten etiquetas arbitrariamente, otros tienen expectativas más específicas. Por ello, la navegación entre productos puede resultar difícil si una fuente de datos tiene una etiqueta que otra no tiene o no admite.

### Entornos de contenedores

#### Métricas

Dado que las etiquetas pueden añadirse a los puntos de datos, existe una gran libertad a la hora de configurar etiquetas. Las etiquetas de Autodiscovery se añaden automáticamente a todas las métricas recopiladas.

#### APM

`env` y `service` son etiquetas de núcleo en APM, por lo que no es posible sustituirlas por otras etiquetas. Sin embargo, APM sí permite [agregar datos a lo largo de más etiquetas primarias][2] que solo `env`. También se pueden utilizar las etiquetas de host, como `availability-zone`, que se agregan a trazas (traces) y métricas de trazas.

Las etiquetas de Autodiscovery asociadas a contenedores se añaden a `container_info` en los metadatos de tramo (span). Sin embargo, estas etiquetas de contenedor no forman parte de la [lista de etiquetas incluidas][3] para las métricas de trazas.

#### Logs

Al igual que APM, `service` es una etiqueta de núcleo que se utiliza para organizar los datos de logs. Además, no es posible vincular desde un log al servicio APM relacionado sin ella.

De forma similar a las métricas, las etiquetas de Autodiscovery para un contenedor y etiquetas de host para el Agent se añaden a todos los logs.

Además, puedes añadir campos personalizados a tus logs dentro del código que se pueden asignar a etiquetas o a atributos descendentes en un [pipeline de procesamiento de log de Datadog][4].

## Etiquetas estándar

Datadog recomienda utilizar tanto labels (etiquetas) estándar como variables de entorno. Sin embargo, las labels estándar pueden considerarse una alternativa al uso de variables de entorno, sobre todo para aplicaciones que no se benefician del uso de esas variables en su tiempo de ejecución. Software de terceros como Redis, MySQL y Nginx son algunos ejemplos. Dado que estos servicios todavía generan métricas de infraestructura y datos de checks de integración, es valioso tener todos esos datos etiquetados con `env`, `service` y `version`.

Si deseas etiquetar métricas de estado de Kubernetes con `env`, `service` y `version`, entonces las labels estándar ofrecen la manera más fácil. Las variables de entorno `DD` de un contenedor no pueden ser utilizadas por el Agent para etiquetar estas métricas, por lo que las labels son una opción más natural.

### Declarar entorno como una label

Configurar `env` más cerca de la fuente de los datos, como trazas o logs de APM, ayuda a evitar incoherencias cuando el `env` del Agent puede ser diferente. Hacer que `env` forme parte de la configuración del servicio asegura una fuente de verdad centrada en el servicio.

### Uso de labels estándar con la anotación existente de etiquetas de Kubernetes

Los usuarios de Kubernetes pueden seguir utilizando estas etiquetas generales. Sin embargo, utilizar las labels específicas tiene algunas ventajas:

- Puedes referenciarlas directamente para la inyección de variables de entorno con la API descendente de Kubernetes.
- La label estándar de servicio puede simplificar la definición de servicio para logs.

### Uso de labels estándar para contenedores específicos

Dado que las variables de entorno `DD` se inyectan en el nivel de contenedor, pueden diferir de contenedor a contenedor. Sin embargo, si deseas utilizar las labels estándar también para contenedores específicos, deberás utilizar las variantes específicas del contenedor:

```yaml
tags.datadoghq.com/<container>.env
tags.datadoghq.com/<container>.service
tags.datadoghq.com/<container>.version
```

### Inyección de etiquetas estándar

El [Datadog Admission Controller][5] convierte las labels de etiqueta estándar en variables de entorno, y las inyecta en la plantilla del pod de la aplicación del usuario. Estas variables de entorno son utilizadas por los rastreadores de APM, los clientes de DogStatsD y el Datadog Agent. El Datadog Agent asigna estos valores a etiquetas:

```
tags.datadoghq.com/version -> DD_VERSION
tags.datadoghq.com/env -> DD_ENV
tags.datadoghq.com/service -> DD_SERVICE
```

El controlador de admisión (Admission Controller) busca esta información en las labels del pod. Si no se encuentra a nivel de pod, el controlador de admisión (Admission Controller) intenta obtener la información de las labels del objeto propietario del pod (deployment, job, cron job, statefulset).

#### Notas

- El controlador de admisión (Admission Controller) debe desplegarse y configurarse antes de crear nuevos pods de aplicación. No puede actualizar los pods que ya existen.
- El controlador de admisión (Admission Controller) no inyecta las variables de entorno `DD_VERSION, DD_ENV` y `DD_SERVICE` si ya existen.
- Para desactivar la función de inyección del controlador de admisión, utiliza la configuración del Cluster Agent: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`


[1]: /es/getting_started/tagging/unified_service_tagging
[2]: /es/tracing/guide/setting_primary_tags_to_scope/
[3]: /es/metrics/distributions/#customize-tagging
[4]: /es/logs/log_configuration/pipelines
[5]: /es/agent/cluster_agent/admission_controller/