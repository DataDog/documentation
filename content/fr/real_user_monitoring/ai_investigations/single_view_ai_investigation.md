---
description: Effectuez une enquête agentique sur une seule vue RUM pour identifier
  les causes profondes d'une mauvaise expérience utilisateur.
further_reading:
- link: /real_user_monitoring/ai_investigations/
  tag: Documentation
  text: Aperçu des enquêtes AI
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: RUM Explorer
- link: /real_user_monitoring/explorer/events/
  tag: Documentation
  text: Afficher le panneau latéral des événements
title: Enquête AI à vue unique
---
## Aperçu {#overview}

L'enquête AI à vue unique effectue une analyse des causes profondes sur une seule vue RUM. Lorsque vous trouvez une session avec de mauvaises performances, comme une page ou un écran qui se charge lentement ou qui génère des erreurs, cliquez sur **Enquêter avec AI**. L'agent RUM de Datadog inspecte toutes les données attachées à cette vue : erreurs, requêtes réseau lentes, blocage du thread principal, traces backend, profils CPU et contexte de l'appareil.

Au lieu de parcourir manuellement les événements RUM pour déterminer si la cause était un appel API lent, un calcul lourd côté client ou un problème de CDN, vous obtenez une liste classée de résultats regroupés par catégorie de cause profonde : Performance de l'application, Côté serveur, Tierce partie et Environnement. À partir de là, vous pouvez faire un suivi via une interface de chat ou enregistrer les résultats dans un [Notebook][1] à partager avec votre équipe.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="Le panneau d'enquête AI à vue unique affichant les constatations catégorisées pour une vue RUM." style="width:100%;" >}}

## Lancer une enquête {#launch-an-investigation}

1. Ouvrir un panneau latéral de vue RUM.
2. Cliquez sur le bouton **Enquêter avec AI**.

   **Remarque** : Le bouton peut prendre jusqu'à 15 minutes pour devenir disponible après la fin d'une vue.

L'enquête s'exécute et diffuse les constatations dans le panneau latéral au fur et à mesure de leur disponibilité, vous permettant de commencer à lire les premières constatations avant que l'analyse ne soit terminée.

## Ce que l'agent examine {#what-the-agent-investigates}

Pour enquêter sur une vue, l'agent RUM de Datadog inspecte les données que Datadog a collectées pour cette vue et accède à la télémétrie corrélée lorsqu'elle est disponible :

- **L'événement de vue** et ses sous-événements : [resources][2], [long tasks][3], [errors][4] et [user actions][5].
- **Signaux de performance agrégés** à travers la vue, y compris les problèmes détectés automatiquement tels que les ressources non compressées, l'évaluation excessive des scripts et les inefficacités de bande passante.
- **Contexte du dispositif et de l'environnement** capturé par le SDK (navigateur ou système d'exploitation, géographie, type de connexion et autres [attributs RUM][6]).
- **Traces APM**, lorsque les ressources de la vue sont corrélées avec les traces backend. L'agent utilise les données de trace pour attribuer les retards côté serveur à des spans et services spécifiques. Pour plus d'informations, voir [Corréler RUM avec les Traces APM][7].
- **Données de profilage**, lorsque la [corrélation de profilage RUM][8] est activée pour l'application. L'agent utilise les profils CPU pour attribuer les constatations de performance de l'application à des fonctions spécifiques dans votre code.

Plus les données disponibles pour la vue sont riches, plus l'analyse est précise. Corréler RUM avec APM et activer le profilage aide l'agent à enquêter au-delà de la chronologie côté client.

## Sources des causes profondes {#sources-of-root-causes}

L'agent RUM de Datadog examine quatre sources pour identifier les causes profondes de la mauvaise performance d'une vue :

| Source            | Ce qui est examiné                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------|
| Performance de l'application   | Problèmes côté client, tels que la contention du thread principal, l'exécution du code et les retards de rendu.               |
| Côté serveur       | Latence backend et erreurs côté serveur qui ont affecté la vue.                                                |
| Tierce partie       | Impact sur la performance des scripts et bibliothèques tiers chargés par l'application.                                 |
| Environnement       | Conditions réseau et infrastructure qui ont affecté l'expérience de l'utilisateur.                                    |

## Lire les constatations {#read-the-results}

Chaque constatation est présentée sous forme de carte avec un titre, une description du problème, un niveau de gravité et des liens vers les événements affectés. Plusieurs constatations apparaissent classées par impact afin que vous puissiez vous concentrer d'abord sur les problèmes ayant le plus grand impact.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-results.png" alt="Panneau des résultats montrant les constatations classées avec gravité, descriptions et liens vers les événements affectés." style="width:70%;" >}}

Une interface de chat légère vous permet de faire un suivi de l'analyse : demander plus de détails sur une constatation spécifique, demander un contexte supplémentaire ou explorer des symptômes connexes.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-chat.png" alt="Une interface de chat invitant l'utilisateur à poser des questions de suivi sur les problèmes trouvés dans la vue." style="width:70%;" >}}

## Agir {#take-action}

Après la fin d'une enquête, vous pouvez agir sur les constatations sans quitter le panneau :

- **Enregistrer dans un [Notebook][1]** : Exporte la chronologie complète et les constatations vers un [Notebook][1] à partager avec votre équipe.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/notebooks/
[2]: /fr/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[3]: /fr/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[4]: /fr/real_user_monitoring/error_tracking/
[5]: /fr/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[6]: /fr/real_user_monitoring/explorer/search/
[7]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: /fr/real_user_monitoring/correlate_with_other_telemetry/profiling/