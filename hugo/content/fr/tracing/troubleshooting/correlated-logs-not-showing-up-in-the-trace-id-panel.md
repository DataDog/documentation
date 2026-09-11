---
aliases:
- /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: Documentation
  text: Corréler vos traces et vos logs
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentation
  text: Diagnostics simplifiés grâce à la mise en corrélation entre produits
title: Aucun log corrélé ne s'affiche dans le volet de l'ID de trace
---

## Présentation

Le volet d'une [trace][1] contient des informations sur la trace, le host et les logs corrélés.

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="Volet d'une trace sans aucun log trouvé" style="width:90%;">}}

Quatre types de logs différents peuvent s'afficher sur le volet d'une [trace][1] :

- `trace_id` : affiche les logs associés à l'ID de trace correspondant.
- `host` : affiche les logs générés par le host de la trace durant son intervalle.
- `container_id` : affiche les logs générés par le conteneur de la trace durant son intervalle.
- `pod_name` : affiche les logs générés par le pod de la trace durant son intervalle.

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="Menu déroulant des logs d'une trace affichant les options Trace ID et Host" style="width:80%;">}}

Il arrive parfois que la section **Logs** du volet de trace soit vide. Ce guide présente les étapes à suivre pour corriger le problème.

## Options d'infrastructure

Si la section **Logs** est vide lorsque l'option `host`, `container_id` ou `pod_name` est sélectionnée, accédez au [Log Explorer][2] et vérifiez les points suivants :

1. Le host/conteneur/pod qui a émis la trace transmet bien des logs.
2. Il existe des logs pour ce host dans l'intervalle de la trace.
3. Le timestamp des logs est correctement défini. Pour en savoir plus, consultez la section [Timestamp incorrect dans les logs][3].

## Option Trace ID

Si la section **Logs** est vide lorsque l'option `trace_id` est sélectionnée, assurez-vous que vos logs contiennent un attribut `trace_id` standard. Si ce n'est pas le cas, [corrélez vos traces et vos logs][4] de manière à :

1. Extraire l'ID de trace dans un attribut de log
2. Remapper cet attribut vers l'attribut `trace_id` réservé

   {{< tabs >}}
   {{% tab "Logs JSON" %}}

   Pour les logs JSON, les étapes 1 et 2 se font automatiquement. Le traceur injecte l'ID de [trace][1] et l'ID de [span][2] dans les logs, qui sont ensuite automatiquement remappés par les [remappeurs d'attributs réservés][3].

   Si ce processus ne fonctionne pas comme prévu, assurez-vous que le nom de l'attribut contenant l'ID de trace est bien `dd.trace_id` et que l'attribut est correctement défini dans la section Trace ID des [attributs réservés][4].

   {{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="Page de pré-traitement des logs JSON avec la section Trace Id mise en évidence" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/tracing/glossary/#spans
[3]: /fr/logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
   {{% /tab %}}
   {{% tab "Avec une intégration de collecte de logs" %}}

   Pour les logs au format brut (lorsque vous recueillez les logs à l'aide d'une [intégration de log][1] pour un langage spécifique), définissez l'attribut `source` sur le langage, tel que `java`, `python`, `ruby`, etc. L'intégration met automatiquement en corrélation les traces et les logs.

   Cet exemple montre le pipeline d'intégration Java :

   {{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="Pipeline des logs Java avec le remappeur d'ID de trace mis en évidence"  style="width:90%;">}}

   Il est possible que le format des logs ne soit pas reconnu par le pipeline d'intégration. Dans ce cas, dupliquez le pipeline et suivez le [guide de dépannage pour le parsing][2] afin de faire en sorte que le pipeline accepte le format des logs.

[1]: /fr/logs/log_collection/?tab=application#setup
[2]: /fr/logs/faq/how-to-investigate-a-log-parsing-issue/
   {{% /tab %}}
   {{% tab "Personnalisé" %}}

   Pour les logs au format brut qui n'ont pas été recueillis via une intégration :

   1. Assurez-vous que la règle de parsing personnalisée extrait les ID de [trace][1] et de [span][2] sous forme de chaîne, comme dans l'exemple suivant :

      {{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="Parser personnalisé avec l'ID de trace mis en évidence dans les sections Échantillon de logs, Règle de parsing et Extraction"  style="width:90%;">}}

   2. Ensuite, définissez un [remappeur de traces][3] sur l'attribut extrait pour le remapper vers l'ID de trace officiel des logs.

[1]: /fr/tracing/glossary/#trace
[2]: /fr/tracing/glossary/#spans
[3]: /fr/logs/log_configuration/processors/#trace-remapper
   {{% /tab %}}
   {{< /tabs >}}

Une fois les ID correctement injectés et remappés vers vos logs, les logs corrélés à la trace s'affichent dans le volet détaillé.

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="Volet d'une trace affichant les logs corrélés dans la section Logs"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: https://app.datadoghq.com/logs
[3]: /fr/logs/guide/logs-not-showing-expected-timestamp/
[4]: /fr/tracing/other_telemetry/connect_logs_and_traces/