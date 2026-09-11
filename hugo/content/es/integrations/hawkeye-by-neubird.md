---
aliases:
- /es/integrations/hawkeye_by_neubird
app_id: hawkeye-by-neubird
categories:
- ia/ml
- rum
- colaboración
custom_kind: integración
description: Investigación de incidentes basada en IA para monitores de Datadog
integration_version: 1.0.0
media:
- caption: Dashboard de Hawkeye
  image_url: images/Hawkeye-Dashboard.png
  media_type: imagen
- caption: Configurar sesiones automatizadas
  image_url: images/DD-automated.png
  media_type: imagen
- caption: Revisar un resumen de la investigación
  image_url: images/DD_Summary.jpg
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Hawkeye by NeuBird
---
## Información general

Hawkeye by NeuBird acelera la resolución de incidentes diagnosticando incidentes y automatizando el análisis de sus causas. Esta integración permite a Hawkeye buscar monitores de Datadog activados y, a continuación, investigar de forma autónoma la causa. Una vez finalizada la investigación, se añade un enlace al análisis de la investigación directamente a la página de incidentes de Datadog relacionada, lo que acelera la resolución y reduce el tiempo medio de recuperación.

## Configuración

1.  En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Hawkeye y haz clic en **Install Integration** (Instalar integración).

2. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar el proceso de autorización. Se te redirigirá a Hawkeye para finalizar la configuración.

3.  Una vez autorizado, Hawkeye comienza a enviar los resultados de la investigación a Datadog.

## Desinstalación

En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Hawkeye y haz clic en **Uninstall Integration** (Desinstalar integración).

- Una vez que desinstales esta integración, se revocarán todas las autorizaciones anteriores.

- Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la [página de gestión de claves de API](https://app.datadoghq.com/organization-settings/api-keys?filter=Hawkeye).

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de NeuBird](https://neubird.ai/neubird-support/).