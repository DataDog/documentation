---
title: Test navigateur
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
    text: Surveillance de l'expérience utilisateur avec les tests navigateur
  - link: synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/api_tests
    tag: Documentation
    text: Configurer un test API
---
## Présentation

Les tests navigateur sont des scénarios exécutés par Datadog sur vos applications Web. Ils s'exécutent à des intervalles personnalisables, à partir de différents emplacements dans le monde entier et depuis plusieurs appareils. Ces checks vérifient que vos applications fonctionnent et répondent aux requêtes, et que les conditions définies dans vos scénarios sont satisfaites.

## Configuration

### Détails du test

Définir la configuration de votre test navigateur.

1. **Starting URL** : l'URL depuis laquelle le test de navigateur démarre le scénario.
    * Advanced Options (facultatif) : utiliser des en-têtes de requête ou des cookies personnalisés.
        * Headers : les en-têtes définis remplacent les en-têtes par défaut du navigateur. Par exemple, vous pouvez modifier le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
        * Cookies : les cookies définis sont ajoutés aux cookies du navigateur par défaut. Définissez plusieurs cookies en suivant le format `cookie1=<VOTRE_COOKIE_1>; cookie2=<VOTRE_COOKIE_2>`.

2. **Name** : le nom de votre test de navigateur.
3. **Select your tags** : les tags à appliquer à votre test navigateur. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la page Synthetics.
4. **Devices** : les appareils sur lesquels votre check doit être lancé. Les appareils disponibles sont `Laptop Large`, `Tablet` et `Mobile Small`.
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacement privé][3] pour lancer un test navigateur de Synthetics sur une URL privée qui n'est pas accessible à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois toutes les 5 minutes à une fois par semaine.

### Conditions d'alerte

Une alerte est déclenchée si une assertion échoue pendant `<INSÉRER_NOMBRE>` minutes depuis `<INSÉRER_NOMBRE>` emplacements sur `<NOMBRE_EMPLACEMENTS_CHOISIS>`.

### Notifications

Pour configurer vos notifications :

1. Saisissez un **message** pour le test navigateur. Ce champ accepte l'utilisation du [format de mise en forme Markdown][4] standard. Les messages de notification comprennent le **message** défini dans cette section ainsi que les informations sur les assertions qui ont échoué et les raisons de cet échec.
2. Choisissez les [services][5] et/ou les membres d'équipe à notifier.
3. Cliquez sur **Save Details and Record Test** pour enregistrer votre test navigateur.
4. Démarrez l'enregistrement de votre test.

## Enregistrer un test

Les tests peuvent uniquement être enregistrés avec **[Google Chrome][6]**. Pour enregistrer votre test, téléchargez [l'extension Datadog Record Test pour Google Chrome][7].

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Enregistrer le test navigateur" responsive="true" >}}

1. Facultatif : sélectionnez **Open in a pop-up** dans le coin supérieur droit de la page pour ouvrir l'enregistrement du test dans une fenêtre contextuelle séparée. Vous éviterez ainsi tout problème de dimensionnement dans la fenêtre affichée dans l'interface Datadog.
2. Cliquez sur **Start recording** pour commencer l'enregistrement de votre test navigateur.
3. Vos actions sont enregistrées et utilisées pour créer des étapes dans le scénario de votre test de navigateur. Vous pouvez enregistrer l'importation de fichiers en tant qu'action, mais il existe une limite de 10 fichiers (et de 5 Mo par fichier).
4. Utilisez les actions disponibles en haut à gauche pour enrichir votre scénario :
    {{< img src="synthetics/browser_tests/browser_check_assertions.png" alt="Assertions du test navigateur" responsive="true" style="width:80%;">}}

    **Remarque** : **la dernière étape de votre test de navigateur doit être une assertion**. Autrement, il n'y a rien à vérifier.
5. Une fois votre scénario terminé, cliquez sur **Save and Launch Test**.

### Actions
#### Assertion

{{< img src="synthetics/browser_tests/assertions_browser_check.png" alt="Assertion du test navigateur" responsive="true" style="width:40%;">}}

Les assertions vous permettent de vérifier si un élément, du contenu ou du texte est disponible sur la page en cours. Le délai d'expiration par défaut pour chaque étape est d'environ 60 secondes. Vous pouvez remplacer le délai d'expiration pour `Assert that an element is present on the page` en affichant les détails de l'étape et en modifiant la valeur de l'option `Timeout` (en secondes).

| Assertion                                               | Description                                                                                                                      |
| ----                                                    | ----                                                                                                                             |
| `Assert that an element is present on the page`         | Vérifie qu'un élément spécifique (`span`, `div`, `h`, `a`, etc.) est présent sur la page actuelle.                       |
| `Check an element's content`                            | Vérifie que le contenu d'un élément spécifique est présent sur la page actuelle.                                                        |
| `Assert that some text is present anywhere on the page` | Vérifie qu'un texte spécifique est présent sur la page actuelle.                                                                  |
| `Assert that some text is nowhere on the page`          | Vérifie qu'un texte spécifique n'est **PAS** présent sur la page actuelle.                                                          |
| `Check main page URL's content`                         | Récupère l'URL de la dernière page utilisée, puis vérifie si une valeur spécifique (`string`, `number`, `regex`) est présente dans l'URL. |

Les options avancées pour les assertions vous permettent de spécifier une expression Xpath ou une classe/un ID CSS à utiliser pour la sélection d'un élément HTML quelconque. Il peut par exemple s'agir d'un `div`, `h1` ou `.hero-body`. Une fois l'élément défini, sélectionnez **Test** pour mettre en évidence l'élément dans l'enregistrement sur la droite.

#### Navigation

Utilisez l'action Navigation pour :

* Actualiser la page actuelle du scénario.
* Suivre un lien spécifique.

**Remarque** : dans la zone « Enter link URL », vous devez ajouter le préfixe `http` ou `https` aux URL.

#### Hover

Cette étape du test navigateur n'est pas ajoutée en faisant passer le curseur sur un élément (sinon, chaque élément sur lequel vous passez le curseur serait ajouté comme une étape). Son ajout se fait via une action dédiée ainsi qu'un clic.

Après avoir sélectionné l'action Hover, cliquez sur l'élément que vous souhaitez sélectionner pour créer une nouvelle étape.

#### Variable

##### Créer une variable

{{< img src="synthetics/browser_tests/setup_variable.png" alt="Configurer une variable" responsive="true" style="width:80%;">}}

Pour créer une variable, donnez-lui d'abord un nom, puis définissez sa valeur parmi :

* **Element** : créer une variable à partir d'un `span`, `div`, etc. en extrayant le texte de cet élément.
* **Secure Credential** : stocker et utiliser des identifiants sécurisés au moyen des [paramètres Synthetics][8].
* **Pattern** :

| Expression                 | Description                                         |
| ----                    | ---                                                 |
| `{{ numeric(n) }}`      | Génère une chaîne numérique à n chiffres.           |
| `{{ alphabetic(n) }}`   | Génère une chaîne alphabétique de n lettres.      |
| `{{ alphanumeric(n) }}` | Génère une chaîne alphanumérique de n caractères. |

##### Utiliser la variable

Une fois créée, utilisez la variable pour définir un texte de saisie dans un formulaire ou dans la barre de recherche. Utilisez l'icône en forme de main dans la case de votre variable pour créer une étape de saisie :

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Saisie via une variable" video="true" responsive="true" width="80%" >}}

Vous pouvez également utiliser vos variables dans certaines assertions, notamment les suivantes :

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content

Pour utiliser vos variables dans l'une de vos assertions, cliquez sur *Use Variable* et sélectionnez la variable que vous souhaitez utiliser :

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Utiliser une variable dans une assertion" responsive="true" style="width:40%;">}}

#### Échec d'un test et erreurs

Un test échoue (`FAILED`) lorsque ses assertions ne sont pas satisfaites ou lorsque la requête a échoué pour une autre raison. Cliquez sur une erreur dans les résultats de l'étape pour afficher ses détails.

Les erreurs les plus courants comprennent :

| Erreur           | Description                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Element located but it's invisible`             | L'élément est présent sur la page, mais il n'est pas possible de cliquer dessus (parce qu'un autre élément est superposé par-dessus, par exemple).                                                          |
| `Cannot locate element` | L'élément est introuvable sur la page HTML.                                                                                                                             |
| `Select did not have option`             | L'option spécifiée ne figure pas dans le menu déroulant.                                                                                     |
| `Forbidden URL`         | Le test a probablement rencontré un protocole non pris en charge. Contactez [l'assistance Datadog][9] pour en savoir plus.  |
| `General test failure`       | Message d'erreur générique. [Contactez l'assistance][9] pour en savoir plus. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/identify_synthetics_bots
[2]: /fr/api/?lang=bash#get-available-locations
[3]: /fr/synthetics/private_locations
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /fr/integrations/#cat-notification
[6]: https://www.google.com/chrome
[7]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[8]: /fr/synthetics/settings/#secure-credential
[9]: /fr/help