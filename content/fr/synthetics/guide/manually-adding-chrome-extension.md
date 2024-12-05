---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests Browser de Datadog
- link: /synthetics/browser_tests
  tag: Documentation
  text: Créer un test Browser

title: Ajouter manuellement l'extension Chrome de test Browser aux boutiques d'applications
  internes
---

## Présentation

Si vous ne pouvez pas télécharger d'application directement depuis le Chrome Web Store pour des raisons de sécurité, utilisez le système de détection d'extensions de Datadog, disponible pour l'extension Chrome Datadog Synthetics v3.1.6+, afin d'enregistrer des tests Browser Synthetic.

1. Téléchargez le [dernier fichier CRX][1] de l'extension d'enregistrement de tests Datadog.
2. Importez ce fichier CRX dans votre boutique d'applications internes et repackagez l'extension. L'icône de la nouvelle extension s'affiche alors dans le navigateur Chrome en regard de vos autres extensions.

   {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="L'icône qui s'affiche dans votre navigateur" style="width:100%;" >}}

3. [Définissez la configuration de votre test][3] (en configurant notamment le nom, les tags, les emplacements et la fréquence du test) et cliquez sur **Save Details & Record Test** pour créer votre [test Browser][2]. Pour commencer à créer des enregistrements, commencez par télécharger l'[extension d'enregistrement de tests Datadog][4].
4. Cliquez sur l'icône de l'extension d'enregistrement en haut à droite de votre navigateur. L'extension d'enregistrement de tests Datadog détecte automatiquement l'extension importée dans votre boutique d'applications internes.
5. Commencez à [enregistrer les étapes de votre test Browser][5] et cliquez sur **Save Recording** une fois l'enregistrement terminé.

   {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="Enregistrer vos tests Browser" style="width:100%;" >}}

**Remarque** : Datadog publie les mises à jour de l'extension d'enregistrement de tests sur le [Chrome Web Store][4]. Vous pouvez mettre à jour manuellement votre extension interne afin d'enregistrer des tests Browser.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/synthetics-browser-extension
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /fr/synthetics/browser_tests/#test-configuration
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[5]: /fr/synthetics/browser_tests/#record-your-steps