---
aliases:
- /fr/monitors/monitor_types/event
description: Surveiller des événements recueillis par Datadog
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
kind: documentation
title: Monitor d'événement
---

## Présentation

Les monitors d'événements vous permettent de recevoir une alerte lorsqu'un événement correspondant à votre requête de recherche se produit.

## Création d'un monitor

Pour créer un [monitor d'événement][1] dans Datadog, accédez à **Monitors** > **New Monitor** > **Event**.

### Définir la requête de recherche

À mesure que vous définissez votre requête de recherche, le graphique du haut se met à jour.

1. Créez une requête de recherche en utilisant la [syntaxe de recherche de l'Event Explorer][2].
2. Choisissez de surveiller un nombre d'événements, une facette ou une mesure :
    * **Monitor over an event count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** de facette ni de mesure. Datadog évalue le nombre d'événements sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet** : si vous sélectionnez une facette, le monitor envoie une alerte en fonction du nombre de valeurs uniques de la facette.
    * **Monitor over a measure** : si vous sélectionnez une mesure, le monitor envoie une alerte en fonction de la valeur numérique de la facette d'événement (comme le ferait un monitor de métrique). Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Configurez la stratégie de regroupement pour l'envoi d'alertes (facultatif) :
    * **Simple-Alert** : les alertes simples agrègent vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies. Ces alertes sont particulièrement utiles pour surveiller une métrique issue d'un seul host ou une métrique agrégée à partir de nombreux hosts. Vous pouvez sélectionner cette stratégie pour réduire le nombre de notifications inutiles.
    * **Multi-Alert** : les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe (avec au maximum 100 groupes correspondants). Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez effectuer un regroupement selon `host` pour recevoir des alertes distinctes pour chaque host.

### Définir vos conditions d'alerte

* Le nombre total était `above`, `above or equal to`, `below` ou `below or equal to` (supérieur, supérieur ou égal à, inférieur, inférieur ou égal à)
* `<NOMBRE_SEUIL>`
* sur un intervalle de `5 minutes`, `15 minutes`, `1 hour` ou encore lors d'une période `custom` (comprise entre 5 minutes et 48 heures).

**Remarque** : certains fournisseurs accusent un retard considérable entre l'**envoi** d'un événement et sa réalisation. Les événements concernés sont antidatés par Datadog afin d'indiquer l'heure à laquelle ils se sont produits ; toutefois, cela signifie qu'un événement entrant est susceptible d'être placé en dehors de la fenêtre d'évaluation actuelle du monitor. Afin de prendre en compte la différence temporelle, élargissez la fenêtre d'évaluation de votre monitor. Si vous avez besoin d'aide pour l'ajustement des paramètres de vos monitors, contactez l'[assistance Datadog][3].

#### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, délai d'évaluation, etc.), consultez la documentation relative à la [configuration des monitors][4].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][5].

#### Template variables d'événements

Les monitors d'événements disposent de template variables spécifiques que vous pouvez inclure dans le message de notification :

| Template variable          | Définition                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | L'ID de l'événement.                                                           |
| `{{event.title}}`          | Le titre de l'événement.                                                        |
| `{{event.text}}`           | Le texte de l'événement.                                                         |
| `{{event.host.name}}`      | Le nom du host qui a généré l'événement.                                 |
| `{{event.tags}}`           | La liste des tags associés à l'événement.                                          |
| `{{event.tags.<CLÉ_TAG>}}` | La valeur d'une clé de tag spécifique associée à l'événement. Consultez l'exemple ci-dessous. |

##### Tags avec la syntaxe `key:value`

Concernant les tags `env:test`, `env:staging` et `env:prod` :

* `env` correspond à la clé de tag.
* `test`, `staging` et `prod` correspondent aux valeurs du tag.

La template variable est `{{event.tags.env}}`. Le résultat de l'utilisation de la template variable est `test`, `staging` ou `prod`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /fr/events/explorer/#search-syntax
[3]: /fr/help/
[4]: /fr/monitors/create/configuration/#advanced-alert-conditions
[5]: /fr/monitors/notify/