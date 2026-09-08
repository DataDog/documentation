---
aliases:
- /fr/logs/explorer/calculated_fields/expression_language
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: Documentation
  text: Champs calculés
title: Formules
---
## Présentation {#overview}

La formule (ou expression) définit la valeur du champ calculé pour chaque événement de log. Vous pouvez référencer des attributs de log, d'autres champs calculés, ainsi que des fonctions et opérateurs pris en charge. Lorsque vous rédigez ou modifiez une formule, l'éditeur suggère automatiquement les champs, fonctions et opérateurs pertinents.

## Syntaxe de base et constructions linguistiques {#basic-syntax-and-language-constructs}

| Construction                                                                 | Syntaxe et notation                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| Attribut ou tag réservé nommé `tag`                                     | `tag` (aucun préfixe requis)<br>Pour les tags contenant des tirets, échappez-les avec une barre oblique inverse.<br>Exemple : `ci\-job\-id`                    |
| Attribut nommé `attr`                                                    | `@attr` (utilisez un préfixe `@`)                                                                                                          |
| Champ calculé nommé `field`                                            | `#field` (utilisez un préfixe `#`)                                                                                                          |
| Littéral de chaîne (guillemet)<br>Par exemple, `text` ou `Quoted "text"`.         | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">La syntaxe de recherche de Log</a> s'applique)|
| Littéral numérique (nombre)<br>Par exemple, `ten`.                           | `10`                                                                                                                                 |
| Fonction nommée `func` avec les paramètres `x` et `y`                         | `func(x, y)`                                                                                                                         |
| Opérateur<br>Par exemple, un opérateur binaire `*` avec les opérandes `x` et `y`. | `x*y`                                                                                                                                |

## Opérateurs {#operators}

Les opérateurs disponibles par ordre de préséance :

| Opérateur | Description |
|----------|-------------|
| `()` | Un regroupement ou un appel de fonction |
| `!`, `NOT`, `-` | Une négation logique ou arithmétique |
| `^`, `%` | Exponentiation, modulo|
| `*`, `/` | Multiplication, division|
| `+`, `-` | Addition, soustraction |
| `<`, `<=`, `>`, `>=` | Inférieur à, inférieur ou égal à, supérieur à, supérieur ou égal à |
| `==`, `!=` | Correspond, ne correspond pas |
| `&&`, `AND` | ET logique |
| `\|\|`, `OR` | OU logique |

## Fonctions {#functions}

Les fonctions disponibles sont classées comme suit :
- [Arithmétique](#arithmetic)
- [Chaîne](#string)
- [Logique](#logical)


### Arithmétique {#arithmetic}

<h4>abs(<i>valeur</i> numérique)</h4>

Renvoie la valeur absolue d'un nombre.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède les attributs suivants : <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

{{% /collapse-content %}}


<h4>ceil(<i>valeur</i> numérique)</h4>

Arrondit le nombre à l'entier supérieur le plus proche.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant : <br>`@value` = 2,2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

{{% /collapse-content %}}


<h4>floor(<i>valeur</i> numérique)</h4>

Arrondit un nombre à l'entier inférieur le plus proche.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@value` = 9,99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

{{% /collapse-content %}}


<h4>max(<i>valeur</i> numérique, [ <i>valeur</i> numérique, …])</h4>

Trouve la valeur maximale parmi un ensemble de nombres.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

{{% /collapse-content %}}


<h4>min(<i>valeur</i> numérique, [<i>valeur</i> numérique, …])</h4>

Trouve la valeur minimale parmi un ensemble de nombres.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

{{% /collapse-content %}}


<h4>round(<i>valeur</i> numérique, <i>int</i> precision)</h4>

Arrondit un nombre. Définissez éventuellement le nombre de décimales à conserver.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@value` = -1234,01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

{{% /collapse-content %}}

---

### Chaîne {#string}

<h4>concat(<i>str</i> string [<i>str</i> string, <i>expr</i> valeur, …])</h4>

Combine plusieurs valeurs en une seule chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède les attributs suivants : <br> - `@city` = « Paris » <br> - `@country` = « France » | `#region = concat(@city, ", ", @country)` | `#region` = « Paris, France » |

{{% /collapse-content %}}


<h4>lower(<i>str</i> string)</h4>

Convertit une chaîne en minuscules.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@first_name` = « Bob » | `#lower_name = lower(@first_name)` | `#lower_name` = « bob » |

{{% /collapse-content %}}


<h4>left(<i>str</i> string, <i>int</i> nb_caractères)</h4>

Extrait une partie du texte depuis le début d'une chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

{{% /collapse-content %}}


<h4>proper(<i>str</i> chaîne)</h4>

Convertit la chaîne en casse appropriée.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant :<br>`@address` = « 123 main st » | `#formatted_address = proper(@address)` | `#formatted_address` = « 123 Main St » |

{{% /collapse-content %}}


<h4>split_before(<i>str</i> chaîne, <i>str</i> séparateur, <i>int</i> occurrence)</h4>

Extrait la partie du texte précédant un certain motif dans une chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

<table>
  <tr>
    <th>Exemple</th>
    <th>Formule</th>
    <th>Résultat</th>
  </tr>
  <tr>
    <td rowspan ="2">Un événement de log possède l'attribut suivant :<br><code>@url</code> = \"www.example.com/path/to/split\"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = \"www.example.com/path\"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = \"www.example.com/path/to\"</td>
  </tr>
</table>

{{% /collapse-content %}}


<h4>split_after(<i>str</i> chaîne, <i>str</i> séparateur, <i>int</i> occurrence)</h4>

Extrait la partie du texte suivant un certain motif dans une chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

<table>
  <tr>
    <th>Exemple</th>
    <th>Formule</th>
    <th>Résultat</th>
  </tr>
  <tr>
    <td rowspan ="2">Un événement de log possède l'attribut suivant :<br><code>@url</code> = \"www.example.com/path/to/split\"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = \"path/to/split\"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = \"to/split\"
</table>

{{% /collapse-content %}}


<h4>substring(<i>str</i> chaîne, <i>int</i> début, <i>int</i> longueur)</h4>

Extrait une partie de texte du milieu d'une chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant : <br>`@price` = « USD10.50 » | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = « 10 » |

{{% /collapse-content %}}


<h4>right(<i>str</i> chaîne, <i>int</i> nb_caractères)</h4>

Extrait une partie de texte de la fin d'une chaîne.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant : <br>`@price` = « USD10.50 » | `#cent_value = right(@price, 2)` | `#cent_value` = « 50 » |

{{% /collapse-content %}}


<h4>textjoin(<i>str</i> délimiteur, <i>bool</i> ignorer_vide, <i>str</i> chaîne [<i>str</i> chaîne, <i>expr</i> valeur, …])</h4>

Combine plusieurs valeurs en une seule chaîne avec un délimiteur entre elles.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède les attributs suivants : <br> - `@city` = « Paris » <br> - `@country` = « France » | `#region = textjoin(", ", "false", @city, @country)` | `#region` = « Paris, France » |

{{% /collapse-content %}}


<h4>upper(<i>str</i> chaîne)</h4>

Convertit la chaîne de caractères en majuscules.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède l'attribut suivant : `@first_name` = \"Bob\" | `#upper_name = upper(@first_name)` | `#upper_name` = \"BOB\" |

{{% /collapse-content %}}

---

### Logique {#logical}

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

Évalue une condition et renvoie une valeur en conséquence.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède les attributs suivants : <br> - `@location` = \"Paris, France\" <br> - `@home` = \"New York, USA\" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = \"true\" |

{{% /collapse-content %}}


<h4>is_null(<i>expr</i> value)</h4>

Vérifie si un attribut ou une expression est nul.

{{% collapse-content title="Exemple" level="h5" expanded=false %}}

| Exemple  | Formule | Résultat |
|----------|-------------|---------|
| Un événement de log possède les attributs suivants : <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | \"true\" |

{{% /collapse-content %}}


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}