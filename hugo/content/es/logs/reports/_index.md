---
title: Informes CSV programados
---
## Descripción general {#overview}

Los informes CSV programados le permiten recibir automáticamente exportaciones de datos estructurados y recurrentes a través de correo electrónico, Slack o Microsoft Teams. Esta función ayuda a las partes interesadas operativas, de cumplimiento y ejecutivas al entregar instantáneas periódicas de métricas clave sin necesidad de iniciar sesión en Datadog.

## Defina una consulta {#define-a-query}

Para programar un informe CSV, la consulta debe cumplir con las siguientes condiciones:

* La consulta debe crearse desde el [Log Explorer][1]  
* El resultado de la consulta se muestra como una {{< ui >}}List{{< /ui >}} o {{< ui >}}Table{{< /ui >}} (no se admiten otros tipos de visualización)  
* La consulta no es una consulta composite (sin [subqueries][2])
* La consulta no utiliza [campos calculados][3] o [tablas de referencia][4]
* El CSV está limitado a 50k filas

## Programar un informe CSV {#schedule-a-csv-report}

1. En el [Log Explorer][1], ejecute la consulta que desea exportar.
2. Encima de los resultados de la consulta, haga clic en la flecha hacia abajo junto a {{< ui >}}Download as CSV{{< /ui >}}, luego seleccione {{< ui >}}Schedule CSV Report{{< /ui >}}.

   <!-- TODO: recapture screenshot once the NEW badge is removed from Schedule CSV Report -->
   {{< img src="logs/reports/schedule_csv_report_menu.png" alt="La barra de herramientas de resultados del Log Explorer con el menú desplegable junto a Download as CSV expandido, mostrando las opciones Copy, Copy as cURL, Share event y Schedule CSV Report" style="width:80%;" >}}

3. En el modal de configuración que se abre, programe el informe para determinar cuándo y con qué frecuencia se envía el informe.  
4. Configure el informe: Defina el título del informe y establezca un marco de tiempo para determinar el rango de tiempo que se muestra en el informe resultante. El marco de tiempo del informe puede ser diferente del marco de tiempo que se muestra en el Log Explorer.  
5. Agregue destinatarios:
   1. {{< ui >}}Email recipients{{< /ui >}}: Para agregar destinatarios de correo electrónico a su informe, ingrese sus direcciones de correo electrónico. El correo electrónico asociado con su cuenta de Datadog se agrega automáticamente como destinatario. Puede eliminarse como destinatario colocando el cursor sobre su correo electrónico y haciendo clic en el icono de papelera que aparece junto a él.  
   2. {{< ui >}}Slack recipients{{< /ui >}}: Para agregar destinatarios de Slack, seleccione el espacio de trabajo y el canal de Slack en los menús desplegables disponibles. Si no ve ningún espacio de trabajo de Slack disponible, asegúrese de tener instalada la [Integración de Slack][5] de Datadog. Todos los canales públicos dentro del espacio de trabajo de Slack deberían aparecer automáticamente. Para seleccionar un canal privado de Slack, asegúrese de invitar al bot de Slack de Datadog al canal en Slack. Para enviar un mensaje de prueba a Slack, agregue un destinatario de canal y haga clic en {{< ui >}}Send Test Message{{< /ui >}}.
   3. {{< ui >}}Microsoft Teams recipients{{< /ui >}}: Seleccione la pestaña {{< ui >}}Microsoft Teams{{< /ui >}}, luego elija un {{< ui >}}Tenant{{< /ui >}}, {{< ui >}}Team{{< /ui >}} y {{< ui >}}Channel{{< /ui >}} de los menús desplegables disponibles. Asegúrese de que la [integración de Microsoft Teams][7] esté instalada en su organización de Datadog y que la aplicación de Datadog esté agregada al Team de destino en Microsoft Teams. Para enviar un mensaje de prueba, agregue un destinatario de canal y haga clic en {{< ui >}}Send Test Message{{< /ui >}}.

## Administración de informes {#managing-reports}

Para ver los informes CSV, navegue a [Log Explorer][1] y haga clic en la pestaña {{< ui >}}Reports{{< /ui >}}. 

**Nota**: Los informes no están vinculados a [Saved Views][6] y solo se puede acceder a ellos a través de la pestaña Informes. 

* Debe tener el permiso `CSV Report Schedules Write` para crear sus propios horarios de informes.
* Debe tener el permiso `CSV Report Schedules Manage` para modificar los horarios de informes de otros usuarios.

Una vez creado un informe, puede suscribirse, cancelar la suscripción, editar un horario y eliminar un informe, siempre que tenga los permisos adecuados. Si no tiene los permisos `CSV Report Schedules Write` o `CSV Report Schedules Manage`, puede cancelar la suscripción al informe directamente desde un correo electrónico.

## Vistas de informes {#reports-views}

| Vista de informe                         | Descripción                                                                     | Permiso requerido           |
| ----------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| {{< ui >}}Created by you{{< /ui >}} | Muestra todos los informes CSV programados que ha creado desde Log Explorer              | `CSV Report Schedules Write`  |
| {{< ui >}}All Reports{{< /ui >}}    | Muestra todos los informes CSV programados en Log Explorer para la organización en la que se encuentra | `CSV Report Schedules Manage` |
| {{< ui >}}Subscribed{{< /ui >}}     | Muestra todos los informes CSV programados a los que está suscrito                      | `CSV Report Schedules Write`  |

[1]: https://app.datadoghq.com/logs
[2]: /es/logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /es/logs/explorer/calculated_fields/
[4]: /es/reference_tables/?tab=manualupload
[5]: /es/integrations/slack/?tab=datadogforslack
[6]: /es/logs/explorer/saved_views/#saved-views
[7]: /es/integrations/microsoft_teams/