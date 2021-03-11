---
title: Tests API à plusieurs étapes
kind: documentation
description: Créer des chaînes de requêtes pour surveiller des transactions complexes sur vos services essentiels
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Débuter avec les tests API
  - link: /synthetics/private_locations
    tag: Documentation
    text: Exécuter des tests API à plusieurs étapes sur des endpoints internes
---
## Présentation

Les tests API à plusieurs étapes vous permettent de **créer une chaîne de [tests HTTP][1]**. Vous pouvez ainsi vérifier que les parcours utilisateur complexes associés à vos services essentiels sont disponibles en tout temps et tout lieu :

* Exécutez des requêtes HTTP sur des endpoints d'API nécessitant une authentification (par exemple, via un token).
* Surveillez des transactions commerciales essentielles au niveau de l'API.
* Simulez toutes les étapes des parcours utilisateur sur des applications mobiles.

{{< img src="synthetics/api_tests/ms_overview.png" alt="Présentation du test API à plusieurs étapes" style="width:90%;" >}}

Si l'un de vos services est moins réactif ou si ses réponses ne correspondent pas à vos attentes (corps de réponse inattendu ou code de statut inattendu, etc.), votre test peut [**prévenir votre équipe**][2], [**bloquer votre pipeline de CI**][3] ou même [**annuler le déploiement à l'origine de l'erreur**][3].

Les tests API en plusieurs étapes peuvent s'exécuter depuis des [emplacements gérés][4] par Datadog et des [emplacements privés][5], ce qui permet une **récupération complète de vos systèmes**, aussi bien au niveau externe qu'interne.

**Remarque** : les tests API en plusieurs étapes vous permettent d'associer plusieurs requêtes HTTP dans un test. Si vous souhaitez exécuter des requêtes simples sur vos services, vous pouvez utiliser les [tests API][6].

## Configuration

### Nommer votre test et y ajouter des tags

1. **Donnez un nom** à votre test API à plusieurs étapes.
2. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test API en plusieurs étapes. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][7].

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels exécuter votre test API en plusieurs étapes : les tests API en plusieurs étapes peuvent être exécutés depuis des [emplacements gérés][4] et des [emplacements privés][5], selon que vous souhaitez exécuter le test à partir de l'extérieur ou de l'intérieur de votre réseau.

### Définir des requêtes

Cliquez sur **Create Your First Request** pour commencer à concevoir les requêtes de votre test.

{{< img src="synthetics/api_tests/create_request.png" alt="Créer les requêtes de votre test API à plusieurs étapes"  style="width:90%;" >}}

#### Définir une requête

{{< img src="synthetics/api_tests/ms_define_request.png" alt="Définir une requête pour votre test API à plusieurs étapes" style="width:90%;" >}}

1. **Donnez un nom** à votre étape.
2. Choisissez une valeur pour **HTTP Method** et indiquez l'**URL** à interroger. Les méthodes disponibles sont `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`. Les URL `http` et `https` sont prises en charge.
3. Enrichissez votre requête HTTP en modifiant les réglages de la section **Advanced Options** (facultatif) :

  {{< tabs >}}

  {{% tab "Options de requête" %}}

  * **Follow redirects** : activez cette option pour que votre test HTTP suive jusqu'à dix redirections lors de l'exécution de la requête.
  * **Request headers** : définissez les en-têtes à ajouter à votre requête HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
  * **Cookies** : définissez les cookies à ajouter à votre requête HTTP. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.
  * **HTTP Basic Auth** : ajoutez des identifiants d'authentification basique HTTP.

  {{% /tab %}}

  {{% tab "Corps de requête" %}}

  * **Body type** : sélectionnez le type du corps de requête (`text/plain`, `application/json`, `text/xml`, `text/html` ou `None`) que vous voulez ajouter à votre requête HTTP.
  * **Request body** : ajoutez le contenu du corps de votre requête HTTP. **Remarque** : la taille du corps de la requête est limitée à 50 Ko.

  {{% /tab %}}

  {{% tab "Certificat" %}}

  * **Ignore server certificate error** : activez cette option pour que votre test HTTP poursuive son processus de connexion même lorsque des erreurs de validation du certificat SSL surviennent.
  * **Client certificate** : authentifiez-vous via mTLS en important votre certificat client et la clé privée associée.

  {{% /tab %}}

  {{% tab "Proxy" %}}

  * **Proxy URL** : indiquez l'URL du proxy que la requête HTTP doit utiliser (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).
  * **Proxy Header** : ajoutez les en-têtes à inclure dans la requête HTTP envoyée au proxy.

  {{% /tab %}}

  {{< /tabs >}}

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche alors.

#### Ajouter des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur `Test URL`, les assertions de base pour `response time`, `status code` et `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Les assertions sont facultatives pour les tests API à plusieurs étapes.

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][8] | _Chaîne_ <br> _[Regex][9]_ <br> _Chaîne_, _[Regex][9]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Regex][10]_                                      |
| response time | `is less than`                                                                                         | _Nombre entier (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Nombre entier_                                                      |

**Remarque** : les tests HTTP peuvent décompresser les corps de réponse contenant les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

Vous pouvez créer jusqu'à 10 assertions par étape en cliquant sur **New assertion** ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions.png" alt="Définir les assertions pour votre test API à plusieurs étapes" style="width:90%;" >}}

#### Extraire des variables depuis la réponse

Vous pouvez également extraire des variables à partir de la réponse de votre requête HTTP en parsant les en-têtes ou le corps de la réponse. La valeur de la variable est mise à jour à chaque fois que l'étape de requête HTTP est exécutée.

Pour parser votre variable :

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom doit comporter au moins trois caractères et peut uniquement contenir des lettres majuscules, des chiffres et des underscores.
2. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse :

    * Extraire la valeur à partir du **Response Header** : utiliser l'en-tête de réponse complet de votre requête HTTP comme valeur de variable, ou parsez l'en-tête à l'aide d'une [expression régulière][10].
    * Extraire la valeur à partir du **Response Body** : utiliser le corps de réponse complet de votre requête HTTP comme valeur de variable, ou parser le corps avec une [expression régulière][10] ou une expression [JSONPath][8].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extraire des variables depuis des requêtes HTTP dans le test API à plusieurs étapes" style="width:90%;" >}}

Une fois créée, cette variable peut être utilisée dans les étapes suivantes de votre test API à plusieurs étapes.

### Indiquer la fréquence du test

Les tests API à plusieurs étapes peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux endpoints. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test API à plusieurs étapes.

{{< img src="synthetics/api_tests/schedule.png" alt="Exécuter des tests API à plusieurs étapes selon un programme"  style="width:90%;" >}}

* [**Dans vos pipelines de CI/CD**][3], pour déployer votre code sans crainte de dégrader l'expérience de vos utilisateurs.
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour vos équipes.

### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec

#### Nouvelle tentative rapide

Votre test peut déclencher de nouvelles tentatives en cas d'échec. Par défaut, les tentatives sont effectuées 300 ms après le premier échec. Cet intervalle peut être configuré via l'[API][9].


La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Informer votre équipe

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Référez-vous à cette section pour définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][11], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][12] standard ainsi que les [variables conditionnelles][13] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

Les notifications par e-mail incluent le message défini dans cette section ainsi qu'un résumé des assertions qui ont échoué.
Exemples de notification :

{{< img src="synthetics/api_tests/notifications-example.png" alt="Notifications de test API à plusieurs étapes" style="width:90%;" >}}

Cliquez sur **Save** pour enregistrer votre test. Datadog se charge alors de son exécution.

## Variables

### Créer des variables locales

#### Variables extraites

Vous pouvez [extraire des variables à partir de n'importe quelle étape de votre test API à plusieurs étapes](#extraire-des-variables-depuis-la-reponse) et [réinjecter leurs valeurs dans les étapes suivantes](#utiliser-des-variables) de votre test.

#### Variables provenant d'un pattern

Vous pouvez créer des variables locales en définissant leurs valeurs sur l'un des builtins disponibles ci-dessous :

| Pattern                    | Description                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | Génère une chaîne numérique de `n` chiffres.                                                                 |
| `{{ alphabetic(n) }}`      | Génère une chaîne alphabétique de `n` lettres.                                                            |
| `{{ alphanumeric(n) }}`    | Génère une chaîne alphanumérique de `n` caractères.                                                       |
| `{{ date(n, format) }}`    | Génère une date dans l'un des formats acceptés. Sa valeur correspond à la date d'initiation du test + `n` jours.        |
| `{{ timestamp(n, unit) }}` | Génère un timestamp dans l'une des unités acceptées. Sa valeur correspond au timestamp d'initiation du test +/- `n` unités choisies. |

### Utiliser des variables

Les [variables globales définies sur la page `Settings`][14] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests HTTP.
Pour afficher la liste de vos variables, saisissez `{{` dans le champ souhaité.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utilisation de variables dans les tests API à plusieurs étapes" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` si une étape ne répond pas à une ou plusieurs de ses assertions ou si la requête d'une étape a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint. Voici la liste des erreurs concernées :

| Erreur             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.                                                                                                                                                                                                                                                         |
| DNS               | L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, configuration des entrées DNS incorrecte, etc.                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | La connexion SSL n'a pas pu être effectuée. [Consultez la page relative aux erreurs pour en savoir plus][15].                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreur `TIMEOUT` peuvent se produire. <br> - Une erreur `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de la connexion au socket TCP. <br> - Une erreur `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de son traitement global (qui comprend la connexion au socket TCP, le transfert de données et les assertions). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests
[2]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[3]: /fr/synthetics/ci
[4]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[5]: /fr/synthetics/private_locations
[6]: /fr/synthetics/api_tests/
[7]: /fr/synthetics/search/#search
[8]: https://restfulapi.net/json-jsonpath/
[9]: /fr/api/v1/synthetics/#create-a-test
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[11]: /fr/monitors/notifications/?tab=is_alert#notification
[12]: http://daringfireball.net/projects/markdown/syntax
[13]: /fr/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[14]: /fr/synthetics/settings/#global-variables
[15]: /fr/synthetics/api_tests/errors/#ssl-errors