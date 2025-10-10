---
further_reading:
- link: /data_streams
  tag: Documentación
  text: Flujos de datos Monitorización
title: Data Jobs Monitoring
---

{{< img src="data_jobs/overview_062024.png" alt="Página de información general de Datadog Data Jobs Monitoring" style="width:100%;" >}}

Data Jobs Monitoring proporciona visibilidad del rendimiento, la fiabilidad y la rentabilidad de tus trabajos de procesamiento de datos, junto con la infraestructura subyacente. Data Jobs Monitoring te permite:

- Realizar un seguimiento del estado y el rendimiento de los trabajos de procesamiento de datos en todas tus cuentas y espacios de trabajo. Descubre cuáles consumen más recursos informáticos o presentan ineficiencias.
- Recibir una alerta cuando falla un trabajo o cuando tarda demasiado en finalizar.
- Analizar detalles y trazas (traces) de stack tecnológico de la ejecución del trabajo.
- Correlacionar métricas de infraestructura, métricas de Spark desde la interfaz de usuario de Spark, logs y configuraciones de clústeres.
- Comparar varias ejecuciones para facilitar la resolución de problemas y optimizar el suministro y la configuración durante el despliegue.

## Ajustes

Data Jobs Monitoring es compatible con la monitorización de trabajos en Amazon EMR, Databricks (AWS, Azure, Google Cloud), Google Dataproc, Spark en Kubernetes, y Apache Airflow.

Para empezar, selecciona tu plataforma y sigue las instrucciones de instalación:

{{< partial name="data_jobs/setup-platforms.html" >}}

<br/>

## Explorar Data Jobs Monitoring

### Identificar fácilmente los trabajos poco fiables e ineficaces

Visualiza todos los trabajos en todas las cuentas en la nube y espacios de trabajo. Identifica los trabajos fallidos para tomar medidas al respecto o encuentra trabajos con un elevado nivel de CPU inactiva que estén utilizando mucho cálculo y deban optimizarse.

### Recibir alertas sobre trabajos problemáticos

Los monitores Datadog envían alertas cuando un trabajo falla o se está ejecutando más allá de su tiempo de finalización. Consulta [plantillas de monitor][1] para monitorizar trabajos de datos específicos de tu integraciones instalada.

### Analizar y solucionar problemas de trabajos individuales

Haz clic en un trabajo para ver su rendimiento en varias ejecuciones, así como los mensajes de error de las ejecuciones fallidas.

{{< img src="data_jobs/djm_job_062024.png" alt="Página de información general de un trabajo de la aplicación Spark 'product-insights'" style="width:100%;" >}}

### Analizar una ejecución individual

Al hacer clic en una ejecución, se abre un panel lateral con detalles de la cantidad de tiempo que se empleó en cada trabajo y etapa de Spark, junto con un desglose del consumo de recursos y métricas de Spark, como la CPU inactiva del ejecutor, el volumen de datos de entrada/salida, la mezcla de datos y el desbordamiento del disco. Desde este panel puedes correlacionar la ejecución con el uso de recursos del nodo del ejecutor y el controlador, los logs, y la configuración del trabajo y el clúster. 

En la pestaña **Infraestructura** puedes correlacionar la ejecución con métricas de infraestructura.

{{< img src="data_jobs/djm_run_infra_062024.png" alt="Data Jobs Monitoring > Panel de ejecución, pestaña Infraestructura" style="width:100%;" >}}

En el caso de una ejecución fallida, consulta la pestaña **Errores** para ver la traza de stack tecnológico, que puede ayudarte a determinar dónde y cómo se produjo el fallo.

Para determinar por qué una etapa tarda mucho tiempo en finalizar, puedes utilizar la pestaña **Métricas de tareas Spark** para ver las métricas a nivel de tarea de una etapa específica de Spark y poder identificar el sesgo de los datos. Visualiza la distribución del tiempo empleado y de los datos consumidos por las distintas tareas.

{{< img src="data_jobs/djm_task_metrics.png" alt="Data Jobs Monitoring > Panel de ejecución, pestaña Métricas de tareas Spark" style="width:100%;" >}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/recommended?q=jobs%20&only_installed=true&p=1