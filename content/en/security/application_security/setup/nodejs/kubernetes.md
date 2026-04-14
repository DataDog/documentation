---
title: Set up App and API Protection for Node.js in Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---
{{% aap/aap_and_api_protection_nodejs_setup_options platform="kubernetes" %}}

{{% aap/aap_and_api_protection_nodejs_overview %}}

## Prerequisites

- Kubernetes cluster
- Node.js application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)
- Your Datadog API key
- Datadog Node.js tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Kubernetes](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}
{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Manually enabling App and API Protection monitoring

Ensure your Dockerfile includes the Datadog Node.js library:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .
RUN npm install

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Update your Kubernetes deployment to include the required environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-nodejs-app
spec:
  template:
    spec:
      containers:
      - name: your-nodejs-app
        image: your-nodejs-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Update your Kubernetes deployment to include the required environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-nodejs-app
spec:
  template:
    spec:
      containers:
      - name: your-nodejs-app
        image: your-nodejs-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
```

{{% /collapse-content %}}

## 3. Run your application

Apply your updated deployment:

```bash
kubectl apply -f your-deployment.yaml
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Node.js application, see the [Node.js App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/nodejs/compatibility
[2]: /security/application_security/setup/nodejs/troubleshooting
