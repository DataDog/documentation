---
title: Envoyer des traces
type: apicontent
order: 33.1
external_redirect: '/api/#envoyer-des-traces'
---
## Envoyer des traces
L'APM de Datadog vous permet de recueillir des métriques de performance en traçant votre code pour identifier les éléments lents ou inefficaces de votre application.

Les données de tracing sont envoyées à l'Agent Datadog via une API HTTP. Nous fournissons certaines [bibliothèques officielles][1] qui simplifient l'envoi de métriques à l'Agent Datadog. Cependant, vous pouvez interagir directement avec l'API pour instrumenter des applications qui ne peuvent pas utiliser les bibliothèques ou qui sont écrites dans des langages qui ne possèdent pas encore de bibliothèque officielle Datadog de tracing.

Les traces peuvent être envoyées sous la forme d'un tableau de [traces][2] :
```
[ trace1, trace2, trace3 ]
```

et chaque trace est un tableau de [spans][3] :
```
trace1 = [ span, span2, span3 ]
```

et chaque span est un dictionnaire avec un `trace_id`, `span_id`, `resource`, etc.

[En savoir plus sur la terminologie de l'APM et du tracing distribué][4]

**Remarque** : chaque span dans une trace doit utiliser le même trace_id.

**ARGUMENTS**:

*   **`trace_id`** (_obligatoire_) : l'ID entier unique (64 bits non signé) de la trace contenant ce span.
*   **`span_id`** (_obligatoire_) : l'ID entier (64 bits non signé) du span.
*   **`name`** (_obligatoire_) : le nom du span. Le nom du span ne doit pas dépasser 100 caractères.
*   **`resource`** (_obligatoire_) : la ressource que vous tracez. Le nom de la ressource ne doit pas dépasser 5 000 caractères.
*   **`service`** (_obligatoire_) : le service que vous tracez. Le nom du service ne doit pas dépasser 100 caractères.
*   **`type`** (_facultatif, par défaut=**custom**, sensible à la casse_) : le type de requête. Les options disponibles sont `web`, `db`, `cache` et `custom`.
*   **`start`** (_obligatoire_) : l'heure de début de la requête en nanosecondes depuis l'epoch unix.
*   **`duration`** (_obligatoire_) : la durée de la requête en nanosecondes.
*   **`parent_id`** (_facultatif_) : l'ID entier du span parent.
*   **`error`** (_facultatif_) : définissez cette valeur sur 1 pour indiquer si une erreur s'est produite. Si une erreur se produit, les informations supplémentaires telles que le message d'erreur, le type et les informations de pile doivent être spécifiées dans la propriété `meta`.
*   **`meta`** (_facultatif_) : un ensemble de métadonnées key-value. Les clés et les valeurs doivent être des chaînes.
*   **`metrics`** (_facultatif_) : un ensemble de métadonnées key-value. Les clés doivent être des chaînes et les valeurs doivent être des nombres à virgule flottante codés sur 64 bits.

[1]: /fr/tracing/#instrument-your-application
[2]: /fr/tracing/visualization/trace
[3]: /fr/tracing/visualization/trace/#spans
[4]: /fr/tracing/visualization/services_list