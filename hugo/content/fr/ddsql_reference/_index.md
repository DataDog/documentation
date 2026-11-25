---
aliases:
- /fr/logs/workspaces/sql_reference
- /fr/ddsql_reference/ddsql_default
description: Référence complète de la syntaxe DDSQL, des types de données, des fonctions,
  des opérateurs et des instructions permettant d’interroger les données Datadog avec
  SQL.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Datadog MCP Server
- link: /ddsql_editor/
  tag: Documentation
  text: Éditeur DDSQL
- link: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
  tag: Centre d'apprentissage
  text: Prise en main de l'éditeur DDSQL
products:
- icon: ddsql
  name: Éditeur DDSQL
  url: /ddsql_editor/
- icon: notebook
  name: Notebooks
  url: /notebooks/
title: Référence DDSQL
---
{{< product-availability >}}

## Présentation {#overview}

DDSQL est le langage SQL pour les données Datadog. Il implémente plusieurs opérations SQL standard, telles que `SELECT`, et permet d'effectuer des requêtes sur des données non structurées. Vous pouvez effectuer des actions telles qu’obtenir exactement les données que vous souhaitez en écrivant votre propre instruction `SELECT`, ou interroger des tags comme s’il s’agissait de colonnes de tableau standard.

Vous pouvez exécuter des requêtes DDSQL depuis des agents IA en utilisant la boîte à outils [Datadog MCP Server][10] `ddsql` (en avant-première).

Cette documentation couvre la prise en charge SQL disponible et inclut :
- [Syntaxe compatible avec PostgreSQL](#syntax)
- [Types de données](#data-types)
- [Littéraux de type](#type-literals)
- [Tableaux](#arrays)
- [Fonctions SQL](#functions)
- [Expressions régulières](#regular-expressions)
- [Fonctions de fenêtrage](#window-functions)
- [Fonctions JSON](#json-functions-and-operators)
- [Fonctions d'adresse réseau](#network-address-functions-and-operators)
- [Fonctions de tableau](#table-functions)
- [Tags](#tags)
- [Variables de modèle](#template-variables)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Exemple de cellule d'espace de travail avec syntaxe SQL" style="width:100%;" >}}

## Syntaxe {#syntax}

La syntaxe SQL suivante est prise en charge :

`SELECT (DISTINCT)` (DISTINCT: Optionnel)
: Récupère des lignes d’une base de données, `DISTINCT` permettant d’éliminer les enregistrements en double.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combine des lignes de deux tableaux ou plus en fonction d’une colonne qui leur est commune. Prend en charge FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Regroupe les lignes ayant les mêmes valeurs dans des colonnes spécifiées en lignes récapitulatives.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: Concatène deux chaînes ou plus ensemble.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (Inclut la prise en charge des filtres `LIKE`, `IN`, `ON`, `OR`)
: Filtre les enregistrements qui répondent à une condition spécifiée.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Fournit une logique conditionnelle pour renvoyer différentes valeurs en fonction de conditions spécifiées.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Effectue un calcul sur un ensemble de lignes de tableau liées à la ligne actuelle.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: Vérifie si une valeur est nulle ou non nulle.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: Spécifie le nombre maximal d'enregistrements à renvoyer.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Ignore un nombre spécifié d'enregistrements avant de commencer à renvoyer les enregistrements de la requête.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Trie le jeu de résultats d'une requête par une ou plusieurs colonnes. Inclut ASC, DESC pour l'ordre de tri.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filtre les enregistrements qui répondent à une condition spécifiée après le regroupement.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: Utilisé pour des conditions spécifiées dans les requêtes. Disponible dans les clauses `WHERE`, `JOIN`.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: Cette clause est un raccourci pour les jointures où les colonnes de jointure ont le même nom dans les deux tableaux. Elle prend une liste séparée par des virgules de ces colonnes et crée une condition d'égalité distincte pour chaque paire correspondante. Par exemple, joindre `T1` et `T2` avec `USING (a, b)` équivaut à `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renomme une colonne ou un tableau avec un alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Opérations arithmétiques
: Effectue des calculs de base à l'aide d'opérateurs tels que `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Intervalle représentant une durée spécifiée dans une unité donnée.
Unités prises en charge :<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## Types de données {#data-types}

DDSQL prend en charge les types de données suivants :

| Type de données | Description |
|-----------|-------------|
| `BIGINT` | Entiers signés 64 bits. |
Valeurs | `BOOLEAN` | `true` ou `false`. |
| `DECIMAL` | Nombres à virgule flottante. |
| `INET` | Valeurs d'adresse réseau (IPv4 et IPv6, avec longueur de préfixe CIDR facultative). |
| `INTERVAL` | Valeurs de durée. |
| `JSON` | Données JSON. |
| `TIMESTAMP` | Valeurs de date et d'heure. |
| `VARCHAR` | Chaînes de caractères de longueur variable. |

### Types de tableau {#array-types}

Tous les types de données prennent en charge les types de tableau. Voir [Tableaux](#arrays) pour les littéraux de tableau, l'accès aux éléments et les fonctions de tableau.

## Littéraux de type {#type-literals}

DDSQL prend en charge les littéraux de type explicites en utilisant la syntaxe `[TYPE] [value]`.

| Type | Syntaxe | Exemple |
|------|--------|---------|
| `BIGINT` | `BIGINT 'value'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'value'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'value'` | `DECIMAL '3.14159'` |
| `INET` | `INET 'value'` | `INET '192.168.1.5/24'` |
| `INTERVAL` | `INTERVAL 'value unit'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'value'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'value'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'value'` | `VARCHAR 'hello world'` |

Le préfixe de type peut être omis et le type est automatiquement déduit de la valeur. Par exemple, `'hello world'` est déduit comme `VARCHAR`, `123` comme `BIGINT`, et `true` comme `BOOLEAN`. Utilisez des préfixes de type explicites lorsque les valeurs peuvent être ambiguës ; par exemple, `TIMESTAMP '2025-01-01'` serait déduit comme `VARCHAR` sans le préfixe.

### Exemple {#example}

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## Tableaux {#arrays}

Les tableaux sont des collections ordonnées de valeurs qui partagent toutes le même type de données. Chaque type de base DDSQL possède un type de tableau correspondant.

### Littéraux de tableau {#array-literals}

Utilisez la syntaxe `ARRAY[value1, value2, ...]` pour construire un littéral de tableau. Le type du tableau est automatiquement déduit à partir des valeurs.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### Accès aux éléments {#element-access}

Accédez aux éléments individuels d'un tableau avec un indice commençant à 1. L'accès à un indice hors limites renvoie `NULL`.

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

Pour accéder aux éléments d'une colonne de tableau, utilisez la même syntaxe d'indice :

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### Fonctions de tableau {#array-functions}

Les fonctions suivantes opèrent sur les tableaux :

| Fonction | Type de retour | Description |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | Renvoie le nombre d'éléments dans le tableau. |
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | Renvoie l'indice commençant à 1 de la première occurrence de `value` dans le tableau, ou `NULL` si elle n'est pas trouvée. |
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | Divise une chaîne en un tableau de chaînes selon le délimiteur donné. |
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | Joint les éléments d'un tableau en une chaîne avec le délimiteur donné. |
| `ARRAY_AGG(expression e)` | tableau du type d'entrée | Agrège les valeurs de plusieurs lignes dans un tableau. |
| `UNNEST(array a [, array b...])` | lignes de a [, b...] | Développe un ou plusieurs tableaux en un ensemble de lignes. Valide uniquement dans une clause `FROM`. |

{{% collapse-content title="Scénarios" level="h4" %}}

### `CARDINALITY` {#cardinality}
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients) AS recipient_count
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION` {#array-position}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com') AS position
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY` {#string-to-array}
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',') AS parts
{{< /code-block >}}

### `ARRAY_TO_STRING` {#array-to-string}
{{< code-block lang="sql" >}}
SELECT
  ARRAY_TO_STRING(ARRAY['a', 'b', 'c'], ',') AS joined_string
{{< /code-block >}}

### `ARRAY_AGG` {#array-agg}
{{< code-block lang="sql" >}}
SELECT
  sender,
  ARRAY_AGG(subject) AS subjects,
  ARRAY_AGG(DISTINCT subject) AS distinct_subjects
FROM
  emails
GROUP BY
  sender
{{< /code-block >}}

### `UNNEST` {#unnest}
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions {#functions}

Les fonctions SQL suivantes sont prises en charge. Pour les fonctions de fenêtrage, consultez la section distincte [Fonctions de fenêtrage](#window-functions) de cette documentation.

| Fonction                                         | Type de retour                           | Description                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | Renvoie la plus petite valeur dans un ensemble de données.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | Renvoie la valeur maximale parmi toutes les valeurs d'entrée.                                                                                                                                                |
| `COUNT(any a)`                                   | numeric                               | Renvoie le nombre de valeurs d'entrée qui ne sont pas nulles.                                                                                                                                             |
| `SUM(numeric n)`                                 | numeric                               | Renvoie la somme de toutes les valeurs d'entrée.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numeric                               | Renvoie la valeur moyenne (moyenne arithmétique) de toutes les valeurs d'entrée.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | boolean                               | Indique si toutes les valeurs d'entrée non nulles sont vraies.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | boolean                               | Indique si au moins une valeur d'entrée non nulle est vraie.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | numeric                               | Renvoie la valeur arrondie à l'entier supérieur le plus proche. `CEIL` et `CEILING` sont tous deux pris en charge en tant qu'alias.                                                                                         |
| `FLOOR(numeric n)`                               | numeric                               | Renvoie la valeur arrondie à l'entier inférieur le plus proche.                                                                                                                                            |
| `ROUND(numeric n)`                               | numeric                               | Renvoie la valeur arrondie à l'entier le plus proche.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numeric                               | Renvoie la valeur de la base élevée à la puissance de l'exposant.                                                                                                                                        |
| `LOWER(string s)`                                | string                                | Renvoie la chaîne en minuscules.                                                                                                                                                                  |
| `UPPER(string s)`                                | string                                | Renvoie la chaîne en majuscules.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numeric                               | Renvoie la valeur absolue.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Renvoie la première valeur non nulle ou null si toutes les valeurs sont nulles.                                                                                                                                         |
| `CAST(value AS type)`                            | type                                  | Convertit la valeur donnée au type de données spécifié.                                                                                                                                              |
| `LENGTH(string s)`                               | integer                               | Renvoie le nombre de caractères dans la chaîne.                                                                                                                                                   |
| `TRIM(string s)`                                 | string                                | Supprime les espaces blancs au début et à la fin de la chaîne.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | string                                | Remplace les occurrences d'une sous-chaîne au sein d'une chaîne par une autre sous-chaîne.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | string                                | Extrait une sous-chaîne d'une chaîne, en commençant à une position donnée et pour une longueur spécifiée.                                                                                                      |
| `REVERSE(string s)`                              | string                                | Renvoie la chaîne avec les caractères dans l'ordre inverse.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | integer                               | Renvoie la première position d'index de la sous-chaîne dans une chaîne donnée, ou 0 en l'absence de correspondance.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | string                         | Divise la chaîne selon le délimiteur donné et renvoie la chaîne à la position indiquée en comptant à partir de 1.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numeric                               | Extrait une partie d'un champ de date ou d'heure (tel que l'année ou le mois) à partir d'un horodatage ou d'un intervalle.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | timestamp                             | Convertit une chaîne en horodatage selon le format donné.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | timestamp                             | Convertit un horodatage UNIX (en secondes) en horodatage.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | string                                | Convertit un horodatage en chaîne selon le format donné.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | timestamp                             | Aligne un horodatage (source) sur des compartiments de longueur égale (pas). Renvoie le début du compartiment contenant la source, calculé comme étant le plus grand horodatage inférieur ou égal à la source et qui est un multiple de la longueur du pas à partir de l'origine. |
| `DATE_TRUNC(string unit, timestamp t)`           | timestamp                             | Tronque un horodatage à une précision spécifiée basée sur l'unité fournie.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | string                                | Renvoie la valeur actuelle du paramètre spécifié. Prend en charge les paramètres `dd.time_frame_start` et `dd.time_frame_end`, qui renvoient respectivement le début et la fin de la période globale. |
| `NOW()`                                          | timestamp                             | Renvoie l'horodatage UTC actuel au début de la requête en cours.                                                                                                                              |
| `CARDINALITY(array a)`                           | integer                               | Renvoie le nombre d'éléments dans le tableau.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | integer                               | Renvoie l'index de la première occurrence de la valeur trouvée dans le tableau, ou null si la valeur n'est pas trouvée.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | array of strings                      | Divise la chaîne donnée en un tableau de chaînes en utilisant le délimiteur donné.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | string                                | Convertit un tableau en une chaîne en concaténant les éléments avec le délimiteur donné.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | array of input type                   | Crée un tableau en collectant toutes les valeurs d'entrée.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | typeof expression        | Calcule une valeur de centile approximative. Le centile doit être compris entre 0.0 et 1.0 (bornes incluses). Nécessite la syntaxe `WITHIN GROUP (ORDER BY ...)`.                                              |
| `UNNEST(array a [, array b...])`                 | lignes de a [, b...]                    | Développe les tableaux en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                    |

{{% collapse-content title="Scénarios" level="h3" %}}

### `MIN` {#min}
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX` {#max}
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT` {#count}
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM` {#sum}
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG` {#avg}
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND` {#bool-and}
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR` {#bool-or}
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL` {#ceil}
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR` {#floor}
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND` {#round}
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER` {#power}
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER` {#lower}
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER` {#upper}
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS` {#abs}
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE` {#coalesce}
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST` {#cast}

Types cibles de conversion pris en charge :
- `BIGINT`
- `DECIMAL`
- `INET`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH` {#length}
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL` {#interval}
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM` {#trim}
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE` {#replace}
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING` {#substring}
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `REVERSE` {#reverse}
{{< code-block lang="sql" >}}
SELECT
  REVERSE(username) AS reversed_username
FROM
  users
LIMIT 5
{{< /code-block >}}

### `STRPOS` {#strpos}
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART` {#split-part}
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT` {#extract}

Unités d'extraction prises en charge :
| Littéral           | Type d'entrée               | Description                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | jour du mois                             |
| `dow`             | `timestamp`              | jour de la semaine, de `1` (lundi) à `7` (dimanche) |
| `doy`             | `timestamp`              | jour de l'année (`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | secondes depuis le 1970-01-01 00:00:00 UTC (pour les horodatages), ou nombre total de secondes (pour les intervalles) |
| `hour`            | `timestamp` / `interval` | heure de la journée (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | minute de l'heure (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | seconde de la minute (`0` - `59`)            |
| `week`            | `timestamp`              | semaine de l'année (`1` - `53`)                |
| `month`           | `timestamp`              | mois de l'année (`1` - `12`)               |
| `quarter`         | `timestamp`              | trimestre de l'année (`1` - `4`)              |
| `year`            | `timestamp`              | année                                         |
| `timezone_hour`   | `timestamp`              | heure du décalage horaire                 |
| `timezone_minute` | `timestamp`              | minute du décalage horaire               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the Unix epoch of a timestamp
SELECT EXTRACT(epoch FROM TIMESTAMP '2021-01-01 00:00:00+00')
-- Returns: 1609459200
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Get the total seconds in an interval
SELECT EXTRACT(epoch FROM INTERVAL '1 day 2 hours')
-- Returns: 93600
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Calculate how many seconds ago each event occurred
SELECT
  event_time,
  EXTRACT(epoch FROM now()) - EXTRACT(epoch FROM event_time) AS seconds_ago
FROM
  events
{{< /code-block >}}

### `TO_TIMESTAMP` {#to-timestamp}

`TO_TIMESTAMP` a deux formes :

**Forme 1 : Convertissez une chaîne en horodatage selon un format**

Modèles pris en charge pour le formatage des dates et des heures :
| Modèle     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | année (4 chiffres)                      |
| `YY`        | année (2 chiffres)                      |
| `MM`        | numéro du mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)               |
| `HH24`      | heure de la journée (00 - 23)                |
| `HH12`      | heure de la journée (01 - 12)                |
| `HH`        | heure de la journée (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | seconde (00 - 59)                     |
| `MS`        | milliseconde (000 - 999)              |
| `TZ`        | abréviation du fuseau horaire               |
| `OF`        | décalage du fuseau horaire par rapport à UTC            |
| `AM` / `am` | indicateur méridien (sans points) |
| `PM` / `pm` | indicateur méridien (sans points) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**Forme 2 : convertir un horodatage de l’époque Unix en horodatage**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR` {#to-char}

Modèles pris en charge pour le formatage de date/heure :
| Modèle     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | année (4 chiffres)                      |
| `YY`        | année (2 chiffres)                      |
| `MM`        | numéro du mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)               |
| `HH24`      | heure de la journée (00 - 23)                |
| `HH12`      | heure de la journée (01 - 12)                |
| `HH`        | heure de la journée (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | seconde (00 - 59)                     |
| `MS`        | milliseconde (000 - 999)              |
| `TZ`        | abréviation du fuseau horaire               |
| `OF`        | décalage du fuseau horaire par rapport à l'UTC            |
| `AM` / `am` | indicateur méridien (sans points) |
| `PM` / `pm` | indicateur méridien (sans points) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN` {#date-bin}
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 12:30:00

SELECT DATE_BIN('1 day', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Returns 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC` {#date-trunc}

Troncatures prises en charge :
- `milliseconds`
- `seconds` / `second`
- `minutes` / `minute`
- `hours` / `hour`
- `days` / `day`
- `weeks` / `week `
- `months` / `month`
- `quarters` / `quarter`
- `years` / `year`

{{< code-block lang="sql" >}}
SELECT
  DATE_TRUNC('month', event_time) AS month_start
FROM
  events
{{< /code-block >}}

### `CURRENT_SETTING` {#current-setting}

Paramètres de configuration pris en charge :
- `dd.time_frame_start` : Renvoie le début de la période sélectionnée au format RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).
- `dd.time_frame_end` : Renvoie la fin de la période sélectionnée au format RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).

{{< code-block lang="sql" >}}
-- Define the current analysis window
WITH bounds AS (
  SELECT CAST(CURRENT_SETTING('dd.time_frame_start') AS TIMESTAMP) AS time_frame_start,
         CAST(CURRENT_SETTING('dd.time_frame_end')   AS TIMESTAMP) AS time_frame_end
),
-- Define the immediately preceding window of equal length
     previous_bounds AS (
  SELECT time_frame_start - (time_frame_end - time_frame_start) AS prev_time_frame_start,
         time_frame_start                                       AS prev_time_frame_end
  FROM bounds
)
SELECT * FROM bounds, previous_bounds
{{< /code-block >}}

### `NOW` {#now}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `APPROX_PERCENTILE` {#approx-percentile}
{{< code-block lang="sql" >}}
-- Calculate the median (50th percentile) response time
SELECT
  APPROX_PERCENTILE(0.5) WITHIN GROUP (ORDER BY response_time) AS median_response_time
FROM
  logs

-- Calculate 95th and 99th response time percentiles by service
SELECT
  service_name,
  APPROX_PERCENTILE(0.95) WITHIN GROUP (ORDER BY response_time) AS p95_response_time,
  APPROX_PERCENTILE(0.99) WITHIN GROUP (ORDER BY response_time) AS p99_response_time
FROM
  logs
GROUP BY
  service_name
{{< /code-block >}}

{{% /collapse-content %}}

## Expressions régulières {#regular-expressions}

### Variante {#flavor}

Toutes les fonctions d'expression régulière (regex) utilisent la variante d'International Components for Unicode (ICU) :

- [Métacaractères][5]
- [Opérateurs][6]
- [Expressions d'ensembles (classes de caractères)][7]
- [Options d'indicateurs pour les indicateurs dans le modèle][8]. Reportez-vous à la [section des indicateurs ci-dessous](#function-level-flags) pour les indicateurs au niveau de la fonction.
- [Rechercher et remplacer (avec des groupes de capture)][9]

### Fonctions {#functions-1}

| Fonction                                                                                                         | Type de retour      | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Booléen          | Évalue si une chaîne correspond à un modèle d'expression régulière.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | tableau de chaînes | Renvoie les sous-chaînes de la première correspondance du modèle dans la chaîne. <br><br> Cette fonction recherche dans la chaîne d'entrée à l'aide du modèle donné et renvoie les sous-chaînes capturées (groupes de capture) de la première correspondance. Si aucun groupe de capture n'est présent, renvoie la correspondance complète. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | chaîne           | Remplace la sous-chaîne qui constitue la première correspondance au modèle, ou toutes ces correspondances si vous utilisez l'indicateur [optionnel `g` ](#function-level-flags).                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | chaîne           | Remplace la sous-chaîne qui constitue la n-ième correspondance au modèle, ou toutes ces correspondances si `N` est égal à zéro, à partir de `start`.                                                                                                                                                    |

{{% collapse-content title="Scénarios" level="h4" %}}

### `REGEXP_LIKE` {#regexp-like}
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH` {#regexp-match}
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE` {#regexp-replace}
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### Indicateurs au niveau de la fonction {#function-level-flags}

Vous pouvez utiliser les indicateurs suivants avec les [fonctions d'expression régulière](#regular-expressions) :

`i`
: Correspondance insensible à la casse

`n` ou `m`
: Correspondance sensible aux sauts de ligne

`g`
: Global ; remplace _toutes_ les sous-chaînes correspondantes plutôt que seulement la première

{{% collapse-content title="Scénarios" level="h4" %}}

### `i` indicateur {#i-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` indicateur {#n-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` indicateur {#g-flag}

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions de fenêtrage {#window-functions}

Ce tableau donne un aperçu des fonctions de fenêtrage prises en charge. Pour des détails complets et des exemples, consultez la [documentation PostgreSQL][2].

| Fonction                | Type de retour    | Description                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | N/A               | Définit une fenêtre pour un ensemble de lignes sur lequel d'autres fonctions de fenêtrage peuvent opérer. |
| `PARTITION BY`          | N/A               | Divise l'ensemble de résultats en partitions, spécifiquement pour l'application de fonctions de fenêtrage. |
| `RANK()`                | entier            | Attribue un rang à chaque ligne au sein d'une partition, avec des sauts en cas d'égalité.     |
| `ROW_NUMBER()`          | entier            | Attribue un numéro séquentiel unique à chaque ligne au sein d'une partition.     |
| `LEAD(column n)`        | type de colonne   | Renvoie la valeur de la ligne suivante dans la partition.                  |
| `LAG(column n)`         | type de colonne   | Renvoie la valeur de la ligne précédente dans la partition.              |
| `FIRST_VALUE(column n)` | type de colonne   | Renvoie la première valeur dans un ensemble ordonné de valeurs.                   |
| `LAST_VALUE(column n)`  | type de colonne   | Renvoie la dernière valeur dans un ensemble ordonné de valeurs.                    |
| `NTH_VALUE(column n, offset)`| type de colonne | Renvoie la valeur au décalage spécifié dans un ensemble ordonné de valeurs. |


## Fonctions et opérateurs JSON {#json-functions-and-operators}

| Nom                                           | Type de retour | Description                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | text         | Extrait un sous-objet JSON sous forme de texte, défini par le chemin. Son comportement est équivalent à celui de la [fonction Postgres du même nom][3]. Par exemple, `json_extract_path_text(col, ‘forest')` renvoie la valeur de la clé `forest` pour chaque objet JSON dans `col`. Consultez l'exemple ci-dessous pour voir la syntaxe d'un tableau JSON. |
| json_extract_path(text json, text path…)      | JSON         | Même fonctionnalité que `json_extract_path_text`, mais renvoie une colonne de type JSON au lieu d'une colonne de type text.                                                                                                                                                                                                        |
| json_array_elements(text json)                | lignes de JSON | Développe un tableau JSON en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | lignes de texte | Développe un tableau JSON en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                                                                                                                           |

## Fonctions et opérateurs d'adresses réseau {#network-address-functions-and-operators}

Le type `inet` représente des adresses réseau IPv4 et IPv6 avec une longueur de préfixe CIDR optionnelle (par exemple, `192.168.1.5/24` ou `::1`). Créez des valeurs `inet` avec la syntaxe de littéral de type `INET 'value'` ou en convertissant une chaîne avec `CAST(column AS inet)`.

### Fonctions {#functions-2}

| Fonction | Type de retour | Description |
|----------|-------------|-------------|
| `host(inet addr)` | `VARCHAR` | Renvoie l'adresse IP sous forme de texte, sans la longueur du préfixe. |
| `network(inet addr)` | `INET` | Renvoie la partie réseau de l'adresse, avec les bits de host mis à zéro. |
| `netmask(inet addr)` | `INET` | Renvoie le masque réseau pour l'adresse. |
| `masklen(inet addr)` | `BIGINT` | Renvoie la longueur du préfixe du masque réseau. |
| `broadcast(inet addr)` | `INET` | Renvoie l'adresse de diffusion du réseau. |
| `family(inet addr)` | `BIGINT` | Renvoie la famille d'adresses : `4` pour IPv4, `6` pour IPv6. |

### Opérateurs {#operators}

| Opérateur | Type de retour | Description |
|----------|-------------|-------------|
| `inet a << inet b` | `BOOLEAN` | Renvoie `true` si `a` est strictement contenu dans `b`. |
| `inet a <<= inet b` | `BOOLEAN` | Renvoie `true` si `a` est contenu dans `b` ou lui est égal. |
| `inet a >> inet b` | `BOOLEAN` | Renvoie `true` si `a` contient strictement `b`. |
| `inet a >>= inet b` | `BOOLEAN` | Renvoie `true` si `a` contient ou est égal à `b`. |
| `inet a && inet b` | `BOOLEAN` | Renvoie `true` si les sous-réseaux de `a` et `b` se chevauchent. |

{{% collapse-content title="Scénarios" level="h4" %}}

### `host` {#host}
{{< code-block lang="sql" >}}
SELECT host(INET '192.168.1.5/24')
-- Returns: 192.168.1.5
{{< /code-block >}}

### `network` {#network}
{{< code-block lang="sql" >}}
SELECT network(INET '192.168.1.5/24')
-- Returns: 192.168.1.0/24
{{< /code-block >}}

### `netmask` {#netmask}
{{< code-block lang="sql" >}}
SELECT netmask(INET '192.168.1.5/24')
-- Returns: 255.255.255.0
{{< /code-block >}}

### `masklen` {#masklen}
{{< code-block lang="sql" >}}
SELECT masklen(INET '192.168.1.5/24')
-- Returns: 24
{{< /code-block >}}

### `broadcast` {#broadcast}
{{< code-block lang="sql" >}}
SELECT broadcast(INET '192.168.1.5/24')
-- Returns: 192.168.1.255/24
{{< /code-block >}}

### `family` {#family}
{{< code-block lang="sql" >}}
SELECT family(INET '::1')
-- Returns: 6

SELECT family(INET '192.168.1.5')
-- Returns: 4
{{< /code-block >}}

### Opérateurs de contenance {#containment-operators}
{{< code-block lang="sql" >}}
-- Check if an IP is within a subnet
SELECT INET '192.168.1.5' << INET '192.168.1.0/24'
-- Returns: true

-- Check containment or equality
SELECT INET '192.168.1.0/24' <<= INET '192.168.1.0/24'
-- Returns: true

-- Check if a subnet contains an IP
SELECT INET '10.0.0.0/8' >> INET '10.1.2.3'
-- Returns: true

-- Check if two subnets overlap
SELECT INET '192.168.1.0/24' && INET '192.168.1.128/25'
-- Returns: true
{{< /code-block >}}

### Utilisation combinée {#combined-usage}
{{< code-block lang="sql" >}}
-- Find all IPs in a private subnet and extract network info
SELECT
  host(CAST(src_ip AS inet)) AS ip,
  masklen(CAST(src_ip AS inet)) AS prefix_len,
  network(CAST(src_ip AS inet)) AS network
FROM connections
WHERE CAST(src_ip AS inet) << INET '10.0.0.0/8'
  AND family(CAST(src_ip AS inet)) = 4
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions de tableau {#table-functions}
Les fonctions de tableau sont utilisées pour interroger des logs, des métriques, des coûts cloud et d'autres sources de données.

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">Fonction</th>
      <th style="width: 33%;">Description</th>
      <th style="width: 33%;">Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <pre>
dd.logs(
    columns => array < varchar >,
    filter ? => varchar,
    indexes ? => array < varchar >,
    storage ? => varchar,
    from_timestamp ? => timestamp,
    to_timestamp ? => timestamp
) AS (column_name type [, ...])</pre>
      </td>
      <td>Renvoie les données de log sous forme de tableau. Le paramètre columns spécifie les champs de log à extraire. Les champs imbriqués sont accessibles via la notation par points, et les champs non principaux doivent être précédés de <code>@</code>. La clause AS définit le schéma du tableau renvoyé. Optionnel : filtrage par index ou plage temporelle. Lorsque la période n'est pas spécifiée, DDSQL utilise par défaut le paramètre temporel global, défini sur la dernière heure dans DDSQL Editor. Optionnel : spécification du stockage à utiliser (par exemple, <code>hot</code>, <code>flex_tier</code>). Lorsqu'il n'est pas spécifié, le stockage à chaud est utilisé par défaut.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT timestamp, host, service, message, asset_id
FROM dd.logs(
    filter  => 'source:java',
    columns => ARRAY['timestamp','host','service','message','@asset.id']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR,
    asset_id  VARCHAR
){{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_scalar(
    query varchar,
    reducer varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie les données de métriques sous forme de valeur scalaire. La fonction accepte une requête de métriques (avec regroupement optionnel), un réducteur pour déterminer comment les valeurs sont agrégées (avg, max, etc.), et des paramètres d'horodatage optionnels (par défaut 1 heure) pour définir la plage temporelle.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_scalar(
    'avg:system.cpu.user{*} by {service}',
    'avg',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.metrics_timeseries(
    query varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie les données métriques sous forme de série temporelle. La fonction accepte une requête de métriques (avec regroupement optionnel) et des paramètres d'horodatage optionnels (par défaut 1 heure) pour définir la plage temporelle. Renvoie des points de données au fil du temps plutôt qu'une valeur agrégée unique.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.metrics_timeseries(
    'avg:system.cpu.user{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_scalar(
    query varchar,
    reducer varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie les données de <a href="/cloud_cost_management/">Cloud Cost Management</a> sous forme de valeur scalaire. La fonction accepte une requête de coût cloud (avec regroupement optionnel), un réducteur d'agrégation (utilisez <code>sum</code> pour les données de coût ; d'autres réducteurs tels que <code>avg</code>, <code>min</code>, et <code>max</code> sont acceptés mais rarement applicables aux requêtes de coût), et des paramètres d'horodatage optionnels (par défaut 1 heure) pour définir la plage temporelle. <strong>Remarque</strong> : Les données de coût cloud sont généralement retardées de 24 à 48 heures, de sorte que les horodatages récents peuvent ne renvoyer aucun résultat.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_scalar(
    'sum:all.cost{*} by {service}',
    'sum',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY value DESC;{{< /code-block >}}
      </td>
    </tr>
    <tr>
      <td>
        <pre>
dd.cloud_cost_timeseries(
    query varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie des données de <a href="/cloud_cost_management/">Cloud Cost Management</a> sous forme de série temporelle. La fonction accepte une requête de coût cloud (avec regroupement optionnel) et des paramètres d'horodatage optionnels (par défaut 1 heure) pour définir la plage temporelle. Renvoie des points de données de coût au fil du temps plutôt qu'une valeur agrégée unique. <strong>Remarque</strong> : Les données de coût cloud sont généralement retardées de 24 à 48 heures, de sorte que les horodatages récents peuvent ne renvoyer aucun résultat.</td>
      <td>
        {{< code-block lang="sql" >}}
SELECT *
FROM dd.cloud_cost_timeseries(
    'sum:all.cost{*} by {service}',
    TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    TIMESTAMP '2025-07-17 00:00:00.000-04:00'
)
ORDER BY timestamp, service;{{< /code-block >}}
      </td>
    </tr>
  </tbody>
</table>

{{% collapse-content title="Scénarios" level="h3" %}}

### Horodatages absolus {#absolute-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => TIMESTAMP '2025-07-10 00:00:00.000-04:00',
    to_timestamp => TIMESTAMP '2025-07-17 00:00:00.000-04:00'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Horodatages relatifs {#relative-timestamps}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    from_timestamp => now() - INTERVAL '7 days',
    to_timestamp => now()
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Paramètres optionnels {#optional-parameters}

{{< code-block lang="sql" >}}
SELECT *
FROM dd.logs(
    columns => ARRAY['timestamp','host','service','message'],
    filter  => 'source:java',
    indexes => ARRAY['trino'],
    storage => 'hot'
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    service   VARCHAR,
    message   VARCHAR
)
{{< /code-block >}}

### Accès aux champs imbriqués {#nested-field-access}

Les alias de colonne ne peuvent pas contenir de points ; remplacez-les par des traits de soulignement ou tout autre caractère valide lors de la définition de l'alias.

{{< code-block lang="sql" >}}
SELECT timestamp, host, asset_id, view_url, data_resource_type
FROM dd.logs(
    filter  => 'service:mcp',
    columns => ARRAY['timestamp','host','@asset.id','@view.url','@data.resource.type']
) AS (
    timestamp TIMESTAMP,
    host      VARCHAR,
    asset_id  VARCHAR,
    view_url  VARCHAR,
    data_resource_type VARCHAR
)
{{< /code-block >}}

{{% /collapse-content %}}

## Tags {#tags}

DDSQL expose les tags en tant que type `hstore`, inspiré de PostgreSQL. Vous pouvez accéder aux valeurs de clés de tag spécifiques en utilisant l'opérateur flèche de PostgreSQL. Par exemple :

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Les tags sont des paires clé-valeur où chaque clé peut avoir zéro, une ou plusieurs valeurs de tag correspondantes. Lorsque l'on accède à une valeur de tag, celle-ci est renvoyée sous forme d'une chaîne unique contenant _toutes_ les valeurs correspondantes. Lorsque les données comportent plusieurs valeurs de tag pour une même clé de tag, elles sont représentées sous forme de chaîne de valeurs triées et séparées par des virgules. Par exemple :

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

Vous pouvez également comparer des valeurs de tag en tant que chaînes ou des ensembles de tags complets :

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

De plus, vous pouvez extraire les clés de tag et les valeurs de tag dans des tableaux de texte distincts :

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### Fonctions et opérateurs HSTORE {#hstore-functions-and-operators}

| Nom                                          | Type de retour   | Description                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | Texte          | Récupère la valeur pour une clé donnée. Renvoie `null` si la clé n'est pas présente.                             |
| akeys(hstore tags)                            | Tableau de texte | Récupère les clés d'un HSTORE sous forme de tableau                                                            |
| avals(hstore tags)                            | Tableau de texte | Récupère les valeurs d'un HSTORE sous forme de tableau                                                          |

## Variables de modèle {#template-variables}

<div class="alert alert-info">Les variables de modèle dans DDSQL Editor sont en préversion ; leur syntaxe et les types pris en charge sont donc susceptibles de changer. Vous ne pouvez utiliser une variable qu'en tant que second argument de <code>dd.matches()</code>. Référencer <code>$var</code> à tout autre endroit dans une requête n'est pas pris en charge. Contactez <a href="/help/">le support Datadog</a> pour demander l'accès.</div>

Les variables de modèle vous permettent de modifier les filtres de requête sans modifier le SQL.

### Filtrez les lignes avec `dd.matches` {#filter-rows-with-ddmatches}

Utilisez `dd.matches(column, $var)` dans une clause `WHERE` pour comparer une colonne ou une expression avec les valeurs sélectionnées de la variable. Par exemple, pour une variable nommée `env` :

{{< code-block lang="sql" >}}
SELECT *
FROM aws.ec2_instance
WHERE dd.matches(tags->'env', $env);
{{< /code-block >}}

| Valeurs sélectionnées | Correspondances |
|-----------------|---------|
| `prod` | Une correspondance exacte et sensible à la casse. |
| `prod, staging` | L'une ou l'autre valeur. |
| `*` | Aucun filtre. Une sélection vide n'applique également aucun filtre. |
| `prod*` | Valeurs commençant par `prod`. |
| `*prod` | Valeurs se terminant par `prod`. |
| `*prod*` | Valeurs contenant `prod`. |

### Syntaxe de variable {#variable-syntax}

Passez `$env` directement, sans guillemets simples ou `.value`. La colonne ou l'expression détermine ce qui est filtré ; le tag de la variable n'est pas ajouté.

Pour les colonnes non textuelles, convertissez d'abord l'expression en `VARCHAR`, par exemple `dd.matches(CAST(status_code AS VARCHAR), $status)`.

Utilisez `$env` pour un nom de variable en minuscules. Mettez les noms contenant des lettres majuscules, des espaces ou de la ponctuation entre guillemets doubles, par exemple `$"aws-region"`.

## Écriture de requêtes efficaces {#writing-efficient-queries}

Les requêtes qui lisent de grandes quantités de données ou effectuent des calculs lourds peuvent être lentes ou renvoyer des erreurs de ressources. Les pratiques ci-dessous sont les causes les plus courantes ; pour chacune, une réécriture permet généralement de résoudre le problème.

**Filtrez et agrégez dès que possible**. Les calculs dans le filtre de la requête ou un résumé `GROUP BY` s'exécutent sur l'index. Les calculs dans un `JOIN` ou un `LIMIT` large sont conservés en mémoire.

### Liste de contrôle {#checklist}

Avant de relancer une requête lente, posez-vous les questions suivantes :

- Le filtre de la requête inclut-il un jeton sélectif (et non un Wildcard comme `service:*` ou `env:*`) ?
- La plage temporelle est-elle aussi réduite que possible pour la question ?
- Sélectionnez-vous uniquement les colonnes que vous utilisez réellement ?
- Si vous avez un grand `LIMIT`, un résumé `GROUP BY` pourrait-il fonctionner à la place ?
- Si vous avez de nombreuses clauses `JOIN`, la requête pourrait-elle être réécrite sous forme d'analyse unique ?
- Lors de jointures entre sources, chaque côté est-il filtré ?
- La clé `JOIN` a-t-elle une cardinalité élevée (ID d'utilisateur/ID de requête/ID de trace) ?
- La même expression régulière est-elle exécutée plus d'une fois par ligne ?

### Filtrage {#filtering}

#### Filtrez sur la source de données {#filter-on-the-data-source}

Incluez toujours un jeton sélectif dans votre requête de source de données, tel que `service:`, `host:`, `env:` ou tout `@attribute:value`.

Les filtres Wildcard tels que `service:*` ou `env:*` correspondent à chaque événement, ils ne restreignent donc pas réellement les données. Considérez ces filtres comme équivalents à laisser le filtre vide.

**Avant**

```sql
-- No filter; scans all logs in the time range
SELECT timestamp, service, host, message
FROM dd.logs(
    columns        => ARRAY['timestamp', 'service', 'host', 'message'],
    from_timestamp => NOW() - INTERVAL '7 days',
    to_timestamp   => NOW()
) AS (
    timestamp TIMESTAMP,
    service   VARCHAR,
    host      VARCHAR,
    message   VARCHAR
)
```

**Après**

```sql
-- filter => narrows the scan to matching events before any SQL runs
SELECT timestamp, service, host, message
FROM dd.logs(
    filter         => 'service:checkout-api env:prod',
    columns        => ARRAY['timestamp', 'service', 'host', 'message'],
    from_timestamp => NOW() - INTERVAL '7 days',
    to_timestamp   => NOW()
) AS (
    timestamp TIMESTAMP,
    service   VARCHAR,
    host      VARCHAR,
    message   VARCHAR
)
```

#### Choisissez une plage temporelle adaptée à la question {#choose-a-time-range-that-fits-the-question}

Le temps d'analyse augmente avec la plage temporelle. Envisagez de commencer par une fenêtre qui couvre la question (souvent quelques heures ou une journée) et de l'élargir uniquement lorsque la question l'exige. Pour les tendances à long terme, une métrique pré-agrégée ou une requête de résumé quotidien s'exécute plus rapidement qu'une nouvelle analyse des événements bruts à chaque exécution.

*Objectif : comprendre le volume de logs du service de facturation sur le mois dernier.*

**Avant**

```sql
-- Scans 31 days of raw events
SELECT timestamp, message
FROM dd.logs(
    filter         => 'service:billing',
    columns        => ARRAY['timestamp', 'message'],
    from_timestamp => NOW() - INTERVAL '31 days',
    to_timestamp   => NOW()
) AS (
    timestamp TIMESTAMP,
    message   VARCHAR
)
```

**Après**

```sql
-- Aggregate up front for trends; only fetch the timestamp column needed for grouping
SELECT date_trunc('day', timestamp) AS day, count(*) AS events
FROM dd.logs(
    filter         => 'service:billing',
    columns        => ARRAY['timestamp'],
    from_timestamp => NOW() - INTERVAL '7 days',
    to_timestamp   => NOW()
) AS (
    timestamp TIMESTAMP
)
GROUP BY 1
ORDER BY 1;
```

### Sélection de colonnes {#column-selection}

#### Projetez uniquement les colonnes que vous utilisez {#project-only-the-columns-you-use}

Chaque colonne de votre requête est extraite du stockage. Réduisez la liste des colonnes à ce que vous utilisez en aval. Les attributs volumineux comme le `message` brut ou les en-têtes HTTP complets peuvent ralentir considérablement la requête.

**Avant**

```sql
-- columns array fetches every field, including the expensive raw message
SELECT *
FROM dd.logs(
    filter         => 'service:checkout-api',
    columns        => ARRAY['timestamp', 'service', 'host', 'message', '@http.url', '@http.status_code'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (
    timestamp   TIMESTAMP,
    service     VARCHAR,
    host        VARCHAR,
    message     VARCHAR,
    http_url    VARCHAR,
    status_code VARCHAR
)
```

**Après**

```sql
-- Only declare the columns the analysis actually uses
SELECT timestamp, service, host
FROM dd.logs(
    filter         => 'service:checkout-api',
    columns        => ARRAY['timestamp', 'service', 'host'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (
    timestamp TIMESTAMP,
    service   VARCHAR,
    host      VARCHAR
)
```

### Agrégations {#aggregations}

#### Retournez des résumés, pas des lignes brutes {#return-summaries-not-raw-rows}

Lorsque votre objectif est de comprendre les données (comme le top-N, les comptes par catégorie ou les distributions), une `GROUP BY` renvoie un résultat ciblé qui est plus rapide à calculer et plus facile à exploiter que l'analyse de millions de lignes brutes.

**Avant**

```sql
SELECT *
FROM dd.logs(
    filter         => 'service:orders-api',
    columns        => ARRAY['timestamp', 'service', '@http.status_code', 'message'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (
    timestamp   TIMESTAMP,
    service     VARCHAR,
    status_code VARCHAR,
    message     VARCHAR
)
LIMIT 5000000;
```

**Après**

```sql
-- Returns ~10 rows (one per status_code), answers the actual question
SELECT status_code, count(*) AS hits
FROM dd.logs(
    filter         => 'service:orders-api',
    columns        => ARRAY['@http.status_code'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (
    status_code VARCHAR
)
GROUP BY status_code
ORDER BY hits DESC
LIMIT 100;
```

**Remarque :** L'agrégation en SQL avec `GROUP BY` est plus efficace que la récupération de lignes brutes et l'agrégation dans une étape en aval. Le moteur filtre et résume les données à la source.

#### Réduisez le périmètre du scan avant d'agréger sur une colonne à haute cardinalité {#narrow-the-scan-before-aggregating-on-a-high-cardinality-column}

Lorsque vous travaillez avec des colonnes à haute cardinalité (telles que des e-mails, des adresses IP ou des identifiants de requête) :

- Utilisez `SELECT DISTINCT` ou `GROUP BY` pour renvoyer une entrée par valeur distincte entre les workers. Sans filtre strict, l'ensemble de résultats croît sans limite.
- Affinez d'abord le filtre de la source de données afin que l'agrégation porte sur moins de lignes.
- Pour les cardinalités élevées, pré-agrégez les données en une ligne par intervalle de temps et par clé, puis comptez les valeurs distinctes sur l'ensemble des intervalles.

*Objectif : trouver les adresses e-mail distinctes des utilisateurs dans les logs du service de validation de commande sur les 7 derniers jours.*

**Avant**

```sql
-- No service filter; unbounded distinct set across all logs
SELECT DISTINCT user_email
FROM dd.logs(
    columns        => ARRAY['@usr.email'],
    from_timestamp => NOW() - INTERVAL '7 days',
    to_timestamp   => NOW()
) AS (
    user_email VARCHAR
)
```

**Après**

```sql
-- Pre-aggregate to one row per (day, email), then count distinct across days
SELECT count(DISTINCT user_email) AS distinct_emails
FROM (
  SELECT date_trunc('day', timestamp) AS day, user_email
  FROM dd.logs(
      filter         => 'service:checkout-api',
      columns        => ARRAY['timestamp', '@usr.email'],
      from_timestamp => NOW() - INTERVAL '7 days',
      to_timestamp   => NOW()
  ) AS (
      timestamp  TIMESTAMP,
      user_email VARCHAR
  )
  GROUP BY 1, 2
) daily;
```

### Jointures {#joins}

#### Combinez les auto-jointures en un seul scan {#combine-self-joins-into-a-single-scan}

Joindre une source à elle-même plusieurs fois pour corréler différents événements est l'une des causes les plus fréquentes de lenteur des requêtes. La plupart des auto-jointures peuvent être réécrites en un seul scan avec des expressions `CASE`, des fonctions de fenêtrage ou `GROUP BY ... HAVING`.

**Avant : 4 auto-jointures**

```sql
WITH a AS (
    SELECT user_id FROM dd.logs(filter => 'service:checkout-api',
        columns => ARRAY['@usr.id'], from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp => NOW()) AS (user_id VARCHAR)
),
b AS (
    SELECT user_id FROM dd.logs(filter => 'service:payment-api',
        columns => ARRAY['@usr.id'], from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp => NOW()) AS (user_id VARCHAR)
),
c AS (
    SELECT user_id FROM dd.logs(filter => 'service:shipping-api',
        columns => ARRAY['@usr.id'], from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp => NOW()) AS (user_id VARCHAR)
),
d AS (
    SELECT user_id FROM dd.logs(filter => 'service:orders-api',
        columns => ARRAY['@usr.id'], from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp => NOW()) AS (user_id VARCHAR)
)
SELECT user_id
FROM a JOIN b USING (user_id)
       JOIN c USING (user_id)
       JOIN d USING (user_id);
```

**Après : scan unique**

```sql
SELECT user_id
FROM dd.logs(
    filter         => 'service:(checkout-api OR payment-api OR shipping-api OR orders-api)',
    columns        => ARRAY['service', '@usr.id'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (
    service VARCHAR,
    user_id VARCHAR
)
GROUP BY user_id
HAVING count(DISTINCT service) = 4;
```

#### Utilisez une clé de jointure à haute cardinalité {#use-a-high-cardinality-join-key}

Lors d'une jointure, privilégiez une clé à cardinalité élevée comme `user_id`, `request_id` ou `trace_id`. Des clés trop générales comme `service` ou `status` peuvent transformer un jeu de données d'entrée de taille modérée en des milliards de lignes intermédiaires. Pour les grands jeux de données, affinez également le filtre de la source de données et réduisez la plage temporelle de chaque côté de la jointure.

#### Filtrez les deux côtés d'une jointure inter-sources {#filter-both-sides-of-a-cross-source-join}

Lorsque vous joignez deux sources de données avec `JOIN`, appliquez un filtre sélectif de chaque côté. Par exemple : logs + RUM, logs + traces et flux + logs. Un côté non filtré entraîne un scan complet dont les données doivent être conservées en mémoire pour la jointure. Dans la mesure du possible, pré-agrégez chaque source séparément et joignez les résumés.

**Avant**

```sql
-- No filter on the logs side; full scan held in memory for the join
SELECT logs.message, rum.user_id
FROM (
    SELECT message, trace_id
    FROM dd.logs(
        columns        => ARRAY['message', 'trace_id'],
        from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp   => NOW()
    ) AS (message VARCHAR, trace_id VARCHAR)
) logs
JOIN rum ON logs.trace_id = rum.trace_id
WHERE rum.view_name = 'cart';
```

**Après**

```sql
-- Both sides filtered before the join
SELECT logs.message, rum.user_id
FROM (
    SELECT message, trace_id
    FROM dd.logs(
        filter         => 'service:checkout-api status:error',
        columns        => ARRAY['message', 'trace_id'],
        from_timestamp => NOW() - INTERVAL '1 day',
        to_timestamp   => NOW()
    ) AS (message VARCHAR, trace_id VARCHAR)
) logs
JOIN rum ON logs.trace_id = rum.trace_id
WHERE rum.view_name = 'cart';
```

### Expressions {#expressions}

#### Exécutez les expressions régulières une fois par ligne {#run-regular-expressions-once-per-row}

Si vous appelez `REGEXP_MATCH` une fois pour chaque colonne de sortie, le même motif est appliqué à `message` à répétition pour chaque ligne. Exécutez-la une seule fois pour stocker le résultat dans un tableau, concaténez les captures en une seule chaîne délimitée, puis extrayez-les avec `SPLIT_PART` dans un `SELECT` en aval.

**Avant**

```sql
-- Same regex evaluated 3 times per row
SELECT
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 1) AS user_id,
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 2) AS latency_ms,
  SPLIT_PART(ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||'), '|||', 3) AS error_code
FROM dd.logs(
    columns        => ARRAY['message'],
    from_timestamp => NOW() - INTERVAL '1 day',
    to_timestamp   => NOW()
) AS (message VARCHAR);
```

**Après**

```sql
-- Regex runs once per row; captures unpacked in the outer SELECT
SELECT
  SPLIT_PART(matched, '|||', 1) AS user_id,
  SPLIT_PART(matched, '|||', 2) AS latency_ms,
  SPLIT_PART(matched, '|||', 3) AS error_code
FROM (
  SELECT ARRAY_TO_STRING(REGEXP_MATCH(message, 'user_id=(\S+) latency_ms=(\d+) error=(\S+)'), '|||') AS matched
  FROM dd.logs(
      columns        => ARRAY['message'],
      from_timestamp => NOW() - INTERVAL '1 day',
      to_timestamp   => NOW()
  ) AS (message VARCHAR)
) sub;
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/notebooks/advanced_analysis
[2]: https://www.postgresql.org/docs/current/functions-window.html
[3]: https://www.postgresql.org/docs/current/functions-json.html
[4]: /fr/ddsql_editor/
[5]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters
[6]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-operators
[7]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#set-expressions-character-classes
[8]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#flag-options
[9]: https://unicode-org.github.io/icu/userguide/strings/regexp.html#find-and-replace
[10]: /fr/mcp_server/