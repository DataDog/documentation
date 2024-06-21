---
description: Découvrez comment suivre les erreurs recueillies sur navigateur et mobile
  à partir de vos logs.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Analyser les problèmes affectant vos applications avec la solution Error Tracking
    de Datadog
- link: /logs/error_tracking/explorer/
  tag: Documentation
  text: En savoir plus sur l'Error Tracking Explorer
is_beta: true
kind: documentation
title: Suivi des erreurs recueillies sur navigateur et mobile
---

## Présentation

La solution Error Tracking traite les erreurs recueillies par les SDK Browser et Mobile de Datadog. Dès lors qu'une erreur contenant une stack trace est recueillie, celle-ci est traitée et classée dans une catégorie de _problème_ afin de la rassembler avec des erreurs similaires.

L'attribut `error.stack` qui contient la stack trace de l'erreur est essentiel pour les erreurs recueillies dans les logs. Si vous envoyez des stack traces à Datadog mais qu'elles ne figurent pas dans `error.stack`, vous pouvez configurer un [remappeur de logs générique][6] pour remapper la stack trace vers l'attribut adéquat dans Datadog.

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][2].

## Configuration

{{< tabs >}}
{{% tab "Browser" %}}

Si vous n'avez pas encore configuré le SDK Browser Datadog, suivez les [instructions de configuration intégrées à l'application][1] ou consultez la [documentation sur la configuration des logs Browser][2].

1. Téléchargez la dernière version du SDK Logs Browser. Le suivi des erreurs nécessite au minimum la version `v4.36.0`.
2. Configurez les tags `version`, `env` et `service` de votre application lors de l'[initialisation du SDK][3]. Par exemple, avec NPM :

   ```javascript
   import { datadogLogs } from '@datadog/browser-logs'

   datadogLogs.init({
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<MY_SERVICE>',
     env: '<MY_ENV>',
     forwardErrorsToLogs: true,
     sessionSampleRate: 100,
   })
   ```

3. Pour loguer manuellement une exception interceptée, vous pouvez utiliser le [paramètre facultatif error][4] :

   ```javascript
   try {
     throw new Error('wrong behavior');
   } catch(err) {
     datadogLogs.logger.error("an error occurred", {usr: {id: 123}}, err);
   }
   ```

**Remarque** : le suivi des erreurs tient uniquement compte des erreurs correspondant à des instances de `Error`.

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /fr/logs/log_collection/javascript/#setup
[3]: /fr/logs/log_collection/javascript/#choose-the-right-installation-method
[4]: /fr/logs/log_collection/javascript/#error-tracking

{{% /tab %}}
{{% tab "Android" %}}

Si vous n'avez pas encore configuré le SDK Android Datadog, suivez les [instructions de configuration intégrées à l'application][1] ou consultez la [documentation sur la configuration des logs Android][2].

1. Téléchargez la dernière version du [SDK de collecte des logs Android][3].
2. Configurez les tags `version`, `env` et `service` de votre application lors de l'[initialisation du SDK][4].
3. Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

   ```java
   try {
     doSomething();
   } catch (IOException e) {
     logger.e("an exception occurred", e);
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /fr/logs/log_collection/android/#setup
[3]: https://github.com/Datadog/dd-sdk-android
[4]: /fr/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

Si vous n'avez pas encore configuré le SDK iOS Datadog, suivez les [instructions de configuration intégrées à l'application][1] ou consultez la [documentation sur la configuration des logs iOS][2].

1. Téléchargez la dernière version du [SDK de collecte des logs iOS][3].
2. Configurez les tags `version`, `env` et `service` de votre application lors de l'[initialisation du SDK][4].
3. Pour loguer manuellement une exception interceptée, vous pouvez utiliser le code suivant :

   ```java
   do {
     // ...
   } catch {
     logger.error("an exception occurred", error)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /fr/logs/log_collection/ios/#setup
[3]: https://github.com/Datadog/dd-sdk-ios
[4]: /fr/logs/log_collection/ios/?tab=cocoapods#setup

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/logs/error-tracking
[3]: https://app.datadoghq.com/logs/onboarding/client
[4]: /fr/logs/log_collection/javascript/#setup
[5]: /fr/logs/log_collection/javascript/#choose-the-right-installation-method
[6]: /fr/logs/log_configuration/processors/?tab=ui#remapper