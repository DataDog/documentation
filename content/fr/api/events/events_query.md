---
title: Interroger le flux d'événements
type: apicontent
order: 12.4
external_redirect: '/api/#interroger-le-flux-d-evenements'
---
## Interroger le flux d'événements

Le [flux d'événements][1] peut être interrogé et filtré par période, priorité, sources et tags.
Remarque : si l'événement que vous interrogez comprend de la mise en forme Markdown, les caractères « % », « \ » ou encore « n » peuvent s'afficher dans votre sortie.

**ARGUMENTS**:

* **`start`** [*obligatoire*] :
    Timestamp POSIX.
* **`end`** [*obligatoire*] :
    Timestamp POSIX.
* **`priority`** [*facultatif*, *défaut*=**None**] :
    Priorité de vos événements : **normal** ou **low**.
* **`sources`** [*facultatif*, *défaut*=**None**] :
    Une chaîne de sources séparées par des virgules.
* **`tags`** [*facultatif*, *défaut*=**None**] :
    Une chaîne de tags séparés par des virgules. Pour utiliser un filtre de tags négatif, ajoutez le préfixe `-` à votre tag.
    Consultez la [documentation relative au flux d'événements][2] pour en savoir plus.
* **`unaggregated`** [*facultatif*, *défaut*=*false*] :
    Définissez ce paramètre sur `true` pour renvoyer tous les événements compris dans l'intervalle [`start`,`end`] indiqué. Si un événement est agrégé à un événement parent avec un timestamp en dehors de cet intervalle, il ne sera pas compris dans la sortie.

[1]: /fr/events
[2]: /fr/events/#event-query-language