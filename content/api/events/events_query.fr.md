---
title: Requêter le flux d'événements
type: apicontent
order: 11.4
external_redirect: /api/#query-the-event-stream
---

## Requêter le flux d'événements
Le [flux d'événements][1] peut être interrogé et filtré par heure, priorité, sources et tags.
Remarque: si l'événement que vous interrogez contient des mises en forme de n'importe quel type, vous pouvez voir des caractères tels que%, \,n dans votre résultat.

##### ARGUMENTS
* **`start`** [*obligatoire*]:  
    POSIX timestamp.
* **`end`** [*obligatoire*]:  
    POSIX timestamp.
* **`priority`** [*optionnel*, *défaut*=**None**]:  
    Priorité des événements: **normal** or **low**.
* **`sources`** [*optionnel*, *défaut*=**None**]:  
    Une chaîne de sources séparées par des virgules.
* **`tags`** [*optionnel*, *défaut*=**None**]:  
    Une chaîne de tags séparés par des virgules.

[1]: /graphing/event_stream/
