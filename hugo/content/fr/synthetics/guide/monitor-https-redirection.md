---
title: Surveillance de la redirection HTTPS des requêtes HTTP

further_reading:
  - link: /synthetics/api_tests/http_tests
    tag: Documentation
    text: Créer un test HTTP
---
## Présentation

Pour garantir le chiffrement des connexions de vos utilisateurs auprès de vos endpoints d'API et de votre application, Il est essentiel de vérifier que votre trafic HTTP est redirigé vers HTTPS.

### Surveiller la redirection HTTPS

Vous pouvez identifier la redirection HTTPS depuis l'onglet **Response Preview** généré. Selon votre configuration, elle est indiquée dans l'en-tête `location` de la section Headers ou dans le **Body** en tant que `"https:"===window.location.protocol`.

Pour surveiller la redirection HTTPS de votre trafic HTTP, procédez comme suit :

1. Créez un test HTTP et [définissez la requête][1].
2. Cliquez sur **Test URL**. L'aperçu de la réponse génère des sections **Request Preview** et **Response Preview**.
3. Ajoutez une assertion relative à la redirection HTTPS :
    - Définissez l'assertion sur l'en-tête `location` en cliquant dessus dans l'aperçu de réponse. Par exemple, dans la section **Headers**, l'en-tête `location` pour `http://datadoghq.com` est `https://datadoghq.com`.

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="En-tête location dans l'aperçu de réponse" style="width:100%;" >}}
    - Il est également possible de définir une assertion sur le corps de la réponse. Pour ce faire, cliquez sur **+ New Assertion**, sélectionnez `body` `contains` et collez `"https:"===window.location.protocol` dans le champ de texte. 
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="Définir votre assertion" style="width:100%;" >}}

Terminez le processus de création de test, puis enregistrez votre test HTTP.

Une fois vos notifications définies, Datadog vous prévient lorsque la redirection HTTPS de votre trafic HTTP n'est pas correctement effectuée.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/synthetics/api_test/#define-request