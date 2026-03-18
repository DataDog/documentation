---
algolia:
  tags:
  - secrets
  - secrets executable
  - secrets provider
  - list secrets
aliases:
- /fr/agent/faq/kubernetes-secrets
- /fr/agent/guide/secrets-management
further_reading:
- link: /agent/autodiscovery/
  tag: Documentation
  text: Détection automatique
title: Gestion des secrets
---
## Aperçu 

L'agent Datadog vous aide à gérer vos secrets en toute sécurité grâce à son intégration avec les solutions de gestion des secrets suivantes :
 [AWS Secrets Manager](#idforsecrets)
 [AWS SSM](#idforssm)
 [Azure KeyVault](#idforazure)
 [GCP Secret Manager](#idforgcp)
 [HashiCorp Vault](#idforhashicorp)
 [Secrets Kubernetes](#idforkubernetes)
 [Secrets Docker](#idfordocker)
 [Contenu du fichier](#idforjsonyamltext)
 [Fichier JSON](#idforjsonyamltext)
 [Fichier YAML](#idforjsonyamltext)

Au lieu d'enregistrer en clair des valeurs sensibles telles que des clés API ou des mots de passe dans des fichiers de configuration, l'Agent peut les récupérer de manière dynamique lors de l'exécution. Pour faire référence à un secret dans votre configuration, utilisez la balise `ENC[<secret_id>]` notation. Le secret est récupéré et chargé en mémoire, mais il n'est jamais écrit sur le disque ni envoyé au backend Datadog.

**Remarque** : vous ne pouvez pas utiliser la syntaxe `ENC[]` dans les paramètres `secret_*`, tels que `secret_backend_command`.

## Options pour récupérer les secrets

### Option 1 : Utilisation de la prise en charge native de l'Agent pour récupérer les secrets

**Remarque** : À partir de la version `7.76` de l'agent, la gestion native des secrets est disponible pour les agents compatibles FIPS.

À partir de la version `7.70` de l'Agent, l'Agent Datadog prend en charge nativement plusieurs solutions de gestion des secrets. Deux nouveaux paramètres ont été ajoutés au fichier `datadog.yaml` : `secret_backend_type` et `secret_backend_config`.

Le paramètre `secret_backend_type` sert à indiquer la solution de gestion des secrets à utiliser, tandis que `secret_backend_config` contient les paramètres de configuration supplémentaires propres à cette solution.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**Remarque** : Si vous utilisez Datadog dans un environnement conteneurisé, l'[Agent Cluster](/containers/cluster_agent/) nécessite la version 7.77 ou une version ultérieure de l'Agent pour prendre en charge la récupération native des secrets. Pour les versions antérieures, utilisez plutôt l'[Option 2](#option2-utilisation-du-script-intégré-pour-Kubernetes-et-Docker) ou l'[Option 3](#option3-création-d'un-exécutable-personnalisé).

Les instructions de configuration plus détaillées dépendent du type de backend utilisé. Pour plus d'informations, consultez la section correspondante ci-dessous :


{{% collapse-content title="Les secrets d'AWS" level="h4" expanded=false id="id-for-secrets" %}}
Les services AWS suivants sont pris en charge :

|Valeur de secret_backend_type                                | Service AWS                             |
|||
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Configurer un profil d'instance

Datadog recommande d'utiliser la [méthode du profil d'instance][1006] pour récupérer les secrets, car AWS gère pour vous toutes les variables d'environnement et tous les profils de session. Vous trouverez plus d'informations à ce sujet dans la [documentation officielle d'AWS Secrets Manager][1000].

##### Exemple de configuration

{{< tabs >}}
{{% tab "Fichier YAML de l'agent" %}}

Configurez l'agent Datadog pour qu'il utilise AWS Secrets afin de résoudre les secrets à l'aide de la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Lorsque vous utilisez des variables d'environnement, convertissez la configuration au format JSON comme suit :

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Une fois l'Agent configuré pour utiliser les secrets AWS, vous pouvez faire référence à n'importe quel secret dans vos configurations à l'aide de `ENC[secretId;secretKey]`.

La notation ENC se compose de :
* `secretId` : soit le « nom descriptif » du secret (par exemple, `/DatadogAgent/Production`), soit l'ARN (par exemple, `arn:aws:secretsmanager:useast1:123456789012:secret:/DatadogAgent/ProductionFOga1K`).
   **Remarque** : le format ARN complet est requis pour accéder aux secrets depuis un autre compte sur lequel les informations d'identification AWS ou les informations d'identification `sts:AssumeRole` sont définies.
* `secretKey` : la clé JSON du secret AWS que vous souhaitez utiliser.


AWS Secrets Manager permet de stocker plusieurs paires clé-valeur au sein d'un même secret. Une configuration backend utilisant Secrets Manager a accès à toutes les clés définies dans un secret.

Par exemple, en supposant que l'identifiant secret `MySecrets` contienne les 3 valeurs suivantes :

```json```
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

Voici un exemple complet du fichier de configuration `datadog.yaml` utilisant les secrets AWS pour récupérer sa clé API à partir de `MySecrets` :

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Casque" %}}

Configurez l'agent Datadog pour qu'il utilise AWS Secrets afin de résoudre les secrets dans Helm à l'aide de la configuration suivante :

##### Contrôle de l'intégration

```sh
datadog:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <SHORT_IMAGE>
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
```

<div class="alert alert-info"> You must include the <code>serviceAccountAnnotations</code> to grant the Agent permissions to access the AWS secret. </div>

<br>


##### Vérification du cluster : sans activation des processus de vérification du cluster
```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
agents:
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
clusterAgent:
  confd:
    # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
```

##### Vérification du cluster : lorsque les processus de vérification du cluster sont activés
```sh
datadog:
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
clusterAgent:
  confd:
  # This is an example
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      instances:
        - [...]
          password: "ENC[secretId;secretKey]"
clusterChecksRunner:
  enabled: true
  env:
   - name: DD_SECRET_BACKEND_TYPE
     value: "aws.secrets"
   - name: DD_SECRET_BACKEND_CONFIG
     value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
  rbac:
    # IAM role ARN required to grant the Agent permissions to access the AWS secret
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>

```

{{% /tab %}}

{{% tab "Opérateur" %}}

Configurez l'agent Datadog pour qu'il utilise AWS Secrets afin de résoudre les secrets avec l'opérateur Datadog à l'aide de la configuration suivante :

##### Contrôle de l'intégration


```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
      # IAM role ARN is required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <SHORT_IMAGE>
            instances:
              - [...]
                 password: "ENC[secretId;secretKey]"

```

<div class="alert alert-info"> You must include the <code>serviceAccountAnnotations</code> to grant the Agent permissions to access the AWS secret. </div>

<br>


##### Vérification du cluster : sans activation des processus de vérification du cluster

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    nodeAgent:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"
```

<br>

##### Vérification du cluster : lorsque les processus de vérification du cluster sont activés

```sh
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
spec:
  features:
    clusterChecks:
      useClusterChecksRunners: true
  override:
    [...]
    clusterChecksRunner:
      env:
       - name: DD_SECRET_BACKEND_TYPE
         value: "aws.secrets"
       - name: DD_SECRET_BACKEND_CONFIG
         value: '{"aws_session":{"aws_region":"<AWS_REGION>"}}'
      # IAM role ARN required to grant the Agent permissions to access the AWS secret
      serviceAccountAnnotations:
        eks.amazonaws.com/role-arn: <IAM_ROLE_ARN>
    clusterAgent:
      extraConfd:
        configDataMap:
        # This is an example
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            instances:
              - [...]
                password: "ENC[secretId;secretKey]"

```

{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="AWS SSM" level="h4" expanded=false id="id-for-ssm" %}}
Les services AWS suivants sont pris en charge :

|Valeur de secret_backend_type                                | Service AWS                             |
|||
|`aws.ssm` |[Magasin de paramètres AWS Systems Manager][1001] |

##### Configurer un profil d'instance

Datadog recommande d'utiliser la [méthode du profil d'instance][1006] pour récupérer les secrets, car AWS gère pour vous toutes les variables d'environnement et tous les profils de session. Vous trouverez plus d'informations à ce sujet dans la [documentation officielle d'AWS Secrets Manager][1001].

##### Exemple de configuration

Le Parameter Store d'AWS System Manager prend en charge un modèle hiérarchique. Par exemple, en supposant les chemins d'accès suivants vers le Parameter Store d'AWS System Manager :

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

Les paramètres peuvent être récupérés comme suit :

```yaml
# datadog.yaml
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1

api_key: "ENC[/DatadogAgent/Production/ApiKey]"
property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
```

{{% /collapse-content %}}


{{% collapse-content title="Backend Azure Key Vault" level="h4" expanded=false id="id-for-azure" %}}


Les services Azure suivants sont pris en charge :

| Valeur de secret_backend_type                            | Service Azure          |
| ||
| `azure.keyvault` | [Azure Key Vault][2000] |

##### Authentification Azure

Datadog recommande d'utiliser les identités gérées pour s'authentifier auprès d'Azure. Cela vous permet d'associer des ressources cloud à des comptes AMI et vous évite d'avoir à inclure des informations sensibles dans votre fichier de configuration `datadog.yaml`.

##### Identité gérée

Pour accéder à votre Key Vault, créez une identité gérée et attribuez-la à votre machine virtuelle. Configurez ensuite l'attribution de rôle appropriée dans Key Vault afin de permettre à cette identité d'accéder à ses secrets.

##### Exemple de configuration

La configuration backend des secrets Azure Key Vault est structurée au format YAML selon le schéma suivant :

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

Le secret du backend est référencé dans votre fichier de configuration de l'agent Datadog avec `ENC[ ]`. Voici un exemple dans lequel il faut récupérer un secret en texte clair :

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Disponible dans la version 7.74 ou ultérieure d'Agent**

Les services GCP suivants sont pris en charge :

| Valeur de secret_backend_type                               | Service GCP                    |
|  |  |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Authentification GCP et politique d'accès

L'implémentation de GCP Secret Manager utilise les [identifiants par défaut de l'application (ADC)][5001] pour l'authentification auprès de Google.

Pour interagir avec GCP Secret Manager, le compte de service utilisé par l'agent Datadog (par exemple, le compte de service de la machine virtuelle, une identité de charge de travail ou des informations d'identification activées localement) doit disposer de l'autorisation `secretmanager.versions.access`.

Ce droit peut être accordé via le rôle prédéfini **Secret Manager Secret Accessor** (`roles/secretmanager.secretAccessor`) ou via un rôle personnalisé offrant des [droits d'accès][5002] équivalents.

Sur les environnements d'exécution GCE ou GKE, l'ADC est configuré automatiquement via le compte de service associé à l'instance ou au pod. Le compte de service ci-joint doit disposer des rôles appropriés pour accéder à GCP Secret Manager. De plus, le runtime GCE ou GKE nécessite le champ d'accès OAuth « cloudplatform » [5003].

##### Exemple de configuration GCP

Configurez l'agent Datadog pour qu'il utilise GCP Secret Manager afin de résoudre les secrets à l'aide de la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Une fois l'Agent configuré pour utiliser GCP Secret Manager, faites référence aux secrets dans vos configurations à l'aide de `ENC[secretname]` ou `ENC[secretname;key;version;]`.

La notation ENC se compose de :

 `secret` : le nom du secret dans GCP Secret Manager (par exemple, `datadogapikey`).
 `key` : (facultatif) la clé à extraire d'un secret au format JSON. Si vous utilisez des secrets en texte clair, vous pouvez omettre cette partie (exemple : `ENC[secretname;;version]`).
 `version` : (facultatif) le numéro de version secret. Si aucune version n'est spécifiée, c'est la version « latest » qui est utilisée.
  + Exemples de syntaxe de version :
     `secretkey`  Version `latest` implicite
     `secretkey;;latest`  Version `latest` explicite
     `secretkey;;1`  Numéro de version spécifique

Par exemple, supposons que les secrets GCP s'appellent « datadogapikey » (avec deux versions) et « datadogappkey » :

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Pour les secrets au format JSON, en supposant qu'un secret nommé `datadogkeys` contienne :

```json```
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Référencez les clés spécifiques comme suit :

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### Gestion des versions secrètes

GCP Secret Manager prend en charge les versions des secrets. L'implémentation de l'Agent prend également en charge la gestion des versions des secrets à l'aide du délimiteur « ; ». Si aucune version n'est spécifiée, c'est la version « latest » qui est utilisée.


##### Prise en charge des secrets JSON

L'agent Datadog prend en charge l'extraction de clés spécifiques à partir de secrets au format JSON à l'aide du délimiteur `;` :

 `datadog;api_key`  Extrait le champ `api_key` du secret `datadog` en utilisant implicitement la version `latest`
 `datadog;api_key;1`   Extrait le champ `api_key` du secret `datadog` de la version `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend HashiCorp Vault" level="h4" expanded=false id="id-for-hashicorp" %}}

Les services HashiCorp suivants sont pris en charge :

| Valeur de secret_backend_type                               | Service HashiCorp                                  |
|  |  |
| `hashicorp.vault` | [HashiCorp Vault (moteur de secrets versions 1 et 2)][3000] |

##### Comment configurer HashiCorp Vault
1. Lancez votre instance HashiCorp Vault. Pour plus d'informations, consultez la [documentation officielle de HashiCorp Vault][3001].
2. Rédigez une politique autorisant l'extraction de secrets de votre coffre-fort. Créez un fichier `*.hcl` et ajoutez-y l'autorisation suivante si vous utilisez Secrets Engine version 1 :
```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si vous utilisez Secrets Engine version 2, les autorisations suivantes sont requises :
```
path "<your_mount_path>/data/<additional_subpath>" {
  capabilities = ["read"]
}

/*
Datadog needs access to mount information to check the Secrets Engine version
number. If access isn't granted, version 1 is assumed.
*/
path "sys/mounts" {
  capabilities = ["read"]
}
```
3. Exécutez `vault policy write <policy_name> &lt;chemin_vers_fichier_*.hcl>`

4. Choisissez la méthode d'authentification pour accéder à votre coffre-fort. Si vous utilisez la méthode du profil d'instance AWS, exécutez la commande `vault auth enable aws`.

##### Instructions relatives aux profils d'instance AWS

Datadog recommande d'utiliser la [méthode du profil d'instance][3003] pour vous authentifier si vous exécutez HashiCorp Vault à partir d'une machine connectée à AWS.

Une fois cette configuration effectuée, rédigez une [politique de coffre-fort spécifique à l'authentification][3004].

##### Exemple de configuration

Dans l'exemple suivant, supposons que le préfixe du chemin d'accès au secret HashiCorp Vault soit `/Datadog/Production` et que la clé du paramètre soit `apikey` :

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

L'exemple suivant récupère la clé API depuis HashiCorp Vault en utilisant AWS pour l'authentification.

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1 // this field is optional, and will default to us-east-1 if not set
```

{{% /collapse-content %}}

{{% collapse-content title="Secrets Kubernetes" level="h4" expanded=false id="id-for-kubernetes" %}}

**Disponible dans la version 7.75 ou ultérieure d'Agent**

Les services Kubernetes suivants sont pris en charge :

| Valeur de secret_backend_type | Service |
|||
| `k8s.secrets` | [Secrets Kubernetes][7000] |

##### Conditions préalables

Le backend des secrets Kubernetes nécessite :
 **Identifiants du compte de service** : par défaut, utilise les jetons de compte de service montés automatiquement (`automountServiceAccountToken: true`, voir la [documentation Kubernetes](https://kubernetes.io/docs/tasks/configurepodcontainer/configureserviceaccount/#optoutofapicredentialautomounting)). Si nécessaire, il est possible de configurer des chemins d'accès personnalisés.
 **Autorisations RBAC** : le compte de service de l'agent doit disposer des autorisations nécessaires pour lire les secrets dans les espaces de noms cibles
 **Accès au réseau** : le pod de l'agent doit pouvoir communiquer avec le serveur API Kubernetes

##### Configuration du RBAC

Pour chaque espace de noms contenant des secrets, créez un `Role` et un `RoleBinding` en vous inspirant de l'exemple suivant, en remplaçant le nom de l'espace de noms par le vôtre :

```yaml
# Role: grants permission to read secrets
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: <target namepace> # Namespace with secrets
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get"]
---
# RoleBinding: grants permission to Agent's ServiceAccount
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-secret-access
  namespace: <target namespace>  # Namespace with secrets
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: datadog-secret-reader
subjects:
- kind: ServiceAccount
  name: <serviceaccount name>  # datadog is typically the default ServiceAccount name
  namespace: datadog  # Where Agent runs
```

##### Exemple de configuration

{{< tabs >}}
{{% tab "Fichier YAML de l'agent" %}}

Configurez l'agent Datadog pour qu'il utilise les secrets Kubernetes à l'aide de la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

Le format de notation ENC est « espace de noms/nom secret ; clé » :
 `namespace` : l'espace de noms Kubernetes contenant le secret
 `secretname` : le nom de la ressource Secret
 `key` : la clé spécifique à extraire du champ de données du secret

**Exemple :** Soit un secret dans l'espace de noms `secretsns` :

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dd-api-key
  namespace: secrets-ns
data:
  api_key: <base64-encoded-value>
  app_key: <base64-encoded-value>
```

Vous pouvez faire référence à des clés individuelles :
```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Prise en charge de plusieurs espaces de noms :**
Chaque référence secrète peut spécifier un espace de noms différent (le RBAC doit être configuré pour chacun d'entre eux) :

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Casque" %}}

Configurer l'agent Datadog pour qu'il utilise les secrets Kubernetes avec Helm :

```yaml
# values.yaml
datadog:
  apiKey: "placeholder-will-be-overridden"

  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_API_KEY
    value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**Remarque :** Un paramètre fictif `apiKey` est requis pour la validation du Helm Chart lorsque l'on utilise un backend de secrets pour récupérer la clé API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement un RBAC (rôle + liaison de rôle) pour chaque espace de noms contenant des secrets. Pour plus d'informations, consultez la section [Configuration du RBAC](#rbacsetup).

<div class="alert alert-info"> Helm does not have native <code>secretBackend.type</code> configuration. Use environment variables. </div>

{{% /tab %}}

{{% tab "Opérateur" %}}

Configurez l'agent Datadog pour qu'il utilise les secrets Kubernetes avec l'opérateur Datadog :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "placeholder-will-be-overridden"

  override:
    nodeAgent:
      env:
      - name: DD_SECRET_BACKEND_TYPE
        value: "k8s.secrets"
      - name: DD_API_KEY
        value: "ENC[secrets-ns/dd-api-key;api_key]"
```

**Remarque :** Une clé API fictive satisfait aux critères de validation de l'opérateur lorsque l'on utilise un backend secret pour générer la clé API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement un RBAC (rôle + liaison de rôle) pour chaque espace de noms contenant des secrets. Pour plus d'informations, consultez la section [Configuration du RBAC](#rbacsetup).

<div class="alert alert-info"> The Operator does not have native <code>secretBackend.type</code> configuration. Use environment variables in <code>override.nodeAgent.env</code>. </div>

{{% /tab %}}
{{< /tabs >}}

##### Configuration personnalisée des chemins d'accès
Si votre configuration ne respecte pas les emplacements par défaut pour l'authentification via un compte de service, vous pouvez spécifier `token_path` et `ca_path` à la place.

{{< tabs >}}
{{% tab "Fichier YAML de l'agent" %}}
```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  token_path: /custom/path/to/token
  ca_path: /custom/path/to/ca.crt
```
{{% /tab %}}

{{% tab "Casque" %}}
```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```
{{% /tab %}}

{{% tab "Opérateur" %}}
```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"token_path":"/custom/path/to/token","ca_path":"/custom/path/to/ca.crt"}'
```
{{% /tab %}}
{{< /tabs >}}

##### Configuration personnalisée du serveur API

Si votre configuration ne met pas en avant les variables d'environnement par défaut `KUBERNETES_SERVICE_HOST` et `KUBERNETES_SERVICE_PORT`, vous pouvez fournir une URL `api_server` pour interagir avec l'API REST de Kubernetes.

{{< tabs >}}
{{% tab "Fichier YAML de l'agent" %}}
```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  api_server: https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}
```
{{% /tab %}}

{{% tab "Casque" %}}
```yaml
datadog:
  env:
  - name: DD_SECRET_BACKEND_TYPE
    value: "k8s.secrets"
  - name: DD_SECRET_BACKEND_CONFIG
    value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```
{{% /tab %}}

{{% tab "Opérateur" %}}
```yaml
override:
  nodeAgent:
    env:
    - name: DD_SECRET_BACKEND_TYPE
      value: "k8s.secrets"
    - name: DD_SECRET_BACKEND_CONFIG
      value: '{"api_server":"https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}"}'
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Les secrets de Docker" level="h4" expanded=false id="id-for-docker" %}}

**Disponible dans la version 7.75 ou ultérieure d'Agent**

Les services Docker suivants sont pris en charge :

| Valeur de secret_backend_type | Service |
|||
| `docker.secrets` | [Secrets Docker][6001] |

##### Conditions préalables

Le backend de secrets Docker prend en charge à la fois les secrets [Docker Swarm][6002] et les secrets [Docker Compose][6003]. Par défaut, Swarm et Compose montent automatiquement les secrets à l'intérieur du conteneur sous forme de fichiers dans le répertoire `/run/secrets` (Linux) ou `C:\ProgramData\Docker\secrets` (Windows).

**Remarque** : les secrets de Compose peuvent être stockés dans des fichiers (pointant vers des fichiers locaux) ou externes (faisant référence à des secrets Swarm existants).

##### Exemple de configuration

Configurez l'agent Datadog pour qu'il utilise les secrets Docker à l'aide de la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

Le format de notation ENC correspond au nom du secret, qui correspond au nom du fichier dans `/run/secrets/` :
 `ENC[api_key]` est lu à partir de `/run/secrets/api_key` (Linux) ou de `C:\ProgramData\Docker\secrets\api_key` (Windows)

**Chemin d'accès personnalisé aux fichiers secrets :**
Si Docker Swarm ou Compose sont configurés pour monter les secrets à un autre emplacement, vous pouvez le spécifier comme suit :

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Exemple avec Docker Swarm

[Créer][6002] et utiliser un secret Docker Swarm :

```bash
# Create the secret
echo "<api_key_value>" | docker secret create dd_api_key -

# Deploy Agent with secret mounted
docker service create \
  --name datadog-agent \
  --secret dd_api_key \
  --env DD_API_KEY="ENC[dd_api_key]" \
  --env DD_SECRET_BACKEND_TYPE="docker.secrets" \
  --env DD_SITE="datadoghq.com" \
  --env DD_HOSTNAME="dd-agent" \
  datadog/agent:latest
```

Le secret `dd_api_key` est automatiquement monté dans le répertoire `/run/secrets/dd_api_key`, et l'Agent le lit à l'aide du backend `docker.secrets`.

##### Exemple de Docker Compose

[Créer][6003] un fichier `dockercompose.yml` avec des secrets stockés dans des fichiers :

```yaml
version: '3.8'

services:
  datadog:
    image: datadog/agent:latest
    environment:
      - DD_API_KEY=ENC[dd_api_key]
      - DD_SECRET_BACKEND_TYPE=docker.secrets
      - DD_SITE=datadoghq.com
      - DD_HOSTNAME=dd-agent
    secrets:
      - dd_api_key

secrets:
  dd_api_key:
    file: ./secrets/api_key.txt
```

Le fichier secret `./secrets/api_key.txt` est monté à l'emplacement `/run/secrets/dd_api_key` dans le conteneur.


{{% /collapse-content %}}

{{% collapse-content title="Backends de secrets sous forme de fichiers JSON, YAML ou TEXT" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| Valeur de secret_backend_type                                 | Service de fichiers                             |
|||
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXTE][4003]                        |                            |

##### Droits d'accès aux fichiers
Le backend de fichiers ne nécessite que des droits de **lecture** pour les fichiers JSON, YAML ou TEXT configurés. Ces autorisations doivent être accordées à l'utilisateur de l'agent Datadog local (`ddagent` sous Linux, `ddagentuser` sous Windows).


{{< tabs >}}
{{% tab "Backend de fichiers JSON" %}}

**Remarque** : un seul niveau de profondeur JSON est pris en charge (par exemple, `{"key": "value"}`)

##### Exemple de configuration

Vous pouvez utiliser un fichier JSON pour stocker des secrets en local.

Par exemple, avec un fichier JSON situé dans `/path/to/secret.json` contenant ce qui suit :

```json```
{
  "datadog_api_key": "your_api_key"
}
```

Vous pouvez utiliser cette configuration pour récupérer ses secrets :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de fichiers YAML" %}}

**Remarque** : un seul niveau de profondeur YAML est pris en charge (par exemple, `clé : valeur`)

##### Exemple de configuration

Vous pouvez utiliser un fichier YAML pour stocker des secrets en local.

À titre d'exemple, si nous avons un fichier YAML situé dans `/path/to/secret.yaml` contenant :

```yaml
datadog_api_key: your api key
```

Vous pouvez utiliser la configuration suivante pour extraire les secrets de ce service :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de fichiers texte" %}}

**Disponible dans la version 7.75 ou ultérieure d'Agent**

**Remarque** : chaque mot de passe doit être enregistré dans son propre fichier texte.

##### Exemple de configuration

Vous pouvez utiliser des fichiers texte individuels pour stocker des informations confidentielles en local.

Par exemple, avec des fichiers texte dans `/path/to/secrets/` :

`/chemin/vers/secrets/dd_api_key` contenant :
```
your_api_key_value
```

`/chemin/vers/secrets/dd_app_key` contenant :
```
your_app_key_value
```

Vous pouvez utiliser cette configuration pour récupérer les secrets à partir de ces sources :

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Sécurité des chemins d'accès :

 Les chemins relatifs dans `ENC[]` sont résolus par rapport à `secrets_path` (par exemple, `ENC[dd_api_key]` avec `secret_path: /path/to/secrets` sera résolu en `/path/to/secrets/dd_api_key`)
 Les chemins absolus dans `ENC[]` doivent se trouver dans `secrets_path` (par exemple, `ENC[/path/to/secrets/dd_api_key]` avec `secret_path: /path/to/secrets` fonctionnera)
 Les tentatives de parcours de chemin (par exemple, `ENC[../etc/passwd]`) sont bloquées et échoueront avec le message « chemin hors du répertoire autorisé ».

**Remarque :** Certains outils ajoutent automatiquement des sauts de ligne lors de l'exportation des secrets vers des fichiers. Consultez la section [Supprimer les sauts de ligne en fin de ligne](#removetrailinglinebreaks) pour savoir comment procéder.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### Option 2 : Utilisation du script intégré pour Kubernetes et Docker

Dans les environnements conteneurisés, les images de conteneur de l'agent Datadog intègrent un script intégré nommé `/readsecret_multiple_providers.sh` à partir de la version v7.32.0. Ce script permet de lire les secrets à partir des sources suivantes :

* Fichiers : en utilisant `ENC[fichier@/chemin/vers/fichier]`
* Secrets Kubernetes : utilisation de `ENC[k8s_secret@namespace/secretname/key]`

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

Pour utiliser cet exécutable avec Datadog Operator, configurez-le comme suit :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
```
{{% /tab %}}
{{% tab "Casque" %}}

Pour utiliser cet exécutable avec le Helm chart, configurez-le comme suit :
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour utiliser cet exécutable, définissez la variable d'environnement `DD_SECRET_BACKEND_COMMAND` comme suit :
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Exemple : lecture à partir de fichiers montés

Kubernetes prend en charge [l'exposition des secrets sous forme de fichiers][2] au sein d'un pod, que l'Agent peut lire pour récupérer les secrets.

Dans Kubernetes, vous pouvez monter un Secret en tant que volume de la manière suivante :
```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

Vous pouvez ensuite faire référence à ce secret de la manière suivante :
```
password: ENC[file@/etc/secret-volume/password]
```

**Remarques** :
 Le Secret doit se trouver dans le même espace de noms que le pod dans lequel il est monté.
 Le script peut accéder à tous les sous-dossiers, y compris au dossier sensible `/var/run/secrets/kubernetes.io/serviceaccount/token`. C'est pourquoi Datadog recommande d'utiliser un dossier dédié plutôt que `/var/run/secrets`.

Les secrets Docker Swarm[3] sont montés dans le dossier `/run/secrets`. Par exemple, le secret Docker `db_prod_password` se trouve dans le répertoire `/run/secrets/db_prod_password` du conteneur Agent. Cela serait indiqué dans la configuration sous la forme `ENC[file@/run/secrets/db_prod_password]`.

#### Exemple : lecture d'un secret Kubernetes entre espaces de noms

Si vous souhaitez que l'Agent lise un secret provenant d'un espace de noms différent, utilisez le préfixe `k8s_secret@`. Par exemple :
```
password: ENC[k8s_secret@database/database-secret/password]
```

Configurez le RBAC pour permettre au compte de service de l'agent de lire le secret. Le rôle suivant accorde un accès en lecture au secret `databasesecret` dans l'espace de noms `database` :
{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
      roles:
      - namespace: database
        secrets:
        - "database-secret"
```
***Remarque*** : chaque espace de noms figurant dans la liste des rôles doit également être configuré dans la variable d'environnement `WATCH_NAMESPACE` ou `DD_AGENT_WATCH_NAMESPACE` du déploiement de Datadog Operator.
{{% /tab %}}
{{% tab "Casque" %}}
```yaml
datadog:
  (...)
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
    roles:
      - namespace: database
        secrets:
          - database-secret
```
{{% /tab %}}
{{< /tabs >}}


Vous pouvez également définir directement les ressources RBAC :
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```

Ce « rôle » donne accès au « secret : databasesecret » dans l'« espace de noms : database ». Le `RoleBinding` associe cette autorisation au `ServiceAccount : datadogagent` dans l'`espace de noms : default`. Vous devez l'ajouter manuellement à votre cluster en fonction des ressources que vous avez déployées.

### Option 3 : Création d'un exécutable personnalisé

Pour récupérer les secrets, l'Agent utilise un exécutable externe que vous fournissez. Le fichier exécutable est utilisé lorsque de nouveaux secrets sont détectés ; ceux-ci sont alors mis en cache pour toute la durée de vie de l'agent. Si vous devez mettre à jour ou renouveler un secret, vous devez redémarrer l'Agent pour le recharger.

Cela vous permet d'utiliser n'importe quelle solution de gestion des secrets et vous offre un contrôle total sur la manière dont l'agent accède à ces secrets.

L'agent envoie à cet exécutable, via l'entrée standard, une charge utile au format JSON contenant une liste d'identifiants secrets à résoudre. Ensuite, votre exécutable récupère chaque secret et les renvoie au format JSON via la sortie standard.

L'exemple suivant montre ce que l'Agent envoie à votre exécutable via STDIN :
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (chaîne de caractères) : la version du format.
* `secrets` (liste de chaînes de caractères) : chaque chaîne correspond à un identifiant permettant de récupérer un secret.


Le programme exécutable renvoie la sortie STDOUT suivante :
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (chaîne de caractères) : la valeur secrète à utiliser dans les configurations. Cette valeur peut être `null` en cas d'erreur.
* `error` (chaîne de caractères) : un message d'erreur ou `null`.

Si un secret ne peut être résolu (soit parce qu'un code de sortie différent de zéro est renvoyé, soit parce qu'une erreur non nulle est signalée), la configuration correspondante est ignorée par l'Agent.

**Ne transmettez jamais d'informations sensibles via `stderr`**. Si le fichier binaire se termine avec un code d'état différent de `0`, l'Agent consigne les messages d'erreur standard de votre exécutable à des fins de dépannage.

Vous pouvez également créer votre propre programme d'extraction de mots de passe dans le langage de votre choix. La seule condition est qu'il respecte le format d'entrée/sortie décrit précédemment.

Voici un exemple en Go qui renvoie des secrets fictifs :
```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

Cela modifie votre configuration :

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

Enregistrer ce qui suit en mémoire :

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Vous pouvez configurer l'Agent pour qu'il utilise le fichier binaire afin de résoudre les secrets en ajoutant ce qui suit :
```
secret_backend_command: /path/to/binary
```

## Exigences de sécurité pour les agents

L'agent exécute le fichier exécutable fourni en tant que sous-processus. Les modes d'exécution diffèrent sous Linux et sous Windows.

{{< tabs >}}
{{% tab "Linux" %}}

Sous Linux, votre fichier exécutable doit :

* Appartenir au même utilisateur que celui qui exécute l'agent (`ddagent` par défaut, ou `root` à l'intérieur d'un conteneur).
* Ne dispose d'aucun droit pour le « groupe » ou les « autres ».
* Disposer au minimum du droit **d'exécution** pour le propriétaire.

{{% /tab %}}
{{% tab "Windows" %}}

Sous Windows, votre fichier exécutable doit :

* Disposer des droits de **lecture** ou d'**exécution** pour `ddagentuser` (l'utilisateur utilisé pour exécuter l'Agent).
* Ne disposer d'aucun droit pour aucun utilisateur ou groupe, à l'exception du groupe **Administrateurs**, du compte intégré **Système local** ou du contexte utilisateur de l'agent (`ddagentuser` par défaut).
* Il doit s'agir d'une application Win32 valide afin que l'Agent puisse l'exécuter (par exemple, un script PowerShell ou Python ne fonctionnera pas).

{{% /tab %}}
{{< /tabs >}}

**Remarque** : votre exécutable utilise les mêmes variables d'environnement que l'Agent.

## Actualisation des secrets pendant l'exécution

À partir de la version 7.67 de l'Agent, vous pouvez configurer l'Agent pour qu'il actualise les secrets résolus sans nécessiter de redémarrage.

Définir un intervalle de rafraîchissement :
```yaml
secret_refresh_interval: 3600  # refresh every hour
```

Ou bien, lancez l'actualisation manuellement :
```shell
datadog-agent secret refresh
```

### Actualisation de la clé API/application
Les clés API/APP enregistrées en tant que secrets prennent en charge l'actualisation à l'exécution.

Vous pouvez activer cette fonctionnalité en définissant `secret_refresh_interval` (en secondes) dans `datadog.yaml` :
```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

Par défaut, l'Agent randomise l'actualisation initiale dans la fenêtre `secret_refresh_interval` afin d'empêcher une flotte de
Des agents rafraîchissants agissant simultanément. La clé est résolue au démarrage, puis actualisée une fois au cours du premier intervalle
et à chaque intervalle suivant.

Pour éviter toute interruption de service, n'invalidez les anciennes clés qu'une fois que l'ensemble de votre parc aura récupéré les clés mises à jour. Vous pouvez suivre les indicateurs clés
Utilisation sur la page [Gestion de flotte](https://app.datadoghq.com/fleet).

Vous pouvez désactiver ce comportement en définissant :
```yaml
secret_refresh_scatter: false
```

### Actualisation des secrets lors de la détection automatique
À partir de la version 7.76 d'Agent, les vérifications [Autodiscovery][1] planifiées peuvent actualiser les secrets lors de l'exécution si le modèle utilise la syntaxe `ENC[]`.

```yaml
labels:
  tags.datadoghq.com/redis.env: "prod"
  tags.datadoghq.com/redis.service: "my-redis"
  tags.datadoghq.com/redis.version: "6.0.3"
annotations:
  ad.datadoghq.com/redis.checks: |
    {
      "redisdb": {
        "init_config": {},
        "instances": [
          {
            "host": "%%host%%",
            "port":"6379",
            "password":"ENC[<secret_handle>]"
          }
        ]
      }
    }
```

L'Agent peut alors déclencher l'actualisation des secrets soit à l'intervalle défini dans `secret_refresh_interval`, soit manuellement à l'aide de la commande `datadogagent secret refresh`.

### Actualisation automatique des secrets en cas d'échec ou d'invalidation de la clé API

À partir de la version 7.74 de l'Agent, celui-ci peut actualiser automatiquement les secrets lorsqu'il détecte une clé API non valide. Cela se produit lorsque l'Agent reçoit une réponse 403 Forbidden de Datadog ou lorsque le contrôle de santé périodique détecte une clé API non valide ou expirée.

Pour activer cette fonctionnalité, définissez `secret_refresh_on_api_key_failure_interval` sur un intervalle en minutes dans votre fichier `datadog.yaml`. Définissez cette valeur sur « 0 » pour désactiver la fonction (valeur par défaut).

Cet intervalle correspond au délai minimal entre deux actualisations afin d'éviter de surcharger votre solution de gestion des secrets lorsqu'une clé API non valide est détectée.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Ce paramètre est compatible avec `secret_refresh_interval`.

### Activation de l'actualisation du collecteur DDOT
Si vous utilisez [DDOT Collector][6] et que vous souhaitez activer l'actualisation via l'API ou l'application, vous devez ajouter la configuration supplémentaire suivante à votre fichier `datadog.yaml` :
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Cela garantit que le collecteur DDOT reste synchronisé avec l'agent après l'actualisation des secrets. Tout comme l'Agent vérifie périodiquement l'état de sa configuration, le collecteur DDOT utilise ce paramètre pour vérifier régulièrement si l'Agent a mis à jour ses valeurs.

## Dépannage

### Liste des secrets détectés

La commande « secret » de l'interface CLI de l'Agent affiche toutes les erreurs liées à votre configuration. Par exemple, si les droits d'accès de l'exécutable ne sont pas corrects. Il répertorie également tous les poignées détectées, ainsi que leur emplacement.

Sous Linux, cette commande affiche le mode d'accès, le propriétaire et le groupe du fichier exécutable. Sous Windows, les droits ACL sont répertoriés.

{{< tabs >}}
{{% tab "Linux" %}}

Exemple sous Linux :

```sh
datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Exemple sous Windows (à partir d'une session PowerShell en tant qu'administrateur) :
```powershell```
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Affichage des configurations après l'injection des secrets

Pour voir rapidement comment les configurations de la vérification sont résolues, vous pouvez utiliser la commande `configcheck` :

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**Remarque** : L'agent doit être [redémarré][7] pour que les modifications apportées aux fichiers de configuration soient prises en compte.

### Débogage de votre commande secret_backend_command

Pour effectuer des tests ou du débogage en dehors de l'Agent, vous pouvez reproduire la manière dont celui-ci l'exécute :

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

L'utilisateur « ddagent » est créé lors de l'installation de l'agent Datadog.

{{% /tab %}}
{{% tab "Windows" %}}

##### Erreurs liées aux droits

Les erreurs suivantes indiquent qu'il manque quelque chose dans votre configuration.

1. Si un groupe ou un utilisateur autre que celui qui devrait l'être dispose de droits sur le fichier exécutable, une erreur similaire à celle-ci est consignée :
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` ne dispose pas des droits de lecture et d'exécution sur le fichier, une erreur similaire est consignée :
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Votre fichier exécutable doit être une application Win32 valide. Sinon, l'erreur suivante est consignée :
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog propose un [script PowerShell][9] pour vous aider à définir les droits d'accès appropriés pour votre fichier exécutable. Exemple d'utilisation :

```powershell```
.\Set-SecretPermissions.ps1 -SecretBinaryPath C:\secrets\decrypt_secrets.exe
ddagentuser SID: S-1-5-21-3139760116-144564943-2741514060-1076
=== Checking executable permissions ===
Executable path: C:\secrets\decrypt_secrets.exe
Executable permissions: OK, the executable has the correct permissions

Permissions Detail:

stdout:
Path   : Microsoft.PowerShell.Core\FileSystem::C:\secrets\decrypt_secrets.exe
Owner  : BUILTIN\Administrators
Group  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         DESKTOP-V03BB2P\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:BAD:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-3139760116-144564943-2741514
         060-1076)
stderr:


=== Secrets stats ===
Number of secrets resolved: 0
Secrets handle resolved:
```

##### Tester votre fichier exécutable

Votre fichier exécutable est lancé par l'Agent lors de la récupération de vos secrets. L'agent Datadog s'exécute sous l'utilisateur `ddagentuser`. Cet utilisateur ne dispose d'aucun droit spécifique, mais il fait partie du groupe « Utilisateurs du Moniteur de performances ». Le mot de passe de cet utilisateur est généré de manière aléatoire lors de l'installation et n'est jamais enregistré nulle part.

Cela signifie que votre exécutable fonctionnera peut-être avec votre utilisateur par défaut ou votre utilisateur de développement, mais pas lorsqu'il est exécuté par l'Agent, car `ddagentuser` dispose de droits plus restreints.

Pour tester votre exécutable dans les mêmes conditions que l'Agent, modifiez le mot de passe de l'utilisateur `ddagentuser` sur votre machine de développement. De cette façon, vous pouvez vous authentifier en tant que `ddagentuser` et exécuter votre programme dans le même contexte que celui de l'Agent.

Pour ce faire, procédez comme suit :

1. Supprimez « ddagentuser » de la liste « Stratégies locales/Attribution des droits d'utilisateur/Refuser la connexion locale » dans la « Stratégie de sécurité locale ».
2. Définissez un nouveau mot de passe pour `ddagentuser` (car celui généré lors de l'installation n'est enregistré nulle part). Dans PowerShell, exécutez la commande suivante :
    ```powershell```
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Modifiez le mot de passe utilisé par le service `DatadogAgent` dans le Gestionnaire de contrôle des services. Dans PowerShell, exécutez la commande suivante :
    ```powershell```
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Vous pouvez désormais vous connecter en tant que `ddagentuser` pour tester votre exécutable. Datadog propose un [script PowerShell][10] pour vous aider à tester votre
exécutable sous un autre utilisateur. Il change de contexte utilisateur et reproduit la manière dont l'Agent exécute votre fichier exécutable.

Exemple d'utilisation :

```powershell```
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```

[9] : https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/SetSecretPermissions.ps1
[10] : https://github.com/DataDog/datadogagent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### L'agent refuse de démarrer

La première chose que fait l'Agent au démarrage est de charger le fichier `datadog.yaml` et de déchiffrer les secrets qu'il contient. Cette opération doit être effectuée avant de configurer la journalisation. Cela signifie que sur des plateformes telles que Windows, les erreurs survenant lors du chargement du fichier `datadog.yaml` ne sont pas consignées dans les journaux, mais sur `stderr`. Cela peut se produire lorsque le fichier exécutable fourni à l'Agent pour les secrets renvoie une erreur.

Si votre fichier `datadog.yaml` contient des secrets et que l'Agent refuse de démarrer :

* Essayez de démarrer l'agent manuellement pour pouvoir consulter `stderr`.
* Supprimez les secrets du fichier `datadog.yaml` et effectuez d'abord un test en utilisant les secrets dans un fichier de configuration de vérification.

### Tester les autorisations Kubernetes
Lorsque vous consultez Secrets directement depuis Kubernetes, vous pouvez vérifier vos autorisations à l'aide de la commande `kubectl auth`. La forme générale est la suivante :

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Prenons l'exemple précédent [de secrets Kubernetes](#examplereadingakubernetessecretacrossnamespaces), dans lequel le secret `Secret:databasesecret` se trouve dans l'espace de noms `Namespace: database`, et le compte de service `ServiceAccount:datadogagent` se trouve dans l'espace de noms `Namespace: default`.

Dans ce cas, utilisez la commande suivante :

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Cette commande indique si l'Agent dispose des autorisations nécessaires pour consulter ce secret.

### Supprimer les sauts de ligne à la fin {#removetrailinglinebreaks}

Certains outils de gestion des secrets ajoutent automatiquement un saut de ligne lors de l'exportation des secrets via des fichiers. Vous pouvez supprimer ces sauts de ligne en définissant `secret_backend_remove_trailing_line_break: true` dans [le fichier de configuration datadog.yaml][8], ou en utilisant la variable d'environnement `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` pour obtenir le même résultat, notamment dans les environnements conteneurisés.

### Variables de détection automatique dans les identifiants de secrets

Il est également possible d'utiliser des variables [Autodiscovery][1] dans les identifiants de secret. L'agent résout ces variables avant de résoudre le secret. Par exemple :
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1] : /agent/kubernetes/integrations/
[2] : https://kubernetes.io/docs/tasks/injectdataapplication/distributecredentialssecure/#createapodthathasaccesstothesecretdatathroughavolume
[3] : https://docs.docker.com/engine/swarm/secrets/
[6] : /opentelemetry/setup/ddot_collector/
[7] : /agent/configuration/agentcommands/#redémarrer-l'agent
[8] : /agent/configuration/fichiers-de-configuration-de-l'agent/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000] : https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001] : https://docs.aws.amazon.com/systemsmanager/latest/userguide/systemsmanagerparameterstore.html
[1006] : https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html

<!-- Azure KeyVault Links -->
[2000] : https://docs.microsoft.com/enus/Azure/keyvault/secrets/quickcreateportal

<!-- HashiCorp Vault Links -->
[3000] : https://learn.hashicorp.com/tutorials/vault/staticsecrets
[3001] : https://developer.hashicorp.com/
[3003] : https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switchroleec2_instanceprofiles.html
[3004] : https://developer.hashicorp.com/vault/docs/auth/aws#iamauthenticationinferences

<!-- File Backend Links (JSON/YAML) -->
[4001] : https://en.wikipedia.org/wiki/JSON
[4002] : https://en.wikipedia.org/wiki/YAML
[4003] : https://en.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000] : https://cloud.google.com/security/products/secretmanager
[5001] : https://cloud.google.com/docs/authentication/applicationdefaultcredentials
[5002] : https://docs.cloud.google.com/secretmanager/docs/accesscontrol
[5003] : https://docs.cloud.google.com/secretmanager/docs/accessingtheapi

<!-- Docker Secrets Links -->
[6001] : https://docs.docker.com/engine/swarm/secrets/
[6002] : https://docs.docker.com/engine/swarm/secrets/#howdockermanagessecrets
[6003] : https://docs.docker.com/compose/howtos/usesecrets/

<!-- Kubernetes Secrets Links -->
[7000] : https://kubernetes.io/docs/concepts/configuration/secret/