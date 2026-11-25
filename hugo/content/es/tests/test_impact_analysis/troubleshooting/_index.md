---
aliases:
- /es/intelligent_test_runner/troubleshooting
further_reading:
- link: /intelligent_test_runner
  tag: Documentación
  text: Obtenga información sobre Test Impact Analysis
title: Solución de problemas de Test Impact Analysis
---
## Descripción general {#overview}

Esta página proporciona información para ayudarle a solucionar problemas con Test Impact Analysis. Si necesita ayuda adicional, comuníquese con el [equipo de soporte de Datadog][1].

## Test Impact Analysis no funciona {#test-impact-analysis-is-not-working}

[Test Impact Analysis][2] funciona analizando su historial de confirmaciones junto con la información de cobertura de código sobre ejecuciones de prueba anteriores para determinar qué pruebas deben ejecutarse y cuáles se pueden omitir de forma segura. Se necesita una cantidad mínima de información para que Test Impact Analysis funcione correctamente:

- `git` el ejecutable debe estar disponible en el servidor que ejecuta las pruebas.
- Su repositorio debe tener un historial de confirmaciones de al menos dos confirmaciones en el último mes.
- Debe haber recopilado la cobertura de código de las pruebas en confirmaciones anteriores, lo cual ocurre en las ejecuciones de prueba donde Test Impact Analysis estaba habilitado.
- Su clon de git debe contener el historial de confirmaciones y de árbol. Test Impact Analysis intenta eliminar la superficialidad de los clones de git que no contienen historial (`git clone --depth=1`), pero es posible que eso no funcione en versiones anteriores de git. La eliminación automática de la superficialidad podría requerir una configuración adicional en algunos proveedores de CI (Harness CI, por ejemplo, requiere [configuración adicional][3] para asegurarse de que su canalización pueda ejecutar comandos de git). Si su trabajo de CI está utilizando clones de git superficiales, puede cambiarlo para usar clones de git parciales mediante el siguiente comando: `git clone --filter=blob:none`.

Debido a estas restricciones, la primera vez que habilita Test Impact Analysis, no puede ver ninguna prueba omitida y el tiempo de ejecución de las pruebas puede ser más lento de lo habitual porque la cobertura de código se recopila automáticamente.

Test Impact Analysis solo tiene en cuenta el historial de confirmaciones y la información de cobertura de código de las pruebas del último mes. Además, no tiene en cuenta la información de cobertura de código que se genera más de una semana después de que se realizó una confirmación.

### Se omitieron menos pruebas de las esperadas {#fewer-tests-skipped-than-expected}

Existen casos extremos en los que Test Impact Analysis omite menos pruebas de las esperadas.

- Un historial de Git extenso puede resultar en que se omitan menos pruebas, porque Datadog analiza las 30 confirmaciones más recientes. Este número puede variar dependiendo del volumen de datos de cobertura de código a analizar.
- Una confirmación que cambia más de 5,000 archivos no se analiza para determinar su impacto, por lo que la información de cobertura de esa confirmación se ignora.
- Una prueba o conjunto que cubre más de 16,000 archivos nunca se omite.
- Una pequeña fracción de las pruebas (aproximadamente el 0.04%) puede ejecutarse incluso cuando podrían haberse omitido.

Si usa Ruby, puede aumentar el número de pruebas omitidas cambiando a granularidad a nivel de conjunto: configure `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite`. Consulte la [configuración de Test Parallelization][8] para obtener detalles.

Para obtener más detalles sobre estos comportamientos, consulte [Límites de escala y precisión][7].

### Sincronización de una bifurcación a través de la interfaz de usuario de GitHub {#synchronizing-a-fork-through-githubs-ui}

[Sincronizar una bifurcación a través de la interfaz de usuario de GitHub][4] provoca que todas las pruebas se ejecuten para la confirmación de sincronización generada.

### Recopilación de coberturas en GitHub Actions CI activada por eventos de solicitud de extracción {#collecting-coverages-on-github-actions-ci-triggered-by-pull-request-events}

Las pruebas ejecutadas en GitHub Actions CI usando el [`pull_request` activador][5] podrían no omitirse en confirmaciones posteriores dentro de la rama de la solicitud de extracción. El activador introduce cambios usando una nueva confirmación de fusión que Test Impact Analysis no tiene en cuenta.

### Use Squash and merge para integrar sus confirmaciones {#squash-and-merge-your-commits}

Usar [squash and merge][6] para integrar confirmaciones en la rama base provoca que se pierda el historial de git de la rama de características. Como resultado, Test Impact Analysis podría no omitir pruebas en la rama base que fueron omitidas recientemente en la rama de características.

## Test Impact Analysis omitió incorrectamente una prueba {#test-impact-analysis-incorrectly-skipped-a-test}

Test Impact Analysis realiza un análisis del impacto de las pruebas basado en la cobertura de código para determinar qué pruebas se ven afectadas por una confirmación o un conjunto de confirmaciones determinado. Aunque esta estrategia funciona para la mayoría de las pruebas, existen situaciones conocidas en las que Test Impact Analysis podría omitir una prueba que debería haberse ejecutado:

- Cambios en las dependencias de la biblioteca.
- Cambios en las opciones del compilador.
- Cambios en servicios externos.
- Cambios en archivos de datos en pruebas basadas en datos.

Si está creando una confirmación que incluye cualquiera de esos casos, puede forzar la desactivación de la omisión de pruebas en Test Impact Analysis agregando `ITR:NoSkip` (sin distinción entre mayúsculas y minúsculas) en cualquier parte de su mensaje de confirmación de Git.

### Paquetes detectados incorrectamente como de terceros {#packages-incorrectly-detected-as-third-party}

En Python, algunos paquetes, como `sumy` y `sendgrid`, instalan módulos bajo el espacio de nombres del paquete `test.*` o `tests.*`. En versiones de `dd-trace-py` anteriores a la 3.16.1, esto puede causar que las pruebas se detecten como paquetes de terceros si se encuentran en una carpeta con el mismo nombre. Si utiliza uno de esos paquetes, los datos de cobertura para las pruebas pueden estar incompletos, lo que puede causar que una prueba se omita cuando debería haberse ejecutado. Datadog recomienda actualizar `dd-trace-py` a la versión 3.16.1 o posterior.

Para evitar este problema en versiones anteriores de `dd-trace-py`, puede establecer la variable de entorno `DD_THIRD_PARTY_DETECTION_EXCLUDES` en una lista de dichos paquetes de terceros (por ejemplo, `DD_THIRD_PARTY_DETECTION_EXCLUDES=sumy,sendgrid`).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/tests/test_impact_analysis/
[3]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[5]: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request
[6]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits
[7]: /es/tests/test_impact_analysis/#scale-and-accuracy-limits
[8]: /es/tests/test_parallelization/configuration/#environment-variables