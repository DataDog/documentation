---
dependencies:
- 'https://github.com/DataDog/datadog-operator/blob/main/docs/secret_management.md '
title: Gestion des secrets
---
Pour une sécurité renforcée, le Datadog Operator peut récupérer les informations d'identification Datadog (clé d'API et clé d'application) à l'aide de [Secrets][4].

## Configurer les Secrets

Choisissez l'une des méthodes suivantes pour configurer les Secrets :

### Configurer des informations d'identification en clair dans la ressource DatadogAgent

**Cette méthode est recommandée uniquement à des fins de test.**

Ajoutez vos clés d'API et d'application à la spécification `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  # ...
```

Les informations d'identification fournies ici sont stockées dans un Secret créé par l'opérateur. En définissant correctement le RBAC sur le CRD `DatadogAgent`, vous pouvez limiter qui peut voir ces informations d'identification.

### Utiliser des références de Secret

1. Créez vos Secrets :

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: datadog-api-secret
   data:
     api_key: <DATADOG_API_KEY>

   ---
   apiVersion: v1
   kind: Secret
   metadata:
     name: datadog-app-secret
   data:
     app_key: <DATADOG_APP_KEY>
   ```

2. Indiquez les noms de ces Secrets dans votre ressource `DatadogAgent` :

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiSecret:
           secretName: datadog-api-secret
           keyName: api-key
         appSecret:
           secretName: datadog-app-secret
           keyName: app-key
     # ...
   ```



**Remarque** : vous pouvez également utiliser le même Secret pour stocker les deux informations d'identification :

```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
data:
  api_key: <DATADOG_API_KEY>
  app_key: <DATADOG_APP_KEY>
```

Ensuite, dans votre ressource `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
  # ...
```
## Utiliser le secret backend

Le Datadog Operator est compatible avec le [secret backend][1].

### Déployer le Datadog Operator avec le secret backend

1. Créer une image de conteneur du Datadog Operator qui contient la commande du secret backend.

   Si vous souhaitez créer la vôtre, l'exemple de Dockerfile suivant prend l'image `latest` comme image de base et copie le fichier de script `my-secret-backend.sh` :

   ```Dockerfile
   FROM gcr.io/datadoghq/operator:latest
   COPY ./my-secret-backend.sh /my-secret-backend.sh
   RUN chmod 755 /my-secret-backend.sh
   ```

   Exécutez ensuite :

   ```shell
   docker build -t datadog-operator-with-secret-backend:latest .
   ```

2. Installer ou mettre à jour le déploiement du Datadog Operator avec le paramètre `.Values.secretBackend.command` défini sur le chemin de la commande du secret backend (à l'intérieur du conteneur). Si vous utilisez une image personnalisée, mettez à jour l'image.

   ```shell
   $ helm [install|upgrade] dd-operator --set "secretBackend.command=/my-secret-backend.sh" --set "image.repository=datadog-operator-with-secret-backend" ./chart/datadog-operator
   ```

### Utiliser l'assistant de secret

**Remarque** : nécessite le Datadog Operator v0.5.0+.

Kubernetes prend en charge l'exposition de Secrets sous forme de fichiers à l'intérieur d'un pod. Datadog fournit un script d'assistance dans l'image du Datadog Operator pour lire les Secrets à partir de fichiers.

1. Monter le Secret dans le conteneur de l'opérateur. Par exemple, vous pouvez le monter sur `/etc/secret-volume`.

2. Installer ou mettre à jour le déploiement du Datadog Operator avec le paramètre `.Values.secretBackend.command` défini sur `/readsecret.sh` et le paramètre `.Values.secretBackend.arguments` défini sur `/etc/secret-volume` :

   ```shell
   helm [install|upgrade] dd-operator --set "secretBackend.command=/readsecret.sh" --set "secretBackend.arguments=/etc/secret-volume" ./chart/datadog-operator
   ```

### Déployer les composants de l'Agent en utilisant la fonctionnalité de secret backend avec l'Agent Datadog

**Remarque** : nécessite le Datadog Operator v1.11+.

#### Avec un script personnalisé

Si vous utilisez un script personnalisé, créez une image de l'Agent Datadog (ou de l'Agent de cluster) et spécifiez les informations d'identification à l'aide de `ENC[<placeholder>]`, puis spécifiez la commande du secret backend dans `spec.global.secretBackend.command` :

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiKey: ENC[<api-key-secret-id>]
         appKey: ENC[<app-key-secret-id>]
       secretBackend:
         command: "/my-secret-backend.sh"
     # ...
   ```

La variable d'environnement `DD_SECRET_BACKEND_COMMAND` issue de cette configuration est automatiquement appliquée à tous les composants déployés : Agent de nœud, Agent de cluster et Cluster Checks Runners. Assurez-vous que l'image que vous utilisez pour tous les composants inclut votre commande.

#### Avec la fonction d'assistance

Pour plus de commodité, l'Agent Datadog et son Agent de cluster associé incluent une [fonction d'assistance][2] `readsecret_multiple_providers.sh` qui peut être utilisée pour lire à la fois les fichiers et les Secrets Kubernetes. Après avoir créé le Secret, définissez `spec.global.secretBackend.command` sur `"/readsecret_multiple_providers.sh"`.

Par exemple, pour utiliser le secret backend pour l'Agent et l'Agent de cluster, créez un Secret appelé "test-secret" :

`kubectl create secret generic test-secret --from-literal=api_key='<api-key>' --from-literal=app_key='<app-key>'`

Ensuite, définissez la spécification DatadogAgent :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    secretBackend:
      command: "/readsecret_multiple_providers.sh"
    credentials:
      apiKey: ENC[k8s_secret@default/test-secret/api_key]
      appKey: ENC[k8s_secret@default/test-secret/app_key]
```

## Remarques supplémentaires

### Autorisations de ServiceAccount

L'assistant `"/readsecret_multiple_providers.sh"` permet à l'Agent de lire directement les Secrets Kubernetes dans son propre espace de nommage et dans d'autres. Assurez-vous que le ServiceAccount associé dispose des autorisations nécessaires en attribuant les Roles et RoleBindings appropriés. Vous pouvez les définir manuellement ou en utilisant les options suivantes :

- `global.secretBackend.enableGlobalPermissions` : détermine si un ClusterRole est créé pour permettre aux Agents de lire **tous** les Secrets Kubernetes.

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       secretBackend:
         command: "/readsecret_multiple_providers.sh"
         enableGlobalPermissions: true
   # ...
   ```

- `global.secretBackend.roles` : remplace `enableGlobalPermissions`, détaillant la liste des espaces de nommage/secrets auxquels les Agents doivent avoir accès.

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
         - namespace: rabbitmq-system
           secrets:
           - "rabbitmqcluster-sample-default-user"
   # ...
   ```

   Dans cet exemple, un Role est créé accordant un accès en lecture au Secret `rabbitmqcluster-sample-default-user` dans l'espace de nommage `rabbitmq-system`. 

   **Remarque** : chaque espace de nommage de la liste `roles` doit également être configuré dans la variable d'environnement `WATCH_NAMESPACE` ou `DD_AGENT_WATCH_NAMESPACE` sur le déploiement du Datadog Operator.

### Options de configuration du secret backend

Pour l'Agent et l'Agent de cluster, il existe d'autres options de configuration pour la commande du secret backend :
  * `global.secretBackend.args` : ces arguments sont fournis à la commande lorsque l'Agent exécute la commande du secret backend.
  * `global.secretBackend.timeout` : délai d'expiration de l'exécution du secret backend en secondes. La valeur par défaut est de 30 secondes.

Pour les versions antérieures à l'opérateur 1.11, `spec.global.secretBackend` n'est pas disponible. Vous devez suivre [ces instructions][3] à la place.

[1]: https://docs.datadoghq.com/fr/agent/guide/secrets-management
[2]: https://docs.datadoghq.com/fr/agent/guide/secrets-management/?tab=linux#script-for-reading-from-multiple-secret-providers
[3]: https://github.com/DataDog/datadog-operator/blob/2bbda7adace27de3d397b3d76d87fbd49fa304e3/docs/secret_management.md#how-to-deploy-the-agent-components-using-the-secret-backend-feature-with-datadogagent
[4]: https://kubernetes.io/docs/concepts/configuration/secret/