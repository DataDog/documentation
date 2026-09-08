---
aliases:
- /es/security/cloud_security_management/setup/iac_scanning/
further_reading:
- link: /security/code_security
  tag: Documentación
  text: Code Security
- link: /security/code_security/iac_security
  tag: Documentación
  text: IaC Security
- link: /security/code_security/iac_security/configuration
  tag: Documentación
  text: Configure IaC Security
- link: /security/code_security/iac_security/iac_rules/
  tag: Documentación
  text: Reglas de IaC Security
title: Configure IaC Security
---
Utilice las siguientes instrucciones para habilitar IaC Security para Code Security. IaC Security admite múltiples configuraciones de IaC almacenadas en repositorios de GitHub, GitLab o Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

### Instale la integración de GitHub {#install-the-github-integration}

Para conectar sus repositorios de GitHub y habilitar los comentarios de PR, consulte las instrucciones de configuración en [Comentarios de solicitud de extracción][1].

### Habilite IaC Security para sus repositorios {#enable-iac-security-for-your-repositories}

Después de configurar la integración de GitHub, habilite IaC Security para sus repositorios.

1. En la [página de configuración de Code Security][2], expanda la sección {{< ui >}}Activate scanning for your repositories{{< /ui >}}.
1. En {{< ui >}}Select your source code management provider{{< /ui >}}, seleccione {{< ui >}}GitHub{{< /ui >}}.
1. En {{< ui >}}Select where your scans should run{{< /ui >}}, seleccione {{< ui >}}Datadog{{< /ui >}}.
1. En {{< ui >}}Connect your GitHub repositories{{< /ui >}}, realice una de las siguientes acciones:
    - Para conectar una cuenta de GitHub nueva, haga clic en {{< ui >}}Add GitHub Account{{< /ui >}}.
    - Para habilitar IaC Security para una cuenta existente, haga clic en {{< ui >}}Select repositories{{< /ui >}}, o en {{< ui >}}Edit{{< /ui >}} si Code Security ya está habilitado.
1. Para habilitar IaC Security, realice una de las siguientes acciones:
    - Para habilitar IaC Security para todos los repositorios, cambie {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} a la posición de ENCENDIDO.
    - Para habilitar IaC Security para un solo repositorio, cambie el interruptor {{< ui >}}IaC{{< /ui >}} a ENCENDIDO para ese repositorio.

[1]: /es/security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Instale la integración de GitLab {#install-the-gitlab-integration}

Para conectar sus repositorios de GitLab y habilitar los comentarios en PR, consulte las instrucciones de configuración en [GitLab Source Code][1].

### Habilite IaC Security para sus repositorios {#enable-iac-security-for-your-repositories-1}

Después de configurar la integración de GitLab, habilite IaC Security para sus repositorios.

1. En la [página de configuración de Code Security][2], expanda la sección {{< ui >}}Activate scanning for your repositories{{< /ui >}}.
1. En {{< ui >}}Select your source code management provider{{< /ui >}}, seleccione {{< ui >}}GitLab{{< /ui >}}.
1. En {{< ui >}}Select where your scans should run{{< /ui >}}, seleccione {{< ui >}}Datadog{{< /ui >}}.
1. En {{< ui >}}Connect your GitLab repositories{{< /ui >}}, realice una de las siguientes acciones:
    - Para conectar una nueva instancia de GitLab, haga clic en {{< ui >}}Connect GitLab Instance{{< /ui >}}.
    - Para habilitar IaC Security para una cuenta existente, haga clic en {{< ui >}}Select repositories{{< /ui >}}, o en {{< ui >}}Edit{{< /ui >}} si Code Security ya está habilitado.
1. Para habilitar IaC Security, realice una de las siguientes acciones:
    - Para habilitar IaC Security para todos los repositorios, cambie {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} a la posición de ENCENDIDO.
    - Para habilitar IaC Security para un solo repositorio, cambie el interruptor {{< ui >}}IaC{{< /ui >}} a ENCENDIDO para ese repositorio.

[1]: /es/integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Instale la integración de Azure DevOps {#install-the-azure-devops-integration}

Para conectar sus repositorios de Azure DevOps y habilitar los comentarios en PR, consulte las instrucciones de configuración en [Azure DevOps Source Code][1].

### Habilite IaC Security para sus repositorios {#enable-iac-security-for-your-repositories-2}

Después de configurar la integración de Azure DevOps, habilite IaC Security para sus repositorios.

1. En la [página de configuración de Code Security][2], expanda la sección {{< ui >}}Activate scanning for your repositories{{< /ui >}}
1. En {{< ui >}}Select your source code management provider{{< /ui >}}, seleccione {{< ui >}}Azure DevOps{{< /ui >}}.
1. En {{< ui >}}Select where your scans should run{{< /ui >}}, seleccione {{< ui >}}Datadog{{< /ui >}}.
1. En {{< ui >}}Connect your Azure DevOps repositories{{< /ui >}}, realice una de las siguientes acciones:
    - Para conectar una nueva organización de Azure DevOps, haga clic en {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.
    - Para habilitar IaC Security para una cuenta existente, haga clic en {{< ui >}}Select repositories{{< /ui >}}, o en {{< ui >}}Edit{{< /ui >}} si Code Security ya está habilitado.
1. Para habilitar IaC Security, realice una de las siguientes acciones:
    - Para habilitar IaC Security para todos los repositorios, cambie {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} a la posición de ENCENDIDO.
    - Para habilitar IaC Security para un solo repositorio, cambie el interruptor {{< ui >}}IaC{{< /ui >}} a ENCENDIDO para ese repositorio.

[1]: /es/integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## Configure IaC con un proveedor de CI genérico {#set-up-iac-with-a-generic-ci-provider}

### Descripción general {#overview}

Si no utiliza GitHub Actions, GitLab CI/CD o Azure DevOps, puede ejecutar el [Datadog IaC Scanner][8] directamente en su canalización de CI. Cargue los resultados del escaneo de IaC a Datadog utilizando la [`datadog-ci` CLI][9].

**Si está ejecutando IaC Security en un repositorio que no es de GitHub**, ejecute el primer escaneo en su rama predeterminada. Si su rama predeterminada utiliza un nombre distinto a `master`, `main`, `default`, `stable`, `source`, `prod` o `develop`, cargue un primer escaneo para su repositorio. Luego, sobrescriba manualmente la rama predeterminada en [{{< ui >}}Repository Settings{{< /ui >}}][10] para que los escaneos futuros de ramas que no sean la predeterminada se carguen y procesen correctamente.

### Requisitos previos {#prerequisites}

- Node.js 20 o posterior y npm
- `curl`
- `tar`
- Permiso para instalar el escáner en `/usr/local/bin`

Configure las siguientes variables de entorno:

| Nombre         | Descripción                                                                                                                                                 | Requerido | Predeterminado         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `DD_API_KEY` | Su clave de API de Datadog. Cree esta clave en su [organización de Datadog][4] y almacene la clave como un secreto.                                                     | Sí      |                 |
| `DD_APP_KEY` | Su clave de aplicación. Cree esta clave en su [organización de Datadog][4] e incluya el contexto `code_analysis_read`. Almacene la clave como un secreto.              | Sí      |                 |
| `DD_SITE`    | El [sitio de Datadog][5] al que enviar información. Su sitio de Datadog es `datadoghq.com`.                                                                         | No       | `datadoghq.com` |

Agregue lo siguiente a su pipeline de CI:

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog IaC Scanner (x86_64/amd64 Linux; see GitHub Releases for arm64 and other platforms)
export IAC_SCANNER_URL="https://github.com/DataDog/datadog-iac-scanner/releases/latest/download/datadog-iac-scanner_linux_amd64.tar.gz"
curl -L "${IAC_SCANNER_URL}" -o /tmp/datadog-iac-scanner.tar.gz
tar xfz /tmp/datadog-iac-scanner.tar.gz -C /tmp
mv /tmp/datadog-iac-scanner /usr/local/bin/datadog-iac-scanner

# Run the Datadog IaC scanner
exit_code=0
/usr/local/bin/datadog-iac-scanner scan -p . -o /tmp || exit_code=$?
if [ $exit_code -lt 20 -o $exit_code -gt 60 ]; then echo "IaC scan failed" ; exit $exit_code ; fi

# Upload results
datadog-ci sarif upload /tmp/datadog-iac-scanner-result.sarif
```

<div class="alert alert-info">
  Este ejemplo utiliza la versión de Linux x86_64 (amd64) del Datadog IaC Scanner. El escáner también es compatible con Linux arm64, así como con macOS y Windows. Si está utilizando un sistema operativo o una arquitectura diferente, seleccione la versión adecuada en la página de <a href="https://github.com/DataDog/datadog-iac-scanner/releases">GitHub Releases</a> y actualice el <code>IAC_SCANNER_URL</code> valor.
</div>

## Cargue los resultados de análisis estático de terceros a IaC Security {#upload-third-party-static-analysis-results-to-iac-security}

<div class="alert alert-info">
  Puede importar resultados SARIF de escáneres de infraestructura como código (IaC) de terceros, incluido Checkov, a IaC Security. Consulte <a href="https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog">
  Cargue resultados de análisis estático de terceros</a> para herramientas compatibles con SARIF admitidas para SAST. Se requiere Node.js versión 14 o posterior.
</div>

Para cargar un informe SARIF:

1. Asegúrese de que las variables [`DD_API_KEY` y `DD_APP_KEY` estén definidas][4].
2. Opcionalmente, establezca una [`DD_SITE` variable][5] (el valor predeterminado es `datadoghq.com`).
3. Instale la utilidad `datadog-ci` (versión 2.0 o posterior):

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Ejecute la herramienta de IaC Scanning de terceros (por ejemplo, Checkov, Trivy, KICS) en su código y exporte los resultados en el formato SARIF v2.1.0.
5. Cargue los resultados en Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```
   - Opciones de carga
       - `--tags:` Agregue etiquetas personalizadas (formato: `key:value`)
       - `--max-concurrency:` Establezca cargas simultáneas (predeterminado: 20)
       - `--dry-run:` Valide sin cargar
### Atributos SARIF requeridos {#required-sarif-attributes}
Para garantizar la ingesta y visualización adecuadas en Datadog IaC Scanning para escáneres de terceros (excluyendo Checkov), su archivo SARIF DEBE incluir los siguientes atributos para ser reconocido como un hallazgo de IaC Security:
1. `Runs[...].tool.driver.name: Datadog IaC Scanning`
2. `Runs[...].tool.driver.version: "code_update"` o `"full_scan"`
    - `"full_scan”` para escaneos completos del repositorio
    - `"code_update"` para escaneos de solicitudes de extracción / incrementales
4. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]`, donde `"number"` especifica el número de archivos escaneados 
5. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri`: Ruta relativa al archivo desde la raíz del repositorio
    - `region.startLine`: Número de línea inicial
    - `region.endLine`: Número de línea final
    - `region.startColumn`: Número de columna inicial
    - `region.endColumn`: Número de columna final
<div class="alert alert-info">Las supresiones descartan las violaciones silenciosamente. Si <code>results[ ].suppressions</code> existe, la violación se ignora por completo.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /es/account_management/api-app-keys/
[5]: /es/getting_started/site/
[6]: https://docs.datadoghq.com/es/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[8]: https://github.com/DataDog/datadog-iac-scanner
[9]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[10]: https://app.datadoghq.com/source-code/repositories