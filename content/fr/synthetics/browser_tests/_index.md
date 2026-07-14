---
aliases:
- /fr/synthetics/browser_check
- /fr/synthetics/browser_test
description: Simulez et surveillez des parcours utilisateur à partir d'emplacements
  spécifiques.
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: Documentation
  text: Démarrage des tests de navigateur
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
- link: /synthetics/guide/version_history/
  tag: Guide
  text: Historique des versions de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: 'Centre d''apprentissage Datadog : Premiers pas avec les tests de navigateur
    Synthetic'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Bonnes pratiques pour la création de tests de bout en bout
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplifier le dépannage tout au long du parcours utilisateur avec Datadog
    Synthetic Monitoring
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Comment j'ai aidé mon client à faire évoluer ses tests de navigateur avec
    Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Site externe
  text: Créer et gérer des tests Browser Synthetic avec Terraform
title: Tests de navigateurs
---
## Aperçu {#overview}

Les tests de navigateur sont des scénarios exécutés par Datadog sur vos applications web. Ils s'exécutent à des intervalles périodiques configurables depuis plusieurs emplacements dans le monde, à partir de plusieurs navigateurs et appareils. Ces tests vérifient à la fois que vos applications sont opérationnelles et répondent aux demandes, et que toutes les conditions définies dans vos scénarios sont remplies.

<div class="alert alert-info">Si vous êtes intéressé par le test d'applications derrière la MFA, lisez <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">le guide dédié </a> et <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">envoyez vos retours</a> à l'équipe Synthetic Monitoring pour aider à améliorer les systèmes qui comptent le plus pour vos équipes.</div>

## Configuration du test {#test-configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

### Créer un test à partir d'un modèle {#create-a-test-from-a-template}

  1. Survolez l'un des modèles pré-remplis et cliquez sur **Voir le modèle**. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, y compris : Détails du test, Conditions d'alerte, Étapes et éventuellement Variables.
  2. Cliquez sur **+Créer un test** pour ouvrir la page de configuration, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
  3. Cliquez sur **Enregistrer et quitter** dans le coin supérieur droit pour soumettre votre test de navigateur.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Vidéo de la page d'accueil des tests de navigateur synthétiques avec des modèles" video="true" >}}

### Créez un test à partir de zéro {#build-a-test-from-scratch}

  1. Cliquez sur le **+** modèle pour commencer un nouveau test de navigateur à partir de zéro.
  1. Entrez une **URL de départ** : L'URL à partir de laquelle votre test de navigateur commence le scénario.
  1. Ajoutez un **nom** : Le nom de votre test de navigateur.
  1. Sélectionnez **l'environnement et les balises supplémentaires** : Définissez les `env` et les balises associées à votre test de navigateur. Utilisez le format `<KEY>:<VALUE>` pour filtrer sur un `<VALUE>` pour un `<KEY>` donné.

  <div class="alert alert-info">Voir <a href=#advanced-options>Options avancées</a> pour plus d'options.</div>

  5. Sélectionnez **navigateurs et appareils** : Les navigateurs (comme `Chrome`, `Firefox` et `Edge`), et les appareils (comme `Laptop Large`, `Tablet` et `Mobile Small`) sur lesquels exécuter votre test.

      - Pour un grand ordinateur portable, les dimensions sont de 1440 pixels x 1100 pixels.
      - Pour une tablette, les dimensions sont de 768 pixels x 1020 pixels.
      - Pour un petit appareil mobile, les dimensions sont de 320 pixels x 550 pixels.

  6. Sélectionnez **emplacements gérés et privés** : Sélectionnez parmi une liste d'[emplacements](#locations) dans le monde qui sont gérés par Datadog, ou créez des [emplacements privés][1] pour exécuter votre test de navigateur depuis des emplacements personnalisés ou à l'intérieur de réseaux privés.

     **Note** : Vous pouvez également utiliser le [Continuous Testing Tunnel][2] pour déclencher des tests sur votre configuration de développement local ou dans votre pipeline CI/CD pour tester des environnements internes.

  7. Définissez la **fréquence de test** : Les intervalles varient de toutes les cinq minutes à une fois par semaine. Pour demander une fréquence d'une minute, [contactez le support][3].
  8. Cliquez sur **Enregistrer et modifier l’enregistrement** pour soumettre votre test de navigateur.

### Emplacements {#locations}

{{% managed-locations %}}

### Extraits {#snippets}

Lors de la configuration d'un nouveau test de navigateur Synthetic Monitoring, utilisez des extraits pour remplir automatiquement vos appareils et régions, plutôt que de sélectionner ces options manuellement. Les extraits suivants sont disponibles :

* **Tailles d'écran** : Effectuez automatiquement vos tests de navigateur sur un écran de taille spécifiée sur différents navigateurs :
   * **Grand**
   * **Tablette**
   * **Mobile**

* **Vérification multi-région** : Testez automatiquement votre site web contre un emplacement dans chacune des trois principales régions géographiques (AMER, APAC et EMEA).
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="Capture d'écran du côté gauche de la création d'un test de navigateur, montrant des exemples d’extraits" width="70%" >}}

### Options avancées {#advanced-options}

{{< tabs >}}

   {{% tab "Options de requête" %}}

   Sélectionnez **Désactiver CORS** pour empêcher la politique de partage des ressources entre origines (CORS) de bloquer votre test. Pour empêcher la politique de sécurité du contenu (CSP) de bloquer votre test, sélectionnez **Désactiver CSP**.

   * **En-têtes de demande** : Définissez des en-têtes dans les champs **Nom** et **Valeur** à ajouter ou à remplacer les en-têtes par défaut du navigateur. Par exemple, vous pouvez définir l'agent utilisateur dans l'en-tête pour [identifier les scripts Datadog][1].
   * **Cookies** : Définissez des cookies à ajouter aux cookies par défaut du navigateur. Entrez un cookie par ligne, en utilisant la syntaxe de [`Set-Cookie`][2].
   * **Authentification HTTP** : Authentifiez-vous via HTTP Basic, Digest ou NTLM avec un nom d'utilisateur et un mot de passe. Vos identifiants sont utilisés à chaque étape de votre test de navigateur. **Remarque** : L'authentification via HTTP Basic peut être utilisée pour les sites web qui demandent des identifiants utilisateur via une invite système du navigateur.

   Les options de requête sont définies à chaque exécution de test. Elles sont appliquées à toutes les étapes de votre test Browser lors de son exécution, et non lors de son enregistrement. Si vous souhaitez que ces options restent actives lors de l'enregistrement des étapes suivantes, appliquez-les manuellement sur la page à partir de laquelle l'enregistrement est effectué, puis créez les prochaines étapes de votre test.


[1]: /fr/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "Certificat" %}}

   Sélectionnez **Ignorer l'erreur de certificat serveur** pour indiquer au test d'ignorer les erreurs dans le certificat du serveur.

   * **Certificat client** : Effectuez des tests sur des systèmes qui nécessitent des certificats clients en cliquant sur **Télécharger le fichier** et en téléchargeant votre fichier de certificat et votre clé privée. Seuls les certificats PEM sont acceptés.
   * **Domaines de certificat client** : Une fois les fichiers de certificat téléchargés, le certificat client s'applique au domaine de l'URL de départ. Pour appliquer le certificat client sur un autre domaine, spécifiez le domaine dans le champ **Valeur**.

   L'URL peut inclure des wildcards.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Entrez une URL pour un proxy par lequel vous souhaitez envoyer des requêtes dans le champ **URL du proxy** en tant que `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

   Vous pouvez inclure des [variables globales](#use-global-variables) dans l'URL.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   Sélectionnez **Ne pas capturer de captures d'écran pour ce test** pour empêcher la prise de captures d'écran lors de vos étapes de test.

   Cette option de confidentialité est proposée sous la forme d'[option avancée][1] au niveau des étapes de chaque test. Elle vous permet d'éviter d'inclure des données sensibles dans les résultats de vos tests. Empêcher le test de prendre des captures d'écran rend le dépannage des échecs plus difficile. Pour plus d'informations, voir [Sécurité des données][2].

[1]: /fr/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /fr/data_security/synthetics
   {{% /tab %}}

   {{% tab "URL de départ" %}}

   Indiquez le temps (en secondes) que le test doit attendre avant de déclarer que l'étape de test initiale a échoué.

   {{% /tab %}}

   {{% tab "Temps & Langue" %}}

  Par défaut, le fuseau horaire est réglé sur UTC et la langue est réglée sur l'anglais (en). Pour définir une langue, utilisez le code [ISO correspondant à 2 ou 3 chiffres][1].

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "Requêtes bloquées" %}}

   Entrez un ou plusieurs modèles de requêtes à bloquer lors du chargement pendant l'exécution du test. Entrez un modèle de requête par ligne en utilisant le [format de modèle de correspondance][1]. Les caractères génériques (par exemple, `*://*.example.com/*`) sont pris en charge.

   Les requêtes bloquées sont ignorées pendant l'exécution du test mais n'affectent pas le rendu de la page lors de [l'enregistrement des étapes](/synthetics/browser_tests/test_steps). Consultez les requêtes bloquées dans l'onglet [Ressources](/synthetics/browser_tests/test_results#resources) des exécutions de test. Les requêtes bloquées ont un statut de `blocked`.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### Utiliser des variables globales {#use-global-variables}

Vous pouvez utiliser les [variables globales définies dans **Paramètres**][4] dans l'**URL de départ** et **Options avancées** des détails de votre test de navigateur, ainsi que dans votre enregistrement de test.

Pour afficher la liste des variables disponibles, procédez comme suit :

- Dans les détails de votre test de navigateur : Tapez `{{` dans le champ souhaité.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="Définir une variable locale à partir de variables globales" video="true" width="90%" >}}

- Dans l'enregistreur de votre test de navigateur : Importez la variable dans votre test, puis tapez `{{` dans le champ souhaité ou injectez la variable dans votre application pour l'utiliser.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="Injection d'une variable locale dans un champ lors d'un enregistrement de navigateur" video="true" width="90%" >}}

Pour plus d'informations sur l'utilisation des variables dans l'enregistrement de votre test de navigateur, consultez [Étapes du test de navigateur][5].

### Définir des conditions d'alerte {#define-alert-conditions}

Vous pouvez personnaliser des conditions d'alertes afin de définir les circonstances dans lesquelles vous souhaitez qu'un test envoie une notification.

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="Règle d'alerte de test de navigateur" style="width:80%" >}}

#### Règle d'alerte {#alerting-rule}

Une alerte est déclenchée si une assertion échoue pendant `X` minutes à partir de n'importe quel `n` des `N` emplacements. Cette règle d'alerte vous permet de spécifier combien de temps et dans combien d'emplacements un test doit échouer avant de déclencher la notification.

Une alerte est déclenchée uniquement si ces deux conditions sont vraies :

- Au moins un emplacement était en échec (au moins une assertion a échoué) pendant les dernières X minutes ;
- À un moment donné pendant les dernières X minutes, au moins `N` emplacements étaient en échec.

En cas d'échec, réessayez `X` fois avant que l'emplacement ne soit considéré comme ayant échoué. Cela vous permet de définir le nombre d'échecs consécutifs d’un test nécessaires pour qu’un emplacement soit considéré comme ayant échoué. Par défaut, il y a une attente de `300ms` avant de réessayer un test qui a échoué. Cet intervalle peut être configuré avec l'[API][6].

#### Réessai rapide {#fast-retry}

Lorsqu'un test échoue, le réessai rapide vous permet de réessayer le test X fois après Y ms avant de le marquer comme échoué. La personnalisation de l'intervalle de réessai permet de réduire les faux positifs et d'améliorer la précision de vos alertes.

Étant donné que la disponibilité de l'emplacement est calculée en fonction du résultat final du test après l'achèvement des réessais, les intervalles de réessai rapide ont un impact direct sur ce qui apparaît dans votre graphique de disponibilité totale. La disponibilité totale est calculée en fonction des conditions d'alerte configurées, et les notifications sont envoyées sur la base de cette disponibilité totale.

<div class="alert alert-info">
Pour plus d'informations sur la manière dont les notifications de Synthetic Monitoring évaluent les résultats des tests et déclenchent les alertes, consultez <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Understanding Synthetic Monitor Alerting</a>.
</div>

{{% synthetics-downtimes %}}

### Configurer le test monitor {#configure-the-test-monitor}

Une notification est envoyée conformément à l'ensemble des conditions d'alerte. Utilisez cette section pour définir comment et quel message envoyer à vos équipes.

1. Saisissez un **message** pour le test monitor ou utilisez les messages pré-remplis. Ce champ permet un formatage standard [Markdown][7] et prend en charge les [variables conditionnelles][8] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | Affiche sauf si le monitor correspond à la priorité (P1 à P5).                |

    Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Section du test monitor de Synthetic Monitoring, mettant en évidence les messages pré-remplis du monitor." style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{! Liste des variables extraites de toutes les étapes réussies }}
   # Variables extraites
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nom** : `
   **Valeur :** {{#if extractedValue.secure}}*Obfusqué (valeur cachée)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.
4. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be only recorded from [Google Chrome][10] and [Microsoft Edge][18]. To record your test, download the [Datadog Record Test extension][11].

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrement de test de navigateur" width="90%" >}}

1. Optionnellement, sélectionnez **Ouvrir dans une fenêtre pop-up** en haut à droite de la page pour ouvrir l'enregistrement de votre test dans une fenêtre pop-up distincte. Ceci est utile si votre application ne prend pas en charge l'ouverture dans un iframe ou si vous souhaitez éviter des problèmes de dimensionnement lors de l'enregistrement. Vous pouvez également ouvrir la fenêtre pop-up en **mode Incognito** pour commencer à enregistrer votre test à partir d'un navigateur frais, exempt de sessions déjà connectées, de cookies de votre navigateur existant, et plus encore.
2. Optionnellement, activez Datadog pour collecter automatiquement les données RUM lors de l'exécution des enregistrements d'étapes depuis votre test de navigateur. Pour plus d'informations, voir [Explorer RUM & Relecture de session][13].
3. Cliquez sur **Démarrer l'enregistrement** pour commencer l'enregistrement de votre test de navigateur.
4. Lorsque vous cliquez sur votre application en suivant le parcours utilisateur que vous souhaitez surveiller, vos actions sont automatiquement enregistrées et utilisées pour créer des [étapes][14] dans votre scénario de test de navigateur à gauche.
5. En plus des étapes automatiquement enregistrées, vous pouvez également utiliser les [étapes][14] disponibles dans le coin supérieur gauche pour enrichir votre scénario :
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Étapes de test de navigateur" style="width:80%;">}}

   Datadog recommande de terminer votre test de navigateur par une **[assertion][12]** pour confirmer que le parcours exécuté par le test de navigateur a abouti à l'état attendu.
6. Une fois que vous avez terminé votre scénario, cliquez sur **Enregistrer et lancer le test**.

## Rejouez vos étapes {#replay-your-steps}

Pour relancer une ou plusieurs étapes de votre test de navigateur directement dans votre navigateur, téléchargez l'[extension Datadog Record Test][11].

La fonctionnalité de Relecture des Étapes vous aide à déboguer des étapes individuelles, à atteindre le bon état d'application lors de l'édition d'un test de navigateur, et à confirmer des flux entiers avant d'enregistrer votre test.

**Remarque** : La Relecture des Étapes peut se comporter différemment d'un test complet de Surveillance Synthétique en raison de conditions différentes (version du navigateur, réseau, agent utilisateur, état de connexion) ou de limitations.

### Comment utiliser la relecture des étapes {#how-to-use-step-replay}

Vous pouvez rejouer les étapes de trois manières :

<strong>1. Relecture d'une seule étape :</strong> Réexécutez une seule étape :
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="Relecture d'une seule étape" video="true" height="400px" >}}
<p style="text-align: center;"><em>Survolez l'étape et cliquez sur le bouton de lecture pour rejouer uniquement cette étape.</em></p>

<strong>2. Rejouer toutes les étapes :</strong> Exécutez l'ensemble de la séquence d'étapes telle que définie dans l'enregistreur :
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="Rejouer toutes les étapes" video="true" height="400px" >}}
<p style="text-align: center;"><em>Cliquez sur le bouton de rejouer toutes les étapes (⏩︎) en haut de la liste des étapes pour rejouer toutes les étapes.</em></p>

<strong>3. Rejouer les étapes sélectionnées :</strong> Exécutez un sous-ensemble d'étapes que vous sélectionnez dans la liste des étapes :
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="Rejouer les étapes sélectionnées" video="true">}}
<p style="text-align: center;"><em>Sélectionnez les étapes que vous souhaitez rejouer, puis cliquez sur le bouton de rejouer les étapes sélectionnées (⏩︎) en haut de la liste des étapes.</em></p>

### Prise en charge de la fonctionnalité de relecture d'étape {#step-replay-feature-support}

Le tableau suivant résume les types d'étapes de test de navigateur pris en charge par la relecture d'étape :

| Type d'étape                | Pris en charge par le replay d'étape | Remarques |
|--------------------------|:------------------------:|-------|
| Extraire la variable         | {{< X >}}                       |       |
| Aller à l'URL                | {{< X >}}                       |       |
| Actualiser                  | {{< X >}}                       |       |
| Faire défiler               | {{< X >}}                       |       |
| Sélectionner une option     | {{< X >}}                       |       |
| Attendre                    | {{< X >}}                       |       |
| Exécuter le test API        | {{< X >}}                       |       |
| Vérifier l'état de la case à cocher    | {{< X >}}                       |       |
| Vérifier l'URL actuelle     | {{< X >}}                       |       |
| Vérifier l'attribut de l'élément | {{< X >}}                       |       |
| Vérifier le contenu de l'élément   | {{< X >}}                       |       |
| Vérifier la présence de l'élément   | {{< X >}}                       |       |
| Vérifier le téléchargement de fichier     | {{< X >}}                       |       |
| Vérifier que la page contient     | {{< X >}}                       |       |
| Vérifier que la page ne contient pas        | {{< X >}}                       |       |
| Vérifier depuis JavaScript   | {{< X >}}                       |       |
| Extraire depuis JavaScript  | {{< X >}}                       |       |
| Appuyer sur la touche                | {{< X >}}                       |       |
| Taper du texte                      | {{< X >}}                       |       |
| Cliquer                             | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| Survoler                            | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### Types d'étapes non pris en charge par la relecture d'étape {#step-types-not-supported-by-step-replay}

| Type d'étape                | Pris en charge par la relecture d'étape |
|--------------------------|:------------------------:|
| Vérifier l'email             | Pas encore pris en charge        |
| Vérifier les requêtes          | Pas encore pris en charge        |
| Extraire du corps de l'email  | Pas encore pris en charge        |
| Aller au lien de l'email         | Pas encore pris en charge        |
| Télécharger des fichiers             | Pas encore pris en charge        |

### Autorisation du débogueur {#debugger-permission}

Pour être aussi proche que possible d'un test complet de surveillance synthétique, certaines étapes comme les étapes basées sur JavaScript ou les simulations de frappes nécessitent l'autorisation du débogueur pour être répétées.

La première fois que l'extension est mise à jour vers une version nécessitant l'autorisation du débogueur, une demande d'autorisation apparaît et l'extension est désactivée jusqu'à ce que vous l'approuviez :
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="Accepter l'autorisation du débogueur" video="true" height="400px" >}}
<p style="text-align: center;"><em>Cliquez sur les trois points {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} du menu pour accepter l'autorisation.</em></p>

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs ayant les rôles [Administrateur Datadog et Standard Datadog][15] peuvent créer, modifier et supprimer des tests de navigateur synthétiques. Pour obtenir l'accès à la création, à la modification et à la suppression des tests de navigateur synthétiques, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][15].

Si vous utilisez la [fonctionnalité de rôle personnalisé][15], ajoutez votre utilisateur à tout rôle personnalisé qui inclut les permissions `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

Utilisez le [contrôle d'accès granulaire][17] pour limiter qui a accès à votre test en fonction des rôles, des équipes ou des utilisateurs individuels :

1. Ouvrez la section des permissions du formulaire.
2. Cliquez sur **Modifier l'accès**.
  {{< img src="synthetics/settings/grace_2.png" alt="Définissez les permissions pour votre test à partir du formulaire de configuration des emplacements privés" style="width:100%;" >}}
3. Cliquez sur **Restreindre l'accès**.
4. Sélectionnez des équipes, des rôles ou des utilisateurs.
5. Cliquez sur **Ajouter**.
6. Sélectionnez le niveau d'accès que vous souhaitez associer à chacun d'eux.
7. Cliquez sur **Terminé**.

<div class="alert alert-info">Vous pouvez voir les résultats d'un emplacement privé même sans accès de visualiseur à cet emplacement privé.</div>

| Niveau d'accès | Voir la configuration du test | Modifier la configuration du test | Voir les résultats du test | Exécuter le test  | Voir l'enregistrement | Modifier l'enregistrement |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| Pas d'accès    |                         |                         |                   |           |                |                |
| Visualiseur       | {{< X >}}               |                         | {{< X >}}         |           |                |                |
| Éditeur       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations/
[2]: /fr/continuous_testing/environments/proxy_firewall_vpn
[3]: /fr/help/
[4]: /fr/synthetics/settings/#global-variables
[5]: /fr/synthetics/browser_tests/test_steps#variables
[6]: /fr/api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /fr/synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /fr/synthetics/browser_tests/test_steps/#assertion
[13]: /fr/synthetics/guide/explore-rum-through-synthetics/
[14]: /fr/synthetics/browser_tests/test_steps/
[15]: /fr/account_management/rbac#custom-roles
[16]: /fr/account_management/rbac/#create-a-custom-role
[17]: /fr/account_management/rbac/granular_access
[18]: https://www.microsoft.com/edge
[19]: /fr/synthetics/guide/how-synthetics-monitors-trigger-alerts/