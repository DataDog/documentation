---
title: Réutiliser des parcours de test Browser pour toute votre collection de tests

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
## Présentation

Il peut s'avérer utile de réutiliser un parcours dans plusieurs autres tests. Par exemple :

* Si, pour accéder à la plupart des fonctionnalités de votre application, les utilisateurs doivent se connecter, vous pouvez [réutiliser vos étapes de connexion](#creer-et-reutiliser-un-sous-test-de-connexion) au début de chacun de vos tests.
* Si vous souhaitez surveiller les fonctionnalités de votre application dans plusieurs environnements distincts, vous pouvez créer des tests pour votre environnement de production, puis les réutiliser en tant que sous-tests pour d'autres environnements (dev ou staging, par exemple).
* Si l'exécution de vos tests crée des objets de base de données, vous pouvez créer des tests qui nettoient votre environnement de test, puis les utiliser en tant que sous-tests pour effectuer systématiquement un nettoyage au début ou à la fin de vos tests.

Grâce aux sous-tests des tests Browser, vous pouvez réutiliser vos parcours pour toute votre collection de tests afin de bénéficier de différents avantages : 
* **La création de tests est plus rapide.** Si vous avez créé un test de connexion, vous pouvez l'appeler en tant que sous-test au début de l'ensemble de votre collection de tests, plutôt que d'enregistrer les mêmes étapes de connexion pour chacun de vos tests.
* **Vos tests sont plus facilement à comprendre**. En effet, les blocs créés permettent aux utilisateurs d'assimiler plus rapidement le fonctionnement des tests.
* **La modification des tests est simplifiée**. Si votre procédure évolue, une seule modification est requise. Vous n'avez pas besoin de changer chacun de vos tests.


## Créer et réutiliser un sous-test de connexion

Si, pour surveiller différents composants de votre application, vous devez tout d'abord vous connecter, il est recommandé de créer un test unique qui englobe toutes les étapes de connexion. Vous pourrez alors reprendre ces étapes en tant que sous-test pour d'autres tests nécessitant une connexion.

Pour créer un test de connexion et l'utiliser en tant que sous-test dans le reste de votre collection de tests :

1. Créez un test A, dont la seule mission est de se connecter à votre application. Définissez l'URL de départ (**Starting URL**) de ce test sur l'URL de pré-connexion.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/login_subtest_recording.mp4" alt="Enregistrement du sous-test de connexion" video="true"  width="100%">}}

2. Créez un test B qui surveille une fonctionnalité de votre application pour laquelle l'utilisateur doit être connecté. Dans l'exemple suivant, ce deuxième test surveille la création d'un dashboard. Définissez également l'URL de départ (**Starting URL**) de ce test sur l'URL de pré-connexion.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_configuration.png" alt="Configuration du test parent" >}}

3. Lors de l'enregistrement du test B, cliquez sur **Subtest** et sélectionnez le test de connexion A.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_subtest.mp4" alt="Ajout d'un sous-test à un test parent" video="true"  width="100%">}}

  Lorsque vous configurez cette étape de sous-test, toutes les étapes du test A sont lues au début du test parent B. De plus, les variables du sous-test A sont importées dans le test parent B. Par défaut, le sous-test est lu dans l'onglet principal. Ainsi, ses étapes sont lues dans le même onglet que les étapes précédentes et suivantes. Le sous-test commence son exécution à partir de l'URL définie dans le test parent (ici, l'URL de pré-connexion). Une fois que toutes les étapes du test ont été exécutées, le test Browser lance la première étape n'appartenant pas au sous-test du test parent, depuis la dernière page utilisée par le sous-test. Pour l'instant, nous n'avons pas créé d'étape parent.

**Remarque** : vous pouvez choisir l'onglet à partir duquel le sous-test doit s'exécuter depuis les [**options avancées du sous-test**][1].

4. Avant d'enregistrer les étapes du test parent, connectez-vous au compte avec les identifiants adéquats dans l'outil d'enregistrement. Le test parent conservera ainsi l'état de votre test Browser obtenu après que toutes les étapes du sous-test ont été exécutées.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_iframe.mp4" alt="Relecture d'un sous-test dans un test parent" video="true"  width="100%">}}

5. Une fois connecté, cliquez sur **Start recording** pour commencer à enregistrer les étapes post-connexion de votre choix du test parent. Après avoir terminé l'enregistrement, cliquez sur **Save**.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_recording.mp4" alt="Enregistrement du test parent" video="true"  width="100%">}}

 Dans l'exemple ci-dessus, le sous-test de connexion vérifie qu'un utilisateur, une fois connecté à un compte test Datadog, peut créer un timeboard. Ce timeboard est alors associé à l'utilisateur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/advanced_options#subtests