---
description: Comprenez comment la politique Azure API Management appelle le service
  de callout App and API Protection, applique les décisions de blocage et propage
  le contexte de trace.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: Documentation
  text: Activation de App and API Protection pour Azure API Management
- link: /security/application_security/setup/azure/api-management/configuration
  tag: Documentation
  text: Configuration du callout Azure API Management
- link: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
  tag: Documentation
  text: Politique send-request Azure API Management
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Code source
  text: Code source du callout App and API Protection pour Azure API Management
title: Politiques Azure API Management pour App and API Protection
---
{{< callout url="#" btn_hidden="true" header="App and API Protection pour Azure API Management est en préversion" >}}
Pour essayer la préversion de App and API Protection pour Azure API Management, utilisez les instructions de configuration suivantes.
{{< /callout >}}

L'intégration de App and API Protection pour Azure API Management (APIM) utilise la politique native APIM [`send-request`][1] pour appeler le service de callout Datadog et lit la décision à partir d'une variable de politique.

Trois documents de politique sont fournis dans [`deploy/azure/policies`][2] :

| Fichier                       | Contenu                                              |
|----------------------------|-------------------------------------------------------|
| `azure-apim-full.xml`      | Le document de politique complet, avec les deux sections.     |
| `azure-apim-inbound.xml`   | La section inbound uniquement.                             |
| `azure-apim-outbound.xml`  | La section outbound uniquement.                            |

Utilisez le document complet pour une nouvelle politique. Si vous avez déjà un contenu de politique, utilisez les fragments inbound et outbound pour fusionner les étapes Datadog dans les sections correspondantes.

## Application de la politique {#applying-the-policy}

Azure API Management évalue les politiques au niveau global, de l'espace de travail, du produit, de l'API et de l'opération, et `<base />` contrôle à la fois l'héritage et l'ordre entre ces périmètres. Attachez la politique Datadog au périmètre que vous souhaitez protéger : toutes les API, un seul produit, une API ou une opération.

La politique est fournie avec l'URL d'espace réservé `https://<dd-apim-callout-host>:8080`. Avant de l'appliquer, remplacez chaque occurrence de cette URL entière par la sortie `calloutBaseUrl` du déploiement. Cette sortie est `http://<ACA-FQDN>` sauf si vous définissez `enableHttps` sur `true`, et elle n'inclut pas de port, donc remplacez l'URL entière plutôt que le nom de host seul. Le déploiement effectue la même substitution pour vous lorsque vous définissez `deployPolicy` sur `true`, et son paramètre `targetApiIds` sélectionne les API qui reçoivent la politique.

`azure-apim-full.xml` contient un élément `<base />` dans chacune de ses quatre sections. APIM les rejette au niveau global, donc si vous appliquez le fichier à toutes les API, supprimez d'abord chaque élément `<base />`. Gardez-les lorsque vous appliquez la politique à un produit, une API ou une opération, car ils contrôlent l'héritage depuis le périmètre englobant. Le déploiement applique la même règle pour vous : il supprime les éléments pour les déploiements sur toutes les API et les conserve lorsque `targetApiIds` nomme des API spécifiques.

La politique a cette forme :

```xml
<policies>
  <inbound>
    <base />
    <!-- Phase 1: serialize request headers, call the service, read the decision -->
    <!-- Phase 2 (conditional): send the request body when the service asks for it -->
    <!-- If blocked: return-response. Otherwise: inject x-datadog-* headers -->
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <!-- Phase 3: serialize response headers, call the service, read the decision -->
    <!-- Phase 4 (conditional): send the response body when the service asks for it -->
    <!-- If blocked: return-response -->
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```

## Fonctionnement du callout {#how-the-callout-works}

Chaque callout est un `send-request` avec `mode="new"`, `timeout="3"` et `ignore-error="true"`. Chaque callout publie `application/json` vers le service de callout. La politique stocke chaque réponse dans `ddPhase1Response` à `ddPhase4Response` et le corps JSON analysé correspondant dans `ddPhase1` à `ddPhase4`.

L'échange comporte quatre phases :

1. **En-têtes de requête.** La politique sérialise la méthode de requête, le schéma, l'autorité, le chemin avec la chaîne de requête, l'adresse IP du client et les en-têtes, puis les publie. Le service répond avec un ID de requête, des en-têtes de propagation de trace et, lorsque l'inspection du corps s'applique, une taille de corps acceptée. La politique stocke l'ID de requête dans la variable `ddRequestId`.
2. **Corps de la requête.** S'exécute uniquement lorsque la phase 1 renvoie une taille de corps acceptée. La politique encode le corps de la requête en base64, le tronque à cette taille et le publie avec l'ID de requête.
3. **En-têtes de réponse.** La politique publie le code d'état de la réponse et les en-têtes avec l'ID de requête.
4. **Corps de la réponse.** S'exécute uniquement lorsque la phase 3 a renvoyé une taille de corps acceptée, et traite le corps de la même manière que la phase 2.

L'ID de requête lie les quatre phases à un seul contexte d'évaluation Datadog Web Application Firewall (WAF). Le service de callout conserve ce contexte dans un cache en mémoire dont la durée de vie est de 30 secondes par défaut, définie par `DD_APIM_CALLOUT_REQUEST_TIMEOUT`. Le contexte est créé dans la phase 1, conservé entre les phases, et libéré après la phase finale ou après un blocage.

## Blocage {#blocking}

Lorsque le WAF décide de bloquer, le service de callout répond avec un objet `block` :

```json
{
  "block": {
    "status": 403,
    "headers": { "Content-Type": ["application/json"] },
    "content": "<base64-encoded body>"
  }
}
```

La politique détecte `block` et appelle `return-response` pour envoyer le code d'état, définit `Content-Type` à partir de `block.headers` (par défaut `application/json` en cas d'absence), et écrit le corps en décodant `block.content` en base64.

Comme `return-response` annule le reste du pipeline, un blocage pendant une phase entrante signifie que votre backend n'est jamais appelé.

## Comportement en cas d'échec avec ouverture {#fail-open-behavior}

Chaque chemin d'échec laisse passer le trafic :

| Scénario                                                     | Résultat                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Le service de callout est injoignable, ou la requête expire    | `ignore-error="true"` laisse la variable de réponse non définie. La politique ignore le check, et le trafic continue. |
| Le callout répond avec un statut autre que `200`           | La politique traite le résultat comme une autorisation, et le trafic continue.                                        |
| Le callout reçoit un JSON invalide                            | Il renvoie `400` avec `{}`, et la politique traite le résultat comme une autorisation.                               |
| L'ID de requête est inconnu dans une phase ultérieure                   | Le service répond `200` avec `{}`, et aucun blocage n'est appliqué.                                        |
| Le WAF expire, ou le processeur signale une erreur         | Le service renvoie `200` avec `{}`, et aucun blocage n'est appliqué.                                        |
| L'état de la requête en cache a dépassé sa durée de vie | L'état orphelin est libéré et le trafic se poursuit.                                               |

Comme chaque chemin d'échec autorise le trafic, une mauvaise configuration apparaît comme des données de sécurité manquantes plutôt que comme un trafic interrompu. Lorsque des signaux sont manquants, vérifiez les points suivants :

1. La politique est attachée à l'API vers laquelle vous envoyez du trafic, à un périmètre qui s'y applique.
2. La politique appelle la bonne URL. Comparez la valeur `set-url` avec la sortie `calloutBaseUrl` du déploiement, y compris le schéma et le port.
3. La passerelle peut atteindre le service de callout sur cette URL. Un callout qui n'arrive jamais ne laisse aucune trace dans la politique, car `ignore-error="true"` le masque.
4. Les logs du service de callout montrent les requêtes entrantes. S'ils ne le font pas, la passerelle ne l'atteint pas.
5. Le service de callout peut atteindre le Datadog Agent sur le port `8126`, et l'agent a `DD_APM_ENABLED` et `DD_APM_NON_LOCAL_TRAFFIC` réglés sur `true`. Sans cela, le service évalue le trafic mais rien n'arrive dans Datadog.

La construction du corps JSON avec `set-body` et le parsing de la variable de réponse prennent chacune moins de 0,1 ms, et l'évaluation conditionnelle prend moins de 0,01 ms. Le coût dominant est le temps d'aller-retour réseau vers le service de callout.

## Propagation du contexte de trace {#trace-context-propagation}

Lorsque la requête est autorisée, la phase 1 renvoie des en-têtes de propagation et la politique les injecte dans la requête avant de la transmettre au backend :

- `x-datadog-trace-id`
- `x-datadog-parent-id`
- `x-datadog-sampling-priority`
- `x-datadog-origin`
- `x-datadog-tags`

La présence de ces en-têtes sur la requête backend confirme que la politique entrante a été exécutée et a autorisé la requête.

## Identification de l'intégration dans Datadog {#identifying-the-integration-in-datadog}

Le service de callout apparaît dans APM en tant que service `apim-callout`, et ses spans portent le tag `component:apim-callout`. Pour utiliser un nom de service différent, définissez `DD_SERVICE` sur le conteneur de callout.

Lorsque le WAF correspond à une requête, le span porte également des tags App and API Protection, notamment `appsec.event`, `appsec.blocked` et `http.client_ip`.

L'adresse IP du client provient de la valeur que la politique envoie en phase 1. Cette valeur définit `http.client_ip`, même lorsqu'un autre proxy se trouve devant APIM.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout/deploy/azure/policies