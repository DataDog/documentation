---
algolia:
  tags:
  - análisis estático
  - pipeline ci
  - SAST
description: Obtén más información sobre Datadog Static Analysis para analizar tu
  código en busca de problemas de calidad y vulnerabilidades de seguridad antes de
  que llegue a producción.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines CI con Datadog
is_beta: false
title: Proveedores genéricos de CI
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

Si no utilizas CircleCI Orbs o GitHub Actions, puedes ejecutar la CLI Datadog directamente en la plataforma de tu pipeline CI.

Requisitos previos:

- descomprimir
- Node.js 14 o posterior

Configura las siguientes variables de entorno:

| Nombre | Descripción | Obligatorio | Por defecto |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` Tu clave de API Datadog. Esta clave la crea tu [organización Datadog][1] y debe guardarse como secreto.| Sí |
| `DD_APP_KEY` | Tu clave de aplicación Datadog. Esta clave, creada por tu [organización Datadog][2], debe incluir el contexto `code_analysis_read` y debe almacenarse como secreto. | Sí |
| `DD_SITE` | El [sitio Datadog][3] al que enviar la información. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}. | No | `datadoghq.com` |

Proporciona las siguientes entradas:

| Nombre | Descripción | Obligatorio | Por defecto |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | El nombre del servicio con el que etiquetar los resultados. | Sí
| `env` | El entorno con el que etiquetar los resultados. `ci` es un valor útil para esta entrada. | No | `none` |
| `cpu_count` | Define el número de CPU utilizadas por el analizador. Por defecto es el número de CPU disponibles. | No | |
| `subdirectory` | La ruta del subdirectorio al que debe limitarse el análisis. La ruta es relativa al directorio raíz del repositorio. | No | |

Para obtener estadísticas del tiempo de ejecución de los archivos analizados, añade una marca `--performance-statistics` a tu comando de análisis estático.

Selecciona un analizador para tu arquitectura y sistema operativo entre las siguientes opciones:

| Arquitectura | Sistema Operativo | Nombre | Enlace
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64` | `Darwin` | `datadog-static-analyzer-aarch64-apple-darwin.zip` [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip) |
| `aarch64` | `Linux` | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64` | `Darwin` | `datadog-static-analyzer-x86_64-apple-darwin.zip` | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip) |
| `x86_64` | `Linux` | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip` | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip) |
| `x86_64` | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip` | [Descargar](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip) |

Añade lo siguiente a tu pipeline CI:

```bash
# Definir el sitio Datadog al que enviar la información
export DD_SITE="datadoghq.com"

# Instalar dependencias
npm install -g @datadog/datadog-ci

# Descargar el analizador estático Datadog más reciente:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Ejecutar Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Cargar resultados
datadog-ci sarif upload /tmp/report.sarif
```

<div class="alert alert-info">
  Este ejemplo utiliza la versión para Linux x86_64 del analizador estático de Datadog. Si utilizas un sistema operativo o arquitectura diferente, debes seleccionarlo en la tabla anterior y actualizar el valor <code>DATADOG_STATIC_ANALYZER_URL</code> que aparece a continuación. Puedes ver todas las versiones en la página de <a href="https://github.com/Datadog/Datadog-static-analyzer/releases">versiones de GitHub</a>.
</div>

## Análisis diferencial

El análisis diferencial es una función que permite a Datadog Static Analysis analizar sólo los archivos modificados por un commit en una rama. Acelera el tiempo de análisis significativamente al no tener que ejecutar el análisis en cada archivo del repositorio en cada análisis. El primer análisis realizado, así como los análisis de rama por defecto, siempre producen un análisis del repositorio completo (no diferencial).

Si utilizas GitHub Actions, el análisis diferencial está activado por defecto.

Para otros proveedores de CI, sigue estos pasos para activar el análisis diferencial:

1. Asegúrate de que las variables `DD_APP_KEY`, `DD_SITE` y `DD_API_KEY` están configuradas en tu pipeline CI.
2. Añade una llamada a `datadog-ci git-metadata upload` antes de invocar el analizador estático. Este comando asegura que los metadatos Git están disponibles para el backend Datadog. Los metadatos Git son necesarios para calcular el número de archivos a analizar.
3. Asegúrate de que el analizador estático Datadog se invoca con la marca `--diff-aware`.

Ejemplo de secuencia de comandos (estos comandos deben invocarse en tu repositorio Git):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Nota:** Cuando no es posible realizar un análisis diferencial, se analiza todo el directorio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/account_management/api-app-keys/#api-keys
[2]: /es/account_management/api-app-keys/#application-keys
[3]: /es/getting_started/site/