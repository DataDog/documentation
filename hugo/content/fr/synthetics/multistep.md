---
description: Créer des chaînes de requêtes pour surveiller des transactions complexes
  sur vos services essentiels
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: Blog
  text: Surveiller vos workflows grâce aux tests API à plusieurs étapes Datadog
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des tests API à plusieurs étapes sur des endpoints internes
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Créer et gérer des tests API Synthetic à plusieurs étapes avec Terraform
title: Tests API à plusieurs étapes
---

## Présentation

Grâce aux tests API à plusieurs étapes, vous pouvez exécuter plusieurs [requêtes HTTP][1] à la suite afin d'effectuer une surveillance proactive et de vous assurer que les parcours complexes de vos services clés sont disponibles en tout temps et tout lieu. Si vous souhaitez transmettre à vos services des requêtes individuelles, utilisez plutôt des [tests API][2].

Vous pouvez effectuer les opérations suivantes :

* Exécutez des requêtes HTTP sur des endpoints d'API nécessitant une authentification (par exemple, via un token).
* Surveillez des transactions commerciales essentielles au niveau de l'API.
* Simulez toutes les étapes des parcours utilisateur sur des applications mobiles.

{{< img src="synthetics/api_tests/ms_overview.png" alt="Présentation du test API à plusieurs étapes" style="width:90%;" >}}

Si l'un de vos services est moins réactif ou si ses réponses ne correspondent pas à vos attentes (corps de réponse ou code de statut inattendu, etc.), votre test peut [**prévenir votre équipe**][3], [**bloquer votre pipeline de CI**][4] ou même [**annuler le déploiement à l'origine de l'erreur**][4].

Les tests API à plusieurs étapes peuvent s'exécuter depuis des [emplacements gérés][5] par Datadog et des [emplacements privés][6]. Ainsi, vous bénéficiez d'une **couverture complète de vos systèmes**, en interne comme en externe.

## Configuration

### Nommer votre test et y ajouter des tags

1. Attribuez un nom à votre test API à plusieurs étapes.
2. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test API à plusieurs étapes. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][7].

### Sélectionner des emplacements

Sélectionnez les **emplacements** de votre test API à plusieurs étapes. Les tests API peuvent être exécutés depuis des [emplacements gérés][5] et des [emplacements privés][6], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau.

### Définir des étapes

Pour créer une étape de requête HTTP, cliquez sur **Create Your First Step**.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Créer les requêtes de votre test API à plusieurs étapes" style="width:100%;" >}}

**Remarque :** par défaut, vous ne pouvez pas créer plus de 10 étapes. Pour augmenter cette limite, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.

#### Définir une requête

1. **Donnez un nom** à votre étape.
2. Choisissez une valeur pour **HTTP Method** et indiquez l'**URL** à interroger. Les méthodes disponibles sont `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` et `OPTIONS`. Les URL `http` et `https` sont prises en charge.
3. Enrichissez votre requête HTTP en modifiant les réglages de la section **Advanced Options** (facultatif) :

   {{< tabs >}}

   {{% tab "Options de requête" %}}

   * **Follow redirects** : activez cette option pour que votre test HTTP suive jusqu'à dix redirections lors de l'exécution de la requête.
   * **Request headers** : définissez les en-têtes à ajouter à votre requête HTTP. Vous pouvez également remplacer les en-têtes par défaut (par exemple, l'en-tête `user-agent`).
   * **Cookies** : définissez les cookies à ajouter à votre requête HTTP. Définissez plusieurs cookies en suivant le format `<COOKIE_NOM1>=<COOKIE_VALEUR1>; <COOKIE_NOM2>=<COOKIE_VALEUR2>`.

   {{% /tab %}}

   {{% tab "Authentification" %}}

   * **HTTP Basic Auth** : ajoutez des identifiants d'authentification basique HTTP.
   * **Digest Auth** : ajoutez des identifiants d'authentification Digest.
   * **NTLM v1** : ajoutez vos identifiants d'authentification NTLM.
   * **AWS Signature v4** : saisissez votre ID de clé d'accès et votre clé d'accès secrète. Datadog génère alors la signature pour votre requête. Cette option repose sur une implémentation de base de SigV4. Les signatures spécifiques (par exemple pour AWS S3) ne sont pas implémentées.

   {{% /tab %}}

   {{% tab "Paramètres de requête" %}}

   * **Encode parameters** : ajoutez le nom et la valeur des paramètres de requête nécessitant un encodage.

   {{% /tab %}}

   {{% tab "Corps de requête" %}}

   * **Body type** : sélectionnez le type du corps de requête (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded` ou `None`) que vous voulez ajouter à votre requête HTTP.
   * **Request body** : ajoutez le contenu du corps de votre requête HTTP. La taille du corps de la requête ne doit pas dépasser 50 Ko.

   {{% /tab %}}

   {{% tab "Certificat" %}}

   * **Ignore server certificate error** : activez cette option pour que votre test HTTP poursuive son processus de connexion même lorsque des erreurs de validation du certificat SSL surviennent.
   * **Client certificate** : authentifiez-vous via mTLS en important votre certificat client et la clé privée associée.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL** : indiquez l'URL du proxy que la requête HTTP doit utiliser (`http://<VOTRE_UTILISATEUR>:<VOTRE_MOT_DE_PASSE>@<VOTRE_IP>:<VOTRE_PORT>`).
   * **Proxy Header** : ajoutez les en-têtes à inclure dans la requête HTTP envoyée au proxy.

   {{% /tab %}}

   {{% tab "Confidentialité" %}}

   * **Do not save response body** : sélectionnez cette option pour désactiver l'enregistrement du corps de la réponse au moment de l'exécution. Cela vous permet de vous assurer qu'aucune donnée sensible ne figure dans les résultats de test. Utilisez toutefois cette option avec précaution, car elle peut rendre plus difficile le dépannage des problèmes. Pour découvrir d'autres recommandations de sécurité, consultez la section [Sécurité de la surveillance Synthetic][1].

[1]: /fr/security/synthetics
   {{% /tab %}}

   {{< /tabs >}}

Cliquez sur **Test URL** pour tester la configuration de requête. Un aperçu de la réponse s'affiche alors.

{{< img src="synthetics/api_tests/ms_define_request.png" alt="Définir une requête pour votre test API à plusieurs étapes" style="width:90%;" >}}

#### Ajouter des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur **Test URL**, les assertions de base pour `response time`, `status code` et `header` `content-type` sont ajoutées en fonction de la réponse obtenue. Les assertions sont facultatives pour les tests API à plusieurs étapes.

| Type          | Opérateur                                                                                               | Type de valeur                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][8], [`xpath`][9] | _Chaîne_ <br> _[Regex][10]_ <br> _Chaîne_, _[Regex][10]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Chaîne_ <br> _[Regex][10]_                                      |
| response time | `is less than`                                                                                         | _Nombre entier (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Nombre entier_                                                      |

**Remarque** : les tests HTTP peuvent décompresser les corps de réponse contenant les en-têtes `content-encoding` suivants : `br`, `deflate`, `gzip` et `identity`.

Vous pouvez créer jusqu'à 20 assertions par étape en cliquant sur **New assertion** ou directement sur l'aperçu de la réponse.

{{< img src="synthetics/api_tests/assertions_multi.png" alt="Définir des assertions pour votre test API à plusieurs étapes" style="width:90%;" >}}

#### Ajouter des paramètres d'exécution

Cliquez sur **Continue with test if this step fails** pour que votre test passe aux étapes suivantes en cas d'échec d'une étape.

Cette option permet à vos tests de s'auto-nettoyer. Par exemple, un test peut créer une ressource, effectuer un certain nombre d'actions sur cette ressource, puis finir par supprimer cette ressource. Si vous appliquez ce réglage à chaque étape intermédiaire, en cas d'échec d'une de ces étapes, la ressource est supprimée à la fin du test, et aucun faux positif n'est créé.

Activez l'option **Consider entire test as failed if this step fails** pour chaque étape intermédiaire afin que votre test génère systématiquement une alerte lorsque la réponse de l'un des endpoints est inattendue.

##### Nouvelles tentatives

Votre test peut déclencher X nouvelles tentatives après Y ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

#### Extraire des variables depuis la réponse

Vous pouvez également extraire des variables à partir de la réponse de votre requête HTTP en parsant les en-têtes ou le corps de la réponse. La valeur de la variable est mise à jour à chaque fois que l'étape de requête HTTP est exécutée.

Pour parser votre variable :

1. Donnez un nom à votre variable en renseignant le champ **Variable Name**. Ce nom doit comporter au moins trois caractères et peut uniquement contenir des lettres majuscules, des chiffres et des underscores.
2. Indiquez si la variable doit être extraite à partir des en-têtes ou du corps de la réponse :

    * Extraire la valeur à partir du **Response Header** : utilisez l'en-tête de réponse complet de votre requête HTTP comme valeur de variable, ou parsez l'en-tête à l'aide d'une [`regex`][10].
    * Extraire la valeur à partir du **Response Body** : utilisez le corps de réponse complet de votre requête HTTP comme valeur de variable, ou parsez le corps avec une [`regex`][10], une expression [`JSONPath`][8] ou une expression [`XPath`][9].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extraire des variables depuis des requêtes HTTP dans un test API à plusieurs étapes" style="width:90%;" >}}

Une fois la variable créée, vous pouvez l'utiliser dans les étapes ultérieures de votre test API à plusieurs étapes. Pour en savoir plus, consultez la rubrique [Utiliser des variables](#utiliser-des-variables).

### Indiquer la fréquence du test

Les tests API à plusieurs étapes peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux endpoints. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test API à plusieurs étapes.

{{< img src="synthetics/api_tests/schedule.png" alt="Exécuter des tests API selon un programme" style="width:90%;" >}}

* [**Dans vos pipelines de CI/CD**][4], pour déployer votre code sans craindre de dégrader l'expérience de vos utilisateurs.
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour vos équipes.

### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Informer votre équipe

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Référez-vous à cette section pour définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][11], sélectionnez les **utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][12] standard ainsi que les [variables conditionnelles][13] suivantes :

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

#### Variables extraites

Vous pouvez [extraire des variables à partir de n'importe quelle étape de votre test API à plusieurs étapes](#extraire-des-variables-depuis-la-reponse) et [réinjecter leurs valeurs dans les étapes suivantes](#utiliser-des-variables) de votre test.

#### Variables provenant d'un pattern

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

Les [variables globales définies sur la page `Settings`][14] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests HTTP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utilisation de variables dans les tests API à plusieurs étapes" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` si une étape ne répond pas à une ou plusieurs de ses assertions ou si la requête d'une étape a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint. Voici la liste des erreurs concernées :

`CONNREFUSED`
: Aucune connexion n'a pu être établie, en raison d'un refus explicite de la machine cible.

`CONNRESET`
: La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée ou configuration des entrées DNS incorrecte.

`INVALID_REQUEST` 
: La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).

`SSL`
: La connexion SSL n'a pas pu être établie. [Pour en savoir plus, consultez la page relative aux erreurs][15].

`TIMEOUT`
: La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreur `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la durée de la requête a dépassé le délai d'expiration défini (par défaut, 60 secondes).
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si rien d'autre que `Total response time` ne s'affiche, cela signifie que l'expiration est survenue durant la résolution DNS.
  - Le message `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée de la requête et des assertions a atteint la durée maximale (60,5 secondes).

`MALFORMED_RESPONSE` 
: Le serveur à distance a répondu avec une charge utile non conforme aux spécifications HTTP.

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][16] peuvent créer, modifier et supprimer des tests API Synthetic à plusieurs étapes. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][16]. 

Si vous utilisez la [fonctionnalités de rôle personnalisé][17], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write` pour la surveillance Synthetic.

## Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][18] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez limiter l'accès d'un test API à plusieurs étapes à certains rôles de votre organisation. Lors de la création du test API à plusieurs étapes, choisissez les rôles (en plus de votre utilisateur) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/http_tests
[2]: /fr/synthetics/api_tests/
[3]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[4]: /fr/synthetics/cicd_integrations
[5]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[6]: /fr/synthetics/private_locations
[7]: /fr/synthetics/search/#search
[8]: https://restfulapi.net/json-jsonpath/
[9]: https://www.w3schools.com/xml/xpath_syntax.asp
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[11]: /fr/monitors/notify/?tab=is_alert#notification
[12]: http://daringfireball.net/projects/markdown/syntax
[13]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[14]: /fr/synthetics/settings/#global-variables
[15]: /fr/synthetics/api_tests/errors/#ssl-errors
[16]: /fr/account_management/rbac/
[17]: /fr/account_management/rbac#custom-roles
[18]: /fr/account_management/rbac/#create-a-custom-role