---
title: Modifier un test
type: apicontent
order: 30.3
external_redirect: '/api/#edit-tests'
---
## Modifier un test

Utilisez cette méthode pour mettre à jour un test Synthetics existant. Vous devez envoyer la même charge utile que celle de création d'un test pour mettre à jour un test.

Les paramètres requis sont différents pour les tests Browser et d'API. Ils sont marqués comme suit : si un paramètre est marqué comme _obligatoire_, il est requis pour les deux types de tests.

Un test Browser est traité comme un test d'API GET. Cette méthode vous permet de mettre à jour le test Browser, mais vous devez utiliser l'IU pour [enregistrer votre test][1].

Vous devez envoyer un objet complet afin de mettre à jour la requête. Seuls ces paramètres sont modifiables : `name`, `tags`, `config` (tous les paramètres définis dans `assertions` et dans `request`), `message`, `options`, `locations` et `status`.

**ARGUMENTS**:

*   **`assertions`** (_obligatoire_) : ce paramètre permet de définir exactement ce qui doit se produire pour qu'un test soit considéré comme réussi. Chaque assertion dispose des éléments suivants : `type`, `operator`, `target` et éventuellement une `property`.
    *   **`type`** (_test d'API obligatoire_) : la partie de la réponse que vous souhaitez évaluer. Les types possibles sont `header`, `body`, `responseTime` et `statusCode`. Lorsque vous définissez un en-tête, vous devez indiquer la clé du paramètre d'en-tête dans le paramètre `property` et la valeur du paramètre d'en-tête avec le paramètre `target`. Pour tous les autres types, utilisez `target` pour spécifier le corps, le délai de réponse et les messages d'erreur. Par exemple, `"type":"statusCode"` peut avoir `"target":403`.
    *   **`operator`** (_test d'API obligatoire_) : définie comment comparer la cible et la valeur actuelle depuis la réponse. Les opérateurs valides dépendent du `type` d'assertions. Voici une liste des opérateurs valides par type :

<table>
 <tr>
    <th><code>type</code></th>
    <th><code>opérateur</code> valide</th>
    <th>Type de valeur</th>
  </tr>
  <tr>
    <td>Code de statut</td>
    <td><code>is</code>, <code>is not</code></td>
    <td>Nombre entier</td>
  </tr>
  <tr>
    <td>Délai de réponse</td>
    <td><code>less than</code></td>
    <td>Nombre entier</td>
  </tr>
  <tr>
    <td>En-têtes</td>
    <td><code>contains</code>, <code>does not contain</code>, <code>is</code>, <code>is not</code>, <code>matches</code>, <code>does not match</code></td>
    <td>pour <code>contains</code>/<code>does not contain</code>/<code>is</code>/<code>is not</code> : Chaîne Pour <code>matches</code>/<code>does not match</code> : <a href="https://docs.datadoghq.com/tagging/using_tags">RegexString</a></td>
  </tr>
  <tr>
    <td>Corps</td>
    <td><code>contains</code>, <code>does not contain</code>, <code>is</code>, <code>is not</code>, <code>matches</code>, <code>does not match</code></td>
    <td>Pour <code>contains</code>/<code>does not contain</code>/<code>is</code>/<code>is not</code> : Chaîne Pour <code>matches</code>/<code>does not match</code> : <a href="https://docs.datadoghq.com/tagging/using_tags">RegexString</a></td>
  </tr>
</table>

   *   **`target`** (_test d'API obligatoire_) : la valeur attendue de l'assertion. Pour `header`, les valeurs valides sont toutes les valeurs valides de la clé d'en-tête définies dans `property`. Pour `statusCode`, les valeurs valides sont les codes de statuts valides. Pour `responseTime`, les valeurs valides sont les délais de réponse attendus.
   *   **`property`** (_obligatoire_) : lorsque vous configurez un `type` `header`, ce paramètre est obligatoire pour définir la clé des paramètres des en-têtes. Les valeurs valides sont toutes les clés d'en-tête, telles que `Content-Type` ou `Authorization`.
*   **`request`** (_test d'API obligatoire_) : un objet contenant toutes les informations nécessaires pour effectuer la requête sur votre endpoint.
   *   **`method`** (_obligatoire_) : la méthode d'API à tester. Les valeurs valides sont `GET`, `POST`, `PUT`, `PATCH` et `DELETE`. Utilisez `GET` pour un test Browser.
   *   **`url`** (_obligatoire_) : l'endpoint de l'API que Datadog est en train de tester. Pour un test Browser, l'URL du site web testée par Datadog.
   *   **`timeout`** (_facultatif_) : indique le moment où la requête API va expirer.
   *   **`headers`** (_facultatif_) : en-têtes dans la requête API.
   *   **`body`** (_facultatif_) : le corps de la requête API. Accepte les chaînes de texte (notamment un fichier JSON en tant que chaîne de texte). Indiquez le type à l'aide du paramètre `Content-Type` `property` et le type (comme `application/json` ou `text/plain` dans le paramètre `headers`).
*   **`locations`** (_obligatoire_) : une liste de localisations à partir desquelles vous souhaitez envoyer les tests. Une valeur au moins est obligatoire et vous pouvez utiliser toutes les localisations. Pour une liste de localisations valides, utilisez la méthode `GET available locations`. Vous devez saisir au moins une valeur et vous pouvez utiliser toutes les localisations.
*   **`message`** (_obligatoire_) : une description du test.
*   **`name`** (_obligatoire_) : un nom unique pour le test.
*   **`options`** (_obligatoire_) : utilisez les options avancées pour indiquer les en-têtes des requêtes personnalisées, les identifiants de connexion, le contenu du corps, les cookies ou les redirections de suivi de test. Tous les paramètres en option utilisent leur valeur par défaut si vous n'indiquez pas de valeur. Les valeurs valides dans l'objet de requête sont :
    *  **`tick_every`:** (_obligatoire_) : la fréquence à laquelle le test doit s'exécuter. Les valeurs actuelles possibles sont 60, 300, 900, 1 800, 3 600, 21 600, 43 200, 86 400, 604 800 (en secondes).
    *  **`min_failure_duration`** (_facultatif_) : la durée pendant laquelle le test doit être en état d'échec avant qu'une alerte soit envoyée (nombre entier, nombre de secondes, max. 7 200). La valeur par défaut est 0.
    *  **`min_location_failed`** (_facultatif_) : le nombre minimum de localisations qui doivent être en échec en même temps pendant au moins un moment donné dans la période `min_failure_duration` (min_location_failed et min_failure_duration font partie des règles d'alerte avancées - nombre entier, >= 1. Valeur par défaut : 1.
    *  **`follow_redirects`** (_facultatif_) : indique s'il faut suivre ou non les redirections (booléen). Jusqu'à dix redirections peuvent être suivies avant de déclencher l'erreur « Too many redirects ». Les valeurs valides sont `true` ou `false`. Valeur par défaut : `false`.
    *  **`device_ids`** (_test Browser obligatoire_) : le type d'appareil que vous souhaitez utiliser pour effectuer le test. Utilisez la méthode `GET devices for browser checkes` pour obtenir une liste des appareils disponibles et utilisez l'`id` depuis la réponse. Vous devez indiquer au moins un appareil.
*   **`tags`** (_facultatif_) : les tags que vous souhaitez utiliser pour filtrer votre test lorsque vous le visualisez dans Datadog. Pour obtenir plus d'informations sur les tags personnalisés, consultez [Utiliser les tags][2].
*   **`type`** (_obligatoire_) : le type de test. Les valeurs valides sont `api` et `browser`.

[1]: /fr/synthetics/browser_tests/#record-test
[2]: /fr/tagging/using_tags