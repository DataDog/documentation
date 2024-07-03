---
description: Découvrez comment utiliser des assertions JavaScript personnalisées dans
  vos tests Browser Synthetic.
further_reading:
- link: /synthetics/browser_tests/actions/
  tag: Documentation
  text: En savoir plus sur les étapes des tests Browser
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Apprendre à configurer les options avancées des étapes de test
- link: /synthetics/guide/popup/#deplacer-les-fenetres-contextuelles
  tag: Documentation
  text: Découvrir comment gérer les fenêtres contextuelles dont l'affichage n'est
    pas prévu

title: Utiliser des assertions JavaScript personnalisées dans des tests Browser
---

## Présentation

Ce guide décrit la démarche à suivre pour tester une interface utilisateur (IU) à l'aide de code JavaScript personnalisé dans un [test Browser][1]. Les assertions JavaScript prennent en charge le code synchrone et asynchrone.

Pour créer une assertion à l'aide de code JavaScript personnalisé, procédez comme suit :

1. Cliquez sur **Assertion** et sélectionnez **Test your UI with custom JavaScript**.
2. Rédigez le corps de votre assertion.
3. Si vous le souhaitez, sélectionnez un élément cible dans votre IU.
4. Cliquez sur **Apply**.

Pour en savoir plus sur les assertions, consultez la section [Étapes des tests Browser][2].

## Vérifier qu'un élément n'est pas sur la page

Pour vérifier qu'un élément avec un ID spécifique n'est *pas* sur la page, utilisez `return !document.getElementById("<ID_ÉLÉMENT>");`.

Pour vérifier que des éléments ne sont *pas* sur la page et renvoyer le nombre d'éléments dans l'erreur de la console, ajoutez ce qui suit au corps de l'assertion :

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SÉLECTEURS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"éléments existent");
} 
return element.length === 0;
{{< /code-block >}}

Vos résultats de tests Browser contiennent des logs `console.error`.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="Logs d'erreur de la console s'affichant dans l'onglet Errors & Warnings du volet latéral de l'étape d'un test" style="width:80%;" >}}

## Vérifier qu'un bouton radio est coché

Pour vérifier qu'un bouton radio est coché, utilisez `return document.querySelector("<SÉLECTEURS>").checked = true;` dans le corps de l'assertion.

## Définir la valeur d'un élément de stockage local spécifique

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

## Vérifier que du texte figure dans un PDF affiché

Vous pouvez utiliser une bibliothèque externe pour tester le contenu d'un PDF affiché.

Pour charger des bibliothèques externes, utilisez le paramètre promise dans le corps de l'assertion :

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
// Charger une bibliothèque externe
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<URL_PDF>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CHAÎNE_CONTENU>")
        })
    })
});
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/
[2]: /fr/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion