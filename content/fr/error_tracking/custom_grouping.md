---
description: Personnalisez la façon dont les spans d'erreurs sont regroupés en questions.
title: Regroupement personnalisé
---

## Section Overview

La solution Error Tracking regroupe intelligemment les erreurs similaires en problèmes à l'aide d'une [stratégie par défaut][5]. En utilisant les _empreintes personnalisées_, vous pouvez avoir un contrôle total sur vos décisions en matière de regroupement et personnaliser son comportement pour vos spans d'erreurs.

Vous pouvez personnaliser le regroupement en fournissant une empreinte `error.fingerprint` pour l'erreur. L'empreinte est fournie dans un attribut ou un tag, en fonction de la source de l'erreur (consultez la section [Configuration](#configuration) pour en savoir plus). Bien que la valeur de `error.fingerprint` n'ait pas de prérequis en matière de format ni d'exigence, le contenu doit être une chaîne.

Si `error.fingerprint` est fourni, le regroupement suit les règles suivantes :

* Le regroupement personnalisé a la priorité sur la stratégie par défaut.
* Le regroupement personnalisé peut être appliqué uniquement à un sous-ensemble de vos erreurs et peut coexister avec la stratégie par défaut.
* Le contenu de `error.fingerprint` est utilisé tel quel, sans aucune modification.
* Les erreurs provenant du même service et ayant le même attribut `error.fingerprint` sont regroupées dans le même problème.
* Les erreurs présentant différents attributs `service` sont regroupées en différents problèmes.

## Configuration

### APM
Le regroupement personnalisé ne nécessite qu'un span d'erreur et un tag de span de chaîne `error.fingerprint`.

Si vous ne collectez pas déjà des traces APM avec Datadog, consultez la [documentation relative à l'APM][1] pour configurer l'APM.

#### Exemple

Si vous envoyez déjà des spans d'APM, ajoutez un nouveau tag `error.fingerprint` à votre span d'erreur.

Voici un exemple dans Python :

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

Les informations relatives à l'exception sont capturées et attachées à un span s'il y en a un d'actif au moment où l'exception est soulevée.
Dans ce cas, `my-custom-grouping-material` est utilisé pour regrouper ces spans d'erreurs en un seul problème
dans Error Tracking.

### Log Management
Le regroupement personnalisé ne nécessite qu'un log d'erreur et un attribut de chaîne `error.fingerprint`.

Si vous ne collectez pas déjà des logs avec Datadog, consultez la [documentation relative à Log Management][1] pour configurer des logs.

Assurez-vous que le tag `source` (spécifiant la langue) est correctement configuré.

#### Exemple

Si vous journalisez déjà au format JSON, ajoutez un nouvel attribut `error.fingerprint` à votre log d'erreur.

Voici un exemple de log au format JSON dans Python :

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

Dans ce cas, `my-custom-grouping-material` est utilisé pour regrouper ces logs d'erreurs en un seul problème
dans Error Tracking.

#### Exemple mobile

Dans les SDK mobiles de Datadog, vous pouvez ajouter une empreinte d'erreur personnalisée lors de l'enregistrement d'une erreur en ajoutant
un attribut prédéfini à l'appel de log :

{{< tabs >}}
{{% tab "iOS" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog iOS `2.8.1` ou d'une version plus récente.

```swift
let errorFingerprint = "my-custom-grouping-material"
logger.error(
  "My error message",
  error: error,
  attributes: [
    Logs.Attributes.errorFingerprint: errorFingerprint
  ]
)
```
{{% /tab %}}

{{% tab "Android" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Android `2.7.0` ou d'une version plus récente.

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```
{{% /tab %}}

{{% tab "Flutter" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Flutter `2.4.0` ou d'une version plus récente.

```dart
final errorFingerprint = "my-custom-grouping-material";
logger.error(
  'My error message',
  errorStackTrace: st,
  attributes {
    DatadogAttributes.errorFingerprint: "my-custom-grouping-material",
  }
);
```
{{% /tab %}}
{{< /tabs >}}

Vous pouvez également ajouter ou ajuster l'empreinte dans le mappeur de log :

{{< tabs >}}
{{% tab "iOS" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog iOS `2.8.1` ou d'une version plus récente.

```swift
let logsConfiguration = Logs.Configuration(
  eventMapper: { log in
      var log = log
      log.error?.fingerprint = "my-custom-grouping-material"
      return log
  }
)
Logs.enable(
  with: logsConfiguration
)
```
{{% /tab %}}

{{% tab "Android" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Android `2.7.0` ou d'une version plus récente.

```kotlin
val mapper = object : EventMapper<LogEvent> {
    override fun map(event: LogEvent): LogEvent {
        event.fingerprint = "my-custom-grouping-material"
        return event
    }
}
val logsConfiguration = LogsConfiguration.Builder()
    .setEventMapper(mapper)
    .build()
Logs.enable(logsConfiguration)
```
{{% /tab %}}

{{% tab "Flutter" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Flutter `2.4.0` ou d'une version plus récente.

```dart
LogEvent? mapLogEvent(LogEvent event) {
  event.error?.fingerprint = "my-custom-grouping-material";
  return event;
}

final loggingConfiguration = DatadogLoggingConfiguration(
  eventMapper: mapLogEvent,
);

final configuration = DatadogConfiguration(
    // ...
    loggingConfiguration: loggingConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

### RUM

#### Exemple
Si vous ne collectez pas déjà des événements du RUM Browser avec Datadog, consultez la [documentation relative à la configuration de la surveillance du RUM Browser][3] ou la [documentation relative à la configuration de la surveillance de TV et RUM Mobile][4].

{{< tabs >}}
{{% tab "Browser" %}}
Pour utiliser le regroupement personnalisé, vous avez besoin du SDK Browser Datadog [v4.42.0 ou ultérieur][2], d'une [erreur du RUM Browser][1] et d'un attribut de chaîne supplémentaire.

Si vous êtes déjà en train de [collecter les erreurs du navigateur][1], il est possible d'ajouter l'attribut en utilisant l'une ou l'autre des méthodes suivantes :

* Ajouter un attribut `dd_fingerprint` à l'objet error :

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* Ou utiliser le rappel `beforeSend` avec un attribut `error.fingerprint` :

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

Dans les deux cas, `my-custom-grouping-material` est utilisé pour regrouper les erreurs du RUM Browser en une seule question dans Error Tracking.

[1]: /fr/real_user_monitoring/browser/collecting_browser_errors/
[2]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
{{% /tab %}}

{{% tab "iOS" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog iOS `2.8.1` ou d'une version plus récente.

Pour ajouter une empreinte personnalisée lorsque vous signalez manuellement des erreurs, vous pouvez ajouter un attribut prédéfini lorsque vous appelez `addError` :

```swift
RUMMonitor.shared().addError(
  message: "My error message",
  source: .source,
  attributes: [
    RUM.Attributes.errorFingerprint: "my-custom-grouping-fingerprint"
  ]
)
```

Vous pouvez également utiliser le mappeur `errorEventMapper` :

```swift
var config = RUM.Configuration(applicationID: "rum-application-id")
config.errorEventMapper = { errorEvent in
  var errorEvent = errorEvent
  errorEvent.error.fingerprint = "my-custom-grouping-fingerprint"
  return errorEvent
}
RUM.enable(with: config)
```

{{% /tab %}}

{{% tab "Android" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Android `2.7.0` ou d'une version plus récente.

Pour ajouter une empreinte personnalisée lorsque vous signalez manuellement des erreurs, vous pouvez ajouter un attribut prédéfini lorsque vous appelez `addError` :

```kotlin
GlobalRumMonitor.get().addError(
  "My error message",
  RumErrorSource.SOURCE,
  exception,
  mapOf(
    RumAttributes.ERROR_CUSTOM_FINGERPRINT to "my-custom-grouping-fingerprint"
  )
)
```

Vous pouvez également utiliser le mappeur `errorEventMapper` :

```kotlin
val rumConfiguration = RumConfiguration.Builder("rum-application-id")
  .setErrorEventMapper(object : EventMapper<ErrorEvent> {
    override fun map(event: ErrorEvent): ErrorEvent {
        event.error.fingerprint = "my-custom-grouping-fingerprint"
        return event
    }
  }).build()
RUM.enable(rumConfiguration)
```

{{% /tab %}}

{{% tab "Flutter" %}}
Pour utiliser le regroupement personnalisé, vous devez disposer du SDK Datadog Flutter `2.4.0` ou d'une version plus récente.

Pour ajouter une empreinte personnalisée lorsque vous signalez manuellement des erreurs, vous pouvez ajouter un attribut prédéfini lorsque vous appelez `addError` :

```dart
final rum = DatadogSdk.instance.rum;
rum?.addErrorInfo("My error message",
  RumErrorSource.source,
  attributes: {
    DatadogAttributes.errorFingerprint: 'my-custom-grouping-fingerprint',
  },
);
```

Vous pouvez également utiliser le mappeur `errorEventMapper` :

```dart
RumErrorEvent? mapRumErrorEvent(RumErrorEvent event) {
  event.error.fingerprint = "my-custom-grouping-fingerprint";
  return event;
}

final rumConfiguration = DatadogRumConfiguration(
  // ...
  errorEventMapper: mapRumErrorEvent,
);

final configuration = DatadogConfiguration(
    // ...
    rumConfiguration: rumConfiguration,
);
```
{{% /tab %}}
{{< /tabs >}}

[1]: /fr/tracing/
[2]: /fr/logs/log_collection/
[3]: /fr/real_user_monitoring/browser/
[4]: /fr/real_user_monitoring/mobile_and_tv_monitoring/#get-started
[5]: /fr/error_tracking/default_grouping