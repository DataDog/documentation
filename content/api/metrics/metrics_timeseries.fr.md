---
title: Envoyer des points de séries temporelles
type: apicontent
order: 15.2
external_redirect: /api/#post-time-series-points
---

## Envoyer des points de séries temporelles
L'endpoint de métrique vous permet d'envoyer des données de séries temporelles pouvant être représentées graphiquement sur les dashboard de Datadog.

#### ARGUMENTS

* **`series`** [*obligatoire*]:  
    Passe un tableau JSON dans lequel chaque élément du tableau contient les arguments suivants:

    * **`metric`** [*obligatoire*]:  
        Le nom de la série temporelle.
    * **`points`** [*obligatoire*]:  
        Un tableau de points JSON. Chaque point est de la forme:
        `[[POSIX_timestamp, numeric_value], ...]`  
        **Note**: Le timestamp doit être en secondes, actuel, et son format doit être une valeur de type gauge float 32 bits.
        Actuel est défini comme pas plus de 10 minutes dans le futur ou plus de 1 heure dans le passé.
    * **`host`** [*optionnel*]:  
        Le nom de l'host qui soumet la métrique.
    * **`tags`** [*optionnel*, *défaut*=**None**]:  
        Une liste de tags associés à la métrique.