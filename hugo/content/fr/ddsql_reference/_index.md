---
aliases:
- /fr/logs/workspaces/sql_reference
- /fr/ddsql_reference/ddsql_default
description: Référence complète pour la syntaxe DDSQL, les types de données, les fonctions,
  les opérateurs et les instructions pour interroger les données Datadog avec SQL.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentation
  text: Serveur MCP Datadog
- link: /ddsql_editor/
  tag: Documentation
  text: Éditeur DDSQL
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

## Aperçu {#overview}

DDSQL est SQL pour les données Datadog. Il implémente plusieurs opérations SQL standard, telles que `SELECT`, et permet des requêtes sur des données non structurées. Vous pouvez effectuer des actions comme obtenir exactement les données que vous souhaitez en écrivant votre propre instruction `SELECT`, ou interroger des tags comme s'ils étaient des colonnes de table standard.

Vous pouvez exécuter des requêtes DDSQL à partir d'agents AI en utilisant l'ensemble d'outils [Datadog MCP Server][10] `ddsql` (Aperçu).

Cette documentation couvre le support SQL disponible et inclut :
- [Syntaxe compatible avec PostgreSQL](#syntax)
- [Types de données](#data-types)
- [Littéraux de type](#type-literals)
- [Tableaux](#arrays)
- [Fonctions SQL](#functions)
- [Expressions régulières](#regular-expressions)
- [Fonctions de fenêtre](#window-functions)
- [Fonctions JSON](#json-functions-and-operators)
- [Fonctions d'adresse réseau](#network-address-functions-and-operators)
- [Fonctions de table](#table-functions)
- [Tags](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Exemple de cellule de travail avec syntaxe SQL" style="width:100%;" >}}

## Syntaxe {#syntax}

La syntaxe SQL suivante est prise en charge :

`SELECT (DISTINCT)` (DISTINCT: Optionnel)
: Récupère des lignes d'une base de données, en `DISTINCT` filtrant les enregistrements en double.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combine des lignes de deux tables ou plus en fonction d'une colonne liée entre elles. Prend en charge FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Regroupe les lignes ayant les mêmes valeurs dans des colonnes spécifiées en lignes de résumé.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concat)
: Concatène deux chaînes ou plus ensemble.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (Inclut le support pour `LIKE`, `IN`, `ON`, `OR` filtres)
: Filtre les enregistrements qui répondent à une condition spécifiée.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Fournit une logique conditionnelle pour renvoyer différentes valeurs en fonction des conditions spécifiées.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Effectue un calcul sur un ensemble de lignes de table qui sont liées à la ligne actuelle.

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
: Spécifie le nombre maximum d'enregistrements à renvoyer.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Ignore un nombre spécifié d'enregistrements avant de commencer à renvoyer des enregistrements de la requête.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Trie l'ensemble des résultats d'une requête par une ou plusieurs colonnes. Inclut ASC, DESC pour l'ordre de tri.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filtre les enregistrements qui répondent à une condition spécifiée après regroupement.

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
: Cette clause est un raccourci pour les jointures où les colonnes de jointure ont le même nom dans les deux tables. Elle prend une liste de ces colonnes séparées par des virgules et crée une condition d'égalité distincte pour chaque paire correspondante. Par exemple, joindre `T1` et `T2` avec `USING (a, b)` est équivalent à `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renomme une colonne ou une table avec un alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Opérations arithmétiques
: Effectue des calculs de base en utilisant des opérateurs comme `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Intervalle représentant une durée de temps spécifiée dans une unité donnée.
Unités prises en charge :<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## Types de données {#data-types}

DDSQL prend en charge les types de données suivants :

| Type de données | Description |
|-----------|-------------|
| `BIGINT` | Entiers signés de 64 bits. |
| `BOOLEAN` | `true` ou `false` valeurs. |
| `DECIMAL` | Nombres à virgule flottante. |
| `INET` | Valeurs d'adresse réseau (IPv4 et IPv6, avec longueur de préfixe CIDR optionnelle). |
| `INTERVAL` | Valeurs de durée de temps. |
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

Le préfixe de type peut être omis et le type est automatiquement déduit de la valeur. Par exemple, `'hello world'` est déduit comme `VARCHAR`, `123` comme `BIGINT`, et `true` comme `BOOLEAN`. Utilisez des préfixes de type explicites lorsque les valeurs pourraient être ambiguës ; par exemple, `TIMESTAMP '2025-01-01'` serait déduit comme `VARCHAR` sans le préfixe.

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

Les tableaux sont des collections ordonnées de valeurs qui partagent toutes le même type de données. Chaque type de base DDSQL a un type de tableau correspondant.

### Littéraux de tableau {#array-literals}

Utilisez la syntaxe `ARRAY[value1, value2, ...]` pour construire un littéral de tableau. Le type du tableau est automatiquement déduit des valeurs.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### Accès aux éléments {#element-access}

Accédez aux éléments individuels d'un tableau avec un indice basé sur 1. Accéder à un indice qui est hors limites renvoie `NULL`.

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

Pour accéder aux éléments d'une colonne de tableau, utilisez la même syntaxe d'indice :

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### Fonctions de tableau {#array-functions}

Les fonctions suivantes opèrent sur des tableaux :

| Fonction | Type de retour | Description |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | Renvoie le nombre d'éléments dans le tableau. |
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | Renvoie l'indice basé sur 1 de la première occurrence de `value` dans le tableau, ou `NULL` si non trouvé. |
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | Divise une chaîne en un tableau de chaînes sur le délimiteur donné. |
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | Joint les éléments du tableau en une chaîne avec le délimiteur donné. |
| `ARRAY_AGG(expression e)` | tableau du type d'entrée | Agrège les valeurs de plusieurs lignes dans un tableau. |
| `UNNEST(array a [, array b...])` | lignes de a[, b...] | Développe un ou plusieurs tableaux en un ensemble de lignes. Valide uniquement dans une clause `FROM` . |

{{% collapse-content title="Scénarios" level="h3" %}}

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

Les fonctions SQL suivantes sont prises en charge. Pour la fonction de fenêtre, voir la section [Fonction de fenêtre](#window-functions) séparée dans cette documentation.

| Fonction                                         | Type de retour                           | Description                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | Renvoie la plus petite valeur dans un ensemble de données.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | Renvoie la valeur maximale parmi toutes les valeurs d'entrée.                                                                                                                                                |
| `COUNT(any a)`                                   | numeric                               | Renvoie le nombre de valeurs d'entrée qui ne sont pas nulles.                                                                                                                                             |
| `SUM(numeric n)`                                 | numeric                               | Renvoie la somme de toutes les valeurs d'entrée.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numeric                               | Renvoie la valeur moyenne (moyenne arithmétique) de toutes les valeurs d'entrée.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | boolean                               | Renvoie si toutes les valeurs d'entrée non nulles sont vraies.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | boolean                               | Renvoie si au moins une valeur d'entrée non nulle est vraie.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | numeric                               | Renvoie la valeur arrondie à l'entier supérieur le plus proche. Les deux `CEIL` et `CEILING` sont pris en charge en tant qu'alias.                                                                                         |
| `FLOOR(numeric n)`                               | numeric                               | Renvoie la valeur arrondie à l'entier inférieur le plus proche.                                                                                                                                            |
| `ROUND(numeric n)`                               | numeric                               | Renvoie la valeur arrondie à l'entier le plus proche.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numeric                               | Renvoie la valeur de la base élevée à la puissance de l'exposant.                                                                                                                                        |
| `LOWER(string s)`                                | string                                | Renvoie la chaîne en minuscules.                                                                                                                                                                  |
| `UPPER(string s)`                                | string                                | Renvoie la chaîne en majuscules.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numeric                               | Renvoie la valeur absolue.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Renvoie la première valeur non nulle ou null si toutes sont nulles.                                                                                                                                         |
| `CAST(value AS type)`                            | type                                  | Convertit la valeur donnée au type de données spécifié.                                                                                                                                              |
| `LENGTH(string s)`                               | integer                               | Renvoie le nombre de caractères dans la chaîne.                                                                                                                                                   |
| `TRIM(string s)`                                 | string                                | Supprime les espaces blancs au début et à la fin de la chaîne.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | string                                | Remplace les occurrences d'une sous-chaîne dans une chaîne par une autre sous-chaîne.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | string                                | Extrait une sous-chaîne d'une chaîne, en commençant à une position donnée et pour une longueur spécifiée.                                                                                                      |
| `REVERSE(string s)`                              | string                                | Renvoie la chaîne avec les caractères dans l'ordre inverse.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | entier                               | Renvoie la première position d'index de la sous-chaîne dans une chaîne donnée, ou 0 s'il n'y a pas de correspondance.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | chaîne                         | Divise la chaîne sur le délimiteur donné et renvoie la chaîne à la position spécifiée en comptant à partir de 1.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numérique                               | Extrait une partie d'un champ de date ou d'heure (comme l'année ou le mois) à partir d'un horodatage ou d'un intervalle.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | horodatage                             | Convertit une chaîne en un horodatage selon le format donné.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | horodatage                             | Convertit un horodatage d'époque UNIX (en secondes) en un horodatage.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | chaîne                                | Convertit un horodatage en une chaîne selon le format donné.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | horodatage                             | Aligne un horodatage (source) sur des seaux de longueur égale (pas). Renvoie le début du seau contenant la source, calculé comme le plus grand horodatage inférieur ou égal à la source et qui est un multiple du pas à partir de l'origine. |
| `DATE_TRUNC(string unit, timestamp t)`           | horodatage                             | Tronque un horodatage à une précision spécifiée en fonction de l'unité fournie.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | chaîne                                | Renvoie la valeur actuelle du paramètre spécifié. Prend en charge les paramètres `dd.time_frame_start` et `dd.time_frame_end`, qui renvoient respectivement le début et la fin de la période de temps globale. |
| `NOW()`                                          | horodatage                             | Renvoie l'horodatage UTC actuel au début de la requête actuelle.                                                                                                                              |
| `CARDINALITY(array a)`                           | entier                               | Renvoie le nombre d'éléments dans le tableau.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | entier                               | Renvoie l'index de la première occurrence de la valeur trouvée dans le tableau, ou null si la valeur n'est pas trouvée.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | tableau de chaînes                      | Divise la chaîne donnée en un tableau de chaînes en utilisant le délimiteur donné.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | chaîne                                | Convertit un tableau en une chaîne en concaténant les éléments avec le délimiteur donné.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | tableau de type d'entrée                   | Crée un tableau en collectant toutes les valeurs d'entrée.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | type d'expression        | Calcule une valeur percentile approximative. Le percentile doit être compris entre 0,0 et 1,0 (inclus). Nécessite la syntaxe `WITHIN GROUP (ORDER BY ...)`.                                              |
| `UNNEST(array a [, array b...])`                 | lignes d'un [, b...]                    | Développe les tableaux en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                    |

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
| `dow`             | `timestamp`              | jour de la semaine `1` (lundi) à `7` (dimanche) |
| `doy`             | `timestamp`              | jour de l'année (`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | secondes depuis 1970-01-01 00:00:00 UTC (pour les horodatages), ou nombre total de secondes (pour les intervalles) |
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

**Forme 1 : Convertir une chaîne en horodatage avec le format**

Modèles pris en charge pour le formatage de date/heure :
| Modèle     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | année (4 chiffres)                      |
| `YY`        | année (2 chiffres)                      |
| `MM`        | numéro de mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)                 |
| `HH24`      | heure du jour (00 - 23)                |
| `HH12`      | heure du jour (01 - 12)                |
| `HH`        | heure du jour (01 - 12)                |
| `MI`        | minute (00 - 59)                       |
| `SS`        | seconde (00 - 59)                       |
| `MS`        | milliseconde (000 - 999)                |
| `TZ`        | abréviation de fuseau horaire           |
| `OF`        | décalage horaire par rapport à UTC      |
| `AM` / `am` | indicateur de méridien (sans points) |
| `PM` / `pm` | indicateur de méridien (sans points) |

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP('25/12/2025 04:23 pm', 'DD/MM/YYYY HH:MI am') AS ts
{{< /code-block >}}

**Forme 2 : Convertir le timestamp UNIX en timestamp**

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
| `MM`        | numéro de mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)               |
| `HH24`      | heure du jour (00 - 23)                |
| `HH12`      | heure du jour (01 - 12)                |
| `HH`        | heure du jour (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | seconde (00 - 59)                     |
| `MS`        | milliseconde (000 - 999)              |
| `TZ`        | abréviation de fuseau horaire               |
| `OF`        | décalage horaire par rapport à UTC            |
| `AM` / `am` | indicateur de méridien (sans points) |
| `PM` / `pm` | indicateur de méridien (sans points) |

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

Tronquages pris en charge :
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

### Variantes {#flavor}

Toutes les fonctions d'expressions régulières (regex) utilisent la variante des Composants Internationaux pour Unicode (ICU) :

- [Métacaractères][5]
- [Opérateurs][6]
- [Expressions d'ensemble (Classes de caractères)][7]
- [Options de drapeau pour les drapeaux dans le motif][8]. Reportez-vous à la section [drapeaux ci-dessous](#function-level-flags) pour les drapeaux au niveau de la fonction.
- [Trouver et Remplacer (en utilisant des groupes de capture)][9]

### Fonctions {#functions-1}

| Fonction                                                                                                         | Type de retour      | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Booléen          | Évalue si une chaîne correspond à un motif d'expression régulière.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | tableau de chaînes | Renvoie les sous-chaînes de la première correspondance de motif dans la chaîne. <br><br> Cette fonction recherche la chaîne d'entrée en utilisant le motif donné et renvoie les sous-chaînes capturées (groupes de capture) de la première correspondance. Si aucun groupe de capture n'est présent, renvoie la correspondance complète. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | chaîne           | Remplace la sous-chaîne correspondant à la première occurrence du motif, ou toutes ces occurrences si vous utilisez le [ flag optionnel `g`](#function-level-flags)                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | chaîne           | Remplace la sous-chaîne qui est la N-ième correspondance au motif, ou toutes ces correspondances si `N` est zéro, en commençant par `start`.                                                                                                                                                    |

{{% collapse-content title="Scénarios" level="h3" %}}

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

### Drapeaux au niveau de la fonction {#function-level-flags}

Vous pouvez utiliser les drapeaux suivants avec [les fonctions d'expressions régulières](#regular-expressions) :

`i`
: Correspondance insensible à la casse

`n` ou `m`
: Correspondance sensible aux nouvelles lignes

`g`
: Global; remplace _toutes_ les sous-chaînes correspondantes plutôt que seulement la première.

{{% collapse-content title="Scénarios" level="h3" %}}

### `i` drapeau {#i-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### `n` drapeau {#n-flag}

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b');
-- NULL

SELECT regexp_match('a
b', '^b', 'n');
-- ['b']
{{< /code-block >}}

### `g` drapeau {#g-flag}

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions de fenêtre {#window-functions}

Ce tableau fournit un aperçu des fonctions de fenêtre prises en charge. Pour des détails complets et des exemples, consultez la [documentation PostgreSQL][2].

| Fonction                | Type de retour       | Description                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | N/A               | Définit une fenêtre pour un ensemble de lignes sur lesquelles d'autres fonctions de fenêtre peuvent opérer. |
| `PARTITION BY`          | N/A               | Divise l'ensemble des résultats en partitions, spécifiquement pour appliquer des fonctions de fenêtre. |
| `RANK()`                | entier           | Attribue un rang à chaque ligne au sein d'une partition, avec des lacunes pour les égalités.     |
| `ROW_NUMBER()`          | entier           | Attribue un numéro séquentiel unique à chaque ligne au sein d'une partition.     |
| `LEAD(column n)`        | type de colonne     | Renvoie la valeur de la ligne suivante dans la partition.                  |
| `LAG(column n)`         | type de colonne     | Renvoie la valeur de la ligne précédente dans la partition.              |
| `FIRST_VALUE(column n)` | type de colonne     | Renvoie la première valeur dans un ensemble ordonné de valeurs.                   |
| `LAST_VALUE(column n)`  | type de colonne     | Renvoie la dernière valeur dans un ensemble ordonné de valeurs.                    |
| `NTH_VALUE(column n, offset)`| type de colonne | Renvoie la valeur à l'offset spécifié dans un ensemble ordonné de valeurs. |


## Fonctions et opérateurs JSON {#json-functions-and-operators}

| Nom                                          | Type de retour  | Description                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path…) | texte         | Extrait un sous-objet JSON sous forme de texte, défini par le chemin. Son comportement est équivalent à la [fonction Postgres du même nom][3]. Par exemple, `json_extract_path_text(col, ‘forest')` renvoie la valeur de la clé `forest` pour chaque objet JSON dans `col`. Voir l'exemple ci-dessous pour une syntaxe de tableau JSON. |
| json_extract_path(text json, text path…)      | JSON         | Même fonctionnalité que `json_extract_path_text`, mais renvoie une colonne de type JSON au lieu de type texte.                                                                                                                                                                                                        |
| json_array_elements(text json)                | lignes de JSON | Développe un tableau JSON en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | lignes de résultat | Transforme un tableau JSON en un ensemble de lignes. Cette forme n'est autorisée que dans une clause FROM.                                                                                                                                                                                                                           |

## Fonctions et opérateurs d'adresse réseau {#network-address-functions-and-operators}

Le type `inet` représente les adresses réseau IPv4 et IPv6 avec une longueur de préfixe CIDR optionnelle (par exemple, `192.168.1.5/24` ou `::1`). Créez des valeurs `inet` avec la syntaxe littérale de type `INET 'value'` ou en convertissant une chaîne avec `CAST(column AS inet)`.

### Fonctions {#functions-2}

| Fonction | Type de retour | Description |
|----------|-------------|-------------|
| `host(inet addr)` | `VARCHAR` | Renvoie l'adresse IP sous forme de texte, sans la longueur de préfixe. |
| `network(inet addr)` | `INET` | Renvoie la partie réseau de l'adresse, avec les bits d'hôte mis à zéro. |
| `netmask(inet addr)` | `INET` | Renvoie le masque réseau pour l'adresse. |
| `masklen(inet addr)` | `BIGINT` | Renvoie la longueur de préfixe du masque réseau. |
| `broadcast(inet addr)` | `INET` | Renvoie l'adresse de diffusion du réseau. |
| `family(inet addr)` | `BIGINT` | Renvoie la famille d'adresses : `4` pour IPv4, `6` pour IPv6. |

### Opérateurs {#operators}

| Opérateur | Type de retour | Description |
|----------|-------------|-------------|
| `inet a << inet b` | `BOOLEAN` | Renvoie `true` si `a` est strictement contenu dans `b`. |
| `inet a <<= inet b` | `BOOLEAN` | Renvoie `true` si `a` est contenu dans ou égal à `b`. |
| `inet a >> inet b` | `BOOLEAN` | Renvoie `true` si `a` contient strictement `b`. |
| `inet a >>= inet b` | `BOOLEAN` | Renvoie `true` si `a` contient ou est égal à `b`. |
| `inet a && inet b` | `BOOLEAN` | Renvoie `true` si les sous-réseaux de `a` et `b` se chevauchent. |

{{% collapse-content title="Scénarios" level="h3" %}}

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

## Fonctions de table {#table-functions}
Les fonctions de table sont utilisées pour interroger les journaux, les métriques, les coûts cloud et d'autres sources de données.

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
    colonnes => tableau < varchar >,
    filtre ? => varchar,
    index ? => tableau < varchar >,
    stockage ? => varchar,
    depuis_timestamp ? => timestamp,
    vers_timestamp ? => timestamp
) EN (nom_colonne type [, ...])</pre>
      </td>
      <td>Renvoie les données de journal sous forme de tableau. Le paramètre colonnes spécifie quels champs de journal extraire. Les champs imbriqués sont accessibles en utilisant la notation par points, et les champs non principaux doivent être précédés par <code>@</code>. La clause AS définit le schéma du tableau renvoyé. Optionnel : filtrage par index ou plage horaire. Lorsque le temps n'est pas spécifié, DDSQL utilise par défaut le paramètre de temps global, qui dans l'éditeur DDSQL est réglé sur la dernière heure. Optionnel : spécifier le stockage à utiliser (par exemple, <code>hot</code>, <code>flex_tier</code>). Si non spécifié, la valeur par défaut est le hot storage.</td>
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
    réducteur varchar [, depuis_timestamp timestamp, vers_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie des données métriques sous forme de valeur scalaire. La fonction accepte une requête de métriques (avec regroupement optionnel), un réducteur pour déterminer comment les valeurs sont agrégées (moyenne, maximum, etc.), et des paramètres de timestamp optionnels (par défaut 1 heure) pour définir la plage horaire.</td>
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
    requête varchar [, from_timestamp timestamp, to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie les données métriques sous forme de série temporelle. La fonction accepte une requête de métriques (avec regroupement optionnel) et des paramètres d'horodatage optionnels (par défaut 1 heure) pour définir la plage temporelle. Renvoie des points de données au fil du temps plutôt qu'une seule valeur agrégée.</td>
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
    requête varchar,
    réducteur varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie <a href="/cloud_cost_management/">des données de coût cloud</a> sous forme de valeur scalaire. La fonction accepte une requête de coût cloud (avec regroupement optionnel), un réducteur d'agrégation (utilisez <code>sum</code> pour les données de coût ; d'autres réducteurs tels que <code>avg</code>, <code>min</code>, et <code>max</code> sont acceptés mais rarement applicables aux requêtes de coût), et des paramètres timestamp optionnels (par défaut 1 heure) pour définir la plage temporelle. <strong>Remarque</strong> : Les données de coût cloud sont généralement retardées de 24 à 48 heures, donc les timestamps récents peuvent ne renvoyer aucun résultat.</td>
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
    requête varchar
    [, from_timestamp timestamp,
    to_timestamp timestamp]
)</pre>
      </td>
      <td>Renvoie <a href="/cloud_cost_management/">des données de coût cloud</a> sous forme de série temporelle. La fonction accepte une requête de coût cloud (avec regroupement optionnel) et des paramètres timestamp optionnels (par défaut 1 heure) pour définir la plage temporelle. Renvoie des points de données de coût au fil du temps plutôt qu'une seule valeur agrégée. <strong>Remarque</strong> : Les données de coût cloud sont généralement retardées de 24 à 48 heures, donc les timestamps récents peuvent ne retourner aucun résultat.</td>
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

### Absolute timestamps {#absolute-timestamps}

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

### Relative timestamps {#relative-timestamps}

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

Les alias de colonnes ne peuvent pas contenir de points ; remplacez-les par des underscores ou tout autre caractère valide lors de la définition de l'alias.

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

## Étiquettes {#tags}

DDSQL expose les étiquettes comme un `hstore` type, inspiré de PostgreSQL. Vous pouvez accéder aux valeurs pour des clés d'étiquettes spécifiques en utilisant l'opérateur flèche de PostgreSQL. Exemple :

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Les étiquettes sont des paires clé-valeur où chaque clé peut avoir zéro, une ou plusieurs valeurs d'étiquettes correspondantes. Lorsqu'elle est accédée, la valeur de l'étiquette renvoie une seule chaîne, contenant _toutes_ les valeurs correspondantes. Lorsque les données ont plusieurs valeurs d'étiquettes pour la même clé d'étiquette, elles sont représentées sous forme de chaîne triée, séparée par des virgules. Exemple :

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

Vous pouvez également comparer les valeurs d'étiquettes en tant que chaînes ou ensembles d'étiquettes entiers :

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

De plus, vous pouvez extraire les clés et les valeurs d'étiquettes dans des tableaux individuels de texte :

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### Fonctions et opérateurs HSTORE {#hstore-functions-and-operators}

| Nom                                          | Type de retour   | Description                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | Texte          | Obtient la valeur pour une clé donnée. Renvoie `null` si la clé n'est pas présente.                             |
| akeys(hstore tags)                            | Tableau de texte | Obtient les clés d'un HSTORE sous forme de tableau                                                            |
| avals(hstore tags)                            | Tableau de texte | Obtient les valeurs d'un HSTORE sous forme de tableau                                                          |

## Lectures complémentaires {#further-reading}

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
[10]: /fr/bits_ai/mcp_server/