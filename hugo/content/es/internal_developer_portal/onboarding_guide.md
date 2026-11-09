---
description: Una guía de implementación por fases para líderes de plataforma e ingeniería
  que configuran el Internal Developer Portal de Datadog, desde la planificación y
  las fuentes de datos hasta las rutas doradas.
further_reading:
- link: https://app.datadoghq.com/idp/get-started
  tag: Aplicación
  text: Explorando IDP en Datadog
- link: /getting_started/internal_developer_portal/
  tag: Documentación
  text: Introducción al Internal Developer Portal
- link: /internal_developer_portal/software_catalog/
  tag: Documentación
  text: Catalog
- link: /internal_developer_portal/scorecards/
  tag: Documentación
  text: Scorecards
- link: /internal_developer_portal/self_service_actions/
  tag: Documentación
  text: Self-service Actions
- link: /internal_developer_portal/eng_reports/
  tag: Documentación
  text: Informes de ingeniería
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Mantenga actualizada la propiedad del servicio con la integración de GitHub
    de Datadog Teams
site_support_id: idp
title: Incorporación al Internal Developer Portal
---
## Descripción general {#overview}

Esta guía de incorporación acompaña a los líderes de plataforma e ingeniería a través de las fases de implementación del Internal Developer Portal (IDP) de Datadog.  

Recomendaciones:
- Incorpore primero a uno o dos equipos y utilice sus comentarios para perfeccionar los estándares.  
- Itere regularmente: trate su Internal Developer Portal como un producto.  
- Conecte los estándares de IDP con otras iniciativas, como SLOs, pipelines de CI/CD y flujos de trabajo de incidentes.  

## Fase 1: Planifique su implementación {#phase-1-plan-your-implementation}

1. **Revise los conceptos clave**: Aprenda sobre el [Entity model][2], los [Scorecards][3] y las [Self-service Actions][4].  
1. **Incorpore la estructura de su organización**: Configure [Teams][5] y refleje su jerarquía en Datadog.  
1. **Defina su ontología**: Mapee sus sistemas existentes al [Entity model][2] para que su estructura se alinee con el esquema de Datadog. Decida qué [entity types][6] y validaciones desea aplicar.

## Fase 2: Familiarícese con las herramientas {#phase-2-familiarize-yourself-with-tooling}

1. **Identifique las fuentes de datos**: Aprenda sobre las tres formas de incorporar entidades y decida qué utilizar como fuentes de verdad para su [Catalog][7]:

   - **[Descubra entradas automáticamente de los productos de Datadog][23]**, como APM, RUM o USM. También puede importar desde infraestructura o Log Management.
   - **Importe desde sistemas externos** como [Backstage][14] o [ServiceNow][15].  
   - **[Cree entradas directamente][24]** a través de la interfaz de usuario de Datadog, o mediante programación importando desde GitHub, GitLab, Terraform, el Datadog Software Metadata Provider o la Service Definition API.

  **Nota**: Si utiliza APM, priorice [Unified Service Tagging][25] y [Inferred Services][26] como puntos de entrada, en lugar de depender de las anulaciones de servicio.

1. **Cree una guía de incorporación interna**: Documente los estándares de etiquetado, los archivos de muestra `entity.definition.yaml` y las expectativas para los equipos de aplicaciones.  
1. **Explore la automatización**: Utilice la [API][8] o el proveedor de Terraform para gestionar entidades, Scorecards y flujos de trabajo mediante programación.

## Fase 3: Integre fuentes de datos {#phase-3-integrate-data-sources}

1. **Adopte la gestión al estilo GitOps**: [Conecte GitHub o GitLab][13] para gestionar su catálogo. [Importe manifiestos de Backstage existentes][14] si están disponibles.
1. **[Importe desde ServiceNow][15]**: Sincronice los CI de su CMDB de ServiceNow en IDP.  
1. **Conecte herramientas de guardia e incidentes**: Configure [Jira][9], [PagerDuty][10] u [otras integraciones][16].

## Fase 4: Personalice y extienda el esquema {#phase-4-customize-and-extend-schema}

1. **Establezca estándares de definición de entidades**: Decida cómo representar la criticidad, el ciclo de vida y los entornos. Consulte [Entity Model][6] para ver los esquemas de definición. 
1. **Establezca expectativas de metadatos**: Decida si incluir [etiquetas y extensiones personalizadas][18]. Determine cómo definir las relaciones entre componentes y cómo auditar las relaciones detectadas automáticamente.
1. **Mantenga la orientación interna**: Conserve la documentación para los desarrolladores, como los estándares de instrumentación y etiquetado, y los manifiestos de definición de entidades de muestra.

## Fase 5: Establezca y comunique los estándares {#phase-5-establish-and-communicate-standards}

1. **Revise Scorecards recomendadas**: Comience con [Datadog's out-of-the-box rules][3]. Seleccione las que sean relevantes para su organización.
1. **Agregue reglas específicas de la organización**: [Extend Scorecards][19] con comprobaciones de seguridad personalizadas, requisitos de frecuencia de implementación o estándares de etiquetado.  
1. **Establezca niveles de criticidad**: [Group rules into levels][20] para señalar la importancia.

## Fase 6: Configure rutas doradas {#phase-6-set-up-golden-paths}

1. **Revise los planos de ejemplo**: Explore [Self-service blueprints][11], que muestran rutas de ejemplo para el aprovisionamiento y la gestión de infraestructura, la creación de estructuras de proyectos y más. Experimente modificando los planos para que se ajusten a la pila tecnológica de su organización.
1. **Explore Action Catalog**: Vea las integraciones compatibles o amplíe con [HTTP requests and private actions][4].  
1. **Publique su primer flujo de trabajo**: Cree una ruta dorada e itere basándose en los comentarios de los desarrolladores.

## Fase 7: Explore los informes de ingeniería {#phase-7-explore-engineering-reports}

1. **Realice un seguimiento del progreso**: Utilice los [Engineering Reports][12] integrados para monitorear la preparación para la producción, la confiabilidad y la adopción de las mejores prácticas.  
1. **Mida la participación**: Haga un seguimiento de la participación de los desarrolladores a través del panel de análisis de uso integrado.
 
## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/internal_developer_portal/catalog/entity_model/native_entities/
[3]: /es/internal_developer_portal/scorecards/
[4]: /es/internal_developer_portal/self_service_actions/
[5]: /es/internal_developer_portal/catalog/set_up/ownership
[6]: /es/internal_developer_portal/catalog/entity_model/
[7]: /es/internal_developer_portal/catalog/
[8]: /es/api/latest/software-catalog/
[9]: /es/integrations/jira/
[10]: /es/integrations/pagerduty/
[11]: https://app.datadoghq.com/software/self-service-actions
[12]: /es/internal_developer_portal/eng_reports/
[13]: /es/internal_developer_portal/catalog/set_up/create_entities/#github-and-gitlab-integrations
[14]: /es/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage
[15]: /es/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[16]: /es/internal_developer_portal/integrations
[18]: /es/internal_developer_portal/catalog/entity_model?tab=v30#build-custom-extensions
[19]: /es/internal_developer_portal/scorecards/custom_rules
[20]: /es/internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
[23]: /es/internal_developer_portal/catalog/set_up/discover_entities
[24]: /es/internal_developer_portal/catalog/set_up/create_entities
[25]: /es/getting_started/tagging/unified_service_tagging
[26]: /es/tracing/services/inferred_services