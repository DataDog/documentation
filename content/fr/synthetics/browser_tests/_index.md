---
title: Tests Browser
kind: documentation
description: Simulez et surveillez des parcours utilisateur à partir d'emplacements spécifiques.
aliases:
  - /fr/synthetics/browser_check
  - /fr/synthetics/browser_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: Blog
    text: Surveillance de l'expérience utilisateur avec les tests Browser
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: /synthetics/api_tests/
    tag: Documentation
    text: Configurer un test API
  - link: /synthetics/browser_tests/test_results/
    tag: Documentation
    text: Résultats de tests Browser
---
## Présentation

Les tests Browser sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs appareils. Ces tests vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

## Configuration

### Détails du test

Définir la configuration de votre test Browser.

1. **Starting URL** : l'URL depuis laquelle le test Browser démarre le scénario.
    * Advanced Options (facultatif) : définir des en-têtes de requête et des cookies personnalisés ou s'authentifier via l'authentification basique.
        * Headers : les en-têtes définis remplacent les en-têtes par défaut du navigateur. Par exemple, vous pouvez modifier le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
        * Authentication : s'authentifier via l'authentification HTTP basique avec un nom d'utilisateur et un mot de passe.
        * Cookies : les cookies définis sont ajoutés aux cookies de navigateur par défaut. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.

2. **Name** : le nom de votre test Browser.
3. **Select your tags** : les tags à appliquer à votre test Browser. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la page Synthetics.
4. **Devices** : les appareils sur lesquels votre test doit être lancé. Les appareils disponibles sont `Laptop Large`, `Tablet` et `Mobile Small`.
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez également configurer un [emplacement privé][2] pour lancer un test Browser de Synthetics sur une URL privée qui n'est pas accessible à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois toutes les 5 minutes à une fois par semaine.

### Utiliser des variables globales

Les [variables globales définies dans les **paramètres**][3] peuvent être utilisées dans l'URL et dans les options avancées de vos tests Browser. Pour afficher la liste de vos variables, saisissez `{{` dans le champ souhaité.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Utiliser des variables dans les tests Browser" video="true"  width="80%" >}}

### Définir des conditions d'alerte

Vous pouvez personnaliser des conditions d'alertes afin de définir les circonstances pour lesquelles vous souhaitez qu'un test envoie une notification.

* Une alerte se déclenche si une assertion échoue pendant `<INSÉRER_NOMBRE>` minutes depuis `<INSÉRER_NOMBRE>` emplacements sur `<NOMBRE_EMPLACEMENTS_CHOISIS>`. Cette règle d'alerte vous permet de spécifier le nombre d'échecs requis sur le nombre d'emplacements de votre choix avant de déclencher à nouveau l'utilisation de la notification.
* Réessayez `<INSÉRER_NOMBRE>` fois l'assertion avant de signaler l'échec de l'emplacement. Cela vous permet de définir le nombre d'échecs de test consécutifs requis avant de considérer l'échec d'un emplacement. Le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][4].

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Règle d'alerte du test Browser"  >}}

### Notify your team

Une notification est envoyée selon les conditions d'alerte définies. Pour configurer vos notifications :

1. Saisissez un **message** pour le test Browser. Ce champ accepte l'utilisation du [format de mise en forme Markdown][5] standard ainsi que les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Afficher en cas d'alerte du monitor                                            |
    | `{{^is_alert}}`            | Afficher sauf en cas d'alerte du monitor                                          |
    | `{{#is_recovery}}`         | Afficher lorsque le monitor est rétabli depuis un état ALERT   |
    | `{{^is_recovery}}`         | Afficher sauf si le monitor est rétabli depuis un état ALERT |

    Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les emplacements présentant un échec.

2. Choisissez vos [services][7] et/ou les membres de votre équipe qui doivent être notifiés.
3. Indiquez une fréquence de renvoi de notifications. Pour éviter de renvoyer des notifications pour les tests qui ont échoué, choisissez l'option `Never renotify if the monitor has not been resolved`.
4. Cliquez sur **Save Details and Record Test**.
5. Enregistrez votre test.

## Enregistrer un test

Les tests peuvent uniquement être enregistrés à partir de **[Google Chrome][8]**. Pour enregistrer votre test, téléchargez l'[extension d'enregistrement de test Datadog pour Google Chrome][9].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrer le test Browser"  >}}

1. Facultatif : sélectionnez **Open in a pop-up** dans le coin supérieur droit de la page pour ouvrir l'enregistrement du test dans une fenêtre contextuelle séparée. Vous éviterez ainsi tout problème de dimensionnement dans la fenêtre affichée dans l'interface Datadog.
Si vous sélectionnez **Open in a pop-up** tout en maintenant la touche **Maj** enfoncée, la fenêtre contextuelle s'ouvre en mode navigation privée. Cela vous permet d'enregistrer votre test dans un nouveau navigateur sur lequel aucun identifiant, aucun cookie ni aucune autre information ne sont enregistrés.
2. Cliquez sur **Start recording** pour commencer l'enregistrement de votre test Browser.
3. Vos actions sont enregistrées et utilisées pour créer des [étapes][10] dans le scénario de votre test Browser.
4. Utilisez les [étapes][10] disponibles en haut à gauche pour enrichir votre scénario :
    {{< img src="synthetics/browser_tests/browser_test_step.png" alt="Étapes du test Browser"  style="width:80%;">}}

    **Remarque** : **la dernière étape de votre test Browser doit être une [assertion][11]** confirmant la bonne exécution du parcours exécuté par le test Browser.
5. Une fois votre scénario terminé, cliquez sur **Save and Launch Test**.

## Étapes

Une fois votre test Browser enregistré, vous pouvez enregistrer des [étapes][10] que vous pouvez modifier ou enrichir.

Les étapes correspondent à une série d'actions enregistrées pour créer un test Browser, que vous pouvez ensuite modifier ou enrichir. Les étapes que votre test Browser doit exécuter peuvent être définies soit automatiquement à l'aide de l'extension d'enregistrement de test Datadog, soit manuellement en ajoutant vous-même l'étape de votre choix. Vous pouvez également configurer certaines étapes avec les [options avancées][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/identify_synthetics_bots/
[2]: /fr/synthetics/private_locations/
[3]: /fr/synthetics/settings/#global-variables
[4]: /fr/api/v1/synthetics/#create-or-clone-a-test
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /fr/monitors/notifications/?tab=is_alert#integrations
[7]: /fr/integrations/#cat-notification
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /fr/synthetics/browser_tests/actions/
[11]: /fr/synthetics/browser_tests/actions/#assertion
[12]: /fr/synthetics/browser_tests/advanced_options/