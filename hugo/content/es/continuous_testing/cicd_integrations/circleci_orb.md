---
aliases:
- /es/synthetics/cicd_integrations/circleci_orb
dependencies:
- https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md
title: Continuous Testing y Orbe de CircleCI
---
## Información general

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Ejecuta tests Synthetic Datadog en tus pipelines CircleCI utilizando el orbe de CircleCI Datadog.

Para más información sobre la configuración disponible, consulta la [documentación `datadog-ci synthetics run-tests`][1].

## Ajustes

Para empezar:

1. Añade tus claves de API y de aplicación Datadog como variables de entorno a tu proyecto CircleCI.
   - Para obtener más información, consulta [Claves de API y de aplicación][2].
2. Asegúrate de que la imagen que ejecuta el orbe es una imagen basada en Linux-x64 con `curl` instalado.
3. Personaliza tu flujo de trabajo CircleCI añadiendo un paso `synthetics-ci/run-tests` y especificando [entradas](#inputs) como se indica a continuación.

Tu flujo de trabajo puede ser [simple](#simple-usage) o [complejo](#complex-usage).

## Uso sencillo

### Ejemplo de uso del orbe con ID públicos

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: |
            abc-d3f-ghi
            jkl-mn0-pqr

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Ejemplo de uso del orbe con una sustitución global de la configuración 

Este orbe sustituye la ruta al patrón para [archivos de test][4].

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          files: e2e-tests/*.synthetics.json

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

Para ver otro ejemplo de pipeline que activa tests Synthetic, consulta el [archivo`simple-example.yml`][5].

## Uso complejo

### Ejemplo de uso del orbe con la `test_search_query`

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          test_search_query: 'tag:e2e-tests'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Ejemplo de uso del orbe utilizando el [túnel de Continuous Testing][7]

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@5.3.0

jobs:
  e2e-tests:
    docker:
      - image: your-image
    steps:
      - checkout
      - run:
          name: Running server in background
          command: npm start
          background: true
      - synthetics-ci/run-tests:
          config_path: tests/tunnel-config.json
          files: tests/*.synthetics.json
          test_search_query: 'tag:e2e-tests'
          tunnel: true

workflows:
  test-server:
    jobs:
      - build-image
      - integration-tests:
          requires:
            - build-image
```

Para opciones adicionales como la personalización de `batchTimeout` para tus pipelines CircleCI, consulta la [configuración de integraciones CI/CD][6]. Para ver otro ejemplo de pipeline que inicia un servidor local y activa tests Synthetic utilizando el túnel de Continuous Testing, consulta el [archivo `advanced-example.yml`][8].

## Entradas

Para obtener más información sobre la configuración disponibles, consulta la [documentación `datadog-ci synthetics run-tests`][1].

| Nombre                      | Descripción                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `api_key`                 | Nombre de la variable de entorno que contiene tu clave de API Datadog. Esta clave se [crea en tu organización Datadog][2] y debe almacenarse como secreto. <br><sub>**Por defecto:** `DATADOG_API_KEY`</sub>                                                                                                            |
| `app_key`                 | Nombre de la variable de entorno que contiene tu clave de aplicación Datadog. Esta clave se [crea en tu organización Datadog][2] y debe almacenarse como secreto. <br><sub>**Por defecto:** `DATADOG_APP_KEY`</sub>                                                                                                    |
| `background`              | Si este paso debe ejecutarse o no en segundo plano. [Consulta la documentación oficial de CircleCI][18]. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                              |
| `batch_timeout`           | Especifica la duración del tiempo de espera en milisegundos para el lote CI. Cuando se agota el tiempo de espera de un lote, el trabajo de CI falla y no se activan nuevas ejecuciones de tests, pero las ejecuciones de tests en curso se completan normalmente. <br><sub>**Por defecto:** `1800000` (30 minutos)</sub>                                                                          |
| `config_path`             | La ruta al [archivo de configuración global][12] que configura datadog-ci. <br><sub>**Por defecto:** `datadog-ci.json`</sub>                                                                                                                                                                                          |
| `datadog_site`            | Tu sitio Datadog. Los valores posibles se indican [en esta tabla][10]. <br><sub>**Por defecto:** `datadoghq.com`</sub> <br><br> Configúralo en {{< region-param key="dd_site" code="true" >}} (asegúrate de seleccionar el SITIO correcto a la derecha).                                                    |
| `fail_on_critical_errors` | Falla el trabajo de CI, si se produce un error crítico que suele ser transitorio, como límites de frecuencia, fallos de autenticación o problemas en la infraestructura Datadog. <br><sub>**Por defecto:** `false`</sub>                                                                                                                        |
| `fail_on_missing_tests`   | Falla el trabajo CI, si la lista de tests a ejecutar está vacío o si faltan algunos tests explícitamente mencionados. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                           |
| `fail_on_timeout`         | Falla el trabajo de CI, si el lote de CI falla por un tiempo de espera excedido. <br><sub>**Por defecto:** `true`</sub>                                                                                                                                                                                                                             |
| `files`                   | Patrones glob para detectar [archivos de configuración de tests][4] Synthetic, separados por nuevas líneas. <br><sub>**Por defecto:** `{,!(node_modules)/**/}*.synthetics.json`</sub>                                                                                                                                                         |
| `junit_report`            | Nombre de archivo de un informe JUnit, si quieres generar uno. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                                                                                                          |
| `locations`               | Sobrescribe la lista de ubicaciones desde las que ejecutar tests, separadas por nuevas líneas o comas. Los valores posibles se indican [en esta respuesta de API][3]. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                                  |
| `no_output_timeout`       | Tiempo transcurrido que el comando puede ejecutarse sin resultado. La cadena es un decimal con sufijo de unidad, como `20m`, `1.25h`, `5s`. [Consulta la documentación oficial de CircleCI][13]. <br><sub>**Por defecto:** `35m`</sub>                                                                                                              |
| `public_ids`              | ID públicos de los tests Synthetic que deben ejecutarse, separados por nuevas líneas o comas. Si no se proporciona ningún valor, los tests se detectan en [archivos de configuración de tests][4] Synthetic. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                 |
| `selective_rerun`         | Si solo se vuelven a ejecutar los tests fallidos. Si un test ya se ha aprobado para una confirmación dada, no se vuelve a ejecutar en los siguientes lotes de CI. Por defecto, se utiliza la [configuración por defecto de tu organización][17]. Configúralo en `false` para forzar ejecuciones completas cuando tu configuración lo habilite por defecto. <br><sub>**Por defecto:** ninguno</sub> |
| `subdomain`               | Subdominio personalizado para acceder a tu organización Datadog. Si tu URL es `myorg.datadoghq.com`, el subdominio personalizado es `myorg`. <br><sub>**Por defecto:** `app`</sub>                                                                                                                                                 |
| `test_search_query`       | Utiliza una [consulta de búsqueda][14] para seleccionar los tests Synthetic que se van a ejecutar. Utiliza la [barra de búsqueda de la página con la lista de tests Synthetic][15] para crear tu consulta y, a continuación, cópiala y pégala. <br><sub>**Por defecto:** ninguno</sub>                                                                                                                |
| `tunnel`                  | Utiliza el [túnel de Continuous Testing][7] para iniciar tests en entornos internos. <br><sub>**Por defecto:** `false`</sub>                                                                                                                                                                                          |
| `variables`               | Sobrescribe las [variables][16] existentes o inyecta nuevas variables locales y globales en tests Synthetic como pares clave-valor, separados por nuevas líneas o comas. Por ejemplo: `START_URL=https://example.org,MY_VARIABLE=My title`. <br><sub>**Por defecto:** ninguno</sub>                                                                      |

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Empezando con Continuous Testing][11]
- [Continuous Testing y Configuración CI/CD][6]
- [Prácticas recomendadas para tests continuos con Datadog][9]

[1]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests-command
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://app.datadoghq.com/api/v1/synthetics/locations?only_public=true
[4]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[6]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration
[7]: https://docs.datadoghq.com/es/continuous_testing/environments/proxy_firewall_vpn#what-is-the-testing-tunnel
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[9]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[10]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[11]: https://docs.datadoghq.com/es/getting_started/continuous_testing/
[12]: https://docs.datadoghq.com/es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file
[13]: https://circleci.com/docs/configuration-reference/#run
[14]: https://docs.datadoghq.com/es/synthetics/explore/#search
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://docs.datadoghq.com/es/synthetics/platform/settings/?tab=specifyvalue#global-variables
[17]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[18]: https://circleci.com/docs/configuration-reference/#background-commands