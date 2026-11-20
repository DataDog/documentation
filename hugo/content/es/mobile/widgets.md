---
description: Agregue widgets de Datadog a su pantalla de inicio o a su pantalla de
  bloqueo móvil para acceder rápidamente a SLOs, incidentes, tableros, seguimientos
  e información de guardia.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: blog
  text: Mejore su experiencia de guardia con los widgets del dashboard de la aplicación
    móvil de Datadog.
title: Widgets para dispositivos móviles
---
La aplicación móvil de Datadog admite widgets de SLO, incidentes, dashboard, on-call y seguimientos en la pantalla de inicio o de bloqueo de su dispositivo. 

## Widgets de la pantalla de inicio {#home-screen-widgets}
Agregue widgets en su pantalla de inicio para acceder rápidamente a información crítica en tiempo real directamente desde su pantalla de inicio sin tener que abrir la aplicación móvil de Datadog.

{{< tabs >}}
{{% tab "iOS" %}}
1. Mantenga presionada la pantalla de inicio.
2. Toque {{< ui >}}Edit{{< /ui >}}, luego toque el botón {{< ui >}}Add Widget{{< /ui >}} en la esquina superior izquierda de la pantalla.
2. Busque widgets de \"Datadog\".
3. Toque el widget deseado y el tamaño de su preferencia (pequeño, mediano o grande).
4. Toque {{< ui >}}Add Widget{{< /ui >}} y configure los campos del widget. Al acceder a la aplicación móvil desde el widget, estos son los campos que se consultarán en la aplicación.
5. Arrastre, minimice o expanda el widget para personalizar la ubicación y el tamaño del widget en su pantalla de inicio.

{{% /tab %}}
{{% tab "Android" %}}
1. Mantenga presionada la pantalla de inicio.
2. Toque el botón {{< ui >}}Widgets{{< /ui >}} en el editor de su pantalla de inicio. Si tiene atajos de aplicaciones, podría aparecer solo como un ícono en la esquina superior derecha de la burbuja.
3. Busque widgets de \"Datadog\".
4. Toque el widget deseado y toque {{< ui >}}Add{{< /ui >}}.
4. Cambie el tamaño del widget según su preferencia.
5. Toque el widget para configurar los campos del widget. Al acceder a la aplicación móvil desde el widget, estos son los campos que se consultarán en la aplicación.

{{% /tab %}}
{{< /tabs >}}

**Nota**: Los widgets se actualizan cada 30 minutos. Active la actualización manualmente tocando el marco de tiempo ubicado en la parte superior izquierda del widget.

### Widgets de incidentes {#incident-widgets}
Vea sus [incidentes abiertos][1] desde la pantalla de inicio de su dispositivo móvil con los widgets de Datadog. Para profundizar en los problemas, toque cualquier incidente abierto que se muestre en el widget para abrirlo con más detalles en la aplicación móvil de Datadog.

Además, puede personalizar sus widgets de Incidentes abiertos filtrando por:

- Organización
- Niveles de gravedad
- Clientes afectados
- Ordenar

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_incident_widget_may_2025.png" alt="Widget móvil de incidentes de Datadog mostrado en dispositivos iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque {{< ui >}}Edit Widget{{< /ui >}}.
2. Toque {{< ui >}}Choose{{< /ui >}} junto a la etiqueta {{< ui >}}Organization{{< /ui >}} para obtener los incidentes abiertos de la organización seleccionada.
3. Toque {{< ui >}}SEV-1 and SEV-2{{< /ui >}} junto a la etiqueta Severities para especificar filtros de gravedad.
4. Toque {{< ui >}}Both{{< /ui >}} junto a la etiqueta {{< ui >}}Customer Impacted{{< /ui >}} para filtrar los incidentes abiertos que han afectado a clientes.
5. Escriba en el cuadro de texto {{< ui >}}Type additional filters{{< /ui >}} para especificar cualquier filtro adicional.
6. Toque {{< ui >}}Ordering{{< /ui >}} para especificar el orden en que se enumeran los incidentes.
7. Toque fuera del widget para guardar su selección y salir de la pantalla de configuración.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_incidents_widget_may_2025.png" alt="Widget móvil de incidentes de Datadog mostrado en Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque el título del widget para configurar.
2. Toque {{< ui >}}Organization{{< /ui >}} para obtener los incidentes abiertos de la organización seleccionada.
3. Toque {{< ui >}}Severities{{< /ui >}} para especificar filtros de gravedad.
4. Toque {{< ui >}}Customer impacted{{< /ui >}} para filtrar los incidentes abiertos que han afectado a los clientes.
5. Toque {{< ui >}}Query{{< /ui >}} para especificar cualquier filtro adicional.
6. Toque {{< ui >}}Sorted by{{< /ui >}} para especificar el orden en que se enumeran los incidentes.
7. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}} para guardar su selección y salir de la pantalla de configuración.
8. Mantenga presionado y cambie el tamaño del widget según su preferencia.

{{% /tab %}}
{{< /tabs >}}

#### Mostrar incidentes abiertos de múltiples organizaciones {#display-open-incidents-from-multiple-organizations}

Puede mostrar incidentes abiertos de múltiples organizaciones en la pantalla de inicio de su dispositivo móvil.

{{< tabs >}}
{{% tab "iOS" %}}
- Toque {{< ui >}}Choose{{< /ui >}} junto a la etiqueta Organización para obtener los incidentes abiertos de la organización seleccionada.


{{% /tab %}}
{{% tab "Android" %}}

1. Toque el título del widget para configurar.
2. Desde la pantalla de configuración, toque {{< ui >}}Organization{{< /ui >}}.
3. Seleccione una nueva organización (es posible que deba iniciar sesión).
4. Ajuste el tamaño del widget según su preferencia.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### Widget de SLOs {#slos-widget}

Vea sus [SLOs][2] desde la pantalla de inicio de su dispositivo móvil con los widgets de Datadog. Puede agregar cualquier SLO de su organización como widget, junto con un marco de tiempo.

Las opciones de marco de tiempo son:
- 7 días
- 30 días
- 90 días
- Semana anterior
- Mes anterior
- Semana a la fecha
- Mes a la fecha

También puede especificar un tablero que se abra de forma predeterminada cuando toque un widget de SLOs, lo que le permite investigar rápidamente más a fondo sus métricas.

**Nota**: Si no especifica un dashboard que se abra de forma predeterminada, al tocar un widget de SLOs se abre la aplicación de Datadog.

#### Editar un widget de SLOs {#edit-an-slos-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_slo_widget_may_2025.png" alt="Widgets de SLO de tiempo de actividad de la aplicación mostrados en dispositivos iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque {{< ui >}}Edit Widget{{< /ui >}}.
3. Toque {{< ui >}}Choose{{< /ui >}} junto a la etiqueta SLO para elegir un SLO a seguir.
4. Dependiendo del SLO elegido, puede aparecer una etiqueta {{< ui >}}Timeframe{{< /ui >}}. Toque {{< ui >}}Choose{{< /ui >}} junto a la etiqueta {{< ui >}}Timeframe{{< /ui >}} para elegir el marco de tiempo del SLO.
5. Toque {{< ui >}}Choose{{< /ui >}} junto a la etiqueta {{< ui >}}Dashboard to open{{< /ui >}} para elegir un tablero que se abra cuando se toque el widget de SLOs.
6. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_slo_widget_may_2025.png" alt="Widgets de SLO de tiempo de actividad de la aplicación mostrados en Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque el título del widget para configurar.
2. Toque {{< ui >}}Selected SLO{{< /ui >}} para elegir un SLO a seguir.
3. Toque {{< ui >}}Selected Time Window{{< /ui >}} para elegir el marco de tiempo del SLO.
4. Toque {{< ui >}}Dashboard to open{{< /ui >}} para elegir un tablero que se abra cuando se toque el widget de SLOs.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}} para validar su selección y salir de la pantalla de configuración.
6. Mantenga presionado y cambie el tamaño del widget según su preferencia.


{{% /tab %}}
{{< /tabs >}}

#### Mostrar SLOs de múltiples organizaciones {#display-slos-from-multiple-organizations}

Puede mostrar SLOs de múltiples organizaciones en la pantalla de inicio de su dispositivo móvil.

{{< tabs >}}
{{% tab "iOS" %}}

Todas las organizaciones en las que ha iniciado sesión se muestran en la pantalla de configuración. Si no ve su organización, inicie sesión en ella nuevamente.


{{% /tab %}}
{{% tab "Android" %}}

1. Toque el título del widget para configurar.
2. Desde la pantalla de configuración, toque {{< ui >}}Organization{{< /ui >}}.
3. Seleccione una nueva organización (es posible que deba iniciar sesión).
4. Ajuste el tamaño del widget según su preferencia.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### Widget de seguimientos {#monitors-widget}

Vea sus [seguimientos][3] desde su pantalla de inicio con los widgets de Datadog. Toque cualquier celda para abrir la pantalla {{< ui >}}Monitor Search{{< /ui >}} en la aplicación, con sus seguimientos ya completados.

**Nota**: Si no tiene ninguna vista guardada de seguimientos, el widget le muestra todos los seguimientos de forma predeterminada.

#### Editar un widget de Seguimientos {#edit-a-monitors-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_monitor_widget_may_2025.png" alt="Widgets de seguimientos configurados mostrados en pantallas de iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque en {{< ui >}}Edit Widget{{< /ui >}}.
3. Toque en la celda de la visualización guardada individual para seleccionar y deseleccionar.
4. Reordene las visualizaciones arrastrando y soltando cada celda.
5. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_monitor_widget_may_2025.png" alt="Widgets de seguimientos configurados mostrados en Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque en el título del widget para configurar.
2. Toque en {{< ui >}}Saved Views{{< /ui >}}.
3. Toque en la celda de la visualización guardada individual para seleccionar y deseleccionar.
4. Reordene las visualizaciones arrastrando y soltando cada celda.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}} para validar su selección y salir de la pantalla de configuración.
6. Desplácese dentro del widget para ver más visualizaciones guardadas. Mantenga presionado y cambie el tamaño del widget según su preferencia.


{{% /tab %}}
{{< /tabs >}}

#### Mostrar Monitors de múltiples organizaciones {#display-monitors-from-multiple-organizations}

Puede mostrar Monitors de múltiples organizaciones dentro del mismo widget.

{{< tabs >}}
{{% tab "iOS" %}}

Todas las organizaciones en las que ha iniciado sesión se muestran en la pantalla de configuración. Si no ve su organización, es posible que deba iniciar sesión nuevamente.


{{% /tab %}}
{{% tab "Android" %}}

1. Toque el título del widget para configurar.
2. Desde la pantalla de configuración, toque {{< ui >}}Organization{{< /ui >}}.
3. Seleccione una nueva organización (es posible que deba iniciar sesión).
4. Edite el widget según sus preferencias.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

### Widget de Dashboard {#dashboard-widget}

Visualice su [Dashboard][4] desde su pantalla de inicio con los widgets de Datadog. Toque cualquier celda para abrir la pantalla {{< ui >}}dashboard search{{< /ui >}} en la aplicación, con su Dashboard ya cargado.

#### Edite un widget de Dashboard {#edit-a-dashboard-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_dashboard_widget_may_2025.png" alt="Widgets de Dashboard configurados mostrados en pantallas iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque en {{< ui >}}Edit Widget{{< /ui >}}.
3. Desde la pantalla de configuración, toque {{< ui >}}Dashboard{{< /ui >}} y seleccione un Dashboard.
4. Toque {{< ui >}}Widget{{< /ui >}} para seleccionar un widget específico del Dashboard seleccionado.
5. Seleccione una {{< ui >}}Period{{< /ui >}} para la consulta del widget.
6. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_dashboard_widget_may_2025.png" alt="Widgets de Dashboard configurados mostrados en Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque en el título del widget para configurar.
2. Toque en {{< ui >}}Saved Views{{< /ui >}}.
3. Toque en la celda de la visualización guardada individual para seleccionar y deseleccionar.
4. Reordene las visualizaciones arrastrando y soltando cada celda.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}} para validar su selección y salir de la pantalla de configuración.
6. Desplácese dentro del widget para ver más visualizaciones guardadas. Mantenga presionado y cambie el tamaño del widget según su preferencia.


{{% /tab %}}
{{< /tabs >}}

#### Muestre Dashboards de múltiples organizaciones {#display-dashboards-from-multiple-organizations}

Puede mostrar Dashboards de múltiples organizaciones en la pantalla de inicio de su dispositivo móvil.

{{< tabs >}}
{{% tab "iOS" %}}

Todas las organizaciones en las que ha iniciado sesión se muestran en la pantalla de configuración. Si no ve su organización, inicie sesión en ella nuevamente.


{{% /tab %}}
{{% tab "Android" %}}

1. Toque el título del widget para configurar.
2. Desde la pantalla de configuración, toque {{< ui >}}Organization{{< /ui >}}.
3. Seleccione una nueva organización (es posible que deba iniciar sesión).
4. Ajuste el tamaño del widget según su preferencia.
5. Toque {{< ui >}}Save{{< /ui >}} o {{< ui >}}Apply{{< /ui >}}.
   
{{% /tab %}}
{{< /tabs >}}

### Widget de On-Call {#on-call-widget}

Visualice sus turnos de On-Call y sus páginas de On-Call en la pantalla de inicio de su dispositivo móvil con los widgets de Datadog.

Puede personalizar sus widgets de turnos de On-Call filtrando por:

- Organización
- Periodo de tiempo

Puede personalizar sus widgets de páginas de On-Call filtrando por:

- Organización
- Equipo
- Orden

**Nota**: Puede agregar filtros adicionales para el widget de páginas de On-Call.

#### Edite un widget de turno de On-Call {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="Widgets de turnos de On-Call de la pantalla de inicio configurados que se muestran en pantallas iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque {{< ui >}}Edit Widget{{< /ui >}} para abrir la pantalla de configuración.
3. Seleccione la {{< ui >}}Organization{{< /ui >}} y el {{< ui >}}Period{{< /ui >}} en los que desea ver sus turnos de On-Call.
4. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Widgets de turnos de On-Call de la pantalla de inicio configurados que se muestran en pantallas Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque el widget para configurar.
2. Seleccione la {{< ui >}}Organization{{< /ui >}} y el {{< ui >}}Time Period{{< /ui >}} en los que desea ver sus turnos de On-Call.
3. Toque {{< ui >}}✓{{< /ui >}} para guardar la configuración.
4. Mantenga presionado y cambie el tamaño del widget según su preferencia.

{{% /tab %}}
{{< /tabs >}}

#### Edite un widget de páginas de On-Call {#edit-an-on-call-pages-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_pages_widget_may_2025.png" alt="Widgets de páginas de On-Call de la pantalla de inicio configurados que se muestran en pantallas iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantenga presionado el widget para configurar.
2. Toque {{< ui >}}Edit Widget{{< /ui >}} para abrir la pantalla de configuración.
3. Seleccione la {{< ui >}}Organization{{< /ui >}}, el {{< ui >}}Teams{{< /ui >}} y el {{< ui >}}Order{{< /ui >}} en los que desea ver las páginas de On-Call.
4. Escriba cualquier filtro adicional y toque {{< ui >}}Done{{< /ui >}}.
5. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_pages_widget_may_2025.png" alt="Widgets de la página de On-Call de la pantalla de inicio configurados que se muestran en pantallas iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque el widget para configurar.
2. Seleccione {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}} y {{< ui >}}Sort by{{< /ui >}} en los que desea ver las páginas de On-Call.
3. Toque para escribir cualquier {{< ui >}}Additional Filter{{< /ui >}} y toque {{< ui >}}Save{{< /ui >}}.
4. Toque {{< ui >}}✓{{< /ui >}} cuando termine las configuraciones
5. Mantenga presionado y cambie el tamaño del widget según su preferencia.

{{% /tab %}}
{{< /tabs >}}


## Widgets de la pantalla de bloqueo {#lock-screen-widgets}
{{< img src="mobile/widgets/lockscreen_widget_may_2025.png" alt="Widgets de la pantalla de bloqueo configurados que se muestran en pantallas iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Los widgets de la pantalla de bloqueo para On-Call, Monitors, SLOs, Incidents y Dashboards son compatibles con iOS.

1. Mantenga presionada la pantalla de bloqueo.
2. Toque {{< ui >}}Customize{{< /ui >}}, luego {{< ui >}}Lock Screen{{< /ui >}}.
3. Toque el espacio del widget de la pantalla de bloqueo para abrir la tarjeta {{< ui >}}Add Widgets{{< /ui >}}.
4. Desplácese hasta la aplicación {{< ui >}}Datadog{{< /ui >}} y tóquela.
4. Toque el widget de la pantalla de bloqueo que desea agregar.
5. Toque el widget en la pantalla de bloqueo para abrir el panel de configuración.
6. Configure el widget de acuerdo con los campos especificados para el widget seleccionado.
7. Arrastre, minimice o expanda el widget para personalizar la ubicación y el tamaño del widget en su pantalla de bloqueo.

**Nota**: Debe tener un espacio vacío en su pantalla de bloqueo para agregar un nuevo widget. Puede eliminar un widget de la pantalla de bloqueo tocando el botón {{< ui >}}\-{{< /ui >}} en la parte superior izquierda del widget que desea eliminar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/incident_management
[2]: /es/dashboards/widgets/slo/#setup
[3]: /es/monitors/
[4]: /es/dashboards/
[5]: /es/incident_response/on-call/