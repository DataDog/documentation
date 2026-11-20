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
  text: Obtenez des informations sur votre facture AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentation
  text: Obtenez des informations sur votre facture Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Obtenez des informations sur votre facture Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
is_beta: true
private: true
title: Custom Costs
---
## Présentation {#overview}

Custom Costs vous permet de téléverser *n'importe quelle source de données de coûts* vers Datadog afin de connaître le coût total de vos services.

Custom Costs accepte les coûts dans des structures de fichiers prédéfinies (CSV ou JSON). Ces fichiers sont alignés sur la [spécification FinOps FOCUS][2], et vous pouvez [téléverser plusieurs fichiers dans l'un ou l'autre format](#create-a-csv-or-json-file-with-required-fields). Par exemple, vous pouvez téléverser à votre convenance une combinaison de fichiers CSV et JSON contenant au moins un poste de coût (une ligne pour un fichier CSV ou un objet pour un fichier JSON).

Tous les postes de coût doivent répondre aux exigences suivantes et inclure les [propriétés ci-dessous](#collect-the-required-fields) :

- Tous les noms de colonnes (CSV), noms de propriétés (JSON) et valeurs sont encodés en UTF-8.
- Tous les noms de colonnes (CSV) ou noms de propriétés (JSON) requis sont en [PascalCase][5]. Par exemple, vous devez utiliser `"ProviderName"`, et non `"providername"` ou `"ProviderNAME"`.
- Tous les noms de colonnes (CSV) et valeurs ou noms de propriétés (JSON) et valeurs ont une longueur maximale de 1 000 caractères.
- Les valeurs de paramètres NULL ou vides ("") ne sont pas acceptées.
- Les données de coûts contenant des dates futures ne sont pas acceptées.

De plus, toutes les dates sont transformées en horodatages UTC. Par exemple, "2024-01-01" devient "2024-01-01 00:00:00".

## Configuration {#setup}

Pour utiliser Custom Costs dans Datadog, vous devez [configurer Cloud Cost Management][1] pour un fournisseur cloud (AWS, Azure, Google Cloud ou Oracle Cloud) ou un fournisseur SaaS, même si vos coûts personnalisés ne sont liés à aucun de ces fournisseurs. Cette configuration est nécessaire pour activer la fonctionnalité Custom Costs.

### Collectez les champs requis {#collect-the-required-fields}

| Paramètre | Description | Exemple valide | Exemple invalide | Exigences supplémentaires |
| ----------| -----------|----------| -----------|----------|
|`ProviderName` | Le service consommé. | Snowflake | "" ou NULL|  |
|`ChargeDescription` | Identifie l'aspect d'un service qui est facturé. | Database Costs | "" ou NULL|  |
|`ChargePeriodStart`| Jour de début d'une facturation. | 2023-09-01| 2023-01-01 12:34:56| Format YYYY-MM-DD, où `ChargePeriodStart` <= `ChargePeriodEnd`.|
|`ChargePeriodEnd` | Jour de fin d'une facturation (inclus).  | 2023-09-30 | 01/01/2023 | Format YYYY-MM-DD. |
|`BilledCost`| Le montant facturé. |10.00 |NaN | Nombre décimal. |
|`BillingCurrency` | Devise du coût facturé. | USD| EUR | Doit être USD. |

### Créez un fichier CSV ou JSON avec les champs requis {#create-a-csv-or-json-file-with-required-fields}

Vous pouvez téléverser plusieurs fichiers CSV et JSON, dans l'un ou l'autre des formats, ou les deux. Assurez-vous de ne pas téléverser deux fois le même fichier, car le coût apparaîtra en double dans le produit.

{{< tabs >}}
{{% tab "CSV" %}}

Les champs requis doivent apparaître sous forme de colonnes dans votre CSV dans l'ordre indiqué ci-dessus. Vous devez utiliser une virgule (`,`) comme séparateur pour votre CSV.

Exemple de CSV valide :

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


Exemple de CSV non valide (`ChargePeriodStart` est listé avant `ChargeDescription`) :

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

Les champs obligatoires doivent apparaître dans tous les objets d'un fichier JSON respectant la [norme ECMA-404][101] et tous les objets doivent être encapsulés dans un tableau.

Exemple de fichier JSON valide :

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

Exemple de fichier JSON non valide :

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

### Ajoutez des tags facultatifs {#add-optional-tags}

Vous pouvez éventuellement ajouter autant de tags que vous le souhaitez aux fichiers CSV ou JSON pour allouer les coûts *après* les champs obligatoires sous forme de colonnes supplémentaires.

{{< tabs >}}
{{% tab "CSV" %}}

Pour un fichier CSV, ajoutez une colonne par tag.

Exemple de fichier CSV valide :

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

Dans cet exemple, les colonnes `team` et `service` sont ajoutées après la colonne `BillingCurrency` et apparaissent sous forme de tags sur ce coût.

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

### Configurez Custom Costs {#configure-custom-costs}

Une fois vos données formatées selon les exigences ci-dessus, téléversez vos fichiers CSV et JSON dans Cloud Cost Management depuis la page [**Custom Costs Files**][3] ou par programmation à l'aide de l'API.

Dans Datadog :

1. Accédez à [**Cloud Cost > Settings > Custom Costs**][3].
1. Cliquez sur le bouton {{< ui >}}\+ Upload Costs{{< /ui >}}.

   {{< img src="cloud_cost/upload_file.png" alt="Téléverser un fichier CSV ou JSON vers Datadog" style="width:80%" >}}

Pour envoyer un fichier par programmation, utilisez l'endpoint d'API `PUT api/v2/cost/custom_costs`.

Par exemple, en utilisant cURL :

```curl
curl -L -X PUT "{{< region-param key="custom_costs_endpoint" >}}" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"
```

Pour envoyer le contenu du fichier par programmation, utilisez l'endpoint `PUT api/v2/cost/custom_costs`.

Par exemple, en utilisant cURL :

```curl
curl -L -X PUT "{{< region-param key="custom_costs_endpoint" >}}" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '${file_content}'
```

Les données de coût apparaissent dans Datadog après 24 heures.

### Marquez un fichier comme fichier de fournisseur d'IA {#mark-a-file-as-an-ai-provider-file}

Si un fichier contient des coûts provenant d'un fournisseur d'IA avec lequel Datadog ne s'intègre pas nativement, tel qu'une API de modèle ou une plateforme d'IA, marquez-le comme fichier de fournisseur d'IA. Ses coûts apparaissent alors sur la page [**AI Costs**][11] aux côtés de vos autres coûts d'IA.

Datadog ajoute les tags suivants aux lignes de facture provenant d'un fichier de fournisseur d'IA :

| Tag | Description |
| ----------| ----------------------------------|
| `custom_ai_provider` | Défini sur `true` pour les lignes de facture provenant d'un fichier personnalisé de fournisseur d'IA. |
| `ai_vendor` | Le nom normalisé du fournisseur d'IA, dérivé du `ProviderName` de la ligne de facture. Par exemple, `Alice Bob AI` devient `alice_bob_ai`. |

Vous pouvez marquer un fichier comme fichier de fournisseur d'IA lors de son importation, ou modifier ce paramètre ultérieurement. Lorsque vous modifiez ce paramètre, Datadog recalcule les coûts pour les mois couverts par le fichier.

Dans Datadog :

- Pour marquer un nouveau fichier : accédez à [**Cloud Cost > Settings > Custom Costs**][3] et cliquez sur {{< ui >}}\+ Upload Costs{{< /ui >}}. Activez {{< ui >}}AI provider{{< /ui >}} avant d'importer le fichier.
- Pour modifier un fichier existant : dans la liste [**Custom Costs**][3], cliquez sur le fichier et activez ou désactivez {{< ui >}}AI provider{{< /ui >}}.

Pour marquer un fichier comme fichier de fournisseur d'IA par programmation, ajoutez le paramètre de requête `ai_provider=true` à l'endpoint `PUT api/v2/cost/custom_costs`.

Par exemple, en utilisant cURL :

```curl
curl -L -X PUT "{{< region-param key="custom_costs_endpoint" >}}?ai_provider=true" \
-H "Content-Type: multipart/form-data" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-F "file=${file};type=text/json"
```

Pour modifier le paramètre de fournisseur d'IA d'un fichier existant, utilisez l'endpoint [`PATCH api/v2/cost/custom_costs/{file_id}`][12]. Définissez `ai_provider` sur `false` pour retirer le marquage du fichier.
Vous pouvez obtenir le `file_id` à partir de la réponse d'importation ou de la liste des fichiers :
- Réponse d'importation : `data.id` de `PUT api/v2/cost/custom_costs`
- Liste de fichiers : `data[].id` de `GET api/v2/cost/custom_costs`

Par exemple, en utilisant cURL :

```curl
curl -L -X PATCH "{{< region-param key="custom_costs_endpoint" >}}/${file_id}" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{"data": {"type": "cost_metadata", "id": "'"${file_id}"'", "attributes": {"ai_provider": true}}}'
```

## Types de métriques de coût {#cost-metric-types}

Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût | Description |
| ----------| ----------------------------------|
| `custom.cost.amortized` | Coût total des ressources comptabilisé sur un intervalle. |
| `custom.cost.basis` | Coût total des ressources allouées au moment de l'utilisation sur un intervalle. |

Tous les coûts soumis à Custom Costs apparaissent dans ces métriques. Par exemple, si un achat de 4 $ a été effectué le 1er septembre, sur la période du 1er au 4 septembre, les coûts suivants sont attribués à chaque métrique :

| Jours | `custom.cost.basis` | `custom.cost.amortized` |
|---|---|---|
| 1er septembre | 4 $ | 1 $ |
| 2 septembre | - | 1 $ |
| 3 septembre | - | 1 $ |
| 4 septembre | - | 1 $ |

## Utilisez les données de Custom Costs {#use-custom-costs-data}

Vous pouvez consulter les données de coûts personnalisés sur la [page **Cloud Cost Explorer**][6], sur le [Cloud Cost Tag Explorer][7], et dans les [dashboards][8], [notebooks][9] ou [monitors][10]. Vous pouvez également combiner les métriques de Custom Cost avec d'autres métriques de coût cloud ou métriques d'observabilité.

Les coûts provenant des fichiers des fournisseurs d'IA apparaissent également sur la page [**AI Costs**][11]. Consultez la section [Marquez un fichier comme fichier de fournisseur d'IA](#mark-a-file-as-an-ai-provider-file).

## Pour aller plus loin {#further-reading}

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
[11]: https://app.datadoghq.com/cost/summarize/ai-costs
[12]: /fr/api/latest/cloud-cost-management/#update-custom-costs-file