---
aliases:
- /fr/tests/auto_test_retries
- /fr/tests/flaky_test_management/auto_test_retries
description: Réessayez les cas de test en échec pour éviter d'échouer la compilation
  à cause de tests instables.
further_reading:
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
- link: /tests/flaky_test_management
  tag: Documentation
  text: En savoir plus sur la Gestion des tests irréguliers
title: Tentatives de test automatique
---
## Présentation {#overview}

La fonctionnalité Auto Test Retries de Test Optimization permet de réessayer les tests en échec jusqu'à N fois pour éviter d'échouer votre compilation en raison de tests instables :
un cas de test en échec est réessayé soit jusqu'à ce qu'il réussisse, soit jusqu'à ce qu'il n'y ait plus de tentatives restantes (auquel cas la compilation échoue).

## Configuration {#setup}

Assurez-vous que [Test Optimization][1] est configuré pour vos exécutions de test.

{{< tabs >}}

{{% tab "Java" %}}

### Compatibilité {#compatibility}

`dd-trace-java >= 1.34.0`

La compatibilité du framework de test est la même que celle de [Test Optimization Compatibility][3], à l'exception de `Scala Weaver`.

### Configuration {#configuration}
Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Le comportement par défaut de la fonctionnalité est de réessayer tout cas de test en échec jusqu'à 5 fois.
Ce comportement peut être affiné avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - si cette variable d'environnement est définie sur `true`, seuls les cas de test que Test Optimization considère comme [flaky][2] sont réessayés.
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - peut être défini sur n'importe quel nombre non négatif pour modifier le nombre maximal de tentatives par cas de test.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[2]: /fr/tests/flaky_test_management/
[3]: /fr/tests/setup/java/#compatibility
{{% /tab %}}

{{% tab "JavaScript" %}}

### Compatibilité {#compatibility-1}

`dd-trace-js >= v5.19.0`

### Configuration {#configuration-1}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Le comportement par défaut de la fonctionnalité est de réessayer tout cas de test en échec jusqu'à 5 fois.
Ce comportement peut être affiné avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur 0 ou false pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : 5).

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Ruby" %}}

### Compatibilité {#compatibility-2}

`datadog-ci-rb >= 1.4.0`

### Configuration {#configuration-2}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Le comportement par défaut de la fonctionnalité est de réessayer tout cas de test en échec jusqu'à 5 fois.
Ce comportement peut être affiné avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur 0 ou false pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un nombre non négatif pour définir le nombre total maximal de tests en échec à réessayer (par défaut : 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilité {#compatibility-3}

`dd-trace-dotnet >= 3.4.0`

### Configuration {#configuration-3}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Par défaut, la fonctionnalité réessaie chaque cas de test en échec jusqu'à 5 fois.
Personnalisez les réessais automatiques de tests avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur `0` ou `false` pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un nombre non négatif pour définir le nombre total maximal de tests en échec à réessayer (par défaut : 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Go" %}}

### Compatibilité {#compatibility-4}

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

### Configuration {#configuration-4}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Par défaut, la fonctionnalité réessaie chaque cas de test en échec jusqu'à 5 fois.
Personnalisez les réessais automatiques de tests avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur `0` ou `false` pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un nombre non négatif pour définir le nombre total maximal de tests en échec à réessayer (par défaut : 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Python" %}}

### Compatibilité {#compatibility-5}

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

### Configuration {#configuration-5}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Le comportement par défaut de la fonctionnalité est de réessayer chaque cas de test en échec jusqu'à cinq fois. Les tests qui échouent initialement lors de la configuration, du nettoyage ou des fixtures dans Pytest ne sont pas réessayés.

Vous pouvez affiner ce comportement avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur `0` ou `false` pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : `true`)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un nombre non négatif pour définir le nombre total maximal de tests échoués à réessayer (par défaut : `1000`)

### Tentatives automatiques de test dynamiques {#dynamic-auto-test-retries}

`dd-trace-py >= 4.15.0`

Par défaut, Auto Test Retries applique la même limite de tentatives à chaque cas de test en échec. Dynamic Auto Test Retries (Dynamic ATR) base le nombre de tentatives sur la durée d'exécution du test lors de sa première tentative. Les tests plus rapides reçoivent plus de tentatives et les tests plus lents en reçoivent moins.

Le budget de tentatives pour un test est déterminé une fois, à partir de la durée de sa tentative initiale, et s'applique à toutes ses tentatives. Un test cesse d'être réessayé dès qu'une tentative réussit.

Les compartiments de durée par défaut sont :

| Durée de la première tentative | Tentatives par défaut |
| ---------------------- | --------------- |
| 5 secondes ou moins | 10 |
| Plus de 5 secondes, jusqu'à 10 secondes | 5 |
| Plus de 10 secondes, jusqu'à 30 secondes | 3 |
| Plus de 30 secondes, jusqu'à 5 minutes | 2 |
| Plus de 5 minutes | 1 |

Chaque test échoué est réessayé au moins une fois, quelle que soit sa durée.

Pour activer Dynamic Auto Test Retries, définissez les variables d'environnement suivantes :

* `DD_CIVISIBILITY_DYNAMIC_ATR_ENABLED` - définissez sur `true` pour baser le nombre de tentatives sur la durée de la première tentative du test au lieu de la limite fixe `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` (par défaut : `false`) - la limite fixe est ignorée lorsque Dynamic ATR est activé. Auto Test Retries doit être activé dans [{{< ui >}}CI/CD Settings{{< /ui >}}][1].
* `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` - cinq entiers séparés par des virgules entre `1` et `20` qui remplacent les budgets par défaut du tableau précédent, classés du compartiment de durée le plus rapide au plus lent (par exemple, `10,4,1,1,1`). Si cette variable n'est pas définie ou est vide, les budgets par défaut du tableau précédent sont utilisés. Si `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` contient une valeur non valide, la bibliothèque l'ignore, enregistre un avertissement et utilise les budgets par défaut.

**Remarque** : La limite au niveau de la session `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` s'applique toujours lorsque le ATR dynamique est activé.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilité {#compatibility-6}

`dd-sdk-swift-testing >= 2.5.2`

### Configuration {#configuration-6}

Après avoir configuré Test Optimization, configurez Auto Test Retries dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="Bascule Auto Test Retries dans les paramètres CI/CD." style="width:100%" >}}

Le comportement par défaut de la fonctionnalité est de réessayer tout cas de test en échec jusqu'à 5 fois.
Ce comportement peut être affiné avec les variables d'environnement suivantes :

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - définissez sur 0 ou false pour désactiver explicitement les tentatives même si le paramètre distant est activé (par défaut : true)
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - un nombre non négatif pour modifier le nombre maximal de tentatives par cas de test (par défaut : 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - un nombre non négatif pour définir le nombre total maximal de tests en échec à réessayer (par défaut : 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{< /tabs >}}

### Failed Test Replay {#failed-test-replay}

<div class="alert alert-info">Failed Test Replay n'est pris en charge que pour Java, JavaScript et .NET.</div>

En plus de relancer automatiquement les tests échoués, Failed Test Replay vous permet de voir les données des variables locales dans le cadre supérieur de la trace de pile de l'erreur de test.

Failed Test Replay nécessite qu'Auto Test Retries soit activé, car il capture les données des variables issues des exécutions de test relancées.

Activez Failed Test Replay dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4] sous {{< ui >}}Mitigation{{< /ui >}} > {{< ui >}}Failed Test Replay{{< /ui >}}. Vous pouvez appliquer le paramètre au niveau de l'organisation, du dépôt ou du service de test.

#### Créez un index de logs {#create-a-logs-index}

Failed Test Replay crée des logs qui sont envoyés à Datadog et apparaissent aux côtés de vos logs d'application habituels.

Si vous utilisez des [filtres d'exclusion][5], assurez-vous que les logs de Failed Test Replay ne sont pas filtrés :

1. Créez un index de logs et [configurez-le][6] sur la rétention souhaitée avec **aucun échantillonnage**.
2. Définissez le filtre pour qu'il corresponde au tag `source:dd_debugger`. Tous les logs de Failed Test Replay ont cette source.
3. Assurez-vous que le nouvel index a priorité sur tout autre index avec des filtres correspondant à ce tag, car la première correspondance l'emporte.

Une fois Failed Test Replay activé, vous pouvez voir les données des variables locales dans les tests ayant échoué :

{{< img src="continuous_integration/failed_test_replay_local_variables.png" alt="Failed Test Replay." style="width:100%" >}}

#### Limitations connues {#known-limitations}

[jest-image-snapshot][7] est incompatible avec `jest.retryTimes` à moins que `customSnapshotIdentifier` ne soit passé (voir la [documentation de jest-image-snapshot][8]) à `toMatchImageSnapshot`. Par conséquent, les tentatives automatiques de test ne fonctionnent pas à moins que `customSnapshotIdentifier` ne soit utilisé.

## Explorez les résultats dans l'explorateur d'optimisation des tests {#explore-results-in-the-test-optimization-explorer}

Vous pouvez interroger les tests ayant fait l'objet d'une nouvelle tentative dans l'[explorateur d'optimisation des tests][2] : ils ont le tag `@test.is_retry` défini sur `true` (certains d'entre eux peuvent également avoir le tag `@test.is_new` défini sur `true`, ce qui indique qu'ils ont été relancés par la fonctionnalité [Early Flakiness Detection][3]).

## Dépannage {#troubleshooting}

Si vous suspectez des problèmes avec Auto Test Retries, ouvrez [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4], trouvez votre dépôt ou service, et désactivez Auto Test Retries.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/setup/
[2]: /fr/tests/explorer/
[3]: /fr/tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[5]: /fr/logs/log_configuration/indexes/#exclusion-filters
[6]: /fr/logs/log_configuration/indexes/#add-indexes
[7]: https://www.npmjs.com/package/jest-image-snapshot
[8]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes