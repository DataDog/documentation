---
description: Instrumente sus aplicaciones con Datadog utilizando la AI Setup CLI o
  el Datadog MCP Server.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: Blog
  text: Instrumente aplicaciones Serverless con Agentic Onboarding.
title: Agentic Onboarding Setup.
---
## Descripción general {#overview}

Agentic Onboarding is a set of AI-driven tools that automate instrumentación de Datadog for your applications and infrastructure:

- [AI Setup CLI](#ai-setup-cli): Configure Datadog from a terminal, without a coding assistant.
- [Datadog MCP Server](#mcp-server): Configure Datadog a través de un asistente de codificación (como Claude Code o Cursor), que maneja la detección y configuración del framework desde su IDE.

Ambas rutas son complementarias y utilizan la misma cuenta de Datadog. Puede instalar el Datadog MCP Server en su IDE y ejecutar la CLI en una terminal.

## AI Setup CLI {#ai-setup-cli}

El Datadog AI Setup CLI es una herramienta de terminal independiente. Úsela cuando no desee instalar un Datadog MCP Server, o para tareas que el MCP setup no admite, como crear una cuenta de Datadog.

La CLI puede:

- Crear una cuenta de Datadog de principio a fin desde la terminal
- Vincular una cuenta de Datadog existente a su entorno local
- Instrumentar infraestructura local como código (Terraform, Helm, Kustomize, Ansible, Pulumi, manifiestos de Kubernetes sin procesar, archivos de Docker Compose) editando archivos en el lugar
- Instrumentar código de aplicación local agregando la inicialización y configuración del SDK para los frontends y backends compatibles

### Requisitos previos {#prerequisites}

- Node.js 22 o posterior

### Productos compatibles {#supported-products}

La CLI puede configurar los siguientes productos:

| Product | Identifier |
|---------|------------|
| App and API Protection | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Seguimiento de errores | `error-tracking` |
| Infrastructure Monitoring | `infra-monitoring` |
| Linux | `linux` |
| Agent Observability | `llm-obs` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring (RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Optimización de pruebas | `test-optimization` |

### Install and run the CLI {#install-and-run-the-cli}

1. Run the CLI with `npx`, passing `--site` to target your [Datadog site][16]. Tiene dos opciones, dependiendo de si ya tiene una cuenta de Datadog:

    **Opción 1: Configuración interactiva.** Si aún no tiene una cuenta de Datadog, o desea elegir su producto de forma interactiva, ejecute sin el flag `--product`. La CLI lo guía a través de la configuración de la cuenta y la elección del producto.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com
    ```

    Replace the value of `--site` with the [Datadog site][16] for your account: `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, or `ap2.datadoghq.com`.

    **Option 2: Direct setup.** If you already have a Datadog account and want to install a specific product, pass `--product` to skip product selection.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
    ```

    - Replace the value of `--site` with the [Datadog site][16] for your account.
    - Replace `<PRODUCT>` with one of the [supported products](#supported-products).

1. Presione <kbd>Enter</kbd> en la pantalla de bienvenida y elija si tiene una cuenta de Datadog. Se abre un navegador para OAuth (o para la creación de una cuenta si aún no tiene una). Complete el flujo y otorgue acceso a su cuenta de Datadog.

1. If you ran the CLI without `--product`, select what to set up from the product menu. (La configuración directa con `--product` omite este menú).

   {{< img src="agentic_onboarding/product-selection.png" alt="CLI menu 'What would you like to set up?' agrupados por Infrastructure and Backend monitoring, Frontend Monitoring, LLM-Based applications y CI Testing." style="width:80%;" >}}

   La CLI detecta los frameworks de su proyecto, aplica la configuración requerida y aprovisiona las variables de entorno necesarias. El progreso se informa etapa por etapa.

   {{< img src="agentic_onboarding/setup-example.png" alt="CLI que muestra 'Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring)' con pasos de progreso." style="width:80%;" >}}

   Cuando se completa la configuración, la CLI enumera los productos que instrumentó y proporciona enlaces a la interfaz de usuario de Datadog para verificar los datos entrantes.

   {{< img src="agentic_onboarding/success.png" alt="CLI que muestra 'Setup complete!' con marcas de verificación junto a RUM, Error Tracking y Product Analytics." style="width:80%;" >}}

1. Commit los cambios en su repositorio. Puede editar las variables de entorno de Datadog (claves de API, ID de aplicación) para su entorno específico.

Después de que la CLI finalice, consulte [Next steps](#next-steps).

## Datadog MCP Server {#mcp-server}

El Datadog MCP Server expone el conjunto de herramientas `onboarding` a cualquier asistente de codificación compatible con MCP. Después de instalar y autenticar el servidor, instrumenta un proyecto escribiendo un one-line prompt. El Agent lee su código, llama a las herramientas MCP (con su permiso), aplica cambios y verifica el resultado.

### Prerequisites {#prerequisites-1}

- Un asistente de codificación compatible con MCP, como [Claude Code][17] o [Cursor][18]
- Una cuenta de Datadog

### Supported frameworks {#supported-frameworks}

| Product | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes Observability | Helm, Kustomize, raw manifests, Terraform, Pulumi, Ansible (en GKE, EKS, AKS, minikube y otros como kind, k3s y OpenShift) |
| Docker Observability | `docker-compose` and sidecar (`docker run`) deployments; Terraform, Ansible, and other IaC (Pulumi, CloudFormation, Puppet, Chef) |
| Linux Observability | Terraform, Ansible, other IaC (Pulumi, CloudFormation, Puppet, Chef), and plain-shell install |
| Serverless Monitoring (AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run and Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform, Bicep, ARM template, `azure.yaml` (azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK (auto-detected from project dependencies) |
| OpenTelemetry | Node.js / server-side TS, Browser JS / React / Vite, Python (Django, Flask, FastAPI), Java, Go |
| App and API Protection | Python, Node.js, Java, Go, Ruby, .NET, PHP, and proxies (Envoy, HAProxy) for Linux, Windows, Kubernetes, Docker, GCP Cloud Run, and AWS Lambda, AWS Fargate/ECS |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

### Paso 1: Install the Datadog MCP Server {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
En una sesión activa de Claude Code, ejecute:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1: Install deeplink (recommended)**

Haga clic en el install deeplink para su [Datadog site][1], luego confirme {{< ui >}}Install{{< /ui >}} para el **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server when Cursor opens.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Option 2: Manual configuration**

Add the Datadog MCP Server to `~/.cursor/mcp.json`:

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>

[1]: /es/getting_started/site/

{{% /tab %}}

{{% tab "Other MCP clients" %}}

Cualquier MCP client que admita transporte HTTP puede conectarse al Datadog MCP Server. Apúntelo al punto de conexión de su [Datadog site][1]:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Paso 2: Authenticate the Datadog MCP Server {#step-2-authenticate-the-mcp-server}

1. Después de instalar el Datadog MCP Server, su coding assistant le pedirá que se autentique. Presione <kbd>Enter</kbd> para abrir la pantalla de OAuth de Datadog en su navegador.
1. Una vez completada la autenticación, elija {{< ui >}}Open{{< /ui >}} para volver a su IDE y otorgar al servidor MCP acceso a su cuenta de Datadog.
1. Confirme que las herramientas MCP aparezcan bajo **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server.

### Paso 3: Instrumente su proyecto {#step-3-instrument-your-project}

Envíe el prompt que corresponda al producto que desea configurar:

{{< tabs >}}
{{% tab "Error Tracking" %}}
{{< code-block lang="text" >}}Add Datadog Error Tracking to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Real User Monitoring" %}}
{{< code-block lang="text" >}}Add Datadog Real User Monitoring to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Product Analytics" %}}
{{< code-block lang="text" >}}Add Datadog Product Analytics to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Infrastructure Monitoring" %}}

**Kubernetes**
{{< code-block lang="text" >}}Add Datadog for Kubernetes to my project{{< /code-block >}}

**Docker**
{{< code-block lang="text" >}}Add Datadog for Docker to my project{{< /code-block >}}

{{% /tab %}}

{{% tab "App and API Protection (Preview)" %}}
<div class="alert alert-info">El agentic onboarding para App and API Protection está en Public Preview.</div>

{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**Contenedores de GCP Cloud Run**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**Funciones de GCP Cloud Run**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

El agente detecta su stack, solicita permiso antes de cada llamada a la tool, aplica cambios localmente (sin hacer commit de ellos) e imprime los pasos de verificación.

Una vez que el agente termine, haga commit de los cambios en su repositorio y establezca cualquier variable de entorno nueva (claves de API, IDs de aplicación) en su entorno de producción. Luego consulte [Next steps](#next-steps) para confirmar que los datos fluyen.

## Próximos pasos {#next-steps}

Confirme que los datos fluyen en Datadog UI para el producto que configuró:

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /es/getting_started/site/
[17]: https://www.anthropic.com/claude-code
[18]: https://cursor.com/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}