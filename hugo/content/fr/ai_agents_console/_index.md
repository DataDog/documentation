---
description: Surveillez et analysez l'utilisation, le coût et les performances des
  coding agents et des Bits AI agents dans votre organisation dans Datadog Agent Console.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Configurer Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentation
  text: Intégration de l'utilisation et des coûts d'Anthropic
- link: /integrations/cursor/
  tag: Documentation
  text: Intégration de Cursor
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Surveillez l'adoption de Claude Code dans votre organisation avec Datadog
    Agent Console.
- link: https://www.datadoghq.com/blog/datadog-agent-console/
  tag: Blog
  text: Surveillez l'adoption des agents avec Datadog Agent Console.
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Datadog Agent Console est en Preview et disponible pour tous les clients Datadog.
{{< /callout >}}

La [Agent Console][1] offre une surveillance centralisée des agents IA dans toute votre organisation. Elle collecte les logs et les métriques des agents de codage et des [agents Bits AI](#bits-ai-agents) de Datadog, et les affiche en temps réel pour vous offrir une visibilité sur l'utilisation, le coût, la latence, l'impact sur la productivité et les nouveaux modèles de problèmes.

Agent Console prend en charge les agents de codage suivants :

| Outil | Description |
|------|-------------|
| [Claude Code][2] | Outil de codage agentique d'Anthropic |
| [Cursor][3] | Éditeur de code assisté par IA |
| [GitHub Copilot][4] | Outil de complétion de code assisté par IA de GitHub |


## Agents de codage {#coding-agents}

L'onglet {{< ui >}}Coding Agents{{< /ui >}} vous donne une vue d'ensemble de l'activité des agents de codage dans votre organisation. Par défaut, la vue agrège tous les agents de codage et peut être filtrée pour un seul agent.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Onglet Coding Agents dans l'Agent Console affichant un résumé des résultats des agents avec des métriques et des tendances pour Claude Code, Cursor et GitHub Copilot" style="width:100%;" >}}

### Résultats des agents {#agent-findings}

Le panneau {{< ui >}}Agent Findings{{< /ui >}} résume l'activité de haut niveau pour la plage horaire sélectionnée, y compris les dépenses totales, le nombre total d'utilisateurs, les sessions, le temps de fusion, les lignes de code et le nombre moyen de tours par session. Le graphique empilé décompose l'activité par agent (par exemple, Claude Code et Cursor) afin que vous puissiez comparer l'adoption au fil du temps.

### Métriques d'impact {#impact-metrics}

Le panneau {{< ui >}}Impact Metrics{{< /ui >}} mesure l'effet du développement assisté par IA sur votre cycle de vie de livraison de logiciels en utilisant des métriques de type DORA, avec des comparaisons côte à côte entre le travail assisté par IA et le travail non assisté par IA.

- **Adoption** : suivez la quantité de code produite par l'IA, y compris les commits assistés par IA et les PR assistées par IA.
- **Vélocité** : mesurez la rapidité avec laquelle les changements atteignent la production, y compris le délai de traitement des changements et le temps de révision des PR.
- **Stabilité** : suivez la fiabilité des changements après leur publication, y compris le taux d'échec des changements et le temps de récupération.

### Problèmes détectés {#detected-problems}

Le panneau {{< ui >}}Detected Problems{{< /ui >}} met en évidence les modèles de problèmes courants rencontrés par votre équipe et recommande des correctifs. Le diagramme de Sankey montre comment les modèles de problèmes (tels que les vérifications ignorées, les boucles de nouvelle tentative et les relectures de fichiers) circulent des agents individuels vers des référentiels spécifiques, avec un coût mensuel estimé pour chaque modèle.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Diagramme de Sankey des problèmes détectés montrant comment les sessions de Claude Code, Cursor et GitHub Copilot correspondent aux modèles de problèmes, en mettant en évidence les vérifications ignorées" style="width:90%;" >}}

Cliquez sur un nœud {{< ui >}}Problem Pattern{{< /ui >}} pour ouvrir une vue détaillée qui inclut la définition du modèle, le coût mensuel estimé pour l'ensemble de votre organisation, une liste des sessions signalées et un correctif recommandé.

### Tableaux de bord des agents individuels {#individual-agent-dashboards}

L'onglet {{< ui >}}Coding Agents{{< /ui >}} affiche une vignette pour chaque agent de codage connecté (tels que Claude Code, GitHub Copilot et Cursor). Chaque vignette affiche un résumé de l'activité de cet agent, y compris le nombre total d'utilisateurs, les dépenses totales et le coût par ligne de code.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="Le dashboard Claude Code affiche des widgets pour les lignes ajoutées, les sessions, les commits et les métriques de performance" style="width:100%;" >}}

Cliquez sur une vignette d'agent, ou sélectionnez dans le menu déroulant {{< ui >}}All Coding Agents{{< /ui >}} en haut de la page, pour ouvrir un dashboard dédié à cet agent. Le dashboard dédié comprend des vignettes récapitulatives pour les dépenses totales, les sessions, les commits et les lignes ajoutées, ainsi que des graphiques de performance couvrant le volume de requêtes, la latence, les modèles d'utilisation, les lignes ajoutées par rapport aux lignes supprimées, et les outils acceptés par rapport aux outils rejetés.

## Analyser l'utilisation de l'agent {#analyze-agent-usage}

L'onglet {{< ui >}}Analytics{{< /ui >}} fournit des détails granulaires pour les individus et les équipes, vous aidant à identifier les utilisateurs intensifs, les valeurs aberrantes et les modèles d'adoption au niveau de l'équipe.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="L'onglet Agent Console Analytics affiche des analyses détaillées des utilisateurs et des équipes pour l'utilisation des agents de codage, y compris des classements et des graphiques." style="width:100%;" >}}

### Comparaison d'équipe {#team-comparison}

Le panneau {{< ui >}}Comparison{{< /ui >}} vous aide à identifier les équipes qui surinvestissent ou sous-investissent dans les outils d'IA par rapport à leur production. Comparez les dépenses, le coût par ligne et l'utilisation des modèles entre les équipes et par rapport à la référence de votre organisation pour trouver où des gains d'efficacité sont possibles ou où les coûts sont anormalement élevés.

### User Analytics{#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Le panneau Agent Console User Analytics affiche une ventilation détaillée pour un utilisateur sélectionné, y compris les dépenses par agent, la combinaison de modèles et l'historique des PR." style="width:100%;" >}}

Le panneau {{< ui >}}User Analytics{{< /ui >}} vous donne une visibilité sur la façon dont les ingénieurs individuels utilisent les outils d'IA dans votre organisation. Utilisez le panneau pour :
- Identifier vos plus gros dépensiers et vos contributeurs les plus productifs
- Repérer les écarts d'efficacité — les ingénieurs avec des dépenses élevées mais une faible production, ou vice versa
- Voir une ventilation complète des coûts par utilisateur, agent et modèle
- Examiner les dépenses, l'historique des PR et la combinaison de modèles pour chaque individu.

## Bits AI agents{#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Onglet Bits AI Agents avec un graphique combiné de l'activité des agents au fil du temps et des cartes individuelles pour Bits Investigation, Bits Code et Bits Agent Builder montrant les enquêtes, les sessions et les exécutions récentes." style="width:100%;" >}}

L'onglet {{< ui >}}Bits AI Agents{{< /ui >}} montre l'utilisation des built-in AI agents de Datadog parallèlement à vos agents de codage. La vue combinée des enquêtes, sessions et exécutions sur tous les agents Datadog vous permet de corréler l'activité de Bits AI avec le reste de votre organisation.

Des cartes individuelles résument l'activité pour chaque agent Bits AI, y compris [Bits Investigation][5], [Bits Code][6] et [Bits Agent Builder][7]. Cliquez sur {{< ui >}}View Details{{< /ui >}} sur une carte pour examiner cet agent.

## Set Up{#set-up}

Pour commencer à envoyer des données à Agent Console, consultez [Set Up Agent Console][8].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /fr/integrations/github-copilot/
[5]: /fr/bits_ai/bits_investigation/
[6]: /fr/bits_ai/bits_code/
[7]: /fr/actions/agents/
[8]: /fr/ai_agents_console/setup/