---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /real_user_monitoring/
  tag: Documentation
  text: Apprendre visualiser des données RUM

title: Comprendre la hiérarchie des événement du RUM
---

## Présentation

Ce guide présente les différents [types de données][1] que le RUM collecte et décrit la hiérarchie de chaque type dʼévénement. 

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-session-hierarchy-overview.png" alt="Diagramme de la hiérarchie des événements du RUM, affichant une session unique contenant plusieurs vues." style="width:50%;">}}

## Sessions
Toutes les données du RUM se rapportent à des sessions d'utilisateurs ou de Synthetics, qui se trouvent au sommet de la hiérarchie des événements. Une session est un parcours unique de l'utilisateur et englobe tout ce que l'utilisateur a déclenché (par exemple, les pages consultées, les vues, les clics, les défilements et les erreurs). Une session peut durer jusqu'à quatre heures d'activité continue ou expirer après [15 minutes d'inactivité][2]. Étant donné qu'une session englobe l'ensemble du parcours, tous les [attributs][3] liés à cet utilisateur sont également liés à cette session. Vous pouvez, par exemple, interroger un attribut par défaut, comme `action count`, puis ajouter quelque chose de plus personnalisé, comme des [attributs de l'utilisateur][4].

#### Exemple de recherche : énumérer toutes les sessions d'un utilisateur

Pour énumérer toutes les sessions d'un utilisateur spécifique, sélectionnez **Sessions** dans la liste déroulante des types dʼévénements, puis effectuez une requête de recherche pour l'état et lʼutilisateur de la session.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-all-session-user-1.png" alt="Exemple de recherche énumérant toutes les sessions de lʼutilisateur 'Lee Davis'." style="width:80%;">}}

Chaque session est automatiquement associée à un `session.id` unique.

## Vues
Au sein d'une session, un événement de vue est créé chaque fois qu'un utilisateur accède à une page (RUM Browser) ou à un écran ou un segment d'écran (RUM Mobile) d'une application. 

Chaque vue recueille automatiquement plusieurs attributs et données spécifiques à la vue, tels que le texte de l'URL et les métriques de durée, comme le temps de chargement d'une certaine page. Lorsque vous interrogez des vues spécifiques, vous pouvez ajouter des attributs par défaut, comme des informations sur l'appareil, le système d'exploitation ou l'utilisateur, par exemple. Cependant, les attributs spécifiques à un événement doivent être spécifiques à la vue. Pour nʼafficher que les événements, vous pouvez ajuster le sélecteur dʼévénements comme indiqué dans l'image ci-dessous.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-switch-views.png" alt="Vues RUM." style="width:80%;">}}

Comme il en va pour `session.id`, chaque vue est automatiquement associée à un `view.id` unique. 

### Actions, erreurs, ressources et tâches longues

Au sein des vues, le SDK crée des événements plus granulaires qui se situent tous au même niveau hiérarchique. Cependant, chaque événement est unique et possède ses propres attributs et propriétés.

### Actions

Les actions représentent l'activité de l'utilisateur sur une page. Dans les navigateurs, tous les clics sont automatiquement collectés. Sur les téléphones mobiles, toutes les pressions, tous les glissements et tous les défilements sont collectés. Outre ces actions par défaut, vous pouvez également envoyer des [actions personnalisées][5], telles que le remplissage de formulaires et les transactions commerciales. 

#### Exemple de recherche : top list des actions menant à une erreur

Cet exemple affiche une requête qui recherche toutes les actions des utilisateurs qui ont cliqué sur le bouton « Ajouter au panier » et qui ont abouti à une erreur.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-actions-all-add-to-cart-1.png" alt="Exemple de recherche de toutes les actions « Ajouter au panier » qui ont abouti à une erreur." style="width:80%;">}}

### Erreurs

Vous pouvez utiliser la solution RUM pour collecter les [erreurs de frontend][6] qui se produisent pendant la session de l'utilisateur. Par défaut, le SDK du navigateur crée des événements dʼerreur pour les exceptions non gérées et les erreurs de la console. En outre, vous pouvez collecter des erreurs personnalisées via l'API RUM `addError` (sur [navigateur][7] et [mobile][8]). Sur les applications mobiles, vous pouvez également voir si l'erreur a conduit à une fin de session, également connue sous le nom de panne.

Les erreurs peuvent être visualisées à la fois dans le RUM et dans le système de suivi des erreurs. Les erreurs de source et les erreurs personnalisées sont traitées par Error Tracking, tandis que les erreurs de console sont uniquement dans le RUM.

#### Exemple de recherche : Liste de toutes les pannes survenues sur une page de l'application

Cet exemple affiche une requête qui effectue une recherche dans les événements dʼerreur pour afficher toutes les pannes survenues sur la page « HomeViewController » pour une application particulière.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-checkoutviewcontroller.png" alt="Exemple de recherche de toutes les pannes survenues sur une page." style="width:80%;">}}

### Ressources
Les ressources sont collectées à partir des vues et comprennent les demandes externes de votre application à un fournisseur réseau, comme XHR, le chargement JS, les images ou les polices, par exemple. Puisqu'elles sont collectées à partir d'une vue, vous pouvez demander toutes les ressources chargées sur une application, ou filtrer les ressources qui se sont produites dans une seule vue. 

#### Exemple de recherche : Une liste de toutes les images chargées sur la vue `/cart` filtrées par taille d'image

Dans cet exemple, **Ressources** est sélectionné dans le menu déroulant des types dʼévénement, puis une requête portant sur les images chargées dans la vue de panier et dont la taille est supérieure ou égale à 1 000 kilo-octets est répertoriée.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-resources.png" alt="Exemple de recherche pour toutes les images chargées dans la vue du panier faisant 1 000 kilo-octets ou plus." style="width:80%;">}}

### Tâches longues
Les tâches longues sont des tâches qui bloquent le thread de l'IU pendant une certaine période. Sur mobile par exemple, une tâche longue peut correspondre à une image gelée si l'écran est bloqué pendant plus de 300 millisecondes.

#### Exemple de recherche : Toutes les tâches longues avec arrêt sur image qui ont duré plus de 500 ms

Dans cet exemple, **Long tasks** est sélectionné dans la liste déroulante des types dʼévénements, puis la durée est spécifiée.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-long-tasks.png" alt="Exemple de recherche de toutes les tâches longues dʼarrêts sur image durant plus de 500 millisecondes." style="width:80%;">}}

## Dépannage

### Aucune donnée n'apparaît après l'écriture d'une requête

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-no-data-appears-3.png" alt="Exemple dʼaffichage dʼaucune donnée après lʼécriture dʼune requête." style="width:80%;">}}

Si vous ne voyez pas de données après avoir écrit une requête, vérifiez que le sélecteur dʼévénement correspond à ce que vous voyez dans la barre de recherche. Dans l'exemple ci-dessus, le sélecteur dʼévénement est défini sur la recherche dans **views**, mais la barre de recherche ne contient que des attributs **action**. Pour afficher les données relatives aux actions, faites basculer le sélecteur de vue vers les actions. Si vous ne voyez toujours pas de données, vérifiez le sélecteur d'intervalle pour vous assurer que vous vous trouvez dans une période où des données devraient apparaître.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-data-now-appears.png" alt="Exemple de mise à jour dʼune requête en utilisant les sélecteurs de vue et dʼintervalle." style="width:80%;">}}

### Interroger un type dʼévénement qui est imbriqué dans un autre type dʼévénement

Lorsque vous recherchez des actions spécifiques, vous pouvez utiliser le type dʼévénement parent, mais pas un type de niveau égal ou inférieur. Par exemple, les actions sont imbriquées sous les vues, et les actions et les erreurs sont au même niveau dans la chaîne hiérarchique. Cela signifie que vous pouvez rechercher toutes les actions et les erreurs survenues sur une page donnée, mais pas toutes les actions présentant un type d'erreur spécifique.

#### Exemple de recherche : Les 10 actions les plus importantes qui se sont produites sur `/`

Cet exemple effectue une recherche dans le type d'événement dʼactions pour tous les noms de vues en utilisant la vue Top list pour voir les 10 principales actions survenues sur `/`, qui représente la page d'accueil.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-top-ten-actions.png" alt="Exemple de recherche des dix principales actions survenues sur la page dʼaccueil." style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected
[2]: /fr/account_management/billing/rum/#when-does-a-session-expire
[3]: /fr/real_user_monitoring/browser/data_collected/#event-specific-metrics-and-attributes
[4]: /fr/real_user_monitoring/browser/data_collected/#user-attributes
[5]: /fr/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[6]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm
[7]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[8]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-errors