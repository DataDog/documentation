---
title: Tutorial - Enabling Tracing for a Java Application on the Same Host as the Datadog Agent
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

This tutorial walks you through the steps for enabling tracing on a sample Java application installed on a host. In this scenario, you install a Datadog Agent on the same host as the application.

For other scenarios, including applications in containers or on cloud infrastructure, Agent in a container, and applications written in different languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Curl
- A physical or virtual Linux host with root access when using sudo
- Java 11-compatible JDK (not just a JRE) on the host. In this tutorial, you're building on and deploying to the same machine.

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][5] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][3]:

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [your Datadog site][6].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][8], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>


## Install and run a sample Java application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/DataDog/apm-tutorial-java-host][9]. Clone the git repository by running:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

Build the sample app using either Maven or Gradle, whichever you are more comfortable with. Navigate to the `notes` directory within `apm-tutorial-java-host` and run one of the following:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
./mvnw clean package
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
./gradlew clean bootJar
```

This uses the Spring Boot Jar plugin to create a single Jar file that contains all the necessary files to run the Java application.

{{% /tab %}}

{{< /tabs >}}

Start the application by running:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
java -jar target/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
java -jar build/libs/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{< /tabs >}}

Alternatively, if your operating system supports it, you can build and run the application using the following scripts provided in the `scripts` directory:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
sh ./scripts/mvn_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
sh ./scripts/gradle_run.sh
```

{{% /tab %}}

{{< /tabs >}}

The sample `notes_app` application is a basic REST API that stores data in an in-memory database. Open another terminal and use `curl` to send a few API requests:

`curl localhost:8080/notes`
: Returns `[]` because there is nothing in the database yet

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Adds a note with the description `hello` and an ID value of `1`. Returns `{"id":1,"description":"hello"}`.

`curl localhost:8080/notes/1`
: Returns the note with `id` value of `1`: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: Adds a note with the description `otherNote` and an ID value of `2`. Returns `{"id":2,"description":"otherNote"}`

`curl localhost:8080/notes`
: Returns the contents of the database: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

Run more API calls to see the application in action. When you're done, type Ctrl+C to stop the application.

## Install Datadog tracing

Next, download the Java tracing library (sometimes called the Java Agent). From your `apm-tutorial-java-host` directory, run:

{{< code-block lang="sh" >}}
curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

If your operating system does not support curl, you can go directly to `'https://dtdg.co/latest-java-tracer' ` to download the `dd-java-agent.jar` file.

## Launch the Java application with automatic instrumentation

To start generating and collecting traces, restart the sample application with additional flags that cause tracing data to be sent to Datadog.

<div class="alert alert-warning"><strong>Note</strong>: The flags on these sample commands, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>


{{< tabs >}}

{{% tab "Maven" %}}

From the `notes` directory, run:

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
```

Or use the provided script:

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

From the `notes` directory, run:

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
```

Or use the provided script:

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


Use `curl` to again send requests to the application:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Wait a few moments, and take a look at your Datadog UI. Navigate to [**APM > Traces**][11]. The Traces list shows something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-host-traces_cropped.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

The `h2` is the embedded in-memory database for this tutorial, and `notes` is the Spring Boot application. The traces list shows all the spans, when they started, what resource was tracked with the span, and how long it took.

If you don't see traces, clear any filter in the Traces Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace, and you'll see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-host-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-java-host-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}


### Tracing configuration

The Java tracing library uses Java's built-in agent and monitoring support. The flag `-javaagent:../dd-java-agent.jar` tells the JVM where to find the Java tracing library so it can run as a Java Agent. Learn more about Java Agents at [https://www.baeldung.com/java-instrumentation][7].

In addition to the `javaagent` flag, which enables the Java Agent, the launch commands specify three [Unified Service Tagging][10] settings to uniquely identify your application within Datadog. Always specify `env`, `service`, and `version` tags for every monitored application.

And finally, the `dd.trace.sample.rate` flag sets the sample rate for this application. The launch commands above set its value to `1`, which means that 100% of all requests to the `notes` service are sent to the Datadog backend for analysis and display. For a low-volume test application, this is fine. Do not do this in production or in any high-volume environment, because this results in a very large volume of data. Instead, sample some of your requests. Pick a value between 0 and 1. For example, `-Ddd.trace.sample.rate=0.1` sends traces for 10% of your requests to Datadog. Read more about [tracing configuration settings][14] and [sampling mechanisms][15].

Notice that the flags in the commands appear _before_ the `-jar` flag. That's because these are parameters for the Java Virtual Machine, not your application. Make sure that when you add the Java Agent to your application, you specify the flags in the right location.


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

5. Update your build script configuration, and build the application:
{{< tabs >}}

{{% tab "Maven" %}}

a. Open `notes/pom.xml` and uncomment the lines configuring dependencies for manual tracing. The `dd-trace-api` library is used for the `@Trace` annotations, and `opentracing-util` and `opentracing-api` are used for manual span creation.

b. Run:

   ```sh
   ./mvnw clean package

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
   ```

   Or use the script:

   ```sh
   sh ./scripts/mvn_instrumented_run.sh
   ```

{{% /tab %}}

{{% tab "Gradle" %}}

a. Open `notes/build.gradle` and uncomment the lines configuring dependencies for manual tracing. The `dd-trace-api` library is used for the `@Trace` annotations, and `opentracing-util` and `opentracing-api` are used for manual span creation.

b. Run:
   ```sh
   ./gradlew clean bootJar

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
   ```

   Or use the script:

   ```sh
   sh ./scripts/gradle_instrumented_run.sh
   ```

{{% /tab %}}

{{< /tabs >}}

6. Resend some HTTP requests, specifically some `GET` requests.
7. On the Trace Explorer, click on one of the new `GET` requests, and see a flame graph like this:

   {{< img src="tracing/guide/tutorials/tutorial-java-host-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}

   Note the higher level of detail in the stack trace now that the `getAll` function has custom tracing.

   The `privateMethod` around which you created a manual span now shows up as a separate block from the other calls and is highlighted by a different color. The other methods where you used the `@Trace` annotation show under the same service and color as the `GET` request, which is the `notes` application. Custom instrumentation is valuable when there are key parts of the code that need to be highlighted and monitored.

For more information, read [Custom Instrumentation][12].

## Add a second application to see distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the Notes application has a second query parameter named `add_date`. When it is set to `y`, Notes calls the calendar application to get a date to add to the note.

1. Navigate to the `/calendar` directory in the sample repo and build and run the calendar app:
{{< tabs >}}

{{% tab "Maven" %}}

Run:

```sh
./mvnw clean package

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 target/calendar-0.0.1-SNAPSHOT.jar
```

Or use the script:

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

Run:
```sh
./gradlew bootJar

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/calendar-0.0.1-SNAPSHOT.jar
```

Or use the script:

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


2. Send a POST request with the `add_date` parameter:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


3. In the Trace Explorer, click this latest `notes` trace to see a distributed trace between the two services:

   {{< img src="tracing/guide/tutorials/tutorial-java-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

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
[10]: /getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/java/
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /tracing/trace_collection/library_config/java/
[15]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
