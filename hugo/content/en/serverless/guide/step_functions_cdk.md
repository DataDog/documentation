---
title: CDK Examples for Instrumenting AWS Step Functions
further_reading:
    - link: "/serverless/step_functions/installation"
      tag: "Documentation"
      text: "Install Serverless Monitoring for AWS Step Functions"
---

This page lists language-specific code examples for [instrumenting AWS Step Functions][1] using [Datadog's CDK Construct Library][2].

## Basic setup

{{< tabs >}}
{{% tab "TypeScript" %}}

Example stack: [`step-functions-typescript-stack`][1]

{{< code-block lang="typescript" disable_copy="false" >}}
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import { DatadogStepFunctions} from "datadog-cdk-constructs-v2";

const stateMachine = new sfn.StateMachine(...);
const datadogSfn = new DatadogStepFunctions(this, "DatadogSfn", {
  env: "<ENV>", // e.g. "dev"
  service: "<SERVICE>", // e.g. "my-cdk-service"
  version: "<VERSION>", // e.g. "1.0.0"
  forwarderArn: "<FORWARDER_ARN>", // e.g. "arn:test:forwarder:sa-east-1:12345678:1"
  tags: <TAGS>, // optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
});
datadogSfn.addStateMachines([stateMachine]);
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-typescript-stack

{{% /tab %}}
{{% tab "Python" %}}

Example stack: [`step-functions-python-stack`][1]

{{< code-block lang="python" disable_copy="false" >}}
from aws_cdk import (
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

state_machine = sfn.StateMachine(...)
datadog_sfn = DatadogStepFunctions(
    self,
    "DatadogSfn",
    env="<ENV>", # e.g. "dev"
    service="<SERVICE>", # e.g. "my-cdk-service"
    version="<VERSION>", # e.g. "1.0.0"
    forwarderArn="<FORWARDER_ARN>", # e.g. "arn:test:forwarder:sa-east-1:12345678:1"
    tags=<TAGS>, # optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
)
datadog_sfn.add_state_machines([child_state_machine, parent_state_machine])
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-python-stack
{{% /tab %}}
{{% tab "Go" %}}

Example stack: [`step-functions-go-stack`][1]

{{< code-block lang="go" disable_copy="false" >}}
import (
	"github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct"
	"github.com/aws/aws-cdk-go/awscdk/v2"
	sfn "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctions"
)

stack := awscdk.NewStack(...)
stateMachine := sfn.NewStateMachine(...)
datadogSfn := ddcdkconstruct.NewDatadogStepFunctions(
  stack,
  jsii.String("DatadogSfn"),
  &ddcdkconstruct.DatadogStepFunctionsProps{
    Env:            jsii.String("<ENV>"), // e.g. "dev"
    Service:        jsii.String("<SERVICE>"), // e.g. "my-cdk-service"
    Version:        jsii.String("<VERSION>"), // e.g. "1.0.0"
    ForwarderArn:   jsii.String("<FORWARDER_ARN>"), // e.g. "arn:test:forwarder:sa-east-1:12345678:1"
    Tags:           jsii.String("<TAGS>"), // optional, e.g. "custom-tag-1:tag-value-1,custom-tag-2:tag-value-2"
  }
)
datadogSfn.AddStateMachines(&[]sfn.StateMachine{stateMachine}, nil)
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-cdk-constructs/tree/main/examples/step-functions-go-stack

{{% /tab %}}
{{< /tabs >}}

## Merging traces

To merge the Step Function's traces with downstream Lambda function or Step Function traces, modify the Lambda task payload or Step Function task input:

{{< tabs >}}
{{% tab "TypeScript" %}}

{{< code-block lang="typescript" disable_copy="false" >}}
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import { DatadogStepFunctions, DatadogLambda } from "datadog-cdk-constructs-v2";

const lambdaFunction = ...;
const lambdaTask = new tasks.LambdaInvoke(this, "MyLambdaTask", {
  lambdaFunction: lambdaFunction,
  payload: sfn.TaskInput.fromObject(
    DatadogStepFunctions.buildLambdaPayloadToMergeTraces(
      { "custom-key": "custom-value" }
    )
  ),
});

const childStateMachine = new sfn.StateMachine(...);
const invokeChildStateMachineTask = new tasks.StepFunctionsStartExecution(this, "InvokeChildStateMachineTask", {
  stateMachine: childStateMachine,
  input: sfn.TaskInput.fromObject(
    DatadogStepFunctions.buildStepFunctionTaskInputToMergeTraces({ "custom-key": "custom-value" }),
  ),
});

const stateMachine = new sfn.StateMachine(this, "CdkTypeScriptTestStateMachine", {
  definitionBody: sfn.DefinitionBody.fromChainable(lambdaTask.next(invokeChildStateMachineTask)),
});

const datadogLambda = ...;
datadogLambda.addLambdaFunctions([lambdaFunction]);

const datadogSfn = ...;
datadogSfn.addStateMachines([childStateMachine, stateMachine]);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" disable_copy="false" >}}
from aws_cdk import (
    aws_lambda,
    aws_stepfunctions as sfn,
    aws_stepfunctions_tasks as tasks,
)
from datadog_cdk_constructs_v2 import DatadogStepFunctions, DatadogLambda

lambda_function = aws_lambda.Function(...)
lambda_task = tasks.LambdaInvoke(
    self,
    "MyLambdaTask",
    lambda_function=lambda_function,
    payload=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_lambda_payload_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

child_state_machine = sfn.StateMachine(...)
invoke_child_state_machine_task = tasks.StepFunctionsStartExecution(
    self,
    "InvokeChildStateMachineTask",
    state_machine=child_state_machine,
    input=sfn.TaskInput.from_object(
        DatadogStepFunctions.build_step_function_task_input_to_merge_traces(
            {"custom-key": "custom-value"}
        )
    ),
)

state_machine = sfn.StateMachine(
    self,
    "CdkPythonTestStateMachine",
    definition_body=sfn.DefinitionBody.from_chainable(
        lambda_task.next(invoke_child_state_machine_task)
    ),
)

datadog_lambda = DatadogLambda(...)
datadog_lambda.add_lambda_functions([lambda_function])

datadog_sfn = DatadogStepFunctions(...)
datadog_sfn.add_state_machines([child_state_machine, state_machine])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" disable_copy="false" >}}
import (
	"github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	sfn "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctions"
	sfntasks "github.com/aws/aws-cdk-go/awscdk/v2/awsstepfunctionstasks"
	"github.com/aws/jsii-runtime-go"
)

lambdaFunction := awslambda.NewFunction(...)
lambdaPayload := ddcdkconstruct.DatadogStepFunctions_BuildLambdaPayloadToMergeTraces(&map[string]interface{}{
  "custom-key": "custom-value",
})
lambdaTask := sfntasks.NewLambdaInvoke(stack, jsii.String("MyLambdaTask"), &sfntasks.LambdaInvokeProps{
  LambdaFunction: lambdaFunction,
  Payload: sfn.TaskInput_FromObject(lambdaPayload),
})

childStateMachine := sfn.NewStateMachine(...)
stateMachineTaskInput := ddcdkconstruct.DatadogStepFunctions_BuildStepFunctionTaskInputToMergeTraces(
  &map[string]interface{}{
    "custom-key": "custom-value",
  }
)
invokeChildStateMachineTask := sfntasks.NewStepFunctionsStartExecution(
  stack,
  jsii.String("InvokeChildStateMachineTask"),
  &sfntasks.StepFunctionsStartExecutionProps{
    StateMachine: childStateMachine,
    Input: sfn.TaskInput_FromObject(stateMachineTaskInput),
  }
)
stateMachine := sfn.NewStateMachine(stack, jsii.String("CdkGoTestStateMachine"), &sfn.StateMachineProps{
  DefinitionBody: sfn.DefinitionBody_FromChainable(lambdaTask.Next(invokeChildStateMachineTask)),
})

datadogLambda := ...
datadogLambda.AddLambdaFunctions(&[]interface{}{lambdaFunction}, nil)

datadogSfn := ...
datadogSfn.AddStateMachines(&[]sfn.StateMachine{childStateMachine, stateMachine}, nil)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/step_functions/installation
[2]: https://github.com/DataDog/datadog-cdk-constructs

