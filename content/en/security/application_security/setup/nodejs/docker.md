---
title: Set up App and API Protection for Node.js in Docker
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
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
{{% aap/aap_and_api_protection_nodejs_setup_options platform="docker" %}}

{{% aap/aap_and_api_protection_nodejs_overview %}}

## Prerequisites

- Docker installed on your host
- Node.js application containerized with Docker
- Your Datadog API key
- Datadog Node.js tracing library (see [version requirements][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Docker](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}
{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### Manually enabling App and API Protection monitoring

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}

Add the Datadog Node.js library to your Dockerfile and configure environment variables:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

Add the Datadog Node.js library to your Dockerfile and configure environment variables:

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV DD_APPSEC_ENABLED=true
ENV DD_APM_TRACING_ENABLED=false
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>

# Start the application with the Datadog tracer
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% /collapse-content %}}

## 3. Run your application

Build your image and then run your container.

When running your container, make sure to:
1. Connect it to the same Docker network as the Datadog Agent.
2. Set the required environment variables.

```bash
docker run -d \
  --name your-nodejs-app \
  your-nodejs-app-image
```

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Node.js application, see the [Node.js App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/nodejs/compatibility
[2]: /security/application_security/setup/nodejs/troubleshooting
