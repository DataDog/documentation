---
app_id: invary
app_uuid: 13509f2d-d922-4d8b-b3c2-7a8c2dd7fc54
assets:
  dashboards:
    Invary Runtime Integrity: assets/dashboards/invary_runtime_integrity.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10409
    source_type_name: Invary
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.invary.com
  name: Invary
  sales_email: sales@invary.com
  support_email: support@invary.com
categories:
- automatización
- recopilación de logs
- sistema operativo
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/invary/README.md
display_on_public_website: true
draft: false
git_integration_title: invary
integration_id: invary
integration_title: Invary
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: invary
public_title: Invary
short_description: Visualiza la integridad del tiempo de ejecución de tus sistemas
  operativos
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::OS & System
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Visualiza la integridad del tiempo de ejecución de tus sistemas operativos
  media:
  - caption: Dashboard predefinido de la integridad del tiempo de ejecución de Invary
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Invary
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Visualiza la integridad del tiempo de ejecución de tus sistemas operativos administrados por Invary.

Invary valida la integridad del tiempo de ejecución de los sistemas operativos y detecta rootkits que pueden engañar a otros sistemas. Esta integración permite que las evaluaciones de la integridad del tiempo de ejecución de Invary se transmitan a Datadog y se almacenen como logs. Los eventos de evaluación de Invary contienen el estado general de la integridad de tus endpoints, junto con detalles sobre qué secciones específicas del kernel de tu endpoint se han visto comprometidas, si las hay. Se puede encontrar un ejemplo detallado de un evento de evaluación de Invary en: [developers.invary.com][1].

Esta integración también viene con un dashboard predefinido que visualiza la integridad del tiempo de ejecución de tus endpoints administrados por Invary. El dashboard destaca los endpoints que actualmente carecen de integridad y la tendencia de la integridad de tus endpoints a lo largo del tiempo. Además, el dashboard de Invary proporciona información sobre el inventario de tu sistema operativo en el tiempo de ejecución, incluidas las distribuciones y versiones del kernel en uso.

Esta integración utiliza la [API de Invary][1].

## Configuración

### Instalación

La integración de Invary te permite reenviar detalles acerca de tu endpoint y la evaluación de la plataforma SaaS Invary a tu instancia de Datadog. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Finaliza el flujo de autorización OAuth que permite a Invary comunicarse con tu instancia de Datadog.
2. Revisa el dashboard de la "Integridad del tiempo de ejecución de Invary" para obtener una visión general de tu integridad del tiempo de ejecución.

### Validación

1. Revisa el dashboard de la "Integridad del tiempo de ejecución de Invary" para obtener información sobre la evaluación oportuna y prevista.
2. Consulta tus logs con la consulta base `source:invary`.

### Desinstalación

- Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores. 
- Además, asegúrate de que todas las claves de la API asociadas a esta integración se hayan desactivado buscando el nombre de la integración en la [página de Claves de la API][2].

## Datos recopilados

### Logs

Invary reenvía los resultados de tu evaluación de la integridad del tiempo de ejecución con la etiqueta (tag) `source:invary`. 

### Métricas
La integración de la integridad del tiempo de ejecución de Invary no incluye ninguna métrica.

### Checks de servicio
La integración de la integridad del tiempo de ejecución de Invary no incluye ningún check de servicio.

### Eventos
La integración de la integridad del tiempo de ejecución de Invary no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte de Invary][3].


[1]: https://developers.invary.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: mailto:support@invary.com