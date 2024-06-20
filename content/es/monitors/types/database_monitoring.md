---
kind: Documentation
title: Monitores para la monitorización de bases de datos
---


## Información general

Con el tipo de monitor [para la monitorización de bases de datos (DBM)][1] puedes crear monitores y alertas para los datos que aparecen en DBM. Estos monitores pueden configurarse para avisarte cuándo un tipo de evento de DBM se desvía de un umbral predefinido durante un periodo de tiempo determinado.

Algunos escenarios de monitorización frecuentes incluyen
- [Número de consultas en espera](#number-of-waiting-queries)
- [Número de consultas que superan una duración determinada](#queries-exceeding-30-seconds)
- [Cambios significativos en el coste del explain plan](#change-in-explain-plan-cost)

Para obtener instrucciones paso a paso, consulta [Ejemplos de monitores](#example-monitors).

## Creación de un monitor

Para crear un nuevo monitor para DBM en Datadog, navega a [**Monitors** > **New Monitor** > **Database Monitoring** (Monitores > Nuevo monitor > Monitorización de bases de datos)][2] en la interfaz de usuario.

<div class="alert alert-info"><strong>Nota</strong>: Existe un límite predeterminado de 1000 monitores para DBM por cada cuenta. Si estás por alcanzar este límite, considera la posibilidad de utilizar <a href="/monitors/configuration/?tab=thresholdalert#multi-alert">alertas múltiples</a> o <a href="/help/">ponte en contacto con el servicio de asistencia</a> para aumentar este límite en tu cuenta.</div>

## Definir la consulta de búsqueda

Nota: A medida que cambia tu consulta, el gráfico situado arriba de la barra de búsqueda se actualiza.

### Tipos comunes de monitores

Si no quieres [crear tu monitor desde cero](#creating-monitors-from-scratch), puedes utilizar uno de los siguientes tipos de monitores predefinidos:
- Consultas en espera
- Consultas de ejecución prolongada

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="Ejemplo de monitores OOTB relacionados con consultas en espera y consultas de ejecución prolongada" style="width:80%;" >}}

Si tienes comentarios sobre estos tipos de monitores existentes y otros que te gustaría, ver debes compartirlos con tu asesor de clientes o con el [equipo de asistencia][9].

### Creación de monitors desde cero

1. Determina si quieres monitorizar **Ejemplos de consultas** o **Explain Plans** y selecciona la opción correspondiente en el menú desplegable.

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="Menú desplegable que muestra las diferentes fuentes de datos disponibles para monitores de monitorización de bases de datos" style="width:80%;" >}}

2. Crea una consulta de búsqueda utilizando la misma lógica que en la actividad <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">Ejemplos de consultas para DBM</a> y el explorador de explain plans. Esto significa que debes seleccionar una o más **facetas** para incluir en la barra de búsqueda. Por ejemplo, si quisieras crear alertas sobre las consultas en espera ejecutadas por el usuario `postgresadmin`, tu barra de búsqueda tendría el siguiente aspecto:

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="Ejemplo de consulta de búsqueda que contiene dos facetas en la barra de búsqueda" style="width:80%;" >}}

Nota: Monitor en el que configuras alertas sobre el **recuento de valores únicos** de las facetas.

3. También tienes la opción de agrupar eventos de DBM según múltiples dimensiones. Todos los eventos de DBM que coinciden con la consulta se agrupan en función de los valores de hasta **cinco facetas**. Con la funcionalidad Agrupar por, también tienes la posibilidad de configurar la **estrategia de agrupación de alertas**:
    * **Alertas simples**: Las alertas simples agregan todas las fuentes de información, de modo que una alerta se activa cuando uno o varios valores de grupo superan el umbral. Puedes utilizar esta estrategia para reducir el ruido de notificación.
    * **Alertas múltiples**: Las alertas múltiples aplican la alerta a cada fuente en función de tus parámetros de grupo, lo que significa que se genera un evento de alerta para cada grupo que cumple las condiciones establecidas. Por ejemplo, puedes agrupar una consulta por `@db.user` y seleccionar el tipo de agregación de alertas múltiples para recibir una alerta independiente por cada usuario de la base de datos que activa la alerta tal y como la has definido.

### Definir condiciones de alerta

1. Configura una alerta para que se active siempre que el resultado de una consulta sea `above`, `above or equal to`, `below` o `below or equal to` a un umbral que definas. Para ayudarte a configurar las opciones de esta vista, consulta [Configuración de monitores][5].
2. Determina el comportamiento deseado para cuando falten datos durante 5 minutos, por ejemplo, `evaluate as zero`, `show NO DATA`, `show NO DATA and notify` o `show OK`.

#### Alertas en escenarios sin datos y por debajo del umbral

Para recibir un notificación cuando una aplicación deja de enviar eventos de DBM, establece la condición en `below 1`. Esto notifica cuando ningún evento de DBM coincide con la consulta del monitor en un periodo de tiempo determinado en todos los grupos agregados.

Cuando se divide un monitor por cualquier dimensión (etiqueta o faceta) y se utiliza una condición `below`, la alerta se activa **si y sólo si**:
1. Existen eventos de DBM para un grupo determinado, pero el recuento está por debajo del umbral.
2. No existen eventos de DBM para ninguno de los grupos.

#### Condiciones de alerta avanzadas

Para obtener más información sobre las opciones avanzadas de alerta, como el retraso de la evaluación, consulta [Configuración de monitores][6].

### Notificaciones
Para obtener más información sobre la sección **Configurar notificaciones y automatizaciones**, consulta [Notificaciones][4].

## Ejemplos de monitores

### Número de consultas en espera

Este monitor detecta si el número de consultas en espera ha superado un umbral determinado.

{{< img src="database_monitoring/dbm_event_monitor/waiting_queries_monitor.png" alt="Consulta de métricas configuradas para monitorizar el número de consultas de bases de datos en espera" style="width:80%;" >}}

#### Crear la consulta de monitorización 

1. En Datadog, ve a [**Monitors > New Monitor > Database Monitoring** (Monitores > Nuevo monitor > Monitorización de bases de datos)][2].
1. En el cuadro **Common monitor types** (Tipos comunes de monitores), haz clic en **Waiting Queries** (Consultas en espera). 

#### Establecer el umbral de alerta

1. Para contextualizar el rango de valores típicos, configura el marco temporal en **Último mes**, utilizando el menú desplegable de la parte superior del gráfico.
1. Introduce el valor de umbral de alerta deseado en el cuadro **Alert threshold** (Umbral de alerta). Por ejemplo, si el número de consultas en espera se mantiene por debajo de `3000` en el gráfico, podrías configurar **Alert threshold** (Umbral de alerta) en `4000` para representar una actividad inusual. Para obtener más detalles sobre configuración, consulta [Establecer condiciones de alerta][6] y [Condiciones de alerta avanzadas][3].
1. Utiliza la zona sombreada en rojo del gráfico para comprobar que tu alerta no se activa con demasiada frecuencia o con muy poca frecuencia, y ajusta el valor del umbral según sea necesario.

#### Configurar notificaciones

1. En **Configurar notificaciones y automatizaciones**, escribe el mensaje de notificación. Para obtener instrucciones detalladas, consulta [Notificaciones][4]. Puedes utilizar el siguiente texto para el cuerpo del mensaje:
{{< code-block lang="text" >}}
{{#is_alert}}
Las consultas en espera en {{host.name}} han superado {{threshold}}
con un valor de {{value}}.
{{/is_alert}}

{{#is_recovery}}
El número de consultas en espera en {{host.name}}, que han superado {{threshold}},
se han recuperado.
{{/is_recovery}}
{{< /code-block >}}
1. Añádete a los destinatarios de notificaciones escribiendo y luego seleccionando tu nombre en el cuadro **Notify your services and your team members** (Notificar a tus servicios y a los miembros de tu equipo).

#### Verificar y guardar el monitor

1. Para verificar la configuración del monitor, haz clic en **Test Notifications** (Probar notificaciones). Activa una alerta de test seleccionando **Alert** (Alerta) y luego haz clic en **Run Test** (Ejecutar test).
1. Haz clic en **Create** (Crear) para guardar el monitor.

### Consultas superiores a 30 segundos

Este monitor detecta si el número de consultas de larga duración han superado un umbral determinado.

{{< img src="database_monitoring/dbm_event_monitor/long_running_queries_monitor.png" alt="Consulta de métricas configuradas para monitorizar el número de consultas de bases de datos de larga duración" style="width:80%;" >}}

#### Crear la consulta de monitorización 

1. En Datadog, ve a [**Monitors > New Monitor > Database Monitoring** (Monitores > Nuevo monitor > Monitorización de bases de datos)][2].
1. En el cuadro **Common monitor types** (Tipos comunes de monitores), haz clic en **Long Running Queries** (Consultas de larga duración). 
1. Actualiza el filtro de consulta a **Duration:>30s** (Duración>30s).

#### Configurar el umbral de alerta

1. Para contextualizar el rango de valores típicos, configura el marco temporal en **Último mes**, utilizando el menú desplegable de la parte superior del gráfico.
1. Introduce el valor de umbral de alerta deseado en el cuadro **Alert threshold** (Umbral de alerta). Por ejemplo, si el valor se mantiene por debajo de `2000` en el gráfico, podrías configurar **Alert threshold** (Umbral de alerta) en `2500` para representar una actividad inusual. Para obtener más detalles sobre configuración, consulta [Establecer condiciones de alerta][6] y [Condiciones de alerta avanzadas][3].
1. Utiliza la zona sombreada en rojo del gráfico para comprobar que tu alerta no se activa con demasiada frecuencia o con muy poca frecuencia, y ajusta el valor del umbral según sea necesario.

#### Configurar notificaciones

1. En **Configurar notificaciones y automatizaciones**, escribe el mensaje de notificación. Para obtener instrucciones detalladas, consulta [Notificaciones][4]. Puedes utilizar el siguiente texto para el cuerpo del mensaje:
{{< code-block lang="text" >}}
{{#is_alert}}
El número de consultas con una duración de >30s han superado
{{threshold}} en {{host.name}} con un valor de {{value}}.
{{/is_alert}}

{{#is_recovery}}
El número de consultas con una duración de >30s en {{host.name}}, 
que han superado {{umbral}}, se han recuperado.
{{/is_recovery}}
{{< /code-block >}}
1. Añádete a los destinatarios de notificaciones escribiendo y luego seleccionando tu nombre en el cuadro **Notify your services and your team members** (Notificar a tus servicios y a los miembros de tu equipo).

#### Verificar y guardar el monitor

1. Para verificar la configuración del monitor, haz clic en **Test Notifications** (Probar notificaciones). Activa una alerta de test seleccionando **Alert** (Alerta) y luego haz clic en **Run Test** (Ejecutar test).
1. Haz clic en **Create** (Crear) para guardar el monitor.

### Cambio del coste del explain plan

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_cost_monitor.png" alt="Monitor configurado para realizar un seguimiento de los cambios en el promedio de costes diarios del explain plan" style="width:80%;" >}}

Este monitor detecta un cambio significativo en el promedio de costes diarios del explain plan comparando los resultados de dos consultas:

- La consulta **a** refleja el coste actual del explain plan
- La consulta **b** refleja el coste del explain plan de una semana atrás

Esto permite, por ejemplo, comparar dos lunes consecutivos.

Con pequeños cambios, el monitor puede reflejar promedios horarios, medir la diferencia entre hoy y ayer, agrupar por firma de consulta en lugar de host, etc.

#### Crear la primera consulta de monitorización 

1. En Datadog, ve a [**Monitors > New Monitor > Database Monitoring** (Monitores > Nuevo monitor > Monitorización de bases de datos)][2].
1. En **Define the search query** (Definir la consulta de búsqueda), realiza las siguientes actualizaciones:
    - Sustituye **Query Samples** (Ejemplos de consulta) por **Explain plans**.
    - Sustituye __*__ por **Explain Plan Cost (@db.plan.cost)** (Explicar coste del plan (@db.plan.cost)). Al escribir "cost" (coste) en el campo se rellenan las opciones de auto-completar.
    - Sustituye **(todo)** por **Host (host)**.
1. Pulsa el botón **∑** y escribe **rollup** para rellenar las sugerencias de auto-completar. Elige **moving_rollup**. 

#### Crear la segunda consulta de monitorización 

1. Haz clic en **Add Query** (Añadir consulta) para crear la consulta **b**, una copia de la consulta **a**.
1. Sustituye **a + b** por **a - b**. Dado que las dos consultas son temporalmente idénticas, este valor aparece en el gráfico como 0.
1. En la consulta **b**, haz clic en el botón **∑** y elige **Timeshift > Week before** (Cambio de horario > Semana anterior). Esto configura el monitor para detectar cambios significativos entre la semana anterior y la actual.

#### Configurar el umbral de alerta

1. En el menú desplegable de la parte superior del gráfico, amplía el marco temporal a **Último mes** para conocer la variación típica de los costes de una semana a otra.
1. Introduce el valor de umbral de alerta deseado en el cuadro **Alert threshold** (Umbral de alerta). Por ejemplo, si la diferencia entre los costes del explain plan se mantiene por debajo de `8000` en el gráfico, podrías configurar **Alert threshold** (Umbral de alerta) en `9000` para representar una actividad inusual. Para obtener más detalles sobre configuración, consulta [Establecer condiciones de alerta][6] y [Condiciones de alerta avanzadas][3].
1. Utiliza la zona sombreada en rojo del gráfico para comprobar que tu alerta no se activa con demasiada frecuencia o con muy poca frecuencia, y ajusta el valor del umbral según sea necesario.

#### Configurar notificaciones

1. En **Configurar notificaciones y automatizaciones**, escribe el mensaje de notificación. Para obtener instrucciones detalladas, consulta [Notificaciones][4]. Puedes utilizar el siguiente texto para el cuerpo del mensaje:
{{< code-block lang="text" >}}
{{#is_alert}}
El promedio de coste diario del explain plan en {{host.name}} ha aumentado al menos {{umbral}}. 
con respecto a la semana anterior, con un valor de {{value}}.
{{/is_alert}}

{{#is_recovery}}
El promedio de coste diario del explain plan en {{host.name}} se ha recuperado hasta situarse dentro de {{umbral}}
del coste de este día la semana pasada.
{{/is_recovery}}
{{< /code-block >}}
1. Añádete a los destinatarios de notificaciones escribiendo y luego seleccionando tu nombre en el cuadro **Notify your services and your team members** (Notificar a tus servicios y a los miembros de tu equipo).

#### Verificar y guardar el monitor

1. Para verificar la configuración del monitor, haz clic en **Test Notifications** (Probar notificaciones). Activa una alerta de test seleccionando **Alert** (Alerta) y luego haz clic en **Run Test** (Ejecutar test).
1. Haz clic en **Create** (Crear) para guardar el monitor.


[1]: /es/database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/database-monitoring
[3]: /es/monitors/create/configuration/#advanced-alert-conditions
[4]: /es/monitors/notify/
[5]: /es/monitors/configuration/?tab=thresholdalert#thresholds
[6]: /es/monitors/configuration/?tab=thresholdalert#set-alert-conditions
[7]: /es/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[8]: https://app.datadoghq.com/databases/list
[9]: /es/help/