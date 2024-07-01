---
title: Tutorial - Enabling Tracing for a Java Application in a Container and an Agent on a Host
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

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a container. In this scenario, the Datadog Agent is installed on a host.

For other scenarios, including the application and Agent on a host, the application and the Agent in containers or cloud infrastructure, and applications written in different languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker version 20.10 or greater
- Curl

## Install the Agent

If you haven't installed a Datadog Agent on your machine, install one now.

1. Go to [**Integrations > Agent**][5] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][3]:

   {{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
   {{< /code-block >}}

   To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [your Datadog site][6].

2. Ensure your Agent is configured to receive trace data from containers. Open its [configuration file][15] and ensure `apm_config:` is uncommented, and `apm_non_local_traffic` is uncommented and set to `true`.

3. Start the Agent service on the host. The command [depends on the operating system][14], for example:

   **MacOS**: `launchctl start com.datadoghq.agent`<br/>
   **Linux**: `sudo service datadog-agent start`

4. Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][8], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

   {{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>


## Install the sample Dockerized Java application

The code sample for this tutorial is on GitHub at [github.com/Datadog/apm-tutorial-java-host][9]. To get started, clone the repository:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to be run within Docker containers. The sample app is a basic notes app with a REST API to add and change data.

For this tutorial, the `docker-compose` YAML files are located in the folder `apm-tutorial-java-host/docker`. The instructions that follow assume that your Agent is running on a Linux host, and so use the `service-docker-compose-linux.yaml` file. If your Agent is on a macOS or Windows host, follow the same directions but use the `service-docker-compose.yaml` file instead. The Linux file contains Linux-specific Docker settings that are described in the in-file comments.

In each of the `notes` and `calendar` directories, there are two sets of Dockerfiles for building the applications, either with Maven or with Gradle. This tutorial uses the Maven build, but if you are more familiar with Gradle, you can use it instead with the corresponding changes to build commands.

### Starting and exercising the sample application

1. Build the application's container by running the following from inside the `/docker` directory:

   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml build notes
{{< /code-block >}}

2. Start the container:

   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml up notes
{{< /code-block >}}

   You can verify that it's running by viewing the containers with the `docker ps` command.

3. Open up another terminal and send API requests to exercise the app. The `notes` application is a REST API that stores data in an in-memory H2 database running in the same container. Send it a few commands:

`curl 'localhost:8080/notes'`
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
docker-compose -f service-docker-compose-linux.yaml down
{{< /code-block >}}

2. Remove the containers:
   {{< code-block lang="sh" >}}
docker-compose -f service-docker-compose-linux.yaml rm
{{< /code-block >}}

## Enable tracing

Now that you have a working Java application, configure it to enable tracing.

1. Add the Java tracing package to your project. Open the `notes/dockerfile.notes.maven` file and uncomment the line that downloads `dd-java-agent`:

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
   For this tutorial, the `service-docker-compose-linux.yaml` file already has these environment variables defined:

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

## Configure the container to send traces to the Agent

1. Open the compose file for the containers, `docker/service-docker-compose-linux.yaml`.

2. In the `notes` container section, add the environment variable `DD_AGENT_HOST` and specify the hostname of the Agent. For Docker 20.10 and later, use `host.docker.internal` to indicate that it's the host that is also running Docker:
   ```yaml
       environment:
        - DD_AGENT_HOST=host.docker.internal
   ```
   If your Docker is older than 20.10, run the following command and use the returned IP anywhere that's configured to `host.docker.internal`:
   ```sh
   docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}'
   ```

3. **On Linux**: Observe that the YAML also specifies an `extra_hosts`, which allows communication on Docker's internal network. If your Docker is older than 20.10, remove this `extra_hosts` configuration line.

The `notes` section of your compose file should look something like this:

   ```yaml
     notes:
       container_name: notes
       restart: always
       build:
         context: ../
         dockerfile: notes/dockerfile.notes.maven
       ports:
         - 8080:8080
       extra_hosts:                             # Linux only
         - "host.docker.internal:host-gateway"  # Linux only
       labels:
         - com.datadoghq.tags.service="notes"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
   ```

## Launch the containers to see automatic tracing

Now that the Tracing Library is installed and the Agent is running, restart your application to start receiving traces. Run the following commands:

```
docker-compose -f service-docker-compose.yaml build notes
docker-compose -f service-docker-compose.yaml up notes
```

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

If you don't see traces after several minutes, check that the Agent is running. Clear any filter in the Traces Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace to see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}

### Tracing configuration

The Java tracing library uses Java's built-in agent and monitoring support. The flag `-javaagent:../dd-java-agent.jar` in the Dockerfile tells the JVM where to find the Java tracing library so it can run as a Java Agent. Learn more about Java Agents at [https://www.baeldung.com/java-instrumentation][7].

The `dd.trace.sample.rate` flag sets the sample rate for this application. The ENTRYPOINT command in the Dockerfile sets its value to `1`, which means that 100% of all requests to the `notes` service are sent to the Datadog backend for analysis and display. For a low-volume test application, this is fine. Do not do this in production or in any high-volume environment, because this results in a very large volume of data. Instead, sample some of your requests. Pick a value between 0 and 1. For example, `-Ddd.trace.sample.rate=0.1` sends traces for 10% of your requests to Datadog. Read more about [tracing configuration settings][17] and [sampling mechanisms][16].

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

6. Rebuild the containers (on Linux use `service-docker-compose-linux.yaml`):

   ```sh
   docker-compose -f service-docker-compose.yaml build notes
   docker-compose -f service-docker-compose.yaml up notes
   ```

7. Resend some HTTP requests, specifically some `GET` requests.
5. On the Trace Explorer, click on one of the new `GET` requests, and see a flame graph like this:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}

   Note the higher level of detail in the stack trace now that the `getAll` function has custom tracing.

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

3. Open `docker/service-docker-compose-linux.yaml` and uncomment the environment variables for the `calendar` service to set up the Agent host and Unified Service Tags for the app and for Docker. As you did with the `notes` container, set the `DD_AGENT_HOST` value to match what your Docker requires, and remove `extra_hosts` if not on Linux:

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build:
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       ports:
         - 9090:9090
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
       extra_hosts:                            # Linux only
         - "host.docker.internal:host-gateway" # Linux only
   ```

4. In the `notes` service section, uncomment the `CALENDAR_HOST` environment variable and the `calendar` entry in `depends_on` to make the needed connections between the two apps:

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=host.docker.internal
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
   ```

5. Build the multi-service application by restarting the containers. First, stop all running containers:
   ```
   docker-compose -f service-docker-compose-linux.yaml down
   ```

   Then run the following commands to start them:
   ```
   docker-compose -f service-docker-compose-linux.yaml build
   docker-compose -f service-docker-compose-linux.yaml up

   ```

6. Send a POST request with the `add_date` parameter:

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
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /getting_started/site/
[7]: https://www.baeldung.com/java-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/java/
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[15]: /agent/configuration/agent-configuration-files/?tab=agentv6v7
[16]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[17]: /tracing/trace_collection/library_config/java/
