---
description: Enchaînez les requêtes pour surveiller des transactions complexes sur
  vos services clés.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: Blog
  text: Surveillez vos workflows avec les tests API à plusieurs étapes de Datadog
- link: /synthetics/guide/version_history/
  tag: Guide
  text: Historique des versions de Synthetic Monitoring
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécutez des tests API à plusieurs étapes sur des endpoints internes
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Site externe
  text: Créez et gérez des tests API à plusieurs étapes Synthetic avec Terraform
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guide
  text: Exportez les tests API Synthetic vers Terraform
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centre d'apprentissage
  text: Premiers pas avec Synthetic Monitoring et les tests de navigateur
title: Tests API à plusieurs étapes
---
## Présentation {#overview}

Les tests API à plusieurs étapes vous permettent d'enchaîner plusieurs [tests API][1] à la fois pour surveiller de manière proactive et garantir que les parcours complexes sur vos services clés sont disponibles à tout moment et depuis n'importe où. Si vous souhaitez effectuer des requêtes uniques vers vos services, utilisez les [tests API][1].

Vous pouvez effectuer les opérations suivantes :

* Exécutez des requêtes HTTP sur des endpoints d'API nécessitant une authentification (par exemple, via un jeton)
* Surveillez les transactions métier clés au niveau de l'API
* Simulez des parcours d'application mobile de bout en bout

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Étapes de test multiples dans un test API à plusieurs étapes" style="width:90%;" >}}

Si l'un de vos services commence à répondre plus lentement ou de manière inattendue (par exemple, corps de réponse ou code de statut inattendu), votre test peut [**alerter votre équipe**][2], [**bloquer votre pipeline CI**][3] ou même [**annuler le déploiement défectueux**][3].

Les tests API à plusieurs étapes peuvent être exécutés depuis des emplacements [gérés](#select-locations) par Datadog et des [emplacements privés][4], permettant une **couverture complète de vos systèmes**, qu'ils soient externes ou internes.

## Configuration {#configuration}

### Nommez et taguez votre test {#name-and-tag-your-test}

1. Nommez votre test API à plusieurs étapes.
2. Ajoutez `env` et d'autres tags à votre test API à plusieurs étapes. Vous pouvez utiliser ces tags pour filtrer vos tests Synthetic sur la [page Synthetic Monitoring & Continuous Testing][5].

### Sélectionnez des emplacements {#select-locations}

Sélectionnez le {{< ui >}}Locations{{< /ui >}} pour votre test API à plusieurs étapes. Les tests API à plusieurs étapes peuvent être exécutés à partir d'emplacements gérés et d'[emplacements privés][4] selon que vous préférez exécuter le test depuis l'extérieur ou l'intérieur de votre réseau.

{{% managed-locations %}} 

### Définissez les étapes {#define-steps}

Pour créer une étape de requête API, cliquez sur {{< ui >}}Create Your First Step{{< /ui >}}.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Créez les requêtes de votre test API à plusieurs étapes" style="width:90%;" >}}

Par défaut, vous pouvez créer jusqu'à 10 étapes de test. Pour augmenter cette limite, contactez <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.

#### Définissez la requête {#define-the-request}

1. **Nommez** votre étape.
2. Choisissez un type de requête :
   
   {{< tabs >}}
   {{% tab "HTTP" %}}

   Consultez la [documentation sur les tests HTTP][101] pour créer une requête HTTP et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   Consultez la [documentation sur les tests gRPC][102] pour créer une requête gRPC et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [102]: /synthetics/api_tests/grpc_tests/

   {{% /tab %}}

   {{% tab "SSL" %}}

   Consultez la [documentation sur les tests SSL][103] pour créer une requête SSL et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [103]: /synthetics/api_tests/ssl_tests/

   {{% /tab %}}

   {{% tab "DNS" %}}

   Consultez la [documentation sur les tests DNS][104] pour créer une requête DNS et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [104]: /synthetics/api_tests/dns_tests/

   {{% /tab %}}

   {{% tab "WebSocket" %}}

   Consultez la [documentation sur les tests WebSocket][105] pour créer une requête WebSocket et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [105]: /synthetics/api_tests/websocket_tests/

   {{% /tab %}}

   {{% tab "TCP" %}}

   Consultez la [documentation sur les tests TCP][106] pour créer une requête TCP et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [106]: /synthetics/api_tests/tcp_tests/

   {{% /tab %}}

   {{% tab "UDP" %}}

   Consultez la [documentation sur les tests UDP][107] pour créer une requête UDP et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [107]: /synthetics/api_tests/udp_tests/

   {{% /tab %}}

   {{% tab "ICMP" %}}

   Consultez la [documentation sur les tests ICMP][108] pour créer une requête ICMP et ajouter des assertions pour une vérification de comportement ou une vérification de santé. Les assertions sont facultatives dans les tests API à plusieurs étapes.

   [108]: /synthetics/api_tests/icmp_tests/

   {{% /tab %}}

   {{< /tabs >}}

### Ajoutez des paramètres d'exécution {#add-execution-settings}

Sous {{< ui >}}Execution Settings{{< /ui >}}, les options suivantes sont disponibles :

#### Succès de l'étape : {#step-success}

Cliquez sur {{< ui >}}If step succeeds, continue to next step{{< /ui >}} pour laisser votre test se poursuivre avec les étapes suivantes après des étapes réussies.  

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="Capture d'écran des paramètres d'exécution montrant l'option « Continuer à l'étape suivante » en cas de réussite d'une étape" style="width:90%;" >}}

Cliquez sur {{< ui >}}If step succeeds, exit test and mark it as passed{{< /ui >}} pour quitter le test après la réussite d'une étape. Cela empêche l'exécution d'étapes inutiles et évite de marquer le test comme échoué. 

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="Capture d'écran des paramètres d'exécution montrant l'option « Quitter et marquer comme réussi » en cas de réussite d'une étape" style="width:90%;" >}}

#### Échec de l'étape {#step-failure}

Cliquez sur {{< ui >}}If step fails, continue to next step{{< /ui >}} pour poursuivre avec les étapes suivantes après l'échec d'une étape. Lorsque vous sélectionnez cette option, un menu {{< ui >}}and mark test as{{< /ui >}} apparaît. Conservez {{< ui >}}failed{{< /ui >}} (sélectionné par défaut) pour que le test échoue si cette étape échoue. Sélectionnez {{< ui >}}passed{{< /ui >}} afin qu'un échec de cette étape ne fasse pas échouer le test.

Poursuivre après une étape ayant échoué peut être utile pour les tâches de nettoyage lorsque vous souhaitez que les étapes suivantes se déroulent. Par exemple, un test crée une ressource, effectue plusieurs actions dessus, puis la supprime.

Si l'une des étapes intermédiaires échoue, vous souhaitez que ce paramètre soit activé sur chaque étape intermédiaire pour garantir que la ressource soit supprimée à la fin du test et qu'aucun faux positif ne soit créé.

Le test génère une alerte si un endpoint ne répond pas comme prévu. En cas d'échec du test, votre test peut effectuer X nouvelles tentatives, espacées de Y ms. Personnalisez l'intervalle entre les nouvelles tentatives selon votre sensibilité aux alertes.

{{< img src="synthetics/multistep_tests/step_failure.png" alt="Capture d'écran des paramètres d'exécution montrant l'échec d'une étape" style="width:90%;" >}}

#### Extrayez des variables de la réponse {#extract-variables-from-the-response}

Vous pouvez également extraire des variables de la réponse de votre requête API en effectuant un parsing des en-têtes ou du corps de la réponse. La valeur de la variable est mise à jour à chaque exécution de l'étape de requête API.

Pour commencer le parsing d'une variable, cliquez sur {{< ui >}}Extract a variable from response content{{< /ui >}} :

1. Saisissez un {{< ui >}}Variable Name{{< /ui >}}. Le nom de votre variable ne peut utiliser que des lettres majuscules, des chiffres et des traits de soulignement, et doit comporter au moins trois caractères.
2. Déterminez si vous souhaitez extraire votre variable des en-têtes de réponse ou du corps de réponse.

   * Extrayez la valeur de {{< ui >}}response header{{< /ui >}} : utilisez l'en-tête de réponse complet de votre requête API comme valeur de variable, ou analysez-le avec un [`regex`][8].
   * Extrayez la valeur de {{< ui >}}response body{{< /ui >}} : utilisez le corps de réponse complet de votre requête API comme valeur de variable ou analysez-le avec un [`regex`][8], un [`JSONPath`][6] ou un [`XPath`][7].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extrayez des variables des requêtes API dans un test API à plusieurs étapes" style="width:90%;" >}}

Vous pouvez extraire jusqu'à dix variables par étape de test. Une fois créée, cette variable peut être utilisée dans les étapes suivantes de votre test API à plusieurs étapes. Pour plus d'informations, consultez [Utiliser des variables](#use-variables).

### Spécifiez la fréquence du test {#specify-test-frequency}

Les tests API à plusieurs étapes peuvent s'exécuter :

* **Selon un planning** pour garantir que vos endpoints les plus importants sont toujours accessibles à vos utilisateurs. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test API à plusieurs étapes.
* [**Au sein de vos pipelines CI/CD**][3] pour commencer à livrer sans craindre qu'un code défectueux n'impacte l'expérience de vos clients.
* **On-demand** pour exécuter vos tests au moment le plus opportun pour vos équipes.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Extrayez des variables {#extract-variables}

En plus de créer des variables locales, vous pouvez [extraire des variables de n'importe quelle étape](#extract-variables-from-the-response) de votre test API à plusieurs étapes et [réinjecter les valeurs dans les étapes suivantes](#use-variables).

### Utilisez des variables {#use-variables}

Vous pouvez utiliser les [variables globales définies dans le {{< ui >}}Settings{{< /ui >}}][13] et les [variables définies localement](#create-local-variables) dans l'URL, les options avancées et les assertions de vos tests API.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utilisation de variables dans les tests API à plusieurs étapes" video="true" width="90%" >}}

### Sous-tests {#subtests}

Les tests API à plusieurs étapes prennent en charge les sous-tests, ce qui vous permet de réutiliser des tests API à plusieurs étapes existants ou d'extraire des étapes pour en faire des composants réutilisables. Vous pouvez imbriquer des sous-tests jusqu'à deux niveaux de profondeur.

Les étapes de sous-test ont une limite de 60 secondes. Une étape de sous-test expire si la durée combinée des étapes du sous-test, y compris les étapes d'attente, dépasse 60 secondes. Cela peut se produire même lorsque le sous-test réussit en tant que test autonome.

- **Nouvelles tentatives** : Chaque nouvelle tentative de l'étape de sous-test dispose à nouveau de 60 secondes.
- **Emplacements privés** : Le paramètre `apiRequestMaxTimeout` contrôle cette limite, en millisecondes (par défaut : `60000`). Consultez la section [Configuration avancée][20] de la page de configuration des emplacements privés.

Pour exécuter un flux qui dure plus de 60 secondes, divisez-le en plusieurs étapes de sous-test ou ajoutez ses étapes directement au test parent.

Pour utiliser un test API à plusieurs étapes existant comme sous-test, cliquez sur {{< ui >}}Subtest{{< /ui >}}, accédez à l'onglet {{< ui >}}From Existing Test{{< /ui >}} et sélectionnez un test API à plusieurs étapes dans le menu déroulant.

Pour convertir des étapes de votre test API à plusieurs étapes actuel en sous-test, cliquez sur l'onglet {{< ui >}}Extract From Steps{{< /ui >}}, sélectionnez les étapes enregistrées que vous souhaitez extraire et cliquez sur {{< ui >}}Convert to Subtest{{< /ui >}}.

{{< img src="synthetics/multistep_tests/subtest.png" alt="Interface utilisateur pour ajouter un sous-test à un test API à plusieurs étapes" width="60%" >}}

Pour remplacer une variable de sous-test dans un test API à plusieurs étapes, définissez-la dans le test parent en utilisant le même nom. Une variable utilise toujours la première valeur qui lui est assignée.

Si vous n'avez pas besoin d'exécuter un sous-test indépendamment, vous pouvez le mettre en pause. Il s'exécute toujours dans le cadre du test API à plusieurs étapes mais n'est pas exécuté seul.

**Remarque :** Seuls les tests API à plusieurs étapes peuvent être ajoutés en tant que sous-tests. L'utilisation de [tests API][1] comme sous-tests n'est pas prise en charge.

## Échec du test {#test-failure}

Un test est considéré comme `FAILED` si une étape ne satisfait pas une ou plusieurs assertions ou si la requête d'une étape a échoué prématurément. Une étape échouée ne fait pas échouer le test lorsque son option {{< ui >}}and mark test as{{< /ui >}} est définie sur {{< ui >}}passed{{< /ui >}}. Pour plus d'informations, consultez la section [Échec d'étape](#step-failure). Dans certains cas, le test échoue avant de pouvoir vérifier les assertions par rapport à l'endpoint. Les causes possibles sont les suivantes :

`CONNREFUSED`
: Aucune connexion n'a pu être établie car la machine cible l'a activement refusée.

`CONNRESET`
: La connexion a été brusquement fermée par le serveur distant. Les causes possibles incluent une erreur ou un plantage du serveur web lors de la réponse, ou une perte de connectivité du serveur web.

`DNS`
: Entrée DNS introuvable pour l'URL de test. Les causes possibles incluent une URL de test mal configurée ou une mauvaise configuration dans vos entrées DNS.

`INVALID_REQUEST` 
: La configuration du test est invalide (par exemple, une faute de frappe dans l'URL).

`SSL`
: La connexion SSL n'a pas pu être effectuée. [Consultez la page d'erreur dédiée pour plus d'informations][14].

`TIMEOUT`
: La requête n'a pas pu être terminée dans un délai raisonnable. Deux types de `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indique que la durée de la requête a atteint le délai d'expiration défini pour le test (la valeur par défaut est de 60 s). 
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si seul `Total response time` est affiché, le délai d'expiration s'est produit pendant la résolution DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée de la requête et des assertions a atteint la durée maximale (30 minutes).

Pour obtenir une liste complète des autres codes d'erreur de test d'API, consultez [Erreurs de test d'API][19].

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][16] peuvent créer, modifier et supprimer des tests API Synthetic à plusieurs étapes. Pour obtenir les droits de création, de modification et de suppression des tests API Synthetic à plusieurs étapes, attribuez à votre utilisateur l'un de ces deux [rôles par défaut][16].

Si vous utilisez la [fonctionnalité de rôle personnalisé][17], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write` pour Synthetic Monitoring.

### Restreindre l'accès {#restrict-access}

La restriction d'accès est disponible pour les clients utilisant des [rôles personnalisés][18] sur leurs comptes.

Vous pouvez restreindre l'accès à un test API à plusieurs étapes en fonction des rôles de votre organisation. Lors de la création d'un test API à plusieurs étapes, choisissez les rôles (en plus de votre utilisateur) qui peuvent lire et modifier votre test. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Définissez les autorisations de votre test" style="width:70%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[3]: /fr/synthetics/cicd_integrations
[4]: /fr/synthetics/private_locations
[5]: /fr/synthetics/search/#search-for-tests
[6]: https://restfulapi.net/json-jsonpath/
[7]: https://www.w3schools.com/xml/xpath_syntax.asp
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[9]: /fr/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[10]: http://daringfireball.net/projects/markdown/syntax
[11]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[12]: /fr/monitors/types/synthetic_monitoring/
[13]: /fr/synthetics/settings/#global-variables
[14]: /fr/synthetics/api_tests/errors/#ssl-errors
[15]: /fr/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[16]: /fr/account_management/rbac/
[17]: /fr/account_management/rbac#custom-roles
[18]: /fr/account_management/rbac/#create-a-custom-role
[19]: /fr/synthetics/api_tests/errors/
[20]: /fr/synthetics/platform/private_locations/configuration/#advanced-configuration