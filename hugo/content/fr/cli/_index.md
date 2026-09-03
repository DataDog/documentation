---
description: Utilisez l'interface de ligne de commande Pup pour interagir avec les
  API Datadog depuis le terminal ou les workflows d'agents IA.
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Dépôt de l'interface de ligne de commande Pup
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: Documentation complète de l'interface de ligne de commande Pup
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: Référence des commandes
- link: mcp_server/
  tag: Documentation
  text: Datadog MCP Server
title: Interface de ligne de commande Pup
---
## Présentation {#overview}

[Pup CLI][1] est une interface de ligne de commande complète, prête pour les agents IA, qui donne aux agents IA accès à la plateforme d'observabilité de Datadog. Elle expose [la surface de l'API Datadog][9] pour une utilisation dans les workflows d'agents IA et les pipelines automatisés.

Fonctionnalités clés :

- **Commandes auto-découvrables** : Les commandes sont structurées de manière à ce que les agents puissent les parcourir sans documentation externe.
- **Sortie structurée** : Les réponses sont disponibles en JSON et YAML pour un parsing fiable.
- **Authentification limitée** : OAuth2 et PKCE fournissent un accès limité sans clés d'API à longue durée de vie.
- **Large couverture produit** : Pup prend en charge les moniteurs, les logs, les métriques, RUM, la sécurité, et plus encore.

<div class="alert alert-info">Cette page couvre les fonctionnalités principales de Pup. Consultez la <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">documentation du dépôt Pup</a> pour la liste complète des fonctionnalités et des commandes.</div>

## Installation {#installation}

### Homebrew (macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### Compilez à partir du code source {#build-from-source}

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### Téléchargement manuel {#manual-download}

Téléchargez les binaires précompilés depuis la [dernière version][2].

## Exemples d'utilisation {#usage-examples}

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

## Domaines de produits pris en charge {#supported-product-areas}

Pup couvre la plupart des principales surfaces de produits Datadog. Consultez la [référence des commandes][3] pour obtenir la liste canonique des commandes spécifiques au produit. Vous pouvez également exécuter `pup --help` (ou `pup agent schema` pour une sortie lisible par machine) pour obtenir la liste en direct des commandes telles qu'elles sont construites.

| Catégorie | Exemples |
|----------|----------|
| Observabilité principale | Métriques, logs, événements, RUM, APM, traces |
| Surveillance et alertes | Moniteurs, tableaux de bord, SLO, synthétiques, périodes d'indisponibilité, workflows |
| Sécurité et conformité | Règles de sécurité, signaux, constats, journaux d'audit, menaces CSM |
| Infrastructure et Cloud | Hosts, tags, conteneurs, réseau, intégrations AWS/GCP/Azure |
| Incidents et opérations | Incidents, astreinte, gestion du travail, suivi des erreurs, catalogue de services |
| CI/CD et développement | Visibilité CI, optimisation des tests, métriques DORA, portes de déploiement |
| Organisation et accès | Utilisateurs, clés d'API, clés d'application, organisations |
| Plateforme et configuration | Mesure de l'utilisation, gestion des coûts, feature flags, pipelines d'observabilité |

## Mode Agent {#agent-mode}

Lorsque Pup est invoqué par un agent de codage IA, il passe automatiquement en mode agent, ce qui renvoie des réponses JSON structurées optimisées pour une consommation par machine. Les réponses incluent des métadonnées, des détails sur les erreurs et des conseils. Le mode Agent approuve également automatiquement les invites de confirmation.

Le mode Agent est également détecté automatiquement pour les [agents de codage pris en charge][4] lorsque leur variable d'environnement est définie. Vous pouvez également l'activer explicitement avec le flag `--agent` ou en définissant `FORCE_AGENT_MODE=1`.

## Fonctionnalités supplémentaires {#additional-features}

Pup inclut des fonctionnalités supplémentaires pouvant être utilisées dans les workflows des agents IA—consultez les liens ci-dessous pour plus d'informations:

- [**Runbooks**][5] : `pup runbooks` est un moteur d'exécution local pour les procédures opérationnelles définies en YAML, encodant des tâches en plusieurs étapes à l'aide de `pup`, de shell, de HTTP et d'étapes de workflow Datadog.
- [**Compétences de l'Agent**][6] : Pup intègre des compétences et des agents de domaine dans le binaire, installables sur tout assistant de codage IA avec `pup skills install`.
- [**Serveur ACP**][7] : `pup acp serve` exécute un serveur d'agent IA local qui connecte les outils de codage à Datadog Bits AI via ACP et des protocoles compatibles avec OpenAI.

## Authentification {#authentication}

Pup prend en charge les méthodes d'authentification OAuth2 et par clé d'API. OAuth2 est privilégié ; exécutez `pup auth login` pour vous authentifier via votre navigateur. Si OAuth2 n'est pas disponible, Pup revient aux clés d'API (`DD_API_KEY` et `DD_APP_KEY`). Consultez la [documentation d'authentification][8] pour plus de détails.

## Flags globaux {#global-flags}

| Flag | Description |
|------|-------------|
| `-o, --output` | Format de sortie (`json`, `table`, `yaml`). Par défaut : `json` |
| `-y, --yes` | Ignorer les invites de confirmation pour les opérations destructives |
| `--agent` | Activer le mode agent |
| `--no-agent` | Désactiver le mode agent |
| `--read-only` | Bloquer toutes les opérations d'écriture (création, mise à jour, suppression) |
| `--org <org>` | Utiliser un profil d'organisation nommé pour les workflows multi-comptes (exécutez `pup auth login --org` pour configurer) |
| `-h, --help` | Afficher l'aide |

## Variables d'environnement {#environment-variables}

| Variable | Description |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Jeton Bearer pour [authentification sans état][10] |
| `DD_API_KEY` | Clé d'API Datadog (facultatif si vous utilisez OAuth2 ou `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Clé d'application Datadog (facultatif si vous utilisez OAuth2 ou `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Site Datadog (par défaut : `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Approuver automatiquement les opérations destructives (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Backend de stockage de jetons (`keychain` ou `file`, par défaut : auto-détection) |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/pup
[2]: https://github.com/DataDog/pup/releases/latest
[3]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-mode
[5]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[6]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[7]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
[8]: https://github.com/DataDog/pup/blob/main/README.md#authentication
[9]: /fr/api/latest/
[10]: https://github.com/DataDog/pup#bearer-token-authentication-wasm--headless