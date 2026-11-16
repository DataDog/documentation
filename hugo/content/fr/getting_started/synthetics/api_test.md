---
description: Créez des tests Datadog API pour surveiller vos endpoints de manière
  proactive. Créez des tests d'API en une ou plusieurs étapes avec des assertions,
  configurez des alertes et résolvez les problèmes.
further_reading:
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: Créer un test API par programmation
- link: /synthetics/api_tests
  tag: Documentation
  text: En savoir plus sur les tests API uniques
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /continuous_testing/cicd_integrations/
  tag: Documentation
  text: Découvrir comment déclencher des tests Synthetic depuis un pipeline CI/CD
- link: /synthetics/guide/identify_synthetics_bots
  tag: Documentation
  text: Apprendre à identifier les bots Synthetic pour les tests API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guide
  text: Exporter les tests Synthetic vers Terraform
title: Débuter avec les tests API
---
## Présentation {#overview}

Les tests d'API **surveillent de manière proactive** que vos **services les plus importants** sont disponibles à tout moment et depuis n'importe où. [Les tests d'API uniques][1] se déclinent en huit sous-types qui vous permettent de lancer des requêtes sur les différentes couches réseau de vos systèmes (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`). [Les tests d'API en plusieurs étapes][2] vous permettent d'exécuter des tests d'API en séquence pour surveiller la disponibilité des parcours clés au niveau de l'API.

## Créer un test d'API unique {#create-a-single-api-test}

Les tests HTTP surveillent les endpoints de votre API. Ils génèrent des alertes lorsque la latence des réponses est élevée ou si l'une des conditions que vous avez définies n'est pas respectée, par exemple un code de statut attendu, des en-têtes de réponse ou le contenu d'un corps de réponse.

Les exemples ci-dessous montrent comment créer un [test HTTP][3], un sous-type de [tests d'API uniques][1].

1. Sur le site Datadog, survolez {{< ui >}}Digital Experience{{< /ui >}} et sélectionnez [{{< ui >}}Tests{{< /ui >}}][4] (sous {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}).

2. Cliquez sur {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}New API test{{< /ui >}}][5].

3. Vous pouvez créer un test en utilisant l'une des options suivantes :

   - **Créer un test à partir d'un modèle** :

      1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : Détails du test, Détails de la requête, Assertions, Conditions d'alerte et Paramètres du monitor.
      2. Cliquez sur {{< ui >}}+Create Test{{< /ui >}} pour ouvrir la page {{< ui >}}Define Request{{< /ui >}}, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
      3. Cliquez sur {{< ui >}}Save Details{{< /ui >}} pour soumettre votre test d'API.<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vidéo de la page d'accueil des tests d'API Synthetics avec des modèles" video="true" >}}

   - **Créer un test à partir de zéro** :

      1. Pour créer un test à partir de zéro, cliquez sur le modèle {{< ui >}}+ Start from scratch{{< /ui >}}, puis sélectionnez le type de requête `HTTP`.

      2. Ajoutez l'URL de l'endpoint que vous souhaitez surveiller. Si vous ne savez pas par où commencer, vous pouvez utiliser `https://www.shopist.io/`, une application web de commerce électronique de test. Si vous utilisez l'URL de test Shopist, le nom de votre test est automatiquement renseigné en tant que `Test on shopist.io`.  

      3. Optionnellement, sélectionnez {{< ui >}}Advanced Options{{< /ui >}} pour définir des options de requête personnalisées, ajouter des certificats et des identifiants d'authentification, et créer des [variables globales][6] ou [variables locales][7] sécurisées pour des entrées dynamiques.

         **Remarque** : Tapez `{{` dans tout champ pertinent pour sélectionner une variable et injecter sa valeur dans vos options de test. 
          
      4. Optionally, set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.

      5. Click {{< ui >}}Send{{< /ui >}} to trigger a sample test run.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Configuration de test d'API" style="width:90%;">}}

      6. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### Définissez des assertions {#define-assertions}

Cliquez sur {{< ui >}}Send{{< /ui >}} pour remplir automatiquement les assertions de base concernant la réponse de votre endpoint. Les assertions définissent ce qu'est une exécution de test réussie.

Ici, trois assertions par défaut sont ajoutées après l'exécution de l'exemple de test :

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Assertions par défaut" style="width:100%;">}}

Les assertions sont entièrement personnalisables. Pour ajouter une assertion personnalisée, cliquez sur des éléments de l'aperçu de la réponse tels que les en-têtes ou cliquez sur {{< ui >}}New Assertion{{< /ui >}} pour définir une nouvelle assertion à partir de zéro. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Exemple de configuration de test d'API" video="true" >}}

### Sélectionnez des emplacements {#select-locations}

Sélectionnez un ou plusieurs {{< ui >}}Managed Locations{{< /ui >}} ou {{< ui >}}Private Locations{{< /ui >}} depuis lesquels exécuter votre test. {{% managed-locations %}}

L'application Shopist est accessible publiquement à `https://www.shopist.io/`, vous pouvez donc choisir n'importe quel emplacement géré pour exécuter votre test. Pour tester des applications internes ou simuler le comportement des utilisateurs dans des régions géographiques distinctes, utilisez plutôt des [emplacements privés][8].

### Spécifiez la fréquence du test {#specify-test-frequency}

Sélectionnez la fréquence à laquelle vous souhaitez que votre test s'exécute. Vous pouvez conserver la fréquence par défaut de 1 minute.

Vous pouvez non seulement planifier l'exécution de votre test Synthetic, mais également le déclencher manuellement, ou directement depuis vos [pipelines CI/CD][9]. 

### Définir les conditions d'alerte {#define-alert-conditions}

Vous pouvez définir des conditions d'alerte afin de veiller à ce que votre test n'échoue pas en cas d'erreur réseau isolée. Ainsi, vous recevez uniquement des alertes lorsque votre endpoint rencontre un réel problème.

Vous pouvez spécifier le nombre d'échecs consécutifs avant qu'un emplacement ne soit considéré comme défaillant :

```text
Retry test 2 times after 300 ms in case of failure
```

Vous pouvez également configurer votre test pour qu'il ne déclenche une notification que lorsque votre endpoint est hors service pendant une certaine durée et un certain nombre d'emplacements. Dans l'exemple ci-dessous, la règle d'alerte est configurée pour envoyer une notification si le test échoue pendant trois minutes sur deux emplacements différents :

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configurer le monitor de test {#configure-the-test-monitor}

Utilisez cette section pour créer le **message** que vous souhaitez envoyer avec la notification. La notification inclut votre message personnalisé et des détails sur les emplacements en échec. Des messages de monitor pré-remplis sont inclus dans le corps du message :

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Section du monitor Synthetic Monitoring, mettant en évidence les messages de monitor pré-remplis" style="width:100%;" >}}

Par exemple, le message de monitor suivant crée un monitor qui itère sur des étapes et extrait des variables pour des tests de navigateur :

   ```text
   {{! Lister les variables extraites de toutes les étapes réussies }}
   # Variables extraites
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nom** : `{{extractedValue.name}}`
   **Valeur :** {{#if extractedValue.secure}}*Obfusqué (valeur masquée)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][13].


## Create a multistep API test 

[Multistep API tests][2] allow you to monitor key business transactions at the API level. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="Présentation d'un test API Synthetics à plusieurs étapes" style="width:100%;" >}}

Similaires aux [tests API][3], les tests API à plusieurs étapes vous alertent lorsque vos endpoints deviennent trop lents ou ne respectent pas les conditions que vous avez définies. Vous pouvez créer des variables à partir des réponses de chaque étape et réinjecter leurs valeurs dans les étapes suivantes, en enchaînant les étapes de manière à imiter le comportement de votre application ou service.

L'exemple de test ci-dessous démontre la création d'un test API à plusieurs étapes qui surveille l'ajout d'un article à un panier. Ce test contient trois étapes : 

- Obtention d'un panier
- Obtention d'un produit
- Ajout du produit au panier

Si vous ne savez pas quels endpoints d'API utiliser pour créer votre test API à plusieurs étapes, utilisez les exemples d'endpoint ci-dessous : 

Pour créer un nouveau test API à plusieurs étapes, cliquez sur {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Multistep API test{{< /ui >}}][12]. Ajoutez un nom de test tel que `Add product to cart`, incluez des tags et sélectionnez des emplacements. 

### Obtenir un panier {#get-a-cart}

1. Dans {{< ui >}}Define steps{{< /ui >}}, cliquez sur {{< ui >}}Create Your First Step{{< /ui >}}. 
2. Ajoutez un nom à votre étape, par exemple : `Get a cart`.
3. Spécifiez la méthode HTTP et l'URL que vous souhaitez interroger. Vous pouvez saisir `POST` et `https://api.shopist.io/carts`. 
4. Cliquez sur {{< ui >}}Test URL{{< /ui >}}. Ceci crée un article de panier dans le backend de l'application Shopist.
5. Laissez les assertions par défaut ou modifiez-les.
6. Définissez éventuellement des paramètres d'exécution. 

    La sélection de {{< ui >}}Continue with test if this step fails{{< /ui >}} est utile pour garantir qu'une collection complète d'endpoints est testée ou pour s'assurer que la dernière étape de nettoyage est exécutée, indépendamment du succès ou de l'échec des étapes précédentes. La fonctionnalité d'étape {{< ui >}}Retry{{< /ui >}} est pratique dans les situations où vous savez que votre endpoint d'API peut prendre un certain temps avant de répondre. 
    
    Pour cet exemple, aucun paramètre d'exécution n'est requis. 

7. Pour créer une variable à partir de la valeur de l'ID de panier située à la fin de l'en-tête `location` :
    - Cliquez sur {{< ui >}}Extract a variable from response content{{< /ui >}}.
    - Nommez votre variable `CART_ID`.
    - Dans {{< ui >}}Response Header{{< /ui >}}, sélectionnez `location`.
    - Dans le champ {{< ui >}}Parsing Regex{{< /ui >}}, ajoutez une expression régulière telle que `(?:[^\\/](?!(\\|/)))+$`.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="Variable extraite du contenu de la réponse" style="width:100%;" >}}

8. Cliquez sur {{< ui >}}Save Variable{{< /ui >}}.
9. Une fois la création de cette étape de test terminée, cliquez sur {{< ui >}}Save Step{{< /ui >}}.

### Obtenir un produit {#get-a-product}
   
1. Dans {{< ui >}}Define another step{{< /ui >}}, cliquez sur {{< ui >}}Add Another Step{{< /ui >}}. Par défaut, vous pouvez créer jusqu'à dix étapes.
2. Ajoutez un nom à votre étape, par exemple : `Get a product`.
3. Spécifiez la méthode HTTP et l'URL que vous souhaitez interroger. Ici, vous pouvez ajouter : `GET` et `https://api.shopist.io/products.json`. 
4. Cliquez sur {{< ui >}}Test URL{{< /ui >}}. Ceci récupère une liste de produits disponibles dans l'application Shopist.
5. Laissez les assertions par défaut ou modifiez-les.
6. Définissez éventuellement des paramètres d'exécution. Pour cet exemple, aucun paramètre d'exécution n'est requis.
7. Pour créer une variable à partir de l'identifiant de produit situé dans le corps de la réponse :
    - Cliquez sur {{< ui >}}Extract a variable from response content{{< /ui >}}
    - Nommez votre variable `PRODUCT_ID`.
    - Cliquez sur l'onglet {{< ui >}}Response Body{{< /ui >}}.
    - Cliquez sur la clé `$oid` de n'importe quel produit pour générer un chemin JSON tel que `$[0].id['$oid']`.
8. Cliquez sur {{< ui >}}Save Variable{{< /ui >}}.
9. Une fois la création de cette étape de test terminée, cliquez sur {{< ui >}}Save Step{{< /ui >}}.

### Ajouter le produit au panier {#add-product-to-cart}

1. Cliquez sur {{< ui >}}Add Another Step{{< /ui >}} pour ajouter l'étape finale, l'ajout d'un produit dans votre panier.
2. Ajoutez un nom à votre étape, par exemple : `Add product to cart`.
3. Spécifiez la méthode HTTP et l'URL que vous souhaitez interroger. Ici, vous pouvez ajouter : `POST` et `https://api.shopist.io/add_item.json`. 
4. Dans l'onglet {{< ui >}}Request Body{{< /ui >}}, choisissez le type de corps `application/json` et insérez ce qui suit :
        
    {{< code-block lang="java" disable_copy="true" collapsible="true" >}}
    {
      "cart_item": {
        "product_id": "{{ PRODUCT_ID }}",
        "amount_paid": 500,
        "quantity": 1
      },
      "cart_id": "{{ CART_ID }}"
    } 
    {{< /code-block >}}
        
5. Cliquez sur {{< ui >}}Test URL{{< /ui >}}. Ceci ajoute le produit que vous avez extrait à l'étape 2 au panier que vous avez créé à l'étape 1 et renvoie une URL de paiement.
6. Dans {{< ui >}}Add assertions (optional){{< /ui >}}, cliquez sur {{< ui >}}Response Body{{< /ui >}} puis sur la touche `url` pour que votre test confirme que le parcours s'est terminé avec une réponse contenant l'URL de paiement.
7. Aucun paramètre d'exécution ni aucune extraction de variable ne sont nécessaires lors de cette dernière étape.
10. Une fois la création de cette étape de test terminée, cliquez sur {{< ui >}}Save Step{{< /ui >}}.

{{< img src="getting_started/synthetics/defined-steps.png" alt="Étapes de test créées" style="width:100%;" >}}

Vous pouvez ensuite configurer le reste de vos conditions de test, telles que la fréquence de test et les conditions d'alerte, ainsi que le monitor de test. Lorsque vous êtes prêt à enregistrer votre configuration de test et votre monitor, cliquez sur {{< ui >}}Create{{< /ui >}}. 

Pour en savoir plus, consultez la section [Utiliser des monitors de test Synthetic][13].

## Consultez les résultats de test {#look-at-test-results}

Les pages {{< ui >}}API test{{< /ui >}} et {{< ui >}}Multistep API test detail{{< /ui >}} affichent une vue d'ensemble de la configuration du test, la disponibilité globale associée aux endpoints testés par emplacement, des graphiques sur le temps de réponse et les timings réseau, ainsi qu'une liste des résultats de test et des événements.

Pour dépanner un test ayant échoué, examinez les échecs dans l'onglet **Activity** ou **Test Runs** et cliquez sur un résultat de test en échec. Examinez les assertions ayant échoué et les détails de la réponse tels que le code d'état, le temps de réponse, ainsi que les en-têtes et le corps associés pour diagnostiquer le problème.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="Page de détails du test d'API affichant l'onglet Activity avec la disponibilité globale, la chronologie des alertes et une liste des Test Runs récentes" style="width:100%;">}}

Avec l'[intégration d'APM avec Synthetic Monitoring][14] de Datadog, accédez à la cause première d'une exécution de test ayant échoué en consultant la trace générée par l'exécution du test dans l'onglet {{< ui >}}Traces{{< /ui >}}.

### Lancez Bits Investigation {#launch-a-bits-investigation}

Pour identifier la cause première d'un test Synthetic API ayant échoué, lancez une [Bits Investigation][16]. Bits Investigation analyse les résultats de test, les traces, les logs et les métriques pour faire ressortir une cause première et signaler si l'échec est dû à une régression ou à une mauvaise configuration.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/multistep
[3]: /fr/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/tests
[5]: https://app.datadoghq.com/synthetics/create
[6]: /fr/synthetics/settings/#global-variables
[7]: /fr/synthetics/api_tests/http_tests#variables
[8]: /fr/getting_started/synthetics/private_location
[9]: /fr/synthetics/ci
[10]: /fr/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /fr/monitors/types/synthetic_monitoring/
[14]: /fr/synthetics/apm/
[15]: /fr/synthetics/api_tests/grpc_tests
[16]: /fr/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page