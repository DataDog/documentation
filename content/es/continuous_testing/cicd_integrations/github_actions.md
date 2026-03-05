---
algolia:
  tags:
  - Extensión Datadog Lambda
aliases:
- /es/synthetics/cicd_integrations/github_actions
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
title: Continuous Testing y GitHub Actions de CI
---
## Información general

![Lanzamiento de GitHub](https://img.shields.io/github/v/release/DataDog/synthetics-ci-github-action)

Activa tests de Datadog Synthetic desde tus flujos de trabajo de GitHub.

Para obtener más información sobre la configuración disponible, consulta la [documentación `datadog-ci synthetics run-tests`][1].

## Configuración

Para empezar:

1. Añade tu API de Datadog y tus claves de aplicación como secretos a tu repositorio de GitHub.
   - Para obtener más información, consulta [Claves de API y de aplicación][2].
2. En tu flujo de trabajo de GitHub, utiliza `DataDog/synthetics-ci-github-action`.

Tu flujo de trabajo puede ser [simple](#simple-workflows) o [complejo](#complex-workflows).

## Flujos de trabajo simples

### Ejemplo de flujos de trabajo con ID públicos

```yaml
name: Run Synthetic tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          public-ids: |
            abc-d3f-ghi
            jkl-mn0-pqr
```

### Ejemplo de flujos de trabajo con el uso de un archivo `synthetics.json` existente

```yaml
name: Run Synthetic tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
```

Para ver un archivo de test de ejemplo, consulta este [archivo `test.synthetics.json`][12].

**Nota**: Por defecto, este flujo de trabajo ejecuta todos los tests mencionados en los archivos `{,!(node_modules)/**/}*.synthetics.json` (todos los archivos que terminan en `.synthetics.json`, excepto los de la carpeta `node_modules`). También puedes activar una lista de tests Synthetic especificando un `public_id` o utilizando una consulta de búsqueda.

## Flujos de trabajo complejos

### Ejemplo de flujos de trabajo con `test_search_query`

```yaml
name: Run Synthetic tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          test-search-query: 'tag:e2e-tests'
```

### Ejemplo de flujos de trabajo con una consulta de búsqueda de prueba y anulación de variables

```yaml
name: Run Synthetic tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          test-search-query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Ejemplo de flujos de trabajo con el uso de un archivo de configuración global con `config_path`

Por defecto, la ruta al archivo de configuración global es `datadog-ci.json`. Puedes anular esta ruta con la entrada `config_path`.

```yaml
name: Run Synthetic tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v3.8.2
        with:
          api-key: ${{secrets.DD_API_KEY}}
          app-key: ${{secrets.DD_APP_KEY}}
          config-path: './global.config.json'
```

## Entradas

Para obtener más información sobre la configuración disponible, consulta la [documentación `datadog-ci synthetics run-tests`][1].

| Nombre                      | Descripción                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api-key`                 | (**Obligatorio**) Tu clave de API de Datadog. Esta clave se [crea en tu organización Datadog][2] y debe guardarse como [secreto][3].                                                                                                                                                                                  |
| `app-key`                 | (**Obligatorio**) Tu clave de aplicación de Datadog. Esta clave se [crea en tu organización Datadog][2] y debe guardarse como [secreto][3].                                                                                                                                                                          |
| `batch-timeout`           | Especifica la duración del tiempo de espera en milisegundos del lote de CI. Cuando se excede el tiempo de espera de un lote, el trabajo de CI falla y no se activan nuevas ejecuciones de tests, pero las ejecuciones de tests en curso se completan normalmente. <br><sub>**Por defecto:** `1800000` (30 minutos)</sub>                                                                          |
| `config-path`             | Ruta al [archivo de configuración global][4] que configura datadog-ci. <br><sub>**Por defecto:** `datadog-ci.json`</sub>                                                                                                                                                                                           |
| `datadog-site`            | Tu sitio Datadog. Los valores posibles se indican [en esta tabla][11]. <br><sub>**Por defecto:** `datadoghq.com`</sub> <br><br> Configúralo en {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el SITIO correcto a la derecha).                                                    |
| `fail-on-critical-errors` | Falla el trabajo de CI si se produce un error crítico que suele ser transitorio, como límites de frecuencia, fallos de autenticación o problemas de infraestructura de Datadog. <br><sub>**Por defecto:** `false`</sub>                                                                                                                        |
| `fail-on-missing-tests`   | Falla el trabajo de CI si la lista de tests por ejecutar está vacía o si faltan algunos tests explícitamente mencionados. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                           |
| `fail-on-timeout`         | Falla el trabajo de CI si el lote de CI falla por haber excedido el tiempo de espera. <br><sub>**Por defecto:** `true`</sub>                                                                                                                                                                                                                             |
| `files`                   | Patrones glob para detectar [archivos de configuración de tests ][12] Synthetic, separados por nuevas líneas. <br><sub>**Por defecto:** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                    |
| `junit-report`            | Nombre de archivo para un informe JUnit, si quieres generar uno. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                                                                                                      |
| `locations`               | Anula la lista de ubicaciones desde las que ejecutar tests, separadas por nuevas líneas o comas. Los valores posibles se enumeran [en esta respuesta de API][17]. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                 |
| `public-ids`              | ID públicos de los tests Synthetic por ejecutar, separados por nuevas líneas o comas. Si no se proporciona ningún valor, los tests se detectan en los [archivos de configuración de tests][12] Synthetic. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                |
| `selective-rerun`         | Si se vuelven a ejecutar solo los tests fallidos. Si un test ya ha pasado para un commit dado, no se vuelve a ejecutar en los siguientes lotes de CI. Por defecto, se utiliza la [configuración por defecto de tu organización][16]. Configúralo como `false` para forzar ejecuciones completas cuando tu configuración lo permita por defecto. <br><sub>**Por defecto:** ninguno</sub> |
| `subdomain`               | Subdominio personalizado para acceder a tu organización Datadog. Si tu URL es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`. <br><sub>**Por defecto:** `app`</sub>                                                                                                                                                 |
| `test-search-query`       | Utiliza una [consulta de búsqueda][5] para seleccionar los tests Synthetic que se van a ejecutar. Utiliza la [barra de búsqueda de la página con la lista de tests Synthetic][13] para crear tu consulta y, a continuación, cópiala y pégala. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                 |
| `tunnel`                  | Utiliza el [túnel de Continuous Testing][9] para lanzar tests contra entornos internos. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                                          |
| `variables`               | Sustituye las existentes o inyecta nuevas variables locales y [globales][14] en tests Synthetic como pares clave-valor, separados por nuevas líneas o comas. Por ejemplo: `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Por defecto:** ninguno</sub>                                                                      |

## Salidas

| Nombre                        | Descripción                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `batch-url`                 | URL del lote de CI.                                                             |
| `critical-errors-count`     | Número de errores críticos que se han producido durante el lote de CI.                     |
| `failed-count`              | Número de resultados que han fallado durante el lote de CI.                               |
| `failed-non-blocking-count` | Número de resultados que han fallado durante el lote de CI sin bloquear CI.       |
| `passed-count`              | Número de resultados que han sido aprobados durante el lote de CI.                               |
| `previously-passed-count`   | Número de resultados que ya han sido aprobados en lotes de CI anteriores en el mismo commit. |
| `tests-not-found-count`     | Número de tests que no se han podido encontrar al iniciar el lote de CI.              |
| `tests-skipped-count`       | Número de tests que se han omitido al iniciar el lote de CI.                    |
| `timed-out-count`           | Número de resultados que han fallado debido al tiempo de espera del lote de CI excedido.                    |
| `raw-results`               | Matriz [`synthetics.Result[]`][18], como cadena codificada en JSON.                     |

## Colaboración

Consultar [CONTRIBUTING.md](./CONTRIBUTING.md)

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Empezando con Continuous Testing][15]
- [Configuración de Continuous Testing y CI/CD][6]
- [Prácticas recomendadas para Continuous Testing con Datadog][10]

[1]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[5]: https://docs.datadoghq.com/es/synthetics/explore/#search
[6]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/es/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[12]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://app.datadoghq.com/synthetics/tests
[14]: https://docs.datadoghq.com/es/synthetics/platform/settings/?tab=specifyvalue#global-variables
[15]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[16]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[17]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[18]: https://github.com/DataDog/datadog-ci/blob/251299775d28b0535d0e5557fcc494a8124d3b11/src/commands/synthetics/interfaces.ts#L196-L227