---
disable_toc: false
further_reading:
- link: /logs/log_collection/
  tag: documentación
  text: Recopilación de logs e integraciones
- link: data_security/logs/
  tag: documentación
  text: Seguridad de los datos de Log Management
- link: /sensitive_data_scanner/
  tag: documentación
  text: Sensitive Data Scanner
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: documentación
  text: Doble envío con Observability Pipelines
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: documentación
  text: Estrategias para reducir el volumen de logs
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: blog
  text: Ocultar datos confidenciales de tus logs on-prem utilizando Observability
    Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: blog
  text: Logs de doble envío con Observability Pipelines de Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: blog
  text: Controlar tus volúmenes de logs con Observability Pipelines de Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: blog
  text: Archivar tus logs con Observability Pipelines para una migración simple y
    rentable a Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: Blog
  text: Agregar, procesar y enrutar logs fácilmente con Observability Pipelines de
    Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: Blog
  text: Transmitir logs en formato OCSF a tus proveedores de seguridad o data lakes
    preferidos con Observability Pipelines
title: Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

<div class="alert alert-info">
Datadog recomienda actualizar Observability Pipelines Worker (OPW) con cada versión menor y de parche o, como mínimo, mensualmente. <br><br> Actualizar a una versión mayor de OPW y mantenerla actualizada es la única manera compatible de obtener las últimas funcionalidades, correcciones y actualizaciones de seguridad de OPW.
</div>

## Información general

{{< img src="observability_pipelines/op_marketecture_11042024.png" alt="Gráfico que muestra el agregado de datos de diferentes fuentes. Estos datos son procesados y enriquecidos por el Observability Pipelines Worker en tu propio entorno y luego son enrutados a los destinos de seguridad, análisis y almacenamiento elegidos." style="width:100%;" >}}

Observability Pipelines te permite recopilar y procesar logs dentro de tu propia infraestructura, antes de enrutarlos a las integraciones aguas abajo. Utilza [plantillas] (#start-building-pipelines-with-out-of-the-box-templates) predefinidas para crear y desplegar pipelines basados en tu caso de uso.

Observability Pipelines Worker es el software que se ejecuta en tu infraestructura. Agrega, procesa y enruta de forma centralizada tus logs en función de tu caso de uso. Esto significa que puedes ocultar datos confidenciales, preprocesar logs y determinar a qué destinos deben ir, antes de que los logs abandonen tu entorno.

La interfaz de usuario de Observability Pipelines proporciona un plano de control para gestionar tus Observability Pipelines Workers. Desde allí puedes crear, editar y cambiar pipelines en tus Workers. También puedes habilitar monitores para tus pipelines de forma que puedas evaluar su estado.

## Para empezar

Para crear un pipeline:

1. Ve a [Observability Pipelines][1].
1. Selecciona una plantilla:
    - [Control del volumen de logs][2]
    - [Logs de doble envío][3]
    - [Logs divididos][4]
    - [Archivar logs en archivos de Datadog][5]
    - [Ocultamiento de datos confidenciales][6]
    - [Enriquecimiento de logs][7]
    - [Generar métricas][8]
1. Selecciona y configura tu [fuente][9].
1. Selecciona y configura tus [destinos][10].
1. Configura tus [procesadores][11].
1. Instala Observability Pipelines Worker.
1. Activa monitores para tu pipeline.

Para obtener más información, consulta [Configurar pipelines][12].

Para ver las opciones de arranque y obtener más información sobre la configuración del Worker con Kubernetes, consulta [Configuraciones avanzadas][13].

## Explorar Observability Pipelines

### Crear pipelines con plantillas predefinidas

{{< img src="observability_pipelines/templates_20241003.png" alt="Interfaz de usuario de Observability Pipelines que muestra seis plantillas" style="width:100%;" >}}

Las [plantillas](#out-of-the-box-templates) se crean para los siguientes casos de uso:

#### Control del volumen de logs

Los logs sin procesar son ruidosos, y sólo algunos son útiles para una mayor búsqueda y análisis durante las investigaciones. Utiliza la plantilla Control del volumen de logs para determinar qué logs debes enviar a tu solución indexada, como una solución SIEM o de gestión de logs. Esto te ayudará a aumentar el valor de tus logs indexados y también a mantenerte dentro de tu presupuesto previsto.

#### Logs de doble envío

A medida que tu organización crece, también cambian tus necesidades de observabilidad de diferentes casos de uso, como la seguridad, el archivado y la gestión de logs. Esto podría llevar a que necesites probar diferentes soluciones de archivado, SIEM y de gestión de logs. Sin embargo, la gestión de pipelines de logs con diferentes soluciones puede ser complicada. Utiliza la plantilla Logs de doble envío para agregar de forma centralizada, procesar y enviar copias de tus logs a diferentes destinos.

#### Archivar logs

Utiliza la plantilla Archivar logs para almacenar logs en una solución de almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage). Los logs archivados se almacenan en un formato rehidratable en Datadog, de modo que puedan rehidratarse en Datadog cuando sea necesario. Esto es útil cuando:

- Tienes un gran volumen de logs ruidosos, pero puede que necesites indexarlos en Datadog Log Management ad hoc para una investigación.
- Estás migrando a Datadog Log Management y quieres contar con un historial de los logs luego de la migración.
- Tienes una política de conservación para cumplir con los requisitos de cumplimiento, pero no necesariamente necesitas indexar esos logs.

#### Logs divididos

Cuando tengas logs de diferentes servicios y aplicaciones, puede que necesites enviarlos a diferentes servicios posteriores para su consulta, análisis y alertas. Por ejemplo, es posible que quieras enviar logs de seguridad a una solución SIEM y logs de DevOps a Datadog. Utiliza la plantilla Dividir logs para preprocesar tus logs por separado para cada destino antes de enviarlos a los procesos posteriores.

#### Ocultar datos confidenciales

Utiliza la plantilla Ocultar datos confidenciales para detectar y ocultar información confidencial in situ. El procesador de análisis de datos confidenciales de Observability Pipelines proporciona 70 reglas de análisis listas predefinidas, pero también puedes crear tus propias reglas de análisis personalizadas utilizando expresiones regulares. Las reglas OOTB reconocen patrones estándar como números de tarjetas de crédito, direcciones de correo electrónico, direcciones IP, claves API, claves SSH y tokens de acceso.

#### Enriquecimiento de logs

Todos los diferentes servicios, sistemas y aplicaciones de tu organización generan logs que contienen capas de información y tienen diferentes formatos. Esto puede dificultar la extracción a la hora de buscar y analizar los datos que necesitas para una investigación. Utiliza la plantilla Enriquecimiento de logs para estandarizar tus logs y enriquecerlos con información, como los datos de una tabla de referencia.

#### Generar métricas

Algunas fuentes de logs, como los cortafuegos y los dispositivos de red, generan un gran volumen de eventos de logs que contienen datos de logs que no es necesario almacenar. A menudo, sólo quieres ver un resumen de los logs y compararlos con los datos históricos. Las métricas basadas en logs también son una forma rentable de resumir datos de logs de todo tu flujo (stream) de ingestión. Utiliza la plantilla Generar métricas para generar un recuento de métricas de logs que coincidan con una consulta o una métrica de distribución de un valor numérico contenido en los logs, como la duración de una solicitud.

### Crear pipelines en la interfaz de usuario de Observability Pipelines

{{% observability_pipelines/use_case_images/generate_metrics %}}

Crea tus pipelines en la interfaz de usuario de Observability Pipelines. Después de seleccionar una de las plantillas predefinidas, el flujo de trabajo de incorporación te guía a través de la configuración de tu fuente, tus procesadores y tus destinos. La página de instalación proporciona instrucciones sobre cómo instalar el Worker en tu entorno (Docker, Kubernetes, Linux o CloudFormation).

### Activar monitores predefinidos para tus componentes de pipelines

Después de crear tu pipeline de distribución, activa los monitores predefinidos para recibir alertas cuando:

- Aumentan los errores de un componente. Esto podría ocurrir porque el componente está procesando datos en formatos inesperados.
- El Observability Pipelines Worker tiene un uso elevado de CPU o de memoria.
- Existen picos en los datos descartados por un componente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/log_volume_control/
[3]: /es/observability_pipelines/dual_ship_logs/
[4]: /es/observability_pipelines/split_logs/
[5]: /es/observability_pipelines/archive_logs/
[6]: /es/observability_pipelines/sensitive_data_redaction/
[7]: /es/observability_pipelines/log_enrichment/
[8]: /es/observability_pipelines/set_up_pipelines/generate_metrics/
[9]: /es/observability_pipelines/sources/
[10]: /es/observability_pipelines/destinations/
[11]: /es/observability_pipelines/processors/
[12]: /es/observability_pipelines/set_up_pipelines/
[13]: /es/observability_pipelines/advanced_configurations/