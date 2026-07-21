---
description: Utilisez l'interface de ligne de commande Pup pour interagir avec les
  API de Datadog depuis le terminal ou les flux de travail des agents IA.
further_reading:
- link: https://github.com/DataDog/pup
  tag: GitHub
  text: Dépôt Pup CLI
- link: https://github.com/DataDog/pup/blob/main/README.md
  tag: GitHub
  text: Documentation complète de Pup CLI
- link: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
  tag: GitHub
  text: Référence de commande
- link: mcp_server/
  tag: Documentation
  text: Serveur MCP de Datadog
title: Pup CLI
---
## Aperçu {#overview}

[Pup CLI][1] est une interface de ligne de commande complète, prête pour les agents IA, qui donne aux agents IA accès à la plateforme d'observabilité de Datadog. Elle expose [la surface API de Datadog][9] pour une utilisation dans les flux de travail des agents IA et les pipelines automatisés.

Caractéristiques clés :

- **Commandes auto-découvrables** : Les commandes sont structurées de sorte que les agents puissent les parcourir sans recourir à une documentation externe.
- **Sortie structurée** : Les réponses sont disponibles en JSON et YAML pour un parsing fiable.
- **Authentification à portée limitée** : OAuth2 et PKCE fournissent un accès limité sans clés API à long terme.
- **Couverture étendue de produits** : Pup prend en charge les moniteurs, les journaux, les métriques, RUM, la sécurité, et plus encore.

<div class="alert alert-info">Cette page couvre les fonctionnalités principales de Pup. Consultez la <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">documentation du dépôt Pup</a> pour la liste complète des fonctionnalités et des commandes.</div>

## Installation {#installation}

### Homebrew (macOS/Linux) {#homebrew-macoslinux}

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### Construire à partir de la source {#build-from-source}

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

Pup couvre la plupart des surfaces de produits majeurs de Datadog. Consultez la [référence de commande][3] pour la liste canonique des commandes spécifiques au produit. Vous pouvez également exécuter `pup --help` (ou `pup agent schema` pour une sortie lisible par machine) pour la liste en direct des commandes telles qu'elles sont construites.

| Catégorie | Exemples |
|----------|----------|
| Observabilité de base | Métriques, journaux, événements, RUM, APM, traces |
| Surveillance et alertes | Moniteurs, tableaux de bord, SLOs, synthétiques, temps d'arrêt, flux de travail |
| Sécurité et conformité |  : Règles de sécurité, signaux, constats, journaux d'audit, menaces CSM |
| Infrastructure et cloud | Hôtes, balises, conteneurs, réseau, intégrations AWS/GCP/Azure |
| Incidents et opérations | Incidents, astreinte, gestion des cas, suivi des erreurs, catalogue de services |
| CI/CD et développement | Visibilité CI, optimisation des tests, métriques DORA, portes de déploiement |
| Organisation et accès | Utilisateurs, clés API, clés d'application, organisations |
| Plateforme et configuration | Mesure d'utilisation, gestion des coûts, drapeaux de fonctionnalités, pipelines d'observabilité |

## Mode agent {#agent-mode}

Lorsque Pup est invoqué par un agent de codage IA, il passe automatiquement en mode agent, qui renvoie des réponses JSON structurées optimisées pour la consommation par machine. Les réponses incluent des métadonnées, des détails d'erreur et des indices. Le mode agent approuve également automatiquement les invites de confirmation.

Le mode agent est détecté automatiquement pour les [agents de codage pris en charge][4] lorsque leur variable d'environnement est définie. Vous pouvez également l'activer explicitement avec le flag `--agent` ou en définissant `FORCE_AGENT_MODE=1`.

## Fonctionnalités supplémentaires {#additional-features}

Pup inclut des fonctionnalités supplémentaires qui peuvent être utilisées dans les flux de travail des agents IA—suivez les liens ci-dessous pour plus d'informations :

- [**Runbooks**][5] : `pup runbooks` est un moteur d'exécution local pour des procédures opérationnelles définies en YAML, encodant des tâches multi-étapes utilisant `pup`, shell, HTTP et des étapes de flux de travail Datadog.
- [**Compétences de l'agent**][6] : Pup fournit des compétences et des agents de domaine intégrés dans le binaire, installables sur tout assistant de codage IA avec `pup skills install`.
- [**Serveur ACP**][7] : `pup acp serve` exécute un serveur d'agent IA local qui connecte les outils de codage à Datadog Bits AI via ACP et des protocoles compatibles avec OpenAI.

## Authentification {#authentication}

Pup prend en charge les méthodes d'authentification OAuth2 et par clé API. OAuth2 est préféré ; exécutez `pup auth login` pour vous authentifier via votre navigateur. Si OAuth2 n'est pas disponible, Pup revient aux clés API (`DD_API_KEY` et `DD_APP_KEY`). Consultez la [documentation d'authentification][8] pour plus de détails.

## Flags globaux {#global-flags}

| Drapeau | Description |
|------|-------------|
| `-o, --output` | Format de sortie (`json`, `table`, `yaml`). Par défaut : `json` |
| `-y, --yes` | Ignorer les invites de confirmation pour les opérations destructrices |
| `--agent` | Activer le mode agent |
| `--no-agent` | Désactiver le mode agent |
| `--read-only` | Bloquer toutes les opérations d'écriture (créer, mettre à jour, supprimer) |
| `--org <org>` | Utiliser un profil d'organisation nommé pour des flux de travail multi-comptes (exécutez `pup auth login --org` pour configurer) |
| `-h, --help` | Imprimer l'aide |

## Variables d'environnement {#environment-variables}

| Variable | Description |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Jeton d'accès pour [authentification sans état][10] |
| `DD_API_KEY` | Clé API Datadog (optionnelle si vous utilisez OAuth2 ou `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Clé d'application Datadog (optionnelle si vous utilisez OAuth2 ou `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Site Datadog (par défaut : `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Approuver automatiquement les opérations destructrices (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Backend de stockage de jetons (`keychain` ou `file`, par défaut : détection automatique) |

## Pour en savoir plus {#further-reading}

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