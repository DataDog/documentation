---
kind: Documentación
title: Reasignador de fechas
---

A medida que Datadog recibe fechas, las marca con la fecha y hora mediante los valores de cualquiera de estos atributos predeterminados:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si tus eventos tienen fechas en un atributo que no está en este lista, utiliza el procesador de reasignación de fechas para definir su atributo de fecha como la marca de tiempo oficial del evento:

<div class="alert alert-info">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato EPOCH de milisegundos)</a> y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si tus eventos no tienen una marca de tiempo que se ajuste a los formatos enumerados anteriormente, utiliza el procesador de Grok para extraer la hora de la época de la marca de tiempo a un atributo nuevo. El reasignador de fechas utiliza el atributo recién definido.

Para conocer cómo se puede analizar un formato de fecha y hora personalizado en Datadog, consulta la sección de [Análisis de fechas][3].

**Notas**:

* A partir de la norma ISO 8601-1:2019, el formato básico es `T[hh][mm][ss]` y el formato extendido es `T[hh]:[mm]:[ss]`. Las versiones anteriores omitían la T (que representa la hora) en ambos formatos.
* Si se aplican varios procesadores de reasignación de fechas a un pipeline determinado, se tiene en cuenta el último (según el orden del pipeline).

Procesador de reasignación de fechas de ejemplo  

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Definir un atributo de fecha" style="width:80%;" >}}