---
title: Changement d'onglet lors de tests Browser
kind: guide
further_reading:
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
  - link: /synthetics/browser_tests/actions
    tag: Documentation
    text: Créer des étapes de test Browser
  - link: https://www.datadoghq.com/blog/test-creation-best-practices/
    tag: Blog
    text: Pratiques recommandées pour la création de tests de bout en bout
---
Si votre test Browser effectue certaines actions (comme un clic sur un lien) qui entraînent l'ouverture d'un nouvel onglet,  et que vous souhaitez poursuivre les étapes du test dans cet onglet, vous n'avez pas besoin d'effectuer de manipulation particulière lors de l'enregistrement des différentes étapes. Le test Browser est capable de changer automatiquement d'onglet durant l'exécution du test, afin d'effectuer ses étapes dans le nouvel onglet.

**Remarque :** votre test doit d'abord interagir avec la page (par exemple, via un clic) pour pouvoir effectuer une [assertion][1] sur la nouvelle page.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions#assertion