---
aliases:
- /fr/tracing/guide/adaptive_sampling
description: Ajustez automatiquement les taux d'échantillonnage pour respecter des
  budgets spécifiques tout en conservant une visibilité sur les endpoints de service.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentation
  text: Paramètres d'ingestion
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
site_support_id: adaptive_sampling
title: Échantillonnage adaptatif
---
## Présentation {#overview}

L'échantillonnage adaptatif **Datadog** vous aide à capturer des traces plus pertinentes tout en restant proche d'un budget spécifique (gigaoctets ingérés).

Lorsque vous choisissez l'échantillonnage adaptatif comme stratégie d'échantillonnage, vous sélectionnez un volume mensuel cible pour l'ingestion de traces pour un ou plusieurs services. Cela garantit que la consommation de ces services correspond au volume cible à la fin du mois, tout en conservant une visibilité sur leurs endpoints.

L'échantillonnage adaptatif utilise la [configuration à distance][3] ainsi que les mécanismes de [règles d'échantillonnage][7] existants pour ajuster dynamiquement les taux d'échantillonnage pour chaque combinaison d'environnement, de service et de ressource. Cela vous aide à :
- Respectez votre budget mensuel spécifié.
- Assurez la visibilité des services et endpoints à faible trafic en capturant au moins une trace pour chaque combinaison de service, ressource et environnement toutes les 5 minutes.

Pour configurer les services afin d'utiliser l'échantillonnage adaptatif, suivez les instructions ci-dessous.

## Prérequis {#requirements}

- Datadog Agent [7.53.0][2] ou version ultérieure.
- [Remote Configuration][3] activée pour votre Agent.
- `APM Remote Configuration Write` [permission][4].  
   **Remarque** : Si vous ne disposez pas de cette autorisation, demandez à votre administrateur Datadog de mettre à jour vos autorisations depuis les paramètres de votre organisation.

### Versions de la bibliothèque de tracing {#tracing-library-versions}

Le tableau suivant répertorie les versions minimales du SDK requises pour l'échantillonnage adaptatif :

| Langage    | Version minimale requise |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v3.14.2][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |
| Rust        | [v0.4.0][20]             |

## Limitations {#limitations}

Des limites s'appliquent aux combinaisons de services et d'environnements en fonction de la configuration d'échantillonnage :

#### Échantillonnage adaptatif {#adaptive-sampling}

- Le nombre maximal de `service/env` combinaisons intégrées à l'échantillonnage adaptatif est de 800.
- Chaque paire `service/env` unique configurée pour l'échantillonnage adaptatif compte pour cette limite.

#### Configuration d'échantillonnage à distance {#remote-sampling-configuration}

- Le nombre maximal de `service/env` combinaisons utilisant une configuration d'échantillonnage à distance est de **1000**.
- Cette limite s'applique indépendamment du nombre de règles d'échantillonnage définies pour chaque service.
- Chaque paire `service/env` unique avec échantillonnage à distance activé compte pour une unité dans cette limite.

#### Services utilisant à la fois l'échantillonnage adaptatif et à distance {#services-using-both-adaptive-and-remote-sampling}

- Si une `service/env` combinaison utilise à la fois l'échantillonnage adaptatif et une configuration d'échantillonnage à distance, elle compte pour une unité dans chaque limite respective (une fois dans la limite de 800 pour l'échantillonnage adaptatif et une fois dans la limite de 1000 pour l'échantillonnage à distance).
- Elle **ne** compte pas deux fois dans l'une ou l'autre des limites individuelles.

## Configurez la cible d'échantillonnage adaptatif {#configure-the-adaptive-sampling-target}

Pour commencer avec l'échantillonnage adaptatif, vous devez d'abord choisir un paramètre de stratégie cible :

- {{< ui >}}Set Budget by Number of APM Hosts{{< /ui >}} : Configurez un budget proportionnel à votre allocation et au nombre de services intégrés (par exemple, en fonction du nombre de hosts APM)
- {{< ui >}}Set Budget by Data Volume{{< /ui >}} : Configurez une cible fixe en gigaoctets par mois


|          | Budget par nombre de hosts APM                                                                                                              | Budget par volume de données                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Avantages** | S'adapte au nombre de hosts APM et au nombre de services intégrés ; vous n'avez à le configurer qu'une seule fois | Garantit que vous ne dépasserez jamais votre budget |
| **Inconvénients** | Ne convient pas si vous souhaitez rester en dessous d'un volume spécifique, car il peut varier en fonction du nombre de hosts envoyant des données APM à Datadog | Vous devez modifier le budget à chaque fois que vous intégrez un nouveau service à l'échantillonnage adaptatif |

Pour définir l'objectif mensuel d'échantillonnage adaptatif :
1. Accédez à la page [Ingestion Control][18].
2. Cliquez sur {{< ui >}}Manage Adaptive Sampling Target{{< /ui >}}.
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="Appel à l'action pour définir l'objectif d'échantillonnage adaptatif" style="width:100%;">}}
3. Choisissez une stratégie cible pour l'échantillonnage :
   - [Définissez le budget par nombre de hosts APM](#set-budget-by-number-of-apm-hosts-recommended)
   - [Définissez le budget par volume de données](#set-budget-by-data-volume)
4. Cliquez sur {{< ui >}}Apply{{< /ui >}}.

### Définissez le budget par nombre de hosts APM (Recommandé) {#set-budget-by-number-of-apm-hosts-recommended}

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="Définition de l'objectif basée sur un pourcentage :" style="width:100%;">}}

Définissez votre objectif mensuel en pourcentage de votre allocation. En bas de la page, une explication plus complète vous est fournie sur la façon dont ce pourcentage est converti en un volume cible mensuel. Il s'agit du produit de : 

- Le {{< ui >}}global allotment{{< /ui >}} : `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- Le {{< ui >}}percentage of allotment{{< /ui >}} configuré ci-dessus
- Le {{< ui >}}contribution of onboarded services{{< /ui >}} à l'allocation. Par exemple, si les services intégrés à l'échantillonnage adaptatif contribuent à 10 % du volume total ingéré, Datadog cible 10 % de l'allocation globale. Ce nombre augmente avec le nombre de services intégrés.

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="Calcul de l'objectif basé sur un pourcentage :" style="width:100%;">}}

Ce volume cible mensuel est recalculé toutes les 30 minutes.

### Définissez le budget par volume de données{#set-budget-by-data-volume}

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="Définition de l'objectif basée sur le volume" style="width:100%;">}}

Si vous configurez le premier service pour l'échantillonnage adaptatif, assurez-vous que l'objectif de volume d'ingestion est `>0`. Pour les services suivants, vous devez augmenter le budget alloué après l'intégration du nouveau service afin de prendre en compte le nouveau volume.  
  <div class="alert alert-info">Le budget configuré est uniquement alloué aux services inscrits à l'échantillonnage adaptatif. Il n'inclut pas le volume ingéré provenant de services non inscrits à l'échantillonnage adaptatif, de règles d'échantillonnage locales ou d'autres <a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">mécanismes d'échantillonnage</a> configurés localement dans l'Agent ou les SDK.</div>

## Configurez l'échantillonnage adaptatif pour un service{#configure-adaptive-sampling-for-a-service}

### Affichez les taux d'échantillonnage par ressource pour un service{#view-sampling-rates-by-resource-for-a-service}

Avant de configurer l'échantillonnage adaptatif pour un service, vous pouvez afficher la configuration d'ingestion actuelle pour ce service.

Pour voir les taux d'échantillonnage configurés :

1. Accédez à la page [Ingestion Control][18].
2. Cliquez sur un service pour afficher le {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Consultez le tableau listant les taux d'échantillonnage appliqués par ressource du service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tableau des taux d'échantillonnage par ressource" style="width:100%;">}}

Le tableau inclut :
- {{< ui >}}Ingested bytes{{< /ui >}} : Octets ingérés à partir des spans du service et de la ressource.
- {{< ui >}}Downstream bytes{{< /ui >}} : Octets ingérés à partir des spans où la décision d'échantillonnage commence à partir de ce service et de cette ressource, y compris les services en aval.
- {{< ui >}}Configuration{{< /ui >}} : Source du taux d'échantillonnage de la ressource :
  - `AUTOMATIC` : [Mécanisme d'échantillonnage basé sur le début][8] de l'Agent.
  - `CONFIGURED LOCAL` : [Règle d'échantillonnage][7] définie localement dans le SDK.
  - `CONFIGURED REMOTE` : Règle d'échantillonnage à distance définie depuis l'interface utilisateur Datadog.
  - `ADAPTIVE REMOTE`: Règles d'échantillonnage adaptatif définies par Datadog.

Une fois qu'un service est intégré à l'échantillonnage adaptatif, les taux d'échantillonnage sont ajustés et recalculés toutes les 10 minutes.

### Intégrez un service à l'échantillonnage adaptatif {#onboard-a-service-to-adaptive-sampling}

Pour intégrer un service à l'échantillonnage adaptatif :

1. Accédez à la page [Ingestion Control][18].
2. Cliquez sur un service pour afficher le {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Cliquez sur {{< ui >}}Manage Ingestion Rate{{< /ui >}}.
4. Choisissez {{< ui >}}Datadog adaptive sampling rates{{< /ui >}} comme stratégie d'échantillonnage de votre service.
5. (Facultatif) Configurez des [taux d'échantillonnage][15] explicites pour des ressources spécifiques, pour lesquelles vous souhaitez capturer plus (par exemple, 100 % des endpoints `GET /checkout`) ou moins (par exemple, 0,1 % des requêtes `/health`) de données.
6. Cliquez sur {{< ui >}}Apply{{< /ui >}}.

<div class="alert alert-info">Si l'application de cette configuration <strong>à distance</strong> est désactivée, assurez-vous que les <a href="#requirements">exigences de Remote Configuration</a> sont remplies.</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Modale des paramètres d'échantillonnage adaptatif" style="width:70%;">}}

La configuration devrait prendre effet en 5 à 6 minutes, le temps nécessaire pour que Datadog observe le modèle de trafic du service, calcule, puis applique les taux d'échantillonnage. Les ressources configurées à distance s'affichent sous la forme `Configured Remote` dans la colonne {{< ui >}}Configuration{{< /ui >}}.

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant du rôle `Datadog Admin` peuvent modifier les configurations d'échantillonnage adaptatif ou intégrer des services à l'échantillonnage adaptatif.

Si votre organisation utilise des rôles personnalisés, affectez votre utilisateur à un rôle personnalisé qui inclut les `APM Remote Configuration Write` et `APM Service Ingest Write` [autorisations.][4]

### Restreindre l'accès {#restrict-access}
Utilisez les [contrôles d'accès granulaires][19] pour gérer qui peut modifier la configuration d'échantillonnage adaptatif d'un service. Vous pouvez restreindre l'accès en fonction des rôles, des équipes ou des utilisateurs individuels.

{{< img src="/tracing/guide/adaptive_sampling/add_restriction.png" alt="Modale de restriction des autorisations" style="width:60%;">}}

Pour restreindre l'accès :

{{< img src="/tracing/guide/adaptive_sampling/restrict_service_ingestion_permissions.png" alt="Ouvrir la modale de contrôle d'accès granulaire" style="width:100%;">}}

**Remarque** : Seuls les utilisateurs disposant de l'autorisation `remote_config_write` peuvent restreindre l'accès à la configuration d'échantillonnage adaptatif de services individuels.

1. Ouvrez la section {{< ui >}}Permissions{{< /ui >}} dans le panneau latéral Ingestion Control du service.

2. Cliquez sur {{< ui >}}Restrict access{{< /ui >}}.

3. Sélectionnez les équipes, les rôles ou les utilisateurs auxquels accorder l'accès.

4. Cliquez sur {{< ui >}}Add{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /fr/agent/remote_config
[4]: /fr/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.14.2
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /fr/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /fr/tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
[19]: /fr/account_management/rbac/granular_access/
[20]: https://github.com/DataDog/dd-trace-rs/releases/tag/datadog-opentelemetry-v0.4.0