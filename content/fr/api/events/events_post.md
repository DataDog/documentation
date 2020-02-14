---
title: Envoyer un événement
type: apicontent
order: 12.1
external_redirect: '/api/#envoyer-un-evenement'
---
## Envoyer un événement

Cet endpoint vous permet d'envoyer des événements dans le flux. Taguez-les, définissez leur priorité et regroupez-les avec d'autres événements.

**ARGUMENTS**:

* **`title`** [*obligatoire*] :
    Le titre de l'événement. *Limité à 100 caractères*.
    Utilisez `msg_title` avec [la bibliothèque Datadog Ruby][1].
* **`text`** [*obligatoire*] :
    Le corps de l'événement. *Limité à 4 000 caractères.*
    Le texte prend en charge le [Markdown][2].
    Utilisez `msg_text` avec [la bibliothèque Datadog Ruby][1].
* **`date_happened`** [*facultatif*, *défaut*=**now**] :
    Le timestamp POSIX de l'événement. Doit être envoyé sous la forme d'un entier (sans guillemets). *Limité aux événements de moins d'un an et 24 jours (389 jours)*.
* **`priority`** [*facultatif*, *défaut*=**normal**] :
    La priorité de l'événement : **normal** ou **low**.
* **`host`** [*facultatif*, *défaut*=**None**] :
    Hostname à associer à l'événement. Tous les tags associés au host sont également appliqués à cet événement.
* **`tags`** [*facultatif*, *défaut*=**None**] :
    La liste des tags à appliquer à l'événement.
* **`alert_type`** [*facultatif*, *défaut*=**info**] :
    S'il s'agit d'un événement d'alerte, définissez son type parmi les valeurs suivantes : **error**, **warning**, **info** ou **success**.
* **`aggregation_key`** [*facultatif*, *défaut*=**None**] :
    Chaîne arbitraire à utiliser pour l'agrégation. *Limitée à 100 caractères*.
    Si vous spécifiez une clé, tous les événements utilisant cette clé sont regroupés dans le flux d'événements.
* **`source_type_name`** [*facultatif*, *défaut*=**None**] :
    Le type d'événement envoyé.
    Valeurs autorisées : **nagios**, **hudson**, **jenkins**, **my_apps**, **chef**, **puppet**, **git**, **bitbucket**, etc. 
* **`related_event_id`** [*facultatif*, *défaut*=**None**] :
    ID de l'événement parent. Doit être envoyé sous la forme d'un entier (c'est-à-dire sans apostrophes).
* **`device_name`** [*facultatif*, *défaut*=**None**] :
  La liste des noms d'appareils avec lesquels publier l'événement.


[1]: https://github.com/DataDog/dogapi-rb
[2]: /fr/developers/events/email#markdown