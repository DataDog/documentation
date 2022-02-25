---
title: Envoyer des actions RUM personnalisées
kind: guide
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Visualiser vos données RUM dans l'Explorer
aliases:
  - /fr/real_user_monitoring/guide/send-custom-user-actions/
---
## Présentation

La solution Real User Monitoring [recueille automatiquement les actions][1] effectuées sur votre application Web. Vous pouvez également choisir de recueillir des événements et des durées supplémentaires, notamment sur le remplissage de formulaires ou les transactions commerciales. Les actions RUM personnalisées vous aident à recueillir des événements importants tout en conservant le contexte pertinent associé. L'exemple de ce guide vise à recueillir des informations sur les paiements des utilisateurs effectués sur un site Web de e-commerce.

## Instrumenter votre code
Pour créer une action RUM, utilisez l'API `addAction`. Nommez votre action et ajoutez les attributs de contexte de votre choix sous la forme d'un objet JavaScript. Dans l'exemple suivant, une action `checkout` est créée lorsque l'utilisateur clique sur le bouton de paiement. Elle rassemble des informations sur le panier de l'utilisateur.

```javascript
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'value': cart.value, // par exemple, 42.12
        'items': cart.items, // par exemple, ['tomato', 'strawberries']
    })
}
```

Tout le contexte RUM (comme les informations sur l'affichage de la page en cours, les données geoIP, les informations sur le navigateur, etc.) est automatiquement associé et des attributs supplémentaires sont fournis via l'[API de contexte global][2].

## Créer des facettes et des mesures sur vos nouveaux attributs
Après avoir déployé le code qui crée vos actions personnalisées, celles-ci commencent à s'afficher dans le [RUM Explorer][3], dans l'onglet **Actions**.

Pour filtrer vos nouvelles actions personnalisées, utilisez l'attribut `Action Target Name` comme suit : `@action.target.name:<NOM_ACTION>`. Pour cet exemple, le filtre `@action.target.name:checkout` est utilisé.

Lorsque vous cliquez sur l'action, toutes les métadonnées disponibles s'affichent dans le panneau latéral. Vous devez ensuite créer des facettes et des mesures pour ces attributs. Pour ce faire, il vous suffit de cliquer sur les attributs. Vous pouvez par exemple créer une facette pour les articles du panier et une mesure pour le montant du panier.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="Créer une facette pour des actions RUM personnalisées" video=true style="width:100%;">}}

**Remarque** : utilisez des facettes pour les valeurs distinctives (ID) et des mesures pour les valeurs quantitatives (calculs de temps, latence, etc.).

## Utiliser vos attributs dans le RUM Explorer, les dashboards et les monitors
Une fois vos facettes et mesures créées, vous pouvez utiliser les attributs de vos actions dans les requêtes RUM. Il est alors possible de créer des widgets de dashboard, des monitors et des requêtes avancées dans les vues [RUM Explorer et RUM Analytics][3].

À titre d'exemple, la capture d'écran suivante indique le montant moyen du panier par pays lors du dernier jour. Utilisez le menu déroulant en haut à droite pour exporter cette requête en tant que widget de dashboard ou monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Utiliser les actions RUM dans Analytics" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=useraction#automatic-collection-of-actions
[2]: /fr/real_user_monitoring/browser/modifying_data_and_context/#replace-global-context
[3]: /fr/real_user_monitoring/explorer