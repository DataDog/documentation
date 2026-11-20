---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests de navigateur Datadog
- link: synthetics/browser_tests
  tag: Documentation
  text: En savoir plus sur les tests de navigateurs Synthetic
title: Gérez les fenêtres contextuelles dans les tests de navigateur
---
## Présentation {#overview}

Ce guide décrit comment gérer les fenêtres contextuelles, telles que les modales ou les fenêtres d'application, dans un [test de navigateur][5] Synthetic.

## Modales {#modals}

### JavaScript {#javascript}

Les tests de navigateur Synthetic gèrent automatiquement les [modales JavaScript][1] :

 - `alert` Les modales sont immédiatement fermées en sélectionnant OK. 
 - `prompt` Les modales sont remplies avec `Lorem Ipsum` pour les tests sur Google Chrome ou Microsoft Edge.
 - `confirm` Les modales demandant une confirmation sont acceptées.

### Authentification de base {#basic-authentication}

Pour les fenêtres contextuelles d'authentification de base, spécifiez les identifiants associés dans la [{{< ui >}}Advanced Options{{< /ui >}}][2] de la configuration de votre test de navigateur.

{{< img src="synthetics/guide/popup/http_authentication.png" alt="Fenêtre contextuelle d'authentification de base" style="width:90%" >}}

## Fenêtres contextuelles d'application {#application-pop-ups}

### Fenêtres contextuelles ancrées {#anchored-pop-ups}

Si une fenêtre contextuelle apparaît à un moment précis de votre parcours, enregistrez une étape pour la fermer. Dans les options avancées de l'étape, sélectionnez {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Ensuite, décochez {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (sélectionné par défaut). Si la fenêtre contextuelle n'apparaît pas, l'étape échoue sans faire échouer l'ensemble du test. Pour plus d'informations, consultez la section [Étape facultative][3].

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="Options avancées de l'étape avec « continue to next step » sélectionné et « mark test as failed » décoché." style="width:60%" >}}

### Fenêtres contextuelles mobiles {#moving-pop-ups}

Si le moment où ces fenêtres contextuelles apparaissent au cours d'une session n'est pas prévisible, vérifiez auprès du tiers fournissant la fenêtre contextuelle s'il peut créer une règle empêchant son apparition pendant l'exécution de votre test de navigateur. Ce tiers peut, par exemple, vous fournir un cookie que vous pouvez saisir dans la [section {{< ui >}}Advanced Options{{< /ui >}}][2] de votre test.

Sinon, utilisez l'une de ces méthodes pour vous assurer que votre fenêtre contextuelle est fermée et que votre test peut poursuivre son parcours :
  * Créez une [assertion JavaScript][4] au début de votre test de navigateur pour essayer régulièrement de fermer la fenêtre contextuelle :

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

  * Enregistrez les étapes pour fermer la fenêtre contextuelle et ajoutez-les entre toutes vos autres étapes de test de navigateur. Pour chaque étape, sélectionnez {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Ensuite, décochez {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (sélectionné par défaut).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /fr/synthetics/browser_tests/#test-configuration
[3]: /fr/synthetics/browser_tests/advanced_options/#optional-step
[4]: /fr/synthetics/browser_tests/test_steps#test-your-ui-with-custom-javascript
[5]: /fr/synthetics/browser_tests