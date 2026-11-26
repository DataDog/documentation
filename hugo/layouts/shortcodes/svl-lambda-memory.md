The Datadog Lambda Extension and the Datadog SDK add to the memory that each invocation uses. Datadog recommends a memory size of at least 256 MB for instrumented functions. The Datadog CLI, Serverless Framework plugin, AWS CDK construct, CloudFormation macro, and Terraform module show a warning when a function has less than 256 MB of memory. For more details and the options to silence the warning, see [Instrument AWS Lambda applications: Memory requirements][101].

[101]: /serverless/aws_lambda/instrumentation/#memory-requirements
