---
description: Configure la paralelización de prueba con ddtest, configure los proveedores
  de CI y distribuya la ejecución de pruebas entre los nodos de CI.
further_reading:
- link: /tests/test_parallelization/configuration/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentación
  text: Solución de problemas de paralelización de prueba
- link: /tests/test_parallelization/best_practices/
  tag: Documentación
  text: Prácticas recomendadas para la paralelización de prueba
- link: /tests/setup/
  tag: Documentación
  text: Configure Test Optimization
title: Configure la paralelización de prueba
---
## Requisitos previos {#prerequisites}

Antes de configurar la paralelización de prueba:

- Configure Test Optimization
- Para Ruby: utilice la `datadog-ci` versión de la gema `1.31.0` o posterior.
- Para Python: utilice la `ddtrace` versión del paquete `4.11.0` o posterior y `pytest`.
- Para JavaScript: utilice la `dd-trace` versión del paquete `5.111.0` o posterior para `v5` o `v6.0.0` o posterior para `v6`, Node.js y una [versión de framework compatible][8]. Cucumber.js, Cypress, Mocha, Playwright y Vitest requieren `ddtest` 1.6.0 o posterior.
- Habilite [Test Impact Analysis][2] para el servicio de pruebas cuando desee que la paralelización de prueba divida solo las pruebas afectadas por un cambio de código.

## Conceptos {#concepts}

Ejecutor
: Un programa que ejecuta pruebas. `ddtest` puede ejecutar pruebas directamente o escribir listas de archivos para otro ejecutor.

Nodo de CI
: Un entorno de ejecución de CI, como un trabajo de GitHub Actions, un contenedor paralelo de CircleCI, un pod de Kubernetes, una VM o una máquina local.

Trabajador
: Un proceso iniciado por `ddtest` para ejecutar pruebas. Un nodo de CI puede ejecutar un trabajador o varios trabajadores.

Plan
: El directorio `.testoptimization/` generado. Contiene los archivos de prueba ejecutables, el paralelismo seleccionado y las listas de archivos por nodo utilizadas por `ddtest run` u otro ejecutor.

Paralelismo seleccionado
: El recuento de nodos de CI o el recuento de trabajadores locales que `ddtest` elige después de estimar las duraciones de los archivos de prueba.

## Instale ddtest {#install-ddtest}

Instale la CLI de `ddtest` en su trabajo de CI. Datadog publica binarios precompilados en [GitHub Releases][3].

{{< tabs >}}
{{% tab "CLI de GitHub" %}}

{{< code-block lang="yaml" >}}
- name: Download ddtest binary
  run: |
    mkdir -p bin
    gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
    mv bin/ddtest-linux-amd64 bin/ddtest
    chmod +x bin/ddtest
  env:
    GH_TOKEN: ${{ github.token }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "curl" %}}

{{< code-block lang="bash" >}}
mkdir -p bin
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
chmod +x bin/ddtest
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Estos ejemplos descargan el binario de Linux AMD64 más reciente. Para otro sistema operativo o arquitectura, seleccione el activo correspondiente en [GitHub Releases][3].

## Adopte ddtest en CI {#adopt-ddtest-in-ci}

Adopte la paralelización de pruebas en cuatro pasos. Primero, agregue la planificación sin cambiar la forma en que se ejecutan las pruebas. Después de validar el plan, reemplace el comando de prueba existente con `ddtest`, elija un modo de ejecución y mida los ahorros resultantes en CI.

Realice estos cambios en una rama de características. Confirme y envíe cada cambio de configuración de CI, luego revise la ejecución de CI resultante antes de continuar.

### 1. Agregue la planificación de pruebas {#1-add-test-planning}

Después de configurar las dependencias y Test Optimization, agregue `ddtest plan` antes de su paso de prueba existente. Mantenga el comando de prueba existente en su lugar durante este paso.

Elija el paralelismo mínimo y máximo para su entorno de CI. Por ejemplo, los siguientes valores permiten que `ddtest` elija entre 1 y 8 nodos de CI o trabajadores locales:

{{< code-block lang="bash" >}}
bin/ddtest plan \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --min-parallelism 1 \
  --max-parallelism 8
{{< /code-block >}}

`--platform` identifica la plataforma de lenguaje y `--framework` identifica el marco de pruebas. Para todos los valores admitidos y predeterminados, consulte [Configuración][4].

La planificación descubre pruebas, recupera la duración de la prueba y los datos de Test Impact Analysis, y elige un nivel de paralelismo. No ejecuta pruebas. El directorio `.testoptimization/` generado contiene los archivos de prueba y las divisiones seleccionadas para la ejecución.

### 2. Inspeccione el plan {#2-inspect-the-plan}

Los siguientes comandos son una forma de inspeccionar el recuento de ejecutores propuesto y los archivos de prueba en los registros de CI:

{{< code-block lang="bash" >}}
# Show the number of runners selected by ddtest.
cat .testoptimization/runner/parallel-runners.txt

# Count the test files selected for execution.
wc -l .testoptimization/runner/test-files.txt

# Preview the first 20 test files to verify test discovery.
sed -n '1,20p' .testoptimization/runner/test-files.txt

# Optional: List the per-runner split files to see how ddtest distributed the tests.
find .testoptimization/runner/tests-split -maxdepth 1 -type f -print
{{< /code-block >}}

Alternativamente, descargue el directorio `.testoptimization/` como un artefacto de CI y abra los archivos en su editor.

Confirme que `test-files.txt` contenga una lista de archivos para ejecutar. Si Test Impact Analysis está habilitado, los archivos cuyas pruebas se omiten por completo no aparecen en el plan.

### 3. Reemplace el comando de prueba existente {#3-replace-the-existing-test-command}

Después de que el plan contenga las pruebas esperadas, reemplace el comando de prueba existente con:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK>
{{< /code-block >}}

`ddtest run` reutiliza el plan generado anteriormente en el flujo de trabajo. Elija cómo ejecutar las divisiones seleccionadas según su arquitectura de CI.

#### Ejecute trabajadores en un nodo de CI {#run-workers-on-one-ci-node}

En un solo nodo de CI, `ddtest plan` es opcional. Ejecute `ddtest run` directamente, o ejecute `ddtest plan` y `ddtest run` consecutivamente en el mismo trabajo si desea inspeccionar el plan primero. El paralelismo seleccionado es la cantidad de procesos de trabajador locales que inicia `ddtest`. El comando no requiere opciones adicionales.

#### Distribuye las pruebas entre los nodos de CI {#distribute-tests-across-ci-nodes}

Ejecute `ddtest plan` una vez en un trabajo de planificación. Comparta el directorio `.testoptimization/` completo con los trabajos de prueba y use el paralelismo seleccionado para definir el tamaño de su matriz de CI. En cada nodo, ejecute:

{{< code-block lang="bash" >}}
bin/ddtest run \
  --platform <PLATFORM> \
  --framework <FRAMEWORK> \
  --ci-node <CI_NODE_INDEX>
{{< /code-block >}}

En el modo de nodo de CI, `ddtest` usa un trabajador local de forma predeterminada. Para iniciar varios trabajadores en cada nodo de CI, establezca `--ci-node-workers` en un número entero positivo o `ncpu`.

Los ejemplos de CI en esta página muestran cómo pasar el plan generado y el recuento de ejecutores seleccionado entre trabajos.

### 4. Mida los ahorros de CI {#4-measure-ci-savings}

Después de reemplazar el comando de prueba, confirme en el [Test Optimization Explorer][6] que se completaron las pruebas esperadas. Utilice el [CI Visibility Explorer][7] para comparar las duraciones de los trabajos de prueba y la cantidad de trabajos de prueba entre las ejecuciones de canalización. Si la CI Visibility no está habilitada, utilice las métricas de trabajo equivalentes en su proveedor de CI.

Si todos los trabajadores se ejecutan en un nodo de CI, la ejecución paralela acorta la etapa de prueba sin cambiar la cantidad de nodos de CI. Si cada trabajador se ejecuta en un nodo de CI independiente, utilice el recuento de ejecutores en `parallel-runners.txt` para dimensionar la matriz de CI. Debido a que Test Impact Analysis elimina las pruebas no afectadas antes de que `ddtest` seleccione el recuento de ejecutores, los cambios más pequeños pueden resultar en el inicio de menos nodos de CI.

Utilice `--max-parallelism` para limitar la capacidad de CI. El planificador tiene en cuenta el costo de configuración de cada ejecutor adicional a través de `--ci-job-overhead`. Para obtener detalles sobre estas configuraciones, consulte [Configuración][4].

Agregue `.testoptimization/` a `.gitignore`. Genere un plan nuevo para cada ejecución de flujo de trabajo de CI y compártalo solo entre trabajos para la misma revisión de fuente y entorno de ejecución. Ejecute la planificación y las pruebas desde el mismo directorio de trabajo. Para obtener detalles sobre los archivos generados, consulte [Plan artifacts][5].

## Ejemplos de CI {#ci-examples}

Utilice los siguientes ejemplos como puntos de partida para GitHub Actions y CircleCI.

{{< collapse-content title="Ruby" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

El trabajo de plan elige el recuento de nodos de CI y emite una matriz. El trabajo de prueba descarga el artefacto `.testoptimization/` y ejecuta solo los archivos asignados a su nodo de matriz.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: ruby
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: rspec
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: ruby
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

El flujo de trabajo de configuración ejecuta `ddtest plan`, almacena `.testoptimization/` y continúa en un flujo de trabajo de prueba con el recuento de nodos de CI seleccionado.

En `.circleci/config.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform ruby --framework rspec
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

En `.circleci/test.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  ruby: circleci/ruby@2
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/ruby:3.4.1
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - ruby/install-deps
      - test-optimization-circleci-orb/autoinstrument:
          languages: ruby
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="ruby-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform ruby --framework rspec --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="Python" level="h3" >}}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

El trabajo de plan elige el recuento de nodos de CI y emite una matriz. El trabajo de prueba descarga el artefacto `.testoptimization/` y ejecuta solo los archivos asignados a su nodo de matriz.

{{< code-block lang="yaml" >}}
name: CI with Test Parallelization

on: [push]

env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: python
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: pytest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8

jobs:
  dd_plan:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.dd_plan.outputs.matrix }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - id: dd_plan
        name: Plan test execution
        run: bin/ddtest plan
      - uses: actions/upload-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
          include-hidden-files: true

  dd_test:
    runs-on: ubuntu-latest
    needs: [dd_plan]
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.dd_plan.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - name: Download ddtest binary
        run: |
          mkdir -p bin
          gh release download --repo DataDog/ddtest --pattern "ddtest-linux-amd64" --dir bin
          mv bin/ddtest-linux-amd64 bin/ddtest
          chmod +x bin/ddtest
        env:
          GH_TOKEN: ${{ github.token }}
      - uses: actions/download-artifact@v4
        with:
          name: dd-artifacts
          path: .testoptimization
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - name: Install Python dependencies
        run: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - name: Configure Datadog Test Optimization
        uses: datadog/test-visibility-github-action@v2
        with:
          languages: python
          api_key: ${{ secrets.DD_API_KEY }}
          site: datadoghq.com
      - name: Run tests
        run: bin/ddtest run --ci-node ${{ matrix.ci_node_index }}
{{< /code-block >}}

{{% /tab %}}
{{% tab "CircleCI" %}}

El flujo de trabajo de configuración ejecuta `ddtest plan`, almacena `.testoptimization/` y continúa en un flujo de trabajo de prueba con el recuento de nodos de CI seleccionado.

En `.circleci/config.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"
setup: true

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1
  continuation: circleci/continuation@0.2.0

jobs:
  plan:
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Download ddtest
          command: |
            mkdir -p bin
            curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/ddtest-linux-amd64 -o bin/ddtest
            chmod +x bin/ddtest
      - run:
          name: Plan tests
          command: bin/ddtest plan --platform python --framework pytest
          environment:
            DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
            DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
      - save_cache:
          key: ddtest-plan-{{ .Revision }}
          paths:
            - .testoptimization
            - bin/ddtest
      - run:
          name: Continue with selected parallelism
          command: |
            desired=$(cat .testoptimization/runner/parallel-runners.txt 2>/dev/null || echo 1)
            printf '{"parallelism": %s}\n' "${desired}" > pipeline-parameters.json
      - continuation/continue:
          configuration_path: .circleci/test.yml
          parameters: pipeline-parameters.json

workflows:
  plan:
    jobs:
      - plan
{{< /code-block >}}

En `.circleci/test.yml`:

{{< code-block lang="yaml" >}}
version: "2.1"

parameters:
  parallelism:
    type: integer
    default: 1

orbs:
  test-optimization-circleci-orb: datadog/test-optimization-circleci-orb@1

jobs:
  test:
    parallelism: << pipeline.parameters.parallelism >>
    docker:
      - image: cimg/python:3.12
    steps:
      - checkout
      - restore_cache:
          keys:
            - ddtest-plan-{{ .Revision }}
      - run:
          name: Install Python dependencies
          command: python -m pip install -r requirements.txt "ddtrace>=4.11.0" pytest
      - test-optimization-circleci-orb/autoinstrument:
          languages: python
          site: datadoghq.com
      - run:
          name: Run tests
          command: |
            export DD_TEST_SESSION_NAME="python-tests-${CIRCLE_NODE_INDEX:-0}"
            bin/ddtest run --platform python --framework pytest --ci-node "${CIRCLE_NODE_INDEX:-0}"

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

{{< /collapse-content >}}

{{< collapse-content title="JavaScript" level="h3" >}}

Utilice la misma estructura de trabajo de prueba y plan que los ejemplos de Ruby y Python. Establezca `DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK` en `cucumber`, `cypress`, `jest`, `mocha`, `playwright` o `vitest`. Los siguientes ejemplos usan Jest; reemplace `jest` con el marco de trabajo para su conjunto de pruebas.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

Establezca estas variables de entorno a nivel de flujo de trabajo o de trabajo:

{{< code-block lang="yaml" >}}
env:
  DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
  DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
  DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
  DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
{{< /code-block >}}

Reemplace cada paso de configuración de lenguaje con la instalación de dependencias de Node.js:

{{< code-block lang="yaml" >}}
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
- name: Install JavaScript dependencies
  run: npm ci
{{< /code-block >}}

Configure Datadog Test Optimization para JavaScript:

{{< code-block lang="yaml" >}}
- name: Configure Datadog Test Optimization
  uses: datadog/test-visibility-github-action@v2
  with:
    languages: js
    api_key: ${{ secrets.DD_API_KEY }}
    site: datadoghq.com
{{< /code-block >}}

Los comandos `ddtest plan` y `ddtest run --ci-node ${{ matrix.ci_node_index }}` permanecen sin cambios cuando la plataforma y el marco de trabajo se proporcionan a través del entorno.

{{% /tab %}}
{{% tab "CircleCI" %}}

Utilice una imagen de Node.js y establezca el entorno del ejecutor en el trabajo `plan`:

{{< code-block lang="yaml" >}}
jobs:
  plan:
    docker:
      - image: cimg/node:22.14
    environment:
      DD_TEST_OPTIMIZATION_RUNNER_PLATFORM: javascript
      DD_TEST_OPTIMIZATION_RUNNER_FRAMEWORK: jest
      DD_TEST_OPTIMIZATION_RUNNER_MIN_PARALLELISM: 1
      DD_TEST_OPTIMIZATION_RUNNER_MAX_PARALLELISM: 8
    steps:
      - checkout
      - run:
          name: Install JavaScript dependencies
          command: npm ci
      - test-optimization-circleci-orb/autoinstrument:
          languages: js
          site: datadoghq.com
{{< /code-block >}}

Mantenga los pasos de descarga, plan, caché y continuación de `ddtest` del flujo de trabajo de CircleCI. En el trabajo de prueba, instale las dependencias, autoinstrumente JavaScript y pase el índice de nodo de CircleCI a `ddtest`:

{{< code-block lang="yaml" >}}
- run:
    name: Install JavaScript dependencies
    command: npm ci
- test-optimization-circleci-orb/autoinstrument:
    languages: js
    site: datadoghq.com
- run:
    name: Run tests
    command: |
      NODE_INDEX=${CIRCLE_NODE_INDEX:-0}
      bin/ddtest run --platform javascript --framework jest --ci-node "${NODE_INDEX}"
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

`ddtest` antepone `NODE_OPTIONS=-r dd-trace/ci/init` para los procesos de trabajo de JavaScript, por lo que las dependencias del proyecto instaladas antes de `ddtest plan` deben incluir `dd-trace`. Esto no reemplaza la [Test Optimization setup][8] específica del marco de trabajo. Por ejemplo, Cypress requiere instrumentación manual en su archivo de configuración.

{{< /collapse-content >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/setup/
[2]: /es/tests/test_impact_analysis/
[3]: https://github.com/DataDog/ddtest/releases/latest
[4]: /es/tests/test_parallelization/configuration/
[5]: /es/tests/test_parallelization/configuration/#plan-artifacts
[6]: /es/tests/explorer/
[7]: /es/continuous_integration/explorer/
[8]: /es/tests/setup/javascript/