---
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentación
  text: Configurar pipelines
title: Explorar plantillas
---

## Información general

Cuando crees un pipeline en la interfaz de usuario de Observability Pipelines, selecciona una de las plantillas preconfiguradas para crear y desplegar pipelines en función de tu caso de uso.

{{< img src="observability_pipelines/eight_templates.png" alt="La interfaz de usuarios de Observability Pipelines que muestra las ocho plantillas" style="width:100%;" >}}

## Plantillas

Las plantillas se han creado para los siguientes casos de uso:

{{< tabs >}}
{{% tab "Logs" %}}

### Archivar logs

Utiliza la plantilla Archivar logs para almacenar logs en una solución de almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage). Los logs archivados se almacenan en un formato rehidratable en Datadog, de modo que puedan rehidratarse en Datadog cuando sea necesario. Esto es útil cuando:

- Tienes un gran volumen de logs ruidosos, pero puede que necesites indexarlos en Datadog Log Management ad hoc para una investigación.
- Estás migrando a Datadog Log Management y quieres contar con un historial de los logs luego de la migración.
- Tienes una política de conservación para cumplir con los requisitos de cumplimiento, pero no necesariamente necesitas indexar esos logs.

### Logs de doble envío

A medida que tu organización crece, también cambian tus necesidades de observabilidad de diferentes casos de uso, como la seguridad, el archivado y la gestión de logs. Esto podría llevar a que necesites probar diferentes soluciones de archivado, SIEM y de gestión de logs. Sin embargo, la gestión de pipelines de logs con diferentes soluciones puede ser complicada. Utiliza la plantilla Logs de doble envío para enviar tus logs a diferentes destinos, de modo que puedas evaluar diferentes herramientas y procesos con mínimas interrupciones en tu entorno de producción.

### Generar métricas basadas en logs

Algunas fuentes de logs, como los cortafuegos y los dispositivos de red, generan un gran volumen de eventos de logs que contienen datos de logs que no es necesario almacenar. A menudo, sólo quieres ver un resumen de los logs y compararlos con los datos históricos. Las métricas basadas en logs también son una forma rentable de resumir datos de logs de todo tu flujo (stream) de ingestión. Utiliza la plantilla Generar métricas para generar un recuento de métricas de logs que coincidan con una consulta o una métrica de distribución de un valor numérico contenido en los logs, como la duración de una solicitud.

Estos son los tipos de métrica disponibles:
  | Tipo de métrica | Descripción | Ejemplo |
  | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
  | COUNT | Representa el número total de eventos ocurridos en un intervalo de tiempo. Este valor puede ponerse a cero, pero no puede reducirse.                | Puedes contar el número de logs con `status:error`.                                         |
  | GAUGE | Representa una instantánea de eventos en un intervalo de tiempo.                                                                                           | Puedes medir la última utilización de CPU por host para todos los logs en el entorno de producción. |
  | DISTRIBUTION | Representa la distribución estadística global de un conjunto de valores calculados en toda tu infraestructura distribuida en un intervalo de tiempo. | Puedes medir el tiempo medio que tarda en realizarse una llamada a la API.                           |


### Enriquecimiento de logs

Los diferentes servicios, sistemas y aplicaciones de tu organización generan logs, que contienen capas de información y en diferentes formatos. Para gestionar estos logs, puede que necesites estandarizar su formato y añadir información para facilitar su búsqueda y análisis. Por ejemplo, cada fuente de log tiene su propio formato. Esto puede dificultar la búsqueda y el análisis durante las investigaciones si no se han reformateado y normalizado. También podrías tener información adicional, como ID de clientes o direcciones IP, que desees añadir a tus logs.

### Control del volumen de logs

Los logs sin procesar son ruidosos, y sólo algunos son útiles para una mayor búsqueda y análisis durante las investigaciones. Utiliza la plantilla Control del volumen de logs para determinar qué logs debes enviar a tu solución indexada, como una solución SIEM o de gestión de logs. Esto te ayudará a aumentar el valor de tus logs indexados y también a mantenerte dentro de tu presupuesto previsto.

### Ocultar datos confidenciales

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en tus logs, lo que puede exponer a tu organización a riesgos financieros y de privacidad.

Utiliza la plantilla Ocultar datos confidenciales para detectar y ocultar información confidencial in situ. El procesador de análisis de datos confidenciales de Observability Pipelines proporciona 70 reglas de análisis listas predefinidas, pero también puedes crear tus propias reglas de análisis personalizadas utilizando expresiones regulares. Las reglas OOTB reconocen patrones estándar como números de tarjetas de crédito, direcciones de correo electrónico, direcciones IP, claves API, claves SSH y tokens de acceso.

### Logs divididos

Cuando tengas logs de diferentes servicios y aplicaciones, puede que necesites enviarlos a diferentes servicios posteriores para su consulta, análisis y alertas. Por ejemplo, es posible que quieras enviar logs de seguridad a una solución SIEM y logs de DevOps a Datadog. Utiliza la plantilla Dividir logs para preprocesar tus logs por separado para cada destino antes de enviarlos a los procesos posteriores.

{{% /tab %}}
{{% tab "Metrics" %}}

### Metric Tag Governance

<div class="alert alert-info">
Metric Tag Governance está en vista previa. Rellena el <a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">formulario</a> para solicitar acceso.</div>

Las métricas captan señales sobre el entorno y ofrecen información sobre el estado del sistema, los flujos de trabajo empresariales y las actividades de seguridad. Estas métricas se envían desde las distintas aplicaciones, dispositivos de red y nodos, pero el valor de cada una de ellas puede variar significativamente.

Para ayudarte a gestionar la calidad y el volumen de tus métricas, utiliza la plantilla de Metric Tag Governance para procesarlas en Observability Pipelines antes de enviarlas a sus destinos. Puedes utilizar procesadores para conservar solo las métricas que necesitas, estandarizar el etiquetado de métricas y eliminar las etiquetas no deseadas para evitar una cardinalidad elevada.

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}