---
description: Transmettez un jeton d'authentification en direct et à actualisation
  automatique dans un test d'application mobile pour contourner le flux de connexion.
further_reading:
- link: /synthetics/guide/authentication-protocols/
  tag: Documentation
  text: Utilisez l'authentification dans les tests d'API et les tests d'API en plusieurs
    étapes.
- link: /synthetics/mobile_app_testing/
  tag: Documentation
  text: Créez un test d'application mobile
- link: /synthetics/platform/settings/#global-variables
  tag: Documentation
  text: Créer une variable globale
title: Injectez et actualisez automatiquement les jetons d'authentification dans les
  tests d'application mobile
---
## Présentation {#overview}

Se connecter via l'interface utilisateur de votre application au début de chaque [test d'application mobile][1] allonge la durée d'exécution et entraîne une instabilité non liée au test. Ce guide explique comment contourner cette étape de connexion en injectant un jeton d'authentification en direct pour que le test démarre déjà authentifié.

Le flux comporte trois parties :

1. Un [test d'API][2] se connecte à votre fournisseur d'authentification selon un planning et extrait un jeton d'accès.
2. Une [variable globale][3] provenant de ce test contient la valeur du jeton.
3. Votre test d'application mobile transmet la variable globale à l'application en tant qu'argument de lancement ou extra d'intention. Votre application le lit au démarrage et ignore son flux de connexion normal.

Comme le test d'API actualise le jeton selon un planning, la valeur de la variable globale se met à jour d'elle-même, sans aucun travail manuel ni appel à la Datadog API.

## Étape 1 : Créer le test d'API de récupération de jeton {#step-1-create-the-token-fetch-api-test}

Si votre fournisseur d'authentification nécessite un secret client, stockez-le d'abord en tant que [variable globale][3] sécurisée, au lieu de le coder en dur dans la requête. Saisissez un nom tel que `AUTH_CLIENT_SECRET` et sélectionnez {{< ui >}}Hide and obfuscate variable value{{< /ui >}} lors de sa création.

Créez un [test HTTP][2] qui demande un jeton à l'endpoint de jeton de votre fournisseur :

- **Requête** : `POST` vers votre endpoint de jeton, tel que `https://auth.yourdomain.com/oauth/token`.
- **En-tête** : `Content-Type: application/json`.
- **Corps** : une charge utile JSON avec vos identifiants client, faisant référence à la variable globale `AUTH_CLIENT_SECRET` :

{{< code-block lang="json" >}}
{
  "client_id": "synthetic_bot",
  "client_secret": "{{ AUTH_CLIENT_SECRET }}",
  "grant_type": "client_credentials"
}
{{< /code-block >}}

- **Assertion** : le code d'état est `200`.
- **Variable extraite** : [extraire une variable][4] nommée `EXTRACTED_TOKEN` du corps de la réponse, en utilisant une expression `jsonpath` qui correspond à votre champ de jeton, telle que `$.access_token`. Sélectionnez {{< ui >}}Hide and obfuscate variable value{{< /ui >}} afin que le jeton n'apparaisse pas dans les résultats de test.

Définissez la [fréquence][5] de test sur une durée inférieure à la fenêtre d'expiration de votre jeton, afin que le jeton ne devienne pas obsolète entre les exécutions. Par exemple, exécutez le test toutes les 30 minutes pour un jeton qui expire après une heure. Vous pouvez également associer une alerte d'échec au test pour savoir s'il cesse de rafraîchir le jeton.

## Étape 2 : Créer une variable globale depuis le test {#step-2-create-a-global-variable-from-the-test}

[Créez une variable globale][3] à partir du test de jeton afin que votre test d'application mobile puisse référencer sa valeur:

1. Accédez à l'onglet {{< ui >}}Global Variables{{< /ui >}} sur la [{{< ui >}}Settings{{< /ui >}} page][6]. Cliquez sur {{< ui >}}\+ New Global Variable{{< /ui >}}.
2. Sélectionnez l'onglet {{< ui >}}Create From Test{{< /ui >}} et sélectionnez votre test de jeton.
3. Saisissez un {{< ui >}}Variable Name{{< /ui >}}, tel que `MOBILE_AUTH_TOKEN`.
4. Sélectionnez {{< ui >}}Hide and obfuscate variable value{{< /ui >}} afin que le jeton n'apparaisse pas dans les résultats de test.
5. Sélectionnez la source de la valeur :
   - Si votre test de jeton est une requête HTTP unique, sélectionnez {{< ui >}}Response Body{{< /ui >}} et réutilisez l'expression `jsonpath` de votre assertion de test, par exemple `$.access_token`.
   - Si votre test de jeton comporte plusieurs étapes, sélectionnez la variable locale {{< ui >}}EXTRACTED_TOKEN{{< /ui >}} que vous avez extraite à l'étape 1.

La valeur de cette variable se met à jour automatiquement chaque fois que le test de récupération de jeton s'exécute.

## Étape 3 : Transmettre le jeton à votre test d'application mobile {#step-3-pass-the-token-to-your-mobile-app-test}

Les tests d'applications mobiles prennent en charge la transmission de paires `key:value` à votre application au lancement via les [options avancées][7]. Référencez votre variable globale en tapant `{{` dans le champ, afin que sa valeur actuelle soit substituée lors de l'exécution :

{{< tabs >}}
{{% tab "Android (Extras d'intention initiaux)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Page de création de test d'application mobile, montrant un exemple d'option avancée pour un appareil Android." style="width:100%;" >}}

{{% /tab %}}
{{% tab "iOS (Arguments de processus)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="Page de création de test d'application mobile, montrant un exemple d'option avancée pour un appareil iOS." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Étape 4 : Gérez le jeton dans votre application {#step-4-handle-the-token-in-your-app}

Votre application doit lire la valeur injectée au démarrage, la stocker de manière sécurisée et l'utiliser pour ignorer son flux de connexion. Protégez ce comportement derrière un indicateur de build afin que le chemin de code n'existe que dans vos builds de test ou d'automatisation.

{{< tabs >}}
{{% tab "Android (Java)" %}}

{{< code-block lang="java" >}}
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SecureTokenStore.getInstance(this).save(authToken);
        SessionManager.getInstance().restoreSession(authToken);
    }
}
{{< /code-block >}}

Retour `SecureTokenStore` avec `EncryptedSharedPreferences` et un `MasterKey`, plutôt que de stocker le jeton en clair `SharedPreferences`.

{{% /tab %}}
{{% tab "iOS (Swift)" %}}

{{< code-block lang="swift" >}}
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    KeychainManager.shared.save(token: authToken)
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
{{< /code-block >}}

Stockez le jeton dans le trousseau d'accès plutôt que dans `UserDefaults`, afin qu'il soit protégé au repos comme un jeton que votre application reçoit d'une connexion réelle.

{{% /tab %}}
{{% tab "React Native" %}}

{{< code-block lang="javascript" >}}
import { LaunchArguments } from 'react-native-launch-arguments';
import * as Keychain from 'react-native-keychain';

if (__DEV__ || Config.AUTOMATION) {
  const { auth_token: authToken } = LaunchArguments.value();
  if (authToken) {
    await Keychain.setGenericPassword('auth_token', authToken);
    SessionManager.restoreSession(authToken);
  }
}
{{< /code-block >}}

`react-native-launch-arguments` lit les arguments de processus sur iOS et les extras d'intention sur Android via une seule API. `react-native-keychain` stocke le jeton dans le trousseau d'accès ou le Keystore de la plateforme au lieu de `AsyncStorage`.

{{% /tab %}}
{{< /tabs >}}

## Considérations de sécurité {#security-considerations}

N'acceptez un jeton d'authentification injecté que dans les builds de test ou d'automatisation, jamais en production. Vérifiez un indicateur de build avant de lire l'argument, et assurez-vous que cet indicateur n'est pas défini dans les builds que vous distribuez sur les magasins d'applications.

C'est particulièrement important sur Android. Un extra d'intent envoyé à une activité de lancement exportée `Activity` peut provenir de n'importe quelle application sur l'appareil, pas seulement du test runner de Datadog. Sans check par indicateur de build, une application de production qui lit et fait confiance à `auth_token` provenant de son intention de lancement permet à n'importe quelle application locale de s'authentifier en tant que compte de test.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/mobile_app_testing/
[2]: /fr/synthetics/api_tests/http_tests/
[3]: /fr/synthetics/platform/settings/#global-variables
[4]: /fr/synthetics/api_tests/http_tests/#define-assertions
[5]: /fr/synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /fr/synthetics/mobile_app_testing/#advanced-options