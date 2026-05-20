---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/kitepipe_atomwatch
app_id: kitepipe-atomwatch
categories:
- events
- aws
- gestión de eventos
- recopilación de logs
- marketplace
- notificaciones
custom_kind: integración
description: Monitorizar procesos e infraestructura de Boomi
further_reading:
- link: https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/
  tag: blog
  text: Monitorizar tus integraciones de Boomi con la oferta de Kitepipe en el Marketplace
    de Datadog
integration_version: 1.3.1
media:
- caption: Los informes de procesos mejorados te permiten retroceder más de 30 días
    y filtrar por más campos, con comodines.
  image_url: images/enhanced_process_reporting.png
  media_type: imagen
- caption: Consulta procesos de larga duración de un vistazo y recibe alertas con
    detección de anomalías.
  image_url: images/execution_duration_anomalies.png
  media_type: imagen
- caption: Amplia monitorización de infraestructuras, incluidas la CPU, RAM, disco,
    red.
  image_url: images/infrastructure_monitoring.png
  media_type: imagen
- caption: Monitorización del clúster que supera las recomendaciones publicadas de
    Boomi.
  image_url: images/cluster_monitoring.png
  media_type: imagen
- caption: Listas de principales y gráficos de procesos de Boomi con errores.
  image_url: images/error_monitoring.png
  media_type: imagen
- caption: Compatible con la monitorización de JMX.
  image_url: images/jmx_monitoring.png
  media_type: imagen
supported_os:
- linux
- macos
title: Kitepipe AtomWatch
---
## Información general

AtomWatch de Kitepipe es una integración basada en el Agent que recopila métricas de procesos, nodos del clúster e infraestructuras relacionadas de Boomi para informar a clientes de Datadog y de Boomi sobre el estado de la integración.

Esta integración contiene 7 dashboards, 17 métricas personalizadas y 16 monitores que informan sobre las estadísticas de ejecución de Boomi, el estado del clúster, la monitorización de JMX y el estado de la infraestructura. Estas métricas están disponibles para los clientes de Datadog y de Boomi para el análisis de tendencias de tiempo extendido (sobre el estándar de 30 días de la disponibilidad de informes de procesos de Boomi).

Los clientes de Datadog que adquieran AtomWatch deben gestionar el Boomi Java Runtime en una configuración de Atom o de Molecule. Kitepipe incluye una sesión de configuración de una hora con la prueba gratuita inicial de 14 días.

### Acerca de Kitepipe

Kitepipe es un socio de implementación de Boomi Platinum y es el principal equipo de desarrollo de integración de Boomi en América del Norte. Kitepipe se fundó en 2011 en respuesta a la necesidad de un equipo de servicios centrado en Boomi que pudiera cumplir todas las promesas de esta potente plataforma de integración. 

En la actualidad, el equipo de Kitepipe de desarrolladores on-shore certificados de Boomi ayuda a docenas de clientes de Boomi a conseguir rápidamente el valor de negocios con la plataforma líder de la industria para la integración de Boomi.

El servicio AtomWatch de Datadog es una nueva oferta de Kitepipe centrada en servicios gestionados por Boomi en AWS. Kitepipe es el líder en una serie de áreas de integración, verticales y dominios, incluidas migraciones a AWS de procesos de Boomi, Boomi gestionado en AWS, soluciones verticales de Biotech creadas en Boomi, NetSuite, SAP, Coupa, Workday y HRIS, Data Mart/BI y más endpoints.

### Recopilación de logs

Esta integración realiza llamadas de API a Boomi Platform en tu nombre, recupera registros de ejecución y los envía a Datadog como logs. También monitoriza opcionalmente ejecuciones en progreso y telemetría de JVM a través de JMX, envía esta información a Datadog como logs. Puedes ver qué procesos de Boomi se están ejecutando en cuál JVM, junto con métricas asociadas, como el uso de memoria, la recolección de basura, el count de conversaciones y más.

#### Logs del contenedor

Para configurar el Datadog Agent para que envíe los logs de los contenedores de Boomi a tu cuenta de Datadog, realiza estos pasos en cada nodo de la molécula:

1. Crea el siguiente archivo en `/etc/datadog-agent/conf.d/BoomiContainerLog.d/conf.yaml`, sustituyendo `<BRACKETED_VALUES>` por los valores apropiados para tu configuración:

**Nota**: Para más información sobre la ubicación de `conf.d` en diferentes sistemas operativos, consulta el [directorio de configuración del Agent](https://docs.datadoghq.com/agent/configuration/agent-configuration-files/#agent-configuration-directory).

```yaml
---
logs:
  - type: file
    path: <BOOMI_INSTALL_DIR>/logs/*.container.<BOOMI_NODE_ID>.log
    service: BoomiContainerLog
    source: kitepipe-boomi
    log_processing_rules:
      - type: multi_line
        name: multi_line_rule
        pattern: \w+ \d+, \d+ \d+:\d+:\d+ (AM|PM)
```

1. En el archivo `datadog.yaml`, asegúrate de que la siguiente línea está presente y sin comentar:

   ```yaml
   logs_enabled: true
   ```

#### Logs HTTP:

Para configurar el Datadog Agent para que envíe los logs HTTP de Boomi a tu cuenta de Datadog, realiza estos pasos en cada nodo de la molécula:

1. Crea el siguiente archivo en `/etc/datadog-agent/conf.d/BoomiHTTPLog.d/conf.yaml` (o en la ubicación equivalente de Windows ), sustituyendo `<BRACKETED_VALUES>` por los valores adecuados para tu configuración.

   ```yaml
   ---
   logs:
     - type: file
       path: <BOOMI_INSTALL_DIR>/logs/*.shared_http_server.<BOOMI_NODE_ID>.log
       service: BoomiHTTP
       source: kitepipe-boomi
       log_processing_rules:
       - type: exclude_at_match
         name: exclude_healthcheck
         pattern: _admin/status
   ```

1. En `datadog.yaml file`, asegúrate de que la siguiente línea está presente y sin comentar:

   ```yaml
   logs_enabled: true
   ```

### Eventos

Esta integración recupera registros de AuditLog de la API de Boomi y los envía a Datadog como eventos. Los eventos son visibles en forma filtrada en Dashboard de monitorización de cargas de trabajo de Boomi o en el [Events Explorer](https://app.datadoghq.com/event/explorer). Puedes crear tus propios monitores para inspeccionar los registros de AuditLog sin filtrar.

### Métricas

| | |
| --- | --- |
| **kitepipe.atomwatch.execution.status** <br>(count) | Registra cuántas ejecuciones de Boomi se han producido, así como su estado.|
| **kitepipe.atomwatch.execution.measure.inboundDocumentCount** <br>(gauge) | Valor de Boomi ExecutionRecord "inboundDocumentCount".|
| **kitepipe.atomwatch.execution.measure.inboundErrorDocumentCount** <br>(gauge) | Valor de Boomi ExecutionRecord "inboundErrorDocumentCount".|
| **kitepipe.atomwatch.execution.measure.outboundDocumentCount** <br>(gauge) | Valor de Boomi ExecutionRecord "outboundDocumentCount".|
| **kitepipe.atomwatch.execution.measure.duration** <br>(gauge) | Valor de Boomi ExecutionRecord "executionDuration".<br>_Se muestra como milisegundo_ |
| **kitepipe.atomwatch.execution.measure.inboundDocumentSize** <br>(gauge) | Valor de Boomi ExecutionRecord "inboundDocumentSize".<br>_Se muestra como byte_ |
| **kitepipe.atomwatch.execution.measure.outboundDocumentSize** <br>(gauge) | Valor de Boomi ExecutionRecord "outboundDocumentSize".<br>_Se muestra como byte_ |
| **kitepipe.atomwatch.execution.measure.inProgressExecutionDuration** <br>(gauge) | Registra cuántos minutos ha estado ejecutándose un proceso de Boomi, si aún está en curso en el momento en que se ejecutó la integración de Datadog.<br>_Se muestra como minuto_ |
| **kitepipe.atomwatch.boomi_api_calls_attempted** <br>(count) | Cuántas llamadas a la API de Boomi de cualquier tipo se han realizado.|
| **kitepipe.atomwatch.view_file_exist** <br>(gauge) | Valor de 1 si el archivo de vista existe.|
| **kitepipe.atomwatch.view_file_age_seconds** <br>(gauge) | Tiempo en segundos desde la última actualización del archivo de vista.<br>_Se muestra como segundo_ |
| **kitepipe.atomwatch.view_file_problem** <br>(gauge) | Rastrea la ocurrencia de problemas en el archivo de vista del clúster de Boomi. Valor de 1 si el contenido del archivo de vista indica un problema de clúster.|
| **kitepipe.atomwatch.integration_completed** <br>(gauge) | Registra la finalización con éxito de una ejecución de integración de AtomWatch. Valor de 1 si la integración se ha completado correctamente.|
| **kitepipe.atomwatch.jvm.cpu_time_ms** <br>(gauge) | Tiempo de CPU de la JVM consumido|
| **kitepipe.atomwatch.jvm.heap.memory** <br>(gauge) | Memoria heap de la JVM|
| **kitepipe.atomwatch.jvm.runtime_out_of_memory** <br>(gauge) | JVM sin memoria|
| **kitepipe.atomwatch.jvm.runtime_low_memory** <br>(gauge) | Condición de memoria baja de la JVM|

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con AtomWatch a través del siguiente canal:

- Correo electrónico: [AtomWatch.Support@kitepipe.com](mailto:AtomWatch.Support@kitepipe.com)

El horario de asistencia de Kitepipe para AtomWatch es de 9 de la mañana a 3 de la tarde en las zonas horarias de EE. UU. y Canadá. Las solicitudes de solución de problemas de AtomWatch se responderán en un plazo de 24 a 48 horas desde la recepción de la notificación en el alias de correo electrónico de AtomWatch.

Para obtener los mejores resultados de respuesta, incluye el nombre del cliente, la configuración de Boomi y una breve descripción del evento o la cuestión que se debe solucionar. Kitepipe pone a tu disposición programas de asistencia mejorados previa solicitud.

### Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Documentación de AtomWatch](https://atomwatch.kitepipe.com/space/CS/199655426)
- [Monitorizar tus integraciones de Boomi con la oferta de Kitepipe en el Datadog Marketplace](https://www.datadoghq.com/blog/kitepipe-datadog-marketplace/)
- [Activación de JMX en Boomi](https://help.boomi.com/docs/Atomsphere/Integration/Integration%20management/t-atm-Enabling_remote_JMX_on_an_Atom_1a1625d0-330d-43c6-a765-42502d7768ec)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/kitepipe-atomwatch" target="_blank">Haz clic aquí</a> para comprar esta aplicación.