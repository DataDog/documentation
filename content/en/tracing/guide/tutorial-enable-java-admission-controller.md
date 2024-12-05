---
title: Tutorial - Enabling Tracing for a Java Application with the Admission Controller

further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: "Documentation"
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/java/
  tag: "Documentation"
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/java/
  tag: "Documentation"
  text: Supported Java frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: "Documentation"
  text: Manually configuring traces and spans
- link: https://github.com/DataDog/dd-trace-java
  tag: "Source Code"
  text: Tracing library open source code repository
- link: /containers/cluster_agent/troubleshooting/
  tag: "Documentation"
  text: Troubleshooting the Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: "Blog"
  text: Use library injection to auto-instrument and trace your Kubernetes applications with Datadog APM
---

## Overview

This tutorial walks you through the steps to enable tracing for Java Application using the Datadog Admission Controller.

For other scenarios, including on a host, in a container, on cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker
- Curl
- Kubernetes v1.14+

## Install the sample application

To demonstrate how to instrument your app with the Datadog Admission Controller, this tutorial uses a Java app built with Spring. You can find the code for the app in the [springblog GitHub repository][4].

To get started, clone the repository:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/springblog.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to be run within Docker and Kubernetes. The sample app is a basic Spring app using REST.

## Start and run the sample application 

1. Switch to to the `/k8s` subdirectory in the springblog repo:
   {{< code-block lang="shell" >}}
cd springblog/k8s/{{< /code-block >}}

2. Deploy the workload with the `depl.yaml` file:
   {{< code-block lang="shell" >}}
kubectl apply -f ./depl.yaml{{< /code-block >}}

3. Verify that it is running with the following command:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    You should see something like this:

    ```
    NAME                                       READY   STATUS        RESTARTS        AGE
    springback-666db7b6b8-dzv7c                1/1     Terminating   0               2m41s
    springfront-797b78d6db-p5c84               1/1     Terminating   0               2m41s
    ```

    The service is started and listens on port 8080. It exposes an `/upstream` endpoint. 

4. Check that communication takes place by running the following curl command:
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream
Quote{type='success', values=Values{id=6, quote='Alea jacta est'}}{{< /code-block >}}

5. To stop the application, run this command from the `springblog/k8s` directory so you can enable tracing on it:
   {{< code-block lang="shell" >}}
kubectl delete -f ./depl-with-lib-inj.yaml{{< /code-block >}}

## Instrument your app with Datadog Admission Controller

After you have your application working, instrument it using the Datadog Admission Controller. In containerized environments, the process is generally:

1. Install the [Datadog Cluster Agent][5].
2. Add [Unified Service Tags][6] in pod definition.
3. [Annotate][7] your pod for library injection.
4. [Label][8] your pod to instruct the Datadog Admission controller to mutate the pod.

There's no need to add the tracing library because it's automatically injected. You don't need to redeploy your app yet. This section of the tutorial steps you through the process of adding Datadog variables and deploying a new image or version of your app.

1. From the `k8s` subdirectory, use the following command to install the Datadog Cluster Agent, specifying the `values-with-lib-inj.yaml` config file and your [Datadog API key](/account_management/api-app-keys/):
   {{< code-block lang="shell" >}}
helm install datadog-agent -f values-with-lib-inj.yaml --set datadog.site='datadoghq.com' --set datadog.apiKey=$DD_API_KEY datadog/datadog{{< /code-block >}}
    <div class="alert alert-warning">For more detailed information, read <a href="/containers/kubernetes/installation/?tab=helm" target="_blank">Installing the Datadog Agent on Kubernetes with Helm</a></div>

2. You can check the Datadog Cluster Agent is running with the following command:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    You should see something like this:

    ```
    NAME                                                READY   STATUS    RESTARTS  AGE
    datadog-agent-4s8rb                                 3/3     Running   0	        30s
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0         30s
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0         30s
    ```

3. Add [Unified Service Tags][6] to the pod by adding the following block to the [`depl.yaml` file][9]:
   {{< code-block lang="yaml" >}}
labels:
  tags.datadoghq.com/env: "dev"
  tags.datadoghq.com/service: "springfront"
  tags.datadoghq.com/version: "12"{{< /code-block >}}

4. Configure the Datadog Admission Controller to inject a Java tracing library to the app container by adding the following annotation to the pod:
   {{< code-block lang="yaml" >}}
annotations:
  admission.datadoghq.com/java-lib.version: "latest"{{< /code-block >}}

    This annotation specifies the latest version of the Java tracing library. You can also reference a specific version of the library, such as `"v1.5.0"`.

    The final pod definition should look like the excerpt below. See also the full [YAML file][10] in the sample repo. The instructions you added to instrument the app are highlighted:

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

5. Run the sample app with the following command:
   {{< code-block lang="shell" >}}
kubectl apply -f depl-with-lib-inj.yaml{{< /code-block >}}

6. Run the following command to show that the app and Agent are running:
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    You should see something like this:

    ```
    NAME                                                READY   STATUS    RESTARTS   AGE
    datadog-agent-4s8rb                                 3/3     Running   0          28m
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0          28m
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0          28m
    springback-666db7b6b8-sb4tp                         1/1     Running   0          27m
    springfront-797b78d6db-mppbg                        1/1     Running   0          27m
    ```

7. Run the following command to see details of the pod:
   {{< code-block lang="shell" >}}
kubectl describe pod springfront{{< /code-block >}}

   You should see something like this:

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

    As you can see, an init-container is added to your pod. This container includes the Datadog Java tracing libraries to a volume mount. Also `JAVA_TOOL_OPTIONS` is modified to include `javaagent`. And Datadog-specific environment variables are added to the container:

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

8. Verify that the Datadog tracing library is injected into the pod by checking the pod logs. For example::
   {{< code-block lang="shell" >}}
kubectl logs -f springfront-797b78d6db-jqjdl{{< /code-block >}}

    You should see something like this:

    ```
    Defaulted container "springfront" out of: springfront, datadog-lib-java-init (init)
    Picked up JAVA_TOOL_OPTIONS:  -javaagent:/datadog-lib/dd-java-agent.jar
    ```

## View APM traces in Datadog

1. Run the following command:
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream{{< /code-block >}}

2. Open the Datadog UI and see the two services reporting under the [Service Catalog][11]:
   {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-catalog.png" alt="Springback and springfront services in the Service Catalog." style="width:100%;" >}}

3. Explore Traces and see the associated Service Map:
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-traces.png" alt="The flame graph that represents the service." style="width:100%;" >}}
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-map.png" alt="The service map that represents the service." style="width:100%;" >}}

## Clean up the environment

Clean up your environment with the following command:

{{< code-block lang="shell" >}}
kubectl delete -f depl-with-lib-inj.yaml
{{< /code-block >}}

Library injection with the Admission Controller simplifies service instrumentation, enabling you to view APM traces without changing or rebuilding your application. To learn more, read [Datadog Library injection][12].

## Troubleshooting
If you're not receiving traces as expected, set up debug mode for the Java tracer. To learn more, read [Enable debug mode][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/java
[3]: /account_management/api-app-keys
[4]: https://github.com/DataDog/springblog
[5]: /containers/cluster_agent
[6]: /getting_started/tagging/unified_service_tagging
[7]: /tracing/trace_collection/library_injection_local
[8]: /tracing/trace_collection/library_injection_local
[9]: https://github.com/DataDog/springblog/blob/main/k8s/depl.yaml
[10]: https://github.com/DataDog/springblog/blob/main/k8s/depl-with-lib-inj.yaml
[11]: https://app.datadoghq.com/services
[12]: /tracing/trace_collection/admission_controller
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode