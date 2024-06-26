---
aliases:
- /fr/account_management/billing/profiler/
- /fr/account_management/billing/apm_distributed_tracing/
- /fr/account_management/billing/apm_tracing_profiling/
title: Tarification d'APM
---

Il existe trois offres vous permettant de bénéficier de la solution APM : APM, APM Pro et APM Enterprise. Grâce à ses fonctionnalités de tracing distribué, à sa mise en corrélation fluide des traces, logs et autres données de télémétrie, ainsi qu'à ses dashboards de performance prêts à l'emploi pour vos services, APM vous permet d'analyser en détail vos applications. Le profileur continu fourni par l'offre APM Pro vous permet d'identifier les méthodes les plus lentes et les plus gourmandes en ressources, et de les agréger au niveau de vos services et endpoints, ou de les visualiser pour chaque trace distribuée. Enfin, la fonctionnalité Data Streams Monitoring (DSM) proposée dans le cadre des offres APM Pro et APM Enterprise vous aide à surveiller les performances de bout en bout de vos principaux pipelines de diffusion de données et de vos applications axées sur des événements qui reposent sur Kafka et RabbitMQ.


| Paramètre de facturation  | Prix                                      | Spans ingérées et spans indexées                                                                 | Facturation                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host APM][5]      | 31 $ par [host APM][5] sous-jacent par mois | 1 million de spans indexées et 150 Go de spans ingérées inclus par mois avec chaque host APM.   | Le nombre de [hosts APM][5] que vous surveillez en même temps dans le service APM Datadog est mesuré toutes les heures. La facturation est basée sur la valeur la plus haute. Ainsi, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le système diffère légèrement pour le mois de février : la facturation est basée sur la huitième valeur la plus élevée. [En savoir plus sur la tarification d'APM][5]. |
| APM Pro (host APM avec Data Streams Monitoring) | 35 $ par [host APM][5] sous-jacent. La fonctionnalité Data Streams Monitoring est incluse. | Comme les hosts APM | Le nombre de hosts APM uniques dans le service APM Datadog ainsi que le nombre de hosts DSM uniques que vous surveillez en même temps sont mesurés toutes les heures. Pour APM Pro, les mesures horaires et la facturation sont gérées de la même manière que pour les hosts APM.  |
| APM Enterprise (host APM avec Data Streams Monitoring et le [profileur continu][6]) | 40 $ par [host APM][5] sous-jacent. La fonctionnalité Data Streams Monitoring et le [profileur continu][6] (quatre conteneurs profilés par host et par mois) sont inclus. | Comme les hosts APM | Le nombre de hosts APM uniques dans le service APM, le nombre de hosts DSM uniques, ainsi que le nombre de hosts du profileur continu uniques que vous surveillez en même temps sont mesurés toutes les heures. Pour APM Enterprise, les mesures horaires et la facturation sont gérées de la même manière que pour les hosts APM. |
| [Fargate][4]       | APM : 2 $ par tâche simultanée et par mois <br> APM Pro : 2,30 $ par tâche simultanée et par mois <br> APM Enterprise : 2,60 $ par tâche simultanée et par mois              | 65 000 spans indexées et 10 Go de spans ingérées inclus dans le prix              | Le nombre d'instances de tâches que vous surveillez dans le service APM Datadog est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre moyen d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées. [En savoir plus sur la tarification Fargate][4]              |
| [Span indexée][5] | 1,70 $ par million de spans indexées par mois | Prix facturé lorsque le nombre de spans indexées dépasse le quota autorisé pour chaque host APM | Une span indexée est une requête individuelle effectuée auprès d'un service de votre stack. Le prix facturé par Datadog est calculé en fonction du nombre total de spans indexées via des filtres de rétention ou d'anciennes spans analysées envoyées au service APM Datadog à la fin du mois. [En savoir plus sur la tarification APM][5]                                                                                          |
| [Span ingérée][5] | 0,10 $ par Go de spans ingérées par mois | Prix facturé lorsque le volume de spans ingérées dépasse le quota autorisé pour chaque host APM | Une span ingérée est une requête individuelle effectuée auprès d'un service de votre stack. Le prix facturé par Datadog est calculé en fonction du nombre total de gigaoctets de spans ingérées par Datadog à la fin du mois. [En savoir plus la tarification APM][5]                                                                                          |

**Remarques** :
   - Si vous utilisez un environnement basé sur des conteneurs en dehors de Fargate, la facturation se base sur le host sous-jacent qui déploie l'Agent Datadog.
   - Un conteneur profilé est un conteneur qui exécute le service Profileur en continu. Les conteneurs non profilés ne sont pas inclus. Par exemple, si un conteneur de service DNS qui n'est pas profilé s'exécute en même temps qu'un conteneur d'application profilé, le premier conteneur n'est pas comptabilisé dans le quota des quatre conteneurs profilés.
   - Le service [Universal Service Monitoring][15] est inclus dans toutes les formules APM (APM, APM Pro et APM Enterprise) sans frais supplémentaire.

Pour en savoir plus, consultez la [page des tarifs][7].

## Database Monitoring

| Paramètre de facturation  | Requêtes normalisées                | Facturation                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| Host de base de données      | 200 requêtes normalisées sont incluses par mois pour chaque host de base de données. | Le nombre de host de base de données que vous surveillez en même temps avec Database Monitoring est mesuré toutes les heures. La facturation est basée sur la valeur la plus haute. Ainsi, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la neuvième mesure la plus élevée. Le système diffère légèrement pour le mois de février : la facturation est basée sur la huitième valeur la plus élevée. |
| Requêtes normalisées | Ces requêtes sont facturées lorsque le seuil configuré dépasse le quota de requêtes normalisées inclus pour chaque host de base de données. | Une _requête normalisée_ représente un agrégat de requêtes possédant une structure similaire et dont les seules différences résident dans les paramètres de requête. Le prix facturé par Datadog est calculé en fonction du nombre total de requêtes normalisées configurées qui sont surveillées à un moment donné. |

Pour en savoir plus, consultez la [page des tarifs][7].

## Scénarios de déploiement

**Les exemples reflètent les tarifs appliqués avec une facturation annuelle et pour une durée de rétention par défaut de 15 jours pour les spans indexées. Contactez votre [représentant commercial][8] ou votre [chargé de compte][9] pour discuter d'éventuels tarifs préférentiels.**

### Hosts APM, spans indexées et spans ingérées supplémentaires

Utilisation de 5 hosts APM et envoi de 30 millions de spans indexées, avec un total de 900 Go de spans ingérées

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $       | 155 $                  |
| Spans indexées | 30 millions | 5 millions incluses avec 5 hosts APM. 1,70 $ par million pour 25 millions de spans indexées supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Ingested Spans | 900 Go          | 750 Go inclus avec 5 hosts APM. 0,10 $ par Go pour les 150 Go de spans ingérées supplémentaires.                                                                                 | 150 * 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 155 $ + 42,50 $ + 15 $ | **212,50 $ par mois** |

### Hosts APM Pro, spans indexées et spans ingérées supplémentaires

Utilisation de 5 hosts APM Pro et envoi de 30 millions de spans indexées, avec un total de 900 Go de spans ingérées

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM Pro      | 5          | 35 $ par host                                                                                    | 5 * 35 $       | 175 $                  |
| Spans indexées | 30 millions | 5 millions incluses avec 5 hosts APM. 1,70 $ par million pour 25 millions de spans indexées supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Spans ingestées | 900 Go          | 750 Go inclus avec 5 hosts APM. 0,10 $ par Go pour les 150 Go de spans ingérées supplémentaires.                                                                                 | 150 * 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 175 $ + 42,50 $ + 15 $ | ** 232,50 $ par mois** |

### Hosts APM Enterprise avec six conteneurs profilés par host

Utilisation de 5 hosts APM Enterprise avec 6 applications exécutées dans des conteneurs distincts pour chaque host

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM Enterprise       | 5          | 40 $ par host                                                                                    | 5 * 40 $       | 200 $                  |
| Conteneurs profilés  | 6 par host | 2 $ par conteneur supplémentaire par host. Ici, il y a 6 - 4 = 2 conteneurs supplémentaires pour chaque host.        | 2 * 2 $ * 5 hosts         | 20 $                   |
| Total          |            |                                                                                                 | 200 $ + 20 $      | **220 $ par mois**    |

### Hosts APM, Fargate et spans indexées

Utilisation de 5 hosts APM, envoi de 20 millions de spans indexées et déploiement d'APM sur 20 tâches Fargate en moyenne au cours du mois

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule             | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Hosts d'APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $             | 155 $                  |
| Tâches Fargate  | 20         | 2 $ par tâche                                                                                     | 20 * 2 $             | 40 $                   |
| Spans indexées | 20 millions | 5 millions de spans indexées incluses avec les 5 hosts d'APM. 1,3 million de spans indexées incluses avec les 20 tâches Fargate. 1,70 $ par million pour les 13,7 millions de spans indexées supplémentaires. | 13,7 * 1,70 $          | 23,29 $                |
| Total          |            |                                                                                                 | 155 $ + 40 $ + 23,29 $ | **218,29 $ par mois** |

### Hosts APM Enterprise, services, conteneurs et spans indexées

APM Enterprise pour le service 1 exécuté sur le conteneur 1 et le service 2 exécuté sur le conteneur 2. Les deux conteneurs sont exécutés sur un host et envoient 20 millions de spans indexées sur App Analytics.

| Unité de facturation  | Quantité   | Prix                                                                                          | Formule      | Sous-total             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| Hosts APM Enterprise      | 1          | 40 $ par host                                                                                   | 1 * 40 $      | 40 $                  |
| Conteneurs profilés  | 2 | 0 $, car les conteneurs profilés sont compris dans le quota de 4 conteneurs par host APM.
| Spans indexées | 20 millions | 1 million incluses avec 1 host APM ; 1,70 $ par million pour 19 millions de spans indexées supplémentaires | 19 * 1,70 $   | 32,30 $               |
| Total          |            |                                                                                                | 40 $ + 32,30 $ | **72,30 $ par mois** |

### Hosts APM avec mise à l'échelle dynamique, conteneurs, Fargate et aucune span indexée

Application 1 est exécutée sur 20 à 40 conteneurs déployés sur 4 à 8 instances de host ; application 2 est exécutée sur 10 à 30 tâches Fargate. On suppose que le 99e centile d'utilisation des instances EC2 est de 7, et que le nombre moyen de tâches Fargate au cours du mois est de 28.

| Unité de facturation | Quantité | Prix        | Formule    | Sous-total           |
|---------------|----------|--------------|------------|--------------------|
| Hosts APM     | 7        | 31 $ par host | 7 * 31 $    | 217 $               |
| Fargate Tasks | 28       | 2 $ par tâche  | 28 * 2 $    | 56 $                |
| Total         |          |              | 217 $ + 56 $ | **273 $ par mois** |

**Remarque** : le nombre de conteneurs n'est pas pris en compte si l'Agent est déployé sur les instances EC2.

### Hosts APM Enterprise avec des nœuds Kubernetes et des spans indexées

APM Enterprise pour les applications qui exécutent l'Agent Datadog sur 20 nœuds worker dans Kubernetes et qui envoient 20 millions de spans indexées. 10 de ces nœuds worker possèdent chacun 8 pods, avec 1 conteneur par pod, tandis que les 10 autres possèdent chacun 2 pods, avec 1 conteneur par pod.

| Unité de facturation     | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Hosts APM Enterprise (nœuds) | 20         | 40 $ par host                                                                | 20 * 40 $ | 800 $               |
| Conteneurs profilés  | 100 après agrégation | 2 $ par conteneur supplémentaire. Ici, 20 hosts permettent d'utiliser jusqu'à 80 conteneurs, mais 20 conteneurs sont répartis sur deux hosts : 100-80 = 20 conteneurs supplémentaires.        | 2 $ * 20 hosts        | 40 $                    |
| Spans indexées    | 20 millions | 20 millions incluses avec 20 hosts d'APM (nœuds). Aucune span indexée supplémentaire | 0 * 1,70 $ | 0                  |
| Total             |            |                                                                             | 800 $ + 40 $ | **840 $ par mois** |

Pour Kubernetes, APM et le profileur en continu sont facturés par nœud, et non par pod.

### Fonctions Lambda et spans indexées

Application sans serveur basée sur AWS Lambda qui est appelée 10 millions de fois en un mois, et qui envoie 10 millions de spans indexées

| Unité de facturation                  | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Appels de fonction Lambda    | 10 millions | [5 $ par mois][10]                                                           | 10 * 5 $  | 50 $               |
| Spans indexées                  | 10 millions | 150 000 spans indexées incluses pour chaque tranche d'un million d'appels Lambda. 1,70 $ par million de spans indexées supplémentaires. | 8,5 * 1,70 $ | 14,45 $               |
| Total                          |            |                                                                             | 50 $ + 14,45 $ | **64,45 $ par mois** |

## FAQ

**1. Comment un « host APM » est-il défini pour la facturation ?**

Un [host][4] est une instance de système d'exploitation physique ou virtuelle. Le nombre de hosts que vous surveillez simultanément dans le service Infrastructure de Datadog est mesuré toutes les heures. Le nombre de hosts sur lesquels la solution [APM est installée][12] et qui envoient des traces est calculé toutes les heures. À la fin du mois, vous êtes facturé en fonction du 99e  centile d'utilisation des [hosts APM][5].

**2. Comment le montant de la facture est-il calculé en cas de déploiement d'un Agent par conteneur ?**

Il est conseillé de configurer un Agent par host sous-jacent en cas de déploiement sur des conteneurs. Si vous souhaitez malgré tout exécuter un Agent par conteneur, chaque conteneur est considéré comme un host distinct. Ainsi, le prix est calculé selon la formule suivante : (prix par host APM) * (nombre de conteneurs).

**1. Comment une « tâche Fargate d'APM » est-elle définie pour la facturation ?**

Une tâche Fargate est un ensemble de conteneurs programmés pour s'exécuter sur AWS Fargate en tant que moteur de calcul sans serveur. Le nombre de tâches que vous surveillez simultanément dans Datadog est mesuré toutes les cinq minutes. La facturation d'APM est basée sur le nombre moyen de tâches Fargate qui envoient des traces à Datadog par heure pour un mois donné pour votre compte.

**4. Comment votre facture est-elle calculée en cas de redimensionnement de votre environnement ?**

Le tarif facturé pour APM est calculé en fonction du 99e centile du nombre d'Agents actifs qui envoient des traces toutes les heures de chaque mois. À la fin du mois, le centile le plus élevé n'est pas pris en compte par Datadog pour vous éviter d'être facturé en cas de pic inattendu.

**5. Les conteneurs pause Kubernetes sont-ils facturés ?**

Kubernetes crée des conteneurs pause pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoignent ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent 5.8+). Lorsque vous utilisez Kubernetes, APM est facturé par nœud et non par pod.

**6. Le nombre de hosts facturés tient-il compte de vos services ?**

Le coût d'APM varie en fonction du nombre de [hosts][5] déployés avec des Agents qui envoient des traces, et non en fonction du nombre de services. De plus, pour l'allocation mensuelle par host, le coût d'APM est basé sur le volume de spans ingérées et le nombre de spans indexées. Pour estimer le volume de spans ingérées et indexées qui sont envoyées par chacun de vos services, consultez la documentation relative à l'[ingestion][2] et à la [rétention][13].

**7. Qu'en est-il de vos filtres App Analytics existants ?**

À compter du 20 octobre 2020, tous les filtres App Analytics existants sont automatiquement convertis en filtres de rétention. Vous pouvez continuer d'utiliser les filtres tels quels ou les modifier selon vos besoins. Les filtres qui sont concernés par cette transition sont marqués d'un *i* pour indiquer qu'ils sont issus d'App Analytics sur la page des [filtres de rétention][3].

**8. Comment estimer votre volume de spans ingérées ou indexées ?**

Datadog fournit les métriques `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` pour surveiller le volume de spans ingérées et indexées. Consultez la documentation relative aux [métriques d'utilisation][14] pour en savoir plus.

**9. Le profileur en continu est-il disponible en tant que produit autonome ?**

Oui. Si vous souhaitez acheter le profileur en continu sans APM, faites-le-nous savoir. Contactez notre [service commercial][8] ou votre [chargé de compte][9].

**10. La fonctionnalité Data Streams Monitoring est-elle disponible en tant que solution autonome ?**

Oui. Si vous souhaitez acheter Data Streams Monitoring sans APM, faites-le-nous savoir. Contactez notre [service commercial][8] ou votre [chargé de compte][9].


## Pour aller plus loin

{{< whatsnext>}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Consulter les données d'utilisation d'APM et configurer des alertes{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimer et contrôler l'utilisation d'APM{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/tracing/
[2]: /fr/tracing/trace_pipeline/ingestion_controls
[3]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /fr/account_management/billing/pricing/#infrastructure-monitoring
[5]: /fr/account_management/billing/pricing/#apm
[6]: /fr/profiler/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /fr/account_management/billing/serverless/#serverless-functions
[11]: /fr/account_management/billing/
[12]: /fr/tracing/trace_collection/dd_libraries/
[13]: /fr/tracing/trace_pipeline/trace_retention/
[14]: /fr/tracing/trace_pipeline/metrics
[15]: /fr/universal_service_monitoring/