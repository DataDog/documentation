---
title: Désactiver les alertes avec les downtimes
kind: guide
further_reading:
  - link: api/v1/downtimes/
    tag: Documentation
    text: Référence sur l'API Downtime
  - link: /monitors/downtimes/
    tag: Documentation
    text: Documentation sur les downtimes
---
## Présentation

Utilisez les Downtimes pour éviter les alertes inutiles pendant les événements programmés, tels que les maintenances, les tests ou les mises à l'échelle automatiques.
Utilisez l'[API Downtime][1] pour gérer des calendriers de maintenance avancés, ou pour désactiver des monitors de façon dynamique, par exemple lors du redimensionnement d'instances cloud.

Ce guide explique comment configurer des downtimes pour les cas d'utilisation suivants :

* [Downtime pendant le week-end](#downtime-over-the-week-end)
* [Downtime en dehors des heures de travail](#downtime-outside-of-business-hours)
* [Downtime récurrent à un jour précis du mois](#recurring-downtime-on-nth-weekday-of-the-month)

## Prérequis

Comme ce guide décrit l'utilisation de l'API, vous avez besoin d'une clé d'API et d'une clé d'application avec des privilèges administrateur. Pour les obtenir, accédez à la [page des clés d'API de votre compte Datadog][2].
Remplacez toutes les occurrences de `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par votre clé d'API Datadog et votre clé d'application Datadog, respectivement.

Ce guide suppose également que vous avez accès à un terminal avec `CURL` et avez consulté la [page principale de la documentation sur les downtimes][3]

## Scénarios

### Downtime pendant le week-end

Si vous surveillez des services utilisés uniquement pendant la semaine, tels que le logiciel ERP ou le logiciel de comptabilité de votre entreprise, vous souhaitez peut-être recevoir des alertes uniquement pendant la semaine.
L'appel d'API suivant vous permet de désactiver les alertes pendant le week-end pour tous les monitors sur le tag `env:prod` :

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<SITE_DATADOG>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613779200","end":"1613865599", "recurrence": {"type": "weeks","period": 1,"week_days": ["Sat","Sun"]}}'
```

Remplacez la valeur du paramètre fictif `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}}. Remplacez les paramètres `start` et `end` en fonction de votre calendrier. Par exemple :

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

Ensuite, dans la commande cURL, utilisez : `"start": '"${start}"'`.

**Réponse :**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": ["Sat", "Sun"],
        "type": "weeks",
        "period": 1
    },
    "end": 1613865599,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613779200,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

Ouvrez la [page de gestion des downtimes][1] et ajoutez un nouveau downtime. Sélectionnez `recurring` :

{{< img src="monitors/guide/downtimes_weekend.jpg" alt="Downtimes pendant le week-end" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Downtime en dehors des heures de travail

En gardant le même exemple, vous pouvez également désactiver ce service en dehors des heures de travail lors des jours de la semaine.

L'appel d'API suivant vous permet de désactiver les alertes de 20 h à 6 h tous les jours de la semaine :

{{< tabs >}}
{{% tab "API " %}}

```bash
curl -X POST "https://api.<SITE_DATADOG>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "env:prod","start":"1613844000","end":"1613887200", "recurrence": {"type": "days","period": 1}}'
```
Remplacez la valeur du paramètre fictif `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}}. Remplacez les paramètres `start` et `end` en fonction de votre calendrier.

**Réponse :**

```json
{
    "recurrence": {
        "until_date": null,
        "until_occurrences": null,
        "week_days": null,
        "type": "days",
        "period": 1
    },
    "end": 1613887200,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1613844000,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["env:prod"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```

{{% /tab %}}
{{% tab "UI" %}}

Ouvrez la [page de gestion des downtimes][1] et ajoutez un nouveau downtime. Sélectionnez `recurring` :

{{< img src="monitors/guide/downtime_businesshour.jpg" alt="Downtimes en dehors des heures de travail" style="width:60%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Downtime récurrent à un jour précis du mois

Pour planifier des calendriers de maintenance plus avancés, vous pouvez utiliser RRULE.

RRULE, ou règle de récurrence, est un nom de propriété issu de la spécification [RFC iCalendar][4], qui est le standard pour définir des événements récurrents.

Toutes les règles RRULE répertoriées dans la [RFC][4] sont prises en charge. Vous pouvez utiliser [cet outil][5] pour générer des règles RRULE et les coller dans votre appel d'API.

**Exemple** : l'application ERP est mise à jour tous les 2e mardis du mois pour appliquer les patchs et correctifs entre 8 h et 10 h. Les monitors pour cet événement étant définis avec `app:erp`, nous utilisons ce paramètre pour définir notre downtime.

#### API 

Le paramètre `type` doit être défini sur `rrule`. 
Les paramètres `start` et `end` doivent correspondre aux valeurs prévues pour le début et la fin du premier jour de la règle récurrente. En supposant que le premier 2e mardi de notre règle est le mardi 9 mars, la date de début doit donc être le 9 mars à 8 h, et la date de fin le 9 mars à 10 h :

**Appel d'API :**

```bash
curl -X POST "https://api.<SITE_DATADOG>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"scope": "app:erp","start":"1615276800","end":"1615284000", "recurrence": {"type":"rrule","rrule":"FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"}}'
```

Remplacez la valeur du paramètre fictif `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}}. Remplacez les paramètres `start` et `end` en fonction de votre calendrier.

**Réponse :**

```json
{
    "recurrence": {
        "type": "rrule",
        "rrule": "FREQ=MONTHLY;INTERVAL=1;BYDAY=2TU"
    },
    "end": 1615284000,
    "monitor_tags": ["*"],
    "child_id": null,
    "canceled": null,
    "monitor_id": null,
    "org_id": 1111111,
    "disabled": false,
    "start": 1615276800,
    "creator_id": 987654321,
    "parent_id": null,
    "timezone": "UTC",
    "active": false,
    "scope": ["app:erp"],
    "message": null,
    "downtime_type": 2,
    "id": 123456789,
    "updater_id": null
}
```


### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/v1/downtimes/
[2]: https://docs.datadoghq.com/fr/api/v1/authentication/
[3]: https://docs.datadoghq.com/fr/monitors/downtimes/?tab=bymonitorname
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html