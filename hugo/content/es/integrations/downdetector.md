---
app_id: downdetector
categories:
- events
- rum
- notificaciones
custom_kind: integración
description: Monitorizar interrupciones del servicio con las alertas en tiempo real
  de Downdetector
integration_version: 1.0.0
media:
- caption: Dashboard de Información general de Downdetector
  image_url: images/Screenshot 2025-03-14 at 15.57.39.jpg
  media_type: imagen
- caption: Vista del dashboard del Downdetector Explorer
  image_url: images/DDE screenshot 1.png
  media_type: imagen
- caption: Visión de la empresa del Downdetector Explorer
  image_url: images/DDE screenshot 2.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Downdetector
---
## Información general

Downdetector proporciona alertas tempranas sobre problemas de servicio, a menudo antes que las herramientas de monitorización internas.

Esta integración proporciona alertas de interrupción de Downdetector en tiempo real como eventos en Datadog, lo que te permite visualizar y correlacionar las interrupciones del servicio con tu stack tecnológico. Proporciona notificaciones de inicio y fin de incidente, junto con detalles sobre el servicio afectado, las mediciones actuales, la referencia, los indicadores principales, las ciudades y los proveedores.

## Configuración

1. En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Downdetector y haz clic en **Install Integration** (Instalar integración).
1. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar el proceso de autorización. Se te redirigirá a Downdetector para finalizar la configuración.
1. En Downdetector, ve a **Alerts** > **Manage** (Alertas > Gestión) para editar los monitores existentes o haz clic en **+** para crear uno nuevo.
1. En el modal de creación del monitor, selecciona la integración de Datadog recién creada en la pestaña **Alert Settings** (Configuración de alertas).

## Desinstalación

1. Ve a **Alerts** > **Integrations** (Alertas > Integraciones) en Downdetector.
1. Haz clic en el icono de la papelera situado junto a la integración de Datadog.
1. En Datadog, desplázate hasta el cuadro de integración de [Downdetector](https://app.datadoghq.com/integrations/downdetector) y haz clic en **Uninstall** (Desinstalar). Después de desinstalar esta integración, se revocarán todas las autorizaciones anteriores.
1. Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la [página de gestión de claves de API](https://app.datadoghq.com/organization-settings/api-keys?filter=Downdetector).

## Soporte

Ponte en contacto con support@downdetector.com para solicitar asistencia.