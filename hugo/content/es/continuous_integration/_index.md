---
aliases:
- /es/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: /continuous_integration/pipelines/
  tag: Documentación
  text: Explore los datos del pipeline para resolver problemas de compilación
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Obtenga información sobre las consideraciones de facturación para CI Visibility
- link: /continuous_integration/tests/
  tag: Documentación
  text: Explore los datos de prueba para encontrar y corregir pruebas problemáticas
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Monitoree su entorno de CircleCI con Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configure alertas de pipeline con los monitores de CI de Datadog
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para el seguimiento de aplicaciones web estáticas
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de CI/CD
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: Blog
  text: Mejores prácticas para monitorear las pruebas de software en CI/CD
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: Blog
  text: Monitoree sus modernizaciones de CI/CD con Datadog CI Pipeline Visibility
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo usamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: Blog
  text: Patrones para la purga de caché segura y eficiente en pipelines de CI/CD
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métricas de éxito para Platform Engineering Teams.
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación).
title: Continuous Integration Visibility
---
{{< callout url=# btn_hidden="true" header="CI Visibility es parte de CI/CD Optimization">}}CI/CD Optimization combina CI Visibility y Test Optimization en una interfaz unificada. Esta página cubre CI Visibility; para conocer las funciones compartidas con Test Optimization, consulte [CI/CD Optimization][1].

[1]: /es/cicd/
{{< /callout >}}

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Únase a la sesión Introduction to CI Visibility para comprender cómo Datadog CI Visibility mejora la eficiencia de los pipelines de CI y cómo configurar los productos Testing Visibility y Pipeline Visibility. 
{{< /learning-center-callout >}}

## Descripción general {#overview}

<div class="alert alert-info">Esta página trata sobre cómo llevar sus métricas y datos de Continuous Integration (CI) a los Dashboards de Datadog. Si desea ejecutar pruebas de Continuous Testing en sus canalizaciones de CI, consulte la sección <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a>.</div>

Datadog Continuous Integration (CI) Visibility proporciona una vista unificada de los resultados, el rendimiento, las tendencias y la confiabilidad de los pipelines en sus entornos de CI. Al integrar Datadog con sus pipelines de CI, puede crear monitores, mostrar datos en los [Dashboards de Datadog][1] y los [notebooks][2], y crear visualizaciones del estado de CI de su organización.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility ayuda a los desarrolladores a comprender las causas de las interrupciones en los pipelines y a monitorear las tendencias en sus tiempos de ejecución. También ofrece a los ingenieros de compilación información sobre el estado de CI en toda la organización y el rendimiento de los pipelines a lo largo del tiempo.

## Mejore la confiabilidad de los pipelines y cree trazas {#improve-pipeline-reliability-and-create-traces}

CI Visibility ayuda a solucionar problemas de fallas en los pipelines y compilaciones interrumpidas al conectar las interrupciones de desarrollo más importantes con los commits que las causaron. Puede instrumentar sus pipelines y realizar un seguimiento de ellos a medida que se ejecutan, lo que permite obtener información más detallada sobre su rendimiento.

## Aumente la eficiencia mediante integraciones fluidas {#increase-efficiency-through-seamless-integrations}

Datadog se integra con una variedad de proveedores de CI para recopilar métricas que rastrean el rendimiento de sus pipelines de CI desde el commit hasta la implementación. Estas métricas se utilizan para identificar tendencias de rendimiento y oportunidades de mejora.

{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="AWS CodePipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="extensión de Azure DevOps" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="Buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="orbe de CircleCI" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="Codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="GitHub Actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="GitLab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="Jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="TeamCity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="otros proveedores de CI" >}}
{{< /card-grid >}}

Puede utilizar la CLI de `datadog-ci` para [rastrear comandos][8] y agregar [etiquetas y medidas personalizadas][9], lo que le permite agregar etiquetas de texto y numéricas definidas por el usuario a las trazas de sus pipelines.

## ¿Listo para comenzar? {#ready-to-start}

Visite [Pipeline Visibility][3] para obtener instrucciones sobre cómo configurar CI Visibility con sus proveedores de CI, incluidos detalles sobre los requisitos de compatibilidad y los pasos para configurar la recopilación de datos. Luego, comience a explorar detalles sobre las ejecuciones de sus pipelines en el [CI Visibility Explorer][7] y exporte su consulta de búsqueda a un [CI Pipeline Monitor][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /es/continuous_integration/pipelines/
[4]: /es/continuous_integration/tests/
[6]: /es/monitors/types/ci/
[7]: /es/continuous_integration/explorer/
[8]: /es/continuous_integration/pipelines/custom_commands/
[9]: /es/continuous_integration/pipelines/custom_tags_and_measures/