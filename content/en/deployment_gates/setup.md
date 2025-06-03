---
title: Set Up Deployment Gates
further_reading:
- link: "/deployment_gates/explore"
  tag: "Documentation"
  text: "Learn about the Deployment Gates explorer"
---

Setting up Deployment Gates involves two steps:

1. Configure your gate and rules in the Datadog UI
2. Update your deployment pipeline to use the Deployment Gates API

# Create a deployment gate

1. Go to [Software Delivery -> Deployment Gates -> Configuration][1].
2. Click `+ Create Gate` in the top right.
3. Configure the following settings:
   - **Service**: The service name (example: `transaction-backend`)
   - **Environment**: The target environment (example: `dev`)
   - **Identifier** (optional, default value is `default`): Unique name for multiple gates on the same service/environment. This can be used to:
     - Allow different deployment strategies (example: `fast-deploy` vs `default`)
     - Distinguish deployment phases (example: `pre-deploy` vs `post-deploy`)
     - Define canary stages (example: `pre-deploy` vs `canary-20pct`)
   - **Dry Run**: Enable to test gate behavior without impacting deployments. The evaluation of 
a dry run gate will always respond with a pass status, but the in-app result will be the real status based 
on rule evaluation. The dry run field is particularly useful when performing an initial evaluation of the 
gate behavior without impacting your deployment pipelines 

# Add rules to your gate

Each gate requires one or more rules. All rules must pass for the gate to succeed. For each rule, specify:

1. **Name**: Descriptive label (example: `Check all P0 monitors`).
2. **Dry Run**: Enable to test rule evaluation without affecting the gate result.
3. Additional settings based on rule type

## Rule types

{{< tabs >}}
{{% tab "Monitors" %}}
Monitor rules evaluate the state of your monitors. The rule fails if:
- No monitors match the query or more than 50 monitors are found
- Any matching monitor is in `ALERT` or `NO_DATA` state

**Configuration**:
1. Enter a monitor query using [Search Monitor syntax][2]
2. Optionally filter by [specific monitor groups][3]

Example queries:
```
service:transaction-backend env:prod
env:prod (group:"service:transaction-backend" OR scope:"service:transaction-backend")
tag:"use_deployment_gates" team:payment
tag:"use_deployment_gates" AND (NOT group:("team:frontend"))
```

**Notes**:
- `group` filters evaluate only matching groups
- Muted monitors are automatically excluded (the query always include `muted:false`)
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
This rule type uses Watchdog's [APM Faulty Deployment Detection (FDD)][4] to compare new service versions against previous behavior. It can detect:
* new types of errors
* significant increases in error rates.

**Configuration**:
1. **Excluded Resources**: List of [APM resources][5] to ignore (example: low-volume or low-priority endpoints).
2. **Primary Operation Name**: Auto-populated from your [APM primary operation][6] settings.

**Notes**:
- Analysis runs per [additional primary tag][8] value plus an aggregate analysis.
- New errors and error rate increases are detected at the resource level.
{{% /tab %}}
{{< /tabs >}}

# Evaluate a deployment gate

Once a gate is configured with at least one rule, you can evaluate the gate while you are deploying the related service via an API call: 

```bash
curl -X POST "https://api.datadoghq.com/api/unstable/deployments/gates/evaluate" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "staging",
      "identifier": "my-custom-identifier",  # Optional, defaults to "default"
      "version": "v123-456",                 # Required for APM Faulty Deployment Detection rules
      "primary_tag": "region:us-central-1"   # Optional, scopes down APM Faulty Deployment Detection analysis
    }
  }
}'
```

Note: A **404** HTTP response can be because the gate was not found, or because the gate was found but has 0 rules.

In case the **200** HTTP status code is returned, the response will be in the following format:

```jsonc
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass", // If "dry_run" is true, this field will always be “pass”. 
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": true
               },
               ...
           ]
       }
   }
}
```

## Integration examples

{{< tabs >}}
{{% tab "Generic script" %}}
Use this script as a starting point for your integration:

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
API_URL="https://api.datadoghq.com/api/unstable/deployments/gates/evaluate"
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

On a high-level, the script has the following characteristics:

* It receives three inputs: the service, the environment and the version (optionally add the identifier and the primary tag if needed). The version is only required if one or more FDD rules are evaluated.  
* It performs a request to the Deployment Gate API and writes the output to the response.txt file  
* It checks the status code of the response, and:  
  * If it’s 5xx, it retries the call (up to 3 times) with a delay of 5 seconds  
  * Otherwise, if it’s not 200 (for example, 404), it prints the resulting error and fails  
* If the status code is 200, it checks the gate evaluation status returned (under **data.attributes.gate\_status**) and passes/fails the script based on its value.  
* In case that all the retries were exhausted (i.e. several 5xx returned), it does not return a failure to be resilient to API failures.

This is a general behavior and should be changed based on your personal use case and preferences. The script uses **curl** (to perform the request) and **jq** (to process the returned JSON). In case those commands are not available, install them at the beginning of the script (for example by adding “**apk add \--no-cache curl jq**”).

{{% /tab %}}
{{% tab "Argo Rollout" %}}
To call deployment gates from an Argo Rollout Kubernetes Resource, you can create an [AnalysisTemplate][12] or a [ClusterAnalysisTemplate][13]. The template should contain a Kubernetes Job that will be used to perform the analysis:

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
                        <INSERT THE GENERAL SCRIPT FROM THE OTHER TAB>
```

* The analysis template can receive arguments from the Rollout resource. In this case, the arguments are `service`, `env` and any other optionnal fields needed. For more information, see the [official Argo Rollouts docs][14].
* The `ttlSecondsAfterFinished` field removes the finished jobs after 5 minutes.
* The `backoffLimit` field is set to 0 as the job might fail in case that the gate evaluation fails, and it should not be retried in that case.

When inserting the script, the payload should be modified to reference the arguments properly. For example `"service"` and `"env"` should be modified to `“{{ args.service }}”` and `“{{ args.env }}”`:

{{< code-block lang="bash" >}}
PAYLOAD='{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "{{ args.service }}",
      "env": "{{ args.env }}"
    }
  }
}'
{{< /code-block >}}

Once you have created the analysis template, reference it from the Argo Rollout strategy:

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
                clusterScope: true # only needed for cluster analysis
            args:
              - name: env
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/env']
              - name: service
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/service']
        - ...
```

{{% /tab %}}
{{< /tabs >}}

## Recommendation for first time onboardings

When you are integrating the Deployment Gates product into your Continuous Delivery workflow, an evaluation phase is recommended to confirm that the product is working as you expect before it impacts your deployments. This can be done using the Dry Run evaluation mode and the Gates Executions page:
1. Create a new Gate for your service and set the evaluation mode as `Dry Run`.
2. Add the Gate evaluation in your deployment process. As the evaluation mode is dry run, the Deployment Gates API response will always contain a `pass` status and the deployments will not be impacted by the gate result.
3. After a certain period of time (for example, 1-2 weeks), check the gate and rule executions in the UI to see what were the statuses of the gates and rules evaluated. On the contrary to the API responses, the Gate status in the UI doesn't take into consideration the evaluation mode (`Dry-run` or `Active`). It means you can understand when the gate would have failed and what was the reason behind it.
4. When you are confident that the gate behavior is as you expect, edit the gate and switch the evaluation mode from `Dry Run` to `Active`. Afterwards, the API will start returning the "real" status and your deployments will start to be promoted or rolled back based on the gate result.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployment-gates/gates
[2]: /monitors/manage/search/
[3]: /monitors/manage/#triggered-monitors
[4]: /watchdog/faulty_deployment_detection/
[5]: /tracing/services/resource_page/
[6]: /tracing/guide/configuring-primary-operation/#primary-operations
[7]: /tracing/guide/configuring-primary-operation/#configuration
[8]: /tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
[10]: /getting_started/site/
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[13]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[14]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments