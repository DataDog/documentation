---
description: Découvrez comment collecter des extraits de relecture pour vous assurer
  de voir les problèmes qui vous importent.
further_reading:
- link: /error_tracking/suspect_commits
  tag: Documentation
  text: Découvrez comment Error Tracking peut identifier les commits suspects
- link: /error_tracking
  tag: Documentation
  text: En savoir plus sur Error Tracking
is_beta: true
private: false
title: Error Tracking Replay Snippets
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Error Tracking Replay Snippets est en préversion.
{{< /callout >}}

## Présentation {#overview}

En tant qu'ingénieur frontend, une partie essentielle et souvent chronophage du processus de débogage consiste à reproduire les bugs. Mais il peut être difficile de le faire sans une compréhension claire des actions qu'un utilisateur a effectuées avant que votre application ne génère une erreur.

Error Tracking Replay Snippets vous permet de visualiser une reproduction parfaite au pixel près du parcours d'un utilisateur 15 secondes avant et après l'apparition d'une erreur, afin que vous puissiez reproduire les bugs, gagner du temps et éliminer toute conjecture.

## Configuration {#setup}

1. Si vous n'avez pas configuré Datadog Frontend Error Tracking, suivez les [instructions de configuration dans l'application][1] ou consultez la documentation de configuration pour [navigateur][2] et [mobile][3].
2. Lors de l'initialisation du SDK, configurez le taux d'échantillonnage de relecture de votre application. 

   {{< tabs >}}
   {{% tab "Browser" %}}

   Définissez le `sessionReplaySampleRate` entre 1 et 100. 

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      applicationId: '<APP_ID>',
      clientToken: '<CLIENT_TOKEN>',
      service: '<SERVICE>',
      env: '<ENV_NAME>',
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
   });
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}
   Suivez [ces étapes][4] pour configurer et paramétrer la relecture d'erreurs de votre application mobile pour cette plateforme.

   [4]: /session_replay/setup_and_configuration/?platform=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   Suivez [ces étapes][5] pour configurer et paramétrer la relecture d'erreurs de votre application mobile pour cette plateforme.

   [5]: /session_replay/setup_and_configuration/?platform=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   Suivez [ces étapes][6] pour configurer et paramétrer la relecture d'erreurs de votre application mobile pour cette plateforme.

   [6]: /session_replay/setup_and_configuration/?platform=kotlin_multiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   Suivez [ces étapes][7] pour configurer et paramétrer la relecture d'erreurs de votre application mobile pour cette plateforme.

   [7]: /session_replay/setup_and_configuration/?platform=react_native
   {{% /tab %}}
   {{</tabs>}}

## Relecture d'erreurs {#replay-errors}
Après avoir examiné les informations clés sur l'erreur, telles que le message d'erreur et la trace de pile, vous pouvez passer immédiatement du résumé du problème à une reproduction en direct de la session la plus récente ayant rencontré l'erreur. Faites défiler sous la trace de pile et cliquez sur l'aperçu de la relecture pour voir les actions d'un utilisateur avant que l'erreur ne se produise. 

{{< img src="error_tracking/error-replay-2.png" alt="Error Tracking Replay Snippet" style="width:90%" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /fr/error_tracking/frontend/browser#setup
[3]: /fr/error_tracking/frontend/mobile