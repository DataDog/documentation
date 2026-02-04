---
description: Aprende a instalar y configurar el servidor MCP de Datadog para conectar
  tus agentes de IA a las herramientas y datos de capacidad de observación de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Conecta tus agentes de IA a las herramientas y el contexto de Datadog mediante
    el servidor MCP de Datadog.
- link: bits_ai/mcp_server
  tag: Documentación
  text: Servidor MCP de Datadog
- link: developers/ide_plugins/vscode/?tab=cursor
  tag: Documentación
  text: Extensión para Cursor de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depuración de problemas de producción en directo con la extensión Cursor de
    Datadog
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI: integración de Codex CLI para DevOps asistidos por IA'
title: Configurar el servidor MCP de Datadog
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
El servidor MCP de Datadog está en vista previa. El uso del servidor MCP de Datadog durante la vista previa es gratuito. Si estás interesado en esta función y necesitas acceso, completa este formulario. Más información sobre el servidor MCP en el <a href="https://www.datadoghq.com/blog/datadog-remote-mcp-server/">blog de Datadog </a>.
{{< /callout >}}

## Descargo de responsabilidad

- El servidor MCP de Datadog no es compatible con el uso en producción durante la vista previa.
- Solo las organizaciones de Datadog que hayan sido específicamente autorizadas pueden utilizar el Servidor MCP de Datadog. No está disponible para el público en general.
- El servidor MCP de Datadog no está disponible para organizaciones que requieran el cumplimiento de HIPAA.
- Datadog recopila determinada información sobre el uso que haces del Servidor MCP remoto de Datadog, incluida la forma en que interactúas con él, si se han producido errores al utilizarlo, cuál ha sido la causa de dichos errores e identificadores de usuario, de conformidad con la <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Política de privacidad de Datadog </a> y <a href="https://www.datadoghq.com/legal/eula/" target="_blank">el EULA</a> de Datadog. Estos datos se utilizan para ayudar a mejorar el rendimiento y las funciones del servidor, incluidas las transiciones hacia y desde el servidor y la page (página) de inicio de sesión de Datadog aplicable para acceder a los Servicios y el contexto (por ejemplo, los avisos al usuario) que conducen al uso de las herramientas de MCP. Los datos se almacenan durante 120 días.

## Información general

El servidor MCP gestionado por Datadog actúa como puente entre tus datos de capacidad de observación en Datadog y los agentes de IA compatibles con el [Protocolo de Contexto de Modelo (MCP)][1]. Al proporcionar acceso estructurado a los contextos, funciones y herramientas pertinentes de Datadog, el servidor MCP te permite consultar y recuperar información de capacidad de observación directamente desde clientes de IA como Cursor, OpenAI Codex, Claude Code o tu propio agente de IA.

Esta page (página) proporciona instrucciones para conectar tu agente de IA al servidor MCP de Datadog, enumera las herramientas disponibles e incluye ejemplos de avisos.

Esta demostración muestra el Servidor MCP de Datadog mientras se utiliza en Cursor y Claude Code (desactiva el silencio para el audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demostración del servidor MCP de Datadog en Cursor y Claude Code" video="true" >}}

## Compatibilidad con los clientes

Los siguientes clientes de la IA son compatibles con el servidor MCP de Datadog.

<div class="alert alert-info">El servidor MCP de Datadog se encuentra en fase de desarrollo, por lo que es posible que aparezcan otros clientes compatibles.</div>

| Cliente | Desarrollador | Notas |
|--------|------|------|
| [Cursor][8] | Anysphere | Se recomienda la [extensión Cursor y VS Code](#connect-in-cursor-and-vs-code) de Datadog. |
| [Claude Code][5] | Anthropic | |
| [Claude Desktop][6] | Anthropic | Compatibilidad limitada para la autenticación remota. Utiliza la [autenticación binaria local](?tab=localbinaryauthentication#connect-in-supported-ai-clients) según sea necesario. |
| [Codex CLI][7] | OpenAI | |
| [VS Code][11] | Microsoft | Se recomienda la [extensión Cursor y VS](#connect-in-cursor-and-vs-code) de Datadog. |
| [Goose][9] | Bloque | |
| [Q CLI][10] | Amazon | Para la autenticación remota, añade `"oauthScopes": []` a la [configuración] del servidor(?tab=remoteauthentication#example-configurations). |
| [Cline][18] | Cline Bot | Compatibilidad limitada para la autenticación remota. Utiliza la [autenticación binaria local](?tab=localbinaryauthentication#connect-in-supported-ai-clients) según sea necesario. |

## Requisitos

Los usuarios de Datadog deben tener el [permiso][19] `Incidents Read` para utilizar el Servidor MCP.

## Conectar en Cursor y VS Code

La [extensión de Cursor y VS Code][12] de Datadog incluye acceso integrado al servidor MCP gestionado de Datadog. Las ventajas incluyen:

* No es necesaria ninguna otra configuración del el servidor MCP después de instalar la extensión y conectarse a Datadog.
* Transiciones con un solo clic entre varias organizaciones de Datadog.
* [Solo Cursor] Mejores correcciones de **Fix in Chat** en Code Insights (problemas de Error Tracking, vulnerabilidades de código y vulnerabilidades de bibliotecas), informadas por contexto desde el Servidor MCP.

Para instalar la extensión:

1. Si previamente instalaste manualmente el Servidor MCP de Datadog, elimínalo de la configuración del IDE para evitar conflictos. Para encontrar la configuración del Servidor MCP:
   - Cursor: Ve a **Cursor Settings** (Configuración de Cursor) (`Shift` + `Cmd/Ctrl` + `J`) y selecciona la pestaña **MCP**.
   - VS Code: Abre la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`) y ejecuta `MCP: Open User Configuration`.
2. Instala la extensión de Datadog siguiendo [estas instrucciones][14]. Si ya tienes instalada la extensión, asegúrate de que sea la última versión, ya que periódicamente se publican nuevas funciones.
3. Inicia sesión en tu cuenta de Datadog. Si tienes varias cuentas, utiliza la cuenta incluida en tu vista previa del producto.
    {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Inicia sesión en Datadog desde la extensión del IDE" style="width:70%;" >}}
4. **Reinicia el IDE.
5. Confirma que el servidor MCP de Datadog esté disponible y que las [herramientas](#available-tools) aparezcan en tu IDE:
    - Cursor: Ve a **Cursor Settings** (Configuración de Cursor) (`Shift` + `Cmd/Ctrl` + `J`) y selecciona la pestaña **MCP**.
    - VS Code: Abre el panel del chat, selecciona el modo agente y haz clic en el botón **Configure Tools** (Configurar herramientas).
       {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón Configurar herramientas en VS Code" style="width:70%;" >}}

## Conectar en clientes de IA compatibles

Las siguientes instrucciones son para todos los [clientes compatibles con MCP](#client-compatibility). Para Cursor o VS Code, utiliza la [extensión de Datadog ](#connect-in-cursor-and-vs-code) para un acceso integrado al Servidor MCP de Datadog.

{{< tabs >}}
{{% tab "Autenticación remota" %}}
Este método utiliza el mecanismo de transmisión [HTTP transmisible][1] de la especificación de MCP para conectarse al Servidor MCP.

Dirige tu agente de IA al endpoint del servidor MCP para tu [sitio regional de Datadog ][2]. Por ejemplo, si utilizas `app.datadoghq.com` para acceder a Datadog, utiliza el endpoint del sitio US1.

Si tu organización utiliza un [subdominio personalizado][3], utiliza el endpoint que corresponda a tu sitio regional de Datadog. Por ejemplo, si tu subdominio personalizado es `myorg.datadoghq.com`, utiliza el endpoint US1.

| Sitio web de Datadog | Endpoint del servidor MCP |
|--------|------|
| **US1** (`app.datadoghq.com`) | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US3** (`us3.datadoghq.com`) | `https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US5** (`us5.datadoghq.com`) | `https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp` |
| **UE1** (`app.datadoghq.eu`) | `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp` |
| **AP1** (`ap1.datadoghq.com`) | `https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp` |
| **AP2** (`ap2.datadoghq.com`) | `https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp` |

### Ejemplos de configuraciones

Estos ejemplos corresponden al sitio US1:

* **Línea de comandos: Para Claude Code, ejecuta:
  ```bash
  claude mcp add --transport http datadog-mcp https://mcp.datadoghq.com/api/unstable/mcp-server/mcp
  ```

* **Archivo de configuración**: Edita el archivo de configuración de tu agente de IA:
  * Codex CLI: `~/.codex/config.toml`
  * Gemini CLI: `~/.gemini/settings.json`

  ```json
  {
    "mcpServers": {
      "datadog": {
        "type": "http",
        "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp"
      }
    }
  }
  ```
  * Amazon Q CLI: `~/.aws/amazonq/default.json`

  ```json
  {
    "mcpServers": {
      "datadog": {
        "type": "http",
        "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp",
        "oauthScopes": []
      }
    }
  }
  ```

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
[2]: /es/getting_started/site/
[3]: /es/account_management/multi_organization/#custom-sub-domains
{{% /tab %}}

{{% tab "Autenticación binaria local" %}}

Este método utiliza el mecanismo de transmisión [stdio][1] de la especificación de MCP para conectarse al servidor MCP.

Utiliza esta opción si no dispones de autenticación remota directa. Tras la instalación, normalmente no es necesario actualizar el binario local para beneficiarse con las actualizaciones del servidor MCP, ya que las herramientas son remotas.

1. Instala el binario del Servidor MCP de Datadog:
    * macOS y Linux:
      ```bash
      curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
      ```

      Esto instala el binario del Servidor MCP en `~/.local/bin/datadog_mcp_cli` y entonces puedes utilizarlo como cualquier otro servidor MCP stdio.<br/><br/>

    * Windows: Descarga la [versión Windows][2].

2. Ejecuta `datadog_mcp_cli login` manualmente para recorrer el flujo de inicio de sesión de OAuth.

    El servidor MCP inicia automáticamente el flujo de OAuth si un cliente lo necesita, pero hacerlo manualmente te permite elegir un [sitio Datadog][3] y evitar que el cliente de IA se desconecte.

3. Configura tu cliente de IA para utilizar el Servidor MCP de Datadog. Sigue las instrucciones de configuración de tu cliente, ya que la configuración del Servidor MCP varía entre clientes de IA de terceros.

    Por ejemplo, para Claude Code, añade esto a `~/.claude.json`, asegúrate de sustituir `<USERNAME>` en la ruta del comando:

      ```json
      {
        "mcpServers": {
          "datadog": {
            "type": "stdio",
            "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
            "args": [],
            "env": {}
          }
        }
      }
      ```

    Alternativamente, también puedes configurar Claude Code ejecutando lo siguiente:
      ```bash
      claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
      ```

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
[2]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[3]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

### Autenticación

El servidor MCP utiliza OAuth 2.0 para la [autenticación][2]. Si no puedes pasar por el flujo de OAuth (por ejemplo, en un servidor), puedes proporcionar una [clave de API y clave de aplicación][3] de Datadog como `DD_API_KEY` y `DD_APPLICATION_KEY` encabezados HTTP. Por ejemplo:

{{< code-block lang="json" >}}
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp",
      "headers": {
          "DD_API_KEY": "<YOUR_API_KEY>",
          "DD_APPLICATION_KEY": "<YOUR_APPLICATION_KEY>"
      }
    }
  }
}
{{< /code-block >}}

### Test de acceso al servidor MCP

1. Instala el [inspector de MCP][4], una herramienta de desarrollo para testing y depuración de servidores MCP.

    ```bash
    npx @modelcontextprotocol/inspector
    ```
2. En la interfaz web del inspector, en **Transport Type** (Tipo de transmisión), selecciona **Streamable HTTP** (HTTP transmisible).
3. En **URL**, introduce la [URL del servidor MCP](?tab=remoteauthentication#connect-in-supported-ai-clients) de tu sitio regional de Datadog.
4. Haz clic en **Connect** (Conectar), luego ve a **Tools** (Herramientas) > **List Tools** (Enumerar herramientas).
5. Check si aparecen las [herramientas disponibles](#available-tools).

## Conjuntos de herramientas

El servidor MCP de Datadog admite _conjuntos de herramientas_, que te permiten utilizar solo las herramientas que necesitas, ahorrando un valioso espacio en la ventana contextual. Estos conjuntos de herramientas están disponibles:

- `core`: El conjunto de herramientas predeterminado
- `synthetics`: Herramientas para interactuar con [tests de Synthetic Monitoring][21] de Datadog

Para utilizar un conjunto de herramientas, incluye el parámetro de consulta `toolsets` en la URL del endpoint al conectarte al servidor MCP ([autenticación remota](?tab=remote-authentication#connect-in-supported-ai-clients) únicamente). Por ejemplo

- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` recupera solo las herramientas básicas (es el valor predeterminado si no se especifica `toolsets` ).
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=synthetics` recupera solo las herramientas relacionadas con tests de Synthetic Monitoring.
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=core,synthetics` recupera las herramientas de tests básicas y de Synthetic Monitoring.

## Herramientas disponibles

En esta sección se enumeran las herramientas disponibles en el servidor MCP de Datadog y se ofrecen avisos de cómo utilizarlas.

<div class="alert alert-info">Las herramientas del servidor MCP de Datadog se encuentran en fase de desarrollo y están sujetas a cambios. Utiliza <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">este formulario de comentarios</a> para compartir cualquier comentario, casos de uso o problemas encontrados con sus avisos y consultas.</div>

### `search_datadog_docs`
*Toolset: **core***\
Devuelve respuestas generadas por IA a preguntas de Datadog, extraídas de la [documentación de Datadog][15].
- ¿Cómo se activa la generación de perfiles de Datadog en Python?
- ¿Cuál es la mejor manera de correlacionar logs y traces (trazas)?
- ¿Cómo funciona la instrumentación automática de RUM?

### `search_datadog_events`
*Toolset: **core***\
Busca eventos como alertas en monitor (noun), notificaciones de despliegue, cambios en la infraestructura, hallazgos de seguridad y cambios en el estado de los servicios.

- Muestra todos los eventos de despliegue de las últimas 24 horas.
- Busca eventos relacionados con nuestro entorno de producción con estado de error.
- Obtén los eventos etiquetados con `service:api` de la última hora.

**Nota**: Consulta la [API de Event Management][16] para obtener más detalles.

### `get_datadog_incident`
*Toolset: **core***\
Recupera información detallada sobre un incident (incidente).

- Obtén información detallada para el incident (incidente) ABC123.
- ¿Cuál es la situación del incident (incidente) ABC123?
- Recupera la información completa sobre el incident (incidente) Redis de ayer.

**Nota**: La herramienta está operativa, pero no incluye datos cronológicos del incident (incidente).

### `get_datadog_metric`
*Toolset: **core***\
Consulta y analiza datos de métricas históricas o en tiempo real, que admiten consultas y agregaciones personalizadas.

- Muéstrame las métricas de utilización de CPU de todos los hosts en las últimas 4 horas.
- Obtén métricas de latencia de Redis del entorno de producción.
- Despliega las tendencias de uso de memoria de nuestros servidores de bases de datos.

### `search_datadog_monitors`
*Toolset: **core***\
Recupera información sobre los monitores de Datadog, incluidos sus estados, umbrales y condiciones de alerta.

- Enumera todos los monitores que están alertando actualmente.
- Muéstrame monitores relacionados con nuestro servicio de pagos.
- Busca monitores etiquetados con `team:infrastructure`.

### `get_datadog_trace`
*Toolset: **core***\
Obtiene una trace (traza) completa de Datadog APM con un identificador de trace (traza).

- Obtén la trace (traza) completa del identificador 7d5d747be160e280504c099d984bcfe0.
- Muéstrame todos los spans (tramos) de la trace (traza) abc123 con información de tiempo.
- Recupera detalles de trace (traza) que incluyen consultas a la base de datos del identificador xyz789.

**Nota**: Las traces (trazas) grandes con miles de spans (tramos) pueden quedar truncadas (e indicarse como tales) sin una forma de recuperar todos los spans (tramos).

### `search_datadog_dashboards`
*Toolset: **core***\
Enumera los dashboards disponibles y los detalles claves de Datadog.

- Muéstrame todos los dashboards disponibles en nuestra cuenta.
- Enumera los dashboards relacionados con la monitorización de la infraestructura.
- Encuentra dashboards compartidos para el equipo de ingeniería.

**Nota**: Esta herramienta enumera los dashboards pertinentes, pero ofrece detalles limitados sobre su contenido.

### `search_datadog_hosts`
*Toolset: **core***\
Enumera y proporciona información sobre los hosts monitorizados, que admite filtrado y búsqueda.

- Muéstrame todos los hosts de nuestro entorno de producción.
- Enumera los hosts incorrectos que no han informado en la última hora.
- Obtén todos los hosts etiquetados con `role:database`.

### `search_datadog_incidents`
*Toolset: **core***\
Recupera una lista de incidentes de Datadog, incluido su estado, gravedad y metadatos.

- Muéstrame todos los incidentes activos por gravedad.
- Enumera los incidentes resueltos la semana pasada.
- Encuentra incidentes que afecten a los clientes.

### `search_datadog_metrics`
*Toolset: **core***\
Enumera las métricas disponibles, con opciones de filtrado y metadatos.

- Muéstrame todas las métricas disponibles de Redis.
- Enumera las métricas relacionadas con la CPU de nuestra infraestructura.
- Busca métricas etiquetadas con `service:api`.

### `search_datadog_services`
*Toolset: **core***\
Enumera los servicios del Software Catalog de Datadog con detalles e información del equipo.

- Muéstrame todos los servicios de nuestra arquitectura de microservicios.
- Enumera los servicios propiedad del equipo de la plataforma.
- Busca servicios relacionados con el procesamiento de pagos.

### `search_datadog_spans`
*Toolset: **core***\
Recupera spans (tramos) de las traces (trazas) de APM con filtros como servicio, hora, recurso, etc.

- Muéstrame spans (tramos) con errores del servicio de pagos.
- Busca consultas lentas a la base de datos en los últimos 30 minutos.
- Obtén los spans (tramos) de las solicitudes de API fallidas a nuestro servicio de pagos.

### `search_datadog_logs`
*Toolset: **core***\
Busca en logs con filtros (hora, consulta, servicio, host, nivel de almacenamiento, etc.) y devuelve los detalles de logs. Renombrado de `get_logs`.

- Muéstrame logs de error del servicio NGINX en la última hora.
- Busca logs que contengan 'tiempo de espera de la connection (conexión)' de nuestro servicio de API.
- Obtén los 500 logs de códigos de estado de la producción.

### `search_datadog_rum_events`
*Toolset: **core***\
Busca eventos de RUM de Datadog mediante la utilización de una sintaxis de consulta avanzada.

- Muestra errores y advertencias de la consola de JavaScript en RUM.
- Busca las páginas que se cargan lentamente (más de 3 segundos).
- Muestra las interacciones recientes de los usuarios en las páginas de detalles de los productos.

### `get_synthetics_tests`
*Toolset **sintéticos***\
Busca tests de Synthetic Monitoring de Datadog.

- Ayúdame a comprender por qué el test de Synthetic Monitoring en el endpoint `/v1/my/tested/endpoint` está fallando.
- Hay una interrupción; busca todos los tests de Synthetic Monitoring que fallan en el dominio `api.mycompany.com`.
- ¿Siguen funcionando los tests de Synthetic Monitoring en mi sitio web `api.mycompany.com` en la última hora?

### `edit_synthetics_tests`
*Tooset: **sintética***\
Edita tests de la API de HTTP de Synthetic Monitoring de Datadog.

- Mejora las afirmaciones del test de Synthetic Monitoring definido en mi endpoint `/v1/my/tested/endpoint`.
- Pon en pausa el test `aaa-bbb-ccc` y configura las ubicaciones solo en lugares europeos.
- Añade la etiqueta de mi equipo al test `aaa-bbb-ccc` .

### `synthetics_test_wizard`
*Toolset: **synthetics***\
Previsualiza y crea tests de la API de HTTP de Synthetic Monitoring de Datadog.

- Crea tests de Synthetic Monitoring en cada endpoint definido en este archivo de código.
- Crea un test de Synthetic Monitoring en `/path/to/endpoint`.
- Crea un test de Synthetic Monitoring que compruebe si mi dominio `mycompany.com` permanece activo.

## Eficiencia del contexto

El servidor MCP de Datadog se optimiza para proporcionar respuestas de forma que los agentes de IA obtengan el contexto pertinente sin sobrecargarse con información innecesaria. Por ejemplo:

- Las respuestas se truncan en función de la longitud estimada de las respuestas que proporciona cada herramienta. Las herramientas responden a los agentes de IA con instrucciones sobre cómo solicitar más información si la respuesta estaba truncada.
- La mayoría de las herramientas tienen un parámetro `max_tokens` que permite a los agentes de IA solicitar menos o más información.

## Rastrea las llamadas a herramientas en Audit Trail

Puedes ver información sobre las llamadas realizadas por las herramientas del servidor MCP en [Audit Trail][17] de Datadog. Busca o filtra por el nombre del evento `MCP Server`.

## Comentarios

El servidor MCP de Datadog se encuentra en fase de desarrollo. Durante la vista previa, utiliza [este formulario de comentarios][20] para compartir comentarios, casos de uso o problemas encontrados con sus avisos y consultas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[3]: /es/account_management/api-app-keys/
[4]: https://github.com/modelcontextprotocol/inspector
[5]: https://www.anthropic.com/claude-code
[6]: https://claude.ai/download
[7]: https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started
[8]: https://www.cursor.com/
[9]: https://github.com/block/goose
[10]: https://github.com/aws/amazon-q-developer-cli
[11]: https://code.visualstudio.com/
[12]: /es/developers/ide_plugins/vscode/
[13]: https://nodejs.org/en/about/previous-releases
[14]: /es/developers/ide_plugins/vscode/?tab=cursor#installation
[15]: /es/
[16]: /es/api/latest/events/
[17]: /es/account_management/audit_trail/
[18]: https://cline.bot/
[19]: /es/account_management/rbac/permissions/#case-and-incident-management
[20]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[21]: /es/synthetics/