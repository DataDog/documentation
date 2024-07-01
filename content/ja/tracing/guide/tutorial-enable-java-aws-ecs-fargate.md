---
title: Tutorial - Enabling Tracing for a Java Application on Amazon ECS with Fargate
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

This tutorial walks you through the steps for enabling tracing on a sample Java application installed in a cluster on AWS Elastic Container Service (ECS) with Fargate. In this scenario, the Datadog Agent is also installed in the cluster.

For other scenarios, including on a host, in a container, on other cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1]. Some of those other tutorials, for example, the ones using containers or EKS, step through the differences seen in Datadog between automatic and custom instrumentation. This tutorial skips right to a fully custom instrumented example.

This tutorial also uses intermediate-level AWS topics, so it requires that you have some familiarity with AWS networking and applications. If you're not as familiar with AWS, and you are trying to learn the basics of Datadog APM setup, use one of the host or container tutorials instead.

See [Tracing Java Applications][2] for general comprehensive tracing setup documentation for Java.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker
- Terraform
- Amazon ECS
- an Amazon ECR repository for hosting images
- An AWS IAM user with `AdministratorAccess` permission. You must add the profile to your local credentials file using the access and secret access keys. For more information, read [Using the AWS credentials file and credential Profiles][20].

## Install the sample Java application

The code sample for this tutorial is on GitHub, at [github.com/DataDog/apm-tutorial-java-host][9]. To get started, clone the repository:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

The repository contains a multi-service Java application pre-configured to run inside Docker containers. The `docker-compose` YAML files to make the containers are located in the `docker` directory. This tutorial uses the `service-docker-compose-ECS.yaml` file, which builds containers for the application.

In each of the `notes` and `calendar` directories, there are two sets of Dockerfiles for building the applications, either with Maven or with Gradle. This tutorial uses the Maven build, but if you are more familiar with Gradle, you can use it instead with the corresponding changes to build commands.

The sample application is a simple multi-service Java application with two APIs, one for a `notes` service and another for a `calendar` service. The `notes` service has `GET`, `POST`, `PUT`, and `DELETE` endpoints for notes stored within an in-memory H2 database. The `calendar` service can take a request and return a random date to be used in a note. Both applications have their own associated Docker images, and you deploy them on Amazon ECS as separate services, each with its own tasks and respective containers. ECS pulls the images from ECR, a repository for application images that you publish the images to after building.

### Initial ECS setup

The application requires some initial configuration, including adding your AWS profile (already configured with the correct permissions to create an ECS cluster and read from ECR), AWS region, and Amazon ECR repository.

Open `terraform/Fargate/global_constants/variables.tf`. Replace the variable values below with your correct AWS account information:

```
output "aws_profile" {
    value = "<AWS_PROFILE>"
    sensitive = true
}

output "aws_region" {
    value = "<AWS_REGION>"
    sensitive = true
}

output "aws_ecr_repository" {
    value = "<AWS_ECR_REPOSITORY_URL>"
    sensitive = true
}
```

### Build and upload the application images

If you're not familiar with Amazon ECR, a registry for container images, it might be helpful to read [Using Amazon ECR with the AWS CLI][17].

In the sample project's `/docker` directory, run the following commands:

1. Authenticate with ECR by supplying your username and password in this command:
   {{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Build a Docker image for the sample apps, adjusting the platform setting to match yours:
   {{< code-block lang="sh" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. Tag the containers with the ECR destination:
   {{< code-block lang="sh" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. Upload the container to the ECR registry:
   {{< code-block lang="sh" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Your application (without tracing enabled) is containerized and available for ECS to pull.


### Deploy the application

Start the application and send some requests without tracing. After you've seen how the application works, you'll instrument it using the tracing library and Datadog Agent.

To start, use a terraform script to deploy to Amazon ECS:

1. From the `terraform/Fargate/Uninstrumented` directory, run the following commands:

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **Note**: If the `terraform apply` command returns a CIDR block message, the script to obtain your IP address did not work on your local machine. To fix this, set the value manually in the `terraform/Fargate/Uninstrumented/security.tf` file. Inside the `ingress` block of the `load_balancer_security_group`, switch which `cidr_blocks` line is commented out and update the now-uncommented example line with your machine's IP4 address.

2. Make note of the DNS name of the load balancer. You'll use that base domain in API calls to the sample app. Wait a few minutes for the instances to start up.

3. Open up another terminal and send API requests to exercise the app. The notes application is a REST API that stores data in an in-memory H2 database running on the same container. Send it a few commands:

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"UpdatedNote"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`

      This command calls both the `notes` and `calendar` services.

4. After you've seen the application running, run the following command to stop it and clean up the AWS resources so that you can enable tracing:
   {{< code-block lang="sh" >}}
terraform destroy{{< /code-block >}}

## Enable tracing

Now that you have a working Java application, configure it to enable tracing.

1. Edit the dockerfile to add the Java tracing package which is needed by the application to generate traces. Open the `notes/dockerfile.notes.maven` file and uncomment the line that downloads `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Within the same `notes/dockerfile.notes.maven` file, comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   Repeat this step with the other service, `calendar`. Open `calendar/dockerfile.calendar.maven`, and comment out the `ENTRYPOINT` line for running without tracing. Then uncomment the `ENTRYPOINT` line, which runs the application with tracing enabled:

   ```
   ENTRYPOINT ["java", "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   Now both services will have automatic instrumentation.

   <div class="alert alert-warning"><strong>Note</strong>: The flags on these sample commands, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your real environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

3. Automatic instrumentation is convenient, but sometimes you want more fine-grained spans. Datadog's Java DD Trace API allows you to specify spans within your code using annotations or code. Add some annotations to the code to trace into some sample methods.

   Open `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. This example already contains commented-out code that demonstrates the different ways to set up custom tracing on the code.

4. Uncomment the lines that import libraries to support manual tracing:

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

5. Uncomment the lines that manually trace the two public processes. These demonstrate the use of `@Trace` annotations to specify aspects such as `operationName` and `resourceName` in a trace:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

6. You can also create a separate span for a specific code block in the application. Within the span, add service and resource name tags and error handling tags. These tags result in a flame graph showing the span and metrics in Datadog visualizations. Uncomment the lines that manually trace the private method:

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

7. Update your Maven build by opening `notes/pom.xml` and uncommenting the lines configuring dependencies for manual tracing. The `dd-trace-api` library is used for the `@Trace` annotations, and `opentracing-util` and `opentracing-api` are used for manual span creation.

8. Add the Datadog Agent to each of the `notes` and `calendar` task definitions, adding an Agent in a container beside each AWS task rather than installing it anywhere. Open `terraform/Fargate/Instrumented/main.tf` and see that this sample already has the base configurations necessary to run the Datadog Agent on ECS Fargate and collect traces: the API key (which you configure in the next step), enabling ECS Fargate, and enabling APM. The definition is provided in both the `notes` task and the `calendar` task.

9. Provide the API key variable with a value. Open `terraform/Fargate/global_constants/variables.tf` and uncomment the `output "datadog_api_key"` section and provide your organization's Datadog API key.

10. [Universal Service Tags][10] identify traced services across different versions and deployment environments so that they can be correlated within Datadog, and so you can use them to search and filter. The three environment variables used for Unified Service Tagging are `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. For applications deployed on ECS, these environment variables are set within the task definition for the containers.

    For this tutorial, the `/terraform/Fargate/Instrumented/main.tf` file already has these environment variables defined for the notes and calendar applications, for example, for `notes`:

    ```yaml
    ...

       name : "notes",
       image : "${module.settings.aws_ecr_repository}:notes",
       essential : true,
       portMappings : [
         {
           containerPort : 8080,
           hostPort : 8080
         }
       ],
       memory : 512,
       cpu : 256,
       environment : [
         {
           name : "CALENDAR_HOST",
           value : "calendar.apmlocaljava"
         },
         {
           name : "DD_SERVICE",
           value : "notes"
         },
         {
           name : "DD_ENV",
           value : "dev"
         },
         {
           name : "DD_VERSION",
           value : "0.0.1"
         }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "notes",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
       ...
    ```
    And for `calendar`:

    ```yaml
     ...
        name : "calendar",
        image : "${module.settings.aws_ecr_repository}:calendar",
        essential : true,
        environment : [
          {
            name : "DD_SERVICE",
            value : "calendar"
          },
          {
            name : "DD_ENV",
            value : "dev"
          },
          {
            name : "DD_VERSION",
            value : "0.0.1"
          }
       ],
       dockerLabels : {
         "com.datadoghq.tags.service" : "calendar",
         "com.datadoghq.tags.env" : "dev",
         "com.datadoghq.tags.version" : "0.0.1"
       },
      ...
     ```

    You can also see that Docker labels for the same Universal Service Tags `service`, `env`, and `version` values are set. This allows you also to get Docker metrics once your application is running.

### Tracing configuration

The Java tracing library uses Java's built-in agent and monitoring support. The flag `-javaagent:../dd-java-agent.jar` in the Dockerfile tells the JVM where to find the Java tracing library so it can run as a Java Agent. Learn more about Java Agents at [https://www.baeldung.com/java-instrumentation][7].

The `dd.trace.sample.rate` flag sets the sample rate for this application. The ENTRYPOINT command in the Dockerfile sets its value to `1`, meaning that 100% of all service requests are sent to the Datadog backend for analysis and display. For a low-volume test application, this is fine. Do not do this in production or in any high-volume environment, because this results in a very large volume of data. Instead, sample some of your requests. Pick a value between 0 and 1. For example, `-Ddd.trace.sample.rate=0.1` sends traces for 10% of your requests to Datadog. Read more about [tracing configuration settings][14] and [sampling mechanisms][15].

Notice that the sampling rate flag in the commands appears _before_ the `-jar` flag. That's because this is a parameter for the Java Virtual Machine, not your application. Make sure that when you add the Java Agent to your application, you specify the flag in the right location.

### Rebuild and upload the application image

Rebuild the image with tracing enabled using the [same steps as before](#build-and-upload-the-application-images):
{{< code-block lang="sh" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Your multi-service application with tracing enabled is containerized and available for ECS to pull.

## Launch the app to see traces

Redeploy the application and exercise the API:

1. Redeploy the application to Amazon ECS using the [same terraform commands as before](#deploy-the-application), but with the instrumented version of the configuration files. From the `terraform/Fargate/Instrumented` directory, run the following commands:

   ```sh
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

2. Make note of the DNS name of the load balancer. You'll use that base domain in API calls to the sample app.

3. Wait a few minutes for the instances to start up. Wait a few minutes to ensure the containers for the applications are ready. Run some curl commands to exercise the instrumented app:

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=hello'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes?id=1'`
   : `{"id":1,"description":"hello"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X PUT 'BASE_DOMAIN:8080/notes?id=1&desc=UpdatedNote'`
   : `{"id":1,"description":"UpdatedNote"}`

   `curl -X GET 'BASE_DOMAIN:8080/notes'`
   : `[{"id":1,"description":"hello"}]`

   `curl -X POST 'BASE_DOMAIN:8080/notes?desc=NewestNote&add_date=y'`
   : `{"id":2,"description":"NewestNote with date 12/02/2022."}`
   : This command calls both the `notes` and `calendar` services.

4. Wait a few moments, and go to [**APM > Traces**][11] in Datadog, where you can see a list of traces corresponding to your API calls:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Traces from the sample app in APM Trace Explorer" style="width:100%;" >}}

   The `h2` is the embedded in-memory database for this tutorial, and `notes` is the Spring Boot application. The traces list shows all the spans, when they started, what resource was tracked with the span, and how long it took.

If you don't see traces after several minutes, clear any filter in the Traces Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace to see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

On the Trace Explorer, click into one of the `GET` requests, and see a flame graph like this:

{{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}

The `privateMethod` around which you created a manual span shows up as a separate block from the other calls and is highlighted by a different color. The other methods where you used the `@Trace` annotation show under the same service and color as the `GET` request, which is the `notes` application. Custom instrumentation is valuable when there are key parts of the code that need to be highlighted and monitored.

For more information, read [Custom Instrumentation][12].

Tracing a single service is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_. Click the trace for the last API call, the one that added a date to the note, to see a distributed trace between the two services:

{{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

Note that you didn't change anything in the `notes` application. Datadog automatically instruments both the `okHttp` library used to make the HTTP call from `notes` to `calendar`, and the Jetty library used to listen for HTTP requests in `notes` and `calendar`. This allows the trace information to be passed from one application to the other, capturing a distributed trace.

When you're done exploring, clean up all resources and delete the deployments:

```sh
aws ecs delete-service --cluster apm-tutorial-ec2-java --service datadog-agent --profile <PROFILE> --region <REGION>
terraform destroy
```

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
[17]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[18]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#create-and-provide-a-secret-that-contains-your-datadog-api-and-app-keys
[20]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-profiles.html

