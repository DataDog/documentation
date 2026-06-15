---
further_reading:
- link: /synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests Browser

title: Utiliser un shadow DOM dans vos tests Browser
---

## Présentation

L'API Shadow Document Object Model (DOM) est un composant Web permettant de lier une arborescence DOM encapsulée à un élément HTML. Le [shadow DOM][1] est autonome et isolé du DOM du document principal.

Vous pouvez utiliser un shadow DOM avec les ressources suivantes :

- Formulaires et composants provenant de bibliothèques tierces
- Contenu intégré (comme une vidéo ou une image)
- Intégrations de chat dans une fenêtre contextuelle

<div class="alert alert-info">
L'<a href="https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa">extension d'enregistrement de tests Browser Datadog</a> ne peut pas enregistrer l'<a href="https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance">ensemble complet de localisateurs requis pour cibler l'élément lors des exécutions de tests</a>, ce qui entraîne l'échec de l'étape.
</div>

Tirez profit de différentes actions de test Browser en fonction du [mode d'encapsulation][2] et de l'objectif de l'étape pour configurer un test qui interagit avec les éléments affichés dans un shadow DOM et les valide. Ce guide présente ces actions ainsi que les types d'assertions.

## Mode open

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.png" alt="Shadow DOM en mode open" style="width:50%;" >}}

Avec le mode `open`, les assertions normales ne sont pas disponibles. Vous pouvez utiliser des assertions JavaScript pour interagir avec des éléments affichés dans un shadow DOM et les valider grâce à la propriété `Element.shadowRoot`.

### Vérifier la présence de texte

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.png" alt="Valider du texte affiché dans un shadow DOM" style="width:90%;" >}}

Pour confirmer que le texte « TODO » s'affiche sur une page, interrogez la propriété `innerHTML` directement depuis l'élément `<body>` du document principal.

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### Valider du texte affiché

Pour confirmer que le texte est affiché dans un élément donné lui-même affiché dans un shadow DOM, utilisez la propriété `shadowRoot` pour accéder à l'élément en question et la propriété `innerHTML` ou `textContent` pour valider l'affichage du texte.

Par exemple, l'extrait de code suivant confirme que le texte « TODO » est affiché dans un tag HTML `<h3>` :

```
// rechercher l'élément auquel le shadow DOM est lié :
let element = document.querySelector("body > editable-list")

// utiliser la propriété shadowRoot pour identifier l'élément <h3> dans le shadow DOM :
let shadowDomElement = element.shadowRoot.querySelector("div > h3")

// vérifier le textContent de l'élément du shadow DOM :
return shadowDomElement.textContent.includes("TODO")
```

### Saisir du texte dans des champs de saisie

Lorsque des champs de saisie de texte sont affichés dans l'arborescence DOM du document principal, l'extension d'enregistrement de tests Browser Datadog enregistre automatiquement les valeurs saisies et crée une étape de test [Type Text][3].

Si vous utilisez des champs de saisie affichés dans un shadow DOM, il est possible que l'outil d'enregistrement ne parvienne pas à enregistrer l'ensemble complet de points de référence vers l'élément, ce qui entraîne l'échec de l'étape lors des exécutions de tests. Pour pouvoir saisir des informations textuelles dans un champ de saisie de texte affiché dans un shadow DOM, ajoutez une assertion JavaScript qui identifie l'élément `<input>` en question et définit le champ `value`.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.png" alt="Valider du texte saisi affiché dans un shadow DOM" style="width:90%;" >}}

Par exemple, l'extrait de code suivant ajoute le texte « Élément ajouté avec une assertion JS » dans le champ de saisie :

```js
// rechercher l'élément auquel le shadow DOM est lié :
let element = document.querySelector("body > editable-list")

// utiliser la propriété shadowRoot pour identifier l'élément <input> dans le shadow DOM :
let shadowDomInput = element.shadowRoot.querySelector("input")

// définir la valeur de la propriété de l'élément <input> :
shadowDomInput.value = "Élément ajouté avec une assertion JS"

return true
```

### Cliquer sur un élément

Pour déclencher un clic sur un élément affiché dans un shadow DOM, identifiez l'élément en question et exécutez `.click()` dessus. 

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.png" alt="Valider un clic déclenché sur un élément affiché dans un shadow DOM" style="width:90%;" >}}

Par exemple, l'extrait de code suivant déclenche un clic sur un élément de bouton.

```
// rechercher l'élément auquel le shadow DOM est lié :
let element = document.querySelector("body > editable-list")

// utiliser la propriété shadowRoot pour identifier l'élément <button> dans le shadow ROM :
let shadowDomButton = element.shadowRoot.querySelector("button.editable-list-add-item")

// déclencher un clic sur le bouton :
shadowDomButton.click()

return true
```

## Mode closed

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.png" alt="Shadow DOM en mode closed" style="width:30%;" >}}

Avec le mode `closed`, les assertions normales ne sont pas disponibles. En outre, les éléments affichés dans un shadow DOM ne sont pas accessibles avec JavaScript. Vous ne pouvez donc pas utiliser d'assertion JavaScript dans vos tests Browser avec ce mode.

Vous avez la possibilité d'utiliser l'action `Press Key` pour sélectionner les options appropriées. Par exemple, si vous souhaitez accéder à une nouvelle page en sélectionnant une option depuis un menu de navigation, et que ce menu est affiché dans un shadow DOM, utilisez la touche `tab` pour accéder à l'option en question, puis déclenchez la touche `enter` pour sélectionner l'option.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" alt="Utiliser les touches tab pour faire fonctionner un shadow DOM avec un test Browser" video=true >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[2]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage
[3]: https://docs.datadoghq.com/fr/synthetics/browser_tests/actions#type-text