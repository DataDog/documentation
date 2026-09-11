---
title: Tester le chargement et le téléchargement de fichiers

further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
---
## Présentation

Les applications Web peuvent faire appel à un vaste nombre de logiques différentes. Bien que les tests de bout en bout constitués d'interactions simples (telles que des clics et des saisies) suffisent le plus souvent à tester un site Web, il est parfois nécessaire d'aller plus loin et de vérifier des interactions complexes pour s'assurer que les transactions commerciales clés se déroulent normalement dans votre application.

## Tester le chargement d'un fichier

Vous pouvez **charger un fichier** pour valider la dernière étape d'un workflow fonctionnel visant à tester la création de profil. Lorsqu'un fichier est chargé avec l'enregistreur de test, les tests Browser Datadog Synthetic identifient automatiquement le fichier chargé et créent une [étape `Upload file` correspondante][1]. Le fichier est ensuite à nouveau chargé à chaque exécution du test.

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="Charger un fichier" video="true"  width="100%">}}

## Tester le téléchargement d'un fichier

Le **téléchargement de fichiers** est une autre action couramment effectuée par les utilisateurs sur les applications Web : il peut par exemple s'agir de télécharger la confirmation d'une commande à partir d'un site Web de e-commerce ou d'exporter un relevé de compte au format PDF ou CSV.

Les tests Browser de Datadog et l'assertion `Test a downloaded file` vous permettent de vérifier que les fichiers téléchargeables à partir de votre application Web sont correctement transférés (par exemple, à partir de votre serveur FTP). L'assertion peut être utilisée pour vérifier que le nom, la taille et les données d'un fichier téléchargé sont corrects.

Pour configurer un test browser avec cette assertion :

1. **Enregistrez l'étape qui génère le téléchargement de fichier** dans votre test Browser. L'exemple ci-dessous montre comment enregistrer un clic sur un bouton qui déclenche le téléchargement d'un fichier `.docx` :

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="Enregistrement des étapes" video="true">}}

2. **Ajoutez une assertion `Test a downloaded file`** pour confirmer que le fichier a été téléchargé correctement  :

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="Ajout d'assertions" video="true">}}

     Vous pouvez effectuer des vérifications plus avancées si vous le souhaitez, par exemple sur le nom de votre fichier, sa taille et même son intégrité à l'aide d'une chaîne md5 :

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="Vérification avancée" video="true">}}

     Consultez la liste complète des [assertions de test Browser][2] pour en savoir plus sur l'assertion `Test a downloaded file`.

3. **Vérifiez que le fichier a été téléchargé** et qu'il est conforme aux exigences que vous avez configurées dans votre assertion en examinant le résultat de test généré :

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="Résultats du test" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/actions/#upload
[2]: /fr/synthetics/browser_tests/actions/#assertion