---
aliases:
- /fr/tracing/dynamic_instrumentation/
further_reading:
- link: /dynamic_instrumentation/how-it-works/
  tag: Documentation
  text: En savoir plus sur le fonctionnement de l'instrumentation dynamique
- link: /tracing/trace_collection/dd_libraries
  tag: Documentation
  text: En savoir plus sur l'instrumentation de votre application
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Tagging de service unifié
- link: /tracing/services/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /metrics
  tag: Documentation
  text: En savoir plus sur les métriques
is_beta: true
kind: documentation
private: true
title: Instrumentation dynamique
---

{{< callout url="https://www.datadoghq.com/dynamic-instrumentation-request/" >}}
  L'instrumentation dynamique est en version bêta privée. Pour accéder à cette fonctionnalité, remplissez le formulaire suivant.
{{< /callout >}}

L'instrumentation dynamique vous permet de capturer les données de vos applications actives sans aucune modification du code ni redéploiement.

## Prise en main

### Prérequis
Cette fonctionnalité nécessite les éléments suivants :

- L'[Agent Datadog][1] 7.41.1 ou une version ultérieure doit être installé sur votre service.
- La fonctionnalité [Remote Configuration][2] doit être activée pour cet Agent.
- Pour les applications Java, la version 1.8.0 ou ultérieure de la bibliothèque de tracing [`dd-trace-java`][3].
- Pour les applications Python, la version 1.7.5 ou ultérieure de la bibliothèque de tracing [`dd-trace-py`][4].
- Pour les applications .NET, la version 2.23.0 ou ultérieure de la bibliothèque de tracing [`dd-trace-dotnet`][5].
- Les tags `service`, `env` et `version` du [tagging de service unifié][6] doivent être appliqués à votre déploiement.
- Si vous le souhaitez, vous pouvez configurer l'[intégration du code source][7] de votre service.

**Remarque** : vous devez disposer des autorisations `debugger_read` et `debugger_write` pour accéder à la page Instrumentation dynamique. Pour en savoir plus sur les rôles et comment les attribuer aux utilisateurs, consultez la section [Contrôle d'accès à base de rôles][8].

### Créer un index de logs

Les logs de l'instrumentation dynamique sont envoyés à Datadog. Ils s'affichent ensuite sur la même interface que vos logs d'application.

Si vous utilisez des [filtres d'exclusion][9], assurez-vous que les logs de l'instrumentation dynamique ne sont pas filtrés :

1. Créez un index de logs et [configurez-le][10] selon la rétention souhaitée et sans **aucun échantillonnage**.
2. Définissez le filtre sur `source:dd_debugger` (tous les logs de l'instrumentation dynamique utilisent cette source).
3. Veillez à ce que le nouvel index ait la priorité sur les autres index basés sur ce tag, car la première correspondance l'emporte.

### Activer l'instrumentation dynamique

Pour activer l'instrumentation dynamique sur un service, sélectionnez son runtime et suivez les instructions de configuration :

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Explorer l'instrumentation dynamique

L'instrumentation dynamique vous aide à comprendre ce que fait votre application lors de son exécution. En ajoutant une sonde d'instrumentation dynamique, vous pouvez exporter des données supplémentaires de votre application sans modification du code ni redéploiement.

### Créer une sonde

La configuration initiale est la même pour les sondes log et les sondes métrique.

1. Accédez à la [page Dynamic Instrumentation][12].
1. Cliquez sur **Create Probe** en haut à droite, ou affichez le menu contextuel d'un service en cliquant sur les trois petits points et sélectionnez **Add a probe for this service**.
1. Si le service n'est pas déjà renseigné, choisissez-en un dans la liste.
1. Si ces informations ne sont pas renseignées, choisissez le runtime, l'environnement et la version.
1. Dans le code source, indiquez où définir la sonde en sélectionnant soit une classe et une méthode, soit un fichier source et une ligne.
   Si vous avez configuré l'intégration du code source pour votre service, la saisie automatique vous propose des fichiers à sélectionner et affiche le code associé afin de vous permettre de choisir la ligne.

### Créer une sonde log

Une *sonde log* génère un log lorsqu'elle s'exécute.

En activant l'option `Capture method parameters and local variables` sur la sonde log, vous pouvez enregistrer les valeurs suivantes à partir du contexte d'exécution. Ces valeurs vont ensuite s'ajouter à l'événement de log :
- method arguments
- local variables
- class fields
- the call stack
- exceptions 
Les valeurs enregistrées sont visibles dans l'interface Datadog.

Étant donné que l'enregistrement de ces données nécessite beaucoup de ressources, cette option n'est activée que sur l'une des instances de votre service qui correspondent aux paramètres d'environnement et de version de la sonde. Les sondes concernées sont limitées à une exécution par seconde.

Les sondes log qui n'enregistrent pas de données supplémentaires sont activées sur toutes les instances du service qui correspondent à l'environnement et à la version spécifiés. Elles sont limitées à 5 000 exécutions par seconde sur chaque instance du service.

Pour en savoir plus, consultez la section [Fonctionnement de l'instrumentation dynamique][11].

Pour créer une sonde log :

1. Effectuez les étapes de configuration initiales (choisissez le service, l'environnement, la version et l'emplacement de la sonde).
1. Sélectionnez **Log** comme type de sonde.
1. Définissez un modèle de message du log. Vous pouvez utiliser le langage d'expression de l'instrumentation dynamique pour faire référence à des valeurs à partir du contexte d'exécution.
1. Si vous le souhaitez, activez l'enregistrement des données supplémentaires par la sonde.
1. Si vous le souhaitez, définissez une condition à l'aide du langage d'expression de l'instrumentation dynamique. Le log est généré lorsque l'expression renvoie la valeur true.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Créer une sonde log d'instrumentation dynamique" >}}

### Créer une sonde métrique

Une *sonde métrique* génère une métrique lorsqu'elle s'exécute.

Les sondes métrique sont automatiquement activées sur toutes les instances du service qui correspondent à l'environnement et à la version configurés.
Vous pouvez utiliser le langage d'expression de l'instrumentation dynamique pour faire référence à des valeurs numériques à partir du contexte, telles qu'une variable, le champ d'une classe ou une expression qui produit une valeur numérique.
Pour en savoir plus, consultez la section [Fonctionnement de l'instrumentation dynamique][11].

Pour créer une sonde métrique :

1. Effectuez les étapes de configuration initiales (choisissez le service, l'environnement, la version et l'emplacement de la sonde).
1. Sélectionnez **Metric** comme type de sonde.
1. Donnez un nom à la métrique, qui aura comme préfixe `dynamic.instrumentation.metric.probe.`.
1. Sélectionnez le type de métrique (count, gauge ou histogram).
1. Choisissez la valeur de la métrique à l'aide du langage d'expression de l'outil de debugging. Cette étape est facultative pour les métriques Count ; si aucune valeur n'est choisie, chaque appel incrémente la métrique Count de un.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Créer une sonde métrique d'instrumentation dynamique" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/guide/how_remote_config_works/
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-py
[5]: https://github.com/DataDog/dd-trace-dotnet
[6]: /fr/getting_started/tagging/unified_service_tagging/
[7]: /fr/integrations/guide/source-code-integration/
[8]: /fr/account_management/rbac/permissions#apm
[9]: /fr/logs/log_configuration/indexes/#exclusion-filters
[10]: /fr/logs/log_configuration/indexes/#add-indexes
[11]: /fr/dynamic_instrumentation/how-it-works/
[12]: https://app.datadoghq.com/dynamic-instrumentation