---
description: Diagnostiquez les traces et les logs manquants pour la surveillance d'Azure
  Logic Apps en vérifiant les paramètres de diagnostic, le transfert de journaux et
  la génération de spans APM dans Datadog.
title: Dépannage de la Serverless Monitoring pour Azure Logic Apps
---
## Je ne vois aucune trace {#i-cannot-see-any-traces}

Suivez ces étapes pour diagnostiquer pourquoi les traces n'apparaissent pas dans Datadog :

### 1. Vérifiez que les paramètres de diagnostic sont configurés {#1-verify-that-diagnostic-settings-are-configured}

Vérifiez que la Logic App dispose du paramètre de diagnostic requis :

1. Dans le portail Azure, ouvrez votre Logic App
2. Accédez à {{< ui >}}Diagnostic settings{{< /ui >}} dans le menu de gauche
3. Vérifiez qu'un paramètre de diagnostic nommé `datadog_log_forwarding_<ID>` existe

{{< img src="serverless/logic_apps/diagnostic_settings.png" alt="Paramètres de diagnostic de la Logic App Azure affichant la configuration datadog_log_forwarding" style="width:100%;" >}}

Ce paramètre est automatiquement créé par le service [Datadog Azure Automated Log Forwarding][1]. S'il est manquant, vérifiez que vous avez correctement installé le service Azure Automated Log Forwarding.

### 2. Vérifiez que les journaux Logic Apps sont dans Datadog {#2-verify-that-logic-apps-logs-are-in-datadog}

Vérifiez que les journaux sont transférés vers Datadog :

1. Dans Datadog, accédez à [{{< ui >}}Logs > Live Tail{{< /ui >}}][2]
2. Recherchez `@properties.resource.workflowId:*`
3. Déclenchez votre workflow Logic App quelques fois si nécessaire

Si vous ne voyez aucun journal :
- Vérifiez que le service Azure Automated Log Forwarding est correctement configuré

### 3. Vérifiez que les spans APM existent {#3-verify-that-apm-spans-exist}

Vérifiez que les traces sont générées à partir des logs :

1. Dans Datadog, accédez à [{{< ui >}}APM > Traces{{< /ui >}}][3]
2. Sélectionnez {{< ui >}}Live Search{{< /ui >}} dans le coin supérieur droit
3. Recherchez `operation_name:azure.logicapps`

Si vous voyez des logs mais aucune trace, attendez quelques minutes que les logs soient traités et que les traces soient générées.

## Conseils de dépannage supplémentaires {#additional-troubleshooting-tips}

### Les logs n'apparaissent pas dans Datadog {#logs-are-not-appearing-in-datadog}

Si les logs n'apparaissent pas dans Datadog :

1. **Vérifiez la configuration du service Azure Automated Log Forwarding** : Assurez-vous que l'espace de noms Event Hubs et la destination Datadog sont correctement configurés
2. **Vérifiez la catégorie des logs des paramètres de diagnostic** : Le paramètre de diagnostic doit capturer les logs `WorkflowRuntime`

### Les traces sont manquantes par intermittence {#traces-are-missing-intermittently}

Si les traces apparaissent de manière incohérente :

1. **Ajoutez un retention filter** : Créez un [filtre de rétention][4] avec la requête `operation_name:azure.logicapps` pour vous assurer que les traces sont conservées
2. **Définissez le taux de rétention** : Pour le débogage, définissez le taux de rétention sur 100 %
3. **Vérifiez l'échantillonnage** : Vérifiez que les traces ne sont pas supprimées en raison des configurations d'échantillonnage

### Les tags n'apparaissent pas sur les traces {#tags-are-not-appearing-on-traces}

Si les tags `env` et `service` n'apparaissent pas sur vos traces :

1. **Vérifiez les tags dans Azure** : Vérifiez que les tags sont correctement définis sur la Logic App dans le portail Azure
2. **Attendez la propagation** : Les modifications de tags peuvent prendre 30 minutes pour se propager aux nouvelles exécutions
3. **Déclenchez de nouvelles exécutions** : Appelez à nouveau le workflow après avoir défini les tags

## Besoin d'aide supplémentaire ? {#need-more-help}

Pour toute autre question ou problème non abordé ici, contactez le [support Datadog][5].

[1]: /fr/logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[4]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /fr/help/