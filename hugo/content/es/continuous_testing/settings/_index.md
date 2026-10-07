---
further_reading:
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Integración de tus tests de Continuous Testing en tus pipelines CI/CD
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configurar un test de API
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configura una prueba de navegador
- link: /mobile_app_testing/mobile_app_tests/
  tag: Documentación
  text: Configurar un test de aplicación móvil
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentación
  text: Explorar RUM y Session Replay en Synthetics
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Crear y gestionar tests con Terraform
title: Parámetros de Continuous Testing
---
{{< jqmath-vanilla >}}

## Información general

Puedes acceder a la configuración de Continuous Testing en la página [Monitorización Synthetic y Parámetros de tests][1].

{{< img src="continuous_testing/settings/parallelization.png" alt="Configurar la paralelización de tus tests de Continuous Testing en la página Parámetros" style="width:100%;">}}

Por defecto, todos los tests que se ejecutan en los pipelines CI/CD lo hacen secuencialmente (uno tras otro). Para cambiar este comportamiento, configura un [valor de paralelización](#set-parallelization) y guarda tu selección.

## Paralelización

Los tests paralelos son tests que se ejecutan simultáneamente en tus [pipelines de integración continua y entrega continua (CI/CD)][4]. 

{{< img src="continuous_testing/parallelization_explained.png" alt="Diagrama que explica las ventajas de la paralelización en comparación con las ejecuciones secuenciales de tests" style="width:100%;">}}

Esto garantiza que puedas:

* Reducir la duración de los procesos y enviar nuevas funciones con mayor rapidez
* Aumentar la confianza en el desarrollo y la velocidad de entrega
* Disponer de una cobertura de tests completa y reducir el volumen de errores de producción que llegan a tu código base

### Estimar la paralelización

Haz clic en **Estimate Parallelization** (Estimar la paralelización) para ver cuántos tests Datadog recomienda ejecutar en paralelo en función de tus [métricas de Continuous Testing][3]. 

{{< img src="continuous_testing/estimated_parallelization.png" alt="Completar el asistente Estimar la paralelización en los parámetros de Continuous Testing" style="width:60%;">}}

Tras especificar la duración prevista de los tests en tu pipeline CI y, opcionalmente, el número medio de tests por lote de CI, la sección **Paralelización estimada** calcula la cantidad de paralelizaciones que quieres configurar:

"Paralelización estimada" = {"número medio de tests por lote de CI" * "duración media de los tests"} / "duración prevista en tu pipeline CI"

### Configurar la paralelización

1. En **Configurar tus preferencias**, selecciona la opción **Paralelización**.
2. Personaliza la paralelización que necesites en función del número de tests que quieres ejecutar en paralelo.
3. Haz clic en **Save Selection** (Guardar selección).
4. Confirma tu selección.

{{< img src="continuous_testing/settings/parallelization.png" alt="Parámetros de paralelización para 25 ejecuciones de tests de Continuous Testing paralelas" style="width:100%;">}}

## Permisos

Para personalizar la paralelización para Continuous Testing, debes tener el permiso `billing_edit`. 

De lo contrario, aparece el siguiente error: `You're missing edit permission for Continuous Testing settings. You can run your tests with a parallelization of X (up to X tests running at the same time at a given point during your CI). To increase this value, reach out to your administrator admin.email@datadoghq.com`.

Para obtener más información, consulta [Permisos para roles Datadog][2].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/settings/
[2]: /es/account_management/rbac/permissions/#billing-and-usage
[3]: /es/synthetics/metrics/#continuous-testing
[4]: /es/continuous_testing/cicd_integrations