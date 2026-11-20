The Datadog Lambda extension and SDK layers add to the memory each invocation uses. Datadog recommends a memory size of at least 256 MB for instrumented functions. The Datadog CLI, Serverless Framework plugin, AWS CDK construct, CloudFormation macro, and Terraform module warn you when a function's memory size is below 256 MB. See [Memory requirements][4001] for details and for how to silence the warning.

[4001]: /serverless/aws_lambda/instrumentation/#memory-requirements
