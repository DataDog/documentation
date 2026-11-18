---
description: Conecte agentes de codificación, agentes de conocimiento y herramientas
  de productividad a Datadog Agent Console, y asigne identidades de usuario entre
  herramientas.
further_reading:
- link: /ai_agents_console/
  tag: Documentación
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentación
  text: Integración de uso y costos de Anthropic
- link: /integrations/openai-codex/
  tag: Documentación
  text: Integración con OpenAI Codex
- link: /integrations/openai/
  tag: Documentación
  text: Integración con OpenAI
- link: /integrations/cursor/
  tag: Documentación
  text: Integración de Cursor
- link: https://github.com/datadog-labs/trajectory
  tag: Código fuente
  text: Trajectory
title: Configurar Agent Console
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console está disponible para todos los clientes de Datadog en Preview.
{{< /callout >}}

Para configurar [Agent Console][1], conecte las herramientas de IA de las que desea hacer un seguimiento, conecte opcionalmente herramientas de productividad y asigne identidades de usuario entre herramientas. La página {{< ui >}}Setup{{< /ui >}} en Agent Console {{< ui >}}Settings{{< /ui >}} rastrea su progreso a través de cada paso.

{{< img src="/ai_agents_console/setup_agent_console.png" alt="Página Settings Setup de Agent Console con una barra de progreso y pasos para validar sus datos, asignar identidades, conectar su primer agente y conectar herramientas de productividad" style="width:100%;" >}}

## Permisos {#permissions}

El acceso a Agent Console está controlado por los siguientes permisos de rol. Asígnelos a roles en [Organization Settings > Roles][2].

| Permiso | Descripción |
|------------|-------------|
| `agent_console_read` | Ver Agent Console, incluyendo Overview, My Usage, Usage y Settings. Los usuarios sin este permiso no pueden abrir Agent Console. |
| `agent_console_write` | Cambiar la configuración de Agent Console, como la asignación de identidades y la configuración de integraciones. |

## Conectar herramientas de IA {#connect-ai-tools}

Seleccione las herramientas de IA que desea conectar desde la página {{< ui >}}Set up your AI tools{{< /ui >}}, la cual aparece la primera vez que abre Agent Console. Conecte al menos una herramienta para comenzar a ver datos. Puede agregar más herramientas más adelante.

{{< img src="/ai_agents_console/agent_console_onboarding.png" alt="Página Set up your AI tools con tarjetas para Trajectory, Cursor, Anthropic Products, GitHub Copilot, Codex, Microsoft Copilot, ChatGPT Work y Another Integration" style="width:100%;" >}}

### Productos de Anthropic {#anthropic-products}

Para hacer un seguimiento de Claude Code, Claude Chat, Claude Cowork y Claude Design, configure la integración [Anthropic Usage and Costs][3]. La integración recopila el gasto diario y las analíticas de usuario para cada producto de Claude.

La integración Anthropic Usage and Costs no es compatible con los planes Claude Team. Si su organización utiliza un plan Team, envíe la telemetría de Claude Code a Datadog con [OpenTelemetry](#claude-code-with-opentelemetry) en su lugar.

### Claude Code con OpenTelemetry {#claude-code-with-opentelemetry}

Utilice OpenTelemetry (OTLP) para enviar la telemetría de Claude Code directamente a Datadog. Los datos recopilados de esta manera aparecen en la tarjeta {{< ui >}}Claude Code (OTel){{< /ui >}} en Agent Console.

Para configurar Agent Console para Claude Code en toda su organización, su equipo de TI puede usar un sistema de administración de dispositivos móviles (MDM) o [configuraciones administradas por servidor][4] para distribuir el archivo de configuración de Claude Code en todos los dispositivos administrados.

{{< tabs >}}
{{% tab "Enviar directamente a Datadog" %}}

1. Asegúrese de que su [configuración de registros][1] incluya un [índice][2] general, o un índice que cubra `service:claude-code`.
2. Genere una [clave de API de Datadog][3].
3. Establezca las siguientes variables de entorno en su archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}",
       "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.
4. Restart Claude Code.

[1]: /es/logs/log_configuration/
[2]: /es/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Reenvío a través del Datadog Agent" %}}

1. Asegúrese de que su [configuración de registros][1] incluya un [índice][2] general, o un índice que cubra `service:claude-code`.
2. [Instale el Datadog Agent][3].
3. Configure su Datadog Agent para habilitar el OpenTelemetry Collector:
   ```yaml
   otlp_config:
     receiver:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
     logs:
       enabled: true
   otelCollector:
     enabled: true
   ```
4. Establezca las siguientes variables de entorno en su archivo de configuración de Claude Code (por ejemplo, `~/.claude/settings.json`):
   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:4317",
       "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
       "OTEL_METRIC_EXPORT_INTERVAL": "10000"
     }
   }
   ```
5. Reinicie Claude Code.

[1]: /es/logs/log_configuration/
[2]: /es/logs/log_configuration/indexes/
[3]: /es/agent/?tab=Host-based
{{% /tab %}}
{{< /tabs >}}

Después de reiniciar Claude Code, las métricas (uso, costo, latencia, errores) aparecerán en Agent Console en unos minutos.

### Codex {#codex}

Para hacer un seguimiento de Codex, configure la integración de [OpenAI Codex][5]. La integración recopila el uso diario, los créditos, la atribución de código y las analíticas de revisión.

### ChatGPT Work {#chatgpt-work}

Para hacer un seguimiento de ChatGPT Work, configure la integración de [OpenAI][12]. La integración recopila analíticas de actividad, tokens y costo estimado.

### Cursor {#cursor}

Para hacer un seguimiento de Cursor, configure la integración de [Cursor][6] mediante Datadog Extension for Cursor. La integración recopila métricas de gasto y analíticas de usuario una vez al día.

### GitHub Copilot {#github-copilot}

Para hacer un seguimiento de GitHub Copilot, configure la integración de [GitHub Copilot][7]. La integración recopila métricas de gasto y analíticas de usuario una vez al día.

### Microsoft Copilot 365 {#microsoft-copilot-365}

{{< callout url="#" btn_hidden="true" header="Preview">}}
La compatibilidad con Microsoft Copilot 365 está en Preview. Para solicitar acceso, comuníquese con su equipo de cuenta de Datadog.
{{< /callout >}}

La integración de Microsoft Copilot recopila datos diarios de adopción de Microsoft 365 Copilot y análisis de interacción solo de metadatos.

### Otros agentes de codificación y de escritorio con Trajectory {#other-coding-and-desktop-agents-with-trajectory}

[Trajectory][8] es una herramienta de código abierto que captura sesiones de más de 30 agentes de codificación y de escritorio, como Claude Code, Claude Desktop, Codex CLI, Cursor, Cline, Windsurf y Zed, y las envía a Datadog. Para obtener la lista completa y los requisitos de versión, consulte [Clientes compatibles][9].

Los datos de sesión de Trajectory potencian las vistas {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} y {{< ui >}}Sessions{{< /ui >}} en Agent Console.

{{< tabs >}}
{{% tab "Desarrolladores individuales" %}}

Ejecute el instalador para instalar Trajectory para el usuario actual:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh)
```

El instalador descarga la versión más reciente de Trajectory para su plataforma, ejecuta `trajectory setup` y conecta los agentes de codificación que encuentra. Cuando se le solicite, ingrese una [clave de API de Datadog][1] para enviar datos a Datadog.

Para configurar el destino de Datadog más tarde, ejecute:

```bash
trajectory publish destination configure
```

Para actualizar Trajectory, vuelva a ejecutar el instalador.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Flotas administradas (MDM)" %}}

Para implementar Trajectory en las computadoras de los desarrolladores con un producto MDM o UEM como Jamf Pro o Microsoft Intune, siga la [Guía del administrador de endpoints administrados][1]. La guía cubre la preparación del paquete, la implementación de políticas, la selección de agentes de codificación y la verificación.

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Solicitar una integración {#request-an-integration}

Si la herramienta a la que desea hacer un seguimiento no aparece en la lista, haga clic en {{< ui >}}Request an Integration{{< /ui >}} en la página {{< ui >}}Set up your AI tools{{< /ui >}}.

## Conectar herramientas de productividad {#connect-productivity-tools}

Opcionalmente, conecte herramientas de productividad para que Agent Console pueda mostrar las pull requests fusionadas, el tiempo hasta su fusión, el costo por pull request y los problemas resueltos junto con el gasto en IA.

- **GitHub**: Configure la integración de [GitHub][10] para recopilar datos de pull requests.
- **Jira**: Configure la integración de [Jira][11] para recopilar datos de problemas.

## Asignar identidades {#map-identities}

Cada herramienta de IA identifica a los usuarios de manera diferente, por ejemplo, por dirección de correo electrónico, inicio de sesión de GitHub o nombre principal de usuario (UPN) de Microsoft. Cargue una tabla de asignación de identidades para que el uso y el gasto de cada herramienta se atribuyan a la persona correcta.

1. En Agent Console, vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Identity Mapping{{< /ui >}}.
2. Prepare un archivo CSV con una fila por persona y las siguientes columnas:

   | Columna | Requisito |
   |--------|-------------|
   | `email` | Obligatorio |
   | `github_login` | Obligatorio si utiliza GitHub |
   | `microsoft_upn` | Opcional |
   | `jira_account_id` | Opcional |
   | `datadog_handle` | Opcional |

   Separe con puntos y coma los múltiples alias de correo electrónico, nombres de usuario de GitHub o ID de cuenta de Jira. El primer correo electrónico es el correo electrónico canónico.

   Elija cualquier columna con valores únicos, como `email`, como identificador principal. También puede agregar su propia columna para este propósito, como un ID de empleado.
3. Cargue el archivo CSV (máximo 10 MiB), obtenga una vista previa de la asignación y guárdela.

{{< img src="/ai_agents_console/agent_console_identity_mapping.png" alt="Cuadro de diálogo Set up identity mappings que muestra las columnas CSV obligatorias y opcionales y un área de carga de CSV" style="width:100%;" >}}

## Valide sus datos {#validate-your-data}

Después de conectar sus herramientas, abra la [Agent Console][1] y verifique que cada integración conectada aparezca como activa en la pestaña {{< ui >}}Overview{{< /ui >}}. La mayoría de las integraciones recopilan datos una vez al día, por lo que los datos pueden tardar hasta 24 horas en aparecer.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://app.datadoghq.com/organization-settings/roles
[3]: /es/integrations/anthropic-usage-and-costs/
[4]: https://code.claude.com/docs/en/server-managed-settings
[5]: /es/integrations/openai-codex/
[6]: /es/integrations/cursor/?tab=datadogextensionforcursor
[7]: /es/integrations/github-copilot/
[8]: https://github.com/datadog-labs/trajectory
[9]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[10]: /es/integrations/github/
[11]: /es/integrations/jira/
[12]: /es/integrations/openai/?tab=apikey