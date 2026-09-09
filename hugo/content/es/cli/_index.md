---
description: Utilice la interfaz de línea de comandos Pup para interactuar con las
  API de Datadog desde la terminal o flujos de trabajo de agentes de IA.
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Repositorio de la CLI de Pup
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: Documentación completa de la CLI de Pup
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: Referencia de comandos
- link: mcp_server/
  tag: Documentación
  text: Datadog MCP Server
title: CLI de Pup
---
## Descripción general {#overview}

[La CLI de Pup][1] es una interfaz de línea de comandos integral y lista para agentes de IA que brinda a los agentes de IA acceso a la plataforma de observabilidad de Datadog. Expone la [superficie de la API de Datadog][9] para su uso en flujos de trabajo de agentes de IA y pipelines automatizadas.

Características clave:

- **Comandos autodescubribles**: Los comandos están estructurados para que los agentes puedan navegar por ellos sin documentación externa.
- **Salida estructurada**: Las respuestas están disponibles en JSON y YAML para un parseo confiable.
- **Autenticación con alcance limitado**: OAuth2 y PKCE proporcionan acceso con alcance limitado sin claves de API de larga duración.
- **Amplia cobertura de productos**: Pup admite monitores, registros, métricas, RUM, seguridad y más.

<div class="alert alert-info">Esta página cubre las características principales de Pup. Consulte la <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">documentación del repositorio de Pup</a> para obtener la lista completa de características y comandos.</div>

## Instalación {#installation}

### Homebrew (macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### Compilar desde el código fuente {#build-from-source}

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### Descarga manual {#manual-download}

Descargue los binarios precompilados desde la [versión más reciente][2].

## Ejemplos de uso {#usage-examples}

{{< code-block lang="bash" >}}
# Log in to Datadog
pup auth login

# List monitors filtered by tag
pup monitors list --tags="team:api-platform"

# Search logs for errors in the last hour
pup logs search --query="status:error" --from="1h"

# Query CPU metrics
pup metrics query --query="avg:system.cpu.user{*}" --from="1h"

# Get dashboard details
pup dashboards get <DASHBOARD_ID>

# Delete a dashboard
pup dashboards delete <DASHBOARD_ID> --yes
{{< /code-block >}}

## Áreas de producto compatibles {#supported-product-areas}

Pup cubre la mayoría de las principales superficies de productos de Datadog. Consulte la [referencia de comandos][3] para obtener la lista canónica de comandos específicos del producto. También puede ejecutar `pup --help` (o `pup agent schema` para obtener una salida legible por máquina) para ver la lista de comandos en vivo tal como fueron compilados.

| Categoría | Ejemplos |
|----------|----------|
| Observabilidad central | Métricas, registros, eventos, RUM, APM, trazas |
| Monitoreo y Alerting | Monitores, tableros, SLOs, sintéticos, tiempos de inactividad, flujos de trabajo |
| Security and Compliance | Security rules, signals, findings, audit logs, CSM threats |
| Infraestructura y nube | Hosts, etiquetas, contenedores, red, integraciones de AWS/GCP/Azure |
| Incident and Operations | Incidents, on-call, work management, error tracking, service catalog |
| CI/CD y desarrollo | Visibilidad de CI, optimización de pruebas, métricas DORA, puertas de despliegue |
| Organización y acceso | Usuarios, claves de API, claves de aplicación, organizaciones |
| Platform and Configuration | Usage metering, cost management, feature flags, pipelines de observabilidad |

## Modo Agent {#agent-mode}

Cuando Pup es invocado por un agente de codificación de IA, cambia automáticamente al modo agente, el cual devuelve respuestas JSON estructuradas optimizadas para el consumo por máquina. Las respuestas incluyen metadatos, detalles de errores y sugerencias. El modo Agent también aprueba automáticamente las solicitudes de confirmación.

El modo Agent se detecta automáticamente para [agentes de codificación compatibles][4] cuando su variable de entorno está configurada. También puede habilitarlo explícitamente con la bandera `--agent` o configurando `FORCE_AGENT_MODE=1`.

## Funciones adicionales {#additional-features}

Pup incluye funciones adicionales que se pueden utilizar en flujos de trabajo de agentes de IA; siga los enlaces a continuación para obtener más información:

- [**Runbooks**][5]: `pup runbooks` es un motor de ejecución local para procedimientos operativos definidos en YAML, que codifica tareas de varios pasos utilizando `pup`, shell, HTTP y pasos de Datadog Workflow.
- [**Habilidades del Agent**][6]: Pup incluye habilidades y agentes de dominio integrados en el binario, instalables en cualquier asistente de codificación de IA con `pup skills install`.
- [**Servidor ACP**][7]: `pup acp serve` ejecuta un servidor de agente de IA local que conecta herramientas de codificación con Datadog Bits AI a través de ACP y protocolos compatibles con OpenAI.

## Autenticación {#authentication}

Pup admite métodos de autenticación OAuth2 y clave de API. Se prefiere OAuth2; ejecute `pup auth login` para autenticarse a través de su navegador. Si OAuth2 no está disponible, Pup recurre a claves de API (`DD_API_KEY` y `DD_APP_KEY`). Consulte la [documentación de autenticación][8] para obtener más detalles.

## Flags globales {#global-flags}

| Flag | Descripción |
|------|-------------|
| `-o, --output` | Formato de salida (`json`, `table`, `yaml`). Predeterminado: `json` |
| `-y, --yes` | Omitir las solicitudes de confirmación para operaciones destructivas |
| `--agent` | Habilitar el modo agente |
| `--no-agent` | Deshabilitar el modo agente |
| `--read-only` | Bloquear todas las operaciones de escritura (crear, actualizar, eliminar) |
| `--org <org>` | Usar un perfil de organización con nombre para flujos de trabajo de cuentas múltiples (ejecute `pup auth login --org` para configurar) |
| `-h, --help` | Imprimir ayuda |

## Variables de entorno {#environment-variables}

| Variable | Descripción |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Token Bearer para [autenticación sin estado][10] |
| `DD_API_KEY` | Clave de Datadog API (opcional si usa OAuth2 o `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Clave de aplicación de Datadog (opcional si usa OAuth2 o `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Sitio de Datadog (predeterminado: `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Aprobar automáticamente operaciones destructivas (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Backend de almacenamiento de tokens (`keychain` o `file`, predeterminado: detección automática) |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/pup
[2]: https://github.com/DataDog/pup/releases/latest
[3]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-mode
[5]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[6]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[7]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
[8]: https://github.com/DataDog/pup/blob/main/README.md#authentication
[9]: /es/api/latest/
[10]: https://github.com/DataDog/pup#bearer-token-authentication-wasm--headless