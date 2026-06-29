---
description: Guide de migration pour les changements du 1er octobre 2024 concernant
  les API Hourly Usage et Summary Usage, couvrant les nouvelles clés RUM et l'abandon
  des regroupements de logs indexés.
title: Migrer les logs indexés et le RUM dans les API Hourly Usage et Summary Usage
---

## Présentation

Le 1er octobre 2024, deux endpoints d'API vont changer :
- [Get hourly usage by product family][1]
- [Get usage across your account][2]

Les produits RUM et les logs indexés sont concernés. Consultez la section suivante pour chaque endpoint d'API que vous utilisez et examinez les mises à jour afin de déterminer les changements à apporter à votre automatisation.

## Récupérer l'utilisation horaire par famille de produits

La modification du 1er octobre 2024 de l'endpoint [Get hourly usage by product family][1] rend obsolètes les anciennes clés et fournit des informations plus détaillées sur votre utilisation du RUM.

### RUM

Les clés héritées suivantes seront obsolètes :
- Famille de produits `rum_browser_sessions` :
  - `replay_session_count`
  - `session_count`
- Famille de produits `rum_mobile_sessions` :
  - `session_count`
  - `session_count_android`
  - `session_count_flutter`
  - `session_count_ios`
  - `session_count_reactnative`
  - `session_count_roku`
- `rum` product_family :
  - `browser_rum_units`
  - `mobile_rum_units`
  - `rum_units`

Les nouvelles clés suivantes seront ajoutées :
- `rum_replay_session_count`
- `rum_lite_session_count`
- `rum_browser_legacy_session_count`
- `rum_browser_replay_session_count`
- `rum_browser_lite_session_count`
- `rum_mobile_legacy_session_count_android`
- `rum_mobile_legacy_session_count_flutter`
- `rum_mobile_legacy_session_count_ios`
- `rum_mobile_legacy_session_count_reactnative`
- `rum_mobile_legacy_session_count_roku`
- `rum_mobile_lite_session_count_android`
- `rum_mobile_lite_session_count_flutter`
- `rum_mobile_lite_session_count_ios`
- `rum_mobile_lite_session_count_reactnative`
- `rum_mobile_lite_session_count_roku`

L'utilisation du RUM dans l'endpoint **Get hourly usage by product family** sera affichée sous une seule famille de produits `rum` avec trois clés représentant les SKU sur lesquels votre utilisation du RUM peut être facturée :
- `rum`
- `rum_replay`
- `rum_lite`

Les familles de produits et types d'utilisation hérités seront obsolètes et affichés comme `null` dans l'endpoint **Get hourly usage by product family**.

 #### Structure de réponse actuelle

 Voici un exemple actuel d'une réponse pour l'endpoint [Get hourly usage by product family][1] :
 {{< code-block lang="json">}}
 {
  "data": [
     {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "browser_rum_units",
            "value": 100
          },
          {
            "usage_type": "mobile_rum_units",
            "value": null
          }
        ]
      }
    },
  ]
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_browser_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "replay_session_count",
          "value": 100
        },
        {
          "usage_type": "session_count",
          "value": 100
        }
      ]
    }
  },
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_mobile_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "session_count",
          "value": 0
        },
        {
          "usage_type": "session_count_android",
          "value": 100
        },
        {
          "usage_type": "session_count_flutter",
          "value": 0
        },
        {
          "usage_type": "session_count_ios",
          "value": 0
        },
        {
          "usage_type": "session_count_reactnative",
          "value": 0
        },
        {
          "usage_type": "session_count_roku",
          "value": 0
        }
      ]
    }
  }
}
{{< /code-block >}}

#### Structure de réponse à venir

Après le 1er octobre 2024, l'endpoint [Get hourly usage by product family][1] aura le type de structure suivant :


{{< highlight json "hl_lines=7 14 17 22 27 30 83 110" >}}
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
// Une famille de produits existante (rum) ; les familles de produits rum_browser_sessions et rum_mobile_sessions sont obsolètes ci-dessous
            "product_family":"rum",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
// Trois nouvelles clés représentant les SKU sur lesquels votre utilisation RUM peut être facturée
               {
                  "usage_type":"rum_total_session_count",
// SKU sur lequel votre utilisation peut être facturée. Null si le SKU n'est pas actif pour votre organisation
                  "usage":null
               },
               {
                  "usage_type":"rum_replay_session_count",
// SKU sur lequel votre utilisation peut être facturée. Null si le SKU n'est pas actif pour votre organisation
                  "usage":50
               },
               {
                  "usage_type":"rum_lite_session_count",
// SKU sur lequel votre utilisation peut être facturée. Null si le SKU n'est pas actif pour votre organisation
                  "usage":50
               },
// 13 types d'utilisation possibles représentant des données RUM détaillées
               {
                  "usage_type":"browser_legacy_session_count",
                  "usage":0
               },
               {
                  "usage_type":"browser_lite_session_count",
                  "usage":50
               },
               {
                  "usage_type":"browser_replay_session_count",
                  "usage":50
               },
               {
                  "usage_type":"mobile_legacy_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_roku",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_roku",
                  "usage":0
               },
// Les types d'utilisation hérités sont remplacés par null
               {
                  "usage_type":"browser_rum_units",
                  "value":null
               },
               {
                  "usage_type":"mobile_rum_units",
                  "value":null
               },
               {
                  "usage_type":"rum_units",
                  "value":null
               }
            ]
         }
      }
   ]
}









// Une famille de produits existante active (rum) ; les familles de produits rum_browser_sessions et rum_mobile_sessions sont des familles de produits héritées et sont représentées comme null
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_browser_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"replay_session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count",
                  "value":null
               }
            ]
         }
      },
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_mobile_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count_android",
                  "value":null
               },
               {
                  "usage_type":"session_count_flutter",
                  "value":null
               },
               {
                  "usage_type":"session_count_ios",
                  "value":null
               },
               {
                  "usage_type":"session_count_reactnative",
                  "value":null
               },
               {
                  "usage_type":"session_count_roku",
                  "value":null
               }
            ]
         }
      }
   ]
}
{{< /highlight >}}


## Récupérer l'utilisation de votre compte

La modification du 1er octobre 2024 de l'endpoint [Get usage across your account][2] rend obsolètes les anciennes clés et fournit des informations plus détaillées sur votre utilisation du RUM et des logs indexés.

### RUM

Les clés suivantes seront obsolètes :
- `rum_units_agg_sum`
- `browser_rum_units_agg_sum`
- `mobile_rum_units_agg_sum`
- `browser_rum_lite_session_count_agg_sum`
- `browser_replay_session_count_agg_sum`
- `browser_legacy_session_count_agg_sum`
- `mobile_rum_lite_session_count_agg_sum`
- `rum_browser_and_mobile_session_count_agg_sum`
- `browser_rum_legacy_and_lite_session_count_agg_sum`
- `rum_total_session_count_agg_sum`
- `rum_session_count_agg_sum`
- `mobile_rum_session_count_agg_sum`
- `mobile_rum_session_count_ios_agg_sum`
- `mobile_rum_session_count_android_agg_sum`
- `mobile_rum_session_count_reactnative_agg_sum`
- `mobile_rum_session_count_flutter_agg_sum`
- `mobile_rum_session_count_roku_agg_sum`
- `rum_indexed_events_count_agg_sum`

Les nouvelles clés suivantes décrivent l'utilisation du RUM :
- `rum_replay_session_count_agg_sum`
- `rum_lite_session_count_agg_sum`
- `rum_browser_legacy_session_count_agg_sum`
- `rum_browser_replay_session_count_agg_sum`
- `rum_browser_lite_session_count_agg_sum`
- `rum_mobile_legacy_session_count_android_agg_sum`
- `rum_mobile_legacy_session_count_flutter_agg_sum`
- `rum_mobile_legacy_session_count_ios_agg_sum`
- `rum_mobile_legacy_session_count_reactnative_agg_sum`
- `rum_mobile_legacy_session_count_roku_agg_sum`
- `rum_mobile_lite_session_count_android_agg_sum`
- `rum_mobile_lite_session_count_flutter_agg_sum`
- `rum_mobile_lite_session_count_ios_agg_sum`
- `rum_mobile_lite_session_count_reactnative_agg_sum`
- `rum_mobile_lite_session_count_roku_agg_sum`

L'utilisation du RUM dans l'endpoint **Get usage across your account** inclura trois clés représentant les SKU sur lesquels votre utilisation du RUM peut être facturée :
- `rum`
- `rum_replay`
- `rum_lite`

Les SKU qui ne sont pas actifs pour votre organisation seront indiqués comme null. Les 13 types d'utilisation fourniront des récapitulatifs détaillés de l'utilisation sous le SKU RUM.

#### Structure de réponse actuelle

Voici un exemple actuel d'une réponse pour l'endpoint [Get usage across your account][2] :
{{< code-block lang="json">}}
{
  "usage": {
    "rum_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_flutter_agg_sum": 0,
    "mobile_rum_session_count_ios_agg_sum": 0,
    "rum_total_session_count_agg_sum": 7618504,
    "rum_browser_and_mobile_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_android_agg_sum": 0,
    "mobile_rum_session_count_reactnative_agg_sum": 0,
    "mobile_rum_session_count_roku_agg_sum": 0,
     },
    { ... // Summary usage by sub-organization }
}
{{< /code-block >}}

#### Structure de réponse à venir

Après le 1er octobre 2024, l'endpoint [Get usage across your account][2] aura le type de structure suivant :

{{< highlight json "hl_lines=5 10 25" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
// Trois clés représentant les SKU sur lesquels votre utilisation RUM peut être facturée
   "rum_total_session_count_agg_sum":null,
   "rum_replay_session_count_agg_sum":50,
   "rum_lite_session_count_agg_sum":null,

// Types d'utilisation RUM représentant des données RUM détaillées
   "rum_browser_legacy_session_count_agg_sum":0,
   "rum_browser_lite_session_count_agg_sum":183911,
   "rum_browser_replay_session_count_agg_sum":5576,
   "rum_mobile_legacy_session_count_android_agg_sum":0,
   "rum_mobile_legacy_session_count_flutter_agg_sum":0,
   "rum_mobile_legacy_session_count_ios_agg_sum":0,
   "rum_mobile_legacy_session_count_reactnative_agg_sum":0,
   "rum_mobile_legacy_session_count_roku_agg_sum":0,
   "rum_mobile_lite_session_count_android_agg_sum":0,
   "rum_mobile_lite_session_count_flutter_agg_sum":0,
   "rum_mobile_lite_session_count_ios_agg_sum":0,
   "rum_mobile_lite_session_count_reactnative_agg_sum":0,
   "rum_mobile_lite_session_count_roku_agg_sum":0,

// Les clés d'utilisation héritées sont remplacées par null
   "rum_session_count_agg_sum": null,
   "mobile_rum_session_count_flutter_agg_sum": null,
   "mobile_rum_session_count_ios_agg_sum": null,
   "rum_browser_and_mobile_session_count_agg_sum": null,
   "mobile_rum_session_count_android_agg_sum": null,
   "mobile_rum_session_count_reactnative_agg_sum": null,
   "mobile_rum_session_count_roku_agg_sum": null

"usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"cd996121d",
               "public_id":"cd996121d",
               "uuid":"28d17f18-00cc-11ea-a77b-97323eff26a7",
               "region":"us"
               ... // Résumé de l'utilisation par sous-organisation
            }
         ]
      }
   ]
}
{{< /highlight >}}

### Indexed Logs

Les clés représentant l'utilisation totale pour toutes les rétentions seront obsolètes et affichées comme `null`. Ces clés sont :
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

Vous pouvez continuer à calculer l'utilisation sur toutes les périodes de rétention en additionnant les clés de rétention individuelles.

#### Structure de réponse actuelle

Voici un exemple actuel d'une réponse pour l'endpoint [Get usage across your account][2] :
{{< code-block lang="json">}}
{
  "usage": {
    "rehydrated_indexed_events_agg_sum": 150,
    "live_indexed_events_agg_sum": 150,
    "logs_indexed_logs_usage_agg_sum_15_day": 100,
    "logs_indexed_logs_usage_agg_sum_3_day": 100,
    "logs_indexed_logs_usage_agg_sum_30_day": 100
  },
  "orgs": [
    {
      "name": "Sub-Org 1",
      "public_id": "abcd",
      "uuid": "abcd",
      "region": "eu",
      "usage": {
        "indexed_events_count_sum": 200,
        "live_indexed_events_sum": 100,
        "rehydrated_indexed_events_sum": 100,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
  ]
{ ... // Résumé de l'utilisation par sous-organisation }
}
{{< /code-block >}}

#### Structure de réponse à venir

Après le 1er octobre 2024, le point de terminaison [Obtenir l'utilisation sur votre compte][2] aura la structure d'exemple suivante :

{{< highlight json "hl_lines=5-8 19-22 32-35" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
   // Les regroupements intermédiaires obsolètes sont remplacés par null
   "indexed_events_count_agg_sum": null,
   "live_indexed_events_agg_sum": null,
   "rehydrated_indexed_events_agg_sum": null,
   "usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // Les regroupements intermédiaires obsolètes sont remplacés par null
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
            {
               "name":"Sub-Org 2",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // Les regroupements intermédiaires obsolètes sont remplacés par null
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
         ]
      }
   ]
}
{{< /highlight >}}

[1]: /fr/api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /fr/api/latest/usage-metering/#get-usage-across-your-account