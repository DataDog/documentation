---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: Datadog On-Call
title: Configuración del perfil
---

<div class="alert alert-info">
Para utilizar Datadog On-Call en tu dispositivo móvil, instala la <a href="/mobile#installing">aplicación móvil de Datadog</a>.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call no es compatible con el <a href="/getting_started/site">sitio Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Debes [configurar tu configuración del perfil][1] antes de poder recibir páginas de On-Call. Tu perfil incluye la configuración de los métodos de contacto, la comprobación de esos métodos y las preferencias de notificaciones. Esto garantiza que recibas las páginas a tiempo y de forma eficaz.

## Configura tu perfil de On-Call

Ve a [Mi perfil de On-Call][1] para configurar tus parámetros.

### Métodos de contacto
{{< img src="service_management/oncall/contact_methods.png" alt="Añadir métodos de contacto en la configuración del perfil de On-Call. Se configuran un número de teléfono, un correo electrónico y un dispositivo móvil. El número de teléfono está en el estado de movimiento del mouse, en el que se muestra 'Test llamada' y 'Test opciones de SMS" style="width:100%;" >}}
   - Debes añadir manualmente tu correo electrónico o número de teléfono. Después, la pantalla te solicitará tu consentimiento para localizarte por SMS. Si das tu consentimiento, aparecerá un distintivo verde junto a tu número de teléfono, que indica que puede utilizarse para las siguientes preferencias de notificación por SMS.
   - Si la [aplicación móvil][2] de Datadog está instalada en tu dispositivo, este aparecerá automáticamente en esta lista. Check tus parámetros en la aplicación móvil para asegurarte de que tu dispositivo pueda recibir notificaciones.
   - Datadog te recomienda que realices un test de cada uno de tus métodos de contacto. Pasa el mouse por encima de tu método de contacto para ver las opciones de test.

#### Métodos de contacto admitidos
- Notificaciones push a través de la [aplicación móvil de Datadog][3]
- Correos electrónicos (en formato HTML o de texto)
- SMS
- Llamadas telefónicas

Para configurar tu dispositivo móvil, incluida la manera de **eludir el modo No molestar**, consulta [Configura Datadog On-Call en tu dispositivo móvil][4].

### Preferencias de notificaciones
Las preferencias de notificaciones te permiten adaptar cómo y cuándo se le avisa a **ti** de las páginas On-Call en función de la urgencia de la situación. Al configurar las preferencias de baja urgencia y alta urgencia, puedes asegurarte de que las notificaciones sean eficaces y discretas, según la urgencia de la página. La urgencia de una página se determina en [Procesar reglas][5].

El sistema realiza un ciclo por las preferencias de notificaciones configuradas hasta que acuses recibo de la página o la página se transfiera a la siguiente persona de guardia, tal y como se define en [Política de elevación][6].

#### Notificaciones de alta urgencia
{{< img src="service_management/oncall/high_urgency_notification_preferences.png" alt="Configurar preferencias de notificaciones de alta urgencia en la configuración del perfil de On-Call: Configura en 'Cuando se active una página de alta urgencia' para notificar a un número de teléfono de inmediato a fin de que responda rápidamente a páginas críticas" style="width:100%;" >}}

Configura tus páginas de alta urgencia (alertas de monitor P1, amenazas a la seguridad SEV-1, incidencias SEV-1, etc.), para exigir atención y elevación inmediatas.

Por ejemplo, puedes configurar On-Call para iniciar con una notificación push, llamar después de un minuto y enviar una notificación push de seguimiento si no se acusa recibo después de dos minutos.

##### Mejores prácticas para la alta urgencia
- Utiliza las notificaciones push inmediatas y las llamadas telefónicas como método principal de notificación para las páginas críticas.
- Mantén intervalos de seguimiento cortos para garantizar un acuse de recibo rápido.
- Planifica cuidadosamente las políticas de elevación para evitar que se pierdan respuestas durante las emergencias.

#### Notificaciones de baja urgencia
{{< img src="service_management/oncall/low_urgency_notification_preferences.png" alt="Configurar preferencias de notificaciones de baja urgencia en la configuración del perfil de On-Call: Configura 'Cuando se active una página de baja urgencia' para notificar por correo electrónico de inmediato pero no elevarla más" style="width:100%;" >}}

Configura tus páginas de baja urgencia (cuestiones no bloqueantes, señales informativas, etc.), para minimizar las interrupciones y asegurarte al mismo tiempo de que te mantengas informado. Por ejemplo, puedes optar por sólo a ti mismo por correo electrónico.

### Otras notificaciones
{{< img src="service_management/oncall/settings_shift_reminder.png" alt="Configurar un recordatorio de turno en la configuración del perfil de On-Call. Se configura un recordatorio de turno para notificar a un número de teléfono 10 minutos antes de que comience el turno" style="width:100%;" >}}

En **Otras notificaciones**, puedes optar por recibir un **Recordatorio de turno** antes de que comience tu turno de On-Call.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/profile
[2]: /es/service_management/mobile/?tab=ios
[3]: /es/mobile
[4]: /es/service_management/on-call/guides/configure-mobile-device-for-on-call
[5]: /es/service_management/on-call/processing_rules
[6]: /es/service_management/on-call/escalation_policies
