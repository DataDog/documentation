---
cascade:
  algolia:
    rank: 70
description: Personaliza el número de tests de Continuous Testing que se ejecutan
  en paralelo en tus pipelines de CI/CD para aumentar la cobertura de tus tests.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notas de la versión
  text: Consulta las últimas versiones de Datadog Continuous Testing. (Es necesario
    iniciar sesión en la aplicación)
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Continuous Testing en un pipeline de CI/CD
- link: /getting_started/continuous_testing
  tag: Documentación
  text: Más información sobre Continuous Testing
- link: /synthetics/private_locations/#scale-your-private-location
  tag: Documentación
  text: Más información sobre localizaciones privadas
- link: /continuous_testing/environments
  tag: Documentación
  text: Más información sobre los tests en entornos locales y por etapas
- link: /continuous_testing/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Continuous Testing y CI/CD
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: Blog
  text: Utiliza Datadog Continuous Testing para publicar con confianza
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: Blog
  text: Prácticas recomendadas para Continuous Testing con Datadog
title: Tests continuos
---

<div class="alert alert-info">Esta página trata sobre la ejecución de tests de Continuous Testing en tus pipelines de CI/CD. Si deseas ver métricas y dashboards de CI/CD, consulta la <a href="/continuous_integration/" target="_blank">documentación de CI Visibility.</a></div>

Datadog Continuous Testing ofrece un conjunto de herramientas que te permiten automatizar los tests de software durante todo el ciclo de vida de un producto. Al ofrecer tests de extremo a extremo sin código y fiables, así como una integración sencilla con [proveedores de CI populares][1] y herramientas de colaboración, Continuous Testing te ayuda a acelerar el desarrollo de aplicaciones y a enviar características de alta calidad con mayor rapidez.

## Hacer tests con facilidad y rapidez

Utiliza funciones escalables como [grabador web][2] sin código, [grabador de aplicaciones móviles][15], [ejecuciones de tests paralelos][3] y tests integrados de múltiples localizaciones para ahorrar tiempo y esfuerzo a tu equipo de control de calidad. Puedes ejecutar tus tests secuencialmente y personalizar el número de tests que quieres ejecutar al mismo tiempo en la página [**Configuración**][3].

{{< img src="continuous_testing/settings/parallelization.png" alt="Elegir entre ejecutar tus tests de forma secuencial y personalizar el número de tests que deseas ejecutar al mismo tiempo en la página de Configuración de Continuous Testing" style="width:100%;">}}

Gracias a la compatibilidad con múltiples protocolos, marcos de trabajo y API, incluidos gRPC y WebSockets, podrás realizar tests en todos los niveles del stack de aplicaciones y [en cualquier entorno de preproducción][17].

## Mejorar la fiabilidad de los tests

En lugar de tener que implementar código de test, puedes crear software utilizando [tests resistentes, escalables y sin código de la monitorización de Synthetic][4]. Gana confianza en los resultados de tus tests minimizando los falsos positivos mediante test de navegador autorreparadoras, tests de aplicaciones móviles y reintentos automáticos de tests.

Para garantizar que tus usuarios tengan la mejor experiencia, puedes automatizar [tests entre navegadores][2] y [tests de aplicaciones móviles][16]. Estas funciones de Continuous Testing son útiles en lotes de CI en los que se ejecutan varios tests para cubrir una variedad de escenarios y entornos.

## Aumentar la eficiencia mediante integraciones sencillas

Acelera el desarrollo de tu aplicación mediante tests y al solucionar problemas en una sola plataforma. Selecciona entre los siguientes tipos de proveedores de CI y herramientas de colaboración como [Slack][18] o [Jira][19] para fusionar flujos de trabajo y evitar el cambio de contexto.

{{< partial name="continuous_testing/ct-getting-started.html" >}}

</br>

Puedes utilizar el [proveedor de Datadog Terraform][10] para controlar la creación de tests y la gestión de estados. Aprovecha tus tests de Synthetic como [integración y tests de extremo a extremo][11] para tus despliegues de preparación, preproducción y canary, o ejecútalas directamente en tus [pipelines de CI][11].

## Solucionar problemas más rápido

La realización de tests en una plataforma unificada de monitorización te ayuda a encontrar la causa raíz de los tests fallidos y a reducir el tiempo medio de resolución (MTTR). 

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="Panel lateral de lotes de CI en el Explorador de Monitorización Synthetic y resultados de tests" style="width:100%;">}}

Puedes obtener el contexto completo de solucionar problemas, sin cambiar de herramienta, a través de las métricas correlacionadas, trazas (traces) y logs mostrados por la [integración de APM][12] de Datadog mirando los trabajos ejecutados en [el Explorador de Monitorización Synthetic y resultados de tests][11].

## Examinar los lotes de CI en el Explorador de monitorización Synthetic y resultados de tests

Crea [Buscar consultas y visualizaciones][11] para tus ejecuciones de test Synthetic o lotes de tests que se ejecutan en pipelines de CI/CD.

{{< img src="continuous_testing/explorer/results_explorer.png" alt="Una lista de resultados de lote de CI en el Explorador de Monitorización Synthetic y resultados de tests" style="width:100%;">}}

Puedes monitorizar ejecuciones de tests individuales y lotes completos de tests, y acceder a información relevante para cada tipo de test.

## ¿Estás listo para comenzar?

Después de haber configurado algunas [test de Synthetic][4], consulta la documentación de tu [proveedor de CI/CD][1] preferido, o utiliza el [paquete de NPM `datadog-ci`][14] en tus pipelines de CI/CD. Ve [entornos de test local y preparación][17] para usar Continuous Testing en entornos que no están disponibles públicamente o en producción, por ejemplo, ejecutando tests contra tu entorno de desarrollo local o un entorno de preparación dentro de una red privada. A continuación, comienza a explorar los detalles de tus ejecuciones por lotes en el [Explorador de Monitorización Synthetic y resultados de tests][11].

{{< learning-center-callout header="Try Synthetic Tests in a CI/CD Pipeline in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline">}}
  El Centro de aprendizaje Datadog está lleno de cursos prácticos para ayudarte a aprender sobre este tema. Inscríbete sin coste para aprender a ejecutar un test de Datadog Synthetic en un pipeline de CI/CD.
{{< /learning-center-callout >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/cicd_integrations/
[2]: /es/synthetics/browser_tests
[3]: /es/continuous_testing/settings
[4]: /es/synthetics/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[11]: /es/continuous_testing/explorer
[12]: /es/synthetics/apm/
[13]: https://app.datadoghq.com/synthetics/create#
[14]: /es/continuous_testing/cicd_integrations/configuration
[15]: /es/mobile_app_testing/mobile_app_tests
[16]: /es/mobile_app_testing/
[17]: /es/continuous_testing/environments
[18]: /es/integrations/slack/
[19]: /es/integrations/jira/