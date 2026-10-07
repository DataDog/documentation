---
aliases:
- /fr/dashboards/ddsql_editor/reference/data_types/
- /fr/ddsql_editor/reference/data_types/
private: true
title: DDSQL Editor - Types de données (aperçu)
---

## Types de données

DDSQL implémente une version simplifiée du système de types SQL, principalement inspirée de PostgreSQL.

### Types de base

| Nom SQL   | Alias                  | Rôle |
|------------|--------------------------|-------------|
| nombre entier    | nombre entier                      | Le stockage est toujours int64. |
| texte       | char, varchar, string    | Le stockage est toujours en UTF-8 de longueur illimitée. |
| real       | double, decimal          | Le stockage est toujours IEEE-754 float64. |
| timestamp  | timestamp without time zone | Type datetime standard SQL. |
| date       |                          | Timestamp avec une résolution au niveau du jour. |
| interval   |                          | Durée temporelle. |
| groupe      | hstore, tag_column       | Ensemble trié de chaînes avec une sémantique de tags de type « = est contient ». |
| booléen    |                          | `TRUE` ou `FALSE` |
| json       |                          | Données JSON |

### Tableaux
Les tableaux sont une collection ordonnée d'un type de base spécifique. Chaque type de base peut avoir un type de tableau correspondant. 

### Littéraux

Le tableau ci-dessous contient des exemples de déclaration de littéraux pour chaque type, à utiliser dans des expressions telles que `SELECT <LITERAL>` ou dans des comparaisons telles que `WHERE timestamp > timestamp '1 hr ago'`.

| Nom       | Exemple |
|------------|---------|
| nombre entier    | `1`, `4`, `23901239412`, `0x4B1D` |
| texte       | `'Hello, world'` |
| real       | `1.0`, `1e30`, `314e-2`, `.25`, `5.` |
| date       | `date <DATE_STRING>` (où `DATE_STRING` est une chaîne pouvant être analysée comme une date, ou une chaîne relative telle que `1 day ago`') |
| timestamp  | `timestamp <TIMESTAMP_STRING>` (où `TIMESTAMP_STRING` est une chaîne pouvant être analysée comme un timestamp, ou une chaîne relative telle que `'1 day ago'`, `'now'`) |
| interval  | `interval <INTERVAL>` (où `INTERVAL` est une chaîne pouvant être analysée comme un intervalle, telle que `1 day`, `30s`, `2 min`') |
| arrays    | `array<type>[values...]` |