---
title: Actions utilisateur RUM
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/guide/send-custom-user-actions/
    tag: Documentation
    text: Apprendre à utiliser les actions utilisateur personnalisées
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Explorer vos vues dans Datadog
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Attributs standards Datadog
---
## Collecte automatique d'actions utilisateur
Le SDK de Real User Monitoring (RUM) détecte automatiquement les actions effectuées par un utilisateur durant son parcours. Pour activer cette fonctionnalité, définissez le [paramètre de lancement][1] `trackInteractions` sur `true`.

**Remarque** : le [paramètre de lancement][1] `trackInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

Une fois qu'une interaction est détectée, tous les nouveaux événements RUM sont associés à l'action utilisateur en cours jusqu'à ce qu'elle soit considérée comme terminée. L'action utilisateur est également associée à ses attributs d'affichage parents : informations sur le navigateur, données de géolocalisation, [contexte global][2], etc.

### Comment la durée de l'action utilisateur est-elle calculée ?
Une fois qu'une interaction est détectée, le SDK RUM surveille les requêtes réseau et les mutations DOM. L'action utilisateur est considérée comme terminée lorsqu'aucune activité n'est effectuée sur la page pendant plus de 100 ms (une activité étant définie comme des requêtes réseau ou des mutations DOM en cours).

## Actions utilisateur personnalisées
Les actions utilisateur personnalisées sont des actions utilisateur déclarées et envoyées manuellement via l'[API `addAction`][3]. Elles permettent d'envoyer des informations relatives à un événement qui a lieu au cours d'un parcours utilisateur : un délai personnalisé, des informations sur le panier client, etc.

## Mesures collectées

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `duration` | nombre (ns) | La durée de l'action utilisateur. Consultez la [documentation relative aux actions utilisateur][4] pour connaître son mode de calcul. |
| `user_action.measures.long_task_count`        | nombre      | Nombre total de tâches longues recueillies pour cette action utilisateur. |
| `user_action.measures.resource_count`         | nombre      | Nombre total de ressources recueillies pour cette action utilisateur. |
| `user_action.measures.error_count`      | nombre      | Nombre total d'erreurs recueillies pour cette action utilisateur.|

## Facette recueillie

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `user_action.id` | chaîne | UUID de l'action utilisateur (non défini pour les [actions utilisateur personnalisées][5]). |
| `user_action.type` | chaîne | Type d'action utilisateur. Pour les [actions utilisateur personnalisées][5], ce paramètre est défini sur `custom`. |
| `event.name` | chaîne | Nom de l'action utilisateur. Pour les actions utilisateur collectées automatiquement, il s'agit de l'élément avec lequel l'utilisateur a interagi. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/installation/?tab=us#initialization-parameters
[2]: /fr/real_user_monitoring/installation/advanced_configuration/?tab=npm#add-global-context
[3]: /fr/real_user_monitoring/installation/advanced_configuration/?tab=npm#custom-user-actions
[4]: /fr/real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[5]: /fr/real_user_monitoring/data_collected/user_action#custom-user-actions
