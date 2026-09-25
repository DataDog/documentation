---
description: Instrumentez vos applications avec Datadog à l'aide de l'AI Setup CLI
  ou du Datadog MCP Server.
further_reading:
- link: https://www.datadoghq.com/blog/serverless-agentic-onboarding/
  tag: Blog
  text: Instrumentez les applications serverless avec Agentic Onboarding.
title: Agentic Onboarding Setup.
---
## Présentation {#overview}

Agentic Onboarding est un ensemble d'outils pilotés par IA qui automatisent l'instrumentation Datadog pour vos applications et votre infrastructure :

- [AI Setup CLI](#ai-setup-cli) : Configurez Datadog depuis un terminal, sans assistant de codage.
- [MCP Server](#mcp-server) : Configurez Datadog via un assistant de codage (tel que Claude Code ou Cursor), qui gère la détection et la configuration du framework depuis votre IDE.

Les deux chemins sont complémentaires et utilisent le même compte Datadog. Vous pouvez installer le Datadog MCP Server dans votre IDE et exécuter la CLI dans un terminal.

## AI Setup CLI {#ai-setup-cli}

Le Datadog AI Setup CLI est un outil de terminal autonome. Utilisez-la lorsque vous ne souhaitez pas installer le MCP Server, ou pour des tâches que le MCP Setup ne prend pas en charge, telles que la création d'un compte Datadog.

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

Exécutez l'interface de ligne de commande avec `npx`, en transmettant `--site` pour cibler votre [site Datadog][16] ({{< region-param key=dd_site code="true" >}}). Vous disposez de deux options, selon que vous possédez déjà un compte Datadog ou non :

   {{< tabs >}}
   {{% tab "Configuration interactive" %}}
1. Utilisez cette option si vous n'avez pas de compte Datadog, ou si vous souhaitez que l'interface de ligne de commande recommande des produits basés sur l'analyse de votre code. L'interface de ligne de commande vous guide à travers la configuration du compte, l'analyse du dépôt et les recommandations de produits.

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com
   ```
   Remplacez la valeur de `--site` par le site Datadog correspondant à votre compte : ({{< region-param key=dd_site code="true" >}}).

1. Appuyez sur <kbd>Entrée</kbd> sur l'écran d'accueil et choisissez si vous possédez un compte Datadog. Un navigateur s'ouvre pour l'OAuth (ou pour la création de compte si vous n'en avez pas encore). Terminez le flux et accordez l'accès à votre compte Datadog.
1. Entrez le chemin d'accès au dépôt que vous souhaitez instrumenter.
1. Avec votre consentement, l'interface de ligne de commande analyse le dépôt en mode lecture seule pour détecter votre pile technique.
1. Sur la base de la pile technique détectée, l'interface de ligne de commande recommande jusqu'à trois produits Datadog pris en charge. Les recommandations sont sélectionnées par défaut. Désélectionnez des recommandations individuelles, confirmez la sélection ou choisissez **Afficher toutes les options de configuration** pour utiliser la liste complète des options de configuration à la place.
   
   {{% /tab %}}
   
   {{% tab "Configuration directe" %}}
1. Utilisez cette option si vous possédez déjà un compte Datadog et savez quel produit vous souhaitez installer. Ajoutez l'indicateur `--product` pour passer directement à la configuration et ignorer l'analyse du dépôt ainsi que les recommandations de produits.

   ```shell
   npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
   ```

   - Remplacez la valeur de `--site` par le site Datadog correspondant à votre compte : ({{< region-param key=dd_site code="true" >}}).
   - Remplacez `<PRODUCT>` par l'un des produits listés dans la section [Produits pris en charge](#supported-products).

1. Appuyez sur <kbd>Entrée</kbd> sur l'écran d'accueil et choisissez si vous possédez un compte Datadog. Un navigateur s'ouvre pour l'OAuth (ou pour la création de compte si vous n'en avez pas encore). Terminez le flux et accordez l'accès à votre compte Datadog.

   {{% /tab %}}
   {{< /tabs >}}

#### Configurez et vérifiez votre configuration {#configure-and-verify-your-setup}

1. Si l'interface de ligne de commande ne peut pas générer de recommandations ou ne trouve pas de correspondance pertinente pour votre dépôt, elle vous dirige vers la liste complète des options de configuration. Pour une configuration directe avec `--product`, commencez par ce menu.
   {{< img src="agentic_onboarding/product-selection.png" alt="Menu de l'interface de ligne de commande « Que souhaitez-vous configurer ? » regroupés par surveillance de l'infrastructure et du backend, surveillance du frontend, applications basées sur LLM et tests CI." style="width:80%;" >}}
1. L'interface de ligne de commande détecte les frameworks de votre projet, applique la configuration requise et provisionne toutes les variables d'environnement nécessaires. La progression est signalée phase par phase.
   {{< img src="agentic_onboarding/setup-example.png" alt="Interface de ligne de commande affichant « Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring) » avec les étapes de progression." style="width:80%;" >}}
1. Une fois la configuration terminée, l'interface de ligne de commande liste les produits instrumentés et fournit des liens vers l'interface utilisateur Datadog pour vérifier les données entrantes.

1. Validez les modifications dans votre dépôt. Vous pouvez modifier les variables d'environnement Datadog (clés d'API, identifiants d'application) pour votre environnement spécifique.

Une fois l'interface de ligne de commande terminée, consultez la section [Étapes suivantes](#next-steps) pour confirmer que les données circulent.

### Mode sans interface {#headless-mode}

Le mode sans interface est conçu pour les configurations sans surveillance. Un agent de codage IA, un job CI ou un script peut exécuter l'interface de ligne de commande directement dans votre dépôt et effectuer l'instrumentation Datadog de manière autonome. Aucune personne n'a besoin d'être présente pour approuver les invites ou faire des choix interactifs.

Utilisez `--headless` pour ignorer l'interface utilisateur interactive. Cela nécessite à la fois `--site` et `--product` :

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/ai-setup-cli \
  --headless \
  --site datadoghq.com \
  --product rum
```

Définissez les [variables d'environnement][19] `DD_API_KEY` et `DD_APP_KEY` pour vous authentifier sans interaction utilisateur. Fournissez les deux variables ensemble.

Alternativement, omettez les clés d'API et d'application pour vous authentifier avec OAuth via le navigateur. OAuth est la seule partie d'une exécution sans interface qui pourrait nécessiter une interaction utilisateur, et elle requiert un rappel localhost. Pour les environnements distants ou entièrement sans surveillance, utilisez plutôt les variables d'environnement `DD_API_KEY` et `DD_APP_KEY`.

En utilisant `--headless`, vous confirmez que le téléchargement du code source et l'exécution automatique des commandes sont autorisés pour le projet cible.

## Serveur MCP {#mcp-server}

Le Datadog MCP Server expose l'ensemble d'outils `onboarding` à tout assistant de codage compatible MCP. Après avoir installé et authentifié le serveur, vous instrumentez un projet en saisissant une invite d'une ligne. L'agent lit votre code, appelle les outils MCP (avec votre autorisation), applique les modifications et vérifie le résultat.

### Prérequis {#prerequisites-1}

- Un assistant de codage compatible MCP, tel que [Claude Code][17] ou [Cursor][18]
- Un compte Datadog

### Frameworks pris en charge {#supported-frameworks}

| Produit | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes Observability | Helm, Kustomize, raw manifests, Terraform, Pulumi, Ansible (pour GKE, EKS, AKS, minikube et d'autres comme kind, k3s et OpenShift) |
| Docker Observability | `docker-compose` et déploiements sidecar (`docker run`); Terraform, Ansible et autres IaC (Pulumi, CloudFormation, Puppet, Chef) |
| Linux Observability | Terraform, Ansible, autres IaC (Pulumi, CloudFormation, Puppet, Chef) et installation plain-shell |
| Serverless Monitoring (AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run et Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform, Bicep, ARM template, `azure.yaml` (azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK (détection automatique à partir des dépendances du projet) |
| OpenTelemetry | Node.js / server-side TS, Browser JS / React / Vite, Python (Django, Flask, FastAPI), Java, Go |
| App and API Protection | Python, Node.js, Java, Go, Ruby, .NET, PHP, et proxys (Envoy, HAProxy) pour Linux, Windows, Kubernetes, Docker, GCP Cloud Run et AWS Lambda, AWS Fargate/ECS |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

### Étape 1 : Installez le serveur MCP {#step-1-install-the-mcp-server}

{{< tabs >}}
{{% tab "Claude Code" %}}
Dans une session Claude Code active, exécutez :

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1 : Lien d'installation (recommandé)**

Cliquez sur le lien d'installation pour votre [site Datadog][1], puis confirmez {{< ui >}}Install{{< /ui >}} pour le serveur `datadog-onboarding-`{{< region-param key="dd_datacenter_lowercase" >}}lorsque Cursor s'ouvre.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Option 2 : Configuration manuelle**

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

{{% tab "Autres clients MCP" %}}

Tout client MCP qui prend en charge le transport HTTP peut se connecter au Datadog MCP Server. Pointez-le vers l'endpoint de votre [site Datadog][1] :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /fr/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Étape 2 : Authentifier le serveur MCP {#step-2-authenticate-the-mcp-server}

1. Une fois le serveur MCP installé, votre assistant de codage vous invite à vous authentifier. Appuyez sur <kbd>Entrée</kbd> pour ouvrir l'écran OAuth de Datadog dans votre navigateur.
1. Une fois l'authentification terminée, choisissez {{< ui >}}Open{{< /ui >}} pour revenir à votre IDE et accorder au serveur MCP l'accès à votre compte Datadog.
1. Confirmez que les outils MCP apparaissent sous le serveur `datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}` server.

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

{{% tab "Protection des applications et des API" %}}
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

Une fois l'agent terminé, validez les modifications dans votre dépôt et définissez toutes les nouvelles variables d'environnement (clés d'API, identifiants d'application) dans votre environnement de production. Consultez ensuite la section [Étapes suivantes](#next-steps) pour confirmer que les données circulent.

## Étapes suivantes {#next-steps}

Confirmez que les données circulent dans l'interface utilisateur Datadog pour le produit que vous avez configuré :

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /fr/getting_started/site/
[17]: https://claude.com/product/claude-code
[18]: https://cursor.com/
[19]: /fr/account_management/api-app-keys/