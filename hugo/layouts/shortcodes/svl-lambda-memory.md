The Datadog Lambda extension and SDK layers add to the memory each invocation uses. Datadog recommends a memory size of at least 256 MB for instrumented functions. Datadog's installation tools warn you, or skip the function, when its memory size is below 256 MB. See [Memory requirements][4001] for details and for how to turn off the warning.

[4001]: /serverless/aws_lambda/instrumentation/#memory-requirements
