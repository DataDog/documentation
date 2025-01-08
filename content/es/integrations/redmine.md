---
categories:
- collaboration
- developer tools
- issue tracking
custom_kind: integration
dependencies: []
description: Visualiza, realiza búsquedas y discute sobre actualizaciones de Redmine
  en tu flujo (stream) de eventos de Datadog.
doc_link: https://docs.datadoghq.com/integrations/redmine/
draft: falso
git_integration_title: redmine
has_logo: verdadero
integration_id: redmine
integration_title: Redmine
integration_version: ''
is_public: verdadero
manifest_version: '1.0'
name: redmine
public_title: Integración de Redmine con Datadog
short_description: Visualiza, realiza búsquedas y discute sobre actualizaciones de
  Redmine en tu flujo de eventos de Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Redmine es una aplicación web de gestión de proyectos de código abierto. Captura la actividad de Redmine en Datadog para:

- Realizar un seguimiento de tu ciclo de desarrollo.
- Consultar los temas abiertos en el flujo de eventos de Datadog.
- Discutir los proyectos con tu equipo.

La configuración de Redmine requiere una URL completa al feed de actividades deseado. Puedes añadir varias URL.

## Configuración

### Instalación

Para configurar tu integración, consulta al [cuadro de la integración Redmine][1].

## Datos recopilados

### Métricas

La integración Redmine no incluye métricas.

### Eventos

Todas las incidencias creadas aparecen como eventos en Datadog. Después de instalar y configurar la integración, puedes buscar `source:redmine` en el [Explorador de eventos][2] para ver las incidencias en tu feed de actividades de Redmine.

### Checks de servicio

La integración Redmine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.datadoghq.com/integrations/redmine
[2]: https://docs.datadoghq.com/es/service_management/events/explorer/
[3]: https://docs.datadoghq.com/es/help/