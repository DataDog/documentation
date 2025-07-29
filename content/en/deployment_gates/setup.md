---
title: Set Up Deployment Gates
further_reading:
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
---

{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates are in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

Setting up Deployment Gates involves two steps:

1. Configure a gate and rules in the Datadog UI.
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

Each gate requires one or more rules. All rules must pass for the gate to succeed. For each rule, specify:

1. **Name**: Enter a descriptive label (for example, `Check all P0 monitors`).
2. **Type**: Select `Monitor` or `Faulty Deployment Detection`.
3. Additional settings based on the selected rule type. See [Rule types](#rule-types) for more information.
4. **Evaluation Mode**: Enable `Dry Run` to test rule evaluation without affecting the gate result.


### Rule types

{{< tabs >}}
{{% tab "Monitors" %}}
This rule type evaluates the state of your monitors. The evaluation fails if:
- No monitors match the query.
- More than 50 monitors match the query.
- Any matching monitor is in `ALERT` or `NO_DATA` state.

#### Configuration settings

In the **Query** field, enter a monitor query using [Search Monitor syntax][1]. Use the following syntax to filter on specific tags:
* Monitor static tags - `service:transaction-backend`
* Tags within the monitor's query - `scope:"service:transaction-backend"`
* [Tags within monitor "group by"][2] - `group:"service:transaction-backend"`

#### Example queries

* `env:prod service:transaction-backend`
* `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
* `tag:"use_deployment_gates" team:payment`
* `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

#### Notes
* `group` filters evaluate only matching groups.
* Muted monitors are automatically excluded (the query always includes `muted:false`).

[1]: /monitors/manage/search/
[2]: /monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
This rule type uses Watchdog's [APM Faulty Deployment Detection][1] to compare the deployed version against previous versions of the same service. It can detect:
* New types of errors
* Significant increases in error rates

#### Configuration settings

* **Operation Name**: Auto-populated from the service's [APM primary operation][3] settings.
* **Excluded Resources**: Enter a comma-separated list of [APM resources][2] to ignore (such as low-volume or low-priority endpoints).

#### Notes
- For optimal analysis confidence, wait at least 15 minutes after a deployment starts before evaluating the gate.
- The rule is evaluated for each [additional primary tag][4] value as well as an aggregate analysis. If you only want to consider a single primary tag, you can specify it in the [evaluation query](#evaluate-a-deployment-gate) (see below).
- New errors and error rate increases are detected at the resource level.
- This rule type does not support services marked as `database` or `inferred service`.

[1]: /watchdog/faulty_deployment_detection/
[2]: /tracing/services/resource_page/
[3]: /tracing/guide/configuring-primary-operation/#primary-operations
[4]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## Evaluate a Deployment Gate

After a gate is configured with at least one rule, you can evaluate the gate while deploying the related service with an API call: 

```bash
curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/unstable/deployments/gates/evaluate" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
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

If a 200 HTTP status code is returned, the response is in the following format:

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.{{< region-param key="dd_site" >}}/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.{{< region-param key="dd_site" >}}/monitors/34330981",
                   "dry_run": true
               }
           ]
       }
   }
}
```

If the field `data.attributes.dry_run` is `true`, the field `data.attributes.gate_status` is always `pass`. 

### Integration examples

{{< tabs >}}
{{% tab "Generic script" %}}
Use this script as a starting point. For the API_URL variable, be sure to replace `<YOUR_DD_SITE>` with your [Datadog site name][1] (for example, {{< region-param key="dd_site" code="true" >}}).

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
API_URL="https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluate"
API_KEY="<YOUR_API_KEY>"

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

current_attempt=0
while [ $current_attempt -lt $MAX_RETRIES ]; do
   current_attempt=$((current_attempt + 1))
   RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
       -H "Content-Type: application/json" \
       -H "DD-API-KEY: $API_KEY" \
       -d "$PAYLOAD")
   
   # Extracts the last 3 digits of the status code
   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)
   
   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       # Status code 5xx indicates a server error, so the call is retried
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue
   
   elif [ ${HTTP_CODE} -ne 200 ]; then
       # Only 200 is an expected status code
       echo "Unexpected HTTP Code ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi
   
   # At this point, we have received a 200 status code. So, we check the gate status returned
   GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')
   
   if [[ "$GATE_STATUS" == "pass" ]]; then
       echo "Gate evaluation PASSED"
       exit 0
   else
       echo "Gate evaluation FAILED"
       exit 1
   fi
done

# If we arrive here, it means that we received several 5xx errors from the API. To not block deployments, we can treat this case as a success
echo "All retries exhausted, but treating 5xx errors as success."
exit 0
```

The script has the following characteristics:

* It receives three inputs: `service`, `environment`, and `version` (optionally add `identifier` and `primary_tag` if needed). The `version` is only required if one or more APM Faulty Deployment Detection rules are evaluated.  
* It sends a request to the Deployment Gate API and writes the output to the `response.txt` file.
* It checks the HTTP response status code of the response, and does the following depending on the response code:
  * 5xx: Retries the call (up to 3 times) with a delay of 5 seconds.
  * Not 200 (for example, 404): Prints the resulting error and fails.
  * 200: Checks the gate evaluation status returned (under `data.attributes.gate_status`) and passes or fails the script based on its value.  
* If all the retries are exhausted (that is, several 5xx responses returned), the script does not return a failure to be resilient to API failures.

This is a general behavior, and you should change it based on your personal use case and preferences. The script uses `curl` (to perform the request) and `jq` (to process the returned JSON). If those commands are not available, install them at the beginning of the script (for example, by adding `apk add --no-cache curl jq`).

[1]: /getting_started/site/
{{% /tab %}}
{{% tab "Argo Rollouts" %}}
To call Deployment Gates from an Argo Rollouts Kubernetes Resource, you can create an [AnalysisTemplate][1] or a [ClusterAnalysisTemplate][1]. The template should contain a Kubernetes job that is used to perform the analysis.

Use this script as a starting point. For the API_URL variable, be sure to replace `<YOUR_DD_SITE>` with your [Datadog site name][3] (for example, {{< region-param key="dd_site" code="true" >}}).

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
                    image: alpine:latest
                    command: ["/bin/sh", "-c"]
                    args:
                      - |
                        apk add --no-cache curl jq

                        # Configuration
                        MAX_RETRIES=3
                        DELAY_SECONDS=5
                        API_URL="https://api.<YOUR_DD_SITE>/api/unstable/deployments/gates/evaluate"
                        API_KEY="<YOUR_API_KEY>"

                        PAYLOAD='{
                          "data": {
                            "type": "deployment_gates_evaluation_request",
                            "attributes": {
                              "service": "{{ args.service }}",
                              "env": "{{ args.env }}",
                              "version": "{{ args.version }}",
                            }
                          }
                        }'

                        current_attempt=0
                        while [ $current_attempt -lt $MAX_RETRIES ]; do
                          current_attempt=$((current_attempt + 1))
                          RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
                              -H "Content-Type: application/json" \
                              -H "DD-API-KEY: $API_KEY" \
                              -d "$PAYLOAD")
                          
                          # Extracts the last 3 digits of the status code
                          HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
                          RESPONSE_BODY=$(cat response.txt)
                          
                          if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
                              # Status code 5xx indicates a server error, so the call is retried
                              echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
                              sleep $DELAY_SECONDS
                              continue
                          
                          elif [ ${HTTP_CODE} -ne 200 ]; then
                              # Only 200 is an expected status code
                              echo "Unexpected HTTP Code ($HTTP_CODE): $RESPONSE_BODY"
                              exit 1
                          fi
                          
                          # At this point, we have received a 200 status code. So, we check the gate status returned
                          GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')
                          
                          if [[ "$GATE_STATUS" == "pass" ]]; then
                              echo "Gate evaluation PASSED"
                              exit 0
                          else
                              echo "Gate evaluation FAILED"
                              exit 1
                          fi
                        done

                        # If we arrive here, it means that we received several 5xx errors from the API. To not block deployments, we can treat this case as a success
                        echo "All retries exhausted, but treating 5xx errors as success."
                        exit 0
```

* The analysis template can receive arguments from the Rollout resource. In this case, the arguments are `service`, `env`, and any other optional fields needed (such as `version`). For more information, see the [official Argo Rollouts docs][2].
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
[2]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[3]: /getting_started/site/

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