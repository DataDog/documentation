---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/generic_actions
- /fr/service_management/workflows/actions_catalog/generic_actions/
- /fr/service_management/workflows/actions
description: Utilisez les actions de workflow génériques pour le contrôle logique,
  la transformation de données, les requêtes HTTP et les opérations JavaScript dans
  vos workflows.
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
title: Actions
type: documentation
---

Datadog fournit une collection d'actions de workflow qui ne sont pas associées à un outil ni à une intégration spécifique. Ces actions vous permettent de mieux contrôler vos workflows en vous permettant d'effectuer des tâches de type :
- ajouter de la logique pour contrôler le chemin d'exécution de votre workflow.
- transformer les données collectées par une action.
- effectuer des requêtes HTTP personnalisées.

{{< whatsnext desc="En savoir plus sur les actions génériques :" >}}
    {{< nextlink href="/service_management/workflows/actions/flow_control" >}}Utiliser les actions logiques pour ajouter un intervalle de veille, créer une branche sur une condition, utiliser l'itération, et plus encore.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/expressions" >}}Effectuer des transformations de données personnalisées dans vos workflows à l'aide de JavaScript.{{< /nextlink >}}
    {{< nextlink href="/actions/connections/http" >}}Utiliser l'action HTTP pour effectuer une requête vers un endpoint personnalisé.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/saved_actions" >}}Utiliser la fonctionnalité <i>Saved Actions</i> pour stocker et réutiliser une action et ses paramètres.{{< /nextlink >}}
{{< /whatsnext >}}

Si votre cas d'utilisation n'est pas couvert par une intégration ou une action générique de Datadog, vous pouvez [demander une nouvelle action ou une intégration complète][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][2].

[1]: https://forms.gle/JzPazvxXox7fvA2R8
[2]: https://datadoghq.slack.com/