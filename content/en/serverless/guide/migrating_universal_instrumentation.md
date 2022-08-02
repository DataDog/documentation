---
title: Migrating to universal instrumentation
kind: guide
aliases:
    - /serverless/migrating_to_universal_instrumentation/
---

## Overview

Customers using our datadog-lambda-java and datadog-lambda-dotnet tracing libraries will be pleased to learn that we have a new code-free way to instrument your Lambda functions with Datadog.

### Migrating from datadog-lambda-java

Customers no longer need to manually wrap their functions
 - show new code vs old code?
 - new code doesn't need to be wrapped in the ddlambda wrapper function
 - this means the customer doesn't need to import the java library in their code

Customers must use a Java metrics client to send metrics
 - metrics client is no longer bundled within the Java library
 - https://docs.datadoghq.com/serverless/custom_metrics/#with-the-datadog-lambda-extension

Customers must set AWS_LAMBDA_EXEC_WRAPPER on their function
 - our instrumentation (datadog-ci, and the datadog serverless plugin) do this for the customer
 - customer must set the environment variable AWS_LAMBDA_EXEC_WRAPPER to /opt/datadog_wrapper
