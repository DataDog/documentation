---
description: Utiliza Datadog y GitHub para detectar secretos expuestos en el código
  en un pipeline de CI.
is_beta: true
title: Secret Scanning y acciones en GitHub
---

Ejecuta un trabajo de [Datadog Secret Scanning][1] en tus flujos de trabajo de acción de GitHub. Esta acción envuelve el [Datadog Static Analyzer][8] (que escanea los secretos), lo invoca contra tu código base, y sube los resultados a Datadog.

## Flujo de trabajo

Crea un archivo en `.github/workflows` para ejecutar un trabajo de Datadog Secret Scanning.

A continuación, se muestra un ejemplo de archivo de flujo de trabajo.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
          static_analysis_enabled: false
          secrets_enabled: true
```

**Debes** establecer tus claves de API y de aplicación de Datadog como [secretos en tu repositorio de GitHub][4], ya sea a nivel de organización o de repositorio. Asegúrate de añadir el contexto `code_analysis_read` a tu clave de aplicación de Datadog. Para más información, consulta [claves de API y de aplicación][2].

Asegúrate de sustituir `dd_site` por el sitio de Datadog que estés utilizando.

## Entradas

Puedes configurar los siguientes parámetros.

| Nombre         | Descripción                                                                                                                                             | Obligatorio | Valor predeterminado         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Tu clave de API de Datadog. Esta clave la crea tu [organización de Datadog][2] y debe guardarse como [secreto][2].                                      | Sí     |                 |
| `dd_app_key` | Tu clave de aplicación de Datadog. Esta clave la crea tu [organización de Datadog][2] y debe guardarse como [secreto][4].                              | Sí     |                 |
| `dd_site`    | El [sitio de Datadog][3] al que enviar la información.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | Establece el número de CPUs utilizadas por el analizador.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | Obtén las estadísticas de tiempo de ejecución de los archivos analizados.                                                                                                   | No      | `false`         |
| `debug`      | Permite al analizador imprimir logs adicionales útiles para la depuración. Para activarlo, establece `yes`.                                                                  | No      | `no`            |
| `architecture` | La arquitectura de CPU a utilizar para el analizador. Los valores admitidos son `x86_64` y `aarch64`.                                                              | No      | `x86_64`        |



<!-- ## Referencias adicionales

Documentación, enlaces y artículos útiles adicionales:

- [Más información sobre Code Security][1] -->

[1]: /es/security/code_security/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: /es/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer