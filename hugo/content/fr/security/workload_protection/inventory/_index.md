---
aliases:
- /fr/security/workload_protection/inventory/coverage_map
- /fr/security/workload_protection/inventory/hosts_and_containers
- /fr/security/workload_protection/inventory/serverless
description: Évaluez la couverture de Workload Protection sur les hosts, ECS Fargate
  et EKS Fargate, y compris le statut de déploiement de l'Agent, des politiques et
  des règles.
disable_toc: false
further_reading:
- link: /security/detection_rules/#mitre-attck-map
  tag: Documentation
  text: Carte MITRE ATT&CK
- link: https://app.datadoghq.com/release-notes/review-your-workload-protection-coverage-with-the-coverage-map
  tag: Note de version
  text: Examinez votre couverture de Workload Protection avec la Coverage map.
title: Portée
---
Workload Protection [Coverage][1] fournit une vue en temps réel de la couverture de sécurité sur vos hosts, ECS Fargate et EKS Fargate. Utilisez Coverage pour évaluer la posture de protection, identifier les lacunes et agir sur les charges de travail non protégées ou mal configurées.

Coverage reflète si les politiques et les règles de l'Agent sur chaque ressource ont été chargées avec succès. Pour savoir comment les politiques atteignent vos Agent, consultez [Enable and deploy policies][5].

Pour identifier et combler les lacunes de couverture, consultez [Review and Improve Coverage][6].

{{< img src="security/workload_protection/coverage_page/coverage_explorer.png" alt="Vue de l'Explorer de la page Coverage montrant les ressources dans un tableau à facettes." width="100%">}}

## Vues {#views}

Coverage dispose de deux vues. Utilisez le bouton bascule en haut de la page pour passer de l'une à l'autre:

- {{< ui >}}Explorer{{< /ui >}} : Un tableau à facettes de vos ressources. Recherchez et filtrez les ressources par les facettes {{< ui >}}Agent{{< /ui >}}, {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Policy{{< /ui >}}, {{< ui >}}Infrastructure{{< /ui >}} et {{< ui >}}Container{{< /ui >}}, puis ouvrez une ressource pour inspecter ses règles d'Agent et le statut de déploiement des politiques.

- {{< ui >}}Map{{< /ui >}} : Une carte visuelle où chaque ressource apparaît sous forme d'hexagone coloré selon la gravité de son statut de couverture.

{{< img src="security/workload_protection/coverage_page/coverage_map.png" alt="Vue cartographique de la page Coverage montrant les ressources sous forme d'hexagones colorés selon le statut de couverture." width="100%">}}

Dans les deux vues, vous pouvez :

- {{< ui >}}Group by{{< /ui >}} Cloud Provider, OS, Agent Version, Severity, or Kubernetes Cluster.
- Actualiser la vue à la demande.

Une ressource apparaît dans Coverage dès que son Agent charge son ensemble de règles. Lorsqu'une ressource passe hors ligne, elle est supprimée de Coverage dans un délai de 15 minutes.

## Statuts de couverture {#coverage-statuses}

### Statut de couverture de la ressource {#resource-coverage-status}

Le statut de couverture de chaque ressource appartient à l'une des deux catégories de gravité, en fonction des règles qui y sont chargées :

| Gravité | Signification |
|----------|---------|
| Pass  | Toutes les règles ont été chargées avec succès ou ont été filtrées comme prévu. |
| Error | Une ou plusieurs règles comportent des erreurs qui doivent être corrigées ou la ressource indique des données incomplètes. |

Dans la vue cartographique, les ressources sont affichées sous forme d'hexagones colorés selon la gravité. Cliquez sur un hexagone pour inspecter une ressource et afficher ses politiques et ses règles.

### Statuts des politiques {#policy-statuses}

Chaque politique chargée sur une ressource possède l'un des statuts suivants :

- {{< ui >}}Loaded{{< /ui >}}: Toutes les règles de la politique ont été validées.
- {{< ui >}}Error{{< /ui >}}: Une ou plusieurs règles de la politique génèrent une erreur.

### Statuts des règles {#rule-statuses}

Chaque règle rapporte l'un des statuts suivants :

- {{< ui >}}Loaded{{< /ui >}}: La règle a été chargée avec succès.
- {{< ui >}}Filtered{{< /ui >}}: La règle n'a délibérément pas été appliquée (par exemple, la version de l'Agent est trop faible ou le type d'événement est désactivé).
- {{< ui >}}Error{{< /ui >}}: Le chargement de la règle a échoué.

Lorsqu'une règle est filtrée ou génère une erreur, un **verdict** en explique la raison :

| Verdict | Signification |
|---------|---------|
| `syntax_error` | L'expression de la règle n'est pas valide. |
| `unknown` | L'Agent n'a pas pu charger la règle. |
| `filtered_agent_version` | La version de l'Agent est trop faible pour cette règle. |
| `filtered_event_type_disabled` | Le type d'événement est désactivé dans la configuration. |
| `filtered_rule_filter` | La règle a été exclue par un filtre de règle. |

Pour comprendre pourquoi une règle échoue, sélectionnez la ressource pour ouvrir son panneau latéral. Le panneau latéral liste les politiques et les règles de la ressource. Pour chaque règle, il affiche l'expression, le statut et le verdict, ainsi que le message d'erreur indiqué par l'Agent.

{{< img src="security/workload_protection/coverage_page/coverage_side_panel.png" alt="Panneau latéral de la ressource affichant les statuts des politiques et des règles avec les verdicts" width="100%">}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/coverage
[5]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management#enable-and-deploy-policies
[6]: /fr/security/workload_protection/inventory/review_improve_coverage