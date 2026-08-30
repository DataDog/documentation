---
description: Guide de référence des fonctions et opérateurs disponibles dans les colonnes
  calculées et les formules de feuille de calcul Sheets, incluant les opérations textuelles,
  de date, logiques, mathématiques, de recherche, statistiques et financières.
title: Fonctions et opérateurs
---
## Présentation {#overview}

Utilisez des fonctions et des opérateurs dans Sheets pour analyser et transformer vos données. Les fonctions sont disponibles dans deux contextes :

- **Colonnes calculées de tableau**: Fonctions qui transforment ou enrichissent les valeurs de lignes individuelles dans un tableau, appliquées au niveau de la colonne.
- **Sheets**: Fonctions saisies directement dans un onglet [Sheet][1], vous permettant de référencer d'autres onglets Sheet ou Table (le cas échéant).

## Opérateurs {#operators}

| Opérateur | Nom                  | Exemple |
| -------  | --------------------- | ------- |
| `+`      | Addition              | `=A1+B1` |
| `-`      | Soustraction           | `=A1-B1` |
| `*`      | Multiplication        | `=A1*B1` |
| `/`      | Division              | `=A1/B1` |
| `^`      | Puissance                 | `=2^10` |
| `&`      | Concaténation           | `="Hello "&A1` |
| `=`      | Égal à                 | `=A1=B1` |
| `<>`     | Différent de             | `=A1<>0` |
| `>`      | Supérieur à          | `=A1>100` |
| `<`      | Inférieur à             | `=A1<100` |
| `>=`     | Supérieur ou égal à | `=A1>=100` |
| `<=`     | Inférieur ou égal à    | `=A1<=100` |

## Fonctions {#functions}

### Texte {#text}

`REGEXMATCH(text_string, regular_expression)`
: Évalue si une chaîne de texte correspond à une expression régulière. <br>**Exemple**: `REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE` <br>**Disponible dans**: Table, Sheet

`REGEXEXTRACT(text_string, regular_expression)`
: Extrait la première sous-chaîne qui correspond à un modèle d'expression régulière spécifié. <br>**Exemple**: `REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"` <br>**Disponible dans**: Table, Sheet

`REGEXCOUNT(text_string, regular_expression)`
: Compte le nombre de fois qu'un modèle d'expression régulière apparaît dans une chaîne de texte. <br>**Exemple**: `REGEXCOUNT("abc 123 def", "\\\\d+") => 1` <br>**Disponible dans**: Table, Sheet

`REGEXREPLACE(text_string, regular_expression, replacement)`
: Remplace toutes les sous-chaînes correspondant à une expression régulière par une chaîne de remplacement. <br>**Exemple**: `REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"` <br>**Disponible dans**: Table

`LEN(string)`
: Renvoie la longueur d'une chaîne. <br>**Exemple**: `LEN("Hello World")` <br>**Disponible dans**: Table, Sheet

`LOWER(string)`
: Renvoie la chaîne en minuscules. <br>**Exemple**: `LOWER("HELLO WORLD")` <br>**Disponible dans**: Table, Sheet

`UPPER(string)`
: Renvoie la chaîne en majuscules. <br>**Exemple**: `UPPER("hello world")` <br>**Disponible dans**: Table, Sheet

`LEFT(string, number_of_characters)`
: Renvoie une sous-chaîne à partir du début d'une chaîne spécifiée. <br>**Exemple**: `LEFT("Datadog", 4)` <br>**Disponible dans**: Table, Sheet

`RIGHT(string, number_of_characters)`
: Renvoie une sous-chaîne à partir de la fin d'une chaîne spécifiée. <br>**Exemple**: `RIGHT("DATADOG", 3)` <br>**Disponible dans**: Table, Sheet

`MID(text, start, length)`
: Renvoie des caractères extraits du milieu d'un texte. <br>**Exemple**: `MID("Hello World", 7, 5) => "World"` <br>**Disponible dans**: Sheet

`CONCATENATE(string1, string2, ...)`
: Ajoute des chaînes les unes aux autres. Équivalent à l'opérateur `&`. <br>**Exemple**: `CONCATENATE("data", "dog")` <br>**Disponible dans**: Table, Sheet

`CONTAINS(string, substring)`
: Renvoie VRAI si la chaîne contient la sous-chaîne, FAUX sinon. <br>**Exemple**: `CONTAINS("is the word string in this sentence?", "string")` <br>**Disponible dans**: Table, Sheet

`SUBSTITUTE(text, old_text, new_text, [instance_num])`
: Remplace les occurrences de old_text par new_text. Si instance_num est omis, toutes les occurrences sont remplacées ; sinon, seule l'instance spécifiée est remplacée. <br>**Exemple**: `SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"` <br>**Disponible dans**: Table, Sheet

`TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])`
: Combine le texte de plusieurs chaînes avec le délimiteur spécifié. <br>**Exemple**: `TEXTJOIN(" ", TRUE, "hello", "world")` <br>**Disponible dans**: Table, Sheet

`FIND(search_for, text_to_search)`
: Trouve la position d'un texte dans un autre (sensible à la casse). Renvoie une erreur si le texte n'est pas trouvé. <br>**Exemple**: `FIND("World", "Hello World") => 7` <br>**Disponible dans**: Sheet

`CHAR(number)`
: Convertit un nombre en caractère selon le jeu de caractères Unicode. <br>**Exemple**: `CHAR(65) => "A"` <br>**Disponible dans**: Sheet

`CLEAN(text)`
: Supprime les caractères non imprimables du texte. <br>**Exemple**: `CLEAN(A1)` <br>**Disponible dans**: Sheet

`TEXT(number, format)`
: Formate un nombre sous forme de texte en utilisant un modèle de format. Prend en charge le formatage des nombres, des dates et des heures. <br>**Exemple**: `TEXT(1234.5, "#,##0.00") => "1,234.50"` <br>**Disponible dans**: Sheet

`TRIM(text)`
: Supprime les espaces de début, de fin et les espaces supplémentaires du texte. <br>**Exemple**: `TRIM("  hello  ") => "hello"` <br>**Disponible dans**: Sheet

`VALUE(text)`
: Convertit du texte en nombre. <br>**Exemple**: `VALUE("123") => 123` <br>**Disponible dans**: Sheet

### Logique {#logical}

`IF(logical_expression, value_if_true, value_if_false)`
: Renvoie une valeur si une expression logique est TRUE et une autre si elle est FALSE. <br>**Exemple**: `IF(42>9, "all good", "something is wrong in the matrix")` <br>**Disponible dans**: Table, Sheet

`IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)`
: Évalue une ou plusieurs paires condition/valeur et renvoie la valeur correspondant à la première condition vraie. Utilisez TRUE comme condition finale pour définir une valeur par défaut. <br>**Exemple**: `IFS(A1>90, "A", A1>80, "B", TRUE, "C")` <br>**Disponible dans**: Table, Sheet

`AND(logical_expression1, [logical_expression2, …])`
: Renvoie TRUE si tous les arguments fournis sont logiquement TRUE, et FALSE si l'un des arguments fournis est logiquement FALSE. <br>**Exemple**: `AND(A1=1, A2=2)` <br>**Disponible dans**: Table, Sheet

`OR(logical_expression1, [logical_expression2, …])`
: Renvoie TRUE si l'un des arguments fournis est logiquement TRUE, et FALSE si tous les arguments fournis sont logiquement FALSE. <br>**Exemple**: `OR(A1=1, A2=2)` <br>**Disponible dans**: Table, Sheet

`NOT(logical_expression)`
: Renvoie l'opposé d'une valeur logique. <br>**Exemple**: `NOT(TRUE)` <br>**Disponible dans**: Table, Sheet

`TRUE()`
: Renvoie la valeur logique TRUE. <br>**Exemple**: `TRUE()` <br>**Disponible dans**: Table, Sheet

`FALSE()`
: Renvoie la valeur logique FAUX. <br>**Exemple**: `FALSE()` <br>**Disponible dans**: Table, Sheet

`IFERROR(value, value_if_error)`
: Renvoie une valeur spécifiée si une formule renvoie une erreur ; sinon, renvoie le résultat de la formule. <br>**Exemple**: `IFERROR(1/0, "Division Error")` <br>**Disponible dans**: Sheet

`IFNA(value, value_if_na)`
: Renvoie une valeur spécifiée si une formule renvoie #N/A ; sinon, renvoie le résultat de la formule. <br>**Exemple**: `IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")` <br>**Disponible dans**: Sheet

`SWITCH(expression, case1, value1, ..., [default])`
: Compare une expression à des cas et renvoie la valeur correspondante. <br>**Exemple**: `SWITCH(A1, 1, "One", 2, "Two", "Other")` <br>**Disponible dans**: Sheet

`XOR(logical_expression1, [logical_expression2, …])`
: Renvoie VRAI si un nombre impair d'arguments est VRAI. <br>**Exemple**: `XOR(TRUE, FALSE)` <br>**Disponible dans**: Sheet

### Mathématiques {#math}

`ABS(number)`
: Renvoie la valeur absolue d'un nombre. <br>**Exemple**: `ABS(26.34)` <br>**Disponible dans**: Table, Sheet

`CEILING(number, factor)`
: Arrondit un nombre vers le haut jusqu'au multiple entier le plus proche du facteur spécifié. <br>**Exemple** : `CEILING(826.645, 10)` <br>**Disponible dans** : Table, Sheet

`FLOOR(number, factor)`
: Arrondit un nombre vers le bas jusqu'au multiple entier le plus proche du facteur spécifié. <br>**Exemple** : `FLOOR(826.645, 10)` <br>**Disponible dans** : Table, Sheet

`MOD(number1, number2)`
: Renvoie le résultat de l'opérateur modulo, le reste après une opération de division. <br>**Exemple** : `MOD(5, 2)` <br>**Disponible dans** : Table, Sheet

`POWER(number, power)`
: Renvoie un nombre élevé à une puissance. <br>**Exemple** : `POWER(2, 3)` <br>**Disponible dans** : Table, Sheet

`ROUND(number, places)`
: Arrondit un nombre à un certain nombre de décimales. <br>**Exemple** : `ROUND(826.645, 1)` <br>**Disponible dans** : Table, Sheet

`COUNT(value1, [value2, ...])`
: Compte le nombre de valeurs numériques dans une plage. <br>**Exemple** : `COUNT(A1:A10)` <br>**Disponible dans** : Sheet

`COUNTA(value1, [value2, ...])`
: Compte le nombre de valeurs non vides dans une plage. <br>**Exemple** : `COUNTA('Logs'#"service")` <br>**Disponible dans** : Sheet

`COUNTBLANK(range)`
: Compte le nombre de cellules vides dans une plage. <br>**Exemple** : `COUNTBLANK(A1:A10)` <br>**Disponible dans** : Sheet

`COUNTIF(range, criteria)`
: Compte le nombre de cellules dans une plage qui répondent à un critère spécifié. <br>**Exemple** : `COUNTIF('Logs'#"status", "error")` <br>**Disponible dans** : Sheet

`COUNTIFS(range1, criteria1, [range2, criteria2, ...])`
: Compte le nombre de cellules dans une plage qui répondent à plusieurs critères. <br>**Exemple** : `COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")` <br>**Disponible dans** : Sheet

`COUNTUNIQUE(value1, [value2, ...])`
: Compte le nombre de valeurs uniques dans une plage. <br>**Exemple** : `COUNTUNIQUE('Logs'#"service")` <br>**Disponible dans** : Sheet

`MAX(value1, [value2, ...])`
: Renvoie le plus grand nombre d'un ensemble de valeurs. <br>**Exemple** : `MAX('APM'#"duration")` <br>**Disponible dans** : Sheet

`MAXIFS(max_range, range1, criteria1, ...)`
: Renvoie la valeur maximale dans une plage qui répond à plusieurs critères. <br>**Exemple** : `MAXIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Disponible dans** : Sheet

`MIN(value1, [value2, ...])`
: Renvoie le plus petit nombre d'un ensemble de valeurs. <br>**Exemple** : `MIN('APM'#"duration")` <br>**Disponible dans** : Sheet

`MINIFS(min_range, range1, criteria1, ...)`
: Renvoie la valeur minimale dans une plage répondant à plusieurs critères. <br>**Exemple** : `MINIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**Disponible dans** : Sheet

`PI()`
: Renvoie la valeur de π avec une précision de 15 chiffres. <br>**Exemple** : `PI()` <br>**Disponible dans** : Sheet

`RAND()`
: Renvoie un nombre aléatoire compris entre 0 et 1. <br>**Exemple** : `RAND()` <br>**Disponible dans** : Sheet

`SQRT(number)`
: Renvoie la racine carrée positive d'un nombre. <br>**Exemple** : `SQRT(16) => 4` <br>**Disponible dans** : Sheet

`SUM(value1, [value2, ...])`
: Renvoie la somme d'une série de nombres et/ou de cellules. <br>**Exemple** : `SUM('Cloud Cost'#"cost")` <br>**Disponible dans** : Sheet

`SUMIF(range, criteria, sum_range)`
: Additionne les valeurs d'une plage répondant aux critères que vous spécifiez. <br>**Exemple** : `SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")` <br>**Disponible dans** : Sheet

`SUMIFS(sum_range, range1, criteria1, ...)`
: Additionne les valeurs d'une plage répondant à plusieurs critères. <br>**Exemple** : `SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")` <br>**Disponible dans** : Sheet

### Date et heure {#date-and-time}

`DATE(year, month, day)`
: Convertit une année, un mois et un jour donnés en une date. <br>**Exemple** : `DATE(2021, 10, 31)` <br>**Disponible dans** : Table, Sheet

`DATEDIF(start_date, end_date, unit)`
: Calcule le nombre de jours, de mois ou d'années entre deux dates. <br>**Exemple** : `DATEDIF("10/17/1979", "8/22/2019", "Y") => 39` <br>**Disponible dans** : Table, Sheet

`TODAY()`
: Renvoie la date actuelle. <br>**Exemple** : `TODAY()` <br>**Disponible dans** : Sheet

`NOW()`
: Renvoie la date et l'heure actuelles. <br>**Exemple** : `NOW()` <br>**Disponible dans** : Table, Sheet

`TIME(hour, minute, second)`
: Convertit une heure, une minute et une seconde fournies en une valeur de temps. <br>**Exemple** : `TIME(11, 40, 59)` <br>**Disponible dans** : Sheet

`YEAR(date)`
: Extrait le composant année d'une valeur de date. <br>**Exemple** : `YEAR(DATE(2025, 12, 31))` <br>**Disponible dans** : Table, Sheet

`MONTH(date)`
: Extrait le composant mois d'une valeur de date. <br>**Exemple** : `MONTH("2023-07-15")` <br>**Disponible dans** : Table, Sheet

`DAY(date)`
: Extrait le composant jour d'une valeur de date. <br>**Exemple** : `DAY(DATE(2023, 12, 25))` <br>**Disponible dans** : Table, Sheet

`HOUR(datetime)`
: Extrait le composant heure (0–23) d'une valeur de date et d'heure. <br>**Exemple** : `HOUR("14:30:45")` <br>**Disponible dans** : Table, Sheet

`MINUTE(datetime)`
: Extrait le composant minute (0–59) d'une valeur de date et d'heure. <br>**Exemple** : `MINUTE("14:30:45")` <br>**Disponible dans** : Table, Sheet

`SECOND(datetime)`
: Extrait le composant seconde (0–59) d'une valeur de date et d'heure. <br>**Exemple** : `SECOND("14:30:45")` <br>**Disponible dans** : Table, Sheet

`DATEVALUE(date_string)`
: Convertit une chaîne de date en valeur de date. <br>**Exemple** : `DATEVALUE("07/23/2024")` <br>**Disponible dans** : Table, Sheet

`EPOCHTODATE(timestamp, [unit])`
: Convertit un horodatage Unix en date. `unit` la valeur par défaut est `1` (secondes) ; utilisez `2` pour les millisecondes ou `3` pour les microsecondes. <br>**Exemple** : `EPOCHTODATE(#"Timestamp", 2)` <br>**Disponible dans** : Table, Sheet

`EDATE(start_date, months)`
: Renvoie la date correspondant au nombre de mois indiqué avant ou après une date de début. <br>**Exemple** : `EDATE("2023-01-15", 6)` <br>**Disponible dans** : Sheet

`EOMONTH(start_date, months)`
: Renvoie le dernier jour du mois correspondant à un nombre de mois spécifié avant ou après une date donnée. <br>**Exemple** : `EOMONTH(DATE(2023, 12, 12), 0)` <br>**Disponible dans** : Sheet

`WEEKDAY(date, [type])`
: Renvoie le jour de la semaine sous forme de nombre. Type 1 (par défaut) = dim.–sam. (1–7), type 2 = lun.–dim. (1–7), type 3 = lun.–dim. (0–6). <br>**Exemple** : `WEEKDAY(DATE(2023, 12, 12))` <br>**Disponible dans** : Table, Sheet

`WEEKNUM(date, [type])`
: Renvoie le numéro de la semaine d'une date donnée dans l'année. <br>**Exemple** : `WEEKNUM("2023-01-15")` <br>**Disponible dans** : Table, Sheet

### Recherche et référence {#lookup-and-reference}

`VLOOKUP(search_key, range, index, [is_sorted])`
: Recherche une valeur dans la première colonne d'une plage et renvoie une valeur située sur la même ligne dans une colonne spécifiée. <br>**Exemple** : `VLOOKUP("Apple", A1:C10, 2, FALSE)` <br>**Disponible dans** : Sheet

`HLOOKUP(search_key, range, index, [is_sorted])`
: Recherche une valeur dans la première ligne d'une plage et renvoie une valeur située dans la même colonne dans une ligne spécifiée. <br>**Exemple** : `HLOOKUP("Apple", A1:D3, 2, FALSE)` <br>**Disponible dans** : Sheet

`INDEX(reference, row, [column])`
: Renvoie la valeur d'un élément dans un tableau en fonction des numéros de ligne et de colonne. <br>**Exemple** : `INDEX(A1:D3, 2, 3)` <br>**Disponible dans** : Sheet

`MATCH(search_key, range, [search_type])`
: Renvoie la position relative d'un élément dans un tableau qui correspond à une valeur spécifiée. <br>**Exemple** : `MATCH("Apple", A1:A4, 0)` <br>**Disponible dans** : Sheet

`CHOOSE(index, value1, value2, ...)`
: Renvoie une valeur à partir d'une liste en fonction d'un index. <br>**Exemple** : `CHOOSE(2, "A", "B", "C")` <br>**Disponible dans** : Sheet

`ROW([reference])`
: Renvoie le numéro de ligne d'une référence. <br>**Exemple** : `ROW(A5) => 5` <br>**Disponible dans** : Sheet

`COLUMN([reference])`
: Renvoie le numéro de colonne d'une référence. <br>**Exemple** : `COLUMN(C1) => 3` <br>**Disponible dans** : Sheet

### Statistique {#statistical}

`AVERAGE(value1, [value2, ...])`
: Renvoie la valeur moyenne numérique dans un ensemble de données, en ignorant le texte. <br>**Exemple** : `AVERAGE('APM'#"duration")` <br>**Disponible dans** : Sheet

`AVERAGEIF(range, criteria, [average_range])`
: Renvoie la moyenne des cellules qui répondent à un critère spécifié. <br>**Exemple** : `AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")` <br>**Disponible dans** : Sheet

`AVERAGEIFS(average_range, range1, criteria1, ...)`
: Renvoie la moyenne des cellules qui répondent à plusieurs critères. <br>**Exemple** : `AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")` <br>**Disponible dans** : Sheet

`MEDIAN(value1, [value2, ...])`
: Renvoie la médiane (valeur centrale) d'un ensemble de données. Si l'ensemble de données contient un nombre pair de valeurs, renvoie la moyenne des deux valeurs centrales. <br>**Exemple** : `MEDIAN('APM'#"duration")` <br>**Disponible dans** : Sheet

`MODE(value1, [value2, ...])`
: Renvoie la valeur la plus fréquente dans un ensemble de données. <br>**Exemple** : `MODE('Logs'#"status_code")` <br>**Disponible dans** : Sheet

`PERCENTILE(data, percentile)`
: Renvoie la valeur à un percentile donné d'un ensemble de données en utilisant une interpolation linéaire. <br>**Exemple** : `PERCENTILE('APM'#"duration", 0.95)` <br>**Disponible dans** : Sheet

`STDEV(value1, [value2, ...])`
: Calcule l'écart-type d'un échantillon de données. <br>**Exemple** : `STDEV('APM'#"duration")` <br>**Disponible dans** : Sheet

`VAR(value1, [value2, ...])`
: Calcule la variance d'un échantillon de données. <br>**Exemple** : `VAR('APM'#"duration")` <br>**Disponible dans** : Sheet

`FORECAST(x, data_y, data_x)`
: Prédit une valeur future à l'aide de valeurs existantes et de la régression linéaire. <br>**Exemple** : `FORECAST(5, {1,2,3,4}, {10,20,30,40})` <br>**Disponible dans** : Sheet

`SUMPRODUCT(array1, [array2, ...])`
: Multiplie les éléments correspondants dans des tableaux et renvoie la somme de ces produits. <br>**Exemple** : `SUMPRODUCT({1,2,3}, {4,5,6}) => 32` <br>**Disponible dans** : Sheet

### Financier {#financial}

`PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])`
: Calcule le paiement d'un prêt sur la base de paiements constants et d'un taux d'intérêt constant. <br>**Exemple** : `PMT(0.05/12, 60, 20000)` <br>**Disponible dans** : Sheet

`PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])`
 : Calcule la valeur actuelle d'un investissement. <br>**Exemple** : `PV(0.05/12, 60, -377.42)` <br>**Disponible dans** : Sheet

`FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])`
 : Calcule la valeur future d'un investissement sur la base de paiements périodiques constants et d'un taux d'intérêt constant. <br>**Exemple** : `FV(0.06/12, 240, -500)` <br>**Disponible dans** : Sheet

`NPV(discount, cashflow1, [cashflow2, ...])`
 : Calcule la valeur actuelle nette d'un investissement sur la base d'un taux d'actualisation et d'une série de flux de trésorerie futurs. <br>**Exemple** : `NPV(0.10, -50000, 8000, 9200, 10400)` <br>**Disponible dans** : Sheet

`IRR(cashflow_amounts, [rate_guess])`
 : Calcule le taux de rendement interne d'une série de flux de trésorerie. <br>**Exemple** : `IRR({-50000, 8000, 9200, 10400, 11600, 12800})` <br>**Disponible dans** : Sheet

`NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])`
 : Calcule le nombre de périodes pour un investissement ou un prêt. <br>**Exemple** : `NPER(0.05/12, -377.42, 20000)` <br>**Disponible dans** : Sheet

`RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])`
 : Calcule le taux d'intérêt par période d'une annuité. <br>**Exemple** : `RATE(48, -200, 8000)` <br>**Disponible dans** : Sheet

`RRI(number_of_periods, present_value, future_value)`
 : Calcule le taux d'intérêt équivalent pour la croissance d'un investissement. <br>**Exemple** : `RRI(10, 100, 200)` <br>**Disponible dans** : Sheet

### Info {#info}

`ISBLANK(value)`
 : Vérifie si une cellule est vide. <br>**Exemple** : `ISBLANK(A1)` <br>**Disponible dans** : Sheet

`ISNUMBER(value)`
 : Vérifie si une valeur est un nombre. <br>**Exemple** : `ISNUMBER(123)` <br>**Disponible dans** : Sheet

`TYPE(value)`
 : Renvoie le type de données d'une valeur sous forme de nombre (1 = nombre, 2 = texte, 4 = logique, 16 = erreur). <br>**Exemple** : `TYPE(123) => 1` <br>**Disponible dans** : Sheet

[1]: /fr/sheets/#sheet-preview