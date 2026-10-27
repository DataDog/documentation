---
description: Organisez les tests de Synthetic Monitoring en groupes logiques.
further_reading:
- link: /synthetics/
  tag: Documentation
  text: En savoir plus sur la Synthetic Monitoring
- link: /monitors/types/synthetic_monitoring/
  tag: Documentation
  text: Configurez les monitors de tests Synthetic.
- link: /synthetics/bits_testing/
  tag: Documentation
  text: Bits Testing
- link: /synthetics/troubleshooting/
  tag: Documentation
  text: Dépannage de Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-suites/
  tag: Blog
  text: Obtenez des informations organisées et exploitables à partir d'environnements
    de test complexes.
- link: /synthetics/guide/how-synthetics-monitors-trigger-alerts/
  tag: Guide
  text: Comprendre les alertes de Synthetic Monitor
title: Collections de tests
---
## Présentation {#overview}

Les collections de tests Synthetic Monitoring vous permettent d'organiser plusieurs tests dans une seule collection pour simplifier la gestion et le dépannage. Regroupez les tests par parcours utilisateur, environnement, emplacement, service, équipe ou toute autre dimension adaptée à votre workflow. Affichez des résultats agrégés, identifiez les composants défaillants et comprenez les performances de l'application sur l'ensemble des tests associés, le tout depuis une vue unifiée. Configurez des alertes au niveau de la collection pour recevoir une notification consolidée lorsqu'une partie critique de vos tests échoue.

## Fonctionnalités clés {#key-features}

- **Alertes basées sur l'impact** : Recevez une alerte consolidée lorsqu'une partie critique de la collection de tests échoue.
- **Visibilité centralisée** : Affichez tous les tests d'une collection et leurs résultats au même endroit.
- **Gestion simplifiée** : Créez et exécutez des groupes de tests au lieu de gérer les tests individuellement.
- **Maintenance facilitée** : Identifiez les tests nécessitant des mises à jour lors de modifications de l'application.

## Créer une collection de tests {#create-a-test-suite}

Pour créer une collection de tests Synthetic Monitoring :
1. Dans Datadog, accédez à {{< ui >}}Digital Experience{{< /ui >}}.
2. Cliquez sur {{< ui >}}New Test Suite{{< /ui >}}.
3. Si vous le souhaitez, accédez à la page [Synthetic Monitoring tests][1] et cliquez sur {{< ui >}}\+ New Suite{{< /ui >}}.

Pour que Bits Testing regroupe vos tests existants en collections, consultez [Créer des collections de tests avec Bits Testing](#create-test-suites-with-bits-testing).

## Configuration de la collection de tests {#test-suite-configuration}

1. Saisissez un nom pour votre collection (par exemple, `Checkout flow` ou `API health checks`).
2. Cliquez sur {{< ui >}}Add Tests{{< /ui >}} pour inclure des tests de Synthetic Monitoring existants.  
   Vous pouvez effectuer les opérations suivantes :
   - **Recherchez** par nom ou par tag.  
   - **Filtrez** par type de test (comme Browser, API, Private Location ou Mobile).
   - **Sélectionnez** un ou plusieurs tests à inclure.
3. Cliquez sur {{< ui >}}Add Tests{{< /ui >}} pour confirmer.
4. _Si vous le souhaitez, supprimez des tests à l'aide de l'icône Remove Test from Suite à côté de chaque entrée_.

5. Configurez les alertes pour la collection :
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">Les alertes pour les collections de tests ne sont pas prises en charge pour ce <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

   - Par défaut, tous les tests sont marqués comme {{< ui >}}Critical{{< /ui >}}, et l'alerte se déclenche lorsqu'un test critique échoue. 

     **Remarque** : les alertes de collection sont distinctes des alertes de test individuelles. Pour éviter les notifications en double, mettez en sourdine les alertes des tests individuels inclus dans la collection.
   - Pour exclure des tests spécifiques du déclenchement de l'alerte au niveau de la collection, sélectionnez-les et marquez-les comme {{< ui >}}Ignored{{< /ui >}}.
   - Ajustez le seuil d'alerte pour qu'il ne se déclenche que lorsqu'un pourcentage spécifié de tests critiques échoue.

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="Page de création d'alerte de collection, avec le menu déroulant d'alerte de collection développé. " style="width:80%;">}}

   **Remarque** : pour les collections de tests existantes, les alertes sont activées avec les paramètres par défaut. Vous pouvez modifier la configuration selon vos besoins.

6. Configurez les [paramètres du monitor][2] (message de notification, destinataires, renotification) de la même manière que pour un test unique.
7. Cliquez sur {{< ui >}}Save Suite{{< /ui >}} une fois terminé.

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Page de création de collection de tests Synthetic Monitoring" style="width:80%;">}}

## Créez des collections de tests avec Bits Testing {#create-test-suites-with-bits-testing}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">La création de collections de tests avec Bits Testing n'est pas prise en charge pour ce <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Bits Testing][4] peut regrouper vos tests Synthetic existants en collections. Décrivez en langage clair comment vous souhaitez que vos tests soient regroupés, et Bits Testing propose des collections de tests correspondants. Vous examinez chaque collection et choisissez celles à créer. Ceci est distinct des collections de tests générées par un job de découverte Bits Testing, qui contiennent de nouveaux tests.

Vous pouvez demander à Bits Testing :

- **Une collection** : décrivez ce que la collection représente, par exemple, « Créez une collection qui surveille le flux de paiement. »
- **Plusieurs collections à la fois** : décrivez comment diviser vos tests, par exemple, une collection par équipe, par service, par environnement ou par combinaison de service et d'environnement.

Pour créer des collections de tests avec Bits Testing :

1. Dans Synthetic Monitoring & Testing, cliquez sur {{< ui >}}Bits Testing{{< /ui >}} dans la navigation supérieure.
2. Décrivez comment vous souhaitez regrouper vos tests, par exemple `Create a test suite for each one of my teams`. Vous pouvez également sélectionner l'une des invites suggérées.
3. Examinez les collections que Bits Testing prévoit de générer, puis cliquez sur le bouton de génération (par exemple, {{< ui >}}Generate 5 Suites{{< /ui >}} ou {{< ui >}}Generate Suite{{< /ui >}} pour une seule collection).

   {{< img src="synthetics/test_suites/bits_testing_multiple_suites.png" alt="Réponse de Bits Testing à une demande d'une collection de tests par équipe, présentant cinq prompts de collection et un bouton Generate 5 Suites." style="width:100%;" >}}

4. Dans le panneau {{< ui >}}Review suggested suites{{< /ui >}}, sélectionnez chaque collection dans la liste pour voir sa description et ses tests. Pour chaque collection, vous pouvez :
   - Cliquez sur {{< ui >}}Add Tests{{< /ui >}} pour ajouter des tests, ou sélectionnez des tests et cliquez sur {{< ui >}}Remove From Suite{{< /ui >}} pour les supprimer.
   - Définissez la valeur {{< ui >}}Suite Alerting{{< /ui >}} de chaque test. Par défaut, tous les tests sont marqués comme {{< ui >}}Critical{{< /ui >}}. Pour plus de détails, consultez [Configuration de la collection de tests](#test-suite-configuration).
   - Cliquez sur {{< ui >}}Exclude Suite{{< /ui >}} pour ignorer la création de cette collection.

   {{< img src="synthetics/test_suites/bits_testing_review_suites.png" alt="Le panneau Review suggested suites avec cinq collections générées, la description d'une collection et ses tests dont la valeur Suite Alerting est définie sur Critical." style="width:100%;" >}}

5. Cliquez sur le bouton de création (par exemple, {{< ui >}}Create 5 Suites{{< /ui >}}).
6. Cliquez sur {{< ui >}}View Suites{{< /ui >}} pour ouvrir vos nouvelles collections.
7. Ouvrez chaque collection et ajoutez des destinataires de notification dans ses [paramètres du monitor][2], puis enregistrez la collection. Bits Testing n'ajoute pas de destinataires aux collections qu'il crée.

Les collections créées par Bits Testing fonctionnent comme les collections que vous créez manuellement, y compris l'alerte au niveau de la collection et un objectif de niveau de service généré automatiquement. Consultez la section [objectifs de niveau de service](#service-level-objectives).

### Rédigez une invite pour Bits Testing {#write-a-prompt-for-bits-testing}

Décrivez le domaine métier ou opérationnel que vous souhaitez surveiller, et pas seulement les détails techniques. Par exemple :

- `Create a suite for the checkout journey`
- `Create separate suites for each team and environment`
- `Group the tests that validate authentication`
- `Create one suite for each production service`

Votre invite peut décrire n'importe quel regroupement, tel qu'un parcours utilisateur, un service, une équipe, un environnement, une capacité de plateforme partagée ou une validation de version.

Les collections proposées par Bits Testing dépendent des informations contenues dans vos tests existants et de la clarté avec laquelle vous décrivez le regroupement. Examinez chaque collection proposée avant de la créer.

## Objectifs de niveau de service {#service-level-objectives}

Lorsque vous créez une collection de tests, Datadog génère automatiquement un objectif de niveau de service (SLO) pour celle-ci, sans aucune configuration requise. Par défaut, le SLO utilise une fenêtre glissante de 7 jours avec un objectif de 99.9%.

<div class="alert alert-info">Les autorisations de la collection de tests (affichage et modification) s'appliquent à la collection elle-même et sont indépendantes des autorisations du SLO généré automatiquement. L'accès au SLO est déterminé par les <a href="/service_level_objectives/#permissions">autorisations produit SLO</a> de l'utilisateur. Un utilisateur sans autorisation de modification de la collection de tests peut toujours modifier le SLO généré automatiquement s'il dispose des autorisations de modification du SLO.</div>

Le panneau SLO sur la page de détails de la collection de tests affiche le statut actuel du SLO et le budget d'erreur. Depuis cette vue, vous pouvez :

- **[Create alert](#create-an-alert)** pour configurer une alerte lorsque les performances du SLO se dégradent de manière significative. Lorsqu'une alerte existe déjà, survolez l'indicateur d'alerte pour afficher des détails supplémentaires.
- **[View details](#view-details)** en cliquant sur l'icône en forme d'œil pour ouvrir la page complète des détails du SLO.
- **[Afficher les contributeurs](#contributors)** pour voir quels tests consomment le budget d'erreur.
- **[Modifier le SLO](#edit-the-service-level-objective)** en cliquant sur l' {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} icône en forme de crayon.

{{< img src="synthetics/test_suites/test_suite_slo_panel_v2.png" alt="Page de détails de la collection de tests affichant le panneau SLO avec une fenêtre glissante de 7 jours et le budget d'erreur, la section Primary Contributors avec les tests qui contribuent le plus, la chronologie Global Uptime et la section Test Runs." style="width:100%;">}}

### Créer une alerte {#create-an-alert}

Cliquez sur {{< ui >}}Create alert{{< /ui >}} dans le panneau de détails du SLO pour ouvrir le formulaire de configuration du SLO Monitor, où vous pouvez définir les conditions d'alerte et les paramètres de notification.

{{< img src="synthetics/test_suites/test_suite_slo_create_alert.png" alt="Formulaire de création du SLO Monitor avec les conditions d'alerte et les paramètres de notification." style="width:80%;">}}

### Afficher les détails {#view-details}

Cliquez sur l'icône en forme d'œil pour ouvrir la page complète des détails du SLO. Depuis cette page, vous pouvez afficher le statut du SLO, l'épuisement du budget d'erreur, le taux d'épuisement et les séries temporelles des métriques.

{{< img src="synthetics/test_suites/test_suite_slo_details.png" alt="Page complète des détails du SLO pour une collection de tests, affichant le statut du SLO, l'épuisement du budget d'erreur, le taux d'épuisement et les séries temporelles des métriques." style="width:90%;">}}

### Contributeurs {#contributors}

La section des contributeurs met en évidence les tests ayant le plus grand impact sur la consommation du budget d'erreur :

- **Total number of critical tests** : nombre total de tests critiques dans la collection.
- **Error budget consumed by** : nombre de tests ayant consommé du budget d'erreur.
- **Top 3 contributors consumed** : les trois tests ayant le plus fort pourcentage d'impact, calculé d'après la durée pendant laquelle chaque test était en état d'alerte alors que la collection était en alerte.

{{< img src="synthetics/test_suites/test_suite_slo_contributors.png" alt="Section Primary Contributors affichant le nombre total de tests critiques, le budget d'erreur consommé et les trois principaux contributeurs par pourcentage d'impact." style="width:90%;">}}

### Modifier l'objectif de niveau de service {#edit-the-service-level-objective}

Pour mettre à jour la fenêtre temporelle du SLO (par exemple, à 30 jours) ou l'objectif, cliquez sur l' {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} icône en forme de crayon sur le panneau SLO. Comme ce SLO est créé automatiquement à partir d'une collection de tests, vous ne pouvez modifier que la fenêtre temporelle, l'objectif et les seuils d'avertissement.

   {{< img src="synthetics/test_suites/test_suite_slo_edit.png" alt="Page de modification d'un SLO pour une collection de tests, affichant les champs de l'objectif et de la fenêtre temporelle." style="width:90%;">}}

## Afficher et gérer les collections de tests {#view-and-manage-test-suites}

Après avoir créé votre collection, elle apparaît dans l'onglet {{< ui >}}Suites{{< /ui >}} sur la page des [tests Synthetic Monitoring][1]. Vous pouvez également accéder aux collections de tests depuis {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Test Suites{{< /ui >}}.

Pour appliquer une [Scheduled downtime][3] à une ou plusieurs collections de tests, sélectionnez-les à l'aide des cases à cocher et cliquez sur {{< ui >}}Add to Downtime{{< /ui >}}.

Lors de la consultation d'une collection de tests, trois onglets sont disponibles :

- {{< ui >}}Tests in the Suite{{< /ui >}} : Liste tous les tests inclus dans la collection.
- {{< ui >}}Test Runs{{< /ui >}} : Affiche les métriques de disponibilité globale et les exécutions de tests associées.
- {{< ui >}}Attributes{{< /ui >}} : Affiche les attributs de la collection tels que `team`, les monitors et la personne ayant créé la collection de tests.

**Remarque** : Les exécutions de tests n'apparaissent dans la collection qu'à partir de la date à laquelle le test a été ajouté. Pour afficher les résultats précédents, vérifiez la page de test individuelle. Si vous renommez un test, les exécutions précédentes restent répertoriées sous le nom d'origine. Il est possible d'ajouter au maximum 300 tests par collection.

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Page récapitulative de la collection de tests Synthetic Monitoring" style="width:100%;">}}

## Exécuter une collection de tests {#run-a-test-suite}

Vous pouvez déclencher des exécutions de tests de deux manières :

- [Exécuter tous les tests de la collection](#run-all-tests-in-the-suite)
- [Exécuter les tests sélectionnés](#run-selected-tests)

### Exécuter tous les tests de la collection {#run-all-tests-in-the-suite}

Depuis la page de détails de la collection, cliquez sur {{< ui >}}Run Suite Now{{< /ui >}} en haut à droite pour déclencher tous les tests de la collection.

{{< img src="synthetics/test_suites/run_suite_now.png" alt="La page de détails de la collection de tests avec le bouton Run Suite Now en haut à droite." style="width:100%;" >}}

### Exécuter les tests sélectionnés {#run-selected-tests}

Pour exécuter un sous-ensemble de tests :

1. Accédez à la collection et cliquez sur l'onglet {{< ui >}}Tests in the Suite{{< /ui >}}.
2. Sélectionnez les tests que vous souhaitez exécuter à l'aide des cases à cocher.
3. Cliquez sur {{< ui >}}Run Tests Now{{< /ui >}}.

{{< img src="synthetics/test_suites/run_tests_now.png" alt="L'onglet Tests in the Suite, avec plusieurs tests sélectionnés et le bouton Run Tests Now visible." style="width:100%;" >}}

**Remarque** : vous pouvez exécuter un maximum de 50 tests à la fois avec {{< ui >}}Run Tests Now{{< /ui >}}.

## Dépannage {#troubleshooting}

Si certains tests n'apparaissent pas dans une collection :

- Vérifiez que les tests sont actifs et non supprimés.
- Vérifiez que vous disposez des autorisations nécessaires pour afficher ces tests.
- Actualisez les filtres ou effacez les termes de recherche lors de l'ajout de tests.

Si les résultats d'exécution semblent incomplets :

- Vérifiez la fréquence d'exécution des tests et l'activité récente.
- Vérifiez les incohérences de tags ou d'emplacements qui pourraient exclure des exécutions.
- Enregistrez à nouveau la collection de tests pour actualiser l'association avec ses tests.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /fr/synthetics/notifications/
[3]: /fr/synthetics/platform/downtime/
[4]: /fr/synthetics/bits_testing/