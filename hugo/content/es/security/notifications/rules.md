---
aliases:
- /es/security_platform/notification_profiles/
- /es/security_platform/notification_rules/
- /es/security_platform/notifications/rules/
- /es/security/notification_profiles/
- /es/security/notification_rules/
- /es/security/upcoming_changes_notification_rules/
description: Cree reglas de notificación para notificar automáticamente a su equipo
  e integraciones cuando se activen las reglas de detección de seguridad.
further_reading:
- link: /security/detection_rules/
  tag: Documentación
  text: Explore reglas de detección de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Reglas de notificación
---
{{< product-availability >}}

## Descripción general {#overview}

Las reglas de notificación son conjuntos predefinidos de condiciones que automatizan el proceso de informar a su equipo sobre problemas de seguridad. Al usar reglas de notificación, ya no necesita configurar manualmente las notificaciones para cada regla de detección individual. Las reglas de notificación se pueden configurar para cubrir una amplia gama de escenarios especificando parámetros como gravedades, tipos de reglas, etiquetas de reglas, atributos de señal y etiquetas de señal.

{{< img src="security/notification-rules-overview-1.png" alt="Página de descripción general de Reglas de notificación" style="width:100%;" >}}

## Crear reglas de notificación {#create-notification-rules}

Para crear una regla de notificación, especifique las condiciones bajo las cuales se debe activar la regla. Estas condiciones pueden incluir criterios como gravedad, tipo de regla de detección, etiquetas y atributos. Cuando un problema coincide con los criterios definidos, la regla envía notificaciones automáticamente a los destinatarios designados.

<div class="alert alert-info">A medida que configura la regla, aparece una vista previa de los problemas que coinciden con las condiciones de la regla de notificación en el panel <strong>Vista previa de resultados coincidentes</strong>. Esta vista previa le ayuda a determinar si su regla de notificación es demasiado específica o demasiado amplia, lo que le permite ajustar los criterios en consecuencia para una cobertura óptima.</div>

1. En la página [**Reglas de notificación**][1], haga clic en {{< ui >}}New Notification Rule{{< /ui >}}.
1. Ingrese un **Nombre** para la regla de notificación.
1. Seleccione el tipo de fuente para la regla de notificación:
    - **Hallazgo**: Una posible falla de seguridad en su infraestructura.
    - **Señal**: Actividad sospechosa que representa una amenaza activa contra su infraestructura.
1. Seleccione uno o más niveles de gravedad.
1. Especifique las etiquetas y atributos que deben estar presentes para que se active la regla de notificación.
   <div class="alert alert-tip">Si seleccionó <strong>Señal</strong> en el paso 3, puede recibir notificaciones de investigaciones completadas de <a href="/bits_ai/bits_security_analyst">Bits Security Analyst</a> agregando la etiqueta <code>@workflow.bits_investigator.state:*</code>.</div>
1. Si seleccionó **Hallazgo** en el paso 3, seleccione la frecuencia de las notificaciones:
   - **Agregar resultados durante**: Seleccione esta opción, seguida de un marco de tiempo de la lista, para recibir solo una notificación por las detecciones que ocurrieron durante ese marco de tiempo.
   - **Activar inmediatamente para cada problema individual que cumpla con los criterios**: Seleccione esta opción para recibir una notificación por cada detección.<br />**Nota**: Seleccionar esta opción puede resultar en una gran cantidad de notificaciones.
1. En **Destino**, seleccione un modo de enrutamiento:
    - **Enrutamiento manual**: Haga clic en {{< ui >}}Add Recipient{{< /ui >}} y especifique los destinatarios a los que desea notificar. Puede notificar a personas o Teams, crear problemas de Jira y más. Consulte [Canales de notificación][2] para obtener más información.
    - **Enrutamiento dinámico** (Vista previa): Enrute automáticamente las notificaciones al equipo responsable según la etiqueta `team` en los hallazgos. Especifique un **Canal de respaldo** para los hallazgos que no se pueden enrutar dinámicamente. Consulte [Enrutamiento dinámico](#dynamic-routing) para conocer los requisitos.<br />**Nota**: El enrutamiento dinámico solo está disponible cuando se selecciona **Activar inmediatamente para cada problema individual que cumpla con los criterios** en el paso 6.
1. Para enviar notificaciones de prueba para esta regla, haga clic en {{< ui >}}Test Notifications{{< /ui >}}.
  1. En el modal, seleccione los productos de seguridad que desea probar.
  1. Haga clic en {{< ui >}}Run Test{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Administrar reglas de notificación {#manage-notification-rules}

### Habilitar o deshabilitar una regla de notificación {#enable-or-disable-a-notification-rule}

Para habilitar o deshabilitar una regla de notificación, cambie el interruptor en la tarjeta de la regla de notificación.

### Editar una regla de notificación {#edit-a-notification-rule}

Para editar una regla de notificación, haga clic en la tarjeta de la regla de notificación. Después de terminar de realizar los cambios, haga clic en {{< ui >}}Save{{< /ui >}}.

### Clonar una regla de notificación {#clone-a-notification-rule}

Para clonar una regla de notificación, haga clic en el menú de tres puntos verticales en la tarjeta de la regla de notificación y seleccione {{< ui >}}Clone{{< /ui >}}.

### Eliminar una regla de notificación {#delete-a-notification-rule}

Para eliminar una regla de notificación, haga clic en el menú de tres puntos verticales en la tarjeta de la regla de notificación y seleccione {{< ui >}}Delete{{< /ui >}}.

## Enrutamiento dinámico {#dynamic-routing}

{{< callout url="https://www.datadoghq.com/product-preview/dynamic-routing-for-security-notifications/" >}}
El enrutamiento dinámico para reglas de notificación está en versión preliminar y solo está disponible para notificaciones de hallazgos no agregados.
{{< /callout >}}

El enrutamiento dinámico entrega automáticamente las notificaciones de hallazgos al equipo responsable de la corrección, según la etiqueta `team` adjunta al hallazgo. Esto elimina la necesidad de configurar manualmente los destinatarios para cada regla y ayuda a evitar canales de notificación generales.

El enrutamiento dinámico solo está disponible cuando se selecciona **Activar inmediatamente para cada problema individual que cumpla con los criterios** como frecuencia de notificación, y no está disponible para notificaciones de señales.

### Cómo funciona el enrutamiento {#how-routing-works}

Cuando un hallazgo activa una notificación, el sistema verifica todas las siguientes condiciones. Si se cumplen todas las condiciones, la notificación se envía al canal de Slack o Microsoft Teams del equipo. Si no se cumple alguna condición, la notificación se envía al canal de respaldo que configuró.

| Condición                                         | Descripción                                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Equipo configurado**                               | El equipo referenciado por la etiqueta `team` del hallazgo debe existir en [Datadog Teams][3].                                        |
| **Canal de Slack o Microsoft Teams del equipo definido** | Se debe configurar un [canal de notificación][4] de Slack o Microsoft Teams para el equipo en Datadog Teams. Otros destinos de notificación no se utilizan para el enrutamiento dinámico. |
| **Etiqueta de equipo en el hallazgo**                           | El hallazgo de seguridad debe tener exactamente una etiqueta `team` adjunta.                                                          |

Si un equipo tiene configurado un canal de Slack o Microsoft Teams y otros destinos de notificación, la notificación se envía únicamente al canal de Slack o Microsoft Teams.

### Canal de respaldo {#fallback-channel}

Cuando habilita el enrutamiento dinámico, debe especificar un canal de respaldo. El canal de respaldo recibe notificaciones en cualquiera de los siguientes casos:

- El hallazgo no tiene ninguna etiqueta `team` o tiene más de una etiqueta `team`.
- El equipo no existe en Datadog Teams.
- El equipo no tiene configurado ningún canal de notificación de Slack o Microsoft Teams.

El canal de respaldo también se utiliza para notificaciones de prueba.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /es/security/notifications/#notification-channels
[3]: /es/account_management/teams/
[4]: /es/account_management/teams/#send-notifications-to-a-specific-communication-channel