---
title: Ajouter manuellement l'extension Chrome de test Browser aux boutiques d'applications internes
kind: guide
further_reading:
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: Blog
    text: Surveillance de l'expérience utilisateur avec les tests Browser de Datadog
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
---
Si, pour des raisons de sécurité, vous ne pouvez pas télécharger des applications directement depuis le Chrome Web Store, vous pouvez quand même enregistrer des tests Browser Synthetic en utilisant le système de détection d'extension intelligent de Datadog (disponible à partir de la version 3.1.6 de l'extension).

1. Téléchargez le fichier CRX de l'[extension d'enregistrement de test Datadog][1]
2. Importez ce fichier CRX dans votre boutique d'applications internes et repackagez-la. L'icône de votre nouvelle extension devrait s'afficher dans votre navigateur Chrome, à côté de vos autres extensions Chrome.
  {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="l'icône qui s'affiche dans votre navigateur">}}
3. Commencez à créer votre [test Browser][2] : [définissez la configuration de votre test][3] (nom, tags, emplacements, fréquence du test, etc.) puis cliquez sur `Save Details & Record Test`. Sur la page de l'enregistreur, un message vous invitant à télécharger l'[extension d'enregistrement de test Datadog][1] pour lancer un enregistrement devrait s'afficher.
4. Cliquez sur l'icône qui est apparue en haut à droite de votre navigateur. L'[extension d'enregistrement de test Datadog][1] détecte automatiquement l'extension importée dans votre boutique d'applications internes et vous permet de [lancer l'enregistrement de vos étapes de test Broswer][4].
  {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="enregistrer vos tests browser">}}

**Remarque :** mettez à jour manuellement votre extension interne lorsque Datadog publie des mises à jour de l'extension d'enregistrement de test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[2]: /fr/synthetics/browser_tests
[3]: /fr/synthetics/browser_tests/#configuration
[4]: /fr/synthetics/browser_tests/#record-test