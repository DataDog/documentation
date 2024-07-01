---
title: Tests SSL
description: Surveillez vos certificats SSL depuis divers emplacements dans le monde
aliases:
  - /fr/synthetics/ssl_test
  - /fr/synthetics/ssl_check
further_reading:
  - link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
    tag: Blog
    text: Présentation de la surveillance Synthetic Datadog
  - link: /getting_started/synthetics/api_test
    tag: Documentation
    text: Débuter avec les tests API
  - link: /synthetics/private_locations
    tag: Documentation
    text: Exécuter des tests SSL sur des hosts internes
---
## Présentation

Les tests SSL vous permettent de surveiller de façon proactive la validité et l'expiration des certificats SSL/TLS afin de veiller à ce que vos utilisateurs puissent se connecter de façon sécurisée à vos principaux services. Si votre certificat est sur le point d'expirer ou s'il est compromis, Datadog vous envoie une alerte détaillée de l'erreur pour que vous puissiez identifier rapidement la cause du problème et résoudre ce dernier.

Les tests SSL peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau. Les tests SSL peuvent être exécutés de façon récurrente, à la demande ou directement dans vos [pipelines de CI/CD][3].

## Configuration

Après avoir choisi de créer un test `SSL`, définissez la requête de votre test.

### Définir la requête

1. Indiquez le **Host** et le **Port** sur lesquels vous souhaitez exécuter votre test. Par défaut, le port est défini sur _`443`_.
2. Définissez dans la section **Advanced Options** des options avancées pour votre test (facultatif) : 
    * **Accept self-signed certificates** : ignorer toute erreur de serveur liée à un certificat auto-signé.
    * **Fail on revoked certificate in stapled OCSP** : faire échouer le test si le certificat est indiqué comme révoqué dans l'agrafage OCSP.
    * **Timeout** : permet de spécifier le délai (en secondes) avant l'expiration du test.
    * **Server Name** : spécifie le serveur sur lequel la négociation TLS doit être initiée, permettant au serveur de présenter un des multiples certificats possibles sur la même adresse IP et le même numéro de port TCP. Par défaut, la valeur du **host** est utilisée pour renseigner ce paramètre.
    * **Client certificate** : procéder à l'authentification via mTLS en important votre certificat client (`.crt`) et la clé privée associée (`.key`) au format `PEM`. **Remarque** : vous pouvez utiliser la bibliothèque `openssl` pour convertir vos certificats. Par exemple, il est possible de convertir un certificat `PKCS12` en certificats et clés privées au format `PEM`.

  ```
  openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
  openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
  ```

3. **Donnez un nom** à votre test SSL.

4. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test SSL. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][4].

{{< img src="synthetics/api_tests/ssl_test_config.png" alt="Définir une requête SSL" style="width:90%;" >}}

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur `Test URL`, les assertions de base pour la validité du certificat, les données d'expiration, la version TLS et `response time` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type                  | Opérateur                                                                               | Type de valeur                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| certificat           | `expires in more than`, `expires in less than`                                         | _Nombre entier (nombre de jours)_ |
| propriété              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | Chaîne <br> _[Regex][5]_ |
| response time         | `is less than`                                                                         | _Nombre entier (ms)_             |
| version TLS maximale   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Nombre décimal_                  |
| version TLS minimale   | `is more than`, `is more than or equal`                                                | _Nombre décimal_                  |

Vous pouvez créer jusqu'à 20 assertions par test API en cliquant sur **New Assertion** ou en sélectionnant directement l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions.png" alt="Définir les assertions pour votre test SSL" style="width:90%;" >}}

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test SSL. Les tests SSL peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous souhaitez exécuter le test à l'extérieur ou au sein de votre réseau.

### Indiquer la fréquence du test

Les tests SSL peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos certificats SSL/TLS sont toujours valides et que vos utilisateurs peuvent toujours se connecter de façon sécurisée à vos principaux services. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test SSL.
* [**Dans vos pipelines de CI/CD**][3].
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour votre équipe.

### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes.
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Informer votre équipe

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Référez-vous à cette section pour définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][6], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][7] standard ainsi que les [variables conditionnelles][8] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

Cliquez sur **Save** pour enregistrer votre test. Datadog se charge alors de son exécution.

## Variables

### Créer des variables locales

Vous pouvez créer des variables locales en cliquant sur **Create Local Variable** en haut à droite du formulaire de configuration de votre test. Vous pouvez définir leurs valeurs sur l'un des builtins disponibles ci-dessous :

`{{ numeric(n) }}`
: Génère une chaîne numérique de `n` chiffres.

`{{ alphabetic(n) }}`
: Génère une chaîne alphabétique de `n` lettres.

`{{ alphanumeric(n) }}`
: Génère une chaîne alphanumérique de `n` caractères.

`{{ date(n, format) }}`
: Génère une date dans l'un des formats acceptés. Sa valeur correspond à la date d'initiation du test + `n` jours.

`{{ timestamp(n, unit) }}` 
: Génère un timestamp dans l'une des unités acceptées. Sa valeur correspond au timestamp d'initiation du test +/-  `n` unités choisies.

### Utiliser des variables

Les [variables globales définies sur la page `Settings`][9] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests SSL.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utiliser des variables dans les tests API" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint.

Voici la liste des erreurs concernées :

`CONNRESET`
: La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, ou configuration des entrées DNS incorrecte.

`INVALID_REQUEST` 
: La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).

`SSL`
: La connexion SSL n'a pas pu être établie. [Pour en savoir plus, consultez la page relative aux erreurs][10].

`TIMEOUT`
: La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreur `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la durée de la requête a dépassé le délai d'expiration défini (par défaut, 60 secondes).
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si rien d'autre que `Total response time` ne s'affiche, cela signifie que l'expiration est survenue durant la résolution DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée du test (requête + assertions) a atteint la durée maximale (60,5 secondes).

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin Datadog et Standard Datadog][11] peuvent créer, modifier et supprimer des tests SSL Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][11]. 

Si vous avez accès aux [rôles personnalisés][12], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /fr/synthetics/private_locations
[3]: /fr/synthetics/cicd_integrations
[4]: /fr/synthetics/search/#search
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[6]: /fr/monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /fr/synthetics/settings/#global-variables
[10]: /fr/synthetics/api_tests/errors/#ssl-errors
[11]: /fr/account_management/rbac/
[12]: /fr/account_management/rbac#custom-roles