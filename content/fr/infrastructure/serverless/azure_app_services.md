---
title: Extension Microsoft Azure App Services
kind: documentation
further_reading:
  - link: /integrations/azure_app_services/
    tag: Documentation
    text: Azure App Service
  - link: /integrations/azure_app_service_environment/
    tag: Documentation
    text: Environnement Azure App Service
---
{{< alert >}} Ce service est en version bêta publique. Si vous souhaitez nous faire part de vos remarques, <a href="/help">contactez l'assistance Datadog</a>. Lors de la période bêta, l'utilisation de cette extension ne fait l'objet d'aucune facturation.{{< /alert >}}

## Présentation

Microsoft Azure App Services est un groupe de ressources sans serveur qui vous permettent de créer et d'héberger des applications Web, des backends mobiles, des fonctions axées sur des événements, et des API RESTful sans gérer l'infrastructure. Ce groupe de ressources peut héberger des charges de travail de toutes tailles et offre des options de scaling automatique et de haute disponibilité.

Datadog propose des fonctionnalités de surveillance pour tous les types de ressources Azure App Services :

- Métriques Azure Monitor pour les [applications][1] et les [fonctions][2] via l'[intégration Azure][1]
- Possibilité d'envoyer des métriques custom via l'API
- Possibilité d'envoyer des logs via [Eventhub ou le stockage Blob][3]

## Extension Azure App Services

L'extension Datadog pour Azure App Services fournit des capacités de surveillance supplémentaires pour les [applications Web Azure][4]. Cette prise en charge inclut les éléments suivants :

- Tracing APM distribué complet via l'instrumentation automatique
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans
- Injection des `Trace_ID` dans les logs d'application

### Runtimes pris en charge

L'extension APM .NET Datadog prend en charge les runtimes .NET suivants (architectures x64 et x86) lorsqu'elle est exécutée dans des instances Windows (AAS ne prend pas encore en charge les extensions sous Linux). Pour en savoir plus sur les bibliothèques à instrumentation automatique, consultez la [documentation relative au traceur][5].

- .NET Framework 4.7 (AAS ne prend pas en charge les versions plus récentes)
- .NET Core 2.1
- .NET Core 2.2 (fin de la prise en charge Microsoft le 23/12/2019)
- .NET Core 3.0 (fin de la prise en charge Microsoft le 03/03/2020)
- .NET Core 3.1

## Installation

1. Ouvrez le [portail Azure][6] et accédez au tableau de bord de l'instance Azure App Services que vous souhaitez instrumenter avec Datadog.
2. Accédez à l'onglet Paramètres d'application de la page Configuration.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Page Configuration" >}}
3. Ajoutez votre clé d'API Datadog en tant que paramètre d'application appelé `DD_API_KEY` avec pour valeur votre [clé d'API Datadog][7].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="Page de la clé d'API" >}}
4. Si vous utilisez le site européen de Datadog (domaine datadoghq.eu), ajoutez un paramètre d'application `DD_SITE` avec pour valeur datadoghq.eu.
    Par défaut, l'extension envoie les données au site américain de Datadog (domaine datadoghq.com). Si vous utilisez le site américain, il n'y a donc aucun autre paramètre d'application requis.
5. Accédez à la page des extensions et cliquez sur **Ajouter**.
6. Sélectionnez l'extension APM Datadog.
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Extension Datadog" >}}
7. Acceptez les conditions, cliquez sur **OK** et attendez la fin de l'installation.
8. Redémarrez l'application principale : cliquez sur **Arrêter**, attendez l'arrêt complet, puis cliquez sur **Démarrer**.
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="Page pour l'arrêt et le redémarrage" >}}

## Logs et injection des ID de trace

Les logs pour Azure Web Apps peuvent être envoyés à Datadog via Eventhub en suivant les instructions décrites dans la [documentation dédiée à l'intégration Azure][8].

Une fois que vous avez configuré le pipeline de logging pour votre application, l'injection des ID de trace vous permet d'[associer vos logs à vos traces][9] dans Datadog. Pour activer cette fonction avec l'extension, ajoutez un paramètre d'application `DD_LOGS_INJECTION:true`.

**Remarque** : l'injection d'ID de trace se fait dans l'application, les logs d'application incluent donc les ID de trace. Les autres catégories de [logs de diagnostic disponibles avec Azure][10], comme les logs HTTP et les logs d'audit, n'incluent pas les ID de trace.

## Dépannage

### Erreurs 5XX

Si votre application commence à renvoyer des erreurs 5XX immédiatement après l'installation, essayez de réinstaller l'extension après l'arrêt complet de l'application. Procédez comme suit :

1. Arrêtez l'application.
2. Supprimez l'extension Datadog.
3. Réinstallez l'extension Datadog.
4. Redémarrez votre application.

Le fait de réinstaller l'extension après l'arrêt complet de l'application résout généralement le problème. Toutefois, si les erreurs 5XX persistent, cela peut être dû à un paramètre de debugging activé, qui peut ralentir le démarrage de votre application et ainsi entraîner une erreur 500. Essayez les solutions suivantes :

- Ajustez vos paramètres de logging et de debugging
- Optez pour un plan App Service supérieur

### Traces manquantes

Si vous ne recevez aucune trace ou seulement une partie d'entre elles, vérifiez que vous n'avez pas modifié les paramètres de port manuellement. Dans l'extension, l'Agent du traceur communique avec votre application pour identifier le bon port à utiliser pour le trafic externe. La modification des paramètres de port peut interférer avec ce processus, empêchant alors les traces d'être envoyées.

Besoin d'aide supplémentaire ? [Contactez l'assistance Datadog][11].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}





[1]: /fr/integrations/azure_app_services/
[2]: /fr/integrations/azure_functions/
[3]: /fr/integrations/azure/?tab=azurecliv20#log-collection
[4]: https://azure.microsoft.com/en-us/services/app-service/web/
[5]: /fr/tracing/setup/dotnet/
[6]: https://portal.azure.com
[7]: https://app.datadoghq.com/account/settings#api
[8]: /fr/integrations/azure/?tab=eventhub
[9]: /fr/tracing/connect_logs_and_traces/
[10]: https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs
[11]: /fr/help/