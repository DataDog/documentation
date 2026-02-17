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
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: Comprueba las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Monitorizar tu entorno de CircleCI con Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipeline con monitores de Datadog CI
- link: /continuous_integration/pipelines/
  tag: Documentación
  text: Exploración de datos de pipeline para resolver problemas de compilación
- link: /account_management/billing/ci_visibility
  tag: Documentación
  text: Más información sobre consideraciones de facturación para CI Visibility
- link: /continuous_integration/tests/
  tag: Documentación
  text: Explorar los datos de los tests para encontrar y corregir tests con problemas
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de aplicaciones web estáticas
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Prácticas recomendadas para la monitorización CI/CD
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de tests de software en CI/CD
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: Blog
  text: Monitorizar tus modernizaciones de CI/CD con Datadog CI Pipeline Visibility
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo utilizamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: Blog
  text: Patrones para una purga de caché segura y eficaz en pipelines de Continuous
    Integration Continuous Delivery
title: Continuous Integration Visibility
---

<div class="alert alert-info">Esta página trata sobre traer tus métricas y datos de integración continua (CI) en dashboards de Datadog. Si deseas ejecutar tests de Continuous Testing en tus pipelines de CI, consulta la sección <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing y CI/CD</a>.</div>

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?etiquetas (tags).topics-0=CI">}}
  Únete a la sesión de Introducción a CI Visibility para comprender cómo Datadog CI Visibility mejora la eficiencia de los pipelines de CI y cómo configurar los productos de Testing Visibility y Pipeline Visibility. 
{{< /learning-center-callout >}}


## Información general

Datadog Continuous Integration (CI) Visibility proporciona una visión unificada de los resultados, el rendimiento, las tendencias y la fiabilidad de los pipelines a través de tus entornos de CI. Al integrar Datadog con tus pipelines de CI, puedes crear monitores, mostrar datos dentro de [dashboards de Datadog][1] y [notebooks][2], y crear visualizaciones para el estado de CI de tu organización.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility ayuda a los desarrolladores a comprender las causas de las interrupciones del pipeline y las tendencias de monitorización en los tiempos de ejecución del pipeline. También ofrece a los ingenieros de desarrollo información sobre el estado de CI en toda la organización y el rendimiento de los pipelines a lo largo del tiempo.

## Mejorar la fiabilidad de los pipelines y crear trazas

CI Visibility te ayuda a solucionar los problemas de los pipelines y las compilaciones rotas conectando las interrupciones de desarrollo más significativas con las confirmaciones que las provocaron. Puedes instrumentar y rastrear tus pipelines a medida que se ejecutan, lo que te permite conocer mejor su rendimiento.

## Aumentar la eficiencia mediante integraciones sencillas

Datadog se integra con diversos proveedores de CI para recopilar métricas, que realiza un seguimiento del rendimiento de tus pipelines de CI desde la confirmación hasta el despliegue. Estas métricas se utilizan para identificar tendencias de rendimiento y oportunidades de mejora.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

Puedes utilizar la CLI `datadog-ci` para [rastrear comandos][8] y añadir [etiquetas (tags) y medidas personalizadas][9], lo que te permite añadir texto definido por el usuario y etiquetas numéricas en tus trazas de pipeline.

## ¿Estás listo para comenzar?

Visita [Pipeline Visibility][3] para obtener instrucciones sobre cómo configurar CI Visibility con tus proveedores de CI, incluidos detalles sobre los requisitos de compatibilidad y los pasos para configurar la recopilación de datos. A continuación, comienza a explorar los detalles sobre las ejecuciones de tu pipeline en el [CI Visibility Explorer][7] y exporta tu consulta de búsqueda a un [Monitor de pipeline de CI][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /es/continuous_integration/pipelines/
[4]: /es/continuous_integration/tests/
[6]: /es/monitors/types/ci/
[7]: /es/continuous_integration/explorer/
[8]: /es/continuous_integration/pipelines/custom_commands/
[9]: /es/continuous_integration/pipelines/custom_tags_and_measures/