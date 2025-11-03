---
title: Set Up Deployment Gates
description: "Configure gates and rules in Datadog UI, then integrate with deployment pipelines using the datadog-ci CLI, Argo Rollouts, or API calls."
further_reading:
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
---

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

The Deployment Gates product consists of two main components:

- A **Gate** is defined for a service and environment, and contains one or more rules to evaluate.
- A **Rule** is a type of evaluation performed as part of a gate, such as checking the status of a set of monitors.

Setting up Deployment Gates involves two steps:

1. Configure the gate and rules in the Datadog UI.
2. Update your deployment pipeline to interact with the Deployment Gates API.

## Create a Deployment Gate

1. Go to [**Software Delivery > Deployment Gates > Configuration**][1].
2. Click **Create Gate**.
3. Configure the following settings:
   - **Service**: The service name (example: `transaction-backend`).
   - **Environment**: The target environment (example: `dev`).
   - **Identifier** (optional, default value is `default`): Unique name for multiple gates on the same service/environment. This can be used to:
     - Allow different deployment strategies (example: `fast-deploy` vs `default`)
     - Distinguish deployment phases (example: `pre-deploy` vs `post-deploy`)
     - Define canary stages (example: `pre-deploy` vs `canary-20pct`)
   - **Evaluation Mode**: Enable `Dry Run` to test gate behavior without impacting deployments. The evaluation of
a dry run gate always responds with a pass status, but the in-app result is the real status based
on rules evaluation. This is particularly useful when performing an initial evaluation of the
gate behavior without impacting the deployment pipeline.

## Add rules to a gate

Each gate requires one or more rules to evaluate. All rules must pass for the gate to succeed. For each rule, specify:

1. **Name**: Enter a descriptive label (for example, `Check all P0 monitors`).
2. **Type**: Select `Monitor` or `Faulty Deployment Detection`.
3. Additional settings based on the selected rule type. See [Rule types](#rule-types) for more information.
4. **Evaluation Mode**: When a rule is set as a `Dry Run`, its result is not taken into account when computing the overall gate result.


### Rule types

{{< tabs >}}
{{% tab "Monitors" %}}
The Monitors rule allows you to evaluate the state of a set of monitors over a configurable period of time. It will fail if at any time during the evaluation period:
- No monitors match the query.
- More than 50 monitors match the query.
- Any matching monitor is in `ALERT` or `NO_DATA` state.

#### Configuration settings

* **Search Query**: Enter the query that is used to find the monitors to evaluate, based on the [Search Monitor syntax][1]. Use the following syntax to filter on specific monitors tags:
  * Monitor static tags - `service:transaction-backend`
  * Tags within the monitor's query - `scope:"service:transaction-backend"`
  * Tags within a [monitor grouping][2] - `group:"service:transaction-backend"`
* **Duration**: Enter the period of time (in seconds) for which the matching monitors should be evaluated. The default duration is 0, which means that monitors are evaluated instantly.

#### Example queries

* `env:prod service:transaction-backend`
* `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
* `tag:"use_deployment_gates" team:payment`
* `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

#### Notes
* `group` filters evaluate only matching groups.
* Muted monitors are automatically excluded from the evaluation (the query always includes `muted:false`).

[1]: /monitors/manage/search/
[2]: /monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
This rule type uses Watchdog's [APM Faulty Deployment Detection][1] analysis to compare the deployed version against previous versions of the same service. The analysis detects:
* New types of errors.
* Significant increases in error rates compared to previous versions.

The analysis is automatically done for all APM-instrumented services, and no prior setup is required.

#### Configuration settings

* **Operation Name**: Auto-populated from the service's [APM primary operation][3] settings.
* **Duration**: Enter the period of time (in seconds) for which the analysis should be done. For optimal analysis confidence, this value should be at least 900 seconds (15 minutes) after a deployment starts.
* **Excluded Resources**: Enter a comma-separated list of [APM resources][2] to ignore (such as low-volume or low-priority endpoints).

#### Notes
- The rule is evaluated for each [additional primary tag][4] value as well as an aggregate analysis. If you only want to consider a single primary tag, you can specify it when [requesting a gate evaluation](#evaluate-deployment-gates) (see below).
- New errors and error rate increases are detected at the resource level.
- This rule type does not support services marked as `database` or `inferred service`.

[1]: /watchdog/faulty_deployment_detection/
[2]: /tracing/services/resource_page/
[3]: /tracing/guide/configuring-primary-operation/#primary-operations
[4]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Evaluate Deployment Gates

Once you have configured the gates and rules, you can request a gate evaluation when deploying the related service, and decide whether to block or continue the deployment based on the result.

A gate evaluation can be requested in several ways:

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
The [datadog-ci][1] `deployment gate` command includes all the required logic to evaluate Deployment Gates in a single command:

```bash
datadog-ci deployment gate --service transaction-backend --env staging
```

If the Deployment Gate being evaluated contains APM Faulty Deployment Detection rules, you must also specify the version (for example, `--version 1.0.1`).

The command has the following behavior:
* It sends a request to start the gate evaluation and blocks until the evaluation is complete.
* It provides a configurable timeout to determine the maximum amount of time to wait for an evaluation to complete.
* It has built-in automatic retries for errors.
* It allows you to customize its behavior in case of unexpected Datadog errors with the `--fail-on-error` parameter.

Note that the `deployment gate` command is available in datadog-ci versions v3.17.0 and above.

**Required environment variables**:
* `DD_API_KEY`: Your [API key][2], used to authenticate the requests.
* `DD_APP_KEY`: Your [Application key][3], used to authenticate the requests.
* `DD_BETA_COMMANDS_ENABLED=1`: The `deployment gate` command is a beta command, so datadog-ci needs to be run with beta commands enabled.

For complete configuration options and detailed usage examples, refer to the [`deployment gate` command documentation][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
You can call Deployment Gates from an Argo Rollouts Kubernetes Resource by creating an [AnalysisTemplate][1] or a [ClusterAnalysisTemplate][1]. The template should contain a Kubernetes job that executes the [datadog-ci deployment gate command][7] to interact with the Deployment Gates API.

Use the template below as a starting point:
- Replace `<YOUR_DD_SITE>` below with your [Datadog site name][2] (for example, {{< region-param key="dd_site" code="true" >}}).
- Define the [API key][5] and [application key][6] as environment variables. The example below relies on a [Kubernetes Secret][3] called `datadog` holding two data values: `api-key` and `app-key`. Alternatively, you can also pass the values in plain text using `value` instead of `valueFrom` in the script below.

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

* The analysis template can receive arguments from the Rollout resource. In this case, the arguments are `service` and `env`. Add any other optional fields if needed (such as `version`). For more information, see the [official Argo Rollouts docs][4].
* The `ttlSecondsAfterFinished` field removes the finished jobs after 5 minutes.
* The `backoffLimit` field is set to 0 as the job might fail if the gate evaluation fails, and it should not be retried in that case.

After you have created the analysis template, reference it from the Argo Rollouts strategy:

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
              - name: version #Only required if one or more APM Faulty Deployment Detection rules are evaluated
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
The [`Datadog Deployment Gate GitHub Action`][4] includes all the required logic to evaluate a Deployment Gate during the deployment of a service.

Add a `DataDog/deployment-gate-github-action` step to your existing deployment workflow, for example:

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

      - name: Deploy
        if: success()
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

If the Deployment Gate being evaluated contains APM Faulty Deployment Detection rules, you must also specify the version (for example, `version: 1.0.1`).
The action has the following behavior:
* It sends a request to start the gate evaluation and blocks until the evaluation is complete.
* It provides a configurable timeout to determine the maximum amount of time to wait for an evaluation to complete.
* It has built-in automatic retries for errors.
* It allows you to customize its behavior in case of unexpected Datadog errors with the `fail-on-error` parameter.

**Required environment variables**:
* `DD_API_KEY`: Your [API key][2], used to authenticate the requests.
* `DD_APP_KEY`: Your [Application key][3], used to authenticate the requests.

For complete configuration options and detailed usage examples, see the [`DataDog/deployment-gate-github-action` repository][4].

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "Generic script" %}}

Use this script as a starting point. Be sure to replace the following:

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
API_URL="https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluation"
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

   # Extracts the last 3 digits of the status code
   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)

   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       # Status code 5xx indicates a server error, so the call is retried
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue

   elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
       # 4xx errors are client errors and not retriable
       echo "Client error ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi

   # Successfully started evaluation, extract evaluation_id
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

  # Check if we've exceeded the maximum polling time
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
      # Evaluation might not have started yet, retry after a short delay
      echo "Evaluation not ready yet (404), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
      echo "Server error ($HTTP_CODE) while polling, retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
      # 4xx errors (except 404) are client errors and not retriable
      echo "Client error ($HTTP_CODE) while polling: $RESPONSE_BODY"
      exit 1
  fi

  # Check gate status
  GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

  if [ "$GATE_STATUS" = "pass" ]; then
      echo "Gate evaluation PASSED"
      exit 0
  elif [ "$GATE_STATUS" = "fail" ]; then
      echo "Gate evaluation FAILED"
      exit 1
  else
      # Treat any other status (in_progress, unexpected, etc.) as still in progress
      echo "Evaluation still in progress (status: $GATE_STATUS), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  fi
done
```

The script has the following characteristics:

* It receives three inputs: `service`, `environment`, and `version` (optionally add `identifier` and `primary_tag` if needed). The `version` is only required if one or more APM Faulty Deployment Detection rules are evaluated.
* It sends a request to start the evaluation and records the evaluation_id. It handles various HTTP response codes appropriately:
  * 5xx: Server errors, retries with delay.
  * 4xx: Client error, evaluation fails.
  * 2xx: Evaluation started successfully.
* It polls the evaluation status endpoint using the evaluation_id until the evaluation is complete.
* It handles various HTTP response codes appropriately:
  * 5xx: Server errors, retries with delay.
  * 404: Gate evaluation not started yet, retries with delay.
  * 4xx errors (except 404): Client error, evaluation fails.
  * 2xx: Successful response, check for gate status and retry with delay if not complete yet.
* The script polls every 10 seconds indefinitely until the evaluation completes or the maximum polling time (10800 seconds = 3 hours by default) is reached.
* If all the retries are exhausted for the initial request (5xx responses), the script treats this as success to be resilient to API failures.

This is a general behavior, and you should change it based on your personal use case and preferences. The script uses `curl` (to perform the request) and `jq` (to process the returned JSON). If those commands are not available, install them at the beginning of the script (for example, by adding `apk add --no-cache curl jq`).

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "Direct API calls" %}}

Deployment Gate evaluations are asynchronous, as the evaluation process can take some time to complete. When you trigger an evaluation, it's started in the background, and the API returns an evaluation ID that can be used to track its progress. The high-level interaction with the Deployment Gates API is the following:

- First, request a Deployment Gate evaluation, which initiates the process and returns an evaluation ID.
- Then, periodically poll the evaluation status endpoint using the evaluation ID to retrieve the result when the evaluation is complete. Polling every 10-20 seconds is recommended.

A Deployment Gate evaluation can be requested with an API call.

Be sure to replace the following:
- `<YOUR_DD_SITE>`: Your [Datadog site name][1] (for example, {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: Your [API key][2]
- `<YOUR_APP_KEY>`: Your [application key][3]

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluation" \
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
      "identifier": "my-custom-identifier", # Optional, defaults to "default"
      "version": "v123-456",                # Required for APM Faulty Deployment Detection rules
      "primary_tag": "region:us-central-1"  # Optional, scopes down APM Faulty Deployment Detection rules analysis to the selected primary tag
    }
  }
}'
```

**Note**: A 404 HTTP response can be because the gate was not found, or because the gate was found but has no rules.

If the gate evaluation was successfully started, a 202 HTTP status code is returned. The response is in the following format:

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

You can fetch the status of a gate evaluation by polling an additional API endpoint using the gate evaluation ID:

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**Note**: If you call this endpoint too quickly after requesting the evaluation, a 404 HTTP response may be returned because the evaluation did not start yet. If this is the case, retry a few seconds later.

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

The field `data.attributes.gate_status` contains the result of the evaluation. It can contain one of these values:

* `in_progress`: The Deployment Gate evaluation is still in progress; you should continue polling.
* `pass`: The Deployment Gate evaluation passed.
* `fail`: The Deployment Gate evaluation failed.

**Note**: If the field `data.attributes.dry_run` is `true`, the field `data.attributes.gate_status` is always `pass`.

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## Recommendation for first-time onboarding

When integrating Deployment Gates into your Continuous Delivery workflow, an evaluation phase is recommended to confirm the product is working as expected before it impacts deployments. You can do this using the Dry Run evaluation mode and the **Deployment Gates Evaluations** page:
1. Create a gate for a service and set the evaluation mode as `Dry Run`.
2. Add the gate evaluation in your deployment process. As the evaluation mode is dry run, the Deployment Gates API response always contains a `pass` status and the deployments are not impacted by the gate result.
3. After a certain period of time (for example, 1-2 weeks), check the gate and rule executions in the UI to see what were the statuses of the gates and rules evaluated. On the contrary to the API responses, the gate status in the UI doesn't take into consideration the evaluation mode (`Dry Run` or `Active`). It means you can understand when the gate would have failed and what was the reason behind it.
4. When you are confident that the gate behavior is as you expect, edit the gate and switch the evaluation mode from `Dry Run` to `Active`. Afterwards, the API starts returning the "real" status and deployments start getting promoted or rolled back based on the gate result.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployment-gates/gates
