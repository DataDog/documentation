---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines
  tag: documentación
  text: Establecer un pipeline
- link: /observability_pipelines/processors/
  tag: documentación
  text: Procesadores de Observability Pipelines
title: Estrategias para reducir el volumen de logs
---

## Información general

Observability Pipelines te permite recopilar y procesar logs, así como determinar hacia dónde deseas dirigirlos, todo ello antes de que los datos salgan de tus instalaciones o tu entorno en la nube.

Los logs no tienen el mismo valor. Por ejemplo, los logs de errores suelen ser más útiles que los logs de información para solucionar problemas con operaciones en directo. Los logs de entornos de producción también son más importantes que los logs de entornos de no producción. Por lo tanto, dirigir todos tus logs a una solución indexada puede diluir el valor global de tus datos y hacer que supere tu presupuesto.

Las siguientes situaciones también pueden aumentar innecesariamente el volumen y el coste de tus logs:

- Un equipo de aplicación activa inadvertidamente el registro de depuración.
- Envías una nueva compilación con una condición de bucle de error que desencadena una avalancha de errores.
- Los equipos intentan añadir la mayor cantidad de datos de rendimiento y métrica en los logs porque parece más fácil que implementar otras soluciones de telemetría.
- Los logs contienen campos y valores adicionales que nunca se utilizan.

Esta guía te indica las estrategias para reducir tu volumen de logs utilizando los procesadores de Observability Pipelines, para que puedas seguir cumpliendo con los costes y aumentar el valor de tus datos almacenados.

## Estrategias para reducir tu volumen de logs

Sigue estas estrategias para reducir tu volumen de logs:

### Haz una muestra de tus logs

Reduce el volumen total de logs eliminando un porcentaje de logs de gran volumen que sabes que es repetitivo, ruidoso o menos valioso. Utiliza el [procesador de muestras][1] para hacer coincidir un subconjunto de logs basado en la consulta del filtro y conservar sólo el porcentaje de logs que hayas especificado. Esto te proporciona una visión representativa de los flujos de log de gran volumen, al tiempo que mantiene la visibilidad y la capacidad de análisis.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/sample_example.png" alt="Un procesador de ejemplo que retiene un 50% de logs que coinciden la consulta de filtro para http.status_code:200 and http.method:GET" style="width:100%;" >}}

### Filtrar tus logs

No todos los logs son valiosos y necesitan ser almacenados. Por ejemplo, guardar logs de depuración de sistemas que no son de producción probablemente no sea crítico para tu organización. Por lo tanto, utiliza el [procesador de filtros][2] para descartar esos logs, de modo que no se envíen a tus soluciones de gestión de logs.

### Descartar atributos en tus logs

Los logs pueden contener cientos de atributos y, a menudo, sólo se utiliza un pequeño número de ellos para la investigación y el análisis. Utiliza el procesador de [editar campos][3] para reducir el tamaño total de tus logs eliminando los atributos que no se utilizan o que no son útiles, lo que reduce el coste de ingesta de logs.

### Reducir tus logs

Los sistemas pueden emitir cientos, si no miles, de logs por segundo. Contrae estos logs en un único evento fusionando los campos mediante distintas estrategias, como la concatenación, la suma, la creación de una matriz con los valores, etc. Utiliza el [procesador de reducción][4] para contraer varios eventos de logs en un único evento, en función de la estrategia de fusión seleccionada. Esto reduce el número total de eventos que se envían a tu destino.

### Deduplicar tus logs

Deduplicar tus logs puede ayudar a mantener la exactitud y coherencia de tus datos y protegerte contra errores previos que dupliquen accidentalmente tus logs. Utiliza el [procesador de deduplicación][5] para comparar campos y ver si hay contenido idéntico y, a continuación, elimina los duplicados, reduciendo así el volumen total de logs.

### Implementar cuotas

Gobierna y controla tus logs a diferentes niveles utilizando cuotas. Por ejemplo, a un nivel detallado, puedes aplicar un límite de cuota a los logs de una aplicación específica (`app:xyz`) o, a un nivel superior, aplicar un límite a los logs de información (`status:info`). Esto puede ayudar a cumplir los requisitos de presupuesto y uso.

Utiliza el [procesador de cuotas][6] para:
1. Definir un filtro para logs que te interesen. Esto podría filtrar los logs a un nivel superior, como para un entorno, o a un nivel más detallado, como para un equipo específico. También puedes filtrar utilizando una combinación de atributos de logs.
1. Definir una cuota basada en el número de bytes o eventos. Puedes optar por eliminar los logs recibidos una vez alcanzada la cuota, o simplemente recibir un aviso de que se ha alcanzado el límite para que puedas investigar y solucionarlo.

{{< img src="observability_pipelines/guide/strategies_for_reducing_log_volume/quota_example.png" alt="Un procesador de cuota con una consulta de filtro para http.status_code:200 y un límite establecido en 1 TB por día" style="width:100%;" >}}

### Dirigir tus logs directamente a un archivo

Dirige los logs directamente a tu propio almacenamiento en la nube (Amazon S3, Google Cloud Storage o Azure Storage) en un formato rehidratable de Datadog. A continuación, puedes rehidratar el archivo en Datadog según sea necesario. Consulta [Archivo de logs][7] para obtener más información.

## Fuertes candidatos para las estrategias de reducción de volumen de logs

Los usuarios han implementado las estrategias anteriores para reducir sus volúmenes totales de logs. La siguiente lista es un ejemplo de fuentes de logs que son fuertes candidatas para utilizar estrategias de reducción de logs:

- CDN
- VPC y flujo de red
- Actividad del servidor web
- Equilibradores de carga
- Servicios de CI/CD
- Planos de control
- Malla de servicio
- Firewalls
- Dispositivos de red
- DNS
- Logs de depuración
- Logs de auditoría
- Logs de entorno de no producción

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/processors/sample
[2]: /es/observability_pipelines/processors/filter
[3]: /es/observability_pipelines/processors/edit_fields
[4]: /es/observability_pipelines/processors/reduce
[5]: /es/observability_pipelines/processors/dedupe
[6]: /es/observability_pipelines/processors/quota
[7]:  /es/observability_pipelines/set_up_pipelines/archive_logs