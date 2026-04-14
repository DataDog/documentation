---
app_id: jumpcloud
categories:
- gestión de eventos
- seguridad
custom_kind: integración
description: Ver eventos de Jumpcloud en Datadog
media: []
title: Jumpcloud
---
## Información general

JumpCloud es una plataforma de directorios basada en la nube que ofrece un enfoque unificado de los servicios de Active Directory y LDAP centrados en la autenticación de usuarios y la gestión de redes.

Con JumpCloud, las empresas pueden gestionar y proporcionar acceso de usuario a software, sistemas y redes; imponer el cumplimiento con registros de auditoría; y proporcionar una experiencia de inicio de sesión unificada a través del inicio de sesión único (SSO). Como plataforma nativa en la nube, JumpCloud permite una forma remota y flexible de gestionar la TI, ofreciendo soluciones de seguridad sin dominio para las necesidades tradicionales de directorio.

La integración de JumpCloud proporciona acceso a lo siguiente:

- Eventos de directorio: logs sobre la actividad en el portal, incluidos los cambios de administrador en
  el directorio y las autenticaciones de administrador/usuario en el portal.

- Eventos de SAML: logs sobre autenticaciones de usuarios en aplicaciones SAML.

- Eventos de RADIUS: logs sobre autenticaciones de usuarios a RADIUS utilizadas para WiFi y VPNs.

- Eventos de MacOS, Windows, y Linux: logs sobre autenticaciones de usuarios en sistemas
  incluidos eventos relacionados con el Agent en actualizaciones claves de bloqueo, cambios de contraseña y File Disk
  Actualizaciones de claves de cifrado.

- Eventos de LDAP: logs sobre autenticaciones de usuarios en LDAP, incluidos tipos de eventos de LDAP de unión y
  Tipos de evento de búsqueda.

- Eventos de MDM: logs sobre los resultados del comando MDM.

Para obtener más información, consulta [Monitorizar tu directorio JumpCloud con Datadog](https://www.datadoghq.com/blog/monitor-jumpcloud-directory/) y la [referencia de la API Insights](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html).

## Configuración

### Instalación

No requiere instalación.

### Configuración

Consulta el cuadro de integración para más detalles. Se requiere una clave de API del Portal de administrador de
JumpCloud.

## Datos recopilados

### Logs

Los logs se recopilan desde un único endpoint de la API. Consulta la [API Insights](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html).

### Métricas

La integración de JumpCloud no incluye métricas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).