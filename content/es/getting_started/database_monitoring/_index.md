---
description: Monitoriza la salud y el rendimiento de las bases de datos, soluciona
  las consultas lentas y crea dashboards para el análisis y la optimización de consultas.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog/
  tag: Blog
  text: Monitorización del rendimiento de las bases de datos con Datadog
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para mejorar tu monitorización de base
    de datos
title: Empezando con la monitorización de bases de datos
---

## Información general

La monitorización de bases de datos de Datadog te ayuda a comprender mejor el estado y el rendimiento de tus bases de datos, y a determinar el origen de cualquier problema.

En un único lugar, puedes visualizar lo siguiente:

* Métricas de nivel de host
* Planes explicativos
* Métricas de rendimiento de consultas pasadas

Sigue los pasos de esta guía para configurar la monitorización de bases de datos de Datadog en una base de datos PostgreSQL de ejemplo. A continuación, aprende a identificar una consulta cara, a solucionar los problemas de una consulta lenta y a crear un dashboard para ver los cambios en el volumen de consultas.

## Configuración

### Requisitos previos

Antes de empezar, necesitas una [cuenta de Datadog][1].

Para ejecutar la aplicación de ejemplo, necesitas una máquina con [GNU Make][2] y [Docker][3]. Asimismo, no olvides tener a mano tu [clave de API][4] de Datadog.

### Instala la aplicación de ejemplo

La aplicación de ejemplo inicia el Datadog Agent y una base de datos PostgreSQL en un contenedor Docker. Mientras la aplicación se ejecuta, el Agent envía métricas de la base de datos a Datadog. Los datos de la aplicación se pueden ver en la monitorización de bases de datos de Datadog.

Sigue estas instrucciones para instalar la aplicación de ejemplo en MacOs o Linux.

1. Clona el [repositorio][5] que contiene la aplicación de ejemplo:
    ```
    git clone https://github.com/DataDog/dd-database-monitoring-example
    ```

2. Cambia al directorio de `dd-database-monitoring-example`:
    ```
    cd dd-database-monitoring-example
    ```

3. Configura la variable de entorno `DD_API_KEY` con tu clave de API de Datadog:
    ```
    export DD_API_KEY=<API_KEY>
    ```

4. Inicia la aplicación:
    ```
    make postgres
    ```

El comando continuará ejecutándose hasta que lo detengas pulsando Ctrl + C.

## Identifica una consulta cara

¿Cuál es la consulta que más tiempo consume en la base de datos? Para averiguarlo, utiliza la vista Query Metrics (Métricas de consultas).

1. En la página [Monitorización de base de datos][6], haz clic en la pestaña **Query metrics** (Métricas de consultas) en la interfaz de usuario.

2. Ordena la tabla Normalized Query (Consulta normalizada) por **Percent time** (Porcentaje de tiempo) para ver a qué consulta dedica más tiempo de ejecución la base de datos.

   La consulta que consume más tiempo de la base de datos aparece en la primera línea:

   {{< img src="database_monitoring/dbm_qm_sort_time.png" alt="Consultas normalizadas ordenadas por porcentaje de tiempo" style="width:100%;">}}

## Soluciona los problemas de una consulta lenta

Además de identificar las consultas lentas, la monitorización de bases de datos de Datadog puede ayudarte a hacer un diagnóstico de ellas. Las acciones que lleva a cabo la base de datos para resolver esas consultas se describen en el plan explicativo (Explain Plan) de cada una. Si deseas ver un plan explicativo, haz clic en una muestra en la vista Query Samples (Muestras de consultas).

1. Navega hasta la vista Muestras de consulta dentro de la [Monitorización de base de datos][6] seleccionando la pestaña **Samples** (Muestras).

2. En el menú desplegable **In** (En), selecciona **Explain Plans** (Planes de explicación).

3. Ordena la tabla Normalized Query (Consulta normalizada) por **Duration** (Duración).

   {{< img src="database_monitoring/dbm_qs_explain_plan_duration.png" alt="Muestras de consultas normalizadas ordenadas por duración">}}

4. Busca una consulta en la tabla con datos en la columna **Explain Plan** (Plan de explicación) y haz clic en ella para abrir la página Detalles de la muestra. 

5. En **Explain Plan** (Plan de explicación), haz clic en **List View** (Vista de lista). Este Plan de explicación en la parte inferior de la página Muestra de plan de explicación indica que la consulta requiere un _Escaneo de índice_.

   {{< img src="database_monitoring/dbm_qs_explain_plan_list_view.png" alt="Plan de explicación de consulta que muestra el Escaneo de índice">}}

## Visualiza el estado y el rendimiento de las bases de datos

Para comprender el estado y el rendimiento de tus bases de datos de un solo vistazo, añade las métricas de la monitorización de bases de datos de Datadog a un dashboard.

### Visualiza los cambios en el volumen de consultas

Por ejemplo, si añades el widget **Change** (Cambios) para realizar el seguimiento de una métrica del count de consultas, podrás ver un cambio radical en el volumen de consultas de la última hora.

1. Selecciona **Dashboards > New Dashboard** (Dashboards > Nuevo dashboard) en la IU.

2. Introduce un nombre para tu dashboard. Luego, haz clic en el botón **New Dashboard** (Nuevo dashboard) para acceder al que acabas de crear.

2. Para añadir contenido a tu dashboard, haz clic en **Add Widgets** (Añadir widgets).

3. En el menú de widgets, selecciona **Change**.

4. Selecciona `postgresql.queries.count` en el menú desplegable **Metric** (Métrica). Esta métrica hace un recuento del número de consultas que se han enviado a una base de datos PostgreSQL.

5. Selecciona `host` en el menú desplegable **Break it down by* (Desglosar por) para que el widget agregue las consultas por host.

   {{< img src="database_monitoring/dashboard_change_postgres.png" alt="Configuración del widget Change para obtener la métrica de consultas de PostgreSQL" style="width:100%;">}}

7. Haz clic en el botón **Save** (Guardar). Tu nuevo widget aparecerá en el dashboard.

   {{< img src="database_monitoring/dashboard_change_widget.png" alt="Imagen del widget Change en la que se puede ver el count de consultas" style="width:100%;">}}

### Ver dashboards predefinidos

Observa la actividad actual de la base de datos, la utilización de los recursos y mucho más en los dashboards predefinidos que ofrece la monitorización de bases de datos de Datadog.

Para acceder a los dashboards, desde la página [Monitorización de base de datos][6], selecciona la pestaña **Dashboards** y elige el dashboard que desees ver.

Puedes clonar y modificar los dashboards predefinidos en función de tus necesidades.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases