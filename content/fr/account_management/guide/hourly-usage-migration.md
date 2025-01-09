---
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Paramètres de formule et d'utilisation
title: Passer de la version 1 à la version 2 des API d'utilisation horaire
---

## Résumé
Les utilisateurs de la version 1 des API devraient reconnaître dans la version 2 des API d'utilisation horaire les concepts auxquels ils sont habitués, malgré un format légèrement différent.

Voici les différences les plus notables entre les versions 1 et 2. La version 2 :
* regroupe tous les produits au sein d'un même endpoint ;
* est conforme à la spécification JSON:API ;
* est paginée ;
* peut renvoyer des données pour plusieurs organisations et régions à l'aide d'une même requête.

Chacune de ces différences est abordée plus en détail dans les rubriques qui suivent.

## Familles de produits consolidées
La version 2 des API introduit les concepts de famille de produits et de type d'utilisation. Les familles de produits sont des groupes rassemblant un ou plusieurs types d'utilisation. Les types d'utilisation sont des mesures d'utilisation pour une organisation et une période données. L'ensemble initial de familles de produits est en grande partie aligné sur la version 1 des API ; vous trouverez ci-dessous le mappage complet. Une famille de produits spéciale `all` regroupe également les types d'utilisation de toutes les autres familles de produits.

Familles et types d'utilisation :
- **all**
    * _Contient toutes les autres familles de produits_
- **analyzed_logs**
    * `analyzed_logs`
- **application_security**
    * `app_sec_host_count`
- **audit_trail**
    * `enabled`
- **serverless**
    * `func_count`
    * `invocations_sum`
- **ci_app**
    * `ci_pipeline_indexed_spans`
    * `ci_test_indexed_spans`
    * `ci_visibility_pipeline_committers`
    * `ci_visibility_test_committers`
- **cloud_cost_management**
    * `host_count`
- **cspm**
    * `aas_host_count`
    * `azure_host_count`
    * `compliance_host_count`
    * `container_count`
    * `host_count`
- **cws**
    * `cws_container_count`
    * `cws_host_count`
- **dbm**
    * `dbm_host_count`
    * `dbm_queries_count`
- **fargate**
    * `avg_profiled_fargate_tasks`
    * `tasks_count`
- **infra_hosts**
    * `agent_host_count`
    * `alibaba_host_count`
    * `apm_azure_app_service_host_count`
    * `apm_host_count`
    * `aws_host_count`
    * `azure_host_count`
    * `container_count`
    * `gcp_host_count`
    * `heroku_host_count`
    * `host_count`
    * `infra_azure_app_service`
    * `opentelemetry_host_count`
    * `vsphere_host_count`
- **incident_management**
    * `monthly_active_users`
- **indexed_logs**
    * `logs_indexed_events_3_day_count`
    * `logs_live_indexed_events_3_day_count`
    * `logs_rehydrated_indexed_events_3_day_count`
    * `logs_indexed_events_7_day_count`
    * `logs_live_indexed_events_7_day_count`
    * `logs_rehydrated_indexed_events_7_day_count`
    * `logs_indexed_events_15_day_count`
    * `logs_live_indexed_events_15_day_count`
    * `logs_rehydrated_indexed_events_15_day_count`
    * `logs_indexed_events_30_day_count`
    * `logs_live_indexed_events_30_day_count`
    * `logs_rehydrated_indexed_events_30_day_count`
    * `logs_indexed_events_45_day_count`
    * `logs_live_indexed_events_45_day_count`
    * `logs_rehydrated_indexed_events_45_day_count`
    * `logs_indexed_events_60_day_count`
    * `logs_live_indexed_events_60_day_count`
    * `logs_rehydrated_indexed_events_60_day_count`
    * `logs_indexed_events_90_day_count`
    * `logs_live_indexed_events_90_day_count`
    * `logs_rehydrated_indexed_events_90_day_count`
    * `logs_indexed_events_180_day_count`
    * `logs_live_indexed_events_180_day_count`
    * `logs_rehydrated_indexed_events_180_day_count`
    * `logs_indexed_events_360_day_count`
    * `logs_live_indexed_events_360_day_count`
    * `logs_rehydrated_indexed_events_360_day_count`
    * `logs_indexed_events_custom_day_count`
    * `logs_live_indexed_events_custom_day_count`
    * `logs_rehydrated_indexed_events_custom_day_count`
- **indexed_spans**
    * `indexed_events_count`
    * `ingested_spans`
    * `ingested_events_bytes`
- **iot**
    * `iot_device_count`
- **lambda_traced_invocations**
    * `lambda_traced_invocations_count`
- **logs**
    * `billable_ingested_bytes`
    * `indexed_events_count`
    * `ingested_events_bytes`
    * `logs_forwarding_events_bytes`
    * `logs_live_indexed_count`
    * `logs_live_ingested_bytes`
    * `logs_rehydrated_indexed_count`
    * `logs_rehydrated_ingested_bytes`
- **network_flows**
    * `indexed_events_count`
- **network_hosts**
    * `host_count`
- **observability_pipelines**
    * `observability_pipelines_bytes_processed`
- **online_archive**
    * `online_archive_events_count`
- **profiling**
    * `avg_container_agent_count`
    * `host_count`
- **rum**
    * `browser_rum_units`
    * `mobile_rum_units`
    * `rum_units`
- **rum_browser_sessions**
    * `replay_session_count`
    * `session_count`
- **rum_mobile_sessions**
    * `session_count`
    * `session_count_android`
    * `session_count_ios`
    * `session_count_reactnative`
    * `session_count_flutter`
- **sds**
    * `logs_scanned_bytes`
    * `total_scanned_bytes`
- **snmp**
    * `snmp_devices`
- **synthetics_api**
    * `check_calls_count`
- **synthetics_browser**
    * `browser_check_calls_count`
- **timeseries**
    * `num_custom_input_timeseries`
    * `num_custom_output_timeseries`
    * `num_custom_timeseries`


Cette liste indique comment les familles et les types d'utilisation ci-dessus sont mappés aux endpoints d'utilisation horaire de la version 1. Le type d'utilisation et le point de données sont identiques, sauf mention contraire :

ENDPOINT | FAMILLE DE PRODUITS
`<url_de_base>/api/v1/usage/hosts` | infra_hosts
: `agent_host_count`
: `alibaba_host_count`
: `apm_azure_app_service_host_count`
: `apm_host_count`
: `aws_host_count`
: `azure_host_count`
: `container_count`
: `gcp_host_count`
: `heroku_host_count`
: `host_count`
: `infra_azure_app_service`
: `opentelemetry_host_count`
: `vsphere_host_count`

`<url_de_base>/api/v1/usage/logs` | logs
: `billable_ingested_bytes`
: `indexed_events_count`
: `ingested_events_bytes`
: `logs_live_indexed_count`
: `logs_live_ingested_bytes`
: `logs_rehydrated_indexed_count`
: `logs_rehydrated_ingested_bytes`

`<url_de_base>/api/v1/usage/timeseries` | timeseries
: `num_custom_input_timeseries`
: `num_custom_output_timeseries`
: `num_custom_timeseries`

`<url_de_base>/api/v1/usage/indexed-spans` | indexed_spans
: `indexed_events_count`

`<url_de_base>/api/v1/usage/synthetics`
: Obsolète. Voir synthetics_api et synthetics_browser pour l'utilisation de Synthetic.

`<url_de_base>/api/v1/usage/synthetics_api` | synthetics_api
: `check_calls_count`

`<url_de_base>/api/v1/usage/synthetics_browser` | synthetics_browser
: `browser_check_calls_count`

`<url_de_base>/api/v1/usage/fargate` | fargate
: `avg_profiled_fargate_tasks`
: `tasks_count`

`<url_de_base>/api/v1/usage/aws_lambda` | serverless
: `func_count`
: `invocations_sum`

`<url_de_base>/api/v1/usage/rum_sessions?type=browser` | rum_browser_sessions
: `replay_session_count`
: `session_count`

`<url_de_base>/api/v1/usage/rum_sessions?type=mobile` | rum_mobile_sessions
: `session_count`
: `session_count_android`
: `session_count_ios`
: `session_count_reactnative`

`<url_de_base>/api/v1/usage/network_hosts` | network_hosts
: `host_count`

`<url_de_base>/api/v1/usage/network_flows` | network_flows
: `indexed_events_count`

`<url_de_base>/api/v1/usage/logs-by-retention` | indexed_logs
: **Remarque :** le type d'utilisation et le point de données sont distincts pour cette URL, car la valeur de rétention est incluse dans le type d'utilisation.
: **Type d'utilisation :** `logs_indexed_events_<rétention>_count` **Point de données :** `indexed_events_count`
: **Type d'utilisation :** `logs_live_indexed_events_<rétention>_count` **Point de données :** `live_indexed_events_count`
: **Type d'utilisation :** `logs_rehydrated_indexed_events_<rétention>_count` **Point de données :** `rehydrated_indexed_events_count`
: **Type d'utilisation :** dans `usage_type`, remplacez `<rétention>` par l'une de ces valeurs : `3_day`, `7_day`, `15_day`, `30_day`, `45_day`, `60_day`, `90_day`, `180_day`, `365_day` ou `custom` **Point de données :** `retention`

`<url_de_base>/api/v1/usage/analyzed_logs` | analyzed_logs
: `analyzed_logs`

`<url_de_base>/api/v1/usage/snmp` | snmp
: `snmp_devices`

`<url_de_base>/api/v1/usage/profiling` | profiling
: `host_count`

`<url_de_base>/api/v1/usage/ingested-spans` | ingested_spans
: `ingested_events_bytes` 

`<url_de_base>/api/v1/usage/incident-management` | incident_management
: `monthly_active_users`

`<url_de_base>/api/v1/usage/iot` | iot
: `iot_device_count`

`<url_de_base>/api/v1/usage/cspm` | cspm
: `aas_host_count`
: `azure_host_count`
: `compliance_host_count`
: `container_count`
: `host_count`

`<url_de_base>/api/v1/usage/audit_logs` | audit_logs
: `lines_indexed`

`<url_de_base>/api/v1/usage/cws` | cws
: `cws_container_count`
: `cws_host_count`

`<url_de_base>/api/v1/usage/dbm` | dbm
: `dbm_host_count`
: `dbm_queries_count`

`<url_de_base>/api/v1/usage/sds` | sds
: `logs_scanned_bytes`
: `total_scanned_bytes`

`<url_de_base>/api/v1/usage/rum` | rum
: `browser_rum_units`
: `mobile_rum_units`
: `rum_units`

`<url_de_base>/api/v1/usage/ci-app` | ci_app
: `ci_pipeline_indexed_spans`
: `ci_test_indexed_spans`
: `ci_visibility_pipeline_committers`
: `ci_visibility_test_committers`

`<url_de_base>/api/v1/usage/online-archive` | online_archive
: `online_archive_events_count`

`<url_de_base>/api/v2/usage/lambda_traced_invocations` | lambda_traced_invocations
: `lambda_traced_invocations_count`

`<url_de_base>/api/v2/usage/application_security` | application_security
: `app_sec_host_count`

`<url_de_base>/api/v2/usage/observability_pipelines` | observability_pipelines
: `observability_pipelines_bytes_processed`

## Format conforme à la spécification JSON:API

Le corps des réponses et les noms des paramètres sont conformes à la [spécification JSON:API][1]. Toutes les données disponibles avec la version 1 des API le sont toujours. L'exemple ci-dessous illustre le mappage de l'API Hosts v1 avec l'API d'utilisation horaire v2.

### API v1 : [Récupérer l'utilisation horaire pour les hosts et conteneurs][2]

#### Requête

`https://api.datadoghq.com/api/v1/usage/hosts?start_hr=2022-06-01T00&end_hr=2022-06-01T01`

##### Remarques

* Le produit est un élément du chemin `hosts`.
* Les limites horaires sont contrôlées par les paramètres `start_hr` et `end_hr`.

#### Réponse

```json
{
  "usage": [
    {
      "agent_host_count": 1,
      "alibaba_host_count": 2,
      "apm_azure_app_service_host_count": 3,
      "apm_host_count": 4,
      "aws_host_count": 5,
      "azure_host_count": 6,
      "container_count": 7,
      "gcp_host_count": 8,
      "heroku_host_count": 9,
      "host_count": 10,
      "infra_azure_app_service": 11,
      "opentelemetry_host_count": 12,
      "vsphere_host_count": 13,
      "hour": "2022-06-01T00",
      "org_name": "Customer Inc",
      "public_id": "abc123"
    }
  ]
}
```

##### Remarques

* L'utilisation pour chaque heure est représentée sous la forme d'un objet dans le tableau d'utilisation.
* Les types d'utilisation sont représentés par des clés dans l'objet, et l'utilisation mesurée pour ces types d'utilisation est indiquée par les valeurs correspondantes.
* L'objet contient également des champs pour l'heure, le nom de l'organisation et l'ID public.

### API v2 : Récupérer l'utilisation horaire par famille de produits

#### Requête

`https://api.datadoghq.com/api/v2/usage/hourly_usage?filter[timestamp][start]=2022-06-01T00&filter[timestamp][end]=2022-06-01T01&filter[product_families]=infra_hosts`

##### Remarques

* Le produit est transmis sous la forme d'un paramètre de requête, à savoir `filter[product_families]=infra_hosts`.
* Les limites horaires sont contrôlées par les paramètres `filter[timestamp][start]` et `filter[timestamp][end]`.

#### Réponse

```json
{
  "data": [
    {
      "attributes": {
        "org_name": "Customer Inc",
        "public_id": "abc123",
        "timestamp": "2022-06-01T00:00:00+00:00",
        "region": "us",
        "measurements": [
          {
            "usage_type": "agent_host_count",
            "value": 1
          },
          {
            "usage_type": "alibaba_host_count",
            "value": 2
          },
          {
            "usage_type": "apm_azure_app_service_host_count",
            "value": 3
          },
          {
            "usage_type": "apm_host_count",
            "value": 4
          },
          {
            "usage_type": "aws_host_count",
            "value": 5
          },
          {
            "usage_type": "azure_host_count",
            "value": 6
          },
          {
            "usage_type": "container_count",
            "value": 7
          },
          {
            "usage_type": "gcp_host_count",
            "value": 8
          },
          {
            "usage_type": "heroku_host_count",
            "value": 9
          },
          {
            "usage_type": "host_count",
            "value": 10
          },
          {
            "usage_type": "infra_azure_app_service",
            "value": 11
          },
          {
            "usage_type": "opentelemetry_host_count",
            "value": 12
          },
          {
            "usage_type": "vsphere_host_count",
            "value": 13
          }
        ],
        "product_family": "infra_hosts"
      },
      "type": "usage_timeseries",
      "id": "ec3e0318b98d15c2ae8125e8bda0ff487cd08d80b120fb340c9322ee16f28629"
    }
  ]
}
```

#### Remarques

* Les objets du tableau de données représentent l'utilisation horaire pour chaque produit et chaque organisation.
    * Avec la version 1, les API ne prenaient en charge qu'un produit ou qu'une organisation par requête.
* Les mesures d'utilisation sont représentées dans le tableau `measurements` imbriqué.
* Les objets de mesure d'utilisation contiennent les champs `usage_type` et `value`.
* L'objet `attributes` contient également les champs `hour`, `org_name` et `public_id`.

## Pagination

Les API d'utilisation horaire v2 sont paginées. Les réponses sont limitées à 500 pages, chacune d'elles contenant les données d'utilisation d'une seule famille de produits, pour une heure et une organisation. La pagination permet aux API de prendre en charge d'autres fonctionnalités, comme l'intégration de plusieurs produits par requête, l'intégration de plusieurs organisations par requête et des plages horaires illimitées.

Si le nombre de pages d'un résultat est supérieur à cette limite, l'ID d'enregistrement de la page suivante est renvoyé dans le champ `meta.pagination.next_record_id`. Les clients doivent alors transmettre cet ID via le paramètre `pagination[next_record_id]`. Il n'y a aucune page supplémentaire à récupérer si le champ `meta.pagination.next_record_id` n'est pas défini.

### Exemple de code
```
response := GetHourlyUsage(start_time, end_time, product_families)
cursor := response.metadata.pagination.next_record_id
WHILE cursor != null BEGIN
sleep(5 seconds)  # Éviter d'atteindre la limite de débit
response := GetHourlyUsage(start_time, end_time, product_families, next_record_id=cursor)
cursor := response.metadata.pagination.next_record_id
END
```

## Réponses pour plusieurs organisations

La version 2 des API prend en charge la récupération des données d'utilisation de toutes vos organisations enfant dans toutes les régions à l'aide d'une même requête. Utilisez le paramètre `filter[include_descendants]` pour récupérer les données des organisations enfant.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonapi.org/format/
[2]: /fr/api/latest/usage-metering/#get-hourly-usage-for-hosts-and-containers