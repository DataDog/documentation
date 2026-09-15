---
description: Haga un seguimiento de la calidad, el rendimiento y el costo de los datos
  con Data Observability para detectar anomalías, analizar el linaje de datos y prevenir
  problemas que afecten a los sistemas posteriores.
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: Blog
  text: Datadog lleva la observabilidad a los equipos de datos mediante la adquisición
    de Metaplane
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Evalúe, optimice y asegure su pila de IA de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: Blog
  text: 'Seguimiento de canalización de datos 101: seguimiento del estado y el rendimiento
    en toda la pila de datos'
title: Descripción general de Data Observability
---
## Descripción general {#overview}
Data Observability (DO) ayuda a los equipos de datos a mejorar la confiabilidad de los datos para aplicaciones de análisis e IA, y a optimizar el rendimiento y los costos de las canalizaciones de datos. Al unificar Quality Monitoring y Jobs Monitoring desde la producción hasta el consumo, los equipos pueden detectar y remediar problemas más rápido mientras optimizan el costo y el rendimiento.

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Linaje de extremo a extremo de Datadog Data Observability con trazas de trabajos de Spark." style="width:100%;" >}}

## Capacidades clave {#key-capabilities}

- **Detecte fallas tempranamente**: Detecte datos incorrectos en almacenes como Snowflake, Databricks y BigQuery a través de monitores basados en ML antes de que los dashboards, las partes interesadas o los modelos de IA se vean afectados. Detecte fallas en el upstream pipeline en trabajos ejecutados en Databricks, Spark, Airflow o dbt.
- **Acelere la corrección**: Clasifique más rápido utilizando el linaje de extremo a extremo para identificar las causas raíz, evaluar el alcance del incidente y dirigirlo al propietario correcto. Visualice qué trabajo en el pipeline falló o se retrasó, y acceda a las trazas y registros de ejecución del trabajo para determinar por qué.
- **Optimice el costo y el rendimiento**: Obtenga visibilidad sobre el costo y la eficiencia de los trabajos y clústeres de Spark y Databricks, y utilice las recomendaciones para optimizar la configuración del clúster, el código y las consultas.
- **Unifique la observabilidad de extremo a extremo**: Correlacione la calidad de los datos, la ejecución del pipeline y las señales de infraestructura en un solo lugar, abarcando todo el ciclo de vida de los datos.

## Comience {#get-started}

{{< whatsnext desc="Data Observability consta de lo siguiente:" >}}
   {{< nextlink href="/data_observability/data_catalog/" >}}Catálogo de datos: Explore y busque en un inventario centralizado de sus activos de datos a través de integraciones conectadas.{{< /nextlink >}}
   {{< nextlink href="/data_observability/lineage/" >}}Linaje: Rastree las dependencias ascendentes y los consumidores descendentes en toda su pila de datos.{{< /nextlink >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring: Identifique problemas de datos antes de que las aplicaciones de BI e IA posteriores se vean afectadas.{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring: Observe, solucione problemas y optimice los trabajos en sus pipelines de datos.{{< /nextlink >}}
   {{< nextlink href="/data_observability/cicd/" >}}CI/CD: Prevenga problemas de calidad de datos antes de que se fusionen.{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}