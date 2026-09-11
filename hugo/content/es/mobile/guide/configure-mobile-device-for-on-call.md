---
description: Configure su dispositivo móvil para recibir notificaciones de On-Call
  confiables con alertas críticas, omisión de No molestar y configuración de contacto
  telefónico.
further_reading:
- link: https://docs.datadoghq.com/incident_response/on-call/
  tag: Documentación
  text: Documentación de On-Call
- link: https://docs.datadoghq.com/mobile/
  tag: Documentación
  text: Documentación de la aplicación móvil de Datadog
title: Configure su dispositivo móvil para Datadog On-Call
---
<div class="alert alert-info">
Si solo necesita acceder a On-Call en el móvil y desea restringir el acceso a datos de telemetría confidenciales en dispositivos móviles, comuníquese con el soporte de Datadog.
</div>

Estar en On-Call requiere notificaciones confiables y oportunas para garantizar que pueda responder a los incidentes de manera efectiva. Esta guía lo guía a través de los pasos para configurar su dispositivo móvil para un rendimiento óptimo con [Datadog On-Call][5].

1. Instale la [aplicación móvil de Datadog][1].
2. [Configure las notificaciones push](#set-up-push-notifications): Habilite su dispositivo para recibir notificaciones de la aplicación móvil de Datadog.
3. [Omita el modo silencio y No molestar](#circumvent-mute-and-do-not-disturb-mode-for-on-call): Reciba notificaciones push, llamadas de voz y SMS mientras su dispositivo esté en modo No molestar.

## Configurar notificaciones push {#set-up-push-notifications}
<div class="alert alert-info">
Cuando inicie sesión en la aplicación móvil de Datadog por primera vez, un flujo de incorporación se encargará de la configuración de notificaciones y los permisos.
</div>

Sin embargo, de forma predeterminada, la aplicación móvil no tiene permiso para enviarle notificaciones. Para recibir notificaciones push: 

{{< tabs >}}
{{% tab "iOS" %}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Encuentre la configuración de notificaciones en la versión de iOS de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Active el interruptor {{< ui >}}Allow Notifications{{< /ui >}}. Si es la primera vez que habilita las notificaciones, esto abrirá un aviso de permisos. Otorgue el permiso y luego toque {{< ui >}}Enable Notifications{{< /ui >}} nuevamente para ir a la configuración del sistema iOS.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configure la configuración de notificaciones del sistema de su dispositivo iOS." style="width:100%;" >}}

3. Dentro de la configuración del sistema iOS, asegúrese de activar el interruptor {{< ui >}}Allow Notifications{{< /ui >}}. Datadog recomienda encarecidamente que también active los interruptores {{< ui >}}Sound{{< /ui >}} y {{< ui >}}Badges{{< /ui >}}.

Asegúrese de otorgar a la aplicación móvil de Datadog los permisos necesarios.
{{% /tab %}}

{{% tab "Android" %}}
1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Encuentre la configuración de notificaciones en la versión de Android de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Active el interruptor {{< ui >}}Allow notifications{{< /ui >}}. Datadog recomienda encarecidamente que también habilite {{< ui >}}Sound and vibration{{< /ui >}} y {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configure los ajustes de notificación del sistema de su dispositivo Android." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Sonidos personalizados {#custom-sounds}
Tanto en iOS como en Android, tiene la opción de anular los sonidos de notificación predeterminados del sistema. La aplicación de Datadog viene precargada con una selección de sonidos personalizados.  

## Omitir el modo silencio y No molestar para On-Call {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Puede anular el volumen del sistema y el modo No molestar de su dispositivo tanto para las notificaciones push (desde la aplicación móvil de Datadog) como para las notificaciones de telefonía (como llamadas de voz y SMS).

### Notificaciones push críticas {#critical-push-notifications}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo iOS." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Habilite el interruptor {{< ui >}}Critical Alerts{{< /ui >}}. Las alertas críticas ignoran el interruptor de silencio y el modo No molestar. Si habilita las alertas críticas, el sistema reproduce el sonido de una alerta crítica independientemente de la configuración de silencio o No molestar del dispositivo.

3. Dentro de la configuración del sistema iOS, asegúrese de habilitar el interruptor {{< ui >}}Critical Alerts{{< /ui >}}. Asegúrese de otorgar a la aplicación móvil de Datadog los permisos necesarios.

4. Seleccione su dispositivo para {{< ui >}}High Urgency Notifications{{< /ui >}} y/o {{< ui >}}Low Urgency Notifications{{< /ui >}} en la sección de Preferencias de notificación.

5. Pruebe la configuración de su notificación push crítica tocando {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%;" >}}

2. Si faltan los permisos de notificación, toque {{< ui >}}Bypass Do Not Disturb{{< /ui >}} y habilite {{< ui >}}Allow notifications{{< /ui >}} en la Configuración del sistema.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%;" >}}

3. Luego toque {{< ui >}}Bypass Do Not Disturb{{< /ui >}} y habilite {{< ui >}}Override Do Not Disturb{{< /ui >}} en la Configuración del sistema para On-Call de alta urgencia.

   **En dispositivos Samsung**: Vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Seleccione Datadog y permítale omitir el modo No molestar.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Anule el volumen del sistema y el modo No molestar de su dispositivo Android." style="width:100%;" >}}

4. Para anular el volumen del sistema, toque {{< ui >}}Override system volume{{< /ui >}} y permita que {{< ui >}}Mode access{{< /ui >}} en la Configuración del sistema active {{< ui >}}Override system volume{{< /ui >}}.

5. En la web, configure las preferencias de notificación para {{< ui >}}High Urgency Notifications{{< /ui >}} y/o {{< ui >}}Low Urgency Notifications{{< /ui >}}.

6. Pruebe la configuración de su notificación push crítica tocando {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
En Android, la aplicación móvil de Datadog no puede omitir el volumen del sistema ni la configuración de No molestar cuando se usa dentro de un perfil de trabajo. Datadog recomienda instalar la aplicación móvil de Datadog en su perfil personal, sujeto a las políticas de su organización.
</div>

{{% /tab %}}
{{< /tabs >}}
### Sonidos y volumen personalizados para notificaciones push críticas {#custom-sounds-and-volume-for-critical-push}
Para notificaciones de alta urgencia, Datadog recomienda encarecidamente personalizar la configuración de sonido y volumen de su sistema. Esto garantiza que las alertas no solo sean más distintas y reconocibles, sino también más efectivas para captar la atención. Pruebe sus preferencias de notificación para confirmar que se comportan como se espera.

### Canales de telefonía (llamadas de voz y SMS) {#telephony-channels-voice-calls-and-sms}

Para mayor confiabilidad, Datadog utiliza un conjunto rotativo de números de teléfono para contactarlo. Para ayudar a que su teléfono reconozca las llamadas y mensajes de Datadog On-Call, puede crear una tarjeta de contacto digital. Esta tarjeta se actualiza automáticamente con los números de teléfono más recientes de Datadog. Puede asignar permisos especiales a este contacto en la configuración de su sistema para una funcionalidad mejorada, como omitir el modo No molestar.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/ios_sync_card_may_2025.png" alt="Anule el modo No molestar de su dispositivo iOS para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Habilite {{< ui >}}Automatic Contact Card Sync{{< /ui >}} Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los números de teléfono más recientes de Datadog.

3. Después de crear este contacto, abra la configuración de su sistema iOS y navegue a {{< ui >}}Focus{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}.

4. En {{< ui >}}People{{< /ui >}}, permita las notificaciones del contacto de Datadog On-Call. Si habilitó las alertas críticas para las aplicaciones push de Datadog, entonces la aplicación móvil de Datadog también aparece en **Apps**.

5. Para omitir el modo silencioso, navegue al contacto de Datadog On-Call >> toque {{< ui >}}Ringtone{{< /ui >}} >> habilite {{< ui >}}Emergency Bypass{{< /ui >}}.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/android_sync_card_may_2025.png" alt="Anule el modo no molestar de su dispositivo Android para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. En {{< ui >}}Phone & SMS{{< /ui >}}, habilite {{< ui >}}Automatic Contact Card Sync{{< /ui >}}. Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los números de teléfono más recientes de Datadog.

3. Después de crear este contacto, márquelo como favorito.

4. Abra la configuración de su sistema Android y navegue a {{< ui >}}Sound & vibration{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}. Cree una excepción para el contacto de Datadog On-Call.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Descargue la versión actual de la tarjeta de contacto de Datadog On-Call</a>. <strong>Nota</strong>: La tarjeta de contacto está sujeta a cambios en cualquier momento.
</div>

## Widgets móviles de On-Call {#on-call-mobile-widgets}
Agregue widgets de la pantalla de inicio y de bloqueo de On-Call para acceder a sus páginas y turnos.

### Widget de la pantalla de inicio de On-Call {#on-call-home-screen-widget}

Visualice sus turnos de On-Call y sus páginas de On-Call en la pantalla de inicio de su dispositivo móvil con los widgets de Datadog.

Puede personalizar sus widgets de turno de On-Call filtrando por:

- Organización
- Periodo de tiempo

Puede personalizar los widgets de su página de On-Call filtrando por:

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
3. Seleccione la {{< ui >}}Organization{{< /ui >}} y el {{< ui >}}Period{{< /ui >}} para los cuales desea ver sus turnos de On-Call.
4. Toque fuera del widget para validar su selección y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Widgets de turnos de On-Call de la pantalla de inicio configurados que se muestran en pantallas Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Toque el widget para configurar.
2. Seleccione la {{< ui >}}Organization{{< /ui >}} y el {{< ui >}}Time Period{{< /ui >}} para los cuales desea ver sus turnos de On-Call.
3. Toque {{< ui >}}✓{{< /ui >}} para guardar la configuración.
4. Mantenga presionado y cambie el tamaño del widget según su preferencia.

{{% /tab %}}
{{< /tabs >}}

### Widget de pantalla de bloqueo de On-Call {#on-call-lock-screen-widget}

El widget de pantalla de bloqueo de On-Call muestra su estado de On-Call. Los widgets de pantalla de bloqueo solo están disponibles en iOS.

1. Mantenga presionada la pantalla de bloqueo.
2. Toque {{< ui >}}Customize{{< /ui >}}, luego {{< ui >}}Lock Screen{{< /ui >}}.
3. Toque el espacio del widget de la pantalla de bloqueo para abrir la tarjeta {{< ui >}}Add Widgets{{< /ui >}}.
4. Desplácese hasta la aplicación {{< ui >}}Datadog{{< /ui >}} y tóquela.
4. Toque el widget de pantalla de bloqueo On-Call.
5. Toque el widget en la pantalla de bloqueo para abrir el panel de configuración.
6. Seleccione la organización para la cual desea mostrar su estado de On-Call.

**Nota**: Debe tener un espacio vacío en su pantalla de bloqueo para agregar un nuevo widget. Puede eliminar widgets de la pantalla de bloqueo tocando el botón {{< ui >}}\-{{< /ui >}} en la parte superior izquierda del widget que desea eliminar.

## Solución de problemas {#troubleshooting}
Para obtener ayuda con la solución de problemas, [contacte al soporte de Datadog][2]. También puede enviar un mensaje en el canal [#mobile-app][4] de [Datadog public Slack][3].

[1]: /es/mobile/?tab=ios
[2]: /es/help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
[5]: /es/incident_response/on-call/