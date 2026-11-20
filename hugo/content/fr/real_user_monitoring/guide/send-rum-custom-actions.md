---
algolia:
  tags:
  - addaction
aliases:
- /fr/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: Découvrez comment envoyer des actions personnalisées pour recueillir
  des interactions utilisateur supplémentaires.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans le RUM Explorer
- link: https://learn.datadoghq.com/courses/custom-data-rum-javascript
  tag: Centre d'apprentissage
  text: Collectez des données personnalisées avec RUM pour les applications Web JavaScript
private: true
title: Envoyer des actions RUM personnalisées
---
## Présentation {#overview}

Le Real User Monitoring [collecte automatiquement les actions][1] sur votre application Web. Vous pouvez collecter des événements supplémentaires et des durées, tels que la soumission de formulaires et les transactions commerciales.

Les actions RUM personnalisées vous permettent de surveiller des événements intéressants avec tout le contexte pertinent associé. Par exemple, le Datadog Browser SDK peut collecter les informations de checkout d'un utilisateur (telles que le nombre d'articles dans le panier, la liste des articles et la valeur totale des articles du panier) lorsqu'il clique sur le bouton de checkout sur un site e-commerce.

## Instrumentez votre code {#instrument-your-code}

Créez une action RUM à l'aide de `addAction` l'API. Donnez un nom à votre action et joignez des attributs de contexte sous la forme d'un objet JavaScript.

L'exemple suivant crée une action `checkout` avec des détails sur le panier de l'utilisateur lorsque celui-ci clique sur le bouton de checkout.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{% tab "CDN async" %}}

Assurez-vous d'encapsuler l'appel d'API avec le rappel `onReady` :

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // for example, 42.12
            'items': cart.items, // for example, ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN sync" %}}

Assurez-vous de vérifier `window.DD_RUM` avant l'appel d'API :

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

Tout le contexte RUM, comme les informations sur l'affichage de la page en cours, les données geoIP et les informations sur le navigateur, est automatiquement associé. De plus, des attributs supplémentaires sont fournis via l'[API de contexte global][2].

## Créez des facettes et des mesures sur les attributs {#create-facets-and-measures-on-attributes}

Après avoir déployé le code qui crée vos actions personnalisées, celles-ci apparaissent dans l'onglet {{< ui >}}Actions{{< /ui >}} du RUM Explorer [3].

Pour filtrer vos actions personnalisées, utilisez l'attribut `Action Target Name` : `@action.target.name:<ACTION_NAME>`.

L'exemple ci-dessous utilise le filtre suivant : `@action.target.name:checkout`.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action-3.mp4" alt="Créez une facette pour les actions RUM personnalisées" video=true style="width:100%;">}}

Après avoir cliqué sur une action, un panneau latéral contenant des métadonnées s'affiche. Vous pouvez trouver les attributs de votre action dans la section {{< ui >}}Custom Attributes{{< /ui >}} et créer des facettes ou des mesures pour ces attributs en cliquant dessus.

Utilisez des facettes pour les valeurs distinctives (ID) et des mesures pour les valeurs quantitatives telles que les durées et la latence. Par exemple, créez une facette pour les articles du panier et une mesure pour la valeur du panier.

## Utilisez des attributs dans le RUM Explorer {#use-attributes-in-the-rum-explorer}

Vous pouvez utiliser des attributs d'action, ainsi que des facettes et mesures, dans le [RUM Explorer][3] pour créer des widgets de dashboard, des monitors et des requêtes avancées.

L'exemple suivant affiche la valeur moyenne du panier par pays au cours des deux derniers jours. Cliquez sur le bouton {{< ui >}}Export{{< /ui >}} pour exporter la requête de recherche vers un widget de dashboard ou un monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics-2.png" alt="Utilisez les actions RUM dans le RUM Explorer" style="width:100%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /fr/real_user_monitoring/explorer