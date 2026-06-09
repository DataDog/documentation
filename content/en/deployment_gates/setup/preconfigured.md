---
title: Set Up Preconfigured Deployment Gates
description: "Create gates and rules in Datadog ahead of time, then reference them by service and environment at deployment time."
further_reading:
- link: "/deployment_gates/setup/jit"
  tag: "Documentation"
  text: "Set up JIT Deployment Gates"
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
- link: "/api/latest/deployment-gates"
  tag: "API Reference"
  text: "Deployment Gates API reference"
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Deployment Gates are not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

With **preconfigured** Deployment Gates, gates and rules are persisted in Datadog and referenced by service and environment at evaluation time. Preconfigured gates are a good fit when you want to share rules across many deployments, manage configuration in Terraform, or let non-CI users edit rules in the Datadog UI.

Looking to define rules inline in your deployment config? See [JIT Deployment Gates][5].

## Create a gate

<div class="alert alert-info">In addition to using the Deployment Gates UI, you can manage gates and rules programmatically with the <a href="https://docs.datadoghq.com/api/latest/deployment-gates">Deployment Gates API</a> or <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">Datadog Terraform provider</a>.</div>

1. Go to [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6].
2. Click {{< ui >}}Create Gate{{< /ui >}}.
3. Configure the following settings:
   - {{< ui >}}Service{{< /ui >}}: The service name (example: `transaction-backend`).
   - {{< ui >}}Environment{{< /ui >}}: The target environment (example: `dev`).
   - {{< ui >}}Identifier{{< /ui >}} (optional, default value is `default`): Unique name for multiple gates on the same service/environment. Use this to:
     - Allow different deployment strategies (example: `fast-deploy` vs `default`)
     - Distinguish deployment phases (example: `pre-deploy` vs `post-deploy`)
     - Define canary stages (example: `pre-deploy` vs `canary-20pct`)
   - {{< ui >}}Evaluation Mode{{< /ui >}}: Enable {{< ui >}}Dry Run{{< /ui >}} to test gate behavior without impacting deployments. The evaluation of a dry-run gate always responds with a pass status, but the in-app result reflects the real evaluation. This is useful when performing an initial evaluation of the gate behavior without impacting the deployment pipeline.

## Add rules to a gate

Each gate requires one or more rules to evaluate. All rules must pass for the gate to succeed. For each rule, specify:

1. {{< ui >}}Name{{< /ui >}}: A descriptive label (for example, `Check all P0 monitors`).
2. {{< ui >}}Type{{< /ui >}}: Select {{< ui >}}Monitor{{< /ui >}} or {{< ui >}}Faulty Deployment Detection{{< /ui >}}.
3. Additional settings based on the selected rule type. See [Rule types](#rule-types) for the available options.
4. {{< ui >}}Evaluation Mode{{< /ui >}}: When a rule is set as a {{< ui >}}Dry Run{{< /ui >}}, its result is not taken into account when computing the overall gate result.

## Rule types

For the full schema and all available options, see the [Deployment Gates API reference][4].

{{< tabs >}}
{{% tab "Monitors" %}}
The Monitor rule evaluates the state of a set of monitors over a configurable period of time. It fails if at any time during the evaluation period:

- No monitors match the query.
- More than 50 monitors match the query.
- Any matching monitor is in `ALERT` or `NO_DATA` state.

##### Configuration settings

- {{< ui >}}Search Query{{< /ui >}}: The query used to find the monitors to evaluate, based on the [Search Monitor syntax][1]. Filter on monitor tags:
  - Monitor static tags: `service:transaction-backend`
  - Tags within the monitor's query: `scope:"service:transaction-backend"`
  - Tags within a [monitor grouping][2]: `group:"service:transaction-backend"`
- {{< ui >}}Duration{{< /ui >}}: The period of time (in seconds) for which the matching monitors are evaluated. Default is 0 (monitors are evaluated instantly). Maximum is 7200 seconds (2 hours).

##### Example queries

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

##### Notes
- `group` filters evaluate only matching groups.
- Muted monitors are automatically excluded from the evaluation (the query always includes `muted:false`).

[1]: /monitors/manage/search/
[2]: /monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
This rule type uses Watchdog's [APM Faulty Deployment Detection][1] analysis to compare the deployed version against previous versions of the same service. The analysis detects:

- New types of errors.
- Significant increases in error rates compared to previous versions.

The analysis is automatically performed for all APM-instrumented services, and no prior setup is required.

##### Configuration settings

- {{< ui >}}Operation Name{{< /ui >}}: Auto-populated from the service's [APM primary operation][3] settings.
- {{< ui >}}Duration{{< /ui >}}: The period of time (in seconds) for which the analysis runs. For optimal analysis confidence, this value should be at least 900 seconds (15 minutes) after a deployment starts. Maximum is 7200 seconds (2 hours).
- {{< ui >}}Excluded Resources{{< /ui >}}: A comma-separated list of [APM resources][2] to ignore (such as low-volume or low-priority endpoints).

##### Notes
- The rule is evaluated for each [additional primary tag][4] value as well as an aggregate analysis. To consider only a single primary tag, specify it when [requesting a gate evaluation](#evaluate-a-gate-from-your-pipeline).
- New errors and error rate increases are detected at the resource level.
- This rule type does not support services marked as `database` or `inferred service`.

[1]: /watchdog/faulty_deployment_detection/
[2]: /tracing/services/resource_page/
[3]: /tracing/guide/configuring-primary-operation/#primary-operations
[4]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Evaluate a gate from your pipeline

After the gate is configured, request an evaluation when deploying the related service, and decide whether to block or continue the deployment based on the result.

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
The [datadog-ci][1] `deployment gate` command runs the evaluation in a single command:

```bash
datadog-ci deployment gate --service transaction-backend --env staging
```

If the Deployment Gate contains APM Faulty Deployment Detection rules, also specify the version (for example, `--version 1.0.1`).

The command:

- Sends a request to start the gate evaluation and blocks until the evaluation is complete.
- Provides a configurable timeout for how long to wait for an evaluation.
- Has built-in automatic retries for errors.
- Accepts `--fail-on-error` to customize behavior on unexpected Datadog errors.

The `deployment gate` command is available in datadog-ci versions v3.17.0 and above.

**Required environment variables**:

- `DD_API_KEY`: Your [API key][2].
- `DD_APP_KEY`: Your [Application key][3].
- `DD_BETA_COMMANDS_ENABLED=1`: The `deployment gate` command is a beta command.

For complete configuration options and usage examples, see the [`deployment gate` command documentation][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
Call Deployment Gates from an Argo Rollouts Kubernetes Resource by creating an [AnalysisTemplate][1] or a [ClusterAnalysisTemplate][1]. The template runs the [datadog-ci deployment gate command][7] to interact with the Deployment Gates API.

Use the template below as a starting point:

- Replace `<YOUR_DD_SITE>` with your [Datadog site name][2] (for example, {{< region-param key="dd_site" code="true" >}}).
- Define the [API key][5] and [application key][6] as environment variables. The example uses a [Kubernetes Secret][3] called `datadog` with two data values: `api-key` and `app-key`. You can also pass the values in plain text with `value` instead of `valueFrom`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ClusterAnalysisTemplate
metadata:
  name: datadog-job-analysis
spec:
  args:
    - name: service
    - name: env
  metrics:
    - name: datadog-job
      provider:
        job:
          spec:
            ttlSecondsAfterFinished: 300
            backoffLimit: 0
            template:
              spec:
                restartPolicy: Never
                containers:
                  - name: datadog-check
                    image: datadog/ci:v3.17.0
                    env:
                      - name: DD_BETA_COMMANDS_ENABLED
                        value: "1"
                      - name: DD_SITE
                        value: "<YOUR_DD_SITE>"
                      - name: DD_API_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: api-key
                      - name: DD_APP_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: app-key
                    command: ["/bin/sh", "-c"]
                    args:
                      - datadog-ci deployment gate --service {{ args.service }} --env {{ args.env }}
```

- The analysis template can receive arguments from the Rollout resource (such as `service`, `env`, and `version`). For more information, see the [official Argo Rollouts docs][4].
- `ttlSecondsAfterFinished` removes finished jobs after 5 minutes.
- `backoffLimit` is set to 0 because the job should not be retried if the gate evaluation fails.

After you create the analysis template, reference it from the Argo Rollouts strategy:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollouts-demo
  labels:
    tags.datadoghq.com/service: transaction-backend
    tags.datadoghq.com/env: dev
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        ...
        - analysis:
            templates:
              - templateName: datadog-job-analysis
                clusterScope: true # Only needed for cluster analysis
            args:
              - name: env
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/env']
              - name: service
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/service']
              - name: version #Required for APM Faulty Deployment Detection rules
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/version']
        - ...
```

[1]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[2]: /getting_started/site/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "GitHub Actions" %}}
The [`Datadog Deployment Gate GitHub Action`][4] runs the evaluation as part of a workflow.

Add a `DataDog/deployment-gate-github-action` step to your existing deployment workflow:

```yaml
name: Deploy with Datadog Deployment Gate
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Canary
        run: |
          echo "Deploying canary release for service:'my-service' in 'production'. Version 1.0.1"
          # Your deployment commands here

      - name: Evaluate Deployment Gate
        uses: DataDog/deployment-gate-github-action@v1.0.0
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        with:
          service: my-service
          env: production
          identifier: default

      - name: Deploy
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

If the Deployment Gate contains APM Faulty Deployment Detection rules, also specify the version (for example, `version: 1.0.1`).

The action:

- Sends a request to start the gate evaluation and blocks until the evaluation is complete.
- Provides a configurable timeout for how long to wait for an evaluation.
- Has built-in automatic retries for errors.
- Accepts `fail-on-error` to customize behavior on unexpected Datadog errors.

**Required environment variables**:

- `DD_API_KEY`: Your [API key][2].
- `DD_APP_KEY`: Your [Application key][3].

For complete configuration options and usage examples, see the [`DataDog/deployment-gate-github-action` repository][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "Generic script" %}}

Use this script as a starting point. It evaluates a preconfigured gate without inline rules.

Replace the following:

- `<YOUR_DD_SITE>`: Your [Datadog site name][1] (for example, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: Your [API key][2]
- `<YOUR_APP_KEY>`: Your [application key][3]

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
POLL_INTERVAL_SECONDS=15
MAX_POLL_TIME_SECONDS=10800 # 3 hours
API_URL="https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation"
API_KEY="<YOUR_API_KEY>"
APP_KEY="<YOUR_APP_KEY>"

PAYLOAD=$(cat <<EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "$1",
      "env": "$2",
      "version": "$3"
    }
  }
}
EOF
)

# Step 1: Request evaluation
echo "Requesting evaluation..."
current_attempt=0
while [ $current_attempt -lt $MAX_RETRIES ]; do
   current_attempt=$((current_attempt + 1))
   RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
       -H "Content-Type: application/json" \
       -H "DD-API-KEY: $API_KEY" \
       -H "DD-APPLICATION-KEY: $APP_KEY" \
       -d "$PAYLOAD")

   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)

   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue
   elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
       echo "Client error ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi

   EVALUATION_ID=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.evaluation_id')
   if [ "$EVALUATION_ID" = "null" ] || [ -z "$EVALUATION_ID" ]; then
       echo "Failed to extract evaluation_id from response: $RESPONSE_BODY"
       exit 1
   fi

   echo "Evaluation started with ID: $EVALUATION_ID"
   break
done

if [ $current_attempt -eq $MAX_RETRIES ]; then
   echo "All retries exhausted for evaluation request, but treating 5xx errors as success."
   exit 0
fi

# Step 2: Poll for results
echo "Polling for results..."
start_time=$(date +%s)
poll_count=0

while true; do
  poll_count=$((poll_count + 1))
  current_time=$(date +%s)
  elapsed_time=$((current_time - start_time))

  if [ $elapsed_time -ge $MAX_POLL_TIME_SECONDS ]; then
      echo "Evaluation polling timeout after ${MAX_POLL_TIME_SECONDS} seconds"
      exit 1
  fi

  RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X GET "$API_URL/$EVALUATION_ID" \
      -H "DD-API-KEY: $API_KEY" \
      -H "DD-APPLICATION-KEY: $APP_KEY")

  HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
  RESPONSE_BODY=$(cat response.txt)

  if [ ${HTTP_CODE} -eq 404 ]; then
      echo "Evaluation not ready yet (404), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
      echo "Server error ($HTTP_CODE) while polling, retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
      echo "Client error ($HTTP_CODE) while polling: $RESPONSE_BODY"
      exit 1
  fi

  GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

  if [ "$GATE_STATUS" = "pass" ]; then
      echo "Gate evaluation PASSED"
      exit 0
  elif [ "$GATE_STATUS" = "fail" ]; then
      echo "Gate evaluation FAILED"
      exit 1
  else
      echo "Evaluation still in progress (status: $GATE_STATUS), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  fi
done
```

The script:

- Receives three inputs: `service`, `environment`, and `version`. `version` is required if the gate has APM Faulty Deployment Detection rules. You can also add `identifier` and `primary_tag` if needed.
- Sends a request to start the evaluation and records the `evaluation_id`. Handles HTTP response codes:
  - 5xx: server error, retries with delay.
  - 4xx: client error, evaluation fails.
  - 2xx: evaluation started.
- Polls the evaluation status endpoint with the `evaluation_id` until the evaluation is complete:
  - 5xx: server error, retries with delay.
  - 404: evaluation not started yet, retries with delay.
  - 4xx (except 404): client error, evaluation fails.
  - 2xx: check `gate_status` and retry with delay if not complete.
- Polls every 15 seconds until the evaluation completes or the maximum polling time (10800 seconds = 3 hours by default) is reached.
- If all retries are exhausted for the initial request (5xx responses), the script treats this as success to be resilient to API failures.

Adapt the script to your use case. It uses `curl` (to perform the request) and `jq` (to process the returned JSON). If those commands are not available, install them at the beginning of the script (for example, with `apk add --no-cache curl jq`).

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "Direct API calls" %}}

Deployment Gate evaluations are asynchronous. When you trigger an evaluation, it's started in the background, and the API returns an evaluation ID that you can use to track its progress:

- First, request a Deployment Gate evaluation, which starts the process and returns an evaluation ID.
- Then, periodically poll the evaluation status endpoint with the evaluation ID to retrieve the result when the evaluation is complete. Polling every 10-20 seconds is recommended.

Replace the following:

- `<YOUR_DD_SITE>`: Your [Datadog site name][1] (for example, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: Your [API key][2]
- `<YOUR_APP_KEY>`: Your [application key][3]

Request an evaluation for a gate that already exists in Datadog:

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>" \
-d @- << EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "staging",
      "identifier": "my-custom-identifier",
      "version": "v123-456",
      "primary_tag": "region:us-central-1"
    }
  }
}
EOF
```

Optional attributes:

- `identifier`: Optional, defaults to `default`.
- `version`: Required for APM Faulty Deployment Detection rules.
- `primary_tag`: Optional, scopes down APM Faulty Deployment Detection analysis to the selected primary tag.

**Note**: A 404 HTTP response can mean the gate was not found, or the gate was found but has no rules.

If the gate evaluation was successfully started, a 202 HTTP status code is returned:

```json
{
   "data": {
       "id": "<random_response_uuid>",
        "type": "deployment_gates_evaluation_response",
        "attributes": {
            "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9"
        }
    }
}
```

The field `data.attributes.evaluation_id` contains the unique identifier for this gate evaluation.

Fetch the status of a gate evaluation by polling the status endpoint with the evaluation ID:

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**Note**: If you call this endpoint too soon after requesting the evaluation, a 404 HTTP response may be returned because the evaluation did not start yet. Retry a few seconds later.

When a 200 HTTP response is returned, it has the following format:

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_result_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": true
               }
           ]
       }
   }
}
```

The field `data.attributes.gate_status` contains the result of the evaluation, with one of these values:

- `in_progress`: The Deployment Gate evaluation is still in progress; continue polling.
- `pass`: The Deployment Gate evaluation passed.
- `fail`: The Deployment Gate evaluation failed.

**Note**: If the field `data.attributes.dry_run` is `true`, the field `data.attributes.gate_status` is always `pass`.

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## Onboarding in dry-run mode

When integrating Deployment Gates into your Continuous Delivery workflow, an evaluation phase helps confirm the product is working as expected before it impacts deployments. Use the Dry Run evaluation mode and the {{< ui >}}Deployment Gates Evaluations{{< /ui >}} page:

1. Create a gate for a service and set the {{< ui >}}Evaluation Mode{{< /ui >}} to {{< ui >}}Dry Run{{< /ui >}}.
2. Add the gate evaluation to your deployment process. While the gate is in dry-run mode, the API always returns `pass` and deployments are not impacted by the gate result.
3. After a period of time (for example, 1-2 weeks), check the gate and rule executions on the {{< ui >}}Deployment Gates Evaluations{{< /ui >}} page. The UI shows the real status, so you can see when the gate would have failed and the reason behind it.
4. When you are confident the gate behavior is as you expect, switch {{< ui >}}Evaluation Mode{{< /ui >}} from {{< ui >}}Dry Run{{< /ui >}} to {{< ui >}}Active{{< /ui >}}. Deployments are then promoted or rolled back based on the gate result.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /api/latest/deployment-gates
[5]: /deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
