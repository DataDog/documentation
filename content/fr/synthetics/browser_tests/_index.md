---
title: Tests Browser
kind: documentation
description: Simulez et surveillez des parcours utilisateur à partir d'emplacements spécifiques.
aliases:
  - /fr/synthetics/browser_check
  - /fr/synthetics/browser_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: Blog
    text: Surveillance de l'expérience utilisateur avec les tests Browser
  - link: /getting_started/synthetics/browser_test
    tag: Documentation
    text: Débuter avec les tests Browser
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: Blog
    text: Pratiques recommandées pour la création de tests de bout en bout
  - link: /synthetics/guide/
    tag: Documentation
    text: Guides
---
## Présentation

Les tests Browser sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs navigateurs et appareils. Ces tests vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

<div class="alert alert-info">Vous souhaitez tester les applications qui nécessitent une authentification multifacteur ? Consultez <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">notre guide dédié</a> et <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">donnez-nous votre avis</a> pour nous aider à prendre en charge les systèmes qui comptent le plus pour vos équipes.</div>

## Configuration du test

Définissez la configuration de votre test Browser.

1. **Starting URL** : l'URL depuis laquelle le test Browser démarre le scénario.
2. **Advanced Options** (facultatif) : définissez des options spécifiques pour votre test Browser.
    * Headers : définissez les en-têtes à ajouter ou à utiliser pour remplacer les en-têtes par défaut du navigateur. Par exemple, vous pouvez modifier le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
    * Authentication : s'authentifier via l'authentification HTTP basique, Digest ou NTLM avec un nom d'utilisateur et un mot de passe.
    * Cookies : définissez les cookies à ajouter aux cookies de navigateur par défaut. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.
    * Proxy URL : URL du proxy à utiliser par les requêtes (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).

3. **Name** : le nom de votre test Browser.
4. **Select your tags** : les tags à appliquer à votre test Browser. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la page des tests Synthetic.
5. **Browsers & Devices** : Les navigateurs (`Chrome`, `Firefox`) et les appareils (`Laptop Large`, `Tablet`, `Mobile Small`) sur lesquels votre test doit être lancé.
6. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez également configurer des [emplacements privés][2] pour lancer votre test Browser à partir d'emplacements personnalisés ou de réseaux privés.
7. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois toutes les 5 minutes à une fois par semaine. L'exécution du test toutes les minutes est disponible [sur demande][3].

### Utiliser des variables globales

Les [variables globales définies sur la page **Settings**][4] peuvent être utilisées dans le champ **Starting URL** et dans les **Advanced Options** de vos tests Browser. Pour afficher la liste de vos variables, saisissez `{{` dans le champ souhaité.

{{< img src="synthetics/browser_tests/using_variables_browser.mp4" alt="Utiliser des variables dans les tests Browser" video="true"  width="80%" >}}

### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alertes personnalisées afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

* An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations. (Déclencher une alerte si une assertion échoue pendant `X` minutes sur `n` des `N` emplacements). Cette règle d'alerte vous permet de spécifier le nombre d'échecs requis sur le nombre d'emplacements de votre choix avant de déclencher la notification.
* Retry `X` times before location is marked as failed. (Réessayer `X` fois avant de signaler l'échec de l'emplacement). Cette option vous permet de définir le nombre d'échecs de test consécutifs requis avant qu'une assertion échoue pour un emplacement. Le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][5].

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Règle d'alerte du test Browser"  >}}

### Informer votre équipe

Une notification est envoyée selon les conditions d'alerte définies. Pour configurer vos notifications :

1. Saisissez un **message** pour le test Browser. Ce champ accepte le [format de mise en forme Markdown][6] standard ainsi que les [variables conditionnelles][7] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Afficher en cas d'alerte du monitor                                            |
    | `{{^is_alert}}`            | Afficher sauf en cas d'alerte du monitor                                          |
    | `{{#is_recovery}}`         | Afficher lorsque le monitor est rétabli depuis un état ALERT   |
    | `{{^is_recovery}}`         | Afficher sauf si le monitor est rétabli depuis un état ALERT |

    Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les emplacements présentant un échec.

2. Choisissez les [services][8] et/ou les membres de votre équipe auxquels les notifications doivent être envoyées.
3. Indiquez une fréquence de renvoi de notifications. Pour éviter de renvoyer des notifications pour les tests qui ont échoué, choisissez l'option `Never renotify if the monitor has not been resolved`.
4. Cliquez sur **Save Details and Record Test**.

## Enregistrer les étapes de votre test

Les tests peuvent uniquement être enregistrés à partir de **[Google Chrome][9]**. Pour enregistrer votre test, téléchargez l'[extension d'enregistrement de test Datadog pour Google Chrome][10].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrer le test Browser"  >}}

1. Vous pouvez sélectionner **Open in a pop-up** en haut à droite de la page pour ouvrir l'enregistrement de votre test dans une fenêtre contextuelle séparée. Cette option est utile si votre application ne peut pas être ouverte dans un iframe ou si vous voulez éviter les problèmes liés à la taille de la fenêtre lors de l'enregistrement. Vous pouvez également ouvrir la fenêtre contextuelle en **Navigation privée** pour commencer à enregistrer votre test dans un nouveau navigateur sur lequel aucun identifiant, aucun cookie ni aucune autre information ne sont enregistrés.
2. Cliquez sur **Start recording** pour commencer l'enregistrement de votre test Browser.
3. Lorsque vous cliquez dans votre application pour reproduire le parcours utilisateur que vous souhaitez surveillez, vos actions sont automatiquement enregistrées et utilisées pour créer des [étapes][11] dans le scénario de votre test Browser sur la gauche.
4. Outre les étapes enregistrées automatiquement, vous pouvez également utiliser les [étapes][11] disponibles en haut à gauche pour enrichir votre scénario :
    {{< img src="synthetics/browser_tests/manual_steps.png" alt="Étapes du test Browser"  style="width:80%;">}}

    **Remarque** : votre test Browser doit toujours **se terminer par une [assertion][12]** confirmant la bonne exécution du parcours du test.
5. Une fois votre scénario terminé, cliquez sur **Save and Launch Test**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/identify_synthetics_bots/
[2]: /fr/synthetics/private_locations/
[3]: /fr/help/
[4]: /fr/synthetics/settings/#global-variables
[5]: /fr/api/v1/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /fr/monitors/notifications/?tab=is_alert#integrations
[8]: /fr/integrations/#cat-notification
[9]: https://www.google.com/chrome
[10]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[11]: /fr/synthetics/browser_tests/actions/