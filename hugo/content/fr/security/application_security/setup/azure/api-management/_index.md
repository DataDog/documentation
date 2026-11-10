---
description: Ajoutez la détection et le blocage des menaces à votre passerelle Azure
  API Management avec le service de callout App and API Protection.
further_reading:
- link: /security/application_security/setup/azure/api-management/configuration
  tag: Documentation
  text: Configuration du callout Azure API Management
- link: /security/application_security/setup/azure/api-management/policies
  tag: Documentation
  text: Politiques Azure API Management pour App and API Protection
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Code source
  text: Code source du callout App and API Protection pour Azure API Management
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: Règles de protection des applications et des API prêtes à l'emploi
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Activation de App and API Protection pour Azure API Management
---
{{< callout url="#" btn_hidden="true" header="App and API Protection pour Azure API Management est en préversion" >}}
Pour essayer la préversion de App and API Protection pour Azure API Management, utilisez les instructions de configuration suivantes.
{{< /callout >}}

App and API Protection pour Azure API Management (APIM) ajoute la détection et le blocage des menaces à votre passerelle APIM sans nécessiter de modifications de votre code backend. APIM est un service géré, il ne peut donc pas exécuter de traceur in-process. Au lieu de cela, Datadog fournit un service de callout HTTP que la passerelle appelle à partir d'une politique APIM. Pour chaque requête, le service exécute le Web Application Firewall (WAF) de Datadog et renvoie une décision : continuer ou bloquer.

La protection s'applique au niveau de la passerelle, elle couvre donc chaque API située derrière la passerelle, indépendamment du langage. Cela inclut les API tierces et héritées que vous ne possédez pas.

## Fonctionnement {#how-it-works}

Azure API Management évalue les politiques à l'entrée et à la sortie. La politique Datadog ajoute un [`send-request`][1] callout au service de callout Datadog à chaque phase, puis lit la décision à partir d'une variable de politique.

L'échange utilise quatre appels :

1. **Entrant, en-têtes de requête.** Le service renvoie un ID de requête, des en-têtes de propagation de trace Datadog et, lorsque l'inspection du corps s'applique, le nombre d'octets du corps qu'il accepte.
2. **Entrant, corps de la requête.** S'exécute uniquement lorsque la phase précédente a demandé le corps.
3. **Sortant, en-têtes de réponse.**
4. **Sortant, corps de réponse.** S'exécute uniquement lorsque la phase précédente a demandé le corps.

L'ID de requête lie les quatre phases à un contexte d'évaluation WAF unique. Si une phase entrante renvoie une décision de blocage, APIM renvoie la réponse de blocage au client et n'appelle jamais votre backend. Si une phase sortante renvoie une décision de blocage, le backend a déjà été exécuté et APIM remplace sa réponse par la réponse de blocage. Si la décision est de continuer, APIM injecte des en-têtes de contexte de trace Datadog et transmet la requête comme d'habitude.

L'intégration est en mode « fail-open » à chaque phase. Chaque callout définit `ignore-error="true"`, donc si le service de callout est injoignable, dépasse le délai d'attente, ou répond par autre chose que `200`, le trafic continue sans modification. Une mauvaise configuration se manifeste par des données de sécurité manquantes plutôt que par un trafic interrompu.

Pour les détails internes de la stratégie, consultez [Stratégies Azure API Management pour la protection des applications et des API][2].

## Prérequis {#prerequisites}

- Un abonnement Azure.
- Une instance Azure API Management existante sur le niveau **Développeur**, **Standard v2** ou **Premium**. Cette intégration place le service de callout à l'intérieur d'un réseau virtuel et nécessite une intégration au réseau virtuel APIM ; le niveau **Consommation** n'est donc pas pris en charge.
- Une [clé d'API Datadog][3].
- Autorisation de déployer des modèles ARM ou Bicep dans le groupe de ressources cible et de modifier les stratégies APIM.
- `Microsoft.Authorization/roleAssignments/write` sur la ressource APIM. Le modèle accorde le rôle **Contributeur du service Gestion des API** à une identité gérée afin qu'elle puisse configurer l'intégration au réseau virtuel. Cette attribution de rôle est créée à chaque déploiement, y compris lorsque `deployPolicy` est `false`.
- Facultatif : un espace de travail Log Analytics existant pour collecter les logs de Container Apps.

## Déployer le service de callout {#deploy-the-callout-service}

Cliquez sur **Déployer sur Azure** et remplissez le formulaire dans le portail Azure :

[![Déployer sur Azure](https://aka.ms/deploytoazurebutton)][4]

Deux paramètres sont requis :

| Paramètre         | Valeur                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `datadogApiKey`   | Votre clé d'API Datadog. Dans le portail Azure, sélectionnez **Référencer un secret Key Vault** pour utiliser un secret Key Vault existant.|
| `apimServiceName` | Le nom de l'instance APIM existante à protéger.                                                                                          |

Le modèle provisionne :

- Un réseau virtuel avec des sous-réseaux distincts pour APIM, le service de callout et le Datadog Agent. Le modèle crée également des groupes de sécurité réseau et une passerelle NAT pour la sortie.
- Le service de callout sur Azure Container Apps avec autoscaling HTTP KEDA. L'entrée se fait sur le port `8080`, la sonde d'intégrité sur le port `8081`, et le service passe de 1 à 10 réplicas à raison de 20 requêtes simultanées par réplica.
- Le Datadog Agent sur Azure Container Instances dans un sous-réseau privé. Le service de callout envoie les traces et les événements de sécurité à l'Agent.
- Une zone DNS privée et une liaison de réseau virtuel afin qu'APIM puisse résoudre le nom de host interne des Container Apps.
- Intégration de réseau virtuel sur l'instance APIM existante et, éventuellement, la politique Datadog elle-même.

Tous les autres paramètres ont une valeur par défaut. Les valeurs par défaut utiles incluent :

| Paramètre                     | Valeur par défaut                                              |
|-------------------------------|------------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                            |
| `datadogSite`                 | {{< region-param key="dd_site" code="true" >}}       |
| `deployPolicy`                | `false`                                              |
| `enableHttps`                 | `false`                                              |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest`    |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                        |
| `minReplicas` / `maxReplicas` | `1` / `10`                                           |
| `concurrentRequestsThreshold` | `20`                                                 |
| `targetApiIds`                | Vide, ce qui s'applique à toutes les API                     |

Pour déployer à partir de la ligne de commande ou de votre propre infrastructure en tant que code, consultez [Configuration du callout Azure API Management][5].

## Appliquez la stratégie Datadog {#apply-the-datadog-policy}

Le service de callout inspecte uniquement le trafic que la passerelle lui envoie, donc attachez la stratégie Datadog aux API que vous souhaitez protéger.

Vous avez deux options :

- Définissez `deployPolicy` sur `true` et laissez le déploiement injecter la stratégie. Le paramètre `targetApiIds` sélectionne les API qui reçoivent la stratégie et s'applique par défaut à toutes les API.
- Appliquez vous-même le XML de stratégie fourni dans l'éditeur de stratégie APIM. Remplacez chaque occurrence de l'URL d'espace réservé `https://<dd-apim-callout-host>:8080` par la sortie `calloutBaseUrl` du déploiement, et non par le nom de host seul. La sortie est `http://<ACA-FQDN>` sauf si vous définissez `enableHttps` sur `true`, et elle n'inclut pas de port. Laisser le schéma `https` ou le suffixe `:8080` en place empêche la stratégie d'atteindre le service et entraîne un échec ouvert.

<div class="alert alert-warning">
Paramètre <code>deployPolicy</code> par <code>true</code> <strong>remplace</strong> la stratégie à chaque périmètre sélectionné. Elle ne fusionne pas avec ce qui est déjà présent, donc toutes les règles existantes dans ce périmètre sont perdues. Appliquez vous-même la stratégie lorsque les API que vous protégez contiennent déjà du contenu de stratégie, et fusionnez les fragments entrants et sortants Datadog dans vos sections existantes.
</div>

Pour le contenu de la stratégie, les périmètres d'attachement et la façon dont un bloc devient une réponse client, consultez [Stratégies Azure API Management pour la protection des applications et des API][2].

## Validez le déploiement {#validate-the-deployment}

Envoyez une requête normale, puis une attaque simulée :

```shell
# Normal request: passes through to your backend
curl -v https://<apim-gateway-host>/<api-path>

# Simulated attack: returns 403
curl -v -A dd-test-scanner-log-block "https://<apim-gateway-host>/<api-path>"
```

Vérifiez les résultats dans Datadog :

1. Ouvrez [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App and API Protection{{< /ui >}}][6] et confirmez que l'attaque simulée apparaît comme un signal.
2. Ouvrez l'[inventaire du service de protection des applications et des API][7] et confirmez que le service `apim-callout` apparaît. Ses spans possèdent le tag `component:apim-callout`. Pour utiliser un nom de service différent, définissez `DD_SERVICE` sur le conteneur de callout.

Le service de callout expose également un endpoint d'intégrité sur le port `8081`. L'entrée de Container Apps ne publie que le port `8080`, l'endpoint d'intégrité n'est donc accessible que depuis l'intérieur du conteneur. Azure Container Apps l'utilise pour les sondes de vivacité et de préparation. Pour vérifier son état, examinez l'intégrité des réplicas dans le portail Azure.

## Performance {#performance}

Mesuré sur un déploiement Azure Container Apps de 0,5 vCPU et 1 GiB :

| Phase                                                          | Temps de traitement |
|----------------------------------------------------------------|-----------------|
| En-têtes de requête                                                | ~2,4 ms         |
| En-têtes de réponse                                               | ~2,4 ms         |
| Pipeline APIM complet, incluant les callouts et le backend    | ~9,7 ms         |

Les phases du corps s'exécutent uniquement lorsque l'inspection du corps est activée et que la phase précédente a requis le corps. Pour minimiser le temps d'aller-retour réseau, déployez le service de callout dans la même région Azure que votre instance APIM.

## Compatibilité {#compatibility}

Pour connaître les fonctionnalités prises en charge par cette intégration et les versions qui les ont introduites, consultez les [exigences de compatibilité App and API Protection][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: /fr/security/application_security/setup/azure/api-management/policies
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdd-trace-go%2Fmain%2Fcontrib%2Fazure%2Fapim-callout%2Fdeploy%2Fazure%2Fazuredeploy.json
[5]: /fr/security/application_security/setup/azure/api-management/configuration
[6]: https://app.datadoghq.com/security/appsec
[7]: https://app.datadoghq.com/security/appsec/inventory/services
[8]: /fr/security/application_security/setup/compatibility/