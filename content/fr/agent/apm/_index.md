---
title: Configuration de l'APM
kind: Documentation
aliases:
  - /fr/tracing/languages/
  - /fr/tracing/environments/
  - /fr/tracing/setup/environment
  - /fr/tracing/setup/first_class_dimensions
  - /fr/tracing/getting_further/first_class_dimensions/
further_reading:
  - link: /agent/docker/apm
    tag: Documentation
    text: Configuration de Docker
  - link: tracing/languages/go
    tag: Documentation
    text: Instrumentation avec Go
  - link: tracing/languages/java
    tag: Documentation
    text: Instrumentation avec Java
  - link: tracing/languages/python
    tag: Documentation
    text: Instrumentation avec Python
  - link: tracing/languages/ruby
    tag: Documentation
    text: Instrumentation avec Ruby
---
Cette documentation est valable uniquement pour l'Agent v6. Pour découvrir comment configurer l'APM avec l'Agent v5, [reportez-vous à la documentation relative à l'utilisation de l'APM avec l'Agent v5][1].

## Processus de configuration

La solution de surveillance d'infrastructure de Datadog transmet des métriques à l'Agent, qui les envoie à Datadog. Les métriques de tracing sont envoyées à l'Agent de la même façon : le code d'application instrumenté transmet les données à l'Agent toutes les secondes (cliquez [ici][2] pour obtenir le client Python) et l'Agent les renvoie à l'API Datadog toutes les 10 secondes.

Pour commencer à tracer votre application :

1. **Installez l'Agent Datadog** :
  installez et configurez la dernière version de l'[Agent Datadog][3]. Sur macOS, installez et exécutez l'Agent de trace en plus de l'Agent Datadog. Consultez la documentation relative à l'[Agent de trace macOS][4] pour en savoir plus.

2. **Activez la collecte de traces pour l'Agent Datadog** : [suivez les instructions ci-dessous](#configuration-de-l-agent).

2. **Configurez votre environnement** :
  un environnement est un [tag primaire](#tags-primaires) obligatoire utilisé pour englober l'ensemble d'une application APM Datadog. Cela sert notamment à dissocier des métriques des environnements par étape, pour la production, le transit ou encore la pré-production. [Découvrez comment configurer des tags primaires](#tags-primaires).

3. **Instrumentez votre application** :  

  {{< whatsnext desc="Sélectionnez l'un des langages pris en charge suivants :">}}
      {{< nextlink href="tracing/languages/java" tag="Java" >}}Instrumentation avec Java{{< /nextlink >}}
      {{< nextlink href="tracing/languages/cpp" tag="C++" >}}Instrumentation avec C++{{< /nextlink >}}
      {{< nextlink href="tracing/languages/python" tag="Python" >}}Instrumentation avec Python{{< /nextlink >}}
      {{< nextlink href="tracing/languages/ruby" tag="Ruby" >}}Instrumentation avec Ruby{{< /nextlink >}}
      {{< nextlink href="tracing/languages/go" tag="Go" >}}Instrumentation avec Go{{< /nextlink >}}
      {{< nextlink href="tracing/languages/nodejs" tag="Nodejs" >}}Instrumentation avec Node.js{{< /nextlink >}}
      {{< nextlink href="tracing/languages/dotnet" tag=".NET" >}}Instrumentation avec .NET{{< /nextlink >}}
      {{< nextlink href="tracing/languages/php" tag="PHP" >}}Instrumentation avec PHP{{< /nextlink >}}
  {{< /whatsnext >}}


Pour instrumenter une application rédigée dans un langage qui ne prend pas encore en charge une bibliothèque officielle, consultez la liste des [bibliothèques de tracing de notre communauté][5].

Enfin, commencez à surveiller les performances de votre application. Après quelques minutes d'exécution de l'APM, vos services apparaissent sur [la page d'accueil de l'APM][6]. Consultez la section [Utiliser l'IU de l'APM][7] pour en savoir plus.

## Configuration de l'Agent

### Collecte de traces
Pour activer la collecte de traces pour votre Agent, modifiez la clé `apm_config` dans le [principal fichier de configuration `datadog.yaml` de votre Agent][8] :

```
apm_config:
  enabled: true
```

[Consultez la documentation relative à la configuration du tracing avec Docker][9].

Vous trouverez ci-dessous la liste complète des paramètres disponibles pour votre fichier de configuration `datadog.yaml` :

| Paramètre du fichier              | Type        | Description                                                                                                                                                        |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`                 | boolean     | Lorsque ce paramètre est défini sur `true`, l'Agent Datadog accepte les métriques de trace. Valeur par défaut : `true`.                                                                              |
| `apm_dd_url`              | string      | Endpoint de l'API Datadog vers lequel les traces sont envoyées.                                                                                                                        |
| `env`                     | string      | Environnement par défaut auquel les traces appartiennent (p. ex., *staging*, *production*, etc.).                                                              |
| `extra_sample_rate`       | float       | Utilisez ce paramètre pour ajuster le taux d'échantillonnage des traces. La valeur doit être de type float et varier entre `0` (pas d'échantillonnage) et `1` (échantillonnage normal). Valeur par défaut : `1`.           |
| `max_traces_per_second`   | float       | Nombre maximum de traces à échantillonner par seconde. Définissez ce paramètre sur `0` pour désactiver la limite (*non conseillé*). Valeur par défaut : `10`.                                     |
| `ignore_resources`        | list        | La liste des ressources ignorées par l'Agent.                                                                                                                  |
| `log_file`                | string      | Emplacement du fichier de log.                                                                                                                                          |
| `replace_tags`            | list        | La liste des règles de remplacement des tags. Consultez la section [Nettoyer les informations sensibles](#nettoyer-les-informations-sensibles) pour en savoir plus.                                              |
| `receiver_port`           | number      | Port sur lequel le récepteur de traces de l'Agent Datadog effectue son écoute. Valeur par défaut : `8126`.                                                                                   |
| `apm_non_local_traffic`   | boolean     | Définir sur `true` pour autoriser l'Agent à recevoir des connexions extérieures et effectuer une écoute sur l'ensemble des interfaces.                                                                                 |
| `max_memory`              | float       | Mémoire maximale que l'Agent peut occuper. Si l'Agent dépasse cette valeur, le processus est arrêté.                                                                   |
| `max_cpu_percent`         | float       | Pourcentage maximum du processeur que l'Agent doit utiliser. L'Agent ajuste automatiquement son taux de pré-échantillonnage pour ne pas dépasser cette valeur.                                 |

Pour découvrir une vue d'ensemble de tous les paramètres de l'APM disponibles, consultez le fichier de configuration [`datadog.example.yaml`][10] de l'Agent.
Pour en savoir plus sur l'Agent Datadog, lisez la [page dédiée][11] ou consultez les [modèles `datadog.yaml`][12].

### Recherche de traces
Pour activer la recherche de traces, les données de vos [services][13] doivent passer par Datadog. Une fois vos services configurés, accédez à la [page de la documentation relative à l'analyse et à la recherche de traces][14] pour consulter la liste de chacun des services s'exécutant au sein de votre infrastructure.

Dans Datadog, chaque service instrumenté automatiquement possède un nom d'opération. Celui-ci permet de définir le type de requête tracée. Par exemple, si vous tracez une application Flask Python, votre nom d'opération peut être `flask.request`. Pour une application Node utilisant Express, il peut s'agir de `express.request`.

Remplacez `<NOM_SERVICE>` et `<NOM_OPÉRATION>` dans votre configuration par le nom du service et de l'opération des traces que vous souhaitez ajouter à la recherche de traces.

Par exemple, pour un service Python intitulé `python-api` qui exécute Flask (nom d'opération `flask.request`), votre `<NOM_SERVICE>` doit être `python-api` et votre `<NOM_OPÉRATION>` doit être `flask.request`.

La [page de la documentation relative à l'analyse et à la recherche de traces][14] indique la liste des services et des noms de ressources au sein desquels vous pouvez rechercher des traces :

1. Sélectionnez les paramètres `environment` et `services` à partir desquels vous souhaitez extraire des [événements APM][15].
2. Modifiez la configuration de votre Agent Datadog (en fonction de la version de votre Agent) en suivant les instructions ci-dessous :

{{< tabs >}}
{{% tab "Agent 6.3.0+" %}}
Dans `datadog.yaml`, ajoutez `analyzed_spans` sous `apm_config`. Par exemple :

```yaml
apm_config:
  analyzed_spans:
    <NOM_SERVICE_1>|<NOM_OPÉRATION_1>: 1
    <NOM_SERVICE_2>|<NOM_OPÉRATION_2>: 1
```

{{% /tab %}}
{{% tab "Agent 5.25.0+" %}}
Dans `datadog.conf`, ajoutez `[trace.analyzed_spans]`. Par exemple :

```
[trace.analyzed_spans]
<NOM_SERVICE_1>|<NOM_OPÉRATION_1>: 1
<NOM_SERVICE_2>|<NOM_OPÉRATION_2>: 1
```

{{% /tab %}}
{{% tab "Docker" %}}
Ajoutez `DD_APM_ANALYZED_SPANS` à l'environnement de conteneur de l'Agent (compatible avec les versions 12.6.5250+). Utilisez des expressions régulières séparées par des virgules sans espace. Par exemple :

```
DD_APM_ANALYZED_SPANS="<NOM_SERVICE_1>|<NOM_OPÉRATION_1>=1,<NOM_SERVICE_2>|<NOM_OPÉRATION_2>=1"
```

```
`my-express-app|express.request=1,my-dotnet-app|aspnet_core_mvc.request=1`
```

{{% /tab %}}
{{< /tabs >}}

## Tags primaires
### Définition

Il existe différentes dimensions vous permettant d'englober l'ensemble d'une application APM Datadog. Ainsi, vous pouvez inclure des statistiques agrégées (telles que le nombre de requêtes/seconde, la latence, le taux d'erreur ou le score Apdex) et des traces visibles. Ces dimensions se configurent à l'aide des tags primaires, qui offrent une visibilité encore plus détaillée sur le comportement de votre application. Les tags primaires peuvent être utilisés pour un environnement, une zone de disponibilité, un datacenter, etc.

Les tags primaires respectent un autre ensemble de règles que celles des [tags Datadog][16] standard.

### Implémentation
#### Environnement

L'environnement à partir duquel vous recueillez vos traces constitue le tag primaire obligatoire par défaut. Sa clé de tag est `env`. Par défaut, sa valeur pour des données sans tag correspond à `env:none`.
Il existe différentes façons de spécifier un environnement lors de l'envoi de données :

1. Tag de host :
  Utilisez un tag de host au format `env:<ENVIRONNEMENT>` pour taguer l'ensemble des traces de l'Agent correspondant.

2. Configuration de l'Agent :
  Remplacez le tag par défaut utilisé par l'Agent dans [le fichier de configuration de l'Agent][17]. Cela permet de taguer toutes les traces transmises à l'Agent, ce qui ignore la valeur du tag du host.

    ```
    apm_config:
      env: <ENVIRONMENT>
    ```

3. Par trace :
  Lorsque vous envoyez une seule trace, spécifiez un environnement en taguant l'une de ses spans avec la clé de métadonnées `env`. Cela ignore la configuration de l'Agent et la valeur du tag du host (le cas échéant). Consultez la [documentation relative aux tags des traces][18] pour découvrir comment assigner un tag à vos traces.

##### Afficher les données selon un environnement

L'environnement apparaît en haut des pages APM. Utilisez la liste déroulante pour englober les données affichées sur la page actuelle.

{{< img src="agent/apm/envs_tracing_screen.png" alt="Tracing d'environnements" responsive="true" style="width:80%;">}}

### Ajouter un deuxième tag primaire dans Datadog

Si vous ajoutez un tag de host autre que `env:<ENVIRONNEMENT>` à vos traces, celui-ci peut être défini comme tag primaire en plus du tag d'environnement. Accédez à la page [APM Settings][19] pour définir, modifier ou supprimer vos tags primaires.

Remarques :

* Seuls les administrateurs d'organisation peuvent accéder à cette page.
* Les modifications peuvent prendre jusqu'à deux heures avant d'être appliquées dans l'IU.

Si vous modifiez un tag primaire défini, prenez en compte ce qui suit 

* Vous ne pourrez plus accéder aux données historiques de l'APM agrégées par ce tag primaire.
* Les monitors d'APM associés à l'ancien tag afficheront le statut _No Data_.

#### Afficher les données selon un tag primaire

Les tags primaires apparaissent en haut des pages APM. Utilisez ces sélecteurs pour disséquer les données affichées sur la page actuelle. Pour afficher les données sans tag primaire, choisissez `<NOM_TAG>:*` dans la liste déroulante (tel qu'indiqué ci-dessous).

{{< img src="agent/apm/primary_tags_ui.png" alt="IU tags primaires" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/dd-trace-py
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[5]: /fr/developers/libraries/#community-tracing-apm-libraries
[6]: https://app.datadoghq.com/apm/home?env=
[7]: /fr/tracing/visualization
[8]: /fr/agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[9]: /fr/agent/docker/apm
[10]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[11]: /fr/agent
[12]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[13]: https://app.datadoghq.com/apm/services
[14]: https://app.datadoghq.com/apm/docs/trace-search
[15]: /fr/tracing/visualization/search/#apm-events
[16]: /fr/tagging
[17]: /fr/agent/faq/agent-configuration-files/?tab=agentv6
[18]: /fr/tagging/assigning_tags/#traces
[19]: https://app.datadoghq.com/apm/settings