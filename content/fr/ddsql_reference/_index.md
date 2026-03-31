---
aliases:
- /fr/logs/workspaces/sql_reference
- /fr/ddsql_reference/ddsql_default
description: Référence complète de la syntaxe DDSQL, des types de données, des fonctions,
  des opérateurs et des instructions pour interroger les données Datadog avec SQL.
further_reading:
- link: /ddsql_editor/
  tag: Documentation
  text: En savoir plus sur DDSQL Editor
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

## Présentation

DDSQL est un langage SQL pour les données Datadog. Il implémente plusieurs opérations SQL standard, telles que `SELECT`, et permet d'interroger des données non structurées. Vous pouvez effectuer des actions comme obtenir exactement les données souhaitées en rédigeant votre propre instruction `SELECT`, ou interroger des tags comme s'ils étaient des colonnes de table standard.

Cette documentation couvre la prise en charge SQL disponible et inclut :
- [Syntaxe compatible avec PostgreSQL](#syntaxe)
- [Types de données](#types-de-données)
- [Littéraux de type](#littéraux-de-type)
- [Tableaux](#tableaux)
- [Fonctions SQL](#fonctions)
- [Expressions régulières](#expressions-régulières)
- [Fonctions de fenêtrage](#fonctions-de-fenêtrage)
- [Fonctions JSON](#fonctions-et-opérateurs-json)
- [Fonctions de table](#fonctions-de-table)
- [Tags](#tags)


{{< img src="/logs/workspace/sql_reference/sql_syntax_analysis_cell.png" alt="Exemple de cellule d'espace de travail avec syntaxe SQL" style="width:100%;" >}}

## Syntaxe

La syntaxe SQL suivante est prise en charge :

`SELECT (DISTINCT)` (DISTINCT : facultatif)
: Récupérer des lignes depuis une base de données, `DISTINCT` filtrant les enregistrements en double.

    {{< code-block lang="sql" >}}SELECT DISTINCT customer_id
FROM orders {{< /code-block >}}

`JOIN`
: Combiner des lignes provenant de deux tables ou plus en fonction d'une colonne liée entre elles. Prend en charge FULL JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
ON orders.customer_id = customers.customer_id {{< /code-block >}}

`GROUP BY`
: Regrouper les lignes ayant les mêmes valeurs dans les colonnes spécifiées en lignes récapitulatives.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM sales
GROUP BY product_id {{< /code-block >}}

`||` (concaténation)
: Concaténer deux chaînes ou plus.

    {{< code-block lang="sql" >}}SELECT first_name || ' ' || last_name AS full_name
FROM employees {{< /code-block >}}

`WHERE` (prend en charge les filtres `LIKE`, `IN`, `ON`, `OR`)
: Filtrer les enregistrements répondant à une condition spécifiée.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
WHERE department = 'Sales' AND name LIKE 'J%' {{< /code-block >}}

`CASE`
: Appliquer une logique conditionnelle pour renvoyer différentes valeurs selon des conditions spécifiées.

    {{< code-block lang="sql" >}}SELECT order_id,
  CASE
    WHEN quantity > 10 THEN 'Bulk Order'
    ELSE 'Standard Order'
  END AS order_type
FROM orders {{< /code-block >}}

`WINDOW`
: Effectuer un calcul sur un ensemble de lignes de table liées à la ligne courante.

    {{< code-block lang="sql" >}}SELECT
  timestamp,
  service_name,
  cpu_usage_percent,
  AVG(cpu_usage_percent) OVER (PARTITION BY service_name ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_cpu
FROM
  cpu_usage_data {{< /code-block >}}

`IS NULL` / `IS NOT NULL`
: Vérifier si une valeur est nulle ou non nulle.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE delivery_date IS NULL {{< /code-block >}}

`LIMIT`
: Spécifier le nombre maximum d'enregistrements à renvoyer.

    {{< code-block lang="sql" >}}SELECT *
FROM customers
LIMIT 10 {{< /code-block >}}

`OFFSET`
: Ignorer un nombre spécifié d'enregistrements avant de commencer à renvoyer les résultats de la requête.

    {{< code-block lang="sql" >}}SELECT *
FROM employees
OFFSET 20 {{< /code-block >}}

`ORDER BY`
: Trier le jeu de résultats d'une requête selon une ou plusieurs colonnes. Prend en charge ASC et DESC pour l'ordre de tri.

    {{< code-block lang="sql" >}}SELECT *
FROM sales
ORDER BY sale_date DESC {{< /code-block >}}

`HAVING`
: Filtrer les enregistrements répondant à une condition spécifiée après le regroupement.

    {{< code-block lang="sql" >}}SELECT product_id, SUM(quantity)
FROM ventes
GROUP BY product_id
HAVING SUM(quantity) > 10 {{< /code-block >}}

`IN`, `ON`, `OR`
: Utilisés pour les conditions spécifiées dans les requêtes. Disponibles dans les clauses `WHERE` et `JOIN`.

    {{< code-block lang="sql" >}}SELECT *
FROM orders
WHERE order_status IN ('Shipped', 'Pending') {{< /code-block >}}

`USING`
: Cette clause est un raccourci pour les jointures dont les colonnes de jointure portent le même nom dans les deux tables. Elle prend une liste de ces colonnes séparées par des virgules et crée une condition d'égalité distincte pour chaque paire correspondante. Par exemple, joindre `T1` et `T2` avec `USING (a, b)` est équivalent à `ON T1.a = T2.a AND T1.b = T2.b`.

    {{< code-block lang="sql" >}}SELECT orders.order_id, customers.customer_name
FROM orders
JOIN customers
USING (customer_id) {{< /code-block >}}

`AS`
: Renommer une colonne ou une table avec un alias.

    {{< code-block lang="sql" >}}SELECT first_name AS name
FROM employees {{< /code-block >}}

Opérations arithmétiques
: Effectuer des calculs de base à l'aide d'opérateurs tels que `+`, `-`, `*`, `/`.

    {{< code-block lang="sql" >}}SELECT price, tax, (price * tax) AS total_cost
FROM products {{< /code-block >}}

`INTERVAL value unit`
: Intervalle représentant une durée spécifiée dans une unité donnée.
Unités prises en charge :<br>- `milliseconds` / `millisecond`<br>- `seconds` / `second`<br>- `minutes` / `minute`<br>- `hours` / `hour`<br>- `days` / `day`

## Types de données

DDSQL prend en charge les types de données suivants :

| Type de données | Description |
|-----------|-------------|
| `BIGINT` | Entiers signés sur 64 bits. |
| `BOOLEAN` | Valeurs `true` ou `false`. |
| `DECIMAL` | Nombres à virgule flottante. |
| `INTERVAL` | Valeurs de durée. |
| `JSON` | Données JSON. |
| `TIMESTAMP` | Valeurs de date et d'heure. |
| `VARCHAR` | Chaînes de caractères de longueur variable. |

### Types tableau

Tous les types de données prennent en charge les types tableau. Consultez la section [Tableaux](#tableaux) pour les littéraux de tableau, l'accès aux éléments et les fonctions de tableau.

## Littéraux de type

DDSQL prend en charge les littéraux de type explicites avec la syntaxe `[TYPE] [valeur]`.

| Type | Syntaxe | Exemple |
|------|--------|---------|
| `BIGINT` | `BIGINT 'valeur'` | `BIGINT '1234567'` |
| `BOOLEAN` | `BOOLEAN 'valeur'` | `BOOLEAN 'true'` |
| `DECIMAL` | `DECIMAL 'valeur'` | `DECIMAL '3.14159'` |
| `INTERVAL` | `INTERVAL 'valeur unité'` | `INTERVAL '30 minutes'` |
| `JSON` | `JSON 'valeur'` | `JSON '{"key": "value", "count": 42}'` |
| `TIMESTAMP` | `TIMESTAMP 'valeur'` | `TIMESTAMP '2023-12-25 10:30:00'` |
| `VARCHAR` | `VARCHAR 'valeur'` | `VARCHAR 'hello world'` |

Le préfixe de type peut être omis et le type est automatiquement déduit de la valeur. Par exemple, `'hello world'` est déduit comme `VARCHAR`, `123` comme `BIGINT` et `true` comme `BOOLEAN`. Utilisez des préfixes de type explicites lorsque les valeurs peuvent être ambiguës ; par exemple, `TIMESTAMP '2025-01-01'` serait déduit comme `VARCHAR` sans le préfixe.

### Exemple

{{< code-block lang="sql" >}}
-- Using type literals in queries
SELECT
    VARCHAR 'Product Name: ' || name AS labeled_name,
    price * DECIMAL '1.08' AS price_with_tax,
    created_at + INTERVAL '7 days' AS expiry_date
FROM products
WHERE created_at > TIMESTAMP '2025-01-01';
{{< /code-block >}}

## Tableaux

Les tableaux sont des collections ordonnées de valeurs partageant toutes le même type de données. Chaque type de base DDSQL possède un type tableau correspondant.

### Littéraux de tableau

Utiliser la syntaxe `ARRAY[valeur1, valeur2, ...]` pour construire un littéral de tableau. Le type du tableau est automatiquement déduit des valeurs.

{{< code-block lang="sql" >}}
SELECT ARRAY['apple', 'banana', 'cherry'] AS fruits;  -- VARCHAR array
SELECT ARRAY[1, 2, 3] AS numbers;                     -- BIGINT array
SELECT ARRAY[true, false, true] AS flags;             -- BOOLEAN array
SELECT ARRAY[1.1, 2.2, 3.3] AS decimals;              -- DECIMAL array
{{< /code-block >}}

### Accès aux éléments

Accéder aux éléments individuels d'un tableau avec un indice basé sur 1. Accéder à un index hors limites renvoie `NULL`.

{{< code-block lang="sql" >}}
SELECT ARRAY['a', 'b', 'c'][1];   -- Returns 'a'
SELECT ARRAY['a', 'b', 'c'][2];   -- Returns 'b'
SELECT ARRAY['a', 'b', 'c'][10];  -- Returns NULL (out of bounds)
{{< /code-block >}}

Pour accéder aux éléments d'une colonne de tableau, utiliser la même syntaxe d'indice :

{{< code-block lang="sql" >}}
SELECT recipients[1] AS first_recipient
FROM emails
{{< /code-block >}}

### Fonctions de tableau

Les fonctions suivantes opèrent sur des tableaux :

| Fonction | Type renvoyé | Description |
|----------|-------------|-------------|
| `CARDINALITY(array a)` | `BIGINT` | Renvoie le nombre d'éléments dans le tableau. |
| `ARRAY_POSITION(array a, typeof_array value)` | `BIGINT` | Renvoie l'index basé sur 1 de la première occurrence de `value` dans le tableau, ou `NULL` si non trouvé. |
| `STRING_TO_ARRAY(string s, string delimiter)` | `VARCHAR[]` | Divise une chaîne en un tableau de chaînes selon le délimiteur donné. |
| `ARRAY_TO_STRING(array a, string delimiter)` | `VARCHAR` | Joint les éléments d'un tableau en une chaîne avec le délimiteur donné. |
| `ARRAY_AGG(expression e)`  | tableau du type d'entrée | Agrège les valeurs de plusieurs lignes en un tableau. |
| `UNNEST(array a [, array b...])` | rows of a [, b...] | Développe un ou plusieurs tableaux en un ensemble de lignes. Valide uniquement dans une clause `FROM`. |

{{% collapse-content title="Examples" level="h3" %}}

### `CARDINALITY`
{{< code-block lang="sql" >}}
SELECT
  CARDINALITY(recipients) AS recipient_count
FROM
  emails
{{< /code-block >}}

### `ARRAY_POSITION`
{{< code-block lang="sql" >}}
SELECT
  ARRAY_POSITION(recipients, 'hello@example.com') AS position
FROM
  emails
{{< /code-block >}}

### `STRING_TO_ARRAY`
{{< code-block lang="sql" >}}
SELECT
  STRING_TO_ARRAY('a,b,c,d,e,f', ',') AS parts
{{< /code-block >}}

### `ARRAY_TO_STRING`
{{< code-block lang="sql" >}}
SELECT
  ARRAY_TO_STRING(ARRAY['a', 'b', 'c'], ',') AS joined_string
{{< /code-block >}}

### `ARRAY_AGG`
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

### `UNNEST`
{{< code-block lang="sql" >}}
SELECT
  sender,
  recipient
FROM
  emails,
  UNNEST(recipients) AS recipient
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions

Les fonctions SQL suivantes sont prises en charge. Pour les fonctions de fenêtrage, consultez la section [Fonctions de fenêtrage](#fonctions-de-fenêtrage) dans cette documentation.

| Fonction                                         | Type renvoyé                           | Description                                                                                                                                                                                       |
|--------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MIN(variable v)`                                | typeof v                              | Renvoie la plus petite valeur dans un ensemble de données.                                                                                                                                                      |
| `MAX(variable v)`                                | typeof v                              | Renvoie la valeur maximale parmi toutes les valeurs d'entrée.                                                                                                                                                |
| `COUNT(any a)`                                   | numérique                               | Renvoie le nombre de valeurs d'entrée non nulles.                                                                                                                                             |
| `SUM(numeric n)`                                 | numérique                               | Renvoie la somme de toutes les valeurs d'entrée.                                                                                                                                                    |
| `AVG(numeric n)`                                 | numérique                               | Renvoie la valeur moyenne (moyenne arithmétique) de toutes les valeurs d'entrée.                                                                                                                              |
| `BOOL_AND(boolean b)`                            | booléen                               | Renvoie si toutes les valeurs d'entrée non nulles sont vraies.                                                                                                                                               |
| `BOOL_OR(boolean b)`                             | booléen                               | Renvoie si au moins une valeur d'entrée non nulle est vraie.                                                                                                                                                 |
| `CEIL(numeric n)` / `CEILING(numeric n)`         | numérique                               | Renvoie la valeur arrondie à l'entier supérieur. `CEIL` et `CEILING` sont tous deux pris en charge comme alias.                                                                                         |
| `FLOOR(numeric n)`                               | numérique                               | Renvoie la valeur arrondie à l'entier inférieur.                                                                                                                                            |
| `ROUND(numeric n)`                               | numérique                               | Renvoie la valeur arrondie à l'entier le plus proche.                                                                                                                                                 |
| `POWER(numeric base, numeric exponent)`          | numérique                               | Renvoie la valeur de la base élevée à la puissance de l'exposant.                                                                                                                                        |
| `LOWER(string s)`                                | chaîne                                | Renvoie la chaîne en minuscules.                                                                                                                                                                  |
| `UPPER(string s)`                                | chaîne                                | Renvoie la chaîne en majuscules.                                                                                                                                                                  |
| `ABS(numeric n)`                                 | numérique                               | Renvoie la valeur absolue.                                                                                                                                                                       |
| `COALESCE(args a)`                               | typeof first non-null a OR null       | Renvoie la première valeur non nulle, ou null si toutes sont nulles.                                                                                                                                         |
| `CAST(value AS type)`                            | type                                  | Convertit la valeur donnée vers le type de données spécifié.                                                                                                                                              |
| `LENGTH(string s)`                               | nombre entier                               | Renvoie le nombre de caractères dans la chaîne.                                                                                                                                                   |
| `TRIM(string s)`                                 | chaîne                                | Supprime les espaces blancs en début et en fin de chaîne.                                                                                                                                          |
| `REPLACE(string s, string from, string to)`      | chaîne                                | Remplace les occurrences d'une sous-chaîne dans une chaîne par une autre sous-chaîne.                                                                                                                       |
| `SUBSTRING(string s, int start, int length)`     | chaîne                                | Extrait une sous-chaîne à partir d'une position donnée et d'une longueur spécifiée.                                                                                                      |
| `REVERSE(string s)`                              | chaîne                                | Renvoie la chaîne avec les caractères en ordre inverse.                                                                                                                                               |
| `STRPOS(string s, string substring)`             | nombre entier                               | Renvoie la position du premier index de la sous-chaîne dans la chaîne donnée, ou 0 si aucune correspondance.                                                                                                   |
| `SPLIT_PART(string s, string delimiter, integer index)` | chaîne                         | Divise la chaîne selon le délimiteur donné et renvoie la chaîne à la position donnée en comptant à partir de un.                                                                                          |
| `EXTRACT(unit from timestamp/interval)`          | numérique                               | Extrait une partie d'un champ de date ou d'heure (comme l'année ou le mois) depuis un timestamp ou un intervalle.                                                                                                     |
| `TO_TIMESTAMP(string timestamp, string format)`  | timestamp                             | Convertit une chaîne en timestamp selon le format donné.                                                                                                                                   |
| `TO_TIMESTAMP(numeric epoch)`                    | timestamp                             | Convertit un timestamp d'époque UNIX (en secondes) en timestamp.                                                                                                                                      |
| `TO_CHAR(timestamp t, string format)`            | chaîne                                | Convertit un timestamp en chaîne selon le format donné.                                                                                                                                   |
| `DATE_BIN(interval stride, timestamp source, timestamp origin)` | timestamp                             | Aligne un timestamp (source) sur des intervalles de longueur régulière (stride). Renvoie le début de l'intervalle contenant la source, calculé comme le plus grand timestamp inférieur ou égal à la source et correspondant à un multiple de longueurs de stride à partir de l'origine. |
| `DATE_TRUNC(string unit, timestamp t)`           | timestamp                             | Tronque un timestamp à une précision spécifiée selon l'unité fournie.                                                                                                                        |
| `CURRENT_SETTING(string setting_name)`           | chaîne                                | Renvoie la valeur actuelle du paramètre spécifié. Prend en charge les paramètres `dd.time_frame_start` et `dd.time_frame_end`, qui renvoient respectivement le début et la fin de la plage temporelle globale. |
| `NOW()`                                          | timestamp                             | Renvoie le timestamp UTC actuel au début de la requête en cours.                                                                                                                              |
| `CARDINALITY(array a)`                           | nombre entier                               | Renvoie le nombre d'éléments dans le tableau.                                                                                                                                                      |
| `ARRAY_POSITION(array a, typeof_array value)`    | nombre entier                               | Renvoie l'index de la première occurrence de la valeur trouvée dans le tableau, ou null si la valeur est introuvable.                                                                                         |
| `STRING_TO_ARRAY(string s, string delimiter)`    | tableau de chaînes                      | Divise la chaîne donnée en un tableau de chaînes à l'aide du délimiteur donné.                                                                                                                       |
| `ARRAY_TO_STRING(array a, string delimiter)`     | chaîne                                | Convertit un tableau en chaîne en concaténant les éléments avec le délimiteur donné.                                                                                                                 |
| `ARRAY_AGG(expression e)`                        | tableau du type d'entrée                   | Crée un tableau en collectant toutes les valeurs d'entrée.                                                                                                                                              |
| `APPROX_PERCENTILE(double percentile) WITHIN GROUP (ORDER BY expression e)` | typeof expression        | Calcule une valeur de percentile approximative. Le percentile doit être compris entre 0,0 et 1,0 (inclus). Nécessite la syntaxe `WITHIN GROUP (ORDER BY ...)`.                                              |
| `UNNEST(array a [, array b...])`                 | lignes de a [, b...]                    | Développe des tableaux en un ensemble de lignes. Cette forme est uniquement autorisée dans une clause FROM.                                                                                                                    |

{{% collapse-content title="Examples" level="h3" %}}

### `MIN`
{{< code-block lang="sql" >}}
SELECT MIN(response_time) AS min_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `MAX`
{{< code-block lang="sql" >}}
SELECT MAX(response_time) AS max_response_time
FROM logs
WHERE status_code = 200
{{< /code-block >}}

### `COUNT`
{{< code-block lang="sql" >}}SELECT COUNT(request_id) AS total_requests
FROM logs
WHERE status_code = 200 {{< /code-block >}}

### `SUM`
{{< code-block lang="sql" >}}SELECT SUM(bytes_transferred) AS total_bytes
FROM logs
GROUP BY service_name
{{< /code-block >}}

### `AVG`
{{< code-block lang="sql" >}}SELECT AVG(response_time)
AS avg_response_time
FROM logs
WHERE status_code = 200
GROUP BY service_name
{{< /code-block >}}

### `BOOL_AND`
{{< code-block lang="sql" >}}SELECT BOOL_AND(status_code = 200) AS all_success
FROM logs
{{< /code-block >}}

### `BOOL_OR`
{{< code-block lang="sql" >}}SELECT BOOL_OR(status_code = 200) AS some_success
FROM logs
{{< /code-block >}}

### `CEIL`
{{< code-block lang="sql" >}}
SELECT CEIL(price) AS rounded_price
FROM products
{{< /code-block >}}

### `FLOOR`
{{< code-block lang="sql" >}}
SELECT FLOOR(price) AS floored_price
FROM products
{{< /code-block >}}

### `ROUND`
{{< code-block lang="sql" >}}
SELECT ROUND(price) AS rounded_price
FROM products
{{< /code-block >}}

### `POWER`
{{< code-block lang="sql" >}}
SELECT POWER(response_time, 2) AS squared_response_time
FROM logs
{{< /code-block >}}

### `LOWER`
{{< code-block lang="sql" >}}
SELECT LOWER(customer_name) AS lowercase_name
FROM customers
{{< /code-block >}}

### `UPPER`
{{< code-block lang="sql" >}}
SELECT UPPER(customer_name) AS uppercase_name
FROM customers
{{< /code-block >}}

### `ABS`
{{< code-block lang="sql" >}}
SELECT ABS(balance) AS absolute_balance
FROM accounts
{{< /code-block >}}

### `COALESCE`
{{< code-block lang="sql" >}}
SELECT COALESCE(phone_number, email) AS contact_info
FROM users
{{< /code-block >}}

### `CAST`

Types cibles de conversion pris en charge :
- `BIGINT`
- `DECIMAL`
- `TIMESTAMP`
- `VARCHAR`

{{< code-block lang="sql" >}}
SELECT
  CAST(order_id AS VARCHAR) AS order_id_string,
  'Order-' || CAST(order_id AS VARCHAR) AS order_label
FROM
  orders
{{< /code-block >}}

### `LENGTH`
{{< code-block lang="sql" >}}
SELECT
  customer_name,
  LENGTH(customer_name) AS name_length
FROM
  customers
{{< /code-block >}}

### `INTERVAL`
{{< code-block lang="sql" >}}
SELECT
  TIMESTAMP '2023-10-01 10:00:00' + INTERVAL '30 days' AS future_date,
  INTERVAL '1 MILLISECOND 2 SECONDS 3 MINUTES 4 HOURS 5 DAYS'
{{< /code-block >}}

### `TRIM`
{{< code-block lang="sql" >}}
SELECT
  TRIM(name) AS trimmed_name
FROM
  users
{{< /code-block >}}

###  `REPLACE`
{{< code-block lang="sql" >}}
SELECT
  REPLACE(description, 'old', 'new') AS updated_description
FROM
  products
{{< /code-block >}}

### `SUBSTRING`
{{< code-block lang="sql" >}}
SELECT
  SUBSTRING(title, 1, 10) AS short_title
FROM
  books
{{< /code-block >}}

### `REVERSE`
{{< code-block lang="sql" >}}
SELECT
  REVERSE(username) AS reversed_username
FROM
  users
LIMIT 5
{{< /code-block >}}

### `STRPOS`
{{< code-block lang="sql" >}}
SELECT
  STRPOS('foobar', 'bar')
{{< /code-block >}}

### `SPLIT_PART`
{{< code-block lang="sql" >}}
SELECT
  SPLIT_PART('aaa-bbb-ccc', '-', 2)
{{< /code-block >}}

### `EXTRACT`

Unités d'extraction prises en charge :
| Littéral           | Type d'entrée               | Description                                  |
| ------------------| ------------------------ | -------------------------------------------- |
| `day`             | `timestamp` / `interval` | jour du mois                             |
| `dow`             | `timestamp`              | jour de la semaine `1` (lundi) to `7` (dimanche) |
| `doy`             | `timestamp`              | jour de l'année (`1` - `366`)                |
| `epoch`           | `timestamp` / `interval` | secondes depuis 1970-01-01 00:00:00 UTC (pour les timestamps), ou nombre total de secondes (pour les intervalles) |
| `hour`            | `timestamp` / `interval` | heure du jour (`0` - `23`)                 |
| `minute`          | `timestamp` / `interval` | minute de l'heure (`0` - `59`)              |
| `second`          | `timestamp` / `interval` | seconde de la minute (`0` - `59`)            |
| `week`            | `timestamp`              | semaine de l'année (`1` - `53`)                |
| `month`           | `timestamp`              | mois de l'année (`1` - `12`)               |
| `quarter`         | `timestamp`              | trimestre de l'année (`1` - `4`)              |
| `year`            | `timestamp`              | année                                         |
| `timezone_hour`   | `timestamp`              | heure du décalage de fuseau horaire                 |
| `timezone_minute` | `timestamp`              | minute du décalage de fuseau horaire               |

{{< code-block lang="sql" >}}
SELECT
  EXTRACT(year FROM purchase_date) AS purchase_year
FROM
  sales
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Obtenir l'époque Unix d'un timestamp
SELECT EXTRACT(epoch FROM TIMESTAMP '2021-01-01 00:00:00+00')
-- Renvoie : 1609459200
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Obtenir le nombre total de secondes d'un intervalle
SELECT EXTRACT(epoch FROM INTERVAL '1 day 2 hours')
-- Renvoie : 93600
{{< /code-block >}}

{{< code-block lang="sql" >}}
-- Calculer le nombre de secondes écoulées depuis chaque événement
SELECT
  event_time,
  EXTRACT(epoch FROM now()) - EXTRACT(epoch FROM event_time) AS seconds_ago
FROM
  events
{{< /code-block >}}

### `TO_TIMESTAMP`

`TO_TIMESTAMP` existe sous deux formes :

**Forme 1 : convertir une chaîne en timestamp avec un format**

Modèles pris en charge pour le formatage de date/heure :
| Modèle     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | année (4 chiffres)                      |
| `YY`        | année (2 chiffres)                      |
| `MM`        | numéro du mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)               |
| `HH24`      | heure du jour (00 - 23)                |
| `HH12`      | heure du jour (01 - 12)                |
| `HH`        | heure du jour (01 - 12)                |
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

**Forme 2 : convertir un timestamp d'époque UNIX en timestamp**

{{< code-block lang="sql" >}}
SELECT
  TO_TIMESTAMP(1735142580) AS ts_from_epoch
{{< /code-block >}}

### `TO_CHAR`

Modèles pris en charge pour le formatage de date/heure :
| Modèle     | Description                          |
| ----------- | ------------------------------------ |
| `YYYY`      | année (4 chiffres)                      |
| `YY`        | année (2 chiffres)                      |
| `MM`        | numéro du mois (01 - 12)               |
| `DD`        | jour du mois (01 - 31)               |
| `HH24`      | heure du jour (00 - 23)                |
| `HH12`      | heure du jour (01 - 12)                |
| `HH`        | heure du jour (01 - 12)                |
| `MI`        | minute (00 - 59)                     |
| `SS`        | seconde (00 - 59)                     |
| `MS`        | milliseconde (000 - 999)              |
| `TZ`        | abréviation du fuseau horaire               |
| `OF`        | décalage du fuseau horaire par rapport à UTC            |
| `AM` / `am` | indicateur méridien (sans points) |
| `PM` / `pm` | indicateur méridien (sans points) |

{{< code-block lang="sql" >}}
SELECT
  TO_CHAR(order_date, 'MM-DD-YYYY') AS formatted_date
FROM
  orders
{{< /code-block >}}

### `DATE_BIN`
{{< code-block lang="sql" >}}
SELECT DATE_BIN('15 minutes', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Renvoie 2025-09-15 12:30:00

SELECT DATE_BIN('1 jour', TIMESTAMP '2025-09-15 12:34:56', TIMESTAMP '2025-01-01')
-- Renvoie 2025-09-15 00:00:00
{{< /code-block >}}

### `DATE_TRUNC`

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

### `CURRENT_SETTING`

Paramètres pris en charge :
- `dd.time_frame_start` : renvoie le début de la plage temporelle sélectionnée au format RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).
- `dd.time_frame_end` : renvoie la fin de la plage temporelle sélectionnée au format RFC 3339 (`YYYY-MM-DD HH:mm:ss.sss±HH:mm`).

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

### `NOW`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  sales
WHERE
  purchase_date > NOW() - INTERVAL '1 hour'
{{< /code-block >}}

### `APPROX_PERCENTILE`
{{< code-block lang="sql" >}}
-- Calculer le temps de réponse médian (50e percentile)
SELECT
  APPROX_PERCENTILE(0.5) WITHIN GROUP (ORDER BY response_time) AS median_response_time
FROM
  logs

-- Calculer les percentiles de temps de réponse au 95e et 99e par service
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

## Expressions régulières

### Version

Toutes les fonctions d'expression régulière (regex) utilisent la version International Components for Unicode (ICU) :

- [Métacaractères][5]
- [Opérateurs][6]
- [Expressions d'ensemble (classes de caractères)][7]
- [Options d'indicateurs pour les indicateurs dans les modèles][8]. Consultez la section [indicateurs ci-dessous](#indicateurs-au-niveau-de-la-fonction) pour les indicateurs au niveau de la fonction.
- [Recherche et remplacement (avec des groupes de capture)][9]

### Fonctions

| Fonction                                                                                                         | Type renvoyé      | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REGEXP_LIKE(string input, string pattern)`                                                                      | Booléen          | Évalue si une chaîne correspond à un modèle d'expression régulière.                                                                                                                                                                                                           |
| `REGEXP_MATCH(string input, string pattern [, string flags ])`                                                   | tableau de chaînes | Renvoie les sous-chaînes de la première correspondance du modèle dans la chaîne. <br><br> Cette fonction recherche dans la chaîne d'entrée à l'aide du modèle donné et renvoie les sous-chaînes capturées (groupes de capture) de la première correspondance. Si aucun groupe de capture n'est présent, renvoie la correspondance complète. |
| `REGEXP_REPLACE(string input, string pattern, string replacement [, string flags ])`                             | chaîne           | Remplace la sous-chaîne correspondant à la première occurrence du modèle, ou toutes les occurrences si l'[indicateur `g` facultatif](#indicateurs-au-niveau-de-la-fonction) est utilisé.                                                                                                                              |
| `REGEXP_REPLACE (string input, string pattern, string replacement, integer start, integer N [, string flags ] )` | chaîne           | Remplace la sous-chaîne correspondant à la Nième occurrence du modèle, ou toutes les occurrences si `N` vaut zéro, en commençant à partir de `start`.                                                                                                                                                    |

{{% collapse-content title="Examples" level="h3" %}}

### `REGEXP_LIKE`
{{< code-block lang="sql" >}}
SELECT
  *
FROM
  emails
WHERE
  REGEXP_LIKE(email_address, '@example\.com$')
{{< /code-block >}}

### `REGEXP_MATCH`
{{< code-block lang="sql" >}}
SELECT regexp_match('foobarbequebaz', '(bar)(beque)');
-- {bar,beque}

SELECT regexp_match('foobarbequebaz', 'barbeque');
-- {barbeque}

SELECT regexp_match('abc123xyz', '([a-z]+)(\d+)(x(.)z)');
-- {abc,123,xyz,y}
{{< /code-block >}}

### `REGEXP_REPLACE`
{{< code-block lang="sql" >}}
SELECT regexp_replace('Auth success token=abc123XYZ789', 'token=\w+', 'token=***');
-- Auth success token=***

SELECT regexp_replace('status=200 method=GET', 'status=(\d+) method=(\w+)', '$2: $1');
-- GET: 200

SELECT regexp_replace('INFO INFO INFO', 'INFO', 'DEBUG', 1, 2);
-- INFO DEBUG INFO
{{< /code-block >}}

{{% /collapse-content %}}

### Indicateurs au niveau de la fonction

Les indicateurs suivants peuvent être utilisés avec les [fonctions d'expression régulière](#expressions-régulières) :

`i`
: Correspondance insensible à la casse

`n` or `m`
: Correspondance sensible aux sauts de ligne

`g`
: Global ; remplacer _toutes_ les sous-chaînes correspondantes plutôt que la première uniquement

{{% collapse-content title="Examples" level="h3" %}}

### Indicateur `i`

{{< code-block lang="sql" >}}
SELECT regexp_match('INFO', 'info')
-- NULL

SELECT regexp_match('INFO', 'info', 'i')
-- ['INFO']
{{< /code-block >}}

### Indicateur `n`

{{< code-block lang="sql" >}}
SELECT regexp_match('a
b', '^b') ;
-- NULL

SELECT regexp_match('a
b', '^b', 'n') ;
-- ['b']
{{< /code-block >}}

### Indicateur `g`

{{< code-block lang="sql" >}}
SELECT icu_regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX');
-- Request id=XXX completed, id=67890 pending

SELECT regexp_replace('Request id=12345 completed, id=67890 pending', 'id=\d+', 'id=XXX', 'g');
-- Request id=XXX completed, id=XXX pending
{{< /code-block >}}

{{% /collapse-content %}}

## Fonctions de fenêtrage

Ce tableau présente un aperçu des fonctions de fenêtrage prises en charge. Pour des informations détaillées et des exemples, consultez la [documentation PostgreSQL][2].

| Fonction                | Type renvoyé       | Description                                                            |
|-------------------------|-------------------|------------------------------------------------------------------------|
| `OVER`                  | S. O.               | Définit une fenêtre pour un ensemble de lignes sur lesquelles d'autres fonctions de fenêtrage opèrent. |
| `PARTITION BY`          | S. O.               | Divise le jeu de résultats en partitions, spécifiquement pour l'application des fonctions de fenêtrage. |
| `RANK()`                | nombre entier           | Attribue un rang à chaque ligne dans une partition, avec des écarts pour les ex-aequo.     |
| `ROW_NUMBER()`          | nombre entier           | Attribue un numéro séquentiel unique à chaque ligne dans une partition.     |
| `LEAD(column n)`        | typeof column     | Renvoie la valeur de la ligne suivante dans la partition.                  |
| `LAG(column n)`         | typeof column     | Renvoie la valeur de la ligne précédente dans la partition.              |
| `FIRST_VALUE(column n)` | typeof column     | Renvoie la première valeur d'un ensemble de valeurs ordonné.                   |
| `LAST_VALUE(column n)`  | typeof column     | Renvoie la valeur à l'offset spécifié dans un ensemble de valeurs ordonné.                    |
| `NTH_VALUE(column n, offset)`| typeof column | Renvoie la valeur à l'offset spécifié dans un ensemble de valeurs ordonné. |


## Fonctions et opérateurs JSON

| Name                                          | Type renvoyé  | Description                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| json_extract_path_text(text json, text path...) | texte         | Extrait un sous-objet JSON sous forme de texte, défini par le chemin. Son comportement est équivalent à la [fonction Postgres du même nom][3]. Par exemple, `json_extract_path_text(col, 'forest')` renvoie la valeur de la clé `forest` pour chaque objet JSON dans `col`. Consultez l'exemple ci-dessous pour la syntaxe des tableaux JSON. |
| json_extract_path(text json, text path...)      | JSON         | Même fonctionnalité que `json_extract_path_text`, mais renvoie une colonne de type JSON au lieu du type texte.                                                                                                                                                                                                        |
| json_array_elements(text json)                | lignes de JSON | Développe un tableau JSON en un ensemble de lignes. Cette forme est uniquement autorisée dans une clause FROM.                                                                                                                                                                                                                           |
| json_array_elements_text(text json)           | lignes de texte | Développe un tableau JSON en un ensemble de lignes. Cette forme est uniquement autorisée dans une clause FROM.                                                                                                                                                                                                                           |

## Fonctions de table
Les fonctions de table permettent d'interroger les logs, les métriques et d'autres sources de données non structurées.

<table style="width: 100%; table-layout: fixed;">
  <thead>
    <tr>
      <th style="width: 33%;">Function</th>
      <th style="width: 33%;">Description</th>
      <th style="width: 33%;">Example</th>
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
      <td>Renvoie les données de log sous forme de table. Le paramètre columns spécifie les champs de log à extraire. Les champs imbriqués sont accessibles avec la notation par points, et les champs non principaux doivent être précédés de <code>@</code>. La clause AS définit le schéma de la table renvoyée. Facultatif : filtrage par index ou plage temporelle. Lorsque la plage temporelle n'est pas spécifiée, DDSQL utilise par défaut le paramètre de plage temporelle global, qui dans DDSQL Editor correspond à la dernière heure. Facultatif : spécification du stockage à utiliser (par exemple, <code>hot</code>, <code>flex_tier</code>). Lorsqu'il n'est pas spécifié, le stockage chaud est utilisé par défaut.</td>
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
      <td>Renvoie les données de métrique sous forme de valeur scalaire. La fonction accepte une requête de métriques (avec regroupement facultatif), un reducer pour déterminer la méthode d'agrégation des valeurs (avg, max, etc.) et des paramètres de timestamp facultatifs (1 heure par défaut) pour définir la plage temporelle.</td>
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
      <td>Renvoie les données de métrique sous forme de série temporelle. La fonction accepte une requête de métriques (avec regroupement facultatif) et des paramètres de timestamp facultatifs (1 heure par défaut) pour définir la plage temporelle. Renvoie des points de données dans le temps plutôt qu'une valeur agrégée unique.</td>
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
  </tbody>
</table>

{{% collapse-content title="Examples" level="h3" %}}

### Timestamps absolus

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

### Timestamps relatifs

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

### Paramètres facultatifs

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

### Accès aux champs imbriqués

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

## Tags

DDSQL expose les tags sous forme de type `hstore`, inspiré de PostgreSQL. Vous pouvez accéder aux valeurs de clés de tags spécifiques à l'aide de l'opérateur flèche de PostgreSQL. Par exemple :

```sql
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
```

Les tags sont des paires clé-valeur où chaque clé peut avoir zéro, une ou plusieurs valeurs de tag correspondantes. Lors de l'accès, la valeur du tag renvoie une chaîne unique contenant _toutes_ les valeurs correspondantes. Lorsque les données comportent plusieurs valeurs de tag pour la même clé de tag, elles sont représentées sous forme de chaîne triée et séparée par des virgules. Par exemple :

```sql
SELECT tags->'team', instance_type, architecture, COUNT(*) as instance_count
FROM aws.ec2_instance
WHERE tags->'team' = 'compute_provisioning,database_ops'
GROUP BY tags->'team', instance_type, architecture
ORDER BY instance_count DESC
```

Vous pouvez également comparer des valeurs de tags sous forme de chaînes ou des ensembles de tags entiers :

```sql
SELECT *
FROM k8s.daemonsets da INNER JOIN k8s.deployments de
ON da.tags = de.tags -- for a specific tag: da.tags->'app' = de.tags->'app'
```

De plus, vous pouvez extraire les clés et les valeurs des tags dans des tableaux de texte individuels :

```sql
SELECT akeys(tags), avals(tags)
FROM aws.ec2_instance
```

### Fonctions et opérateurs HSTORE

| Name                                          | Type renvoyé   | Description                                                                                      |
|-----------------------------------------------|---------------|---------------------------------------------------------------------------------------------------
| tags -> 'text'                                  | Texte          | Obtient la valeur pour une clé donnée. Renvoie `null` si la clé est absente.                             |
| akeys(hstore tags)                            | Tableau de texte | Obtient les clés d'un HSTORE sous forme de tableau                                                            |
| avals(hstore tags)                            | Tableau de texte | Obtient les valeurs d'un HSTORE sous forme de tableau                                                          |

## Pour aller plus loin

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