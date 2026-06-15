---
aliases:
- /es/continuous_integration/static_analysis/circleci_orbs
- /es/static_analysis/circleci_orbs
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md
description: Utiliza Datadog y CircleCI para ejecutar trabajos de análisis estático
  en un pipeline de CI.
title: Análisis estático y CircleCI Orbs
---
[![CircleCI Build Status](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/datadog/datadog-static-analyzer-circleci-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

## Información general

Ejecuta una tarea de [análisis estático de Datadog][1] en tus flujos de trabajo de CircleCI.

## Configuración

Para utilizar el análisis estático de Datadog, debes añadir un archivo `static-analysis.datadog.yml` en el directorio raíz de tu repositorio para especificar qué conjuntos de reglas utilizar.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Ejemplo para Python

Puedes ver un ejemplo para los repositorios basados en Python:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## Flujo de trabajo

Crea un archivo en `.circleci` para ejecutar un trabajo de análisis estático de Datadog.

A continuación se muestra un ejemplo de archivo de flujo de trabajo.

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: "my-service"
          env: "ci"
          site: {{< region-param key="dd_site" code="true" >}}
          cpu_count: 2
          enable_performance_statistics: false
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### Variables de entorno

Configura las siguientes variables de entorno en la [página de configuración del proyecto de CircleCI][2].

| Nombre         | Descripción                                                                                                                | Obligatorio |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Tu clave de la API de Datadog. Esta clave la crea tu [organización de Datadog][3] y debe guardarse como secreto.              | Sí     |
| `DD_APP_KEY` | Tu clave de la aplicación de Datadog. Esta clave la crea tu [organización de Datadog][4] y debe guardarse como secreto.      | Sí     |

## Entradas

Para personalizar tu flujo de trabajo, puedes configurar los siguientes parámetros para el análisis estático.

| Nombre         | Descripción                                                                                                                | Obligatorio | Predeterminado         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | El servicio con el que deseas que se etiqueten los resultados.                                                                                | Sí     |                 |
| `env`     | El entorno con el que deseas que se etiqueten los resultados. Datadog recomienda utilizar `ci` como valor para esta entrada.                 | No    | `none`          |
| `site`    | El [sitio de Datadog][4] al que enviar la información.                                                                                 | No    | `datadoghq.com` | 
| `cpu_count`  | Configura el número de CPU utilizadas por el analizador.                                                                            | No      | `2`             |
| `enable_performance_statistics` | Obtén las estadísticas del tiempo de ejecución de los archivos analizados.                                                   | No      | `false`         |

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Más información sobre el análisis de código][1]

[1]: https://docs.datadoghq.com/es/code_analysis/static_analysis
[2]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/#application-keys