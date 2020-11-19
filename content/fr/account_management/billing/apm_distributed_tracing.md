---
title: Tarification de l'APM
kind: documentation
---
[L'APM et le tracing distribué][1] vous permettent d'identifier les goulots d'étranglement dans vos services et d'analyser les traces distribuées au sein de votre architecture de microservices. En outre, la fonctionnalité [Tracing without Limits][2] peut être combinée avec l'APM pour filtrer les données de votre application et les spans indexées grâce à des [filtres de rétention personnalisés basés sur des tags][3].

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

| Paramètre de facturation  | Prix                                      | Spans indexées                                                                 | Facturation                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host d'APM][4]      | 31 $ par [host d'APM][4] sous-jacent par mois | 1 million de spans indexées supplémentaires incluses par mois avec chaque host d'APM.   | Le nombre de [hosts d'APM][5] que vous surveillez en même temps dans le service APM de Datadog est mesuré toutes les heures. Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée. [En savoir plus.][5] |
| [Fargate][4]       | 2 $ par tâche et par mois           | Aucune span indexée incluse dans le prix.                                        | Le nombre d'instances de tâches que vous surveillez dans le service APM de Datadog est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées. [En savoir plus.][4]              |
| [Span indexée][5] | 1,70 $ par million de spans indexées par mois | Prix facturé lorsque le nombre de spans indexées dépasse le quota autorisé pour chaque host d'APM | Une span indexée est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans indexées via des filtres de rétention ou d'anciennes spans analysées envoyées au service APM de Datadog à la fin du mois. [En savoir plus.][5]                                                                                          |

Remarque : si vous utilisez un environnement basé sur des conteneurs, vous êtes facturé en fonction du nombre de hosts sous-jacents qui déploient l'Agent APM.

Pour en savoir plus, consultez la page des [Tarifs][6].

## Exemples de scénarios de déploiement

**Les exemples reflètent les tarifs appliqués avec une facturation annuelle et pour une durée de rétention des spans indexées de 15 jours par défaut. Contactez votre [représentant commercial][6] ou votre [chargé de compte][7] pour discuter d'éventuels tarifs préférentiels.**

### Cas nº 1 : hosts et spans indexées

Utilisation de 5 hosts et envoi de 30 millions de spans indexées.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule       | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts d'APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $       | 155 $                  |
| Spans indexées | 30 millions | 5 millions incluses avec 5 hosts d'APM. 1,70 $ par million pour 25 millions de spans indexées supplémentaires | 25 * 1,70 $    | 42,50 $                |
| Total          |            |                                                                                                 | 155 $ + 42,50 $ | **197,50 $ par mois** |

### Cas nº 2 : hosts, Fargate et spans indexées

Utilisation de 5 hosts, envoi de 20 millions de spans indexées et déploiement de l'APM sur 20 tâches Fargate en moyenne au cours du mois.

| Unité de facturation  | Quantité   | Prix                                                                                           | Formule             | Sous-total              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Hosts d'APM      | 5          | 31 $ par host                                                                                    | 5 * 31 $             | 155 $                  |
| Tâches Fargate  | 20         | 2 $ par tâche                                                                                     | 20 * 2 $             | 40 $                   |
| Spans indexées | 20 millions | 5 millions incluses avec 5 hosts d'APM. 1,70 $ par million pour 15 millions de spans indexées supplémentaires | 15 * 1,70 $          | 25,50 $                |
| Total          |            |                                                                                                 | 155 $ + 40 $ + 25,50 $ | **220,50 $ par mois** |

### Cas nº 3 : services, conteneurs et spans indexées

Service 1 est exécuté sur le conteneur 1, service 2 exécuté sur le conteneur 2. Les conteneurs sont tous deux exécutés sur 1 host et envoient 20 millions de spans indexées sur App Analytics.

| Unité de facturation  | Quantité   | Prix                                                                                          | Formule      | Sous-total             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| Hosts d'APM      | 1          | 31 $ par host                                                                                   | 1 * 31 $      | 31 $                  |
| Spans indexées | 20 millions | 1 million incluses avec 1 host d'APM. 1,70 $ par million pour 19 millions de spans indexées supplémentaires | 19 * 1,70 $   | 32,30 $               |
| Total          |            |                                                                                                | 31 $ + 32,30 $ | **63,30 $ par mois** |

### Cas nº 4 : hosts avec scaling dynamique, conteneurs, Fargate et aucune span indexée

Application 1 est exécutée sur 20 à 40 conteneurs déployés sur 4 à 8 instances de host, application 2 est exécutée sur 10 à 30 tâches Fargate, et la fonctionnalité App Analytics n'est pas utilisée. On suppose que le 99e centile d'utilisation des instances EC2 est de 7 et que le nombre moyen de tâches Fargate au cours du mois est de 28.

| Unité de facturation | Quantité | Prix        | Formule    | Sous-total           |
|---------------|----------|--------------|------------|--------------------|
| Hosts d'APM     | 7        | 31 $ par host | 7 * 31 $    | 217 $               |
| Tâches Fargate | 28       | 2 $ par tâche  | 28 * 2 $    | 56 $                |
| Total         |          |              | 217 $ + 56 $ | **273 $ par mois** |

Remarque : le nombre de conteneurs n'est pas pris en compte si l'Agent est déployé sur les instances EC2.

### Cas nº 5 : nœuds Kubernetes et spans indexées

Agent exécuté sur 20 nœuds worker dans Kubernetes et envoi de 20 millions de spans indexées.

| Unité de facturation     | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Hosts d'APM (nœuds) | 20         | 31 $ par host                                                                | 20 * 31 $  | 620 $               |
| Spans indexées    | 20 millions | 20 millions incluses avec 20 hosts d'APM (nœuds). Aucune span indexée supplémentaire | 0 * 1,70 $ | 0                  |
| Total             |            |                                                                             | 620 $ + 0 $ | **620 $ par mois** |

Dans le cas de Kubernetes, l'APM est facturé par nœud et non par pod.

### Cas nº 6 : fonctions Lambda et spans indexées

Appel continu d'une fonction Lambda toutes les heures pendant un mois et envoi de 20 millions de spans indexées.

| Unité de facturation     | Quantité   | Prix                                                                       | Formule   | Sous-total           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Fonction Lambda   | 1          | [5 $ par mois][8]                                               | 1 * 5 $  | 5 $               |
| Spans indexées    | 20 millions | 1,70 $ par million de spans indexées | 20 * 1,70 $ | 34 $               |
| Total             |            |                                                                             | 5 $ + 34 $ | **39 $ par mois** |


## FAQ

**1. Comment un « host d'APM » est-il défini pour la facturation ?**

Un [host][4] est une instance de système d'exploitation physique ou virtuel. Le nombre de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog est mesuré toutes les heures. Pour la facturation de l'APM, le nombre de hosts sur lesquels l'[APM est installé][9] et qui envoient des traces est calculé toutes les heures. À la fin du mois, le prix qui vous est facturé est calculé en fonction du 99e centile d'utilisation des [hosts d'APM][5].

**2. Comment le tarif facturé est-il calculé en cas de déploiement d'un Agent par conteneur ?**

Nous vous conseillons d'[exécuter][10] un Agent par host sous-jacent en cas de déploiement sur des conteneurs. Si vous souhaitez malgré tout exécuter un Agent par conteneur, chaque conteneur est considéré comme un host distinct. Ainsi, le prix s'élève à (prix par host d'APM) * (nombre de conteneurs).

**1. Comment une « tâche Fargate d'APM » est-elle définie pour la facturation ?**

Une tâche Fargate est un ensemble de conteneurs programmés pour s'exécuter sur AWS Fargate en tant que moteur de calcul sans serveur. Le nombre de tâches que vous surveillez simultanément dans Datadog est mesuré toutes les cinq minutes. La facturation de l'APM est basée sur le nombre moyen de tâches Fargate qui envoient des traces à Datadog par heure pour un mois donné pour votre compte.

**4. Comment la facture est-elle calculée en cas redimensionnement soudain de mon environnement ?**

Le tarif facturé pour l'APM est calculé en fonction du 99e centile du nombre d'Agents actifs qui envoient des traces toutes les heures de chaque mois. À la fin du mois, le centile le plus élevé n'est pas pris en compte pour éviter d'être facturé en cas de pic inattendu.

**5. Les conteneurs pause Kubernetes sont-ils facturés ?**

Kubernetes crée des conteneurs pause pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoignent ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent 5.8+). Lorsque vous utilisez Kubernetes, l'APM est facturé par nœud et non par pod.

**6. Le nombre de hosts facturés tient-il compte de mes services ?**

L'APM est facturé en fonction du nombre de [hosts][4] déployés avec des Agents qui envoient des traces et non en fonction du nombre de services. La fonctionnalité App Analytics est facturée en fonction du nombre de [spans indexées][11]. Pour estimer le nombre de spans indexées que chaque service peut envoyer, utilisez l'[Estimateur d'événements][10].

**7. Qu'en est-il de mes filtres App Analytics existants ?**

À compter du 20 octobre 2020, tous les filtres App Analytics existants sont automatiquement convertis en filtres de rétention. Vous pouvez continuer d'utiliser les filtres tel quel ou les modifier selon vos besoins. Les filtres qui sont concernés par cette transition sont marqués d'un *i* pour indiquer qu'ils sont issus d'App Analytics sur la page des [filtres de rétention][3].

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
[6]: https://www.datadoghq.com/pricing/
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/fr/account_management/billing/serverless/#serverless-functions
[9]: /fr/tracing/send_traces/#datadog-agent
[10]: /fr/account_management/billing/
[11]: /fr/tracing/visualization/