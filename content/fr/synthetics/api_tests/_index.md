---
title: Tests API
kind: documentation
description: Simulez et surveillez vos requêtes HTTP à partir de sites spécifiques
aliases:
  - /fr/synthetics/uptime_check
  - /fr/synthetics/api_test
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: Présentation de la surveillance Datadog Synthetic
  - link: /synthetics/
    tag: Documentation
    text: Gérer vos checks
  - link: /synthetics/browser_tests/
    tag: Documentation
    text: Configurer un test Browser
---
## Présentation

Les tests API vous permettent de surveiller vos endpoints d'API et de recevoir des alertes en cas d'échec ou de lenteur excessive. Ces tests vérifient que vos applications répondent aux requêtes et respectent les conditions que vous avez définies, comme le temps de réponse, le code de statut HTTP, ainsi que les contenus de l'en-tête et du corps de message. Utilisez l'[API Datadog][1] pour voir la liste complète.

## Configuration

La configuration des tests API dépend du type de test API que vous souhaitez créer : un [test HTTP](?tab=httptest), un [test SSL](?tab=ssltest), un [test TCP](?tab=tcptest) ou un [test DNS](?tab=dnstest).

### Créer une requête

Définissez la requête `HTTP`, `SSL`, `TCP` ou `DNS` que vous souhaitez que Datadog exécute :

{{< tabs >}}

{{% tab "Test HTTP" %}}

{{< img src="synthetics/api_tests/make-http-request.png" alt="Définir une requête HTTP"  style="width:80%;" >}}

Définissez la requête que vous souhaitez que Datadog exécute :

1. **Choose a request type** : `HTTP`.
2. Choisissez la **Method** et l'**URL** à interroger. Les méthodes disponibles sont les suivantes : `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`.
3. Ajoutez des **Advanced Options** (facultatif) à votre test : 
  * Follow redirects : activez cette fonction pour que l'endpoint surveillé suive jusqu'à dix redirections.
  * Allow insecure server certificates : activez cette fonction pour que votre test HTTP poursuive son processus de connexion même lorsqu'une erreur de validation du certificat survient.
  * Client certificate : authentifiez-vous via mTLS en important votre certificat client et la clé privée associée.
  * Request headers : les en-têtes définis remplacent les en-têtes par défaut du navigateur. Par exemple, vous pouvez définir le user-agent dans l'en-tête de façon à [identifier les scripts Datadog][1].
  * Cookies : les cookies définis sont ajoutés aux cookies de navigateur par défaut. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.
  * HTTP Basic Auth : authentification HTTP de base avec nom d'utilisateur et mot de passe.
  * Request body : corps de la requête et type de corps (`text/plain`, `application/json`, `text/xml`, `text/html` ou `None`). **Remarque** : la taille du corps de la requête est limitée à 50 Ko.
  * Proxy URL : URL du proxy à utiliser par la requête HTTP (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).
  * Proxy Header : en-têtes à inclure dans la requête HTTP envoyée au proxy.

4. **Name** : le nom de votre test API.
5. **Select your tags** : les tags à appliquer à votre test Browser. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetic Monitoring][2].
6. **Locations** : les sites gérés par Datadog à partir desquels le test doit être exécuté. De nombreux sites AWS répartis dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][3]. Vous pouvez également configurer un [site privé][4] pour lancer un test API Synthetic sur un endpoint privé qui n'est pas accessible à partir de l'Internet public.
7. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois par minute à une fois par semaine.
8. Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse devrait s'afficher sur le côté droit de votre écran.

[1]: /fr/synthetics/identify_synthetics_bots/
[2]: /fr/synthetics/
[3]: /fr/api/#get-available-locations
[4]: /fr/synthetics/private_locations/
{{% /tab %}}

{{% tab "Test SSL" %}}

{{< img src="synthetics/api_tests/make-ssl-request.png" alt="Définir une requête SSL"  style="width:80%;" >}}

1. **Choose a request type** : `SSL`.
2. Précisez le `Host` et le `Port` SSL. Par défaut, le port est défini sur _443_.
3. Ajoutez des **Advanced Options** (facultatif) à votre test : 
  * Accept self-signed certificates : ignorez les erreurs liées au certificat auto-signé.
  * Client certificate : authentifiez-vous via mTLS en important votre certificat client et la clé privée associée.

4. **Name** : le nom de votre test SSL.
5. **Select your tags** : les tags à appliquer à votre test SSL. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetic Monitoring][1].
6. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS répartis dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacement privé][3] pour lancer votre test SSL Synthetic sur un host privé qui n'est pas accessible à partir de l'Internet public.
7. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois par minute à une fois par semaine.
8. Cliquez sur **Test Connection** pour essayer la configuration de requête. Un aperçu de la réponse devrait s'afficher sur le côté droit de votre écran.

[1]: /fr/synthetics/
[2]: /fr/api/#get-available-locations
[3]: /fr/synthetics/private_locations/
{{% /tab %}}

{{% tab "Test TCP" %}}

{{< img src="synthetics/api_tests/tcp_test.png" alt="Définir une requête TCP"  style="width:80%;" >}}

1. **Choose a request type** : `TCP`.
2. Précisez le `Host` et le `Port` TCP.
3. **Name** : le nom de votre test TCP.
4. **Select your tags** : les tags à appliquer à votre test TCP. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetic Monitoring][1].
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS répartis dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacement privé][3] pour lancer votre test TCP Synthetic sur un host ou un port privé qui n'est pas accessible à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois par minute à une fois par semaine.
7. Cliquez sur **Test URL** pour essayer la configuration de requête et voir un aperçu de la réponse à droite.

[1]: /fr/synthetics/
[2]: /fr/api/#get-available-locations
[3]: /fr/synthetics/private_locations/
{{% /tab %}}

{{% tab "Test DNS" %}}

{{< img src="synthetics/api_tests/dns_test.png" alt="Définir une requête DNS"  style="width:80%;" >}}

1. **Choose a request type** : `DNS`.
2. Précisez le `Domain` et l'éventuel `DNS Server` à utiliser.
3. **Name** : le nom de votre test DNS.
4. **Select your tags** : les tags à appliquer à votre test DNS. Utilisez le format `<KEY>:<VALUE>` pour filtrer une valeur `<VALUE>` pour une clé `<KEY>` donnée sur la [page Synthetic Monitoring][1].
5. **Locations** : les emplacements gérés par Datadog à partir desquels le test doit être exécuté. De nombreux emplacements AWS répartis dans le monde entier sont disponibles. Vous pouvez récupérer la liste complète via l'[API Datadog][2]. Vous pouvez également configurer un [emplacements privé][3] pour lancer un test DNS Synthetic sur un domaine privé qui ne peut pas être résolu à partir de l'Internet public.
6. **How often should we run the test?** : utilisez cette option pour définir la fréquence d'exécution du test. Cette fréquence peut aller d'une fois par minute à une fois par semaine.
7. Cliquez sur **Test URL** pour essayer la configuration de requête et voir un aperçu de la réponse à droite.

[1]: /fr/synthetics/
[2]: /fr/api/#get-available-locations
[3]: /fr/synthetics/private_locations/
{{% /tab %}}

{{< /tabs >}}

### Assertions

Lorsque vous exécutez un test API, vous devez définir au moins une assertion gérée par Datadog. Une assertion est définie par un paramètre, une propriété facultative, un comparateur et une valeur cible.

{{< tabs >}}

{{% tab "Test HTTP" %}}

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][1] | _Chaîne_ <br> _[Regex][2]_ <br> _Chaîne_, _[Regex][2]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Regex][2]_                                      |
| response time | `is less than`                                                                                         | _Nombre entier (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Nombre entier_                                                      |

**Remarque** : les tests HTTP peuvent décompresser les corps de réponse contenant les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

Si vous cliquez sur **Test URL**, les assertions de base sont automatiquement renseignées :

- `response time` _is less than_ 1000 ms
- `status code` _is_ « valeur renvoyée »
- `header` `content-type` _is_ « valeur renvoyée »

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "Test SSL" %}}

| Type          | Opérateur                                                                               | Type de valeur                 |
|---------------|----------------------------------------------------------------------------------------|----------------------------|
| certificate   | `expires in more than`, `expires in less than`                                         | _Nombre entier (nombre de jours)_ |
| property      | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | _Chaîne_ <br> _[Regex][1]_ |
| response time | `is less than`                                                                         | _Nombre entier (ms)_             |
| TLS version   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Nombre décimal_                  |

Si vous cliquez sur **Test URL**, l'assertion de base est automatiquement renseignée :

- `certificate` _expires in more than_ 10 days
- `response time` _is less than_ 1000 ms.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{% tab "Test TCP" %}}

| Type          | Opérateur                                                                | Type de valeur     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | _Nombre entier (ms)_ |

Si vous cliquez sur **Test URL**, l'assertion de base est automatiquement renseignée :

- `response time` _is less than_ 1000 ms.

{{% /tab %}}

{{% tab "Test DNS" %}}

| Type                | Type d'enregistrement             | Opérateur                                           | Type de valeur                 |
|---------------------|-------------------------|----------------------------------------------------|----------------------------|
| response time       |                         | `is less than`                                     | _Nombre entier (ms)_             |
| every record        | of type A, of type AAAA | `is`, `contains`, <br> `matches`, `does not match` | _Chaîne_ <br> _[Regex][1]_ |
| at least one record | of type A, of type AAAA | `is`, `contains`, <br> `matches`, `does not match` | _Chaîne_ <br> _[Regex][1]_ |

Si vous cliquez sur **Test URL**, les assertions de base sont automatiquement renseignées :

- `response time` _is less than_ 1 000 ms
- `at least one record` `of type A` _is_ « valeur renvoyée » (le cas échéant)
- `at least one record` `of type AAAA` _is_ « valeur renvoyée » (le cas échéant)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
{{% /tab %}}

{{< /tabs >}}

Vous pouvez créer jusqu'à 10 assertions par test API en cliquant sur **Add new assertion** ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_setup.mp4" alt="Configurer les assertions" video="true" width="80%" >}}


### Conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur : `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche si :

* Au moins un emplacement était en échec (au moins une assertion a échoué) au cours des *X* dernières minutes, **et**
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements étaient en échec.

La barre d'uptime s'affiche différemment sur vos résultats de test : l'uptime d'un site est affiché pour chaque évaluation (quels que soient les résultats du dernier test). L'uptime total est affiché selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la barre d'uptime total.

#### Nouvelle tentative rapide

Vous pouvez choisir le nombre de tentatives à effectuer avant qu'un site soit considéré comme *en échec*. Par défaut, les tests Synthetic n'effectuent aucune nouvelle tentative après un échec pour un emplacement donné.

### Utiliser des variables globales

Les [variables globales définies sur la page `Settings`][2] peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests API. Pour afficher la liste de vos variables, saisissez `{{` dans le champ souhaité.

{{< img src="synthetics/api_tests/usingvariablesapi.mp4" alt="Utiliser des variables dans les tests API" video="true" width="80%" >}}

### Informer votre équipe

Une notification est envoyée selon les conditions d'alerte définies. Pour configurer les notifications :

1. Sélectionnez les utilisateurs et/ou les [services][3] qui recevront les notifications. **Remarque** : tout comme pour les monitors, la [fonctionnalité `@-notifications`][4] peut être utilisée dans le champ **message**.
2. Saisissez un **message** pour le test API. Ce champ accepte l'utilisation du [format de mise en forme Markdown][5] standard ainsi que les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Afficher en cas d'alerte du monitor                                            |
    | `{{^is_alert}}`            | Afficher sauf en cas d'alerte du monitor                                          |
    | `{{#is_recovery}}`         | Afficher lorsque le monitor est rétabli depuis un état ALERT   |
    | `{{^is_recovery}}`         | Afficher sauf si le monitor est rétabli depuis un état ALERT |

    Les messages de notification comprennent le **message** défini dans cette section ainsi que des informations sur les assertions qui ont échoué et les raisons de cet échec.
3. Indiquez une fréquence de renvoi de notifications. Pour éviter de renvoyer des notifications pour les tests qui ont échoué, choisissez l'option `Never renotify if the monitor has not been resolved`.
4. Cliquez sur **Save**.

Exemples de notifications :

{{< img src="synthetics/api_tests/notifications-example.png" alt="Notifications de test API" style="width:80%;" >}}

## Calculs de temps des opérations réseau

La page de détails Synthetic présente les calculs de temps suivants :

| Temps                      | Description                                                                                           |
|-----------------------------|-------------------------------------------------------------------------------------------------------|
| `DNS`                       | Temps passé à résoudre le nom DNS de la dernière requête.                                                |
| `Connect`                   | Temps passé à établir une connexion au serveur.                                                   |
| `SSL`                       | Temps passé à établir la liaison TLS. Si la dernière requête ne suit pas le protocole HTTPS, cette métrique n'apparaît pas. |
| `TTFB (time to first byte)` | Temps écoulé avant la réception du premier octet de la réponse.                                     |
| `Download`                  | Temps passé à télécharger la réponse.                                                                  |

Le temps de réponse est la somme de ces calculs de temps des opérations réseau.

## Échec d'un test

Un test est considéré comme `FAILED` s'il ne répond pas à ses assertions ou si la requête a échoué pour une autre raison. Ces raisons incluent :

| Erreur             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou plantage du serveur Web lors de la réponse ou perte de connectivité du serveur Web.                                                                                                                                                                                                                                                         |
| DNS               | Entrée DNS introuvable pour l'URL du check. Causes possibles : URL du check mal configurée, configuration des entrées DNS incorrecte, etc.                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | La configuration du check n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).                                                                                                                                                                                                                                                                                                                                                                                     |
| `SSL`             | La connexion SSL n'a pas pu être effectuée. [Consultez la page dédiée à ce type d'erreurs pour en savoir plus][7].                                                                                                                                                                                                                                                                                                                                                      |
| `TIMEOUT`         | La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreur `TIMEOUT` peuvent se produire. `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de la connexion au socket TCP. `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de son traitement global (qui comprend la connexion au socket TCP, le transfert de données et les assertions). |

Si un test échoue, l'uptime considère directement que l'endpoint est `down`. Il n'est pas retesté avant le prochain test.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/#get-available-locations
[2]: /fr/synthetics/settings/#global-variables
[3]: /fr/integrations/#cat-notification
[4]: /fr/monitors/notifications/#notification
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: /fr/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /fr/synthetics/api_tests/errors/#ssl-errors