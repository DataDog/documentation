---
title: Ruby Applications
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: 'GitHub'
      text: 'Ruby Datadog Library source code'
    - link: "/security_platform/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Rules"
---

{{% appsec-getstarted %}}

## Get started

1. **Update your gem file to include the Datadog library**:
   ```
   gem 'ddtrace', '1.0.0.beta1'
   ```
   For information about which language and framework versions are supported by the library, see [Compatibility][1].

2. **Enable Application Security**, either in your code:
   ```
   require 'datadog/security'
   Datadog.configure do |c|
     c.appsec.instrument :rails

     # not needed if `gem 'ddtrace', require: 'ddtrace/auto_instrument'` is used
     c.tracing.instrument :rails
   end
   ```
   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:

```
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding this in the  environment section:

```
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Initialize Application Security in your code or set `DD_APPSEC_ENABLED` environment variable to true in your service invocation:
```
env DD_APPSEC_ENABLED=true rails server
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2 %}}

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/application_security/setup_and_configure/?code-lang=ruby#compatibility
