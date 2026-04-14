---
dependencies:
- 'https://github.com/DataDog/datadog-operator/blob/main/docs/custom_check.md '
title: Checks personnalisés
---
Pour exécuter un [check personnalisé][1], vous pouvez configurer la ressource `DatadogAgent` pour fournir des checks personnalisés `checks.d`) et leurs fichiers de configuration correspondants `conf.d`) au moment de l'initialisation. Vous devez configurer une ressource ConfigMap pour chaque fichier de script de check et son fichier de configuration.

Cette page explique comment configurer un check personnalisé, `hello`, qui envoie une métrique `hello.world` à Datadog.

Pour en savoir plus sur les checks dans l'écosystème Datadog, consultez la section [Présentation des intégrations][2]. Pour configurer une [intégration Datadog][3], consultez la section [Kubernetes et intégrations][4]

## Créer les fichiers de check

Chaque check nécessite un fichier de configuration `hello.yaml`) et un fichier de script `hello.py`).

1. Créez `hello.yaml` avec le contenu suivant :

   ```yaml
   init_config:

   instances: [{}]
   ```

2. Créez `hello.py` avec le contenu suivant :

   ```python
   from datadog_checks.base import AgentCheck

   __version__ = "1.0.0"
   class HelloCheck(AgentCheck):
       def check(self, instance):
           self.gauge('hello.world', 1, tags=['env:dev'])
   ```

## Créer les ConfigMaps de check

Après avoir créé les fichiers de check `hello`, créez les ConfigMaps associées :

1. Créez la ConfigMap pour le fichier de configuration YAML du check personnalisé `hello.yaml` :

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE confd-config --from-file=hello.yaml
   configmap/confd-config created
   ```

2. Vérifiez que la ConfigMap a été correctement créée :

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

3. Créez la ConfigMap pour le fichier Python du check personnalisé `hello.py` :

   ```bash
   $ kubectl create configmap -n $DD_NAMESPACE checksd-config --from-file=hello.py
   configmap/checksd-config created
   ```

4. Vérifiez que la ConfigMap a été correctement créée :

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

## Configurer l'Agent Datadog

Après avoir créé vos ConfigMaps, créez une ressource `DatadogAgent` pour les utiliser :

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

**Remarque** : toutes les ConfigMaps que vous créez doivent se trouver dans le même `DD_NAMESPACE` que la ressource `DatadogAgent`.

Cela déploie l'Agent Datadog avec votre check personnalisé.

### ConfigMaps pour plusieurs checks

Vous pouvez remplir les ConfigMaps avec le contenu de plusieurs checks ou de leurs fichiers de configuration respectifs.

#### Remplir tous les fichiers de script de check

```bash
$ kubectl create cm -n $DD_NAMESPACE checksd-config $(find ./checks.d -name "*.py" | xargs -I'{}' echo -n '--from-file={} ')
configmap/checksd-config created
```

#### Remplir tous les fichiers de configuration de check

```bash
$ kubectl create cm -n $DD_NAMESPACE confd-config $(find ./conf.d -name "*.yaml" | xargs -I'{}' echo -n '--from-file={} ')
configmap/confd-config created
```

## Fournir des volumes supplémentaires

Vous pouvez monter des volumes supplémentaires configurés par l'utilisateur dans les conteneurs de l'Agent de nœud ou de l'Agent de cluster en définissant les propriétés `volumes` et `volumeMounts`.

**Exemple** : utiliser un volume pour monter un secret

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
[1]: https://docs.datadoghq.com/fr/developers/custom_checks/
[2]: https://docs.datadoghq.com/fr/getting_started/integrations/
[3]: https://docs.datadoghq.com/fr/integrations/
[4]: https://docs.datadoghq.com/fr/containers/kubernetes/integrations/?tab=annotations