---
title: Envoyer un événement
type: apicontent
order: 11.1
external_redirect: /api/#post-an-event
---

## Envoyer un événement
Ce endpoint vous permet de publier des événements dans le flux d'événement dans Datadog. Taggez-les, définissez la priorité et comment les regrouper avec d'autres événements.

**ARGUMENTS**:

* **`title`** [*obligatoire*]:  
    Le titre de l'événement *Limité à 100 caractères.*
    Utilisez `msg_title` avec [La bibliothèque Datadog Ruby][1].
* **`text`** [*obligatoire*]:  
    Le corps de l'événement *Limité à 4000 caractères.*
    Le texte supporte le [markdown][2].
    Utilisez `msg_text` avec [La bibliothèque Datadog Ruby][1].
* **`date_happened`** [*optionnel*, *défaut* = **now**]:  
    Timestamp POSIX de l'événement. Doit être envoyé en entier (c'est-à-dire sans guillemets). *Limité aux événements de moins de 1 an et 24 jours (389 jours)*
* **`priority`** [*optionnel*, *défaut* = **normal**]:  
    La priorité de l'événement: **normal** or **low**.
* **`host`** [*optionnel*, *défaut*=**None**]:  
    Hostname à associer à l'événement. Toutes les tags associés à l'host sont également appliqués à cet événement.
* **`tags`** [*optionnel*, *défaut*=**None**]:  
    Une liste de tags à appliquer à l'événement.
* **`alert_type`** [*optionnel*, *défaut* = **info**]:  
    S'il s'agit d'un événement d'alerte, définissez son type entre: **error**, **warning**, **info**, and **success**.
* **`aggregation_key`** [*optionnel*, *défaut*=**None**]:  
    Chaîne arbitraire à utiliser pour l'agrégation. *Limité à 100 caractères.*
    Si vous spécifiez une clé, tous les événements utilisant cette clé seront regroupés dans le flux d'événements.
* **`source_type_name`** [*optionnel*, *défaut*=**None**]:  
    Le type d'événement envoyé.
    Options: **nagios**, **hudson**, **jenkins**, **my_apps**, **chef**, **puppet**, **git**, **bitbucket**...  
    [Liste des valeurs de l'attribut source de l'API][3].

[1]: https://github.com/DataDog/dogapi-rb
[2]: /graphing/event_stream/#markdown-events\
[3]: /integrations/faq/list-of-api-source-attribute-value
