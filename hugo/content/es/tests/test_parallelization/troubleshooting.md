---
description: Solucione problemas de artefactos del plan de paralelización de pruebas,
  selección de nodos de CI, pruebas que se pueden omitir y comandos personalizados.
further_reading:
- link: /tests/test_parallelization/setup/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/test_parallelization/configuration/
  tag: Documentación
  text: Configure la paralelización de prueba
- link: /tests/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Test Optimization
title: Solución de problemas de paralelización de pruebas
---
## Artefactos del plan faltantes o no válidos {#missing-or-invalid-plan-artifacts}

Si `ddtest run --ci-node <N>` no puede encontrar los archivos de prueba asignados, verifique que el directorio `.testoptimization/` del trabajo de planificación esté disponible en el trabajo de prueba.

El trabajo de prueba debe tener acceso a:

- `.testoptimization/manifest.txt`
- `.testoptimization/runner/parallel-runners.txt`
- `.testoptimization/runner/tests-split/runner-N`

Al usar GitHub Actions, cargue `.testoptimization/` con `include-hidden-files: true`; de lo contrario, la carga de artefactos puede omitir el directorio oculto.

## Cantidad inesperada de nodos o trabajadores de CI {#unexpected-ci-node-or-worker-count}

Si `ddtest` selecciona más o menos nodos de CI de lo esperado, verifique estos ajustes:

- `--min-parallelism`: Cantidad mínima de nodos o trabajadores de CI que `ddtest` considera.
- `--max-parallelism`: Cantidad máxima de nodos o trabajadores de CI que `ddtest` considera.
- `--ci-job-overhead`: Sobrecarga estimada para iniciar un nodo de CI adicional.
- `--target-time`: Tiempo de ejecución objetivo para la división seleccionada.

Aumente `--ci-job-overhead` para preferir menos nodos de CI. Disminúyalo para preferir un tiempo de reloj de pared más rápido.

## No se aplican pruebas que se pueden omitir {#no-skippable-tests-are-applied}

Si Test Impact Analysis no omite pruebas antes de que se ejecute la Paralelización de pruebas, verifique que:

- Test Impact Analysis está habilitado para el servicio de pruebas.
- El ejecutable `git` está presente y se ejecuta `ddtest` en un repositorio Git con una carpeta `.git`.
- El trabajo que ejecuta `ddtest plan` y el trabajo que ejecuta las pruebas utilizan el mismo valor de `DD_SERVICE`.
- `ddtest plan` se ejecuta en el mismo sistema operativo y tiempo de ejecución de lenguaje que sus pruebas.

Para obtener más información, verifique [Test Impact Analysis troubleshooting][1].

## Minitest no ejecuta los archivos seleccionados {#minitest-does-not-run-the-selected-files}

Para proyectos de Minitest que no son de Rails, `ddtest` utiliza `bundle exec rake test` y pasa los archivos seleccionados en la variable de entorno `TEST_FILES`. Su `Rake::TestTask` debe leer `TEST_FILES`:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Los comandos personalizados no ejecutan los archivos esperados {#custom-commands-do-not-run-the-expected-files}

Al usar `--command`, no incluya archivos de prueba ni el separador `--` en el comando. `ddtest` añade los archivos de prueba seleccionados por sí mismo.

Incorrecto:

{{< code-block lang="bash" >}}
bin/ddtest run --command "bundle exec rspec -- spec/models/"
{{< /code-block >}}

Correcto:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec"
{{< /code-block >}}

Para Cucumber.js, Cypress, Mocha, Playwright y Vitest, el comando debe invocar el framework seleccionado directamente. Los envoltorios de gestores de paquetes son compatibles. Por ejemplo:

{{< code-block lang="bash" >}}
bin/ddtest run --platform javascript --framework playwright --command "pnpm exec playwright test --project chromium"
{{< /code-block >}}

Si un comando personalizado de JavaScript ejecuta una selección inesperada, verifique las entradas del framework que `ddtest` reemplaza:

- Rutas posicionales y archivos de reejecución de Cucumber.js
- Cypress `--spec`
- Entradas configuradas de Mocha `spec`
- Playwright `--shard` y opciones de interfaz de usuario interactiva

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/test_impact_analysis/troubleshooting/