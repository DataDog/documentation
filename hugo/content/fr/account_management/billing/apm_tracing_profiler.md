---
aliases:
- /fr/account_management/billing/profiler/
- /fr/account_management/billing/apm_distributed_tracing/
- /fr/account_management/billing/apm_tracing_profiling/
title: Tarification d'APM
---
APM est disponible via trois niveaux : APM, APM Pro et APM Enterprise. APM vous offre une visibilité approfondie sur vos applications, grâce à des capacités de traçage distribué, une corrélation transparente entre traces, logs et autres télémétrie, ainsi que des dashboards de performance prêts à l'emploi pour votre service. Avec Continuous Profiler dans APM Enterprise, vous pouvez identifier les méthodes les plus lentes et les plus gourmandes en ressources, de manière agrégée au niveau du service et de l'endpoint, ainsi que pour chaque trace distribuée. Avec Data Streams Monitoring (DSM) dans APM Pro et APM Enterprise, vous pouvez facilement suivre la performance de bout en bout de vos pipelines de streaming de données et de vos applications pilotées par événements qui utilisent Kafka, SQS et RabbitMQ.


| Paramètre de facturation  | Prix                                      | Spans ingérés et indexés                                                                 | Facturation                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host APM][5]      | 31 $ par [host APM][5] sous-jacent par mois | 1 million de spans indexés et 150 Go de spans ingérés inclus par mois avec chaque host APM.   | Datadog enregistre le nombre de [hosts APM][5] que vous surveillez simultanément dans le service Datadog APM une fois par heure. Avec une formule basée sur la limite supérieure (HWMP ou high watermark plan), ces mesures horaires sont classées de la plus élevée à la plus basse à la fin du mois, et Datadog facture sur la base de la neuvième mesure la plus élevée. Le mois de février fait exception et Datadog facture sur la base de la huitième mesure la plus élevée. [Plus d'informations sur la tarification APM.][5] |
| APM Pro (host APM avec Data Streams Monitoring) | 35 $ par [host APM][5] sous-jacent. Inclut Data Streams Monitoring. | Comme les hosts APM | Datadog enregistre le nombre de hosts APM uniques dans le service Datadog APM et de hosts DSM uniques que vous surveillez simultanément une fois par heure. Les mesures horaires et la facturation pour APM Pro sont effectuées de la même manière que pour les hosts APM.  |
| APM Enterprise (host APM avec Data Streams Monitoring et [Continuous Profiler])[6] | 40 $ par [host APM][5] sous-jacent. Inclut Data Streams Monitoring et [Continuous Profiler][6] avec quatre conteneurs profilés par host et par mois. | Comme les hosts APM | Datadog enregistre le nombre de hosts APM uniques dans le service APM, de hosts DSM uniques et de hosts Continuous Profiler uniques que vous surveillez simultanément une fois par heure. Les mesures horaires et la facturation pour APM Enterprise sont effectuées de la même manière que pour les hosts APM. |
| [Fargate][4]       | 6 $ par tâche simultanée par mois              | 195 000 spans indexés et 30 Go de spans ingérés inclus dans la tarification.              | Datadog enregistre le nombre d'instances de tâche que vous surveillez dans le service Datadog APM à des intervalles de cinq minutes. Datadog agrège les mesures basées sur des intervalles à la fin du mois et vous facture en fonction du nombre moyen d'heures pendant lesquelles vos applications ont été exécutées et surveillées. [Plus d'informations sur la tarification Fargate.][16]              |
| [Span indexé][5] | 1,70 $ par million de spans indexés par mois | Facturé lorsque l'utilisation dépasse les spans indexés inclus avec chaque host APM | Un span indexé est une requête individuelle adressée à un service individuel dans votre pile. Datadog facture en fonction du nombre total de spans indexés avec des filtres de rétention ou des anciens spans analysés dans le service Datadog APM à la fin du mois. [Plus d'informations sur la tarification APM.][5]                                                                                          |
| [Span ingéré][5] | 0,10 $ par Go de spans ingérés par mois | Facturé lorsque l'utilisation dépasse les spans ingérés inclus avec chaque host APM | Un span ingéré est une requête individuelle adressée à un service individuel dans votre pile. Datadog facture en fonction du nombre total de gigaoctets de spans ingérés dans Datadog à la fin du mois. [Plus d'informations sur la tarification APM.][5]                                                                                          |

**Remarques** :  
   - Si vous utilisez un environnement basé sur des conteneurs non-Fargate, vous êtes facturé pour le host sous-jacent déployant le Datadog Agent.
   - Un conteneur profilé est un conteneur qui exécute le service Continuous Profiler. Cela n'inclut pas les conteneurs qui ne sont pas profilés. Par exemple, un conteneur de service DNS qui N'EST PAS profilé, s'exécutant simultanément avec votre conteneur d'application qui EST profilé, n'est pas comptabilisé dans le quota de quatre conteneurs de profilage.
   - [Universal Service Monitoring][15] est inclus dans tous les niveaux APM (APM, APM Pro, APM Enterprise) sans coût supplémentaire.

Pour en savoir plus, consultez la [page des Tarifs][7].

## Database Monitoring {#database-monitoring}

| Paramètre de facturation  | Requêtes normalisées                | Facturation                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| Database host      | 200 requêtes normalisées sont incluses par mois avec chaque host de base de données. | Datadog enregistre le nombre de hosts de base de données que vous surveillez simultanément avec Database Monitoring une fois par heure. Avec une formule basée sur la limite supérieure (HWMP ou high watermark plan), ces mesures horaires sont classées de la plus élevée à la plus basse à la fin du mois, et Datadog facture sur la base de la neuvième mesure la plus élevée. Le mois de février fait exception et Datadog facture sur la base de la huitième mesure la plus élevée. |
| Requêtes normalisées | Facturé lorsque le seuil configuré dépasse les requêtes normalisées incluses avec chaque host de base de données. | Une _requête normalisée_ représente un agrégat de requêtes ayant une structure similaire, ne différant que par les paramètres de requête. Datadog facture en fonction du nombre total de requêtes normalisées configurées suivies à un moment donné. |

Pour en savoir plus, consultez la [page des Tarifs][7].

## Scénarios de déploiement {#deployment-scenarios}

**Des exemples de cas illustrent les tarifs de facturation annuels avec une rétention par défaut de 15 jours pour les spans indexés. Contactez [Sales][8] ou votre responsable [Customer Success][9] pour discuter des remises sur volume pour votre compte.**

### Hosts APM, spans indexés et spans ingérés supplémentaires {#apm-hosts-indexed-spans-and-extra-ingested-spans}

Utilisation de 5 hosts APM et envoi de 30 millions de spans indexées, avec un total de 900 Go de spans ingérées

| Unité facturable  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM      | 5          | 31 $ par host                                                                                    | 5 × 31 $       | 155 $                  |
| Spans indexés | 30 millions | 5 millions inclus avec 5 hosts APM. 1,70 $ par million pour 25 millions de spans indexés supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Spans ingérés | 900 Go          | 750 Go inclus avec 5 hosts APM. 0,10 $ par Go pour 150 Go de spans ingérés supplémentaires.                                                                                 | 150 × 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 155 $ + 42,50 $ + 15 $ | **212,50 $ par mois** |

### Hosts APM Pro, spans indexés et spans ingérés supplémentaires {#apm-pro-hosts-indexed-spans-and-extra-ingested-spans}

Utilisation de 5 hosts APM Pro et envoi de 30 millions de spans indexées, avec un total de 900 Go de spans ingérées

| Unité facturable  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Pro Hosts      | 5          | $35 per host                                                                                    | 5 × $35       | $175                  |
| Spans indexés | 30 millions | 5 millions inclus avec 5 hosts APM. 1,70 $ par million pour 25 millions de spans indexés supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Spans ingérés | 900 Go          | 750 Go inclus avec 5 hosts APM. 0,10 $ par Go pour 150 Go de spans ingérés supplémentaires.                                                                                 | 150 × 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 175 $ + 42,50 $ + 15 $ | **232,50 $ par mois** |

### Hosts APM Enterprise avec six conteneurs profilés par host {#apm-enterprise-hosts-with-six-profiled-containers-per-host}

Utilisation de 5 hosts APM Enterprise avec 6 applications exécutées dans des conteneurs distincts pour chaque host

| Unité facturable  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts APM Enterprise       | 5          | 40 $ par host                                                                                    | 5 * 40 $       | 200 $                  |
| Conteneurs profilés  | 6 par host | 2 $ par conteneur supplémentaire par host. Dans ce cas, il y a 6 - 4 = 2 conteneurs supplémentaires pour chaque host        | 2 * 2 $ * 5 hosts         | 20 $                   |
| Total          |            |                                                                                                 | 200 $ + 20 $      | **220 $ par mois**    |

### Hosts APM, Fargate et spans indexés {#apm-hosts-fargate-and-indexed-spans}

Utilisation de 5 hosts APM, envoi de 20 millions de spans indexées et déploiement d'APM sur 20 tâches Fargate en moyenne au cours du mois

| Unité facturable  | Quantité   | Prix                                                                                           | Formule             | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Hosts APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $             | 155 $                  |
| Tâches Fargate  | 20         | 6 $ par tâche                                                                                     | 20 * 6 $             | 120 $                   |
| Spans indexés | 20 millions | 5 millions inclus avec 5 hosts APM. 1,3 million inclus avec 20 tâches Fargate. 1,70 $ par million pour 13,7 millions de spans indexés supplémentaires | 13,7 * 1,70 $          | 23,29 $                |
| Total          |            |                                                                                                 | 155 $ + 120 $ + 23,29 $ | **298,29 $ par mois** |

### Hosts APM Enterprise, services, conteneurs et spans indexés {#apm-enterprise-hosts-services-containers-and-indexed-spans}

APM Enterprise pour le service 1 exécuté sur le conteneur 1 et le service 2 exécuté sur le conteneur 2. Les deux conteneurs sont exécutés sur un host et envoient 20 millions de spans indexées sur App Analytics. 

| Unité facturable  | Quantité   | Prix                                                                                          | Formule      | Sous-total             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| Hosts APM Enterprise      | 1          | 40 $ par host                                                                                   | 1 * 40 $      | 40 $                  |
| Conteneurs profilés  | 2 | 0 $ car les conteneurs profilés sont inclus dans l'allocation de 4 par host APM.
| Spans indexés | 20 millions | 1 million inclus avec 1 host APM. 1,70 $ par million pour 19 millions de Spans indexés supplémentaires | 19 * 1,70 $   | 32,30 $               |
| Total          |            |                                                                                                | 40 $ + 32,30 $ | **72,30 $ par mois** |

### Hosts APM avec mise à l'échelle dynamique, conteneurs, Fargate et sans spans indexés {#apm-hosts-with-dynamic-scaling-containers-fargate-and-no-indexed-spans}

App 1 exécutée sur 20-40 conteneurs déployés sur 4-8 instances de host, app 2 exécutée sur 10-30 tâches Fargate. En supposant que le 99e centile d'utilisation des instances EC2 est de 7 et que la moyenne des tâches Fargate sur le mois est de 28.

| Unité facturable | Quantité | Prix        | Formule    | Sous-total           |
|---------------|----------|--------------|------------|--------------------|
| Hosts APM     | 7        | 31 $ par host | 7 * 31 $    | 217 $               |
| Tâches Fargate | 28       | 6 $ par tâche  | 28 * 6 $    | 168 $                |
| Total         |          |              | 217 $ + 168 $ | **385 $ par mois** |

**Remarque** : Le nombre de conteneurs n'a pas d'importance si l'Agent déployé se trouve sur les instances EC2.

### Hosts APM Enterprise avec nœuds Kubernetes et spans indexés {#apm-enterprise-hosts-with-kubernetes-nodes-and-indexed-spans}

APM Enterprise pour des applications avec un Datadog Agent s'exécutant sur 20 nœuds de travail dans Kubernetes envoyant 20 millions de spans indexés. 10 de ces nœuds de travail ont huit pods chacun avec un conteneur par pod, les 10 autres ont deux pods chacun avec un conteneur par pod. 

| Unité facturable     | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Hosts APM Enterprise (nœuds) | 20         | 40 $ par host                                                                | 20 * 40 $ | 800 $               |
| Conteneurs profilés  | 100 au total | 2 $ par conteneur supplémentaire. Dans ce cas, 20 hosts permettraient jusqu'à 80 conteneurs, mais il y a 100 conteneurs au total sur deux hosts : 100 - 80 = 20 conteneurs supplémentaires        | 2 $ * 20 hosts        | 40 $                    |
| Spans indexés    | 20 millions | 20 millions inclus avec 20 hosts APM (nœuds). Aucun span indexé supplémentaire | 0 * 1,70 $ | 0                  |
| Total             |            |                                                                             | 800 $ + 40 $ | **840 $ par mois** |

Pour Kubernetes, APM & Continuous Profiler sont facturés par nœud, et non par pod.

### Fonctions Lambda et spans indexés {#lambda-functions-and-indexed-spans}

Application sans serveur basée sur AWS-Lambda qui est appelée 10 millions de fois en un mois et qui envoie 10 millions de spans indexées.

| Unité facturable                  | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Invocations de fonction Lambda    | 10 millions | [5 $ par mois][10]                                                           | 10 * 5 $  | 50 $               |
| Spans indexés                  | 10 millions | 150 000 spans indexés inclus avec chaque million d'invocations Lambda. 1,70 $ par million de spans indexés supplémentaires | 8,5 * 1,70 $ | 14,45 $               |
| Total                          |            |                                                                             | 50 $ + 14,45 $ | **64,45 $ par mois** |

## Appareils APM Edge {#apm-edge-devices}

APM Edge Devices est une option de facturation pour la surveillance des appareils Edge et IoT avec l'APM, tels que les systèmes de point de vente (POS), les appareils médicaux, les véhicules autonomes et les systèmes industriels. APM Edge Devices est le même produit APM que la facturation APM standard, avec un modèle de facturation conçu pour les flottes d'appareils Edge et IoT. Pour connaître les tarifs, contactez le [service commercial][8] ou votre [Customer Success Manager][9].

APM Edge Devices nécessite le Datadog Agent standard version 7.75.0 ou ultérieure. Le [Datadog IoT Agent][17] ne prend pas en charge l'APM.

Pour identifier un appareil comme un appareil APM Edge, configurez le Datadog Agent pour qu'il s'exécute en mode APM Edge avec l'une des méthodes suivantes :

- Définissez la variable d'environnement `DD_APM_MODE` sur `edge` :

  ```shell
  DD_APM_MODE=edge
  ```

- Ajoutez ce qui suit au fichier de configuration `datadog.yaml` de l'Agent :

  ```yaml
  apm_config:
    mode: edge
  ```

**Remarque** : APM Edge Devices ne prend pas en charge OpenTelemetry. Contactez le [service commercial][8] ou votre [Customer Success Manager][9] si vos appareils Edge ou IoT nécessitent une instrumentation OpenTelemetry.

## FAQ {#faq}

**1. Qu'est-ce qui est classé comme un host APM pour la facturation ?**

Un [host][4] est une instance de système d'exploitation physique ou virtuelle. Datadog enregistre le nombre de hosts que vous surveillez simultanément dans le service Infrastructure de Datadog une fois par heure. Pour la facturation de l'APM, le nombre de hosts avec [APM installé][12] et envoyant des traces est calculé toutes les heures. À la fin du mois, vous êtes facturé en fonction de votre utilisation au 99e percentile pour les [hosts APM][5].

**2. Comment la facturation est-elle calculée lors du déploiement d'un Agent par conteneur ?**

Il est recommandé de configurer _un Agent par host sous-jacent_ pour le déploiement de conteneurs. Si vous choisissez plutôt d'exécuter un Agent par conteneur, alors chaque conteneur est traité comme un host unique. Le prix est alors (Prix par host APM) * (Nombre de conteneurs).

**3. Qu'est-ce qui est classé comme une tâche APM Fargate pour la facturation ?**

Une tâche Fargate est une collection de conteneurs qui sont planifiés pour s'exécuter sur AWS Fargate en tant que moteur de calcul sans serveur. Datadog enregistre le nombre de tâches que vous surveillez simultanément dans Datadog à des intervalles de cinq minutes. Pour la facturation de l'APM, Datadog facture sur la base du nombre moyen de tâches Fargate qui envoient des traces à Datadog par heure sur l'ensemble du mois de votre compte.

**4. Qu'advient-il de votre facture lors du dimensionnement de votre environnement ?**

Votre facture APM est calculée en utilisant le 99e percentile des agents actifs envoyant des traces chaque heure de chaque mois. À la fin du mois, Datadog ignore la valeur du 1 % supérieur, ce qui vous protège contre une facturation liée à des pics inattendus.

**5. Êtes-vous facturé pour les pause containers dans Kubernetes ?**

Kubernetes crée des pause containers pour acquérir l'adresse IP du pod respectif et configurer l'espace de noms réseau pour tous les autres conteneurs qui rejoignent ce pod. Datadog exclut tous les pause containers de votre quota et ne les facture pas (nécessite l'Agent 5.8+). Dans le cas de Kubernetes, l'APM est facturé par nœud et non par pod.

**6. Quel est le lien entre la facturation des hosts et vos services ?**

L'APM est facturé sur la base des [hosts][5] déployés avec des agents envoyant des traces et non des services. De plus, au-delà de l'allocation mensuelle par host, l'APM est facturé sur la base du volume de spans ingérés et du nombre de spans indexés. Pour estimer combien de spans ingérés et indexés chacun de vos services envoie, consultez la documentation sur [l'ingestion][2] et la [rétention][13].

**7. Qu'advient-il de vos filtres App Analytics existants ?**

Au 20 octobre 2020, tous les filtres App Analytics existants sont automatiquement convertis en filtres de rétention. Vous pouvez continuer à laisser les filtres inchangés ou les modifier selon vos besoins. Les filtres convertis sont marqués d'un *i* représentant les Legacy App Analytics Filters sur la page [retention filters][3].

**8. Comment estimez-vous votre volume de spans ingérés et indexés ?**

Datadog fournit les métriques `datadog.estimated_usage.apm.ingested_bytes` et `datadog.estimated_usage.apm.ingested_spans` pour surveiller le volume de spans ingérés et indexés. Plus d'informations sont disponibles dans la documentation sur les [métriques d'utilisation][14].

**9. Le Continuous Profiler est-il disponible en tant que produit autonome ?**

Oui. Faites savoir à Datadog si vous souhaitez acheter le Continuous Profiler sans APM. Contactez le service [Sales][8] ou votre [Customer Success Manager][9].

**10. Data Streams Monitoring est-il disponible en tant que produit autonome ?**

Oui. Faites savoir à Datadog si vous souhaitez acheter Data Streams Monitoring sans APM. Contactez le service [Sales][8] ou votre [Customer Success Manager][9].


## Pour aller plus loin {#further-reading}

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Consulter les données d'utilisation de l'APM et configurer des alertes{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimer et contrôler l'utilisation de l'APM{{< /nextlink >}}
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
[16]: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=aws-fargate#products
[17]: /fr/agent/iot/