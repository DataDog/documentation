---
aliases:
- /fr/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
- /fr/real_user_monitoring/ai_investigations/operation_ai_investigation/
description: Lancez des Bits Investigations à partir des cartes de recommandation
  RUM pour améliorer Core Web Vitals et la santé de vos parcours utilisateur critiques.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentation
  text: Bits dans RUM
- link: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
  tag: Documentation
  text: Optimisation des performances
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentation
  text: Surveillance des opérations
title: Optimisez les performances avec Bits AI
---
## Présentation {#overview}

RUM analyse vos sessions et affiche des cartes de recommandation qui indiquent les améliorations ayant le plus d'impact sur vos pages et vos parcours utilisateur critiques. Depuis n'importe quelle carte, vous pouvez lancer une [Bits Investigation][1] qui analyse le problème, y compris le code responsable lorsque l'intégration du code source est configurée.

Vous pouvez lancer des investigations à partir de deux endroits :

- [La page d'optimisation](#optimization-page), pour améliorer les Core Web Vitals d'une page spécifique
- [Surveillance des opérations](#operations-monitoring), pour améliorer le taux de réussite et la latence d'une opération

## Page d'optimisation {#optimization-page}

La [**page d'optimisation**][2] montre les performances de chaque page de votre application sur un indicateur donné. Pour chaque page et chaque indicateur, RUM affiche des cartes de recommandation classées par impact. Chaque carte décrit une cause probable de mauvaise performance, telle qu'un script bloquant le rendu, une tâche longue sur le thread principal ou une ressource lente retardant le Largest Contentful Paint.

Vous pouvez lancer une [Bits Investigation] à partir des cartes de recommandation pour les indicateurs suivants :

| Indicateurs | de plateforme |
|---|---|
| Navigateur | Largest Contentful Paint (LCP), Interaction to Next Paint (INP) |
| Mobile | Time to Initial Display (TTID) |

### Lancez une investigation {#start-an-investigation}

1. Accédez à la [**page d'optimisation**][2] et sélectionnez une application.
2. Sélectionnez une page et un indicateur pris en charge.
3. Sur une carte de recommandation, cliquez sur **Investigate**.

La Bits Investigation s'ouvre dans un nouvel onglet, limitée à la page, à l'élément vital et à la fenêtre temporelle de la carte.

{{< img src="real_user_monitoring/bits_ai/optimization-recommendation-cards.png" alt="La page d'optimisation pour le Largest Contentful Paint d'une page, affichant des cartes de recommandation classées par impact, chacune avec un bouton Investigate." style="width:100%;" >}}

### Ce que Bits investigue {#what-bits-investigates}

Bits compare les chargements de page lents avec les rapides et reconstitue ce qui s'est passé dans la période précédant l'élément vital : quelles ressources ont été chargées, quels scripts ont été exécutés et quelles tâches longues ont bloqué le thread principal. Lorsque les requêtes de la page sont [corrélées avec des traces APM][3], Bits suit les requêtes lentes dans vos services backend. Lorsque l'[intégration du code source][4] est configurée, Bits lie le problème aux fichiers et fonctions responsables.

{{< img src="real_user_monitoring/bits_ai/optimization-bits-investigation.png" alt="Une Bits Investigation lancée à partir d'une carte de recommandation d'optimisation, concluant que la découverte tardive de l'image principale a dégradé le Largest Contentful Paint de la page d'accueil, avec son impact, une chronologie et les prochaines étapes suggérées." style="width:100%;" >}}

## Surveillance des opérations {#operations-monitoring}

[Operations Monitoring][5] suit le taux de réussite et la latence des parcours utilisateur dans votre application, tels que l'inscription, la recherche ou le paiement. Lorsque vous ouvrez une opération, RUM affiche des cartes de recommandation classées par gravité. Chaque carte couvre un type de problème.

### Lancez une investigation {#start-an-investigation-1}

1. Accédez à [Operations Monitoring][5] et sélectionnez une opération.
2. Sur une carte de recommandation, cliquez sur **Investigate**. Vous pouvez également cliquer sur **Investigate with Bits** dans le tableau des opérations.

La Bits Investigation s'ouvre dans un nouvel onglet, limitée à l'opération, au type de problème et à la fenêtre temporelle de la carte.

{{< img src="real_user_monitoring/bits_ai/operations-recommendation-cards.png" alt="La page d'une opération dans Operations Monitoring, affichant des cartes de recommandation pour les erreurs et les délais d'attente classées par gravité, chacune avec un bouton Investigate." style="width:100%;" >}}

### Ce que Bits investigue {#what-bits-investigates-1}

Bits adapte son analyse au type de problème sur la carte :

| Type de problème | Ce que Bits examine |
|---|---|
| Erreurs | La répartition et la tendance des échecs de l'opération, les principaux endpoints défaillants, les attributs surreprésentés lors des exécutions ayant échoué, et les traces backend corrélées. |
| Abandon | Combien de temps les utilisateurs ont attendu avant d'abandonner, quelles ressources étaient encore en cours de chargement lorsqu'ils sont partis, vers où ils ont navigué ensuite, et si l'abandon se concentre sur un navigateur, un appareil, un pays ou une version spécifique de l'application. |
| Plantages | Traces de pile des sessions affectées, et si le plantage est concentré sur une version spécifique de l'application, un appareil ou un système d'exploitation. |
| Lenteur | Une comparaison des exécutions lentes et rapides pour déterminer si le temps est passé dans le backend, le frontend ou le chargement des ressources, suivie jusqu'à la trace backend ou la tâche longue responsable. |
| Délais d'attente | Si un manque d'instrumentation provoque les délais d'attente, comme une définition d'opération qui ne correspond plus à une route renommée ou à un chemin regroupé. Bits vérifie cela avant d'étudier les performances. |

{{< img src="real_user_monitoring/bits_ai/operations-bits-investigation.png" alt="Une Bits Investigation lancée à partir d'une carte de recommandation d'Operations Monitoring, concluant qu'une limite de débit épuisée de l'API de paiement tierce a interrompu le checkout, avec son impact, une chronologie et les prochaines étapes suggérées." style="width:100%;" >}}

## Après l'enquête {#after-the-investigation}

Les enquêtes lancées à partir de RUM sont des Bits Investigations standard. Vous pouvez effectuer les opérations suivantes :

- Retrouvez-les plus tard dans la [liste Bits Investigations][6] et partagez-les avec votre équipe.
- [Give feedback][7] que Bits prendra en compte lors de futures investigations.
- Envoyez l'investigation à [Bits Code][8] pour générer une suggestion de modification de code ou ouvrir une pull request.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_investigation/
[2]: https://app.datadoghq.com/rum/optimization
[3]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /fr/source_code/
[5]: /fr/real_user_monitoring/operations_monitoring/
[6]: https://app.datadoghq.com/bits-ai/investigations
[7]: /fr/bits_ai/bits_investigation/improve_accuracy/
[8]: /fr/bits_ai/bits_code/