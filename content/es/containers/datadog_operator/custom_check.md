---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/custom_check.md
title: Checks personalizados
---
Para ejecutar un [check personalizado][1], puedes configurar el recurso `DatadogAgent` para proporcionar checks personalizados (`checks.d`) y sus correspondientes archivos de configuración (`conf.d`) en el momento de la inicialización. Debes configurar un recurso ConfigMap para cada archivo de script de check y su archivo de configuración.

En esta página, se explica cómo configurar un check personalizado, `hello`, que envía una métrica `hello.world` a Datadog.

Para saber más sobre checks en el ecosistema de Datadog, consulta [Introducción a integraciones][2]. Para configurar un [integración de Datadog][3], consulta [Kubernetes e integraciones][4].

## Crear los archivos de check 

Cada check necesita un archivo de configuración (`hello.yaml`) y un archivo de script (`hello.py`).

1. Crea `hello.yaml` con el siguiente contenido:

   ```yaml
   init_config:

   instances: [{}]
   ```

2. Crea `hello.py` con el siguiente contenido:

   ```python
   from datadog_checks.base import AgentCheck

   __version__ = "1.0.0"
   class HelloCheck(AgentCheck):
       def check(self, instance):
           self.gauge('hello.world', 1, tags=['env:dev'])
   ```

## Crear los ConfigMaps del check

Después de crear los archivos del check `hello`, crea los ConfigMaps asociados:

1. Crea el ConfigMap para el archivo de configuración YAML del check personalizado `hello.yaml`:

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE confd-config --from-file=hello.yaml
   configmap/confd-config created
   ```

2. Comprueba que el ConfigMap se ha creado correctamente:

   ```bash
   $ kubectl get configmap -n $DD_NAMESPACE confd-config -o yaml
   apiVersion: v1
   data:
     hello.yaml: |
       init_config:

       instances: [{}]
   kind: ConfigMap
   metadata:
     name: confd-config
     namespace: datadog
   ```

3. Crea el ConfigMap para el archivo Python del check personalizado `hello.py`:

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE checksd-config --from-file=hello.py
   configmap/checksd-config created
   ```

4. Comprueba que el ConfigMap se ha creado correctamente:

   ```bash
   $ kubectl get configmap -n $DD_NAMESPACE checksd-config -o yaml
   apiVersion: v1
   data:
     hello.py: |
      from datadog_checks.base import AgentCheck

      __version__ = "1.0.0"
      class HelloCheck(AgentCheck):
        def check(self, instance):
          self.gauge('hello.world', 1, tags=['env:dev'])
    kind: ConfigMap
    metadata:
      name: checksd-config
      namespace: datadog
   ```

## Configurar el Datadog Agent

Después de crear tus ConfigMaps, crea un recurso `DatadogAgent` para utilizarlos:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "<DATADOG_API_KEY>"
      appKey: "<DATADOG_APP_KEY>"
  override:
    nodeAgent:
      extraConfd:
        configMap:
          name: confd-config
      extraChecksd:
        configMap:
          name: checksd-config
```

**Nota**: Cualquier ConfigMap que crees debe estar en el mismo `DD_NAMESPACE` que el recurso `DatadogAgent`.

Esto despliega el Datadog Agent con tu check personalizado.

### ConfigMaps para múltiples checks

Puedes rellenar ConfigMaps con el contenido de múltiples checks o sus respectivos archivos de configuración.

#### Rellenar todos los archivos de script del check 

```bash
$ kubectl create cm -n $DD_NAMESPACE checksd-config $(find ./checks.d -name "*.py" | xargs -I'{}' echo -n '--from-file={} ')
configmap/checksd-config created
```

#### Rellenar todos los archivos de configuración del check

```bash
$ kubectl create cm -n $DD_NAMESPACE confd-config $(find ./conf.d -name "*.yaml" | xargs -I'{}' echo -n '--from-file={} ')
configmap/confd-config created
```

## Proporcionar volúmenes adicionales

Puedes montar volúmenes adicionales configurados por el usuario en el nodo o en los contenedores del Cluster Agent configurando las propiedades `volumes` y `volumeMounts`. 

**Ejemplo**: uso de un volumen para montar un secreto

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: "<DATADOG_API_KEY>"
      appKey: "<DATADOG_APP_KEY>"
  override:
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:latest"
      volumes:
        - name: secrets
          secret:
            secretName: secrets
      containers:
        agent:
          volumeMounts:
            - name: secrets
              mountPath: /etc/secrets
              readOnly: true
```
[1]: https://docs.datadoghq.com/es/developers/custom_checks/
[2]: https://docs.datadoghq.com/es/getting_started/integrations/
[3]: https://docs.datadoghq.com/es/integrations/
[4]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=annotations