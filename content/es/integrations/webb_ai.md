---
app_id: webb-ai
app_uuid: ca4c3360-0e0f-4257-a392-8d6e461a3806
assets:
  dashboards:
    Webb.ai Overview: assets/dashboards/webb_ai_overview.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://webb.ai
  name: Webb.ai
  sales_email: support@webb.ai
  support_email: support@webb.ai
categories:
- ai/ml
- Kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/webb_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: webb_ai
integration_id: webb-ai
integration_title: Webb.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: webb_ai
public_title: Webb.ai
short_description: El primer ingeniero de fiabilidad con IA
supported_os:
- todos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Categoría::Kubernetes
  - Oferta::Integración
  - Tipo de datos consultados::Métricas
  - Tipo de datos consultados::Eventos
  - Tipo de datos enviados::Eventos
  - Sistema operativo compatible::Todos
  configuration: README.md#Configuración
  description: El primer ingeniero de fiabilidad con IA
  media:
  - caption: Resumen de análisis de causas raíz (RCA) realizado por Matt
    image_url: images/webb_ai-rca-summary.jpg
    media_type: imagen
  - caption: Solucionar problemas de pasos durante el RCA
    image_url: images/webb_ai-troubleshooting-steps.jpg
    media_type: imagen
  - caption: Dashboard de información general de Webb.ai
    image_url: images/webb_ai-datadog-dashboard.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Webb.ai
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Matt de Webb.ai es el primer ingeniero de fiabilidad con IA.
Matt soluciona problemas de monitores y alertas de Datadog, Kubernetes y proveedores de nube como AWS, Azure y GCP.
Identifica la causa raíz de una alerta o incidente en menos de 5 minutos.

A través de esta integración, Matt identifica automáticamente las alertas de Datadog y las soluciona, y el tiempo medio de depuración de esas alertas se reduce considerablemente. El 80-90% de las resoluciones de problemas están automatizadas, lo que reduce enormemente el tiempo de depuración por parte de los ingenieros de guardia.

Este integración consulta los siguientes datos:
- Eventos de Datadog
- Métricas y etiquetas (tags) de Datadog

Esta integración envía eventos a Datadog, incluyendo los análisis de causas raíz realizados por Matt y los cambios en clústeres Kubernetes.
Puedes ver análisis detallados de las causas raíz de tus alertas, incluyendo todas las hipótesis analizadas y los pasos exactos que siguió Matt utilizando pruebas de respaldo.

## Configuración

1. Visita [Webb.ai][1] y regístrate gratuitamente para recibir el servicio.
2. Ve al cuadro de Webb.ai en la [página de integraciones Datadog][2] y haz clic en **Install Integration** (Instalar integración).
3. Ve a la pestaña **Configuración** y haz clic en **Connect Accounts** (Conectar cuentas).
4. Sigue las series de pasos de OAuth para terminar de configurar la integración.

## Desinstalación
Para eliminar la integración Datadog de Webb.ai, ve a la [página de las integraciones Webb.ai][3] y elimina la integración Datadog de la lista.

Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.

Para asegurarte de que todas las claves de API asociadas a esta integración están desactivadas, busca el nombre de la integración en la página de [claves de API Datadog][4].

## Datos recopilados

### Métricas
Webb.ai no genera métricas y depende de las métricas de Datadog.

### Checks de servicio
Webb.ai no incluye checks de servicios.

### Eventos
Webb.ai envía los siguientes eventos a Datadog:
- Análisis de causas raíz realizados por Matt
- Cambios observados en clústeres Kubernetes

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Webb.ai][5].


[1]: https://app.webb.ai/
[2]: https://app.datadoghq.com/integrations
[3]: https://app.webb.ai/integrations
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: mailto:support@webb.ai