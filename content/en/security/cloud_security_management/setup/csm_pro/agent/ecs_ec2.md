---
title: Enabling CSM Enterprise on ECS EC2
kind: documentation
code_lang: ecs_ec2
type: multi-code-lang
code_lang_weight: 70 # a number that represents relative weight. 
---

The following instructions enable container image metadata collection and [Software Bill of Materials (SBOM)][1] collection in the Datadog Agent for [CSM Vulnerabilities][2]. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

1. Add the following environment variables to your `datadog-agent` container definition:

    ```yaml
    {
        "containerDefinitions": [
            {
                "name": "datadog-agent",
                ...
                "environment": [
                  ...
                  {
                    "name": "DD_CONTAINER_IMAGE_ENABLED",
                    "value": "true"
                  },
                  {
                    "name": "DD_SBOM_ENABLED",
                    "value": "true"
                  },
                  {
                    "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                    "value": "true"
                  }
                ]
            }
        ]
      ...
    }
    ```

2. If the Agent fails to extract the SBOM from the container image, increase the Agent memory in the container definition:

    ```yaml
    {
        "containerDefinitions": [
            {
                "name": "datadog-agent",
                "memory": 256,
                ...
            }
        ]
        ...
    }
    ```

[1]: https://www.cisa.gov/sbom
[2]: /security/vulnerabilities
[7]: /containers/amazon_ecs/?tab=awscli#setup