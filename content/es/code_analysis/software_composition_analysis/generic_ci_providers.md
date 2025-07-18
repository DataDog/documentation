---
algolia:
  tags:
  - software composition analysis
  - pipeline ci
  - SCA
description: Aprende a ejecutar la CLI de Datadog directamente en tu pipeline CI para
  configurar variables de entorno, instalar dependencias y analizar código en busca
  de problemas de calidad y seguridad, antes de que lleguen a producción.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines CI con Datadog
is_beta: false
title: Proveedores de CI genéricos
---

{{< callout url="#" btn_hidden="true" header="Únete a la vista previa!" >}}
Code Analysis está en vista previa.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general

Si no utilizas GitHub Actions, puedes ejecutar la CLI de Datadog directamente en tu plataforma de pipelines CI.

Requisitos previos:

- descomprimir
- Node.js v14 o posterior

Configura las siguientes variables de entorno:

| Nombre         | Descripción                                                                                                                | Obligatorio | Predeterminado         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Tu clave de API Datadog. Esta clave la crea tu [organización Datadog][1] y debe almacenarse como secreto.            | Sí      |                 |
| `DD_APP_KEY` | Tu clave de aplicación Datadog. Esta clave, creada por tu [organización Datadog][2], debe incluir el contexto `code_analysis_read` y almacenarse como secreto.    | Sí      |                 |
| `DD_SITE`    | El [sitio Datadog][3] al que enviar la información. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

Proporciona las siguientes entradas:

| Nombre           | Descripción                                                                                                                | Obligatorio | Predeterminado         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | El nombre del servicio utilizado para etiquetar los resultados.                                                                           | Sí      |                 |
| `env`          | El entorno utilizado para etiquetar los resultados. `ci` es un valor útil para esta entrada.                                           | No       | `none`          |
| `subdirectory` | La ruta del subdirectorio al que debe limitarse el análisis. La ruta es relativa al directorio raíz del repositorio.                  | No       |                 |

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog OSV Scanner:
# https://github.com/DataDog/osv-scanner/releases
DATADOG_OSV_SCANNER_URL=https://github.com/DataDog/osv-scanner/releases/latest/download/osv-scanner_linux_amd64.zip

# Install OSV Scanner
mkdir /osv-scanner
curl -L -o /osv-scanner/osv-scanner.zip $DATADOG_OSV_SCANNER_URL
unzip /osv-scanner/osv-scanner.zip -d /osv-scanner
chmod 755 /osv-scanner/osv-scanner

# Run OSV Scanner and scan your dependencies
/osv-scanner/osv-scanner --skip-git -r --experimental-only-packages --format=cyclonedx-1-5 --paths-relative-to-scan-dir  --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/#api-keys
[2]: /es/account_management/api-app-keys/#application-keys
[3]: /es/getting_started/site/