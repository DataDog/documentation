---
description: Surveillez et analysez l'utilisation, le coût et la performance des agents
  de codage et des Bits AI agents au sein de votre organisation via Datadog Agent
  Console.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Configurez Agent Console.
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentation
  text: Intégration de l'utilisation et des coûts d'Anthropic.
- link: /integrations/cursor/
  tag: Documentation
  text: Intégration de Cursor
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Surveillez l'adoption de Claude Code dans votre organisation avec Datadog
    Agent Console.
title: Agent Console.
---
{{< callout url="#" btn_hidden="true" header="Aperçu">}}
Agent Console est en preview et disponible pour tous les clients de Datadog.
{{< /callout >}}

L'[Agent Console][1] fournit une surveillance centralisée pour les agents d'IA au sein de votre organisation. Elle collecte des logs et des métriques des coding agents et des [Bits AI agents](#bits-ai-agents) de Datadog, les affichant en temps réel pour offrir une visibilité sur l'utilisation, le coût, la latence, l'impact sur la productivité et les modèles de problèmes émergents.

Agent Console prend en charge les agents de codage suivants :

| Outil | Description |
|------|-------------|
| [Claude Code][2] | Outil de codage agentic d'Anthropic|
| [Cursor][3] | Éditeur de code alimenté par l'IA |
| [GitHub Copilot][4] | Outil de complétion de code alimenté par l'IA de GitHub |


## Agents de codage {#coding-agents}

L'onglet {{< ui >}}Coding Agents{{< /ui >}} vous donne une vue d'ensemble de l'activité des agents de codage au sein de votre organisation. Par défaut, la vue agrège tous les agents de codage et peut être filtrée pour un seul agent.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Onglet des agents de codage de la console de l'agent montrant un résumé des résultats des agents avec des métriques et des tendances pour Claude Code, Cursor et GitHub Copilot" style="width:100%;" >}}

### Agent findings {#agent-findings}

Le {{< ui >}}Agent Findings{{< /ui >}} panneau résume l'activité de haut niveau pour la période sélectionnée, y compris les dépenses totales, le nombre total d'utilisateurs, les sessions, le temps de fusion, les lignes de code et le nombre moyen de tours par session. Le graphique empilé décompose l'activité par agent (par exemple, Claude Code et Cursor) afin que vous puissiez comparer l'adoption au fil du temps.

### Métriques d'impact {#impact-metrics}

Le {{< ui >}}Impact Metrics{{< /ui >}} panneau mesure l'effet du développement assisté par IA sur votre cycle de livraison de logiciels en utilisant des métriques de style DORA, avec des comparaisons côte à côte entre le travail assisté par IA et le travail non assisté par IA.

- **Adoption** : suivez la quantité de code produite par l'IA, y compris les commits assistés par IA et les PR assistés par IA.
- **Vitesse** : mesurez la rapidité avec laquelle les changements parviennent à la production, y compris le délai de mise en production et le temps de révision des PR.
- **Stabilité** : suivez la fiabilité des changements après leur déploiement, y compris le taux d'échec des changements et le temps de récupération.

### Detected Problems {#detected-problems}

Le {{< ui >}}Detected Problems{{< /ui >}} panneau met en évidence les modèles de problèmes courants que votre équipe rencontre et recommande des solutions. Le diagramme de Sankey montre comment les modèles de problèmes (tels que les vérifications sautées, les boucles de réessai et les relises de fichiers) circulent des agents individuels vers des dépôts spécifiques, avec un coût mensuel estimé pour chaque modèle.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Diagramme de Sankey des problèmes détectés montrant comment les sessions de Claude Code, Cursor et GitHub Copilot se rapportent aux modèles de problèmes, mettant en évidence les vérifications sautées." style="width:90%;" >}}

Cliquez sur un nœud {{< ui >}}Problem Pattern{{< /ui >}} pour ouvrir une vue détaillée qui inclut la définition du modèle, le coût mensuel estimé pour votre organisation, une liste de sessions signalées et une solution recommandée.

### Tableaux de bord des agents individuels {#individual-agent-dashboards}

L'onglet {{< ui >}}Coding Agents{{< /ui >}} affiche une tuile pour chaque agent de codage connecté (tels que Claude Code, GitHub Copilot et Cursor). Chaque tuile montre un résumé de l'activité de cet agent, y compris le nombre total d'utilisateurs, les dépenses totales et le coût par ligne de code.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="Le tableau de bord de Claude Code affiche des widgets pour les lignes ajoutées, les sessions, les commits et les métriques de performance." style="width:100%;" >}}

Cliquez sur une tuile d'agent, ou sélectionnez dans le menu déroulant {{< ui >}}All Coding Agents{{< /ui >}} en haut de la page, pour ouvrir un tableau de bord dédié à cet agent. Le tableau de bord dédié comprend des tuiles de résumé pour les dépenses totales, les sessions, les commits et les lignes ajoutées, ainsi que des graphiques de performance couvrant le volume de demandes, la latence, les modèles d'utilisation, les lignes ajoutées par rapport aux lignes supprimées, et les acceptations par rapport aux rejets des outils.

## Analyser l'utilisation des agents {#analyze-agent-usage}

L'onglet {{< ui >}}Analytics{{< /ui >}} fournit des détails granulaires pour les individus et les équipes, vous aidant à identifier les utilisateurs experts, les valeurs aberrantes et les modèles d'adoption au niveau de l'équipe.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="L'onglet Agent Console Analytics affichant des analyses détaillées des utilisateurs et des équipes pour l'utilisation des agents de codage, y compris les classements et les graphiques." style="width:100%;" >}}

### Team Comparison {#team-comparison}

Le panneau {{< ui >}}Comparison{{< /ui >}} vous aide à identifier les équipes qui investissent trop ou pas assez dans les outils d'IA par rapport à leur production. Comparez les dépenses, le coût par ligne et l'utilisation des modèles entre les équipes et par rapport à la référence de votre organisation pour trouver où des gains d'efficacité sont possibles ou où les coûts sont anormalement élevés.

### Analytique des utilisateurs {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Panneau User Analytics d'Agent Console affichant une répartition détaillée pour un utilisateur sélectionné, y compris les dépenses par agent, le mix de modèles et l'historique des PR." style="width:100%;" >}}

Le panneau {{< ui >}}User Analytics{{< /ui >}} vous donne une visibilité sur la manière dont les ingénieurs individuels utilisent les outils d'IA dans votre organisation. Utilisez le panneau pour :
- Identifier vos plus gros dépensiers et vos contributeurs les plus productifs
- Repérez les valeurs aberrantes en termes d'efficacité — ingénieurs avec des dépenses élevées mais une faible production, ou inversement.
- Voir une répartition complète des coûts par utilisateur, agent et modèle
- Examinez les dépenses, l'historique des PR et le mix de modèles de chaque individu.

## Bits AI agents {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Onglet Bits AI Agents affichant un graphique d'activité combiné au fil du temps et des cartes individuelles pour Bits Investigation, Bits Code et Bits Agent Builder, montrant les enquêtes, sessions et exécutions récentes." style="width:100%;" >}}

L'onglet {{< ui >}}Bits AI Agents{{< /ui >}} montre l'utilisation des AI agents intégrés de Datadog aux côtés de vos agents de codage. La vue combinée des enquêtes, sessions et exécutions à travers tous les agents Datadog vous permet de corréler l'activité AI Bits avec le reste de votre organisation.

Des cartes individuelles résument l'activité de chaque Bits AI agent, y compris [Bits Investigation][5], [Bits Code][6] et [Bits Agent Builder][7]. Cliquez sur {{< ui >}}View Details{{< /ui >}} une carte pour examiner cet agent.

## Configurez {#set-up}

Pour commencer à envoyer des données à Agent Console, consultez [Set Up Agent Console][8].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /fr/integrations/github-copilot/
[5]: /fr/bits_ai/bits_ai_sre/
[6]: /fr/bits_ai/bits_ai_dev_agent/
[7]: /fr/actions/agents/
[8]: /fr/ai_agents_console/setup/