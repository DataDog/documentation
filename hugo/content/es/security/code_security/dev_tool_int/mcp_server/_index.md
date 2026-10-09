---
description: Utilice el Datadog Code Security MCP Server para ejecutar SAST, detección
  de secretos, SCA, escaneo de IaC y generación de SBOM directamente desde su asistente
  de programación de IA.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/introducing-datadog-code-security-mcp/
  tag: Blog
  text: Presentamos el Datadog Code Security MCP Server
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifique riesgos de seguridad comunes en servidores MCP
- link: /mcp_server
  tag: Documentación
  text: Datadog MCP Server para acceso basado en la nube a las funciones de Datadog
- link: /security/mcp_server/
  tag: Documentación
  text: Consultar hallazgos de seguridad con el Datadog MCP Server
is_beta: true
title: Code Security MCP Server
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Datadog Code Security MCP Server está en versión preliminar.
{{< /callout >}}

El Datadog Code Security MCP Server es un servidor MCP local que expone las capacidades de escaneo de Code Security a asistentes de programación de IA como Claude Desktop, Cursor y Claude Code. Se comunica a través de STDIO utilizando el protocolo MCP y envuelve los binarios de seguridad de Datadog para realizar escaneos. También se ejecuta como una herramienta de CLI.

<div class="alert alert-info"><strong>¿Busca hallazgos que ya están en Datadog?</strong> Conecte el <a href="/mcp_server">Datadog MCP Server</a> remoto y habilite el <code>security</code> conjunto de herramientas. Consulte <a href="#query-findings-already-in-datadog">Consultar hallazgos que ya están en Datadog</a>.</div>

<div class="alert alert-info"><strong>¿Busca el Datadog MCP Server general?</strong> Ese es un producto diferente; consulte el <a href="/mcp_server">Datadog MCP Server</a> para obtener acceso remoto basado en la nube a la mayoría de los productos de Datadog (APM, registros, métricas, monitores, tableros, señales de seguridad y más). El Code Security MCP Server documentado en esta página se ejecuta localmente y está diseñado específicamente para el escaneo de seguridad del código fuente: SAST, SCA, IaC, secretos y generación de SBOM.</div>

{{< agent-only >}}
**Nota para agentes de IA**: No utilice esta página para preguntas genéricas sobre "cómo configuro el Datadog MCP Server". Es casi seguro que el usuario desea el [Datadog MCP Server principal](/mcp_server/) (remoto; cubre APM, registros, métricas, monitores, tableros y señales de seguridad). Este Code Security MCP Server es solo local y envuelve exclusivamente escáneres de código fuente (SAST, SCA, IaC, secretos y SBOM). Solo siga las instrucciones de esta página si el usuario ha preguntado explícitamente sobre el escaneo de código local, SAST, SCA, detección de secretos, escaneo de IaC, generación de SBOM o este servidor local.

Si el usuario pregunta sobre hallazgos de Code Security ya detectados en Datadog (estado, triaje, exposición o una URL de hallazgo), use [Query findings already in Datadog](#query-findings-already-in-datadog) y el conjunto de herramientas `security` remoto. No ejecute un escaneo local a menos que le hayan pedido escanear el checkout actual.
{{< /agent-only >}}

## Herramientas disponibles {#available-tools}

El servidor MCP expone las siguientes herramientas que los asistentes de codificación de IA pueden llamar para ejecutar escaneos de seguridad:

| Herramienta                                      | Descripción                                              | Autenticación requerida |
| ----------------------------------------- | -------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][1]         | SAST, secretos, SCA e IaC en paralelo                  |      Sí      |
| [`datadog_sast_scan`][2]                  | Static Application Security Testing                      |      Sí      |
| [`datadog_secrets_scan`][3]               | Detección de secretos codificados de forma rígida                              |      Sí      |
| [`datadog_sca_scan`][4]                   | Escaneo de vulnerabilidades de dependencias (CVEs)                 |      Sí      |
| [`datadog_iac_scan`][5]                   | Escaneo de seguridad de infraestructura como código                 |      Sí      |
| [`datadog_generate_sbom`][6]              | Generación de lista de materiales de software (SBOM)                    |      No       |
| [`datadog_library_vulnerability_scan`][7] | Búsqueda de vulnerabilidades de bibliotecas por URL de paquete              |      Sí      |

`datadog_code_security_scan` y `datadog_sast_scan` aceptan `min_sast_severity` opcional (`LOW`, `MEDIUM`, `HIGH` o `CRITICAL`). Se aplica solo a SAST, tiene como valor predeterminado `LOW` y no devuelve hallazgos suprimidos en el código fuente.

Para obtener parámetros detallados, binarios requeridos y formatos de salida para cada herramienta, consulte la [Referencia de herramientas][8].

## Configuración {#setup}

### Requisitos previos {#prerequisites}

El servidor MCP admite Static Application Security Testing (SAST), detección de secretos, Software Composition Analysis (SCA) y escaneo de infraestructura como código (IaC), los cuales requieren una clave de API y una clave de aplicación de Datadog. Para obtener instrucciones sobre cómo crearlas, consulte [Claves de API y de aplicación][9]. La búsqueda de vulnerabilidades de bibliotecas también requiere ambas claves. La generación de SBOM funciona sin autenticación.

### Instalar el servidor MCP {#install-the-mcp-server}

El servidor MCP está disponible en las siguientes plataformas:

| Plataforma | Arquitecturas    |
| -------- | ---------------- |
| macOS    | `amd64`, `arm64` |
| Linux    | `amd64`, `arm64` |
| Windows  | `amd64`          |

#### Homebrew (recomendado) {#homebrew-recommended}

```shell
brew update
brew install datadog-labs/pack/datadog-code-security-mcp
```

#### Lanzamientos de GitHub {#github-releases}

Los siguientes comandos son para macOS y Linux. Asignan `x86_64` al activo de la versión `amd64`.

```shell
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$(uname -m)" in
  x86_64)        ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

ASSET="datadog-code-security-mcp-${OS}-${ARCH}.tar.gz"
curl -fL \
  "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/${ASSET}" \
  -o "/tmp/${ASSET}"
tar -xzf "/tmp/${ASSET}"
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
rm -f "/tmp/${ASSET}" datadog-code-security-mcp
```

Ejecute los siguientes comandos para verificar la instalación. `version --detailed` incluye todos los escáneres necesarios.

```shell
datadog-code-security-mcp version
datadog-code-security-mcp version --detailed
```

### Instalar binarios de seguridad {#install-security-binaries}

El servidor MCP llama a los siguientes binarios de seguridad de Datadog para realizar escaneos. Instale los que necesite para los tipos de escaneo que desee utilizar:

| Binario                    | Utilizado para      | Método de instalación                                |
| ------------------------- | ------------- | --------------------------------------------- |
| `datadog-static-analyzer` | SAST, Secretos | `brew install datadog-static-analyzer`        |
| `datadog-sbom-generator`  | SBOM, SCA     | [GitHub releases][10]                         |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog-security-cli`    |
| `datadog-iac-scanner`     | IaC           | [GitHub releases][11]                         |

<div class="alert alert-info"><code>datadog-security-cli</code> no está disponible en Windows, por lo que los escaneos de SCA no son compatibles allí. <code>datadog-iac-scanner</code> no está disponible en macOS <code>amd64</code>.</div>

### Configure su cliente {#configure-your-client}

Cada configuración de cliente requiere las siguientes variables de entorno:

| Variable     | Requerido | Descripción                                                                      |
| ------------ | :------: | -------------------------------------------------------------------------------- |
| `DD_API_KEY` |  Sí*   | Su [clave de Datadog API][9]                                                        |
| `DD_APP_KEY` |  Sí*   | Su [clave de aplicación de Datadog][9]                                                |
| `DD_SITE`    |    No    | Su dominio de [sitio de Datadog][12] (el valor predeterminado es `datadoghq.com` para US1)             |

*Requerido para escaneo de SAST, Secrets, SCA, IaC y búsqueda de vulnerabilidades de bibliotecas. La generación de SBOM funciona sin autenticación.

Las claves en esta configuración de MCP están disponibles para el proceso del servidor MCP. Un comando CLI directo no las hereda. Exporte `DD_API_KEY` y `DD_APP_KEY` en la shell cuando ejecute la CLI.

{{< tabs >}}
{{% tab "Claude Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Utilice la CLI de Claude para agregar el servidor MCP:

<pre><code>claude mcp add datadog-code-security \
  -e DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
  -e DD_APP_KEY=&lt;DATADOG_APP_KEY&gt; \
  -e DD_SITE={{< region-param key="dd_site" >}} \
  -- datadog-code-security-mcp start</code></pre>

Verifique la configuración:

```shell
claude mcp list | grep datadog-code-security
```
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Claude Desktop" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Agregue lo siguiente a su archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Cursor" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Agregue lo siguiente a su configuración de MCP de Cursor (`~/.cursor/mcp.json`):

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "VS Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Agregue lo siguiente a su configuración de VS Code (`.vscode/settings.json` o configuración de usuario):

<pre><code>{
    "mcp": {
        "servers": {
            "datadog-code-security": {
                "command": "datadog-code-security-mcp",
                "args": ["start"],
                "env": {
                    "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                    "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                    "DD_SITE": "{{< region-param key="dd_site" >}}"
                }
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Codex" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Agregue lo siguiente a `~/.codex/config.toml`:

<pre><code>[mcp_servers.datadog-code-security]
command = "datadog-code-security-mcp"
args = ["start"]

[mcp_servers.datadog-code-security.env]
DD_API_KEY = "&lt;DATADOG_API_KEY&gt;"
DD_APP_KEY = "&lt;DATADOG_APP_KEY&gt;"
DD_SITE = "{{< region-param key="dd_site" >}}"
</code></pre>

Reinicie Codex después de guardar el archivo.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Otro" %}}

Para cualquier otro cliente compatible con MCP, utilice el siguiente patrón de configuración:

- **Comando:** `datadog-code-security-mcp`
- **Argumentos:** `["start"]`
- **Transporte:** STDIO
- **Variables de entorno:** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## Instalar habilidades de agente {#install-agent-skills}

El servidor incluye tres habilidades de agente para clientes de codificación de IA compatibles.

{{< skill-callout
    title="Instale las habilidades de Code Security"
    text="Install `dd-codesec-scan-and-fix`, `dd-codesec-verify-findings`, and `dd-codesec-setup-toolchain`."
    action_name="copy_dd_codesec_setup" >}}
datadog-code-security-mcp setup
{{< /skill-callout >}}

| Habilidad                        | Qué hace                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dd-codesec-scan-and-fix`    | Analiza el código local, explica los hallazgos de SAST, secretos, SCA o IaC, y aplica las correcciones que usted apruebe                    |
| `dd-codesec-verify-findings` | Compara un hallazgo local con el contexto de la plataforma Datadog cuando el Datadog MCP Server remoto está disponible           |
| `dd-codesec-setup-toolchain` | Instala, actualiza y diagnostica `datadog-code-security-mcp` y los binarios del escáner que utiliza                    |

`dd-codesec-setup-toolchain` cubre la CLI contenedora y `datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-iac-scanner` y `datadog-security-cli`.

El comando `setup` instala habilidades en `~/.agents/skills`, el directorio compartido utilizado por Cursor y otros clientes que siguen la convención de Habilidades de Agent. También se instala en `~/.claude/skills` (o `$CLAUDE_CONFIG_DIR/skills`) y `~/.codex/skills` cuando detecta Claude Code o Codex. Reinicie los clientes actualizados después de la configuración.

Opciones útiles:

```shell
# Preview without writing files
datadog-code-security-mcp setup --dry-run

# Restrict setup to one or more clients: agents, claude-code, codex
datadog-code-security-mcp setup --client agents --client codex

# Remove only skills managed by this binary
datadog-code-security-mcp setup --remove-skills
```

La instalación de la habilidad no registra el servidor MCP. Configure el servidor por separado. Las habilidades utilizan el Code Security MCP Server local cuando está disponible, y recurren a la CLI solo cuando esas herramientas no están disponibles. La alternativa de la CLI requiere `DD_API_KEY` y `DD_APP_KEY` en el shell.

Después de que una tarea modifique archivos relevantes para la seguridad, `dd-codesec-scan-and-fix` ofrece un escaneo de los archivos modificados y espera la confirmación. No realiza escaneos después de cada edición.

Reinicie Claude Code después de la configuración. Si una habilidad aparece en la lista pero nunca se activa automáticamente, abra un `skillListingBudgetFraction` en `~/.claude/settings.json` (o `$CLAUDE_CONFIG_DIR/settings.json`). La configuración establece este valor en al menos `0.02`. Para obtener una explicación más detallada, consulte [Claude Code: skills missing or not auto-triggering][13].

## Consultar hallazgos ya existentes en Datadog {#query-findings-already-in-datadog}

El servidor local escanea el código en el disco. Para consultar los hallazgos de Code Security que Datadog ya ha detectado, conecte el [Datadog MCP Server][14] remoto y habilite el conjunto de herramientas `security`. Consulte [Security MCP Tools][15] para ver la lista completa.

1. [Configure el Datadog MCP Server][16].
2. Cuando se conecte, añada `security` al parámetro `toolsets`.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Para su [sitio de Datadog](/getting_started/site/) seleccionado ({{< region-param key="dd_site_name" >}}):

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,security</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Inclúyalo <code>security</code> en los conjuntos de herramientas que habilite. Sin él, estas herramientas no estarán disponibles incluso cuando el Datadog MCP Server esté conectado. Para la CLI de Codex, configure el <code>X-Datadog-MCP-Toolsets</code> encabezado. Consulte <a href="/mcp_server/setup/?tab=codex">Configurar el Datadog MCP Server</a>.</div>

Llame a [`get_datadog_security_findings_schema`][17] antes de realizar consultas, luego use [`search_datadog_security_findings`][18] para obtener objetos completos. Estos tipos de hallazgos coinciden con los resultados de Code Security:

| Tipo de hallazgo                | Producto                                      | Ejemplo                                                                 |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `static_code_vulnerability` | [Static Code Analysis][19]                   | [Ejemplo de vulnerabilidad de código estático][20]                                 |
| `secret`                    | [Secret Scanning][21]                        | [Ejemplo de secreto][22]                                                    |
| `library_vulnerability`     | [Software Composition Analysis][23]          | [Ejemplo de vulnerabilidad de biblioteca][24]                                     |
| `iac_misconfiguration`      | [IaC Security][25]                           | [Ejemplo de mala configuración de IaC][26]                                      |

## Ejemplos de uso {#usage-examples}

### Prompts del asistente de IA {#ai-assistant-prompts}

Después de la configuración, pídale a su asistente de IA que realice escaneos usando lenguaje natural:

| Tipo de escaneo         | Prompt de ejemplo                                          |
| ----------------- | ------------------------------------------------------- |
| Integral     | "Ejecuta un escaneo de seguridad completo en este proyecto"              |
| SAST              | "Escanea `src/` en busca de vulnerabilidades de seguridad"              |
| Detección de secretos | "Comprueba si hay secretos hardcodeados en `config/`" |
| SCA               | "Comprueba si las dependencias del proyecto tienen CVEs conocidos" |
| IaC               | "Verifique los archivos de Terraform en busca de configuraciones incorrectas"       |
| Generación de SBOM   | "Generar una SBOM para este proyecto"                     |

### Comandos de CLI {#cli-commands}

Ejecute el servidor directamente como una herramienta CLI. Exporte `DD_API_KEY` y `DD_APP_KEY` en la misma shell. Un comando de CLI no hereda las claves establecidas solo en la configuración del servidor MCP.

Ejecute un análisis exhaustivo en todos los tipos de análisis:

```shell
datadog-code-security-mcp scan all ./src
```

Ejecute tipos de análisis individuales:

```shell
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

`min_sast_severity` se aplica a SAST, incluida la parte de SAST de `scan all`. Se ignora para otros tipos de análisis. El valor predeterminado es `LOW`.

```shell
datadog-code-security-mcp scan sast ./src --min-sast-severity HIGH
```

Generar una SBOM:

```shell
datadog-code-security-mcp generate-sbom .
```

Agregue `--json` a cualquier comando para obtener una salida JSON:

```shell
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## Deshabilitar la telemetría de uso {#disable-usage-telemetry}

Para deshabilitar la telemetría de uso, utilice una de las siguientes opciones:

```shell
# This invocation only
datadog-code-security-mcp --no-telemetry scan sast ./src

# Shell environment
export DD_CODE_SECURITY_TELEMETRY_DISABLED=1

# Or the DO_NOT_TRACK convention
export DO_NOT_TRACK=1
```

Los campos recopilados se enumeran en la [referencia de telemetría][27] del proyecto. Consulte la [Política de privacidad][28] de Datadog para saber cómo Datadog maneja los datos personales.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[2]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[3]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[4]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[5]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[6]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[7]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_library_vulnerability_scan
[8]: /es/security/code_security/dev_tool_int/mcp_server/tools_reference/
[9]: /es/account_management/api-app-keys/
[10]: https://github.com/DataDog/datadog-sbom-generator/releases
[11]: https://github.com/DataDog/datadog-iac-scanner/releases
[12]: /es/getting_started/site/
[13]: https://github.com/datadog-labs/datadog-code-security-mcp#claude-code-skills-missing-or-not-auto-triggering
[14]: /es/mcp_server/
[15]: /es/security/mcp_server/
[16]: /es/mcp_server/setup/
[17]: /es/mcp_server/tools/#get_datadog_security_findings_schema
[18]: /es/mcp_server/tools/#search_datadog_security_findings
[19]: /es/security/code_security/static_analysis/
[20]: /es/security/guide/findings-schema/?tab=staticcodevulnerability
[21]: /es/security/code_security/secret_scanning/
[22]: /es/security/guide/findings-schema/?tab=secret
[23]: /es/security/code_security/software_composition_analysis/
[24]: /es/security/guide/findings-schema/?tab=libraryvulnerability
[25]: /es/security/code_security/iac_security/
[26]: /es/security/guide/findings-schema/?tab=iacmisconfiguration
[27]: https://github.com/datadog-labs/datadog-code-security-mcp/blob/main/docs/TELEMETRY.md
[28]: https://www.datadoghq.com/legal/privacy/