---
aliases:
- /fr/dashboards/ddsql_editor/reference/window_functions/
- /fr/ddsql_editor/reference/window_functions/
private: true
title: Fonctions de fenêtrage DDSQL (aperçu)
---

## Section Overview

Une fonction de fenêtrage applique une agrégation à un sous-ensemble des lignes sélectionnées par une requête. Les lignes sélectionnées sont conservées dans la sortie de la requête, au lieu d'être regroupées en une seule ligne de sortie comme dans une agrégation sans fenêtrage.

Pour en savoir plus sur le fonctionnement des fonctions de fenêtrage, consultez la [documentation Postgres sur les fonctions de fenêtrage][1].

## Syntaxe

{{< code-block lang="sql" >}}
function_name ([expression [, expression ...]]) OVER (
  [ PARTITION BY expression [, ...] ]
  [ ORDER BY expression [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] ]
  [ frame_clause ]
)
{{< /code-block >}}

La `frame_clause` facultative utilise la syntaxe suivante :

{{< code-block lang="sql" >}}
{ RANGE | ROWS } frame_start
| { RANGE | ROWS } BETWEEN frame_start AND frame_end
{{< /code-block >}}

Les expressions `frame_start` et `frame_end` peuvent être l'une des suivantes :

- `UNBOUNDED PRECEDING`
- `offset PRECEDING`
- `CURRENT ROW`
- `offset FOLLOWING`
- `UNBOUNDED FOLLOWING`

## Fonctions

Les fonctions ci-dessous peuvent être utilisées dans des fenêtres, ainsi que les [fonctions d'agrégation][2].

### row_number
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| row_number() | nombre entier | Renvoie le numéro de la ligne courante dans sa partition, en comptant à partir de 1. |

### rank
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| rank() | nombre entier | Renvoie le rang de la ligne courante, avec des écarts (le `row_number` de la première ligne de son groupe de pairs). |

### dense_rank
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| dense_rank() | nombre entier | Renvoie le rang de la ligne courante, sans écarts. Cette fonction compte effectivement les groupes de pairs. |

### first_value
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| first_value(value *T*) | *T* | Renvoie la valeur évaluée à la ligne qui est la première ligne du cadre de fenêtrage. |

### last_value
| Nom | Type de retour | Rôle |
|------|-------------|-------------|
| last_value(value *T*) | *T* | Renvoie la valeur évaluée à la ligne qui est la dernière ligne du cadre de fenêtrage. |

[1]: https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
[2]: /fr/ddsql_reference/ddsql_preview/functions/#aggregation-functions