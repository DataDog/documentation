---
aliases:
- /fr/monitors/faq/can-i-create-monitor-dependencies
further_reading:
- link: /monitors/
  tag: Documentation
  text: Apprendre à créer un monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor

title: Créer des dépendances de monitor
---

Bien que Datadog prenne pleinement en charge les [monitors composites][1], il n'existe pas de méthode officielle pour créer des arbres dʼalertes.

Certains utilisateurs de Datadog ont obtenu un résultat similaire en combinant les notifications webhook avec du scoping de temps dʼarrêt via l'API Datadog.

À un niveau élevé, la configuration est la suivante :

* L'alerte A se déclenche et possède une `@webhook-notification`.
* La notification s'adresse à l'[API Downtime de Datadog][2] par `$scope` pour désactiver toutes les autres alertes.
* Lorsque l'alerte A est résolue, utilisez une autre @webhook-notification pour supprimer les temps d'arrêt du même $scope.
Il convient de noter que cela peut avoir un impact sur les temps dʼarrêt déjà programmés si vous avez un temps dʼarrêt actif qui chevauche le [$scope][3] défini.

Tout d'abord, [créez les webhooks][4] :
{{< img src="monitors/guide/mute_demo_webhook.png" alt="mute_demo_webhook" >}}

Texte complet pour les endpoints de l'API (2ème champ de saisie pour chacun d'entre eux dans la colonne de gauche) :

Désactiver : `https://api.datadoghq.com/api/v1/downtime?api_key=XXX&application_key=XXX`

Réactiver : `https://api.datadoghq.com/api/v1/downtime/cancel/by_scope?api_key=XXX&application_key=XXX`

Et le contenu du webhook pour les deux :

```json
{"scope": "$ALERT_SCOPE"}
```

Ensuite, créez une « alerte A », comme une alerte no-data pour un pourcentage de hosts regroupés pour chaque zone de disponibilité.
{{< img src="monitors/guide/alert_exammple.png" alt="alert_example" >}}

Ensuite, dans le message d'alerte, il est recommandé dʼutiliser le webhook @notify pour mettre en sourdine tous les hosts ultérieurs dans cette zone de disponibilité lorsqu'il se déclenche, et les réactiver une fois l'alerte résolue :
{{< img src="monitors/guide/mute_demo_msg.png" alt="mute_demo_msg" >}}

Voici l'exemple complet :

```text
Voilà un bien grand nombre de données manquantes. Commencez par vérifier sʼil nʼy a pas une panne chez AWS.
{{#is_alert}}
Il manque 50 % des données pour {{availability-zone.name}} !! TOUTES LES AUTRES ALERTES POUR {{availability-zone.name}} SERONT AUTOMATIQUEMENT DÉSACTIVÉES
@webhook-mute-ALL-monitor-scope
{{/is_alert}}

{{#is_alert_recovery}}
Il ne manque PLUS 50 % des données pour {{availability-zone.name}} !! TOUTES LES AUTRES ALERTES POUR {{availability-zone.name}} SONT RÉACTIVÉES
@webhook-unmute-ALL-monitor-scope
{{/is_alert_recovery}}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/composite/
[2]: /fr/api/v1/downtimes/
[3]: /fr/api/v1/downtimes/#cancel-downtimes-by-scope
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks