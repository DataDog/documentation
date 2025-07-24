---
aliases:
- /es/dashboards/reporting/
- /es/dashboards/scheduled_reports/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Compartir dashboards de Datadog de forma segura con cualquiera persona
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Usa variables de plantilla asociadas para redefinir tus dashboards
title: Informes programados
---

## Información general

Los informes programados permiten a los usuarios de Datadog compartir dashboards como PDF de alta densidad de forma periódica.

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="Ejemplo de PDF de informe adjunto" style="width:90%;" >}}

El PDF del informe puede enviarse a canales de Slack o a direcciones de correo electrónico.

{{< img src="dashboards/scheduled_reports/report_slack.png" alt="Ejemplo de informe por Slack con el informe de PDF vinculado" style="width:90%;" >}}

En el caso de los correos electrónicos, el PDF del informe se incluye como archivo adjunto o como enlace, en función de su tamaño.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="Ejemplo de correo electrónico de informe con el adjunto de PDF" style="width:90%;" >}}

## Programar un informe

Crea un informe a partir de cualquier [dashboard o timeboard][1] que tenga al menos un [widget compatible](#unsupported-widget-types).

Haz clic en el botón **Share** (Compartir) situado en la parte superior del dashboard y selecciona **Schedule report** (Programar informe).

### 1. Establecer un cronograma

En el modal de configuración que se abre, establece un cronograma para el informe para determinar cuándo y con qué frecuencia se envía el informe.

**{{< img src="dashboards/scheduled_reports/set_schedule.png" alt="Sección para definir un cronograma de informe. Incluye una tabla de vista previa de cronograma que muestra las siguientes 5 fechas de informes programados." style="width:90%;" >}}**

### 2. Configurar informe

Define el título del informe y establece un marco temporal para determinar el intervalo de tiempo mostrado en el informe resultante. El intervalo de tiempo del informe puede ser diferente del intervalo de tiempo mostrado en el dashboard.

**Nota:** Modificar el intervalo temporal del informe actualiza la tabla desplegable **Vista previa de la programación** anterior.

**{{< img src="dashboards/scheduled_reports/configure_report.png" alt="Sección para definir un cronograma de informe" style="width:90%;" >}}**

Haz clic en **Edit Variables** (Editar variables) para modificar los filtros aplicados al enviar el informe. Estos valores no afectan a los valores por defecto de las variables de la plantilla del dashboard.

**{{< img src="dashboards/scheduled_reports/edit_variables.png" alt="La sección del modal de configuración para personalizar el título del informe, el intervalo temporal y las variables." style="width:90%;" >}}**

### 3. Añadir destinatarios

#### Destinatarios de correo electrónico

Para añadir destinatarios de correo electrónico a tu informe, introduce tus direcciones de correo electrónico. El correo electrónico asociado a tu cuenta de Datadog se añade automáticamente como destinatario. Puedes eliminarte a ti mismo como destinatario pasando el ratón por encima de tu correo electrónico y haciendo clic en el icono de la papelera que aparece junto a él.

**Nota:** Las cuentas Enterprise y Pro pueden enviar informes a destinatarios fuera de sus organizaciones.

**{{< img src="dashboards/scheduled_reports/add_email_recipients.png" alt="El modal de configuración para editar las variables de informe." style="width:90%;" >}}**

Para ver el informe antes de guardar la programación, haz clic en **Send Test Email** (Enviar correo de test). Puedes pausar la programación de un informe en cualquier momento.

#### Destinatarios de Slack

Para añadir destinatarios de Slack, selecciona el espacio de trabajo y el canal de Slack en los menús desplegables disponibles. Si no ves ningún espacio de trabajo de Slack disponible, asegúrate de que tienes instalada la [integración de Datadog y Slack][8]. Todos los canales públicos del espacio de trabajo de Slack deberían aparecer automáticamente en la lista. Para seleccionar un canal privado de Slack, asegúrate de invitar al bot de Datadog Slack al canal en Slack. Para enviar un mensaje de test a Slack, añade un destinatario al canal y haz clic en **Send Test Message** (Enviar mensaje de test).

**{{< img src="dashboards/scheduled_reports/add_slack_recipients.png" alt="El modal de configuración para editar los destinatarios de correo electrónico de informe programado." style="width:90%;" >}}**

## Gestionar informes

Un único dashboard puede tener múltiples informes programados con diferentes configuraciones, lo que permite informar a diferentes grupos de partes interesadas en el mismo dashboard. Para ver los informes de un dashboard existente, haz clic en el botón **Share** (Compartir) y selecciona **Configure Reports** (Configurar informes).

Desde el modal de configuración que aparece, puedes pausar un informe existente o crear uno nuevo. Para consultar y editar los datos de un informe existente, o eliminarlo, haz clic en **Edit** (Editar).

{{< img src="dashboards/scheduled_reports/manage_reports-2.png" alt="Modal de configuración de los informes programados, en el que se muestran dos informes, cada uno con sus títulos, etiquetas, destinatarios, frecuencia, una opción para activar o desactivar el informe y un botón para editar el informe. En la parte inferior hay un botón para añadir un nuevo informe y otro para cancelar" style="width:100%;" >}}

## Permisos

Los usuarios necesitan el [permiso][2] **Dashboards Report Write** (Escritura de informe del dashboard) para crear y editar cronogramas de informes.
Este permiso puede ser concedido por otro usuario con el permiso **User Access Manage** (Administración de acceso de usuario).

{{< img src="dashboards/scheduled_reports/dashboard_permissions-2.png" alt="Captura de pantalla de los permisos de un usuario individual desde la página de parámetros de organización. El permiso para redactar informes de dashboards aparece resaltado en la sección de dashboards" style="width:90%;" >}}

Los usuarios con el permiso **Org Management** (Administración de la organización) pueden activar o desactivar la función de informes programados para su organización desde la pestaña **Settings** (Configuración) en [Compartir públicamente][3] en **Organization Settings** (Parámetros de organización).

{{< img src="dashboards/scheduled_reports/report_management_org_preference.png" alt="La configuración de Administración de informes en la pestaña Configuración en Compartir públicamente dentro de los Parámetros de la organización en Datadog con la configuración Activada" style="width:90%;" >}}

Además, los usuarios con el permiso **Org Management** (Administración de la organización) pueden activar o desactivar los destinatarios de Slack para su organización desde la pestaña **Settings** (Configuración) en [Compartir públicamente][3] en **Organization Settings** (Parámetros de organización).

{{< img src="dashboards/scheduled_reports/report_send_to_slack_org_preference.png" alt="La configuración Enviar a Slack de Administración de informes en la pestaña Configuración en Compartir públicamente dentro de los Parámetros de la organización en Datadog con la configuración Activada" style="width:90%;" >}}

## Tipos de widget no admitidos

Los siguientes tipos de widget **no** son compatibles y se mostrarán vacíos en el informe:

-   [Iframe][4]
-   [Imagen][5]
-   [Mapa de host][6]
-   [Ejecutar flujo de trabajo][7]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#get-started
[2]: /es/account_management/rbac/permissions/
[3]: /es/account_management/org_settings/#public-sharing
[4]: /es/dashboards/widgets/iframe/
[5]: /es/dashboards/widgets/image/
[6]: /es/dashboards/widgets/hostmap/
[7]: /es/dashboards/widgets/run_workflow/
[8]: /es/integrations/slack/?tab=datadogforslack