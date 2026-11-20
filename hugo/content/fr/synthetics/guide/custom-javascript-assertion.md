---
description: Découvrez comment utiliser des assertions JavaScript personnalisées dans
  vos tests de navigateur Synthetic.
further_reading:
- link: /synthetics/browser_tests/test_steps/
  tag: Documentation
  text: En savoir plus sur les étapes des tests de navigateur
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Apprendre à configurer les options avancées des étapes de test
- link: /synthetics/guide/popup/#moving-popups
  tag: Documentation
  text: Découvrir comment gérer les fenêtres contextuelles dont l'affichage n'est
    pas prévu
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Comment j'ai aidé mon client à mettre à l'échelle ses tests de navigateur
    avec Datadog
title: Utiliser des assertions JavaScript personnalisées dans les tests de navigateur
---
## Présentation {#overview}

Ce guide décrit comment vous pouvez tester une interface utilisateur (UI) en utilisant du JavaScript personnalisé dans un [test de navigateur][1]. Les assertions JavaScript prennent en charge le code synchrone et asynchrone.

Pour créer une assertion à l'aide de code JavaScript personnalisé, procédez comme suit :

1. Cliquez sur {{< ui >}}Assertion{{< /ui >}} et sélectionnez {{< ui >}}Test custom JavaScript assertion{{< /ui >}}.
2. Rédigez le corps de votre assertion.
3. Optionnellement, sélectionnez un élément cible dans l'interface utilisateur. 
4. Cliquez sur {{< ui >}}Apply{{< /ui >}}.

Pour en savoir plus sur les assertions, consultez la section [Étapes des tests de navigateur][2].

## Vérifiez qu'un élément n'est pas sur la page {#assert-that-an-element-is-not-on-the-page}

Pour vérifier qu'un élément avec un ID spécifique n'est *pas* sur la page, utilisez `return !document.getElementById("<ELEMENT_ID>");`.

Pour vérifier que des éléments ne sont *pas* sur la page et renvoyer le nombre d'éléments dans l'erreur de console, ajoutez ce qui suit dans le corps de l'assertion :

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

Vos résultats de test de navigateur incluent les logs `console.error`, avec un maximum de 4 logs autorisés par fonction JavaScript. Pensez à combiner les logs pour une clarté et une efficacité accrues.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="Logs d'erreurs de console apparaissant dans l'onglet Errors & Warnings du panneau latéral de l'étape de test" style="width:80%;" >}}

## Vérifiez qu'un bouton radio est coché {#assert-that-a-radio-button-is-checked}

Pour vérifier qu'un bouton radio est coché, utilisez `return document.querySelector("<SELECTORS>").checked === true;` dans le corps de l'assertion.

## Définissez la valeur d'un élément de stockage local spécifié {#set-the-value-of-a-specified-local-storage-item}

Pour définir la valeur d'un élément de stockage local spécifique, ajoutez ce qui suit au corps de l'assertion :

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

Par exemple, pour définir le nombre de millisecondes écoulées depuis la date January 1, 1970, 00:00:00 UTC sur « mytime », utilisez ce qui suit :

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

`localStorage` est accessible dans d'autres assertions JavaScript si vous devez comparer des valeurs spécifiques :

{{< code-block lang="javascript" >}}
localStorage.getItem("mytime");
return true
{{< /code-block >}}

## Vérifiez le texte contenu dans un PDF rendu {#assert-on-text-contained-in-a-rendered-pdf}

Vous pouvez utiliser une bibliothèque externe pour tester le contenu d'un PDF affiché. 

Pour charger des bibliothèques externes, utilisez le paramètre promise dans le corps de l'assertion :

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//load external library
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
{{< /code-block >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion