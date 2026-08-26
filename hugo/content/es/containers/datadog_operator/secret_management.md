---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/secret_management.md
title: Secret Management
---
Para mejorar la seguridad, el Datadog Operator puede recuperar las credenciales de Datadog (clave de API y clave de aplicación) mediante [Secretos][4].

## Configurar secretos

Elige uno de los siguientes métodos para configurar secretos:

### Configurar credenciales simples en el recurso DatadogAgent

**Este método es recomendado sólo para tests.**

Añade tus claves de API y de aplicación a la especificación `DatadogAgent`:

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

Las credenciales proporcionadas aquí se almacenan en un secreto creado por el Operator. Configurando correctamente el RBAC en el CRD de `DatadogAgent`, puedes limitar quién puede ver esas credenciales.

### Utilizar referencias de secreto

1. Crea tus secretos:

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

2. Facilita los nombres de estos secretos en tu recurso `DatadogAgent`:

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



**Nota**: También puedes utilizar el mismo secreto para almacenar ambas credenciales:

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

A continuación, en tu recurso `DatadogAgent`:

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
## Utilizar el backend del secreto

El Operador Datatog es compatible con el [backend del secreto][1].

### Despliega el Datadog Operator con el backend del secreto

1. Crea una imagen de contenedor del Datadog Operator que contenga el comando de backend del secreto.

   Si deseas crear el tuyo propio, el siguiente ejemplo de Dockerfile toma la imagen `latest` como imagen base y copia el archivo de script `my-secret-backend.sh`:

   ```Dockerfile
   FROM gcr.io/datadoghq/operator:latest
   COPY ./my-secret-backend.sh /my-secret-backend.sh
   RUN chmod 755 /my-secret-backend.sh
   ```

   A continuación, ejecuta:

   ```shell
   docker build -t datadog-operator-with-secret-backend:latest .
   ```

2. Instala o actualiza el despliegue del Datadog Operator con el parámetro `.Values.secretBackend.command` establecido en la ruta del comando de backend del secreto (dentro del contenedor). Si utilizas una imagen personalizada, actualízala.

   ```shell
   $ helm [install|upgrade] dd-operator --set "secretBackend.command=/my-secret-backend.sh" --set "image.repository=datadog-operator-with-secret-backend" ./chart/datadog-operator
   ```

### Utilizar el auxiliar de secreto

**Nota**: Requiere Datadog Operator v0.5.0+.

Kubernetes admite la exposición de secretos como archivos dentro de un pod. Datadog proporciona un script auxiliar en la imagen del Datadog Operator para leer los secretos de los archivos.

1. Monta el secreto en el contenedor del Operator. Por ejemplo, puedes montarlo en `/etc/secret-volume`. 

2. Instala o actualiza el despliegue del Datadog Operator con el parámetro `.Values.secretBackend.command` establecido en `/readsecret.sh` y el parámetro `.Values.secretBackend.arguments` establecido en `/etc/secret-volume`:

   ```shell
   helm [install|upgrade] dd-operator --set "secretBackend.command=/readsecret.sh" --set "secretBackend.arguments=/etc/secret-volume" ./chart/datadog-operator
   ```

### Despliegue de componentes del Agent utilizando la función de backend del secreto con el DatadogAgent 

**Nota**: Requiere Datadog Operator v1.11+.

#### Con un script personalizado

Si utilizas un script personalizado, crea una imagen del Datadog Agent (o Cluster Agent ) y especifica las credenciales mediante `ENC[<placeholder>]`, y especifica el comando de backend del secreto en `spec.global.secretBackend.command`:

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

La variable de entorno `DD_SECRET_BACKEND_COMMAND` de esta configuración se aplica automáticamente a todos los componentes desplegados: Node Agent, Cluster Agent y ejecutores de checks del clúster. Asegúrate de que la imagen que estás utilizando para todos los componentes incluye tu comando.

#### Con la función auxiliar

Por comodidad, las imágenes del Datadog Agent y su Cluster Agent relacionado incluyen una [función auxiliar][2] `readsecret_multiple_providers.sh` que puede utilizarse para leer de ambos archivos, así como secretos de Kubernetes. Después de crear el secreto, establece `spec.global.secretBackend.command` en `"/readsecret_multiple_providers.sh"`.

Por ejemplo, para utilizar el backend del secreto para el Agent y Cluster Agent, crea un secreto llamado "test-secret":

`kubectl create secret generic test-secret --from-literal=api_key='<api-key>' --from-literal=app_key='<app-key>'`

Y, a continuación, establece la especificación del DatadogAgent:

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

## Notas adicionales

### Permisos de ServiceAccount

El auxiliar `"/readsecret_multiple_providers.sh"` permite al Agent leer directamente secretos de Kubernetes tanto en su propio espacio de nombres como en otros. Asegúrate de que la ServiceAccount asociada tiene los permisos necesarios asignando los roles y RoleBindings apropiados. Puedes establecerlos manualmente, o utilizando las siguientes opciones:

- `global.secretBackend.enableGlobalPermissions`: determina si se crea un ClusterRole que permita a los Agents leer **todos** los secretos de Kubernetes.

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

- `global.secretBackend.roles`: sustituye a `enableGlobalPermissions`, detallando la lista de espacio de nombres/secretos a los que los Agents deben tener acceso.

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

   En este ejemplo, se crea un rol que concede acceso de lectura al secreto `rabbitmqcluster-sample-default-user` en el espacio de nombres `rabbitmq-system`.

   **Nota**: Cada espacio de nombres en la lista de `roles` debe configurarse también en la variable de entorno `WATCH_NAMESPACE` o `DD_AGENT_WATCH_NAMESPACE` en el despliegue del Datadog Operator.

### Opciones de configuración de backend del secreto

Para el Agent y Cluster Agent, existen otras opciones de configuración para el comando de backend del secreto:
  * `global.secretBackend.args`: estos argumentos se suministran al comando cuando el Agent ejecuta el comando de backend del secreto.
  * `global.secretBackend.timeout`: tiempo de espera de ejecución de backend del secreto en segundos. El valor predeterminado es 30 segundos.

Para versiones anteriores al Operator 1.11, `spec.global.secretBackend` no está disponible. Debes seguir [estas instrucciones][3] en su lugar.

[1]: https://docs.datadoghq.com/es/agent/guide/secrets-management
[2]: https://docs.datadoghq.com/es/agent/guide/secrets-management/?tab=linux#script-for-reading-from-multiple-secret-providers
[3]: https://github.com/DataDog/datadog-operator/blob/2bbda7adace27de3d397b3d76d87fbd49fa304e3/docs/secret_management.md#how-to-deploy-the-agent-components-using-the-secret-backend-feature-with-datadogagent
[4]: https://kubernetes.io/docs/concepts/configuration/secret/