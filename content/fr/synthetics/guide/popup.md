---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests Browser de Datadog
- link: synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests de navigateurs Synthetic
kind: guide
title: Gestion des fenêtres contextuelles lors des tests Browser
---
## Présentation

Ce guide décrit comment gérer les fenêtres contextuelles telles que les fenêtres modales ou d'applications dans un [test de navigateur][5] Synthetic.

## Fenêtres modales

### JavaScript

Les tests Browser Synthetic gèrent automatiquement les [fenêtres modales JavaScript][1] :

 - Les `alert` modales sont immédiatement ignorées pour OK. 
 - Les `prompt` modales sont remplies par `Lorem Ipsum` pour les tests sur Google Chrome ou Microsoft Edge.
 - Les `confirm` modaux qui demandent une confirmation sont acceptés.

### Authentification de base

Pour les fenêtres contextuelles d'authentification de base, spécifiez les identifiants requis dans la configuration de votre test Browser, sous [**Advanced Options**][2] :

{{< img src="synthetics/guide/popup/http_authentication.png" alt="Fenêtre contextuelle dʼauthentification de base" style="width:90%" >}}

## Fenêtres contextuelles d'applications

### Fenêtres contextuelles ancrées

Si une fenêtre contextuelle apparaît à un moment spécifique de votre parcours, vous pouvez enregistrer une étape pour la fermer et autoriser l'échec de cette étape à l'aide de l'[option correspondante][3]. Votre test saura ainsi comment réagir si jamais une telle fenêtre s'affiche. Dans le cas contraire, l'étape échoue sans que cela entraîne l'échec de l'ensemble du test.

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Autoriser l'échec d'une fenêtre pour gérer une fenêtre contextuelle" style="width:60%" >}}

### Déplacer les fenêtres contextuelles

S'il n'est pas possible de prédire à quel moment ces fenêtres contextuelles apparaissent, adressez-vous au tiers qui fournit la fenêtre contextuelle afin de vérifier s'il est possible de créer une règle empêchant l'affichage de la fenêtre contextuelle pendant l'exécution du test Browser. Il peut par exemple s'agir d'un cookie à ajouter dans la [section **Advanced Options**][2] de votre test.

Sinon, vous pouvez employer l'une des méthodes suivantes afin de garantir la fermeture de la fenêtre contextuelle et le bon fonctionnement de votre test :
  * Créez une [assertion JavaScript][4] au début de votre test Browser pour essayer régulièrement de fermer la fenêtre :

    ```javascript
    if (document.querySelector("<ELEMENT>")) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        const isPopupDisplayed = () => {
          if (document.querySelector("<ELEMENT>")) {
            clearInterval(popup);
            resolve(true);
          }
        };
        let popup = setInterval(isPopupDisplayed, 500);
      });
    }
    ```

  * Enregistrez les étapes de fermeture de la fenêtre contextuelle, ajoutez-les entre toutes les autres étapes de votre test Browser, puis sélectionnez l'[option **Allow this step to fail**][3] pour chacune d'entre elles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /fr/synthetics/browser_tests/#test-configuration
[3]: /fr/synthetics/browser_tests/advanced_options/#optional-step
[4]: /fr/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
[5]: /fr/synthetics/browser_tests