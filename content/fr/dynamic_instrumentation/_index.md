---
aliases:
- /fr/tracing/dynamic_instrumentation/
- /fr/dynamic_instrumentation/how-it-works/
further_reading:
- link: /dynamic_instrumentation/expression-language/
  tag: Documentation
  text: En savoir plus sur le langage d'expression de l'instrumentation dynamique
- link: dynamic_instrumentation/sensitive-data-scrubbing/
  tag: Documentation
  text: Supprimer les informations sensibles de vos données d'instrumentation dynamique
- link: /tracing/trace_collection/dd_libraries
  tag: Documentation
  text: En savoir plus sur l'instrumentation de votre application
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Tagging de service unifié
- link: /tracing/service_catalog/
  tag: Documentation
  text: Découvrir et cataloguer les services transmettant des données à Datadog
- link: /metrics
  tag: Documentation
  text: En savoir plus sur les métriques
- link: https://www.datadoghq.com/blog/dynamic-instrumentation-application-logging/
  tag: Blog
  text: Utiliser l'instrumentation dynamique de Datadog pour ajouter des logs d'application
    sans aucun redéploiement
is_beta: false
kind: documentation
private: false
title: Instrumentation dynamique
---

## Présentation

L'instrumentation dynamique vous permet d'instrumenter vos systèmes de production en cours d'exécution sans aucun redémarrage et n'importe où dans le code de votre application, y compris les bibliothèques tierces. Vous pouvez ajouter ou modifier des données de télémétrie pour vos logs, métriques et spans, ainsi que les tags correspondants, depuis l'interface utilisateur de Datadog. L'instrumentation dynamique sollicite peu de ressources et n'a aucun effet secondaire sur votre système.

Si vous souhaitez tester les dernières améliorations apportées à l'expérience utilisateur pour lʼinstrumentation dynamique, pensez à participer à la [version bêta privée de la base de données des symboles][17].

## Prise en main

### Prérequis

L'instrumentation dynamique nécessite les éléments suivants :

- L'[Agent Datadog][1] 7.44.0 ou une version ultérieure doit être installé avec votre service.
- La fonctionnalité de [configuration à distance][2] doit être activée pour cet Agent.
- Pour les applications Java, la version 1.24.0 ou ultérieure de la bibliothèque de tracing [`dd-trace-java`][3] doit être installée.
- Pour les applications Python, la version 2.2.0 de la bibliothèque de tracing [`dd-trace-py`][4] doit être installée.
- Pour les applications .NET, la version 2.42.0 ou ultérieure de la bibliothèque de tracing [`dd-trace-dotnet`][5] doit être installée.
- Les tags `service`, `env` et `version` du [tagging de service unifié][6] doivent être appliqués à votre déploiement.
- Si vous le souhaitez, vous pouvez configurer l'[intégration du code source][7] pour votre service.
- L'autorisation **Dynamic Instrumentation Read Configuration** (`debugger_read`) est requise pour accéder à la page Dynamic Instrumentation.
- L'autorisation **Dynamic Instrumentation Write Configuration** (`debugger_write`) est requise pour créer ou modifier des instrumentations.
- L'autorisation **Dynamic Instrumentation Capture Variables** (`debugger_capture_variables`) est requise pour utiliser l'option **Capture method parameters and local variables**.

 Pour en savoir plus sur les rôles et découvrir comment les attribuer aux utilisateurs, consultez la section [Contrôle d'accès à base de rôles][8].

### Créer un index de logs

L'instrumentation dynamique crée des « logs dynamiques » qui sont envoyés à Datadog et affichés dans la même interface que vos logs d'application standard.

Si vous utilisez des [filtres d'exclusion][9], assurez-vous que les logs de l'instrumentation dynamique ne sont pas filtrés :

1. Créez un index de logs et [configurez-le][10] selon la rétention souhaitée et sans **aucun échantillonnage**.
2. Définissez le filtre sur le tag `source:dd_debugger`. Tous les logs de l'instrumentation dynamique utilisent cette source.
3. Assurez-vous que le nouvel index a la priorité sur les autres index basés sur ce tag, car la première correspondance l'emporte.

### Activer l'instrumentation dynamique

Pour activer l'instrumentation dynamique sur un service, accédez à la [page de configuration de l'application][16].

Pour obtenir des instructions plus détaillées, sélectionnez votre runtime ci-dessous :

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}


### Limites

- Lʼinstrumentation dynamique n'est pas encore compatible avec Azure App Services ni les environnements sans serveur.
- Seules les applications créées avec Python, Java, et .NET sont prises en charge.

## Explorer l'instrumentation dynamique

L'instrumentation dynamique peut vous aider à comprendre ce que fait votre application lors de son exécution. En ajoutant une sonde d’instrumentation dynamique, vous pouvez exporter des données supplémentaires de votre application sans modification du code ni redéploiement.

### Utiliser des sondes

Une sonde vous permet de recueillir des données depuis des points spécifiques de votre code sans interrompre l'exécution du programme.

Grâce aux sondes, vous pouvez accroître vos capacités d'observabilité en ajoutant des logs, des métriques et des spans dynamiques à une application en cours d'exécution sans modification du code, déploiement, ni redémarrage d'un service. Vous pouvez ainsi collecter immédiatement des données sans perturber l'expérience des utilisateurs ni effectuer de longs déploiements.

D'un point de vue développement, une sonde peut également être vue comme un point d'arrêt « non interruptif ». En debugging conventionnel, un point d'arrêt est un point du programme où l'exécution s'arrête, ce qui permet au développeur d'examiner l'état du programme en ce point. Toutefois, dans les environnements de production physiques, il n'est pas pratique ni même possible d'arrêter l'exécution du programme. Les sondes comblent cette lacune en vous permettant d'examiner l'état des variables dans les environnements de production de façon non intrusive.

### Créer une sonde

La configuration initiale est la même pour tous les types de sondes :

1. Accédez à la [page Dynamic Instrumentation][12].
1. Cliquez sur **Create Probe** en haut à droite, ou affichez le menu contextuel d'un service en cliquant sur les trois points et sélectionnez **Add a probe for this service**.
1. Si ces informations ne sont pas déjà renseignées, choisissez le service, le runtime, l'environnement et la version.
1. Dans le code source, indiquez où vous souhaitez définir la sonde en sélectionnant soit une classe et une méthode, soit un fichier source et une ligne. Si vous avez configuré l'intégration du code source pour votre service, la saisie automatique vous propose des fichiers à sélectionner et affiche le code associé afin de vous permettre de choisir la ligne.

Vous trouverez ci-dessous les instructions de création propres à chaque type de sonde.

Vous pouvez également créer une sonde depuis les autres contextes suivants :

Profiling
: Dans le flamegraph d'un profileur, vous pouvez créer une sonde pour une méthode en sélectionnant **Instrument this frame with a probe** dans le menu contextuel d'un frame.

Suivi des erreurs
: Dans une stack trace, placez le pointeur de la souris sur un stack frame et cliquez sur **Instrument**. Les données du contexte du problème sont alors renseignées automatiquement dans le formulaire de création de la sonde.


### Créer des sondes log

Une *sonde log* génère un log lorsqu'elle s'exécute.

Pour créer une sonde log :

1. Sélectionnez **Log** comme type de sonde.
1. Effectuez les [étapes de configuration initiales](#creer-une-sonde) (choisissez le service, l'environnement, la version et l'emplacement de la sonde).
1. Définissez un modèle de message de log. Vous pouvez utiliser le langage d'expression de l'instrumentation dynamique pour faire référence à des valeurs à partir du contexte d’exécution.
1. Si vous le souhaitez, activez l'enregistrement de données supplémentaires par la sonde. (Bêta)
1. Si vous le souhaitez, définissez une condition à l’aide du langage d’expression de l’instrumentation dynamique. Le log est généré lorsque l’expression renvoie la valeur true.

Par défaut, les sondes log sont activées sur toutes les instances du service correspondant à l'environnement et à la version spécifiés. Elles sont limitées à 5 000 exécutions par seconde sur chaque instance de votre service.

Vous devez définir un modèle de message de log pour chaque sonde log. Les modèles prennent en charge l'intégration d'[expressions][15] entre accolades. Par exemple : `L'utilisateur {user.id} a acheté {count(products)} produits`.

Vous pouvez également définir une condition pour une sonde log à l'aide du [langage d'expression][15]. L'expression doit renvoyer une valeur booléenne. La sonde s'exécute si l'expression renvoie la valeur true, et n'enregistre ou ne génère aucune donnée si l'expression renvoie la valeur false.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Créer une sonde log d'instrumentation dynamique" >}}

**Bêta** : si vous activez l'option **Capture method parameters and local variables** pour la sonde log, l'ensemble du contexte d'exécution est ajouté à l'événement de log :
  - Les **arguments de méthode**, les **variables locales** et les **champs**, avec les limites par défaut suivantes :
    - Suivi des références sur trois niveaux (configurable dans l'interface utilisateur).
    - Les 100 premiers éléments pour les collections.
    - Les 255 premiers caractères pour les valeurs des chaînes.
    - 20 champs à l'intérieur des objets. Les champs statiques ne sont pas recueillis.
  - **Stack trace** de l'appel.
  - **Exceptions** interceptées et non interceptées.

Les sondes pour lesquelles ce paramètre est activé sont limitées à une exécution par seconde.

<div class="alert alert-warning"><p><strong>Avertissement : les données enregistrées peuvent contenir des informations sensibles, notamment des données personnelles, des mots de passe et des secrets, comme des clés AWS.</strong></p><p>Pour que ces informations soient correctement censurées :<ul>
<li>L'instrumentation dynamique de Datadog fait appel à plusieurs techniques pour censurer les informations sensibles. Pour en savoir plus sur les mécanismes par défaut ou pour découvrir comment les étendre pour répondre à vos besoins, consultez la section relative au <a href="/dynamic_instrumentation/sensitive-data-scrubbing/">nettoyage des données sensibles</a>.</li>
<li>Désactivez l'option <strong>Capture method parameters and local variables</strong> et sélectionnez explicitement les variables à inclure dans le modèle de message de log. Cela permet de s'assurer que les sondes log ne contiennent que les données relatives aux variables spécifiquement identifiées, ce qui réduit le risque de fuite indésirable de données sensibles. </li>
<li>Si vous êtes l'administrateur de votre compte Datadog et souhaitez empêcher les autres utilisateurs d'utiliser l'option <strong>Capture method parameters and local variables</strong>, vous pouvez révoquer leur autorisation Dynamic Instrumentation Capture Variables (<code>debugger_capture_variables</code>). </li></ul></p><p>Si vous devez enregistrer ces données, mais que vous souhaitez limiter le risque associé au fait qu'elles soient accessibles dans Datadog, vous pouvez limiter les utilisateurs de votre organisation autorisés à consulter les données enregistrées en définissant une <a href="/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs">requête de restriction</a> sur <code>source:dd_debugger</code>.</p></div>

### Créer des sondes métrique

Une *sonde métrique* génère une métrique lorsqu'elle s'exécute.

Pour créer une sonde métrique :

1. Sélectionnez **Metric** comme type de sonde.
1. Effectuez les [étapes de configuration initiales](#creer-une-sonde) (choisissez le service, l'environnement, la version et l'emplacement de la sonde).
1. Donnez un nom à la métrique, qui aura comme préfixe `dynamic.instrumentation.metric.probe.`.
1. Sélectionnez le type de métrique (count, gauge ou histogram).
1. Choisissez la valeur de la métrique en utilisant le [langage d'expression de l'instrumentation dynamique][15]. Vous pouvez utiliser n'importe quelle valeur numérique issue du contexte d'exécution, comme un paramètre de méthode, une variable locale, un champ de classe ou une expression produisant une valeur numérique. Cette étape est facultative pour les métriques count, et si vous l'ignorez, chaque invocation incrémente le total de un.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Créer une sonde métrique d'instrumentation dynamique" >}}

Les sondes métrique sont automatiquement activées sur toutes les instances du service correspondant à l'environnement et à la version configurés. Leur fréquence d'exécution n'est pas limitée et elles s'exécutent à chaque invocation de la méthode ou de la ligne.

Les sondes métrique d'instrumentation dynamique prennent en charge les types de métriques suivants :

- **Count** : compte le nombre d'exécutions d'une méthode ou d'une ligne donnée. Cette métrique peut être combinée à des [expressions de métrique][15] pour incrémenter le total à l'aide de la valeur d'une variable.
- **Gauge** : génère une métrique gauge en fonction de la dernière valeur d'une variable. Cette métrique nécessite une [expression de métrique][15].
- **Histogram** : génère une distribution statistique d'une variable. Cette métrique nécessite une [expression de métrique][15].

### Créer des sondes span

Une *sonde span* génère une span lorsqu'une méthode est exécutée.

Pour créer une sonde span :

1. Sélectionnez **Span** comme type de sonde.
1. Effectuez les [étapes de configuration initiales](#creer-une-sonde) (choisissez le service, l'environnement, la version et l'emplacement de la sonde).

{{< img src="dynamic_instrumentation/span_probe.png" alt="Créer une sonde span d'instrumentation dynamique" >}}

Vous pouvez utiliser une *sonde span* au lieu de [créer de nouvelles spans par le biais de l'instrumentation personnalisée][13]. Si la méthode génère une exception, les détails de celle-ci sont associés au tag `error` de la nouvelle span.

### Créer des sondes tag de span

Une sonde *tag de span* ajoute une valeur de tag à une span existante. Vous pouvez ajouter un tag à la span _active_ ou à la span d'_entrée de service_. Gardez à l'esprit que les spans internes ne sont pas indexées par défaut et qu'il est donc possible que vous ne puissiez pas les rechercher dans APM.

Pour créer une sonde tag de span :

1. Sélectionnez **Span Tag** comme type de sonde.
1. Effectuez les [étapes de configuration initiales](#creer-une-sonde) (choisissez le service, l'environnement, la version et l'emplacement de la sonde).
1. Attribuez un nom au tag.
1. Spécifiez la valeur du tag en utilisant le [langage d'expression de l'instrumentation dynamique][15].
1. Si vous le souhaitez, définissez une condition à l'aide du langage d'expression de l'instrumentation dynamique. Le tag ne sera ajouté que si l'expression renvoie la valeur true.
1. Si vous le souhaitez, ajoutez d'autres tags en définissant pour chacun d'eux un nom, une expression et une condition facultative.


{{< img src="dynamic_instrumentation/span_tag_probe.png" alt="Créer une sonde tag de span d'instrumentation dynamique" >}}

Vous pouvez utiliser une *sonde tag de span* au lieu d'[utiliser l'instrumentation personnalisée pour ajouter des tags au code][14].


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/remote_config/
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
[13]: /fr/tracing/trace_collection/custom_instrumentation/java/#adding-spans
[14]: /fr/tracing/trace_collection/custom_instrumentation/java/#adding-tags
[15]: /fr/dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/setup
[17]: /fr/dynamic_instrumentation/symdb/