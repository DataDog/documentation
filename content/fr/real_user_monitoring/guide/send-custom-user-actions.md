---
title: Envoyer des actions utilisateur personnalisées RUM
kind: guide
further_reading:
  - link: /real_user_monitoring/installation
    tag: Documentation
    text: Débuter avec la collecte de données RUM
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Visualiser vos données RUM dans l'Explorer
---
## Présentation

Le service RUM de Datadog peut collecter des événements et des calculs de temps pertinentes grâce aux actions utilisateur personnalisées. À titre d'exemple, tout au long de ce guide, nous recueillons des informations sur les paiements des utilisateurs à partir d'un site Web de e-commerce.

## 1. Instrumenter votre code
L'API `addAction` vous permet d'associer autant d'attributs que vous le souhaitez sous la forme d'un objet JavaScript. Dans l'exemple, des informations sur le panier sont envoyées lorsque l'utilisateur clique sur le bouton de paiement.

```
function onCheckoutButtonClick(cart) {
    DD_RUM.addAction('checkout', {
        'amount': cart.amount, // p. ex. 42.12
        'items': cart.items, // p. ex. ['tomate', 'fraises']
    })
}
```

L'ensemble du contexte RUM sera automatiquement associé (informations sur l'affichage de la page en cours, données geoIP, informations du navigateur, etc.) et des données supplémentaires seront associées via l'[API de contexte global][1].

## 2. Créer des facettes et des mesures sur vos nouveaux attributs
Une fois que vous avez déployé le code qui envoie vos actions utilisateur personnalisées, vous commencerez à les voir apparaître dans le RUM Explorer, dans l'onglet **User Actions**.

Pour filtrer facilement vos nouvelles actions utilisateur, utilisez le filtre `Event Name` comme suit : `@evt.name:<NOM_ACTION_UTILISATEUR>`. Dans l'exemple, nous utilisons le filtre suivant : `@evt.name:checkout`.

Une fois que vous avez cliqué sur l'action utilisateur, la liste de tous les attributs s'affiche. Repérez les attributs que vous venez d'envoyer et créez des facettes ou des mesures en cliquant dessus. Par exemple, créez une facette pour les articles du panier et une mesure pour le montant du panier.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.gif" alt="Identifier le statut de service générant le plus de logs" style="width:100%;">}}

**Remarque** : utilisez des facettes pour les valeurs distinctives (ID) et des mesures pour les valeurs quantitatives (calculs de temps, latence, etc.).

## 3. Utiliser vos attributs dans l'Explorer, les dashboards et les monitors
Maintenant que les facettes et les mesures ont été créées, elles peuvent être utilisées dans les requêtes RUM. Cela signifie que vous pouvez créer des widgets de dashboards, des monitors et des requêtes avancées dans [le RUM Explorer/RUM Analytics][2].

À titre d'exemple, la capture d'écran suivante indique le montant total du panier par pays pour le dernier jour. Utilisez le menu déroulant en haut à droite pour exporter ce widget vers un dashboard ou un monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/analytics-to-dashboard.png" alt="Identifier le statut de service générant le plus de logs" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/installation/advanced_configuration/?tab=npm#add-global-context
[2]: /fr/real_user_monitoring/explorer/?tab=facets
