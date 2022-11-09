---
title: AWS Logs Integration
---
Configure your Datadog-AWS-Logs integration directly through Datadog API.
For more information, see the [AWS integration page](https://docs.datadoghq.com/api/?lang=bash#integration-aws-logs).

## Delete an AWS Logs integration

Delete a Datadog-AWS logs configuration by removing the specific Lambda ARN associated with a given AWS account.

## List all AWS Logs integrations

List all Datadog-AWS Logs integrations configured in your Datadog account.

## Add AWS Log Lambda ARN

Attach the Lambda ARN of the Lambda created for the Datadog-AWS log collection to your AWS account ID to enable log collection.

## Check that an AWS Lambda Function exists

Test if permissions are present to add a log-forwarding triggers for the given services and AWS account. The input
is the same as for Enable an AWS service log collection. Subsequent requests will always repeat the above, so this
endpoint can be polled intermittently instead of blocking.

- Returns a status of 'created' when it's checking if the Lambda exists in the account.
- Returns a status of 'waiting' while checking.
- Returns a status of 'checked and ok' if the Lambda exists.
- Returns a status of 'error' if the Lambda does not exist.

## Get list of AWS log ready services

Get the list of current AWS services that Datadog offers automatic log collection. Use returned service IDs with the services parameter for the Enable an AWS service log collection API endpoint.

## Enable an AWS Logs integration

Enable automatic log collection for a list of services. This should be run after running `CreateAWSLambdaARN` to save the configuration.

## Check permissions for log services

Test if permissions are present to add log-forwarding triggers for the
given services and AWS account. Input is the same as for `EnableAWSLogServices`.
Done async, so can be repeatedly polled in a non-blocking fashion until
the async request completes.

- Returns a status of `created` when it's checking if the permissions exists
  in the AWS account.
- Returns a status of `waiting` while checking.
- Returns a status of `checked and ok` if the Lambda exists.
- Returns a status of `error` if the Lambda does not exist.

