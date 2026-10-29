---
further_reading:
- link: /error_tracking/regression_detection/
  tag: Documentation
  text: Détection des régressions
title: États des problèmes dans Error Tracking
---
## Présentation {#overview}

Tous les problèmes dans Error Tracking ont un statut pour vous aider à trier, hiérarchiser ou ignorer le bruit. Il existe cinq statuts :

- {{< ui >}}FOR REVIEW{{< /ui >}} : Problèmes nouveaux ou régressés qui requièrent une attention particulière.
- {{< ui >}}REVIEWED{{< /ui >}} : Problèmes classés qui doivent être corrigés, maintenant ou plus tard.
- {{< ui >}}RESOLVED{{< /ui >}} : Problèmes qui ont été corrigés et ne se produisent plus.
- {{< ui >}}IGNORED{{< /ui >}} : Problèmes qui ne nécessitent aucune investigation ni action supplémentaire.
- {{< ui >}}EXCLUDED{{< /ui >}} : Problèmes qui ne nécessitent aucune investigation supplémentaire, cessent de collecter de nouvelles erreurs et ne sont plus comptabilisés dans l'utilisation ou la facturation.

Tous les problèmes commencent avec un statut FOR REVIEW. Error Tracking met automatiquement à jour le statut dans les cas décrits ci-dessous, ou vous pouvez [mettre à jour le statut manuellement](#updating-an-error-status). Vous pouvez également [consulter l'historique](#issue-history) des changements d'état d'une erreur donnée.

Le diagramme ci-dessous montre comment les états Error Tracking sont mis à jour automatiquement et manuellement :
{{< img src="error_tracking/issue-states-diagram.png" alt="États des problèmes d'Error Tracking" style="width:75%;" >}}

## Examen automatique {#automatic-review}

Error Tracking marque automatiquement les problèmes comme {{< ui >}}REVIEWED{{< /ui >}} si l'une des actions suivantes a été effectuée :

- Le problème a été attribué
- Un élément de travail a été créé à partir du problème

{{< img src="error_tracking/auto-review-actions-2.png" alt="Actions d'examen automatique d'Error Tracking" style="width:75%;" >}}

## Résolution automatique {#automatic-resolution}

Error Tracking marque automatiquement comme {{< ui >}}RESOLVED{{< /ui >}} les problèmes qui semblent inactifs ou résolus en raison d'une absence d'occurrences d'erreurs récentes :

- Si le problème a été signalé pour la dernière fois dans une version datant de plus de 14 jours, et qu'une version plus récente a été publiée mais ne signale pas la même erreur, Error Tracking résout automatiquement le problème. Configurez vos services avec des tags de version (voir les instructions pour [APM][1], [RUM][2] et [Logs][3]) pour vous assurer que la résolution automatique prend en compte les versions de vos services.
- Si les tags `version` ne sont pas configurés, Error Tracking résout automatiquement un problème si aucune nouvelle erreur n'a été signalée pour ce problème au cours des 14 derniers jours.

**Remarque** : La logique de résolution automatique ne prend pas `version` en compte.

## Réouverture automatique via la détection de régression {#automatic-re-opening-through-regression-detection}

Voir [Détection de régression][4].

## Mise à jour du statut du problème {#updating-the-issue-status}

Le statut du problème apparaît partout où le problème peut être consulté, comme dans la liste des problèmes ou sur le panneau de détails d'un problème donné. Pour mettre à jour manuellement le statut d'un problème, cliquez sur le statut et choisissez-en un autre dans le menu déroulant.

{{< img src="error_tracking/updating-issue-status.png" alt="La chronologie de l'activité dans le problème Error Tracking" style="width:100%;" >}}

## Exclure un problème {#excluding-an-issue}

Le statut `EXCLUDED` vous permet d'empêcher le suivi d'erreurs spécifiques, en garantissant qu'elles ne sont ni collectées ni comptabilisées dans la facturation. Cela vous aide à supprimer les erreurs non exploitables ou les problèmes causés par des échecs attendus sans avoir besoin de règles d'exclusion complexes.

Pour exclure un problème, cliquez sur son statut et choisissez {{< ui >}}EXCLUDED{{< /ui >}} dans le menu déroulant. Les problèmes exclus restent accessibles dans l'onglet {{< ui >}}IGNORED{{< /ui >}}. Vous pouvez consulter leur historique à tout moment.

{{< img src="error_tracking/issue-states-excluded.png" alt="Exclu dans le menu déroulant du statut du problème." style="width:100%;" >}}

Pour reprendre la collecte des erreurs pour un problème exclu, sélectionnez n'importe quel statut autre que {{< ui >}}EXCLUDED{{< /ui >}}.


## Historique du problème {#issue-history}
Consultez l'historique de l'activité de vos problèmes avec le {{< ui >}}Activity Timeline{{< /ui >}}. Sur le panneau de détails de tout problème Error Tracking, consultez la chronologie de l'activité en cliquant sur l'onglet {{< ui >}}Activity{{< /ui >}}.

{{< img src="error_tracking/issue-status-history-3.png" alt="La chronologie de l'activité dans le problème Error Tracking" style="width:80%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/services/deployment_tracking
[2]: /fr/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /fr/getting_started/tagging/unified_service_tagging/
[4]: /fr/error_tracking/regression_detection/