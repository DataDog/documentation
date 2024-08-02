---
algolia:
  tags:
  - Archivos en línea
description: Capacidades rentables de consulta en directo en la retención de logs
  a largo plazo
further_reading:
- link: /logs/log_configuration/indexes/#indexes-filters
  tag: Documentación
  text: Filtros de índice
- link: /logs/log_configuration/indexes/#exclusion-filters
  tag: Documentación
  text: Filtros de exclusión
- link: https://www.datadoghq.com/blog/online-archives-datadog/
  tag: Blog
  text: Análisis e investigación histórica de logs con Archivos en línea
private: true
title: Archivos en línea
---

<div class="alert alert-warning">
La disponibilidad de Archivos en línea es limitada. Para solicitar acceso, ponte en contacto con <a href="/help/">el soporte de Datadog</a>.
</div>

## Información general

Archivos en línea es una solución de almacenamiento de logs que proporciona 15 meses o más de almacenamiento, consultas en tiempo real y funciones analíticas para tus logs en Datadog.

Los equipos de seguridad, cumplimiento normativo e ingeniería a menudo necesitan consultar logs por intervalos de tiempo largos. Las brechas de seguridad se detectan a menudo después de semanas, si no meses, de una incidencia y las revisiones de cumplimiento legal y procesos de auditoría pueden requerir logs que se remontan a más de un año. Sin embargo, las necesidades de análisis a largo plazo no se limitan a los equipos de seguridad. Los equipos de ingeniería que realizan análisis a largo plazo de gran cardinalidad, año tras año, sobre millones de entidades como usuarios, hosts, direcciones IP, etc., trabajan mejor con logs que con métricas.

Archivos en línea te permite conservar y buscar todos tus datos de log durante 15 meses o más. Los equipos de seguridad, cumplimiento normativo e ingeniería pueden abordar casos de uso que requieran investigación y análisis históricos, como auditorías de seguridad, o analizar tendencias de cardinalidad muy alta durante largos periodos y correlacionar los análisis forenses del sistema de métricas con el comportamiento de las aplicaciones y los usuarios de los datos de log.

## Activación de Archivos en línea

Los Archivos en línea se configuran por índice de log. Los [filtros de índice][1] que se aplican a ese índice también se aplican a los Archivos en línea.

**Nota**: Sin embargo, los [filtros de exclusión][2] y las cuotas diarias de ese índice no se aplican a los Archivos en línea. Por ejemplo, puedes optar por indexar solo los logs de errores y conservar todos los logs en los Archivos en línea excluyendo de los índices los archivos que no contengan logs de errores.

Configurar Archivos en línea en la página de [Configuración de índices de logs][3]:

1. Ve a [**Logs > Configuration > Indexes**][3] (Logs > Configuración > Índices).
2. Edita el índice que deseas activar con Archivos en línea.
3. Activa Archivos en línea en el paso 3 de la configuración del índice.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="Cómo activar archivos de logs" style="width:100%;">}}

## Búsqueda en Archivos en línea

Selecciona Online Archive (Archivos en línea) en el menú desplegable del Logs Explorer para empezar a buscar en Archivos en línea en lugar de en índices. Este menú desplegable se encuentra junto al selector de tiempo. Puedes ajustar el selector de tiempo al marcar opciones preestablecidas, hasta 3 meses, o al marcar la vista de calendario para buscar más atrás en el tiempo.


{{< img src="logs/log_configuration/online_archives/searching.png" alt="Cómo buscar tu archivo en línea" style="width:100%;">}}

Puedes [buscar][4] al escribir las consultas en la barra de búsqueda o al seleccionar la faceta correspondiente en el panel de facetas.

**Notas**:
- No se puede exportar logs del Archivo en línea a dashboards, notebooks, o monitores.
- La vista de Transacciones y patrones no está disponible para los Archivos en línea.

## Análisis en Archivos en línea

Cambia a Analytics (Análisis) seleccionando **Group into Fields** (Agrupar por campos) o **Visualize as Timeseries/Top List/Table** (Visualizar como serie temporal/lista principal/tabla).

Configurar el tipo de almacenamiento en **Online Archives** (Archivos en línea) te permite consultar Archivos en línea en lugar de índices. Puedes volver a **Indexes** (Índices) en cualquier momento.

## Enviar selectivamente logs a Archivos en línea e Índices

Puedes establecer la configuración para enviar ciertos logs a Archivos en línea mientras que otros van a un índice basado en atributos de log y etiquetas (tags). Mezcla y combina logs entre tipos de almacenamiento según tus casos de uso de registro y estrategia de retención.

Para configurar tipos de almacenamiento, utiliza filtros de índice que se apliquen a Archivos en línea y utiliza filtros de exclusión de índice que no se apliquen a Archivos en línea.

Aquí encontrarás ejemplos de diferentes estrategias de retención de logs y cómo aplicarlas:

### El equipo de ingeniería quiere muestrear logs de depuración en índices conservando todos los logs en Archivos en línea

1. Crea un índice para todos los logs con el filtro `*`.
2. Activa Archivos en línea para este índice.
3. Añade un filtro de exclusión en el índice `status:Debug` con un porcentaje de exclusión fijado en el 90%. Este filtro de exclusión solo se aplica al índice.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="Cómo excluir elementos del índice" style="width:100%;">}}

### El equipo de seguridad quiere conservar todos sus logs en Archivos en línea, pero ninguno en los índices

1. Crea un índice para los logs de seguridad con el filtro `team:security`.
2. Activa Archivos en línea para este índice.
3. Añade un filtro de exclusión `*` en el índice para filtrar todos los logs del índice, pero no de Archivos en línea.

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="Cómo excluir elementos del índice" style="width:100%;">}}

### Desactivar Archivos en línea
Selecciona el índice en el que deseas desactivar Archivos en línea y, a continuación, coloca el conmutador Archivos en línea en la posición OFF (DESACTIVADO).

**Nota:** El orden de los índices es importante, ya que los logs `team:security` van al primer índice que coincide con el filtro de índice en caso de que haya varios índices.

[1]: /es/logs/log_configuration/indexes/#indexes-filters
[2]: /es/logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs