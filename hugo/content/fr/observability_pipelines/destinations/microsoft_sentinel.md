---
description: Apprenez à envoyer des logs à Microsoft Sentinel à l'aide de l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Microsoft Sentinel
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Microsoft Sentinel d'Observability Pipelines pour envoyer des logs à Microsoft Sentinel. Consultez [API d'ingestion de logs][3] pour connaître les limites d'appel d'API dans Microsoft Sentinel.

## Prérequis {#prerequisites}

Pour configurer la destination Microsoft Sentinel, vous devez créer un espace de travail dans Azure si ce n'est pas déjà fait. Dans cet espace de travail :
1. [Ajouter Microsoft Sentinel][6] à l'espace de travail.
1. [Créer un endpoint de collecte de données (DCE)][7].
1. [Créer un espace de travail Log Analytics][8] dans l'espace de travail si ce n'est pas déjà fait.
1. Suivez les instructions correspondant au type de tableau vers lequel vous souhaitez envoyer des données.
{{< tabs >}}
{{% tab "Tableau Azure" %}}
1. Créez un fichier JSON pour les paramètres de votre règle de collecte de données (DCR). Consultez [Règle de collecte de données (DCR)][1] pour plus d'informations et [Tableaux Azure pris en charge][7] pour connaître tous les tableaux disponibles vers lesquels vous pouvez envoyer des données.
    - Dans la propriété `streamDeclarations`, vous devez lister tous les champs de log que vous souhaitez mapper à la colonne du tableau Azure correspondante. Consultez [Déclarations de flux][2] pour plus d'informations.
    - Dans la propriété `transformKql`, vous devez lister tous les champs du log qui sont supprimés et non mappés au tableau. Consultez [Propriétés du flux de données][3] pour plus d'informations.
    - **Remarque** : Chaque champ de log doit être listé dans l'une de ces propriétés : soit `streamDeclarations`, soit `transformKql` ; sinon, le log est supprimé. Consultez [Surveiller la collecte de données DCR dans Azure Monitor][4] pour savoir comment configurer une alerte lorsque des logs sont supprimés.
    - Par exemple, ce fichier JSON (`dcr-commonsecuritylog.json`) ajoute les champs de log à mapper au tableau [`CommonSecurityLog`][5] :
        ```bash
        {
            "location": "eastus",
            "kind": "Direct",
            "properties": {
            "dataCollectionEndpointId": "<DCE_RESOURCE_ID>",
            "streamDeclarations": {
                "Custom-CommonSecurityLog": {
                "columns": [
                    { "name": "TimeGenerated",      "type": "datetime" },
                    { "name": "DeviceVendor",       "type": "string"   },
                    { "name": "DeviceProduct",      "type": "string"   },
                    { "name": "DeviceVersion",      "type": "string"   },
                    { "name": "DeviceEventClassID", "type": "string"   },
                    { "name": "Activity",           "type": "string"   },
                    { "name": "LogSeverity",        "type": "string"   },
                    { "name": "SourceIP",           "type": "string"   },
                    { "name": "DestinationIP",      "type": "string"   },
                    { "name": "Message",            "type": "string"   },
                    { "name": "source_type",        "type": "string"   },
                    { "name": "path",               "type": "string"   },
                    { "name": "timestamp",          "type": "string"   }
                ]
                }
            },
            "destinations": {
                "logAnalytics": [
                {
                    "workspaceResourceId": "<WORKSPACE_RESOURCE_ID>",
                    "name": "LogAnalyticsDest"
                }
                ]
            },
            "dataFlows": [
                {
                "streams":      ["Custom-CommonSecurityLog"],
                "destinations": ["LogAnalyticsDest"],
                "transformKql": "source | project-away source_type, path, timestamp",
                "outputStream": "Microsoft-CommonSecurityLog"
                }
            ]
            }
            ```
    - Replace the placeholders:
        - `<DCE_RESOURCE_ID>` with the ID of the DCE resource you created in step 2. Run the [`az monitor data-collection endpoint show`][9] command to get the DCE resource ID. For example:
            ```
            az monitor data-collection endpoint show \
            --name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```
        - `<WORKSPACE_RESOURCE_ID>` with the ID of the Logs Analytics Workspace you created in step 3. Run the [`az monitor log-analytics workspace show`][10] command to get the Workspace resource ID. For example:
            ```
            az monitor log-analytics workspace show \
            --workspace-name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```

    - See [CommonSecurityLog Columns][6] for a full list of `commonsecuritylog` table columns.
1. Exécutez la commande [`az monitor data-collection rule create`][8] Azure CLI pour créer une DCR avec le fichier JSON que vous avez créé à l'étape précédente. Par exemple, avec le fichier d'exemple `dcr-commonsecuritylog.json` :
    ```bash
    az monitor data-collection rule create \
        --resource-group "myResourceGroup" \
        --location "eastus" \
        --name "myCollectionRule" \
        --subscription "mysubscription" \
        --rule-file "\path\to\json\dcr-commonsecuritylog.json"
    ```

[1]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#data-collection-rule-dcr
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#stream-declarations
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#data-flow-properties
[4]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-monitor
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog#columns
[7]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#supported-tables
[8]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/rule?view=azure-cli-latest#az-monitor-data-collection-rule-create
[9]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/endpoint?view=azure-cli-latest#az-monitor-data-collection-endpoint-show
[10]: https://learn.microsoft.com/en-us/cli/azure/monitor/log-analytics/workspace?view=azure-cli-latest#az-monitor-log-analytics-workspace-show

{{% /tab %}}
{{% tab "Tableau personnalisé" %}}
1. Dans l'espace de travail Log Analytics, accédez à **Settings** > **Tables**.
1. Cliquez sur **+ Créer**.
1. Définissez un tableau personnalisé (par exemple, `MyOPWLogs`).
    - **Remarques** : <br>- Une fois le tableau configuré, le préfixe `Custom-` et le suffixe `_CL` sont automatiquement ajoutés au nom du tableau. Par exemple, si vous avez défini le nom du tableau dans Azure comme étant `MyOPWLogs`, le nom complet du tableau est stocké sous la forme `Custom-MyOPWLogs_CL`. Vous devez utiliser le nom complet du tableau lorsque vous configurez la destination Microsoft Sentinel des Observability Pipelines.<br>- Le nom complet du tableau se trouve dans le JSON de ressource de la DCR sous `streamDeclarations`.
1. Sélectionnez **Nouveau log personnalisé (basé sur DCR)**.
1. Cliquez sur **Créer une nouvelle règle de collecte de données** et sélectionnez la DCE que vous avez créée précédemment.
1. Cliquez sur **Next**.
1. Téléchargez un exemple de log JSON. Pour cet exemple, le JSON suivant est utilisé pour le **Schéma et Transformation**, où `TimeGenerated` est requis :
    ```json
    {
        "TimeGenerated": "2024-07-22T11:47:51Z",
        "event": {}
    }
    ```
1. Cliquez sur **Créer**.
{{% /tab %}}
{{< /tabs >}}
1. Dans Azure, accédez à **Microsoft Entra ID**.
    1. Cliquez sur **Ajouter** > **Inscription d'application**.
    1. Cliquez sur **Créer**.
    1. Sur la page de présentation, cliquez sur **Informations d'identification du client : Ajouter un certificat ou un secret**.
    1. Cliquez sur **Nouveau secret client**.
    1. Entrez un nom pour le secret et cliquez sur **Ajouter**. **Remarque** : Assurez-vous de noter le secret client, qui est masqué après 10 minutes.
    1. Notez également l'**ID de locataire** et l'**ID client**. Vous avez besoin de ces informations, ainsi que du secret client, lorsque vous [configurez la destination Microsoft Sentinel pour Observability Pipelines](#set-up-the-destination-in-observability-pipelines).
1. Dans la page [Règles de collecte de données][9] du portail Azure, recherchez et sélectionnez la DCR que vous avez créée précédemment.
    1. Cliquez sur **Access Control (IAM)** dans la navigation de gauche.
    1. Cliquez sur **Ajouter** et sélectionnez **Ajouter une attribution de rôle**.
    1. Ajoutez le rôle **Éditeur de métriques de surveillance**.
    1. Sur la page Membres, sélectionnez **Utilisateur, groupe ou principal de service**.
    1. Cliquez sur **Sélectionner des membres** et recherchez l'application que vous avez créée lors de l'étape d'enregistrement de l'application.
    1. Cliquez sur **Vérifier + attribuer**. **Remarque** : Il peut s'écouler jusqu'à 10 minutes avant que la modification IAM ne prenne effet.

Le tableau ci-dessous résume les informations Azure et Microsoft Sentinel dont vous avez besoin lorsque vous [configurez la destination Microsoft Sentinel pour Observability Pipelines](#set-up-the-destination-in-observability-pipelines) :

| Nom                              | Description                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID d'application (client)            | L'ID client de l'application Azure Active Directory (AD). Voir [Enregistrer une application dans Microsoft Entra ID][4] pour plus d'informations.<br>**Exemple** : `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| ID de locataire              | L'ID de locataire Azure AD. Voir [Enregistrer une application dans Microsoft Entra ID][4] pour plus d'informations.<br>**Exemple** : `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Nom du tableau (flux)                | Le nom du flux qui correspond au tableau choisi lors de la configuration de la règle de collecte de données (DCR).  **Remarque** : Le nom complet du tableau se trouve dans le JSON de ressource de la DCR sous `streamDeclarations`. <br>**Exemple** : `Custom-MyOPWLogs_CL`                                                                                                          |
| ID immuable de la règle de collecte de données (DCR) | Il s'agit de l'ID immuable de la DCR où les routes de journalisation sont définies. Il s'agit de l'**ID immuable** affiché sur la page Vue d'ensemble de la DCR.<br>**Remarque** : Assurez-vous que le rôle Éditeur de métriques de surveillance est attribué dans les paramètres IAM de la DCR.<br>**Exemple** : `dcr-000a00a000a00000a000000aa000a0aa`<br>Voir [Règles de collecte de données (DCR) dans Azure Monitor][5] pour en savoir plus sur la création ou l'affichage des DCR. |


## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants du secret client Microsoft Sentinel et de l'endpoint de collecte de données. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination Microsoft Sentinel lorsque vous [configurez un pipeline][10]. Vous pouvez configurer un pipeline dans l'[UI][1], en utilisant l'[API][11], ou avec [Terraform][12]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Microsoft Sentinel dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre secret client Microsoft Sentinel. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'identifiant de votre endpoint de collecte de données Microsoft Sentinel. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Saisissez l'ID client de votre application, tel que `550e8400-e29b-41d4-a716-446655440000`.
1. Saisissez l'ID de répertoire de votre locataire, tel que `72f988bf-86f1-41af-91ab-2d7cd011db47`. Il s'agit de l'ID de locataire Azure AD.
1. Saisissez le nom complet du tableau vers lequel vous envoyez les logs. Un exemple de nom de tableau : `Custom-MyOPWLogs_CL`.
1. Saisissez l'ID immuable de la règle de collecte de données (DCR), tel que `dcr-000a00a000a00000a000000aa000a0aa`.

{{% observability_pipelines/secrets_env_var_note %}}

### Mise en tampon facultative {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant du secret client Microsoft Sentinel :
    - Fait référence à l'URL de l'endpoint DCE affichée en tant que **Logs Ingestion Endpoint** ou **Data Collection Endpoint** sur la page de présentation de la DCR. Un exemple d'URL : `https://<DCE-ID>.ingest.monitor.azure.com`.
	- L'identifiant par défaut est `DESTINATION_MICROSOFT_SENTINEL_CLIENT_SECRET`.
- Identifiant de l'endpoint de collecte de données Microsoft Sentinel :
    - Fait référence au secret client de l'application Azure AD, tel que `550e8400-e29b-41d4-a716-446655440000`.
	- L'identifiant par défaut est `DESTINATION_MICROSOFT_SENTINEL_DCE_URI`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Traitement par lots d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][2] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'attente (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/destinations/#event-batching
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[4]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview
[6]: https://portal.azure.com/#browse/microsoft.securityinsightsarg%2Fsentinel
[7]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionendpoints
[8]: https://portal.azure.com/#create/Microsoft.LogAnalyticsOMS
[9]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionrules
[10]: /fr/observability_pipelines/configuration/set_up_pipelines/
[11]: /fr/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline