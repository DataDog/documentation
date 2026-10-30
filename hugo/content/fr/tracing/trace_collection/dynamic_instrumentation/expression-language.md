---
aliases:
- /fr/dynamic_instrumentation/expression-language
- /fr/tracing/dynamic_instrumentation/expression-language
private: false
title: Expression Language pour Live Debugger et Dynamic Instrumentation
---
## Présentation {#overview}

[Live Debugger][1] et [Dynamic Instrumentation][2] utilisent ce langage d'expression pour lire des valeurs dans le code en cours d'exécution et définir des conditions, des métriques et des tags de span. Le langage d'expression prend en charge l'accès aux variables locales, aux paramètres de méthode et aux champs d'objets imbriqués, ainsi qu'aux opérateurs de comparaison et logiques. Il emprunte sa syntaxe aux langages de programmation courants mais possède ses propres règles.

Exemples :
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

La prise en charge des expressions dépend de la version du runtime et de l'emplacement de l'instrumentation. En général, Expression Language prend en charge :
* L'accès aux variables locales, aux paramètres de méthode et aux champs et attributs profondément imbriqués au sein des objets.
* L'utilisation d'opérateurs de comparaison (`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`) pour comparer des variables, des champs et des constantes dans vos conditions, par exemple : `localVar1.field1.field2 != 15`.
* L'utilisation d'opérateurs logiques (`&&`, `||` et `!` ou `not(...)`) pour construire des conditions booléennes complexes, par exemple : `!isEmpty(user.email) && not(contains(user.name, "abc"))`.
* L'utilisation du littéral `null` (qui est automatiquement traduit en `None` en Python et `nil` en Ruby).

Il ne prend **pas** en charge :
* L'appel de méthodes. Dynamic Instrumentation ne permet pas l'exécution de code pouvant avoir des effets secondaires. Cependant, vous pouvez accéder directement aux champs `private`.
* Les opérations arithmétiques telles que `i + 1`.
* Toute autre syntaxe propre aux langages de programmation au-delà de ce qui est décrit sur cette page.

Essayez [l'autocomplétion et la recherche (en Preview)](/dynamic_instrumentation/symdb/) pour améliorer votre expérience utilisateur avec Expression Language.

## Applications {#applications}

Les expressions peuvent être utilisées pour produire des métriques et comme conditions pour émettre des données filtrées.

Par exemple, vous pouvez créer un histogramme à partir de la longueur d'une chaîne en utilisant `len(data)` comme expression de métrique. Les expressions de métrique doivent produire un nombre.

Dans les messages de log de Live Debugger et les valeurs des tags de span de Dynamic Instrumentation, entourez les expressions d'accolades, par exemple : `User name is {user.name}`. Ces expressions peuvent prendre n'importe quelle valeur.

Les conditions d'instrumentation doivent être évaluées à une valeur booléenne, par exemple :
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`
 - `user.isActive == true`

## Variables contextuelles {#contextual-variables}

Les variables contextuelles disponibles dépendent de l'emplacement de l'instrumentation. `@return` et `@duration` sont disponibles à la sortie de la méthode. `@it` est utilisé à l'intérieur des prédicats de collection.

| Mot-clé     | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | Fournit un accès à la valeur de retour de la méthode. |
| `@duration` | Fournit un accès à la durée d'exécution de l'appel de méthode, sous forme de valeur à virgule flottante en millisecondes. |
| `@exception`| Donne accès à l'exception levée au sein de la méthode (disponible uniquement si une exception non interceptée existe). |
| `@it`       | Donne accès à l'élément actuel lors de l'itération sur une collection. Utilisé dans les prédicats pour les opérations sur les listes. |

## Opérations générales {#general-operations}

Les exemples suivants supposent une variable nommée `myString` avec la valeur `Hello, world!` :

| Opération | Description | Exemple |
|-----------|-------------|---------|
| `isDefined(var)` | Vérifie si une variable est définie. Renvoie `true` si la variable existe dans le périmètre actuel, `false` sinon. Utile pour la logique conditionnelle lorsqu'une variable peut ne pas être présente. | {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | Obtient la longueur de la chaîne. | {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | Vérifie si la chaîne est vide. Équivalent à `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | Obtient une sous-chaîne. | {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | Vérifie si une chaîne commence par le littéral de chaîne donné. | {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | Vérifie si la chaîne se termine par le littéral de chaîne donné. | {{< expression-language-evaluator expression="endsWith(myString, \"rdl!\")" >}} |
| `contains(value_src, string_literal)` | Vérifie si la chaîne contient le littéral de chaîne, ou si une collection contient un élément. | {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | Vérifie si la chaîne correspond à l'expression régulière fournie sous forme de littéral de chaîne. | {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

## Opérations sur les collections {#collection-operations}

Utilisez `@it` dans les prédicats sur des collections séquentielles. Consultez la section [Variables contextuelles](#contextual-variables) pour plus de détails.

Les exemples suivants supposent une variable nommée `mySequence` avec la valeur `[1,2,3,4]` et `myMap` avec la valeur `{"a": 1, "b": 2, "c": 3}` :

| Opération | Description | Exemple |
|-----------|-------------|---------|
| `len(value_src)` | Obtient la taille de la collection. | {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | Vérifie si la collection est vide. Équivalent à `len(value_src) == 0`. | {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | Pour les conteneurs séquentiels, renvoie l'élément d'indice `i` de la collection (où `i` doit être un entier). Pour les dictionnaires, renvoie la valeur correspondant à la clé `key` (où `key` doit correspondre au type de clé du dictionnaire). Si l'élément n'existe pas, l'expression génère une erreur ou renvoie null, selon le langage. | {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | Vérifie si au moins un élément de la collection satisfait le prédicat donné. On accède à l'élément courant à l'aide de la référence `@it` pour les conteneurs séquentiels. | {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} |
| `all(value_src, {predicate})` | Vérifie si chaque élément d'une collection satisfait le prédicat spécifié. On accède à l'élément courant à l'aide de la référence `@it`. | {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} |
| `filter(value_src, {predicate})` | Filtre les éléments de la collection en utilisant le prédicat. On accède à l'élément courant à l'aide de la référence `@it`. | {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} |

## Essayez vos propres conditions {#try-your-own-conditions}

Ce simulateur interactif vous aide à expérimenter la syntaxe d'Expression Language dans un environnement réaliste. Il montre comment les conditions affectent la capture des données lors de l'instrumentation d'une méthode.

La prise en charge des expressions et le comportement en cas de valeur manquante peuvent différer dans votre application.

Sélectionnez l'un des exemples ou saisissez une expression dans le champ « when » et cliquez sur « SIMULATE » pour voir si les données sont capturées en fonction de votre condition.

Variables disponibles dans cet exemple :

- `loops` : le paramètre de route dont la valeur `5` est codée en dur
- `myString` : une chaîne `"Hello, world!"`
- `mySequence` : un tableau d'entiers `[1, 2, 3, 4]`
- `myMap` : un dictionnaire `{"a": 1, "b": 2, "c": 3}`
- `i` : l'indice de l'itération en cours de la boucle

{{< expression-language-simulator >}}

[1]: /fr/tracing/live_debugger/
[2]: /fr/dynamic_instrumentation/