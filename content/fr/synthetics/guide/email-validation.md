---
title: Vérification d'e-mails avec des tests Browser
kind: documentation
description: Vérifier un e-mail et son contenu avec des étapes de test Browser
further_reading:
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: En savoir plus sur les étapes des tests Browser
  - link: /synthetics/browser_tests/advanced_options/
    tag: Documentation
    text: Configurer des options avancées pour les étapes
---
## Présentation

Le parcours utilisateur des applications Web standard contient généralement des étapes de déclenchement et d'envoi d'e-mails. Par exemple, il est souvent nécessaire de vérifier une adresse e-mail après la création d'un compte, d'envoyer des e-mails de réinitialisation de mot de passe ou encore de confirmer des commandes ou des envois de formulaires de contact.

Pour optimiser l'expérience utilisateur sur votre site Web, il est crucial de vérifier que vos mécanismes d'e-mails fonctionnent comme prévu.

Grâce aux [tests Browser][1] Datadog, vous pouvez :

- Confirmer qu'un e-mail a bien été envoyé suite à un déclenchement dans une application
- Vérifier le contenu d'un e-mail
- Cliquer sur les liens situés dans les e-mails envoyés afin de parcourir d'autres URL et de valider des flux entiers, y compris des étapes Web et E-mail

Pour valider des e-mails durant un test Browser Datadog, suivez les étapes suivantes.

## Créer une variable d'e-mail

Après avoir rempli les détails du test Browser (URL de départ, appareils, emplacements, fréquence et notification), accédez à la section **Save Details & Record Test**, sélectionnez **Variables**, puis sélectionnez **Email** depuis la liste déroulante des variables d'e-mail :

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="Créer une variable d'e-mail" video="true"  width="100%">}}

Dans l'exemple ci-dessus, une variable d'e-mail `EMAIL` est créée. Elle génère une boîte de réception unique gérée par Datadog lors de chaque exécution de test. Cette fonctionnalité permet d'éviter tout conflit entre vos exécutions de test Browser.

## Enregistrer des étapes

Dans le coin supérieur gauche de l'Interface, cliquez sur le bouton **Start Recording** et enregistrez les étapes entraînant le déclenchement de l'e-mail, à l'aide de la variable d'e-mail tout juste créée. Utilisez l'icône en forme de main pour saisir des variables dans les champs de texte du formulaire.

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="Enregistrer des étapes" video="true"  width="100%">}}

Les étapes de remplissage du formulaire sont enregistrées. Cliquez sur le bouton `Sign up` pour déclencher l'e-mail. L'e-mail créé lors de cette session d'enregistrement d'exemple est alors envoyé à la boîte de réception Datadog. Il s'agit ici de `838-n3q-q2y.6238933596@synthetics.dtdg.co`.

## Confirmer l'envoi d'un e-mail

Vous pouvez désormais confirmer l'envoi d'un e-mail. Cliquez sur le bouton **Assertion** et sélectionnez l'assertion `Test that an email was received`.

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="Ajouter une assertion" video="true"  width="100%">}}

SI vous souhaitez vérifier que votre e-mail respecte des directives précises en matière de contenu, vous pouvez ajouter des vérifications supplémentaires concernant son objet et son corps.

Dans l'exemple ci-dessus, l'assertion réussit si l'objet de l'e-mail est `Welcome to Shopist!` et si son corps contient l'expression `Your verification code is` ainsi qu'un code de vérification correspondant à l'expression régulière `\d{1,6}`.

## Parcourir des liens dans un e-mail

Il est désormais possible d'effectuer des tâches encore plus poussées, en demandant à votre test Browser de parcourir les liens contenus dans les e-mails récemment envoyés.

Pour ce faire, créez une étape **Navigation**, choisissez l'option `Go to email and click link` et sélectionnez l'e-mail qui contient les liens à tester. Choisissez le lien auquel votre test Browser doit accéder. L'URL de l'iframe ou de la fenêtre contextuelle est immédiatement définie sur le lien choisi. Vous pouvez alors continuer à enregistrer vos étapes, comme d'ordinaire.

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="Ajouter une étape Navigation" video="true"  width="100%">}}

Dans l'exemple ci-dessus, le test Browser analyse l'e-mail « Welcome to Shopist » afin de cliquer sur un lien de vérification, dans le but de confirmer que le mécanisme d'inscription des utilisateurs fonctionne comme prévu. Cet e-mail est sélectionné et le lien « Verify your email by clicking here » est choisi. Dès que l'étape est enregistrée, l'iframe est redirigé vers la page associée.

Vous pouvez désormais créer une dernière assertion pour tester le contenu `div`, afin de vous assurer qu'il déclenche un processus de vérification de compte fonctionnel (la page contient `Your account is now verified.`).


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests