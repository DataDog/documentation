---
aliases:
- /fr/incident_response/case_management/ai/custom_agents/
description: Apprenez à utiliser des agents personnalisés créés avec Bits Agent Builder
  pour automatiser les workflows de Work Management dans Datadog.
further_reading:
- link: /actions/agents/
  tag: Documentation
  text: Bits Agent Builder
- link: /actions/actions_catalog/
  tag: Documentation
  text: Action Catalog
title: Agents IA Datadog
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Les fonctionnalités d'IA pour Work Management ne sont pas prises en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">L'intégration de Work Management avec des agents personnalisés est en préversion.</div>

## Présentation {#overview}

Work Management s'intègre avec [Bits Agent Builder][1], vous permettant de passer de la création, du triage et de la résolution manuels des éléments de travail à une approche automatisée. Attribuez des éléments de travail à des agents personnalisés pour prendre en charge vos différents workflows.

## Créer des agents personnalisés {#create-custom-agents}

Utilisez [Bits Agent Builder][1] pour créer des agents personnalisés capables de trier et de résoudre des éléments de travail. Les Agents peuvent effectuer n'importe quelle action depuis le [Action Catalog][2], y compris la création, la mise à jour et la résolution d'éléments de travail. Voici des exemples d'agents que vous pouvez créer pour les utiliser dans Work Management :

- **Trieur de problèmes** : Enrichit les éléments de travail entrants avec une structure et un contexte afin qu'un humain puisse agir sans préparation manuelle.
- **Agrégateur de signaux de sécurité** : Regroupe les signaux de sécurité associés dans un élément de travail d'investigation unifié pour éviter une analyse cloisonnée.
- **Implémenteur de fonctionnalités** : Transforme une spécification de demande de fonctionnalité en un brouillon de PR pour vous aider à livrer des améliorations plus rapidement.
- **Automatisateur de demandes d'accès informatique** : Examine les détails des éléments de travail, demande les informations manquantes à l'auteur et sollicite automatiquement les approbations requises auprès des administrateurs.
- **Premier intervenant du support** : Rédige une réponse initiale et lance le processus d'investigation pour les tickets de support afin d'aider à réduire le temps moyen de résolution (MTTR).

## Utilisation d'agents personnalisés dans Work Management {#using-custom-agents-in-work-management}

Attribuez manuellement ou automatiquement des éléments de travail aux Agents de Bits Agent Builder en utilisant le champ **Agent Assignee** dans les éléments de travail.

### Attribution manuelle {#manual-assignment}

Dans un élément de travail, sélectionnez un agent dans le menu déroulant du champ **Agent Assignee**.

### Attribution automatisée {#automated-assignment}

Utilisez les [règles d'automatisation des éléments de travail][3] pour attribuer automatiquement des éléments de travail aux agents :

1. Accédez à **[Work Management > Settings][4]**.
1. Sélectionnez le projet pour lequel vous souhaitez créer des règles d'automatisation.
1. Sélectionnez **Automation Rules**.
1. Cliquez sur **New Rule**.
1. Définissez un déclencheur pour déterminer quand la règle doit s'exécuter.
1. Sélectionnez **Assign Agent** et choisissez l'agent personnalisé auquel attribuer les éléments de travail correspondants.
1. Activez et nommez votre règle.

**Remarque** : Les Agents s'exécutent avec les autorisations de l'utilisateur qui a attribué l'agent à l'élément de travail.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/agents/
[2]: /fr/actions/actions_catalog/
[3]: /fr/incident_response/work_management/automation_rules/
[4]: https://app.datadoghq.com/work/settings