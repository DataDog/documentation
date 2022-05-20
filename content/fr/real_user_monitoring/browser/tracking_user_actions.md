---
title: Suivi des actions utilisateur
kind: documentation
further_reading:
  - link: /real_user_monitoring/guide/send-rum-custom-actions/
    tag: Guide
    text: Envoyer des actions RUM personnalisées à partir du code
  - link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /real_user_monitoring/explorer/visualize/
    tag: Documentation
    text: Appliquer des visualisations sur vos événements
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: Dashboards RUM
---
Le SDK Browser Real User Monitoring (RUM) détecte automatiquement les interactions des utilisateurs lors de leur parcours.

La collecte automatique des actions utilisateur vous permet de mieux comprendre le comportement de vos utilisateurs, sans avoir à instrumenter manuellement chaque clic dans votre application. Grâce à cette fonctionnalité, vous disposez de toutes les informations dont vous avez besoin pour :
* Mesurer les performances des interactions clés (par exemple, un clic sur le bouton « Ajouter au panier »)
* Quantifier l'adoption d'une fonction
* Identifier les étapes menant à une erreur spécifique dans un navigateur

Vous pouvez recueillir des interactions utilisateur supplémentaires en [envoyant vos propres actions personnalisées](actions-personnalisees).

**Remarque** : le paramètre d'initialisation `trackInteractions` active la collecte des clics utilisateur dans votre application. Les **données sensibles et confidentielles** figurant sur vos pages peuvent être recueillies, afin d'identifier les éléments ayant fait l'objet d'une interaction. Vous pouvez contrôler les informations envoyées à Datadog en [définissant manuellement un nom d'action](#declarer-un-nom-pour-les-actions-de-clic) ou en [appliquant des règles globales de scrubbing dans le SDK Browser][1].

## Quelles sont les interactions surveillées ?

Le SDK Browser surveille automatiquement les clics. Une action de clic est créée lorsque **toutes** les conditions suivantes sont respectées :
* Une activité est détectée dans un délai de 100 ms après le clic (une activité correspond au lancement d'une requête réseau ou à une mutation DOM).
* Le clic n'entraîne pas le chargement d'une nouvelle page, auquel cas le SDK Browser génère un nouvel événement de vue RUM.
* Un nom peut être déterminé pour l'action ([en savoir plus sur le nommage d'actions](declarer-un-nom-pour-les-actions-de-clic)).

## Métriques de durée des actions

Pour en savoir plus sur les attributs par défaut de tous les types d'événements RUM, consultez la section relative à la [collecte de données RUM][2]. Pour obtenir des instructions afin de configurer l'échantillonnage ou le contexte global, consultez la section [Modifier des données RUM et leur contexte][1].

| Métrique    | Type   | Rôle              |
|--------------|--------|--------------------------|
| `action.loading_time` | nombre (ns) | La durée de chargement de l'action.  |
| `action.long_task.count`        | nombre      | Nombre total de tâches longues recueillies pour cette action. |
| `action.resource.count`         | nombre      | Nombre total de ressources recueillies pour cette action. |
| `action.error.count`      | nombre      | Nombre total d'erreurs recueillies pour cette action.|

### Méthode de calcul de la durée de chargement d'une action

Lorsqu'une interaction est détectée, le SDK RUM surveille les requêtes réseau et les mutations DOM. L'action est considérée comme terminée lorsqu'aucune activité n'est effectuée sur la page pendant plus de 100 ms (une activité étant définie comme des requêtes réseau actives ou une mutation DOM).

## Attributs d'action

| Attribut    | Type   | Rôle              |
|--------------|--------|--------------------------|
| `action.id` | chaîne | UUID de l'action utilisateur. |
| `action.type` | chaîne | Type d'action utilisateur. Pour les actions utilisateur personnalisées, cet attribut est défini sur `custom`. |
| `action.target.name` | chaîne | Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions recueillies automatiquement. |
| `action.name` | chaîne | Nom courant de l'action créée (par exemple, `Clic sur #checkout`). Pour les actions utilisateur personnalisées, il s'agit du nom d'action indiqué dans l'appel de l'API. |

## Déclarer un nom pour les actions de clic

La bibliothèque RUM utilise diverses stratégies pour nommer les actions de clic. Si vous souhaitez contrôler davantage les noms utilisés, définissez un attribut `data-dd-action-name` sur les éléments cliquables (ou sur l'un de leurs parents) afin de nommer l'action. Exemple :

```html
<a class="btn btn-default" href="#" role="button" data-dd-action-name="Bouton de connexion">Essayer</a>

<div class="alert alert-danger" role="alert" data-dd-action-name="Ignorer l'alerte">
  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  <span class="sr-only">Error:</span>
  Saisissez une adresse e-mail valide
</div>
```

Depuis la [version 2.16.0][3], grâce au paramètre d'initialisation `actionNameAttribute`, vous pouvez indiquer votre propre attribut pour nommer l'action. Exemple :

```html
<script>
  DD_RUM.init({
    ...
    trackInteractions: true,
    actionNameAttribute: 'data-custom-name',
  ...
  })
</script>

<a class="btn btn-default" href="#" role="button" data-custom-name="Login button">Essayez !</a>
```

**Remarque** : lorsqu'un élément comprend les deux attributs, `data-dd-action-name` est prioritaire.

## Actions personnalisées

Les actions personnalisées correspondent à des actions utilisateur déclarées et envoyées manuellement, via l'API `addAction`. Elles servent à envoyer des informations sur un événement qui s'est produit lors d'un parcours utilisateur. Dans l'exemple suivant, le SDK RUM recueille les données du panier d'un utilisateur lorsqu'il clique sur le bouton de paiement. Cette action récupère le nombre d'articles dans le panier, la liste des articles et le montant total du panier.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
datadogRum.addAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addAction('<NOM>', '<OBJET_JSON>');
})

// Exemple de code
DD_RUM.onReady(function() {
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM && DD_RUM.addAction('<NOM>', '<OBJET_JSON>');

// Exemple de code
window.DD_RUM &&
    DD_RUM.addAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/modifying_data_and_context/
[2]: /fr/real_user_monitoring/browser/data_collected/#default-attributes
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2160