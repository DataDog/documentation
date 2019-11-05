---
title: Créer un test
type: apicontent
order: 30.1
external_redirect: '/api/#creer-un-test'
---
## Créer un test

Créez un test Synthetics pour initier et configurer les tests que vous souhaitez envoyer par Datadog à vos endpoints API ou à votre application de navigateur. Vous pouvez configurer les endpoints testés, le nombre de tests, ainsi que leur source. Les paramètres requis sont différents pour les tests API et Browser et ils sont marqués en fonction. Si un paramètre est marqué comme _obligatoire_, il est obligatoire pour les deux types de tests. Une fois un test créé, il s'affiche dans l'interface graphique de votre [liste Synthetics][1].

Un test Browser est traité comme un test GET API. Cette méthode vous permet de créer un test de navigateur, mais vous devez utiliser l'interface graphique pour [enregistrer votre test][2].

**ARGUMENTS** :

Les principaux arguments de votre test sont :

*   **`name`** (_obligatoire_) : un nom unique pour le test.
*   **`type`** (_obligatoire_) : le type de test. Les valeurs valides sont `api` et `browser`.
*   **`subtype`** (_obligatoire pour les tests SSL_) : pour un test API SSL, indiquez la valeur `ssl`. Sinon, ne définissez pas cet argument.
*   **`request`** (_obligatoire_) : la requête associée à votre test SSL et API. Pour en savoir plus, consultez la section Request ci-dessous.
*   **`options`** (_obligatoire_) : la liste des options permettant de personnaliser votre test. Pour en savoir plus, consultez la section Options ci-dessous.
*   **`message`** (_obligatoire_) : la description du test.
*   **`assertions`** (_obligatoire pour les tests SSL et API_) : les assertions associées à votre test. Pour en savoir plus, consultez la section Assertions ci-dessous.
*   **`locations`** (_obligatoire_) : la liste des emplacements à partir desquels vous souhaitez envoyer les tests. Vous devez préciser au minimum une valeur. Vous pouvez indiquer n'importe quel emplacement. Pour afficher la liste des emplacements valides, utilisez la méthode `GET available locations`.
*   **`tags`** (_facultatif_) : la liste des tags utilisés pour filtrer votre test lorsque vous le visualisez dans Datadog. Pour obtenir plus d'informations sur les tags personnalisés, consultez la section [Utiliser des tags][2].

Voici les différentes options de configuration disponibles en fonction du test que vous souhaitez créer :

**REQUEST** :

Vous devez préciser l'argument **`request`** pour les tests SSL, API et Browser. Il s'agit d'un objet contenant toutes les informations nécessaires pour effectuer la requête sur votre endpoint. Cet objet JSON possède les attributs suivants :

*   **`method`** (_obligatoire pour les tests Browser et API_) : la méthode d'API à tester. Les valeurs valides sont `GET`, `POST`, `PUT`, `PATCH` et `DELETE`. Utilisez `GET` pour un test Browser.
*   **`url`** (_obligatoire pour les tests Browser et API_) : l'endpoint de l'API que Datadog est en train de tester. Pour un test Browser, l'URL du site Web testé par Datadog.
*   **`host`** (_obligatoire pour les tests SSL_) : pour un test SSL, spécifiez le host sur lequel vous souhaitez vous connecter.
*   **`port`** (_obligatoire pour les tests SSL_) : pour un test SSL, spécifiez le port sur lequel vous souhaitez vous connecter.
*   **`basicAuth`** (_facultatif_) : si votre endpoint nécessite une authentification de base, utilisez ce paramètre pour définir votre nom d'utilisateur et votre mot de passe avec la valeur suivante : `{"username": "<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}`.
*   **`timeout`** (_facultatif_) : durée avant l'expiration de la requête.
*   **`headers`** (_facultatif pour les tests API_) : en-têtes dans la requête API.
*   **`body`** (_facultatif pour les tests API_) : le corps de la requête API. Accepte des chaînes de texte (y compris un JSON comme chaîne de texte). Spécifiez le type en indiquant le paramètre `property` `Content-Type` et le type, par exemple `application/json` ou `text/plain` dans le paramètre `headers`.
*   **`cookies`** (_facultatif pour les API_) : les cookies à envoyer avec votre requête de test API.

**OPTIONS** :

L'argument **`options`** est obligatoire pour les tests SSL, API et Browser. Utilisez-le pour indiquer les en-têtes des requêtes personnalisées, les identifiants de connexion, le contenu du corps, les cookies ou les redirections de suivi de test. Tous les paramètres facultatifs ont leur valeur par défaut si vous n'indiquez pas de valeur. Il s'agit d'un objet JSON avec les attributs suivants :

*  **`tick_every`:** (_obligatoire_ ) : la fréquence d'exécution du test. Les valeurs actuellement disponibles sont 60, 300, 900, 1800, 3600, 21600, 43200, 86400 et 604800 (en secondes).
*  **`min_failure_duration`** (_facultatif_) : la durée pendant laquelle le test doit être en état d'échec avant qu'une alerte soit envoyée (nombre entier, nombre de secondes, max. 7200). Valeur par défaut : 0.
*  **`min_location_failed`** (_facultatif_) : le nombre minimum d'emplacements qui doivent être en échec en même temps pendant au moins un moment donné dans la période `min_failure_duration` (min_location_failed et min_failure_duration font partie des règles d'alerte avancées - nombre entier, >= 1). Valeur par défaut : 1.
*  **`follow_redirects`** (_facultatif_) : indique s'il faut suivre ou non les redirections (booléen). Jusqu'à dix redirections peuvent être suivies avant de déclencher l'erreur « Too many redirects ». Les valeurs valides sont `true` ou `false`. Valeur par défaut : `false`.
*  **`device_ids`** (_obligatoire pour les tests Browser_) : le type d'appareil utilisé pour effectuer le test. Utilisez la méthode `GET devices for browser checks` pour obtenir la liste des appareils disponibles et utilisez l'`id` de la réponse. Vous devez indiquer au moins un appareil.

**ASSERTIONS** :

L'argument **`assertions`** est obligatoire pour les tests SSL et API. Il vous permet de définir précisément les critères de réussite d'un test. **Il s'agit d'un tableau d'objets JSON** avec les attributs suivants :

*   **`type`** (_obligatoire_) : la partie de la réponse que vous souhaitez évaluer. Les différents types possibles sont :

  * `header` : lorsque vous définissez un en-tête, vous devez spécifier la clé de paramètre d'en-tête dans le paramètre `property`, et la valeur du paramètre d'en-tête dans le paramètre `target`.
  * `body` : utilisez l'attribut `target` pour spécifier la valeur attendue pour `body`.
  * `responseTime` : utilisez l'attribut `target` pour spécifier la valeur attendue pour `responseTime`. Par exemple, `"target":180000`.
  * `statusCode` : utilisez l'attribut `target` pour spécifier la valeur attendue pour `statusCode`. Exemple : `"target":403`.
  * `certificate` : pour les tests SSL uniquement, utilisez l'attribut `target` pour spécifier la valeur attendue pour `certificate`. `"target":1` est un certificat valide, contrairement à `"target":0`.
  * `property` : uniquement pour les tests SSL, lorsque vous définissez une `property` de certificat, vous devez spécifier la clé de propriété de certificat dans le paramètre `property`, et la valeur de propriété de certificat dans le paramètre `target`.

*   **`target`** (_obligatoire_) : la valeur attendue de l'assertion.
*   **`property`** (_facultatif_ ) : lorsque vous configurez le paramètre `type` sur `header`, ce paramètre est obligatoire pour définir la clé de paramètre des en-têtes. Vous pouvez définir les valeurs sur toutes les clés d'en-tête, telles que `Content-Type` ou `Authorization`.
*   **`operator`** (_obligatoire_) : définit comment comparer la cible et la valeur actuelle de la réponse. Les opérateurs valides dépendent du `type` d'assertions. Voici la liste des opérateurs valides par type :

| type        | Opérateur valide                                                            | Type de valeur                                                                                                                                           |
| ---           | ---                                                                         | ---                                                                                                                                                  |
| `header`       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour `contains`, `does not contain`, `is` et `is not`.  [Expression régulière][3] pour `matches` et `does not match`. |
| `body`          | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour `contains`, `does not contain`, `is` et `is not`. [Expression régulière][3] pour `matches` et `does not match`. |
| `responseTime` | `lessThan`                                                                  | Nombre entier                                                                                                                                              |
| `statusCode`   | `is`, `is not`                                                              | Nombre entier                                                                                                                                              |
| `certificate` | `isInMoreThan` | Nombre entier |
| `property` | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour `contains`, `does not contain`, `is` et `is not`. [Expression régulière][3] pour `matches` et `does not match`. |

[1]: https://app.datadoghq.com/synthetics/list
[2]: /fr/synthetics/browser_tests/#record-test
[3]: https://en.wikipedia.org/wiki/Regular_expression
