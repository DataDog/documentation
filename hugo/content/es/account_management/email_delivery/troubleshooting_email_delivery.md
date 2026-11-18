---
description: Diagnostique y resuelva un problema con un correo electrónico de Datadog
  que un destinatario no recibió.
further_reading:
- link: /help/
  tag: Documentación
  text: Comuníquese con Datadog Support
- link: /account_management/email_delivery/how_email_delivery_works/#delivery-status
  tag: Documentación
  text: Definiciones de estado y supresión
- link: /account_management/email_delivery/setting_up_reliable_delivery/
  tag: Documentación
  text: Evite fallos con remitentes de confianza y autenticación
- link: /account_management/audit_trail/guides/track_email_delivery/#check-whether-an-email-was-delivered
  tag: Guía
  text: Consulte eventos de entrega y configure alertas
private: true
site_support_id: email_delivery
title: Solución de problemas de entrega de correo electrónico
---
## Descripción general {#overview}

Cuando un usuario informe que no recibió un correo electrónico de Datadog, utilice esta página para diagnosticar y solucionar el problema. Para auditar eventos de entrega en toda su organización o configurar alertas, consulte [Seguimiento de la entrega de correo electrónico en su organización][1].

## Pasos de solución de problemas {#troubleshooting-steps}

1. Verifique el resultado de la entrega en [Email Delivery][2], filtrando por la dirección del destinatario:
   - **Delivered**: Pídale al destinatario que verifique su carpeta de correo no deseado o spam, además de cualquier regla de buzón o lista de bloqueo que filtre el correo de Datadog.
   - **Bounced**: El servidor de correo receptor rechazó el mensaje y devolvió un motivo. Corrija la dirección si no es válida o el buzón si está lleno. Si el servidor filtra o bloquea el correo de Datadog, [agregue a Datadog a sus remitentes de confianza][3] y comparta el motivo y la marca de tiempo del evento con su administrador de correo electrónico.
   - **Dropped**: La dirección está suprimida. Consulte [Supresiones de correo electrónico][4] para saber cómo eliminarla.
2. Si el correo electrónico sigue sin aparecer, comuníquese con [Datadog Support][5] para su revisión.

## Investigue un correo electrónico fallido {#investigate-a-failed-email}

Rastree un fallo desde el panel de Email Delivery hasta el evento de auditoría subyacente:

1. En la tabla **Email Delivery Failures**, haga clic en la fila del destinatario afectado o del tipo de correo electrónico.
2. Seleccione **View audit events** para abrir el Audit Trail completo de ese intento de entrega.
3. Haga clic en un evento de auditoría individual para inspeccionar los detalles de la entrega, incluido el código SMTP, la respuesta del servidor de correo y la información del destinatario.

## Razones comunes por las que falla el correo electrónico {#common-reasons-email-fails}

| Razón                                        | Qué significa                                                                                                                                                          | Qué hacer                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buzón no encontrado                             | La dirección del destinatario no existe.                                                                                                                                  | Verifique si hay errores tipográficos o un buzón eliminado, luego corrija la dirección y envíe de nuevo.                                                                                                                       |
| Buzón lleno                                  | La bandeja de entrada del destinatario supera la cuota.                                                                                                                                     | Pídale al destinatario que libere espacio en la bandeja de entrada y luego envíe de nuevo.                                                                                                                                           |
| Remitente no autenticado o bloqueado por una política | El servidor de correo del destinatario o una política de grupo rechazó al remitente de Datadog, a menudo debido a un problema de autenticación (SPF, DKIM, DMARC) o a una regla que exige remitentes autenticados.        | Pídale al administrador de correo del destinatario que [agregue a Datadog a su lista de remitentes de confianza][3]. Si la respuesta menciona un error de [autenticación del remitente][6] o de DMARC, comuníquese con [Datadog Support][5], ya que resolverlo puede involucrar a ambas partes. |
| Suprimido (descartado)                          | Una regla de supresión, una configuración de cuenta o una protección del sistema bloquearon el mensaje, generalmente después de un rebote anterior.                                                        | Consulte [Supresiones de correo electrónico][4].                                                                                                                                                                        |
| Marcado como spam                               | El servidor de correo del destinatario o la puerta de enlace de seguridad clasificaron el mensaje como spam según su contenido.                                                                     | Consulte [Puertas de enlace de seguridad de correo electrónico][7].                                                                                                                                                                   |

**Nota**: El servidor de correo del destinatario genera respuestas SMTP y no siempre son precisas. Úselas como una señal fuerte, no como una garantía de la causa exacta.

## Supresiones de correo electrónico {#email-suppressions}

Después de que un correo electrónico rebota, Datadog agrega la dirección a una lista de supresión y deja de enviar mensajes a ella hasta que se elimine la supresión.

Comuníquese con [Datadog Support][5] y proporcione estos elementos para eliminar la supresión:

- La dirección de correo electrónico del destinatario bloqueado
- Un enlace al evento de rebote en el panel de Email Delivery o en Audit Trail

**Nota**: Eliminar una supresión no soluciona la causa subyacente. Si el error persiste después de la eliminación, comparta la marca de tiempo del evento y la respuesta SMTP con su administrador de correo electrónico o proveedor de correo para investigar más a fondo.

## Cuando no aparece ningún evento de entrega {#when-no-delivery-event-appears}

Algunos errores nunca producen un evento de entrega, porque Datadog no intenta el envío. Si no puede encontrar ningún evento para un destinatario, verifique si la cuenta se encuentra en uno de estos estados:

- **Usuarios no verificados**: Invitados, pero aún no han aceptado la invitación.
- **Usuarios deshabilitados**: Los usuarios desactivados no reciben notificaciones, incluidos los [resúmenes por correo electrónico][8].

## Puertas de enlace de seguridad de correo electrónico {#email-security-gateways}

Si su organización enruta el correo entrante a través de una puerta de enlace de seguridad de correo electrónico o mediante la protección integrada en su plataforma de correo, esta puede poner en cuarentena o bloquear el correo electrónico de Datadog incluso cuando sus entradas de remitente confiable y la autenticación del remitente estén configuradas correctamente. Las puertas de enlace aplican su propio filtrado, por lo que un mensaje puede pasar SPF, DKIM y DMARC y aun así ser retenido.

Si el correo electrónico de Datadog sigue sin llegar, comuníquese con el proveedor de su puerta de enlace de seguridad de correo electrónico. Una puerta de enlace suele ser la causa cuando Email Delivery muestra un mensaje como Delivered, pero el destinatario no puede encontrarlo, ni siquiera en su carpeta de spam o correo no deseado, o cuando los mensajes se bloquean para direcciones válidas. Comparta las marcas de tiempo del evento de Email Delivery para que el proveedor pueda localizar los mensajes afectados y confirmar por qué fueron puestos en cuarentena o bloqueados.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/audit_trail/guides/track_email_delivery/
[2]: https://app.datadoghq.com/dash/integration/email_delivery_tracking
[3]: /es/account_management/email_delivery/setting_up_reliable_delivery/#add-datadog-to-your-trusted-senders
[4]: #email-suppressions
[5]: /es/help/
[6]: /es/account_management/email_delivery/setting_up_reliable_delivery/#check-your-sender-authentication
[7]: #email-security-gateways
[8]: /es/account_management/#email-subscriptions