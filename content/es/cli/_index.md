---
description: Utiliza la interfaz de línea de comandos Pup para interactuar con las
  API de Datadog desde el terminal o flujos de trabajo de agentes de IA.
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Repositorio de Pup CLI
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: Documentación completa de Pup CLI
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: Referencia de comandos
- link: mcp_server/
  tag: Documentación
  text: Servidor MCP de Datadog
title: Pup CLI
---
## Descripción general {#overview}

[Pup CLI][1] es una interfaz de línea de comandos integral, lista para agentes de IA, que brinda a los agentes de IA acceso a la plataforma de observabilidad de Datadog. Expone [la superficie de la API de Datadog][9] para su uso en flujos de trabajo de agentes de IA y pipelines automatizados.

Características clave:

- **Comandos autodetectables**: Los comandos están estructurados para que los agentes puedan navegar por ellos sin documentación externa.
- **Salida estructurada**: Las respuestas están disponibles en JSON y YAML para un parseo confiable.
- **Autenticación con contexto**: OAuth2 y PKCE proporcionan acceso con contexto sin clave de API de larga duración.
- **Amplia cobertura de productos**: Pup admite seguimiento, registros, métricas, RUM, seguridad y más.

<div class="alert alert-info">Esta página cubre las características principales de Pup. Consulte la <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">documentación del repositorio de Pup</a> para la lista completa de características y comandos.</div>

## Instalación {#installation}

### Homebrew (macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### Compilar desde la fuente {#build-from-source}

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### Descarga manual {#manual-download}

Descargue los binarios preconstruidos de la [última versión][2].

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

## Áreas de producto soportadas {#supported-product-areas}

Pup cubre la mayoría de las superficies principales de productos de Datadog. Consulte la [referencia de comandos][3] para la lista canónica de comandos específicos del producto. También puede ejecutar `pup --help` (o `pup agent schema` para salida legible por máquina) para la lista en vivo de comandos tal como se construyó.

| Categoría | Ejemplos |
|----------|----------|
| Observabilidad central | Métricas, registros, eventos, RUM, APM, trazas |
| Monitoreo y Alerting | Monitores, tableros, SLOs, sintéticos, tiempos de inactividad, flujos de trabajo |
| Seguridad y Compliance | Reglas de seguridad, señales, hallazgos, registros de auditoría, amenazas de CSM |
| Infrastructure y Nube | Servidores, etiquetas, contenedores, red, integraciones de AWS/GCP/Azure |
| Incidentes y Operaciones | Incidentes, de guardia, gestión de incidencias, seguimiento de errores, catálogo de servicios |
| CI/CD y Desarrollo | Visibilidad de CI, optimización de pruebas, métricas DORA, puertas de despliegue |
| Organización y Acceso | Usuarios, claves de API, claves de aplicación, organizaciones |
| Plataforma y Configuración | Medición de uso, gestión de costos, feature flags, observability pipelines |

## Modo agente {#agent-mode}

Cuando Pup es invocado por un agente de codificación de IA, cambia automáticamente al modo agente, que devuelve respuestas JSON estructuradas optimizadas para el consumo de máquina. Las respuestas incluyen metadatos, detalles de errores y sugerencias. El modo agente también aprueba automáticamente los mensajes de confirmación.

El modo agente se detecta automáticamente para [agentes de codificación compatibles][4] cuando su variable de entorno está configurada. También puede habilitarlo explícitamente con la bandera `--agent` o configurando `FORCE_AGENT_MODE=1`.

## Características adicionales {#additional-features}

Pup incluye características adicionales que se pueden utilizar en flujos de trabajo de agentes de IA; siga los enlaces a continuación para más información:

- [**Runbooks**][5]: `pup runbooks` es un motor de ejecución local para procedimientos operativos definidos en YAML, codificando tareas de múltiples pasos utilizando `pup`, shell, HTTP y pasos de flujo de trabajo de Datadog.
- [**Agent skills**][6]: Pup incluye habilidades y agentes de dominio integrados en el binario, instalables en cualquier asistente de codificación de IA con `pup skills install`.
- [**ACP server**][7]: `pup acp serve` ejecuta un servidor de agente de IA local que conecta herramientas de codificación a Datadog Bits AI a través de protocolos compatibles con ACP y OpenAI.

## Autenticación {#authentication}

Pup admite métodos de autenticación OAuth2 y claves de API. OAuth2 es preferido; ejecute `pup auth login` para autenticar a través de su navegador. Si OAuth2 no está disponible, Pup recurre a claves de API (`DD_API_KEY` y `DD_APP_KEY`). Consulte la [documentación de autenticación][8] para más detalles.

## Banderas globales {#global-flags}

| Bandera | Descripción |
|------|-------------|
| `-o, --output` | Formato de salida (`json`, `table`, `yaml`). Predeterminado: `json` |
| `-y, --yes` | Omitir mensajes de confirmación para operaciones destructivas |
| `--agent` | Habilitar modo agente |
| `--no-agent` | Deshabilitar modo agente |
| `--read-only` | Bloquear todas las operaciones de escritura (crear, actualizar, eliminar) |
| `--org <org>` | Utilice un perfil de organización nombrado para flujos de trabajo de múltiples cuentas (ejecute `pup auth login --org` para configurar) |
| `-h, --help` | Imprima ayuda |

## Variables de entorno {#environment-variables}

| Variable | Descripción |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Token portador para [autenticación sin estado][10] |
| `DD_API_KEY` | Clave de API de Datadog (opcional si se usa OAuth2 o `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Clave de aplicación de Datadog (opcional si se usa OAuth2 o `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Sitio de Datadog (predeterminado: `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Aprobar automáticamente operaciones destructivas (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Backend de almacenamiento de token (`keychain` o `file`, predeterminado: auto-detección) |

## Lectura adicional {#further-reading}

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