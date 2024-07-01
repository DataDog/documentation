---
title: Tutorial - Enabling Tracing for a Java Application and Datadog Agent in Containers
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

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a container. In this scenario, the Datadog Agent is also installed in a container.

For other scenarios, including the application and Agent on a host, the application in a container and Agent on a host, the application and Agent on cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker
- Curl

## Install the sample Dockerized Java application

The code sample for this tutorial is on GitHub, at [github.com/DataDog/apm-tutorial-java-host][9]. To get started, clone the repository:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to be run within Docker containers. The sample app is a basic notes app with a REST API to add and change data. The `docker-compose` YAML files are located in the `docker` directory.

This tutorial uses the `all-docker-compose.yaml` file, which builds containers for both the application and the Datadog Agent.

In each of the `notes` and `calendar` directories, there are two sets of Dockerfiles for building the applications, either with Maven or with Gradle. This tutorial uses the Maven build, but if you are more familiar with Gradle, you can use it instead with the corresponding changes to build commands.

### Starting and exercising the sample application

1. Build the application's container by running the following from inside the `/docker` directory:

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml build notes
{{< /code-block >}}

   If the build gets stuck, exit with `Ctrl+C` and re-run the command.

2. Start the container:

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml up notes
{{< /code-block >}}

   You can verify that it's running by viewing the running containers with the `docker ps` command.

3. Open up another terminal and send API requests to exercise the app. The notes application is a REST API that stores data in an in-memory H2 database running on the same container. Send it a few commands:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

### Stop the application

After you've seen the application running, stop it so that you can enable tracing on it.

1. Stop the containers:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml down
{{< /code-block >}}

2. Remove the containers:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml rm
{{< /code-block >}}

## Enable tracing

Now that you have a working Java application, configure it to enable tracing.

1. Add the Java tracing package to your project. Because the Agent runs in a container, ensure that the Dockerfiles are configured properly, and there is no need to install anything. Open the `notes/dockerfile.notes.maven` file and uncomment the line that downloads `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Within the same `notes/dockerfile.notes.maven` file, comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   This automatically instruments the application with Datadog services.

   <div class="alert alert-warning"><strong>Note</strong>: The flags on these sample commands, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

3. [Universal Service Tags][10] identify traced services across different versions and deployment environments so that they can be correlated within Datadog, and so you can use them to search and filter. The three environment variables used for Unified Service Tagging are `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. For applications deployed with Docker, these environment variables can be added within the Dockerfile or the `docker-compose` file.
   For this tutorial, the `all-docker-compose.yaml` file already has these environment variables defined:

   ```yaml
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
   ```

4. You can also see that Docker labels for the same Universal Service Tags `service`, `env`, and `version` values are set in the Dockerfile. This allows you also to get Docker metrics once your application is running.

   ```yaml
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   ```

## Add the Agent container

Add the Datadog Agent in the services section of your `all-docker-compose.yaml` file to add the Agent to your build:

1. Uncomment the Agent configuration, and specify your own [Datadog API key][3] and [site][6]:
   ```yaml
     datadog-agent:
       container_name: datadog-agent
       image: "gcr.io/datadoghq/agent:latest"
       pid: host
       environment:
         - DD_API_KEY=<DD_API_KEY_HERE>
         - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
         - DD_APM_ENABLED=true
         - DD_APM_NON_LOCAL_TRAFFIC=true
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
         - /proc/:/host/proc/:ro
         - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   ```

3. Uncomment the `depends_on` fields for `datadog-agent` in the `notes` container.

2. Observe that in the `notes` service section, the `DD_AGENT_HOST` environment variable is set to the hostname of the Agent container. Your `notes` container section looks like this:
   ```yaml
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: notes/dockerfile.notes.maven
     ports:
       - 8080:8080
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     # - CALENDAR_HOST=calendar
     depends_on:
     # - calendar
       - datadog-agent
   ```
   You'll configure the `calendar` sections and variables later in this tutorial.


## Launch the containers to see automatic tracing

Now that the Tracing Library is installed, restart your application and start receiving traces. Run the following commands:

```
docker-compose -f all-docker-compose.yaml build notes
docker-compose -f all-docker-compose.yaml up notes
```

You can tell the Agent is working by observing continuous output in the terminal, or by opening the [Events Explorer][8] in Datadog and seeing the start event for the Agent:

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Agent start event shown in Events Explorer" style="width:100%;" >}}

With the application running, send some curl requests to it:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
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

The following steps walk you through adding annotations to the code to trace some sample methods.

1. Open `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. This example already contains commented-out code that demonstrates the different ways to set up custom tracing on the code.

2. Uncomment the lines that import libraries to support manual tracing:

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

3. Uncomment the lines that manually trace the two public processes. These demonstrate the use of `@Trace` annotations to specify aspects such as `operationName` and `resourceName` in a trace:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

4. You can also create a separate span for a specific code block in the application. Within the span, add service and resource name tags and error handling tags. These tags result in a flame graph showing the span and metrics in Datadog visualizations. Uncomment the lines that manually trace the private method:

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

5. Update your Maven build by opening `notes/pom.xml` and uncommenting the lines configuring dependencies for manual tracing. The `dd-trace-api` library is used for the `@Trace` annotations, and `opentracing-util` and `opentracing-api` are used for manual span creation.

6. Rebuild the containers:

   ```sh
   docker-compose -f all-docker-compose.yaml build notes
   docker-compose -f all-docker-compose.yaml up notes
   ```

7. Resend some HTTP requests, specifically some `GET` requests.
8. On the Trace Explorer, click on one of the new `GET` requests, and see a flame graph like this:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}

   Note the higher level of detail in the stack trace now that the `getAll` function has custom tracing.

   The `privateMethod` around which you created a manual span now shows up as a separate block from the other calls and is highlighted by a different color. The other methods where you used the `@Trace` annotation show under the same service and color as the `GET` request, which is the `notes` application. Custom instrumentation is valuable when there are key parts of the code that need to be highlighted and monitored.

For more information, read [Custom Instrumentation][12].

## Add a second application to see distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the Notes application has a second query parameter named `add_date`. When it is set to `y`, Notes calls the calendar application to get a date to add to the note.

1. Configure the calendar app for tracing by adding `dd-java-agent` to the startup command in the Dockerfile, like you previously did for the notes app. Open `calendar/Dockerfile.calendar.maven` and see that it is already downloading `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Within the same `calendar/dockerfile.calendar.maven` file, comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>Note</strong>: Again, the flags, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

3. Open `docker/all-docker-compose.yaml` and uncomment the environment variables for the `calendar` service to set up the Agent host and Unified Service Tags for the app and for Docker:

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build:
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
      ports:
        - 9090:9090
      depends_on:
        - datadog-agent
   ```

4. In the `notes` service section, uncomment the `CALENDAR_HOST` environment variable and the `calendar` entry in `depends_on` to make the needed connections between the two apps:

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
         - datadog-agent
   ```

5. Build the multi-service application by restarting the containers. First, stop all running containers:
   ```
   docker-compose -f all-docker-compose.yaml down
   ```

   Then run the following commands to start them:
   ```
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up
   ```

6. After all the containers are up, send a POST request with the `add_date` parameter:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


7. In the Trace Explorer, click this latest trace to see a distributed trace between the two services:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

Note that you didn't change anything in the `notes` application. Datadog automatically instruments both the `okHttp` library used to make the HTTP call from `notes` to `calendar`, and the Jetty library used to listen for HTTP requests in `notes` and `calendar`. This allows the trace information to be passed from one application to the other, capturing a distributed trace.

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
