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
3. [Evitar el modo silencio y No molestar](#circumvent-mute-and-do-not-disturb-mode): recibe notificaciones push, llamadas de voz y SMS mientras tu dispositivo está en modo No molestar.

## Establecer notificaciones push
<div class="alert alert-info">
Cuando accedes por primera vez a la aplicación móvil de Datadog, un flujo de integración se encarga de la configuración y los permisos de notificación.
</div>

Por defecto, la aplicación móvil no puede enviarte notificaciones. Para recibir notificaciones push en eventos de On-Call:

{{< tabs >}}
{{% tab "iOS" %}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

   {{< img src="service_management/oncall/app_settings_iOS.png" alt="Encuentra la configuración de notificación en la versión de iOS de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Activa la casilla **Enable Notifications** (Habilitar notificaciones). Si es la primera vez que activas las notificaciones, se abrirá una solicitud de permisos. Concede el permiso y, a continuación, vuelve a tocar **Enable Notifications** (Activar notificaciones) para ir a la configuración del sistema iOS.

   {{< img src="service_management/oncall/system_notifications_settings_iOS.png" alt="Configura los ajustes de notificación del sistema de tu dispositivo iOS." style="width:100%;" >}}

3. En la configuración del sistema iOS, asegúrate de activar la opción **Allow Notifications** (Permitir notificaciones). Datadog recomienda encarecidamente que también actives las opciones **Sound** (Sonido) y **Badges** (Distintivos).

Asegúrate de conceder a la aplicación móvil los permisos necesarios.
{{% /tab %}}

{{% tab "Android" %}}
1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

   {{< img src="service_management/oncall/app_settings_android.png" alt="Encuentra los ajustes de notificación en la versión Android de la aplicación móvil de Datadog." style="width:35%;" >}}

2. Pulsa **Notifications** (Notificaciones) para ir a la configuración del sistema y configurar tus notificaciones de aplicación preferidas.

   {{< img src="service_management/oncall/system_notifications_settings_android.png" alt="Configura los ajustes de notificación del sistema de tu dispositivo Android." style="width:100%;" >}}

3. En la configuración del sistema Android, asegúrate de activar la opción **Allow Notifications** (Permitir notificaciones). Datadog recomienda encarecidamente que también actives la opción **Allow sound and vibration** (Permitir sonido y vibración).

{{% /tab %}}{{< /tabs >}}

### Sonidos personalizados
Tanto en iOS como en Android, tienes la opción de anular los sonidos predeterminados de notificación del sistema. Para casos de notificaciones de alta urgencia, Datadog recomienda encarecidamente personalizar los sonidos del sistema y los ajustes de volumen. Esto asegura que las alertas no sólo sean más claras y reconocibles, sino también más eficaces a la hora de captar la atención. La aplicación de Datadog viene precargada con una selección de sonidos personalizados.

## Eludir el modo silencio y No molestar
Puedes anular el volumen de sistema de tu dispositivo y el modo No molestar tanto para las notificaciones push (desde la aplicación móvil de Datadog) como para las notificaciones de telefonía (como llamadas de voz y SMS).

### Notificaciones push
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/oncall/override_dnd_push_iOS.png" alt="Anular el volumen de sistema de tu dispositivo iOS y el modo No molestar." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

2. Activa el conmutador **Enable Critical Alerts** (Activar alertas críticas).

Las alertas críticas ignoran el interruptor de silencio y No molestar. Si activas las alertas críticas, el sistema reproduce el sonido de una alerta crítica independientemente de la configuración de silencio o No molestar del dispositivo.

Asegúrate de conceder a la aplicación móvil los permisos necesarios.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/oncall/override_dnd_push_android.png" alt="Anula el volumen de sistema y el modo No molestar del dispositivo Android." style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

2. Activa el conmutador **Override system volume** (Anular volumen del sistema). Esto te llevará a la configuración del sistema. Busca la fila de la aplicación móvil de Datadog y asegúrate de que la opción está activada.

<div class="alert alert-danger">
En Android, la aplicación móvil de Datadog no puede omitir los ajustes de volumen de sistema o de No molestar cuando se utiliza dentro de un perfil de trabajo. Como solución, instala la aplicación móvil de Datadog en tu perfil personal.
</div>

{{% /tab %}}{{< /tabs >}}

### Canales de telefonía (llamadas de voz y SMS)

Para mayor fiabilidad, Datadog utiliza un conjunto rotatorio de números de teléfono para ponerse en contacto contigo. Para que tu teléfono reconozca las llamadas y mensajes de Datadog On-Call, puedes crear una tarjeta de contacto digital. Esta tarjeta se actualiza automáticamente con los últimos números de teléfono de Datadog. Puedes asignar permisos especiales a este contacto en la configuración del sistema para mejorar la funcionalidad, como eludir el modo No molestar.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/oncall/override_dnd_telephony_iOS.png" alt="Anula el modo No molestar del dispositivo iOS para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

2. Activa **Enable Automatic Contact Card Sync** (Activar sincronización automática de tarjetas de contacto). Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los últimos números de teléfono de Datadog.

3. Una vez creado este contacto, abre los ajustes del sistema iOS y ve a **Focus** > **Do Not Disturb** (Enfoque > No molestar).

4. En **People** (Personas), permite notificaciones desde el contacto de Datadog On-Call. Si has activado las alertas críticas para las aplicaciones push de Datadog, la aplicación móvil de Datadog también aparecerá en **Applications** (Aplicaciones).
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/oncall/override_dnd_telephony_android.png" alt="Anula el modo No molestar del dispositivo Android para SMS y llamadas de voz" style="width:100%;" >}}

1. En la aplicación móvil de Datadog, ve a **Account** > **Settings** > **Notifications** (Cuenta > Configuración > Notificaciones).

2. En **Phone & SMS** (Teléfono y SMS), activa **Automatic Contact Card Sync** (Sincronización automática de tarjetas de contacto). Esto crea un contacto llamado "Datadog On-Call", que se actualiza regularmente con los últimos números de teléfono de Datadog.

3. Una vez creado este contacto, márcalo como favorito.

4. Abre los ajustes del sistema Android y ve a **Sound & vibration** > **Do Not Disturb** (Sonido y vibración > No molestar). Crea una excepción para el contacto de Datadog On-Call.

{{% /tab %}}{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Descarga la versión actual de la tarjeta de contacto de Datadog On-Call</a>. <strong>Nota</strong>: La tarjeta de contacto está sujeta a cambios en cualquier momento.
</div>

[1]: /es/service_management/mobile/?tab=ios