---
description: Configurez le traçage et le transfert de journaux pour Azure Logic Apps
  à l'aide du service Datadog Azure Automated Log Forwarding et des filtres de rétention
  APM optionnels.
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Intégration Azure
- link: /logs/guide/azure-automated-log-forwarding/
  tag: Documentation
  text: Azure Automated Log Forwarding
title: Installez Serverless Monitoring for Azure Logic Apps.
---
{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="Rejoignez la version préliminaire !">}}
Serverless Monitoring for Azure Logic Apps est en version préliminaire. Remplissez le formulaire pour demander l'accès.
{{< /callout >}}

Azure Logic Apps est un service entièrement géré, et le Datadog Agent ne peut pas être directement installé sur les Logic Apps. Cependant, Datadog peut surveiller les Logic Apps via les journaux de diagnostic Azure.

## Prérequis {#prerequisites}

- Le service [Azure Automated Log Forwarding][1] doit être installé

## Configuration {#setup}

### 1. Installez Datadog Azure Automated Log Forwarding {#1-install-datadog-azure-automated-log-forwarding}

Suivez les instructions du [guide Azure Automated Log Forwarding][1] pour installer le service et configurer les tags afin de filtrer les journaux des ressources souhaitées. Une fois installé, toutes les nouvelles Logic Apps auront automatiquement le transfert de journaux configuré pour envoyer les journaux de diagnostic à Datadog.

**Remarque** : Le service Azure Automated Log Forwarding crée un paramètre de diagnostic nommé `datadog_log_forwarding_<ID>` sur chaque Logic App. Ce paramètre capture les journaux d'exécution des workflows et les transfère à Datadog.

### Configurez les tags (optionnels mais recommandés) {#2-configure-tags-optional-but-recommended}

Ajoutez les tags `service` et `env` à vos Logic Apps pour organiser et filtrer vos workflows dans Datadog.

1. Dans le portail Azure, ouvrez votre Logic App
2. Accédez à la section {{< ui >}}Tags{{< /ui >}}
3. Ajoutez les tags suivants :
   - `env` : Le nom de l'environnement (par exemple, `dev`, `staging` ou `prod`)
   - `service` : Le nom du service pour votre Logic App

{{< img src="serverless/logic_apps/tags_configuration.png" alt="Configuration des tags Azure Logic App affichant les tags env et service" style="width:100%;" >}}

Le tag `env` est requis pour voir les traces dans Datadog et prend la valeur par défaut `dev` s'il n'est pas configuré. Le tag `service` prend par défaut le nom du workflow de la Logic App s'il n'est pas configuré.

### 3. Appelez le workflow {#3-invoke-the-workflow}

Après avoir configuré le transfert de journaux, appelez votre workflow Logic App quelques fois pour générer des données d'exécution.

### 4. Vérifiez les traces dans Datadog {#4-verify-traces-in-datadog}

Utilisez Live Search dans Datadog APM pour vérifier que les traces sont bien reçues :

1. Accédez à [APM > Traces][4] dans Datadog
2. Utilisez la requête `operation_name:azure.logicapps` pour filtrer les traces Logic Apps
3. Live Search renvoie tous les spans sans échantillonnage, vous devriez donc voir vos exécutions une fois terminées.

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Live Search de Datadog APM affichant les traces azure.logicapps" style="width:100%;" >}}

## Configuration supplémentaire {#additional-configuration}

### Ajoutez un retention filter pour les spans APM (recommandé).{#add-a-retention-filter-for-apm-spans-recommended}

Pour contrôler quelles traces sont conservées au-delà de la période de recherche en direct par défaut, ajoutez un retention filter :

1. Dans Datadog, recherchez {{< ui >}}Retention Filters{{< /ui >}} (utilisez Cmd+K et tapez « retention filters »)
2. Cliquez sur {{< ui >}}Add Retention Filter{{< /ui >}}
3. Définissez la requête de filtre sur `operation_name:azure.logicapps`
4. Ajoutez des filtres supplémentaires pour votre service, tels que `service:<SERVICE_NAME>` et `env:<ENV_NAME>`
5. Configurez le taux de rétention en fonction de vos besoins

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Recherchez les filtres de rétention dans Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="Configurez le retention filter avec la requête operation_name:azure.logicapps" style="width:100%;" >}}

L'ajout de tags de service et d'environnement à votre retention filter permet de réduire les coûts en ne conservant que les traces des environnements et services importants.

Consultez [Trace Retention][5] pour plus d'informations.

### Ajoutez un index de logs (recommandé) {#add-a-log-index-recommended}

Pour permettre la recherche et l'analyse des logs historiques de Logic Apps, créez un index de logs dédié :

1. Dans Datadog, recherchez {{< ui >}}Indexes{{< /ui >}} (utilisez Cmd+K et tapez « index »)
2. Accédez à {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}Indexes{{< /ui >}}
3. Cliquez sur {{< ui >}}New Index{{< /ui >}}
4. Définissez le filtre sur `@properties.resource.workflowId:*`
5. Configurez le nom de l'index et les paramètres de rétention

{{< img src="serverless/logic_apps/log_index_search.png" alt="Recherchez les index de logs dans Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="Configurez l'index de logs avec le filtre workflowId" style="width:100%;" >}}

{{% serverless/log_to_trace_indexing_note %}}

Consultez [Log Indexes][6] pour plus d'informations.

## Visualisez vos traces Logic App dans Datadog {#see-your-logic-app-traces-in-datadog}

Après avoir appelé votre Logic App :

1. Dans Datadog, accédez à [{{< ui >}}APM > Traces{{< /ui >}}][4].
2. Sélectionnez {{< ui >}}Live Search{{< /ui >}} dans le coin supérieur droit.
3. Recherchez `operation_name:azure.logicapps` pour trouver vos traces.

Si vous ne parvenez pas à voir vos traces, consultez [Dépannage][7].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/guide/azure-automated-log-forwarding/
[3]: /fr/integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /fr/tracing/trace_pipeline/trace_retention/
[6]: /fr/logs/log_configuration/indexes/
[7]: /fr/serverless/logic_apps/troubleshooting