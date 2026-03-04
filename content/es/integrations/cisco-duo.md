---
aliases:
- /es/integrations/cisco_duo
app_id: cisco-duo
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre logs Cisco Duo.
integration_version: 1.0.0
media:
- caption: Cisco Duo - Logs de autenticación
  image_url: images/cisco_duo_authentication_logs.png
  media_type: imagen
- caption: Cisco Duo - Logs de actividad
  image_url: images/cisco_duo_activity_logs.png
  media_type: imagen
- caption: Cisco Duo - Logs de administrador
  image_url: images/cisco_duo_administrator_logs.png
  media_type: imagen
- caption: Cisco Duo - Logs de telefonía
  image_url: images/cisco_duo_telephony_logs.png
  media_type: imagen
- caption: Cisco Duo - Logs de inscripción sin conexión
  image_url: images/cisco_duo_offline_enrollment_logs.png
  media_type: imagen
title: Cisco Duo
---
## Información general

[Cisco Duo](https://duo.com/) es una solución de autenticación multifactor (MFA) y de acceso seguro. Añade una capa adicional de seguridad exigiendo a los usuarios que verifiquen su identidad a través de un segundo factor, como una aplicación móvil, antes de obtener acceso a aplicaciones o sistemas. Duo se utiliza a menudo para mejorar la seguridad del acceso remoto y ayuda a proteger contra el acceso no autorizado, incluso si las contraseñas se ven comprometidas.

Esta integración ingiere los siguientes logs:

- Autenticación
- Actividad
- Administrador
- Telefonía
- Inscripción sin conexión

La integración Cisco Duo recopila de forma constante logs de autenticación multifactor (MFA) y de acceso seguro, canalizándolos hacia Datadog para su análisis. Aprovechando el pipeline de logs integrado, estos logs se analizan y enriquecen, permitiendo realizar búsquedas y análisis con facilidad. La integración proporciona información sobre los eventos de autenticación fraudulenta, la cronología de la actividad de autenticación, las localizaciones de los dispositivos de autenticación a los que se accedió y mucho más, a través de dashboards predefinidos.

## Configuración

### Configuración

#### Obtener credenciales API de Cisco Duo

1. Inscríbete para obtener una [**cuenta Duo**](https://signup.duo.com/).
1. Inicia sesión en el [**panel de administrador de Duo**](https://admin.duosecurity.com/).
1. Ve a **Aplicaciones**.
1. Haz clic en **Protect an Application** (Proteger una aplicación) y busca la entrada de la _API de administrador_ en la lista de aplicaciones.
1. Haz clic en **Protect** (Proteger) para configurar la aplicación y recuperar tu `integration key`, `secret key` y `API hostname`. Esta información se utilizará para configurar la integración Cisco Duo.
1. Asegúrate de que el permiso _Conceder lectura de logs_ está seleccionado y haz clic en **Save Changes** (Guardar cambios).

#### Configuración de la integración Cisco Duo-Datadog

Configura el endpoint Datadog para reenviar logs de Cisco Duo a Datadog.

1. Ve a `Cisco Duo`.
1. Añade tus credenciales Cisco Duo.

| Parámetros de Cisco Duo | Descripción  |
| -------------------- | ------------ |
| host                 | El nombre de host de la API de Cisco Duo. Es la parte `XXXXXXXX` de `https://api-XXXXXXXX.duosecurity.com`.  |
| Clave de integración      | La clave de la integración Cisco Duo.    |
| Clave secreta           | La clave secreta de Cisco Duo.         |

## Datos recopilados

### Logs

La integración Cisco Duo recopila y reenvía logs de autenticación Cisco Duo, actividad, administrador, telefonía e inscripción sin conexión a Datadog.

### Métricas

La integración Cisco Duo no incluye métricas.

### Eventos

La integración Cisco Duo no incluye eventos.

## Soporte

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).