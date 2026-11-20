---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Explorer les règles de détection par défaut de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentation
  text: Créer des règles de détection personnalisées
title: Guide de configuration Azure pour Cloud SIEM
---
## Présentation {#overview}

Cloud SIEM applique des règles de détection à tous les logs traités dans Datadog pour détecter les menaces, telles qu'une attaque ciblée, une adresse IP répertoriée par un service de renseignement sur les menaces qui communique avec vos systèmes, ou la modification non sécurisée d'une ressource. Les menaces sont présentées sous forme de Security Signals dans Security Signals Explorer pour le triage.

Ce guide vous accompagne dans la configuration de Microsoft Azure pour envoyer des logs à Datadog afin que vous puissiez commencer à détecter les menaces sur vos logs de la plateforme Azure.

<div class="alert alert-info">L'intégration Azure Native (disponible pour les clients sur le site US3 de Datadog) s'accompagne d'instructions différentes pour configurer la collecte des logs. Si vous utilisez l'intégration Azure Native, sélectionnez <strong>US3</strong> dans le menu déroulant Datadog Site et suivez les instructions dans <a href="https://docs.datadoghq.com/integrations/guide/azure-native-integration/#log-collection">Microsoft Azure log collection</a>. </div>

{{< tabs >}}
{{% tab "Installation automatisée" %}}

Cliquez sur le bouton ci-dessous et remplissez le formulaire sur Azure portal. Une fois le formulaire rempli, les ressources Azure nécessaires pour envoyer les logs d'activité vers votre compte Datadog sont déployées pour vous.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

1. Sélectionnez un groupe de ressources existant ou créez-en un nouveau.
1. Sélectionnez une région.
1. Sélectionnez **true** pour **Send Activity Logs**.
1. Saisissez votre clé d'API Datadog.
1. Saisissez les noms de vos ressources.
1. Cliquez sur {{< ui >}}Create + review{{< /ui >}}.
1. Une fois la validation réussie, cliquez sur {{< ui >}}Create{{< /ui >}}.

Une fois le déploiement réussi, accédez à [Log Explorer][1] et saisissez `service:azure` dans la requête de recherche pour afficher vos logs Azure.


[1]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Installation manuelle" %}}

Cette section vous présente les étapes d'installation manuelle pour envoyer les logs de la plateforme Azure à Datadog :

1. [Créer un groupe de ressources](#create-a-resource-group)
1. [Créer un espace de noms Event Hubs](#create-an-event-hubs-namespace)
1. [Créer un Event Hub Azure](#create-an-event-hub)
1. [Créer une Azure Function App](#create-an-azure-function-app)
1. [Ajouter une nouvelle fonction à votre Function App](#add-a-new-function-to-your-function-app)
1. [Transférer les logs des services Azure vers l'Event Hub](#forward-azure-services-logs-to-event-hub)

### Créer un groupe de ressources {#create-a-resource-group}

Si vous souhaitez utiliser un groupe de ressources existant, passez à Créer un espace de noms Event Hubs.

1. Accédez à la page [Azure Resource groups][1].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Entrez un nom pour le groupe de ressources.
1. Si vous le souhaitez, cliquez sur {{< ui >}}Next: Tags{{< /ui >}} pour ajouter des tags.
1. Cliquez sur {{< ui >}}Review + create{{< /ui >}}.
1. Une fois la validation réussie, cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer un espace de noms Event Hubs {#create-an-event-hubs-namespace}

1. Accédez à [Azure Event Hubs][2].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Dans le menu déroulant **Resource group**, sélectionnez le groupe de ressources auquel vous souhaitez ajouter l'Event Hub.
1. Entrez un nom pour l'espace de noms.
1. Sélectionnez un emplacement pour l'espace de noms.
     **Remarque** : L'Event Hub doit se trouver dans la même Location que la ressource à partir de laquelle vous souhaitez envoyer des logs. Pour les logs d'activité ou d'autres sources de logs à l'échelle du compte, vous pouvez choisir n'importe quelle région.
1. Sélectionnez un niveau tarifaire.
1. Laissez les unités de débit (pour le niveau standard) ou les unités de traitement (pour le niveau premium) telles quelles.
1. Cliquez sur {{< ui >}}Review + create{{< /ui >}}.
1. Une fois la validation réussie, cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Une fois le déploiement terminé avec succès, cliquez sur {{< ui >}}Go to resource{{< /ui >}}.

### Créer un Event Hub {#create-an-event-hub}

1. Dans l'espace de noms Event Hubs que vous venez de créer, cliquez sur {{< ui >}}\+ Event Hub{{< /ui >}}.
1. Entrez un nom pour l'Event Hub.
1. Configurez éventuellement le nombre de partitions et les options de conservation.
1. Cliquez sur {{< ui >}}Review + create{{< /ui >}}.
1. Une fois la validation réussie, cliquez sur {{< ui >}}Create{{< /ui >}}.

### Créer une Azure Function App {#create-an-azure-function-app}
Créez une nouvelle Function App. Si vous utilisez une Function App existante, passez à Ajouter une nouvelle fonction à votre Function App.

1. Accédez à [Function App][3].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Sélectionnez un groupe de ressources pour la Function App.
1. Entrez un nom pour la Function App.
1. Conservez l'option de déploiement sous forme de code.
1. Dans le menu déroulant **Runtime stack**, sélectionnez {{< ui >}}Node.js{{< /ui >}}.
1. Sélectionnez une région pour votre Function App.
1. Sélectionnez un système d'exploitation et un type de plan.
1. Cliquez sur {{< ui >}}Next: Storage{{< /ui >}}.
1. Sélectionnez un compte de stockage dans le menu déroulant.
1. Cliquez sur {{< ui >}}Review + create{{< /ui >}}.
1. Une fois la validation réussie, cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Une fois le déploiement terminé avec succès, cliquez sur {{< ui >}}Create a function{{< /ui >}}.

### Ajouter une nouvelle fonction à votre Function App {#add-a-new-function-to-your-function-app}

1. Accédez à la Function App si vous en utilisez déjà une. Cliquez sur {{< ui >}}Functions{{< /ui >}} dans le menu de gauche.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Sélectionnez {{< ui >}}Azure Event Hub trigger{{< /ui >}}.
1. Saisissez un nom pour la nouvelle fonction.
1. Dans **Event Hub connection**, cliquez sur {{< ui >}}New{{< /ui >}}.
1. Dans le menu déroulant **Event Hub connection**, sélectionnez l'Event Hub que vous avez créé précédemment.
1. Cliquez sur {{< ui >}}OK{{< /ui >}}.
1. Dans **Event Hub name**, saisissez le nom de l'Event Hub que vous avez créé précédemment.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

### Ajouter la fonction Azure de Datadog {#add-the-datadog-azure-function}

<br />**Remarque** : Les étapes décrites ci-dessous reposent sur Azure Functions Programming Model v3. Le dernier [code de fonction Azure][8] de Datadog a été mis à jour pour prendre en charge Azure Functions Programming Model v4. Si vous avez besoin de conseils sur le déploiement de la version compatible avec la v4 ou si vous avez des questions sur les différences entre la v3 et la v4, contactez le support technique de Datadog.

1. Dans la nouvelle fonction, sélectionnez {{< ui >}}Code + Test{{< /ui >}} dans le menu de gauche.
1. Copiez et collez le [code de fonction Datadog-Azure][4] dans votre fichier `index.js`.
1. Remplacez `<DATADOG_API_KEY>` par votre Datadog API à la ligne 22 du code de la fonction.
1. Si vous n'utilisez pas le site Datadog US1, remplacez `DD_SITE` par votre paramètre [site Datadog][5] à la ligne 23 du code de la fonction.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Cliquez sur {{< ui >}}Integrations{{< /ui >}} dans le menu de gauche.
1. Cliquez sur {{< ui >}}Azure Event Hubs{{< /ui >}}.
1. Définissez `Event parameter name` sur `eventHubMessages`.
1. `Event Hub Cardinality` doit être défini sur `Many`.
1. Définissez `Event Hub Data Type` sur vide.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Vérifiez que votre configuration est correcte en exécutant la fonction, puis en recherchant le message de test dans Log Explorer de Datadog. L'événement de log de test doit être au format JSON valide. Par exemple :
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Transférez les logs des services Azure vers Event Hub {#forward-azure-services-logs-to-event-hub}

#### Transférez les logs d'activité vers Event Hub {#forward-activity-logs-to-event-hub}

1. Accédez à [Azure Activity log][6].
1. Cliquez sur {{< ui >}}Export Activity Logs{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add diagnostic settings{{< /ui >}}.
1. Saisissez un nom pour le paramètre de diagnostic.
1. Sélectionnez les catégories de logs que vous souhaitez envoyer à Datadog.
1. Sélectionnez {{< ui >}}Stream to an event hub{{< /ui >}}.
1. Sélectionnez l'espace de noms Event Hub créé précédemment.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Transférez les logs de ressources vers Event Hub {#forward-resource-logs-to-event-hub}

1. Accédez à la ressource à partir de laquelle vous souhaitez envoyer des logs de ressources.
1. Sous **Monitor** dans le menu de gauche, cliquez sur {{< ui >}}Diagnostic settings{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add diagnostic setting{{< /ui >}}.
1. Saisissez un nom pour le paramètre de diagnostic.
1. Sélectionnez {{< ui >}}allLogs{{< /ui >}}.
1. Dans la section **Destination details**, sélectionnez {{< ui >}}Stream to an event hub{{< /ui >}}.
1. Sélectionnez l'espace de noms Event Hub créé précédemment.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Accédez à [Log Explorer][7] et entrez `service:azure` dans la requête de recherche pour afficher vos logs Azure.

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/aws-dd-forwarder-4.5.0/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/fr/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js

{{% /tab %}}
{{< /tabs >}}

## Utilisez Cloud SIEM pour trier les Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM applique des règles de détection prêtes à l'emploi à tous les logs traités, y compris les logs de la plateforme Azure que vous venez de configurer. Lorsqu'une règle de détection détecte une menace, un Security Signal est généré et peut être consulté dans Security Signals Explorer.

- Accédez à Cloud SIEM Signals Explorer pour afficher les menaces et effectuer leur triage. Consultez Security Signals Explorer pour plus de détails.
- Consultez les règles de détection prêtes à l'emploi qui sont appliquées à vos logs.
- Créez de nouvelles règles pour détecter les menaces qui correspondent à votre cas d'utilisation spécifique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}