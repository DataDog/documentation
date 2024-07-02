---
aliases:
- /fr/guides/metrics/
- /fr/metrictypes/
- /fr/units/
- /fr/developers/metrics/datagram_shell
- /fr/developers/metrics/custom_metrics/
- /fr/getting_started/custom_metrics
- /fr/developers/metrics/
further_reading:
- link: /developers/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /developers/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: Blog
  text: Contrôler de façon dynamique le volume de vos métriques custom grâce à Metrics
    without Limits™
title: Métriques custom
---

## Présentation

Lorsqu'une métrique n'est pas envoyée depuis l'une des [quelque {{< translate key="integration_count" >}} intégrations Datadog][1], elle est considérée comme une métrique custom<sup>[(1)][2]</sup>. Les métriques custom vous permettent de surveiller plus facilement les KPI de vos applications, comme le nombre de visiteurs, la taille moyenne de leur panier, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.

Une métrique custom est définie par une **combinaison unique de nom de métrique et de valeurs de tag (y compris le tag du host)**. En général, les métriques envoyées par [DogStatsD][3] ou via un [check d'Agent custom][4] sont des métriques custom.

**Remarque** : les utilisateurs disposant du rôle Admin de Datadog peuvent consulter le nombre moyen de métriques custom par heure et les 500 principales métriques custom pour leur compte depuis la [page des détails d'utilisation][5]. Découvrez comment [les métriques custom sont comptabilisées][6].

## Propriétés des métriques custom

Les métriques custom Datadog possèdent les propriétés ci-dessous. Consultez la [présentation des métriques][7] pour découvrir comment représenter graphiquement des métriques au sein de Datadog.

| Propriété         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<NOM_MÉTRIQUE>`  | Le [nom de votre métrique](#nom-des-metriques-custom).                                                                                                                  |
| `<VALEUR_MÉTRIQUE>` | La valeur de votre métrique. **Remarque** : les valeurs des métriques respecter un format 32 bits. Elles ne doivent pas représenter des dates ou des timestamps.                                                                                                                                |
| `<TIMESTAMP>`    | Le timestamp associé à la valeur de la métrique. **Remarque** : les timestamps des métriques ne peuvent pas correspondre à une date plus d'une heure avant l'événement et plus de 10 minutes après celui-ci. |
| `<TAGS>`         | L'ensemble des tags associés à votre métrique.                                                                                                                 |
| `<TYPE_MÉTRIQUE>`  | Le type de votre métrique. En savoir plus sur les [types de métriques][8].                                                                                             |
| `<INTERVALLE>`     | Si le `<TYPE>` de la métrique est [RATE][9] ou [COUNT][10], cette propriété définit l'[intervalle][11] correspondant.                                                       |

### Nom des métriques custom

La convention de nommage suivante s'applique aux métriques custom :

* Les noms des métriques doivent commencer par une lettre.
* Les noms de métriques doivent contenir uniquement des caractères alphanumériques ASCII, des underscores et des points.
  * Les autres caractères, y compris les espaces, sont remplacés par des underscores.
  * Le format Unicode n'est _pas_ pris en charge.
* Les noms de métriques ne doivent pas dépasser 200 caractères. Nous vous recommandons d'utiliser moins de 100 caractères pour une meilleure lisibilité sur l'interface.

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

## Envoi de métriques custom

{{< whatsnext desc="Il existe plusieurs façons d'envoyer des métriques à Datadog :">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}Check d'Agent custom{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP Datadog{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generer-une-metrique-basee-sur-des-logs" >}}Générer des métriques basées sur des logs{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}Générer des métriques basées sur des spans APM{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generer-une-metrique-basee-sur-des-processus" >}}Générer des métriques basées sur des live processes{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques client de Datadog et sa communauté pour DogStatsD et les API][12] afin d'envoyer vos métriques custom.

**Remarque** : aucune limite de débit fixe n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, vous serez facturé conformément à la [politique de facturation de Datadog pour les métriques custom][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[Certaines intégrations génèrent des métriques custom][2]*

[1]: /fr/integrations/
[2]: /fr/account_management/billing/custom_metrics/#standard-integrations
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /fr/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /fr/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /fr/metrics
[8]: /fr/metrics/types/
[9]: /fr/metrics/types/?tab=rate#metric-types
[10]: /fr/metrics/types/?tab=count#metric-types
[11]: /fr/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /fr/developers/community/libraries/