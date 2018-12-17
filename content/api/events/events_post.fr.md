---
title: Envoyer un événement
type: apicontent
order: 11.1
external_redirect: /api/#envoyer-un-evenement
---

## Envoyer un événement
Cet endpoint vous permet d'envoyer des événements dans le flux. Taggez-les, définissez la priorité et regroupez-les avec d'autres événements.

##### ARGUMENTS
* **`title`** [*obligatoire*] : 
    Le titre de l'événement. *Limité à 100 caractères*.
    Utilisez `msg_title` avec [la bibliothèque Datadog Ruby][1].
* **`text`** [*obligatoire*] : 
    Le corps de l'événement. *Limité à 4 000 caractères.*
    Le texte prend en charge le [Markdown][2].
    Utilisez `msg_text` avec [la bibliothèque Datadog Ruby][1].
* **`date_happened`** [*facultatif*, *défaut* = **now**] :
    Timestamp POSIX de l'événement. Doit être envoyé sous la forme d'un entier (c'est-à-dire sans guillemets). *Limité aux événements de moins de 1 an et 24 jours (389 jours)*.
* **`priority`** [*facultatif*, *défaut* = **normal**] :
    La priorité de l'événement : **normal** ou **low**.
* **`host`** [*facultatif*, *défaut* = **None**] :
    Hostname à associer à l'événement. Tous les tags associés à l'hôte sont également appliqués à cet événement.
* **`tags`** [*facultatif*, *défaut* = **None**] :
    La liste de tags à appliquer à l'événement.
* **`alert_type`** [*facultatif*, *défaut* = **info**] :
    S'il s'agit d'un événement d'alerte, définissez son type parmi les valeurs suivantes : **error**, **warning**, **info** et **success**.
* **`aggregation_key`** [*facultatif*, *défaut* = **None**] :  
    Chaîne arbitraire à utiliser pour l'agrégation. *Limité à 100 caractères*.
    Si vous spécifiez une clé, tous les événements utilisant cette clé seront regroupés dans le flux d'événements.
* **`source_type_name`** [*facultatif*, *défaut* = **None**] :
    Le type d'événement envoyé.
    Options : **nagios**, **hudson**, **jenkins**, **my_apps**, **chef**, **puppet**, **git**, **bitbucket**, ...
    [Liste complète de valeurs d'attribut source][3]

[1]: https://github.com/DataDog/dogapi-rb
[2]: /graphing/event_stream/#markdown-events\
[3]: /integrations/faq/list-of-api-source-attribute-value
