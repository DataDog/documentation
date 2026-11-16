---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Utilice Datadog Static Secret Scanning para analizar el código pre-prod
  en busca de problemas de calidad y vulnerabilidades de seguridad.
is_beta: true
title: Secret Scanning con proveedores de CI genéricos
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Secret Scanning no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}


Si no utiliza [GitHub Actions][5] para configurar Secret Scanning, puede ejecutar la CLI de [Datadog CI][4] directamente en su plataforma de canalización de CI y cargar informes en formato de intercambio de resultados de análisis estático (SARIF) a Datadog.

<div class="alert alert-info"><a href="/security/code_security/secret_scanning/#detect-secrets-in-git-history">El escaneo del historial de Git</a> solo está disponible con el escaneo alojado. Los escaneos basados en CI analizan el commit extraído.</div>

Requisitos previos:

- unzip
- Node.js 14 o posterior

Configure las siguientes variables de entorno:

| Nombre         | Descripción                                                                                                                | Requerido | Predeterminado         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Su clave de Datadog API. Esta clave es creada por su [Datadog organization][1] y debe almacenarse como un secreto.            | Sí      |                 |
| `DD_APP_KEY` | Su clave de aplicación de Datadog. Esta clave es creada por su [Datadog organization][2], debe incluir el contexto `code_analysis_read` y almacenarse como un secreto.  | Sí      |                 |
| `DD_SITE`    | El [Datadog site][3] al que se enviará la información. Su sitio de Datadog es {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |


Seleccione un analizador para su arquitectura y sistema operativo de las siguientes opciones:

| Arquitectura | SO        | Nombre                                                    | Enlace                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

Agregue lo siguiente a su canalización de CI:

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"
export DD_API_KEY=<YOUR-API-KEY>
export DD_APP_KEY=<YOUR-APP-KEY>

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Code Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif --enable-secrets true --enable-static-analysis false

# Upload results
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  Este ejemplo utiliza la versión de Linux x86_64 del analizador estático de Datadog para Secret Scanning. Si utiliza un sistema operativo o una arquitectura diferente, debe seleccionarlo en la tabla anterior y actualizar el <code>DATADOG_STATIC_ANALYZER_URL</code> Valor. Puede visualizar todas las versiones en la página de <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a>.
</div>


[1]: /es/account_management/api-app-keys/#api-keys
[2]: /es/account_management/api-app-keys/#application-keys
[3]: /es/getting_started/site/
[4]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[5]: /es/security/code_security/secret_scanning/github_actions/