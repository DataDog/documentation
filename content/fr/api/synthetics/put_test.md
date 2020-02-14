---
title: Modifier un test
type: apicontent
order: 31.3
external_redirect: '/api/#modifier-un-test'
---
## Modifier un test

Utilisez cette méthode pour mettre à jour un test Synthetics existant. Vous devez envoyer la même charge utile que celle de création d'un test pour mettre à jour un test.

Les paramètres requis sont différents pour les tests Browser et API. Ils sont marqués comme suit : si un paramètre est marqué comme _obligatoire_, il est requis pour les deux types de tests.

Un test Browser est traité comme un test API GET. Cette méthode vous permet de mettre à jour le test Browser, mais vous devez utiliser l'IU pour [enregistrer votre test][1].

Vous devez envoyer un objet complet afin de mettre à jour la requête. Seuls ces paramètres sont modifiables : `name`, `tags`, `config` (tous les paramètres définis dans `assertions` et dans `request`), `message`, `options`, `locations` et `status`.

**ARGUMENTS**:

Les arguments principaux pour votre test sont :

* **`name`** (_obligatoire_) : un nom unique pour le test.
* **`type`** (_obligatoire_) : le type de test. Les valeurs valides sont `api` et `browser`.
* **`subtype`** - _obligatoire pour le test SSL_ - Pour un test d'API SSL, spécifiez `ssl` comme valeur. Sinon, vous devriez omettre cet argument.
* **`request`** - _obligatoire_ - La requête associée à votre test SSl et d'API. Pour en savoir plus, consultez la section ci-dessous relative aux requêtes.
* **`options`** - _obligatoire_ - La liste des options permettant de personnaliser votre test. Pour en savoir plus, consultez la section ci-dessous relative aux options.
* **`message`** (_obligatoire_) : une description du test.
* **`assertions`** - _obligatoire pour les tests SSL et d'API_ - Les assertions associées à votre test. Pour en savoir plus, consultez la section ci-dessous relative aux assertions.
* **`locations`** - _obligatoire_ - Une liste de localisations à partir desquelles vous souhaitez envoyer les tests. Une valeur au moins est obligatoire et vous pouvez utiliser toutes les localisations. Pour une liste de localisations valides, utilisez la méthode `GET available locations`.
* **`tags`** - _facultatif_ - Une liste des tags utilisés pour filtrer votre test lorsque vous le visualisez dans Datadog. Pour obtenir plus d'informations sur les tags personnalisés, consultez [Utiliser les tags][2].

Options de configuration disponibles en fonction du test que vous souhaitez créer :

**REQUÊTE** :

L'argument **`request`** est obligatoire pour les tests SSL, d'API et browser. Il s'agit d'un objet contenant toutes les informations nécessaires pour effectuer la requête sur votre endpoint. C'est un objet JSON avec les attributs suivants :

* **`method`** - _obligatoire pour le test browser et d'API_ -  La méthode d'API à tester. Les valeurs valides sont `GET`, `POST`, `PUT`, `PATCH` et `DELETE`. Utilisez `GET` pour un test browser.
* **`url`** - _obligatoire pour le test browser et d'API_ - L'endpoint de l'API que Datadog est en train de tester. Pour un test browser, l'URL du site web testé par Datadog.
* **`host`** - _obligatoire pour le test SSL_ - Pour un test SSL, spécifiez le host sur lequel vous souhaitez vous connecter.
* **`port`** - _obligatoire pour le test SSL_ - Pour un test SSL, spécifiez le port sur lequel vous souhaitez vous connecter.
* **`basicAuth`** - _facultatif_ - Si votre endpoint est sous basic Auth, utilisez ce paramètre pour définir votre nom d'utilisateur et mot de passe avec la valeur suivante : `{"username": "<NOMUTILISATEUR>", "password": "<MOTDEPASSE>"}`.
* **`timeout`** - _facultatif_ - Lorsque la requête va expirer.
* **`headers`** - _facultatif pour le test d'API_ - En-têtes dans la requête API.
* **`body`** - _facultatif pour le test d'API_ - Le corps de la requête API. Accepte des chaînes de texte (y compris un JSON comme chaîne de texte). Spécifiez le type en utilisant le paramètre `property` `Content-Type` et le type, par exemple `application/json` ou `text/plain` dans le paramètre `headers`.
* **`cookies`** - _facultatif pour le test d'API_ - Les cookies à envoyer avec votre requête de test d'API.

**OPTIONS** :

L'argument **`options`** est obligatoire pour les tests SSL, d'API et browser. Utilisez-le pour indiquer les en-têtes des requêtes personnalisées, les identifiants de connexion, le contenu du corps, les cookies ou les redirections de suivi de test. Tous les paramètres facultatifs ont leur valeur par défaut si vous n'indiquez pas de valeur. Il s'agit d'un objet JSON avec les attributs disponibles suivants :

* **`tick_every`:** - _obligatoire_ - La fréquence à laquelle le test doit s'exécuter. Les valeurs actuelles possibles sont 60, 300, 900, 1 800, 3 600, 21 600, 43 200, 86 400 et 604 800 (en secondes).
* **`min_failure_duration`** (_facultatif_) : la durée pendant laquelle le test doit être en état d'échec avant qu'une alerte soit envoyée (nombre entier, nombre de secondes, max. 7 200). La valeur par défaut est 0.
* **`min_location_failed`** - _facultatif_ - Le nombre minimum de localisations en échec en même temps pendant au moins un moment donné dans la période `min_failure_duration` (min_location_failed et min_failure_duration font parti des règles d'alerte avancées - nombre entier, >= 1. Valeur par défaut : 1.
* **`follow_redirects`** - _facultatif_ - Booléen qui indique s'il faut suivre ou non les redirections. Jusqu'à dix redirections peuvent être suivies avant de déclencher l'erreur « Too many redirects ». Les valeurs valides sont `true` ou `false`. Valeur par défaut : `false`.
* **`device_ids`** - _obligatoire pour le test browser_ - Le type d'appareil utilisé pour effectuer le test. Utilisez la méthode `GET devices for browser checks` pour obtenir une liste des appareils disponibles et utilisez l'`id` depuis la réponse. Vous devez indiquer au moins un appareil.

**ASSERTIONS** :

L'argument **`assertions`** est obligatoire pour les tests SSL et d'API. Il vous permet de définir exactement les critères de réussite d'un test. **Il s'agit d'un tableau d'objets JSON** avec les attributs disponibles suivants :

* **`type`** - _obligatoire_ - La partie de la réponse que vous souhaitez évaluer, Les types possibles sont :

  * `header` : Lorsque vous définissez un en-tête, vous devez spécifier la clé de paramètre d'en-tête dans le paramètre `property`, et la valeur du paramètre d'en-tête dans le paramètre `target`.
  * `body` : Utilisez l'attribut `target` pour spécifier la valeur attendue pour `body`.
  * `responseTime` : Utilisez l'attribut `target` pour spécifier la valeur attendue pour `responseTime`. Par exemple, `"target":180000`.
  * `statusCode` : Utilisez l'attribut `target` pour spécifier la valeur attendue pour `statusCode`. Par exemple, `"target":403`.
  * `certificate` : Uniquement pour les tests SSL, utilisez l'attribut `target` pour spécifier la valeur attendue pour `certificate`. `"target":1` est un certificat valide, `"target":0` est un certificat non valide.
  * `property` : Uniquement pour les tests SSL, lorsque vous définissez une `property` de certificat, vous devez spécifier la clé de propriété de certificat dans le paramètre `property`, et la valeur de propriété de certificat dans le paramètre `target`.

* **`target`** - _obligatoire_ - La valeur attendue de l'assertion.
* **`property`** _facultatif_) - Lorsque vous configurez le paramètre `type` sur `header`, ce paramètre est obligatoire pour définir la clé de paramètre des en-têtes. Les valeurs valides sont toutes les clés d'en-tête, telles que `Content-Type` ou `Authorization`.
* **`operator`** - _obligatoire_ - Définit comment comparer la cible et la valeur actuelle depuis la réponse. Les opérateurs valides dépendent du `type` d'assertions. Voici une liste des opérateurs valides par type :

| type           | Opérateur valide                                                              | Type de valeur                                                                                                 |
|----------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `header`       | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour `contains`/`does not contain`/`is`/`is not`.  [RegexString][3] pour : `matches`/`does not match`. |
| `body`         | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour : `contains`/`does not contain`/`is`/`is not`. [RegexString][3] pour : `matches`/`does not match`. |
| `responseTime` | `lessThan`                                                                  | Nombre entier                                                                                                    |
| `statusCode`   | `is`, `is not`                                                              | Nombre entier                                                                                                    |
| `certificate`  | `isInMoreThan`                                                              | Nombre entier                                                                                                    |
| `property`     | `contains`, `does not contain`, `is`, `is not`, `matches`, `does not match` | Chaîne pour : `contains`/`does not contain`/`is`/`is not`. [RegexString][3] pour : `matches`/`does not match`. |

[1]: /fr/synthetics/browser_tests/#record-test
[2]: /fr/tagging/using_tags
[3]: https://en.wikipedia.org/wiki/Regular_expression