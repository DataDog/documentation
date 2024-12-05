---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Présentation du service Real User Monitoring (RUM) de Datadog
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentation
  text: Appliquer des visualisations sur vos événements
- link: /real_user_monitoring/dashboards/
  tag: Documentation
  text: En savoir plus sur les dashboards RUM
title: Suivi des actions utilisateur
---

## Présentation

La surveillance Browser détecte automatiquement les interactions utilisateur effectuées lors d'un parcours. Elle génère des insights à propos du comportement de vos utilisateurs, sans avoir à instrumenter manuellement chaque clic dans votre application.

Cette fonctionnalité vous aide à accomplir ce qui suit :

* Mesurer les performances des interactions clés (par exemple, un clic sur le bouton **Ajouter au panier**)
* Quantifier l'adoption d'une fonction
* Identifier les étapes menant à une erreur spécifique dans un navigateur

## Gérer les informations recueillies

Le paramètre d'initialisation `trackUserInteractions` permet d'activer la collecte de clics utilisateur dans votre application. Cette fonctionnalité est susceptible d'entraîner la collecte de données sensibles et privées figurant sur vos pages, dans le but d'identifier les éléments avec lesquels un utilisateur a interagi.

Pour contrôler les informations envoyés à Datadog, [définissez manuellement le nom d'une action](#declarer-un-nom-pour-les-actions-de-clic) ou [implémentez une règle de nettoyage globale dans le SDK Browser Datadog pour RUM][1].

## Suivi des interactions utilisateur

Le SDK Browser RUM surveille automatiquement les clics. Une action de clic est créée lorsque **toutes les conditions suivantes** sont respectées :

* L'activité après le clic est détectée. Consultez la documentation relative au [calcul de l'activité des pages][2] pour plus de détails.
* Le clic n'entraîne pas le chargement d'une nouvelle page, auquel cas le SDK Browser Datadog génère un autre événement de vue RUM.
* Un nom peut être déterminé pour l'action. Consultez la rubrique [Déclarer un nom pour les actions de clic](#declarer-un-nom-pour-les-actions-de-clic) pour en savoir plus.

## Métriques de durée des actions

Pour obtenir des informations sur les attributs par défaut pour tous les types d'événements RUM, consultez la section [Données RUM recueillies (Browser)][3]. 

| Métrique    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action.  |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

Le SDK Browser Datadog pour RUM calcule le temps de chargement de l'action en surveillant l'activité de la page suivant chaque clic. Une action est considérée comme terminée lorsqu'il n'y a plus d'activité sur la page. Consultez la documentation relative au [calcul de l'activité d'une page][2] pour en savoir plus.

Pour en savoir plus sur la configuration de l'échantillonnage ou du contexte global, consultez la section [Modifier des données RUM et leur contexte][1].

## Attributs d'action

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les actions utilisateur personnalisées, cet attribut est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les actions utilisateur personnalisées, il s'agit du nom d'action indiqué dans l'appel de l'API. |

## Déclarer un nom pour les actions de clic

Le SDK Browser Datadog pour RUM utilise diverses stratégies pour nommer les actions de clic. Si vous souhaitez contrôler davantage les noms utilisés, définissez un attribut `data-dd-action-name` sur les éléments cliquables (ou sur l'un de leurs parents) afin de nommer l'action.

Par exemple :

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Login button">Essayer</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Ignorer l'alerte">
    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
    <span class="visually-hidden">Error:</span>
    Saisissez une adresse e-mail valide
</div>
```

Depuis la [version 2.16.0][4], vous pouvez définir un attribut personnalisé pour nommer l'action, grâce au paramètre d'initialisation `actionNameAttribute`.

Par exemple :

```html
<script>
  window.DD_RUM.init({
    ...
    trackUserInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Essayer</a>
```

Lorsqu'un élément comprend les deux attributs, `data-dd-action-name` est prioritaire.

## Envoyer des actions personnalisées

Pour optimiser la collecte des interactions utilisateur, envoyez vos actions personnalisées à l'aide de l'API `addAction`. Ces actions personnalisées envoient des informations liées à un événement qui se produit pendant un parcours utilisateur. 

Pour en savoir plus, consultez la section [Envoyer des actions RUM personnalisées][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/modifying_data_and_context/
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[3]: /fr/real_user_monitoring/browser/data_collected/#default-attributes
[4]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160
[5]: /fr/real_user_monitoring/guide/send-rum-custom-actions