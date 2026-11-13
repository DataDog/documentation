---
description: Surveillez et analysez l'utilisation, le coût et la productivité des
  agents IA dans toute votre organisation dans Datadog Agent Console, notamment les
  agents de codage, les agents de connaissances et les agents Bits AI.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Configurer Agent Console
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

[Agent Console][1] permet de surveiller de manière centralisée les outils d'IA dans toute votre organisation. Elle collecte des données sur l'utilisation, le coût et l'activité des agents de codage, des agents de connaissances, des agents de bureau et des [agents Bits AI](#bits-ai-agents) de Datadog. Utilisez-la pour comprendre où vont vos dépenses en IA, qui utilise quels outils et comment le travail assisté par l'IA influe sur la livraison.

## Outils d'IA pris en charge {#supported-ai-tools}

| Outil | Type | Source de données |
|------|------|-------------|
| Claude Code | Agent de codage | Intégration [Anthropic Usage and Costs][2] ou OpenTelemetry pour les offres Claude Team |
| Cursor | Agent de codage | Intégration [Cursor][3] |
| GitHub Copilot | Agent de codage | Intégration [GitHub Copilot][4] |
| Codex | Agent de codage | Intégration [OpenAI Codex][5] |
| Claude Chat, Claude Cowork, Claude Design | Agent de connaissances | Intégration [Anthropic Usage and Costs][2] |
| ChatGPT Work | Agent de connaissances | Intégration [OpenAI][13] |
| Microsoft Copilot 365 (Preview) | Agent de connaissances | Intégration Microsoft Copilot. Pour demander l'accès, contactez l'équipe Datadog chargée de votre compte. |
| Autres agents de codage et de bureau | Agent de codage | [Trajectory][6] |

[Trajectory][6] est un outil open source qui capture les sessions de plus de 30 agents de codage et de bureau, notamment Claude Desktop, Cline, Windsurf, Zed et Goose. Pour la liste complète, consultez [Clients pris en charge][7].

Pour connecter ces outils, consultez [Configurer Agent Console][8].

## Présentation {#overview}

L'onglet {{< ui >}}Overview{{< /ui >}} affiche les dépenses en IA, l'adoption et la productivité de votre organisation en un seul endroit.

{{< img src="/ai_agents_console/agent_console_overview.png" alt="Onglet Agent Console Overview montrant le coût de l'IA suivi, le nombre total d'utilisateurs, le coût par PR observée et la répartition du coût suivi par domaine de produit et par principaux contributeurs aux coûts" style="width:100%;" >}}

Les vignettes récapitulatives en haut affichent le coût de l'IA suivi, le nombre total d'utilisateurs et le coût par pull request observée, chaque valeur étant comparée à celle de la période précédente.

Le graphique {{< ui >}}Tracked AI cost{{< /ui >}} montre comment les dépenses sont réparties entre les domaines de produits, tels que les agents de codage et autres agents, et quels outils contribuent le plus. Passez à {{< ui >}}Trend{{< /ui >}} pour voir comment le coût évolue au fil du temps, et sélectionnez un domaine de produit pour voir plus de détails.

### Productivité {#productivity}

La section {{< ui >}}Productivity{{< /ui >}} affiche les pull requests fusionnées, le temps de fusion, le coût par pull request observée et les tickets Jira résolus, tracés par rapport au coût de l'IA. Ces métriques proviennent de vos [outils de productivité][9] connectés, tels que GitHub et Jira.

{{< img src="/ai_agents_console/agent_console_productivity_overview.png" alt="Section Productivité montrant les PR fusionnées, le temps de fusion, le coût par PR observée et les tickets Jira résolus, chacun tracé par rapport au coût" style="width:100%;" >}}

### Integrations {#integrations}

La section {{< ui >}}Integrations{{< /ui >}} affiche une carte pour chaque source de données connectée, avec son statut, le nombre total d'utilisateurs, le coût estimé et l'utilisation des jetons. Activez {{< ui >}}Group by Provider{{< /ui >}} pour combiner les produits du même fournisseur, tels que Claude Code, Chat, Design et Cowork sous Anthropic.

{{< img src="/ai_agents_console/agent_console_integrations_overview.png" alt="Section Intégrations avec des cartes pour Anthropic, OpenAI, Cursor, Claude Code (OTel), GitHub Copilot, Microsoft Copilot, GitHub et Jira" style="width:100%;" >}}

Cliquez sur {{< ui >}}View Dashboard{{< /ui >}} sur une carte pour ouvrir un tableau de bord dédié à cette intégration. Filtrez chaque tableau de bord par équipe, utilisateur et modèle.

Par exemple, le tableau de bord Anthropic détaille le coût estimé et les jetons par produit Claude et par modèle :

{{< img src="/ai_agents_console/agent_console_integrations_anthropic.png" alt="Tableau de bord Anthropic montrant le coût estimé et les jetons pour l'entreprise, le coût par produit Claude (Claude Code, Chat, Design et Cowork), le coût au fil du temps et les jetons par modèle" style="width:100%;" >}}

Le tableau de bord Codex affiche le coût estimé, les utilisateurs actifs, les sessions, les crédits et les jetons, ainsi que les tendances d'utilisation et d'adoption et les principaux utilisateurs :

{{< img src="/ai_agents_console/agent_console_codex_integration.png" alt="Tableau de bord Codex affichant le coût estimé, les utilisateurs actifs, les sessions, les crédits, le nombre total de jetons, les sessions et les tours au fil du temps, les jetons par type, ainsi que les utilisateurs en tête du classement selon le nombre de tours et de crédits" style="width:100%;" >}}

## My Usage {#my-usage}

L'onglet {{< ui >}}My Usage{{< /ui >}} affiche votre propre utilisation de l'IA. Il comprend vos dépenses quotidiennes, présentées sous forme de graphique empilé par fournisseur, ainsi qu'une répartition des tâches pour lesquelles vous avez utilisé des agents IA. Filtrez par fournisseur et par modèle.

{{< img src="/ai_agents_console/agent_console_my_usage.png" alt="Onglet My Usage affichant un graphique des dépenses personnelles quotidiennes empilées par fournisseur et un graphique de répartition des tâches" style="width:100%;" >}}

Utilisez la navigation latérale pour basculer entre {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Productivity{{< /ui >}}, {{< ui >}}Models{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} et {{< ui >}}Sessions{{< /ui >}}. Les vues Tasks, Skills, Tools et Sessions utilisent les données de session de [Trajectory][6]. La vue Models utilise les données de vos intégrations connectées.

My Usage et Usage partagent les mêmes vues. Pour une description de chaque vue, consultez [Usage](#usage).

## Utilisation {#usage}

L'onglet {{< ui >}}Usage{{< /ui >}} propose les mêmes vues que My Usage, agrégées à l'échelle de votre organisation. Utilisez-le pour comprendre à quelles fins les équipes utilisent les agents IA, identifier les utilisateurs intensifs et les cas atypiques, et comparer l'adoption entre les équipes.

### Tâches {#tasks}

Agent Console classe les sessions d'agents capturées avec [Trajectory][6] en catégories de tâches, telles que l'implémentation de code, les opérations d'ingénierie et les artefacts de connaissances, ainsi qu'en sous-catégories plus spécifiques. La vue {{< ui >}}Tasks{{< /ui >}} représente chaque catégorie en fonction de sa part des tâches et des dépenses par utilisateur actif, et indique le coût, le coût par tâche et le nombre de tâches pour chacune.

{{< img src="/ai_agents_console/agent_console_tasks.png" alt="Vue Tasks avec un graphique à bulles des catégories de tâches selon leur part des tâches et les dépenses par utilisateur actif, ainsi qu'un tableau indiquant le coût, le coût par tâche et le nombre de tâches" style="width:100%;" >}}

Sélectionnez une catégorie de tâche pour ouvrir un panneau de détails avec ses sous-catégories, le coût par tâche, le coût total des tâches, le nombre de tâches et le nombre moyen de tours.

{{< img src="/ai_agents_console/agent_console_tasks_view.png" alt="Panneau de détails de la catégorie de tâches Engineering Operations affichant les tâches par sous-catégorie, le coût par tâche, le coût total des tâches, le nombre de tâches et le nombre moyen de tours" style="width:100%;" >}}

### Productivité des utilisateurs et des équipes{#user-and-team-productivity}

La vue {{< ui >}}Productivity{{< /ui >}} vous donne une visibilité sur la façon dont les ingénieurs individuels et les équipes utilisent les outils d'IA. Utilisez-le pour :
- Identifier vos plus gros dépensiers et vos contributeurs les plus productifs
- Repérez les cas atypiques en matière d'efficacité, comme les ingénieurs dont les dépenses sont élevées, mais la production faible
- Voir une ventilation complète des coûts par utilisateur, agent et modèle
- Examinez les dépenses, l'historique des pull requests et la répartition des modèles utilisés par chaque personne

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="Panneau de détails présentant, pour un utilisateur donné, la répartition des dépenses par agent, la répartition des modèles utilisés et l'historique des PR" style="width:100%;" >}}

### Modèles, compétences, outils et sessions {#models-skills-tools-and-sessions}

La vue {{< ui >}}Models{{< /ui >}} montre quels modèles votre organisation utilise, sur la base des données de vos intégrations connectées.

Pour les agents capturés avec [Trajectory][6], les vues {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} et {{< ui >}}Sessions{{< /ui >}} montrent quelles compétences et quels outils les agents utilisent, et vous permettent d'examiner les sessions individuelles des agents.

## Bits AI agents{#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="Onglet Bits AI Agents avec un graphique combiné de l'activité des agents au fil du temps et des cartes individuelles pour Bits Investigation, Bits Code et Bits Agent Builder montrant les enquêtes, les sessions et les exécutions récentes." style="width:100%;" >}}

L'onglet {{< ui >}}Bits AI Agents{{< /ui >}} montre l'utilisation des agents IA intégrés de Datadog aux côtés de vos autres outils d'IA. La vue combinée des enquêtes, sessions et exécutions sur tous les agents Datadog vous permet de corréler l'activité de Bits AI avec le reste de votre organisation.

Des cartes individuelles résument l'activité de chaque agent Bits AI, notamment [Bits Investigation][10], [Bits Code][11] et [Bits Agent Builder][12]. Cliquez sur {{< ui >}}View Details{{< /ui >}} sur une carte pour examiner cet agent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: /fr/integrations/anthropic-usage-and-costs/
[3]: /fr/integrations/cursor/
[4]: /fr/integrations/github-copilot/
[5]: /fr/integrations/openai-codex/
[6]: https://github.com/datadog-labs/trajectory
[7]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[8]: /fr/ai_agents_console/setup/
[9]: /fr/ai_agents_console/setup/#connect-productivity-tools
[10]: /fr/bits_ai/bits_investigation/
[11]: /fr/bits_ai/bits_code/
[12]: /fr/actions/agents/
[13]: /fr/integrations/openai/?tab=apikey