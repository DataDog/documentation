---
description: El Internal Developer Portal de Datadog unifica telemetría en vivo, metadatos
  y flujos de trabajo de Self-Service para estandarizar la entrega de software y optimizar
  la experiencia del desarrollador.
disable_toc: false
further_reading:
- link: getting_started/internal_developer_portal/
  tag: Documentación
  text: Introducción al Internal Developer Portal
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métricas de éxito para Platform Engineering Teams.
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Convierta los comentarios en acciones en toda su organización de ingeniería
    con Datadog Forms
- link: https://www.datadoghq.com/blog/software-catalog
  tag: Blog
  text: Mejora la experiencia del desarrollador y la colaboración con Service Catalog
- link: https://www.datadoghq.com/blog/service-scorecards
  tag: Blog
  text: Prioriza y promueve las mejores prácticas de observabilidad de servicio con
    Scorecards
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions
  tag: Blog
  text: Empodere a sus equipos de ingeniería con Self-Service Actions en Service Catalog
    de Datadog
- link: https://www.datadoghq.com/blog/how-datadog-manages-internal-deployments/
  tag: Blog
  text: Cómo el equipo de infraestructura de Datadog gestiona las implementaciones
    internas utilizando el Service Catalog y CI/CD Visibility
- link: https://www.datadoghq.com/blog/internal-developer-portal/
  tag: Blog
  text: Entregue software de manera rápida y confiable con Datadog IDP
- link: https://www.datadoghq.com/blog/datadog-backstage-plugin/
  tag: Blog
  text: Sincronice su catálogo de Backstage con Datadog IDP
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: Blog
  text: Coordine iniciativas de ingeniería a gran escala con las Campañas de IDP
- link: https://app.datadoghq.com/idp/get-started
  tag: Aplicación
  text: Explorando IDP en Datadog
title: Internal Developer Portal
---
{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="Un video que se desplaza por la página del Service Catalog del Internal Developer Portal y hace clic en un servicio para mostrar un gráfico de dependencias con servicios padre e hijo representados" video=true >}}

## Descripción general {#overview}

Crear un IDP es una parte fundamental de las mejores prácticas de [Platform Engineering][7]. El Internal Developer Portal (IDP) de Datadog es una solución totalmente administrada que unifica telemetría en vivo, metadatos y flujos de trabajo de Self-Service para estandarizar y acelerar la entrega de software y optimizar la experiencia del desarrollador. 

- Impulsado por telemetría en vivo, [Service Catalog][1] inventa cada servicio y entorno en tiempo real y enriquece cada entrada con metadatos descriptivos para la propiedad y el contexto operativo.
- [Self-Service Actions][2] y [Scorecards][3] traducen las políticas de la plataforma en tareas de un solo clic, asegurando que cada cambio cumpla con los criterios de observabilidad, seguridad y producción. 
- Los [Engineering Reports][4] integrados brindan a los ingenieros de plataforma y líderes visibilidad en tiempo real sobre la calidad del software, la adopción de estándares y la experiencia del desarrollador, facilitando la identificación de brechas y la toma de decisiones basadas en datos.

Si es nuevo en IDP, comience con la [Getting Started guide][5], que explica la configuración y el uso básico.

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="¡Regístrese para obtener acceso anticipado a nuestras próximas funciones!" >}}
{{< /callout >}}

## Casos de uso comunes {#common-use-cases}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dev_onboarding" >}}Acelere la incorporación de desarrolladores{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/incident_response" >}}Mejore la respuesta ante incidentes{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dependency_management" >}}Administre y mapee dependencias{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/production_readiness" >}}Evalúe la preparación para la producción{{< /nextlink >}}
{{< /whatsnext >}}

## Características principales {#main-features}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog" >}}Centralice la observabilidad, la propiedad y el conocimiento de ingeniería con Service Catalog{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards" >}}Promueva las mejores prácticas de ingeniería a escala con Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/self_service_actions" >}}Acelere las versiones mediante Self-Service Actions{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/eng_reports" >}}Realice un seguimiento de la confiabilidad y del cumplimiento de Scorecards mediante Engineering Reports{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/external_provider_status" >}}Haga un seguimiento de las dependencias externas con External Provider Status{{< /nextlink >}}
{{< /whatsnext >}}

## Trabajar con Teams {#working-with-teams}

Utilice [Datadog Teams][6] para habilitar funciones basadas en equipos en el IDP:

- Realice un seguimiento de sus equipos en Datadog y sincronícelos automáticamente con sus fuentes externas de la verdad 
- Asigne Teams como propietarios de servicios y otras entidades 
- Cree [jerarquías][8] para establecer relaciones de padre-hijo entre sus Teams
- Filtre las vistas por Teams en todo el IDP (por ejemplo, en Service Catalog, Scorecards y Engineering Reports)

Si su organización gestiona la estructura de Teams en GitHub, utilice la integración de GitHub para Teams para sincronizar automáticamente los Teams de GitHub con Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/catalog
[2]: /es/internal_developer_portal/self_service_actions
[3]: /es/internal_developer_portal/scorecards
[4]: /es/internal_developer_portal/eng_reports
[5]: /es/getting_started/internal_developer_portal/
[6]: /es/account_management/teams/
[7]: https://www.datadoghq.com/knowledge-center/platform-engineering/
[8]: /es/account_management/teams/manage/#team-hierarchies