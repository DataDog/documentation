---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: Connectez les agents IA aux données d'observabilité de Datadog en utilisant
  le serveur MCP pour interroger les métriques, les journaux, les traces et d'autres
  informations.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extension Datadog pour Cursor
- link: bits_ai/mcp_server/setup
  tag: Documentation
  text: Configurer le serveur MCP de Datadog
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Outils du serveur MCP de Datadog
- link: bits_ai/
  tag: Documentation
  text: Aperçu de Bits AI
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: Blog
  text: Quatre façons dont les équipes d'ingénierie utilisent le serveur MCP de Datadog
    pour alimenter les agents IA
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Connectez vos agents IA aux outils et au contexte de Datadog en utilisant
    le serveur MCP de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Déboguez les problèmes de production en direct avec l'extension Datadog Cursor
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI : intégration Codex CLI pour DevOps assisté par IA'
title: Serveur MCP de Datadog
---
Le serveur MCP de Datadog agit comme un pont entre vos données d'observabilité dans Datadog et tous les agents IA qui prennent en charge le [Modèle de Protocole de Contexte (MCP)][1]. En fournissant un accès structuré aux contextes, fonctionnalités et outils pertinents de Datadog, le serveur MCP vous permet d'interroger et de récupérer des informations d'observabilité directement depuis des clients utilisant l’IA tels que Cursor, OpenAI Codex, Claude Code ou votre propre agent IA.

**Prêt à commencer ?** Sélectionnez votre agent ci-dessous ou consultez [Configurer le serveur MCP de Datadog][27] pour les instructions de connexion.

{{< partial name="mcp_server/mcp_server_agents.html" >}}

Cette démonstration montre le serveur MCP de Datadog utilisé dans Cursor et Claude Code (activez le son pour l'audio) :

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Démonstration du serveur MCP de Datadog dans Cursor et Claude Code" video="true" >}}


## Avertissements {#disclaimers}

- Le serveur MCP de Datadog est éligible HIPAA. Vous êtes responsable de vous assurer que les outils IA que vous connectez au serveur MCP de Datadog répondent à vos exigences de conformité, telles que HIPAA.
- Le serveur MCP de Datadog n'est pas compatible avec GovCloud.
- Datadog collecte certaines informations sur votre utilisation du serveur MCP de Datadog à distance, y compris la manière dont vous interagissez avec celui-ci, si des erreurs se sont produites lors de son utilisation, ce qui a causé ces erreurs, et les identifiants des utilisateurs conformément à la <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Politique de confidentialité de Datadog</a> et au <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA de Datadog</a>. Ces données sont utilisées pour aider à améliorer les performances et les fonctionnalités du serveur, y compris les transitions vers et depuis le serveur et la page de connexion Datadog applicable pour accéder aux Services, ainsi que le contexte (par exemple, les invites utilisateur) menant à l'utilisation des outils MCP. Les données sont conservées pendant 120 jours.

## Limites de taux d'utilisation équitable {#fair-use-rate-limits}

Le serveur MCP est accompagné des limites d'utilisation équitable suivantes :
- 50 requêtes/10 secondes pour les limites de rafale d'appels d'outils
- 5000 appels d'outils par jour
- 50 000 appels d'outils par mois. 

Ces limites sont **susceptibles d'être modifiées** et peuvent être ajustées si votre cas d'utilisation nécessite davantage. Veuillez contacter [le support Datadog][37] pour toute demande ou question. 

## Surveillance des appels d'outils du serveur MCP Datadog {#monitoring-the-datadog-mcp-server-tool-calls}

Vous pouvez suivre l'utilisation du serveur MCP de Datadog pour votre organisation en utilisant les métriques Datadog et le Journal d'audit.

Tous les appels d'outils sont enregistrés dans le [Journal d'audit Datadog][16] avec des métadonnées les identifiant comme des actions MCP, y compris le nom de l'outil, les arguments, l'identité de l'utilisateur et le client MCP utilisé. Voir [Suivre les appels d'outils dans le Journal d'audit](#track-tool-calls-in-audit-trail) pour plus d'informations.

Datadog émet également deux métriques standard que vous pouvez utiliser pour surveiller l'activité du serveur MCP :

- `datadog.mcp.session.starts` : Émis à chaque initialisation de session.
- `datadog.mcp.tool.usage` : Une métrique de distribution émise à chaque appel d'outil.

Les deux métriques sont étiquetées avec des attributs tels que `user_id`, `user_email` et `client` (le nom du client MCP, tel que `claude` ou `cursor`).

Parce que `datadog.mcp.tool.usage` est une métrique de distribution, utilisez `count` (pas `sum`) avec `.as_count()` pour obtenir le nombre d'appels d'outils. Par exemple, pour interroger le nombre total d'appels d'outils regroupés par adresse e-mail utilisateur :

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## Outils disponibles {#available-tools}

Voir [Outils du serveur MCP de Datadog][2] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de requêtes. Pour activer des ensembles d'outils spécifiques, consultez [Configurer le serveur MCP de Datadog][28] pour des instructions.

## Efficacité contextuelle {#context-efficiency}

Le serveur MCP de Datadog est optimisé pour fournir des réponses de manière à ce que les agents IA obtiennent un contexte pertinent sans être submergés par des informations inutiles. Exemple :

- Les réponses sont tronquées en fonction de la longueur estimée des réponses fournies par chaque outil. Les outils répondent aux agents IA avec des instructions sur la façon de demander plus d'informations si la réponse a été tronquée.
- La plupart des outils ont un paramètre `max_tokens` qui permet aux agents IA de demander moins ou plus d'informations.

## Suivre les appels d'outils dans le Journal d'audit {#track-tool-calls-in-audit-trail}

Vous pouvez consulter des informations sur les appels effectués par les outils du serveur MCP de Datadog dans le [Journal d'audit][16] de Datadog. Recherchez ou filtrez par le nom de l'événement `MCP Server`.

## Retour d'information {#feedback}

Le serveur MCP de Datadog fait l'objet d'importants développements. Utilisez [ce formulaire de retour d'information][19] pour partager tout retour d'information, cas d'utilisation ou problèmes rencontrés avec vos requêtes et interrogations.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /fr/bits_ai/mcp_server/tools
[16]: /fr/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /fr/bits_ai/mcp_server/setup
[28]: /fr/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new