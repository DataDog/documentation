---
categories:
- nube
- recopilación de logs
custom_kind: integración
dependencies: []
description: Salesforce Marketing Cloud
doc_link: https://docs.datadoghq.com/integrations/salesforce_marketing_cloud/
draft: false
git_integration_title: salesforce_marketing_cloud
has_logo: false
integration_id: ''
integration_title: Salesforce Marketing Cloud
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce_marketing_cloud
public_title: Salesforce Marketing Cloud
short_description: Recopila logs de Salesforce Marketing Cloud.
team: web-integrations
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Salesforce Marketing Cloud es una plataforma de marketing basada en la nube con herramientas de automatización y análisis y servicios para el marketing a través de plataformas móviles, sociales, en línea y de correo electrónico.

La integración de Salesforce Marketing Cloud con Datadog se utiliza para ver y analizar tus logs utilizando [logs de Datadog][1]. 

## Configuración

### Instalación

No requiere instalación.

### Configuración

Para configurar Salesforce Marketing Cloud para que envíe eventos a Datadog, debes crear una URL de devolución de llamada en la página de configuración de Salesforce Marketing Cloud y crear una suscripción.

#### Configuración de la cuenta

1. Inicia sesión en Salesforce Marketing Cloud.
2. Accede a tu cuenta y haz clic en **Settings/Setup** (Configuración/Configuración).
3. Crea o modifica un rol al que pertenezca tu cuenta de usuario que permita `Event Notifications`, `Callbacks` y `Subscriptions`.

#### Configuración de la devolución de llamada

1. En la página de configuración, ve a **Feature Settings** > **Event Notifications** (Configuración de características > Notificaciones de eventos) y selecciona **URL Callbacks** (Devoluciones de llamada de URL).
2. Haz clic en **Register New** (Registro nuevo).
3. Copia la URL proporcionada en el cuadro de integración de Datadog.
5. Asigna un nombre a tu URL de devolución de llamada y pega la URL.
6. Mantén **Match Batch Size** (Coincidir tamaño del lote) como 1000 y haz clic en **Register** (Registrar).
7. Se envía una carga útil de verificación a un endpoint de Datadog. Vuelve a cargar el cuadro de integración de Datadog para ver la carga útil de verificación.
8. Copia la clave de verificación y pégala en la sección **Verification** (Verificación) de la página Configuración de devolución de llamada de URL de Salesforce Marketing Cloud.

#### Configuración de la suscripción

1. En **Feature Settings** (Configuración de características), haz clic en **Event Notifications** > **Subscriptions** (Notificaciones de eventos > Suscripciones).
2. Selecciona `Subscribe New` y asigna un nombre a tu suscripción.
3. Selecciona todos los eventos que deseas recibir y añade filtros.
4. Haz clic en **Subscribe** (Suscribir). Tus eventos deben enviarse a Datadog.

## Datos recopilados

### Métricas

La integración de Salesforce Marketing Cloud no incluye ninguna métrica.

### Logs

La integración de Salesforce Marketing Cloud recopila eventos de logs de los eventos que seleccionaste en la [Configuración de suscripción](#subscription-setup).

### Checks de servicio

La integración de Salesforce Marketing Cloud no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://docs.datadoghq.com/es/logs/
[2]: https://docs.datadoghq.com/es/help/