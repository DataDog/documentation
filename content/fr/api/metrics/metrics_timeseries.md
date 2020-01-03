---
title: Envoyer des points de séries temporelles
type: apicontent
order: 26.2
external_redirect: '/api/#envoyer-des-points-de-series-temporelles'
---
## Envoyer des points de séries temporelles
L'endpoint de métrique vous permet d'envoyer des données de séries temporelles pouvant être représentées graphiquement sur les dashboards de Datadog. La limite des charges utiles compressées est de 3,2 mégaoctets (3 200 000), tandis que celle des charges utiles décompressées est de 62 mégaoctets (62 914 560).

**Poids des données** :

Si vous envoyez directement des métriques à l'API Datadog *sans* utiliser [DogStatsD][1], attendez-vous à :

* 64 bits pour le timestamp
* 64 bits pour la valeur
* 20 octets pour les noms de métriques
* 50 octets pour les séries temporelles

La charge utile totale pèse environ 100 octets. Cependant, avec l'API DogStatsD, cette charge est compressée afin de réduire son poids.

**ARGUMENTS** :

* **`series`** [*obligatoire*] :
    transmet un tableau JSON pour lequel chaque élément contient les arguments suivants :

    * **`metric`** [*obligatoire*] :
        le nom de la série temporelle.
    * **`type`** [*facultatif*, *défaut*=**gauge**] :
        [le type][2] de votre métrique : `gauge`, `rate` ou `count`.
    * **`interval`** [*facultatif*, *défaut*=**None**] :
        si le [type][2] de la métrique est `rate` ou `count`, définissez l'intervalle correspondant.
    * **`points`** [*obligatoire*] :
        un tableau de points JSON. Chaque point suit le format suivant :
        `[[timestamp_POSIC, valeur_numérique], ...]`
        **Remarque** : le timestamp doit être exprimé en secondes et sa valeur doit être actuelle. Le format de la valeur numérique doit être une valeur flottante de type gauge 32 bits.
        Une valeur actuelle correspond à une date jusqu'à 1 heure avant l'événement et jusqu'à 10 minutes après celui-ci.
    * **`host`** [*facultatif*] :
        le nom du host qui a généré la métrique.
    * **`tags`** [*facultatif*, *défaut*=**None**] :
        la liste de tags associés à la métrique.

[1]: /fr/developers/dogstatsd
[2]: /fr/developers/metrics/types