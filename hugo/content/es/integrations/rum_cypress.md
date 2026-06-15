---
app_id: rum-cypress
app_uuid: a6c112b6-f3af-4f9e-bf25-e0f8d8d7bb5f
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguimiento de problemas
- métricas
- red
- tests
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_cypress/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_cypress
integration_id: rum-cypress
integration_title: Cypress
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_cypress
public_title: Cypress
short_description: Monitorizar ejecuciones de tests Cypress de aplicaciones utilizando
  Datadog
supported_os:
- todos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Seguimiento de incidentes
  - Categoría::Métricas
  - Categoría::Red
  - Categoría::Tests
  - Categoría::Rastreo
  - Sistema operativo compatible::Todos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar ejecuciones de tests Cypress de aplicaciones utilizando
    Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cypress
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Con la [integración Cypress][1] de Datadog monitoriza el rendimiento de tus pipelines CI/CD y los tests de Cypress que se ejecutan en tus pipelines:

- Investigando tests defectuosos o fallidos y detectando qué pasos fallan.
- Observando resultados de los tests con detalles de rastreo distribuido para comprender por qué los tests de Cypress son lentos.
- Solucionando brechas de rendimiento en tus tests de Cypress de extremo a extremo con datos recopilados de RUM y Session Replay.
- Monitorizando, capturando y reproduciendo visualmente sesiones reales de usuarios.


## Configuración

Para obtener más información sobre la integración de los tests de Cypress con RUM y Session Replay, consulta la [documentación de la integración CI Visibility-RUM][2].


### Recopilar eventos RUM

Para empezar a recopilar eventos de Real User Monitoring de tu aplicación, consulta [Monitorización de Cypress][3].

### Recopilar trazas (traces)

Tu aplicación envía automáticamente trazas a Datadog.

## Datos recopilados

### Métricas

La integración CI Visibility-RUM no incluye métricas. Para generar métricas personalizadas desde tu aplicación RUM, consulta [Generar métricas][4].

### Checks de servicios

La integración Cypress no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

Más enlaces, artículos y documentación útiles: 

- [CI Visibility][6]



[1]: https://app.datadoghq.com/integrations/rum-cypress
[2]: https://docs.datadoghq.com/es/continuous_integration/guides/rum_integration/
[3]: https://docs.datadoghq.com/es/continuous_integration/guides/rum_integration/#browser-tests-and-rum
[4]: https://docs.datadoghq.com/es/real_user_monitoring/generate_metrics
[5]: https://docs.datadoghq.com/es/help/
[6]: https://docs.datadoghq.com/es/continuous_integration/