---
description: Configure las variables de entorno de paralelización de prueba, la selección
  de paralelismo, la configuración de los trabajadores y los artefactos del plan.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentación
  text: Solución de problemas de paralelización de prueba
- link: /tests/test_parallelization/best_practices/
  tag: Documentación
  text: Prácticas recomendadas para la paralelización de prueba
title: Configure la paralelización de prueba
---
## Variables de entorno {#environment-variables}

La mayoría de los ajustes de `ddtest` se pueden pasar como un indicador de CLI o como una variable de entorno. Los indicadores de CLI tienen prioridad sobre las variables de entorno.

`DD_TEST_OPTIMIZATION_RUNNER_PLATFORM`
: Lenguaje de programación.<br/>
**Indicador de CLI:** `--platform`<br/>
**Predeterminado:** `ruby`<br/>
**Valores admitidos:** `ruby`, `python`, `javascript`

`DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK`
: Framework de prueba.<br/>
**Indicador de CLI:** `--framework`<br/>
**Predeterminado:** `rspec`<br/>
**Valores admitidos:** `rspec`, `minitest`, `pytest`, `jest`

`DD_TEST_OPTIMIZATION_RUNNER_COMMAND`
: Reemplaza el comando de prueba predeterminado. `ddtest` añade los archivos de prueba seleccionados y los indicadores específicos del marco al comando. Compatible con Ruby, JavaScript y Python. El soporte para Python requiere ddtest 1.7.0 o posterior. Para versiones de ddtest anteriores a 1.7.0 con pytest, el comando no se puede cambiar. Pase indicadores adicionales con `PYTEST_ADDOPTS`. Para obtener más información, consulte [Comandos de prueba personalizados](#custom-test-commands).<br/>
**Indicador de CLI:** `--command`<br/>
**Predeterminado:** Vacío<br/>
**Ejemplo:** `bundle exec rspec --profile`, `pnpm jest --runInBand`, `pytest`

`DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM`
: Cantidad mínima de nodos o trabajadores de CI que `ddtest` considera al planificar.<br/>
**Indicador de CLI:** `--min-parallelism`<br/>
**Predeterminado:** Cantidad de CPU físicas<br/>
**Ejemplo:** `1`

`DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM`
: Cantidad máxima de nodos o trabajadores de CI que `ddtest` considera al planificar.<br/>
**Indicador de CLI:** `--max-parallelism`<br/>
**Predeterminado:** Cantidad de CPU físicas<br/>
**Ejemplo:** `8`

`DD_TEST_OPTIMIZATION_RUNNER_CI_JOB_OVERHEAD`
: Sobrecarga estimada de iniciar un nodo de CI adicional. El planificador `ddtest` agrega otro nodo de CI solo si ese nodo reduce el tiempo de reloj de pared al menos en este valor.<br/>Consulte [Selección de paralelismo](#parallelism-selection) para obtener más información.<br/>
**Indicador de CLI:** `--ci-job-overhead`<br/>
**Predeterminado:** `25s`<br/>
**Ejemplo:** `25s`, `45s`, `1m`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_TARGET_TIME`
: Tiempo de ejecución objetivo para la división seleccionada. `ddtest` considera primero las divisiones en o por debajo de este tiempo de ejecución. Si ninguna división puede cumplir con el objetivo dentro del rango de paralelismo configurado, `ddtest` selecciona la división con el tiempo de ejecución esperado más bajo. Consulte [Selección de paralelismo](#parallelism-selection) para obtener más información.<br/>
**Indicador de CLI:** `--target-time`<br/>
**Predeterminado:** `0s`<br/>
**Ejemplo:** `10m`, `300s`, `1500ms`, `0s`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`
: Ejecuta solo los archivos asignados al nodo de CI `N`, donde `N` tiene un índice basado en cero.<br/>
**Indicador de CLI:** `--ci-node`<br/>
**Predeterminado:** `-1`<br/>
**Ejemplo:** `0`

`DD_TEST_OPTIMIZATION_RUNNER_CI_NODE_WORKERS`
: Número de trabajadores que se iniciarán en este nodo de CI. Use un número entero positivo o `ncpu` para usar todas las CPU físicas disponibles.<br/>
**Indicador de CLI:** `--ci-node-workers`<br/>
**Predeterminado:** `1`<br/>
**Ejemplo:** `2`, `ncpu`

`DD_TEST_OPTIMIZATION_RUNNER_WORKER_ENV`
: Establece variables de entorno para cada proceso de trabajador. Use `{{nodeIndex}}` and `{{workerIndex}}` placeholders to give each worker a unique value. For more information, see [Worker environment variables](#worker-environment-variables).<br/>
**CLI flag:** `--worker-env`<br/>
**Default:** Empty<br/>
**Example:** `DB_NAME=testdb{{nodeIndex}}_{{workerIndex}};FIXTURE=fixture{{nodeIndex}}`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_LOCATION`
: Patrón global utilizado para descubrir archivos de prueba. El valor predeterminado es `spec/**/*_spec.rb` para RSpec, `test/**/*_test.rb` para Minitest, la configuración de pytest (`testpaths` y `python_files`) o `**/{test_*,*_test}.py` para pytest, y la configuración de Jest o la coincidencia de pruebas predeterminada de Jest.<br/>**Indicador de CLI:**`--tests-location`<br/>**Alias:**`KNAPSACK_PRO_TEST_FILE_PATTERN`<br/>**Predeterminado:**Predeterminado del framework<br/>**Ejemplo:**`custom/spec/**/*_spec.rb`, `tests/**/*_test.py`, `packages/**/__tests__/**/*.test.ts`

`DD_TEST_OPTIMIZATION_RUNNER_TESTS_EXCLUDE_PATTERN`
: Patrón glob utilizado para excluir archivos de prueba de la detección.<br/>
**Indicador de CLI:** `--tests-exclude-pattern`<br/>
**Alias:** `KNAPSACK_PRO_TEST_FILE_EXCLUDE_PATTERN`<br/>
**Predeterminado:** Vacío<br/>
**Ejemplo:** `spec/system/**/*_spec.rb`

`DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE`
: Ruta a un archivo restaurado de caché de descubrimiento de pruebas. `ddtest` lo importa antes de planificar y actualiza la caché de detección interna después de una detección completa exitosa.<br/>
**Indicador de CLI:** `--test-discovery-cache`<br/>
**Predeterminado:** Vacío<br/>
**Ejemplo:** `.ddtest-cache/tests-discovery.json`

`DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE`
: Controla si el salto de Test Impact Analysis utiliza granularidad a nivel de prueba o a nivel de suite para Ruby. Los valores no válidos recurren a `test`.<br/>
**Indicador de CLI:** `--test-skipping-mode`<br/>
**Predeterminado:** `test`<br/>
**Valores admitidos:** `test`, `suite`

`DD_TEST_OPTIMIZATION_RUNNER_FORCE_FULL_TEST_DISCOVERY`
: Fuerza el descubrimiento completo de pruebas cuando el framework lo admite, incluso en el modo de salto a nivel de suite.<br/>
**Indicador de CLI:** `--force-full-test-discovery`<br/>
**Predeterminado:** `false`<br/>
**Valores admitidos:** `true`, `false`

`DD_TEST_OPTIMIZATION_RUNNER_STRICT_DISCOVERY`
: Falla la planificación cuando el descubrimiento completo de pruebas genera un error. Si el descubrimiento completo se cancela (por ejemplo, por un tiempo de espera), `ddtest` aún recurre al descubrimiento rápido de archivos de prueba en lugar de fallar.<br/>
**Indicador de CLI:** `--strict-discovery`<br/>
**Predeterminado:** `false`<br/>
**Ejemplo:** `true`

`DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS`
: Cadena JSON que anula las etiquetas de tiempo de ejecución utilizadas para obtener pruebas que se pueden omitir. Use esto cuando `ddtest` se ejecute fuera del entorno de CI utilizado para calcular las pruebas que se pueden omitir.<br/>
**Indicador de CLI:** `--runtime-tags`<br/>
**Alias:** `DD_TEST_OPTIMIZATION_RUNTIME_TAGS`<br/>
**Predeterminado:** Vacío<br/>
**Ejemplo:** `{"os.platform":"linux","os.version":"7.8.9","runtime.name":"ruby","runtime.version":"3.3.0"}`

`DD_TEST_OPTIMIZATION_RUNNER_REPORT_ENABLED`
: Controla si `ddtest` imprime informes legibles por humanos después de la ejecución del comando. Esta configuración solo está disponible como variable de entorno.<br/>
**Indicador de CLI:** Ninguno<br/>
**Predeterminado:** `true`<br/>
**Ejemplo:** `false`

## Selección de paralelismo {#parallelism-selection}

`ddtest plan` estima cuánto tiempo toma cada archivo de prueba ejecutable, luego evalúa cada valor de paralelismo entre `--min-parallelism` y `--max-parallelism`.

En el modo de nodo CI, este valor es el recuento de nodos CI. En un solo nodo CI, este valor es el recuento de trabajadores.

Las estimaciones de duración provienen de los tiempos p50 del conjunto de pruebas de Datadog cuando están disponibles y, de lo contrario, recurren a los pesos de descubrimiento local. Cada recuento de candidatos se califica como el tiempo esperado del trabajador más lento más el recuento de nodos multiplicado por `--ci-job-overhead`.

Cuando las puntuaciones empatan, `ddtest` prefiere menos nodos o trabajadores de CI, luego un tiempo de reloj de pared esperado más bajo, y luego un menor desequilibrio entre los trabajadores.

`ddtest` utiliza la configuración `--ci-job-overhead` para evitar seleccionar siempre el número máximo de nodos de CI. Con el valor predeterminado de `25s`, `ddtest` agrega otro nodo de CI solo cuando se espera que ese nodo ahorre al menos 25 segundos de tiempo de reloj de pared.

Aumente `--ci-job-overhead` para usar menos nodos de CI. Disminúyalo para preferir un tiempo de reloj de pared más rápido. Utilice valores de duración como `25s`, `1m` o `1500ms`. Establezca `0s` para distribuir siempre la ejecución de pruebas en `--max-parallelism` nodos.

Establezca `--target-time` para hacer que `ddtest` evalúe primero las divisiones en o por debajo de ese objetivo. Utilice valores de duración como `10m`, `300s` o `1500ms`. El valor predeterminado, `0s`, deshabilita el objetivo.

Si ninguna división puede cumplir con el objetivo, `ddtest` registra una advertencia. Selecciona la división con el menor tiempo de reloj de pared esperado, ignorando la sobrecarga del trabajo de CI.

## Comandos de prueba personalizados{#custom-test-commands}

Para marcos de trabajo de Ruby y Jest, utilice `--command` para anular el comando de prueba predeterminado:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bin/integration-tests"
{{< /code-block >}}

Al usar `--command`, no incluya archivos de prueba en el comando. `ddtest` añade archivos de prueba y flags específicos del framework al comando.

No incluya el separador `--` en `--command`. Si el comando contiene `--`, `ddtest` emite una advertencia y elimina el separador y todo lo que le sigue.

Para pytest, `ddtest` ejecuta `python -m pytest <files>` de forma predeterminada. Para versiones 1.7.0 y posteriores, configure `--command` para anular el comando base. Por ejemplo, `--command pytest` ejecuta el script de consola `pytest` en lugar de `python -m pytest`. `ddtest` ejecuta `<command> <files>` y no añade `-m pytest`. Para pasar flags adicionales de pytest sin cambiar el comando base, use `PYTEST_ADDOPTS`. `ddtest` añade `--ddtrace` a `PYTEST_ADDOPTS` automáticamente para que el plugin de pytest `ddtrace` se cargue sin cambiar su configuración de pytest.

Para Jest, `ddtest` antepone `-r dd-trace/ci/init` a `NODE_OPTIONS` para los procesos de trabajo a menos que ya esté presente, por lo que el paquete `dd-trace` debe estar instalado en el proyecto donde se ejecuta `ddtest`.

## Detección de prueba de pytest {#pytest-test-discovery}

Para pytest, `ddtest` detecta archivos de prueba usando esta prioridad:

1. `--tests-location` cuando está configurado.
2. Configuración de Pytest desde `pytest.ini`, `pyproject.toml`, `tox.ini` o `setup.cfg`, usando `testpaths` y `python_files`.
3. El patrón integrado `**/{test_*,*_test}.py`.

Pytest no tiene un equivalente al flag de patrón de RSpec, por lo que `ddtest` resuelve el patrón a rutas de archivo explícitas antes de invocar el comando pytest configurado. El valor predeterminado es `python -m pytest`. Para versiones 1.7.0 y posteriores, `--command` lo anula.

## Detección e instrumentación de prueba de Jest {#jest-test-discovery-and-instrumentation}

Para Jest, `ddtest` detecta archivos de prueba con el comando `--listTests` propio de Jest. Utiliza esta prioridad:

1. `--command` cuando se establece, con `--listTests` añadido.
2. El ejecutable local `node_modules/.bin/jest` cuando está presente.
3. `npx jest`.

Jest utiliza su propia configuración y coincidencia de prueba predeterminada para `--listTests`. Cuando `--tests-location` está establecido, `ddtest` filtra la lista devuelta por Jest después de la detección. No pasa `--tests-location` como `--testMatch` de Jest.

El soporte de Jest utiliza el Test Impact Analysis a nivel de suite. `ddtest` funciona con archivos y suites de prueba, no con pruebas individuales de Jest, y ejecuta los archivos seleccionados con `--runTestsByPath`.

Durante la ejecución, `ddtest` antepone `-r dd-trace/ci/init` a `NODE_OPTIONS` para los procesos de trabajo, a menos que `NODE_OPTIONS` ya cargue `dd-trace/ci/init`.

## Variables de entorno del trabajador {#worker-environment-variables}

Utilice `--worker-env` para establecer variables de entorno para cada trabajador. El valor admite los marcadores de posición `{{nodeIndex}}` and `{{workerIndex}}` marcadores de posición.

`{{nodeIndex}}`
: El índice del nodo de CI de `--ci-node` or `DD_TEST_OPTIMIZATION_RUNNER_CI_NODE`. In single-node runs, the value is `0`.

`{{workerIndex}}`
: El índice del proceso de worker dentro del nodo de CI actual, comenzando en `0`.

El formato es `ENV=value`. Separe los valores múltiples con `;`.

Por ejemplo, asigne a cada trabajador su propia base de datos de pruebas:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform ruby \
  --framework rspec \
  --worker-env "DB_NAME=testdb{{nodeIndex}}_{{workerIndex}}"
{{< /code-block >}}

`ddtest` establece automáticamente `DD_TEST_SESSION_NAME` para cada trabajador en `<DD_SERVICE>-node-<nodeIndex>-worker-<workerIndex>` cuando la variable no está establecida. Si establece `DD_TEST_SESSION_NAME`, `ddtest` lo conserva y expande los mismos marcadores de posición antes de iniciar cada trabajador.

## Estabilizar etiquetas de tiempo de ejecución {#stabilize-runtime-tags}

Las pruebas omitibles del Análisis de Impacto de Pruebas están limitadas por etiquetas de tiempo de ejecución como SO, arquitectura y versión de Ruby. Si `ddtest` informa a menudo que se omiten 0 pruebas, verifique si las etiquetas de tiempo de ejecución varían entre los ejecutores de CI. Por ejemplo, los ejecutores de AWS pueden informar diferentes valores de `os.version` entre trabajos.

Para hacer que la coincidencia sea estable, establezca etiquetas de tiempo de ejecución fijas en el entorno utilizado tanto por `ddtest` como por los procesos de los trabajadores:

{{< code-block lang="bash" >}}
export DD_TEST_OPTIMIZATION_RUNTIME_TAGS='{"os.architecture":"x86_64","os.platform":"linux","os.version":"6.8.0-aws","runtime.name":"ruby","runtime.version":"3.3.0"}'
ddtest run
{{< /code-block >}}

`ddtest` también acepta la variable de entorno `DD_TEST_OPTIMIZATION_RUNNER_RUNTIME_TAGS` específica del ejecutor y la bandera de CLI `--runtime-tags`.

## Artefactos del plan {#plan-artifacts}

`ddtest plan` escribe un directorio `.testoptimization/` en el directorio de trabajo actual. Copie este directorio desde el trabajo de planificación a cada trabajo de CI que ejecute `ddtest run` o consuma lista de archivos de plan `ddtest`.

La mayoría de las integraciones deben tratar `.testoptimization/` como un artefacto generado. Los archivos estables para consumidores externos son:

| Archivo | Descripción |
| ---- | ----------- |
| `.testoptimization/manifest.txt` | Versión del diseño del plan. |
| `.testoptimization/runner/test-files.txt` | Lista delimitada por nuevas líneas de archivos de prueba a ejecutar. Cada archivo contiene al menos una prueba no omitida. |
| `.testoptimization/runner/parallel-runners.txt` | Recuento de nodos de CI o recuento de trabajadores seleccionados. |
| `.testoptimization/runner/skippable-percentage.txt` | Porcentaje de tiempo de prueba omitido por Test Impact Analysis. |
| `.testoptimization/runner/tests-split/runner-N` | Lista de archivos delimitada por saltos de línea asignada al índice `N`. |
| `.testoptimization/github/config` | Salida de la matriz de GitHub Actions, escrita cuando `ddtest` detecta GitHub Actions. |

Los archivos bajo `.testoptimization/runner/cache/`, `.testoptimization/tests-discovery/` y `.testoptimization/cache/http/*.json` son detalles de implementación. Úselos solo para la resolución de problemas.

## Use un plan con otro ejecutor de pruebas {#use-a-plan-with-another-test-runner}

Use un plan `ddtest` cuando desee que `ddtest` seleccione los archivos de prueba ejecutables, pero otro ejecutor los ejecute.

Consulte [Artefactos del plan](#plan-artifacts) para los archivos `test-files.txt` y los archivos `tests-split/runner-N` por ejecutor que otro ejecutor puede consumir.

Por ejemplo, use `.testoptimization/runner/test-files.txt` con Knapsack Pro:

{{< code-block lang="bash" >}}
KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE=.testoptimization/runner/test-files.txt bundle exec rake knapsack_pro:queue:rspec
{{< /code-block >}}

Para pytest, habilite el complemento `ddtrace` con `PYTEST_ADDOPTS` y pase la lista de archivos a `python -m pytest`:

{{< code-block lang="bash" >}}
export PYTEST_ADDOPTS="${PYTEST_ADDOPTS:+$PYTEST_ADDOPTS }--ddtrace"
if [ -s .testoptimization/runner/test-files.txt ]; then
  xargs python -m pytest < .testoptimization/runner/test-files.txt
fi
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}