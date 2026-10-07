---
aliases:
- /fr/cloud_cost_management/custom
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Mieux comprendre votre facture AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentation
  text: Mieux comprendre votre facture Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Mieux comprendre votre facture Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
is_beta: true
private: true
title: Coûts personnalisés
---

{{< callout btn_hidden="true" header="Profitez de l'aperçu !">}}
Custom Costs est en aperçu.
{{< /callout >}}

## Présentation

Custom Costs vous permet de charger *n'importe quelle source de données de coûts* vers Datadog, afin que vous puissiez comprendre le coût total de vos services.

Custom Costs accepte les coûts dans des structures de fichiers prédéfinies (CSV ou JSON). Ces fichiers sont alignés sur la [spécification FinOps FOCUS][2], et vous pouvez [charger plusieurs fichiers dans l'un ou l'autre format](#creer-un-fichier-csv-ou-json-avec-les-champs-requis). Par exemple, vous pouvez charger un mélange de fichiers CSV ou JSON selon vos besoins avec 1 ligne ou plus (lignes pour CSV ou objets pour JSON).

Toutes les lignes doivent répondre aux exigences suivantes et inclure les [propriétés ci-dessous](#collecter-les-champs-requis) :

- Tous les noms de colonnes (CSV), noms de propriétés (JSON) et valeurs sont encodés en UTF-8.
- Tous les noms de colonnes requis (CSV) ou noms de propriétés (JSON) sont en [PascalCase][5]. Par exemple, vous devez utiliser `"ProviderName"`, pas `"providername"` ou `"ProviderNAME"`.
- Tous les noms de colonnes (CSV) et valeurs ou noms de propriétés (JSON) et valeurs ont un maximum de 1 000 caractères.
- Les valeurs de paramètre NULL ou vides ("") ne sont pas acceptées.

De plus, toutes les dates sont transformées en timestamps UTC. Par exemple, « 2024-01-01 » devient « 2024-01-01 00:00:00 ».

## Configuration

Pour utiliser Custom Costs dans Datadog, vous devez [configurer Cloud Cost Management][1] pour AWS, Azure, Google Cloud ou Oracle Cloud, même si vos coûts personnalisés ne sont liés à aucun de ces fournisseurs de cloud. Cette configuration est requise pour activer la fonctionnalité Custom Costs.

### Collecter les champs requis

| Paramètre | Rôle | Exemple valide | Exemple non valide | Exigences supplémentaires |
| ----------| -----------|----------| -----------|----------|
|`ProviderName` | Le service consommé. | Snowflake | "" ou NULL|  |
|`ChargeDescription` | Identifie l'aspect d'un service qui est facturé. | Database Costs | "" ou NULL|  |
|`ChargePeriodStart`| Jour de début d'un coût. | 2023-09-01| 2023-01-01 12:34:56| Formaté en AAAA-MM-JJ, où `ChargePeriodStart` <= `ChargePeriodEnd`.|
|`ChargePeriodEnd` | Dernier jour d'un coût (inclus).  | 2023-09-30 | 01/01/2023 | Formaté en AAAA-MM-JJ. |
|`BilledCost`| Le montant facturé. |10.00 |NaN | Décimal basé sur des nombres. |
|`BillingCurrency` | Devise du coût facturé. | USD| EUR | Doit être en USD. |

### Créer un fichier CSV ou JSON avec des champs obligatoires

Vous pouvez charger plusieurs fichiers CSV et JSON, dans l'un ou les deux formats. Assurez-vous de ne pas charger le même fichier deux fois, car le coût apparaîtra comme doublé dans le produit.

{{< tabs >}}
{{% tab "CSV" %}}

Les champs requis doivent apparaître en tant que colonnes dans votre CSV dans l'ordre indiqué ci-dessus. Vous devez utiliser une virgule (`,`) comme séparateur pour votre CSV.

Exemple de CSV valide :

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


Exemple de CSV non valide (`ChargePeriodStart` est listé avant `ChargeDescription`) :

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
        </tr>
    </tbody>
</table>


{{% /tab %}}
{{% tab "JSON" %}}

Les champs requis doivent apparaître dans tous les objets d'un fichier JSON respectant la [norme ECMA-404][101] et tous les objets doivent être encapsulés par un tableau.

Exemple de fichier JSON valide :

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD"
    }
]
```

Exemple de fichier JSON non valide :

```json
[
    {
        "providername": "Zoom",
        "chargedescription": "Video Usage",
        "chargeperiodstart": "2023-01-01",
        "chargeperiodend": "2023-12-31",
        "billedcost": 100.00,
        "billingcurrency": "USD"
    }
]
```

[101]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/

{{% /tab %}}
{{< /tabs >}}

### Ajouter des tags facultatifs

Vous pouvez éventuellement ajouter n'importe quel nombre de tags aux fichiers CSV ou JSON pour allouer les coûts *après* les champs requis en tant que colonnes supplémentaires.

{{< tabs >}}
{{% tab "CSV" %}}

Pour un fichier CSV, ajoutez une colonne par tag.

Exemple de fichier CSV valide :

<table>
    <thead>
        <tr>
            <th style="text-align:center;text-transform:none;">ProviderName</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodStart</th>
            <th style="text-align:center;text-transform:none;">ChargeDescription</th>
            <th style="text-align:center;text-transform:none;">ChargePeriodEnd</th>
            <th style="text-align:center;text-transform:none;">BilledCost</th>
            <th style="text-align:center;text-transform:none;">BillingCurrency</th>
            <th style="text-align:center;text-transform:none;">team</th>
            <th style="text-align:center;text-transform:none;">service</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center;text-transform:none;">GitHub</td>
            <td style="text-align:center;text-transform:none;">2023-01-01</td>
            <td style="text-align:center;text-transform:none;">User Costs</td>
            <td style="text-align:center;text-transform:none;">2023-01-31</td>
            <td style="text-align:center;text-transform:none;">300.00</td>
            <td style="text-align:center;text-transform:none;">USD</td>
            <td style="text-align:center;text-transform:none;">web</td>
            <td style="text-align:center;text-transform:none;">ops</td>
        </tr>
    </tbody>
</table>

</br>

Dans cet exemple, les colonnes `team` et `service` sont ajoutées après la colonne `BillingCurrency` et apparaissent en tant que tags sur ce coût.

{{% /tab %}}
{{% tab "JSON" %}}

Pour un fichier JSON, ajoutez une propriété d'objet `Tags` pour encapsuler tous les tags souhaités associés à ce coût.

Exemple de fichier JSON valide :

```json
[
    {
        "ProviderName": "Zoom",
        "ChargeDescription": "Video Usage",
        "ChargePeriodStart": "2023-01-01",
        "ChargePeriodEnd": "2023-12-31",
        "BilledCost": 100.00,
        "BillingCurrency": "USD",
        "Tags": {
            "team": "web",
            "service": "ops"
        }
    }
]
```

Dans cet exemple, une propriété d'objet `Tags` supplémentaire a été ajoutée avec deux paires clé-valeur pour allouer les tags `team` et `service` à ce coût.

{{% /tab %}}
{{< /tabs >}}

### Configurer Custom Costs

Une fois que vos données sont formatées selon les exigences ci-dessus, chargez vos fichiers CSV et JSON vers Cloud Cost Management sur la [page **Custom Costs Files**][3] ou par programmation en utilisant l'API.

Dans Datadog :

1. Accédez à [**Cloud Cost > Settings > Custom Costs**][3].
1. Cliquez sur le bouton **+ Upload Costs**.

   {{< img src="cloud_cost/upload_file.png" alt="Charger un fichier CSV ou JSON vers Datadog" style="width:80%" >}}

Pour envoyer un fichier par programmation, utilisez le endpoint d'API `PUT api/v2/cost/custom_costs`.

Par exemple, en utilisant cURL :

```curl
curl -L -X PUT "{{< region-param key="custom_costs_endpoint" >}}" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"
```

Pour envoyer le contenu du fichier par programmation, utilisez le endpoint `PUT api/v2/cost/custom_costs`.

Par exemple, en utilisant cURL :

```curl
curl -L -X PUT "{{< region-param key="custom_costs_endpoint" >}}" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '${file_content}'
```

Les données de coûts apparaissent dans Datadog après 24 heures.

## Types de métriques de coûts

Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût | Rôle |
| ----------| ----------------------------------|
| `custom.cost.amortized` | Coût total des ressources accumulées sur un intervalle. |
| `custom.cost.basis` | Coût total des ressources allouées au moment de l'utilisation sur un intervalle. |

Tous les coûts soumis à Custom Costs apparaissent dans ces métriques. Par exemple, si un achat de 4 $ a été effectué le 1er septembre, sur la période du 1er au 4 septembre, les coûts suivants sont attribués à chaque métrique :

| Jours | `custom.cost.basis` | `custom.cost.amortized` |
|---|---|---|
| 1er septembre | 4 $ | 1 $ |
| 2 septembre | - | 1 $ |
| 3 septembre | - | 1 $ |
| 4 septembre | - | 1 $ |

## Utiliser les données Custom Costs

Vous pouvez consulter les données de coûts personnalisés sur la [page **Cloud Cost Explorer**][6], le [Cloud Cost Tag Explorer][7], et dans les [dashboards][8], [notebooks][9] ou [monitors][10]. Vous pouvez également combiner les métriques Custom Cost avec d'autres métriques de coûts cloud ou métriques d'observabilité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/cloud_cost_management
[2]: https://focus.finops.org/#specification
[3]: https://app.datadoghq.com/cost/settings/cost-files
[4]: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/
[5]: https://en.wiktionary.org/wiki/Pascal_case
[6]: https://app.datadoghq.com/cost/explorer
[7]: https://app.datadoghq.com/cost/tags?cloud=custom
[8]: /fr/dashboards
[9]: /fr/notebooks
[10]: /fr/monitors/types/cloud_cost/