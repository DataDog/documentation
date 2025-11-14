---
aliases:
- /fr/service_management/workflows/actions/data_transformation/
- /fr/service_management/workflows/expressions
description: Utiliser des expressions JavaScript en ligne et des actions function/expression
  dédiées pour des transformations de données personnalisées dans les workflows.
disable_toc: false
further_reading:
- link: /service_management/workflows/variables/
  tag: Documentation
  text: Variables et paramètres
title: Expressions JavaScript
---

JavaScript est disponible dans les workflows à l'aide d'expressions en ligne ou via les actions dédiées **Function** et **Expression** JS.

## Expressions JavaScript en ligne

Vous pouvez utiliser des expressions JavaScript (JS) directement dans les étapes de workflow pour effectuer un large éventail de transformations de données sans avoir besoin d'inclure des étapes JS dédiées.

Pour utiliser une expression en ligne dans votre workflow, encadrez l'expression dans `${}`. Par exemple, pour convertir un ID de chaîne de caractères (`Trigger.stringId`) en entier, utilisez `${ parseInt(Trigger.stringId) }`.

La bibliothèque utilitaire [Lodash][1] est disponible dans les expressions en ligne. Le préfixe underscore Lodash (`_`) est facultatif. Par exemple, `${ _.toNumber("1") }` et `${ toNumber("1") }` sont tous deux des expressions en ligne valides.

### Exemples

#### Récupérer un horodatage

L'exemple suivant utilise la fonction Lodash `now()` à l'intérieur d'une étape **Get hosts total** pour obtenir le nombre de hosts au cours de la dernière minute.

L'action utilise l'expression en ligne suivante dans le champ **From** :
```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/service_management/workflows/timestamp.png" alt="Une expression en ligne utilisant la fonction lowdash now()" style="width:90%;" >}}

#### Incrémenter une valeur

L'exemple suivant incrémente la capacité souhaitée à l'intérieur d'une étape **Set desired capacity** de 1.

L'action utilise l'expression en ligne suivante dans le champ **Desired capacity** :
```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/service_management/workflows/increment.png" alt="Une expression en ligne qui incrémente la capacité souhaitée de un" style="width:90%;" >}}

## Actions d'expression JavaScript

Les actions [Expression](#expression-step) et [Function](#function-step) effectuent des transformations de données personnalisées dans vos workflows à l'aide de JavaScript. Utilisez les valeurs de toutes les variables de contexte disponibles dans votre workflow comme entrées pour vos expressions et fonctions JavaScript avec la syntaxe `$.Steps.<step_name>.<variable>`.

Les données renvoyées par ces actions peuvent ensuite être référencées dans les étapes suivantes du workflow.

Vous pouvez utiliser un underscore (`_`) pour utiliser [Lodash][1] dans vos étapes d'expression et de fonction. Par exemple, pour référencer la variable de statut de requête HTTP (`status`) de l'étape de requête HTTP (`Make_request`), vous utiliseriez la variable de contexte suivante :

```
$.Steps.Make_request.status
```

Et pour déterminer si un tableau renvoyé par `Array_function` inclut le nom `Bits`, appliquez la fonction Lodash `_.includes` avec la syntaxe suivante :

```
_.includes($.Steps.Array_function.data, "Bits")
```

### Étape Function

L'action function permet les affectations de variables et les transformations de données complexes nécessitant plusieurs expressions.

Pour ajouter une action function :
- Dans un nouveau workflow, cliquez sur **Add step** et recherchez `function`. Sélectionnez l'action **Function** pour l'ajouter à votre workflow.
- Dans un workflow existant, cliquez sur **+** et recherchez `function`. Sélectionnez l'action **Function** pour l'ajouter à votre workflow.

#### Écrire des étapes de fonction avec l'IA

Vous pouvez utiliser Bits AI pour vous aider à écrire le JavaScript pour une étape **Function**. Pour utiliser cette fonctionnalité, effectuez les étapes suivantes :

1. Ajoutez une étape **Function** à votre workflow.
1. Sous **General**, dans le champ **Script**, cliquez sur **<i class="icon-bits-ai"></i> Write with Bits AI**.
1. Dans le champ **Describe your transformation script**, saisissez une description de ce que vous souhaitez que votre script fasse. Cliquez sur la flèche vers le haut (**↑**) pour soumettre votre description.
1. Choisissez une option pour **Replace script**, **Insert in script** ou **Copy to clipboard**.
1. Vérifiez le script et modifiez-le si nécessaire pour répondre à vos besoins.

### Étape Expression

Dans la plupart des cas, utilisez une expression en ligne au lieu d'une étape d'expression dédiée. Les actions d'expression acceptent une seule ligne de code. Par exemple, `[1, 2, 3].filter(x => x < 3)`. Les affectations de variables ne sont pas disponibles dans les expressions.

Pour ajouter une action expression :
- Dans un nouveau workflow, cliquez sur **Add step** et recherchez `expression`. Sélectionnez l'action **Expression** pour l'ajouter à votre workflow.
- Dans un workflow existant, cliquez sur **+** et recherchez `expression`. Sélectionnez l'action **Expression** pour l'ajouter à votre workflow.

Dans une étape d'expression, l'exécution utilise des _copies_ de toutes les variables disponibles. Muter une variable dans une étape n'a aucun effet sur la valeur de la variable en dehors de l'étape. Pour affecter le résultat d'une expression à une variable, consultez la section [Définir des variables][4].

## Tester des expressions et des fonctions

Consultez la page de test et de débogage pour apprendre comment [tester une étape de workflow][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][2].

[1]: https://lodash.com/
[2]: https://datadoghq.slack.com/
[3]: /fr/service_management/workflows/test_and_debug/#test-a-step
[4]: /fr/service_management/workflows/actions/set_variables