---
further_reading:
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /synthetics/api_tests
  tag: Documentation
  text: En savoir plus sur les tests API uniques
- link: /synthetics/multistep
  tag: Documentation
  text: En savoir plus sur les tests API à plusieurs étapes
- link: /getting_started/synthetics/private_location
  tag: Documentation
  text: En savoir plus sur les emplacements privés
- link: /synthetics/cicd_integrations/
  tag: Documentation
  text: Découvrir comment déclencher des tests Synthetic depuis un pipeline CI/CD
- link: /synthetics/identify_synthetics_bots
  tag: Documentation
  text: Apprendre à identifier les bots Synthetic pour les tests API
- link: /api/v1/synthetics/#creer-un-test
  tag: Documentation relative à l'API
  text: Créer un test Synthetic par programmation
title: Débuter avec les tests API
---

## Présentation

Les tests API **vérifient de façon proactive** que vos **services essentiels** sont disponibles en tout temps et tout lieu. Il existe huit sous-types de [tests API uniques][1]. Ces tests vous permettent de lancer des requêtes sur différentes couches réseau de vos systèmes (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` et `gRPC`). Avec les [tests API à plusieurs étapes][2], vous pouvez exécuter une série de tests HTTP afin de surveiller la disponibilité de parcours clés au niveau de l'API.

## Créer un test API unique

Les tests HTTP surveillent les endpoints de votre API. Ils génèrent des alertes lorsque la latence des réponses est élevée ou si l'une des conditions que vous avez définies n'est pas respectée, par exemple un code de statut attendu, des en-têtes de réponse ou le contenu d'un corps de réponse.

{{< img src="getting_started/synthetics/api-test.png" alt="Présentation d'un test HTTP Synthetic" style="width:100%;" >}}

L'exemple ci-dessous décrit la marche à suivre pour créer un [test HTTP][3], à savoir un sous-type des [tests API uniques][1].

### Définir la requête

1. Sur le site Datadog, passez le curseur sur **UX Monitoring**, puis sélectionnez **[Synthetic Tests][4]**.
2. Cliquez sur **New Test** > **[New API test][5]**.
3. Sélectionnez le type de requête `HTTP`.
4. Définissez votre requête :

    - Ajoutez l'URL de l'endpoint à surveiller. Si vous n'avez pas d'endpoint, vous pouvez utiliser `https://www.shopist.io/`. Il s'agit d'une application web d'e-commerce utilisable pour des tests. Lorsque vous définissez l'endpoint pour un test, le nom de votre test est automatiquement rempli : ici, `Test on www.shopist.io`.
    - Vous pouvez sélectionner **Advanced Options** pour définir des options de requête personnalisées, des certificats, des identifiants d'authentification, etc.

      **Remarque** : vous pouvez créer des [variables globales][6] sécurisées pour stocker des identifiants et créer des [variables locales][7] pour générer des timestamps dynamiques afin de les utiliser dans la charge utile de votre requête. Une fois ces variables créées, saisissez `{{` dans un champ pertinent, puis sélectionnez la variable pour injecter sa valeur dans les options de vos tests.

      Pour cet exemple, aucune option avancée n'est requise.
    - Vous pouvez ajouter des tags, comme `env:prod` et `app:shopist`, à votre test. Les tags vous permettent d'organiser votre collection de tests et d'accéder rapidement à ceux qui vous intéressent sur la page d'accueil.

5. Cliquez sur **Test URL** pour lancer l'exécution de l'exemple de test.

{{< img src="getting_started/synthetics/api-test-config-3.png" alt="Configuration de test API" style="width:100%;">}}

### Définir des assertions

Lorsque vous cliquez sur **Test URL**, des assertions de base sont automatiquement ajoutées à la réponse de votre endpoint. Les assertions définissent les critères de réussite d'un test.

Ici, trois assertions par défaut sont ajoutées après l'exécution de l'exemple de test :

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Assertions par défaut" style="width:100%;">}}

Les assertions sont entièrement personnalisables. Pour ajouter une assertion personnalisée, cliquez sur des éléments de l'aperçu de réponse, comme les en-têtes, ou cliquez sur **New Assertion** pour définir une nouvelle assertion de toute pièce.

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Exemple de configuration de test API" video="true"  >}}

### Sélectionner des emplacements

Sélectionnez un ou plusieurs **emplacements gérés** ou **emplacements privés** à partir desquels vous souhaitez exécuter votre test.

Les emplacements gérés vous permettent de tester des sites Web et endpoints publics. Pour tester des applications internes ou simuler des comportements utilisateur dans des régions géographiques discrètes, utilisez plutôt des [emplacements privés][8].

L'application Shopist est accessible à tous depuis l'URL `https://www.shopist.io/`. Vous pouvez donc choisir n'importe quel emplacement géré pour exécuter votre test.

### Indiquer la fréquence du test

Sélectionnez la fréquence à laquelle vous souhaitez exécuter votre test. Vous pouvez conserver la fréquence par défaut d'une minute.

**Remarque** : vous pouvez non seulement planifier l'exécution de votre test Synthetic, mais également le déclencher manuellement, ou directement depuis vos [pipelines CI/CD][9].

### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alerte afin de veiller à ce que votre test n'échoue pas en cas d'erreur réseau isolée. Ainsi, vous recevez uniquement des alertes lorsque votre endpoint rencontre un réel problème.

Vous pouvez spécifier le nombre d'échecs consécutifs avant qu'un emplacement ne soit considéré comme défaillant :

```text
Retry test 2 times after 300 ms in case of failure
```

Vous pouvez également configurer votre test de façon à ce qu'il envoie uniquement une notification lorsque l'endpoint n'est plus disponible pendant une certaine durée, et pour un certain nombre d'emplacements. La règle d'alerte ci-dessous stipule qu'une notification est envoyée lorsque le test échoue pendant trois minutes, sur deux emplacements différents :

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Informer votre équipe

Indiquez un message dans votre alerte et ajoutez les adresses e-mail auxquelles vous souhaitez envoyer des alertes. Vous pouvez également utiliser des [intégrations de notification][10], comme Slack, PagerDuty, Microsoft Teams ou encore des webhooks. Pour déclencher une alerte Synthetic avec ces outils, vous devez auparavant configurer l'[intégration correspondante][11].

Lorsque vous êtes prêt à exécuter votre test, cliquez sur **Save Test**.

## Créer un test API à plusieurs étapes

Les [tests API à plusieurs étapes][2] vous permettent de surveiller des transactions commerciales essentielles au niveau de l'API.

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="Présentation d'un test API à plusieurs étapes Synthetic" style="width:100%;" >}}

Tout comme les [tests HTTP][3], les tests API à plusieurs étapes vous envoient des alertes lorsque vos endpoints sont trop lents ou lorsqu'ils ne répondent pas aux conditions que vous avez définies. Vous pouvez créer des variables à partir des réponses d'une étape, puis réinjecter leurs valeurs dans les étapes ultérieures. Ainsi, les étapes s'enchaînent et reproduisent le comportement de votre application ou service.

L'exemple ci-dessous vous explique comment créer un test API à plusieurs étapes afin de surveiller l'ajout d'un article à un panier. Il inclut trois étapes :

- Création d'un panier
- Récupération d'un produit
- Ajout du produit au panier

Si vous ne savez pas quels endpoints d'API utiliser pour créer votre test API à plusieurs étapes, utilisez les exemples d'endpoint ci-dessous :

Pour créer un test API à plusieurs étapes, cliquez sur **New Test** > **[Multistep API test][12]**. Attribuez un nom à votre test, par exemple `Ajout de produit au panier`, ajoutez des tags et sélectionnez des emplacements.

### Création d'un panier

1. Dans **Define steps**, cliquez sur **Create Your First Step**. 
2. Attribuez un nom à votre étape, par exemple `Création d'un panier`.
3. Indiquez la méthode HTTP et l'URL à interroger. Saisissez par exemple `POST` et `https://api.shopist.io/carts`. 
4. Cliquez sur **Test URL**. Cela crée un panier dans le backend de l'application Shopist.
5. Conservez les assertions par défaut ou modifiez-les.
6. Vous avez également la possibilité de définir des paramètres d'exécution.

    Pour vous assurer que le test s'applique à l'ensemble de la collecte de données de l'endpoint ou pour vérifier que la dernière étape de nettoyage est bien exécutée, peu importe le résultat des étapes précédentes, cochez la case **Continue with test if this step fails**. La fonctionnalité **Retry** peut s'avérer utile si l'endpoint de votre API n'est pas toujours très réactif.

    Pour cet exemple, aucun paramètre d'exécution n'est requis.

7. Pour créer une variable à partir de la valeur de l'ID du panier situé à la fin de l'en-tête `location` :
    - Cliquez sur **Extract a variable from response content**.
    - Définissez le nom de votre variable sur `CART_ID`.
    - Pour **Response Header**, sélectionnez `location`.
    - Ajoutez une expression régulière, par exemple `(?:[^\\/](?!(\\|/)))+$` dans le champ **Parsing Regex**.

  {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="Variable extraite à partir du contenu de la réponse" style="width:100%;" >}}

8. Cliquez sur **Save Variable**.
9. Une fois votre étape terminée, cliquez sur **Save Step**.

### Récupération d'un produit

1. Sous **Define another step**, cliquez sur **Add Another Step**. Par défaut, vous pouvez créer jusqu'à 10 étapes.
2. Attribuez un nom à votre étape, par exemple `Récupération d'un produit`.
3. Indiquez la méthode HTTP et l'URL à interroger. Saisissez par exemple `GET` et `https://api.shopist.io/products.json`.
4. Cliquez sur **Test URL**. La liste des produits disponibles dans l'application Shopist est alors récupérée.
5. Conservez les assertions par défaut ou modifiez-les.
6. Vous avez la possibilité de définir des paramètres d'exécution. Pour cet exemple, aucun paramètre d'exécution spécifique n'est requis.
7. Pour créer une variable à partir de l'ID de produit situé dans le corps de la réponse :
    - Cliquez sur **Extract a variable from response content**.
    - Définissez le nom de votre variable sur `PRODUCT_ID`.
    - Cliquez sur l'onglet **Response Body**.
    - Cliquez sur la clé `$oid` de l'un des produits pour générer un chemin JSON. Exemple : `$[0].id['$oid']`.
8. Cliquez sur **Save Variable**.
9. Une fois votre étape terminée, cliquez sur **Save Step**.

### Ajout du produit au panier

1. Cliquez sur **Add Another Step** pour ajouter la dernière étape, à savoir l'ajout du produit au panier.
2. Attribuez un nom à votre étape, par exemple `Ajout du produit au panier`.
3. Indiquez la méthode HTTP et l'URL à interroger. Saisissez par exemple `POST` et `https://api.shopist.io/add_item.json`.
4. Dans l'onglet **Request Body**, choisissez le type de corps `application/json` et ajoutez ce qui suit :

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

5. Cliquez sur **Test URL**. Cela ajoute le produit extrait lors de l'étape 2 au panier créé lors de l'étape 1 et renvoie une URL de paiement.
6. Sous **Add assertions (optional)**, cliquez sur **Response Body** et sur la clé `url` pour que votre test vérifie que le parcours s'est terminé avec une réponse contenant l'URL de paiement.
7. Aucun paramètre d'exécution ni aucune extraction de variables ne sont requis lors de cette dernière étape.
10. Une fois votre étape terminée, cliquez sur **Save Step**.

{{< img src="getting_started/synthetics/defined-steps.png" alt="Étapes du test créées" style="width:100%;" >}}

Vous pouvez ensuite configurer les autres conditions de votre test, notamment sa fréquence, ses conditions d'alerte et le message de ses alertes. Une fois la configuration de votre test terminée, cliquez sur **Save Test**.

## Visualiser les résultats du test

Les pages de détails des **tests API** et **tests API à plusieurs étapes** comprennent une vue d'ensemble de la configuration du test, l'uptime global associé aux endpoints testés pour chaque emplacement, des graphiques sur les temps de réponse et les délais réseau, ainsi que la liste des résultats et des événements du test.

Pour découvrir le motif d'un échec de test, faites défiler la page jusqu'à la section **Test Results** et cliquez sur les résultats d'un test ayant échoué. Afin de résoudre le problème, passez en revue les assertions qui ont échoué et les détails de la réponse, tels que le code de statut, le temps de réponse ainsi que les en-têtes et le corps associés.

{{< img src="getting_started/synthetics/api-test-failure-5.png" alt="Échec d'un test API" style="width:100%;">}}

Grâce à l'[intégration de l'APM Datadog à la surveillance Synthetic][13], vous pouvez identifier la cause de l'échec d'un test en consultant les traces générées par l'exécution du test dans l'onglet **Traces**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/api_tests/
[2]: /fr/synthetics/multistep
[3]: /fr/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/list
[5]: https://app.datadoghq.com/synthetics/create
[6]: /fr/synthetics/settings/#global-variables
[7]: /fr/synthetics/api_tests/http_tests#variables
[8]: /fr/getting_started/synthetics/private_location
[9]: /fr/synthetics/ci
[10]: /fr/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /fr/synthetics/apm/