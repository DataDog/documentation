---
code_lang: javascript
code_lang_weight: 10
description: Capacités et limites des expressions JavaScript dans App Builder
title: Expressions JavaScript
type: multi-code-lang
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation est en préversion sur votre site Datadog sélectionné ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

JavaScript (JS) est disponible dans les workflows utilisant des expressions en ligne ou via les actions JS dédiées {{< ui >}}Function{{< /ui >}} et {{< ui >}}Expression{{< /ui >}}.

## Expressions JavaScript en ligne {#inline-javascript-expressions}

Vous pouvez utiliser des expressions JS directement dans les étapes de workflow pour effectuer un large éventail de transformations de données sans avoir besoin d'inclure des étapes JS dédiées.

Pour utiliser une expression en ligne dans votre workflow, entourez l'expression de `${}`. Par exemple, pour convertir un ID de chaîne (`Trigger.stringId`) en entier, utilisez `${ parseInt(Trigger.stringId) }`.

La bibliothèque utilitaire [Lodash][1] est disponible dans les expressions en ligne. Le préfixe underscore de Lodash (`_`) est facultatif. Par exemple, `${ _.toNumber("1") }` et `${ toNumber("1") }` sont toutes deux des expressions en ligne valides.

### Exemples {#examples}

#### Récupérer un horodatage {#retrieve-a-timestamp}

L'exemple suivant utilise la fonction Lodash `now()` dans une étape {{< ui >}}Get hosts total{{< /ui >}} pour obtenir le nombre de hosts au cours de la dernière minute.

L'action utilise l'expression en ligne suivante dans le champ {{< ui >}}From{{< /ui >}} :

```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/actions/workflows/expressions/javascript/timestamp.png" alt="Une expression en ligne utilisant la fonction Lodash now()" style="width:90%;" >}}

#### Incrémenter une valeur {#increment-a-value}

L'exemple suivant incrémente la capacité souhaitée de 1 dans une étape {{< ui >}}Set desired capacity{{< /ui >}}.

L'action utilise l'expression en ligne suivante dans le champ {{< ui >}}Desired capacity{{< /ui >}} :

```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/actions/workflows/expressions/javascript/increment.png" alt="Une expression en ligne qui incrémente la capacité souhaitée d'un" style="width:90%;" >}}

## Actions d'expression JavaScript {#javascript-expression-actions}

Les actions [Expression](#expression-step) et [Fonction](#function-step) effectuent des transformations de données personnalisées au sein de vos workflows à l'aide de JavaScript. Utilisez les valeurs de toutes les variables de contexte disponibles dans votre workflow comme entrées pour vos expressions et fonctions JavaScript avec la syntaxe `$.Steps.<step_name>.<variable>`.

Les données renvoyées par ces actions peuvent ensuite être référencées dans les étapes ultérieures du workflow.

Vous pouvez utiliser un trait de soulignement (`_`) pour utiliser [Lodash][1] dans vos étapes d'expression et de fonction. Par exemple, pour référencer la variable d'état de la requête HTTP (`status`) de l'étape de requête HTTP (`Make_request`), vous utiliseriez la variable de contexte suivante :

```
$.Steps.Make_request.status
```

Et pour déterminer si un tableau renvoyé par `Array_function` inclut le nom `Bits`, appliquez la fonction Lodash `_.includes` avec la syntaxe suivante :

```
_.includes($.Steps.Array_function.data, "Bits")
```
### Étape de fonction {#function-step}

L'action de fonction permet des affectations de variables et des transformations de données complexes nécessitant plusieurs expressions.

Pour ajouter une action de fonction :
- Dans un nouveau workflow, cliquez sur {{< ui >}}Add step{{< /ui >}} et recherchez `function`. Sélectionnez l'action {{< ui >}}Function{{< /ui >}} pour l'ajouter à votre workflow.
- Dans un workflow existant, cliquez sur {{< ui >}}\+{{< /ui >}} et recherchez `function`. Sélectionnez l'action {{< ui >}}Function{{< /ui >}} pour l'ajouter à votre workflow.

#### Écrire des étapes de fonction avec l'IA {#write-function-steps-with-ai}

Vous pouvez utiliser Bits AI pour vous aider à écrire le JavaScript pour une étape {{< ui >}}Function{{< /ui >}}. Pour utiliser cette fonctionnalité, effectuez les étapes suivantes :

1. Ajoutez une étape {{< ui >}}Function{{< /ui >}} à votre workflow.
1. Sous {{< ui >}}General{{< /ui >}}, dans le champ {{< ui >}}Script{{< /ui >}}, cliquez sur {{< ui >}}<i class="icon-bits-ai"></i> Write with Bits AI{{< /ui >}}.
1. Dans le champ {{< ui >}}Describe your transformation script{{< /ui >}}, saisissez une description de ce que vous souhaitez que votre script fasse. Cliquez sur la flèche vers le haut ({{< ui >}}↑{{< /ui >}}) pour soumettre votre description.
1. Choisissez une option pour {{< ui >}}Replace script{{< /ui >}}, {{< ui >}}Insert in script{{< /ui >}} ou {{< ui >}}Copy to clipboard{{< /ui >}}.
1. Vérifiez le script et modifiez-le si nécessaire pour répondre à vos besoins.

### Étape d'expression {#expression-step}

Dans la plupart des cas, utilisez une expression en ligne plutôt qu'une étape d'expression dédiée. Les actions d'expression acceptent une seule ligne de code. Par exemple, `[1, 2, 3].filter(x => x < 3)`. Les affectations de variables ne sont pas disponibles dans les expressions.

Pour ajouter une action d'expression :
- Dans un nouveau workflow, cliquez sur {{< ui >}}Add step{{< /ui >}} et recherchez `expression`. Sélectionnez l'action {{< ui >}}Expression{{< /ui >}} pour l'ajouter à votre workflow.
- Dans un workflow existant, cliquez sur {{< ui >}}\+{{< /ui >}} et recherchez `expression`. Sélectionnez l'action {{< ui >}}Expression{{< /ui >}} pour l'ajouter à votre workflow.

Dans une étape d'expression, l'exécution utilise des _copies_ de toutes les variables disponibles. La modification d'une variable au sein d'une étape n'a aucun effet sur la valeur de la variable en dehors de l'étape. Pour affecter le résultat d'une expression à une variable, consultez [Variables et paramètres][2].

## Tester des expressions et des fonctions {#test-expressions-and-functions}

Consultez la page de test et de débogage pour savoir comment [tester une étape de workflow][3].

[1]: https://lodash.com/
[2]: /fr/actions/workflows/variables/
[3]: /fr/actions/workflows/test_and_debug/#test-a-step