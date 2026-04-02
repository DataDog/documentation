---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Utiliza Datadog y GitHub para ejecutar trabajos de análisis de la composición
  del software en un pipeline de CI.
title: Análisis de la composición del software y acciones de GitHub
---
Ejecuta un trabajo de [Análisis de la composición del software][1] de Detadog en tus flujos de trabajo de acciones de GitHub. Esta acción invoca
[Datadog osv-scanner][3] en tu código base y carga los resultados en Datadog.

## Generación de inventarios de librería

La acción de GitHub genera un inventario de librerías en forma automática basándose en las bibliotecas que se declaran en tu repositorio.

La acción de GitHub funciona para los siguientes lenguajes y archivos:

 - JavaScript/TypeScript: `package-lock.json` y `yarn.lock`
 - Python: `requirements.txt` (con versión definida) y `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... y más lenguajes (enumerados en la [documentación](https://docs.datadoghq.com/code_analysis/software_composition_analysis/))

## Configuración

### Configurar claves

Añade `DD_APP_KEY` y `DD_API_KEY` como secretos en tu [Configuración de acciones de GitHub][2]. Asegúrate de que tu clave de aplicación Datadog tenga el contexto `code_analysis_read`. Para más información, consulta [Claves de API y de aplicación][7].

### Flujo de trabajo

Añade el siguiente fragmento de código en `.github/workflows/datadog-sca.yml`. Asegúrate de sustituir
el atributo `dd_site` con el [sitio Datadog][4] que estés utilizando.

```yaml
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
```

## Herramientas relacionadas de Datadog

Con el [análisis estático de Datadog][5] se analiza tu código y se proporciona información en tu IDE, GitHub PR o en el entorno de Datadog. El análisis estático de Datadog puede configurarse mediante la acción [`datadog-static-analyzer-github-action`][6]
de GitHub.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Más información sobre el análisis de la composición del software][1].

[1]: https://docs.datadoghq.com/es/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[3]: https://github.com/DataDog/osv-scanner
[4]: https://docs.datadoghq.com/es/getting_started/site/
[5]: https://docs.datadoghq.com/es/code_analysis/static_analysis
[6]: https://github.com/DataDog/datadog-static-analyzer-github-action
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
