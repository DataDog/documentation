---
description: Surveillez le trafic des API pour évaluer le risque des endpoints, l'authentification,
  les flux de données sensibles et l'exposition.
title: Endpoints API
---
L'Explorer [API Endpoints][1] surveille le trafic des API pour offrir une visibilité sur la posture de sécurité de vos API, notamment :

- **Authentification** : Si l'API impose une authentification.
- **Méthode d'authentification** : Type d'authentification utilisé, tel que l'authentification de base (Basic Auth) et la clé d'API.
- **Exposition publique** : Si l'API traite du trafic provenant d'Internet.
- **Flux de données sensibles** : Données sensibles traitées par l'API et les flux entre les API.
- **Exposition aux attaques** : Si l'endpoint est ciblé par des attaques.
- **Logique métier** : Logique métier et suggestions de logique métier associées pour cette API.
- **Vulnérabilités** : Si l'endpoint contient une vulnérabilité (propulsé par [Code Security][2] et [Software Composition Analysis][3]).
- **Résultats** : Résultats de sécurité identifiés sur cette API.
- **Dépendances** : APIs et bases de données dont dépend l'API.

En utilisant les endpoints API, vous pouvez :

- Voir quels endpoints traitent des données sensibles, sont authentifiés, présentent des vulnérabilités ou des résultats, ou sont accessibles publiquement.
- Voir quels endpoints sont à risque et basculer directement vers le service [Threat Monitoring and Protection][4] pour une enquête ou une réponse plus approfondie.
- Voir quels endpoints sont associés à la logique métier de votre entreprise et trouver des suggestions de logique métier basées sur l'historique du trafic de votre endpoint.

## Configuration {#configuration}

Pour afficher les endpoints d'API sur vos services, **vous devez avoir activé la fonctionnalité App and API Protection Threat Detection**.

Pour l'intégration d'Amazon Web Services (AWS) API Gateway, vous devez configurer ce qui suit :

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

Les endpoints API sont découverts à partir du catalogue Datadog et plus précisément à partir des définitions d'API [téléversées sur Datadog][7]. Pour obtenir des instructions sur le téléversement des définitions d'API, consultez [Créer des entités][8].

Pour plus d'informations sur les versions de bibliothèque compatibles avec l'inventaire des API, consultez [Activation de la protection des applications et des API][9]. [Remote Configuration][10] est requis.

|Technologie|Version minimale du traceur| Prise en charge de l'analyse des données sensibles |
|----------|----------|----------|
|Python    | v2.1.6   | Requêtes et réponses |
|Java      | v1.31.0  | Requêtes uniquement |
|PHP      | v0.98.0  | Requêtes et réponses |
|.NET Core | v2.42.0  | Requêtes et réponses |
|.NET Fx   | v2.47.0  | Requêtes et réponses |
|Ruby      | v1.15.0  | Requêtes uniquement |
|Golang    | v1.59.0  | Requêtes uniquement |
|Node.js   | v3.51.0, v4.30.0 ou v5.6.0 | Requêtes et réponses |

**Remarque** : Sur les traceurs .NET Core et .NET Fx, vous devez définir la variable d'environnement `DD_API_SECURITY_ENABLED=true` pour que les fonctionnalités de sécurité des API fonctionnent correctement.

## Fonctionnement {#how-it-works}

API Endpoints collecte des métadonnées de sécurité sur le trafic API en utilisant le SDK Datadog avec App and API Protection activé, ainsi que les configurations d'Amazon API Gateway et les définitions d'API téléversées. Ces données incluent le schéma d'API découvert, les types de données sensibles (PII) traitées et le schéma d'authentification utilisé. Les informations sur l'API sont évaluées en continu, ce qui permet de garantir une vue complète et à jour de toute votre surface d'attaque API.

API Endpoints utilise [Remote Configuration][10] pour gérer et configurer les règles d'analyse qui détectent les données sensibles et l'authentification.

Pour vérifier si les endpoints découverts sont accessibles publiquement et nécessitent une authentification, activez l'[Analyse des endpoints][11]. L'analyse des endpoints analyse activement les endpoints éligibles et enrichit l'inventaire des API avec l'accessibilité publique vérifiée, le statut d'authentification, le statut de réponse HTTP et les dernières données d'évaluation.

Les risques suivants sont calculés pour chaque endpoint.

## Sources de données {#data-sources}

Dans l'Explorer [API Endpoints][1], les {{< ui >}}Data Sources{{< /ui >}} indiquent l'origine de la visibilité.

Les sources de données suivantes sont explorées.

### Amazon API Gateway {#amazon-api-gateway}

<div class="alert alert-info">Pour désactiver cette intégration pour une API spécifique, ajoutez le <code>dd_skip_endpoint:true</code> tag à la ressource.</div>

Le service Amazon API Gateway définit formellement la structure de votre API. L'intégration AWS de Datadog lit cette configuration prédéfinie depuis Amazon API Gateway, puis Datadog utilise cette configuration pour créer des entrées d'endpoint d'API dans {{< ui >}}Inventory{{< /ui >}}.

Utilisez {{< ui >}}AWS API Gateway{{< /ui >}} dans {{< ui >}}Data Source{{< /ui >}} pour obtenir une visibilité sur ces endpoints exposés. Vous pouvez également utiliser la requête `datasource:aws_apigateway`.

### Catalog {#catalog}

La source de données {{< ui >}}Catalog{{< /ui >}} affiche les endpoints d'API que Datadog a identifiés à partir de la spécification formelle téléchargée dans Datadog. La spécification d'API est jointe à, ou enregistrée en tant que, composant d'API dédié au sein de l'entité de service IDP.

Cette source garantit que votre inventaire d'API est complet en incluant tous les endpoints prévus et formellement documentés.

### Traces APM {#apm-traces}

La source de données {{< ui >}}Spans{{< /ui >}} affiche le trafic réel et l'exposition des données. La remédiation doit être effectuée immédiatement dans le code, la configuration ou les contrôles d'accès.

Les mesures que vous prenez dépendent de la surface d'attaque :

- **Vulnérabilités :** Corrigez toutes les bibliothèques vulnérables mises en évidence par SCA ou Runtime Code Analysis, puis redéployez le service.
- **Résultats d'API découverts :** Examinez chaque problème dans le contexte du service tracé, corrigez tout code ou configuration, puis validez à l'aide de nouvelles traces.
- **Traitement des données sensibles :** Confirmez que le traitement des données est conforme à la politique, nettoyez ou chiffrez les PII et limitez l'accès aux services nécessaires.
- **Endpoint non authentifié :** Si l'endpoint n'est pas intentionnellement public, appliquez l'authentification et mettez à jour les configurations du service.

### Découverte statique d'endpoints {#static-endpoint-discovery}

<div class="alert alert-info">La découverte statique d'endpoints est en préversion.</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">La découverte statique d'endpoints n'est pas disponible pour le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

La source de données {{< ui >}}Source Code{{< /ui >}} affiche les endpoints d'API découverts directement à partir de votre code source. Cela complète la découverte basée sur l'exécution en faisant apparaître les endpoints plus tôt dans le cycle de vie du développement, y compris les endpoints qui peuvent ne pas recevoir de trafic en direct.

Pour utiliser cette source de données, configurez l'[Intégration du code source][12] avec GitHub, GitLab ou Azure DevOps. Les langages et frameworks suivants sont pris en charge :

| Langage | Framework |
|----------|-----------|
| Python   | FastAPI, Flask, Tornado |
| Java     | Spring    |
| Go       | Beego, Chi, Echo, Fiber, Gin, Gorilla Mux, fasthttp, go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express, Fastify |

Pour filtrer les endpoints du code source, utilisez {{< ui >}}Source Code{{< /ui >}} dans la facette {{< ui >}}Data Source{{< /ui >}} ou la requête `datasource:source_code`. Les analyses sont exécutées lorsque le code est envoyé vers la branche par défaut et selon un planning récurrent de 8 heures. Les endpoints découverts sont supprimés après 12 heures s'ils ne sont pas redécouverts lors d'une analyse ultérieure.

#### Mapper les endpoints du code source aux services {#map-source-code-endpoints-to-services}

La découverte statique d'endpoints utilise des heuristiques pour déduire à quel service appartient un endpoint. Pour un mappage plus précis, définissez explicitement les relations service-code en utilisant le champ `codeLocations` dans votre [définition de service de catalogue (schéma v3)][13] :

```yaml
apiVersion: v3
kind: service
metadata:
  name: my-service
  owner: my-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

Sans `codeLocations` explicite, les endpoints peuvent ne pas fusionner correctement avec les données provenant d'autres sources.

## Afficher et comparer les schémas des endpoints {#view-and-compare-endpoint-schemas}

API Posture construit un schéma OpenAPI pour chaque endpoint à partir du trafic qu'il observe. Ce schéma **déduit** décrit ce que votre API expose en production : ses chemins, ses paramètres, ses corps de requête et de réponse, ainsi que son authentification. Lorsque votre équipe publie également un schéma **déclaré**, une définition OpenAPI enregistrée dans le Datadog Software Catalog, vous pouvez comparer les deux pour découvrir où l'API en cours d'exécution a divergé de sa documentation.

### Afficher le schéma d'un endpoint {#view-an-endpoints-schema}

Dans [API Endpoints][1], cliquez sur un endpoint pour ouvrir son panneau de détails. La section **Définition** affiche les paramètres de requête, le corps de la requête et les réponses de l'endpoint. Les champs contenant des données sensibles sont marqués avec le type de données sensibles observé.

{{< img src="/security/application_security/api/api_endpoint_definition_schema_cropped.png" alt="La section Définition du panneau de détails d'un endpoint, affichant ses paramètres de requête ainsi que les boutons Voir le schéma brut et Voir les schémas déduits" style="width:100%;" >}}

Lorsque l'endpoint est associé à une API dans le Datadog Software Catalog, la section **Définition** affiche la spécification OpenAPI déclarée. Sinon, elle affiche le schéma déduit du trafic en direct.

Dans la section **Définition**, vous pouvez :

- {{< ui >}}View Raw Schema{{< /ui >}} : Voir le schéma affiché sous forme de YAML brut.
- {{< ui >}}View Inferred Schemas{{< /ui >}} : Voir le schéma déduit du trafic en direct sous forme d'aperçu ou de YAML, même lorsqu'un schéma déclaré est disponible. Le schéma déduit peut être exporté en tant que fichier OpenAPI au format YAML ou JSON.

Pour réduire le bruit, le schéma déduit n'inclut que les champs observés au moins trois fois et supprime les champs qui n'ont pas été observés à nouveau dans les 7 jours. Cela évite que le trafic ponctuel, tel qu'une requête mal formée unique ou un attaquant sondant un endpoint avec un champ inattendu, ne pollue le schéma déduit. Sinon, cela pourrait apparaître comme une dérive lors de la comparaison avec le schéma déclaré.

### Comparer les schémas déclarés et déduits {#compare-declared-and-inferred-schemas}

Pour comparer les schémas déduits et déclarés, vous devez :

- [Activer la protection des applications et des API][9] sur le service afin que les endpoints soient découverts à partir du trafic en direct.
- Enregistrez la définition OpenAPI du schéma déclaré dans le Datadog Software Catalog. Voir [Créer des entités][8].

Les différences de schéma apparaissent directement dans la vue du schéma de l'endpoint, mises en évidence selon leur gravité :

| Gravité | Signification |
|----------|---------|
| Breaking | La modification risque de rompre la compatibilité avec les clients qui dépendent du contrat déclaré, par exemple lorsqu'un champ devient requis ou lorsque le type de paramètre est modifié. |
| Avertissement | La modification présente une dérive qui mérite d'être examinée, telle qu'un champ non déclaré détecté dans le trafic ou un paramètre devenu optionnel. |
| Info | La différence présente un faible risque, comme un endpoint déclaré mais pour lequel aucun trafic n'a été observé. |

Les différences peuvent apparaître dans les zones suivantes du schéma :

- **Paramètres** : un paramètre ajouté, supprimé ou modifié d'optionnel à requis (ou l'inverse).
- **Corps de la requête** : un corps de requête ajouté, supprimé ou modifié d'optionnel à requis (ou l'inverse).
- **Propriétés du schéma** : une propriété ajoutée, supprimée, modifiée d'optionnel à requis (ou l'inverse), ou dont le type, le format, la nullabilité ou les valeurs d'énumération ont été modifiés.
- **Contraintes de valeur** : une limite numérique ou de longueur (`minimum`, `maximum`, `minLength`, `maxLength`), un motif ou une contrainte d'unicité modifiés.
- **Composition du schéma** : une inadéquation introduite dans la composition `oneOf` ou `allOf`, ou dans un discriminateur.
- **Réponses** : un code d'état, un en-tête de réponse ou un type de contenu ajouté ou supprimé.

Pour réduire le bruit, certaines différences sont exclues car elles ne représentent pas une dérive significative du contrat :

- **Paramètres d'en-tête de requête et de cookie :** ils contiennent souvent des valeurs telles que des jetons d'authentification ou des identifiants de session qui ne font pas partie du contrat d'API.
- **Modifications de type sur les paramètres de requête :** les paramètres de requête sont toujours observés sous forme de chaînes dans le trafic, même lorsqu'ils sont déclarés comme un autre type, tel qu'un entier ou un booléen.
- **Codes d'état supprimés :** Le schéma déduit n'inclut que les codes d'état observés dans le trafic, donc un code d'état déclaré qui ne s'est pas encore produit pendant l'observation apparaît toujours comme supprimé.
- **`anyOf` inadéquations de composition :** Les schémas déclarés et déduits peuvent utiliser `anyOf` à différents niveaux du schéma tout en restant équivalents.

## Traitement des données sensibles {#processing-sensitive-data}

App and API Protection détecte et classifie les données sensibles traitées par vos endpoints, en marquant chaque endpoint avec la catégorie et le type de données trouvés. Pour voir quels endpoints traitent des données sensibles et pour créer des scanners de données API personnalisés, consultez [Sensitive Data][16].

## Logique métier {#business-logic}

Ces tags (`users.login.success`, `users.login.failure`, etc.) sont déterminés par la présence de traces de logique métier associées à l'endpoint.

<div class="alert alert-tip">Datadog peut suggérer un tag de logique métier pour votre endpoint en fonction de sa méthode HTTP, de ses codes de statut de réponse et de son URL.</div>

## Accessible publiquement {#publicly-accessible}

Datadog marque un endpoint comme public si l'adresse IP du client est en dehors de ces plages :

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

Consultez [Configuring a client IP header][14] pour plus d'informations sur la configuration de la bibliothèque requise.

## Authentification d'endpoint {#endpoint-authentication}

L'authentification est déterminée par :

- La présence d'en-têtes `Authorization`, `Token` ou `X-Api-Key`.
- La présence d'un identifiant utilisateur dans la trace (par exemple, l'attribut APM `@usr.id`).
- Un code de statut 401 ou 403 renvoyé par l'endpoint.
- Règles personnalisées de [Endpoint Tagging][15] que vous avez configurées


Lorsque le type d'authentification est disponible, Datadog le signale dans un en-tête via la facette {{< ui >}}Authentication Method{{< /ui >}}.

### Méthodes d'authentification prises en charge {#supported-authentication-methods}

| Catégorie                                          | Facette de catégorie   |
|---------------------------------------------------|------------------|
| Jeton Web JSON (JWT)                              | `json_web_token` |
| Jetons porteur (trouvés dans les en-têtes `Authorization`)  | `bearer_token`   |
| Authentification de base                              | `basic_auth`     |
| Authentification par accès digest                      | `digest_auth`    |

### Prise en charge de l'authentification personnalisée {#custom-authentication-support}

La détection de l'authentification personnalisée est possible en configurant les [Règles de marquage d'endpoint][15]. Ces règles nécessitent les versions minimales de traceur suivantes :

|Technologie| Version minimale du traceur |
|----------|------------------------|
|Java      | v1.55.0                |
|.NET      | À venir            |
|Node.js   | v5.76.0                |
|Python    | v3.17.0                |
|Ruby      | v2.23.0                |
|PHP       | v1.15.0                |
|Golang    | v2.4.0                 |

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /fr/security/code_security/iast/
[3]: /fr/security/code_security/software_composition_analysis/
[4]: /fr/security/application_security/
[5]: /fr/integrations/amazon-web-services
[6]: /fr/integrations/amazon-api-gateway
[7]: /fr/internal_developer_portal/catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /fr/internal_developer_portal/catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /fr/security/application_security/setup/
[10]: /fr/tracing/guide/remote_config/
[11]: /fr/security/application_security/api_posture/endpoint_scanning/
[12]: /fr/integrations/guide/source-code-integration/
[13]: /fr/internal_developer_portal/catalog/entity_model/
[14]: /fr/security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[15]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
[16]: /fr/security/application_security/api_posture/sensitive_data/