---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guide
  text: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
    de données
title: Configuration manuelle du transfert de logs Azure
---
## Présentation {#overview}

Utilisez ce guide pour configurer manuellement le transfert de logs depuis Azure vers n'importe quel site Datadog.

**Remarque** : Pour collecter des logs à partir d'espaces de travail Azure Log Analytics, utilisez le processus [modèle ARM automatisé][1] ou [Azure Container App][2].

<div class="alert alert-info">
À partir du 2025-04-30, Azure ne prend plus en charge Node.js 18. Pour garantir la compatibilité, mettez à jour à l'aide du modèle Azure Resource Manager (ARM) avec les mêmes paramètres.
</div>

## Configuration {#setup}

Vous pouvez transférer vos logs via un compte [Azure Container App][4] ou [Azure Blob Storage][3].

{{< tabs >}}

{{% tab "Container App (recommandé)" %}}

1. Cliquez sur le bouton ci-dessous et remplissez le formulaire sur le portail Azure. Datadog déploie automatiquement les ressources Azure nécessaires pour transférer les logs vers votre compte Datadog.

[![Déployer sur Azure](https://aka.ms/deploytoazurebutton)][200]

2. Une fois le déploiement du modèle terminé, configurez les [paramètres de diagnostic][201] pour chaque source de logs afin d'envoyer les logs de la plateforme Azure (y compris les logs de ressources) vers le compte de stockage créé lors du déploiement.

**Remarque** : Les ressources ne peuvent être diffusées que vers un compte de stockage situé dans la même région Azure.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

1. Si vous n'avez pas encore configuré [Azure Blob Storage][100], utilisez l'une des méthodes suivantes pour commencer :
   - [Azure portal][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. Configurez la fonction Datadog-Azure pour transférer les logs depuis Blob Storage en suivant les instructions ci-dessous.
3. Configurez vos Azure App Services pour [transférer leurs logs vers Blob Storage][105].

##### Créez une Function App {#create-a-function-app}

Si vous avez déjà une Function App configurée à cet effet, passez à [Ajoutez une nouvelle fonction à votre Function App en utilisant le modèle de déclencheur Event Hub](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. Dans le portail Azure, accédez à la [Function App overview][106] et cliquez sur {{< ui >}}Create{{< /ui >}}.
2. Dans la section {{< ui >}}Instance Details{{< /ui >}}, configurez les paramètres suivants :
   1. Sélectionnez le bouton radio {{< ui >}}Code{{< /ui >}}.
   1. Pour {{< ui >}}Runtime stack{{< /ui >}}, sélectionnez `Node.js`.
   1. Pour {{< ui >}}Version{{< /ui >}}, sélectionnez `18 LTS`.
   1. Pour {{< ui >}}Operating System{{< /ui >}}, sélectionnez `Windows`.
3. Configurez les autres paramètres selon vos besoins.
4. Cliquez sur {{< ui >}}Review + create{{< /ui >}} pour valider la ressource. Si la validation réussit, cliquez sur {{< ui >}}Create{{< /ui >}}.

##### Ajoutez une nouvelle fonction à votre Function App en utilisant le modèle de déclencheur Azure Blob Storage {#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template}

1. Sélectionnez votre nouvelle ou existante Function App depuis la [Function App overview][106].
2. Sous l'onglet {{< ui >}}Functions{{< /ui >}}, cliquez sur {{< ui >}}Create{{< /ui >}}.
3. Pour le champ {{< ui >}}Development environment{{< /ui >}}, sélectionnez {{< ui >}}Develop in portal{{< /ui >}}.
4. Sous {{< ui >}}Select a template{{< /ui >}}, choisissez [Azure Blob storage trigger][107].
5. Sélectionnez votre {{< ui >}}Storage account connection{{< /ui >}}.
   **Remarque** : Consultez [Configurer une chaîne de connexion pour un compte de stockage Azure][108] pour plus d'informations.
6. Cliquez sur {{< ui >}}Create{{< /ui >}}.

Consultez [Bien démarrer avec Azure Functions][109] pour plus d'informations.

##### Pointez votre déclencheur Blob Storage vers Datadog {#point-your-blob-storage-trigger-to-datadog}

1. Sur la page de détails de votre fonction de déclenchement Event Hub, cliquez sur {{< ui >}}Code + Test{{< /ui >}} dans le menu latéral {{< ui >}}Developer{{< /ui >}}.
2. Ajoutez le [Datadog-Azure Function code][110] au fichier `index.js` de la fonction.
3. Ajoutez votre clé d'API Datadog avec une variable d'environnement `DD_API_KEY`, ou copiez-la dans le code de la fonction en remplaçant `<DATADOG_API_KEY>` à la ligne 20.
4. Si vous n'utilisez pas le site Datadog US1, définissez votre [Datadog site][111] avec une variable d'environnement `DD_SITE` sous l'onglet de configuration de votre application de fonction, ou copiez le paramètre du site dans le code de la fonction à la ligne 21.
5. {{< ui >}}Save{{< /ui >}} la fonction.
6. Cliquez sur {{< ui >}}Integration{{< /ui >}} dans le menu latéral {{< ui >}}Developer{{< /ui >}}.
7. Cliquez sur {{< ui >}}Azure Blob Storage{{< /ui >}} sous {{< ui >}}Trigger and inputs{{< /ui >}}.
8. Définissez {{< ui >}}Blob Parameter Name{{< /ui >}} sur `blobContent` et cliquez sur {{< ui >}}Save{{< /ui >}}.
9. Vérifiez que votre configuration est correcte en consultant le [Datadog Log Explorer][112] pour voir les logs de cette ressource.


[100]: https://learn.microsoft.com/azure/storage/blobs/
[101]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[102]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[103]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[104]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[105]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[106]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[108]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[109]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[110]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[111]: https://docs.datadoghq.com/fr/getting_started/site/
[112]: https://app.datadoghq.com/logs
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/guide/azure-automated-log-forwarding/
[2]: /fr/getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/