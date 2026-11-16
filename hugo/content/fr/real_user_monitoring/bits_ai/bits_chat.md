---
aliases:
- /fr/real_user_monitoring/ai_investigations/single_view_ai_investigation/
description: Demandez à Bits Chat pourquoi une vue spécifique est lente, analysez
  les graphiques RUM et effectuez des tâches RUM en langage clair.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentation
  text: Bits dans RUM
- link: /bits_ai/bits_chat/
  tag: Documentation
  text: Bits Chat
- link: /real_user_monitoring/explorer/events/
  tag: Documentation
  text: Afficher le panneau latéral de l'événement
title: Utilisez Bits Chat dans RUM
---
## Présentation {#overview}

[Bits Chat][1] est disponible sur chaque page RUM. Bits Chat utilise la page sur laquelle vous vous trouvez et ce que vous consultez comme contexte, et peut interroger vos données RUM parallèlement à vos traces, logs et profils. Utilisez-le pour :

- [Découvrez pourquoi une vue spécifique est lente](#find-out-why-a-view-is-slow)
- [Analysez un graphique](#analyze-a-chart)
- [Posez des questions et effectuez des tâches](#ask-questions-and-complete-tasks)

## Découvrez pourquoi une vue est lente {#find-out-why-a-view-is-slow}

1. Ouvrez une vue dans le [RUM Explorer][2] ou dans [Session Replay][3].
2. Dans la section performance du panneau latéral de la vue, cliquez sur **Ask Bits**.

Bits Chat s'ouvre et examine ce chargement de page spécifique. Il reconstruit la chronologie de chargement de la vue à partir de ses [ressources][4], [tâches longues][5], [erreurs][6] et [actions utilisateur][7], et examine quatre sources de causes profondes :

| Source | Ce que Bits examine |
|---|---|
| Performance de l'application | Problèmes côté client, tels que la contention du main-thread, l'exécution du code et les délais de rendu. |
| Tiers | L'impact des scripts et bibliothèques tiers chargés par l'application. |
| Côté serveur | Latence du backend et erreurs côté serveur ayant affecté la vue, en utilisant des [traces APM corrélées][8]. |
| Environnement | L'appareil de l'utilisateur et les conditions réseau. |

Bits renvoie des résultats classés avec des liens vers les événements sous-jacents. Vous pouvez ensuite poser des questions de suivi, telles que `Is this happening to other users on this page?` ou `Which backend endpoint is the slowest here?`

{{< img src="real_user_monitoring/bits_ai/ask-bits-view.png" alt="Le panneau latéral de la vue avec Bits Chat ouvert après avoir cliqué sur Ask Bits, montrant les résultats classés pour un chargement de page lent." style="width:100%;" >}}

## Analysez un graphique {#analyze-a-chart}

Sur la page de résumé RUM, cliquez sur **Analyser avec Bits AI** sur un graphique vital ou sur le graphique du taux d'erreur. Bits Chat résume l'évolution de la métrique et identifie les facteurs qui l'influencent.

{{< img src="real_user_monitoring/bits_ai/analyze-with-bits-chart.png" alt="Un graphique de temps de chargement RUM ouvert en mode inspection, avec Bits Chat résumant l'évolution de la métrique au cours du mois dernier." style="width:100%;" >}}

## Posez des questions et effectuez des tâches {#ask-questions-and-complete-tasks}

Vous pouvez interroger Bits Chat sur votre frontend en langage clair depuis n'importe quelle page RUM, et lui demander d'effectuer des tâches RUM pour vous. Par exemple :

- `Which pages in this application have the worst INP right now, and which interactions cause it?`
- `Find sessions with 5xx errors on the checkout page in the last hour, grouped by error type.` Dans le RUM Explorer, Bits applique la requête pour vous.
- `Which functions are slowing down my LCP?` Posez cette question sur la page de profilage RUM.
- `Create a retention filter that keeps 25% of sessions with errors.`
- `Create an operation that tracks checkout from the cart page to the order confirmation page.`

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/
[2]: /fr/real_user_monitoring/explorer/
[3]: /fr/session_replay/
[4]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[6]: /fr/real_user_monitoring/error_tracking/
[7]: /fr/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[8]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/