---
description: Solution rentable permettant d'interroger en direct des logs conservés
  à long terme
further_reading:
- link: /logs/log_configuration/indexes/#indexes-filters
  tag: Documentation
  text: Filtres d'index
- link: /logs/log_configuration/indexes/#filtres-d-exclusion
  tag: Documentation
  text: Exclusion Filters
- link: https://www.datadoghq.com/blog/online-archives-datadog/
  tag: Blog
  text: Étude et analyse des logs historiques avec Online Archives
is_beta: true
private: true
title: Online Archives
---

<div class="alert alert-warning">
L'accès à la solution Online Archives est actuellement limité. Pour utiliser cette fonctionnalité, contactez l'<a href="/help/">assistance Datadog</a>.
</div>

## Présentation

Online Archives est une solution d'entrepôt de logs vous permettant de stocker pendant 15 mois ou plus vos logs, de les interroger en direct et de les analyser dans Datadog.

Les équipes de sécurité, de conformité et d'ingénierie ont régulièrement besoin d'interroger des logs couvrant une large période de temps. Les failles de sécurité sont généralement détectées des semaines, voire des mois, après les incidents. De plus, la révision et l'audit de la conformité juridique impliquent parfois l'utilisation de logs enregistrés il y a plus d'un an. Les équipes de sécurité ne sont pas les seules à devoir analyser des données à long terme. En effet, il arrive que les équipes d'ingénierie effectuent des analyses d'une année à une autre à partir de données avec une forte cardinalité, par exemple des millions d'entités telles que des utilisateurs, des hosts, des adresses IP, etc. À cette fin, il est plus efficace de travailler à partir des logs plutôt qu'avec des métriques. 

Online Archives vous permet de conserver et de rechercher toutes vos données de log pendant une durée de 15 mois ou plus. Ainsi, les équipes de sécurité, de conformité et d'ingénierie peuvent accomplir les tâches nécessitant l'étude et l'analyse de données historiques (comme les audits de sécurité). Elles ont également la possibilité d'étudier des tendances avec une très forte cardinalité sur de longues périodes, et de corréler les découvertes système obtenues à partir des métriques avec les données sur le comportement de l'application et des utilisateurs issues des logs.

## Activation d'Online Archives

La fonctionnalité Online Archives se configure au niveau des index de log. Les [filtres d'index][1] qui s'appliquent à un index sont également appliqués à Online Archives.

**Remarque** : sachez que les [filtres d'exclusion][2] d'un index et les quotas quotidiens ne s'appliquent pas à Online Archives. Par exemple, vous pouvez choisir d'indexer uniquement les logs d'erreur tout en conservant tous les logs dans Online Archives. Pour ce faire, vous devez exclure des index en question les logs autres que les logs d'erreur.

Configurez la fonctionnalité Online Archives depuis la page [Logs Index Configuration][3] :

1. Accédez à [**Logs > Configuration > Indexes**][3].
2. Modifiez l'index pour lequel vous souhaitez activer Online Archives.
3. Activez Online Archives lors de l'étape 3 de la configuration de l'index.

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="Comment activer Online Archives" style="width:100%;">}}

## Recherche dans Online Archives

Sélectionnez l'option Online Archives dans le menu déroulant en regard du sélecteur d'intervalle du Log Explorer pour commencer à rechercher des données stockées dans Online Archives plutôt que dans des index. Pour modifier l'intervalle, vous pouvez choisir parmi l'une des options proposées (intervalle maximal de 3 mois) ou sélectionner une plage de dates dans le calendrier afin d'étudier des données plus anciennes.


{{< img src="logs/log_configuration/online_archives/searching.png" alt="Comment effectuer une recherche dans Online Archives" style="width:100%;">}}

Pour effectuer une [recherche][4], saisissez des requêtes dans la barre de recherche, ou sélectionnez la facette de votre choix dans le volet des facettes.

**Remarques** : 
- Il n'est pas possible d'exporter des logs depuis une archive en ligne vers des dashboards, des notebooks ou des monitors.
- La vue « Transactions and Patterns » n'est pas disponible pour Online Archives.

## Analyse dans Online Archives

Pour activer le mode Analyse, sélectionnez l'option **Group into Fields** ou **Visualize as Timeseries/Top List/Table**.

Si vous définissez le type de stockage sur **Online Archives**, vous pouvez interroger Online Archives plutôt que des index. Il est possible de réactiver à tout moment l'option **Indexes**.

## Envoyer certains logs à Online Archives et certains à des index

Vous pouvez faire en sorte que certains logs soient envoyés à Online Archives, et que d'autres soient envoyés à des index en fonction des attributs et des tags des logs. La répartition des logs entre les différents types de stockages varie en fonction de votre utilisation de la journalisation et de votre stratégie de rétention.

Pour configurer des types de stockages, utilisez les filtres d'index (qui s'appliquent à Online Archives), puis utilisez les filtres d'exclusion (qui ne s'appliquent pas à Online Archives).

Vous trouverez ci-dessous quelques exemples de stratégies de rétention de logs, ainsi que la marche à suivre pour les appliquer :

### L'équipe d'ingénierie souhaite échantillonner les logs de debugging dans des index, tout en conservant l'ensemble des logs dans Online Archives

1. Créez un index pour tous les logs avec le filtre `*`.
2. Activez Online Archives pour cet index.
3. Ajoutez un filtre d'exclusion sur l'index `status:Debug`, avec une valeur d'exclusion de 90 %. Ce filtre d'exclusion s'applique uniquement à l'index.

{{< img src="logs/log_configuration/online_archives/retain.png" alt="Comment exclure des logs de l'index" style="width:100%;">}}

### L'équipe de sécurité souhaite conserver tous ses logs dans Online Archives, mais aucun dans des index

1. Créez un index pour les logs de sécurité avec le filtre `team:security`.
2. Activez Online Archives pour cet index.
3. Ajoutez un filtre d'exclusion `*` sur l'index afin de filtrer tous les logs de l'index, mais pas d'Online Archives.

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="Comment exclure des logs de l'index" style="width:100%;">}}

### Désactivation d'Online Archives
Sélectionnez l'index pour lequel vous souhaitez désactiver Online Archives, puis désactivez l'option Online Archives.

**Remarque** : l'ordre des index est important. En effet, si plusieurs index correspondent au filtre d'index, les logs `team:security` sont envoyés vers le premier index.

[1]: /fr/logs/log_configuration/indexes/#indexes-filters
[2]: /fr/logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs