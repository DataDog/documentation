---
description: Vérifier un e-mail et son contenu avec des étapes de test Browser.
further_reading:
- link: /synthetics/browser_tests/actions
  tag: Documentation
  text: En savoir plus sur les étapes des tests Browser
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: Configurer des options avancées pour les étapes
kind: documentation
title: Utiliser la vérification d'e-mails dans des tests Browser
---

## Présentation

Le parcours utilisateur des applications Web contient généralement des étapes de déclenchement et d'envoi d'e-mails. Par exemple, il est souvent nécessaire de vérifier une adresse e-mail après la création d'un compte, d'envoyer des e-mails de réinitialisation de mot de passe, un envoi dʼe-mail pour signaler une confirmation dʼachat ou encore de confirmer des commandes ou des envois de formulaires de contact.

Pour maintenir une bonne expérience utilisateur sur votre site web, il faut s'assurer que les mécanismes de courrier électronique de votre application fonctionnent correctement. 

## Créer une variable d'e-mail

Pour ajouter une variable dʼe-mail appelée `EMAIL` :

1. Cliquez sur **Variables** et sélectionnez **Email** dans le menu déroulant.
2. Cliquez sur **Add Variable** pour pouvoir utiliser la variable lorsque vous lancez lʼenregistrement.

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="Créer une variable d'e-mail" video="true" width="100%">}}

La variable dʼe-mail génère une boîte de réception unique gérée par Datadog à chaque exécution de test, ce qui permet à vos tests de navigateur de s'exécuter sans conflit.

## Enregistrer des étapes

Une fois que vous avez créé une variable dʼe-mail, vous pouvez [confirmer que l'email a été envoyé correctement] (#confirmer-que-l-email-a-ete-envoyé) après un déclencheur intégré à lʼapp.

Cliquez sur **Start Recording** et enregistrez toutes les étapes menant au déclenchement de l'e-mail avec votre variable d'e-mail. Cliquez sur l'icône en forme de main dans une variable pour injecter sa valeur dans la saisie de texte d'un formulaire ou d'un champ.

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="Enregistrer des étapes" video="true" width="100%">}}

Après avoir enregistré vos étapes pour remplir le formulaire, cliquez sur le bouton **Sign Up** pour déclencher un e-mail de notification. Un e-mail adapté à cette session d'enregistrement est envoyé à la boîte aux lettres de Datadog, par exemple `838-n3q-q2y.6238933596@synthetics.dtdg.co`.

### Confirmer l'envoi d'un e-mail

Pour confirmer que lʼe-mail a été envoyé, cliquez sur **Assertion** et sélectionnez **Test that an email was received**. Pour vous assurer que votre courriel respecte des directives spécifiques en matière de contenu, vous pouvez ajouter des vérifications supplémentaires sur l'objet et le corps du message.

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="Ajouter une assertion" video="true" width="100%">}}

Dans cet exemple, l'assertion est réussie si l'objet de l'e-mail est `Welcome to Shopist!`, si le corps du message contient la phrase `Your verification code is...` et si le code de vérification correspond à l'expression rationnelle `\d{1,6}`.

### Parcourir les liens d'un e-mail

Pour que votre test de navigateur parcoure les liens contenus dans les e-mails envoyés :

1. Cliquez sur **Navigation** et sélectionnez **Go to email and click link**. Cliquez sur **Next**.
2. L'e-mail contenant les liens que vous souhaitez tester apparaît dans la boîte de réception. Cliquez sur **Next**.  
3. Sélectionnez le lien auquel vous voulez que le test de votre navigateur accède. L'URL de l'iframe ou de la fenêtre contextuelle est immédiatement mise à jour avec le lien spécifié. Cliquez sur **Save Navigation Step**.
4. L'iframe redirige vers l'URL de la page associée. Poursuivez l'enregistrement de vos étapes.

Dans cet exemple, le test de navigateur examine l'e-mail `Welcome to Shopist`, clique sur le lien `Verify your email by clicking here` et confirme que le mécanisme d'enregistrement de l'utilisateur fonctionne comme prévu. 

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="Ajouter une étape Navigation" video="true" width="100%">}}

Comme dernière étape de votre test de navigateur, créez une assertion pour confirmer que le contenu de `div` déclenche la vérification correcte du compte. Par exemple, la page contient `Your account is now verified`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}