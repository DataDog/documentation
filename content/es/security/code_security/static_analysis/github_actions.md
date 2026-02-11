---
aliases:
- /es/continuous_integration/static_analysis/github_actions
- /es/static_analysis/github_actions
description: Utiliza Datadog y GitHub para ejecutar trabajos de Static Code Analysis
  en un pipeline de CI.
title: Static Code Analysis y acciones de GitHub
---
## Información general

Ejecuta un job de [Datadog Static Code Analysis][1] en tus procesos de acción de GitHub. Esta acción envuelve el [Datadog Static Analyzer][8],
lo invoca contra tu código base y sube los resultados a Datadog.

## Flujo de trabajo

Crea un archivo en `.github/workflows` para ejecutar un job de Datadog Static Code Analysis.

A continuación, se muestra un ejemplo de archivo de proceso.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v3
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
```

**Debes** establecer tus claves de API y de aplicación de Datadog como [secretos en tu repositorio de GitHub][4], ya sea a nivel de organización o de repositorio. Asegúrate de añadir el contexto `code_analysis_read` a tu clave de aplicación de Datadog. Para más información, consulta [Claves de API y de aplicación][2].

Asegúrate de sustituir `dd_site` por el sitio de Datadog que estés utilizando[3].

## Entradas

Puedes configurar los siguientes parámetros para Static Code Analysis.

| Nombre         | Descripción                                                                                                                                             | Obligatorio | Valor predeterminado         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Tu clave de API de Datadog. Esta clave la crea tu [organización de Datadog][2] y debe guardarse como [secreto][2].                                      | Sí     |                 |
| `dd_app_key` | Tu clave de aplicación de Datadog. Esta clave la crea tu [organización de Datadog][2] y debe guardarse como [secreto][4].                              | Sí     |                 |
| `dd_site`    | El [sitio de Datadog][3] al que enviar la información.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | Establece el número de CPUs utilizadas por el analizador.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | Obtener las estadísticas de tiempo de ejecución de los archivos analizados.                                                                                                   | No      | `false`         |
| `debug`      | Permite al analizador imprimir logs adicionales útiles para la depuración. Para activarlo, establece `yes`.                                                                  | No      | `no`            |
| `subdirectory` | Un patrón de subdirectorio o glob (o patrones de subdirectorio delimitados por espacios) al que debe limitarse el análisis. Por ejemplo: "src" o "paquetes src". | `false` |                 |
| `diff_aware` | Activa el [modo de escaneo diferenciado][5].                                                                                                                   | No      | `true`          |

### Notas

1. El análisis diferenciado sólo analiza los archivos modificados por una confirmación cuando se analizan ramas de características. Esta opción está activada por defecto. Para desactivar el análisis diferenciado, establece el parámetro de la acción de GitHub `diff_aware` en `false`.

## Personalización de las reglas

Por defecto, [Datadog Static Analyzer][8] detecta los lenguajes de tu código y utiliza las reglas por defecto para analizar
tu código base.

Para especificar y personalizar los conjuntos de reglas, añade un archivo `static-analysis.datadog.yml` al directorio raíz de tu repositorio para definir qué conjuntos de reglas utilizar.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

Consulta la [documentación de Datadog][6] para obtener una lista completa de los conjuntos de reglas.

### Ejemplo de Python

He aquí un ejemplo para los repositorios basados en Python:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```


## Otras acciones útiles de GitHub

Datadog Software Composition Analysis (SCA) también ofrece la posibilidad de escanear tus dependencias
y detectar vulnerabilidades y licencias. Puedes utilizar este producto con la [`datadog-sca-github-action`][7].


<!-- ## Referencias adicionales

Documentación, enlaces y artículos útiles adicionales:

- [Obtén información sobre Code Security][1] -->

[1]: /es/security/code_security/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: /es/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer