---
description: Optimice la planificación de la paralelización de pruebas y la detección
  de pruebas para conjuntos de pruebas de Ruby, Rails, Python y JavaScript.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentación
  text: Configure la paralelización de pruebas
- link: /tests/test_parallelization/configuration/
  tag: Documentación
  text: Configure la paralelización de pruebas
- link: /tests/test_parallelization/troubleshooting/
  tag: Documentación
  text: Solución de problemas de paralelización de pruebas
title: Mejores prácticas de paralelización de pruebas
---
## Optimice el paso de planificación {#optimize-the-planning-step}

La paralelización de pruebas añade un paso de planificación que detecta las pruebas antes de la ejecución. Por ejemplo, los proyectos de RSpec utilizan la detección de ejecución en seco (dry-run), los proyectos de pytest utilizan la recolección y los proyectos de Jest utilizan `--listTests`. Mantenga este paso ligero para que el tiempo ahorrado por la ejecución paralela no se vea compensado por la sobrecarga de planificación.

### Preinstale las dependencias del sistema con Docker {#preinstall-system-dependencies-with-docker}

Si sus pruebas necesitan paquetes del sistema operativo, inclúyalos en una imagen base de CI en lugar de instalarlos durante cada ejecución de CI.

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### Almacene en caché las dependencias del proyecto {#cache-project-dependencies}

Utilice la caché de dependencias de su proveedor de CI. Por ejemplo, GitHub Actions puede almacenar en caché las dependencias de Bundler con `ruby/setup-ruby`:

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: 3.3
    bundler-cache: true
{{< /code-block >}}

Para proyectos de Python, utilice `actions/setup-python` con el almacenamiento en caché de pip:

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
{{< /code-block >}}

Para proyectos de JavaScript, utilice `actions/setup-node` con el almacenamiento en caché de npm:

{{< code-block lang="yaml" >}}
- uses: actions/setup-node@v4
  with:
    node-version: "22"
    cache: npm
{{< /code-block >}}

### Omita la configuración de la base de datos durante la detección {#skip-database-setup-during-discovery}

La detección no ejecuta pruebas, por lo que la configuración de la base de datos, las migraciones, las semillas y los fixtures a menudo son innecesarios durante el paso de planificación.

Durante la detección, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` se establece en `1`. Utilice esta variable para omitir código de configuración costoso durante la planificación.

Por ejemplo, en Rails:

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

Después de estos cambios, la detección de pruebas puede ejecutarse más rápido y evitar fallos cuando la base de datos no está disponible durante la planificación.

### Almacene en caché la detección de pruebas {#cache-test-discovery}

Si la detección completa de pruebas tarda demasiado, almacene en caché el archivo de detección `ddtest` entre ejecuciones de CI. Restaure su caché de CI antes de la planificación y pase el archivo restaurado a `ddtest`:

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

Después de la planificación, guarde el archivo de detección interna actualizado de nuevo en su caché de CI:

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest` invalida la caché cuando cambia cualquier archivo de prueba. El conjunto de archivos de prueba está determinado por `--tests-location` y `--tests-exclude-pattern`.

### Utilice el salto a nivel de suite para Ruby {#use-suite-level-skipping-for-ruby}

Si la detección de pruebas de Ruby sigue siendo un cuello de botella después de aplicar estas optimizaciones, configure Test Impact Analysis para usar el salto a nivel de suite. Este modo permite que `ddtest plan` utilice la detección de archivos de prueba en lugar de detectar cada prueba individual. Intercambia la precisión del salto a nivel de prueba por una menor sobrecarga de planificación, ya que Test Impact Analysis salta o ejecuta una suite completa.

El salto a nivel de suite requiere `datadog-ci >= 1.34.0`. Establezca `DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite` tanto para la planificación como para la ejecución de pruebas:

{{< code-block lang="bash" >}}
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest plan
DD_TESTOPTIMIZATION_TIA_TEST_SKIPPING_MODE=suite ddtest run
{{< /code-block >}}

Si ejecuta pruebas con otro comando, establezca la misma variable de entorno para ese comando. En flujos de trabajo de CI que planifican y ejecutan pruebas en trabajos separados, establezca la variable en ambos trabajos.

## Configure pytest {#configure-pytest}

`ddtest` ejecuta pytest como `python -m pytest` de forma predeterminada y añade los archivos de prueba seleccionados. Para versiones 1.7.0 y posteriores, establezca `--command` para anular el comando base. Por ejemplo, `--command pytest` ejecuta el script de consola `pytest` en lugar de `python -m pytest`. `ddtest` ejecuta `<command> <files>` y no agrega `-m pytest`. Anexa `--ddtrace` a `PYTEST_ADDOPTS`, preservando cualquier valor existente, de modo que el complemento de pytest `ddtrace` se cargue sin cambiar su configuración de pytest. Para pasar banderas adicionales de pytest sin cambiar el comando base, use `PYTEST_ADDOPTS`.

Para la detección de pruebas, `ddtest` lee `testpaths` y `python_files` de `pytest.ini`, `pyproject.toml`, `tox.ini` o `setup.cfg`. Si ninguna configuración de pytest define esos ajustes, `ddtest` usa `**/{test_*,*_test}.py`.

Durante la detección, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` se establece en `1`. Use esta variable para omitir código de configuración costoso durante la planificación, similar a [omitir la configuración de la base de datos durante la detección](#skip-database-setup-during-discovery).

## Configure Jest {#configure-jest}

`ddtest` ejecuta Jest a través del ejecutable local `node_modules/.bin/jest` cuando existe, o a través de `npx jest` en caso contrario. Use `--command` cuando su proyecto ejecute Jest a través de un administrador de paquetes o un contenedor:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework jest --command "pnpm jest --runInBand"
{{< /code-block >}}

No incluya archivos de prueba ni un separador `--` en el comando. `ddtest` anexa la lista de archivos y las banderas de Jest por sí mismo.

`ddtest` antepone `-r dd-trace/ci/init` a `NODE_OPTIONS` para los procesos de trabajo a menos que ya esté presente. Asegúrese de que `dd-trace` se pueda resolver desde el proyecto donde se ejecuta `ddtest`.

`ddtest` detecta y divide archivos y suites de prueba, no pruebas individuales de Jest.

## Configure Minitest en proyectos que no son de Rails {#configure-minitest-in-non-rails-projects}

Para proyectos de Minitest que no son de Rails, `ddtest` usa `bundle exec rake test` y pasa los archivos seleccionados en la variable de entorno `TEST_FILES`. Configure su `Rake::TestTask` para leer `TEST_FILES`:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}