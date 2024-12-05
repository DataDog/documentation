---
aliases:
- /fr/tracing/runtime_metrics/dotnet
code_lang: dotnet
code_lang_weight: 50
description: Consultez des statistiques supplémentaires sur les performances de votre
  application .NET grâce aux métriques runtime associées à vos traces.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/dotnet-runtime-metrics/
  tag: GitHub
  text: Surveiller les métriques runtime .NET avec Datadog
title: Métriques runtime .NET
type: multi-code-lang
---

## Métriques runtime compatibles

- .NET Framework 4.6.1+ 
- .NET Core 3.1
- .NET 5
- .NET 6
- .NET 7

## Configuration automatique

Activez la collecte de métriques runtime dans le traceur .NET 1.23.0+ avec la variable d'environnement `DD_RUNTIME_METRICS_ENABLED=true`.

Visualisez vos métriques runtime en corrélation avec vos services .NET. Consultez la [page Service][1] dans Datadog.

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][2].

Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur true][3] et que le port `8125` est ouvert sur l'Agent. En outre, pour :

- **Kubernetes** : vous _devez_ [lier le port DogStatsD au port d'un host][4].
- **ECS** : [définissez les flags adéquats dans la définition de votre tâche][5].

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques .NET.

{{< get-metrics-from-git "dotnet" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime .NET par défaut][6].

## Autorisations supplémentaires pour IIS

Sur .NET Framework, les métriques peuvent être recueillies à l'aide de compteurs de performances. Les utilisateurs avec une session ouverte non interactive (notamment ceux avec des comptes de pool d'applications IIS et certains comptes de service) doivent être ajoutés au groupe **Performance Monitoring Users** pour accéder aux données des compteurs.

Les pools d'applications IIS utilisent des comptes spéciaux qui n'apparaissent pas dans la liste des utilisateurs. Pour les ajouter au groupe Performance Monitoring Users, recherchez `IIS APPPOOL\<nom du pool>`. Par exemple, l'utilisateur pour DefaultAppPool est `IIS APPPOOL\DefaultAppPool`.

Vous pouvez effectuer cette opération depuis l'interface Computer Management, ou depuis l'invite de commandes administrateur :

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[5]: /fr/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics