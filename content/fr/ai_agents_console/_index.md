---
description: Surveillez l'utilisation, le coût et la performance des agents de codage
  et des agents Bits AI dans votre organisation via la console d'agent Datadog.
further_reading:
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Configurer la Console d'agent
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentation
  text: Intégration des coûts et de l'utilisation d'Anthropic
- link: /integrations/cursor/
  tag: Documentation
  text: Intégration de Cursor
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: Blog
  text: Surveillez l'adoption de Claude Code dans votre organisation avec la console
    d'agent de Datadog
title: Console d'agent
---
{{< callout url="#" btn_hidden="true" header="Aperçu">}}
La console d'agent est en aperçu et disponible pour tous les clients de Datadog.
{{< /callout >}}

La [console d'agent][1] fournit une surveillance centralisée pour les agents d'IA dans votre organisation. Elle collecte des journaux et des métriques des agents de codage et des [agents Bits AI](#bits-ai-agents) de Datadog, les affichant en temps réel pour vous donner une visibilité sur l'utilisation, le coût, la latence, l'impact sur la productivité et les modèles de problèmes émergents.

La Console d'agent prend en charge les agents de codage suivants :

| Outil | Description |
|------|-------------|
| [Claude Code][2] | Outil de codage agentique d'Anthropic |
| [Cursor][3] | Éditeur de code alimenté par l'IA |
| [GitHub Copilot][10] | Outil de complétion de code alimenté par l'IA de GitHub |


## Agents de codage {#coding-agents}

L'onglet {{< ui >}}Coding Agents{{< /ui >}} vous donne une vue d'ensemble de l'activité des agents de codage dans votre organisation. Par défaut, la vue agrège tous les agents de codage et peut être filtrée pour un seul agent.

### Constatations des agents {#agent-findings}

Le panneau {{< ui >}}Agent Findings{{< /ui >}} résume l'activité de haut niveau pour la période sélectionnée, y compris les dépenses totales, le nombre total d'utilisateurs, les sessions, le temps de fusion, les lignes de code et le nombre moyen de tours par session. Le graphique empilé décompose l'activité par agent (par exemple, Claude Code et Cursor) afin que vous puissiez comparer l'adoption au fil du temps.

{{< img src="ai_agents_console/agent-findings.png" alt="Le panneau des résultats des agents affichant des tuiles récapitulatives pour les Dépenses Totales, les Utilisateurs Totaux, les Sessions, le Temps de Fusion, les Lignes de Code et les Tours Moyens, avec un graphique à barres empilées de l'activité des agents sur une semaine." style="width:100%;" >}}

### Métriques d'impact {#impact-metrics}

Le panneau {{< ui >}}Impact Metrics{{< /ui >}} mesure l'effet du développement assisté par IA sur votre cycle de livraison de logiciels en utilisant des métriques de style DORA, avec des comparaisons côte à côte entre le travail assisté par IA et le travail non assisté par IA.

- **Adoption** : suivez combien de code est produit par l'IA, y compris les commits assistés par IA et les PR assistées par IA.
- **Vélocité** : mesurez à quelle vitesse les changements atteignent la production, y compris le temps de lead des changements et le temps de révision des PR.
- **Stabilité** : suivez la fiabilité des changements après leur publication, y compris le taux d'échec des changements et le temps de récupération.

{{< img src="ai_agents_console/impact-metrics.png" alt="Panneau des Métriques d'Impact avec trois cartes pour l'Adoption, la Vélocité et la Stabilité, chacune contenant deux graphiques de tendance comparant le travail assisté par IA au travail non assisté par IA." style="width:100%;" >}}

### Problèmes détectés {#detected-problems}

Le panneau {{< ui >}}Detected Problems{{< /ui >}} met en évidence les modèles de problèmes courants que votre équipe rencontre et recommande des solutions. Le diagramme de Sankey montre comment les modèles de problèmes (tels que les vérifications sautées, les boucles de réessai et les relectures de fichiers) s'écoulent des agents individuels vers des dépôts spécifiques, avec un coût mensuel estimé pour chaque modèle.

{{< img src="ai_agents_console/detected-problems.png" alt="Diagramme de Sankey des problèmes détectés cartographiant les sessions de Claude Code, Cursor et GitHub Copilot vers des modèles de problèmes tels que vérifications sautées, boucles de réessai et relectures de fichiers, puis vers les dépôts affectés, avec un panneau latéral montrant la ventilation des coûts par dépôt." style="width:100%;" >}}

Sélectionnez un modèle pour ouvrir une vue détaillée qui inclut la définition du modèle, le coût mensuel estimé pour votre organisation, une liste de sessions signalées et une solution recommandée.

{{< img src="ai_agents_console/detected-pattern-detail.png" alt="Vue détaillée du modèle détecté pour vérifications sautées, montrant la définition du modèle, un coût estimé de 8,50 $ par mois, un bouton Voir la recommandation, et une liste de 12 sessions signalées avec utilisateurs, agents, durées et coûts." style="width:100%;" >}}

### Tableaux de bord des agents individuels {#individual-agent-dashboards}

Sélectionnez une tuile d'agent pour ouvrir un tableau de bord dédié à cet agent de codage. Chaque tableau de bord comprend des tuiles récapitulatives pour les dépenses totales, les sessions, les commits et les lignes ajoutées, ainsi que des graphiques de performance couvrant le volume de demandes, la latence, les modèles d'utilisation, les lignes ajoutées vs supprimées, et les acceptations vs rejets des outils.

Filtrez chaque tableau de bord par équipe, utilisateur, dépôt et plage de temps.

{{< img src="ai_agents_console/coding-agent-dashboard.png" alt="Tableau de bord de Claude Code dans l'onglet Agents de Codage avec des filtres pour Équipes, Utilisateurs et Dépôt ; tuiles récapitulatives pour les Dépenses Totales, les Sessions, les Commits et les Lignes Ajoutées ; et graphiques de Performance pour les Commits au Fil du Temps, les Pull Requests au Fil du Temps, les Lignes Ajoutées par rapport aux Lignes Supprimées, et les Acceptations par rapport aux Rejets des Outils." style="width:100%;" >}}

## Analyser l'utilisation des agents {#analyze-agent-usage}

L'onglet {{< ui >}}Analytics{{< /ui >}} fournit des détails granulaires pour les individus et les équipes, vous aidant à identifier les utilisateurs puissants, les anomalies et les modèles d'adoption au niveau de l'équipe.

### Comparaison d'équipe {#team-comparison}

Le panneau {{< ui >}}Comparison{{< /ui >}} montre les dépenses de votre équipe, le coût par ligne et l'utilisation du modèle par rapport aux autres équipes et à l'organisation dans son ensemble. Le graphique linéaire montre la métrique sélectionnée par ingénieur au fil du temps, et le tableau décompose les dépenses par ingénieur, le coût par PR, le temps de fusion et les sessions pour chaque équipe. Les insights à droite mettent en évidence des tendances notables, telles que les équipes qui fonctionnent bien au-dessus ou en dessous de la moyenne de l'organisation.

Sélectionnez {{< ui >}}Team Details{{< /ui >}} sur une ligne pour ouvrir la vue de cette équipe.

{{< img src="ai_agents_console/team-comparison.png" alt="Panneau de comparaison avec un graphique linéaire des dépenses par ingénieur à travers les équipes au fil du temps, des encadrés d'insights à droite, et un tableau comparant les dépenses par ingénieur, le coût par PR, le temps de fusion et les sessions pour chaque équipe." style="width:100%;" >}}

### Analyse des utilisateurs {#user-analytics}

Le panneau {{< ui >}}User Analytics{{< /ui >}} décompose l'activité par utilisateur individuel.

#### Meilleurs utilisateurs {#top-users}

Trois classements classent vos meilleurs contributeurs par dépenses, lignes générées et PR fusionnées.

{{< img src="ai_agents_console/top-users.png" alt="Panneau d'analyse des utilisateurs montrant trois classements : Meilleurs utilisateurs par dépenses, Meilleurs utilisateurs par lignes générées, et Meilleurs utilisateurs par PR fusionnées." style="width:100%;" >}}

#### Lignes générées vs Dépenses {#lines-generated-vs-spend}

Le graphique {{< ui >}}Lines Generated vs Spend{{< /ui >}} trace chaque utilisateur comme un point, la taille du point reflétant le nombre de sessions. Les deux axes sont configurables afin que vous puissiez comparer les lignes générées, les PR ou les dépenses.

{{< img src="ai_agents_console/lines-vs-spend.png" alt="Nuage de points des Lignes Générées vs Dépenses, avec chaque utilisateur comme une bulle de taille proportionnelle au nombre de sessions et étiquetée avec des adresses e-mail." style="width:100%;" >}}

#### Coût utilisateur par agents {#user-cost-across-agents}

Le tableau {{< ui >}}User Cost Across Agents{{< /ui >}} liste chaque utilisateur, les agents qu'il utilise, son coût de modèle (avec une répartition par modèle), les lignes de code générées et le nombre de sessions. Recherchez un utilisateur spécifique ou triez par n'importe quelle colonne.

{{< img src="ai_agents_console/user-cost-across-agents.png" alt="Tableau Coût utilisateur par agents : montrant le coût par utilisateur du modèle, les agents utilisés, les lignes de code générées et les sessions pour 98 utilisateurs." style="width:100%;" >}}

Sélectionnez un utilisateur pour ouvrir une vue détaillée incluant ses dépenses, les lignes générées, les demandes de tirage, le pourcentage d'adoption de l'IA, le mélange de modèles et les demandes de tirage récentes. Passez à l'onglet {{< ui >}}GitHub Pull Requests{{< /ui >}} pour voir l'historique complet des demandes de tirage de l'utilisateur.

{{< img src="ai_agents_console/user-detail.png" alt="Vue détaillée de l'utilisateur pour un utilisateur individuel, montrant des tuiles récapitulatives pour les dépenses de l'utilisateur, les lignes générées et les demandes de tirage ; une répartition de l'adoption de l'IA et du mélange de modèles ; et un tableau des demandes de tirage récentes." style="width:100%;" >}}

## Agents Bits AI {#bits-ai-agents}

L'onglet {{< ui >}}Bits AI Agents{{< /ui >}} montre l'utilisation des agents IA intégrés de Datadog aux côtés de vos agents de codage. La vue combinée des enquêtes, des sessions et des exécutions à travers tous les agents Datadog vous permet de corréler l'activité des Bits AI avec le reste de votre organisation.

Des cartes individuelles résument l'activité de chaque agent Bits AI, y compris [Bits AI SRE][11], [Bits AI Dev Agent][12] et [Agent Builder][13]. Sélectionnez {{< ui >}}View Details{{< /ui >}} sur une carte pour examiner cet agent.

{{< img src="ai_agents_console/bits-ai-agents.png" alt="Onglet Agents Bits AI avec un graphique combiné d'activité des agents au fil du temps et des cartes individuelles pour Bits AI SRE, Bits AI Dev et Agent Builder montrant les enquêtes, sessions et exécutions récentes." style="width:100%;" >}}

## Configurer {#set-up}

Pour commencer à envoyer des données à la console de l'agent, consultez [Configurer la console de l'agent][14].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[10]: /fr/integrations/github-copilot/
[11]: /fr/bits_ai/bits_ai_sre/
[12]: /fr/bits_ai/bits_ai_dev_agent/
[13]: /fr/actions/agents/
[14]: /fr/ai_agents_console/setup/