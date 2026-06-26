---
title: Informes CSV programados
---

{{< callout url="#" btn_hidden="true" header="false">}}  
Los informes CSV programados están en vista previa.  
{{< /callout >}}

## Información general

Los informes CSV programados te permiten recibir automáticamente exportaciones de datos recurrentes y estructurados por correo electrónico o Slack. Esta función ayuda a las partes interesadas operativas, ejecutivas y de cumplimiento a obtener instantáneas periódicas de las métricas clave, sin necesidad de acceder a log en la plataforma Datadog.

## Definir una consulta

Para programar un Informe CSV, la consulta debes cumplir las siguientes condiciones:

* La consulta debe crearse desde el [Explorer de logs][1]  
* El resultado de la consulta se muestra como una **Lista** (no como una Tabla ni otro tipo de visualización)  
* La consulta no es una consulta composite (compuesto) (sin [subconsultas][2])  
* "Agrupar en" (campos/patrones/transacciones) no está seleccionado  
* La consulta no utiliza [campos calculados][3] ni [Tablas de referencia][4].
* El CSV está limitado a 50.000 filas

## Programar un informe CSV

1. Haz clic en **Más...**.  
2. Selecciona **Programar Informe CSV**.
3. En el modal de configuración que se abre, configura un schedule (horario) para el informe para determinar cuándo y con qué frecuencia se envía el informe.  
4. Configura el informe: Define el título del informe y establece un período de tiempo para determinar el intervalo de tiempo mostrado en el informe resultante. El intervalo de tiempo del informe puede ser diferente del intervalo de tiempo mostrado en el cuadro de dashboard.
5. Añadir destinatarios  
   1. **Destinatarios de correo electrónico**: Para añadir destinatarios de correo electrónico a tu informe, introduce tus direcciones de correo electrónico. El correo electrónico asociado a tu cuenta de Datadog se añade automáticamente como destinatario. Puedes eliminarte a ti mismo como destinatario pasando el ratón por encima de tu correo electrónico y haciendo clic en el icono de la papelera de reciclaje que aparece junto a él.  
   2. **Destinatarios de Slack**: Para añadir destinatarios de Slack, selecciona el espacio de trabajo y el canal de Slack en los desplegables disponibles. Si no ves ningún espacio de trabajo de Slack disponible, asegúrate de tener instalado Datadog [Integration de Slack][5]. Todos los canales públicos del espacio de trabajo de Slack deberían aparecer automáticamente en la lista. Para seleccionar un canal privado de Slack, asegúrate de invitar al bot de Slack Datadog al canal en Slack. Para enviar un mensaje test a Slack, añade un destinatario al canal y haz clic en **Enviar mensaje test **.

## Gestionar informes

Para ver los informes CSV, ve a [Explorer de logs][1] y haz clic en la pestaña **Informes**. 

**Nota**: Los informes no están vinculados a [Vistas guardadas][6] y sólo se puede acceder a ellos a través de la pestaña Informes. 

* Debes tener el permiso **Escritura de informes de logs** para crear tus propias programaciones de informes.
* Debes tener el permiso **Gestión de informes de logs** para modificar la programación de informes de otros usuarios.

Una vez creado un informe, puedes suscribirte, darte de baja, editar un schedule (horario) y eliminar un informe siempre que dispongas de los permisos adecuados. Si no dispones de los permisos **Escritura de informes de logs** o **Gestión de informes de logs**, puedes darte de baja del informe directamente desde un correo electrónico

## Vistas de los informes

| Vista de informe | Descripción | Permiso necesario |
| ----- | ----- | ----- |
| Creado por ti | Muestra todos los informes CSV programados que has creado desde Explorer de logs | Escritura de informes de logs |
| Todos los informes | Muestra todos los informes CSV programados en Explorer de logs para la organización en la que te encuentras. | Gestión de informes de logs |
| Suscrito | Muestra todos los informes CSV programados a los que estás suscrito | Escritura de informes de logs |

[1]: https://app.datadoghq.com/logs
[2]: /es/logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /es/logs/explorer/calculated_fields/
[4]: /es/reference_tables/?tab=manualupload
[5]: /es/integrations/slack/?tab=datadogforslack
[6]: /es/logs/explorer/saved_views/#saved-views