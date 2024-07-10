---
description: Découvrez comment enregistrer automatiquement et ajouter manuellement
  des étapes dans un enregistrement de test Browser.
further_reading:
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentation
  text: En savoir plus sur les options avancées des tests Browser
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Site externe
  text: Créer et gérer des variables globales Synthetic avec Terraform
title: Étapes des tests de navigateurs
---

## Présentation

Les étapes correspondent à une série d'actions que vous pouvez enregistrer pour un test Browser, puis modifier ou enrichir par la suite. Les étapes que votre test Browser doit exécuter peuvent être définies soit automatiquement, à l'aide de l'extension d'enregistrement de test Datadog, soit manuellement, en procédant vous-même à l'ajout. Chaque étape comprend un ensemble d'[options avancées][1] configurables.

Le délai d'expiration par défaut pour chaque étape est de 60 secondes. Vous pouvez modifier ce délai via l'[option dédiée][2].

## Étapes enregistrées automatiquement

Lorsque vous cliquez sur **Start Recording**, l'[extension d'enregistrement de test Browser Datadog][3], disponible sur les navigateurs Chrome et Edge, détecte et enregistre automatiquement toutes vos actions sur le site Web.

### Clic

Interagissez avec des éléments de la page pour enregistrer une étape.

{{< img src="synthetics/browser_tests/click_step.mp4" alt="Menu déroulant relatif aux actions de clic dans le type d'étape Click" video="true" width="60%" >}}

Cliquez sur l'étape et sélectionnez le type de clic que vous souhaitez effectuer lors de l'exécution du test Browser :

* Primary click (correspond à un clic gauche)
* Double click
* Contextual click (correspond à un clic droit)

### Type text

Datadog enregistre les actions que vous effectuez dans votre application, par exemple lorsque vous sélectionnez une option à partir d'un menu déroulant `select`. Un résumé de l'action s'affiche sous la forme d'une étape.

{{< img src="synthetics/browser_tests/input_text.mp4" alt="Étape de saisie de texte d'un test Browser" video="true" width="95%" >}}

### Sélection d'une option

Datadog enregistre les actions que vous effectuez dans votre application, par exemple lorsque vous sélectionnez une option à partir d'un menu déroulant `select`. Un résumé de l'action s'affiche sous la forme d'une étape dans la partie gauche de l'interface.

{{< img src="synthetics/browser_tests/select_options.png" alt="Étape Select option" style="width:70%;" >}}

### Chargement de fichier

Vous pouvez procéder de deux façons différentes pour ajouter une étape de type **Upload** :

* Ouvrez votre bureau depuis le navigateur ; ou
* Faites glisser le fichier dans l'iframe d'enregistrement.

Datadog enregistre les actions que vous effectuez dans votre application, par exemple lorsque vous chargez un fichier. Un résumé de l'action s'affiche sous la forme d'une étape dans la partie gauche de l'interface. Vous pouvez charger jusqu'à 10 fichiers, chacun devant faire tout au plus 5 Mo.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Créer une étape de chargement de fichier" style="width:70%;" >}}

## Étapes ajoutées manuellement

Vous pouvez ajouter et modifier manuellement des étapes depuis la partie gauche de l'interface d'enregistrement de test Browser.

### Assertion

Les assertions vous permettent de vérifier si votre test Browser possède un statut attendu à un moment précis de la simulation du parcours utilisateur.

Pour confirmer que votre test Browser possède le statut final attendu, vous devez configurer une **assertion** à la fin de votre test.

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Options relatives aux assertions dans une étape de test Browser" style="width:70%;" >}}

Certaines assertions permettent de vérifier l'état de la page active, ou encore celui de la dernière page avec laquelle l'utilisateur a interagi (par exemple, avec une action de **clic** ou une **assertion** sur un élément de page).

Pour créer une étape, sélectionnez un type d'assertion :

{{< tabs >}}
{{% tab "Tester un élément sur la page active" %}}

#### Test an element's content

Créez cette étape d'assertion pour que votre test Browser sélectionne un élément de page et vérifie s'il contient ou non une certaine valeur.

#### Test an element's attribute

Créez cette étape d'assertion pour que votre test Browser sélectionne un élément de page et vérifie si un de ces attributs correspond au contenu attendu.

#### Test that an element is present

Créez cette étape d'assertion pour que votre test Browser sélectionne un élément de page, comme un élément `span`, `div`, `h` ou `a` spécifique, et vérifie que la page contient bien cet élément.

Configurez le localisateur d'utilisateur de façon à ce que le test Browser cible le bon élément. Pour ce faire, sélectionnez `CSS` ou `XPath 1.0` dans le menu déroulant, puis ajoutez un sélecteur. Cliquez ensuite sur **Test**.

Pour une précision optimale, Datadog vous conseille d'utiliser les deux assertions ci-dessus. Pour en savoir plus, consultez la section relative aux [options avancées][1].

[1]: /fr/synthetics/browser_tests/advanced_options#user-specified-locator
{{% /tab %}}
{{% tab "Tester le contenu de la page active" %}}

#### Test that some text is not present on the active page

Créez cette étape d'assertion pour que votre test Browser vérifie si le texte indiqué dans le champ `Value` ne se trouve **pas** sur la page active de l'enregistrement.

#### Test that some text is present on the active page

Créez cette étape d'assertion pour que votre test Browser vérifie si le texte indiqué dans le champ `Value` se trouve sur la page active de l'enregistrement.

#### Test the content of the URL of the active page

Créez cette étape d'assertion pour que votre test Browser vérifie si l'URL de la dernière page avec l'utilisateur a interagi contient la valeur spécifiée.

Vous pouvez vérifier si l'URL contient un certain type de valeur, par exemple une `string`, un `number` ou une `regex`.

{{% /tab %}}

{{% tab "Assertions spéciales" %}}

#### Test that an email was received

Créez cette étape d'assertion pour que votre test Browser vérifie si les mécanismes d'envoi d'e-mail de votre application fonctionnent et si les valeurs spécifiées, par exemple une `string`, un `number` ou une `regex`, se trouvent dans l'objet ou le corps de l'e-mail.

Pour en savoir plus, consultez la section [Vérifications d'e-mails dans des tests Browser][1].

#### Test your UI with custom JavaScript

Créez cette étape d'assertion pour tester une assertion personnalisée sur la page active à l'aide de votre code JavaScript. Les assertions JavaScript prennent à la fois en charge le code synchrone et asynchrone. Les tests Browser chargent le code JavaScript externe en ajoutant le script à la page. Pour cette raison, ce processus fonctionne uniquement si votre site Web accepte le code JavaScript externe.

La fonction d'assertion JavaScript comprend les paramètres suivants et nécessite une instruction return.

* L'instruction `return` (obligatoire) correspond à la condition que l'assertion doit remplir pour que l'étape de votre test réussisse. N'importe quel type peut être renvoyé, mais la valeur est automatiquement convertie en booléen.

* `vars` (facultatif) : une chaîne contenant les [variables][2] de votre test Browser. Utilisez `vars.<VOTRE_VARIABLE>` pour appeler une variable de test Browser dans votre extrait JavaScript. Par exemple, si votre test Browser contient une variable `USERNAME`, appelez-la dans votre extrait JavaScript avec `vars.USERNAME`.

* `element` (facultatif) : l'emplacement de l'élément sur la page. Pour configurer ce paramètre, utilisez les boutons **Select** et **Update** sur l'élément cible. L'élément sélectionné tire automatiquement parti de l'algorithme de localisation multiple des tests Browser Datadog.

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="Assertion JavaScript dans un test Browser" video="true" width="100%" >}}

Étant donné que les assertions JavaScript s'exécutent dans le contexte de la page active, ces étapes peuvent également accéder à tous les objets définis dans la page active (comme les bibliothèques, builtins et variables globales). Pour charger des bibliothèques externes, utilisez une promise.

Par exemple :

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Le script est maintenant chargé

return jQuery().jquery.startsWith('3.5.1')
```

#### Test a downloaded file

Créez cette étape d'assertion pour que votre test Browser effectue des vérifications sur les fichiers téléchargés lors des étapes précédentes. Il est possible de vérifier qu'un fichier a bien été téléchargé et exécuter une assertion sur son nom, sa taille et sa valeur MD5.

Pour en savoir plus sur le test des téléchargements, consultez la section [Tester le chargement et le téléchargement de fichiers][3].

[1]: /fr/synthetics/guide/email-validation
[2]: /fr/synthetics/browser_tests/actions#use-variables
[3]: /fr/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
{{% /tab %}}
{{< /tabs >}}

### Navigation

{{< img src="synthetics/browser_tests/navigation_step.png" alt="Choix entre trois types de navigations lors de l'enregistrement d'un test Browser" style="width:60%;" >}}

#### Refresh this page

Créez cette étape de navigation pour que votre test Browser actualise la page active de l'enregistrement.

#### Go to an email and click on a link

Après avoir [configuré une variable d'e-mail][4], créez cette étape de navigation pour que votre test Browser accède à des boîtes de réception Synthetic uniques.

Sélectionnez l'e-mail et les liens sur lesquels le test Browser doit cliquer. Cette étape affiche la page correspondante. Vous pouvez ensuite poursuivre le reste du parcours à partir de cette page.

#### Follow a specific link

Créez cette étape de navigation pour que votre test Browser accède à une page spécifique. Vous devez ajouter `http` ou `https` devant votre URL dans le champ **Enter link URL**.

### Actions spéciales

Vous pouvez utiliser l'[extension d'enregistrement de test Browser Datadog][3] pour enregistrer et surveiller la plupart des étapes relatives aux parcours utilisateur. Avec cette extension, Il n'est toutefois pas possible d'enregistrer automatiquement certaines étapes, notamment les étapes **Hover**, **Press Key**, **Scroll** et **Wait**.

Pour créer manuellement cette étape d'assertion, cliquez sur **Special Actions** et sélectionnez un type d'action.

#### Hover

Cette étape repose sur une action de clic dédiée, et non sur un mécanisme de survol, afin d'éviter la création d'une étape distincte chaque fois que l'utilisateur passe son curseur sur un élément lors de l'enregistrement.

Sélectionnez **Hover** et cliquez sur un élément pour ajouter une étape.

#### Press key

Ajoutez une étape **Press Key** pour simuler le fait que l'utilisateur appuie sur des touches. L'[extension d'enregistrement de test Browser Datadog][3] peut enregistrer les touches suivantes :

* Entrée
* Touches fléchées (haut, bas, droite et gauche)
* Tabulation (en dehors d'un formulaire)
* Échap 
* Retour arrière

Pour appuyer sur des touches qui ne sont pas enregistrées automatiquement, indiquez les valeurs des touches pertinentes dans le champ **Value**.

 Sélectionnez les modificateurs `Alt`, `Control`, `Meta` et `Shift` pour compléter la valeur saisie.

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Action Press Key dans un enregistrement de test Browser" style="width:50%;" >}}

#### Scroll

Les tests Browser font automatiquement défiler la page jusqu'aux éléments avec lesquels ils doivent interagir. Dans la plupart des cas, il n'est pas nécessaire d'ajouter manuellement une étape de défilement. L'étape Scroll doit être ajoutée uniquement lorsque celle-ci est nécessaire pour déclencher une interaction supplémentaire, par exemple pour un défilement infini.

Indiquez le nombre de pixels que votre test Browser doit faire défiler dans le sens horizontal et vertical.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Étape Scroll dans un enregistrement de test Browser" style="width:50%;" >}}

Par défaut, l'étape **Scroll** fait défiler la page entière. Si vous souhaitez faire défiler un élément spécifique (tel qu'une certaine `<div>`), cliquez sur **Target Element** et sélectionnez l'élément que votre test Browser doit faire défiler.

#### Wait

Par défaut, les tests Browser attendent le chargement complet d'une page, tant que celui-ci ne dépasse pas 60 secondes, avant d'exécuter une étape ou la prochaine étape.

Si vous savez que le chargement d'une page ou d'un élément de page dure plus de 60 secondes, vous pouvez personnaliser le délai d'expiration dans les [options avancées][2] de l'étape. Il est également possible de coder en dur la durée d'attente d'une étape (jusqu'à 300 secondes).

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Étape Wait dans un enregistrement de test Browser" style="width:50%;" >}}

Le temps supplémentaire est systématiquement rajouté à **chaque exécution** de l'enregistrement de votre test Browser.

### Variables

Cliquez sur **Variables** et sélectionnez un type de création de variable depuis le menu déroulant.

{{< img src="synthetics/browser_tests/variables.png" alt="Variables d'un test Browser" style="width:60%;" >}}

Pour en savoir plus sur l'utilisation de variables au sein de vos étapes, consultez la rubrique [Utiliser des variables](#utiliser-des-variables).

#### Pattern

Vous pouvez sélectionner l'un des builtins disponibles suivants :

`{{ numeric(n) }}`
: Génère une chaîne numérique de `n` chiffres.

`{{ alphabetic(n) }}`
: Génère une chaîne alphabétique de `n` lettres.

`{{ alphanumeric(n) }}`
: Génère une chaîne alphanumérique de `n` caractères.

`{{ date(n unit, format) }}`
: Génère une date dans l'un des formats acceptés de Datadog. Sa valeur correspond à la date UTC d'initiation du test + ou - `n` unités.

`{{ timestamp(n, unit) }}` 
: Génère un timestamp dans l'une des unités acceptées de Datadog. Sa valeur correspond au timestamp UTC d'initiation du test + ou -  `n` unités.

`{{ uuid }}`
: Génère un identifiant unique universel (UUID) de version 4.

Pour obfusquer les valeurs des variables locales dans les résultats des tests, sélectionnez **Hide and obfuscate variable value**. Une fois la chaîne de la variable définie, cliquez sur **Add Variable**.

#### Élément

Créez une variable à partir du contenu, par exemple une `span` ou `div`, en extrayant le texte de l'élément.

#### Corps de lʼe-mail

Créez une variable à partir du corps du message en utilisant l'une des méthodes suivantes : [`regex`][13] ou [`Xpath`][12].

* [`Regex`][13] recherche et renvoie le premier motif correspondant (par exemple, `/*./`) du corps du message en texte brut. Si aucun motif n'est trouvé, il recherche alors dans le corps du message en HTML.

* [`Xpath`][12] ne s'applique que lorsque lʼe-mail contient un corps HTML. Il renvoie le contenu de l'emplacement correspondant (par exemple, `$`).

#### JavaScript

Les étapes JavaScript prennent à la fois en charge le code synchrone et asynchrone. Les tests Browser chargent le code JavaScript externe en ajoutant le script à la page. Pour cette raison, ce processus fonctionne uniquement si votre site Web accepte le code JavaScript externe.

La fonction JavaScript accepte les paramètres suivants et nécessite une instruction return.

* L'instruction `return` (obligatoire) renvoie la valeur que vous souhaitez associer à votre variable JavaScript. L'instruction renvoie n'importe quel type, mais convertit automatiquement la valeur en chaîne.

* `vars` (facultatif) : une chaîne contenant les [variables](#utiliser-des-variables) de votre test Browser dont vous pouvez vous servir dans votre code. Utilisez `vars.<VOTRE_VARIABLE>` pour appeler une variable de test Browser dans votre extrait JavaScript. Par exemple, si votre test Browser contient déjà une variable `PRICE`, appelez-la dans votre extrait JavaScript avec `vars.PRICE`.

* `element` (facultatif) : l'emplacement de l'élément sur la page. Pour configurer ce paramètre, utilisez les boutons **Select** et **Update** sur l'élément cible. L'élément sélectionné tire automatiquement parti de l'algorithme de localisation multiple des tests Browser Datadog.

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="Variable JavaScript de test Browser" video="true" width="100%" >}}

Étant donné que les assertions JavaScript s'exécutent dans le contexte de la page active, ces étapes peuvent également accéder à tous les objets définis dans la page active (comme les bibliothèques, builtins et variables globales). Pour charger des bibliothèques externes, utilisez une promise.

Exemple :

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Le script est maintenant chargé

return jQuery().jquery.startsWith('3.5.1')
```

#### Variable globale

Choisissez n’importe quelle variable globale définie à l’aide des [paramètres de surveillance Synthetic][5].

#### Variable globale – Authentification multifacteur (MFA)

Choisissez n’importe quelle variable globale MFA définie à l’aide des [paramètres de surveillance Synthetic][5].

Ce type de variable globale conserve les clés secrètes de mots de passe à usage unique basés sur le temps (TOTP), ce qui vous permet de tester vos modules MFA et vos workflows protégés par MFA. Pour en savoir plus, consultez la section [Mots de passe à usage unique basés sur le temps (TOTP) pour l'authentification multifacteur dans des tests Browser][6].

#### E-mail

Créez une adresse e-mail Synthetic Datadog afin de l'utiliser dans des étapes de test pour [vérifier qu'un e-mail a bien été envoyé][7] ou pour [accéder à un lien d'un e-mail][8], par exemple afin de cliquer sur un lien de confirmation.

Une boîte de messagerie unique est générée à chaque exécution de test, afin d'éviter tout conflit entre différentes exécutions.

### Sous-tests

Vous pouvez exécuter des tests Browser au sein d'autres tests Browser afin de réutiliser des workflows existants. Vous pouvez configurer jusqu'à deux niveaux d'imbrication.

Pour ajouter un sous-test basé sur un test Browser existant, cliquez sur **Add New Subtest**, sélectionnez un test Browser depuis le menu déroulant de l'onglet **From Existing Test**, puis cliquez sur **Add Subtest**.

Pour convertir des étapes du test Browser actif en un sous-test, cliquez sur l'onglet **Extract From Steps**, sélectionnez les étapes enregistrées à extraire, puis cliquez sur **Convert to Subtest**. Par défaut, un sous-test s'exécute à la suite des étapes précédentes du test parent.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Ajouter un sous-test à un test Browser" style="width:60%;" >}}

Pour ignorer les variables des sous-tests dans des tests parent, vérifiez que les variables créées au niveau des tests parent possèdent les mêmes noms que les variables des sous-tests. Une variable utilise toujours la première valeur qui lui a été attribuée.

Pour en savoir plus sur les options avancées des sous-tests, consultez la section [Options avancées pour les étapes des tests Browser][9].

S'il n'est pas pertinent d'exécuter votre sous-test de façon indépendante, vous pouvez l'interrompre. Le test continue à être appelé lors du test parent, mais il n'est pas exécuté individuellement. Pour en savoir plus, consultez la section [Réutiliser des parcours de test Browser pour toute votre collection de tests][10].

### Requêtes HTTP

Vous pouvez exécuter des requêtes HTTP au sein de vos tests Browser.

{{< img src="synthetics/browser_tests/recorder_http_requests2.png" alt="Étape requête HTTP" style="width:70%;" >}}

#### Configuration

Pour définir votre requête HTTP :

1. Sélectionnez la méthode et l'URL à interroger à l'aide des options **Method** et **URL**. Les méthodes `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS` sont disponibles.
2. Si vous le souhaitez, cliquez sur **Advanced Options** pour définir des options avancées :

   {{< tabs >}}

   {{% tab "Options de requête" %}}

   * **Follow redirects** : activez cette option pour que votre test HTTP suive jusqu'à dix redirections lors de l'exécution de la requête.
   * **Ignore server certificate error** : activez cette option pour que votre test HTTP poursuive son processus de connexion même lorsque des erreurs de validation du certificat SSL surviennent.
   * **Request headers** : définissez les en-têtes à ajouter à votre requête HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
   * **Cookies** : définissez les cookies à ajouter à votre requête HTTP. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.

   {{% /tab %}}

   {{% tab "Authentification" %}}

   * **Client certificate** : authentifiez-vous via mTLS en important votre certificat client et la clé privée associée.
   * **HTTP Basic Auth** : ajoutez des identifiants d'authentification basique HTTP.
   * **Digest Auth** : ajoutez des identifiants d'authentification Digest.
   * **NTLM** : ajoutez les informations d'authentification NTLM. NTLMv2 et NTLMv1 sont pris en charge.

   {{% /tab %}}

   {{% tab "Paramètres de requête" %}}

   * **Encode parameters** : ajoutez le nom et la valeur des paramètres de requête nécessitant un encodage.

   {{% /tab %}}

   {{% tab "Corps de requête" %}}

   * **Body type** : sélectionnez le type du corps de requête (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL` ou `None`) que vous voulez ajouter à votre requête HTTP.
   * **Request body** : ajoutez le contenu du corps de votre requête HTTP. La taille du corps de la requête ne doit pas dépasser 50 Ko.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL** : indiquez l'URL du proxy que la requête HTTP doit utiliser (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).
   * **Proxy Header** : ajoutez les en-têtes à inclure dans la requête HTTP envoyée au proxy.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   * **Do not save response body** : sélectionnez cette option pour désactiver l'enregistrement du corps de la réponse au moment de l'exécution. Cela vous permet de vous assurer qu'aucune donnée sensible ne figure dans les résultats de test. Utilisez toutefois cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour découvrir d'autres recommandations de sécurité, consultez la section [Sécurité des données liées à la surveillance Synthetic][1].

[1]: /fr/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>
3. Cliquez sur **Test URL** pour tester la configuration de requête. Un aperçu de la réponse s'affiche alors.

{{< img src="synthetics/browser_tests/http_request2.png" alt="Créer une requête HTTP" style="width:80%;" >}}

#### Ajouter des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur **Test URL**, les assertions de base pour `status code`, `response time` et le `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Les assertions sont facultatives pour les étapes HTTP des tests Browser.

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _Chaîne_ <br> _[Expression régulière][13]_ <br> _Chaîne_, _[Expression régulière][13]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Expression régulière][13]_                                      |
| response time | `is less than`                                                                                         | _Nombre entier (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Nombre entier_                                                      |

Les requêtes HTTP peuvent décompresser les corps de réponse contenant les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

- Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

- Si un test contient une assertion sur le corps de la réponse et que le délai d'expiration est atteint, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

{{< img src="synthetics/browser_tests/assertions.png" alt="Définir des assertions pour déterminer la réussite ou l'échec de votre test Browser" style="width:80%;" >}}

Vous pouvez créer jusqu'à 20 assertions par étape en cliquant sur **New assertion** ou directement sur l'aperçu de la réponse.

#### Extraire une variable depuis la réponse

Il est également possible d'extraire une variable depuis la réponse de votre requête HTTP, en parsant les en-têtes ou le corps de la réponse. La valeur de la variable est mise à jour à chaque exécution de l'étape de la requête HTTP. Une fois créée, cette variable peut être utilisée dans les [étapes ultérieures](#utiliser-des-variables) de votre test Browser.

Pour commencer à parser une variable, cliquez sur **Extract a variable from response content** :

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom doit comporter au moins trois caractères et peut uniquement contenir des lettres majuscules, des chiffres et des underscores.
2. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse.

   * Extraire la valeur à partir de l'**en-tête de la réponse** : utilisez l'en-tête de réponse complet de votre requête HTTP comme valeur de variable, ou parsez l'en-tête à l'aide d'une [`regex`][13].
   * Extraire la valeur à partir du **corps de la réponse** : utilisez le corps de réponse complet de votre requête HTTP comme valeur de variable, ou parsez le corps avec une [`regex`][13], une expression [`JSONPath`][11] ou une expression [`XPath`][12].

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Variable extraite à partir de la réponse" style="width:80%;" >}}


## Gérer l'ordre des étapes

Au lieu de faire glisser chaque nouvelle étape pour modifier manuellement son ordre, vous pouvez définir à n'importe quel moment de l'enregistrement un curseur pour une étape de votre test, puis insérer des étapes supplémentaires.

1. Survolez une étape du test enregistré, puis cliquez sur l'icône **Set Cursor**. Une ligne bleue s'affiche alors au-dessus de votre étape de test.
2. Enregistrez des [étapes de test](#etapes-enregistrees-automatiquement) supplémentaires ou [ajoutez manuellement des étapes](#etapes-ajoutees-manuellement).
3. Après avoir ajouté des étapes supplémentaires au-dessus de votre étape de test, cliquez sur **Clear Cursor** pour quitter le curseur.

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Définir un curseur sur une étape de test afin d'ajouter des étapes supplémentaires avant l'étape en question" video="true" width="100%" >}}

## Utiliser des variables

Pour afficher toutes les variables disponibles pour des étapes ajoutées manuellement, tapez `{{` dans le champ de saisie.

Pour utiliser une variable dans des étapes enregistrées automatiquement, cliquez sur l'icône **Inject this variable** afin de saisir la valeur de la variable pendant l'enregistrement.

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Cliquer sur une étape de test pour injecter la valeur dans la page de l'enregistrement" video="true" width="100%" >}}

Si différentes valeurs sont attribuées à une variable dans les étapes de votre test Browser (dans des sous-tests, par exemple), la variable utilise systématiquement la première valeur qui lui a été attribuée.

Certaines variables sont calculées uniquement à l'exécution. C'est notamment le cas des variables provenant d'une requête HTTP ou d'une étape JavaScript. Imaginons par exemple que vous avez créé une étape `Type text` comprenant la variable `{{ <NOM_VARIABLE> }}`. À l'exécution du test, `{{ <NOM_VARIABLE> }}` est systématiquement remplacé par la valeur associée à votre variable. Pour enregistrer une étape utilisant l'une de ces variables, utilisez la valeur de cette variable lors de l'enregistrement de l'étape, puis remplacez cette valeur par `{{ <NOM_VARIABLE> }}` dans la définition de l'étape avant d'enregistrer votre test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/browser_tests/advanced_options/
[2]: /fr/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /fr/synthetics/guide/email-validation/#create-an-email-variable
[5]: /fr/synthetics/settings/
[6]: /fr/synthetics/guide/browser-tests-totp
[7]: /fr/synthetics/guide/email-validation/#confirm-the-email-was-sent
[8]: /fr/synthetics/guide/email-validation/#navigate-through-links-in-an-email
[9]: /fr/synthetics/browser_tests/advanced_options/#subtests
[10]: /fr/synthetics/guide/reusing-browser-test-journeys
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions