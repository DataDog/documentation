---
aliases:
- /fr/dashboards/ddsql_editor/reference/statements/
- /fr/ddsql_editor/reference/statements/
private: true
title: Instructions DDSQL (aperçu)
---

## SELECT

`SELECT` récupère des lignes depuis une table ou une vue.

### Syntaxe

{{< code-block lang="text" >}}
SELECT [ ALL | DISTINCT ] select_expr, ...
[ FROM rel_source
  [ EVENT_SEARCH 'message_pattern' ]
  [ USE EVENT_INDEX 'index_name' ]
  [ [ join_type ] JOIN rel_source ...
    [ ON condition | USING (column, ... ) ] ] ... ]
[ WHERE condition ]
[ GROUP BY [ ALL | DISTINCT ] expression, ... ]
[ HAVING condition, ... ]
[ ORDER BY expression, ... [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression ] ]
{{< /code-block >}}

#### Types de paramètres fictifs

`select_expr`
: Toute expression renvoyant une valeur. Il peut s'agir d'une constante, d'un appel de fonction, d'un agrégat, d'une fenêtre, ou de l'expression spéciale `*`. Il s'agit de la partie de la requête qui spécifie la sortie de l'instruction SELECT ; en algèbre relationnelle, elle est connue sous le nom de projection.

`message_pattern`
: Un modèle textuel pour la [recherche en texte intégral][1], lorsqu'elle est disponible.

`index_name`
: Un identifiant pour un [index de logs][2].

`rel_source`
: Une corrélation (un nom de table ou un alias) ou une [expression DQL][3] entre parenthèses.

`join_type`
: Le type de jointure SQL, tel que `INNER` ou `LEFT`. Les jointures `INNER` sont entièrement prises en charge. Les jointures `OUTER` et `CROSS` peuvent nécessiter une condition `WHERE`. Les jointures `LEFT` et `RIGHT` sont également prises en charge si la condition est une expression d'*équijointure* : une comparaison d'égalité telle que `<EXPRESSION_1> = <EXPRESSION_2>` où les expressions référencent des colonnes de tables différentes et où les types de sortie des deux expressions sont identiques. Une expression `USING` effectuant une `JOIN` sur une seule colonne fonctionne également.

`condition`
: Une expression évaluée et interprétée implicitement comme ayant un résultat booléen.

`expression`
: Une expression de valeur. Consultez la section [Expressions et opérateurs][4] pour en savoir plus et voir des exemples.

### Évaluation

SELECT récupère des lignes depuis zéro ou plusieurs tables. Le traitement général de SELECT est le suivant :

1. Tous les éléments de `FROM` sont calculés. Si plusieurs éléments sont spécifiés, ils sont joints entre eux en utilisant le type de jointure spécifié.
2. Si la clause `WHERE` est spécifiée, les lignes ne satisfaisant pas la condition sont éliminées de la sortie.
3. Si la clause `GROUP BY` est spécifiée ou si des appels de fonctions d'agrégation sont présents dans `selectExpr`, la sortie est regroupée en ensembles de lignes correspondant à une ou plusieurs valeurs, et les agrégats sont calculés. Si `HAVING` est présent, les lignes ne satisfaisant pas sa condition sont éliminées de la sortie.
4. Les lignes de sortie effectives sont calculées à l'aide de `selectExpr`.
5. `SELECT DISTINCT` élimine les lignes en double du résultat.
6. Si la clause `ORDER BY` est spécifiée, les lignes renvoyées sont triées dans l'ordre indiqué.
7. Si la clause `LIMIT` ou `OFFSET` est spécifiée, les lignes n'appartenant pas au sous-ensemble spécifié sont éliminées.

Le système peut exécuter la requête de toute manière garantissant la production des résultats spécifiés par cet ordre.

## Alias

Les alias sont des noms de substitution pour les expressions de sortie ou les éléments `FROM`. Un alias est utilisé par souci de concision ou pour lever toute ambiguïté dans les auto-jointures (où la même table est parcourue plusieurs fois).

{{< code-block lang="sql" >}}
SELECT * FROM my_long_hosts_table_name as hosts
{{< /code-block >}}

Lorsqu'un alias est fourni dans un élément `FROM`, il masque complètement le nom réel de la table ou de la fonction. Dans l'exemple ci-dessus, le reste de l'expression DQL doit faire référence à `my_long_hosts_table_name` sous le nom `hosts`.

## Ordinaux

Les expressions des clauses `GROUP BY` et `ORDER BY` peuvent être des noms de colonnes, des expressions arbitraires formées à partir des colonnes d'entrée, ou le nom ou le numéro ordinal d'une expression de sortie (une expression `SELECT`). Les ordinaux des expressions de sortie sont indexés à partir de 1.

Par exemple, la sortie de cette requête est triée d'abord par `ex3`, puis `ex2`, puis `ex1` :

{{< code-block lang="sql" >}}
SELECT ex1, ex2, ex3 FROM table ORDER BY 3, 2, 1;
{{< /code-block >}}

## UNION

`UNION` combine les résultats de deux ou plusieurs [expressions DQL][3] en une seule table de sortie.

### Syntaxe

{{< code-block lang="text" >}}
DQL_expression UNION [ ALL ] DQL_expression ...
[ ORDER BY expressions [ ASC | DESC ] ]
[ LIMIT [ ALL | expression ]
  [ OFFSET expression] ]
{{< /code-block >}}

#### Types de paramètres fictifs

`DQL_expression`
: Une instruction de requête, telle qu'une instruction `SELECT`.

L'opérateur `UNION` supprime les lignes en double du résultat. Pour conserver les lignes en double, utilisez `UNION ALL` :

{{< code-block lang="sql" >}}
SELECT host_key, CAST(service AS text) AS service, 'from resources' FROM host
UNION ALL
SELECT message, service AS text, 'from logs' FROM logs WHERE env='prod'
ORDER BY service LIMIT 200 OFFSET 10;
{{< /code-block >}}

Toutes les sous-requêtes d'un `UNION` doivent avoir le même schéma de sortie. Une requête contenant une requête `UNION` ne peut comporter qu'une seule expression `ORDER BY` et `LIMIT`, toutes deux devant apparaître à la fin. Les `UNION` chaînés ne peuvent comporter qu'une seule expression `ORDER BY` et `LIMIT` à la fin.

## WITH

`WITH` permet d'écrire des instructions auxiliaires à utiliser dans une requête plus large.

Les instructions `WITH`, souvent appelées expressions de table communes ou CTE, peuvent être considérées comme des tables temporaires définies pour une seule requête. Chaque instruction auxiliaire d'une clause `WITH` peut être toute [expression DQL][3], et la clause `WITH` elle-même est attachée à une instruction principale qui peut également être toute expression DQL sans `WITH`. Les instructions auxiliaires suivantes peuvent référencer des corrélations aliasées dans les instructions auxiliaires précédentes.

### Syntaxe

{{< code-block lang="sql" >}}
WITH alias [ ( output, schema, column, names, ... ) ] AS ( DQL_expression ) [, ...] DQL_expression
{{< /code-block >}}

#### Types de paramètres fictifs

`DQL_expression`
: Une instruction de requête, telle qu'une instruction `SELECT`.

Les instructions de modification de données telles que `INSERT`, `UPDATE` et `DELETE` ne sont pas prises en charge dans `WITH`.

Chaque requête aliasée peut également spécifier son schéma de sortie et ses noms de colonnes.

## CREATE

DDSQL permet aux utilisateurs de créer des tables temporaires, d'y insérer des données, et de les interroger et référencer. Ces tables ne sont pas persistées entre les sessions.

### Syntaxe

{{< code-block lang="sql" >}}
CREATE TABLE name (
  column_name column_type
  [ PRIMARY KEY [ AUTOINCREMENT ] | NOT NULL | UNIQUE | DEFAULT expression ] ...
)
{{< /code-block >}}

## INSERT

L'instruction `INSERT` de DDSQL suit la norme SQL. DDSQL autorise uniquement les utilisateurs à insérer des données dans des tables temporaires créées avec l'instruction `CREATE`, et non dans les sources de données en aval.

### Syntaxe

{{< code-block lang="sql" >}}
INSERT INTO table_name [ (specific, columns, ...) ] VALUES
  ( value1, value2, ... ),
  ( value1, value2, ... ),
  ...
{{< /code-block >}}

## SHOW

<div class="alert alert-danger">Bien que l'instruction <code>SHOW</code> fasse partie de la norme SQL, les noms des paramètres d'exécution sont expérimentaux. Ces paramètres sont susceptibles d'être renommés, retypés ou abandonnés à l'avenir.</div>

Lors de l'exécution de requêtes, DDSQL référence des paramètres d'exécution (variables d'environnement) qui ne sont pas spécifiés dans l'instruction de requête elle-même, tels que l'intervalle par défaut à utiliser pour les requêtes de métriques si aucun `BUCKET BY` n'est spécifié, ou l'horodatage de début et de fin d'une requête.

L'instruction `SHOW` affiche les valeurs de ces variables.

### Syntaxe

{{< code-block lang="sql" >}}
SHOW (ALL | parameter)
{{< /code-block >}}

`SHOW ALL` affiche tous les paramètres d'exécution disponibles dans le système DDSQL, et `SHOW <PARAMETER>` affiche uniquement le paramètre spécifié.

## SET

Pour modifier un paramètre d'exécution, utilisez l'instruction `SET`.

### Syntaxe

{{< code-block lang="sql" >}}
SET variableName = expression
{{< /code-block >}}

[1]: /fr/logs/explorer/search_syntax/#full-text-search
[2]: /fr/logs/log_configuration/indexes/
[3]: /fr/ddsql_editor/#use-sql-syntax-ddsql
[4]: /fr/ddsql_reference/ddsql_preview/expressions_and_operators