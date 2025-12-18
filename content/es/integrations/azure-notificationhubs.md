---
aliases:
- /es/integrations/azure_notification_hubs
app_id: azure-notificationhubs
categories:
- azure
- nube
- notificaciones
custom_kind: integración
description: Rastrea las métricas principales de Azure Notification Hubs.
media: []
title: Centros de notificaciones de Azure
---
## Información general

Azure Notification Hubs proporciona un motor de inserción escalable y fácil de usar que te permite enviar notificaciones a cualquier plataforma (iOS, Android, Windows, Kindle, Baidu, etc.) desde cualquier backend (en la nube o en las instalaciones).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Notification Hubs.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.notificationhubs_namespaces_notificationhubs.incoming** <br>(count) | El count de todas las llamadas a la API de envío realizadas con éxito.<br>_Mostrado como solicitud_ |
| **azure.notificationhubs_namespaces_notificationhubs.incoming.all.failedrequests** <br>(count) | Total de solicitudes entrantes fallidas para un centro de notificaciones<br>_Mostrado como solicitud_ |
| **azure.notificationhubs_namespaces_notificationhubs.incoming.all.requests** <br>(count) | Total de solicitudes entrantes para un centro de notificaciones<br>_Mostrado como solicitud_ |
| **azure.notificationhubs_namespaces_notificationhubs.incoming.scheduled** <br>(count) | Notificaciones de envíos programadas canceladas|
| **azure.notificationhubs_namespaces_notificationhubs.incoming.scheduled.cancel** <br>(count) | Notificaciones de envíos programadas canceladas|
| **azure.notificationhubs_namespaces_notificationhubs.installation.all** <br>(count) | Operaciones de gestión de la instalación<br>_Mostrada como operación_ |
| **azure.notificationhubs_namespaces_notificationhubs.installation.delete** <br>(count) | Borrar operaciones de instalación<br>_Mostrada como operación_ |
| **azure.notificationhubs_namespaces_notificationhubs.installation.get** <br>(count) | Obtener operaciones de instalación<br>_Mostrado como operación_ |
| **azure.notificationhubs_namespaces_notificationhubs.installation.patch** <br>(count) | Operaciones de instalación de parches<br>_Mostrada como operación_ |
| **azure.notificationhubs_namespaces_notificationhubs.installation.upsert** <br>(count) | Crear o actualizar operaciones de instalación<br>_ Mostrada como operación_. |
| **azure.notificationhubs_namespaces_notificationhubs.notificationhub.pushes** <br>(count) | Todas las notificaciones salientes del centro de notificaciones|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.allpns.badorexpiredchannel** <br>(count) | Count de envíos que fallaron porque el identificador de canal/token/inscripción en el registro había caducado o no era válido.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.allpns.channelerror** <br>(count) | Count de envíos que fallaron porque el canal no era válido, no estaba asociado a la aplicación correcta o había expirado.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.allpns.invalidpayload** <br>(count) | Count de envíos que fallaron porque el PNS devolvió un error de carga útil incorrecta.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.allpns.pnserror** <br>(count) | Count de envíos que fallaron porque hubo un problema de comunicación con el PNS (excluye los problemas de autenticación).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.allpns.success** <br>(count) | Count de todas las notificaciones realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.badchannel** <br>(count) | Count de envíos que han fallado porque el token no es válido (código de estado APNS: 8).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.expiredchannel** <br>(count) | Count de tokens que se invalidaron por el canal de retroalimentación de APNS.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.invalidcredentials** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas o las credenciales están bloqueadas.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.invalidnotificationsize** <br>(count) | Count de envíos que fallaron porque la carga útil era demasiado grande (código de estado APNS: 7).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.pnserror** <br>(count) | Count de envíos fallidos debido a errores en la comunicación con APNS.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.apns.success** <br>(count) | Count de todas las notificaciones realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.authenticationerror** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas, las credenciales están bloqueadas o el identificador del remitente no está configurado correctamente en la aplicación (resultado de GCM: MismatchedSenderId).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.badchannel** <br>(count) | Count de envíos que fallaron porque no se reconoció el identificador de inscripción en el registro (resultado de GCM: Registro no válido).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.expiredchannel** <br>(count) | Count de envíos que fallaron porque el identificador de inscripción en el registro estaba caducado (resultado GCM: NotRegistered).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.invalidcredentials** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas o las credenciales están bloqueadas.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.invalidnotificationformat** <br>(count) | Count de envíos que fallaron porque la carga útil no estaba formateada correctamente (resultado de GCM: InvalidDataKey o InvalidTtl).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.invalidnotificationsize** <br>(count) | Count de envíos que fallaron porque la carga útil era demasiado grande (resultado de GCM: MessageTooBig).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.pnserror** <br>(count) | Count de envíos que fallaron debido a errores de comunicación con GCM.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.success** <br>(count) | Count de todas las notificaciones realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.throttled** <br>(count) | Count de envíos que fallaron porque GCM limitó esta aplicación (código de estado de GCM: 501-599 o resultado:No disponible).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.gcm.wrongchannel** <br>(count) | Count de envíos que han fallado porque el identificador de inscripción en el registro no está asociado a la aplicación actual (resultado de GCM: InvalidPackageName).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.authenticationerror** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas o las credenciales están bloqueadas.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.badchannel** <br>(count) | Count de envíos que han fallado porque no se ha reconocido el URI del canal del registro (estado MPNS: 404 no encontrado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.channeldisconnected** <br>(count) | Count de envíos fallidos porque el URI del canal del registro estaba desconectado (estado MPNS: 412 no encontrado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.dropped** <br>(count) | Count de envíos descartados por MPNS (encabezado de respuesta de MPNS: Estado de notificación X: Cola completa o suprimida).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.invalidcredentials** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas o las credenciales están bloqueadas.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.invalidnotificationformat** <br>(count) | Count de envíos que fallaron porque la carga útil de la notificación era demasiado grande.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.pnserror** <br>(count) | Count de envíos que fallaron debido a errores de comunicación con MPNS.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.success** <br>(count) | Count de todas las notificaciones realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.mpns.throttled** <br>(count) | Count de envíos fallidos porque MPNS está limitando esta aplicación (WNS MPNS: 406 No aceptable).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.authenticationerror** <br>(count) | Notificación no entregada debido a errores de comunicación con Windows Live credenciales no válidas o token erróneo.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.badchannel** <br>(count) | Count de envíos que fallaron porque no se reconoció el URI del canal en el registro  (estado WNS: 404 no encontrado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.channeldisconnected** <br>(count) | La notificación se ha eliminado porque el URI del canal del registro está limitado (encabezado de respuesta WNS: Estado de la conexión del dispositivo de X-WNS: desconectado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.channelthrottled** <br>(count) | La notificación se ha eliminado porque el URI del canal del registro está limitado (encabezado de respuesta WNS: Estado de la notificación de X-WNS:canal limitado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.dropped** <br>(count) | La notificación se ha eliminado porque el URI del canal del registro está limitado (Estado de notificación de X-WNS: eliminado, pero no Estado de conexión del dispositivo de X-WNS: desconectado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.expiredchannel** <br>(count) | Count de envíos que han fallado porque el URI del canal ha caducado (estado WNS: 410 Perdido).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.invalidcredentials** <br>(count) | Count de envíos que fallaron porque el PNS no aceptó las credenciales proporcionadas o las credenciales están bloqueadas (Windows Live no reconoce las credenciales).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.invalidnotificationformat** <br>(count) | El formato de la notificación no es válido (estado WNS: 400). Tenga en cuenta que WNS no rechaza todas las cargas útiles no válidas.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.invalidnotificationsize** <br>(count) | La carga útil de la notificación es demasiado grande (estado WNS: 413).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.invalidtoken** <br>(count) | El token proporcionado a WNS no es válido (estado de WNS: 401 No autorizado).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.pnserror** <br>(count) | Notificación no entregada debido a errores de comunicación con WNS.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.success** <br>(count) | Count de todas las notificaciones realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.throttled** <br>(count) | Count de envíos fallidos porque WNS está limitando esta aplicación (estado de WNS: 406 No aceptable).|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.tokenproviderunreachable** <br>(count) | Windows Live no está localizable.|
| **azure.notificationhubs_namespaces_notificationhubs.outgoing.wns.wrongtoken** <br>(count) | El token proporcionado a WNS es válido, pero para otra aplicación (estado de WNS: 403 Prohibido). Esto puede ocurrir si el URI del canal del registro está asociado a otra aplicación. Comprueba que la aplicación del cliente esté asociada a la misma aplicación cuyas credenciales están en el centro de notificaciones.|
| **azure.notificationhubs_namespaces_notificationhubs.registration.all** <br>(count) | Count de todas las operaciones de registro realizadas con éxito (creaciones, actualizaciones, consultas y eliminaciones).<br>_Mostrado como operación_ |
| **azure.notificationhubs_namespaces_notificationhubs.registration.create** <br>(count) | Count de todas las creaciones de registro realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.registration.delete** <br>(count) | Count de todas las eliminaciones de registros realizadas con éxito.|
| **azure.notificationhubs_namespaces_notificationhubs.registration.get** <br>(count) | Count de todas las consultas de registro realizadas con éxito.<br>_Mostrado como consulta_ |
| **azure.notificationhubs_namespaces_notificationhubs.registration.update** <br>(count) | Count de todas las actualizaciones de registro realizadas con éxito.<br>_Mostrado como actualización_ |
| **azure.notificationhubs_namespaces_notificationhubs.scheduled.pending** <br>(count) | Notificaciones programadas pendientes|
| **azure.notificationhubs_namespaces.count** <br>(gauge) | Count de la integración de Centros de notificaciones de Azure|

### Eventos

La integración Azure Notification Hubs no incluye ningún evento.

### Checks de servicio

La integración Azure Notification Hubs no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).