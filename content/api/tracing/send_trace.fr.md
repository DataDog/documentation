---
title: Envoyer des traces
type: apicontent
order: 22.1
external_redirect: /api/#send-traces
---

## Envoyer des traces
L'APM de Datadog vous permet de collecter des mesures de performance en traçant votre code pour déterminer quelles parties de votre application sont lentes ou inefficaces.

Les données de suivi sont envoyées à l'agent Datadog via une API HTTP. Nous fournissons certaines [bibliothèques officielles][1] qui simplifient l'envoi de métriques à l'agent Datadog, mais vous pouvez interagir directement avec l'API pour instrumenter des applications qui ne peuvent pas utiliser les bibliothèques ou qui sont écrites dans des langues qui n'ont pas encore de bibliothèque officielle Datadog de traçage.

Traces peut être envoyé comme un tableau de [traces][2] 
```
[ trace1, trace2, trace3 ]
```

et chaque trace est un tableau de [spans][3]
```
trace1 = [ span, span2, span3 ]
```

et chaque span est une dictionnaire avec un `trace_id`, `span_id`, `resource`…

[En savoir plus sur la terminologie APM (tracing)][4]

**n.b.** : Chaque span dans une trace devrait utiliser les mêmes trace_id.

##### Arguments

*   **`trace_id`** - _Obligatoire_  Un identifiant unique en nombre entier (64-bits non signé) de la trace contenant cette span.
*   **`span_id`** - _obligatoire._ L'ID entier de la span (64 bits non signé).
*   **`name`** - _obligatoire._ Le nom de la span.
*   **`resource`** - _obligatoire._ La ressource que vous êtes en train de tracer.
*   **`service`** - _Obligatoire_ Le nom du service.
*   **`type`** - _Obligatoire_ Le type de requête.
*   **`start`** - _Obligatoire_ L'heure de début de la requête en nanosecondes à partir de l'époque Unix.
*   **`duration`** - _Obligatoire_ La durée de la requête en nanosecondes.
*   **`parent_id`** _Facultatif_ L'identifiant de span (nombre entier) de la span parent.
*   **`error`** - _Facultatif_ Configurez cette valeur à 1 afin d'indiquer si une erreur s'est produite. Si une erreur se produit, vous devez transmettre des informations supplémentaires, telles que le message d'erreur, le type et l'information de la pile dans la propriété `meta`.
*   **`meta`** - _Facultatif_ Une dictionnaire en format clés & valeurs des metadonnées, ex. tags

[1]: /tracing/#instrument-your-application
[2]: /tracing/visualization/trace
[3]: /tracing/visualization/trace/#spans
[4]: /tracing/visualization/services_list/
