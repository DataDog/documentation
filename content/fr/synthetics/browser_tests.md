---
title: Test Browser
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
  - link: synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
## Présentation

Les tests Browser sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs appareils. Ces checks vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

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
4. **Devices** : les appareils sur lesquels votre check doit être lancé. Les appareils disponibles sont `Laptop Large`, `Tablet` et `Mobile Small`.
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacement privé][3] pour lancer un test Browser de Synthetics sur une URL privée qui n'est pas accessible à partir de l'Internet public.
6. **How often should Datadog run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois toutes les 15 minutes à une fois par semaine. [Contactez l'assistance][4] pour accéder à d'autres options de fréquence pour votre test.

### Conditions d'alerte

Une alerte est déclenchée si une assertion échoue pendant `<INSÉRER_NOMBRE>` minutes depuis `<INSÉRER_NOMBRE>` emplacements sur `<NOMBRE_EMPLACEMENTS_CHOISIS>`.

### Notifications

Pour configurer vos notifications :

1. Saisissez un **message** pour le test Browser. Ce champ accepte l'utilisation du [format de mise en forme Markdown][5] standard. Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les assertions qui ont échoué et les raisons de cet échec.
2. Choisissez vos [services][6] et/ou les membres de votre équipe qui doivent être notifiés.
3. Cliquez sur **Save Details and Record Test** pour enregistrer votre test Browser.
4. Démarrez l'enregistrement de votre test.

## Enregistrer un test

Les tests peuvent uniquement être enregistrés à partir de **[Google Chrome][7]**. Pour enregistrer votre test, téléchargez l'[extension d'enregistrement de test Datadog pour Google Chrome][8].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrer le test Browser" responsive="true" >}}

1. Facultatif : sélectionnez **Open in a pop-up** dans le coin supérieur droit de la page pour ouvrir l'enregistrement du test dans une fenêtre contextuelle séparée. Vous éviterez ainsi tout problème de dimensionnement dans la fenêtre affichée dans l'interface Datadog.
2. Cliquez sur **Start recording** pour commencer l'enregistrement de votre test Browser.
3. Vos actions sont enregistrées et utilisées pour créer des étapes dans le scénario de votre test Browser. Vous pouvez enregistrer l'importation de fichiers en tant qu'action, mais il existe une limite de 10 fichiers (et de 5 Mo par fichier).
4. Utilisez les actions disponibles en haut à gauche pour enrichir votre scénario :
    {{< img src="synthetics/browser_tests/browser_check_assertions.png" alt="Étapes du test Browser" responsive="true" style="width:80%;">}}

    **Remarque** : **la dernière étape de votre test Browser doit être une assertion**. Autrement, il n'y a rien à vérifier.
5. Une fois votre scénario terminé, cliquez sur **Save and Launch Test**.

## Actions
### Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Assertion du test Browser" responsive="true" style="width:40%;">}}

Les assertions vous permettent de vérifier si un élément, du contenu ou du texte est disponible sur la page en cours. Vous pouvez également vérifier si un e-mail spécifique a été envoyé.
Le délai d'expiration par défaut pour chaque étape est d'environ 60 secondes. Vous pouvez remplacer le délai d'expiration pour `Assert that an element is present on the page` en affichant les détails de l'étape et en modifiant la valeur de l'option `Timeout` (en secondes).

| Assertion                                                 | Description                                                                                                                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Test that an element is present on the active page`      | Vérifie qu'un élément spécifique (`span`, `div`, `h`, `a`, etc.) est présent sur la page actuelle.                                                                             |
| `Test an element's content`                               | Sélectionne un élément et vérifie s'il contient une valeur spécifique. Il est par exemple possible de sélectionner un `div` et de vérifier s'il contient ou non le mot « hello ».                                  |
| `Test that some text is present on the active page`       | Vérifie qu'un texte spécifique est présent sur la page actuelle.                                                                                                                        |
| `Assert that some text is not present on the active page` | Vérifie qu'une chaîne de texte spécifique est **ABSENTE** de la page actuelle.                                                                                                                |
| `Test the content of the URL of the active page`          | Récupère l'URL de la dernière page utilisée, puis vérifie si une valeur spécifique (`string`, `number`, `regex`) est présente dans l'URL.                                     |
| `Test that an email was received`                         | Vérifie qu'un e-mail a été envoyé et si certaines valeurs spécifiques (`string`, `number`, `regex`) sont présentes dans l'objet ou le corps de cet e-mail. Cette assertion a recours aux [variables d'e-mail][9]. |

La section *Advanced options* des assertions vous permet de spécifier un localisateur personnalisé, à savoir une expression Xpath ou une classe/un ID CSS à utiliser pour la sélection d'un élément HTML quelconque. Il peut par exemple s'agir d'un `div`, `h1` ou `.hero-body`. Une fois l'élément défini, sélectionnez **Test** pour mettre en évidence l'élément dans l'enregistrement sur la droite. Si le localisateur défini échoue, le résultat du test est par défaut un échec. Vous pouvez choisir de repasser sur l'algorithme habituel des tests Browser en décochant la case `If user specified locator fails, fail test`.

### Navigation

Utilisez l'action Navigation pour :

* Actualiser la page actuelle du scénario.
* Suivre un lien spécifique. Dans la zone « Enter link URL », vous devez ajouter le préfixe `http` or `https` devant vos URL.
* Accéder à un e-mail et cliquer sur un lien. Cette étape vous permet d'accéder à votre boîte de réception Synthetics une fois la [variable d'e-mail][9] créée. Choisissez l'e-mail de votre choix et cliquez sur le lien sur lequel le test Browser doit cliquer.

### Hover

Cette étape du test Browser n'est pas ajoutée en faisant passer le curseur sur un élément (sinon, chaque élément sur lequel vous passez le curseur serait ajouté comme une étape). Son ajout se fait via une action dédiée et un clic.

Après avoir sélectionné l'action Hover, cliquez sur l'élément que vous souhaitez sélectionner pour créer une étape.

### Variable

#### Créer une variable

{{< img src="synthetics/browser_tests/browser_test_variables.mp4" alt="Définir une variable" video="true" responsive="true" width="60%">}}

Pour créer une variable, donnez-lui d'abord un nom, puis définissez sa valeur parmi les propositions suivantes :

* **Element** : créez une variable à partir d'un `span`, `div`, ou d'un autre élément en extrayant le texte de cet élément.
* **Global Variable** : stockez et utilisez des global variables à l'aide des [paramètres Synthetics][10].
* **Email** : générez une adresse e-mail Synthetics aléatoire pouvant être utilisée durant les différentes étapes de votre test pour vérifier si un e-mail a bien été envoyé ou pour effectuer des actions à partir de son contenu (p. ex., cliquer sur un lien de confirmation).
* **Pattern** :

| Pattern                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `{{ numeric(n) }}`      | Génère une chaîne numérique de n chiffres.           |
| `{{ alphabetic(n) }}`   | Génère une chaîne alphabétique de n lettres.      |
| `{{ alphanumeric(n) }}` | Génère une chaîne alphanumérique de n caractères. |

#### Utiliser la variable

Une fois votre variable créée, utilisez-la pour définir un texte de saisie dans un formulaire ou une barre de recherche. Utilisez l'icône en forme de main dans la case de votre variable pour créer une étape de saisie :

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Saisie via une variable" video="true" responsive="true" width="80%" >}}

Vous pouvez également utiliser vos variables dans certaines assertions, notamment les suivantes :

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content
* Check that an email was received

Pour utiliser vos variables dans l'une de vos assertions, cliquez sur *Use Variable* et sélectionnez la variable que vous souhaitez utiliser :

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Utiliser une variable dans une assertion" responsive="true" style="width:40%;">}}

### Wait

Par défaut, Datadog attend que la page soit complètement chargée avant d'effectuer une action ou de passer à l'étape suivante, avec un délai d'expiration de 60 secondes. Toutefois, dans certains cas, il peut être préférable de définir un temps d'attente personnalisé. Par exemple, si vous savez que le chargement d'une page ou d'un élément d'une page peut prendre plus de 60 secondes, vous pouvez utiliser une étape Wait pour rallonger le délai d'expiration par défaut. Si vous choisissez d'utiliser cette fonctionnalité, la valeur de votre étape Wait ne doit pas dépasser 300 secondes. 

**Remarque** : le temps supplémentaire est rajouté de manière systématique à **chaque exécution** du scénario de votre test Browser.

### Sous-tests

Vous pouvez exécuter des tests Browser au sein d'autres tests Browser :

{{< img src="synthetics/browser_tests/browser_test_subtest.mp4" alt="Sous-test de test Browser" video="true" responsive="true" width="40%" >}}

Grâce aux options avancées, vous pouvez également choisir le lieu d'exécution du sous-test :

* **Main** (valeur par défaut) : le sous-test s'exécute dans votre onglet principal, à la suite des autres étapes.
* **New** : le sous-test s'exécute dans un nouvel onglet, qui se ferme à la fin du sous-test. L'onglet ne peut donc pas être réutilisé.
* **Specific tab** : le sous-test s'exécute dans un onglet numéroté, qui peut être réutilisé par d'autres sous-tests.

En ouvrant votre sous-test dans l'onglet principal, celui-ci s'exécute à la suite de votre test principal. Il utilise ainsi l'URL de l'étape précédente. À l'inverse, si vous ouvrez votre sous-test dans un nouvel onglet, on dans un onglet spécifique, le test s'exécute sur l'URL de départ du sous-test.

**Remarque** : si vous souhaitez exécuter un sous-test de façon indépendante, vous avez la possibilité de le mettre en pause. Il recevra toujours des appels dans le cadre du test principal, mais ne sera pas exécuté de façon individuelle.

## Échec d'un test et erreurs

Un test échoue (`FAILED`) lorsque ses assertions ne sont pas satisfaites ou lorsque la requête a échoué pour une autre raison. Cliquez sur une erreur dans les résultats de l'étape pour afficher ses détails.

Les erreurs les plus courantes comprennent :

| Error                                | Description                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `Element located but it's invisible` | L'élément est présent sur la page, mais il n'est pas possible de cliquer dessus (parce qu'un autre élément est superposé par-dessus, par exemple).       |
| `Cannot locate element`              | L'élément est introuvable sur la page HTML.                                                                             |
| `Select did not have option`         | L'option spécifiée ne figure pas dans le menu déroulant.                                                              |
| `Forbidden URL`                      | Le test a probablement rencontré un protocole non pris en charge. Contactez l'[assistance Datadog][4] pour en savoir plus. |
| `General test failure`               | Un message d'erreur général. [Contactez l'assistance][4] pour en savoir plus.                                                   |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/identify_synthetics_bots
[2]: /fr/api/?lang=bash#get-available-locations
[3]: /fr/synthetics/private_locations
[4]: /fr/help
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /fr/integrations/#cat-notification
[7]: https://www.google.com/chrome
[8]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[9]: /fr/synthetics/browser_tests/#create-a-variable
[10]: /fr/synthetics/settings/#secure-credential