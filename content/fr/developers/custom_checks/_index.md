---
title: Checks custom
description: Configurer un check custom avec Datadog
---
## Présentation

Les checks custom, ou checks custom d'Agent, vous permettent de recueillir des métriques et d'autres données à partir de vos applications ou systèmes personnalisés, et de les envoyer à Datadog. Après avoir créé et configuré un nouveau fichier de check dans votre répertoire `conf.d`, vous pouvez configurer l'Agent Datadog de façon à ce qu'il recueille les données générées par votre application. Il est plus facile de concevoir un check custom qu'une intégration Datadog. Les checks custom ont une incidence sur votre facturation, puisque les métriques qu'ils génèrent sont considérées comme des métriques custom, dont le coût varie en fonction de votre formule d'abonnement.

**Remarque** : les checks custom et les checks de service sont deux concepts bien différents. Les checks de service surveille le statut de disponibilité d'un service. Pour en savoir plus, consultez la documentation relative aux [checks de service][1].

### Faut-il que je rédige un check custom d'Agent ou une intégration ?

Utilisez les checks custom pour recueillir des métriques à partir de vos applications personnalisées ou de systèmes uniques. Si vous cherchez à obtenir des métriques depuis une application disponible librement, un service public ou un projet open source, Datadog vous conseille de [créer une intégration d'Agent complète][2]. Pour obtenir plus d'informations afin de déterminer la méthode à suivre pour envoyer vos données, consultez la section réservée aux [développeurs][3]. Pour découvrir comment rédiger une intégration, consultez la section [Créer une intégration][2].

## Prise en main

{{< whatsnext >}}
    {{< nextlink href="/developers/custom_checks/write_agent_check/" >}}Pour apprendre rapidement les bases, consultez la section Écrire un check custom d'Agent. {{< /nextlink >}}
    {{< nextlink href="/developers/custom_checks/prometheus/" >}}Si vous souhaitez accomplir plus de choses qu'un check générique (par exemple, pré-traiter vos données), consultez la section Check custom OpenMetrics.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/developers/service_checks/
[2]: /fr/developers/integrations/new_check_howto/
[3]: /fr/developers/