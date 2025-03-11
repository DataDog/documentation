---
aliases:
- /fr/agent/kubernetes/apm
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Collecte de traces APM avec Kubernetes
---

Pour commencer à recueillir les traces de votre application, vous devez [exécuter l'Agent Datadog dans votre cluster Kubernetes][1].

## Configuration

Vous pouvez configurer l'admission des traces de l'Agent à l'aide du protocole TCP (`IP:Port`), d'un socket de domaine Unix ou de ces deux options. Avec ces deux configurations, l'Agent peut recevoir simultanément les traces de votre application, si nécessaire.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="Le pipeline de dépannage de l'APM : le traceur envoie des données de trace et de métrique depuis le pod de l'application vers le pod de l'Agent, qui envoie à son tour ces données au backend Datadog, afin qu'elles s'affichent dans l'interface Datadog.">}}

### Configurer l'Agent Datadog pour qu'il accepte les traces
{{< tabs >}}
{{% tab "Helm" %}}

- Si vous ne l'avez pas déjà fait, [installez][1] le chart Helm.

La configuration par défaut crée un répertoire sur le host et le monte dans l'Agent. L'Agent crée ensuite un fichier de socket `/var/run/datadog/apm.socket` et effectue une écoute sur ce fichier. Les pods d'application peuvent alors être montés de la même façon sur ce volume et rédiger des données sur ce socket. Vous pouvez modifier le chemin et le socket avec les paramètres `datadog.apm.hostSocketPath` et `datadog.apm.socketPath`.

Cette fonctionnalité peut être désactivée à l'aide de l'option `datadog.apm.socketEnabled`.

#### Configurer l'Agent Datadog pour qu'il accepte les traces via TCP (facultatif)

Il est possible de configurer l'Agent Datadog afin qu'il reçoive les traces via TCP. Pour activer cette fonctionnalité, procédez comme suit :

- Mettez à jour votre fichier `values.yaml` avec la configuration APM suivante :
    ```yaml
    datadog:
      ## Enable apm agent and provide custom configs
      apm:
        # datadog.apm.portEnabled -- Enable APM over TCP communication (port 8126 by default)
        ## ref: https://docs.datadoghq.com/agent/kubernetes/apm/
        portEnabled: true
    ```

Ensuite, mettez à jour votre chart Helm Datadog à l'aide de la commande suivante : `helm upgrade -f values.yaml <NOM_VERSION> datadog/datadog`. Si vous n'avez pas défini votre système d'exploitation dans `values.yaml`, ajoutez `--set targetSystem=linux` ou `--set targetSystem=windows` à cette commande.

**Attention** : le paramètre `datadog.apm.portEnabled` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorde uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.

[1]: /fr/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour activer la collecte de traces APM, ouvrez le fichier de configuration DaemonSet et modifiez les éléments suivants :

- Autorisez la réception de données sur le port `8126` (transmission du trafic du host à l'Agent) dans le conteneur `trace-agent` :
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **Si vous utilisez une ancienne version de l'Agent (7.17 ou antérieure)**, en plus des étapes ci-dessus, vous devez définir les variables `DD_APM_NON_LOCAL_TRAFFIC` et `DD_APM_ENABLED` sur `true` dans la section `env` du manifeste de l'Agent de trace `datadog.yaml` :

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorde uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.


{{% /tab %}}
{{% tab "DaemonSet (socket de domaine Unix)" %}}

Pour activer la collecte de traces APM, ouvrez le fichier de configuration DaemonSet et modifiez les éléments suivants :

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

Cette configuration crée un répertoire sur le host et le monte dans l'Agent. L'Agent crée ensuite un fichier de socket dans ce répertoire avec la valeur `DD_APM_RECEIVER_SOCKET` de `/var/run/datadog/apm.socket` et effectue une écoute sur ce fichier. Les pods d'application peuvent alors être montés de la même façon sur ce volume et rédiger des données sur ce socket.

{{% /tab %}}
{{% tab "Operator" %}}

Lorsque la solution APM est activée, la configuration par défaut crée un répertoire sur le host et le monte dans l'Agent. L'Agent crée ensuite un fichier de socket `/var/run/datadog/apm/apm.socket` et effectue une écoute sur ce fichier. Les pods d'application peuvent alors être montés de la même façon sur ce volume et rédiger des données sur ce socket. Vous pouvez modifier le chemin et le socket avec le paramètre `features.apm.unixDomainSocketConfig.path`.

#### Configurer l'Agent Datadog pour qu'il accepte les traces via TCP (facultatif)

Il est possible de configurer l'Agent Datadog afin qu'il reçoive les traces via TCP. Pour activer cette fonctionnalité, procédez comme suit :

Modifiez votre manifeste `DatadogAgent` en indiquant ce qui suit :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
    site: <SITE_DATADOG>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
```
Remplacez `<SITE_DATADOG>` par {{< region-param key="dd_site" code="true" >}} (valeur par défaut : `datadoghq.com`).

Consultez l'[exemple de manifeste avec activation de l'APM et de la collecte des métriques][1] pour un exemple complet.

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

**Attention** : le paramètre `hostPort` ouvre un port sur votre host. Assurez-vous que votre pare-feu accorde uniquement un accès à vos applications ou à d'autres sources de confiance. Si votre plug-in réseau ne prend pas en charge `hostPorts`, ajoutez `hostNetwork: true` aux spécifications de pod de votre Agent afin de partager l'espace de nommage réseau de votre host avec l'Agent Datadog. Cela signifie également que tous les ports ouverts sur le conteneur sont également ouverts sur le host. Si un port est utilisé sur le host et dans votre conteneur, ces derniers peuvent entrer en conflit (puisqu'ils partagent le même espace de nommage réseau), empêchant ainsi le pod de démarrer. Cela n'est pas possible avec certaines installations Kubernetes.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-apm.yaml
{{% /tab %}}
{{< /tabs >}}

**Remarque** : sur minikube, vous pouvez recevoir une erreur `Unable to detect the kubelet URL automatically`. Si c'est le cas, définissez `DD_KUBELET_TLS_VERIFY=false`.

### Configurer les pods de votre application pour envoyer les traces à l'Agent Datadog

{{< tabs >}}

{{% tab "Contrôleur d'admission Datadog" %}}
Le contrôleur d'admission Datadog est un composant de l'Agent de cluster Datadog qui simplifie la configuration des pods de votre application. Pour en savoir plus, consultez la section [Contrôleur d'admission Datadog][1].

Le contrôleur d'admission Datadog vous permet d'injecter des variables d'environnement et de monter les volumes nécessaires sur les nouveaux pods d'application. Ainsi, les communications entre les pods et les traces de l'Agent sont automatiquement configurées. Pour découvrir comment configurer automatiquement votre application de façon à envoyer les traces à l'Agent Datadog, lisez la documentation relative à l'[injection de bibliothèques à l'aide du contrôleur d'admission][2].

[1]: /fr/agent/cluster_agent/admission_controller/
[2]: /fr/tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "UDS" %}}
Si vous envoyez des traces à l'Agent à l'aide d'un socket de domaine Unix, montez le répertoire du host dans lequel le socket se trouve (le répertoire créé par l'Agent) sur le conteneur de l'application, et spécifiez le chemin du socket avec `DD_TRACE_AGENT_URL` :

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<NOM_CONTENEUR>"
        image: "<IMAGE_CONTENEUR>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### Configurer les traceurs de votre application pour générer des traces
Après avoir configuré votre Agent Datadog de façon à ce qu'il recueille des traces et transmis aux pods de votre application l'*emplacement* vers lequel envoyer les traces, installez le traceur Datadog sur votre application afin de générer des traces. Une fois cette étape terminée, le traceur envoie les traces vers l'endpoint `DD_AGENT_HOST` (pour `IP:Port`) ou `DD_TRACE_AGENT_URL` (pour un socket de domaine Unix), selon le cas. 

{{% /tab %}}


{{% tab TCP %}}
Si vous envoyez des traces à l'Agent via le protocole TCP (`<ADRESSE_IP>:8126`), transmettez cette adresse aux pods de votre application, que ce soit automatiquement avec le [contrôleur d'admission Datadog][1] ou manuellement avec l'API Downward (afin de récupérer l'IP du host). La variable d'environnement `DD_AGENT_HOST` doit pointer sur `status.hostIP` pour le conteneur d'application :

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<NOM_CONTENEUR>"
        image: "<IMAGE_CONTENEUR>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**Remarque** : pour cette configuration, vous devez configurer l'Agent pour qu'il accepte les traces via TCP.

### Configurer les traceurs de votre application pour générer des traces
Après avoir configuré votre Agent Datadog de façon à ce qu'il recueille des traces et transmis aux pods de votre application l'*emplacement* vers lequel envoyer les traces, installez le traceur Datadog sur votre application afin de générer des traces. Une fois cette étape terminée, le traceur envoie automatiquement les traces vers l'endpoint `DD_AGENT_HOST` (pour `IP:Port`) ou `DD_TRACE_AGENT_URL` (pour un socket de domaine Unix), selon le cas. 

[1]: /fr/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

Consultez la [documentation sur APM propre à votre langage][2] pour obtenir davantage d'exemples.


## Variables d'environnement de l'Agent

**Remarque **: Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags. Il permet de lier les données de télémétrie Datadog entre elles à l'aide de trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la [documentation dédiée][3].

Voici la liste de l'ensemble des variables d'environnement disponibles pour le tracing lorsque l'Agent est exécuté dans Kubernetes :

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | La clé d'API Datadog.                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Configure l'URL utilisée par le proxy.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Nettoye les données sensibles des tags de vos spans][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Définit manuellement le hostname à utiliser pour les métriques si la détection automatique échoue, ou lors de l'exécution de l'Agent de cluster Datadog.                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | Définit le port DogStatsD.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Recueillez vos traces via un socket de domaine Unix afin de ne pas tenir compte du port et du hostname configurés, le cas échéant. Cette variable est désactivée par défaut. Si vous l'activez, vous devez indiquer un fichier de socket valide.                                                                                                                                            |
| `DD_BIND_HOST`             | Définit le hostname StatsD et le hostname du récepteur.                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | Définit le niveau de journalisation (`trace`, `debug`, `info`, `warn`, `error`, `critical` ou `off`).                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | Lorsque ce paramètre est défini sur `true`, l'Agent Datadog accepte les métriques de trace. Valeur par défaut : `true` (Agent 7.18+)                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | Définit la limite maximale de connexion pour un intervalle de 30 secondes.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | Définissez l'endpoint de l'API Datadog sur l'adresse vers laquelle vos traces sont envoyées : `https://trace.agent.{{< region-param key="dd_site" >}}`. Valeur par défaut : `https://trace.agent.datadoghq.com`.                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | Port sur lequel le récepteur de traces de l'Agent Datadog effectue son écoute. Valeur par défaut : `8126`.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | Autorise le trafic non local pour le tracing depuis d'autres conteneurs. Valeur par défaut : `true` (Agent 7.18+)                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Configure les ressources que l'Agent doit ignorer. Utilisez des expressions régulières séparées par des virgules, par exemple : <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                       |
| `DD_ENV`                   | Définit le paramètre `env` global pour toutes les données générées par l'Agent. Si `env` n'est pas présent dans vos données de trace, cette variable est utilisée. Consultez la [configuration de l'environnement APM][5] pour en savoir plus.


### Variables d'environnement d'opérateur
| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | Permet d'activer l'APM et le tracing sur le port 8126. Consultez la [documentation Datadog relative à Docker][6].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | L'Agent Datadog prend en charge de nombreuses [variables d'environnement][7].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | Numéro du port à exposer sur le host. Lorsque spécifié, doit correspondre à un numéro de port valide, 0 < x < 65536. Si `HostNetwork` est spécifié, la valeur doit correspondre à `ContainerPort`. La plupart des conteneurs ne nécessitent pas ce paramètre.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | Indique la quantité maximale de ressources de calcul autorisées. Pour en savoir plus, consultez la [documentation Kubernetes][8] (en anglais).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | Indique la quantité minimale de ressources de calcul requises. Si `requests` n'est pas défini pour un conteneur, la valeur `limits` est utilisée par défaut si celle-ci est explicitement définie. Sinon, une valeur définie au niveau de l'implémentation est utilisée. Pour en savoir plus, consultez la [documentation Kubernetes][8] (en anglais).     |                                                                                                                                                                                                                                                                                                                               |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent/kubernetes/
[2]: /fr/tracing/setup/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/tracing/configure_data_security#scrub-sensitive-data-from-your-spans
[5]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/