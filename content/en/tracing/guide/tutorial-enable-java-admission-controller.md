---
title: Tutorial - Enabling Tracing for a Java Application with the Admission Controller
kind: guide
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tags: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/java/
  tags: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/java/
  tags: Documentation
  text: Supported Java frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/java/
  tags: Documentation
  text: Manually configuring traces and spans
- link: 
  tags: 
  text: Tracing library open source code repository
- link: 
  tags: 
  text: Troubleshooting the Datadog Cluster Agent
- link: 
  tags: 
  text: Blog - use library injection to auto-instrument and trace your Kubernetes applications with Datadog APM
---

Overview
This tutorial walks you through the steps for enabling tracing for Java Application using the Datadog Admission Controller.
For other scenarios, including the application and Agent on a host, the application in a container and Agent on a host, the application and Agent on cloud infrastructure, and on applications written in other languages, see the other Enabling Tracing tutorials.
See Tracing Java Applications for general comprehensive tracing setup documentation for Java.

Prerequisites

A Datadog account and organization API key
Git
Docker
Curl
Kubernetes v1.14+
Install the sample application

For the purpose of demonstrating how to instrument your app using Datadog Admission Controller we are going to use a simple Java app built with Spring. Here you can find the code.

To get started, clone the repository:

git clone https://github.com/DataDog/springblog.git

The repository contains a multi-service Java application pre-configured to be run within Docker and Kubernetes. The sample app is a basic Spring app using REST.
Starting and exercising the sample application 


Switch to the  the `/k8s` directory:


cd springblog/k8s/


Deploy the workload with this depl.yaml file:


kubectl apply -f ./depl.yaml


Verify that it is up and running with the following command:


kubectl get pods


You should see something like this:




NAME                                                READY   STATUS        RESTARTS        AGE


springback-666db7b6b8-dzv7c                         1/1     Terminating   0               2m41s
springfront-797b78d6db-p5c84                        1/1     Terminating   0               2m41s




The service is started and listens on port 8080. It exposes an /upstream endpoint. 


Check that communication takes place by running the following curl command:


curl localhost:8080/upstream
Quote{type='success', values=Values{id=6, quote='Alea jacta est'}}




Stop the application so you can enable tracing on it:




cd springblog/k8s/
kubectl delete -f ./depl-with-lib-inj.yaml
Instrument your app with Datadog Admission Controller

Now that you have your application working, instrument it using the Datadog Admission Controller.In containerized environments, the process, generally, is:

Install the Datadog Cluster Agent
Add Unified Service Tags in pod definition
Annotate your pod for library injection
Label your pod to instruct the Datadog Admission controller to mutate the pod

No need to add the tracing library (which will be automatically injected), no need to add Datadog variables, and more importantly no need to deploy a new image or version of your app. This section of the tutorial steps you through this process.
Install the Datadog Cluster Agent using [this yaml config file](link) and the following command, specifying your own [Datadog API key](/account_management/api-app-keys/):
helm install datadog-agent -f values-with-lib-inj.yaml --set datadog.site='datadoghq.com' --set datadog.apiKey=$DD_API_KEY datadog/datadog
For more detailed information, read [Installing the Datadog Agent on Kubernetes with Helm](https://docs.datadoghq.com/containers/kubernetes/installation/?tab=helm).
You can check the Datadog Cluster Agent is up and running with the following command:


kubectl get pods


You should see something like this:


NAME                                                READY   STATUS        RESTARTS        AGE
datadog-agent-4s8rb                                 3/3     Running       0	   		30s
datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running       0   		30s
datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running       0			30s




Add Unified Service Tags to our pod by adding the following block to the [`depl.yaml` file](https://github.com/DataDog/springblog/blob/main/k8s/depl.yaml):


labels:
  tags.datadoghq.com/env: "dev"
  tags.datadoghq.com/service: "springfront"
  tags.datadoghq.com/version: "12"




 Configure the Datadog Admission Controller to inject a Java tracing library to our app container by  adding the following annotation to the pod:


annotations:
  admission.datadoghq.com/java-lib.version: "latest"


This annotation specifies the latest version of the Java tracing library. You can also reference a specific version of the library, such as `"v1.5.0"`.


The final pod definition should look like the excerpt below. See also the full yaml file in the sample repo. The instructions you added to instrument the app are highlighted:


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


Run the sample app with the following command:


kubectl apply -f depl-with-lib-inj.yaml

6. Run the following command to show that the app and Agent are up and running:


kubectl get pods




NAME                                                READY   STATUS    RESTARTS   AGE
datadog-agent-4s8rb                                 3/3     Running   0          28m
datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0          28m
datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0          28m
springback-666db7b6b8-sb4tp                         1/1     Running   0          27m
springfront-797b78d6db-mppbg                        1/1     Running   0          27m




7. Run the following command to see details of the pod:


kubectl describe pod springfront




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




As you can see, an init-container is added to your pod. This container includes the Datadog Java tracing libraries to a volume mount. Also JAVA_TOOL_OPTIONS is modified to include javaagent . And Datadog-specific environment variables are added to the container:


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




8. Verify that the Datadog tracing library is injected into the pod by checking the pod logs:


kubectl logs -f springfront-797b78d6db-jqjdl


You should see something like this:


Defaulted container "springfront" out of: springfront, datadog-lib-java-init (init)
Picked up JAVA_TOOL_OPTIONS:  -javaagent:/datadog-lib/dd-java-agent.jar
View APM traces in Datadog

Exercise the app running the following command:

curl localhost:8080/upstream

Open the Datadog UI and see the two services reporting under the Service Catalog:




Explore Traces and see the associated Service Map as well:





Clean up the environment

Clean up your environment with the following command:


kubectl delete -f depl-with-lib-inj.yaml
Library injection with the Admission Controller makes it easier to instrument your services, enabling you to view APM traces in just minutes without changing or rebuilding your application. To learn more, read [Datadog Library injection](https://docs.datadoghq.com/tracing/trace_collection/admission_controller/)
Troubleshooting
If you’re not receiving traces as expected, set up debug mode for the Java tracer. Read Enable debug mode to find out more.
