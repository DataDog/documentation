---
aliases:
- /fr/dashboards/ddsql_editor/reference/aggregation_functions
- /fr/dashboards/ddsql_editor/reference/scalar_functions/
- /fr/ddsql_editor/reference/scalar_functions
- /fr/ddsql_editor/reference/aggregation_functions
- /fr/ddsql_editor/reference/functions
private: true
title: Fonctions DDSQL (aperçu)
---

## Fonctions d'agrégation

Les fonctions d'agrégation calculent un résultat unique à partir d'un ensemble de valeurs d'entrée, généralement utilisées en conjonction avec une instruction `GROUP BY`.

### avg
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| avg(expr *e*) | numeric | numeric | Calcule la moyenne (arithmétique) de toutes les valeurs d'entrée non nulles. |

### max
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| max(expr *e*) | variable | variable | Calcule le maximum des valeurs d'entrée non nulles. Les types des valeurs d'entrée doivent être comparables. |

### min
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| min(expr *e*) | variable | variable | Calcule le minimum des valeurs d'entrée non nulles. Les types des valeurs d'entrée doivent être comparables. |

### sum
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| sum(expr *e*) | numeric | numeric | Calcule la somme des valeurs d'entrée non nulles. |

### count
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| count(expr *e*) | numeric | nombre entier | Calcule le nombre de lignes d'entrée pour lesquelles la valeur d'entrée n'est pas nulle. |
| count(distinct expr *e1*, *e2* ...) | | nombre entier | Calcule le nombre de valeurs d'entrée pour lesquelles la valeur d'entrée n'est pas nulle. |
| count(*) | | nombre entier | Calcule le nombre de lignes d'entrée. |

### string_agg
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| string_agg(expr *e*, delimiter *e*) | string, string | chaîne | Concatène les valeurs d'entrée, séparées par un délimiteur. |

### array_agg
| Nom | Types d'arguments | Type de retour | Rôle |
|------|----------------|-------------|-------------|
| string_agg(expr *e*) | variable | array<variable> | Concatène les valeurs d'entrée dans un tableau. |


## Fonctions scalaires

Ces fonctions renvoient une valeur par ligne.

### Fonctions et opérateurs de chaînes

| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| upper(text *s*) | texte | Convertit *s* en majuscules. |
| lower(text *s*) | texte | Convertit *s* en minuscules. |
| length(text *s*) | nombre entier | Compte le nombre de caractères dans *s*. |
| concat(expr *x*, *y*, ...) | texte | Concatène les expressions fournies. |
| substr(expr *s*, numeric *start*, numeric *numChars*) | texte | Renvoie une sous-chaîne de *s* à partir de *start* jusqu'à un maximum de *numChars*, si fourni. *start* est un index basé sur 1, donc `substr('hello', 2)` renvoie `'ello'`. Si start est inférieur à 1, il est traité comme s'il valait 1. Le résultat est calculé en prenant la plage de caractères `[start, start+numChars]`, où toute valeur inférieure à 1 est traitée comme 1. Ainsi, `substr('hello', -2, 4)` renvoie `'h'`. |
| replace(text *s*, text *from*, text *to*) | texte | Remplace toutes les occurrences dans *s* de la sous-chaîne *from* par la sous-chaîne *to*. |
| regexp_replace(text *s*, text *pattern*, text *replacement*) | texte | Remplace dans *s* les sous-chaînes correspondant à l'expression régulière POSIX *pattern* par *replacement*. Prend en charge la [syntaxe des expressions régulières][1] de Go. |
 reverse(expr *text*) | string | Inverse la chaîne (brown → nworb). |
| md5(expr *texte*) | chaîne de caractères | Calcule le hachage MD5 d'une chaîne de caractères et renvoie le résultat en hexadécimal. |
| char_length(str *text*) | integer | Renvoie le nombre de caractères dans str. |
| left(str *text*, *n* int) | text | Renvoie les *n* premiers caractères de la chaîne. Lorsque *n* est négatif, renvoie tous les caractères sauf les derniers.
| right(str *text*, *n* int) | text | Renvoie les *n* derniers caractères de str. Lorsque *n* est négatif, renvoie tous les caractères sauf les premiers.
| ltrim(str *text* [, characters text]) | texte | Supprime la plus longue chaîne contenant uniquement des caractères de caractères (un espace par défaut) au début de str. |
| rtrim(str *text* [, characters text])| text | Supprime la chaîne la plus longue contenant uniquement des caractères de caractères (un espace par défaut) à la fin de str.
| rtrim(str *text* [, characters])| texte | Supprime la chaîne la plus longue contenant uniquement les caractères (un espace par défaut) du début/de la fin/des deux extrémités de str. |
| sort_order_ip(ip text) | text | Renvoie une chaîne représentant un ordre de tri sur les plages IPv4 et IPv6. |


### Fonctions et opérateurs mathématiques

| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| abs(numeric *n*) | nombre entier | Renvoie la valeur absolue de *n*. |
| round(numeric *n*, [*s*]) | numeric | Arrondit *n* à *s* décimales. |
| mod(numeric *x*, numeric *y*) | nombre entier | Renvoie le reste de `x / y`. |
| floor(numeric *n*) | numeric | Renvoie l'entier le plus proche inférieur ou égal à *n*. |
| ceil(numeric *n*) | numeric | Renvoie l'entier le plus proche supérieur ou égal à *n*. |
| power(numeric *n*, numeric *s*) | numeric | Élève *n* à la puissance *s*. |
| ln(numeric *n*) | numeric | Calcule le logarithme naturel de *n*. |
| log(numeric *n*)  | numeric | Calcule le logarithme en base 10 de *n*. |
| log2(numeric *n*) | numeric | Calcule le logarithme en base 2 de *n*. |
| exp(numeric *n*) | numeric | Renvoie la constante mathématique e élevée à la puissance *n*. |
| sqrt(numeric *n*) | numeric | Calcule la racine carrée de *n*. |


### Fonctions et opérateurs de tableaux
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| array_length(array *a*) | nombre entier | Renvoie la longueur du tableau *a* pour chaque ligne. |
| array_contains(array *a*, expr *e*) | booléen | Renvoie true si la valeur évaluée par l'expression *e* est présente dans le tableau *a* pour chaque ligne. |
| array_cat(array *a*, array *b*) | tableau | Renvoie un nouveau tableau contenant les éléments combinés des tableaux *a* et *b*.  |
| array_append(array *a*, expr *e*) | tableau | Renvoie un nouveau tableau incluant tous les éléments d'origine du tableau d'entrée, suivis de l'élément ajouté. |
| string_to_array(text *s*, delimiter, [,nullString]) | tableau | Renvoie un tableau de sous-chaînes obtenu en découpant la chaîne d'entrée *s* à l'aide du délimiteur spécifié. Le troisième argument, nullString, est facultatif et spécifie les sous-chaînes remplacées par `NULL`. |
| array_to_string(array *a*, delimiter, [,nullString]) | chaîne | Concatène les éléments du tableau en utilisant le délimiteur fourni et la chaîne null facultative. |
| unnest(array *a*) | variable | Renvoie chaque élément du tableau <strong>sous forme de ligne distincte</strong>. Le type de retour est le type d'élément du tableau.<br>`unnest` ne peut être utilisé que dans la clause `SELECT` d'une requête. Si d'autres colonnes sont sélectionnées avec unnest, la valeur de chaque ligne de la table est répétée à chaque ligne de sortie pour chaque élément déroulé. Si plusieurs colonnes sont déroulées, toutes les colonnes déroulées sont zippées ensemble, avec `NULL` remplissant les valeurs de sortie pour les tableaux plus courts. |

### Fonctions et opérateurs de date/heure

| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| date_trunc(string *precision*, timestamp *t*) | timestamp | Tronque le timestamp à la *précision* choisie (« second », « minute », « hour », « day », « week », « month » ou « year »). |
| date_diff(string *precision*, timestamp *t*, timestamp *t*) | nombre entier | Renvoie la différence entre deux dates, dans la précision spécifiée. |
| to_timestamp(numeric *n*) | timestamp | Transforme *n* en timestamp, en considérant *n* comme le temps en secondes.|

### Expressions conditionnelles

| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| coalesce(expr *x*, *y*, ...) | variable | Renvoie la première expression non nulle. |
| nullif(expr *x*, expr *y*) | variable | Renvoie `NULL` si les deux arguments sont égaux. Sinon, renvoie *x*. |

### Fonctions et opérateurs JSON

| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| json_extract_path_text(text json, text path...) | texte | Extrait le sous-objet JSON sous forme de texte, défini par le chemin. Son comportement est équivalent à la [fonction Postgres du même nom][2]. Par exemple, `json_extract_path_text(col, 'forest')` renvoie la valeur de la clé `forest` pour chaque objet JSON dans `col`. Consultez l'exemple ci-dessous pour la syntaxe des tableaux JSON.|
| json_extract_path(text json, text path...) | json | Même fonctionnalité que `json_extract_path_text`, mais renvoie une colonne de type JSON au lieu du type texte.|
| json_build_object(key1 text, value1 json/text/int/float, key2 text, value2 json/text/int/float, ... ) | json | Construit un objet JSON à partir des paramètres fournis. Les paramètres de la fonction sont les clés et valeurs de l'objet JSON à construire, en alternant clé et valeur associée à chaque clé.|
| row_to_json(table) | json | Renvoie une représentation JSON de chaque ligne d'une table sous forme de valeur JSON. Les clés JSON sont les noms des colonnes, et les valeurs sont les valeurs de chaque ligne pour chaque colonne. <br><br> <strong>Remarque</strong> : row_to_json prend en entrée un nom de table, et NON une colonne. Par exemple : `SELECT row_to_json(<table>) FROM <table>`. |

#### Tableau JSON
  Renvoyer la valeur de la clé `forest` dans le 0ème élément d'un tableau JSON pour chaque objet JSON ou ligne dans `col`.

```json
[{
"forest": "trees"
}]

```

```
json_extract_path_text(col, ‘0', ‘forest')
```


[1]: https://pkg.go.dev/regexp/syntax
[2]: https://www.postgresql.org/docs/current/functions-json.html