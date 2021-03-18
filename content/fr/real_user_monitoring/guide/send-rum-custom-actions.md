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

La solution Real User Monitoring [recueille automatiquement les actions][1] effectuées sur votre application Web. Vous pouvez également choisir de recueillir des événements et des durées supplémentaires, notamment sur le remplissage de formulaires ou les transactions commerciales. Les actions RUM personnalisées vous aident à recueillir des événements et des durées importants, ainsi que tout le contexte pertinent associé. À titre d'exemple, tout au long de ce guide, nous recueillons des informations sur les paiements des utilisateurs effectués sur un site Web de e-commerce.

## Instrumenter votre code
Pour créer une action RUM, utilisez l'API `addAction`. Nommez votre action et ajoutez les attributs de contexte de votre choix sous la forme d'un objet JavaScript. Dans l'exemple suivant, une action `checkout` est créée lorsque l'utilisateur clique sur le bouton de paiement. Elle rassemble des informations sur le panier de l'utilisateur.

```javascript
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'value': cart.value, // p. ex. 42.12
        'items': cart.items, // p. ex. ['tomate', 'fraises']
    })
}
```

Tout le contexte RUM est automatiquement associé (informations sur l'affichage de la page en cours, données geoIP, informations sur le navigateur, etc.) et des attributs supplémentaires sont fournis via l'[API de contexte global][2].

## Créer des facettes et des mesures sur vos nouveaux attributs
Après avoir déployé le code qui crée vos actions personnalisées, celles-ci commencent à s'afficher dans le [RUM Explorer][3], dans l'onglet **Actions**.

Pour filtrer facilement vos nouvelles actions personnalisées, utilisez l'attribut `Action Target Name` comme suit : `@action.target.name:<NOM_ACTION>`. Pour notre exemple, nous utilisons le filtre suivant : `@action.target.name:checkout`.

Lorsque vous cliquez sur l'action, toutes les métadonnées disponibles s'affichent dans le panneau latéral. Vous devez ensuite créer des facettes et des mesures pour ces attributs. Pour ce faire, il vous suffit de cliquer sur les attributs. Vous pouvez par exemple créer une facette pour les articles du panier et une mesure pour le montant du panier.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="Créer une facette pour les actions RUM personnalisées" style="width:100%;">}}

**Remarque** : utilisez des facettes pour les valeurs distinctives (ID) et des mesures pour les valeurs quantitatives (calculs de temps, latence, etc.).

## Utiliser vos attributs dans le RUM Explorer, les dashboards et les monitors
Une fois vos facettes et mesures créées, vous pouvez utiliser les attributs de vos actions dans les requêtes RUM. Il est alors possible de créer des widgets de dashboard, des monitors et des requêtes avancées dans les vues [RUM Explorer et RUM Analytics][3].

À titre d'exemple, la capture d'écran suivante indique le montant moyen du panier par pays lors du dernier jour. Utilisez le menu déroulant en haut à droite pour exporter cette requête en tant que widget de dashboard ou monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Utiliser les actions RUM dans Analytics" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=useraction#automatic-collection-of-actions
[2]: /fr/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /fr/real_user_monitoring/explorer