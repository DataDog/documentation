---
algolia:
  tags:
  - software composition analysis
  - datadog software composition analysis
  - vulnerabilidades de la biblioteca
  - SCA
description: Obtén información sobre Datadog Software Composition Analysis para escanear
  tus bibliotecas de código abierto importadas en busca de vulnerabilidades de seguridad
  conocidas antes de enviarlas a producción.
further_reading:
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con Software Composition
    Analysis
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: Blog
  text: Priorizar la corrección de vulnerabilidades con Datadog SCA
- link: /getting_started/application_security/software_composition_analysis
  tag: Documentación
  text: Empezando con Software Composition Analysis
- link: /security/application_security/software_composition_analysis/
  tag: Documentación
  text: Más información sobre Software Composition Analysis
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente
is_beta: false
title: Análisis de la composición del software (SCA)
---

{{< callout url="#" btn_hidden="true" header="¡Obtén la versión preliminar!" >}}
Software Composition Analysis se encuentra en versión preliminar.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no se encuentra disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general

Software Composition Analysis (SCA) escanea bibliotecas de código abierto importadas a repositorios a través de administradores de paquetes como `npm` en busca de [vulnerabilidades conocidas][1], y crea un catálogo de bibliotecas usadas en tus repositorios que identifica licencias riesgosas, bibliotecas al final de su vida útil y vulnerabilidades para garantizar una base de código segura y de alta calidad.

Los escaneos de SCA se pueden ejecutar directamente a través de Datadog o en tus pipelines de CI mediante [Code Analysis][3] para detectar vulnerabilidades de bibliotecas antes de que lleguen a producción. Datadog también ofrece detección en tiempo de ejecución a través de [Datadog Application Security][1].

## Configurar Software Composition Analysis

SCA admite el escaneo de bibliotecas en los siguientes lenguajes y tecnologías:

{{< partial name="code_analysis/sca-getting-started.html" >}}

Para comenzar, configura Software Composition Analysis en la [página de **Code Analysis**][2] o consulta la [documentación de configuración][3].

### Archivos de bloqueo

SCA escanea las bibliotecas en tus archivos de bloqueo. Se admiten los siguientes archivos de bloqueo:

| Administrador de paquetes | Archivo de bloqueo                                 |
|-----------------|------------------------------------------|
| C# (.NET)       | `packages.lock.json`                     |
| Go (mod)        | `go.mod`                                 |
| JVM (Gradle)    | `gradle.lockfile`                        |
| JVM (Maven)     | `pom.xml`                                |
| Node.js (npm)   | `package-lock.json`                      |
| Node.js (pnpm)  | `pnpm-lock.yaml`                         |
| Node.js (yarn)  | `yarn.lock`                              |
| PHP (composer)  | `composer.lock`                          |
| Python (pip)    | `requirements.txt`, `Pipfile.lock`       |
| Python (poetry) | `poetry.lock`                            |
| Ruby (bundler)  | `Gemfile.lock`                           |

## Integrar Software Composition Analysis en el ciclo de vida del desarrollo de software

### Proveedores de CI
{{< whatsnext desc="Puedes ejecutar SCA en cualquier proveedor de plataforma de CI que elijas. Consulta la documentación específica del proveedor para configurar SCA en tus pipelines de CI:">}}
    {{< nextlink href="code_analysis/software_composition_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/software_composition_analysis/generic_ci_providers" >}}Proveedores de CI genéricos{{< /nextlink >}}
{{< /whatsnext >}}

## Buscar y filtrar resultados

<div class="alert alert-info">Datadog Software Composition Analysis puede encontrar bibliotecas vulnerables a lo largo del ciclo de vida del desarrollo de software (SDLC). Code Analysis resume los resultados encontrados al escanear de manera directa tus repositorios. Para ver todas las vulnerabilidades encontradas en los repositorios y en el tiempo de ejecución consolidadas, consulta <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> a fin de obtener más detalles.</div>

Después de configurar tus pipelines de CI para ejecutar Datadog SCA, las infracciones se resumen por repositorio en la [página de **Code Analysis Repositories**][4] (Repositorios de Code Analysis). Haz clic en un repositorio para analizar los resultados de **Library Vulnerabilities** (Vulnerabilidades de la biblioteca) y **Library Catalog** (Catálogo de bibliotecas) de Software Composition Analysis. 

* La pestaña **Library Vulnerabilities** (Vulnerabilidades de la biblioteca) contiene las versiones de biblioteca vulnerables que ha encontrado Datadog SCA.
* La pestaña **Library Catalog** (Catálogo de bibliotecas) contiene todas las bibliotecas (vulnerables o no) que ha encontrado Datadog SCA.

Para filtrar los resultados, usa las facetas que se encuentran a la izquierda de la lista o la barra de búsqueda en la parte superior. Los resultados se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo se vinculan los resultados a los servicios y equipos de Datadog, consulta [Empezando con Code Analysis][5].

Cada fila representa una combinación única de biblioteca y versión. Cada combinación está asociada con la confirmación y la rama específicas que se seleccionan en los filtros en la parte superior de la página (de manera predeterminada, la última confirmación en la rama predeterminada del repositorio que seleccionaste).

Haz clic en una biblioteca con una vulnerabilidad para abrir un panel lateral que contiene información sobre el contexto de la infracción y dónde se originó.

{{< img src="code_analysis/software_composition_analysis/sca-violation.png" alt="Panel lateral de una infracción de SCA" style="width:80%;">}}

El contenido de la infracción se muestra en pestañas:

- **Full Description** (Descripción completa): una descripción de la vulnerabilidad de esta versión específica de la biblioteca.
- **Event** (Evento): metadatos JSON sobre el evento de infracción de SCA.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/security/application_security/software_composition_analysis/
[2]: https://app.datadoghq.com/ci/setup/code-analysis
[3]: /es/code_analysis/software_composition_analysis/setup
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /es/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries