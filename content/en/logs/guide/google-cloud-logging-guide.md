---
title: Send Google Cloud logs with pub/sub to Datadog Dataflow Template
kind: documentation
is_beta: true
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

{{< callout url="#" >}}
  Google Cloud log forwarding with the Datadog Dataflow template is in beta.
{{< /callout >}} 

## Overview

Google Cloud log forwarding with the Datadog Dataflow template is the recommended way to send your Google Cloud logs to Datadog.

## Setup


If you haven't already, 
If you already have a Cloud Pub/Sub setup, please note the  modifications proposed below in step #2. If you are setting up Cloud Pub/Sub for the first time, please follow our documentation for step-by-step instructions but please note that you should set this up as a “pull” subscription.


Once you have a Cloud Pub/Sub setup, in order to use the Pub/Sub to Datadog Dataflow template, please switch your existing “push” subscription to a “pull” subscription.
The default “Compute Engine” service account will need access to read from this subscription. Please ensure you include the following roles: 
Pub/Sub Viewer
Pub/Sub Subscriber

Set up a PubSub topic/subscription pair that'll serve as a Dead-Letter Queue (DLQ) in the case of failures.
The default “Compute Engine” service account will need access to write to this topic. Please ensure you include the following role:
Pub/Sub Publisher

Create a new secret in Secret Manager with the existing Datadog API Key.
The default “Compute Engine” service account will need access to read this secret. Please ensure you include the following role:
Secret Manager Secret Accessor

Then, please create your dataflow job as specified in this page. Our dataflow template offers both compression and batching of events before forwarding to Datadog.

We recommend configuring the Dataflow parameter based on your scale but here are some default parameters in Appendix A.

Run the Dataflow job.

Note: we want to make sure you are aware that this is a “beta” implementation. We also urge you to calculate any additional costs you may incur using this cost calculator.
Feedback
We want your feedback. Please send us your feedback on using the Dataflow template via your usual channels (Customer Success Managers or Technical Account Managers).
Appendix A
Here are some default parameters to get started. We recommend you perform load tests to understand how to set these parameters. 

# Generic Dataflow Parameters
"maxWorkers": 15
"numWorkers": 1
"tempLocation": "gs://PATH/TO/TEMP/DIR"
"enableStreamingEngine": true
"additionalExperiments": [ "enable_prime" ]

# Template Parameters
"site": "datadoghq.com"
"batchCount": "100"
"parallelism": "60"
"apiKeySecretId": "projects/<PROJECT_NUMBER>/secrets/<SECRET_NAME>/versions/1"
"apiKeySource": "SECRET_MANAGER"
"inputSubscription": "projects/<PROJECT_NAME>/subscriptions/<PUBSUB_LOGS_PULL_SUBSCRIPTION>"
"outputDeadletterTopic": "projects/<PROJECT_NAME>/topics/<PUBSUB_DLQ_TOPIC>"


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/

