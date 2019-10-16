---
title: Tests API
kind: documentation
description: Simuler et surveiller vos requêtes HTTP à partir d'emplacements spécifiques
aliases:
  - /fr/synthetics/uptime_check
  - /fr/synthetics/api_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: "Présentation de Datadog\_Synthetics"
  - link: synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: synthetics/browser_tests
    tag: Documentation
    text: Configurer un test Browser
---
## Présentation

Les tests API vous permettent de surveiller vos endpoints d'API et de recevoir des alertes en cas d'échec ou de lenteur excessive. Ces checks vérifient que vos applications répondent aux requêtes et respectent les conditions que vous avez définies, comme le temps de réponse, le code de statut HTTP, ainsi que les contenus de l'en-tête et du corps de message. Utilisez l'[API Datadog][1] pour voir la liste complète.

## Configuration

La configuration des tests API dépend du type de test API que vous souhaitez créer. Il existe deux types de test API : les [tests HTTP](?tab=httptest) et les [tests SSL](?tab=ssltest).

### Créer une requête

Définissez la requête `HTTP` ou `SSL` que vous souhaitez que Datadog exécute :

{{< tabs >}}

{{% tab "Test HTTP" %}}

{{< img src="synthetics/api_tests/make-http-request.png" alt="Créer une requête HTTP" responsive="true" style="width:80%;" >}}

Définissez la requête que vous souhaitez que Datadog exécute :

1. **Choose request type** : choisissez `HTTP` comme type de requête.
2. Choisissez la **Method** et l'**URL** à interroger. Les méthodes disponibles sont les suivantes : `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`.
    * Advanced Options (facultatif) : personnalisez les en-têtes de requête, les identifiants d'authentification, le contenu du corps ou les cookies à utiliser.
        * Follow Redirects : activez cette fonction pour que l'endpoint surveillé suive jusqu'à dix redirections.
        * Headers : les en-têtes définis remplacent les en-têtes par défaut du navigateur. Par exemple, vous pouvez modifier le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
        * Authentication : authentification HTTP de base avec nom d'utilisateur et mot de passe
        * Body : corps de la requête et type de corps (`text/plain`, `application/json`, `text/xml`, `text/html` ou `None`)
        * Cookies : les cookies définis sont ajoutés aux cookies du navigateur par défaut. Définissez plusieurs cookies en suivant le format  `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

3. **Name** : le nom de votre test API.
4. **Select your tags** : les tags à appliquer à votre test Browser. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetics][2].
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][3]. Vous pouvez également configurer un [emplacement privé][4] pour lancer un test API de Synthetics sur un endpoint privé qui n'est pas accessible à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois par minute à une fois par semaine.
7. Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse devrait s'afficher sur le côté droit de votre écran.

[1]: /fr/synthetics/identify_synthetics_bots
[2]: /fr/synthetics
[3]: /fr/api/?lang=bash#get-available-locations
[4]: /fr/synthetics/private_locations
{{% /tab %}}

{{% tab "Test SSL" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Créer une requête SSL" responsive="true" style="width:80%;" >}}

1. **Choose request type** : choisissez `SSL` comme type de requête.
2. Précisez le `Host` et le `Port` SSL. Le port est défini sur _443_ par défaut.
3. **Name** : le nom de votre test API.
4. **Select your tags** : les tags à appliquer à votre test navigateur. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetics][1].
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacement privé][3] pour lancer un test API de Synthetics sur un endpoint privé qui n'est pas accessible à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois toutes les 5 minutes à une fois par semaine.
7. Cliquez sur **Test Connection** pour essayer la configuration de requête. Un aperçu de la réponse devrait s'afficher sur le côté droit de votre écran.

[1]: /fr/synthetics
[2]: /fr/api/?lang=bash#get-available-locations
[3]: /fr/synthetics/private_locations
{{% /tab %}}

{{< /tabs >}}

### Conditions d'alerte

Définissez des conditions d'alertes afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test envoie une alerte. Lorsque vous définissez les conditions d'alerte sur : `An alert is triggered if any assertion fails for X minutes from any n of N locations`, alors une alerte est déclenchée si :

* Au moins un emplacement était en échec (au moins une assertion a échoué) au cours des *X* dernières minutes, **ET**
* À un moment au cours des *X* dernières minutes, au moins *n* emplacement était en échec

La barre d'uptime s'affiche différemment sur vos résultats de test : l'uptime d'emplacement est affiché pour chaque évaluation (quels que soient les résultats du dernier test). L'uptime total est affiché selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la barre d'uptime total.

#### Assertions

Lorsque vous exécutez un test API, vous devez définir au moins une assertion gérée par Datadog.
Une assertion est définie par un paramètre, une propriété facultative, un comparateur et une valeur cible.

{{< tabs >}}

{{% tab "Test HTTP" %}}

| Type          | Opérateur                                                                        | Type de valeur                            |
| ------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| Code de statut   | `is`, `is not`                                                                  | _Nombre entier_                             |
| Temps de réponse | `lessThan`                                                                     | _Nombre entier (ms)_                        |
| En-têtes       | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _Chaîne_ <br> _[Regex][1]_ |
| Corps          | `contains`, `does not contain`, `is`, `is not` <br> `matches`, `does not match` | _Chaîne_ <br> _[Regex][1]_ |

Si vous cliquez sur **Test URL**, les assertions de base sont automatiquement renseignées :

- `Response time` _lessThan_ 2000 ms
- `Header content-type` _is_ « valeur renvoyée »
- `Status code` _is_ « valeur renvoyée 

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "Test SSL" %}}

| Type        | Opérateur               | Type de valeur                 |
| ----------- | ---------------------- | -------------------------- |
| certificate | `expires in more than` | _Nombre entier (nombre de jours)_ |

Si vous cliquez sur **Test URL**, l'assertion de base est automatiquement renseignée :

- `certificate` _expires in more than_ 10 days

{{% /tab %}}

{{< /tabs >}}

Vous pouvez créer jusqu'à 10 assertions par test API en cliquant sur **Add new assertion** ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_setup.mp4" alt="Configurer les assertions" video="true" responsive="true" width="80%" >}}

#### Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à ses assertions ou si la requête a échoué pour une autre raison. Ces raisons incluent :

| Erreur           | Description                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONNRESET`       | La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou plantage du serveur lors de la réponse, perte de connectivité du serveur Web, etc. |
| DNS             | Entrée DNS introuvable pour l'URL du check. Causes possibles : URL du check mal configurée, configuration des entrées DNS incorrecte, etc.                                                          |
| `INVALID_REQUEST` | La configuration du check n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).                                                                                                                             |
| `SSL`             | La connexion SSL n'a pas pu être effectuée. [Consultez la page relative aux erreurs pour en savoir plus][2].                                                                                     |
| `TIMEOUT`         | La requête n'a pas pu être effectuée dans un délai raisonnable.                                                                                                                                        |

Si un test échoue, l'uptime considère directement que l'endpoint est `down`. Il n'est pas testé à nouveau avant le prochain test.

### Informer votre équipe

Une notification est envoyée selon les conditions d'alerte définies. Pour configurer les notifications :

1. Sélectionnez les utilisateurs et/ou les [services][3] auxquels envoyer les notifications. Notez que vous pouvez utiliser la [fonctionnalité `@-notification`][4] dans le champ **message**.
2. Saisissez un **message** pour le test de l'API. Ce champ accepte l'utilisation du [format de mise en forme Markdown][5] standard. Les messages de notifications comprennent le **message** défini dans cette section ainsi que les informations sur les assertions qui ont échoué et les raisons de cet échec.
3. Cliquez sur **Save** pour enregistrer votre test API.

Exemples de notifications :

{{< img src="synthetics/api_tests/notifications-example.png" alt="Notifications de test API" responsive="true" style="width:80%;" >}}

## Calculs de temps des opérations réseau

La page de détails Synthetics présente les calculs de temps suivants :

| Calcul de temps                    | Description                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| `DNS`                       | Temps passé à résoudre le nom DNS de la dernière requête.                                                |
| `Connect`                   | Temps passé à établir une connexion au serveur.                                                   |
| `SSL`                       | Temps passé pour l'établissement de la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas. |
| `TTFB (time to first byte)` | Temps passé à attendre le premier octet de la réponse à recevoir.                                     |
| `Download`                  | Temps passé à télécharger la réponse.                                                                  |

Le temps de réponse est la somme de ces calculs de temps des opérations réseau.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/?lang=bash#get-available-locations
[2]: /fr/synthetics/api_tests/errors#ssl-errors
[3]: /fr/integrations/#cat-notification
[4]: /fr/developers/faq/what-do-notifications-do-in-datadog
[5]: http://daringfireball.net/projects/markdown/syntax