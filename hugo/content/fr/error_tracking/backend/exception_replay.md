---
aliases:
- /fr/tracing/error_tracking/executional_context
- /fr/tracing/error_tracking/execution_replay/
description: Découvrez Exception Replay dans Error Tracking.
further_reading:
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifiez le débogage en production avec Datadog Exception Replay.
- link: /tracing/live_debugger
  tag: Documentation
  text: Découvrez Datadog Live Debugger.
- link: /error_tracking/monitors
  tag: Documentation
  text: En savoir plus sur les Monitors Error Tracking
- link: /tracing/error_tracking
  tag: Documentation
  text: Découvrez Error Tracking pour les APM Backend Services.
is_beta: true
title: Exception Replay dans Error Tracking.
---
<div class="alert alert-info">
Exception Replay est généralement disponible pour Python, Java, .NET et PHP, et est activé par défaut.
<a href="#requirements--setup">lorsqu'il est pris en charge</a>.
</div>

## Présentation {#overview}

Exception Replay capture le contexte d'exécution et les valeurs des variables locales lorsqu'une exception se produit, vous aidant à diagnostiquer,
reproduire et résoudre les problèmes plus rapidement. Il enregistre l'état environnant, y compris la trace de pile et les valeurs des variables,
instantanés de variables, puis affiche ces données directement dans Error Tracking aux côtés des autres détails du problème.

{{< img src="tracing/error_tracking/error_tracking_executional_context-3.png" alt="Error Tracking Explorer Exception Replay" style="width:90%" >}}

Exception Replay est conçu pour une utilisation en production. Les instantanés sont limités en débit et les données sensibles sont automatiquement
[masquées](#sensitive-data-redaction). Lorsqu'il est activé, il attend les exceptions dans une application et capture des instantanés de
la trace de pile et des variables locales avant de les transmettre à Datadog.

<div class="alert alert-info">
<b>Quels produits sont pris en charge ?</b>
La relecture d'exceptions est disponible uniquement pour les <b>exceptions basées sur l'APM</b> et ne prend pas en charge les erreurs provenant des logs ou du RUM.
</div>

## Configuration requise et installation {#requirements-setup}

Exception Replay prend en charge Python, Java, .NET et PHP, et capture uniquement les exceptions basées sur l'APM. Il
nécessite le [Datadog Agent][12] et une [APM-instrumented application][1]. Vous pouvez l'activer pour un environnement entier,
un service individuel dans l'application, ou un service spécifique en utilisant des variables d'environnement.

La méthode d'activation dépend de la version de votre tracer et de la disponibilité de la [Remote Configuration][2]. Consultez le tableau
ci-dessous pour plus de détails.

| | Par environnement<br>(Bulk) | Par service<br>(In-App) | Par service<br>(Env Var) |
|---|---|---|---|
| **How to Enable** | Enabled by default | Settings page | Environment variables |
| **Agent Version** | v7.49.0+ | v7.49.0+ | v7.49.0+ |
| **Minimum Tracer Versions** | [Python][8] ≥ 3.15.0<br>[Java][9] ≥ 1.54.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 3.10.0<br>[Java][9] ≥ 1.48.0<br>[.NET][10] ≥ 3.29.0<br>[PHP][11] ≥ 1.19.0 | [Python][8] ≥ 1.16.0<br>[Java][9] ≥ 1.47.0<br>[.NET][10] ≥ 2.53.0<br>[PHP][11] ≥ 1.12.1 |
| **Remote Configuration Required?** | Yes | Yes | No |

Pour activer Exception Replay in-app, accédez à la page Exception Replay {{< ui >}}Settings{{< /ui >}} dans Error Tracking, puis sélectionnez
l'environnement ou le service souhaité, puis activez-le sur {{< ui >}}Enabled{{< /ui >}}.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_enablement.mp4" video="true" alt="Activation d'Exception Replay via the Settings page" style="width:90%" >}}

Si l'activation dans l'application n'est pas disponible, définissez la variable d'environnement :

```bash
DD_EXCEPTION_REPLAY_ENABLED=true
```

Ceci peut également être utilisé pour remplacer la configuration dans l'application et est prioritaire lorsque les deux sont définis.

### Créer un index de logs pour les snapshots d'Exception Replay {#create-a-logs-index-for-exception-replay-snapshots}

Créez un index de logs dédié aux snapshots d'Exception Replay et configurez-le avec la rétention souhaitée et sans échantillonnage.

- Définissez le filtre pour qu'il corresponde à `source:dd_debugger`.
- Assurez-vous que l'index a priorité sur les autres index correspondant à ce tag (la première correspondance l'emporte).

<div class="alert alert-info">
<b>Pourquoi créer un index de logs ?</b>
Les instantanés d'Exception Replay sont émis sous forme de logs enrichis avec des liens renvoyant aux spans APM d'origine.
</div>

### Liez votre code source {#link-your-source-code}

Si vous activez Datadog Source Code Integration, vous pouvez voir des aperçus de code directement dans votre Error Tracking stack
traces. Lorsque des instantanés d'Exception Replay sont capturés, vous pouvez survoler les noms de variables dans l'aperçu du code pour voir
leurs valeurs capturées.

{{< img src="tracing/error_tracking/error_tracking_exception_replay_sci.mp4" video="true" alt="Exception Replay avec intégration du code source" style="width:90%" >}}

## Masquage des données sensibles {#sensitive-data-redaction}

Exception Replay applique un masquage automatique basé sur le mode et les identifiants pour garantir que les données sensibles sont protégées avant que les instantanés ne deviennent disponibles.
Les instantanés d'Exception Replay ne deviennent disponibles qu'après que les données sensibles ont été protégées.

### Masquage basé sur le mode {#mode-based-redaction}

Exception Replay dispose de deux modes de masquage :

- {{< ui >}}Strict Mode{{< /ui >}} : Masque toutes les valeurs à l'exception des nombres et des booléens.
- {{< ui >}}Targeted Mode{{< /ui >}} : Masque les modèles sensibles connus tels que les numéros de carte de crédit, les clés d'API, les adresses IP et autres PII. Il exécute également un scanner de secrets à haute entropie qui masque automatiquement les secrets probables, qui apparaissent sous la forme `[REDACTED:HIGH_ENTROPY]` dans les instantanés.

Ces modes de masquage ne peuvent pas être désactivés, seulement commutés, et le mode ciblé est appliqué automatiquement dans les environnements de pré-production courants comme
Ces modes de masquage ne peuvent pas être désactivés, seulement commutés, et le mode ciblé est appliqué automatiquement dans les environnements de pré-production courants comme `staging` ou `preprod`.

### Masquage basé sur des identifiants {#identifier-based-redaction}

Les valeurs de variable associées aux [identifiants sensibles courants][3] (par exemple, `password`, `accessToken` et des termes similaires)
sont nettoyées avant que les instantanés ne quittent le host. Des règles de masquage supplémentaires spécifiques au langage sont intégrées dans chaque tracer
(par exemple, le Python tracer maintient une liste d'identifiants sensibles par défaut).

Vous pouvez étendre le comportement de masquage via :

- Masquage personnalisé basé sur des identifiants
- Règles de masquage basées sur la classe/le type
- Règles du Sensitive Data Scanner

Consultez la documentation sur les [instructions de masquage des données sensibles de Dynamic Instrumentation][4] et le [Sensitive Data Scanner][5]
pour obtenir des détails sur la configuration.

<div class="alert alert-info">
<b>Pourquoi des instructions DI ?</b>
Exception Replay repose sur <a href="/tracing/dynamic_instrumentation/">Dynamic Instrumentation (DI)</a>, donc ses
options de configuration de masquage des données sensibles s'appliquent également ici.
</div>

## Dépannage {#troubleshooting}

### Valeurs de variable manquantes {#missing-variable-values}

Les instantanés d'Exception Replay sont limités à **un instantané par type d'exception par instance et par heure**. Dans certains
environnements d'exécution, un instantané n'est capturé qu'après la **deuxième occurrence** d'une exception donnée.

### Autres raisons pour lesquelles un instantané peut ne pas apparaître {#additional-reasons-a-snapshot-may-not-appear}

- Exception Replay n'est pas activé
- L'instantané s'est produit en dehors de la fenêtre temporelle sélectionnée
- Exclusions de packages tiers (utilisez `DD_THIRD_PARTY_DETECTION_EXCLUDES` pour les inclure)
- Logs avec `source:dd_debugger` manquants en raison des paramètres de rétention [Log Index][6] ou des [Exclusion Filters][7] dans les index précédents
- Exception Replay n'est pas disponible dans la région FedRAMP
- Java : Sur le JDK 18 et versions antérieures, les classes compilées avec l'indicateur `-parameters` peuvent ne pas être prises en charge. Spring 6+, Spring Boot 3+ et Scala utilisent cet indicateur par défaut.

Utilisez la requête `@error.debug_info_captured:true` dans Error Tracking Explorer pour trouver les erreurs avec Exception Replay.
instantanés.

### BatchUploader WARN messages on GovCloud (Java) {#batchuploader-warn-messages-on-govcloud-java}

Sur les sites GovCloud (`app.ddog-gov.com`), Java tracers peuvent enregistrer des messages WARN périodiques provenant de `com.datadog.debugger.uploader.BatchUploader` avec une erreur HTTP 403 et un texte similaire à `This traffic is not permitted on your account`. Ceci est attendu lorsque des téléchargements liés au débogueur sont tentés sur un site où Exception Replay, Dynamic Instrumentation et Code Origin for Spans ne sont pas pris en charge. La fonctionnalité APM principale (traces, métriques, profilage, injection de logs) n'est pas affectée.

Pour arrêter ces messages de log, définissez les variables d'environnement suivantes sur le pod de l'application Java et redémarrez la charge de travail :

```bash
DD_EXCEPTION_REPLAY_ENABLED=false
DD_DYNAMIC_INSTRUMENTATION_ENABLED=false
DD_CODE_ORIGIN_FOR_SPANS_ENABLED=false
```

Alternativement, utilisez les propriétés système JVM :

```bash
-Ddd.exception.replay.enabled=false
-Ddd.dynamic.instrumentation.enabled=false
-Ddd.code.origin.for.spans.enabled=false
```

Pour confirmer la correction, vérifiez le JSON de démarrage du tracer (`DATADOG TRACER CONFIGURATION`) et assurez-vous que `debugger_exception_enabled`, `debugger_enabled` et `debugger_span_origin_enabled` sont tous `false`. Les messages WARN sont limités à environ une fois toutes les cinq minutes, attendez donc au moins cette durée après le redémarrage avant de confirmer que les messages ont cessé.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[2]: /fr/tracing/guide/remote_config
[3]: https://github.com/DataDog/dd-trace-py/blob/main/ddtrace/debugging/_redaction.py
[4]: /fr/dynamic_instrumentation/sensitive-data-scrubbing/
[5]: /fr/security/sensitive_data_scanner/
[6]: https://app.datadoghq.com/logs/pipelines/indexes
[7]: /fr/logs/log_configuration/indexes/#exclusion-filters
[8]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[9]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[10]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[11]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
[12]: /fr/agent/