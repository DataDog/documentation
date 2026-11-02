---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - tcp
  - tcp test
  - tcp tests
aliases:
- /fr/synthetics/tcp_test
- /fr/synthetics/tcp_check
description: Simuler des connexions TCP sur vos hosts
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des tests TCP sur des hosts internes
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
title: Test TCP
---
## Présentation {#overview}

Les tests TCP vous permettent de surveiller si des connexions TCP de bas niveau peuvent être établies ou non sur les ports d'hôtes donnés, garantissant ainsi la disponibilité de plusieurs services clés tels que `SSH` (22), `SMTP` (25), `DNS` (53), VPN sur `HTTPS` (443), et tout service personnalisé résidant sur d'autres ports. Grâce aux données de temps de réponse intégrées, suivez les performances de vos applications réseau et recevez des alertes en cas de ralentissement inattendu.

Les tests TCP peuvent être exécutés à partir d'emplacements [gérés](#select-locations) et [privés][1] selon que vous préférez exécuter le test depuis l'extérieur ou l'intérieur de votre réseau. Les tests TCP peuvent être exécutés selon un calendrier, à la demande ou directement au sein de vos [pipelines CI/CD][2].

## Configuration {#configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

- **Créer un test à partir d'un modèle** :
   
     1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}} et {{< ui >}}Monitor Settings{{< /ui >}}.
     2. Cliquez sur {{< ui >}}\+ Create Test{{< /ui >}} pour ouvrir la page {{< ui >}}Define Request{{< /ui >}}, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
     3. Cliquez sur {{< ui >}}Save Details{{< /ui >}} pour soumettre votre test d'API.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vidéo de la page d'accueil des tests d'API Synthetics avec des modèles" video="true" >}}

- **Créer un test à partir de zéro** :

    1. Pour créer un test à partir de zéro, cliquez sur le modèle {{< ui >}}\+ Start from scratch{{< /ui >}}, puis sélectionnez le type de requête `TCP`.
    1. Indiquez le {{< ui >}}Host{{< /ui >}} et le {{< ui >}}Port{{< /ui >}} sur lesquels exécuter votre test.
    1. Décidez si vous souhaitez {{< ui >}}Track number of network hops (TTL){{< /ui >}} ou non. Cette option vous permet de définir des assertions sur le nombre de sauts réseau et d'accéder à un TCP Traceroute dans les résultats de votre test.
    1. Indiquez le délai d'attente en secondes avant que le test n'expire (facultatif).
    1. {{< ui >}}Name{{< /ui >}} votre test TCP.
    1. Ajoutez l'environnement {{< ui >}}Tags{{< /ui >}} ainsi que tout autre tag à votre test TCP. Vous pouvez ensuite utiliser ces tags pour filtrer vos tests Synthetic sur la [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} page][3]. 
    1. Cliquez sur {{< ui >}}Test Host{{< /ui >}} pour tester la configuration de la requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="Définir la connexion TCP" style="width:90%;" >}}

    8. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.


### Extraits {#snippets}

{{% synthetics-api-tests-snippets %}}

### Définissez des assertions {#define-assertions}

Les assertions définissent ce qu'est un résultat de test attendu. Lorsque vous cliquez sur {{< ui >}}Test URL{{< /ui >}}, des assertions de base sur `response time` sont ajoutées. Vous devez définir au moins une assertion pour que votre test puisse effectuer une surveillance.

| Type          | Opérateur                                                                | Type de valeur     |
|---------------|-------------------------------------------------------------------------|----------------|
| temps de réponse | `is less than`                                                          | _Entier (ms)_ |
| sauts réseau    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _entier_        |
| connexion | `is`                                                          | `established`, `refused`, `timeout` |

Vous pouvez créer jusqu'à 20 assertions par test d'API en cliquant sur {{< ui >}}New Assertion{{< /ui >}} ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="Définissez des assertions pour que votre test TCP réussisse ou échoue." style="width:90%;" >}}

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le Synthetics Worker.

Si un test contient une assertion sur le corps de la réponse et que la limite de délai d'attente est atteinte, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionnez des emplacements {#select-locations}

Sélectionnez le {{< ui >}}Locations{{< /ui >}} à partir duquel exécuter votre test TCP. Les tests TCP peuvent être exécutés à partir d'emplacements gérés et [privés][1] selon que vous préférez lancer la connexion depuis l'extérieur ou l'intérieur de votre réseau.

{{% managed-locations %}}

### Spécifiez la fréquence du test {#specify-test-frequency}

Les tests SSL peuvent être exécutés :

* **Selon un calendrier** pour garantir que vos services les plus importants sont toujours accessibles à vos utilisateurs. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test TCP.
* [**Au sein de vos pipelines CI/CD**][2].
* **À la demande** pour exécuter vos tests au moment le plus opportun pour votre équipe.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Utilisez des variables {#use-variables}

Vous pouvez utiliser les [variables globales définies sur la page {{< ui >}}Settings{{< /ui >}}][8] dans l'URL, les options avancées et les assertions de vos tests TCP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité.

## Échec du test {#test-failure}

Un test est considéré comme `FAILED` s'il ne satisfait pas une ou plusieurs assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut échouer sans tester les assertions par rapport à l'endpoint.

Pour obtenir une liste complète des codes d'erreur, consultez [Erreurs de test d'API][11].

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][9] peuvent créer, modifier et supprimer des tests TCP Synthetic. Pour obtenir un accès de création, de modification et de suppression aux tests TCP Synthetic, mettez à niveau votre utilisateur vers l'un de ces deux [rôles par défaut][9].

Si vous utilisez la [fonctionnalité de rôle personnalisé][10], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

{{% synthetics_grace_permissions %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: /fr/synthetics/cicd_integrations
[3]: /fr/synthetics/search/#search
[4]: /fr/monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /fr/synthetics/guide/synthetic-test-monitors
[8]: /fr/synthetics/settings/#global-variables
[9]: /fr/account_management/rbac/
[10]: /fr/account_management/rbac#custom-roles
[11]: /fr/synthetics/api_tests/errors/#tcp-errors