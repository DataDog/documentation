---
title: Tarification de l'APM
kind: documentation
aliases:
  - /fr/account_management/billing/profiler/
  - /fr/account_management/billing/apm_distributed_tracing/
  - /fr/account_management/billing/apm_tracing_profiling/
---
[L'APM et le profileur en continu][1] vous permettent d'identifier les goulots d'étranglement dans vos services, et d'analyser les traces distribuées et les performances du code au sein de votre architecture de microservices.

Deux options de tarification sont disponibles, selon que vous utilisiez ou non l'APM et le profiling. En outre, la fonctionnalité [Tracing Without Limits][2] peut être combinée avec l'APM pour filtrer les données de votre application et les spans indexées grâce à des [filtres de rétention personnalisés basés sur des tags][3].

| Paramètre de facturation  | Prix                                      | Spans ingérées et spans indexées                                                                 | Facturation                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host d'APM][4]      | 31 $ par [host d'APM][4] sous-jacent par mois | 1 million de spans indexées et 150 Go de spans ingérées inclus par mois avec chaque host d'APM.   | Le nombre de [hosts d'APM][5] que vous surveillez en même temps dans le service APM de Datadog est mesuré toutes les heures. Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée. [En savoir plus.][5] |
| [APM et profileur en continu][4] | 40 $ par [host d'APM][4] sous-jacent ; comprend le [profileur en continu][6] avec 4 conteneurs profilés par mois. | Comme les hosts d'APM | Le nombre de hosts uniques que vous surveillez en même temps via le service Profileur en continu de Datadog est mesuré toutes les heures. Les mesures horaires et la facturation sont effectuées de la même façon que pour les hosts d'APM.  |
| [Fargate][4]       | 2 $ par tâche et par mois           | 65 000 spans indexées et 10 Go de spans ingérées inclus dans le prix                                        | Le nombre d'instances de tâches que vous surveillez dans le service APM de Datadog est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées. [En savoir plus.][4]              |
| [Span indexée][5] | 1,70 $ par million de spans indexées par mois | Prix facturé lorsque le nombre de spans indexées dépasse le quota autorisé pour chaque host d'APM | Une span indexée est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans indexées via des filtres de rétention ou d'anciennes spans analysées envoyées au service APM de Datadog à la fin du mois. [En savoir plus.][5]                                                                                          |
| [Span ingérée][5] | 0,10 $ par Go de spans ingérées par mois | Prix facturé lorsque le volume de spans ingérées dépasse le quota autorisé pour chaque host d'APM | Une span ingérée est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de gigaoctets de spans ingérées par Datadog à la fin du mois. [En savoir plus.][5]                                                                                          |

**Remarque** : si vous utilisez un environnement basé sur des conteneurs, la facturation se base sur le host sous_jacent qui déploie l'Agent Datadog.

**Remarque :** un conteneur profilé est un conteneur qui exécute le service Profileur en continu. Les conteneurs non profilés ne sont pas inclus. Par exemple, si un conteneur de service DNS qui n'est pas profilé s'exécute en même temps qu'un conteneur d'application profilé, le premier conteneur ne sera pas comptabilisé dans le quota des quatre conteneurs profilés.

Pour en savoir plus, consultez la [page des tarifs][7].

## Scénarios de déploiement

**Les exemples reflètent les tarifs appliqués avec une facturation annuelle et pour une durée de rétention par défaut de 15 jours pour les spans indexées. Contactez votre [représentant commercial][8] ou votre [chargé de compte][9] pour discuter d'éventuels tarifs préférentiels.**

### Hosts d'APM, spans indexées et spans ingérées supplémentaires sans profileur

Utilisation de 5 hosts et envoi de 30 millions de spans indexées avec un total de 900 Go de spans ingérées sans profileur

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts d'APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $       | 155 $                  |
| Indexed Spans | 30 millions | 5 millions incluses avec 5 hosts d'APM. 1,70 $ par million pour 25 millions de spans indexées supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Spans ingérées | 900 Go          | 750 Go inclus avec 5 hosts d'APM. 0,10 $ par Go pour les 150 Go de spans ingérées supplémentaires.                                                                                 | 150 * 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 155 $ + 42,50 $ + 15 $ | **212,50 $ par mois** |

### APM et profileur avec six conteneurs profilés par host

APM et profileur en continu pour cinq hosts avec six applications exécutées dans des conteneurs distincts pour chaque host

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM et profileur en continu       | 5          | 40 $ par host                                                                                    | 5 * 40 $       | 200 $                  |
| Conteneurs profilés  | 6 par host | 2 $ par conteneur supplémentaire par host. Ici, il y a 6 - 4 = 2 conteneurs supplémentaires pour chaque host.        | 2  * 2 $ * 5 hosts         | 20 $                   |
| Total          |            |                                                                                                 | 200 $ + 20 $      | **220 $ par mois**    |

### Hosts d'APM, Fargate et spans indexées sans profileur

Utilisation de 5 hosts, envoi de 20 millions de spans indexées et déploiement de l'APM sur 20 tâches Fargate en moyenne au cours du mois.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule             | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Hosts d'APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $             | 155 $                  |
| Fargate Tasks  | 20         | 2 $ par tâche                                                                                     | 20 * 2 $             | 40 $                   |
| Indexed Spans | 20 millions | 5 millions de spans indexées incluses avec les 5 hosts d'APM. 1,3 million de spans indexées incluses avec les 20 tâches Fargate. 1,70 $ par million pour les 13,7 millions de spans indexées supplémentaires. | 13,7 * 1,70 $          | 23,29 $                |
| Total          |            |                                                                                                 | 155 $ + 40 $ + 23,29 $ | **218,29 $ par mois** |

### APM et profileur en continu, services, conteneurs et spans indexées

APM et profileur en continu pour le service 1 exécuté sur le conteneur 1 et le service 2 exécuté sur le conteneur 2. Les deux conteneurs sont exécutés sur un host et envoient 20 millions de spans indexées sur App Analytics.

| Unité de facturation  | Quantité   | Prix                                                                                          | Formule      | Sous-total             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| APM et profileur en continu      | 1          | 40 $ par host                                                                                   | 1 * 40 $      | 40 $                  |
| Conteneurs profilés  | 2 | 0 $, car les conteneurs profilés sont compris dans le quota de 4 conteneurs par host d'APM.
| Indexed Spans | 20 millions | 1 million incluses avec 1 host d'APM ; 1,70 $ par million pour 19 millions de spans indexées supplémentaires | 19 * 1,70 $   | 32,30 $               |
| Total          |            |                                                                                                | 40 $ + 32,30 $ | **72,30 $ par mois** |

### Hosts d'APM avec mise à l'échelle dynamique, conteneurs, Fargate et aucune span indexée sans profileur

Application 1 est exécutée sur 20 à 40 conteneurs déployés sur 4 à 8 instances de host ; application 2 est exécutée sur 10 à 30 tâches Fargate. On suppose que le 99e centile d'utilisation des instances EC2 est de 7, et que le nombre moyen de tâches Fargate au cours du mois est de 28.

| Unité de facturation | Quantité | Prix        | Formule    | Sous-total           |
|---------------|----------|--------------|------------|--------------------|
| Hosts d'APM     | 7        | 31 $ par host | 7 * 31 $    | 217 $               |
| Fargate Tasks | 28       | 2 $ par tâche  | 28 * 2 $    | 56 $                |
| Total         |          |              | 217 $ + 56 $ | **273 $ par mois** |

Remarque : le nombre de conteneurs n'est pas pris en compte si l'Agent est déployé sur les instances EC2.

### APM et profileur en continu avec des nœuds Kubernetes et des spans indexées

APM et profileur en continu pour les applications qui exécutent l'Agent Datadog sur 20 nœuds worker dans Kubernetes et qui envoient 20 millions de spans indexées. 10 de ces nœuds worker possèdent chacun 8 pods, avec 1 conteneur par pod, tandis que les 10 autres possèdent chacun 2 pods, avec 1 conteneur par pod.

| Unité de facturation     | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| APM et profileur en continu (nœuds) | 20         | 40 $ par host                                                                | 20 * 40 $ | 800 $               |
| Conteneurs profilés  | 100 après agrégation | 2 $ par conteneur supplémentaire. Ici, 20 hosts permettent d'utiliser jusqu'à 80 conteneurs, mais 20 conteneurs sont répartis sur deux hosts : 100-80 = 20 conteneurs supplémentaires.        | 2 $ * 20 hosts        | 40 $                    |
| Indexed Spans    | 20 millions | 20 millions incluses avec 20 hosts d'APM (nœuds). Aucune span indexée supplémentaire | 0 * 1,70 $ | 0                  |
| Total             |            |                                                                             | 800 $ + 40 $ | **840 $ par mois** |

Pour Kubernetes, l'APM et le profileur en continu sont facturés par nœud, et non par pod.

### Fonctions Lambda et spans indexées

Application sans serveur basée sur AWS Lambda qui est appelée 10 millions de fois en un mois, et qui envoie 10 millions de spans indexées

| Unité de facturation                  | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Appels de fonction Lambda    | 10 millions | [5 $ par mois][10]                                                           | 10 * 5 $  | 50 $               |
| Indexed Spans                  | 10 millions | 150 000 spans indexées incluses pour chaque tranche d'un million d'appels Lambda. 1,70 $ par million de spans indexées supplémentaires. | 8,5 * 1,70 $ | 14,45 $               |
| Total                          |            |                                                                             | 50 $ + 14,45 $ | **64,45 $ par mois** |

## FAQ

**1. Comment un « host d'APM » est-il défini pour la facturation ?**

Un [host][4] est une instance de système d'exploitation physique ou virtuelle. Le nombre de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog est mesuré toutes les heures. Le nombre de hosts sur lesquels l'[APM est installé][11] et qui envoient des traces est calculé toutes les heures. À la fin du mois, vous êtes facturé en fonction du 99e  centile d'utilisation des [hosts d'APM][5].

**2. Comment le tarif facturé est-il calculé en cas de déploiement d'un Agent par conteneur ?**

Nous vous conseillons d'[exécuter][12] un Agent par host sous-jacent en cas de déploiement sur des conteneurs. Si vous souhaitez malgré tout exécuter un Agent par conteneur, chaque conteneur est considéré comme un host distinct. Le tarif est déterminé à l'aide du calcul suivant : (prix par host d'APM) * (nombre de conteneurs).

**1. Comment une « tâche Fargate d'APM » est-elle définie pour la facturation ?**

Une tâche Fargate est un ensemble de conteneurs programmés pour s'exécuter sur AWS Fargate en tant que moteur de calcul sans serveur. Le nombre de tâches que vous surveillez simultanément dans Datadog est mesuré toutes les cinq minutes. La facturation de l'APM est basée sur le nombre moyen de tâches Fargate qui envoient des traces à Datadog par heure pour un mois donné pour votre compte.

**4. Comment la facture est-elle calculée en cas redimensionnement soudain de mon environnement ?**

Le tarif facturé pour l'APM est calculé en fonction du 99e centile du nombre d'Agents actifs qui envoient des traces toutes les heures de chaque mois. À la fin du mois, le centile le plus élevé n'est pas pris en compte pour éviter d'être facturé en cas de pic inattendu.

**5. Les conteneurs pause Kubernetes sont-ils facturés ?**

Kubernetes crée des conteneurs pause pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoignent ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent 5.8+). Lorsque vous utilisez Kubernetes, l'APM est facturé par nœud et non par pod.

**6. Le nombre de hosts facturés tient-il compte de mes services ?**

L'APM est facturé en fonction du nombre de [hosts][4] déployés avec un Agent qui envoie des traces, et non en fonction du nombre de services. La fonctionnalité Tracing Without Limits est facturée en fonction du nombre de [spans indexées et ingérées][13]. Pour estimer le nombre de spans indexées et ingérées que chaque service envoie, consultez la documentation sur les [métriques d'utilisation][14].

**7. Qu'en est-il de mes filtres App Analytics existants ?**

À compter du 20 octobre 2020, tous les filtres App Analytics existants sont automatiquement convertis en filtres de rétention. Vous pouvez continuer d'utiliser les filtres tel quel ou les modifier selon vos besoins. Les filtres qui sont concernés par cette transition sont marqués d'un *i* pour indiquer qu'ils sont issus d'App Analytics sur la page des [filtres de rétention][3].

**8. Comment estimer mon volume de spans ingérées ou indexées ?**

Datadog fournit les métriques `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` pour surveiller le volume de spans ingérées et indexées. Consultez la documentation relative aux [métriques d'utilisation][14] pour en savoir plus.

**9. Le profileur en continu est-il disponible en tant que produit autonome ?**

Oui. Si vous souhaitez acheter le profileur en continu sans l'APM, faites-le-nous savoir. Contactez notre [service commercial][8] ou votre [chargé de compte][9].


## Pour aller plus loin

{{< whatsnext>}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Consulter les données d'utilisation de l'APM et configurer des alertes{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimer et contrôler l'utilisation de l'APM{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/tracing/
[2]: /fr/tracing/trace_search_and_analytics/
[3]: /fr/tracing/trace_retention_and_ingestion/#retention-filters
[4]: /fr/account_management/billing/pricing/#infrastructure-monitoring
[5]: /fr/account_management/billing/pricing/#apm
[6]: /fr/tracing/profiling/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: https://docs.datadoghq.com/fr/account_management/billing/serverless/#serverless-functions
[11]: /fr/account_management/billing/
[12]: /fr/tracing/setup_overview/setup/java/?tab=containers#configure-the-datadog-agent-for-apm
[13]: /fr/tracing/trace_retention_and_ingestion/
[14]: /fr/tracing/trace_retention_and_ingestion/usage_metrics