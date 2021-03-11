---
title: Tests TCP
kind: documentation
description: Simuler des connexions TCP sur vos hosts depuis des connexions spécifiques
aliases:
  - /fr/synthetics/tcp_test
  - /fr/synthetics/tcP_check
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Débuter avec les tests API
  - link: /synthetics/private_locations
    tag: Documentation
    text: Exécuter des tests TCP sur des hosts internes
---
## Présentation

Les tests TCP vous permettent de **surveiller facilement que des connexions TCP de bas niveau peuvent être établies avec les ports des hosts donnés**. Cela vous assure ainsi la disponibilité de divers services essentiels, comme `SSH` (22), `SMTP` (25), `DNS` (53), VPN via `HTTPS` (443), ainsi que tous les autres services personnalisés passant par d'autres ports. Grâce aux données intégrées relatives aux temps de réponse, vous pouvez surveiller les performances de vos applications réseau et être alerté en cas de lenteur inattendue.
Les tests TCP peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous lancez vos connexions TCP à l'**extérieur ou au sein de votre réseau**.

## Configuration

Après avoir sélectionné le type de test que vous souhaitez créer ([`HTTP`][3], [`SSL`][4], [`TCP`][5] ou [`DNS`][6]), vous pouvez définir votre requête de test.

### Définir la requête

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="Définir une connexion TCP"  style="width:90%;" >}}

1. Indiquez le **Host** et le **Port** sur lesquels vous souhaitez exécuter votre test. Par défaut, le port est défini sur _`443`_.
2. **Donnez un nom** à votre test TCP.
3. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test TCP. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][7].
4. Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test TCP. Les tests TCP peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous souhaitez lancer vos connexions à l'extérieur ou au sein de votre réseau.

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Indiquer la fréquence du test

Les tests TCP peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux services. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test TCP.

{{< img src="synthetics/api_tests/schedule.png" alt="Exécuter des tests API selon un programme"  style="width:90%;" >}}

* [**Dans vos pipelines de CI/CD**][8].
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour vos équipes.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur `Test URL`, les assertions de base pour `response time` sont ajoutées. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type          | Opérateur                                                                | Type de valeur     |
|---------------|-------------------------------------------------------------------------|----------------|
| response time | `is less than`                                                          | _Nombre entier (ms)_ |

Vous pouvez créer jusqu'à 10 assertions par test API en cliquant sur **New assertion** ou directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions.png" alt="Définir les assertions pour votre test TCP" style="width:90%;" >}}

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

1. [Tout comme pour les monitors][10], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification ` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][11] standard ainsi que les [variables conditionnelles][12] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

Les notifications par e-mail incluent le message défini dans cette section ainsi qu'un résumé des assertions qui ont échoué.
Exemples de notification :

{{< img src="synthetics/api_tests/notifications-example.png" alt="Notifications de test API" style="width:90%;" >}}

Cliquez sur **Save** pour enregistrer votre test. Datadog se charge alors de son exécution.

## Variables

### Créer des variables locales

Vous pouvez créer des variables locales en définissant leurs valeurs sur l'un des builtins disponibles ci-dessous :

| Pattern                    | Description                                                                                                 |
|----------------------------|-------------------------------------------------------------------------------------------------------------|
| `{{ numeric(n) }}`         | Génère une chaîne numérique de `n` chiffres.                                                                 |
| `{{ alphabetic(n) }}`      | Génère une chaîne alphabétique de `n` lettres.                                                            |
| `{{ alphanumeric(n) }}`    | Génère une chaîne alphanumérique de `n` caractères.                                                       |
| `{{ date(n, format) }}`    | Génère une date dans l'un des formats acceptés. Sa valeur correspond à la date d'initiation du test + `n` jours.        |
| `{{ timestamp(n, unit) }}` | Génère un timestamp dans l'une des unités acceptées. Sa valeur correspond au timestamp d'initiation du test +/- `n` unités choisies. |

### Utiliser des variables

Les [variables globales définies sur la page `Settings`][13] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests TCP.
Pour afficher la liste de vos variables, saisissez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utiliser des variables dans les tests API" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint. Voici la liste des erreurs concernées :

| Erreur             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CONNRESET`       | La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.                                                                                                                                                                                                                                                         |
| DNS               | L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, configuration des entrées DNS incorrecte, etc.                                                                                                                                                                                                                                                                                                                  |
| `INVALID_REQUEST` | La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).                                                                                                                                                                                                                                                                                                                                                                                     |
| `TIMEOUT`         | La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreur `TIMEOUT` peuvent se produire. <br> - Une erreur `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de la connexion au socket TCP. <br> - Une erreur `TIMEOUT: Retrieving the response couldn’t be completed in a reasonable time.` indique que la requête a expiré lors de son traitement global (qui comprend la connexion au socket TCP, le transfert de données et les assertions). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /fr/synthetics/private_locations
[3]: /fr/synthetics/api_tests/http_tests
[4]: /fr/synthetics/api_tests/ssl_tests
[5]: /fr/synthetics/api_tests/tcp_tests
[6]: /fr/synthetics/api_tests/dns_tests
[7]: /fr/synthetics/search/#search
[8]: /fr/synthetics/ci
[9]: /fr/api/v1/synthetics/#create-a-test
[10]: /fr/monitors/notifications/?tab=is_alert#notification
[11]: https://www.markdownguide.org/basic-syntax/
[12]: /fr/monitors/notifications/?tab=is_recoveryis_alert_recovery#conditional-variables
[13]: /fr/synthetics/settings/#global-variables
[14]: /fr/synthetics/api_tests/errors/#ssl-errors