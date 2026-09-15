---
description: Configure las notificaciones push en iOS y Android para alertas On-Call,
  incidentes y actualizaciones de flujo de trabajo con configuraciones de alertas
  críticas.
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Documentación de On-Call
- link: /incident_response/incident_management/notification/
  tag: Documentación
  text: Documentación de las reglas de Notifications para incidentes
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Documentación de Workflow Automation
title: Configurar notificaciones push en la aplicación móvil de Datadog
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Solo se admiten notificaciones push de Incident Management para su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
Reciba notificaciones push móviles para [alertas On-Call](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call), [incidentes](#incident-notifications) y [actualizaciones de Workflow Automation](#workflow-automation-notifications), para que pueda mantenerse informado en tiempo real desde la aplicación móvil de Datadog.

## Configurar notificaciones push {#set-up-push-notifications}

De forma predeterminada, la aplicación móvil de Datadog no tiene permiso para enviarle notificaciones. Para recibir notificaciones push: 

{{< tabs >}}
{{% tab "iOS" %}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Encuentre la configuración de notificaciones en la versión de iOS de la aplicación móvil de Datadog." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Active el interruptor {{< ui >}}Allow Notifications{{< /ui >}}. Si es la primera vez que habilita las notificaciones, esto abrirá un aviso de permisos. Otorgue el permiso y luego toque {{< ui >}}Enable Notifications{{< /ui >}} nuevamente para ir a la configuración del sistema iOS.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configure la configuración de notificaciones del sistema de su dispositivo iOS." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Dentro de la configuración del sistema iOS, asegúrese de activar el interruptor {{< ui >}}Allow Notifications{{< /ui >}}. Datadog recomienda que también active los interruptores {{< ui >}}Sound{{< /ui >}} y {{< ui >}}Badges{{< /ui >}}.

Asegúrese de otorgar a la aplicación móvil de Datadog los permisos necesarios.

### Sonidos personalizados {#custom-sounds}

Puede anular los sonidos de notificación predeterminados del sistema con sonidos personalizados precargados en la aplicación móvil de Datadog.

Para personalizar los sonidos de notificación:

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
2. Seleccione la categoría de notificación que desea personalizar.
3. Seleccione un sonido de las opciones disponibles.

{{% /tab %}}

{{% tab "Android" %}}
1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Encuentre la configuración de notificaciones en la versión de Android de la aplicación móvil de Datadog." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Active el interruptor {{< ui >}}Allow notifications{{< /ui >}}. Datadog recomienda encarecidamente que también habilite {{< ui >}}Sound and vibration{{< /ui >}} y {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configure los ajustes de notificación del sistema de su dispositivo Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

### Sonidos personalizados {#custom-sounds-1}

Puede anular los sonidos de notificación predeterminados del sistema con sonidos personalizados precargados en la aplicación móvil de Datadog.

Para personalizar los sonidos de notificación:

1. Vaya a {{< ui >}}Device Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Advanced Settings{{< /ui >}}.
2. Seleccione {{< ui >}}Manage notification categories for each app{{< /ui >}} y asegúrese de que Datadog esté seleccionado.
3. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
4. Seleccione la categoría de notificación que desea personalizar.
5. Seleccione un sonido de las opciones disponibles.

**Nota**: El volumen de las notificaciones push está determinado por la configuración de volumen del sistema de su dispositivo.

{{% /tab %}}
{{< /tabs >}}

## Omitir el modo silencio y No molestar para On-Call {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Puede anular el volumen del sistema y el modo No molestar de su dispositivo tanto para las notificaciones push (desde la aplicación móvil de Datadog) como para las notificaciones de telefonía (como llamadas de voz y SMS).

Para obtener más información, consulte la [guía sobre cómo configurar su dispositivo móvil para On-Call][4].

### Notificaciones push críticas {#critical-push-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">On-Call no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
<div class="alert alert-info">
Las notificaciones push críticas solo están disponibles para On-Call. Si está configurando On-Call en la aplicación móvil de Datadog por primera vez, un flujo de incorporación se encarga de la configuración y los permisos de las notificaciones.
</div>
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo iOS." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Habilite el interruptor {{< ui >}}Critical Alerts{{< /ui >}}. Las alertas críticas ignoran el interruptor de silencio y el modo No molestar. Si habilita las alertas críticas, el sistema reproduce el sonido de una alerta crítica independientemente de la configuración de silencio o No molestar del dispositivo.

3. Dentro de la configuración del sistema iOS, asegúrese de habilitar el interruptor {{< ui >}}Critical Alerts{{< /ui >}}. Asegúrese de otorgar a la aplicación móvil de Datadog los permisos necesarios.

4. Seleccione su dispositivo para {{< ui >}}High Urgency Notifications{{< /ui >}} y/o {{< ui >}}Low Urgency Notifications{{< /ui >}} en la sección de Preferencias de notificación.

5. Pruebe la configuración de su notificación push crítica tocando {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

2. Si faltan los permisos de notificación, toque {{< ui >}}Bypass Do Not Disturb{{< /ui >}} y habilite {{< ui >}}Allow notifications{{< /ui >}} en la Configuración del sistema.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Luego toque {{< ui >}}Bypass Do Not Disturb{{< /ui >}} y habilite {{< ui >}}Override Do Not Disturb{{< /ui >}} en la Configuración del sistema para On-Call de alta urgencia.

   **En dispositivos Samsung**: Vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Seleccione Datadog y permítale omitir el modo No molestar.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%; background:none; border:none; box-shadow:none;" >}}

4. Para anular el volumen del sistema, toque {{< ui >}}Override system volume{{< /ui >}} y permita {{< ui >}}Mode access{{< /ui >}} en la Configuración del sistema para activar {{< ui >}}Override system volume{{< /ui >}}.

5. Seleccione su dispositivo para {{< ui >}}High Urgency Notifications{{< /ui >}} y/o {{< ui >}}Low Urgency Notifications{{< /ui >}} en la sección de Preferencias de notificación.

6. Pruebe la configuración de su notificación push crítica tocando {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
En Android, la aplicación móvil de Datadog no puede omitir el volumen del sistema ni la configuración de No molestar cuando se usa dentro de un perfil de trabajo. Como solución alternativa, instale la aplicación móvil de Datadog en su perfil personal.
</div>

<div class="alert alert-info">
Debe haber iniciado sesión para reconocer y tomar medidas ante las páginas de On-Call. Sin embargo, sigue recibiendo notificaciones push de On-Call cuando ha cerrado sesión en la aplicación móvil de Datadog.
</div>

{{% /tab %}}
{{< /tabs >}}

### Sonidos y volumen personalizados para notificaciones push críticas {#custom-sounds-and-volume-for-critical-push}

<div class="alert alert-info"> Los controles de volumen y sonido solo están disponibles para las notificaciones de On-Call. Las notificaciones de incidentes y flujos de trabajo utilizan la configuración predeterminada del sistema de su dispositivo. </div>

Para notificaciones de alta urgencia, Datadog recomienda encarecidamente personalizar la configuración de sonido y volumen de su sistema. Esto garantiza que las alertas no solo sean más distintas y reconocibles, sino también más efectivas para captar la atención. Pruebe sus preferencias de notificaciones push críticas para confirmar que se comportan como se espera.

## Notificaciones de incidentes {#incident-notifications}
Reciba actualizaciones de estado sobre sus incidentes activos configurando [Reglas de notificación para incidentes en la Web][2]. 

1. En Incidentes, navegue a {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Notification Rules{{< /ui >}}][1].
2. Haga clic en el botón {{< ui >}}+ New Rule{{< /ui >}} en la parte superior derecha.
3. Ingrese los campos de condición deseados para {{< ui >}}When an incident is...{{< /ui >}} y {{< ui >}}And meets the following conditions...{{< /ui >}}. De forma predeterminada, estos filtros están vacíos y se activa una regla de notificación para cualquier incidente.
4. En {{< ui >}}Notify...{{< /ui >}} seleccione su destinatario de notificación. Si desea notificar al dispositivo móvil de un destinatario, seleccione la opción para su nombre que incluye {{< ui >}}(Mobile Push Notification){{< /ui >}}. El destinatario debe haber habilitado las notificaciones en la aplicación móvil de Datadog para que aparezca esta opción.
5. {{< ui >}}With Template:{{< /ui >}} Seleccione la plantilla de mensaje que desea que utilice la regla de notificación.
6. {{< ui >}}Renotify on updates to:{{< /ui >}} Seleccione las propiedades del incidente que activan las notificaciones. Se envía una nueva notificación cada vez que una o más de las propiedades seleccionadas cambian.
7. Haga clic en {{< ui >}}Save{{< /ui >}}.

De forma predeterminada, si tiene habilitadas las notificaciones push y se le asigna como comandante de un incidente, recibirá automáticamente una notificación push para el incidente.

## Notificaciones de Workflow Automation {#workflow-automation-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cree [automatizaciones de flujo de trabajo][3] que envíen notificaciones push móviles.

1. En el lienzo de flujo de trabajo, haga clic en el icono {{< ui >}}\+{{< /ui >}}.
2. Busque {{< ui >}}Send mobile push notification{{< /ui >}}.
3. En {{< ui >}}To{{< /ui >}} seleccione al destinatario de su notificación. El destinatario debe haber habilitado las notificaciones en la aplicación móvil de Datadog para que aparezca esta opción.
4. Ingrese el mensaje {{< ui >}}Body{{< /ui >}}.

### Lecturas Adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]: /es/incident_response/incident_management/setup_and_configuration/notification_rules/
[3]: https://docs.datadoghq.com/es/getting_started/workflow_automation/
[4]: /es/incident_response/on-call/guides/configure-mobile-device-for-on-call