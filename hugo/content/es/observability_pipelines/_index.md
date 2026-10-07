---
description: Descubra cómo Observability Pipelines le permite recopilar, procesar
  y enrutar registros y métricas dentro de su propia infraestructura hacia destinos
  como Datadog, Amazon S3, Splunk y Microsoft Sentinel.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/explore_templates/
  tag: documentación
  text: Configure Pipelines
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: documentación
  text: Explore casos de uso y plantillas
- link: /observability_pipelines/configuration/install_the_worker/
  tag: documentación
  text: Instale el Observability Pipelines Worker
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: documentación
  text: Envío dual con Observability Pipelines
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: documentación
  text: Estrategias para reducir el volumen de registros
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: Centro de aprendizaje
  text: Primeros pasos con Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Agregue contexto de actualización dinámica a los registros con tablas de referencia
    y Observability Pipelines
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Envíe datos de OTel desde aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: blog
  text: Redacte datos confidenciales de sus registros de forma local usando Observability
    Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: blog
  text: Envío dual de registros con Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: blog
  text: Controle sus volúmenes de registros con Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: blog
  text: Archive sus registros con Observability Pipelines para una migración sencilla
    y asequible a Datadog
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: blog
  text: Agregue, procese y enrute registros fácilmente con Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: blog
  text: Transmita registros en formato OCSF a sus proveedores de seguridad o lagos
    de datos preferidos con Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/
  tag: blog
  text: Simplifique su migración de SIEM a Microsoft Sentinel con Datadog Observability
    Pipelines
- link: https://www.datadoghq.com/blog/sled-observability-pipelines/
  tag: blog
  text: Cómo las organizaciones estatales, locales y educativas pueden gestionar registros
    de manera flexible y eficiente usando Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: blog
  text: Cómo optimizar datos de registro de alto volumen sin comprometer la visibilidad
- link: https://www.datadoghq.com/blog/archive-search/
  tag: blog
  text: Busque en sus registros históricos de manera más eficiente con Datadog Archive
    Search
- link: https://www.datadoghq.com/blog/introducing-datadog-cloudprem/
  tag: blog
  text: Almacene y busque registros a escala de petabytes en su propia infraestructura
    con Datadog BYOC Logs
- link: https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/
  tag: blog
  text: Controle los costos de registros en cualquier SIEM o lago de datos utilizando
    Packs con Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/
  tag: blog
  text: Utilice OpenTelemetry con Observability Pipelines para la recopilación de
    registros y el control de costos neutrales respecto al proveedor
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: blog
  text: Administre el volumen de métricas y las etiquetas en su entorno con Observability
    Pipelines
title: Observability Pipelines
---
## Descripción general {#overview}

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="Un gráfico que muestra datos siendo agregados desde una variedad de fuentes, procesados y enriquecidos por el Observability Pipelines Worker en su propio entorno, y luego siendo dirigidos a los destinos de seguridad, análisis y almacenamiento de su elección" style="width:100%;" >}}

Datadog Observability Pipelines le permite recopilar y procesar registros y métricas dentro de su propia infraestructura, y luego enrutar los datos a diferentes destinos. Le brinda control sobre sus datos de observabilidad antes de que salgan de su entorno.

Con plantillas listas para usar, puede crear canalizaciones que redacten datos confidenciales, enriquezcan datos, filtren eventos ruidosos y dirijan datos a destinos como Datadog, herramientas SIEM o almacenamiento en la nube.

## Componentes clave {#key-components}

### Observability Pipelines Worker {#observability-pipelines-worker}

El Observability Pipelines Worker se ejecuta dentro de su infraestructura para agregar, procesar y dirigir datos.

<div class="alert alert-info">
Datadog recomienda que actualice Observability Pipelines Worker (OPW) con cada versión menor y de parche, o, como mínimo, mensualmente. <br><br> Actualizar a una versión principal de OPW y mantenerla actualizada es la única forma admitida de obtener la funcionalidad, las correcciones y las actualizaciones de seguridad más recientes de OPW. Consulte <a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Actualizar el Worker</a> para actualizar a la versión más reciente del Worker</a>.
</div>

### Interfaz de usuario de Observability Pipelines {#observability-pipelines-ui}

La interfaz de usuario de Observability Pipelines proporciona un plano de control centralizado donde puede:

- Cree y edite pipelines con plantillas guiadas.
- Implemente y administre Workers.
- Habilite seguimientos para realizar un seguimiento del estado de la canalización.

## Comience {#get-started}

1. Navegue a [Observability Pipelines][1].
1. Seleccione una [plantilla](#common-use-cases-and-templates) según su caso de uso.
1. Configure su canalización:
    1. Elija una [fuente][2] de registros.
    1. Configure [procesadores][3].
    1. Agregue uno o más [destinos][4].
1. [Instale el Worker][5] en su entorno
1. Habilite seguimientos para obtener observabilidad en tiempo real sobre el estado de su canalización.

Consulte [Configurar Pipelines][6] para obtener instrucciones detalladas.

## Casos de uso comunes y plantillas {#common-use-cases-and-templates}

Observability Pipelines incluye plantillas predefinidas para flujos de trabajo comunes de enrutamiento y transformación de datos. Puede personalizarlas completamente o combinarlas para satisfacer sus necesidades.

{{< img src="observability_pipelines/eight_templates.png" alt="La interfaz de usuario de Observability Pipelines mostrando las ocho plantillas" style="width:100%;" >}}

### Plantillas {#templates}

{{< tabs >}}
{{% tab "Registros" %}}

| Plantilla | Descripción |
|----------|-------------|
| Archivar registros | Almacene registros sin procesar en Amazon S3, Google Cloud Storage o Azure Storage para su retención y rehidratación a largo plazo. |
| Envío dual de registros | Envíe el mismo flujo de registros a múltiples destinos (por ejemplo, Datadog y un SIEM). |
| Generar métricas basadas en registros | Convierta registros de alto volumen en métricas de conteo o distribución para reducir las necesidades de almacenamiento. |
| Enriquecimiento de registros | Agregue metadatos de tablas de referencia o asignaciones estáticas para realizar consultas más efectivas. |
| Control de volumen de registros | Reduzca el volumen de log indexado filtrando los registros de bajo valor antes de que se almacenen. |
| Redacción de datos confidenciales | Detecte y elimine información de identificación personal (PII) y secretos mediante reglas integradas o personalizadas. |
| Dividir registros | Dirija los registros por tipo (por ejemplo, seguridad frente a aplicación) a diferentes herramientas. |

{{% /tab %}}
{{% tab "Métricas" %}}

| Plantilla | Descripción |
|----------|-------------|
| Gobernanza de etiquetas de métricas | Administre la calidad y el volumen de sus métricas conservando solo las que necesita, estandarizando el etiquetado de métricas y eliminando etiquetas no deseadas para evitar una alta cardinalidad. |

{{% /tab %}}
{{< /tabs >}}

Consulte [Explorar plantillas][7] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/sources/
[3]: /es/observability_pipelines/processors/
[4]: /es/observability_pipelines/destinations/
[5]: /es/observability_pipelines/configuration/install_the_worker/
[6]: /es/observability_pipelines/configuration/set_up_pipelines/
[7]: /es/observability_pipelines/configuration/explore_templates/