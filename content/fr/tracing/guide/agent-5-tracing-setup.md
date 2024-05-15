---
aliases:
- /fr/tracing/faq/agent-5-tracing-setup
kind: guide
private: true
title: APM et profileur en continu avec la version 5 de l'Agent
---

## Débuter

APM est disponible avec les versions 5.11+ de l'Agent Datadog via la commande d'installation en une étape pour les Agents Linux et Docker. Les utilisateurs de [Mac][1] et de [Windows][2] doivent effectuer une installation manuelle de l'Agent APM (aussi appelé Agent de trace) via un autre processus d'installation.

Pour activer l'Agent, ajoutez la ligne suivante dans le [fichier de configuration de votre Agent Datadog][3] :

```conf
apm_enabled: true
```

<div class="alert alert-info">
L'APM est activé par défaut depuis la version 5.13 de l'Agent Datadog (sur Linux et Docker), mais il peut être désactivé en ajoutant le paramètre <code>apm_enabled: no</code> dans le fichier de configuration de votre Agent Datadog.
</div>

### Installation de l'Agent

Les [métriques de tracing][4] sont envoyées à Datadog via l'Agent Datadog. Pour activer le tracing :

Installez la dernière version de l'[Agent Datadog][5] (la version 5.11.0+ est requise).

### Exécution de l'Agent dans Docker

Pour tracer des applications dans des conteneurs Docker, utilisez l'image [docker-dd-agent][6] (version 11.0.5110+) et activez la collecte des traces en transmettant `DD_APM_ENABLED=true` en tant que variable d'environnement.

Pour obtenir davantage d'informations, consultez [la page Docker][7].

### Instrumenter votre application

{{< whatsnext desc="Sélectionnez l'un des langages pris en charge suivants :">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}Instrumentation avec Java{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}Instrumentation avec C++{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}Instrumentation avec Python{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Instrumentation avec Ruby{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Instrumentation avec Go{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Instrumentation avec Node.js{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}Instrumentation avec .NET{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}Instrumentation avec PHP{{< /nextlink >}}
{{< /whatsnext >}}

Pour instrumenter une application écrite dans un langage qui ne prend pas encore en charge une bibliothèque officielle, consultez l'[API de tracing][8].

## Configuration

Les options de configuration pour l'APM et la surveillance d'infrastructures sont définies dans le fichier de configuration de l'Agent Datadog.

De plus, certaines options de configuration peuvent être définies comme variables d'environnement. Remarque : les options définies en tant que variables d'environnement remplacent les paramètres définis dans le fichier de configuration.

| Paramètre du fichier            | Variable d'environnement       | Description                                                                                                                                                      |
|-------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`           | L'Agent Datadog accepte les métriques de traces lorsque la valeur est définie sur `true`. Valeur par défaut : `true`.                                                            |
| `receiver_port`         | `DD_RECEIVER_PORT`         | Le port sur lequel le récepteur de traces de l'Agent Datadog doit effectuer son écoute. Valeur par défaut : `8126`.                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | Le nombre de connexions client uniques à autoriser pendant une période de bail de 30 secondes. Valeur par défaut : `2000`.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | Une liste d'expressions régulières correspondant aux traces à exclure en fonction de leur nom de ressource.                                                                                  |

Pour obtenir plus d'informations à propos de l'Agent Datadog, consultez la [page de documentation dédiée][9] ou le [fichier `datadog.conf.example`][10].

### Recherche de traces

La recherche de traces est disponible pour l'Agent 5.25.0+. Pour en savoir plus, consultez les instructions de configuration dans la [documentation principale de l'APM][11].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-windows
[3]: /fr/agent/faq/where-is-the-configuration-file-for-the-agent/
[4]: /fr/tracing/glossary/#trace-metrics
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://gcr.io/datadoghq/docker-dd-agent
[7]: /fr/tracing/docker/
[8]: /fr/tracing/guide/send_traces_to_agent_by_api/
[9]: /fr/agent/
[10]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[11]: /fr/tracing/setup/?tab=agent5250#trace-search
[12]: /fr/help/