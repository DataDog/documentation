---
aliases:
- /fr/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Configurer le tracing sur un pipeline TeamCity
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

[TeamCity][1] est une intégration en continu et un serveur de livraison qui optimise et automatise les processus de développements de logiciels.

Configurez le tracing pour recueillir des données sur lʼexécution de vos pipelines, corriger des problèmes de performances et liés aux adresses, et optimiser vos workflows de développement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Tentatives partielles][14] | Retenter les déclencheurs de builds | Afficher les exécutions de pipelines partiellement tentées. |
| [Temps de file dʼattente][15] | Temps de file dʼattente | Consulter la durée pendant laquelle les tâches de pipeline restent dans la file dʼattente avant dʼêtre traitées |
| [Raisons dʼéchecs de pipelines][16] | Raisons dʼéchecs de pipelines | Identifier les raisons de lʼéchec dʼun pipeline à partir de messages dʼerreur. |

Les versions suivantes de TeamCity sont prises en charge : 

- TeamCity >= 2021.2 ou ultérieur

## Configurer lʼintégration Datadog

Lʼintégration entre [TeamCity][1] et Datadog CI Visibility est fournie via un plugin TeamCity.
Pour activer lʼintégration :
1. Téléchargez le [plugin de lʼintégration Datadog CI][5] sur le serveur TeamCity en accédant à
**Administration** -> **Plugins** -> **Browse Plugin Repository**.
2. Si vous ne lʼavez pas déjà fait, ajoutez un [build composite TeamCity][6] en tant que dernier build de la chaîne de builds. Ce build doit posséder
une dépendance sur le dernier build actuel de la chaîne et aucun autre build qui en dépend. Les chaînes de builds dont le dernier build nʼest pas un
build composite sont ignorées par le plugin. Vous trouverez ci-dessous un exemple de la chaîne de build qui est attendue,
dans laquelle `Aggregating Results` est le dernier build composite :
{{< img src="ci/teamcity_build_chain.png" alt="Chaîne de builds TeamCity build avec un build composite à la fin" style="width:90%;">}}
Le dernier build composite doit être configuré correctement au niveau des réglages du contrôle de la version, avec
la VCS Root jointe et le [déclencheur VCS][13] configuré.
3. Les paramètres de configuration suivants doivent être présents pour les projets TeamCity :
   * **datadog.ci.api.key** : votre [clé dʼAPI Datadog][2].
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}.
   * **datadog.ci.enabled** : `true` (`false`
   peut servir à désactiver le plugin pour un projet spécifique).

   Ces paramètres de configuration peuvent être ajoutés aux sous-projets TeamCity
   ou au [projet root TeamCity][10]. Une fois quʼils sont ajoutés au projet Root, ils sont propagés
   dans tous les sous-projets. Par exemple, pour activer le plgin pour tous les projets, ajoutez **datadog.ci.enabled** avec la
   valeur `true` au projet Root. Vous trouverez davantage dʼinformations sur le réglage des paramètres de configuration
   dans la documentation relative à la [hiérarchie des projets TeamCity][9].
4. Pour activer le plugin, cliquez sur **Enable uploaded plugins** sur la page **Administration** -> **Plugins**.
Vous pouvez aussi redémarrer le serveur TeamCity.

## Visualiser des données de pipeline dans Datadog

Consultez vos données sur les pages [**CI Pipeline List**][3] et [**Executions**][4] après la fin des pipelines.

La page **CI Pipeline List** affiche des données pour la [branche par défaut][12] de chaque référentiel.

## Configurer des informations dʼutilisateur Git

Le plugin récupère le nom et lʼe-mail de lʼauteur Git en fonction du [style de nom dʼutilisateur TeamCity][7].
Datadog recommande dʼutiliser les styles de nom dʼutilisateur **Author Name and Email** ou **Author Email**, car ils
fournissent des informations sur lʼe-mail de lʼutilisateur. Lorsque lʼun des autres styles de nom dʼutilisateur est utilisé, (**UserId** ou **Author Name**),
le plugin génère automatiquement un e-mail pour lʼutilisateur en ajoutant `@Teamcity` au nom dʼutilisateur.
Par exemple, si le style de nom dʼutilisateur **UserId** est utilisé et si le nom dʼutilisateur de lʼauteur Git est `john.doe`,
le plugin génère `john.doe@Teamcity` comme e-mail de lʼauteur Git. Le style du nom dʼutilisateur est défini pour les [roots VCS][11],
et il peut être modifié dans les réglages de la racine VCS.

<div class="alert alert-danger"><strong>Remarque :</strong> lʼe-mail de lʼauteur Git est utilisé à
des fins de <a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility" target="_blank">facturation</a>.
Ainsi, si des styles de nom dʼutilisateur ne fournissant pas dʼe-mail
(<strong>UserId</strong> ou <strong>Author Name</strong>) sont utilisés, cela peut avoir un impact au niveau des coûts. <a href="https://docs.datadoghq.com/help/" target="_blank">Contactez lʼéquipe dʼassistance Datadog</a> si vous avez des questions sur votre cas dʼutilisation.
</div>

## Référentiel de plugin

Le [code source][8] du plugin de lʼintégration Datadog/CI est libre sous la licence Apache 2.0.

## Dépannage

Tous les logs générés par le plugin Datadog CI Integration sont stockés dans le fichier `teamcity-server.log` et sont
accessibles depuis le serveur TeamCity en allant sur **Administration** -> **Diagnostic** -> **Serveur **.
accessible depuis le serveur TeamCity en allant sur **Administration** -> **Diagnostic** -> **Server Logs**.
Pour obtenir plus d'informations sur les problèmes liés au plugin, veuillez consulter ces  logs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/vcs-root.html
[12]: https://docs.datadoghq.com/fr/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /fr/glossary/#partial-retry
[15]: /fr/glossary/#queue-time
[16]: /fr/glossary/#pipeline-failure