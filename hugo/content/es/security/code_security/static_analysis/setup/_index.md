---
algolia:
  tags:
  - static analysis
  - static analysis rules
  - static application security testing
  - SAST
aliases:
- /es/continuous_integration/static_analysis
- /es/static_analysis
- /es/security/code_security/static_analysis/circleci_orbs/
- /es/code_analysis/static_analysis/setup/
description: Conozca Datadog Static Code Analysis para escanear el código en busca
  de problemas de calidad y vulnerabilidades de seguridad antes de que su código llegue
  a producción.
is_beta: false
title: Configure Datadog Static Code Analysis (SAST)
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}

## Descripción general {#overview}
Para configurar Datadog SAST en la aplicación, navegue a [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}}][1].

## Seleccione dónde ejecutar los escaneos de Datadog Static Code Analysis {#select-where-to-run-static-code-analysis-scans}
### Analizar con escaneo alojado por Datadog {#scan-with-datadog-hosted-scanning}

Puede ejecutar escaneos de Datadog Static Code Analysis (SAST) directamente en la infraestructura de Datadog. Los tipos de repositorio admitidos incluyen:
- [GitHub][18] (excluyendo repositorios que utilizan [Git Large File Storage][17])
- [GitLab.com y GitLab Self-Managed][20]
- [Azure DevOps][19]
- [Bitbucket Cloud][21]

Para comenzar, navegue a la [{{< ui >}}Code Security{{< /ui >}} página][1].

### Analizar en pipelines de CI {#scan-in-ci-pipelines}
Datadog Static Code Analysis se ejecuta en sus pipelines de CI utilizando la [`datadog-ci` CLI][8].

Primero, configure su Datadog API y sus claves de aplicación. Agregue `DD_APP_KEY` y `DD_API_KEY` como secretos. Por favor, asegúrese de que su clave de aplicación de Datadog tenga el contexto `code_analysis_read`.

A continuación, ejecute Datadog Static Code Analysis siguiendo las instrucciones para el proveedor de CI que eligió a continuación.

{{< whatsnext desc="Consulte las instrucciones según su proveedor de CI:">}}
    {{< nextlink href="security/code_security/static_analysis/setup/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/setup/generic_ci_providers" >}}Proveedores de CI genéricos{{< /nextlink >}}
{{< /whatsnext >}}

## Seleccione su proveedor de gestión de código fuente {#select-your-source-code-management-provider}
Datadog Static Code Analysis es compatible con todos los proveedores de gestión de código fuente, con soporte nativo para GitHub, GitLab, Azure DevOps y Bitbucket Cloud Premium.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure una aplicación de GitHub con el [mosaico de integración de GitHub][1] y configure la [integración del código fuente][2] para habilitar fragmentos de código en línea y [comentarios en solicitudes de extracción][3].

Al instalar una aplicación de GitHub, se requieren los siguientes permisos para habilitar ciertas funciones:

- `Content: Read`, que le permite ver fragmentos de código mostrados en Datadog
- `Pull Request: Read & Write`, que permite a Datadog agregar comentarios sobre infracciones directamente en sus solicitudes de extracción mediante [comentarios en solicitudes de extracción][3], así como abrir solicitudes de extracción para [corregir vulnerabilidades][4]
- `Checks: Read & Write`, que le permite crear comprobaciones en infracciones de SAST para bloquear solicitudes de extracción

[1]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /es/integrations/guide/source-code-integration
[3]: /es/security/code_security/dev_tool_int/github_pull_requests
[4]: /es/security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

Consulte las [instrucciones de configuración del código fuente de GitLab][1] para conectar los repositorios de GitLab a Datadog. Se admiten tanto GitLab.com como las instancias autogestionadas.

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

Si utiliza otro proveedor de gestión de código fuente, configure Static Code Analysis para que se ejecute en sus pipelines de CI utilizando la herramienta CLI `datadog-ci` y [ cargue los resultados](#upload-third-party-static-analysis-results-to-datadog) a Datadog.
**Debe** ejecutar un análisis de su repositorio en la rama predeterminada antes de que los resultados puedan comenzar a aparecer en la página {{< ui >}}Code Security{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

## Personalice su configuración {#customize-your-configuration}

De forma predeterminada, Datadog Static Code Analysis (SAST) escanea sus repositorios con los [conjuntos de reglas predeterminados de Datadog][6] para cada lenguaje de programación. Puede personalizar qué conjuntos de reglas o reglas se ejecutan, junto con otros parámetros, en Datadog o en un archivo `code-security.datadog.yaml`. Para obtener la referencia de configuración completa, consulte [Configuración de análisis de código estático (SAST)][27].

## Vincule los hallazgos a los servicios y equipos de Datadog {#link-findings-to-datadog-services-and-teams}

{{% security-products/link-findings-to-datadog-services-and-teams %}}


## Escaneo con reconocimiento de diferencias {#diff-aware-scanning}

El escaneo con reconocimiento de diferencias permite que el analizador estático de Datadog escanee solo los archivos modificados por una confirmación en una rama de funciones. Acelera significativamente el tiempo de escaneo al no ejecutar el análisis en cada archivo del repositorio para cada escaneo. Para habilitar el escaneo con reconocimiento de diferencias en su canalización de CI, siga estos pasos:

1. Asegúrese de que sus variables `DD_APP_KEY`, `DD_SITE` y `DD_API_KEY` estén configuradas en su canalización de CI.
2. Agregue una llamada a `datadog-ci git-metadata upload` antes de invocar el analizador estático. Este comando garantiza que los metadatos de Git estén disponibles para el backend de Datadog. Los metadatos de Git son necesarios para calcular la cantidad de archivos a analizar.
3. Asegúrese de que datadog-static-analyzer se invoque con la bandera `--diff-aware`.

Ejemplo de secuencia de comandos (estos comandos deben invocarse en su repositorio Git):

```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Nota:** Cuando no se puede completar un escaneo que reconoce diferencias, se escanea todo el directorio.

## Cargue resultados de análisis estático de terceros a Datadog {#upload-third-party-static-analysis-results-to-datadog}

<div class="alert alert-info">
  La importación de SARIF ha sido probada para Snyk, CodeQL, Semgrep, Gitleaks y Sysdig. Comuníquese con <a href="/help">Soporte de Datadog</a> si experimenta algún problema con otras herramientas compatibles con SARIF.
</div>

Puede enviar resultados de herramientas de análisis estático de terceros a Datadog, siempre que estén en el [Formato de intercambio de resultados de análisis estático (SARIF)][2] interoperable. Se requiere Node.js versión 14 o posterior.

Para cargar un informe SARIF:

1. Asegúrese de que las variables [`DD_API_KEY` y `DD_APP_KEY` estén definidas][4].
2. Opcionalmente, establezca una [`DD_SITE` variable][7] (el valor predeterminado es `datadoghq.com`).
3. Instale la utilidad `datadog-ci`:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecute la herramienta de análisis estático de terceros en su código y genere los resultados en formato SARIF.
5. Cargue los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## Pautas de soporte para SARIF {#sarif-support-guidelines}

Datadog admite la ingesta de archivos SARIF de terceros que cumplan con [el esquema SARIF 2.1.0][15]. El SARIF
esquema es utilizado de manera diferente por las herramientas de análisis estático. Si desea enviar archivos SARIF de terceros a Datadog, por favor
asegúrese de que cumplan con los siguientes detalles:

 - La ubicación de la infracción se especifica a través del objeto `physicalLocation` de un resultado.
    - El `artifactLocation` y su `uri` **deben ser relativos** a la raíz del repositorio.
    - El objeto `region` es la parte del código resaltada en la interfaz de usuario de Datadog.
 - El `partialFingerprints` se utiliza para identificar de forma única un hallazgo en un repositorio.
 - `properties` y `tags` añaden más información:
    - La etiqueta `DATADOG_CATEGORY` especifica la categoría del hallazgo. Los valores aceptables son `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`.
    - Las infracciones anotadas con la categoría `SECURITY` se muestran en el explorador de vulnerabilidades y en la pestaña Security de la vista del repositorio.
 - La sección `tool` debe tener una sección `driver` válida con atributos `name` y `version`.

Por ejemplo, aquí hay un ejemplo de un archivo SARIF procesado por Datadog:


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## Asignación de gravedad de SARIF a CVSS {#sarif-to-cvss-severity-mapping}

El [formato SARIF][15] define cuatro gravedades: ninguna, nota, advertencia y error.
Sin embargo, Datadog informa la gravedad de las infracciones y vulnerabilidades utilizando el [Sistema de puntuación de vulnerabilidad común][16] (CVSS),
que define cinco gravedades: crítica, alta, media, baja y ninguna.

Al ingerir archivos SARIF, Datadog asigna las gravedades de SARIF a las gravedades de CVSS utilizando las reglas de asignación a continuación.


| Gravedad SARIF | Gravedad CVSS |
|----------------|---------------|
| Error          | Crítico      |
| Advertencia        | Alta          |
| Nota           | Media        |
| Ninguno           | Baja           |

## Retención de datos {#data-retention}

Datadog almacena los hallazgos de acuerdo con nuestros [Periodos de retención de datos](https://docs.datadoghq.com/es/data_security/data_retention_periods/). Datadog no almacena ni conserva el código fuente del cliente.

## <!-- Lecturas adicionales

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /es/ide_plugins/idea/#static-analysis
[4]: /es/account_management/api-app-keys/
[6]: /es/security/code_security/static_analysis/static_analysis_rules
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /es/integrations/guide/source-code-integration
[11]: /es/security/code_security/dev_tool_int/github_pull_requests
[12]: /es/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /es/security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /es/security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /es/security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[21]: /es/security/code_security/static_analysis/setup/?tab=bitbucketcloud#select-your-source-code-management-provider
[22]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/?tab=v30#migrating-to-v30
[24]: https://docs.datadoghq.com/es/account_management/teams/
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[27]: /es/security/code_security/static_analysis/configuration/
[101]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/
[102]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/es/data_security/data_retention_periods/