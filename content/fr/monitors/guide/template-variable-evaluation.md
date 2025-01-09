---

title: Évaluer des template variables
---

Dans les messages de notification de monitor, vous pouvez modifier la sortie des template variables à l'aide de la syntaxe `eval`, qui permet d'effectuer plusieurs opérations et fonctions mathématiques différentes sur des template variables présentant une valeur numérique.

## Opérateurs

Les opérateurs d'évaluation vous permettent d'effectuer des opérations arithmétiques de base sur une template variable numérique. La syntaxe utilise le format suivant. **Remarque** : les expressions doivent être comprises entre des guillemets (`"`).

```text
{{eval "NOM_TEMPLATE_VARIABLE+1-2*3/4"}}
```

Les opérateurs suivants sont pris en charge :

| Opérateur | Description    |
|----------|----------------|
| +        | Addition       |
| -        | Soustraction    |
| *        | Multiplication |
| /        | Division       |
| ^        | Puissance |
| %        | Modulo         |

### Exemple

La template variable `{{last_triggered_at_epoch}}` renvoie l'heure UTC à laquelle un monitor s'est déclenché pour la dernière fois au format epoch en millisecondes. Les opérateurs d'évaluation peuvent être utilisés pour enlever 15 minutes (15 * 60 * 1000 millisecondes) comme suit :

```
{{eval "last_triggered_at_epoch-15*60*1000"}}
```

Cette fonctionnalité est utile pour générer des liens pointant vers un intervalle spécifique sur une autre page Datadog ou un autre outil de votre workflow, puis les ajouter au message de notification de votre monitor. Par exemple, utilisez les opérateurs d'évaluation sur `{{last_triggered_at_epoch}}` pour créer un lien à intervalle vers le [Log Explorer de Datadog][1] :

```
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-15*60*1000"}}&to_ts={{last_triggered_at_epoch}}&live=false
```

## Fonctions

La valeur d'une template variable numérique peut être utilisée en tant qu'entrée pour des fonctions d'évaluation afin de modifier le format de la template variable ou d'effectuer une opération mathématique sur la valeur. La syntaxe utilise le format suivant. **Remarque** : les expressions doivent être comprises entre des guillemets (`"`).

```text
{{eval "function(NOM_TEMPLATE_VARIABLE)"}}
```

Les fonctions suivantes modifient le format d'une template variable numérique :

| Fonction            | Description|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| humanize_bytes(var) | Convertit le nombre d'octets de la var en un format plus lisible|
| humanize_bits(var)  | Convertit le nombre de bits de la var en un format plus lisible|
| abs(var)            | Renvoie la valeur absolue de la var|
| int(var)            | Renvoie la var sous forme de nombre entier tronqué (sans les décimales). Par exemple, si var = 12.345, `int(var)` renvoie alors 12.|
| float(var)          | Renvoie la var sous forme de valeur flottante|
| trunc(var)          | Renvoie la var sous forme de nombre entier ; alias de la fonction int|
| dec(var)            | Renvoie les chiffres à droite du séparateur décimal, par exemple, si var = 12.345, `dec(var)` renvoie alors 0.345.|

Les fonctions suivantes utilisent la valeur d'une template variable numérique en tant qu'entrée d'une fonction mathématique :

| Fonction            | Description|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| round(var)          | Renvoie la var arrondie au nombre entier le plus proche|
| round(var, n)       | Renvoie la var arrondie selon le nombre de décimales significatives (n) défini. <br>Exemple : round(12.376, 2) = 12.38|
| ceil(var)           | Renvoie le plafond de la var (le plus petit nombre entier qui est supérieur ou égal à la var)|
| floor(var)          | Renvoie le plancher de la var (le plus grand nombre entier qui est inférieur ou égal à la var)|
| sgn(var)            | Renvoie la valeur de la fonction signe évaluée pour la var :<br>sgn(var) = 1 si var > 0<br>sgn(var) = 0 si var = 0<br>sgn(var) = -1 si var < 0|
| to_bool(var)        | Renvoie true si var = 1<br>Renvoie false si var = 0|
| exp(var)            | Renvoie le nombre e (la base du logarithme naturel) élevé à la puissance de la var|
| log10(var)          | Renvoie le logarithme en base 10 de la var|
| sin(var)            | Renvoie le sinus de la var en radians|
| sinh(var)           | Renvoie le sinus hyperbolique de la var|
| asin(var)           | Renvoie l'arc sinus de la var, en radians|
| asinh(var)          | Renvoie le sinus hyperbolique inverse de la var|
| cos(var)            | Renvoie le cosinus de la var en radians|
| cosh(var)           | Renvoie le cosinus hyperbolique de la var|
| acos(var)           | Renvoie l'arc cosinus de la var, en radians|
| acosh(var)          | Renvoie le cosinus hyperbolique inverse de la var|
| tan(var)            | Renvoie la tangente de la var en radians|
| tanh(var)           | Renvoie la tangente hyperbolique de la var|
| atan(var)           | Renvoie l'arc tangente de la var, en radians|
| atan2(var1, var2)   | Renvoie atan(var1/var2), en radians|
| atanh(var)          | Renvoie la tangente hyperbolique inverse de la var|

### Exemples

Si vous n'avez pas besoin des décimales de la template variable `{{value}}` pour votre utilisation spécifique, utilisez la fonction int pour évaluer `{{value}}` en tant que nombre entier et ainsi améliorer la lisibilité en supprimant les décimales :

```
{{eval "int(value)"}}
```

Si l'évaluation de `{{value}}` renvoie un nombre important d'octets ou de bits, utilisez la fonction `humanize_bytes` ou `humanize_bits` pour convertir le nombre en une unité de mémoire supérieure, telle que Go ou Mo, afin d'améliorer la lisibilité :

```
{{eval "humanize_bytes(value)"}}

{{eval "humanize_bits(value)"}}
```

[1]: /fr/logs/explorer/