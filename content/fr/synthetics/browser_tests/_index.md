---
aliases:
- /fr/synthetics/browser_check
- /fr/synthetics/browser_test
description: Simulez et surveillez des parcours utilisateur à partir d'emplacements
  spécifiques.
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Surveillance de l'expérience utilisateur avec les tests Browser
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de tests de bout en bout
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /getting_started/synthetics/browser_test
  tag: Documentation
  text: Débuter avec les tests Browser
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Créer et gérer des tests Browser Synthetic avec Terraform
kind: documentation
title: Tests Browser
---

## Présentation

Les tests Browser sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs navigateurs et appareils. Ces tests vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

<div class="alert alert-info">Si vous souhaitez tester des applications qui nécessitent une authentification multifacteur, lisez <a href="/synthetics/guide/app-that-requires-login/#authentification-multifacteur" target="_blank">le guide dédié</a> et <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">partagez vos commentaires</a> avec l'équipe chargée de la surveillance Synthetic. Vos retours nous aident à améliorer les systèmes qui comptent le plus pour vos équipes.</div>

## Configuration du test

Définissez la configuration de votre test Browser.

1. Ajoutez une **Starting URL** : l'URL depuis laquelle le test Browser démarre le scénario.
2. Ajoutez des **Advanced Options** (facultatif) : définissez des options spécifiques pour votre test Browser.

   {{< tabs >}}

   {{% tab "Options de requête" %}}

   Sélectionnez l'option **Disable CORS** pour éviter que la stratégie Cross-Origin Resource Sharing (CORS) ne bloque votre test. Pour empêcher la Content Security Policy (CSP) de bloquer votre test, sélectionnez **Disable CSP**.

   * **Request Headers** : définissez les en-têtes dans les champs **Name** et **Value** à ajouter ou à utiliser pour remplacer les en-têtes par défaut du navigateur. Par exemple, vous pouvez modifier le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
   * **Cookies** : définissez les cookies à ajouter aux cookies par défaut du navigateur. Saisissez un cookie par ligne, en prenant soin de respecter la syntaxe de [`Set-Cookie`][2].
   * **HTTP Authentication** : effectuez l'authentification via HTTP Basic, Digest ou NTLM avec un nom d'utilisateur et un mot de passe. Vos identifiants sont utilisés lors de chaque étape de votre test Browser.

   Les options de requête sont définies à chaque exécution de test. Elles sont appliquées à toutes les étapes de votre test Browser lors de son exécution, et non lors de son enregistrement. Si vous souhaitez que ces options restent actives lors de l'enregistrement des étapes suivantes, appliquez-les manuellement sur la page à partir de laquelle l'enregistrement est effectué, puis créez les prochaines étapes de votre test.


[1]: /fr/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "Certificat" %}}

   Sélectionnez l'option **Ignore server certificate error** pour que le test ignore les erreurs liées au certificat du serveur.

   * **Client Certificate** : vous pouvez effectuer des tests sur des systèmes qui nécessitent des certificats client. Pour ce faire, cliquez sur **Upload File**, puis importez votre fichier de certificat et votre clé privée. Seuls les certificats PEM sont acceptés.
   * **Client Certificate Domains** : une fois les fichiers de certificat importés, le certificat client s'applique au domaine de l'URL de départ. Pour appliquer le certificat client à un autre domaine, spécifiez le domaine en question dans le champ **Value**.

   L'URL peut inclure des wildcards.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Saisissez dans le champ **Proxy URL** l'URL du proxy par lequel vous souhaitez que vos requêtes passent, en prenant soin de respecter le format `http://<VOTRE_UTILISATEUR>:<VOTRE_MDP>@<VOTRE_IP>:<VOTRE_PORT>`.

   L'URL peut inclure des [variables globales](#utiliser-des-variables-globales).

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   Sélectionnez l'option **Do not capture any screenshots for this test** pour empêcher les captures d'écran pendant les étapes de votre test.

   Cette option de confidentialité est proposée sous la forme d'[option avancée][1] au niveau des étapes de chaque test. Elle vous permet d'éviter d'inclure des données sensibles dans les résultats de vos tests. Il est plus difficile de diagnostiquer les échecs sans capture d'écran. Pour en savoir plus, consultez la [section relative à la sécurité][2].

[1]: /fr/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /fr/data_security/synthetics
   {{% /tab %}}

   {{% tab "URL de départ" %}}

   Indiquez le temps (en secondes) que le test doit attendre avant de déclarer que l'étape de test initiale a échoué.

   {{% /tab %}}

   {{< /tabs >}}

3. Ajoutez un **name** : le nom de votre test Browser.
4. Sélectionnez des **environment and additional tags** : définissez le tag `env` et les tags associés à appliquer à votre test Browser. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée.
5. Sélectionnez des **browsers and devices** : les navigateurs (comme `Chrome`, `Firefox` et `Edge`) et les appareils (comme `Laptop Large`, `Tablet` et `Mobile Small`) sur lesquels votre test doit être lancé.
   - Dimensions d'un grand ordinateur portable : 1 440 x 1 100 pixels
   - Dimensions d'une tablette : 768 x 1 020 pixels.
   - Dimensions d'un petit appareil mobile : 320 x 550 pixels.
6. Sélectionnez des **managed and private locations** : sélectionnez des emplacements dans le monde gérés par Datadog ou créez des [emplacements privés][1] pour lancer votre test Browser à partir d'emplacements personnalisés ou de réseaux privés.

   {{% managed-locations %}} 

   Vous pouvez également utiliser le [Tunnel de test en continu][15] pour déclencher des tests sur votre environnement de développement local ou au sein de votre pipeline CI/CD pour tester des environnements internes.

7. Définissez la **test frequency** : l'intervalle minimal est de cinq minutes, tandis que l'intervalle maximal est d'une semaine. [Contactez l'assistance][2] si vous souhaitez bénéficier d'une fréquence d'exécution d'une minute.

## Variables

### Créer des variables locales

Pour créer une variable locale, cliquez sur **Create Local Variable** en haut à droite de l'interface. Vous pouvez sélectionner l'un des builtins suivants :

`{{ numeric(n) }}`
: Génère une chaîne numérique de `n` chiffres.

`{{ alphabetic(n) }}`
: Génère une chaîne alphabétique de `n` lettres.

`{{ alphanumeric(n) }}`
: Génère une chaîne alphanumérique de `n` caractères.

`{{ uuid }}`
: Génère un identifiant unique universel (UUID) de version 4.

`{{ date(n unit, format) }}`
: Génère une date dans l'un des formats acceptés de Datadog. Sa valeur correspond à la date UTC d'initiation du test + ou - `n` unités.

`{{ timestamp(n, unit) }}` 
: Génère un timestamp dans l'une des unités acceptées de Datadog. Sa valeur correspond au timestamp UTC d'initiation du test + ou -  `n` unités.

Pour obfusquer les valeurs des variables locales dans les résultats des tests, sélectionnez **Hide and obfuscate variable value**. Une fois la chaîne de la variable définie, cliquez sur **Add Variable**.

### Utiliser des variables globales

Les [variables globales définies dans les **paramètres**][3] peuvent être utilisées dans les sections **Starting URL** et **Advanced Options** de votre test Browser, ainsi que dans votre enregistrement de test pour définir des variables locales. Pour afficher la liste des variables disponibles, saisissez `{{` dans le champ souhaité.

{{< img src="synthetics/browser_tests/recording_global_variable.mp4" alt="Définir une variable locale à partir de variables globales" video="true" width="90%" >}}

Définissez les variables que vous souhaitez incorporer dans le parcours utilisateur avant de commencer l'enregistrement.

{{< img src="synthetics/browser_tests/recording_inject_variable.mp4" alt="Injecter une variable locale dans un champ lors de l'enregistrement d'un test Browser" video="true" width="90%" >}}

Vous pouvez injecter les variables auxquelles vous avez accès pendant l'enregistrement. Pour découvrir comment utiliser des variables dans votre enregistrement de test Browser, consultez la section [Étapes des tests Browser][4].

### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alertes personnalisées afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Règle d'alerte du test Browser" style="width:80%" >}}

* An alert is triggered if any assertion fails for `X` minutes from any `n` of `N` locations (Déclencher une alerte si une assertion échoue pendant `X` minutes sur `n` des `N` emplacements). Cette règle d'alerte vous permet de spécifier le nombre d'échecs requis sur le nombre d'emplacements de votre choix avant de déclencher la notification.
* Retry `X` times before location is marked as failed (Réessayer `X` fois avant de signaler l'échec de l'emplacement). Cette option vous permet de définir le nombre d'échecs de test consécutifs requis avant qu'une assertion échoue pour un emplacement. Le temps d'attente entre chaque nouvelle tentative est de 300 ms par défaut. Cet intervalle peut être configuré via l'[API][5].

### Configurer le monitor de test

Votre test envoie une notification selon les conditions d'alerte définies. Cette section vous permet de définir les conditions et le message à envoyer à vos équipes.

1. Saisissez un **message** pour le test Browser. Ce champ accepte l'utilisation du [format de mise en forme Markdown][5] standard ainsi que les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le monitor envoie une alerte.                                       |
    | `{{^is_alert}}`            | S'affiche lorsque le monitor n'envoie pas d'alerte.                                     |
    | `{{#is_recovery}}`         | S'affiche lorsque le monitor est rétabli depuis un état `alert`.                          |
    | `{{^is_recovery}}`         | S'affiche lorsque le monitor n'est pas rétabli depuis un état `alert`.                        |
    | `{{#is_renotify}}`         | S'affiche lorsque le monitor renvoie des notifications.                                   |
    | `{{^is_renotify}}`          | S'affiche lorsque le monitor ne renvoie pas de notification.                                   |
    | `{{#is_priority}}`         | S'affiche lorsque le monitor correspond à la priorité (P1 à P5).                  |
    | `{{^is_priority}}`         | S'affiche lorsque le monitor ne correspond pas à la priorité (P1 à P5).                  |

    Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les emplacements présentant un échec.

2. Choisissez les services et les membres de votre équipe auxquels les notifications doivent être envoyées.
3. Indiquez une fréquence de renvoi de notifications. Pour éviter de renvoyer des notifications pour les tests qui ont échoué, choisissez l'option `Never renotify if the monitor has not been resolved`.
4. Cliquez sur **Save Details and Record Test** pour valider votre configuration de test et enregistrer vos étapes de test Browser.

Pour en savoir plus, consultez la section [Utiliser les monitors de test Synthetic][7].

## Enregistrer les étapes de votre test

Les tests peuvent uniquement être enregistrés à partir de [Google Chrome][8]. Pour enregistrer votre test, téléchargez l'[extension d'enregistrement de test Datadog pour Google Chrome][9].

Vous pouvez passer à un autre onglet lors de l'enregistrement d'un test Browser afin d'effectuer une action sur votre application (comme cliquer sur un lien qui s'ouvre dans un nouvel onglet) et ajouter une autre étape de test. Votre test Browser doit d'abord interagir avec la page (via un clic) avant de pouvoir effectuer une [assertion][10]. En enregistrant toutes les étapes de test, vous pouvez faire en sorte que le test Browser change d'onglet automatiquement lors de l'exécution du test.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrer le test Browser" width="90%" >}}

1. Vous pouvez sélectionner **Open in a pop-up** en haut à droite de la page pour ouvrir l'enregistrement de votre test dans une fenêtre contextuelle séparée. Cette option est utile si votre application ne peut pas être ouverte dans un iframe ou si vous voulez éviter les problèmes liés à la taille de la fenêtre lors de l'enregistrement. Il est également possible d'ouvrir la fenêtre contextuelle en **navigation privée** pour commencer à enregistrer votre test dans un nouveau navigateur sur lequel aucun identifiant, aucun cookie ni aucune autre information ne sont enregistrés.
2. Vous avez également la possibilité d'activer la collecte automatique de données RUM lors de l'enregistrement des étapes de votre test Browser. Pour en savoir plus, consultez la documentation relative à [RUM et à Session Replay][11].
3. Cliquez sur **Start Recording** pour commencer l'enregistrement de votre test Browser.
4. Lorsque vous cliquez dans votre application pour reproduire le parcours utilisateur que vous souhaitez surveiller, vos actions sont automatiquement enregistrées et utilisées pour créer des [étapes][12] dans le scénario de votre test Browser sur la gauche.
5. Outre les étapes enregistrées automatiquement, vous pouvez également utiliser les [étapes][12] disponibles en haut à gauche pour enrichir votre scénario :
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Étapes du test Browser" style="width:80%;">}}

   Datadog vous recommande de faire en sorte que votre test Browser se termine par une **[assertion][10]** confirmant la bonne exécution du parcours du test.
6. Une fois votre scénario terminé, cliquez sur **Save and Launch Test**.

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin et Standard Datadog][13] peuvent créer, modifier et supprimer des tests Browser Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][13]. 

Si vous utilisez des [rôles personnalisés][13], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][14] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez limiter l'accès d'un test Browser à certains rôles de votre organisation. Lors de la création du test Browser, choisissez les rôles (en plus de votre utilisateur) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations/
[2]: /fr/help/
[3]: /fr/synthetics/settings/#global-variables
[4]: /fr/synthetics/browser_tests/actions#variables
[5]: /fr/api/latest/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /fr/synthetics/guide/synthetic-test-monitors
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /fr/synthetics/browser_tests/actions/#assertion
[11]: /fr/synthetics/guide/explore-rum-through-synthetics/
[12]: /fr/synthetics/browser_tests/actions/
[13]: /fr/account_management/rbac#custom-roles
[14]: /fr/account_management/rbac/#create-a-custom-role
[15]: /fr/continuous_testing/testing_tunnel
