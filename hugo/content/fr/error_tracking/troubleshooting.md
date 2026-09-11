---
title: Dépannage d'Error Tracking
---

Si Error Tracking présente un comportement inattendu, les étapes de dépannage ci-dessous peuvent vous aider à résoudre rapidement le problème. S'il persiste, contactez [l'assistance Datadog][1]. 

Datadog recommande de mettre régulièrement à jour les bibliothèques de tracing de Datadog, les SDK mobiles et web, car chaque nouvelle version apporte ses améliorations et ses correctifs.

##  Les erreurs sont introuvables dans Error Tracking

### Logs

Assurez-vous que le message d'erreur possède les [attributs requis][2] et qu'Error Tracking est [activé][7] pour les logs. 

Cet [exemple de requête][3] recherche les logs répondant aux critères d'inclusion dans Error Tracking.

### APM

Pour être traitée par Error Tracking, une span doit présenter les caractéristiques suivantes :
- `error.type`
- `error.message`
- `error.stack`

**Remarque** : la pile doit comporter au moins deux lignes et un cadre *significatif* (un cadre avec un nom de fonction et un nom de fichier dans la plupart des langues).

Seules les erreurs provenant de spans d'entrée de service (les spans de service les plus élevées) sont traitées par Error Tracking. Error Tracking capture principalement les exceptions non gérées, et ce comportement est mis en place pour éviter de capturer les erreurs gérées en interne par le service.

Cet [exemple de requête][5] recherche les spans répondant aux critères d'inclusion dans Error Tracking.

#### Solutions pour la remontée des erreurs de spans enfants au niveau des spans d'entrée de service

Certains traceurs permettent d'accéder à la span racine et de remonter l'erreur du statut d'enfant à celui de racine.

{{< tabs >}}
{{% tab "Java" %}}

```java
final Span span = GlobalTracer.get().activeSpan();
if (span != null && (span instanceof MutableSpan)) {
    MutableSpan localRootSpan = ((MutableSpan) span).getLocalRootSpan();
    // utiliser la span racine
    localRootSpan.setTag("<TAG>", "<VALUE>");
}
```

{{% /tab %}}
{{% tab "Python" %}}

```python
context = tracer.get_call_context() 
root_span = context.get_current_root_span() 
root_span.set_tag('<TAG>', '<VALUE>') 
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('<TAG>', '<VALUE>') unless current_root_span.nil?
```

{{% /tab %}}

{{< /tabs >}}

### RUM

Error Tracking ne traite que les erreurs envoyées avec la source `custom`, `source` ou `report` et contenant une stack trace. Les erreurs envoyées avec une autre source (comme `console`) ou envoyées depuis des extensions de navigateurs ne sont pas traitées par le suivi des erreurs.

Cet [exemple de requête][6] montre les erreurs du RUM qui répondent aux critères d'inclusion dans Error Tracking.

## Aucun échantillon d'erreur n'a été trouvé pour une question

Toutes les erreurs sont traitées, mais seules les erreurs retenues sont disponibles dans le volet des erreurs en tant qu'échantillon d'erreur.

### APM

Les spans associées à l'erreur doivent être conservées à l'aide d'un filtre de rétention personnalisé pour que les échantillons de cette erreur apparaissent dans le volet des erreurs.

[1]: /fr/help/
[2]: /fr/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[4]: /fr/tracing/error_tracking/#use-span-tags-to-track-error-spans
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20AND%20%40_top_level%3A1%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /fr/tracing/trace_collection/custom_instrumentation/java/dd-api/#set-tags--errors-on-a-root-span-from-a-child-span