---
aliases:
- /fr/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: Découvrez comment envoyer des actions personnalisées pour recueillir
  des interactions utilisateur supplémentaires.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans le RUM Explorer

private: true
title: Envoyer des actions RUM personnalisées
---
## Présentation

La solution Real User Monitoring [recueille automatiquement des actions][1] effectuées sur vos applications Web. Vous pouvez également recueillir des événements et des durées supplémentaires, par exemple pour le remplissage de formulaires et les transactions opérationnelles.

Les actions RUM personnalisées vous permettent de surveiller des événements pertinents tout en disposant de tous les éléments de contexte pertinents associés. Le SDK Browser de Datadog peut par exemple recueillir des informations sur le paiement d'un utilisateur (telles que le nombre d'articles dans le panier, la liste des articles et le montant des différents articles) lorsque celui-ci valide un paiement sur un site Web d'e-commerce.

## Instrumenter votre code

Créez une action RUM à l'aide de l'API `addAction`. Attribuez un nom à l'action et ajoutez-lui des attributs de contexte sous la forme d'un objet JavaScript.

L'exemple suivant permet de créer une action `checkout` incluant des informations à propos du panier de l'utilisateur lorsqu'il clique sur le bouton de paiement.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // par exemple, 42,12
        'items': cart.items, // par exemple, ['tomate', 'fraises']
    })
}
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

Assurez-vous d'incorporer l'appel API avec le rappel `onReady` :

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // par exemple, 42.12
            'items': cart.items, // par exemple, ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN synchrone" %}}

Assurez-vous de vérifier `window.DD_RUM` avant de procéder à l'appel API :

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NOM>', '<OBJET_JSON>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // par exemple, 42.12
        'items': cart.items, // par exemple, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

Tout le contexte RUM, comme les informations sur l'affichage de la page en cours, les données geoIP et les informations sur le navigateur, est automatiquement associé. De plus, des attributs supplémentaires sont fournis via l'[API de contexte global][2].

## Créer des facettes et des mesures sur les attributs

Après avoir déployé le code qui crée vos actions personnalisées, ces dernières s'affichent dans l'onglet **Actions** du [RUM Explorer][3].

Pour filtrer vos actions personnalisées, utilisez l'attribut `Action Target Name` : `@action.target.name:<NOM_ACTION>`.

Dans l'exemple ci-dessous, le filtre `@action.target.name:checkout` est appliqué.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="Créer une facette pour des actions RUM personnalisées" video=true style="width:100%;">}}

Lorsque vous cliquez sur une action, un volet latéral présentant des métadonnées s'affiche. Les attributs de vos actions se trouvent à la section **Custom Attributes**. Cliquez sur un attribut pour créer une facette ou une mesure.

Les facettes permettent d'utiliser des valeurs distinctives (comme des ID), tandis que les mesures sont dédiées aux valeurs quantitatives (comme des durées ou une latence). Vous pouvez par exemple créer une facette pour les articles du panier et une mesure pour la valeur du panier.

## Utiliser des attributs dans le RUM Explorer

Vous pouvez utiliser des attributs d'action, ainsi que des facettes et mesures, dans le [RUM Explorer][3] pour créer des widgets de dashboard, des monitors et des requêtes avancées.

L'exemple suivant permet d'afficher la valeur moyenne du panier par pays au cours des deux derniers jours. Cliquez sur le bouton **Export** pour exporter la requête de recherche au sein d'un widget de dashboard ou d'un monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Utiliser des actions RUM dans le RUM Explorer" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=useraction#automatic-collection-of-actions
[2]: /fr/real_user_monitoring/browser/modifying_data_and_context/#replace-global-context
[3]: /fr/real_user_monitoring/explorer