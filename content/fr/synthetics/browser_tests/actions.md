---
title: Actions des tests Browser
kind: documentation
description: Enregistrer des actions pour un test Browser Synthetics
further_reading:
  - link: synthetics/browser_tests/advanced_options
    tag: Documentation
    text: Apprendre à configurer des options avancées pour des actions
---
Les actions correspondent à une série d'étapes enregistrées pour un test Browser, que vous pouvez ensuite modifier ou enrichir. Vous pouvez également configurer certaines actions avec les [options avancées][1].

**Remarque** : le délai d'expiration par défaut pour chaque étape est d'environ 60 secondes. Vous pouvez modifier le délai d'expiration avec les [options avancées][2].

## Click

L'[extension Datadog][3] enregistre automatiquement les clics sur votre page. 

Indiquez le type de clic que vous souhaitez que votre navigateur effectue lors de l'exécution du test :

{{< img src="synthetics/browser_tests/browser_test_click_step.mp4" alt="Étape Click d'un test Browser" video="true" width="60%">}}

Choisissez parmi les options suivantes :

* Primary click (correspond à un clic gauche)
* Double click
* Contextual click (correspond à un clic droit)

## Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Assertion de test Browser"  style="width:40%;">}}

Les assertions vous permettent de vérifier si un élément, du contenu ou du texte est disponible sur la page en cours. Vous pouvez également vérifier si un e-mail spécifique a été envoyé.

| Assertion                                                 | Description                                                                                                                                                                             |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Test an element's content`                               | Sélectionne un élément et vérifie s'il contient une valeur spécifique. Il est par exemple possible de sélectionner un `div` et de vérifier s'il contient ou non le mot « hello ».                                   |
| `Test that some text is present on the active page`       | Vérifie qu'un texte spécifique est présent sur la page actuelle.                                                                                                                         |
| `Test that some text is not present on the active page` | Vérifie qu'une chaîne de texte spécifique est **ABSENTE** de la page actuelle.                                                                                                                 |
| `Test the content of the URL of the active page`          | Récupère l'URL de la dernière page utilisée, puis vérifie si une valeur spécifique (`string`, `number`, `regex`) est présente dans l'URL.                                      |
| `Test that an element is present on the active page`      | Vérifie qu'un élément spécifique (`span`, `div`, `h`, `a`, etc.) est présent sur la page actuelle.                                                                              |
| `Test that an email was received`                         | Vérifie qu'un e-mail a été envoyé et si certaines valeurs spécifiques (`string`, `number`, `regex`) sont présentes dans l'objet ou le corps de cet e-mail. Cette assertion a recours aux [variables d'e-mail][4]. |
| `Test a JavaScript assertion`                         | Permet de tester une assertion personnalisée à l'aide de vos propres scripts JavaScript. Par défaut, l'assertion est effectuée sur la page active. Si vous souhaitez que votre fonction JavaScript fasse appel à un élément de page spécifique, vous pouvez le sélectionner via l'option **Target Element**, puis l'appeler à l'aide du paramètre `element` dans votre fonction. |

Des [options avancées][1] sont également disponibles pour les assertions.

## Navigation

L'action Navigation vous permet d'effectuer les actions suivantes :

* Actualiser la page actuelle du scénario.
* Suivre un lien spécifique. Dans la zone **Enter link URL**, vous devez ajouter le préfixe `http` ou `https` devant vos URL.
* Accéder à un e-mail et cliquer sur un lien. Cette étape vous permet d'accéder à votre boîte de réception Synthetics une fois la [variable d'e-mail][4] créée.
* Choisissez un e-mail et cliquez sur le lien sur lequel le test Browser doit cliquer.

## Actions spéciales

[L'extension Datadog fournie][3] enregistre la plupart des actions. Toutefois, certaines actions (comme le passage du curseur sur un élément, la sélection d'une touche et le défilement) ne sont pas enregistrées automatiquement. Ajoutez explicitement une étape pour celles-ci à l'aide du menu **Special Actions** situé en haut à gauche de l'enregistreur.

### Hover

Cette étape du test Browser n'est pas ajoutée en faisant passer le curseur sur un élément (sinon, chaque élément sur lequel vous passez le curseur serait ajouté comme une étape). Son ajout se fait via une action dédiée et un clic.

Après avoir sélectionné l'action Hover, cliquez sur l'élément que vous souhaitez sélectionner pour créer une étape.

### Press key

Vous pouvez simuler la sélection de touches par un utilisateur à l'aide d'étapes **Press Key**. Les touches suivantes peuvent être enregistrées à l'aide de l'[extension Datadog][3] :

* Entrée
* Touches fléchées (haut, bas, droite et gauche)
* Tabulation (en dehors d'un formulaire)
* Échap 
* Retour arrière

Pour appuyer sur des touches qui ne sont pas enregistrées automatiquement, indiquez les valeurs des touches qui doivent être sélectionnées dans le champ Value de l'action spéciale **Press Key** :

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Action Press Key de test Browser"  style="width:60%;">}}

Les modificateurs ci-dessous peuvent également être appliqués à la valeur saisie :

* Alt
* Control
* Meta
* Shift

### Scroll

Votre test Browser fait automatiquement défiler la page jusqu'à l'élément avec lequel il doit interagir. Par conséquent, dans la plupart des cas, il n'est pas nécessaire d'ajouter manuellement une étape de défilement. L'étape de défilement doit être ajoutée uniquement lorsque celle-ci est nécessaire pour déclencher une requête réseau supplémentaire, comme dans un défilement infini.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Étape Scroll de test Browser"  style="width:60%;">}}

Vous devez indiquer le nombre de pixels que votre test Browser doit faire défiler dans le sens horizontal ou vertical.

Par défaut, l'étape Scroll fait défiler l'ensemble de la page. Si vous souhaitez que votre test Browser fasse défiler un élément spécifique (par exemple, un `<div>` spécifique), utilisez l'option **Target Element** pour le sélectionner.

## Upload

Vous pouvez enregistrer l'importation de fichiers en tant qu'action. Pour enregistrer une étape Upload, vous disposez de deux options :

* ouvrez votre bureau depuis votre navigateur ; ou
* faites glisser votre fichier dans l'iframe d'enregistrement.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Créer une étape d'importation de fichiers"  style="width:50%;">}}

Une limite de 10 fichiers (et de 5 Mo par fichier) s'applique.

## Variable

### Créer une variable

{{< img src="synthetics/browser_tests/browser_test_variables.mp4" alt="Définir une variable" video="true"  width="60%">}}

Pour créer une variable, donnez-lui d'abord un nom, puis définissez sa valeur parmi les propositions suivantes :

* **Element** : créez une variable à partir d'un `span`, `div`, ou d'un autre élément en extrayant le texte de cet élément.
* **JavaScript** : générez des variables personnalisées à l'aide de vos propres scripts JavaScript. Par défaut, l'étape est effectuée au niveau de la page. Si vous souhaitez que votre fonction JavaScript fasse appel à un élément spécifique d'une page, vous pouvez le sélectionner via l'option **Target Element**, puis l'appeler à l'aide du paramètre `element` dans votre fonction.
* **Global Variable** : stockez et utilisez des variables globales à l'aide des [paramètres Synthetics][5].
* **Email** : générez une adresse e-mail Synthetics aléatoire pouvant être utilisée durant les différentes étapes de votre test pour vérifier si un e-mail a bien été envoyé ou pour effectuer des actions à partir de son contenu (p. ex., cliquer sur un lien de confirmation).
* **Pattern** :

| Pattern                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `{{ numeric(n) }}`      | Génère une chaîne numérique de n chiffres.           |
| `{{ alphabetic(n) }}`   | Génère une chaîne alphabétique de n lettres.      |
| `{{ alphanumeric(n) }}` | Génère une chaîne alphanumérique de n caractères. |

### Utiliser la variable

Une fois votre variable créée, utilisez-la pour définir un texte de saisie dans un formulaire ou une barre de recherche. Utilisez l'icône en forme de main dans la case de votre variable pour créer une étape de saisie :

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Saisie via une variable" video="true"  width="80%" >}}

Vous pouvez également utiliser vos variables dans certaines assertions, notamment les suivantes :

* Check an element’s content
* Assert text is present on the page
* Assert the page does not contain text
* Check main page URL's content
* Check that an email was received

Pour utiliser vos variables dans l'une de vos assertions, cliquez sur *Use Variable* et sélectionnez la variable que vous souhaitez utiliser :

{{< img src="synthetics/browser_tests/use_variable_in_assertion.png" alt="Utiliser une variable dans une assertion"  style="width:40%;">}}

Vous pouvez également enregistrer une étape en saisissant `{{ <VOTRE_VARIABLE> }}` dans le champ souhaité. 

### Utiliser des variables dans des étapes JavaScript

Si vous avez besoin d'utiliser des variables dans des étapes JavaScript (assertion ou variable), utilisez `vars.<VOTRE_VARIABLE>`.

## Wait

Par défaut, Datadog attend que la page soit complètement chargée avant d'effectuer une action ou de passer à l'étape suivante, avec un délai d'expiration de 60 secondes. Toutefois, dans certains cas, il peut être préférable de définir un temps d'attente personnalisé. Par exemple, si vous savez que le chargement d'une page ou d'un élément d'une page peut prendre plus de 60 secondes, vous pouvez utiliser une étape Wait pour rallonger le délai d'expiration par défaut. Si vous choisissez d'utiliser cette fonctionnalité, la valeur de votre étape Wait ne doit pas dépasser 300 secondes. 

**Remarque** : le temps supplémentaire est rajouté de manière systématique à **chaque exécution** du scénario de votre test Browser.

## Sous-tests

Vous pouvez exécuter des tests Browser dans d'autres tests Browser, jusqu'à deux niveaux d'imbrication. Les [options avancées][6] vous permettent également de définir l'endroit où le sous-test doit être exécuté.

**Remarque** : si vous souhaitez exécuter un sous-test de façon indépendante, vous avez la possibilité de le mettre en pause. Il recevra toujours des appels dans le cadre du test principal, mais ne sera pas exécuté de façon individuelle.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/advanced_options
[2]: /fr/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /fr/synthetics/browser_tests/#create-a-variable
[5]: /fr/synthetics/settings
[6]: /fr/synthetics/browser_tests/advanced_options/#subtests