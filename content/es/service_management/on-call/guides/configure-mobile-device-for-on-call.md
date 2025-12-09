---
further_reading:
- link: https://docs.datadoghq.com/service_management/on-call/
  tag: Documentación
  text: Documentación de On-Call
title: Configurar tu dispositivo móvil para Datadog On-Call
---

Estar de guardia requiere notificaciones fiables y puntuales para asegurar que puedas responder a las incidencias con eficacia. Esta guía te indica los pasos para configurar tu dispositivo móvil para un rendimiento óptimo con Datadog On-Call.

1. Instala la [aplicación móvil de Datadog][1].
2. [Configurar notificaciones push](#set-up-push-notifications): habilita tu dispositivo para recibir notificaciones desde la aplicación móvil de Datadog.
3. [Circunvenir el modo silencio y No molestar](#circumvent-mute-and-do-not-disturb-mode-for-on-call): recibe notificaciones push, llamadas de voz y SMS mientras tu dispositivo está en modo No molestar.

## Establecer notificaciones push
<div class="alert alert-info">
Cuando accedes por primera vez a la aplicación móvil de Datadog, un flujo de integración se encarga de la configuración y los permisos de notificación.
</div>

Sin embargo, por defecto, la aplicación móvil no puede enviarte notificaciones. Para recibir notificaciones push:

{{< tabs >}}
{{% tab "iOS" %}}

1. En la aplicación móvil de Datadog, ve a **Settings** > **Notifications** (Configuración > Notificaciones).

   {{< img src="service_management/mobile/ios_settings_may_2025.png" alt="Encuentra la configuración de notificaciones en la versión de iOS de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Activa la casilla **Allow Notifications** (Permitir notificaciones). Si es la primera vez que activas las notificaciones, se abrirá una solicitud de permisos. Concede el permiso y, a continuación, vuelve a tocar **Enable Notifications** (Activar notificaciones) para ir a la configuración del sistema iOS.

   {{< img src="service_management/mobile/ios_notification_may_2025.png" alt="Configura los ajustes de las notificaciones de sistema de tu dispositivo iOS." style="width:100%;" >}}

3. En la configuración del sistema iOS, asegúrate de activar la opción **Allow Notifications** (Permitir notificaciones). Datadog recomienda encarecidamente que también actives las opciones **Sound** (Sonido) y **Badges** (Distintivos).

Asegúrate de conceder a la aplicación móvil los permisos necesarios.
{{% /tab %}}

{{% tab "Android" %}}
1. En la aplicación móvil de Datadog, ve a **Settings** > **Notifications** (Configuración > Notificaciones).

   {{< img src="service_management/mobile/android_settings_may_2025.png" alt="Encuentra los ajustes de notificaciones en la versión de Android de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Activa el interruptor **Allow notifications** (Permitir notificaciones). Datadog te recomienda encarecidamente que actives también **Sound and vibration** (Sonido y vibración) y **Show content on Lock screen** (Mostrar contenido en pantalla de bloqueo).

   {{< img src="service_management/mobile/android_notification_may_2025.png" alt="Configura los ajustes de las notificaciones de sistema de tu dispositivo Android." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Sonidos personalizados 
Tanto en iOS como en Android, tienes la opción de anular los sonidos de notificación predeterminados del sistema. La aplicación de Datadog viene precargada con una selección de sonidos personalizados.

## El modo Silencio y No molestar para On-Call
Puedes anular el volumen de sistema de tu dispositivo y el modo No molestar tanto para las notificaciones push (desde la aplicación móvil de Datadog) como para las notificaciones de telefonía (como llamadas de voz y SMS).

### Notificaciones push críticas
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_critical_may_2025.png" alt="Anula tu volumen de sistema del dispositivo de iOS y el modo No molestar." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Settings** > **On-Call** (Configuración > On-Call).

2. Activa el conmutador **Critical Alerts** (Alertas críticas). Las alertas críticas ignoran el interruptor de Silencio y No molestar. Si activas las alertas críticas, el sistema reproduce el sonido de una alerta crítica independientemente de la configuración de silencio o de No molestar del dispositivo.

3. En los ajustes del sistema iOS, asegúrate de activar la opción **Alertas críticas**. Asegúrate de conceder a la aplicación móvil los permisos necesarios.

4. Selecciona tu dispositivo para **Notificaciones muy urgentes** o **Notificaciones poco urgentes** en la sección Preferencias de notificación.

5. Prueba la configuración de tu notificación push crítica tocando **Test push notifications** (Probar notificaciones push).

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_critical_may_2025.png" alt="Anula tu volumen del sistema del dispositivo de Android y el modo No molestar." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Settings** > **On-Call** (Configuración > On-Call).

{{< img src="service_management/mobile/android_allow_notification_may_2025.png" alt="Anula tu volumen del sistema del dispositivo de Android y el modo No molestar." style="width:100%;" >}}

2. Si faltan permisos de notificación, pulsa **Bypass Do Not Disturb** (Anular No molestar) y activa **Allow notifications** (Permitir notificaciones) en System Settings (Ajustes del sistema).

{{< img src="service_management/mobile/android_override_system_may_2025.png" alt="Anula tu volumen del sistema del dispositivo de Android y el modo No molestar." style="width:100%;" >}}

3. A continuación, pulsa **Bypass Do Not Disturb** (Ignorar No Molestar) y activa **Override Do Not Disturb** (Anular No Molestar) en Ajustes del sistema para On-Call de urgencia elevada.

**Para Samsung:** ve a las opciones **Settings** > **Notifications** > **Do Not Disturb** > **App notification** (Configuración > Notificaciones > No molestar > Notificación de la aplicación) del dispositivo. Selecciona Datadog como aplicación que omite No molestar.

{{< img src="service_management/mobile/android_override_system_volume_may_2025.png" alt="Anula tu volumen del sistema del dispositivo de Android y el modo No molestar." style="width:100%;" >}}

4. Para anular el volumen del sistema, toca **Override system volume** (Anular volumen del sistema) y permite **Mode access** (Modo de acceso) en System Settings (Configuración del sistema) para activar **Override system volume** (Anular volumen del sistema).

5. En la web, configura las preferencias de notificación para **Notificaciones muy urgentes** o **Notificaciones poco urgentes**.

6. Prueba la configuración de tu notificación push crítica tocando **Test push notifications** (Probar notificaciones push).

<div class="alert alert-warning">
En Android, la aplicación móvil de Datadog no puede omitir los ajustes de volumen del sistema o de No molestar cuando se utiliza dentro de un perfil de trabajo. Como solución, instala la aplicación móvil de Datadog en tu perfil personal.
</div>

{{% /tab %}}
{{< /tabs >}}
### Sonidos y volumen personalizados para un push crítico
Para las notificaciones de alta urgencia, Datadog recomienda encarecidamente personalizar los sonidos del sistema y la configuración del volumen. Esto garantiza que las alertas no solo sean más claras y reconocibles, sino también más eficaces a la hora de captar la atención. Testea tus preferencias de notificación para confirmar que se comportan como esperas.

### Canales de telefonía (llamadas de voz y SMS)

Para mayor fiabilidad, Datadog utiliza un conjunto rotatorio de números de teléfono para ponerse en contacto contigo. Para que tu teléfono reconozca las llamadas y mensajes de Datadog On-Call, puedes crear una tarjeta de contacto digital. Esta tarjeta se actualiza automáticamente con los últimos números de teléfono de Datadog. Puedes asignar permisos especiales a este contacto en la configuración del sistema para mejorar la funcionalidad, como eludir el modo No molestar.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_sync_card_may_2025.png" alt="Anula el modo No molestar del dispositivo iOS para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

2. Activa **Enable Automatic Contact Card Sync** (Activar sincronización automática de tarjetas de contacto). Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los últimos números de teléfono de Datadog.

3. Una vez creado este contacto, abre los ajustes del sistema iOS y ve a **Focus** > **Do Not Disturb** (Enfoque > No molestar).

4. En **People** (Personas), permite notificaciones desde el contacto de Datadog On-Call. Si has activado las alertas críticas para las aplicaciones push de Datadog, la aplicación móvil de Datadog también aparecerá en **Aplicaciones**.

5. Para omitir el modo silencioso, desplázate hasta el contacto de Datadog On-Call >> pulsa **Ringtone** (Tono de llamada) >> activa **Emergency Bypass** (Anulación de emergencia).
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/mobile/android_sync_card_may_2025.png" alt="Anula tu modo No molestar del dispositivo de Android para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Settings** > **On-Call** (Configuración > On-Call).

2. En **Phone & SMS** (Teléfono y SMS), activa **Automatic Contact Card Sync** (Sincronización automática de tarjetas de contacto). Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los últimos números de teléfono de Datadog.

3. Una vez creado este contacto, márcalo como favorito.

4. Abre la configuración del sistema Android y ve a **Sound & Vibration** > **Do Not Disturb** (Sonido y vibración > No molestar). Crea una excepción para el contacto de Datadog On-Call.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Descarga la versión actual de la tarjeta de contacto de Datadog On-Call</a>. <strong>Nota</strong>: La tarjeta de contacto está sujeta a cambios en cualquier momento.
</div>

## Widgets móviles de On-Call
Añade widgets de pantalla de inicio y pantalla de bloqueo de On-Call para acceder fácilmente a tus páginas y turnos.

### Widget de la pantalla de inicio de On-Call

Ve tus turnos y las páginas de On-Call en la pantalla de inicio de tu móvil con los widgets de Datadog.

Puedes personalizar tus widgets de turnos de On-Call filtrando en:

- Organización
- Periodo de tiempo

Puedes personalizar tus widgets de página de On-Call filtrando en:

- Organización
- Equipo
- Pedido

**Nota**: Puedes añadir filtros adicionales para el widget de páginas de On-Call.

#### Editar un widget de turno de On-Call

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_shifts_widget_may_2025.png" alt="Página de inicio configurada de widgets de turno de On-Call que se muestran en pantallas de iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Mantén pulsado el widget durante un rato para configurarlo.
2. Pulsa **Edit Widget** (Editar widget) para acceder a la pantalla de configuración.
3. Selecciona la **Organization** (Organización) y el **Period** (Periodo) para el que deseas ver tus turnos de On-Call.
4. Pulsa en cualquier lugar fuera del widget para validar tus preferencias y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_shifts_widget_may_2025.png" alt="Página de inicio configurada de widgets de turno de On-Call que se muestran en pantallas de Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Pulsa sobre el widget para configurarlo.
2. Selecciona la **Organization** (Organización) y el **Time Period** (Periodo de tiempo) para el que deseas ver tus turnos de On-Call.
3. Pulsa **✓** para guardar la configuración.
4. Mantén pulsado el widget durante un rato para elegir el tamaño que prefieras.

{{% /tab %}}
{{< /tabs >}}

### Widget de pantalla de bloqueo de On-Call

El widget de pantalla de bloqueo de On-Call muestra tu estado de On-Call. Los widgets de la pantalla de bloqueo solo están disponibles en iOS.

1. Pulsa prolongadamente en la pantalla de bloqueo.
2. Pulsa **Customize** (Personalizar) y, a continuación, **Lock Screen** (Pantalla de bloqueo).
3. Pulsa en el espacio para widgets de la pantalla de bloqueo para abrir la tarjeta **Add Widgets** (Añadir widgets).
4. Desplázate y pulsa sobre la aplicación **Datadog**.
4. Pulsa el widget de pantalla de bloqueo de On-Call.
5. Toca el widget en la pantalla de bloqueo para abrir el panel de configuración.
6. Selecciona la organización para la que deseas mostrar tu estado de On-Call.

**Nota**: Debes tener un espacio vacío en tu pantalla de bloqueo para añadir un nuevo widget. Puedes eliminar widgets de la pantalla de bloqueo pulsando el botón **-** en la parte superior izquierda del widget que deseas eliminar.

## Solucionar problemas
Si necesitas ayuda para solucionar problemas, [ponte en contacto con el servicio de asistencia de Datadog][2]. También puedes enviar un mensaje en el canal [público de Slack de Datadog][3] [#mobile-app][4].

[1]: /es/service_management/mobile/?tab=ios
[2]: /es/help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG