---
description: Diagnostique planes faltantes, una selección inesperada de pruebas, errores
  del trazador y fallas de trabajadores paralelos.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/test_parallelization/configuration/
  tag: Documentación
  text: Referencia de configuración de paralelización de pruebas
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Solución de problemas de paralelización de pruebas
---
`ddtest` informa errores fatales como `[error_code] message`; lea el mensaje y la salida del framework en sus registros de CI para conocer la causa específica.

## Artefactos del plan faltantes o no válidos {#missing-or-invalid-plan-artifacts}

Para errores como `run_plan_load_failed` o `run_ci_node_test_files_missing`:

1. Genere un plan nuevo en el trabajo de planificación.
2. Transfiera el directorio **completo** `.testoptimization/` a cada trabajo de prueba, incluidos los archivos ocultos y los cachés.
3. Ejecute desde el mismo directorio de proyecto que la planificación. Confirme que `manifest.txt` esté directamente dentro de `.testoptimization/`, no en otro directorio anidado.
4. Pase un `--ci-node` basado en cero que coincida con una asignación en `runner/tests-split/`.

En GitHub Actions, use `include-hidden-files: true` al cargar. Las rutas de los artefactos son relativas al espacio de trabajo, incluso si los pasos de shell establecen un directorio de trabajo diferente.

En CircleCI, use la misma clave específica de la canalización para guardar y restaurar el caché, sin claves de respaldo de prefijo. Una clave solo de revisión puede restaurar el plan de una ejecución diferente. No genere un plan de reemplazo de forma independiente en cada trabajador.

## La planificación es lenta para Ruby o Python {#planning-is-slow-for-ruby-or-python}

Si la detección de pruebas hace que la planificación sea lenta, considere omitir a nivel de suite. Establezca `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE` en `suite` en el entorno de CI tanto para los trabajos de planificación como para los de prueba.

Esto reduce el trabajo de detección al encontrar archivos de prueba en lugar de pruebas individuales. Para pytest, evita la recopilación y las importaciones de módulos de prueba y `conftest.py`. La contrapartida es una omisión menos precisa: Test Impact Analysis omite o ejecuta suites completas, por lo que es posible que se ejecuten más pruebas.

Consulte [omisión a nivel de suite para Ruby y Python](/tests/test_parallelization/best_practices/#use-suite-level-skipping-for-ruby) y [modo de suite de pytest](/tests/test_parallelization/configuration/#pytest-suite-mode) para obtener más detalles.

## Cantidad inesperada de nodos o trabajadores de CI {#unexpected-ci-node-or-worker-count}

Compruebe estos ajustes en el **trabajo de planificación**:

- `--min-parallelism` y `--max-parallelism` limitan el recuento. Ambos tienen como valor predeterminado el recuento de CPU físicas disponibles.
- `--ci-job-overhead` favorece el uso de menos ejecutores a medida que aumenta. El valor predeterminado es `25s`; `0s` elimina la penalización sin forzar el paralelismo máximo.
- `--target-time` establece un objetivo de duración. Si ninguna división cumple el objetivo, el planificador selecciona la división con el menor tiempo estimado dentro de los límites.

En el modo de nodo de CI, el recuento del plan significa nodos de CI, y `--ci-node-workers` controla los procesos por nodo. En un nodo sin `--ci-node`, el recuento del plan significa procesos locales. Un plan que selecciona un nodo es válido. Consulte [ajuste de paralelismo](/tests/test_parallelization/best_practices/#choose-a-parallelism-budget).

## No se aplican pruebas que se pueden omitir {#no-skippable-tests-are-applied}

WebdriverIO admite el equilibrio, pero no admite la omisión de pruebas mediante Test Impact Analysis.

Compruebe que:

- Test Impact Analysis está habilitado para el servicio de pruebas.
- Git esté instalado y `ddtest` se ejecute dentro del repositorio de Git previsto.
- La planificación y la ejecución utilizan el mismo `DD_SERVICE`, suite, revisión de la fuente, sistema operativo y entorno de ejecución del lenguaje.
- Las etiquetas de tiempo de ejecución coinciden con el entorno utilizado para calcular las pruebas omitibles.

Ruby y Python pueden recurrir a la detección de archivos cuando la detección completa falla o falta un SDK de Datadog. Revise los registros de detección antes de asumir que un plan exitoso aplicó la omisión a nivel de prueba. `--strict-discovery` hace que las fallas de detección completa sean fatales; la detección completa cancelada aún recurre a la detección de archivos.

Consulte [etiquetas de tiempo de ejecución](/tests/test_parallelization/configuration/#stabilize-runtime-tags) y [solución de problemas de Test Impact Analysis](/tests/test_impact_analysis/troubleshooting/).

## Pytest informa una falta de coincidencia de archivo de importación o pruebas faltantes {#pytest-reports-an-import-file-mismatch-or-missing-tests}

Los archivos de prueba de Python con el mismo nombre base pueden entrar en conflicto bajo el modo de importación predeterminado de pytest. `ddtest` los separa cuando el recuento de ejecutores seleccionados es suficiente. Al distribuir archivos, conserva todos los archivos que de otro modo serían ejecutables y advierte si los nombres base duplicados deben compartir un ejecutor, incluso con un solo ejecutor.

Para resolver conflictos, realice una de las siguientes acciones:

- Agregue archivos `__init__.py` para que las pruebas tengan nombres de módulo completos distintos.
- Cambie el nombre de los archivos en conflicto.
- Configure pytest con `--import-mode=importlib`.

Las advertencias de nombre base aún pueden aparecer después de corregir las importaciones. La división no evita colisiones durante la detección completa, que recopila pruebas antes de la distribución. Si una advertencia enumera archivos que faltan en los resultados de la detección completa, investíguelos: esos archivos no están programados.

En [modo de suite de pytest](/tests/test_parallelization/configuration/#pytest-suite-mode), la planificación normal solo de archivos no aplica selectores como `-k` y `-m`; pytest los aplica durante la ejecución. La detección completa forzada también los aplica durante la planificación. `ddtest` trata el código de salida 5 de pytest de un trabajador en modo suite como éxito, por lo que una ejecución completamente deseleccionada puede tener éxito. Verifique los selectores y los archivos planificados cuando no se ejecute ninguna prueba. El modo de prueba conserva las fallas de código de salida 5 de los trabajadores de pytest, pero un plan vacío aún puede tener éxito sin iniciar pytest.

## La planificación funciona, pero la ejecución no puede cargar el trazador {#planning-works-but-execution-cannot-load-the-tracer}

La planificación no requiere un SDK de Datadog; la ejecución sí. Mantenga la [configuración de Test Optimization](/tests/setup/) en cada trabajo de prueba.

Para Python, verifique el entorno utilizado por el lanzador configurado. Para JavaScript, verifique el require de Datadog CI existente en `NODE_OPTIONS`, luego en `DD_TRACE_PACKAGE` y después en el paquete `dd-trace` local del proyecto. Una precarga explícita no válida causa un error en lugar de recurrir a otra instalación.

Conserve los cargadores del proyecto y las rutas del trazador proporcionadas por la acción. No sobrescriba `NODE_OPTIONS` ni agregue un segundo trazador para solucionar un error de resolución. Consulte [instrumentación de JavaScript](/tests/test_parallelization/configuration/#javascript-test-discovery-and-instrumentation).

## Minitest no ejecuta los archivos seleccionados {#minitest-does-not-run-the-selected-files}

En una aplicación Rails detectada, `ddtest` pasa los archivos como argumentos posicionales. Utilice su valor predeterminado de Rails o una anulación compatible de `bin/rails test` o `bundle exec rails test`. Una anulación de `rake test` no cambia el modo de reenvío de archivos. Conserve la configuración personalizada de Rake antes de cambiar los comandos.

Para proyectos que no son de Rails, `ddtest` pasa los archivos asignados a través de `TEST_FILES`. Actualice el `Rake::TestTask` existente después de su configuración normal:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  # Keep the task's existing file list and other settings above this line.
  test.test_files = ENV["TEST_FILES"].split if ENV["TEST_FILES"]
end
{{< /code-block >}}

## Los comandos personalizados no ejecutan los archivos esperados {#custom-commands-do-not-run-the-expected-files}

Compare el comando original, la configuración y el entorno con los pasos de planificación y ejecución. Conserve los filtros, las semillas, los reporteros, la configuración compartida y los límites de la suite.

`--command` debe invocar el framework seleccionado a través de un lanzador compatible. Las cadenas de shell y los scripts que ejecutan múltiples frameworks no son compatibles. Vitest rechaza por completo las anulaciones de comandos.

Comprobaciones específicas del framework:

| Framework | Qué comprobar |
| --- | --- |
| pytest | `--tests-location` debe coincidir con los archivos. Conserve `PYTEST_ADDOPTS` y el entorno utilizado por el lanzador. Para múltiples raíces, utilice un glob de llaves como `'{tests/unit,tests/integration}/**/test_*.py'`. |
| Jest | Mantenga la configuración y las banderas de selección, incluido un `--runInBand` existente. |
| Mocha | Mantenga todas las rutas de la suite y la configuración compartida de `--file` o `--require`. `ddtest` reemplaza las entradas `spec` configuradas durante la ejecución. |
| Cucumber.js | Las rutas y los archivos de reejecución seleccionan características durante la detección, pero la ejecución corre los archivos de características asignados. Utilice filtros de etiqueta o nombre para preservar el contexto del escenario. |
| Cypress | `ddtest` posee `--spec`. Coloque un subconjunto en `--tests-location` o en la configuración de Cypress. |
| Playwright | Mantenga el directorio del paquete, la configuración y los proyectos seleccionados. Elimine el `--shard` nativo al usar divisiones de `ddtest`. |
| Vitest | Elimine `--command` y `DD_TEST_OPTIMIZATION_RUNNER_COMMAND`. Utilice la misma `--vitest-config` en ambas fases y mueva las opciones de comando a esa configuración. |
| WebdriverIO | Mantenga la configuración y las selecciones de capacidad. Los specs agrupados no se pueden distribuir como archivos independientes y no se admiten las grids remotas en la nube. Consulte [Configuración de WebdriverIO](/tests/test_parallelization/setup/?prog_lang=javascript&platform=webdriverio#webdriverio). |

Se conserva un separador de gestor de paquetes antes del ejecutable del framework. El `--` propio de un framework termina sus opciones; `ddtest` inserta indicadores de descubrimiento antes de este y reemplaza la selección de archivos después de este durante la ejecución. Consulte [Comandos de prueba personalizados](/tests/test_parallelization/configuration/#custom-test-commands).

## Las pruebas pasan pero faltan la cobertura o los informes {#tests-pass-but-coverage-or-reports-are-missing}

Verifique que la suite y el proyecto seleccionados sean los esperados, no solo el estado de salida. Conserve los reporters originales, las rutas de salida, el proveedor y los umbrales de cobertura, y los pasos de carga. Asigne a los trabajadores concurrentes rutas de salida o nombres de artefactos distintos.

La API de Node.js de Vitest no ejecuta la preparación de scripts de paquetes ni comandos de ciclo de vida de npm. Mueva esos pasos antes de `ddtest` y conserve las opciones de informes y cobertura en la configuración seleccionada. Consulte [Configurar Vitest](/tests/test_parallelization/best_practices/#vitest).

## Las pruebas fallan solo en paralelo {#tests-fail-only-in-parallel}

Busque bases de datos compartidas, puertos, archivos temporales, pantallas del navegador y rutas de informes. Mantenga las comprobaciones de inicio y preparación de la aplicación en cada trabajo de ejecución. Utilice [aislamiento de trabajadores](/tests/test_parallelization/best_practices/#isolate-workers) y reduzca el paralelismo mientras investiga.

No combine las asignaciones de `ddtest` con otro divisor de la suite completa. Compruebe que cada trabajador ejecute su asignación y que el comando original de la suite completa ya no se ejecute junto a él.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}