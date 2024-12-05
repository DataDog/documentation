---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: Documentation
  text: Autres options de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/dd_libraries/java/
  tag: Documentation
  text: Instructions détaillées de configuration de la bibliothèque de tracing
- link: /tracing/trace_collection/compatibility/java/
  tag: Documentation
  text: Frameworks Java pris en charge pour l'instrumentation automatique
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: Documentation
  text: Configurer manuellement les traces et spans
- link: https://github.com/DataDog/dd-trace-java
  tag: Code source
  text: Référentiel du code open source de la bibliothèque de tracing
- link: /containers/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Utiliser l'injection de bibliothèque pour instrumenter et tracer automatiquement
    vos applications Kubernetes avec la solution APM Datadog

title: 'Tutoriel : Activer le tracing pour une application Java avec le contrôleur
  d''admission'
---

## Présentation

Ce tutoriel décrit les étapes à suivre pour activer le tracing d'une application Java à l'aide du contrôleur d'admission Datadog.

Pour les autres scénarios, y compris lorsque l'application est sur un host, dans un conteneur, sur une infrastructure cloud, ou encore pour les applications écrites dans d'autres langages, consultez les autres [tutoriels relatifs à l'activation du tracing][1].

Reportez-vous à la section [Tracer des applications Java][2] pour consulter la documentation complète relative à la configuration du tracing pour Java.

### Prérequis

- Un compte Datadog et une [clé d'API de l'organisation][3]
- Git
- Docker
- Curl
- Kubernetes v1.14+

## Installer l'exemple d'application

Pour illustrer la procédure à suivre pour instrumenter votre application avec le contrôleur d'admission Datadog, ce tutoriel se base sur une application Java conçue avec Spring. Le code de cette application se trouve sur le [référentiel GitHub springblog][4].

Pour commencer, dupliquez le référentiel :

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/springblog.git
{{< /code-block >}}

Ce référentiel contient une application Java dotée de plusieurs services, préconfigurée pour être exécutée dans Docker et Kubernetes. Il s'agit d'une application Spring basique reposant sur REST.

## Lancer et exécuter l'exemple d'application

1. Basculez sur le sous-dossier `/k8s` dans le référentiel springblog :
   {{< code-block lang="shell" >}}
cd springblog/k8s/{{< /code-block >}}

2. Déployez le workload avec le fichier `depl.yaml` :
   {{< code-block lang="shell" >}}
kubectl apply -f ./depl.yaml{{< /code-block >}}

3. Vérifiez que le workload est en cours d'exécution avec la commande suivante :
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Vous devriez obtenir une sortie similaire à celle-ci :

    ```
    NAME                                       READY   STATUS        RESTARTS        AGE
    springback-666db7b6b8-dzv7c                1/1     Terminating   0               2m41s
    springfront-797b78d6db-p5c84               1/1     Terminating   0               2m41s
    ```

    Le service est désormais lancé et effectue une écoute sur le port 8080. Il expose un endpoint `/upstream`.

4. Exécutez la commande curl suivante pour vérifier si des communications sont détectées :
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream
Quote{type='success', values=Values{id=6, quote='Alea jacta est'}}{{< /code-block >}}

5. Pour arrêter l'application, afin de pouvoir activer son tracing, exécutez la commande suivante à partir du répertoire `springblog/k8s` :
   {{< code-block lang="shell" >}}
kubectl delete -f ./depl-with-lib-inj.yaml{{< /code-block >}}

## Instrumenter votre application avec le contrôleur d'admission Datadog

Maintenant que votre application fonctionne correctement, instrumentez-la à l'aide du contrôleur d'admission Datadog. Pour des environnements conteneurisés, il convient de suivre les étapes ci-dessous :

1. Installez l'[Agent de cluster Datadog][5].
2. Ajoutez des [tags de service unifié][6] dans la définition du pod.
3. [Annotez][7] votre pod pour l'injection de bibliothèque.
4. Ajoutez des [étiquettes][8] à votre pod pour indiquer au contrôleur d'admission Datadog qu'il doit muter le pod.

Il n'est pas nécessaire d'ajouter la bibliothèque de tracing : en effet, celle-ci est automatiquement injectée. Vous n'avez pas besoin, pour l'instant, de redéployer votre application. Il vous faut tout d'abord ajouter des variables Datadog et redéployer une nouvelle image ou version de votre application.

1. Depuis le sous-dossier `k8s`, utilisez la commande suivante pour installer l'Agent de cluster Datadog, en prenant soin de spécifier le fichier de configuration `values-with-lib-inj.yaml` et votre [clé d'API Datadog](/account_management/api-app-keys/) :
   {{< code-block lang="shell" >}}
helm install datadog-agent -f values-with-lib-inj.yaml --set datadog.site='datadoghq.com' --set datadog.apiKey=$DD_API_KEY datadog/datadog{{< /code-block >}}
    <div class="alert alert-warning">Pour obtenir plus de détails sur cette étape, consultez l'onglet Helm de la section <a href="/containers/kubernetes/installation/?tab=helm" target="_blank">Installer l'Agent Datadog sur Kubernetes</a>.</div>

2. Pour vérifier si l'Agent de cluster Datadog est en cours d'exécution, utilisez la commande suivante :
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Vous devriez obtenir une sortie similaire à celle-ci :

    ```
    NAME                                                READY   STATUS    RESTARTS  AGE
    datadog-agent-4s8rb                                 3/3     Running   0         30s
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0         30s
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0         30s
    ```

3. Ajoutez le bloc suivant au [fichier `depl.yaml`][9] pour ajouter des [tags de service unifié][6] :
   {{< code-block lang="yaml" >}}
labels:
  tags.datadoghq.com/env: "dev"
  tags.datadoghq.com/service: "springfront"
  tags.datadoghq.com/version: "12"{{< /code-block >}}

4. Configurez le contrôleur d'admission Datadog de façon à injecter une bibliothèque de tracing Java dans le conteneur de l'application. Pour ce faire, ajoutez l'annotation suivante au pod :
   {{< code-block lang="yaml" >}}
annotations:
  admission.datadoghq.com/java-lib.version: "latest"{{< /code-block >}}

    Cette annotation spécifie la dernière version de la bibliothèque de tracing Java. Vous pouvez également indiquer une version de la bibliothèque spécifique, par exemple `"v1.5.0"`.

    La version finale de la définition du pod devrait ressembler à l'extrait suivant. Vous pouvez également vous rendre sur le référentiel de l'exemple pour consulter le [fichier YAML][10] complet. Les instructions ajoutées pour instrumenter l'application sont mises en évidence :

    {{< highlight yaml "hl_lines=6-8 24-28" >}}
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: springfront
    labels:
        tags.datadoghq.com/env: "dev"
        tags.datadoghq.com/service: "springfront"
        tags.datadoghq.com/version: "12"
    spec:
    replicas: 1
    selector:
        matchLabels:
        name: springfront
    minReadySeconds: 15
    strategy:
        type: RollingUpdate
        rollingUpdate:
        maxUnavailable: 1
        maxSurge: 1
    template:
        metadata:
        labels:
            name: springfront
            tags.datadoghq.com/env: "dev"
            tags.datadoghq.com/service: "springfront"
            tags.datadoghq.com/version: "12"
        annotations:
            admission.datadoghq.com/java-lib.version: "latest"
    {{< /highlight >}}

5. Exécutez l'exemple d'application à l'aide de la commande suivante :
   {{< code-block lang="shell" >}}
kubectl apply -f depl-with-lib-inj.yaml{{< /code-block >}}

6. Exécutez la commande suivante pour vérifier que l'application et l'Agent sont en cours d'exécution :
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    Vous devriez obtenir une sortie similaire à celle-ci :

    ```
    NAME                                                READY   STATUS    RESTARTS   AGE
    datadog-agent-4s8rb                                 3/3     Running   0          28m
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0          28m
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0          28m
    springback-666db7b6b8-sb4tp                         1/1     Running   0          27m
    springfront-797b78d6db-mppbg                        1/1     Running   0          27m
    ```

7. Exécutez la commande suivante pour afficher les détails du pod :
   {{< code-block lang="shell" >}}
kubectl describe pod springfront{{< /code-block >}}

   Vous devriez obtenir une sortie similaire à celle-ci :

    ```
    Events:
    Type    Reason     Age   From               Message
    ----    ------     ----  ----               -------
    Normal  Scheduled  32s   default-scheduler  Successfully assigned default/springfront-797b78d6db-jqjdl to docker-desktop
    Normal  Pulling    31s   kubelet            Pulling image "gcr.io/datadoghq/dd-lib-java-init:latest"
    Normal  Pulled     25s   kubelet            Successfully pulled image "gcr.io/datadoghq/dd-lib-java-init:latest" in 5.656167878s
    Normal  Created    25s   kubelet            Created container datadog-lib-java-init
    Normal  Started    25s   kubelet            Started container datadog-lib-java-init
    Normal  Pulling    25s   kubelet            Pulling image "pejese/springfront:v2"
    Normal  Pulled     2s    kubelet            Successfully pulled image "pejese/springfront:v2" in 22.158699094s
    Normal  Created    2s    kubelet            Created container springfront
    Normal  Started    2s    kubelet            Started container springfront
    ```

    Comme vous pouvez le voir, un init-container est ajouté à votre pod. Ce conteneur inclut les bibliothèques de tracing Java Datadog sur un montage de volume. De plus, `JAVA_TOOL_OPTIONS` a été modifié de façon à inclure `javaagent`. Les variables propres à Datadog sont également ajoutées au conteneur :

    ```
    Environment:
    DD_ENV:              dev
    DD_VERSION:          12
    DD_SERVICE:          springfront
    DD_ENTITY_ID:         (v1:metadata.uid)
    DD_TRACE_AGENT_URL:  unix:///var/run/datadog/apm.socket
    URL:                 http://springback:8088
    JAVA_TOOL_OPTIONS:    -javaagent:/datadog-lib/dd-java-agent.jar
    Mounts:
    /datadog-lib from datadog-auto-instrumentation (rw)
    /var/run/datadog from datadog (rw)
    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-qvmtk (ro)
    ```

8. Pour vérifier que la bibliothèque de tracing Datadog est injectée dans le pod, consultez les logs du pod. Exemple :
   {{< code-block lang="shell" >}}
kubectl logs -f springfront-797b78d6db-jqjdl{{< /code-block >}}

    Vous devriez obtenir une sortie similaire à celle-ci :

    ```
    Defaulted container "springfront" out of: springfront, datadog-lib-java-init (init)
    Picked up JAVA_TOOL_OPTIONS:  -javaagent:/datadog-lib/dd-java-agent.jar
    ```

## Afficher les traces APM dans Datadog

1. Exécutez la commande suivante :
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream{{< /code-block >}}

2. Ouvrez l'interface Datadog et consultez les deux services renvoyant des données dans le [catalogue des services][11] :
   {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-catalog.png" alt="Les services springback et springfront dans le catalogue des services." style="width:100%;" >}}

3. Explorez les traces et consultez la Service Map associée :
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-traces.png" alt="Le flamegraph représentant le service" style="width:100%;" >}}
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-map.png" alt="La Service Map représentant le service" style="width:100%;" >}}

## Nettoyer l'environnement

Utilisez la commande suivante pour nettoyer votre environnement :

{{< code-block lang="shell" >}}
kubectl delete -f depl-with-lib-inj.yaml
{{< /code-block >}}

L'injection de bibliothèque à l'aide du contrôleur d'admission facilite l'instrumentation de service. En effet, cela vous permet de consulter des traces APM sans avoir à modifier ni rebuild votre application. Pour en savoir plus, consultez la section [Injecter des bibliothèques localement][12].

## Dépannage
Si vous ne recevez pas les traces comme prévu, configurez le mode debugging pour le traceur Java. Consultez la rubrique [Activer le mode debugging][13] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/guide/#enabling-tracing-tutorials
[2]: /fr/tracing/trace_collection/dd_libraries/java
[3]: /fr/account_management/api-app-keys
[4]: https://github.com/DataDog/springblog
[5]: /fr/containers/cluster_agent
[6]: /fr/getting_started/tagging/unified_service_tagging
[7]: /fr/tracing/trace_collection/library_injection_local
[8]: /fr/tracing/trace_collection/library_injection_local
[9]: https://github.com/DataDog/springblog/blob/main/k8s/depl.yaml
[10]: https://github.com/DataDog/springblog/blob/main/k8s/depl-with-lib-inj.yaml
[11]: https://app.datadoghq.com/services
[12]: /fr/tracing/trace_collection/admission_controller
[13]: /fr/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode