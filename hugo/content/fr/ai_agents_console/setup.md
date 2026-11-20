---
description: Connectez des agents de codage, des agents de gestion des connaissances
  et des outils de productivité à Datadog Agent Console, et faites correspondre les
  identités des utilisateurs d’un outil à l’autre.
further_reading:
- link: /ai_agents_console/
  tag: Documentation
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentation
  text: Intégration de l'utilisation et des coûts d'Anthropic
- link: /integrations/openai-codex/
  tag: Documentation
  text: Intégration OpenAI Codex
- link: /integrations/openai/
  tag: Documentation
  text: Intégration OpenAI
- link: /integrations/cursor/
  tag: Documentation
  text: Intégration de Cursor
- link: https://github.com/datadog-labs/trajectory
  tag: Code source
  text: Trajectory
title: Configurer Agent Console
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console est disponible pour tous les clients Datadog en Preview.
{{< /callout >}}

Pour configurer [Agent Console][1], connectez les outils d’IA que vous souhaitez surveiller, connectez éventuellement des outils de productivité et faites correspondre les identités des utilisateurs d’un outil à l’autre. La page {{< ui >}}Setup{{< /ui >}} d’Agent Console {{< ui >}}Settings{{< /ui >}} suit votre progression à chaque étape.

{{< img src="/ai_agents_console/setup_agent_console.png" alt="Page Setup de Settings dans Agent Console, avec une barre de progression et des étapes pour valider vos données, faire correspondre les identités, connecter votre premier agent et connecter des outils de productivité" style="width:100%;" >}}

## Autorisations {#permissions}

L’accès à Agent Console est contrôlé par les autorisations de rôle suivantes. Assignez-les à des rôles dans [Organization Settings > Roles][2].

| Autorisation | Description |
|------------|-------------|
| `agent_console_read` | Afficher Agent Console, y compris Overview, My Usage, Usage et Settings. Les utilisateurs sans cette autorisation ne peuvent pas ouvrir Agent Console. |
| `agent_console_write` | Modifier la configuration d’Agent Console, notamment la correspondance des identités et la configuration des intégrations. |

## Connecter des outils d'IA {#connect-ai-tools}

Sélectionnez les outils d’IA à connecter sur la page {{< ui >}}Set up your AI tools{{< /ui >}}, qui apparaît la première fois que vous ouvrez Agent Console. Connectez au moins un outil pour commencer à voir les données. Vous pourrez ajouter d'autres outils plus tard.

{{< img src="/ai_agents_console/agent_console_onboarding.png" alt="Page Set up your AI tools avec des cartes pour Trajectory, Cursor, Anthropic Products, GitHub Copilot, Codex, Microsoft Copilot, ChatGPT Work et Another Integration" style="width:100%;" >}}

### Produits Anthropic {#anthropic-products}

Pour surveiller Claude Code, Claude Chat, Claude Cowork et Claude Design, configurez l’intégration [Anthropic Usage and Costs][3]. L’intégration collecte les dépenses quotidiennes et les données d’analyse relatives aux utilisateurs pour chaque produit Claude.

L’intégration Anthropic Usage and Costs ne prend pas en charge les formules Claude Team. Si votre organisation utilise une formule Team, envoyez plutôt la télémétrie de Claude Code à Datadog avec [OpenTelemetry](#claude-code-with-opentelemetry).

### Claude Code avec OpenTelemetry {#claude-code-with-opentelemetry}

Utilisez OpenTelemetry (OTLP) pour envoyer la télémétrie de Claude Code directement à Datadog. Les données collectées de cette manière apparaissent sur la carte {{< ui >}}Claude Code (OTel){{< /ui >}} dans Agent Console.

Pour configurer Agent Console pour Claude Code dans toute votre organisation, votre équipe informatique peut utiliser un système de gestion des appareils mobiles (MDM) ou des [paramètres gérés par le serveur][4] pour distribuer le fichier de paramètres de Claude Code sur tous les appareils gérés.

{{< tabs >}}
{{% tab "Envoyer directement à Datadog" %}}

1. Assurez-vous que votre [configuration de Logs][1] inclut un [index][2] couvrant tous les logs ou un index qui couvre `service:claude-code`.
2. Générez une [clé API Datadog][3].
3. Définissez les variables d'environnement suivantes dans votre fichier de paramètres Claude Code (par exemple, `~/.claude/settings.json`) :

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

[1]: /fr/logs/log_configuration/
[2]: /fr/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Transférer via Datadog Agent" %}}

1. Assurez-vous que votre [configuration de Logs][1] inclut un [index][2] couvrant tous les logs ou un index qui couvre `service:claude-code`.
2. [Installez Datadog Agent][3].
3. Configurez Datadog Agent pour activer OpenTelemetry Collector :
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
4. Définissez les variables d'environnement suivantes dans votre fichier de paramètres Claude Code (par exemple, `~/.claude/settings.json`) :
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
5. Redémarrez Claude Code.

[1]: /fr/logs/log_configuration/
[2]: /fr/logs/log_configuration/indexes/
[3]: /fr/agent/?tab=Host-based
{{% /tab %}}
{{< /tabs >}}

Après avoir redémarré Claude Code, les métriques (utilisation, coût, latence, erreurs) apparaissent dans Agent Console en quelques minutes.

### Codex {#codex}

Pour surveiller Codex, configurez l'intégration [OpenAI Codex][5]. L'intégration collecte des données sur l'utilisation quotidienne, les crédits, l'attribution du code et les analyses des revues.

### ChatGPT Work {#chatgpt-work}

Pour surveiller ChatGPT Work, configurez l'intégration [OpenAI][12]. L’intégration collecte des données d’analyse sur l’activité, les tokens et les coûts estimés.

### Cursor {#cursor}

Pour surveiller Cursor, configurez l’intégration [Cursor][6] à l’aide de Datadog Extension for Cursor. L'intégration collecte des métriques de dépenses et des analyses sur les utilisateurs une fois par jour.

### GitHub Copilot {#github-copilot}

Pour surveiller GitHub Copilot, configurez l'intégration [GitHub Copilot][7]. L'intégration collecte des métriques de dépenses et des analyses sur les utilisateurs une fois par jour.

### Microsoft Copilot 365 {#microsoft-copilot-365}

{{< callout url="#" btn_hidden="true" header="Preview">}}
La prise en charge de Microsoft Copilot 365 est en préversion. Pour demander l'accès, contactez l'équipe chargée de votre compte Datadog.
{{< /callout >}}

L'intégration Microsoft Copilot collecte quotidiennement des données d'adoption de Microsoft 365 Copilot et des analyses d'interaction basées uniquement sur des métadonnées.

### Autres agents de codage et de bureau avec Trajectory {#other-coding-and-desktop-agents-with-trajectory}

[Trajectory][8] est un outil open source qui capture les sessions de plus de 30 agents de codage et de bureau, tels que Claude Code, Claude Desktop, Codex CLI, Cursor, Cline, Windsurf et Zed, et les envoie à Datadog. Pour la liste complète et les exigences de version, consultez [Clients pris en charge][9].

Les données de session de Trajectory alimentent les vues {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} et {{< ui >}}Sessions{{< /ui >}} dans Agent Console.

{{< tabs >}}
{{% tab "Développeurs individuels" %}}

Exécutez le programme d'installation pour installer Trajectory pour l'utilisateur actuel :

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh)
```

Le programme d'installation télécharge la dernière version de Trajectory pour votre plateforme, exécute `trajectory setup` et connecte les agents de codage qu'il trouve. Lorsque vous y êtes invité, saisissez une [clé d'API Datadog][1] pour envoyer des données à Datadog.

Pour configurer la destination Datadog ultérieurement, exécutez :

```bash
trajectory publish destination configure
```

Pour mettre à niveau Trajectory, relancez le programme d'installation.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Parcs gérés (MDM)" %}}

Pour déployer Trajectory sur les ordinateurs des développeurs avec un produit MDM ou UEM tel que Jamf Pro ou Microsoft Intune, suivez le [Guide de l'administrateur de terminaux gérés][1]. Le guide couvre la préparation des paquets, le déploiement des politiques, la sélection des agents de codage et la vérification.

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Demander une intégration {#request-an-integration}

Si l'outil que vous souhaitez surveiller n'est pas répertorié, cliquez sur {{< ui >}}Request an Integration{{< /ui >}} sur la page {{< ui >}}Set up your AI tools{{< /ui >}}.

## Connectez des outils de productivité {#connect-productivity-tools}

Connectez éventuellement des outils de productivité afin qu’Agent Console puisse afficher les pull requests fusionnées, le temps nécessaire à leur fusion, le coût par pull request et les tickets résolus parallèlement aux dépenses en IA.

- **GitHub** : Configurez l’intégration [GitHub][10] pour collecter les données des pull requests.
- **Jira** : Configurez l’intégration [Jira][11] pour collecter les données des tickets.

## Faites correspondre les identités {#map-identities}

Chaque outil d'IA identifie les utilisateurs différemment, par exemple par adresse e-mail, identifiant GitHub ou nom principal d'utilisateur Microsoft (UPN). Importez une table de correspondance des identités afin que l'utilisation et les dépenses de chaque outil soient attribuées à la bonne personne.

1. Dans Agent Console, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Identity Mapping{{< /ui >}}.
2. Préparez un fichier CSV avec une ligne par personne et les colonnes suivantes :

   | Colonne | Exigence |
   |--------|-------------|
   | `email` | Requis |
   | `github_login` | Requis si vous utilisez GitHub |
   | `microsoft_upn` | Optionnel |
   | `jira_account_id` | Optionnel |
   | `datadog_handle` | Optionnel |

   Séparez les différents alias d'e-mail, identifiants GitHub ou identifiants de compte Jira par des points-virgules. Le premier e-mail est l'e-mail canonique.

   Choisissez n'importe quelle colonne avec des valeurs uniques, telle que `email`, comme identifiant principal. Vous pouvez également ajouter votre propre colonne à cette fin, comme un identifiant d'employé.
3. Téléversez le fichier CSV (10 Mio maximum), prévisualisez le mappage et enregistrez-le.

{{< img src="/ai_agents_console/agent_console_identity_mapping.png" alt="Boîte de dialogue Set up identity mappings affichant les colonnes CSV obligatoires et facultatives ainsi qu'une zone de téléversement de fichier CSV" style="width:100%;" >}}

## Validez vos données {#validate-your-data}

Après avoir connecté vos outils, ouvrez [Agent Console][1] et vérifiez que chaque intégration connectée apparaît comme active sous l'onglet {{< ui >}}Overview{{< /ui >}}. La plupart des intégrations collectent des données une fois par jour, il peut donc s'écouler jusqu'à 24 heures avant que les données n'apparaissent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://app.datadoghq.com/organization-settings/roles
[3]: /fr/integrations/anthropic-usage-and-costs/
[4]: https://code.claude.com/docs/en/server-managed-settings
[5]: /fr/integrations/openai-codex/
[6]: /fr/integrations/cursor/?tab=datadogextensionforcursor
[7]: /fr/integrations/github-copilot/
[8]: https://github.com/datadog-labs/trajectory
[9]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[10]: /fr/integrations/github/
[11]: /fr/integrations/jira/
[12]: /fr/integrations/openai/?tab=apikey