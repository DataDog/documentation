---
description: Utilice Datadog y GitHub para detectar secretos expuestos en el código
  en un pipeline de CI.
is_beta: true
title: Secret Scanning y GitHub Actions
---
Ejecute un trabajo de [Datadog Secret Scanning][1] en sus flujos de trabajo de GitHub Actions. Esta acción envuelve el [Datadog Static Analyzer][8] (que escanea en busca de secretos), lo invoca contra su base de código y carga los resultados en Datadog.

## Flujo de trabajo {#workflow}

Cree un archivo en `.github/workflows` para ejecutar un trabajo de Datadog Secret Scanning.

El siguiente es un archivo de flujo de trabajo de muestra.

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
          static_analysis_enabled: false
          secrets_enabled: true
```

Usted **debe** establecer sus claves de Datadog API y de aplicación de Datadog como [secretos en su repositorio de GitHub][4], ya sea a nivel de organización o de repositorio. Asegúrese de agregar el contexto `code_analysis_read` a su clave de aplicación de Datadog. Para obtener más información, consulte [API and Application Keys][2].

Asegúrese de reemplazar `dd_site` con el sitio de Datadog que está utilizando.

## Entradas {#inputs}

Puede establecer los siguientes parámetros.

| Nombre         | Descripción                                                                                                                                             | Requerido | Predeterminado         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Su clave de Datadog API. Esta clave es creada por su [organización de Datadog][2] y debe almacenarse como un [secreto][2].                                      | Sí     |                 |
| `dd_app_key` | Su clave de aplicación de Datadog. Esta clave es creada por su [organización de Datadog][2] y debe almacenarse como un [secreto][4].                              | Sí     |                 |
| `dd_site`    | El [sitio de Datadog][3] al que se enviará la información.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | Establezca el número de CPU que utilizará el analizador.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | Obtenga las estadísticas de tiempo de ejecución de los archivos analizados.                                                                                                   | No      | `false`         |
| `debug`      | Permite que el analizador imprima registros adicionales útiles para la depuración. Para habilitarlo, establézcalo en `yes`.                                                                  | No      | `no`            |



<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /es/security/code_security/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[6]: /es/security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer