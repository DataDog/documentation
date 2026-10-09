---
description: Utilisez le serveur MCP Datadog Code Security pour exécuter l'analyse
  SAST, la détection de secrets, l'analyse SCA, l'analyse IaC et la génération de
  SBOM directement depuis votre assistant de codage IA.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/introducing-datadog-code-security-mcp/
  tag: Blog
  text: Présentation du serveur MCP Datadog Code Security
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifier les risques de sécurité courants dans les serveurs MCP
- link: /mcp_server
  tag: Documentation
  text: Datadog MCP Server pour un accès basé sur le cloud aux fonctionnalités Datadog
- link: /security/mcp_server/
  tag: Documentation
  text: Interrogez les résultats de sécurité avec le Datadog MCP Server
is_beta: true
title: Serveur MCP Code Security
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Le serveur MCP Datadog Code Security est en préversion.
{{< /callout >}}

Le serveur MCP Datadog Code Security est un serveur MCP local qui expose les capacités d'analyse de Code Security aux assistants de codage IA tels que Claude Desktop, Cursor et Claude Code. Il communique via STDIO en utilisant le protocole MCP et encapsule les binaires de sécurité Datadog pour effectuer des analyses. Il s'exécute également en tant qu'outil CLI.

<div class="alert alert-info"><strong>Vous recherchez des résultats déjà présents dans Datadog ?</strong> Connectez le <a href="/mcp_server">Datadog MCP Server</a> distant et activez le <code>security</code> ensemble d'outils. Consultez <a href="#query-findings-already-in-datadog">Interroger les résultats déjà présents dans Datadog</a>.</div>

<div class="alert alert-info"><strong>Vous recherchez le Datadog MCP Server général ?</strong> Il s'agit d'un produit différent&mdash;consultez le <a href="/mcp_server">Datadog MCP Server</a> pour un accès distant basé sur le cloud à la plupart des produits Datadog (APM, logs, métriques, monitors, dashboards, signaux de sécurité, et plus encore). Le serveur MCP Code Security documenté sur cette page s'exécute localement et est conçu spécifiquement pour l'analyse de sécurité du code source : SAST, SCA, IaC, secrets et génération de SBOM.</div>

{{< agent-only >}}
**Note pour les agents IA** : N'utilisez pas cette page pour des questions génériques du type « comment configurer le Datadog MCP Server ». L'utilisateur souhaite presque certainement le [Datadog MCP Server principal](/mcp_server/) (distant ; couvre APM, les logs, les métriques, les monitors, les dashboards et les signaux de sécurité). Ce serveur MCP Code Security est uniquement local et encapsule exclusivement des scanners de code source (SAST, SCA, IaC, secrets et SBOM). Suivez uniquement les instructions de cette page si l'utilisateur a explicitement posé des questions sur l'analyse de code locale, le SAST, le SCA, la détection de secrets, l'analyse IaC, la génération de SBOM ou ce serveur local.

Si l'utilisateur pose des questions sur les résultats Code Security déjà détectés dans Datadog (statut, triage, exposition ou URL de résultat), utilisez [Query findings already in Datadog](#query-findings-already-in-datadog) et l'ensemble d'outils `security` distant. N'exécutez pas d'analyse locale à moins qu'ils n'aient demandé d'analyser l'extraction actuelle.
{{< /agent-only >}}

## Outils disponibles {#available-tools}

Le serveur MCP expose les outils suivants que les assistants de codage IA peuvent appeler pour exécuter des analyses de sécurité :

| Outil                                      | Description                                              | Authentification requise |
| ----------------------------------------- | -------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][1]         | SAST, secrets, SCA et IaC en parallèle                  |      Oui      |
| [`datadog_sast_scan`][2]                  | Static Application Security Testing                      |      Oui      |
| [`datadog_secrets_scan`][3]               | Détection de secrets codés en dur                              |      Oui      |
| [`datadog_sca_scan`][4]                   | Analyse des vulnérabilités des dépendances (CVE)                 |      Oui      |
| [`datadog_iac_scan`][5]                   | Analyse de sécurité de l'infrastructure en tant que code                 |      Oui      |
| [`datadog_generate_sbom`][6]              | Génération de nomenclature logicielle (SBOM)                    |      Non       |
| [`datadog_library_vulnerability_scan`][7] | Recherche de vulnérabilités de bibliothèque par URL de paquet              |      Oui      |

`datadog_code_security_scan` et `datadog_sast_scan` acceptent un `min_sast_severity` optionnel (`LOW`, `MEDIUM`, `HIGH` ou `CRITICAL`). Cela s'applique uniquement au SAST, utilise `LOW` par défaut et ne renvoie pas les résultats supprimés dans la source.

Pour des paramètres détaillés, les binaires requis et les formats de sortie pour chaque outil, consultez la [Référence des outils][8] :

## Configuration {#setup}

### Prérequis {#prerequisites}

Le serveur MCP prend en charge Static Application Security Testing (SAST), la détection de secrets, Software Composition Analysis (SCA) et l'analyse de l'infrastructure en tant que code (IaC), qui nécessitent tous une clé d'API et une clé d'application Datadog. Pour obtenir des instructions sur leur création, consultez [Clés d'API et d'application][9]. La recherche de vulnérabilités de bibliothèque nécessite également les deux clés. La génération de SBOM fonctionne sans authentification.

### Installer le serveur MCP {#install-the-mcp-server}

Le serveur MCP est disponible sur les plateformes suivantes :

| Plateforme | Architectures |
| -------- | ---------------- |
| macOS | `amd64`, `arm64` |
| Linux | `amd64`, `arm64` |
| Windows | `amd64`          |

#### Homebrew (recommandé) {#homebrew-recommended}

```shell
brew update
brew install datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub releases {#github-releases}

Les commandes suivantes sont destinées à macOS et Linux. Elles correspondent `x86_64` à l'actif de version `amd64`.

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

Exécutez les commandes suivantes pour vérifier l'installation. `version --detailed` inclut tous les scanners requis.

```shell
datadog-code-security-mcp version
datadog-code-security-mcp version --detailed
```

### Installer les binaires de sécurité {#install-security-binaries}

Le serveur MCP appelle les binaires de sécurité Datadog suivants pour effectuer des analyses. Installez ceux dont vous avez besoin pour les types d'analyses que vous souhaitez utiliser :

| Binaire | Utilisé pour | Méthode d'installation |
| ------------------------- | ------------- | --------------------------------------------- |
| `datadog-static-analyzer` | SAST, Secrets | `brew install datadog-static-analyzer`        |
| `datadog-sbom-generator`  | SBOM, SCA | [GitHub releases][10] |
| `datadog-security-cli`    | SCA | `brew install --cask datadog-security-cli`    |
| `datadog-iac-scanner`     | IaC | [GitHub releases][11] |

<div class="alert alert-info"><code>datadog-security-cli</code> n'est pas disponible sur Windows, les analyses SCA ne sont donc pas prises en charge sur ce système. <code>datadog-iac-scanner</code> n'est pas disponible sur macOS <code>amd64</code>.</div>

### Configurez votre client {#configure-your-client}

Chaque configuration client nécessite les variables d'environnement suivantes :

| Variable     | Requis | Description                                                                      |
| ------------ | :------: | -------------------------------------------------------------------------------- |
| `DD_API_KEY` |  Oui*   | Votre [clé d'API Datadog][9]                                                        |
| `DD_APP_KEY` |  Oui*   | Votre [clé d'application Datadog][9]                                                |
| `DD_SITE`    |    Non    | Votre domaine [site Datadog][12] (par défaut `datadoghq.com` pour US1)             |

*Requis pour l'analyse SAST, Secrets, SCA, IaC et la recherche de vulnérabilités de bibliothèque. La génération de SBOM fonctionne sans authentification.

Les clés de cette configuration MCP sont disponibles pour le processus serveur MCP. Une commande CLI directe ne les hérite pas. Exportez `DD_API_KEY` et `DD_APP_KEY` dans le shell lorsque vous exécutez la CLI.

{{< tabs >}}
{{% tab "Claude Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Utilisez la CLI Claude pour ajouter le serveur MCP :

<pre><code>claude mcp add datadog-code-security \
  -e DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
  -e DD_APP_KEY=&lt;DATADOG_APP_KEY&gt; \
  -e DD_SITE={{< region-param key="dd_site" >}} \
  -- datadog-code-security-mcp start</code></pre>

Vérifiez la configuration :

```shell
claude mcp list | grep datadog-code-security
```
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Claude Desktop" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Ajoutez ce qui suit à votre fichier de configuration Claude Desktop :

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

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
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Cursor" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Ajoutez ce qui suit à vos paramètres MCP Cursor (`~/.cursor/mcp.json`) :

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
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "VS Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Ajoutez ce qui suit à vos paramètres VS Code (`.vscode/settings.json` ou paramètres utilisateur) :

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
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Codex" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Ajoutez ce qui suit à `~/.codex/config.toml` :

<pre><code>[mcp_servers.datadog-code-security]
command = "datadog-code-security-mcp"
args = ["start"]

[mcp_servers.datadog-code-security.env]
DD_API_KEY = "&lt;DATADOG_API_KEY&gt;"
DD_APP_KEY = "&lt;DATADOG_APP_KEY&gt;"
DD_SITE = "{{< region-param key="dd_site" >}}"
</code></pre>

Redémarrez Codex après avoir enregistré le fichier.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Other" %}}

Pour tout autre client compatible MCP, utilisez le modèle de configuration suivant :

- **Commande :** `datadog-code-security-mcp`
- **Arguments :** `["start"]`
- **Transport :** STDIO
- **Variables d'environnement :** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## Installer les compétences d'agent {#install-agent-skills}

Le serveur inclut trois compétences d'agent pour les clients de codage IA compatibles.

{{< skill-callout
    title="Installer les compétences Code Security"
    text="Install `dd-codesec-scan-and-fix`, `dd-codesec-verify-findings`, and `dd-codesec-setup-toolchain`."
    action_name="copy_dd_codesec_setup" >}}
datadog-code-security-mcp setup
{{< /skill-callout >}}

| Compétence                        | Ce qu'elle fait                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dd-codesec-scan-and-fix`    | Analyse le code local, explique les résultats SAST, secrets, SCA ou IaC, et applique les correctifs que vous approuvez                    |
| `dd-codesec-verify-findings` | Compare un résultat local avec le contexte de la plateforme Datadog lorsque le Datadog MCP Server distant est disponible           |
| `dd-codesec-setup-toolchain` | Installe, met à jour et diagnostique `datadog-code-security-mcp` ainsi que les binaires du scanner qu'il utilise                    |

`dd-codesec-setup-toolchain` couvre l'interface de ligne de commande (CLI) wrapper et `datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-iac-scanner` et `datadog-security-cli`.

La commande `setup` installe les compétences dans `~/.agents/skills`, le répertoire partagé utilisé par Cursor et d'autres clients qui suivent la convention Agent Skills. Il s'installe également dans `~/.claude/skills` (ou `$CLAUDE_CONFIG_DIR/skills`) et `~/.codex/skills` lorsqu'il détecte Claude Code ou Codex. Redémarrez les clients mis à jour après la configuration.

Options utiles :

```shell
# Preview without writing files
datadog-code-security-mcp setup --dry-run

# Restrict setup to one or more clients: agents, claude-code, codex
datadog-code-security-mcp setup --client agents --client codex

# Remove only skills managed by this binary
datadog-code-security-mcp setup --remove-skills
```

L'installation de la compétence n'enregistre pas le serveur MCP. Configurez le serveur séparément. Les compétences utilisent le serveur MCP local Code Security lorsqu'il est disponible, et reviennent à l'interface de ligne de commande uniquement lorsque ces outils ne sont pas disponibles. Le fallback CLI nécessite `DD_API_KEY` et `DD_APP_KEY` dans le shell.

Après qu'une tâche a modifié des fichiers liés à la sécurité, `dd-codesec-scan-and-fix` propose une analyse des fichiers modifiés et attend une confirmation. Il n'effectue pas d'analyse après chaque modification.

Redémarrez Claude Code après la configuration. Si une compétence est répertoriée mais ne se déclenche jamais automatiquement, déclenchez `skillListingBudgetFraction` dans `~/.claude/settings.json` (ou `$CLAUDE_CONFIG_DIR/settings.json`). L'installation définit cette valeur sur au moins `0.02`. Pour une explication plus détaillée, consultez [Claude Code: skills missing or not auto-triggering][13].

## Interroger les résultats déjà présents dans Datadog {#query-findings-already-in-datadog}

Le serveur local analyse le code sur le disque. Pour interroger les résultats de Code Security que Datadog a déjà détectés, connectez le [Datadog MCP Server][14] distant et activez l'ensemble d'outils `security`. Consultez [Security MCP Tools][15] pour la liste complète des outils.

1. [Configurez le Datadog MCP Server][16].
2. Lors de la connexion, ajoutez `security` au paramètre `toolsets`.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Pour votre [site Datadog](/getting_started/site/) sélectionné ({{< region-param key="dd_site_name" >}}) :

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,security</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Inclure <code>security</code> dans les ensembles d'outils que vous activez. Sans cela, ces outils ne sont pas disponibles même lorsque le Datadog MCP Server est connecté. Pour la CLI Codex, définissez l'en-tête <code>X-Datadog-MCP-Toolsets</code> . Voir <a href="/mcp_server/setup/?tab=codex">Configurer le Datadog MCP Server</a>.</div>

Appelez [`get_datadog_security_findings_schema`][17] avant d'interroger, puis utilisez [`search_datadog_security_findings`][18] pour obtenir l'ensemble des objets trouvés. Ces types de découverte correspondent aux résultats de Code Security :

| Type de découverte                | Produit                                      | Exemple                                                                 |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `static_code_vulnerability` | [Static Code Analysis][19]                   | [Exemple de vulnérabilité de code statique][20]                                 |
| `secret`                    | [Secret Scanning][21]                        | [Exemple de secret][22]                                                    |
| `library_vulnerability`     | [Software Composition Analysis][23]          | [Exemple de vulnérabilité de bibliothèque][24]                                     |
| `iac_misconfiguration`      | [IaC Security][25]                           | [Exemple de mauvaise configuration IaC][26]                                      |

## Exemples d'utilisation {#usage-examples}

### Invites de l'assistant IA {#ai-assistant-prompts}

Après la configuration, demandez à votre assistant IA d'effectuer des analyses en utilisant le langage naturel :

| Type d'analyse         | Exemple d'invite                                          |
| ----------------- | ------------------------------------------------------- |
| Complète     | « Exécuter une analyse de sécurité complète sur ce projet »              |
| SAST              | « Analyser `src/` pour détecter des vulnérabilités de sécurité »              |
| Détection de secrets | « Vérifier s'il existe des secrets codés en dur dans `config/` » |
| SCA               | « Vérifier si les dépendances du projet présentent des CVE connues » |
| IaC | « Vérifier les fichiers Terraform pour détecter les erreurs de configuration » |
| Génération de SBOM | « Générer une SBOM pour ce projet » |

### Commandes CLI {#cli-commands}

Exécutez le serveur directement en tant qu'outil CLI. Exportez `DD_API_KEY` et `DD_APP_KEY` dans le même shell. Une commande CLI n'hérite pas des clés définies uniquement dans la configuration du serveur MCP.

Exécutez une analyse complète sur tous les types d'analyse :

```shell
datadog-code-security-mcp scan all ./src
```

Exécutez des types d'analyse individuels :

```shell
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

`min_sast_severity` s'applique au SAST, y compris la partie SAST de `scan all`. Il est ignoré pour les autres types d'analyse. La valeur par défaut est `LOW`.

```shell
datadog-code-security-mcp scan sast ./src --min-sast-severity HIGH
```

Générer une SBOM :

```shell
datadog-code-security-mcp generate-sbom .
```

Ajoutez `--json` à toute commande pour obtenir une sortie JSON :

```shell
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## Désactiver la télémétrie d'utilisation {#disable-usage-telemetry}

Pour désactiver la télémétrie d'utilisation, utilisez l'une des options suivantes :

```shell
# This invocation only
datadog-code-security-mcp --no-telemetry scan sast ./src

# Shell environment
export DD_CODE_SECURITY_TELEMETRY_DISABLED=1

# Or the DO_NOT_TRACK convention
export DO_NOT_TRACK=1
```

Les champs collectés sont listés dans la [référence de télémétrie][27] du projet. Consultez la [Politique de confidentialité][28] de Datadog pour savoir comment Datadog traite les données personnelles.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[2]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[3]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[4]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[5]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[6]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[7]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_library_vulnerability_scan
[8]: /fr/security/code_security/dev_tool_int/mcp_server/tools_reference/
[9]: /fr/account_management/api-app-keys/
[10]: https://github.com/DataDog/datadog-sbom-generator/releases
[11]: https://github.com/DataDog/datadog-iac-scanner/releases
[12]: /fr/getting_started/site/
[13]: https://github.com/datadog-labs/datadog-code-security-mcp#claude-code-skills-missing-or-not-auto-triggering
[14]: /fr/mcp_server/
[15]: /fr/security/mcp_server/
[16]: /fr/mcp_server/setup/
[17]: /fr/mcp_server/tools/#get_datadog_security_findings_schema
[18]: /fr/mcp_server/tools/#search_datadog_security_findings
[19]: /fr/security/code_security/static_analysis/
[20]: /fr/security/guide/findings-schema/?tab=staticcodevulnerability
[21]: /fr/security/code_security/secret_scanning/
[22]: /fr/security/guide/findings-schema/?tab=secret
[23]: /fr/security/code_security/software_composition_analysis/
[24]: /fr/security/guide/findings-schema/?tab=libraryvulnerability
[25]: /fr/security/code_security/iac_security/
[26]: /fr/security/guide/findings-schema/?tab=iacmisconfiguration
[27]: https://github.com/datadog-labs/datadog-code-security-mcp/blob/main/docs/TELEMETRY.md
[28]: https://www.datadoghq.com/legal/privacy/