---
title: Tutorial - Enabling Tracing for a Java Application on Google Kubernetes Engine
kind: guide
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/java/
  tag: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/java/
  tag: Documentation
  text: Supported Java frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: Documentation
  text: Manually configuring traces and spans
- link: "https://github.com/DataDog/dd-trace-java"
  tag: Source Code
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a cluster on Google Kubernetes Engine (GKE). In this scenario, the Datadog Agent is also installed in the cluster.

For other scenarios, including on a host, in a container, on other cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Kubectl
- GCloud - Set the `USE_GKE_GCLOUD_AUTH_PLUGIN` environment variable and configure additional properties for your GCloud project by running these commands:
  {{< code-block lang="sh" >}}
export USE_GKE_GCLOUD_AUTH_PLUGIN=True
gcloud config set project <PROJECT_NAME>
gcloud config set compute/zone <COMPUTE_ZONE>
gcloud config set compute/region <COMPUTE_REGION>{{< /code-block >}}
- Helm - Install by running these commands:
  {{< code-block lang="sh" >}}
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh{{< /code-block >}}
  Configure Helm by running these commands:
  {{< code-block lang="sh" >}}
helm repo add datadog-crds https://helm.datadoghq.com
helm repo add kube-state-metrics https://prometheus-community.github.io/helm-charts
helm repo add datadog https://helm.datadoghq.com
helm repo update{{< /code-block >}}

## Install the sample Kubernetes Java application

The code sample for this tutorial is on GitHub, at [github.com/DataDog/apm-tutorial-java-host][9]. To get started, clone the repository:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to run inside a Kubernetes cluster. The sample app is a basic notes app with a REST API to add and change data. The `docker-compose` YAML files to make the containers for the Kubernetes pods are located in the `docker` directory. This tutorial uses the `service-docker-compose-k8s.yaml` file, which builds containers for the application.

In each of the `notes` and `calendar` directories, there are two sets of Dockerfiles for building the applications, either with Maven or with Gradle. This tutorial uses the Maven build, but if you are more familiar with Gradle, you can use it instead with the corresponding changes to build commands.

Kubernetes configuration files for the `notes` app, the `calendar` app, and the Datadog Agent are in the `kubernetes` directory.

The process of getting the sample application involves building the images from the `docker` folder, uploading them to a registry, and creating kubernetes resources from the `kubernetes` folder.

### Starting the cluster

1. If you don't already have a GKE cluster that you want to re-use, create one by running the following command, replacing the `<VARIABLES>` with the values you want to use:

   {{< code-block lang="sh" >}}
gcloud container clusters create <CLUSTER_NAME> --num-nodes=1 --network=<NETWORK> --subnetwork=<SUBNETWORK>{{< /code-block >}}

   **Note**: For a list of available networks and subnetworks, use the following command:
   {{< code-block lang="sh" >}}
gcloud compute networks subnets list{{< /code-block >}}

2. Connect to the cluster by running:

   {{< code-block lang="sh" >}}
gcloud container clusters get-credentials <CLUSTER_NAME>
gcloud config set container/cluster <CLUSTER_NAME>{{< /code-block >}}

3. To facilitate communication with the applications that will be deployed, [edit the network's firewall rules][17] to ensure that the GKE cluster allows TCP traffic on ports `30080` and `30090`.

### Build and upload the application image

If you're not familiar with Google Container Registry (GCR), it might be helpful to read [Quickstart for Container Registry][16].

In the sample project's `/docker` directory, run the following commands:

1. Authenticate with GCR by running:
   {{< code-block lang="sh" >}}
gcloud auth configure-docker{{< /code-block >}}

2. Build a Docker image for the sample app, adjusting the platform setting to match yours:
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes{{< /code-block >}}

3. Tag the container with the GCR destination:
   {{< code-block lang="sh" >}}
docker tag docker-notes:latest gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

4. Upload the container to the GCR registry:
   {{< code-block lang="sh" >}}
docker push gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

Your application is containerized and available for GKE clusters to pull.

### Configure the application locally and deploy

1. Open `kubernetes/notes-app.yaml` and update the `image` entry with the URL for the GCR image, where you pushed the container in step 4 above:
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: notes-app
          image: gcr.io/<PROJECT_ID>/notes-tutorial:notes
          imagePullPolicy: Always
{{< /code-block >}}

2. From the `/kubernetes` directory, run the following command to deploy the `notes` app:
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml{{< /code-block >}}

3. To exercise the app, you need to know its external IP address to call its REST API. First, find the `notes-app-deploy` pod in the list output by the following command, and note its node:

   {{< code-block lang="sh" >}}
kubectl get pods -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-gke-pods.png" alt="Output of the kubectl command showing the notes-app-deploy pod and its associated node name" style="width:100%;" >}}

   Then find that node name in the output from the following command, and note the external IP value:

      {{< code-block lang="sh" >}}
kubectl get nodes -o wide{{< /code-block >}}

   {{< img src="tracing/guide/tutorials/tutorial-java-gke-external-ip.png" alt="Output of the kubectl command showing the external IP value for the node" style="width:100%;" >}}

   In the examples shown, the `notes-app` is running on node `gke-java-tracing-gke-default-pool-ccbd5526-dd3d`, which has an external IP of `35.196.6.199`.

3. Open up another terminal and send API requests to exercise the app. The notes application is a REST API that stores data in an in-memory H2 database running on the same container. Send it a few commands:

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`

4. After you've seen the application running, stop it so that you can enable tracing on it:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

## Enable tracing

Now that you have a working Java application, configure it to enable tracing.

1. Add the Java tracing package to your project. Because the Agent runs in a GKE cluster, ensure that the Dockerfiles are configured properly, and there is no need to install anything. Open the `notes/dockerfile.notes.maven` file and uncomment the line that downloads `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Within the same `notes/dockerfile.notes.maven` file, comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   This automatically instruments the application with Datadog services.

   <div class="alert alert-warning"><strong>Note</strong>: The flags on these sample commands, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

3. [Universal Service Tags][10] identify traced services across different versions and deployment environments so that they can be correlated within Datadog, and so you can use them to search and filter. The three environment variables used for Unified Service Tagging are `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. For applications deployed with Kubernetes, these environment variables can be added within the deployment YAML file, specifically for the deployment object, pod spec, and pod container template.

   For this tutorial, the `kubernetes/notes-app.yaml` file already has these environment variables defined for the notes application for the deployment object, the pod spec, and the pod container template, for example:

   ```yaml
   ...
   spec:
     replicas: 1
     selector:
       matchLabels:
         name: notes-app-pod
         app: java-tutorial-app
     template:
       metadata:
         name: notes-app-pod
         labels:
           name: notes-app-pod
           app: java-tutorial-app
           tags.datadoghq.com/env: "dev"
           tags.datadoghq.com/service: "notes"
           tags.datadoghq.com/version: "0.0.1"
      ...
   ```

### Rebuild and upload the application image

Rebuild the image with tracing enabled using the [same steps as before](#build-and-upload-the-application-image) in the `docker` directory:
{{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest gcr.io/<PROJECT_ID>/notes-tutorial:notes
docker push gcr.io/<PROJECT_ID>/notes-tutorial:notes{{< /code-block >}}

Your application with tracing enabled is containerized and available for GKE clusters to pull.

## Install and run the Agent using Helm

Next, deploy the Agent to GKE to collect the trace data from your instrumented application:

1. Open `kubernetes/datadog-values.yaml` to see the minimum required configuration for the Agent and APM on GKE. This configuration file is used by the command you run next.

2. From the `/kubernetes` directory, run the following command, inserting your API key and cluster name:
   {{< code-block lang="sh" >}}
helm upgrade -f datadog-values.yaml --install --debug latest --set datadog.apiKey=<DD_API_KEY> --set datadog.clusterName=<CLUSTER_NAME> --set datadog.site=datadoghq.com datadog/datadog{{< /code-block >}}

   For more secure deployments that do not expose the API Key, read [this guide on using secrets][18]. Also, if you use a [Datadog site][6] other than `us1`, replace `datadoghq.com` with your site.
## Launch the app to see automatic tracing

Using [the same steps as before](#configure-the-application-locally-and-deploy), deploy the `notes` app with `kubectl create -f notes-app.yaml` and find the external IP address for the node it runs on.

Run some curl commands to exercise the app:

`curl '<EXTERNAL_IP>:30080/notes'`
: `[]`

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes?id=1'`
: `{"id":1,"description":"hello"}`

`curl '<EXTERNAL_IP>:30080/notes'`
: `[{"id":1,"description":"hello"}]`


Wait a few moments, and go to [**APM > Traces**][11] in Datadog, where you can see a list of traces corresponding to your API calls:

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Traces from the sample app in APM Trace Explorer" style="width:100%;" >}}

The `h2` is the embedded in-memory database for this tutorial, and `notes` is the Spring Boot application. The traces list shows all the spans, when they started, what resource was tracked with the span, and how long it took.

If you don't see traces after several minutes, clear any filter in the Traces Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace to see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}

### Tracing configuration

The Java tracing library uses Java's built-in agent and monitoring support. The flag `-javaagent:../dd-java-agent.jar` in the Dockerfile tells the JVM where to find the Java tracing library so it can run as a Java Agent. Learn more about Java Agents at [https://www.baeldung.com/java-instrumentation][7].

The `dd.trace.sample.rate` flag sets the sample rate for this application. The ENTRYPOINT command in the Dockerfile sets its value to `1`, which means that 100% of all requests to the `notes` service are sent to the Datadog backend for analysis and display. For a low-volume test application, this is fine. Do not do this in production or in any high-volume environment, because this results in a very large volume of data. Instead, sample some of your requests. Pick a value between 0 and 1. For example, `-Ddd.trace.sample.rate=0.1` sends traces for 10% of your requests to Datadog. Read more about [tracing configuration settings][14] and [sampling mechanisms][15].

Notice that the sampling rate flag in the command appears _before_ the `-jar` flag. That's because this is a parameter for the Java Virtual Machine, not your application. Make sure that when you add the Java Agent to your application, you specify the flag in the right location.

## Add manual instrumentation to the Java application

Automatic instrumentation is convenient, but sometimes you want more fine-grained spans. Datadog's Java DD Trace API allows you to specify spans within your code using annotations or code.

The following steps walk you through modifying the build scripts to download the Java tracing library and adding some annotations to the code to trace into some sample methods.

1. Delete the current application deployments:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml{{< /code-block >}}

2. Open `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. This example already contains commented-out code that demonstrates the different ways to set up custom tracing on the code.

3. Uncomment the lines that import libraries to support manual tracing:

   ```java
   import datadog.trace.api.Trace;
   import datadog.trace.api.DDTags;
   import io.opentracing.Scope;
   import io.opentracing.Span;
   import io.opentracing.Tracer;
   import io.opentracing.tag.Tags;
   import io.opentracing.util.GlobalTracer;
   import java.io.PrintWriter;
   import java.io.StringWriter
   ```

4. Uncomment the lines that manually trace the two public processes. These demonstrate the use of `@Trace` annotations to specify aspects such as `operationName` and `resourceName` in a trace:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

5. You can also create a separate span for a specific code block in the application. Within the span, add service and resource name tags and error handling tags. These tags result in a flame graph showing the span and metrics in Datadog visualizations. Uncomment the lines that manually trace the private method:

   ```java
           Tracer tracer = GlobalTracer.get();
           // Tags can be set when creating the span
           Span span = tracer.buildSpan("manualSpan1")
               .withTag(DDTags.SERVICE_NAME, "NotesHelper")
               .withTag(DDTags.RESOURCE_NAME, "privateMethod1")
               .start();
           try (Scope scope = tracer.activateSpan(span)) {
               // Tags can also be set after creation
               span.setTag("postCreationTag", 1);
               Thread.sleep(30);
               Log.info("Hello from the custom privateMethod1");
   ```
   And also the lines that set tags on errors:
   ```java
        } catch (Exception e) {
            // Set error on span
            span.setTag(Tags.ERROR, true);
            span.setTag(DDTags.ERROR_MSG, e.getMessage());
            span.setTag(DDTags.ERROR_TYPE, e.getClass().getName());

            final StringWriter errorString = new StringWriter();
            e.printStackTrace(new PrintWriter(errorString));
            span.setTag(DDTags.ERROR_STACK, errorString.toString());
            Log.info(errorString.toString());
        } finally {
            span.finish();
        }
   ```

6. Update your Maven build by opening `notes/pom.xml` and uncommenting the lines configuring dependencies for manual tracing. The `dd-trace-api` library is used for the `@Trace` annotations, and `opentracing-util` and `opentracing-api` are used for manual span creation.

7. Rebuild the application and upload it to GCR following the [same steps as before](#build-and-upload-the-application-image), running these commands in the `docker` directory:

   {{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build notes
docker tag docker-notes:latest  gcr.io/<PROJECT_NAME>/notes-tutorial:notes
docker push gcr.io/<PROJECT_NAME>/notes-tutorial:notes
{{< /code-block >}}

8. Using [the same steps as before](#configure-the-application-locally-and-deploy), deploy the `notes` app with `kubectl create -f notes-app.yaml` and find the external IP address for the node it runs on.

9. Resend some HTTP requests, specifically some `GET` requests.
10. On the Trace Explorer, click on one of the new `GET` requests, and see a flame graph like this:

    {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}

    Note the higher level of detail in the stack trace now that the `getAll` function has custom tracing.

    The `privateMethod` around which you created a manual span now shows up as a separate block from the other calls and is highlighted by a different color. The other methods where you used the `@Trace` annotation show under the same service and color as the `GET` request, which is the `notes` application. Custom instrumentation is valuable when there are key parts of the code that need to be highlighted and monitored.

For more information, read [Custom Instrumentation][12].

## Add a second application to see distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the Notes application has a second query parameter named `add_date`. When it is set to `y`, Notes calls the calendar application to get a date to add to the note.

1. Configure the `calendar` app for tracing by adding `dd-java-agent` to the startup command in the Dockerfile, like you previously did for the notes app. Open `calendar/dockerfile.calendar.maven` and see that it is already downloading `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Within the same `calendar/dockerfile.calendar.maven` file, comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>Note</strong>: Again, the flags, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

3. Build both applications and publish them to GCR. From the `docker` directory, run:
   {{< code-block lang="sh" >}}
gcloud auth configure-docker
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-k8s.yaml build calendar
docker tag docker-calendar:latest  gcr.io/<PROJECT_NAME>/calendar-tutorial:calendar
docker push gcr.io/<PROJECT_NAME>/calendar-tutorial:calendar{{< /code-block >}}

4. Open `kubernetes/calendar-app.yaml` and update the `image` entry with the URL for the GCR image, where you pushed the `calendar` app in the previous step:
   {{< code-block lang="yaml" >}}
    spec:
      containers:
        - name: calendar-app
          image: gcr.io/<PROJECT_ID>/calendar-tutorial:calendar
          imagePullPolicy: Always
{{< /code-block >}}

5. From the `kubernetes` directory, deploy both `notes` and `calendar` apps, now with custom instrumentation, on the cluster:
   {{< code-block lang="sh" >}}
kubectl create -f notes-app.yaml
kubectl create -f calendar-app.yaml{{< /code-block >}}

6. Using the method you used before, find the external IP of the `notes` app.

7. Send a POST request with the `add_date` parameter:

`curl -X POST '<EXTERNAL_IP>:30080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`

8. In the Trace Explorer, click this latest trace to see a distributed trace between the two services:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

   Note that you didn't change anything in the `notes` application. Datadog automatically instruments both the `okHttp` library used to make the HTTP call from `notes` to `calendar`, and the Jetty library used to listen for HTTP requests in `notes` and `calendar`. This allows the trace information to be passed from one application to the other, capturing a distributed trace.

9. When you're done exploring, clean up all resources and delete the deployments:
   {{< code-block lang="sh" >}}
kubectl delete -f notes-app.yaml
kubectl delete -f calendar-app.yaml{{< /code-block >}}

   See [the documentation for GKE][19] for information about deleting the cluster.

## Troubleshooting

If you're not receiving traces as expected, set up debug mode for the Java tracer. Read [Enable debug mode][13] to find out more.
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: /account_management/api-app-keys/
[4]: /tracing/trace_collection/compatibility/java/
[6]: /getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[7]: https://www.baeldung.com/java-instrumentation
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/java/
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /tracing/trace_collection/library_config/java/
[15]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[16]: https://cloud.google.com/container-registry/docs/quickstart
[17]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[19]: https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster
