---
description: Obtenga información sobre las plantillas de registros, métricas y trazas
  listas para usar disponibles para crear e implementar canalizaciones en la interfaz
  de usuario de Observability Pipelines.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentación
  text: Configure Pipelines
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: Centro de aprendizaje
  text: Primeros pasos con Observability Pipelines
title: Explorar plantillas
---
## Descripción general {#overview}

Cuando crea una canalización en la interfaz de usuario de Observability Pipelines, seleccione una de las plantillas listas para usar para crear e implementar canalizaciones según su caso de uso.

{{< img src="observability_pipelines/eight_templates.png" alt="La interfaz de usuario de Observability Pipelines mostrando las ocho plantillas" style="width:100%;" >}}

## Plantillas {#templates}

Las plantillas están creadas para los siguientes casos de uso:

{{< tabs >}}
{{% tab "Registros" %}}

### Archivar registros {#archive-logs}

Utilice la plantilla Archivar registros para almacenar registros en una solución de almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage). Los registros archivados se almacenan en un formato que Datadog puede rehidratar para que puedan rehidratarse en Datadog según sea necesario. Esto es útil cuando:

- Tiene un gran volumen de registros ruidosos, pero es posible que necesite indexarlos en Datadog Log Management de forma ad hoc para una investigación.
- Está migrando a Datadog Log Management y desea tener registros históricos después de completar la migración.
- Tiene una política de retención para cumplir con los requisitos de cumplimiento, pero no necesariamente necesita indexar esos registros.

### Envío doble de registros {#dual-ship-logs}

A medida que su organización crece, sus necesidades de observabilidad para diferentes casos de uso, como seguridad, archivo y gestión de registros, también cambian. Esto podría significar tener que probar diferentes soluciones de archivo, SIEM y gestión de registros. Sin embargo, gestionar canalizaciones de registros para diferentes soluciones puede ser complicado. Utilice la plantilla Envío doble de registros para enviar sus registros a diferentes destinos, de modo que pueda evaluar diferentes herramientas y flujos de trabajo con una interrupción mínima en su entorno de producción.

### Generar métricas basadas en registros {#generate-log-based-metrics}

Algunas fuentes de registros, como firewalls y dispositivos de red, generan un gran volumen de eventos de registro que contienen datos de registro que no necesitan almacenarse. A menudo, solo necesita un resumen de los registros y una comparación con los datos históricos. Las métricas basadas en registros también son una forma rentable de resumir los datos de registro de todo el flujo de ingesta. Utilice la plantilla Generar métricas para generar métricas de conteo, gauge o distribución a partir de registros que coincidan con una consulta.

Estos son los tipos de métricas disponibles:
  | Tipo de métrica  | Descripción                                                                                                                                         | Ejemplo                                                                                       |
  | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
  | COUNT        | El número total de ocurrencias de eventos en un intervalo de tiempo. Se puede restablecer a cero, pero no se puede disminuir.                                          | Desea contar el número de registros con `status:error`.                                     |
  | GAUGE        | Una instantánea de un valor en el momento en que se informa.                                                                                                   | Desea realizar un seguimiento de la última utilización de CPU por servidor.                                        |
  | DISTRIBUTION | Valores sin procesar enviados a Datadog para que las agregaciones de percentiles (como p95, p99) se calculen en el servidor, globalmente en todos los servidores que informan la métrica. | Desea el p95 global de `response_time_seconds` en todos los servidores que sirven un punto de conexión de API. |


### Enriquecimiento de registros {#log-enrichment}

Los diferentes servicios, sistemas y aplicaciones de su organización generan registros que contienen capas de información y en diferentes formatos. Para administrar estos registros, es posible que deba estandarizar su formato y agregar información para facilitar su búsqueda y análisis. Por ejemplo, cada fuente de registros tiene su propio formato único. Esto puede dificultar la búsqueda y el análisis durante las investigaciones si no se han reformateado y estandarizado. También podría tener información adicional, como ID de cliente o direcciones IP, que desee agregar a sus registros.

### Control de volumen de registros {#log-volume-control}

Los registros sin procesar son ruidosos y solo algunos registros son útiles para búsquedas y análisis posteriores durante las investigaciones. Utilice la plantilla Control de volumen de registros para determinar qué registros enviar a su solución indexada, como un SIEM o una solución de gestión de registros. Esto le ayuda a aumentar el valor de sus registros indexados y también a mantenerse dentro de su presupuesto planificado.

### Redacción de datos confidenciales {#sensitive-data-redaction}

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en sus registros, lo que puede exponer a su organización a riesgos financieros y de privacidad.

Utilice la plantilla Redacción de datos confidenciales para detectar y redactar información confidencial en las instalaciones. El procesador de escáner de datos confidenciales de Observability Pipelines proporciona 70 reglas de escaneo listas para usar, pero también puede crear sus propias reglas de escaneo personalizadas mediante expresiones regulares. Las reglas listas para usar reconocen patrones estándar como números de tarjetas de crédito, direcciones de correo electrónico, direcciones IP, claves de API y SSH, y tokens de acceso.

### Dividir registros {#split-logs}

Cuando tenga registros de diferentes servicios y aplicaciones, es posible que necesite enviarlos a diferentes servicios descendentes para realizar consultas, análisis y alertas. Por ejemplo, es posible que desee enviar registros de seguridad a una solución SIEM y registros de DevOps a Datadog. Utilice la plantilla Dividir registros para preprocesar sus registros por separado para cada destino antes de enviarlos a los servicios descendentes.

{{% /tab %}}
{{% tab "Métricas" %}}

### Gobernanza de etiquetas de métricas {#metric-tag-governance}

Las métricas capturan señales sobre su entorno y ofrecen información sobre el estado de su sistema, los flujos de trabajo empresariales y las actividades de seguridad. Estas métricas se envían desde sus diversas aplicaciones, dispositivos de red y nodos, pero el valor de las métricas individuales puede variar significativamente.

Para ayudarle a gestionar la calidad y el volumen de sus métricas, utilice la plantilla Gobernanza de etiquetas de métricas para procesarlas en Observability Pipelines antes de enviarlas a sus destinos. Puede utilizar procesadores para conservar solo las métricas que necesita, estandarizar el etiquetado de métricas y eliminar etiquetas no deseadas para evitar una alta cardinalidad.

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}