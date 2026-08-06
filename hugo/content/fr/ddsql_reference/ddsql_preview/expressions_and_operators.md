---
aliases:
- /fr/dashboards/ddsql_editor/reference/expressions_and_operators/
- /fr/ddsql_editor/reference/expressions_and_operators/
private: true
title: DDSQL - Expressions et opérateurs (Preview)
---

Les *expressions de valeur* sont le langage d'expression général utilisé pour produire des valeurs pour les conditions, les expressions `SELECT`, les filtres et les clauses telles que `WHERE`, `ORDER BY` et `GROUP BY`. La syntaxe des expressions DDSQL est un sur-ensemble de la syntaxe des expressions SQL.

## Opérateurs arithmétiques

DDSQL prend en charge la notation arithmétique infixe binaire et unaire standard de SQL et de nombreux autres langages :

| Opérateur | Rôle              | Exemple | Résultat |
|----------|--------------------------|---------|--------|
| +        | addition                 | 2 + 3   | 5      |
| -        | soustraction              | 2 - 3   | -1     |
| *        | multiplication           | 2 * 3   | 6      |
| /        | division (sans troncature) | 5 / 2   | 2.5    |


L'ordre standard des opérations s'applique. Pour contrôler l'ordre des opérations, ajoutez des parenthèses : `(5 - 2) * 3`.

## Opérateurs de comparaison

DDSQL implémente les opérateurs de comparaison suivants :

| Opérateur | Rôle            | Exemple | Résultat |
|----------|------------------------|---------|--------|
| >        | supérieur à           | 2 > 3   | false  |
| <        | inférieur à              | 2 < 3   | true   |
| >=       | supérieur ou égal à  | 3 >= 2  | true   |
| <=       | inférieur ou égal à    | 3 <= 2  | false  |
| =        | égal à*                | 3 = 3   | true   |
| !=, <>   | différent de             | 3 != 3  | false  |

Pour les références de tags et les groupes de tags, l'opérateur d'égalité (`=`) est traité comme une comparaison « contient ». Consultez la section [Interrogation des tags dans DDSQL][1] pour en savoir plus.

## Mots-clés de comparaison SQL

DDSQL prend en charge les mots-clés SQL suivants, qui fonctionnent comme des opérateurs booléens standard :

| Opérateur | Rôle            | Exemple | Résultat |
|----------|------------------------|---------|--------|
| `NOT`    | Filtrer les enregistrements selon plusieurs conditions. | `SELECT * FROM host WHERE NOT env = 'prod';`   | Renvoyer tous les hosts qui ne sont pas dans l'environnement prod.  |
| `AND`    | Filtrer les enregistrements selon plusieurs conditions. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Renvoyer tous les hosts qui se trouvent dans l'environnement prod et chez le fournisseur cloud AWS.  |
| `OR`     | Filtrer les enregistrements selon plusieurs conditions. | `SELECT * FROM host WHERE env = 'prod' AND cloud_provider = 'aws';`   | Renvoyer tous les hosts qui se trouvent soit dans l'environnement prod, soit chez le fournisseur cloud aws.  |

DDSQL prend également en charge les mots-clés de comparaison suivants, tels qu'ils sont définis dans la norme SQL :

| Opérateur     | Rôle            | Exemple | Résultat |
|--------------|------------------------|---------|--------|
| `IS NULL`    | Sélectionner les lignes si le champ spécifié est null. | `SELECT * FROM host WHERE cloud_provider IS NULL;`   | Renvoyer toutes les lignes ne contenant aucune donnée dans la colonne `cloud_provider`.  |
| `IS NOT NULL`| Sélectionner les lignes si le champ spécifié n'est pas null. Exclure les lignes avec des données manquantes. | `SELECT * FROM host WHERE cloud_provider IS NOT NULL;` | Renvoyer toutes les lignes contenant des données dans la colonne `cloud_provider`.   |
| `LIKE`       | Rechercher un modèle spécifique dans une valeur de chaîne. Vous pouvez utiliser les caractères génériques suivants pour définir les modèles : <br>**Signe pourcentage (%)** : représente zéro, un ou plusieurs caractères. <br>**Tiret bas (_)** : représente un seul caractère. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) LIKE '%"enabled":true%';` | Renvoyer toutes les lignes de la table `aws_eks_cluster` où la colonne `logging` contient `"enabled":true`.  |
| `NOT LIKE`   | Exclure des lignes d'une recherche lorsque la ligne présente un modèle spécifique dans une valeur de chaîne. Vous pouvez utiliser les caractères génériques `%` et `_` pour la correspondance de modèles. | `SELECT * FROM aws_eks_cluster WHERE LOWER(logging) NOT LIKE '%"enabled":true%';` | Renvoyer toutes les lignes de la table `aws_eks_cluster` où la colonne `logging` ne contient **pas** `"enabled":true%'`. |
| `IN`         | Rechercher plusieurs valeurs dans une clause `WHERE`. L'opérateur `IN` est un raccourci pour plusieurs conditions `OR`. | `SELECT * FROM host WHERE cloud_provider IN ('aws', 'gcp');`  | Renvoyer toutes les lignes de la table `host` où la valeur de `cloud_provider` est soit 'aws', soit 'gcp'.|
| `NOT IN`     | Remplacer un ensemble d'arguments par l'opérateur `<>` ou `!=` combiné avec l'opérateur `AND`. | `SELECT * FROM host WHERE cloud_provider NOT IN ('aws', 'gcp');`  | Renvoyer toutes les lignes où `cloud_provider` n'est ni `aws` ni `gcp`. |


DDSQL prend en charge le mot-clé `BETWEEN` tel que `a BETWEEN x AND y` est équivalent à `a >= x AND a <= y`. Consultez [la documentation Postgres pour `BETWEEN`][2] pour en savoir plus.

## Opérateurs logiques

| Nom    | Rôle             |
|---------|-------------------------|
| AND     | Logique booléenne, a & b    |
| OU      | Logique booléenne, a &vert;&vert; b |
| XOR     | Logique booléenne, a ^ b    |
| NOT     | Logique booléenne, !a       |
| IS NULL | Renvoie true pour chaque ligne qui est null |


## CASE

L'expression `CASE` est une expression conditionnelle générique, similaire aux instructions if/else dans d'autres langages de programmation. `CASE` se présente sous deux formes : simple et recherchée.

### Instructions CASE simples

Les instructions CASE simples utilisent la syntaxe suivante :

{{< code-block lang="sql" >}}
CASE expression
  WHEN value THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

L'expression est calculée, puis comparée à chacune des expressions de valeur dans les clauses `WHEN` jusqu'à ce qu'une valeur égale soit trouvée. Si aucune correspondance n'est trouvée, le résultat de la clause `ELSE` est renvoyé, ou `NULL` si `ELSE` est omis.

### Instructions CASE recherchées

Les instructions CASE recherchées utilisent la syntaxe suivante :

{{< code-block lang="sql" >}}
CASE
  WHEN condition THEN result
  [ WHEN ... ]
  [ ELSE result ]
END
{{< /code-block >}}

Si le résultat d'une condition est vrai, la valeur de l'expression `CASE` est le résultat qui suit la condition, et le reste de l'expression `CASE` n'est pas traité. Si le résultat de la condition n'est pas vrai, les clauses `WHEN` suivantes sont examinées de la même manière. Si aucune condition `WHEN` n'est vraie, la valeur de l'expression `CASE` est le résultat de la clause `ELSE`. Si la clause `ELSE` est omise et qu'aucune condition n'est vraie, le résultat est `NULL`.

## CAST

`CAST` spécifie une conversion d'un type de données vers un autre.

### Syntaxe

{{< code-block lang="sql" >}}
CAST(expression AS type)
{{< /code-block >}}

Tous les types ne sont pas convertibles de cette façon.

DDSQL prend également en charge la syntaxe de cast Postgres :

{{< code-block lang="sql" >}}
expression::type
{{< /code-block >}}

Par exemple, `SELECT 1::text;`.


[1]: /fr/ddsql_reference/ddsql_preview/tags/
[2]: https://www.postgresql.org/docs/current/functions-comparison.html