---
title: Implémentation de l'APM
kind: Documentation
aliases:
  - /fr/tracing/languages/
further_reading:
  - link: tracing/setup/environment
    tag: Documentation
    text: En apprendre plus sur la configuration d'environnements
  - link: tracing/setup/docker
    tag: Documentation
    text: Implémentation Docker
  - link: tracing/setup/go
    tag: Documentation
    text: Instrumentation avec Go
  - link: tracing/setup/java
    tag: Documentation
    text: Instrumentation avec Java
  - link: tracing/setup/python
    tag: Documentation
    text: Instrumentation avec Python
  - link: tracing/setup/ruby
    tag: Documentation
    text: Instrumentation avec Ruby
---
Cette documentation est valable uniquement avec l'Agent v6, pour savoir comment implémenter l'APM avec l'agent v5, [reportez-vous à la documentation APM avec l'Agent v5  dédiée][1].

## Processus d'implémentation

Avec notre monitoring d'infrastructure, les métriques sont envoyées à l'agent, qui les transmet ensuite à Datadog. De même, les métriques de tracing sont également envoyées à l'agent: l'instrumentation du code de l'application envoie les traces à l'agent toutes les 1 s ([Code pour le client Python](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159)) et l'agent envoie les données à l'API [Datadog toutes les 10s][2].

Pour commencer à Tracer votre application:

1. **Installer l'Agent Datadog**:
  Installez et configurez la dernière version de [l'Agent Datadog][3]. Pour plus d'informations, reportez-vous au [guide de démarrage dédié][4].

2. **Installer l'Agent Trace**:  

  * Sur **Linux**, **Windows** et **[Docker][5]** l'agent de Traces est packagé avec l'agent Datadog standard et aucune configuration supplémentaire n'est nécessaire.

  * Sur **macOS**, installez et exécutez [Agent de trace][6] en plus de l'Agent Datadog.
  Consulter la documentation pour l'Agent de trace [macOS][7] et [Windows][8].

  * Sur Heroku, déployez l'agent de trace Datadog via le [Datadog Heroku Buildpack][9].

3. **Configurez votre environnement**:
  Un environnement est une dimension de première classe utilisée pour définir une application APM Datadog. Un cas d'utilisation courant consiste à désagréger les métriques des environnements tels que la production, le staging et la pré-production. [Apprendre à configurer les environnements][10].
  **Note**: si vous ne configurez pas vos propres environnements, toutes les données seront taggées par défaut `env:none`.

4. **Instrumenter votre application**:   
  Sélectionnez un des languages pris en charge suivants:

  - [Go][11]
  - [Java][12]
  - [Python][13]
  - [Ruby][14]

    Pour instrumenter une application écrite dans une langue qui n'a pas encore de support de bibliothèque officiel, visitez notre liste de [bibliothèques de traçage de communauté][15].

5. Commencez à surveiller les performances de votre application: Au bout de quelques minutes d'exécution d'APM, vous commencerez à voir vos services apparaître dans [la page d'accueil APM][16]. Pour en découvrir plus, consultez la documentation sur [l'utilisation de l'interface utilisateur Datadog APM][17].

## Configuration de l'Agent

L'Agent APM (également appelé _trace agent_) est livré par défaut avec
Agent v6 sur les plateformes Linux, MacOS et Windows. L'agent APM est activé par défaut sur Linux. Pour activer l'APM  sur d'autres plateformes ou la désactiver sur Linux, mettez à jour la variable `apm_config` dans votre fichier `datadog.yaml`:

```
apm_config:
  enabled: true
```

{{% table responsive="true" %}}
| File setting            | Environment variable | Description                                                                                                                                                      |
|------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **main**                |                      |                                                                                                                                                                  |
| `apm_enabled`           | `DD_APM_ENABLED`     | L'Agent Datadog accepte les métriques de trace lorsque la valeur est définie sur `true`. La valeur par défaut est `true`.                                                |
| **trace.sampler**       |                      |                                                                                                                                                                  |
| `extra_sample_rate`     | -                    | Utilisez ce réglage pour ajuster la fréquence d'échantillonnage de la trace. La valeur devrait être un flottant entre `0` (pas d'échantillonnage) et` 1` (échantillonnage normal). La valeur par défaut est `1`. |
| `max_traces_per_second` | -                    | Le nombre maximum de traces à échantillonner par seconde. Pour désactiver la limite (*non recommandé*), réglez sur "0". La valeur par défaut est `10`.|
| **trace.receiver**      |                      |                                                                                                                                                                  |
| `receiver_port`         | `DD_RECEIVER_PORT`   | Le port sur lequel le receveur de traces de l'agent Datadog écoute. La valeur par défaut est `8126`.                                                                  |
| `connection_limit`      | -                    | Le nombre de connexions client uniques à autoriser pendant une période roulante de 30 secondes. La valeur par défaut est `2000`.                                                |
| **trace.ignore**        |                      |                                                                                                                                                                  |
| `resource`              | `DD_IGNORE_RESOURCE` | Une liste noire d'expressions régulières pour filtrer les traces par leur nom de ressource.                                                                                |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page][18] or refer to the [`datadog.conf.example` file][19].

[Reportez-vous à notre documentation sur l'implémentation du tracing avec Docker][5].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration
[5]: /tracing/setup/docker
[6]: https://github.com/DataDog/datadog-trace-agent
[7]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[8]: https://github.com/DataDog/datadog-trace-agent/#run-on-windows
[9]: https://github.com/DataDog/heroku-buildpack-datadog
[10]: /tracing/setup/first_class_dimensions#environment
[11]: /tracing/setup/go
[12]: /tracing/setup/java
[13]: /tracing/setup/python
[14]: /tracing/setup/ruby
[15]: /developers/libraries/#community-tracing-apm-libraries
[16]: https://app.datadoghq.com/apm/home?env=
[17]: /tracing/visualization
[18]: /agent/
[19]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example