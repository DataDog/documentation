---
aliases:
- /es/dashboards/reporting/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Compartir dashboards de Datadog de forma segura con cualquiera persona
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Usa variables de plantilla asociadas para reajustar tus dashboards
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de aprendizaje
  text: Crear dashboards mejores
is_public: true
kind: documentación
title: Informes programados
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Los informes programados no son compatibles con este sitio.</div>
{{< /site-region >}}

## Información general

Los informes programados de dashboards envían automáticamente y de forma programada un resumen visual de un dashboard a los destinatarios seleccionados. Los informes generados muestran imágenes de widgets de un dashboard en formato HTML lineal.

{{< img src="dashboards/scheduled_reports/report_example.png" alt="Informe de ejemplo titulado Checkout KPI Report que muestra una fecha, una descripción, un enlace al dashboard, el nombre de la organización de Datadog y tres imágenes de widgets del dashboard" style="width:70%;" >}}

## Programar un informe

Crea un informe a partir de cualquier dashboard con un diseño basado en cuadrícula o automático. Haz clic en el botón **Share** (Compartir) y selecciona **Schedule a Report** (Programar un informe).

Los siguientes tipos de widgets son compatibles:

- [Change (Cambiar][1]
- [Distribution (Distribución)][2]
- [Geomap][3]
- [Group (Grupo)][4]
- [Heatmap][5]
- [Monitor Summary (Resumen de monitores)][6]
- [Notes and Links (Notas y enlaces)][7]
- [Pie Chart (Gráfico circular)][16]
- [Query Value (Valor de la consulta)][8]
- [Scatter Plot][9]
- [SLO][10]
- [SLO List (Lista de SLOs)][11]
- [Table (Tabla)][12]
- [Timeseries (Series temporales)][13]
- [Top List (Lista principal)][14]

### Configurar una programación

En el modal de configuración que se abre, configura una programación para el informe que determine cuándo y con qué frecuencia se enviará. Selecciona un periodo de tiempo para definir el intervalo de tiempo que se mostrará en el informe. El periodo de tiempo del informe puede ser diferente del periodo de tiempo mostrado en el dashboard.

### Añadir destinatarios

Para añadir destinatarios a tus informes, introduce sus direcciones de correo electrónico. El correo electrónico asociado a tu cuenta de Datadog se añade automáticamente como destinatario. Puedes quitarte de la lista de destinatarios pasando el cursor sobre tu correo electrónico y haciendo clic en la **X** que aparece al lado.

**Nota:** Los usuarios con cuentas Enterprise o Pro pueden enviar informes a destinatarios que no pertenecen a su organización.

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="Modal de configuración de un informe de dashboard individual, con secciones para configurar una programación, añadir destinatarios y personalizar correos electrónicos. En la parte inferior del modal se encuentran los botones para editar las variables de plantilla, eliminar el informe, enviar vistas previas, cancelar y guardar" style="width:100%;" >}}

### Personalizar el informe

Por último, puedes personalizar el informe para ofrecer a los destinatarios más contexto o una vista adaptada. La descripción opcional aparece en la parte superior de cada informe lo que permite proporcionar más contexto acerca del dashboard.

Haz clic en **Edit Template Variables** (Editar las variables de plantilla) para modificar los filtros que se aplican al enviar el informe. Estos parámetros no afectan a los valores predeterminados del dashboard correspondiente.

Para ver el informe antes de guardar la programación que has configurado, haz clic en **Send Preview** (Enviar vista previa). Puedes pausar el envío programado de un informe en cualquier momento.

## Gestionar informes
Un único dashboard puede tener múltiples informes programados con diferentes configuraciones, por ejemplo, para dar soporte a diferentes grupos de partes interesadas en el mismo dashboard. Para ver los informes de un dashboard existente, abre el menú **Share** (Compartir) y selecciona **Configure Reports** (Configurar informes).

{{< img src="dashboards/scheduled_reports/configure_reports.png" alt="Vista de la opción de configuración de informes en el menú Share (Compartir) del dashboard" style="width:50%;" >}}

Desde el modal de configuración que aparece, puedes pausar un informe existente o crear uno nuevo. Para consultar y editar los datos de un informe existente, o eliminarlo, haz clic en **Edit** (Editar).

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="Modal de configuración de los informes programados, en el que se muestran dos informes, cada uno con sus títulos, etiquetas (tags), destinatarios, frecuencia, una opción para activar o desactivar el informe y un botón para editarlo. En la parte inferior hay un botón para añadir un nuevo informe y otro para finalizar" style="width:100%;" >}}

## Permisos

Sólo pueden generar un informe los usuarios con el permiso **Dashboard Report Write** (Redactar informes de dashboard). Los administradores tienen este permiso activado de forma predeterminada y el resto de roles lo tienen desactivado.

Las imágenes generadas en los informes muestran todos los datos, sin importar las restricciones de lectura establecidas. Datadog recomienda limitar los permisos de los informes a usuarios que no tengan restricciones de lectura sobre los datos. Si quieres dar a un usuario el permiso **Dashboard Report Write** (Redactar informes de dashboard), crea un nuevo rol con ese permiso habilitado y asigna el usuario a ese rol. Otra opción es asignar el rol de **Administrador** a ese usuario. Para obtener más información sobre la gestión de roles y permisos, consulta [Gestión de usuarios][17].

{{< img src="dashboards/scheduled_reports/dashboard_permissions.png" alt="Captura de pantalla de los permisos de un usuario individual desde la página de parámetros de organización. El permiso para redactar informes de dashboards aparece resaltado en la sección de dashboards" style="width:100%;" >}}

Los usuarios con el rol de Administrador o el permiso de **Gestión de la organización** pueden activar o desactivar la función de programar informes de una cuenta desde la pestaña **Settings** (Parámetros) en [Public Sharing (Difusión)][15], en **Organization Settings** (Parámetros de organización).

{{< img src="dashboards/scheduled_reports/report_management.png" alt="Parámetro Report Management (Gestión de informes) en la pestaña Settings (Parámetros), en Public Sharing (Difusión) de Organization Settings (Parámetros de organización) en Datadog, con el parámetro Enabled (Activado)" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/change/
[2]: /es/dashboards/widgets/distribution/
[3]: /es/dashboards/widgets/geomap/
[4]: /es/dashboards/widgets/group/
[5]: /es/dashboards/widgets/heatmap/
[6]: /es/dashboards/widgets/monitor_summary/
[7]: /es/dashboards/widgets/note/
[8]: /es/dashboards/widgets/query_value/
[9]: /es/dashboards/widgets/scatter_plot/
[10]: /es/dashboards/widgets/slo/
[11]: /es/dashboards/widgets/slo_list/
[12]: /es/dashboards/widgets/table/
[13]: /es/dashboards/widgets/timeseries/
[14]: /es/dashboards/widgets/top_list/
[15]: /es/account_management/org_settings/#public-sharing
[16]: /es/dashboards/widgets/pie_chart/
[17]: /es/account_management/users