---
app_id: notion
app_uuid: 0a709534-658c-4d8f-99a3-566dd7cd809b
assets:
  dashboards:
    notion_events: assets/dashboards/NotionDashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: notion.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10361
    source_type_name: notion
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.notion.so/
  name: Notion Labs, Inc.
  sales_email: integrations@makenotion.com
  support_email: team@makenotion.com
categories:
- recopilación de logs
- colaboración
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/notion/README.md
display_on_public_website: true
draft: false
git_integration_title: notion
integration_id: notion
integration_title: Notion
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: notion
public_title: Notion
short_description: Monitorizar tus eventos de espacio de trabajo de Notion y personalizar
  las detecciones en Datadog
supported_os:
- cualquier
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Collaboration
  - Supported OS::Any
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar tus eventos de espacio de trabajo de Notion y personalizar
    las detecciones en Datadog
  media:
  - caption: Configuración de la integración de Datadog en Notion
    image_url: images/Notion_DD.png
    media_type: imagen
  - caption: Logs de evento de Notion en Datadog
    image_url: images/Notion_DD_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Notion
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Notion es un espacio de trabajo conectado. Es donde los equipos modernos crean y comparten documentos, toman notas, gestionan proyectos y organizan el conocimiento, todo en un solo lugar. Instala la integración de Notion con Datadog para gestionar y monitorizar la actividad de tu espacio de trabajo en [Datadog Cloud SIEM][1]. Puedes importar los logs de auditoría de tu espacio de trabajo para monitorizar en tiempo real, alertar y hacer un análisis en tiempo real. A partir de ahí, puedes detectar e investigar posibles problemas de seguridad, comportamientos sospechosos y solucionar problemas de acceso con confianza y facilidad.

Para ver la lista completa de eventos emitida por Notion, consulta la [documentación oficial de Notion][2].

## Configuración

1. Abre el cuadro de Notion y haz clic en _Install Integration_ (Instalar integración).

2. Haz clic en _Connect Accounts_ (Conectar cuentas) para redirigirte a _Settings & Members_ (Configuración y miembros) en Notion.

3. Inicia sesión en Notion y ve a _Connections_ > _Workspace Connections_ > _+Add Connection_ > _Datadog_ (Conexiones > Conexiones de espacio de trabajo > +Añadir conexión > Datadog).

4. Notion te pide que sigas una serie de pasos de OAuth para autorizar la integración con Datadog.

Una vez conectado, Notion empieza a enviar datos casi en tiempo real a Datadog.

## Desinstalación
Una vez desinstalada esta integración, se revocarán todas las autorizaciones anteriores.
Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la [página de Claves de API][3].

En Notion, ve a _Setting & Members_ > _Connections_ > _Workspace Connections_ > ... luego a _Datadog_ > _Disconnect_ (Configuración y miembros > Conexiones > Conexiones de espacio de trabajo > ... luego Datadog > Desconectar).

## Soporte
¿Necesitas ayuda? Ponte en contacto con el [soporte de Notion][4].

[1]: https://docs.datadoghq.com/es/security/cloud_siem/
[2]: https://www.notion.so/help/audit-log
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Notion
[4]: mailto:team@makenotion.com