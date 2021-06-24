---
title: Métriques custom
kind: documentation
aliases:
  - /fr/metrics/
  - /fr/guides/metrics/
  - /fr/metrictypes/
  - /fr/units/
  - /fr/developers/metrics/datagram_shell
  - /fr/developers/metrics/custom_metrics/
  - /fr/getting_started/custom_metrics
further_reading:
  - link: /developers/dogstatsd/
    tag: Documentation
    text: En savoir plus sur DogStatsD
  - link: /developers/community/libraries/
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
---
## Présentation

Lorsqu'une métrique n'est pas envoyée depuis l'une des [plus de 400 intégrations Datadog][1], elle est considérée comme une métrique custom<sup>[(1)][2]</sup>. Les métriques custom vous permettent de surveiller plus facilement les KPI de vos applications, comme le nombre de visiteurs, la taille moyenne de leur panier, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.

Une métrique custom est définie par une **combinaison unique de nom de métrique et de valeurs de tag (y compris le tag du host)**. En général, les métriques envoyées par [DogStatsD][3] ou via un [check d'Agent custom][4] sont des métriques custom.

**Remarque** : les utilisateurs disposant du rôle Admin de Datadog peuvent consulter le nombre moyen de métriques custom par heure et les 500 principales métriques custom pour leur compte depuis la [page des détails d'utilisation][5]. Découvrez comment [les métriques custom sont comptabilisées][6].

## Propriétés des métriques custom

Une métrique custom Datadog possèdent les propriétés ci-dessous. Consultez la [section Présentation des métriques][7] pour découvrir comment représenter graphiquement des métriques au sein de Datadog.

| Propriété         | Description                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<NOM_MÉTRIQUE>`  | Le [nom de votre métrique](#nom-des-metriques-custom).                                                                                                                  |
| `<VALEUR_MÉTRIQUE>` | La valeur de votre métrique.                                                                                                                                    |
| `<TIMESTAMP>`    | Le timestamp associé à la valeur de la métrique. **Remarque** : les timestamps des métriques ne peuvent pas correspondre à une date plus d'une heure avant l'événement et plus de 10 minutes après celui-ci. |
| `<TAGS>`         | L'ensemble des tags associés à votre métrique.                                                                                                                 |
| `<TYPE_MÉTRIQUE>`  | Le type de votre métrique. Consultez la [documentation relative aux types de métriques][8].                                                                                             |
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
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Check custom d'Agent{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}API HTTP de Datadog{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques client de Datadog et sa communauté pour DogStatsD et les API][12] afin d'envoyer vos métriques custom.

**Remarque** : aucune limite de débit fixe n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, vous serez facturé conformément à la [politique de facturation de Datadog pour les métriques custom][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[Certaines intégrations génèrent des métriques custom][2]*

[1]: /fr/integrations/
[2]: /fr/account_management/billing/custom_metrics/#standard-integrations
[3]: /fr/developers/metrics/dogstatsd_metrics_submission/
[4]: /fr/developers/metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /fr/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /fr/graphing/metrics/introduction/
[8]: /fr/developers/metrics/types/
[9]: /fr/developers/metrics/types/?tab=rate#metric-types
[10]: /fr/developers/metrics/types/?tab=count#metric-types
[11]: /fr/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /fr/developers/community/libraries/