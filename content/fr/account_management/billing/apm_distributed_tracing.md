---
title: Tarification de l'APM
kind: faq
---
[L'APM et le tracing distribué][1] vous permettent d'identifier les goulots d'étranglement dans vos services et d'analyser les traces distribuées au sein de votre architecture de microservices. En outre, la fonctionnalité [App Analytics][2] peut être combinée avec l'APM pour filtrer les données de votre application et les spans analysées en fonction de tags entièrement personnalisables.

| Paramètre de facturation | Prix  | App Analytics  | Facturation |
| -----------------------|---------------|-------------------------------------------|-------------|
|  [Host d'APM][10]  | 31 $ par [host d'APM][10] sous-jacent par mois | 1 million de spans analysées supplémentaires incluses par mois avec chaque host d'APM. | Le nombre de [hosts d'APM][11] que vous surveillez en même temps dans le service APM de Datadog est mesuré toutes les heures. Avec une formule basée sur la limite supérieure, ces mesures horaires sont ordonnées de la plus élevée à la plus faible à la fin du mois, et le prix facturé par Datadog est calculé en fonction de la huitième mesure la plus élevée. [En savoir plus.][11] |
| [Fargate][10] | 2 $ par tâche et par mois | Aucune span analysée incluse dans le prix. | Le nombre d'instances de tâches que vous surveillez dans le service APM de Datadog est mesuré toutes les cinq minutes. Datadog agrège ces mesures à la fin du mois et calcule le prix facturé en fonction du nombre total d'heures pendant lesquelles vos applications s'exécutaient et étaient surveillées. [En savoir plus.][10]|
| [Span analysée][11] | 1,70 $ par million de spans analysées par mois | Prix facturé lorsque le nombre de spans analysées dépasse le quota autorisé pour chaque host d'APM | Une span analysée est une requête individuelle effectuée auprès d'un service de votre pile. Le prix facturé par Datadog est calculé en fonction du nombre total de spans analysées envoyées au service APM de Datadog à la fin du mois. [En savoir plus.][11] | 

Remarque : si vous utilisez un environnement basé sur des conteneurs, vous êtes facturé en fonction du nombre de hosts sous-jacents qui déploient l'Agent APM.

Pour en savoir plus, consultez la page des [Tarifs][5].

## Exemples de scénarios de déploiement

**Les exemples reflètent les tarifs appliqués avec une facturation annuelle et pour une durée de rétention des spans analysées de 15 jours par défaut. Contactez votre [représentant commercial][5] ou votre [chargé de compte][6] pour discuter d'éventuels tarifs préférentiels.**

### Cas nº 1 : hosts et spans analysées

Utilisation de 5 hosts et envoi de 30 millions de spans analysées.

| Unité de facturation | Quantité | Prix | Formule | Sous-total |
| --------|-----------|------|----------| -------------|
| Hosts d'APM | 5 | 31 $ par host | 5 * 31 $ | 155 $ |
| Spans analysées | 30 millions | 5 millions incluses avec 5 hosts d'APM. 1,70 $ par million pour 25 millions de spans analysées supplémentaires | 25 * 1,70 $ |  42,50 $ |
| Total |  |  |  155 $ + 42,50 $ | **197,50 $ par mois** |


### Cas nº 2 : hosts, Fargate et spans analysées

Utilisation de 5 hosts, envoi de 20 millions de spans analysées et déploiement de l'APM sur 20 tâches Fargate en moyenne au cours du mois.

| Unité de facturation | Quantité | Prix | Formule | Sous-total |
| --------|-----------|------|----------| -------------|
| Hosts d'APM | 5 | 31 $ par host | 5 * 31 $ | 155 $ |
| Tâches Fargate | 20 | 2 $ par tâche | 20 * 2 $ | 40 $ |
| Spans analysées | 20 millions | 5 millions incluses avec 5 hosts d'APM. 1,70 $ par million pour 15 millions de spans analysées supplémentaires | 25 * 1,70 $ | 25,50 $ |
| Total |  |  |  155 $ + 40 $ + 25,50 $ | **220,50 $ par mois** |


### Cas nº 3 : services, conteneurs et spans analysées

Service 1 est exécuté sur le conteneur 1, service 2 exécuté sur le conteneur 2. Les conteneurs sont tous deux exécutés sur 1 host et envoient 20 millions de spans analysées sur App Analytics.

| Unité de facturation | Quantité | Prix | Formule | Sous-total |
| --------|-----------|------|----------| -------------|
| Hosts d'APM | 1 | 31 $ par host | 1 * 31 $ | 31 $ |
| Spans analysées | 20 millions | 1 million incluses avec 1 host d'APM. 1,70 $ par million pour 19 millions de spans analysées supplémentaires | 19 * 1,70 $ | 32,30 $ |
| Total |  |  |  31 $ + 32,30 $ | **63,30 $ par mois** |


### Cas nº 4 : hosts avec mise à l'échelle dynamique, Fargate et aucune span analysée

Application 1 est exécutée sur 20 à 40 conteneurs déployés sur 4 à 8 instances de host, application 2 est exécutée sur 10 à 30 tâches Fargate, et la fonctionnalité App Analytics n'est pas utilisée. On suppose que le 99e centile d'utilisation des instances EC2 est de 7 et que le nombre moyen de tâches Fargate au cours du mois est de 28. 

| Unité de facturation | Quantité | Prix | Formule | Sous-total |
| --------|-----------|------|----------| -------------|
| Hosts d'APM | 7 | 31 $ par host | 7 * 31 $ | 252 $ |
| Tâches Fargate | 28 | 2 $ par tâche | 28 * 2 $ | 256 $ |
| Total |  |  |  252 $ + 56 $ | **308 $ par mois** |

Remarque : le nombre de conteneurs n'est pas pris en compte si l'Agent est déployé sur les instances EC2. 

### Cas nº 5 : nœuds Kubernetes et spans analysées

Agent exécuté sur 20 nœuds worker dans Kubernetes et envoi de 20 millions de spans analysées.

| Unité de facturation | Quantité | Prix | Formule | Sous-total |
| --------|-----------|------|----------| -------------|
| Hosts d'APM (nœuds) | 20 | 31 $ par host | 20 * 31 $ | 720 $ |
| Spans analysées | 20 millions | 20 millions incluses avec 20 hosts d'APM (nœuds). Aucune span analysée supplémentaire | 0 * 1,70 $ | 0  |
| Total |  |  |  720 $ + 0 $ | **720 $ par mois** |

Dans le cas de Kubernetes, l'APM est facturé par nœud et non par pod.

### FAQ
**1. Comment un « host d'APM » est-il défini pour la facturation ?**

Un [host][10] est une instance de système d'exploitation physique ou virtuelle. Le nombre de hosts que vous surveillez actuellement dans le service Infrastructure de Datadog est mesuré toutes les heures. Le nombre de hosts sur lesquels l'[APM est installé][7] et qui envoient des traces est calculé toutes les heures. À la fin du mois, vous êtes facturé en fonction du 99e centile d'utilisation des [hosts d'APM][11]. 

**2. Comment le tarif facturé est-il calculé en cas de déploiement d'un Agent par conteneur ?**

Nous vous conseillons d'[exécuter][9] un Agent par host sous-jacent en cas de déploiement sur des conteneurs. Si vous souhaitez malgré tout exécuter un Agent par conteneur, chaque conteneur est considéré comme un host distinct. Ainsi, le prix s'élève à (prix par host d'APM) * (nombre de conteneurs)

**3. Comment la facture est-elle calculée en cas redimensionnement soudain de mon environnement ?**

Le tarif facturé pour l'APM est calculé en fonction du 99e centile du nombre d'Agents actifs qui envoient des traces toutes les heures de chaque mois. À la fin du mois, le centile le plus élevé n'est pas pris en compte pour éviter d'être facturé en cas de pic inattendu.


**4. Les conteneurs pause Kubernetes sont-ils facturés ?**

Kubernetes crée des conteneurs pause pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoigne ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent 5.8+). Lorsque vous utilisez Kubernetes, l'APM est facturé par nœud et non par pod.


**5. Le nombre de hosts facturés tient-il compte de mes services ?**

L'APM est facturé en fonction du nombre de [hosts][10] déployés avec un Agent qui envoie des traces, et non en fonction du nombre de services. La fonctionnalité App Analytics est facturée en fonction du nombre de [spans analysées][3]. Pour estimer le nombre de spans analysées que chaque service peut envoyer, utilisez l'[Estimateur d'événements][9].

**6. Est-il possible d'utiliser App Analytics sans recourir à l'APM ?**

Non. La fonctionnalité App Analytics est uniquement disponible avec l'APM, qui est facturé en fonction du nombre de spans analysées. 

## Pour aller plus loin

{{< whatsnext>}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Consulter les données d'utilisation de l'APM et configurer des alertes{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimer et contrôler l'utilisation de l'APM{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/tracing
[2]: /fr/tracing/app_analytics/?tab=java
[3]: /fr/tracing/visualization/
[4]: https://www.datadoghq.com/pricing
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: /fr/tracing/send_traces/#datadog-agent
[8]: /fr/tracing/send_traces/#containers
[9]: /fr/account_management/billing/
[10]: /fr/account_management/billing/pricing/#infrastructure-monitoring
[11]: /fr/account_management/billing/pricing/#apm