---
title: AWS Lambda FIPS Compliance
further_reading:
    - link: '/serverless/aws_lambda/installation/'
      tag: 'Documentation'
      text: 'Install Serverless Monitoring for AWS Lambda'
    - link: '/serverless/aws_lambda/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring for AWS Lambda'
algolia:
  rank: 80
  tags: ["fips", "compliance", "fedramp", "govcloud", "aws lambda"]
---

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<div class="alert alert-danger">The FIPS-compliant Datadog Lambda extension is available in all AWS regions. While you can use these FIPS-compliant Lambda components with any Datadog site, end-to-end FIPS compliance requires sending data to the US1-FED site (ddog-gov.com).</div>
{{< /site-region >}}

Datadog provides FIPS-compliant monitoring for AWS Lambda functions through the use of FIPS-certified cryptographic modules and specially designed Lambda extension layers.

## FIPS-Compliant Components

Datadog's FIPS compliance for AWS Lambda is implemented through two main components:

1. **FIPS-Compliant Lambda Extension**:
   - The compatibility version of the extension is a Go binary built using the [BoringCrypto FIPS-certified module](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4407).
   - The Next Generation Lambda Extension is a Rust binary built with the [AWS-LC FIPS-certified cryptographic module](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4816).

2. **Runtime Libraries Support**:
   - The Python and JavaScript Datadog Lambda Layers, and the Go Datadog Lambda Library offer FIPS-compliant operation controlled by the `DD_LAMBDA_FIPS_MODE` environment variable.
     - `DD_LAMBDA_FIPS_MODE` defaults to `true` in GovCloud and `false` otherwise.
   - When FIPS mode is enabled:
     - The runtime libraries use AWS FIPS endpoints for Datadog API key retrieval
     - The Lambda metric helper functions require the FIPS-compliant extension for metric submission:
       - Python: `lambda_metric` from `datadog_lambda.metric`
       - Node.js: `sendDistributionMetric` from `datadog-lambda-js`
       - Go: `Metric()` from `ddlambda`

## FIPS Extension Layers

Datadog provides separate Lambda extension layers for FIPS compliance in both x86 and ARM architectures:

{{< tabs >}}
{{% tab "AWS GovCloud Regions" %}}

```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
```

Replace `<AWS_REGION>` with a valid AWS GovCloud region such as `us-gov-west-1`.

{{% /tab %}}
{{% tab "AWS Commercial Regions" %}}

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
```

Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`.

{{% /tab %}}
{{< /tabs >}}

## Runtime Support

### Python, JavaScript, and Go

For Python, JavaScript, and Go Lambda functions, FIPS compliance is controlled using the `DD_LAMBDA_FIPS_MODE` environment variable:

- In GovCloud environments, `DD_LAMBDA_FIPS_MODE` defaults to `true`.
- In commercial regions, `DD_LAMBDA_FIPS_MODE` defaults to `false`.

When FIPS mode is enabled:

- AWS FIPS endpoints are used for Datadog API key lookups in AWS secure datastores.
- Direct metric submission to the Datadog API is disabled, requiring the FIPS-compliant extension for metric submission.

### Ruby, .NET, and Java

Ruby, .NET, and Java runtime libraries do not require the `DD_LAMBDA_FIPS_MODE` environment variable as these runtimes do not:

- Contact AWS APIs directly
- Send metrics directly to Datadog

## Installation and Configuration

To use FIPS-compliant monitoring for your AWS Lambda functions:

1. **Select the FIPS-compliant extension layer**:
   - Use the appropriate FIPS extension layer ARN for your architecture (x86 or ARM) and region (commercial or GovCloud).

2. **Configure environment variables**:
   - For GovCloud environments, `DD_LAMBDA_FIPS_MODE` is enabled by default.
   - For commercial regions, set `DD_LAMBDA_FIPS_MODE=true` to enable FIPS mode.
   - For complete end-to-end FIPS compliance, set `DD_SITE` to `ddog-gov.com` to send data to the US1-FED site.

3. **Follow the standard installation instructions**:
   - Refer to the [installation guides][1] for language-specific configurations.
   - Use the FIPS extension layer ARNs instead of the standard extension layers.

For detailed installation instructions specific to your language runtime and deployment method, see the [installation documentation][1].

## Limitations and Considerations

- **End-to-end FIPS Compliance**: For complete FIPS compliance, the FIPS-compliant Lambda components must be used to send telemetry to the US1-FED region (`ddog-gov.com`). While the Lambda components themselves implement FIPS-compliant cryptography regardless of the destination, only the US1-FED site has FIPS-compliant intake endpoints.

- **Customer Responsibility**: You, the Datadog customer, are responsible for:
  - The security posture of your own Lambda function code
  - Ensuring all other code you may be running in your Lambda execution environment maintains FIPS compliance as required

- **FIPS Compliance Scope**: FIPS compliance only applies to communication between the Datadog Lambda components and Datadog's intake API endpoints. Other forms of communication originating from or terminating at your Lambda functions are not made FIPS-compliant by this solution.

- **Version Requirements**: Use the latest versions of the Datadog Lambda extension and libraries to ensure full functionality and up-to-date security.

## Further Reading

- [Agent FIPS Compliance][2] - Note: these guidelines apply to Agent deployments only and not to serverless environments.
- [AWS Lambda Security Overview][3] - AWS's documentation on Lambda security and compliance.


[1]: /serverless/aws_lambda/installation/
[2]: /agent/configuration/fips-compliance/
[3]: https://docs.aws.amazon.com/whitepapers/latest/security-overview-aws-lambda/lambda-and-compliance.html
