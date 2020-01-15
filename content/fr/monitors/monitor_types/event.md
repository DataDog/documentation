---
title: Monitor d'événement
kind: documentation
description: Surveiller des événements recueillis par Datadog
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Vérifier le statut de votre monitor
---
## Présentation

Les monitors d'événements vous permettent de recevoir une alerte lorsqu'un événement correspondant à votre requête de recherche se produit.

## Création d'un monitor

Pour créer un [monitor d'événement][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Event*.

### Sélectionnez les événements à prendre en considération

Lorsque vous remplissez les paramètres ci-dessous, la liste des événements située au-dessus des champs de recherche est filtrée.

* Inclure les événements contenant `<TEXTE>`
* dont le statut est `error`, `warning`, `info` ou `success`
* et la priorité `all`, `normal` ou `low`
* en provenance de `<SOURCE>`
* pour `<TAGS>`
* en excluant `<TAGS>`

Sélectionnez votre groupe d'alertes :

* L'option **Simple alert** agrège vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies.
* L'option **Multi alert** applique l'alerte à chaque source en fonction des paramètres de votre groupe. Vous recevez une alerte pour chaque groupe qui répond aux conditions définies.

### Définir vos conditions d'alerte

* Le nombre était `above`, `above or equal to`, `below` ou `below or equal to` (supérieur, supérieur ou égal à, inférieur, inférieur ou égal à)
* `<NOMBRE_SEUIL>`
* au cours de l'intervalle écoulé suivant : `5 minutes`, `15 minutes`, `1 hour`, etc.

 **Remarque** : certains fournisseurs accusent d'un retard considérable entre l'**envoi** d'un événement et sa réalisation. Les événements concernés sont antidatés par Datadog afin d'indiquer l'heure à laquelle ils se sont produits ; toutefois, cela signifie qu'un événement entrant est susceptible d'être placé en dehors de la fenêtre d'évaluation actuelle du monitor. Afin de prendre en compte la différence temporelle, élargissez la fenêtre d'évaluation de votre monitor. Si vous avez besoin d'aide pour l'ajustement des paramètres de vos monitors, contactez l'[assistance Datadog][2].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

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

##### {{event.tags.&lt;CLÉ_TAG&gt;}}

Concernant les tags `env:test`, `env:staging` et `env:prod` :

* `env` correspond à la clé de tag.
* `test`, `staging` et `prod` correspondent aux valeurs du tag.

La template variable est `{{event.tags.env}}`. Le résultat de l'utilisation de la template variable est `test`, `staging` ou `prod`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/event
[2]: /fr/help
[3]: /fr/monitors/notifications