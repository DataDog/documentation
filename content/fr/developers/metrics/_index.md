---
title: Métriques
kind: documentation
disable_toc: true
aliases:
  - /fr/metrics/
  - /fr/guides/metrics/
  - /fr/metrictypes/
  - /fr/units/
  - /fr/developers/metrics/datagram_shell
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: En savoir plus sur DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
---
Une métrique Datadog est caractérisée par les propriétés ci-dessous. Consultez la [section Présentation des métriques][1] pour découvrir comment représenter graphiquement des métriques au sein de Datadog.

| Propriété         | Description                                                                                                                                               |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<NOM_MÉTRIQUE>`  | Le [nom de votre métrique](#nommer-les-métriques).                                                                                                               |
| `<VALEUR_MÉTRIQUE>` | La valeur de votre métrique.                                                                                                                                 |
| `<TIMESTAMP>`     | Le timestamp associé à la valeur de la métrique. **Remarque** : les timestamps des métriques ne peuvent pas correspondre à une date plus d'une heure avant l'événement et plus de 10 minutes après celui-ci. |
| `<CONTEXTE>`      | L'ensemble des tags associés à votre métrique.                                                                                                              |
| `<TYPE_MÉTRIQUE>`  | Le type de votre métrique. Consultez la [documentation relative aux types de métriques][2].                                                                                          |
| `<INTERVALLE>`     | Si le `<TYPE>` de la métrique est RATE ou COUNT, cette propriété définit l'intervalle correspondant.                                                                    |

Si une métrique n'est pas envoyée depuis l'une des [plus de 350 intégrations Datadog][3], elle est considérée comme une [métrique custom][4]. **Remarque** : certaines intégrations standard [génèrent des métriques custom][2].

### Nommer les métriques

Suivez les règles suivantes lors de l'attribution d'un nom à vos métriques :

* Les métriques doivent commencer par une lettre.
* Elles doivent seulement contenir des caractères alphanumériques ASCII, des underscores et des points.
  * Les autres caractères, y compris les espaces, sont remplacés par des underscores.
  * Le format Unicode n'est _pas_ pris en charge.
* Ils ne doivent pas dépasser 200 caractères. Nous vous recommandons d'utiliser moins de 100 caractères pour l'interface utilisateur.

Les métriques renvoyées par l'Agent respectent un format pseudo hiérarchique séparé par des points (p. ex., `http.nginx.response_time`). La hiérarchie n'est ni appliquée ni interprétée, mais elle peut être utilisée pour déduire des éléments concernant les serveurs. Par exemple, si `hostA` et `hostB` renvoient tous les deux `http.nginx.*`, il doit s'agir de front-ends web.

**Remarque** : les noms de métrique sont sensibles à la casse dans Datadog.

### Envoyer des métriques

{{< whatsnext desc="Il existe plusieurs façons d'envoyer des métriques à Datadog :">}}
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}Check custom d'Agent{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/api/?lang=python#post-timeseries-points" >}}API HTTP de DatadogI={{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez également utiliser l'une des [bibliothèques client de Datadog et sa communauté pour DogStatsD et les API][6] afin d'envoyer vos métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/metrics/introduction
[2]: /fr/developers/metrics/metrics_type
[3]: /fr/integrations
[4]: /fr/developers/metrics/custom_metrics
[5]: /fr/account_management/billing/custom_metrics/#standard-integrations
[6]: /fr/developers/libraries