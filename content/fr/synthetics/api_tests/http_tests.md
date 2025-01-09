---
aliases:
- /fr/synthetics/http_test
- /fr/synthetics/http_check
description: Simuler des requêtes HTTPS pour surveiller les endpoints d'API publics
  et internes
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests HTTP
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des tests HTTP sur des endpoints internes
- link: /synthetics/multistep
  tag: Documentation
  text: Exécuter des tests HTTP à plusieurs étapes
title: Tests HTTP
---
## Présentation

Les tests HTTP vous permettent d'envoyer des requêtes HTTP aux endpoints d'API de vos applications pour vérifier les réponses et les conditions définies, y compris le temps de réponse global, le code de statut attendu, l'en-tête ou le contenu du corps.

Les tests HTTP peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau. Les tests HTTP peuvent être exécutés selon un programme, à la demande ou directement dans vos [pipelines de CI/CD][3].

## Procédure à suivre

Après avoir choisi de créer un test `HTTP`, définissez la requête de votre test.

### Définir la requête

1. Choisissez une valeur pour **HTTP Method** et indiquez l'**URL** à interroger. Les méthodes disponibles sont `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`. Les URL `http` et `https` sont prises en charge.
2. Enrichissez votre requête HTTP en modifiant les réglages de la section **Advanced Options** (facultatif) :

   {{< tabs >}}

   {{% tab "Options de requête" %}}

   * **Follow redirects** : sélectionnez cette option pour que le test HTTP suive jusqu'à dix redirections lors de l'exécution de la requête.
   * **Timeout** : permet de spécifier le délai (en secondes) avant l'expiration du test.
   * **Request headers** : définissez les en-têtes à ajouter à votre requête HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
   * **Cookies** : définissez les cookies à ajouter à votre requête HTTP. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.

   {{% /tab %}}

   {{% tab "Authentification" %}}

   * **HTTP Basic Auth** : ajoutez des identifiants d'authentification basique HTTP.
   * **Digest Auth** : ajoutez des identifiants d'authentification Digest.
   * **NTLM** : ajoutez les informations d'authentification NTLM. NTLMv2 et NTLMv1 sont pris en charge.
   * **AWS Signature v4** : saisissez votre ID de clé d'accès et votre clé d'accès secrète. Datadog génère alors la signature pour votre requête. Cette option repose sur une implémentation de base de SigV4. Les signatures spécifiques (par exemple pour AWS S3) ne sont pas implémentées.

  </br>Si vous le souhaitez, vous pouvez spécifier le domaine et la station de travail dans la section **Additional configuration**.  

   {{% /tab %}}

   {{% tab "Paramètres de requête" %}}

   * **Encode parameters** : ajoutez le nom et la valeur des paramètres de requête nécessitant un encodage.

   {{% /tab %}}

   {{% tab "Corps de requête" %}}

   * **Body type** : sélectionnez le type du corps de requête (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded` ou `None`) que vous voulez ajouter à votre requête HTTP.
   * **Request body** : ajoutez le contenu du corps de votre requête HTTP. La taille du corps de la requête ne doit pas dépasser 50 Ko.

   {{% /tab %}}

   {{% tab "Certificat" %}}

   * **Ignore server certificate error** : sélectionnez cette option pour que votre test HTTP poursuive son processus de connexion même lorsque des erreurs de validation du certificat SSL surviennent.
   * **Client certificate** : authentifiez-vous via mTLS en important votre certificat client (`.crt`) et la clé privée associée (`.key`) au format `PEM`. Vous pouvez utiliser la bibliothèque `openssl` pour convertir vos certificats. Par exemple, vous pouvez convertir un certificat `PKCS12` en certificat et clé privée au format `PEM`.

     ```
     openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
     openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
     ```

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL** : indiquez l'URL du proxy que la requête HTTP doit utiliser (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).
   * **Proxy header** : ajoutez les en-têtes à inclure dans la requête HTTP envoyée au proxy.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   * **Do not save response body** : sélectionnez cette option pour désactiver l'enregistrement du corps de la réponse au moment de l'exécution. Cela peut être utile pour s'assurer qu'aucune donnée sensible ne figure dans les résultats de test. Utilisez cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour découvrir d'autres recommandations de sécurité, consultez [Sécurité de la surveillance Synthetic][1].


[1]: /fr/security/synthetics
   {{% /tab %}}

   {{< /tabs >}}

<br/>

3. **Donnez un nom** à votre test HTTP.

4. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test HTTP. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][4].

{{< img src="synthetics/api_tests/http_test_config.png" alt="Définir une requête HTTP" style="width:90%;" >}}

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Après avoir cliqué sur **Test URL**, les assertions de base pour `response time`, `status code` et `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][5], [`xpath`][6] | _Chaîne_ <br> _[Regex][7]_ <br> _Chaîne_, _[Regex][7]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Regex][7]_                                      |
| response time | `is less than`                                                                                         | _Nombre entier (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Nombre entier_                                                      |

Les tests HTTP peuvent décompresser les corps de réponse contenant les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

Vous pouvez créer jusqu'à 20 assertions par test API en cliquant sur **New Assertion** ou en sélectionnant directement l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_http.png" alt="Définir des assertions pour déterminer la réussite ou l'échec de votre test HTTP" style="width:90%;" >}}

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

Si un test contient une assertion sur le corps de la réponse et que le délai d'expiration est atteint, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test HTTP. Les tests HTTP peuvent être exécutés depuis des [emplacements gérés][1] et des [emplacements privés][2], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau.

### Indiquer la fréquence du test

Les tests HTTP peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux endpoints. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test HTTP.
* [**Dans vos pipelines de CI/CD**][3], pour déployer votre code sans crainte de dégrader l'expérience de vos utilisateurs.
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour votre équipe.

### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if your test fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Informer votre équipe

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Référez-vous à cette section pour définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][8], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][9] standard ainsi que les [variables conditionnelles][10] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

Cliquez sur **Save** pour enregistrer et démarrer votre test.

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

Les [variables globales définies sur la page `Settings`][11] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests HTTP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utiliser des variables dans les tests API" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint.

Voici la liste des erreurs concernées :

`CONNREFUSED`
: Aucune connexion n'a pu être établie, en raison d'un refus explicite de la machine cible.

`CONNRESET`
: La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, ou configuration des entrées DNS incorrecte.

`INVALID_REQUEST` 
: La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).

`SSL`
: La connexion SSL n'a pas pu être établie. [Pour en savoir plus, consultez la page relative aux erreurs][12].

`TIMEOUT`
: La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreurs `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la durée de la requête a dépassé le délai d'expiration défini (par défaut, 60 secondes).
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si rien d'autre que `Total response time` ne s'affiche, cela signifie que l'expiration est survenue durant la résolution DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée du test (requête + assertions) a atteint la durée maximale (60,5 secondes).

`MALFORMED_RESPONSE` 
: Le serveur à distance a répondu avec une charge utile non conforme aux spécifications HTTP.

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][13] peuvent créer, modifier et supprimer des tests HTTP Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][13]. 

Si vous utilisez des [rôles personnalisés][14], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][15] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez faire en sorte que certains rôles au sein de votre organisation ne puissent pas accéder à un test HTTP. Lors de la création du test HTTP, choisissez les rôles (en plus des utilisateurs) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[2]: /fr/synthetics/private_locations
[3]: /fr/synthetics/cicd_integrations
[4]: /fr/synthetics/search/#search
[5]: https://restfulapi.net/json-jsonpath/
[6]: https://www.w3schools.com/xml/xpath_syntax.asp
[7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[8]: /fr/monitors/notify/#notify-your-team
[9]: https://www.markdownguide.org/basic-syntax/
[10]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[11]: /fr/synthetics/settings/#global-variables
[12]: /fr/synthetics/api_tests/errors/#ssl-errors
[13]: /fr/account_management/rbac/
[14]: /fr/account_management/rbac#custom-roles
[15]: /fr/account_management/rbac/#create-a-custom-role