---
aliases:
- /es/integrations/ivanti_nzta
app_id: ivanti-nzta
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre los logs de Ivanti nZTA
integration_version: 1.0.0
media:
- caption: 'Ivanti nZTA: logs analíticos'
  image_url: images/ivanti_nzta_analytics_logs.png
  media_type: imagen
- caption: 'Ivanti nZTA: alertas'
  image_url: images/ivanti_nzta_alerts.png
  media_type: imagen
- caption: 'Ivanti nZTA: acceso a aplicaciones'
  image_url: images/ivanti_nzta_applications_access.png
  media_type: imagen
title: Ivanti nZTA
---
## Información general

[Ivanti nZTA](https://www.ivanti.com/products/ivanti-neurons-zero-trust-access) es una solución SaaS basada en la nube que ofrece autenticación de confianza cero y control de acceso para infraestructuras de aplicaciones. Permite a los administradores definir políticas de acceso seguro de usuarios y dispositivos. Esto garantiza la visibilidad de las aplicaciones, el control de acceso y una seguridad robusta.

Esta integración ingiere los siguientes logs:

- **Logs analíticos**: este endpoint contiene información sobre la actividad del sistema a través de logs de administrador, logs de acceso y logs de evento.
- **Alertas**: este endpoint contiene información sobre alertas activadas por Ivanti nZTA, incluyendo riesgos de seguridad y cambios de configuración.
- **Acceso a aplicaciones**: este endpoint contiene información sobre la aplicación a la que han accedido los usuarios.

Esta integración recopila logs de las fuentes enumeradas anteriormente y los envía a Datadog para su análisis con nuestros productos Log Explorer y Cloud SIEM 

- [Log Explorer](https://docs.datadoghq.com/logs/explorer/)
- [Cloud SIEM](https://www.datadoghq.com/product/cloud-siem/)

## Configuración

### Generar credenciales de API en Ivanti nZTA

#### Crear un nuevo usuario administrador

1. Inicia sesión en tu plataforma de Ivanti nZTA.
1. Ve a **Secure Access** > **Manage Users** (Acceso seguro > Administrar usuarios).
1. Ve a la pestaña **Authentication Servers** (Servidores de autenticación).
1. En **Admin Auth** (Autenticación del administrador), haz clic en **Create User** (Crear usuario) e introduce los siguientes datos:
   - **Nombre completo**: introduce un nombre descriptivo e identificable.
   - **Nombre de usuario**: introduce un nombre de usuario único.
   - **Contraseña: introduce una contraseña segura.
   - **Confirmar la contraseña**: vuelve a introducir la contraseña.
1. Desmarca la casilla **Temporary password** (Contraseña temporal).
1. Haz clic en **Create User** (Crear usuario).

**Nota**: Utiliza un usuario administrador recién creado únicamente para esta integración, en lugar del inicio de sesión de la interfaz de usuario, para garantizar una ejecución sin problemas.

#### Identificar al host

1. Para identificar el host de tu Ivanti nZTA, comprueba la URL de la plataforma de Ivanti nZTA.
   <br>**Por ejemplo**: `example.pulsezta.net`

### Conecta tu cuenta de Ivanti nZTA a Datadog

1. Añade tu host, nombre de usuario y contraseña.

   | Parámetros | Descripción |
   | ---------- | ------------------------------------------------------- |
   | Host | El host de tu plataforma de Ivanti nZTA.                  |
   | Nombre de usuario | El nombre de usuario del administrador de inquilinos de tu plataforma de Ivanti nZTA. |
   | Contraseña | La contraseña de tu plataforma de Ivanti nZTA.              |

1. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs

La integración de Ivanti nZTA recopila y envía logs de análisis, alertas y logs de acceso a aplicaciones a Datadog.

### Métricas

La integración de Ivanti nZTA no incluye ninguna métrica.

### Checks de servicio

La integración de Ivanti nZTA no incluye ningún check de servicio.

### Eventos

La integración de Ivanti nZTA no incluye ningún evento.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).