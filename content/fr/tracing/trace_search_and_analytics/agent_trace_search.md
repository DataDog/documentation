---
title: Configuration de la recherche de traces de l'Agent
kind: Documentation
---
La fonction [Analyse et recherche de traces][1] sert à filtrer les données d'APM avec des tags définis par l'utilisateur, comme `customer_id`, `error_type` ou `app_name`, vous permettant ainsi de dépanner et filtrer vos requêtes. Pour l'activer, deux options s'offrent à vous :

* En configurant votre traceur d'APM de façon à ce qu'il émette les analyses pertinentes à partir de vos services, [automatiquement][2] ou [manuellement][3].
* En configurant l'Agent Datadog de façon à ce qu'il émette les analyses pertinentes à partir de vos services (instructions ci-dessous).

**Remarque** : pour activer l'analyse et la recherche de traces avec l'Agent, les données de vos [services][1] doivent déjà passer par Datadog.

1. Une fois [vos services configurés][4], consultez la [documentation relative à la fonction Analyse et recherche de traces][5] pour obtenir la liste des [services][6] et des [ressources][7] au sein desquels vous pouvez rechercher des traces.
3. Sélectionnez l'`environment` et les `services` à partir desquels vous souhaitez extraire des [événements APM][8].
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

Dans Datadog, chaque service instrumenté automatiquement possède un `<NOM_OPÉRATION>. Celui-ci permet de définir le type de requête tracée. Par exemple, si vous tracez une application Flask Python, votre nom d'opération peut être `flask.request`. Pour une application Node utilisant Express, il peut s'agir de `express.request`.

Remplacez `<NOM_SERVICE>` et `<NOM_OPÉRATION>` dans votre configuration par le nom du service et le nom de l'opération dont vous souhaitez ajouter les [traces][9] à la recherche de traces.

Par exemple, pour un service Python intitulé `python-api` qui exécute Flask (nom d'opération `flask.request`), votre `<NOM_SERVICE>` doit être `python-api` et votre `<NOM_OPÉRATION>` doit être `flask.request`.


[1]: https://app.datadoghq.com/apm/services
[2]: /fr/tracing/app_analytics/#automatic-configuration
[3]: /fr/tracing/app_analytics/#custom-instrumentation
[4]: /fr/tracing/setup
[5]: https://app.datadoghq.com/apm/docs/trace-search
[6]: /fr/tracing/visualization/#services
[7]: /fr/tracing/visualization/#resources
[8]: /fr/tracing/search/#apm-events
[9]: /fr/tracing/visualization/#trace