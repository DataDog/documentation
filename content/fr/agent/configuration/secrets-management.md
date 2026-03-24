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
  text: Découverte automatique
title: Gestion des secrets
---
## Aperçu

L'Agent Datadog vous aide à gérer vos secrets de manière sécurisée en s'intégrant aux solutions de gestion des secrets suivantes :
- [AWS Secrets Manager](#id-for-secrets)
- [AWS SSM](#id-for-ssm)
- [Azure KeyVault](#id-for-azure)
- [GCP Secret Manager](#id-for-gcp)
- [HashiCorp Vault](#id-for-hashicorp)
- [Kubernetes Secrets](#id-for-kubernetes)
- [Docker Secrets](#id-for-docker)
- [Texte de fichier](#id-for-json-yaml-text)
- [Fichier JSON](#id-for-json-yaml-text)
- [Fichier YAML](#id-for-json-yaml-text)

Au lieu de coder en dur des valeurs sensibles comme des clés API ou des mots de passe en texte clair dans des fichiers de configuration, l'Agent peut les récupérer dynamiquement à l'exécution. Pour référencer un secret dans votre configuration, utilisez la notation `ENC[<secret_id>]`. Le secret est récupéré et chargé en mémoire mais n'est jamais écrit sur le disque ni envoyé au backend Datadog.

**Remarque** : Vous ne pouvez pas utiliser la syntaxe `ENC[]` dans des paramètres `secret_*` comme `secret_backend_command`.

## Options pour récupérer des secrets

### Option 1 : Utiliser le support natif de l'Agent pour récupérer les secrets

**Remarque** : À partir de la version `7.76` de l'Agent et des versions suivantes, la gestion des secrets natifs est disponible pour les Agents activés FIPS.

À partir de la version `7.70` de l'Agent, l'Agent Datadog prend en charge plusieurs solutions de gestion des secrets de manière native. Deux nouveaux paramètres ont été introduits dans `datadog.yaml` : `secret_backend_type` et `secret_backend_config`.

`secret_backend_type` est utilisé pour spécifier quelle solution de gestion des secrets utiliser, et `secret_backend_config` contient la configuration supplémentaire pertinente pour cette solution.

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

**Remarque** : Si vous exécutez Datadog dans un environnement conteneurisé, le [Cluster Agent](/containers/cluster_agent/) nécessite l'Agent 7.77 ou une version ultérieure pour prendre en charge la récupération native des secrets. Pour les versions antérieures, utilisez [Option 2](#option-2-using-the-built-in-script-for-kubernetes-and-docker) ou [Option 3](#option-3-creating-a-custom-executable) à la place.

Des instructions de configuration plus spécifiques dépendent du type de backend utilisé. Voir la section appropriée ci-dessous pour plus d'informations :


{{% collapse-content title="Secrets AWS" level="h4" expanded=false id="id-for-secrets" %}}
Les services AWS suivants sont pris en charge :

|valeur secret_backend_type                                | Service AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Configurer un profil d'instance

Datadog recommande d'utiliser la méthode du [profil d'instance][1006] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. De plus amples instructions sur la façon de procéder peuvent être trouvées dans la [documentation officielle d'AWS Secrets Manager][1000].

##### Exemple de configuration

{{< tabs >}}
{{% tab "Fichier YAML de l'Agent" %}}

Configurez l'Agent Datadog pour utiliser AWS Secrets afin de résoudre les secrets en utilisant la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

Lors de l'utilisation de variables d'environnement, convertissez la configuration en JSON comme suit :

```sh
DD_SECRET_BACKEND_TYPE="aws.secrets"
DD_SECRET_BACKEND_CONFIG='{"aws_session":{"aws_region":"<AWS_REGION>"}}'
```

Après avoir configuré l'Agent pour utiliser AWS Secrets, vous pouvez référencer n'importe quel secret dans vos configurations avec `ENC[secretId;secretKey]`.

La notation ENC est composée de :
* `secretId` : soit le "nom convivial" du secret (par exemple, `/DatadogAgent/Production`) ou l'ARN (par exemple, `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`).
  - **Note** : Le format ARN complet est requis lors de l'accès à des secrets d'un compte différent où les identifiants AWS ou les identifiants `sts:AssumeRole` sont définis.
* `secretKey` : la clé JSON du secret AWS que vous souhaitez utiliser.


Le gestionnaire de secrets AWS peut stocker plusieurs paires clé-valeur au sein d'un seul secret. Une configuration de backend utilisant le gestionnaire de secrets a accès à toutes les clés définies dans un secret.

Par exemple, en supposant que l'ID de secret `My-Secrets` contient les 3 valeurs suivantes :

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

Voici un exemple complet du fichier de configuration `datadog.yaml` utilisant les AWS Secrets pour extraire sa clé API de `My-Secrets` :

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

{{% /tab %}}

{{% tab "Helm" %}}

Configurez l'Agent Datadog pour utiliser AWS Secrets afin de résoudre les secrets dans Helm en utilisant la configuration suivante :

##### Vérification d'intégration

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

<div class="alert alert-info"> Vous devez inclure les <code>annotationsServiceAccount</code> pour permettre à l'Agent d'accéder au secret AWS. </div>

<br>


##### Vérification de cluster : sans les exécuteurs de vérification de cluster activés

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

##### Vérification de cluster : avec les exécuteurs de vérification de cluster activés

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

Configurez l'Agent Datadog pour utiliser AWS Secrets afin de résoudre les secrets avec l'Opérateur Datadog en utilisant la configuration suivante :

##### Vérification d'intégration


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

<div class="alert alert-info"> Vous devez inclure les <code>annotationsServiceAccount</code> pour permettre à l'Agent d'accéder au secret AWS. </div>

<br>


##### Vérification de cluster : sans les exécuteurs de vérification de cluster activés

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

##### Vérification de cluster : avec les exécuteurs de vérification de cluster activés

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

|valeur secret_backend_type                                | Service AWS                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Configurer un profil d'instance

Datadog recommande d'utiliser la méthode du [profil d'instance][1006] pour récupérer les secrets, car AWS gère toutes les variables d'environnement et les profils de session pour vous. Des instructions supplémentaires sur la façon de procéder peuvent être trouvées dans la documentation officielle [AWS Secrets Manager][1001].

##### Exemple de configuration

Le AWS System Manager Parameter Store prend en charge un modèle hiérarchique. Par exemple, en supposant les chemins suivants du AWS System Manager Parameter Store :

```sh
/DatadogAgent/Production/ApiKey = <your_api_key>
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

Les paramètres peuvent être récupérés de la manière suivante :

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


{{% collapse-content title="Backend Azure KeyVault" level="h4" expanded=false id="id-for-azure" %}}


Les services Azure suivants sont pris en charge :

| secret_backend_type valeur                            | Service Azure          |
| ----------------------------------------|------------------------|
| `azure.keyvault` | [Azure KeyVault][2000] |

##### authentification Azure

Datadog recommande d'utiliser des identités gérées pour s'authentifier auprès d'Azure. Cela vous permet d'associer des ressources cloud avec des comptes AMI et supprime le besoin d'insérer des informations sensibles dans votre `datadog.yaml` fichier de configuration.

##### Identité gérée

Pour accéder à votre Key Vault, créez une identité gérée et assignez-la à votre machine virtuelle. Ensuite, configurez l'attribution de rôle appropriée sur le Key Vault pour permettre à cette identité d'accéder à ses secrets.

##### Exemple de configuration

La configuration du backend pour les secrets Azure Key Vault est structurée en YAML suivant ce schéma :

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

Le secret du backend est référencé dans votre fichier de configuration de l'Agent Datadog avec `ENC[ ]`. L'exemple suivant montre comment un secret en texte brut doit être récupéré :

```yaml
# datadog.yaml

api_key: "ENC[secretKeyNameInKeyVault]"
```

{{% /collapse-content %}}

{{% collapse-content title="GCP Secret Manager" level="h4" expanded=false id="id-for-gcp" %}}

**Disponible dans la version 7.74+ de l'Agent**

Les services GCP suivants sont pris en charge :

| valeur secret_backend_type                               | Service GCP                    |
| ------------------------------------------------------- | ------------------------------ |
| `gcp.secretmanager` | [GCP Secret Manager][5000] |

##### Authentification GCP et politique d'accès

L'implémentation de GCP Secret Manager utilise [Application Default Credentials (ADC)][5001] pour l'authentification avec Google.

Pour interagir avec GCP Secret Manager, le compte de service utilisé par l'Agent Datadog (tel que le compte de service de la VM, une identité de charge de travail ou des identifiants activés localement) nécessite la `secretmanager.versions.access` permission.

Ceci peut être accordé avec le rôle prédéfini **Accesseur de secret du gestionnaire de secrets** (`roles/secretmanager.secretAccessor`) ou un rôle personnalisé avec un [accès][5002] équivalent.

Sur les environnements GCE ou GKE, ADC est configuré automatiquement via le compte de service attaché à l'instance ou au pod. Le compte de service attaché doit avoir les rôles appropriés pour accéder à GCP Secret Manager. De plus, l'environnement GCE ou GKE nécessite le `cloud-platform` [portée d'accès OAuth][5003].

##### Exemple de configuration GCP

Configurez l'Agent Datadog pour utiliser GCP Secret Manager afin de résoudre les secrets avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Après avoir configuré l'Agent pour utiliser GCP Secret Manager, référencez les secrets dans vos configurations avec `ENC[secret-name]` ou `ENC[secret-name;key;version;]`.

La notation ENC est composée de :

- `secret` : le nom du secret dans GCP Secret Manager (par exemple, `datadog-api-key`).
- `key` : (facultatif) la clé à extraire d'un secret au format JSON. Si vous utilisez des secrets en texte brut, vous pouvez omettre cela (exemple : `ENC[secret-name;;version]`).
- `version` : (facultatif) le numéro de version du secret. Si non spécifié, la `latest` version est utilisée.
  + Exemples de syntaxe de version :
    - `secret-key` - version implicite `latest`
    - `secret-key;;latest` - Version `latest` explicite
    - `secret-key;;1` - Numéro de version spécifique

Par exemple, en supposant que les secrets GCP nommés `datadog-api-key` ont deux versions et `datadog-app-key` :

```yaml
# datadog.yaml
api_key: ENC[datadog-api-key;;1] # specify the first version of the api key
app_key: ENC[datadog-app-key] # latest version

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

Pour les secrets au format JSON, en supposant qu'un secret nommé `datadog-keys` contient :

```json
{
  "api_key": "your_api_key_value",
  "app_key": "your_app_key_value"
}
```

Référencez des clés spécifiques comme ceci :

```yaml
# datadog.yaml
api_key: ENC[datadog-keys;api_key;1] # specify the first version of the api key 
app_key: ENC[datadog-keys;app_key] # latest

secret_backend_type: gcp.secretmanager
secret_backend_config:
  gcp_session:
    project_id: <PROJECT_ID>
```

##### Versionnement des secrets

GCP Secret Manager prend en charge les versions de secret. L'implémentation de l'Agent prend également en charge le versionnement des secrets en utilisant le délimiteur `;`. Si aucune version n'est spécifiée, la `latest` version est utilisée.


##### Support des secrets JSON

L'Agent Datadog prend en charge l'extraction de clés spécifiques à partir de secrets au format JSON en utilisant le délimiteur `;` :

- `datadog;api_key` - Extrait le champ `api_key` du secret `datadog` avec une version implicite `latest`
- `datadog;api_key;1` - Extrait le champ `api_key` du secret `datadog` de la version `1`

{{% /collapse-content %}}


{{% collapse-content title="Backend HashiCorp Vault" level="h4" expanded=false id="id-for-hashicorp" %}}

Les services HashiCorp suivants sont pris en charge :

| valeur du type de backend secret                               | Service HashiCorp                                  |
| ------------------------------------------ | -------------------------------------------------- |
| `hashicorp.vault` | [HashiCorp Vault (Versions du moteur de secrets 1 et 2)][3000] |

##### Comment configurer HashiCorp Vault
1. Exécutez votre HashiCorp Vault. Consultez la [documentation officielle de HashiCorp Vault][3001] pour plus d'informations.
2. Rédigez une politique qui donne la permission de récupérer des secrets de votre Vault. Créez un fichier `*.hcl`, et incluez la permission suivante si vous utilisez la version 1 du moteur de secrets :

```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
Si vous utilisez la version 2 du moteur de secrets, alors les permissions suivantes sont nécessaires :

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
3. Exécutez `vault policy write <policy_name> <path_to_*.hcl_file>`

4. Choisissez la méthode d'authentification à votre Vault. Si vous utilisez la méthode de profil d'instance AWS, exécutez `vault auth enable aws`.

##### Instructions sur le profil d'instance AWS

Datadog recommande de vous authentifier en utilisant la [méthode de profil d'instance][3003] si vous exécutez votre HashiCorp Vault depuis une machine connectée à AWS.

Après cela, rédigez une [politique Vault spécifique à l'authentification][3004].

##### Exemple de configuration

Dans l'exemple suivant, supposons que le préfixe du chemin secret de HashiCorp Vault est `/Datadog/Production` avec une clé de paramètre de `apikey` :

```sh
/DatadogAgent/Production/apikey: (SecureString) "<your_api_key>"
```

L'exemple suivant récupère la valeur de la clé API de HashiCorp Vault en utilisant AWS pour l'authentification.

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

**Disponible dans la version 7.75+ de l'Agent**

Les services Kubernetes suivants sont pris en charge :

| valeur du type de backend secret | Service |
|---------------------------|---------|
| `k8s.secrets` | [Kubernetes Secrets][7000] |

##### Prérequis

Le backend des secrets Kubernetes nécessite :
- **Identifiants ServiceAccount** : Par défaut, utilise des jetons ServiceAccount montés automatiquement (`automountServiceAccountToken: true`, voir [documentation Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting)). Des chemins personnalisés peuvent être configurés si nécessaire.
- **Permissions RBAC** : Le ServiceAccount de l'Agent doit avoir les permissions pour lire les secrets des namespaces cibles
- **Accès réseau** : Le pod de l'Agent doit pouvoir atteindre le serveur API Kubernetes

##### Configuration RBAC

Pour chaque namespace contenant des secrets, créez un `Role` et `RoleBinding` en utilisant l'exemple suivant avec le nom de namespace correct :

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
{{% tab "Fichier YAML de l'Agent" %}}

Configurez l'Agent Datadog pour utiliser les Secrets Kubernetes avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: k8s.secrets

# Reference secrets using namespace/secret-name;key format
api_key: "ENC[secrets-prod/dd-api-key;api_key]"
app_key: "ENC[secrets-prod/dd-api-key;app_key]"
```

Le format de notation ENC est `namespace/secret-name;key` :
- `namespace` : Le namespace Kubernetes contenant le secret
- `secret-name` : Le nom de la ressource Secret
- `key` : La clé spécifique à extraire du champ de données du Secret

**Exemple :** Étant donné un Secret dans le namespace `secrets-ns` :

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

Vous pouvez référencer des clés individuelles :

```yaml
api_key: "ENC[secrets-ns/dd-api-key;api_key]"
app_key: "ENC[secrets-ns/dd-api-key;app_key]"
```

**Support multi-namespace :**
Chaque référence de secret peut spécifier un namespace différent (RBAC doit être configuré pour chacun) :

```yaml
api_key: "ENC[secrets-ns/dd-keys;api_key]"
db_password: "ENC[secrets-shared/db-creds;password]"
```

{{% /tab %}}

{{% tab "Helm" %}}

Configurez l'Agent Datadog pour utiliser les Secrets Kubernetes avec Helm :

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

**Remarque :** Un placeholder `apiKey` est requis pour la validation du chart Helm lors de l'utilisation d'un backend secret pour résoudre la clé API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement RBAC (Rôle + Liaison de rôle) pour chaque namespace contenant des secrets. Pour plus d'informations, consultez la section [configuration RBAC](#rbac-setup).

<div class="alert alert-info"> Helm n'a pas de configuration native pour <code>secretBackend.type</code>. Utilisez des variables d'environnement. </div>

{{% /tab %}}

{{% tab "Opérateur" %}}

Configurez l'Agent Datadog pour utiliser les Secrets Kubernetes avec l'Opérateur Datadog :

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

**Remarque :** Une clé API placeholder satisfait à la validation de l'Opérateur lors de l'utilisation d'un backend secret pour résoudre la clé API. La variable d'environnement `DD_API_KEY` la remplace. Vous devez créer manuellement RBAC (Rôle + Liaison de rôle) pour chaque namespace contenant des secrets. Pour plus d'informations, consultez la section [configuration RBAC](#rbac-setup).

<div class="alert alert-info"> L'Opérateur n'a pas de configuration native pour <code>secretBackend.type</code>. Utilisez des variables d'environnement dans <code>override.nodeAgent.env</code>. </div>

{{% /tab %}}
{{< /tabs >}}

##### Configuration de chemin personnalisé
Si votre configuration ne suit pas les emplacements par défaut pour l'authentification basée sur ServiceAccount, vous pouvez spécifier `token_path` et `ca_path` à la place.

{{< tabs >}}
{{% tab "Agent YAML" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  token_path: /custom/path/to/token
  ca_path: /custom/path/to/ca.crt
```
{{% /tab %}}

{{% tab "Helm" %}}

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

Si votre configuration n'expose pas les variables d'environnement par défaut `KUBERNETES_SERVICE_HOST` et `KUBERNETES_SERVICE_PORT`, vous pouvez fournir une `api_server` URL pour interagir avec l'API REST Kubernetes.

{{< tabs >}}
{{% tab "Agent YAML" %}}

```yaml
secret_backend_type: k8s.secrets
secret_backend_config:
  api_server: https://{KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}
```
{{% /tab %}}

{{% tab "Helm" %}}

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

{{% collapse-content title="Secrets Docker" level="h4" expanded=false id="id-for-docker" %}}

**Disponible dans la version 7.75+ de l'Agent**

Les services Docker suivants sont pris en charge :

| valeur du type de backend secret | Service |
|---------------------------|---------|
| `docker.secrets` | [Docker Secrets][6001] |

##### Prérequis

Le backend des secrets Docker prend en charge à la fois les [Docker Swarm secrets][6002] et les [Docker Compose secrets][6003]. Par défaut, à la fois Swarm et Compose montent automatiquement les secrets dans le conteneur en tant que fichiers à `/run/secrets` (Linux) ou `C:\ProgramData\Docker\secrets` (Windows).

**Note** : Les secrets Compose peuvent être basés sur des fichiers (pointant vers des fichiers locaux) ou externes (référencer des secrets Swarm existants).

##### Exemple de configuration

Configurez l'Agent Datadog pour utiliser les Secrets Docker avec la configuration suivante :

```yaml
# datadog.yaml
secret_backend_type: docker.secrets

# Reference secrets using the secret name (filename in /run/secrets)
api_key: "ENC[dd_api_key]"
```

Le format de notation ENC est le nom du secret, qui correspond au nom de fichier dans `/run/secrets/` :
- `ENC[api_key]` lit depuis `/run/secrets/api_key` (Linux) ou `C:\ProgramData\Docker\secrets\api_key` (Windows)

**Chemin des secrets personnalisés :**
Si Docker Swarm ou Compose sont configurés pour monter les secrets à un emplacement différent, vous pouvez le spécifier comme ceci :

```yaml
secret_backend_type: docker.secrets
secret_backend_config:
  secrets_path: /custom/secrets/path
```

##### Exemple Docker Swarm

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

Le secret `dd_api_key` est monté automatiquement à `/run/secrets/dd_api_key`, et l'Agent le lit en utilisant le backend `docker.secrets`.

##### Exemple Docker Compose

[Créer][6003] un `docker-compose.yml` avec des secrets basés sur des fichiers :

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

Le fichier secret `./secrets/api_key.txt` est monté à `/run/secrets/dd_api_key` dans le conteneur.


{{% /collapse-content %}}

{{% collapse-content title="Backends de secrets de fichiers JSON, YAML ou TEXT" level="h4" expanded=false id="id-for-json-yaml-text" %}}

| valeur du type de backend secret | Service de fichier |
|---------------------------------------------|-----------------------------------------|
|`file.json`           |[JSON][4001]                             |
|`file.yaml`          |[YAML][4002]                        |                            |
|`file.text`          |[TEXT][4003]                        |                            |

##### Permissions de fichier
Le backend de fichier nécessite uniquement des permissions de **lecture** pour les fichiers JSON, YAML ou TEXT configurés. Ces permissions doivent être accordées à l'utilisateur local de l'Agent Datadog (`dd-agent` sur Linux, `ddagentuser` sur Windows).


{{< tabs >}}
{{% tab "Backend de fichier JSON" %}}

**Remarque** : Un seul niveau de profondeur JSON est pris en charge (par exemple, `{"key": "value"}`)

##### Exemple de configuration

Vous pouvez utiliser un fichier JSON pour stocker des secrets localement.

Par exemple, avec un fichier JSON dans `/path/to/secret.json` contenant ce qui suit :

```json
{
  "datadog_api_key": "your_api_key"
}
```

Vous pouvez utiliser cette configuration pour extraire ses secrets :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "Backend de fichier YAML" %}}

**Remarque** : Un seul niveau de profondeur YAML est pris en charge (par exemple, `key: value`)

##### Exemple de configuration

Vous pouvez utiliser un fichier YAML pour stocker des secrets localement.

À titre d'exemple, si nous avons un fichier YAML dans `/path/to/secret.yaml` contenant :

```yaml
datadog_api_key: your api key
```

Vous pouvez utiliser la configuration suivante pour extraire des secrets à partir de celui-ci :

```yaml
# datadog.yaml
api_key: "ENC[datadog_api_key]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
```
{{% /tab %}}

{{% tab "Backend de fichier TEXT" %}}

**Disponible dans la version 7.75+ de l'Agent**

**Remarque** : Chaque secret doit être stocké dans son propre fichier texte individuel.

##### Exemple de configuration

Vous pouvez utiliser des fichiers texte individuels pour stocker des secrets localement.

Par exemple, avec des fichiers texte dans `/path/to/secrets/` :

`/path/to/secrets/dd_api_key` contenant :

```
your_api_key_value
```

`/path/to/secrets/dd_app_key` contenant :

```
your_app_key_value
```

Vous pouvez utiliser cette configuration pour extraire des secrets à partir d'eux :

```yaml
# datadog.yaml
api_key: "ENC[dd_api_key]"
app_key: "ENC[dd_app_key]"

secret_backend_type: file.text
secret_backend_config:
  secrets_path: /path/to/secrets
```

##### Sécurité des chemins :

- Les chemins relatifs dans `ENC[]` sont résolus par rapport à `secrets_path` (par exemple, `ENC[dd_api_key]` avec `secret_path: /path/to/secrets` sera résolu en `/path/to/secrets/dd_api_key`)
- Les chemins absolus dans `ENC[]` doivent être dans `secrets_path` (par exemple, `ENC[/path/to/secrets/dd_api_key]` avec `secret_path: /path/to/secrets` fonctionnera)
- Les tentatives de traversée de chemin (par exemple, `ENC[../etc/passwd]`) sont bloquées et échoueront avec "chemin en dehors du répertoire autorisé"

**Remarque:** Certains outils ajoutent automatiquement des sauts de ligne lors de l'exportation de secrets vers des fichiers. Voir [Supprimer les sauts de ligne finaux](#remove-trailing-line-breaks) pour savoir comment gérer cela.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


### Option 2 : Utiliser le script intégré pour Kubernetes et Docker

Pour les environnements conteneurisés, les images de conteneur de l'Agent Datadog incluent un script intégré `/readsecret_multiple_providers.sh` à partir de la version v7.32.0. Ce script prend en charge la lecture des secrets à partir de :

* Fichiers : en utilisant `ENC[file@/path/to/file]`
* Kubernetes Secrets : en utilisant `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

Pour utiliser cet exécutable avec l'Opérateur Datadog, configurez-le comme suit :

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
{{% tab "Helm" %}}

Pour utiliser cet exécutable avec le graphique Helm, définissez-le comme suit :

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

#### Exemple : Lecture à partir de fichiers montés

Kubernetes prend en charge [l'exposition des Secrets en tant que fichiers][2] à l'intérieur d'un pod que l'Agent peut lire pour résoudre des secrets.

Dans Kubernetes, vous pouvez monter un Secret en tant que volume comme ceci :

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

Vous pouvez ensuite référencer le secret de cette manière :

```
password: ENC[file@/etc/secret-volume/password]
```

**Notes** :
- Le secret doit exister dans le même espace de noms que le pod dans lequel il est monté.
- Le script peut accéder à tous les sous-dossiers, y compris le `/var/run/secrets/kubernetes.io/serviceaccount/token` sensible. Ainsi, Datadog recommande d'utiliser un dossier dédié au lieu de `/var/run/secrets`.

[Les secrets de Docker swarm][3] sont montés dans le dossier `/run/secrets`. Par exemple, le secret Docker `db_prod_passsword` est situé dans `/run/secrets/db_prod_password` dans le conteneur Agent. Cela serait référencé dans la configuration avec `ENC[file@/run/secrets/db_prod_password]`.

#### Exemple : Lecture d'un secret Kubernetes à travers les espaces de noms

Si vous souhaitez que l'Agent lise un secret d'un espace de noms différent, utilisez le préfixe `k8s_secret@`. Par exemple :

```
password: ENC[k8s_secret@database/database-secret/password]
```

Configurez RBAC pour permettre au compte de service de l'Agent de lire le secret. Le rôle suivant accorde l'accès en lecture au secret `database-secret` dans l'espace de noms `database` :
{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
***Note*** : Chaque espace de noms dans la liste des rôles doit également être configuré dans la variable d'environnement `WATCH_NAMESPACE` ou `DD_AGENT_WATCH_NAMESPACE` sur le déploiement de Datadog Operator.
{{% /tab %}}
{{% tab "Helm" %}}

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


Alternativement, vous pouvez définir directement les ressources RBAC :

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

Ce `Role` donne accès au `Secret: database-secret` dans le `Namespace: database`. Le `RoleBinding` relie cette permission au `ServiceAccount: datadog-agent` dans le `Namespace: default`. Cela doit être ajouté manuellement à votre cluster en fonction de vos ressources déployées.

### Option 3 : Création d'un exécutable personnalisé

Pour récupérer des secrets, l'Agent utilise un exécutable externe que vous fournissez. L'exécutable est utilisé lorsque de nouveaux secrets sont découverts et sont mis en cache pour le cycle de vie de l'Agent. Si vous devez mettre à jour ou effectuer la rotation d'un secret, vous devez redémarrer l'Agent pour le recharger.

Cela vous permet d'utiliser n'importe quelle solution de gestion des secrets et vous donne un contrôle total sur la manière dont l'Agent accède aux secrets.

L'Agent envoie à cet exécutable une charge utile JSON via l'entrée standard contenant une liste de poignées de secrets à résoudre. Ensuite, votre exécutable récupère chaque secret et les renvoie au format JSON via la sortie standard.

L'exemple suivant montre ce que l'Agent envoie à votre exécutable sur STDIN :

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (chaîne) : La version du format.
* `secrets` (liste de chaînes) : Chaque chaîne est une poignée pour un secret à récupérer.


L'exécutable répond par la sortie STDOUT suivante :

```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (chaîne) : La valeur du secret à utiliser dans les configurations. Cela peut être `null` en cas d'erreur.
* `error` (chaîne) : Un message d'erreur ou `null`.

Si un secret ne peut pas être résolu (soit en retournant un code de sortie non nul, soit en renvoyant une erreur non nulle), la configuration associée est ignorée par l'Agent.

**Ne jamais afficher d'informations sensibles sur `stderr`**. Si le binaire se termine avec un code d'état différent de `0`, l'Agent enregistre la sortie d'erreur standard de votre exécutable pour le dépannage.

Vous pouvez également créer votre propre exécutable de récupération de secrets en utilisant n'importe quel langage. La seule exigence est qu'il respecte le format d'entrée/sortie décrit précédemment.

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

Cela transforme votre configuration :

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

Ce qui donne en mémoire :

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

Vous pouvez configurer l'Agent pour utiliser le binaire afin de résoudre les secrets en ajoutant ce qui suit :

```
secret_backend_command: /path/to/binary
```

## Exigences de sécurité de l'Agent

L'Agent exécute l'exécutable fourni en tant que sous-processus. Les modèles d'exécution diffèrent sur Linux et Windows.

{{< tabs >}}
{{% tab "Linux" %}}

Sur Linux, votre exécutable doit :

* Appartenir au même utilisateur exécutant l'Agent (`dd-agent` par défaut, ou `root` à l'intérieur d'un conteneur).
* Ne pas avoir de droits pour `group` ou `other`.
* Avoir au moins le droit **d'exécution** pour le propriétaire.

{{% /tab %}}
{{% tab "Windows" %}}

Sur Windows, votre exécutable doit :

* Avoir **lecture** ou **exécution** pour `ddagentuser` (l'utilisateur utilisé pour exécuter l'Agent).
* Ne pas avoir de droits pour aucun utilisateur ou groupe, sauf pour le groupe **Administrateurs**, le compte intégré **Local System**, ou le contexte utilisateur de l'Agent (`ddagentuser` par défaut).
* Être une application Win32 valide afin que l'Agent puisse l'exécuter (par exemple, un script PowerShell ou Python ne fonctionne pas).

{{% /tab %}}
{{< /tabs >}}

**Remarque** : Votre exécutable partage les mêmes variables d'environnement que l'Agent.

## Rafraîchissement des secrets à l'exécution

À partir de l'Agent v7.67, vous pouvez configurer l'Agent pour rafraîchir les secrets résolus sans nécessiter un redémarrage.

Définissez un intervalle de rafraîchissement :

```yaml
secret_refresh_interval: 3600  # refresh every hour
```

Ou, déclenchez un rafraîchissement manuellement :

```shell
datadog-agent secret refresh
```

### Rafraîchissement de la clé API/APP
Les clés API/APP extraites en tant que secrets prennent en charge le rafraîchissement à l'exécution.

Vous pouvez activer cela en définissant `secret_refresh_interval` (en secondes) dans `datadog.yaml` :

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

Par défaut, l'Agent randomise le rafraîchissement initial dans la fenêtre de `secret_refresh_interval` pour éviter qu'une flotte d'
Agents ne se rafraîchissent pas simultanément. La clé est résolue au démarrage, puis rafraîchie une fois dans le premier intervalle
et à chaque intervalle par la suite.

Pour éviter les temps d'arrêt, invalidez les anciennes clés uniquement après que votre flotte entière a récupéré les clés mises à jour. Vous pouvez suivre l'utilisation des clés
sur la page [Gestion de la Flotte](https://app.datadoghq.com/fleet).

Vous pouvez désactiver ce comportement en définissant :

```yaml
secret_refresh_scatter: false
```

### Rafraîchissement des secrets de vérification d'autodécouverte
À partir de l'Agent v7.76, les vérifications [Autodécouverte][1] programmées peuvent rafraîchir les secrets à l'exécution si le modèle utilise la syntaxe `ENC[]`.

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

L'Agent peut alors déclencher le rafraîchissement des secrets, soit à l'intervalle défini dans `secret_refresh_interval`, soit manuellement avec `datadog-agent secret refresh`.

### Rafraîchissement automatique des secrets en cas d'échec / d'invalidation de la clé API

À partir de la version v7.74 de l'Agent, l'Agent peut automatiquement rafraîchir les secrets lorsqu'il détecte une clé API invalide. Cela se produit lorsque l'Agent reçoit une réponse 403 Interdit de Datadog ou lorsque la vérification de santé périodique détecte une clé API invalide ou expirée.

Pour activer cette fonctionnalité, définissez `secret_refresh_on_api_key_failure_interval` sur un intervalle en minutes dans votre fichier `datadog.yaml`. Définissez sur `0` pour désactiver (par défaut).

Cet intervalle est le temps minimum entre 2 rafraîchissements pour éviter de saturer votre solution de gestion des secrets lorsqu'une clé API invalide est détectée.

```yaml
api_key: ENC[<secret_handle>]

secret_refresh_on_api_key_failure_interval: 10
```

Ce paramètre est compatible avec `secret_refresh_interval`.

### Activation du rafraîchissement du collecteur DDOT
Si vous utilisez le [collecteur DDOT][6] et souhaitez activer le rafraîchissement API/APP, vous devez ajouter la configuration supplémentaire suivante à votre fichier `datadog.yaml`:

```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

Cela garantit que le collecteur DDOT reste synchronisé avec l'Agent après que les secrets ont été rafraîchis. De la même manière que l'Agent vérifie périodiquement son état de configuration, le collecteur DDOT utilise ce paramètre pour vérifier régulièrement les valeurs mises à jour de l'Agent.

## Dépannage

### Liste des secrets détectés

La commande `secret` dans l'interface de ligne de commande de l'Agent affiche toutes les erreurs liées à votre configuration. Par exemple, si les droits sur l'exécutable sont incorrects. Elle liste également tous les handles trouvés et leur emplacement.

Sur Linux, la commande affiche le mode de fichier, le propriétaire et le groupe pour l'exécutable. Sur Windows, les droits ACL sont listés.

{{< tabs >}}
{{% tab "Linux" %}}

Exemple sur Linux :

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

Exemple sur Windows (depuis un PowerShell Administrateur) :

```powershell
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

### Voir les configurations après que les secrets ont été injectés.

Pour voir rapidement comment les configurations du contrôle sont résolues, vous pouvez utiliser la commande `configcheck`:

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

**Remarque** : L'Agent doit être [redémarré][7] pour prendre en compte les modifications des fichiers de configuration.

### Débogage de votre secret_backend_command

Pour tester ou déboguer en dehors de l'Agent, vous pouvez imiter la façon dont l'Agent l'exécute :

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

L'utilisateur `dd-agent` est créé lorsque vous installez le Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Erreurs liées aux droits

Les erreurs suivantes indiquent qu'il manque quelque chose dans votre configuration.

1. Si un autre groupe ou utilisateur que celui nécessaire a des droits sur l'exécutable, une erreur similaire à la suivante est enregistrée :
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. Si `ddagentuser` n'a pas le droit de lecture et d'exécution sur le fichier, une erreur similaire est enregistrée :
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Votre exécutable doit être une application Win32 valide. Sinon, l'erreur suivante est enregistrée :
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog dispose d'un [script Powershell][9] pour vous aider à définir les bonnes permissions sur votre exécutable. Exemple sur la façon de l'utiliser :

```powershell
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

##### Tester votre exécutable

Votre exécutable est exécuté par l'Agent lors de la récupération de vos secrets. Le Datadog Agent s'exécute en utilisant le `ddagentuser`. Cet utilisateur n'a pas de droits spécifiques, mais il fait partie du groupe `Performance Monitor Users`. Le mot de passe de cet utilisateur est généré aléatoirement au moment de l'installation et n'est jamais enregistré nulle part.

Cela signifie que votre exécutable peut fonctionner avec votre utilisateur par défaut ou utilisateur de développement, mais pas lorsqu'il est exécuté par l'Agent, car `ddagentuser` a des droits plus restreints.

Pour tester votre exécutable dans les mêmes conditions que l'Agent, mettez à jour le mot de passe du `ddagentuser` sur votre boîte de développement. De cette façon, vous pouvez vous authentifier en tant que `ddagentuser` et exécuter votre exécutable dans le même contexte que l'Agent.

Pour ce faire, suivez ces étapes :

1. Supprimez `ddagentuser` de la liste `Local Policies/User Rights Assignement/Deny Log on locally` dans le `Local Security Policy`.
2. Définissez un nouveau mot de passe pour `ddagentuser` (puisque celui généré lors de l'installation n'est jamais enregistré nulle part). Dans PowerShell, exécutez :
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Mettez à jour le mot de passe à utiliser par le service `DatadogAgent` dans le Gestionnaire de contrôle des services. Dans PowerShell, exécutez :
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

Vous pouvez maintenant vous connecter en tant que `ddagentuser` pour tester votre exécutable. Datadog dispose d'un [PowerShell script][10] pour vous aider à tester votre
exécutable en tant qu'autre utilisateur. Il change de contexte utilisateur et imite la façon dont l'Agent exécute votre exécutable.

Exemple sur la façon de l'utiliser :

```powershell
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

[9]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1
[10]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
{{% /tab %}}
{{< /tabs >}}

### L'Agent refuse de démarrer

La première chose que fait l'Agent au démarrage est de charger `datadog.yaml` et de déchiffrer tous les secrets qu'il contient. Cela se fait avant la configuration de la journalisation. Cela signifie que sur des plateformes comme Windows, les erreurs survenant lors du chargement de `datadog.yaml` ne sont pas écrites dans les journaux, mais sur `stderr`. Cela peut se produire lorsque l'exécutable donné à l'Agent pour les secrets renvoie une erreur.

Si vous avez des secrets dans `datadog.yaml` et que l'Agent refuse de démarrer :

* Essayez de démarrer l'Agent manuellement pour pouvoir voir `stderr`.
* Supprimez les secrets de `datadog.yaml` et testez d'abord avec des secrets dans un fichier de configuration de vérification.

### Tester les autorisations Kubernetes
Lors de la lecture des Secrets directement depuis Kubernetes, vous pouvez vérifier vos autorisations avec la commande `kubectl auth`. La forme générale de ceci est :

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Considérez l'exemple précédent [Kubernetes Secrets](#example-reading-a-kubernetes-secret-across-namespaces), où le Secret `Secret:database-secret` existe dans le `Namespace: database`, et le Compte de Service `ServiceAccount:datadog-agent` existe dans le `Namespace: default`.

Dans ce cas, utilisez la commande suivante :

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

Cette commande indique si les autorisations sont valides pour que l'Agent puisse voir ce Secret.

### Supprimez les sauts de ligne finaux {#remove-trailing-line-breaks}

Certains outils de gestion des secrets ajoutent automatiquement un saut de ligne lors de l'exportation des secrets via des fichiers. Vous pouvez supprimer ces sauts de ligne en définissant `secret_backend_remove_trailing_line_break: true` dans [le fichier de configuration datadog.yaml][8], ou en utilisant la variable d'environnement `DD_SECRET_BACKEND_REMOVE_TRAILING_LINE_BREAK` pour faire de même, en particulier dans des environnements conteneurisés.

### Variables d'autodécouverte dans les gestionnaires de secrets

Il est également possible d'utiliser des variables [d'autodécouverte][1] dans les gestionnaires de secrets. L'Agent résout ces variables avant de résoudre le secret. Par exemple :

```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Lecture complémentaire

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[6]: /fr/opentelemetry/setup/ddot_collector/
[7]: /fr/agent/configuration/agent-commands/#restart-the-agent
[8]: /fr/agent/configuration/agent-configuration-files/
<!-- Links in tabs are scoped inside shortcodes, collapse-content links are not scoped -->
<!-- AWS Secrets Manager and SSM Links -->
[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html

<!-- Azure KeyVault Links -->
[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal

<!-- HashiCorp Vault Links -->
[3000]: https://learn.hashicorp.com/tutorials/vault/static-secrets
[3001]: https://developer.hashicorp.com/
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[3004]: https://developer.hashicorp.com/vault/docs/auth/aws#iam-authentication-inferences

<!-- File Backend Links (JSON/YAML) -->
[4001]: https://en.wikipedia.org/wiki/JSON
[4002]: https://en.wikipedia.org/wiki/YAML
[4003]: https://en.wikipedia.org/wiki/TEXT

<!-- GCP Secret Manager Links -->
[5000]: https://cloud.google.com/security/products/secret-manager
[5001]: https://cloud.google.com/docs/authentication/application-default-credentials
[5002]: https://docs.cloud.google.com/secret-manager/docs/access-control
[5003]: https://docs.cloud.google.com/secret-manager/docs/accessing-the-api

<!-- Docker Secrets Links -->
[6001]: https://docs.docker.com/engine/swarm/secrets/
[6002]: https://docs.docker.com/engine/swarm/secrets/#how-docker-manages-secrets
[6003]: https://docs.docker.com/compose/how-tos/use-secrets/

<!-- Kubernetes Secrets Links -->
[7000]: https://kubernetes.io/docs/concepts/configuration/secret/