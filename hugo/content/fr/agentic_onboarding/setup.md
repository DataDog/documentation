---
description: Instrumentez vos applications avec Datadog à l’aide de l’AI Setup CLI
  ou du Datadog MCP Server.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: Blog
  text: Instrumentez les applications serverless avec Agentic Onboarding.
title: Agentic Onboarding Setup.
---
## Présentation {#overview}

Agentic Onboarding est un ensemble d’outils pilotés par IA qui automatisent l’instrumentation Datadog pour vos applications et votre infrastructure :

- [AI Setup CLI](#ai-setup-cli) : Configurez Datadog depuis un terminal, sans assistant de codage.
- [MCP Server](#mcp-server) : Configurez Datadog via un assistant de codage (tel que Claude Code ou Cursor), qui gère la détection et la configuration du framework depuis votre IDE.

Les deux chemins sont complémentaires et utilisent le même compte Datadog. Vous pouvez installer le Datadog MCP Server dans votre IDE et exécuter l’CLI dans un terminal.

## AI Setup CLI {#ai-setup-cli}

Le Datadog AI Setup CLI est un outil de terminal autonome. Utilisez-la lorsque vous ne souhaitez pas installer le MCP Server, ou pour des tâches que le MCP Setup ne prend pas en charge, telles que la création d’un compte Datadog.

La CLI peut :

- Créer un compte Datadog de bout en bout depuis le terminal
- Lier un compte Datadog existant à votre environnement local
- Instrumenter l'infrastructure locale en tant que code (Terraform, Helm, Kustomize, Ansible, Pulumi, manifestes Kubernetes bruts, fichiers Docker Compose) en modifiant les fichiers sur place
- Instrumenter le code d'application local en ajoutant l'initialisation et la configuration du SDK pour les frontends et backends pris en charge

### Prérequis {#prerequisites}

- Node.js 22 ou version ultérieure

### Produits pris en charge {#supported-products}

La CLI permet de configurer les produits suivants :

| Product | Identifier |
|---------|------------|
| App and API Protection | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Error Tracking | `error-tracking` |
| Infrastructure Monitoring | `infra-monitoring` |
| Linux | `linux` |
| Agent Observability | `llm-obs` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring (RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Test Optimization | `test-optimization` |

### Installer et exécuter la CLI {#install-and-run-the-cli}

1. Exécutez la CLI avec `npx`, en transmettant `--site` pour cibler votre [site Datadog][16]. Vous disposez de deux options, selon que vous possédez déjà un compte Datadog ou non :

    **Option 1 : Configuration interactive.** Si vous ne possédez pas encore de compte Datadog, ou si vous souhaitez choisir votre produit de manière interactive, exécutez sans indicateur `--product`. La CLI vous guide à travers la configuration du compte et le choix du produit.

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

1. Appuyez sur <kbd>Entrée</kbd> sur l'écran d'accueil et choisissez si vous possédez un compte Datadog. Un navigateur s'ouvre pour l'OAuth (ou pour la création de compte si vous n'en avez pas encore). Terminez le flux et accordez l'accès à votre compte Datadog.

1. Si vous avez exécuté l'interface de ligne de commande sans `--product`, sélectionnez ce que vous souhaitez configurer dans le menu des produits. (La configuration directe avec `--product` ignore ce menu.)

   {{< img src="agentic_onboarding/product-selection.png" alt="Menu de l'interface de ligne de commande « Que souhaitez-vous configurer ? » regroupés par surveillance de l'infrastructure et du backend, surveillance du frontend, applications basées sur LLM et tests CI." style="width:80%;" >}}

   L'interface de ligne de commande détecte les frameworks de votre projet, applique la configuration requise et provisionne toutes les variables d'environnement nécessaires. La progression est signalée phase par phase.

   {{< img src="agentic_onboarding/setup-example.png" alt="Interface de ligne de commande affichant « Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring) » avec les étapes de progression." style="width:80%;" >}}

   Une fois la configuration terminée, l'interface de ligne de commande liste les produits instrumentés et fournit des liens vers l'interface utilisateur Datadog pour vérifier les données entrantes.

   {{< img src="agentic_onboarding/success.png" alt="Interface de ligne de commande affichant « Setup complete! » avec des coches à côté de RUM, Error Tracking et Product Analytics." style="width:80%;" >}}

1. Validez les modifications dans votre dépôt. Vous pouvez modifier les variables d'environnement Datadog (clés d'API, identifiants d'application) pour votre environnement spécifique.

Une fois l'interface de ligne de commande terminée, consultez [Next steps](#next-steps).

## MCP Server {#mcp-server}

Le Datadog MCP Server expose l'ensemble d'outils `onboarding` à tout assistant de codage compatible MCP. Après avoir installé et authentifié le serveur, vous instrumentez un projet en saisissant une invite d'une ligne. L'agent lit votre code, appelle les outils MCP (avec votre autorisation), applique les modifications et vérifie le résultat.

### Prérequis {#prerequisites-1}

- Un assistant de codage compatible MCP, tel que [Claude Code][17] ou [Cursor][18]
- Un compte Datadog

### Frameworks pris en charge {#supported-frameworks}

| Produit | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes Observability | Helm, Kustomize, raw manifests, Terraform, Pulumi, Ansible (across GKE, EKS, AKS, minikube, and others such as kind, k3s, and OpenShift) |
| Docker Observability | `docker-compose` and sidecar (`docker run`) deployments; Terraform, Ansible, and other IaC (Pulumi, CloudFormation, Puppet, Chef) |
| Linux Observability | Terraform, Ansible, other IaC (Pulumi, CloudFormation, Puppet, Chef), and plain-shell install |
| Serverless Monitoring (AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run and Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform, Bicep, ARM template, `azure.yaml` (azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK (détection automatique à partir des dépendances du projet) |
| OpenTelemetry | Node.js / server-side TS, Browser JS / React / Vite, Python (Django, Flask, FastAPI), Java, Go |
| App and API Protection | Python, Node.js, Java, Go, Ruby, .NET, PHP, and proxies (Envoy, HAProxy) for Linux, Windows, Kubernetes, Docker, GCP Cloud Run, and AWS Lambda, AWS Fargate/ECS |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

### Étape 1 : Installer le serveur MCP {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
Dans une session Claude Code active, exécutez :

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1: Install deeplink (recommended)**

Click the install deeplink for your [Datadog site][1], then confirm {{< ui >}}Install{{< /ui >}} for **datadog-onboarding-.{{< region-param key="dd_datacenter_lowercase" >}}** server when Cursor opens.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Option 2: Manual configuration**

Ajoutez le MCP Server à `~/.cursor/mcp.json`:

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>

[1]: /fr/getting_started/site/

{{% /tab %}}

{{% tab "Other MCP clients" %}}

Any MCP client that supports HTTP transport can connect to the Datadog MCP Server. Pointez-le vers l'endpoint de votre [site Datadog][1] :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /fr/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Étape 2 : Authentifier le serveur MCP {#step-2-authenticate-the-mcp-server}

1. Une fois le MCP Server installé, votre assistant de codage vous invite à vous authentifier. Appuyez sur <kbd>Entrée</kbd> pour ouvrir l'écran OAuth de Datadog dans votre navigateur.
1. Une fois l'authentification terminée, choisissez {{< ui >}}Open{{< /ui >}} pour revenir à votre IDE et accorder au MCP Server l'accès à votre compte Datadog.
1. Confirmez que les outils MCP apparaissent sous **datadog-onboarding-.{{< region-param key="dd_datacenter_lowercase" >}}** server.

### Étape 3 : Instrumenter votre projet {#step-3-instrument-your-project}

Envoyez l'invite qui correspond au produit que vous souhaitez configurer :

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
<div class="alert alert-info">Agentic Onboarding for App and API Protection is in Public Preview.</div>

{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**Conteneurs GCP Cloud Run**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**Fonctions GCP Cloud Run**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

L'agent détecte votre pile, demande l'autorisation avant chaque appel d'outil, applique les modifications localement (sans les valider) et affiche les étapes de vérification.

Une fois l'agent terminé, validez les modifications dans votre dépôt et définissez toutes les nouvelles variables d'environnement (clés d'API, identifiants d'application) dans votre environnement de production. Consultez ensuite [Étapes suivantes](#next-steps) pour confirmer que les données circulent.

## Étapes suivantes {#next-steps}

Confirmez que les données circulent dans l'interface utilisateur Datadog pour le produit que vous avez configuré :

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
[16]: /fr/getting_started/site/
[17]: https://www.anthropic.com/claude-code
[18]: https://cursor.com/

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}