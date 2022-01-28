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
---

{{% appsec-getstarted %}}

## Get started

1. **Update your gem file to include the Datadog library**:
   ```
   gem install ddtrace
   ```

2. **Enable Application Security**, either in your code:
   ```
   # config/initializers/datadog-tracer.rb
   
   Datadog.configure do |c|
     c.appsec.enabled: true
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
