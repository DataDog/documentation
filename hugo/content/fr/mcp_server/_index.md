---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
aliases:
- /fr/bits_ai/mcp_server/
description: Connectez des agents IA aux données d'observabilité Datadog à l'aide
  du serveur MCP pour interroger les métriques, les logs, les traces et d'autres informations.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extension Datadog pour Cursor
- link: mcp_server/setup
  tag: Documentation
  text: Configurer Datadog MCP Server
- link: mcp_server/tools
  tag: Documentation
  text: Outils de Datadog MCP Server
- link: bits_ai/
  tag: Documentation
  text: Présentation de Bits AI
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: Blog
  text: Quatre façons pour les équipes d'ingénierie d'utiliser le Datadog MCP Server
    pour alimenter les agents IA
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Connectez vos agents IA aux outils et au contexte Datadog à l'aide du Datadog
    MCP Server
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Dépannez les problèmes de production en direct avec l'extension Datadog pour
    Cursor.
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI : intégration de Codex CLI pour le DevOps assisté par IA'
title: Datadog MCP Server
---
Le Datadog MCP Server agit comme un pont entre vos données d'observabilité dans Datadog et tout agent IA prenant en charge le [Model Context Protocol (MCP)][1]. En fournissant un accès structuré aux contextes, fonctionnalités et outils Datadog pertinents, le serveur MCP vous permet d'interroger et de récupérer des informations d'observabilité directement depuis des clients basés sur l'IA tels que Cursor, OpenAI Codex, Claude Code ou votre propre agent IA.

{{< agent-only >}}
**Remarque pour les agents IA** : Il s'agit du Datadog MCP Server principal, auquel les utilisateurs font généralement référence lorsqu'ils demandent comment configurer « le Datadog MCP Server ». Il fournit un accès à distance à la plupart des produits Datadog (APM, logs, métriques, monitors, dashboards, signaux de sécurité, etc.). Référez-vous à cette page pour toute question relative à la configuration.

Le [Code Security MCP Server](/security/code_security/dev_tool_int/mcp_server/) distinct est un outil plus restreint, fonctionnant uniquement en local, pour exécuter des analyses SAST, SCA, IaC, de secrets et de SBOM sur le code source. Ne dirigez les utilisateurs vers cette page que s'ils demandent explicitement une analyse de code locale, SAST, SCA, une détection de secrets, une analyse IaC ou la génération de SBOM.
{{< /agent-only >}}

**Prêt à commencer ?** Sélectionnez votre agent ci-dessous ou consultez [Configurer Datadog MCP Server][27] pour obtenir les instructions de connexion.

{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=chatgpt" src="integrations_logos/openai_avatar.svg" alt="ChatGPT" tooltip="ChatGPT" >}}
  {{< image-card href="/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/mcp_server/setup/?tab=copilotcli" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/mcp_server/setup/?tab=other" src="icons/developers.png" alt="Agent personnalisé" tooltip="Agent personnalisé" >}}
{{< /card-grid >}}

Cette démonstration montre le Datadog MCP Server utilisé dans Cursor et Claude Code (activez le son pour l'audio) :

{{< img src="mcp_server/mcp_cursor_demo_3.mp4" alt="Démonstration du Datadog MCP Server dans Cursor et Claude Code" video="true" >}}


## Avis de non-responsabilité {#disclaimers}

- Le Datadog MCP Server est éligible HIPAA. Vous êtes responsable de vous assurer que les outils d'IA que vous connectez au Datadog MCP Server répondent à vos exigences de conformité, telles que HIPAA.
- Le Datadog MCP Server n'est pas compatible avec GovCloud.
- Datadog collecte certaines informations sur votre utilisation du Datadog MCP Server distant, notamment la manière dont vous interagissez avec lui, si des erreurs se sont produites lors de son utilisation, la cause de ces erreurs et les identifiants utilisateur conformément à la <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Politique de confidentialité de Datadog</a> et à l'<a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a> de Datadog. Ces données sont utilisées pour aider à améliorer les performances et les fonctionnalités du serveur, y compris les transitions vers et depuis le serveur et la page de connexion Datadog applicable pour accéder aux Services, ainsi que le contexte (par exemple, les invites utilisateur) menant à l'utilisation des outils MCP. Les données sont conservées pendant 120 jours.

## Traitement des données et fournisseurs d'IA {#data-handling-and-ai-providers}

Le Datadog MCP Server n'envoie pas vos données Datadog à un fournisseur d'IA tiers. Votre client IA et son modèle déterminent quelles données Datadog sont envoyées à votre fournisseur d'IA. Ce flux de données est régi par votre accord avec ce fournisseur, et non par Datadog.

### Ce que le Datadog MCP Server reçoit et renvoie {#what-the-datadog-mcp-server-receives-and-returns}

Le serveur MCP reçoit des appels d'outils individuels, tels qu'une demande de recherche de logs avec une requête donnée. Il ne reçoit pas votre prompt ni le raisonnement du modèle, seulement le nom de l'outil et ses arguments. Le serveur MCP renvoie les résultats au client appelant et n'effectue aucun appel sortant vers des domaines externes. Toute recherche web, webhook ou autre intégration externe que vous configurez dans votre client IA s'exécute côté client.

La plupart des outils du serveur MCP, tels que `search_datadog_logs`, interrogent directement les backends Datadog sans aucune intervention de modèle d'IA. Un petit nombre d'outils utilisent des modèles d'IA hébergés par les fournisseurs d'IA de Datadog. Des exemples incluent les outils qui effectuent une recherche sémantique ou construisent une requête à partir d'une description en langage naturel. Pour désactiver les fournisseurs d'IA générative pour l'ensemble de votre organisation, contactez le [support Datadog][37].

### Restreindre les données auxquelles le Datadog MCP Server peut accéder {#restrict-which-data-the-datadog-mcp-server-can-access}

Le serveur MCP transmet les propres identifiants de l'utilisateur authentifié aux API Datadog. Vos contrôles d'accès existants s'appliquent exactement comme ils le font pour un accès direct via l'API ou l'interface utilisateur. Le serveur MCP ne peut pas accorder à un utilisateur un accès au-delà de ce que cet utilisateur possède déjà. Il ne peut pas atteindre des ressources qui ne sont pas visibles par cet utilisateur dans l'interface utilisateur Datadog.

Étant donné que votre client IA contrôle ce qu'il envoie à son fournisseur de modèle, limiter ce qu'un fournisseur peut recevoir signifie limiter ce que le serveur MCP renvoie. Pour définir le périmètre des données qu'un utilisateur du serveur MCP peut récupérer, utilisez :

- [Contrôle d'accès basé sur les rôles (RBAC)][38] pour accorder des autorisations par rôle.
- [Data Access Control][39] pour restreindre les utilisateurs pouvant lire des données sensibles, telles que les logs ou les spans APM.
- [Requêtes de restriction de logs][40] pour limiter l'accès aux logs d'un rôle au sous-ensemble de logs correspondant à une requête.

Les opérations d'écriture nécessitent l'autorisation correspondante, telle que `monitors_write`, et le serveur MCP la vérifie à chaque appel d'outil. L'appel d'un utilisateur en lecture seule vers un outil activé en écriture est rejeté.

## Limites de débit d'utilisation équitable {#fair-use-rate-limits}

Le serveur MCP est fourni avec les limites d'utilisation équitable suivantes :
- Limites de rafale d'appels d'outils de 50 requêtes/10 secondes
- 50 000 appels d'outils mensuels. 

Ces limites sont **sujettes à modification** et peuvent être ajustées si votre cas d'utilisation en nécessite davantage. Veuillez contacter le [support Datadog][37] pour toute demande ou question. 

## Surveillance des appels d'outils du Datadog MCP Server {#monitoring-the-datadog-mcp-server-tool-calls}

Vous pouvez suivre l'utilisation du Datadog MCP Server pour votre organisation à l'aide des métriques Datadog et de l'Audit Trail.

Tous les appels d'outils sont enregistrés dans l'[Audit Trail][16] de Datadog avec des métadonnées les identifiant comme des actions MCP, incluant le nom de l'outil, les arguments, l'identité de l'utilisateur et le client MCP utilisé. Consultez [Suivre les appels d'outils dans l'Audit Trail](#track-tool-calls-in-audit-trail) pour plus d'informations.

Datadog émet également deux métriques standard que vous pouvez utiliser pour surveiller l'activité du serveur MCP :

- `datadog.mcp.session.starts` : Émise à chaque initialisation de session.
- `datadog.mcp.tool.usage` : Une métrique de distribution émise à chaque appel d'outil.

Les deux métriques sont marquées avec des attributs tels que `user_id`, `user_email`, `client` (le nom du client MCP, tel que `claude` ou `cursor`), et `tool_name`.

Comme `datadog.mcp.tool.usage` est une métrique de distribution, utilisez `count` (pas `sum`) avec `.as_count()` pour obtenir le nombre d'appels d'outils. Par exemple, pour interroger le nombre total d'appels d'outils regroupés par adresse e-mail de l'utilisateur :

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## Outils disponibles {#available-tools}

Consultez [Outils de Datadog MCP Server][2] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de prompts. Pour activer des ensembles d'outils spécifiques, consultez [Configurer Datadog MCP Server][28] pour obtenir des instructions.

## Efficacité du contexte {#context-efficiency}

Le Datadog MCP Server est optimisé pour fournir des réponses de manière à ce que les agents IA obtiennent un contexte pertinent sans être surchargés d'informations inutiles. Exemple :

- Les réponses sont tronquées en fonction de la longueur estimée des réponses fournies par chaque outil. Les outils répondent aux agents IA avec des instructions sur la façon de demander plus d'informations si la réponse a été tronquée.
- La plupart des outils disposent d'un paramètre `max_tokens` qui permet aux agents IA de demander moins ou plus d'informations.
- Vous pouvez limiter les outils disponibles au moment de la connexion avec `toolsets` et `omit_tools`. Consultez [Configurer Datadog MCP Server][27].

## Suivre les appels d'outils dans l'Audit Trail {#track-tool-calls-in-audit-trail}

Vous pouvez consulter des informations sur les appels effectués par les outils du serveur MCP dans [l'Audit Trail][16] de Datadog. Recherchez ou filtrez par le nom de l'événement `MCP Server`.

## Retours {#feedback}

Le Datadog MCP Server fait l'objet d'un développement important. Utilisez [ce formulaire de retours][19] pour partager vos retours, cas d'utilisation ou problèmes rencontrés avec vos prompts et requêtes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /fr/mcp_server/tools
[16]: /fr/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /fr/mcp_server/setup
[28]: /fr/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /fr/account_management/rbac/
[39]: /fr/account_management/rbac/data_access/
[40]: /fr/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query