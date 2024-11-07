---
title: Tutorial - Enabling Tracing for a Go Application on Amazon ECS with EC2

further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/go/
  tag: Documentation
  text: Supported Go frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: Documentation
  text: Manually configuring traces and spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentation
  text: Ingestion mechanisms
- link: https://github.com/DataDog/dd-trace-Go
  tag: Source Code
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Go application installed in a cluster on AWS Elastic Container Service (ECS). In this scenario, the Datadog Agent is also installed in the cluster.

For other scenarios, including the application and Agent on a host, the application in a container and Agent on a host, the application and Agent on cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1]. Some of those other tutorials, for example, the ones using containers or EKS, step through the differences seen in Datadog between automatic and custom instrumentation. This tutorial skips right to a fully custom instrumented example.

This tutorial also uses intermediate-level AWS topics, so it requires that you have some familiarity with AWS networking and applications. If you're not as familiar with AWS, and you are trying to learn the basics of Datadog APM setup, use one of the host or container tutorials instead.

See [Tracing Go Applications][2] for general comprehensive tracing setup documentation for Go.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker
- Terraform
- Amazon ECS
- an Amazon ECR repository for hosting images
- An AWS IAM user with `AdministratorAccess` permission. You must add the profile to your local credentials file using the access and secret access keys. For more information, read [Configuring the AWS SDK for Go V2][4].

## Install the sample Go application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/DataDog/apm-tutorial-golang.git][5]. Clone the git repository by running:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

The repository contains a multi-service Go application pre-configured to run inside Docker containers. The `docker-compose` YAML files to make the containers are located in the `docker` directory. This tutorial uses the `service-docker-compose-ECS.yaml` file, which builds containers for the `notes` and `calendar` service that make up the sample application.

### Initial ECS setup

The application requires some initial configuration, including adding your AWS profile (already configured with the correct permissions to create an ECS cluster and read from ECR), AWS region, and Amazon ECR repository.

Open `terraform/EC2/global_constants/variables.tf`. Replace the variable values below with your correct AWS account information:

```tf
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

Leave the `datadog_api_key` section commented for now. You'll set up Datadog later in the tutorial.

### Build and upload the application images

If you're not familiar with Amazon ECR, a registry for container images, it might be helpful to read [Using Amazon ECR with the AWS CLI][6].

In the sample project's `/docker` directory, run the following commands:

1. Authenticate with ECR by supplying your username and password in this command:
   {{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>{{< /code-block >}}

2. Build a Docker image for the sample apps, adjusting the platform setting to match yours:
   {{< code-block lang="shell" >}}
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build{{< /code-block >}}

3. Tag the containers with the ECR destination:
   {{< code-block lang="shell" >}}
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

4. Upload the container to the ECR registry:
   {{< code-block lang="shell" >}}
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Your application (without tracing enabled) is containerized and available for ECS to pull.

### Deploy the application

Start the application and send some requests without tracing. After you've seen how the application works, you'll instrument it using the tracing library and Datadog Agent.

To start, use a Terraform script to deploy to Amazon ECS:

1. From the `terraform/EC2/deployment` directory, run the following commands:

   ```shell
   terraform init
   terraform apply
   terraform state show 'aws_alb.application_load_balancer'
   ```

   **Note**: If the `terraform apply` command returns a CIDR block message, the script to obtain your IP address did not work on your local machine. To fix this, set the value manually in the `terraform/EC2/deployment/security.tf` file. Inside the `ingress` block of the `load_balancer_security_group`, switch which `cidr_blocks` line is commented out and update the now-uncommented example line with your machine's IP4 address.

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
   {{< code-block lang="shell" >}}
terraform destroy{{< /code-block >}}


## Enable tracing

Next, configure the Go application to enable tracing.

To enable tracing support:

1. Tp enable automatic tracing, uncomment the following imports in `apm-tutorial-golang/cmd/notes/main.go`:

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
     sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
     chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
     httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
     "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

1. In the `main()` function, uncomment the following lines:

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   tracer.Start()
   defer tracer.Stop(){{< /code-block >}}

   {{< code-block lang="go" >}}
   client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
      return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
   }))
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("notes"))){{< /code-block >}}

1. In `setupDB()`, uncomment the following lines:
   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
   db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

   {{< code-block lang="go" filename="cmd/notes/main.go">}}
   db, err := sql.Open("sqlite3", "file::memory:?cache=shared"){{< /code-block >}}

1. The steps above enabled automatic tracing with fully supported libraries. In cases where code doesn't fall under a supported library, you can create spans manually.

   Open `notes/notesController.go`. This example already contains commented-out code that demonstrates the different ways to set up custom tracing on the code.

1. The `makeSpanMiddleware` function in `notes/notesController.go` generates middleware that wraps a request in a span with the supplied name. Uncomment the following lines:

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", nr.GetAllNotes)                // GET /notes
     r.Post("/notes", nr.CreateNote)                // POST /notes
     r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
     r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
     r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123{{< /code-block >}}

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
     r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
     r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
     r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
     r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
     r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
   {{< /code-block >}}

   Also remove the comment around the following import:

   {{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"{{< /code-block >}}

1. The `doLongRunningProcess` function creates child spans from a parent context. Remove the comments to enable it:
   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
  }{{< /code-block >}}

1. The `privateMethod1` function demonstrates creating a completely separate service from a context. Remove the comments to enable it:

   {{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
   func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
      tracer.SpanType("web"),
      tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Hello from the custom privateMethod1 in Notes")
   }{{< /code-block >}}

   For more information on custom tracing, see [Go Custom Instrumentation][7].

1. [Universal Service Tags][8] identify traced services across different versions and deployment environments so that they can be correlated within Datadog, and so you can use them to search and filter. The three environment variables used for Unified Service Tagging are `DD_SERVICE`, `DD_ENV`, and `DD_VERSION`. For applications deployed on ECS, these environment variables are set within the task definition for the containers.

   For this tutorial, the `/terraform/EC2/deployment/main.tf` file already has these environment variables defined for the notes and calendar applications. For example, for `notes`:

   ```yaml
   {
    ...

      name : "notes-task",
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
          value : "calendar.apmlocalgo"
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
    },

    ...
   ```
   And for `calendar`:

   ```yaml
   ...

      name : "calendar-task",
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

### Rebuild and upload the application image

Rebuild the image with tracing enabled using the [same steps as before](#build-and-upload-the-application-images):

{{< code-block lang="shell" >}}
aws ecr get-login-password --region us-east-1 | docker login --username <YOUR_AWS_USER> --password-stdin <USER_CREDENTIALS>
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose -f service-docker-compose-ECS.yaml build
docker tag docker_notes:latest <ECR_REGISTRY_URL>:notes
docker tag docker_calendar:latest <ECR_REGISTRY_URL>:calendar
docker push <ECR_REGISTRY_URL>:notes
docker push <ECR_REGISTRY_URL>:calendar{{< /code-block >}}

Your multi-service application with tracing enabled is containerized and available for ECS to pull.

## Deploy the Agent on ECS

Next, deploy the Datadog Agent to collect the trace data from your instrumented application. For an ECS environment, there is no need to download anything to run the Agent. Instead, follow these steps to create a Datadog Agent task definition, upload the task definition to AWS, and create an Agent service on your cluster using that task definition.

1. Open `terraform/EC2/dd_agent_task_definition.json`, which provides a basic configuration for running the Agent with APM tracing enabled. Provide your Datadog organization API key and Datadog site as appropriate:

   ```yaml
   ...
   "environment": [
     {
       "name": "DD_API_KEY",
       "value": "<API_KEY_HERE>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     ...
   ```

2. Register the Agent task definition, replacing the profile and region with your information. From the `terraform/EC2` folder, run:

   {{< code-block lang="shell" >}}
   aws ecs register-task-definition --cli-input-json file://dd_agent_task_definition.json --profile <AWS_PROFILE> --region <AWS_REGION>{{< /code-block >}}

   From the output, take note of the `taskDefinitionArn` value, which is used in the next step.

3. Create the Agent service on the cluster by running this command, supplying the task definition ARN from the previous step, your AWS profile, and AWS region:

   {{< code-block lang="shell" >}}
   aws ecs create-service --cluster apm-tutorial-ec2-go --task-definition <TASK_DEFINITION_ARN> --launch-type EC2 --scheduling-strategy DAEMON --service-name datadog-agent --profile <PROFILE> --region <AWS_REGION>{{< /code-block >}}

## Launch the app to see traces

Redeploy the application and exercise the API:

1. Redeploy the application to Amazon ECS using the [same terraform commands as before](#deploy-the-application), but with the instrumented version of the configuration files. From the `terraform/EC2/deployment` directory, run the following commands:

   ```shell
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

4. Wait a few moments, and take a look at your Datadog UI. Navigate to [**APM > Traces**][9]. The Traces list shows something like this:
   {{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

   There are entries for the database (`db`) and the `notes` app. The traces list shows all the spans, when they started, what resource was tracked with the span, and how long it took.

If you don't see traces, clear any filter in the **Traces** Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace, to see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}

For more information, read [Custom Instrumentation][7].

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_. Click the trace for the last API call, the one that added a date to the note, to see a distributed trace between the two services:

{{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

This flame graph combines interactions from multiple applications:
- The first span is a POST request sent by the user and handled by the `chi` router through the supported `go-chi` library.
- The second span is a `createNote` function that was manually traced by the `makeSpanMiddleware` function. The function created a span from the context of the HTTP request.
- The next span is the request sent by the notes application using the supported `http` library and the client initialized in the `main.go` file. This GET request is sent to the calendar application. The calendar application spans appear in blue because they are separate service.
- Inside the calendar application, a `go-chi` router handles the GET request and the `GetDate` function is manually traced with its own span under the GET request.
- Finally, the purple `db` call is its own service from the supported `sql` library. It appears at the same level as the `GET /Calendar` request because they are both called by the parent span `CreateNote`.

When you're done exploring, clean up all resources and delete the deployments:

{{< code-block lang="shell" >}}
terraform destroy
{{< /code-block >}}

## Troubleshooting

If you're not receiving traces as expected, set up debug mode for the Go tracer. Read [Enable debug mode][10] to find out more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/go/
[3]: /account_management/api-app-keys/
[4]: https://aws.github.io/aws-sdk-go-v2/docs/configuring-sdk/#specifying-credentials
[5]: https://github.com/DataDog/apm-tutorial-golang
[6]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html
[7]: /tracing/trace_collection/custom_instrumentation/go/
[8]: /getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/apm/traces
[10]: /tracing/troubleshooting/tracer_debug_logs/?code-lang=go
