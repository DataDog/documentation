---
aliases:
- /es/security_platform/notification_profiles/
- /es/security_platform/notification_rules/
- /es/security_platform/notifications/rules/
- /es/security/notification_profiles/
- /es/security/notification_rules/
description: Crea reglas de notificación para notificar automáticamente a tu equipo
  e integraciones cuando se activen las reglas de detección de seguridad.
further_reading:
- link: /security/detection_rules/
  tag: Documentación
  text: Explorar las reglas de detección de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Reglas de notificación
---

{{< product-availability >}}

## Información general

Las reglas de notificación de seguridad desempeñan un papel clave a la hora de mantener a tu equipo informado de los problemas sin tener que editar manualmente las preferencias de notificación de cada regla de detección individual. Las reglas de notificación pueden extenderse a múltiples reglas de detección y señales basadas en parámetros como gravedad, tipos de reglas, etiquetas (tags) de reglas, atributos de señales y etiquetas de señales.

{{< img src="security/notification-profiles-overview3.png" alt="Reglas de notificación" style="width:100%;" >}}

## Crear reglas de notificación 

Para crear una regla de notificación, se define la lógica para cuando se activa la regla de notificación según condiciones como la gravedad, el tipo de regla de detección, etiquetas y atributos.

A medida que configuras la regla, aparece una vista previa de las incidencias que coinciden con las condiciones de la regla de notificación en el panel **Example of matching issues** (Ejemplo de incidencias coincidentes). Esto puede ser útil para determinar si la regla de notificación es demasiado específica o amplia.

1. En la página [**Notification Rules**][1] (Reglas de notificación), haz clic en **New Notification Rule** (Nueva regla de notificación).
2. En **Source Types** (Tipos de fuente), selecciona los tipos de reglas de detección que deseas incluir en la regla de notificación.
3. (Opcional) Para ASM, selecciona el tipo de fuente ASM Vulnerability Management, _o_ deje el tipo de fuente vacío y selecciona la casilla de verificación **Include Application level vulnerabilities** (Incluir vulnerabilidades a nivel de aplicación).
4. En **Rule Criteria** (Criterios de la regla), selecciona uno o varios niveles de gravedad.
5. Especifica las etiquetas y atributos que deben estar presentes para que se active la regla de notificación.
6. En **Notification Details** (Detalles de notificación), especifica los destinatarios a los que deseas notificar cuando se active la regla de notificación. Puedes notificar a individuos, equipos, crear problemas de Jira, etc. Consulta [Notificaciones][2] para obtener más información.
7. Introduce un nombre para la regla de notificación.
8. Haz clic en **Save and Activate** (Guardar y activar).

{{< img src="security/notification-profiles-setup3.png" alt="Configuración de una regla de notificación" style="width:100%;" >}}

Si la regla de notificación coincide con las condiciones especificadas, la notificación incluye detalles sobre la regla de notificación coincidente en el pie de página de la notificación.

## Gestionar las reglas de notificación 

### Activar o desactivar una regla de notificación 

Para activar o desactivar una regla de notificación, activa el conmutador de la tarjeta de regla de notificación.

### Editar una regla de notificación

Para editar una regla de notificación, haz clic en la tarjeta de regla de notificación. Cuando termines de realizar los cambios, haz clic en **Save and Activate** (Guardar y activar).

### Clonar una regla de notificación 

Para clonar una regla de notificación, haz clic en el menú vertical de tres puntos de la tarjeta de la regla de notificación y selecciona **Clone** (Clone).

### Eliminar una regla de notificación

Para eliminar una regla de notificación, haz clic en el menú vertical de tres puntos de la tarjeta de regla de notificación y selecciona **Delete** (Eliminar).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /es/security/notifications/#notification-channels