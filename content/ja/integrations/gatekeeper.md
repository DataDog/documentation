---
"app_id": "gatekeeper"
"app_uuid": "9c48b05d-ee74-4557-818e-14456c6f427b"
"assets":
  "dashboards":
    "Gatekeeper base dashboard": assets/dashboards/gatekeeper_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": gatekeeper.constraints
      "metadata_path": metadata.csv
      "prefix": gatekeeper.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10148"
    "source_type_name": Gatekeeper
  "logs":
    "source": gatekeeper
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": ara.pulido@datadoghq.com
  "support_email": ara.pulido@datadoghq.com
"categories":
- cloud
- compliance
- configuration & deployment
- containers
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gatekeeper"
"integration_id": "gatekeeper"
"integration_title": "Gatekeeper"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gatekeeper"
"public_title": "Gatekeeper"
"short_description": "Gatekeeper integration"
"supported_os":
- linux
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Compliance"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  - "Category::Security"
  - "Supported OS::Linux"
  "configuration": "README.md#Setup"
  "description": Gatekeeper integration
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Gatekeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check collects metrics from [OPA Gatekeeper][1].

![Gatekeeper Overview Dashboard][2]

## Setup

Follow the instructions below to install and configure this check for an Agent running on a Kubernetes cluster. See also the [Autodiscovery Integration Templates][3] for guidance on applying these instructions.

### Installation

#### Agent versions >=7.26.0 or >=6.26.0

To use an integration from `integrations-extra` with the Docker Agent, Datadog recommends building the Agent with the integration installed. Use the following Dockerfile to build an updated version of the Agent that includes the `gatekeeper` integration from `integrations-extras`:

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### Agent versions <7.26.0 or <6.26.0

To install the gatekeeper check on your Kubernetes cluster:

1. Install the [developer toolkit][4].
2. Clone the `integrations-extras` repository:

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Update your `ddev` config with the `integrations-extras/` path:

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. To build the `gatekeeper` package, run:

   ```shell
   ddev -e release build gatekeeper
   ```

5. [Download the Agent manifest to install the Datadog Agent as a DaemonSet][5].
6. Create two `PersistentVolumeClaim`s, one for the checks code, and one for the configuration.
7. Add them as volumes to your Agent pod template and use them for your checks and configuration:

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

8. Deploy the Datadog Agent in your Kubernetes cluster:

   ```shell
   kubectl apply -f agent.yaml
   ```

9. Copy the integration artifact .whl file to your Kubernetes nodes or upload it to a public URL

10. Run the following command to install the integrations wheel with the Agent:

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
    ```

11. Run the following commands to copy the checks and configuration to the corresponding PVCs:

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Restart the Datadog Agent pods.

### Configuration

1. Edit the `gatekeeper/conf.yaml` file, in the `/confd` folder that you added to the Agent pod to start collecting your gatekeeper performance data. See the [sample gatekeeper/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7].

### Validation

[Run the Agent's status subcommand][8] and look for `gatekeeper` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "gatekeeper" >}}


### Events

Gatekeeper does not include any events.

### Service Checks
{{< get-service-checks-from-git "gatekeeper" >}}


## Troubleshooting

Need help? Contact [Datadog support][11].


[1]: https://github.com/open-policy-agent/gatekeeper
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png
[3]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/developers/integrations/python/
[5]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile
[6]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

