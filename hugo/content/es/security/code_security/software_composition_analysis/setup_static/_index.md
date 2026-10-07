---
aliases:
- /es/code_analysis/software_composition_analysis/generic_ci_providers/
- /es/code_analysis/software_composition_analysis/github_actions/
- /es/code_analysis/software_composition_analysis/setup/
description: Obtenga información sobre Datadog Software Composition Analysis para
  analizar sus bibliotecas de código abierto importadas en busca de vulnerabilidades
  de seguridad conocidas antes de realizar el despliegue a producción.
disable_toc: false
title: Configure SCA en sus repositorios
---
## Descripción general {#overview}

Datadog Software Composition Analysis (SCA) analiza sus repositorios en busca de bibliotecas de código abierto y detecta vulnerabilidades de seguridad conocidas antes de realizar el despliegue a producción.

Para comenzar:
1. Abra [Code Security settings][2].
2. En {{< ui >}}Activate scanning for your repositories{{< /ui >}}, haga clic en {{< ui >}}Manage Repositories{{< /ui >}}.
3. Elija [dónde ejecutar los análisis de SCA](#select-where-to-run-static-sca-scans) (alojado en Datadog o pipelines de CI).
4. Siga las instrucciones de configuración para su proveedor de código fuente.

## Lenguajes y manifiestos de dependencias compatibles {#supported-languages-and-dependency-manifests}
Datadog SCA analiza bibliotecas en los siguientes lenguajes utilizando manifiestos de dependencias (como archivos de bloqueo y otros archivos de manifiesto compatibles) para identificar dependencias vulnerables.

| Lenguaje   | Gestor de paquetes    | Archivo                                |
|------------|-------------------|------------------------------------------|
| C#         | .NET              | `packages.lock.json`, `.csproj` archivos    |
| C++        | Conan             | `conan.lock`                             |
| Dart       | pub               | `pubspec.lock`                           |
| Go         | mod               | `go.mod`                                 |
| JVM        | Gradle            | `gradle.lockfile`                        |
| JVM        | Maven             | `pom.xml`                                |
| Node.js    | Bun               | `bun.lock`                               |
| Node.js    | npm               | `package-lock.json`                      |
| Node.js    | pnpm              | `pnpm-lock.yaml`                         |
| Node.js    | yarn              | `yarn.lock`                              |
| PHP        | composer          | `composer.lock`                          |
| Python     | PDM               | `pdm.lock`                               |
| Python     | pip               | `requirements.txt`, `Pipfile.lock`       |
| Python     | poetry            | `poetry.lock`                            |
| Python     | UV                | `uv.lock`                                |
| Ruby       | bundler           | `Gemfile.lock`                           |
| Rust       | Cargo             | `cargo.lock`                             |
| Swift      | SwiftPM           | `Package.swift`, `Package.resolved`      |

**Nota:** Si ambos archivos, un `packages.lock.json` y un `.csproj`, están presentes, el `packages.lock.json` tiene prioridad y proporciona una resolución de versión más precisa.

## Escaneo sin archivo de bloqueo {#lockfile-less-scanning}

Datadog SCA analiza los archivos de manifiesto **solo cuando no se detecta ningún archivo de bloqueo compatible**. Cuando hay un archivo de bloqueo presente, este tiene prioridad y el manifiesto no se analiza.

| Lenguaje   | Gestor de paquetes        | Archivo             |
|----------|------------------------|------------------|
| Node.js  | npm, yarn, pnpm, Bun   | `package.json`   |
| Python   | Poetry, PDM, UV, pip   | `pyproject.toml` |

**Secciones admitidas:**
- `package.json`: `dependencies`, `devDependencies` y `optionalDependencies`
- `pyproject.toml`: PEP 621 `dependencies` y `optional-dependencies`, PEP 735 `dependency-groups`, y secciones de dependencias de Poetry

<div class="alert alert-info">
Debido a que los manifiestos pueden declarar rangos de versiones (como <code>^2.3.4</code> o <code>&gt;=1.0,&lt;2</code>) en lugar de versiones fijas, Datadog resuelve cada rango seleccionando la versión publicada más reciente que satisfaga el rango. Las versiones de pre-lanzamiento están excluidas.
</div>

## Seleccione dónde ejecutar los escaneos de SCA estáticos {#select-where-to-run-static-sca-scans}
De forma predeterminada, los escaneos se ejecutan cuando usted confirma cambios que actualizan manifiestos de dependencias o archivos de bloqueo compatibles en un repositorio habilitado. También puede ejecutar SCA en sus pipelines de CI; los trabajos de CI son compatibles para eventos de `push`.

### Analizar con escaneo alojado por Datadog {#scan-with-datadog-hosted-scanning}

Puede ejecutar escaneos de Datadog Static SCA directamente en la infraestructura de Datadog. Los tipos de repositorio admitidos incluyen:
- [GitHub](/security/code_security/software_composition_analysis/setup_static/?tab=github#select-your-source-code-management-provider) (excluyendo repositorios que utilizan [Git Large File Storage][21])
- [GitLab.com y GitLab Self-Managed](/security/code_security/software_composition_analysis/setup_static/?tab=gitlab#select-your-source-code-management-provider)
- [Azure DevOps](/security/code_security/software_composition_analysis/setup_static/?tab=azuredevops#select-your-source-code-management-provider)
- [Bitbucket Cloud](/security/code_security/software_composition_analysis/setup_static/?tab=bitbucketcloud#select-your-source-code-management-provider)

Para comenzar, navegue a la [{{< ui >}}Code Security{{< /ui >}} página][2].

<div class="alert alert-info">
El escaneo de SCA alojado en Datadog no es compatible con repositorios que contengan nombres de archivo de más de 255 caracteres. <br>
Para estos casos, realice el escaneo utilizando pipelines de CI.
</div>

### Analizar en pipelines de CI {#scan-in-ci-pipelines}

Datadog Software Composition Analysis se ejecuta en sus pipelines de CI utilizando la [`datadog-ci` CLI][8].

<div class="alert alert-info">
Debe escanear su rama predeterminada al menos una vez antes de que los resultados aparezcan en {{< ui >}}Code Security{{< /ui >}}.
</div>

{{< whatsnext desc="Consulte las instrucciones según su proveedor de CI:">}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/gitlab_ci" >}}GitLab CI/CD{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/azure_devops" >}}Azure DevOps{{< /nextlink >}}
    {{< nextlink href="security/code_security/software_composition_analysis/setup_static/generic_ci_providers" >}}Proveedores de CI genéricos{{< /nextlink >}}
{{< /whatsnext >}}

Si su proyecto de Java incluye archivos JAR de terceros directamente en el repositorio en lugar de utilizar un manifiesto de Maven o Gradle, consulte [Scan Java JAR directories][27].

## Seleccione su proveedor de gestión de código fuente {#select-your-source-code-management-provider}

Independientemente del modo de escaneo que utilice, conecte su proveedor de gestión de código fuente para habilitar funciones nativas como fragmentos de código en línea y comentarios en solicitudes de extracción. Datadog SCA admite todos los proveedores y ofrece soporte nativo para GitHub, GitLab, Azure DevOps y Bitbucket Cloud Premium.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure una aplicación de GitHub con el [mosaico de integración de GitHub][1] y configure la [integración del código fuente][2] para habilitar fragmentos de código en línea y [comentarios en solicitudes de extracción][3].

Al instalar una aplicación de GitHub, se requieren los siguientes permisos para habilitar ciertas funciones:

- `Content: Read`, que le permite ver fragmentos de código mostrados en Datadog
- `Pull Request: Read & Write`, lo que permite a Datadog añadir comentarios sobre infracciones directamente en sus solicitudes de extracción utilizando [comentarios de solicitud de extracción][3].
- `Checks: Read & Write`, que le permite crear comprobaciones en infracciones de SAST para bloquear solicitudes de extracción

[1]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /es/integrations/guide/source-code-integration
[3]: /es/security/code_security/dev_tool_int/github_pull_requests

{{% /tab %}}
{{% tab "GitLab" %}}

Consulte las [instrucciones de configuración del código fuente de GitLab][1] para conectar GitLab a Datadog. Se admiten tanto GitLab.com como las instancias autogestionadas.

[1]: /es/integrations/gitlab-source-code/#setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Nota:** Sus integraciones de Azure DevOps deben estar conectadas a un inquilino de Microsoft Entra. Azure DevOps Server **no** es compatible.

Consulte las [instrucciones de configuración del código fuente de Azure][4] para conectar los repositorios de Azure DevOps a Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/integrations/azure-devops-source-code/#setup
[5]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

Consulte las [instrucciones de configuración del código fuente de Bitbucket][1] para conectar los espacios de trabajo de Bitbucket Cloud a Datadog.

[1]: /es/integrations/bitbucket-source-code/#setup

{{% /tab %}}
{{% tab "Otro" %}}

Si utiliza otro proveedor de gestión de código fuente, configure SCA para que se ejecute en sus pipelines de CI utilizando la herramienta CLI `datadog-ci` y [cargue los resultados](#upload-third-party-sbom-to-datadog) a Datadog.

{{% /tab %}}
{{< /tabs >}}

## Vincule los hallazgos a los servicios y equipos de Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}

## Cargue el SBOM de terceros a Datadog {#upload-third-party-sbom-to-datadog}

Datadog recomienda utilizar el [Datadog SBOM Generator][10], pero también es posible ingerir un SBOM de terceros.

Puede cargar SBOM generados por otras herramientas si cumplen con estos requisitos:
- Esquema JSON de CycloneDX [1.4][18], [1.5][19] o [1.6][20] válido
- Todos los componentes tienen el tipo `library`
- Todos los componentes tienen un atributo `purl` válido

Los archivos SBOM de terceros se cargan a Datadog utilizando el comando [`datadog-ci`](https://github.com/DataDog/datadog-ci/?tab=readme-ov-file#how-to-install-the-cli).

Puede encontrar argumentos opcionales y otra información en `datadog-ci` [README][22].

Puede utilizar el siguiente comando para cargar su SBOM de terceros. Asegúrese de que las variables de entorno `DD_API_KEY`, `DD_APP_KEY` y `DD_SITE`
se establezcan en su clave de API, clave de APP y [sitio de Datadog][12], respectivamente.

```bash
datadog-ci sbom upload /path/to/third-party-sbom.json
```

<div class="alert alert-info">
Si ya tiene habilitado el escaneo automático para un repositorio, una carga manual reemplazará cualquier resultado existente para esa confirmación.
</div>


## Filtrar por vulnerabilidades alcanzables {#filter-by-reachable-vulnerabilities}

Datadog ofrece análisis de alcanzabilidad estática para ayudar a los equipos a evaluar si las rutas de código vulnerables en las dependencias se hacen referencia dentro del código de su aplicación. Esta capacidad admite una priorización más efectiva al identificar vulnerabilidades que son estáticamente inalcanzables y, por lo tanto, presentan un riesgo inmediato mínimo.

Esta funcionalidad solo es compatible cuando se utiliza el [Datadog SBOM Generator][1] con la marca `--reachability` habilitada o al ejecutar escaneos a través de la infraestructura de Datadog.

El análisis de alcanzabilidad está disponible exclusivamente para proyectos de Java y se aplica solo a un conjunto definido de avisos de seguridad verificados. Las vulnerabilidades que no están incluidas en este conjunto se excluyen de la evaluación de alcanzabilidad.

{{% collapse-content title="Avisos admitidos" level="h3" expanded=true id="supported-advisories" %}}
El análisis de alcanzabilidad estática está disponible para los siguientes avisos:
- [GHSA-h7v4-7xg3-hxcc](https://osv.dev/vulnerability/GHSA-h7v4-7xg3-hxcc)
- [GHSA-jfh8-c2jp-5v3q](https://osv.dev/vulnerability/GHSA-jfh8-c2jp-5v3q)
- [GHSA-7rjr-3q55-vv33](https://osv.dev/vulnerability/GHSA-7rjr-3q55-vv33)
- [GHSA-2p3x-qw9c-25hh](https://osv.dev/vulnerability/GHSA-2p3x-qw9c-25hh)
- [GHSA-cm59-pr5q-cw85](https://osv.dev/vulnerability/GHSA-cm59-pr5q-cw85)
- [GHSA-qrx8-8545-4wg2](https://osv.dev/vulnerability/GHSA-qrx8-8545-4wg2)
- [GHSA-p8pq-r894-fm8f](https://osv.dev/vulnerability/GHSA-p8pq-r894-fm8f)
- [GHSA-64xx-cq4q-mf44](https://osv.dev/vulnerability/GHSA-64xx-cq4q-mf44)
- [GHSA-g5w6-mrj7-75h2](https://osv.dev/vulnerability/GHSA-g5w6-mrj7-75h2)
- [GHSA-xw4p-crpj-vjx2](https://osv.dev/vulnerability/GHSA-xw4p-crpj-vjx2)
- [GHSA-cxfm-5m4g-x7xp](https://osv.dev/vulnerability/GHSA-cxfm-5m4g-x7xp)
- [GHSA-3ccq-5vw3-2p6x](https://osv.dev/vulnerability/GHSA-3ccq-5vw3-2p6x)
- [GHSA-mjmj-j48q-9wg2](https://osv.dev/vulnerability/GHSA-mjmj-j48q-9wg2)
- [GHSA-36p3-wjmg-h94x](https://osv.dev/vulnerability/GHSA-36p3-wjmg-h94x)
- [GHSA-ww97-9w65-2crx](https://osv.dev/vulnerability/GHSA-ww97-9w65-2crx)
- [GHSA-8jrj-525p-826v](https://osv.dev/vulnerability/GHSA-8jrj-525p-826v)
- [GHSA-4wrc-f8pq-fpqp](https://osv.dev/vulnerability/GHSA-4wrc-f8pq-fpqp)
- [GHSA-4cch-wxpw-8p28](https://osv.dev/vulnerability/GHSA-4cch-wxpw-8p28)
- [GHSA-6w62-hx7r-mw68](https://osv.dev/vulnerability/GHSA-6w62-hx7r-mw68)
- [GHSA-2q8x-2p7f-574v](https://osv.dev/vulnerability/GHSA-2q8x-2p7f-574v)
- [GHSA-rmr5-cpv2-vgjf](https://osv.dev/vulnerability/GHSA-rmr5-cpv2-vgjf)
- [GHSA-4jrv-ppp4-jm57](https://osv.dev/vulnerability/GHSA-4jrv-ppp4-jm57)
- [GHSA-mw36-7c6c-q4q2](https://osv.dev/vulnerability/GHSA-mw36-7c6c-q4q2)
- [GHSA-hph2-m3g5-xxv4](https://osv.dev/vulnerability/GHSA-hph2-m3g5-xxv4)
- [GHSA-j9h8-phrw-h4fh](https://osv.dev/vulnerability/GHSA-j9h8-phrw-h4fh)
- [GHSA-3gm7-v7vw-866c](https://osv.dev/vulnerability/GHSA-3gm7-v7vw-866c)
- [GHSA-645p-88qh-w398](https://osv.dev/vulnerability/GHSA-645p-88qh-w398)
- [GHSA-g5h3-w546-pj7f](https://osv.dev/vulnerability/GHSA-g5h3-w546-pj7f)
- [GHSA-c27h-mcmw-48hv](https://osv.dev/vulnerability/GHSA-c27h-mcmw-48hv)
- [GHSA-r4x2-3cq5-hqvp](https://osv.dev/vulnerability/GHSA-r4x2-3cq5-hqvp)
- [GHSA-24rp-q3w6-vc56](https://osv.dev/vulnerability/GHSA-24rp-q3w6-vc56)
- [GHSA-c9hw-wf7x-jp9j](https://osv.dev/vulnerability/GHSA-c9hw-wf7x-jp9j)
- [GHSA-4gq5-ch57-c2mg](https://osv.dev/vulnerability/GHSA-4gq5-ch57-c2mg)
- [GHSA-vmfg-rjjm-rjrj](https://osv.dev/vulnerability/GHSA-vmfg-rjjm-rjrj)
- [GHSA-crg9-44h2-xw35](https://osv.dev/vulnerability/GHSA-crg9-44h2-xw35)
- [GHSA-qmqc-x3r4-6v39](https://osv.dev/vulnerability/GHSA-qmqc-x3r4-6v39)
- [GHSA-4w82-r329-3q67](https://osv.dev/vulnerability/GHSA-4w82-r329-3q67)
- [GHSA-qr7j-h6gg-jmgc](https://osv.dev/vulnerability/GHSA-qr7j-h6gg-jmgc)
- [GHSA-9mxf-g3x6-wv74](https://osv.dev/vulnerability/GHSA-9mxf-g3x6-wv74)
- [GHSA-f3j5-rmmp-3fc5](https://osv.dev/vulnerability/GHSA-f3j5-rmmp-3fc5)
{{% /collapse-content %}}

## Retención de datos {#data-retention}

Datadog almacena los hallazgos de acuerdo con nuestros [Periodos de retención de datos](https://docs.datadoghq.com/es/data_security/data_retention_periods/). Datadog no almacena ni conserva el código fuente del cliente.

## Lecturas adicionales {#further-reading}

{{< whatsnext desc="Más sobre SCA:">}}
    {{< nextlink href="/security/code_security/software_composition_analysis/setup_runtime/" >}}Configure la detección en tiempo de ejecución de vulnerabilidades en las bibliotecas{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Otro análisis de Code Security para sus repositorios:">}}
    {{< nextlink href="/security/code_security/static_analysis/" >}}Análisis estático de código (SAST){{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management/iac_scanning/" >}}Infraestructura como código (IaC){{< /nextlink >}}
    {{< nextlink href="/security/code_security/secret_scanning/" >}}Escaneo de secretos{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/security/code_security/software_composition_analysis/
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: /es/security/code_security/software_composition_analysis/setup_static
[4]: https://app.datadoghq.com/ci/code-analysis
[5]: /es/getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[6]: /es/account_management/api-app-keys/
[7]: /es/integrations/github
[8]: https://github.com/DataDog/datadog-ci
[9]: /es/security/code_security/dev_tool_int/github_pull_requests/
[10]: https://github.com/DataDog/datadog-sbom-generator
[12]: /es/getting_started/site/
[13]: https://github.com/DataDog/datadog-static-analyzer-github-action
[14]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sbom
[15]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/
[16]: https://docs.datadoghq.com/es/account_management/teams/
[17]: https://app.datadoghq.com/source-code/repositories
[18]: https://cyclonedx.org/docs/1.4/json/
[19]: https://cyclonedx.org/docs/1.5/json/
[20]: https://cyclonedx.org/docs/1.6/json/
[21]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[22]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-sbom
[23]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[24]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/?tab=v30#migrating-to-v30
[25]: https://docs.datadoghq.com/es/data_security/data_retention_periods/
[26]: https://docs.datadoghq.com/es/account_management/teams/
[101]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/
[102]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/es/data_security/data_retention_periods/
[27]: /es/security/code_security/troubleshooting/#scan-java-jar-directories