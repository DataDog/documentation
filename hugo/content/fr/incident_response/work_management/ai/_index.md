---
aliases:
- /fr/service_management/case_management/mcp_server/
- /fr/incident_response/case_management/mcp_server/
- /fr/incident_response/case_management/ai/
description: Datadog Work Management s'intègre aux outils d'IA pour aider à automatiser
  le triage, l'attribution et la résolution des éléments de travail à l'aide du MCP
  Server et d'agents personnalisés.
site_support_id: work_management_ai_site_support
title: Outils d'IA pour la gestion du travail
---
Datadog Work Management vous permet d'attribuer des éléments de travail à des agents d'IA aux côtés des personnes. Il s'intègre au Datadog MCP Server et aux agents personnalisés créés avec Bits Agent Builder pour automatiser le triage, l'attribution et la résolution des éléments de travail.

## MCP Server {#mcp-server}

Le Datadog MCP Server expose un ensemble d'outils `cases` afin que les agents d'IA prenant en charge le [Model Context Protocol (MCP)][2] puissent accéder aux données de Work Management. L'ensemble d'outils `cases` permet aux agents d'IA de créer, rechercher, mettre à jour et gérer des éléments de travail. Les flux de travail pris en charge incluent :

- **Recherche d'éléments de travail** en fonction du statut, de la priorité, du projet ou d'autres filtres
- **Récupération des détails d'un élément de travail** pour comprendre la chronologie la plus récente des actions et le travail restant
- **Création d'un nouvel élément de travail** pour suivre les informations liées à une enquête en cours
- **Mise à jour d'un élément de travail existant** avec de nouvelles constatations, des liens vers des tickets Jira associés ou une priorité élevée

Pour obtenir des instructions de configuration et des détails complets sur l'ensemble d'outils `cases`, consultez la [documentation du Datadog MCP Server][1].

## Agents personnalisés {#custom-agents}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Rejoindre la version préliminaire">}} L'intégration de Work Management avec des agents personnalisés est en version préliminaire.{{< /callout >}}

Attribuez des éléments de travail à des agents spécialisés créés avec [Bits Agent Builder][3] pour automatiser l'intégralité du cycle de vie des éléments de travail, du triage initial au suivi et à la résolution. Pour des exemples de cas d'utilisation, des archétypes d'agents, ainsi que l'attribution manuelle et automatisée, consultez [Agents personnalisés][4].

[1]: /fr/mcp_server
[2]: https://modelcontextprotocol.io/
[3]: /fr/actions/agents/
[4]: /fr/incident_response/work_management/ai/custom_agents/