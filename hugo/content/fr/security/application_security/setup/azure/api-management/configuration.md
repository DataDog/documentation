---
description: Déployez le service de callout App and API Protection avec Azure CLI,
  Bicep ou Docker, et configurez ses variables d'environnement.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: Documentation
  text: Activation de App and API Protection pour Azure API Management
- link: /security/application_security/setup/azure/api-management/policies
  tag: Documentation
  text: Politiques Azure API Management pour App and API Protection
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Code source
  text: Code source du callout App and API Protection pour Azure API Management
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Dépannage de la protection des applications et des API
title: Configuration du callout Azure API Management
---
{{< callout url="#" btn_hidden="true" header="App and API Protection pour Azure API Management est en préversion" >}}
Pour essayer la préversion de App and API Protection pour Azure API Management, utilisez les instructions de configuration suivantes.
{{< /callout >}}

Cette page décrit comment déployer et configurer le service de callout App and API Protection pour Azure API Management (APIM) sans utiliser le modèle en un clic. Si vous n'avez pas encore déployé l'intégration, commencez par [Activation d'App and API Protection pour Azure API Management][1].

Le service de callout est fourni sous forme d'image de conteneur `ghcr.io/datadog/dd-trace-go/apim-callout:latest`. Il écoute sur deux ports :

- `8080` fournit l'endpoint de callout, `POST /`, qui gère l'ensemble des phases des requêtes et des réponses.
- `8081` sert l'endpoint de santé, `GET /`.

## Options de déploiement {#deployment-options}

{{< tabs >}}
{{% tab "Azure CLI" %}}

Le script `deploy/azure/deploy.sh` enveloppe `az deployment group create`.

Il vérifie d'abord que l'interface Azure CLI est installée et authentifiée, que Bicep est disponible, que le groupe de ressources existe et que le niveau APIM n'est pas Consumption. Il exécute ensuite `az deployment group what-if` afin que vous puissiez prévisualiser les modifications avant de les appliquer.

```shell
DD_API_KEY=<your-datadog-api-key> \
  ./deploy/azure/deploy.sh \
  --resource-group <rg-name> \
  --apim-name <apim-service-name>
```

En cas de succès, le script affiche l'URL de callout, le nom de host de Container Apps, l'adresse IP du Datadog Agent et indique si la stratégie a été déployée.

Cet exemple omet `--deploy-policy` et `--no-deploy-policy`, ce qui permet au script de choisir pour vous. Il lit la stratégie existante au périmètre cible, puis :

- Déploie la stratégie lorsque le périmètre ne contient aucune stratégie, ou seulement le squelette par défaut.
- Ignore le déploiement lorsqu'il trouve déjà le callout Datadog en place, ou tout contenu de stratégie personnalisé.

Ceci diffère du module Bicep, où `deployPolicy` est défini par défaut sur `false`. La commande ci-dessus peut donc écrire une stratégie APIM. Pour garantir qu'aucune stratégie n'est écrite, passez `--no-deploy-policy`.

Indicateurs disponibles :

| Indicateur ; | Description ; |
|---------------------------------|-----------------------------------------------------------------|
| `--resource-group`, `-g`        | Groupe de ressources pour le déploiement.                                          |
| `--apim-name`                   | Nom de l'instance APIM à protéger.                           |
| `--apim-resource-group`         | Groupe de ressources contenant l'instance APIM, s'il est différent du groupe de ressources de déploiement. Vous avez également besoin de l'autorisation de créer des ressources dans ce groupe de ressources. Le déploiement y crée une identité gérée, une attribution de rôle et un script de déploiement. |
| `--api-ids`                     | Restreindre la stratégie à des ID d'API spécifiques.                        |
| `--deploy-policy`               | Injecter la stratégie Datadog.                                      |
| `--no-deploy-policy`            | Ignorer l'injection de stratégie.                                          |
| `--what-if`                     | Prévisualiser le déploiement sans l'appliquer.                     |
| `--name-prefix`                 | Préfixe pour les noms de ressources créés.                              |
| `--container-image`             | Remplacer l'image du conteneur de callout.                           |
| `--dd-site`                     | Site Datadog.                                                   |
| `--log-analytics-workspace-id`  | ID d'un espace de travail Log Analytics existant pour les logs.                      |
| `--vnet-address-prefix`         | Espace d'adressage pour le réseau virtuel créé. Les préfixes de sous-réseau sont fixes, cette valeur doit donc les contenir. Voir [Plages d'adresses](#address-ranges). |
| `--existing-vnet-id`            | ID d'un réseau virtuel existant à utiliser. Voir [Utilisation d'un réseau virtuel existant](#using-an-existing-virtual-network) pour les sous-réseaux requis et leurs prérequis. |
| `--existing-aca-subnet-id`      | ID d'un sous-réseau existant pour le service de callout. Requis avec `--existing-vnet-id`. |
| `--existing-aci-subnet-id`      | ID d'un sous-réseau existant pour le Datadog Agent. Requis avec `--existing-vnet-id`. |
| `--enable-https`                |  fournit l'endpoint de callout via HTTPS.                          |
| `--no-locks`                    | Ignorer les verrous de ressource.                                            |
| `--min-replicas`                | Nombre minimal de réplicas de callout.                                       |
| `--max-replicas`                | Nombre maximal de réplicas de callout.                                       |
| `--concurrent-requests`         | Requêtes simultanées par réplica avant la mise à l'échelle.             |

Le script lit `DD_API_KEY` et `DD_SITE` depuis l'environnement.

{{% /tab %}}

{{% tab "Module Bicep" %}}

Référencez le module Bicep directement depuis votre propre infrastructure en tant que code :

```bicep
module apimCallout 'path/to/contrib/azure/apim-callout/deploy/azure/main.bicep' = {
  name: 'dd-apim-callout'
  params: {
    datadogApiKey: keyVault.getSecret('dd-api-key')
    apimServiceName: 'my-apim'
    logAnalyticsWorkspaceId: logAnalytics.id
    // every other parameter has a default
  }
}
```

`datadogApiKey` et `apimServiceName` sont requis. Les paramètres restants sont facultatifs : `apimResourceGroup`, `targetApiIds`, `logAnalyticsWorkspaceId`, `namePrefix`, `location`, `datadogSite`, `deployPolicy`, `enableHttps`, `containerImage`, `vnetAddressPrefix`, `existingVnetId`, `existingAcaSubnetId`, `existingAciSubnetId`, `enableLocks`, `minReplicas`, `maxReplicas`, `concurrentRequestsThreshold` et `customTags`.

La définition de `existingVnetId` rend `existingAcaSubnetId` et `existingAciSubnetId` requis, et ajoute des prérequis sur ces sous-réseaux. La définition de `vnetAddressPrefix` ne déplace pas les sous-réseaux. Pour les deux, voir [Mise en réseau](#networking).

Valeurs par défaut :

| Paramètre                     | Par défaut                                           |
|-------------------------------|---------------------------------------------------|
| `namePrefix`                  | `dd-apim`                                         |
| `datadogSite`                 | `datadoghq.com`                                   |
| `deployPolicy`                | `false`                                           |
| `enableHttps`                 | `false`                                           |
| `containerImage`              | `ghcr.io/datadog/dd-trace-go/apim-callout:latest` |
| `vnetAddressPrefix`           | `10.0.0.0/16`                                     |
| `minReplicas` / `maxReplicas` | `1` / `10`                                        |
| `concurrentRequestsThreshold` | `20`                                              |
| `targetApiIds`                | vide, ce qui s'applique à toutes les API                  |

Les valeurs acceptées `datadogSite` sont `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, `ap2.datadoghq.com` et `ddog-gov.com`. Votre site est {{< region-param key="dd_site" code="true" >}}.

{{% /tab %}}

{{% tab "Docker" %}}

Pour des tests locaux ou pour un hébergement en dehors d'Azure, exécutez l'image directement :

```shell
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -e DD_AGENT_HOST=datadog-agent \
  ghcr.io/datadog/dd-trace-go/apim-callout:latest
```

Confirmez que le service est en cours d'exécution :

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

Un conteneur hébergé de cette manière nécessite toujours une accessibilité réseau depuis la passerelle APIM et un Datadog Agent pour recevoir les traces et les événements de sécurité.

{{% /tab %}}
{{< /tabs >}}

## Mise en réseau {#networking}

### Plages d'adresses {#address-ranges}

`vnetAddressPrefix` et `--vnet-address-prefix` définissent l'espace d'adressage du réseau virtuel, mais les préfixes de sous-réseau à l'intérieur sont fixes :

| Sous-réseau             | Préfixe         |
|--------------------|----------------|
| Service de callout    | `10.0.1.0/27`  |
| Datadog Agent      | `10.0.2.0/24`  |
| APIM               | `10.0.3.0/27`  |

Comme le déploiement ne dérive pas les sous-réseaux de l'espace d'adressage, toute valeur que vous définissez doit contenir ces trois préfixes. La valeur par défaut `10.0.0.0/16` le fait. Une valeur telle que `10.1.0.0/16` laisse les sous-réseaux en dehors du réseau virtuel, et le déploiement échoue.

Pour placer le service de callout dans une plage d'adresses différente, fournissez votre propre réseau avec `existingVnetId` à la place.

### Utilisation d'un réseau virtuel existant {#using-an-existing-virtual-network}

Le paramétrage de `existingVnetId` permet au déploiement d'ignorer le réseau virtuel, les sous-réseaux, les groupes de sécurité réseau et la passerelle NAT. Vous les fournissez à la place, donc `existingAcaSubnetId` et `existingAciSubnetId` deviennent obligatoires, et chaque sous-réseau doit répondre aux exigences que le déploiement aurait autrement configurées :

- Le sous-réseau de callout nécessite une délégation `Microsoft.App/environments`, et suffisamment d'adresses pour l'environnement Container Apps.
- Le sous-réseau de l'Agent nécessite une délégation `Microsoft.ContainerInstance/containerGroups`, et une connectivité sortante afin que l'Agent puisse atteindre Datadog.
- Le service de callout doit atteindre l'Agent sur le port `8126`.

Le déploiement ne crée également aucun sous-réseau APIM dans ce mode, l'instance APIM doit donc déjà être intégrée au même réseau virtuel. Sinon, l'étape de configuration APIM peut échouer, ou APIM ne peut pas résoudre le service de callout.

## Configuration {#configuration}

Le service de callout active lui-même le Datadog Web Application Firewall (WAF) au démarrage, vous n'avez donc pas besoin de définir `DD_APPSEC_ENABLED`.

Le service prend en charge les paramètres suivants :

| Variable d'environnement               | Valeur par défaut | Description                                                                                                                         |
|------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APIM_CALLOUT_HOST`             | `0.0.0.0`     | Adresse sur laquelle le service de callout écoute.                                                                                            |
| `DD_APIM_CALLOUT_PORT`             | `8080`        | Port pour l'endpoint de callout (`POST /`).                                                                                           |
| `DD_APIM_CALLOUT_HEALTHCHECK_PORT` | `8081`        | Port pour l'endpoint de santé (`GET /`).                                                                                             |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`| `10485760`    | Nombre maximal d'octets du corps analysés, en octets (10 Mo). Définissez sur `0` pour ignorer l'analyse du corps, ce qui réduit l'échange à deux appels.  |
| `DD_APIM_CALLOUT_REQUEST_TIMEOUT`  | `30s`         | Durée de vie de l'état mis en cache par requête. L'état orphelin est libéré après cette durée.                                           |
| `DD_APIM_CALLOUT_TLS`              | `false`       | Servez HTTPS au lieu de HTTP.                                                                                                        |
| `DD_APIM_CALLOUT_TLS_CERT_FILE`    | (vide)       | Chemin d'accès au certificat TLS. Requis lorsque TLS est activé.                                                                          |
| `DD_APIM_CALLOUT_TLS_KEY_FILE`     | (vide)       | Chemin d'accès à la clé privée TLS. Requis lorsque TLS est activé.                                                                          |

## Valeurs par défaut automatiques {#automatic-defaults}

Si les variables suivantes ne sont pas définies, le service les attribue au démarrage :

| Variable d'environnement          | Valeur     | Description                                                    |
|-------------------------------|-----------|----------------------------------------------------------------|
| `DD_APM_TRACING_ENABLED`      | `false`   | Indique s'il faut envoyer des traces APM pour le service de callout lui-même.                |
| `DD_APPSEC_WAF_TIMEOUT`       | `10ms`    | Budget d'évaluation WAF par requête.                             |
| `DD_TRACE_PROPAGATION_STYLE`  | `datadog` | Format des en-têtes de contexte de trace injectés dans les requêtes.    |

Si une évaluation WAF unique dépasse son budget, la requête est autorisée plutôt que retardée.

## Connexion au Datadog Agent {#datadog-agent-connection}

Le service de callout n'envoie pas de données directement à Datadog. Il envoie des traces et des événements de sécurité à un Datadog Agent, qui les transfère à Datadog. Le service de callout et l'Agent s'exécutent dans des conteneurs séparés, et chacun possède ses propres variables d'environnement.

Sur le **conteneur de callout** :

| Variable d'environnement | Valeur par défaut | Description                           |
|----------------------|---------------|---------------------------------------|
| `DD_AGENT_HOST`      | `localhost`   | Nom de host ou adresse IP de votre Datadog Agent. |

Sur le **conteneur du Datadog Agent** :

| Variable d'environnement      | Valeur par défaut   | Description                                                                                       |
|---------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `DD_API_KEY`              | (requis)      | Votre clé d'API Datadog.                                                                             |
| `DD_SITE`                 | `datadoghq.com` | Votre site Datadog.                                                                                |
| `DD_APM_ENABLED`          | `false`         | Définir sur `true`. L'Agent n'accepte pas les traces autrement.                                        |
| `DD_APM_NON_LOCAL_TRAFFIC`| `false`         | Définir sur `true`. Le callout s'exécute dans un conteneur séparé, son trafic n'est donc pas local à l'Agent. |
| `DD_APM_RECEIVER_PORT`    | `8126`          | Port sur lequel l'Agent accepte les traces. Le callout doit pouvoir l'atteindre.                           |

Comme le callout s'exécute dans son propre conteneur, `DD_APM_ENABLED` et `DD_APM_NON_LOCAL_TRAFFIC` sont tous deux requis. Sans eux, l'Agent abandonne les spans et les événements de sécurité produits par cette intégration. Le déploiement en un clic définit tous ces éléments sur le conteneur de l'Agent pour vous.

Ne définissez pas `DD_API_KEY` sur le conteneur de callout. Le déploiement en un clic définit `DD_AGENT_HOST` sur le conteneur de callout et associe `datadogApiKey` et `datadogSite` à `DD_API_KEY` et `DD_SITE` sur le conteneur de l'Agent.

Votre site est {{< region-param key="dd_site" code="true" >}}.

## Chiffrement de l'endpoint de callout {#encrypting-the-callout-endpoint}

Pour servir l'endpoint de callout via HTTPS, définissez `DD_APIM_CALLOUT_TLS` sur `true` et fournissez à la fois `DD_APIM_CALLOUT_TLS_CERT_FILE` et `DD_APIM_CALLOUT_TLS_KEY_FILE`. Si TLS est activé et que l'un des fichiers est manquant, le service ne démarre pas. La version TLS minimale acceptée est 1.2.

Lorsque TLS est activé, la stratégie APIM doit appeler le service via `https://`.

## Check de l'état {#health-check}

Vérifiez l'endpoint d'état sur le port `8081` :

```shell
curl -s http://localhost:8081/
# {"status":"ok","library":{"language":"golang","version":"2.x.x"}}
```

Une réponse `200` indique que le service est en cours d'exécution, mais n'indique pas l'état du WAF. Pour confirmer que les données de sécurité arrivent, utilisez les checks de l'interface utilisateur Datadog décrits dans [Enabling App and API Protection for Azure API Management][1].

## Dimensionnement et performances {#sizing-and-performance}

Sur un déploiement Azure Container Apps de 0,5 vCPU et 1 GiB, les phases request-headers et response-headers prennent chacune environ 2,4 ms. Le pipeline APIM complet, incluant à la fois les callouts et le backend, prend environ 9,7 ms.

Les phases du corps s'exécutent uniquement lorsque l'inspection du corps est activée et que la phase précédente a requis le corps. La passerelle maintient un pool de connexions vers le service de callout, ce qui peut réduire la latence en production.

Pour minimiser le temps d'aller-retour réseau, déployez le service de callout dans la même région Azure que votre instance APIM, et maintenez l'APIM à proximité de vos consommateurs d'API. Par défaut, le service évolue de 1 à 10 réplicas et effectue une montée en charge à 20 requêtes simultanées par réplica.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/setup/azure/api-management