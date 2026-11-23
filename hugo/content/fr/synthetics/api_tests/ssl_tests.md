---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - ssl
  - ssl test
  - ssl tests
aliases:
- /fr/synthetics/ssl_test
- /fr/synthetics/ssl_check
description: Surveillez vos certificats SSL depuis des emplacements dans le monde
  entier
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécutez des tests SSL sur des hôtes internes
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
title: Tests SSL
---
## Présentation {#overview}

Les tests SSL vous permettent de surveiller de manière proactive la validité et l'expiration de vos certificats SSL/TLS afin de garantir des connexions sécurisées entre vos services clés et vos utilisateurs. Si votre certificat est sur le point d'expirer ou est compromis, Datadog vous envoie une alerte avec des détails sur l'échec, vous permettant d'identifier la cause profonde du problème et de le résoudre.

Les tests SSL peuvent être exécutés à partir d'emplacements [gérés](#select-locations) ou d'[emplacements privés][1], selon que vous préférez exécuter le test depuis l'extérieur ou l'intérieur de votre réseau. Les tests SSL peuvent être exécutés selon un planning, à la demande ou directement au sein de vos [pipelines CI/CD][2].

## Configuration {#configuration}

Vous pouvez créer un test en utilisant l'une des options suivantes :

- **Créer un test à partir d'un modèle** :
   
     1. Survolez l'un des modèles pré-remplis et cliquez sur {{< ui >}}View Template{{< /ui >}}. Cela ouvre un panneau latéral affichant des informations de configuration pré-remplies, notamment : Détails du test, Détails de la requête, Assertions, Conditions d'alerte et Paramètres du monitor.
     2. Cliquez sur {{< ui >}}\+ Create Test{{< /ui >}} pour ouvrir la page {{< ui >}}Define Request{{< /ui >}}, où vous pouvez examiner et modifier les options de configuration pré-remplies. Les champs présentés sont identiques à ceux disponibles lors de la création d'un test à partir de zéro.
     3. Cliquez sur {{< ui >}}Save Details{{< /ui >}} pour soumettre votre test d'API.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vidéo de la page d'accueil des tests d'API Synthetics avec des modèles" video="true" >}}

- **Créer un test à partir de zéro** :

   1. Pour créer un test à partir de zéro, cliquez sur le modèle {{< ui >}}\+ Start from scratch{{< /ui >}}, puis sélectionnez le type de requête SSL.
   1. Indiquez le {{< ui >}}Host{{< /ui >}} et le {{< ui >}}Port{{< /ui >}} sur lesquels exécuter votre test. Le port SSL par défaut est `443`.
   1. Ajoutez {{< ui >}}Advanced Options{{< /ui >}} (facultatif) à votre test :
      * {{< ui >}}Accept self-signed certificates{{< /ui >}} : Ignore toute erreur de serveur liée à un certificat auto-signé.
      * {{< ui >}}Fail on revoked certificate in stapled OCSP{{< /ui >}} : Fait échouer le test si le certificat est signalé comme révoqué par l'agrafage OCSP.
      * {{< ui >}}Fail on incomplete certificate chain{{< /ui >}} : Désactive la récupération AIA, ce qui entraîne l'échec du test si des certificats intermédiaires sont manquants dans la chaîne de certificats du serveur.
      * {{< ui >}}Timeout{{< /ui >}} : Spécifiez la durée en secondes avant l'expiration du test.
      * {{< ui >}}Server Name{{< /ui >}} : Spécifie sur quel serveur vous souhaitez initier la négociation TLS, permettant au serveur de présenter l'un des multiples certificats possibles sur la même adresse IP et le même numéro de port TCP. Par défaut, le paramètre est rempli par la valeur {{< ui >}}Host{{< /ui >}}.
      * {{< ui >}}Client certificate{{< /ui >}} : Authentifiez-vous via mTLS en important votre certificat client (`.crt`) et la clé privée associée (`.key`) au format `PEM`. 
   
      Vous pouvez utiliser la bibliothèque `openssl` pour convertir vos certificats. Par exemple, convertissez un certificat `PKCS12` en clés privées et certificats au format `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   1. {{< ui >}}Name{{< /ui >}} votre test SSL.

   1. Ajoutez le tag Environment {{< ui >}}Tags{{< /ui >}} ainsi que tout autre tag à votre test SSL. Vous pouvez ensuite utiliser ces tags pour filtrer vos tests Synthetic sur la [page Synthetic Monitoring & Continuous Testing][3].
   1. Cliquez sur {{< ui >}}Test Certificate{{< /ui >}} pour tester la configuration de la requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.<br /><br>

      {{< img src="synthetics/api_tests/synthetics_ssl_test_cert.png" alt="Définir la requête SSL" style="width:90%;" >}}

   1. Cliquez sur {{< ui >}}Create Test{{< /ui >}} pour soumettre votre test d'API.

   

### Extraits {#snippets}

{{% synthetics-api-tests-snippets %}}

### Définissez des assertions {#define-assertions}

Les assertions définissent ce qu'est un résultat de test attendu. Après avoir cliqué sur {{< ui >}}Test URL{{< /ui >}}, des assertions de base sur la validité du certificat, la date d'expiration, la version TLS et `response time` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion pour que votre test puisse effectuer une surveillance.

| Type                  | Opérateur                                                                               | Type de valeur                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| certificat           | `expires in more than`, `expires in less than`                                         | _Entier (nombre de jours)_ |
| propriété              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | _Chaîne_ <br> _[Regex][4]_ |
| temps de réponse         | `is less than`                                                                         | _Entier (ms)_             |
| version TLS maximale   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Décimal_                  |
| version TLS minimale   | `is more than`, `is more than or equal`                                                | _Décimal_                  |

Les tests SSL utilisent TLS 1.2 ou TLS 1.3 pour se connecter ; le serveur doit donc prendre en charge au moins l'une de ces versions. L'assertion `minimum TLS version` vérifie la plus basse de ces deux versions acceptées par le serveur. Les tests SSL ne testent pas TLS 1.0 ou TLS 1.1.

Vous pouvez créer jusqu'à 20 assertions par test d'API en cliquant sur {{< ui >}}New Assertion{{< /ui >}} ou en cliquant directement sur l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="Définissez les assertions qui détermineront si votre test SSL réussit ou échoue" style="width:90%;" >}}

Pour effectuer une logique `OR` dans une assertion, utilisez les comparateurs `matches regex` ou `does not match regex` pour définir une regex avec plusieurs valeurs attendues pour le même type d'assertion, comme `(0|100)`. Le résultat du test est positif si la valeur de l'assertion de propriété est 0 ou 100.

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le Synthetics Worker.

Si un test contient une assertion sur le corps de la réponse et que la limite de délai d'attente est atteinte, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionnez des emplacements {#select-locations}

Sélectionnez le {{< ui >}}Locations{{< /ui >}} à partir duquel exécuter votre test SSL. Les tests SSL peuvent être exécutés à partir d'emplacements gérés et d'[emplacements privés][1] selon que vous préférez surveiller les certificats depuis l'extérieur ou l'intérieur de votre réseau.

{{% managed-locations %}}

### Spécifiez la fréquence du test {#specify-test-frequency}

Les tests SSL peuvent être exécutés :

* **Selon un planning** pour garantir que vos certificats SSL/TLS sont toujours valides et qu'une connexion sécurisée est assurée pour les utilisateurs de vos services clés. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test SSL.
* [**Au sein de vos pipelines CI/CD**][2].
* **À la demande** pour exécuter vos tests au moment le plus opportun pour votre équipe.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Utilisez des variables {#use-variables}

Vous pouvez utiliser les [variables globales définies sur la page {{< ui >}}Settings{{< /ui >}}][9] dans l'URL, les options avancées et les assertions de vos tests SSL.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité.

## Échec du test {#test-failure}

Un test est considéré comme `FAILED` s'il ne satisfait pas une ou plusieurs assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut échouer sans tester les assertions par rapport à l'endpoint.

Pour obtenir une liste complète des codes d'erreur SSL, consultez [Erreurs de test d'API][10].

## Autorisations {#permissions}

Par défaut, seuls les utilisateurs disposant des [rôles Datadog Admin et Datadog Standard][11] peuvent créer, modifier et supprimer des tests SSL Synthetic. Pour pouvoir créer, modifier et supprimer des tests SSL Synthetic, attribuez à votre utilisateur l’un de ces deux [rôles par défaut][11].

Si vous utilisez la [fonctionnalité de rôle personnalisé][12], ajoutez votre utilisateur à tout rôle personnalisé incluant les autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès {#restrict-access}

{{% synthetics_grace_permissions %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: /fr/synthetics/cicd_integrations
[3]: /fr/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /fr/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /fr/synthetics/guide/synthetic-test-monitors
[9]: /fr/synthetics/settings/#global-variables
[10]: /fr/synthetics/api_tests/errors/
[11]: /fr/account_management/rbac/
[12]: /fr/account_management/rbac#custom-roles