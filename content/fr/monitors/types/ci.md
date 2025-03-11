---
aliases:
- /fr/monitors/monitor_types/ci_pipelines/
- /fr/monitors/create/types/ci_pipelines/
- /fr/monitors/create/types/ci/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurer des alertes de pipeline avec les monitors CI Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurer des alertes de pipeline avec les monitors CI Datadog
title: Monitor CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas disponible pour le site ({{< region-param key="dd_site_name" >}}) pour le moment.</div>
{{< /site-region >}}

## Présentation

Une fois la [solution CI Visibility activée][1] pour votre organisation, vous pouvez créer un monitor de pipeline CI ou de test CI.

Les monitors CI vous permettent de visualiser vos données d'intégration continue et de configurer des alertes. Par exemple, vous pouvez créer un monitor de pipeline CI pour être alerté lorsqu'un pipeline ou une tâche a échoué. De la même manière, créez un monitor de test CI pour être alerté lorsqu'un test a échoué ou est trop lent.

## Création d'un monitor

Pour créer un [monitor CI][2] dans Datadog, utilisez la navigation principale : *Monitors -> New Monitor --> CI*.

<div class="alert alert-info"><strong>Remarque</strong> : par défaut, chaque compte est limité à 1 000 monitors CI. <a href="/help/">Contactez l'assistance</a> si vous souhaitez augmenter cette limite pour votre compte.</div>

Choisissez entre un monitor de **Pipeline** ou de **Test** :

{{< tabs >}}
{{% tab "Pipeline" %}}

### Définir la requête de recherche

1. Créez votre requête de recherche en utilisant la même logique que pour une recherche dans l'explorateur de pipeline CI.
2. Choisissez l'un des niveaux suivants pour les événements de pipeline CI :
    * **Pipeline** : évalue l'exécution d'un pipeline entier, qui est généralement composé d'une ou de plusieurs tâches.
    * **Stage** : évalue l'exécution d'un groupe composé d'une ou de plusieurs tâches (pour les fournisseurs CI qui prennent en charge les étapes).
    * **Job** : évalue l'exécution d'un groupe de commandes.
    * **Command** : évalue les événements de [commande personnalisée][1] instrumentés manuellement. Ces événements représentent des commandes individuelles exécutées dans le cadre d'une tâche.
    * **All** : évalue tous les types d'événements.
3. Choisissez de surveiller un nombre d'événements de pipeline CI, une facette ou une mesure :
    * **Nombre d'événements de pipeline CI** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** de facette ni de mesure. Datadog évalue le nombre d'événements de pipeline CI sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Dimension** : sélectionnez une dimension (une facette qualitative) pour recevoir une alerte en fonction du `Unique value count` (nombre de valeurs uniques) de la facette.
    * **Measure** : sélectionnez une mesure (une facette quantitative) pour recevoir une alerte en fonction de la valeur numérique de la facette de pipeline CI (comme avec un monitor de métrique). Sélectionnez simplement le type d'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
4. Regroupez les événements de pipeline CI en fonction de plusieurs dimensions (facultatif) :
    * Tous les événements de pipeline CI correspondant à la requête sont agrégés au sein de groupes basés sur la valeur d'un maximum de quatre facettes.
5. Configurez la stratégie de regroupement pour les alertes (facultatif) :
   * Si la requête inclut des critères `group by`, les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe. Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper une requête par `@ci.pipeline.name` pour recevoir une alerte distincte pour chaque nom de pipeline CI lorsque le nombre d'erreurs est élevé.

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="Une requête pour le statut CI Status:Error définie avec un regroupement en fonction du nom du pipeline" style="width:100%;" >}}

#### Utiliser des formules et des fonctions

Vous pouvez créer des monitors de pipeline CI à l'aide de formules et de fonctions, par exemple pour surveiller un **taux** de fréquence d'événement, comme le taux d'échec d'un pipeline (taux d'erreur).

Dans l'exemple ci-dessous, un monitor de taux d'erreur de pipeline est créé à l'aide d'une formule calculant le taux suivant : Nombre d'événements de pipeline ayant échoué (`ci.status=error`) / Nombre total d'événements de pipeline (aucun filtre). Le monitor est regroupé en fonction de `ci.pipeline.name`, afin de recevoir une seule alerte par pipeline. Pour en savoir plus, consultez la section [Présentation des fonctions][2].
{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="Définition d'un monitor avec 3 étapes : les étapes a et b correspondent aux requêtes, tandis que l'étape c calcule le taux à partir des deux requêtes." style="width:1000%;" >}}

<div class="alert alert-info"><strong>Remarque</strong> : vous pouvez utiliser au maximum deux requêtes par monitor pour créer la formule d'évaluation.</div>

[1]: /fr/continuous_integration/pipelines/custom_commands/
[2]: /fr/dashboards/functions/#overview
{{% /tab %}}
{{% tab "Test" %}}

### Définir la requête de recherche

1. Types de monitors courants (facultatif) : offre un modèle de requête pour chacun des types de monitors courants, à savoir **New Flaky Test** (nouveau test irrégulier), **Test Failures** (échecs de test) et **Test Performance** (performances des tests). Ce modèle de requête peut ensuite être personnalisé. Pour en savoir plus sur cette fonctionnalité, consultez la section [Suivre les nouveaux tests irréguliers](#suivre-les-nouveaux-tests-irreguliers).
2. Créez votre requête de recherche en utilisant la même logique que pour une recherche dans l'explorateur de test CI. Par exemple, vous pouvez rechercher les échecs de test pour la branche `main` du service de test `myapp` en utilisant la requête suivante : `@test.status:fail @git.branch:main @test.service:myapp`.
3. Choisissez de surveiller un nombre d'événements de test CI, une facette ou une mesure :
    * **Nombre d'événements de test CI** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** de facette ni de mesure. Datadog évalue le nombre d'événements de test CI sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Dimension** : sélectionnez une dimension (une facette qualitative) pour recevoir une alerte en fonction du `Unique value count` (nombre de valeurs uniques) de la facette.
    * **Measure** : sélectionnez une mesure (une facette quantitative) pour recevoir une alerte en fonction de la valeur numérique de la facette de test CI (comme avec un monitor de métrique). Sélectionnez simplement le type d'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
4. Regroupez les événements de test CI en fonction de plusieurs dimensions (facultatif) :
    * Tous les événements de test CI correspondant à la requête sont agrégés au sein de groupes basés sur la valeur d'un maximum de quatre facettes.
5. Configurez la stratégie de regroupement pour les alertes (facultatif) :
    * Si la requête inclut des critères `group by`, une alerte est envoyée pour chaque source en fonction des paramètres de regroupement. Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper une requête selon `@test.full_name` pour recevoir une alerte distincte pour chaque nom complet de test CI lorsque le nombre d'erreurs est trop élevé. Le nom complet du test est composé de la collection de tests et du nom du test, par exemple : `MySuite.myTest`. Dans Swift, le nom complet du test est composé du bundle de test, de la collection de tests et du nom du test, par exemple : `MyBundle.MySuite.myTest`.

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query.png" alt="Une requête pour le statut CI Status:Error définie avec un regroupement en fonction du nom du test" style="width:100%;" >}}

#### Tests exécutés avec des configurations ou paramètres différents
Utilisez `@test.fingerprint` dans le paramètre `group by` du monitor lorsque plusieurs tests ont le même nom complet mais qu'ils utilisent des configurations ou des paramètres de test différents. De cette façon, des alertes se déclencheront pour les exécutions avec des paramètres ou des configurations de test spécifiques. `@test.fingerprint` offre le même niveau de granularité que la section Test Stats, Failed et Flaky Tests de la page **Commit Overview**.

Par exemple, si un test avec le même nom complet a échoué sur Chrome mais réussi sur Firefox, l'option fingerprint enverra une alerte pour l'exécution Chrome uniquement.

Ainsi, `@test.full_name` déclenchera une alerte même si le test a réussi sur Firefox.

#### Formules et fonctions

Vous pouvez créer des monitors de test CI à l'aide de formules et de fonctions, par exemple pour surveiller un **taux** de fréquence d'événement, comme le taux d'échec d'un test (taux d'erreur).

Dans l'exemple ci-dessous, un monitor de taux d'erreur de test est créé à l'aide d'une formule calculant le taux suivant : Nombre d'événements de test ayant échoué (`@test.status:fail`) / Nombre total d'événements de test (aucun filtre). Le monitor est regroupé en fonction de `@test.full_name` afin de recevoir une seule alerte par test. Pour en savoir plus, consultez la section [Présentation des fonctions][1].

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query-fnf.png" alt="Définition d'un monitor avec 3 étapes : les étapes a et b correspondent aux requêtes, tandis que l'étape c calcule le taux à partir des deux requêtes." style="width:100%;" >}}

#### Utiliser CODEOWNERS pour les notifications

Vous pouvez envoyer la notification à différentes équipes en utilisant l'information `CODEOWNERS` disponible dans l'événement de test.

Dans l'exemple ci-dessous, la notification est configurée avec la logique suivante :
* Si le propriétaire du code est `MonOrganisation/mon-équipe`, envoyer la notification au canal Slack `canal-de-mon-équipe`.
* Si le propriétaire du code est `MonOrganisation/mon-autre-équipe`, envoyer la notification au canal Slack `canal-de-mon-autre-équipe`.

{{< code-block lang="text" >}}
{{#is_match "citest.attributes.test.codeowners" "MonOrganisation/mon-équipe"}}
  @slack-canal-de-mon-équipe
{{/is_match}}
{{#is_match "citest.attributes.test.codeowners" "MonOrganisation/mon-autre-équipe"}}
  @slack-canal-de-mon-autre-équipe
{{/is_match}}
{{< /code-block >}}

Dans la section `Notification message` de votre monitor, ajoutez un bloc semblable à l'exemple ci-dessus pour configurer les notifications du monitor. Vous pouvez ajouter autant de variables `is_match` que vous le souhaitez. Pour en savoir plus sur les variables de notification, consultez la section [Variables conditionnelles des monitors][2].

[1]: /fr/dashboards/functions/#overview
[2]: /fr/monitors/notify/variables/?tab=is_match#conditional-variables
{{% /tab %}}
{{< /tabs >}}
### Définir vos conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à) :
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre `1 minute` et `2 days`) ;
* au seuil d'alerte `<NOMBRE>` ;
* au seuil d'avertissement `<NOMBRE>`.

#### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (notamment sur le délai d'évaluation), consultez la documentation relative à la [configuration des monitors][3].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][4].

#### Échantillons et top list des valeurs dépassant le seuil

Lorsqu'un monitor de test CI ou de pipeline CI se déclenche, des échantillons ou valeurs peuvent être ajoutés au message de notification.

| Configuration du monitor                    | Peut être ajouté au message de notification |
|----------------------------------|--------------------------------------|
| Nombre, alerte simple, pas de regroupement     | Jusqu'à 10 échantillons.                    |
| Nombre, alerte simple, avec regroupement       | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Nombre, alertes multiples, avec regroupement        | Jusqu'à 10 échantillons.                    |
| Mesure, alerte simple, pas de regroupement   | Jusqu'à 10 échantillons.                    |
| Mesure, alerte simple, avec regroupement     | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Nombre, alertes multiples, avec regroupement        | Jusqu'à 10 valeurs de facette ou de mesure.    |

Ces informations peuvent être envoyées via Slack, Jira, Webhook, Microsoft Teams, PagerDuty ou e-mail. **Remarque** : les notifications de rétablissement n'affichent aucun exemple de log.

Pour désactiver les échantillons, décochez la case correspondante en bas de la section **Say what's happening**. Le texte affiché à côté de la case reflète les groupes définis pour votre monitor (comme indiqué ci-dessus).

#### Exemples d'échantillons

Inclure un tableau de 10 échantillons de test CI dans la notification d'alerte :
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="10 échantillons de test CI"  style="width:60%;" >}}

Inclure un tableau de 10 échantillons de pipeline CI dans la notification d'alerte :
{{< img src="monitors/monitor_types/ci_pipelines/10_ci_pipelines_samples.png" alt="10 échantillons de pipeline CI"  style="width:60%;" >}}

#### Envoi de notifications en l'absence de données

En l'absence de données, lorsque la requête d'évaluation d'un monitor est basée sur un nombre d'événements, ce monitor se rétablit après la période d'évaluation définie et déclenche l'envoi d'une notification. Par exemple, si un monitor est configuré pour envoyer une alerte sur le nombre d'erreurs d'un pipeline avec une période d'évaluation de cinq minutes, il se rétablit automatiquement si aucune exécution du pipeline n'a eu lieu pendant cinq minutes.

En guise d'alternative, Datadog vous conseille d'utiliser des formules de taux. Par exemple, au lieu d'utiliser un monitor sur le nombre d'échecs d'un pipeline (count), utilisez un monitor sur le taux d'échec du pipeline (formule), par exemple `(nombre d'échecs du pipeline)/(nombre total d'exécutions du pipeline)`. Dans cet exemple, en l'absence de données, le dénominateur `(nombre total d'exécutions du pipeline)` sera `0` et la division `x/0` sera donc impossible à évaluer. Le monitor gardera son dernier état connu au lieu d'être évalué à `0`.

De cette façon, si le monitor se déclenche en raison d'une augmentation soudaine du nombre d'échecs du pipeline entraînant un taux d'erreur supérieur au seuil défini, le monitor ne se rétablira pas tant que le taux d'erreur n'est pas repassé en dessous du seuil, ce qui peut se produire n'importe quand par la suite.

## Exemples de monitors
Vous trouverez ci-dessous quelques cas d'utilisation courants des monitors. Les requêtes peuvent être modifiées pour limiter le monitor à des branches spécifiques, des auteurs spécifiques ou n'importe quelle autre facette disponible dans l'application.

### Déclencher des alertes en cas de régression des performances
La métrique `duration` peut être utilisée pour identifier une diminution des performances d'un test ou d'un pipeline sur n'importe quelle branche. En choisissant d'être alerté en fonction de cette métrique, vous pourrez empêcher les baisses de performances d'affecter votre codebase.

{{< img src="ci/regression_monitor.png" alt="Monitor de régression des performances d'un pipeline CI" style="width:100%;">}}

### Suivre les nouveaux tests irréguliers
Lorsque vous créez un monitor de test, vous pouvez choisir parmi les types de monitors courants `New Flaky Test`, `Test Failures` et `Test Performance` pour les configurations simples. Ce premier type de monitor permet de recevoir une alerte lorsqu'un nouveau test irrégulier est ajouté à votre codebase. La requête est regroupée selon le paramètre `Test Full Name` afin de ne pas recevoir plusieurs alertes pour un même test irrégulier.

Une exécution de test est signalée comme `flaky` si un comportement irrégulier est détecté dans le même commit après plusieurs tentatives. Si un comportement irrégulier est détecté à plusieurs reprises (parce que plusieurs tentatives ont été effectuées), le tag `is_flaky` est ajouté à la première exécution identifiée comme irrégulière.

Une exécution de test n'est pas signalée comme `new flaky` si le comportement irrégulier n'a pas été détecté dans la même branche ou dans la branche par défaut. Seule la première exécution identifiée comme irrégulière reçoit le tag `is_new_flaky` (quel que soit le nombre de tentatives).

Pour en savoir plus sur les tests irréguliers, consultez la section [Gestion des tests irréguliers][6].

{{< img src="ci/flaky_test_monitor.png" alt="Monitor de test irrégulier CI" style="width:100%;">}}

### Maintenir un certain pourcentage de couverture du code
Des [métriques custom][5], telles que le pourcentage de couverture du code, peuvent être créées et utilisées au sein des monitors. Le monitor ci-dessous envoie une alerte lorsque la couverture du code passe en dessous d'un certain pourcentage, afin de vous aider à maintenir de bonnes performances de test sur le long terme.

{{< img src="ci/codecoveragepct_monitor_light.png" alt="Monitor de test irrégulier CI" style="width:100%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /fr/monitors/create/configuration/#advanced-alert-conditions
[4]: /fr/monitors/notify/
[5]: https://docs.datadoghq.com/fr/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[6]: https://docs.datadoghq.com/fr/continuous_integration/guides/flaky_test_management/