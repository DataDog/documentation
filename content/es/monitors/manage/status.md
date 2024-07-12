---
aliases:
- /es/monitors/monitor_status/
description: Ver una descripción general del estado de tu monitor a lo largo del tiempo
further_reading:
- link: /monitors/
  tag: Documentación
  text: Crear Monitors
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de los monitores
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar los monitores
title: Estado de Monitor
---

## Información general

Después de [crear tu monitor][1], utiliza la página de estado del monitor para ver su estado a lo largo del tiempo.

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="monitor status page" (Página de estado del monitor) >}}

## Encabezado

El encabezado contiene el estado del monitor, la hora del estado y el título de monitor. A la derecha están los botones **Mute** (Silenciar), **Resolve** (Resolve) y los botones de configuración con el engranaje.

### Silenciar

Utiliza el primer botón mencionado más arriba para silenciar todo el monitor o silenciarlo parcialmente estableciendo un **contexto**. Los contextos disponibles se basan en las etiquetas (tags) de grupo del monitor. Consulta [Tiempos de inactividad][2] para obtener más información sobre cómo silenciar varios contextos o monitores al mismo tiempo.

**Nota**: Al silenciar o anular el silenciamiento de un monitor con la interfaz de usuario se borran todos los tiempos de inactividad programados para ese monitor.

### Resolver

Si tu monitor se encuentra en estado de alerta, el botón **Resolve** estará visible. Utiliza este botón para resolver tu monitor manualmente.

La función `resolve` del monitor cambia artificialmente el estado del monitor a `OK` para su siguiente evaluación. Esta se realiza normalmente sobre los datos en los que se basa el monitor.

Si un monitor emite una alerta porque sus datos actuales corresponden al estado `ALERT`, `resolve` hace que el monitor siga el cambio de estado `ALERT -> OK -> ALERT`. Por lo tanto, el uso de `resolve` no es apropiado para acusar recibo de la alerta o para indicar a Datadog que ignore la alerta.

Resolver manualmente un monitor es apropiado para casos en los que los datos se comunican de forma intermitente. Por ejemplo, después de activar una alerta, el monitor no recibe más datos, por lo que ya no puede evaluar las condiciones de alertas y recuperar el estado `OK`. En ese caso, la función `resolve` o la función`Automatically resolve monitor after X hours` vuelve a cambiar el monitor a un estado `OK`.

**Caso de uso típico**: monitor basado en métricas de errores que no se generan cuando no hay errores (`aws.elb.httpcode_elb_5xx` o cualquier contador DogStatsD en tu código informando sobre un error _sólo cuando hay un error_).

### Crear una incidencia
Crea un incidente a partir de un monitor seleccionando **Declare incident** (Declarar incidente). Configura el modal emergente de esta función con el nivel de gravedad, las notificaciones, y las notas adicionales. Para obtener más información, consulta la documentación en [Gestión de incidentes][3].

### Ajustes

Haz clic en el botón con el engranaje de configuración para ver las opciones disponibles:

| Opción | Descripción                                                                                                                                                                                                    |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Editar   | Edita el monitor actual. Consulta los detalles en la sección [Configurar monitores][1].                                                                                                                                            |
| Clonar  | Haz una copia del monitor actual.                                                                                                                                                                            |
| Exportar | Exporta la configuración JSON para el monitor actual. Esta opción también está disponible cuando [creas tu monitor][1]. Si gestionar monitores mediante programación, define un monitor en la interfaz de usuario y exporta el JSON. |
| Eliminar | Elimina el monitor actual. Se te pedirá que confirmes la eliminación.                                                                                                                                      |

## Propiedades

La sección de propiedades contiene la información general de:

| Propiedad     | Descripción                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| Estado       | Alerta, Advertencia, Sin datos u OK, de tu monitor                                                           |
| Tipo         | Obtén más información sobre los [tipos de monitores][4].                                                  |
| ID           | Se utiliza para la [API de monitor][5].                                                        |
| Fecha de creación | Fecha en la que se creó el monitor.                                                     |
| Autor       | Persona que creó el monitor.                                                   |
| Etiquetas         | Etiquetas adjuntas a nivel de monitor. Edita las etiquetas haciendo clic en el icono del lápiz. |
| Consulta        | Obtén más información sobre las [consultas][6].                                                       |
| Mensaje      | Mensaje especificado en la sección de [notificaciones][7] del monitor.                |

## Estado e historial

La sección de estado e historial muestra la consulta y los cambios de estado de tu monitor a lo largo del tiempo. Para filtrar la información, utiliza el cuadro de búsqueda, los estados y el selector de tiempo situados arriba de la sección.

### Estado

El gráfico de estado muestra el estado de tu monitor a lo largo del tiempo, desglosado por grupos. **Nota**: Si ves `None` o `no groups found`, puede darse una de las siguientes situaciones:

* El monitor ha sido creado recientemente y aún no ha sido evaluado.
* La consulta de monitor ha sido modificada recientemente.
* El intervalo de tiempo del monitor es demasiado corto para una métrica que proporciona datos con poca frecuencia.
* El nombre de un host incluido previamente en la consulta ha cambiado. Los cambios de nombre de host desaparecen de la interfaz de usuario al cabo de 2 horas.
* La consulta por la que está filtrando no funciona como se esperaba.

El gráfico de estado te muestra las dimensiones que has configurado para tus alertas, no las dimensiones de la consulta de tu monitor. Por ejemplo: la consulta de tu monitor está agrupada por `service` y `host`, pero sólo quieres recibir alertas de `service`. El gráfico de estado muestra el estado del monitor agrupado por `service`. Puedes ver los subgrupos de `host` haciendo clic en **View all** (Ver todo), lo que abre un panel que muestra los gráficos de estado de cada subgrupo. Para obtener más información sobre agrupaciones de alertas, consulta [Configurar monitores][14].

{{< img src="monitors/monitor_status/monitor_status_group_subgroup.png" alt="Monitor status grouped by service, highlighting option to view subgroups" (Estado de monitor agrupado por servicio, con la opción para ver subgrupos resaltada) style="width:100%;" >}}

#### Filtrar el estado del monitor por grupos o eventos

Para delimitar el contexto de la vista **Status & History** (Estado e historial) a grupos específicos, utiliza el campo de filtro e introduce los atributos que quieres filtrar. La sintaxis del filtro de grupo sigue los mismos principios de la [consulta de búsqueda del monitor][30]. Las siguientes son algunas prácticas recomendadas a seguir:

- Los filtros distinguen entre mayúsculas y minúsculas, `env:prod` y `env:Prod` no devuelven los mismos grupos de monitores. Datadog recomienda practicar la uniformidad en las etiquetas. Para obtener más información, consulta [Empezando con las etiquetas][31]. 
- Las consultas añaden automáticamente un comodín. Para aplicar filtros específicos, encierra tu consulta con comillas dobles (`"`).
  Por ejemplo, considera la siguiente consulta que no utiliza comillas dobles:
  ```
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-1
  ```
  El monitor devuelve los grupos de seguimiento aunque esperas que la consulta muestre un grupo específico.
  ```
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-10
  availability-zone:us-central1-a,instance-type:*,name:gke-demo-12
  ```

  Al encerrar la consulta con comillas dobles se obtiene el grupo esperado: 
  `"availability-zone:us-central1-a,instance-type:*,name:gke-demo-1"`

#### Investigar un monitor en un notebook

Para investigar más a fondo la evolución de tus métricas, haz clic en **Open in a notebook** (Abrir en un notebook), junto al gráfico de estado. Esto genera un [notebook][8] de investigación con un gráfico formateado de la consulta del monitor.

{{< img src="monitors/monitor_status/notebook-button2.png" alt="Open in notebook button" (Botón "Abrir en notebook") style="width:90%;">}}

El notebook coincide con el intervalo de tiempo del periodo de evaluación del monitor e incluye logs relacionados, cuando es pertinente.

#### Realizar un seguimiento de la retención de grupos de monitores

Datadog mantiene los grupos de monitores disponibles en la interfaz de usuario durante 24 horas, a menos que se modifique la consulta. Los monitores de host y los checks de servicios que están configurados para notificar sobre datos faltantes están disponibles durante 48 horas. Cuando un gráfico de monitor muestra una línea de puntos y está marcado como que ha dejado de informar, esto puede deberse a las siguientes razones:

- El nuevo grupo se evalúa algún tiempo después de la creación del monitor. El gráfico de evaluación muestra la línea de puntos desde el inicio del periodo de tiempo hasta que se evalúa el grupo por primera vez.
- El grupo deja de informar, se retira y vuelve a informar. La línea de puntos aparece desde el momento en que el grupo se ha retirado hasta que empieza a evaluar de nuevo.

{{< img src="monitors/monitor_status/dotted-line.png" alt="Follow group retention" (Realizar un seguimiento de la retención de grupos) style="width:90%;">}}

**Nota**: Dejar de informar no es lo mismo que no tener datos. El estado de dejar de informar es específico de los grupos.

### Historial

El gráfico del historial muestra los datos recopilados alineados con el gráfico de estado. Muestra los puntos de datos sin procesar que se envían para la consulta de métricas en el monitor. La página de estado del monitor utiliza el mismo widget de gráfico de series temporales que se utiliza en notebooks y dashboards.

### Gráfico de evaluación

El gráfico de evaluación es específico del monitor. Utiliza la misma lógica de consulta que el gráfico del historial, pero está limitado al intervalo de tiempo del gráfico del historial. Tiene una ventana fija y ampliada que corresponde a la [ventana de evaluación][9] de tu monitor para garantizar que los puntos mostrados se agregan correctamente. Por ejemplo, si el monitor está configurado para evaluar el promedio de consultas de los últimos 15 minutos, cada punto de datos del gráfico de evaluación muestra el valor de agregado de la métrica de la ventana de evaluación de los 15 minutos anteriores.

Este gráfico muestra los resultados de los puntos de datos sin procesar de una métrica aplicada con respecto a las condiciones de evaluación que has configurado para el monitor. Esta visualización es diferente del gráfico del historial porque muestra el valor de los datos después de haber pasado por la consulta del monitor. 

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="status monitor history" (Historial del monitor de estado) video="true" width="100%" >}}

## Eventos

Los eventos generados por tu monitor (alertas, advertencias, recuperaciones, etc.) se muestran en esta sección en función del selector de tiempo situado arriba de la sección **Estado e historial**. Los eventos también se muestran en tu [Explorador de eventos][10].

### Traza de auditoría
Audit Trail captura automáticamente los cambios en el monitor en todos los tipos de monitores y crea un evento. Este evento documenta los cambios en el monitor.

Por ejemplo, en el caso de una edición de monitor, el evento de Audit Trail muestra:
 - La configuración de monitor anterior
 - La configuración de monitor actual
 - El usuario que ha realizado el cambio

 Para obtener más información, consulta la documentación de [Audit Trail][11] y lee el blog de [prácticas recomendadas para Audit Trail][12].

Datadog también proporciona una opción de notificación de los cambios en los monitores que creas. En la parte inferior del editor de monitores, en **Definir permisos y auditar notificaciones**, selecciona **Notify** (Notificar), en el menú desplegable junto a: **If this monitor is modified, notify monitor creator and alert recipients.* (Si se modifica este monitor, notificar al creador del monitor y alertar a los destinatarios.*).

La configuración de notificación envía un correo electrónico con el evento de auditoría del monitor a todas las personas alertadas en el monitor específico, así como también al creador del monitor. El evento de auditoría del monitor también aparece en el [Explorador de eventos][10].

## Exportar e importar

Puedes realizar una exportación JSON de cualquier monitor desde la página de estado del monitor. Haz clic en el botón de configuración con el engranaje (arriba a la derecha) y selecciona **Export** (Exportar) en el menú.

[Importa un monitor][13] a Datadog con JSON utilizando la navegación principal: *Monitors --> New Monitor --> Import* (Monitores --> Nuevo monitor --> Importar)

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/monitors/configuration/
[2]: /es/monitors/downtimes/
[3]: /es/service_management/incident_management/#from-a-monitor
[4]: /es/monitors/types/
[5]: /es/api/v1/monitors/
[6]: /es/dashboards/querying/
[7]: /es/monitors/notify/
[8]: /es/notebooks
[9]: /es/monitors/configuration/?tab=thresholdalert#evaluation-window
[10]: https://app.datadoghq.com/event/explorer
[11]: /es/account_management/audit_trail/
[12]: https://www.datadoghq.com/blog/audit-trail-best-practices/
[13]: https://app.datadoghq.com/monitors#create/import
[14]: /es/monitors/configuration/?tab=thresholdalert#notification-aggregation
[30]: /es/monitors/manage/search/#query
[31]: /es/getting_started/tagging/