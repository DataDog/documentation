---
description: Aprenda estrategias, como el muestreo y el filtrado de registros, para
  reducir el volumen de registros con los procesadores de Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: documentación
  text: Configure un pipeline
- link: /observability_pipelines/processors/
  tag: documentación
  text: Procesadores de Observability Pipelines
title: Estrategias para reducir el volumen de registros
---
## Descripción general {#overview}

Observability Pipelines le permite recopilar y procesar registros, así como determinar a dónde desea enrutarlos, todo antes de que los datos abandonen su entorno local o en la nube.

Los registros no tienen el mismo valor. Por ejemplo, los registros de error suelen ser más útiles que los registros de información al solucionar problemas de operaciones en vivo. Los registros de entornos de producción también son más importantes que los registros de entornos que no son de producción. Por lo tanto, enrutar todos sus registros a una solución indexada puede diluir el valor general de sus datos y hacer que exceda su presupuesto.

Las siguientes situaciones también pueden aumentar innecesariamente el volumen y el costo de sus registros:

- Un equipo de aplicaciones activa inadvertidamente el registro de depuración.
- Usted implementa una nueva compilación con una condición de bucle de error que desencadena una inundación de errores.
- Teams intentan agregar la mayor cantidad posible de datos de rendimiento y métricas en los registros porque parece más fácil que implementar otras soluciones de telemetría.
- Los registros contienen campos y valores adicionales que nunca se utilizan.

Esta guía lo orienta sobre estrategias para reducir el volumen de registros mediante los procesadores de Observability Pipelines, de modo que pueda mantener el cumplimiento de costos y aumentar el valor de sus datos almacenados.

## Estrategias para reducir el volumen de registros {#strategies-for-reducing-your-log-volume}

Siga estas estrategias para reducir el volumen de registros:

### Muestree sus registros {#sample-your-logs}

Reduzca el volumen general de registros descartando un porcentaje de registros de alto volumen que sabe que son repetitivos, ruidosos o menos valiosos. Utilice el [sample processor][1] para hacer coincidir un subconjunto de registros según la consulta de filtro y conservar solo el porcentaje de registros que ha especificado. Esto le proporciona una vista representativa de los flujos de registros de alto volumen, mientras mantiene la visibilidad y la capacidad de análisis.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="Un [sample processor] que conserva el 50% de los registros que coinciden con la consulta de filtro para http.status_code:200 y http.method:GET" style="width:100%;" >}}

### Filtre sus registros {#filter-your-logs}

No todos los registros son valiosos y necesitan ser almacenados. Por ejemplo, mantener registros de depuración de sistemas que no son de producción probablemente no sea crítico para su organización. Por lo tanto, utilice el [filter processor][2] para descartar esos registros, de modo que no se envíen a sus soluciones de gestión de registros.

### Elimine atributos en sus registros {#drop-attributes-in-your-logs}

Los registros pueden contener cientos de atributos, y a menudo solo se utiliza un pequeño número de atributos para la investigación y el análisis. Utilice el procesador [edit fields][3] para reducir el tamaño total de sus registros eliminando atributos no utilizados o inútiles, lo que reduce su costo de ingesta de registros.

### Reduzca sus registros {#reduce-your-logs}

Los sistemas pueden emitir cientos, si no miles, de registros por segundo. Combine estos registros en un solo evento mediante la fusión de campos utilizando diferentes estrategias, como concatenación, suma, creación de una matriz de valores y más. Utilice el [reduce processor][4] para combinar múltiples eventos de registro en uno solo, según la estrategia de fusión seleccionada. Esto reduce el número total de eventos que se envían a su destino.

### Elimine duplicados de sus registros {#deduplicate-your-logs}

Eliminar duplicados de sus registros puede ayudar a mantener la precisión y consistencia de sus datos y proteger contra errores ascendentes que dupliquen accidentalmente sus registros. Utilice el [deduplication processor][5] para comparar campos y ver si hay contenido idéntico y luego eliminar los duplicados, reduciendo así su volumen total de registros.

### Implemente cuotas {#implement-quotas}

Gobierne y controle sus registros en diferentes niveles utilizando cuotas. Por ejemplo, a un nivel granular, puede aplicar un límite de cuota a registros de aplicaciones específicos (`app:xyz`) o, a un nivel superior, aplicar un límite a los registros de información (`status:info`). Esto puede ayudarle a cumplir con los requisitos de presupuesto y uso.

Utilice el [quota processor][6] para:
1. Defina un filtro para los registros que le interesan. Esto podría filtrar registros a un nivel alto, como para un entorno, o a un nivel más granular, como para un equipo específico. También puede filtrar utilizando una combinación de atributos de registro.
1. Defina una cuota basada en el número de bytes o eventos. Puede optar por descartar los registros recibidos después de que se haya alcanzado la cuota, o simplemente recibir una alerta de que se ha llegado al límite para que pueda investigar y solucionar el problema.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="Un procesador de cuotas con una consulta de filtro para http.status_code:200 y un límite establecido en 1 TB por día" style="width:100%;" >}}

### Envíe sus registros directamente a un archivo {#route-your-logs-directly-to-an-archive}

Envíe los registros directamente a su propio almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage) en un formato que Datadog pueda rehidratar. Luego, puede rehidratar el archivo en Datadog según sea necesario. Consulte [Archivar registros][7] para obtener más información.

## Candidatos sólidos para estrategias de reducción de volumen de registros {#strong-candidates-for-log-volume-reduction-strategies}

Los usuarios han implementado las estrategias anteriores para reducir sus volúmenes generales de registros. La siguiente lista es un ejemplo de fuentes de registros que son candidatas sólidas para utilizar estrategias de reducción de registros:

- CDN
- VPC y flujo de red
- Actividad del servidor web
- Balanceadores de carga
- Servicios de CI/CD
- Planos de control
- Service Mesh
- Firewalls
- Dispositivos de red
- DNS
- Registros de depuración
- Registros de auditoría
- Registros de entornos que no son de producción

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/processors/sample
[2]: /es/observability_pipelines/processors/filter
[3]: /es/observability_pipelines/processors/edit_fields
[4]: /es/observability_pipelines/processors/reduce
[5]: /es/observability_pipelines/processors/dedupe
[6]: /es/observability_pipelines/processors/quota
[7]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs