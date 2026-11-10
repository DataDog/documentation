---
aliases:
- /fr/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Configuration de TeamCity pour CI Visibility
---
## Présentation {#overview}

[TeamCity][1] est un serveur d'intégration continue et de livraison continue qui optimise et automatise les processus de développement logiciel.

Configurez CI Visibility pour TeamCity afin de collecter des données sur les exécutions de vos pipelines, déboguer les goulots d'étranglement de performance, résoudre les problèmes opérationnels et optimiser vos workflows de développement.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Partial retries][14] | Relancez les déclencheurs de build | Affichez les exécutions de pipeline ayant subi une nouvelle tentative partielle. |
| [Temps de file d'attente][15] | Temps de file d'attente | Affichez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités. |
| [Raisons d'échec du pipeline][16] | Raisons d'échec du pipeline | Identifiez les raisons d'échec du pipeline à partir des messages d'erreur. |
| [Filtrer les jobs CI sur le chemin critique][17] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Execution time][18] | Temps d'exécution  | Affichez la durée pendant laquelle les pipelines exécutent des jobs. |

Les versions de TeamCity suivantes sont prises en charge :

- TeamCity >= 2021.2 ou version ultérieure

### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et TeamCity :

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| Pipeline                   | Build Chain |
| Job                        | Build       |
| _Non disponible dans Datadog_ | Étape        |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}

L'intégration entre [TeamCity][1] et Datadog CI Visibility est fournie via un plugin TeamCity. Le [code source][8] du plugin de lʼintégration Datadog/CI est libre sous la licence Apache 2.0.

Pour configurer l'intégration :

1. Téléchargez le [plugin d'intégration CI Datadog][5] sur le serveur TeamCity en accédant à
{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} -> {{< ui >}}Browse Plugin Repository{{< /ui >}}.
2. Si vous n'en avez pas déjà un, ajoutez un [TeamCity composite build][6] en tant que dernier build de la chaîne de build. Ce build doit dépendre du dernier build actuel de la chaîne et aucun autre build ne doit en dépendre.

   Les chaînes de build qui ne se terminent pas par un TeamCity composite build sont ignorées par le plugin. Par exemple, considérez une chaîne de build attendue où `Aggregating Results` est le dernier TeamCity composite build :

   {{< img src="ci/teamcity_build_chain.png" alt="Chaîne de build TeamCity avec un TeamCity composite build à la fin" style="width:100%;">}}

   Le TeamCity composite build final doit être correctement configuré en termes de paramètres de contrôle de version, avec le VCS Root attaché et le [VCS Trigger][13] configuré.

3. Les paramètres de configuration suivants doivent être présents pour les projets TeamCity :

   * **datadog.ci.api.key** : Votre [clé d'API Datadog][2]. Prend en charge le type **Password** dans la version 0.0.5 du plugin et les versions ultérieures.
   * **datadog.ci.site** : {{< region-param key="dd_site" code="true" >}}
   * **datadog.ci.enabled** : `true` (`false` peut être utilisé pour désactiver le plugin pour un projet spécifique).

   Vous pouvez les ajouter aux sous-projets TeamCity ou au [TeamCity Root Project][10]. Lorsqu'ils sont ajoutés au projet racine, ils sont propagés à tous ses sous-projets. Par exemple, pour activer le plugin pour tous les projets, ajoutez `datadog.ci.enabled` avec la valeur `true` au projet racine.

   Pour plus d'informations sur la définition des paramètres de configuration, consultez la [documentation sur la hiérarchie des projets TeamCity][9].

4. Pour activer le plugin, cliquez sur {{< ui >}}Enable uploaded plugins{{< /ui >}} dans la page {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}}.
Alternativement, redémarrez le serveur TeamCity.

## Configuration avancée {#advanced-configuration}

### Configurer les informations utilisateur Git {#configure-git-user-information}

Le plugin récupère le nom et l'adresse e-mail de l'auteur Git en fonction du [style de nom d'utilisateur TeamCity][7]. Datadog recommande d'utiliser les styles de nom d'utilisateur {{< ui >}}Author Name and Email{{< /ui >}} ou {{< ui >}}Author Email{{< /ui >}}, car ils
fournissent des informations sur l'adresse e-mail de l'utilisateur.

Lorsque l'un des autres styles de nom d'utilisateur est utilisé ({{< ui >}}UserId{{< /ui >}} ou {{< ui >}}Author Name{{< /ui >}}), le plugin génère automatiquement une adresse e-mail pour l'utilisateur en ajoutant `@Teamcity` au nom d'utilisateur. Par exemple, si le style de nom d'utilisateur {{< ui >}}UserId{{< /ui >}} est utilisé et que le nom d'utilisateur de l'auteur Git est `john.doe`, le plugin génère `john.doe@Teamcity` comme adresse e-mail de l'auteur Git. Le style de nom d'utilisateur est défini pour les [racines VCS][11] et peut être modifié dans les paramètres de la racine VCS.

<div class="alert alert-danger"> L'adresse e-mail de l'auteur Git est utilisée pour
<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility">à des fins de facturation</a>,
il peut donc y avoir des implications financières lorsque des styles de nom d'utilisateur ne fournissent pas d'adresse e-mail
(<strong>ID utilisateur</strong> ou <strong>Nom de l'auteur</strong>) sont utilisés. <a href="/help/">Contactez l'équipe de support Datadog</a> si vous avez des questions concernant votre cas d'utilisation.
</div>

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Consultez vos données sur les pages [**CI Pipeline List**][3] et [**Executions**][4] une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Search and Manage CI Pipelines][12].

## Dépannage {#troubleshooting}

Tous les logs générés par le plugin d'intégration CI Datadog sont stockés dans le fichier `teamcity-server.log` et peuvent être
accédés depuis le serveur TeamCity en allant dans {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Diagnostic{{< /ui >}} -> {{< ui >}}Server Logs{{< /ui >}}.
Vérifiez ces logs pour obtenir un contexte supplémentaire sur tout problème lié au plugin.

### Les exécutions de tests ne sont pas liées aux jobs TeamCity {#test-runs-are-not-linked-to-teamcity-jobs}

Le plugin d'intégration CI Datadog ne corrèle pas les exécutions de pipeline ou de job TeamCity avec les exécutions de tests dans Test Optimization. Les tests peuvent apparaître dans Test Optimization alors que le job CI Visibility correspondant affiche **Test Runs: 0**.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/configuring-vcs-roots.html
[12]: /fr/continuous_integration/search/#search-for-pipelines
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /fr/glossary/#partial-retry
[15]: /fr/glossary/#queue-time
[16]: /fr/glossary/#pipeline-failure
[17]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /fr/glossary/#pipeline-execution-time