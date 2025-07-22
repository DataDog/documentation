Muchos tipos de logs están diseñados para ser usados en telemetría para seguir tendencias, como los KPI, durante largos períodos de tiempo. Generar métricas a partir de tus logs es una forma rentable de resumir datos de logs de alto volumen, como los logs de CDN, los logs de flujo de VPC, los logs de firewall y los logs de red. Usa el procesador de generación de métricas para crear una métrica de recuento de los logs que coinciden con una consulta o una métrica de distribución de un valor numérico contenido en los logs, como la duración de una solicitud.

**Nota**: Las métricas generadas son [métricas personalizadas][10031] y se facturan en consecuencia. Para obtener más información, consulta [Facturación de métricas personalizadas][10032].

Para configurar el procesador:

Haz clic en **Manage Metrics (Administrar Métricas)** para crear nuevas métricas o editar las existentes. Esto abre un panel lateral.

- Si aún no has creado ninguna métrica, introduce los parámetros de la métrica tal y como se describen en la sección [Agregar una métrica](#add-a-metric) para crearla.
- Si ya has creado métricas, considera hacer clic en la fila de la métrica en la tabla de resumen para editarla o eliminarla. Usa la barra de búsqueda para encontrar una métrica específica por su nombre y luego selecciona la métrica para editarla o eliminarla. Haz clic en **Add Metric (Añadir métrica)** para agregar otra métrica.

##### Añadir una métrica

 1. Introduce una [Consulta de filtro](#filter-query-syntax). Solo se procesan los logs que coinciden con la consulta de filtro especificada. Todos los logs, independientemente de si coinciden con la consulta del filtro o no, se envían al siguiente paso del pipeline. **Nota**: Dado que un solo procesador puede generar múltiples métricas, puedes definir una consulta de filtro diferente para cada métrica.
1. Introduce un nombre para la métrica.
1. En la sección **Definir parámetros**, selecciona el tipo de métrica (conteo, gauge o distribución). Consulta el [ejemplo de métrica de recuento](#count-metric-example) y el [ejemplo de métrica de distribución](#distribution-metric-example). Consulta también [Tipos de métricas](#metrics-types) para obtener más información.
   - Para los tipos de métrica gauge y distribution, selecciona un campo del log que tenga un valor numérico (o una cadena numérica que se pueda parsear) que se use como valor de la métrica generada.
   - Para el tipo de métrica distribution, el valor de campo del log puede ser una matriz numérica (analizable), que se usa para el conjunto de muestras de métricas generado.
   - El campo **Group by (Agrupar por)** determina cómo se agrupan los valores de las métricas. Por ejemplo, si tienes cientos de hosts repartidos en cuatro regiones, al agrupar por región te permite graficar una línea para cada región. Los campos enumerados en la configuración **Group by (Agrupar por)** se establecen como etiquetas en la métrica configurada.
1. Haz clic en **Add Metric (Añadir Métrica)**.

##### Tipos de métricas

Puedes generar estos tipos de métricas para tus logs. Consulta la documentación de [Tipos de métricas][10033] y [Distribuciones][10034] para obtener más detalles.

| Tipo de métrica| Descripción| Ejemplo|
|----------|----------|----------|
| CUENTA| Representa el número total de eventos ocurridos en un intervalo de tiempo. Este valor puede restablecerse a cero, pero no puede disminuirse.| Quieres contar el número de logs con `status:error`.|
| GAUGE| Representa un snapshot de eventos en un intervalo de tiempo.| Se recomienda medir el último uso de CPU por host de todos los logs del entorno de producción.|
| DISTRIBUCIÓN| Representa la distribución estadística global de un conjunto de valores calculados en toda tu infraestructura distribuida en un intervalo de tiempo.| Se recomienda medir el tiempo medio que tarda en realizarse una llamada a la API.|

##### Ejemplo de métrica de conteo

Para este ejemplo de log `status:error`:

```
{"status": "error", "env": "prod", "host": "ip-172-25-222-111.ec2.internal"}
```

Para crear una métrica de counts que cuente el número de logs que contienen `"status":"error"` y los agrupe por `env` y `host`, introduce la siguiente información:

| Parámetros de entrada| Valor|
|----------|----------|
| Consulta de filtro| `@status:error`|
| Nombre de la métrica| `status_error_total`|
| Tipo de métrica| Cuenta|
| Agrupar por| `env`, `prod`|

##### Ejemplo de métrica de distribución

Para este ejemplo de un log de respuesta de una API:

```
{
    "timestamp": "2018-10-15T17:01:33Z",
    "method": "GET",
    "status": 200,
    "request_body": "{"information"}",
    "response_time_seconds: 10
}
```

Para crear una métrica de distribución que mida el tiempo promedio que se tarda en realizar una llamada a la API, introduce la siguiente información:

| Parámetros de entrada| Valor|
|----------|----------|
| Consulta de filtro| `@method`|
| Nombre de la métrica| `status_200_response`|
| Tipo de métrica| Distribución|
| Selecciona un atributo de log| `response_time_seconds`|
| Agrupar por| `method`|

[10031]: /metrics/custom_metrics/
[10032]: /account_management/billing/custom_metrics/
[10033]: /metrics/types/
[10034]: /metrics/distributions/
