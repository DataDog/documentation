---
title: Serverless Monitoring
aliases:
  - /graphing/infrastructure/cloudfunctions
  - /graphing/infrastructure/serverless_functions
  - /graphing/infrastructure/serverless/
  - /infrastructure/serverless/
  - /tracing/serverless_functions/datadog_apm
  - /integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Serverless"
  tag: "Release Notes"
  text: "Check out the latest Serverless releases! (App login required)."
- link: "https://www.datadoghq.com/state-of-serverless"
  tag: "Blog"
  text: "The State of Serverless"
- link: "/serverless/installation/"
  tag: "Documentation"
  text: "Installing Serverless monitoring"
- link: "https://www.datadoghq.com/blog/azure-container-apps/"
  tag: "Blog"
  text: "Monitor Azure Container Apps with Datadog"
- link: "https://dtdg.co/fe"
  tag: "Foundation Enablement"
  text: "Join an interactive session to learn more about serverless monitoring"
cascade:
    algolia:
        rank: 70
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Learn how serverless monitoring enables your teams to stay agile and focus their time on building revenue-generating applications while reducing operational overhead.
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1] provides visibility into the managed services that power your serverless applications. Serverless Monitoring brings together real-time metrics, logs, and traces from your serverless compute, as well as related fully-managed APIs, queues, streams and data stores.

{{< partial name="serverless/landscape.html" >}}

<div class="alert alert-info">Join discussions in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

### AWS Lambda



### AWS Step Functions



### Azure App Service



### Azure Container Apps


### Azure Functions

### Google Cloud Run



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /serverless/aws_lambda
[3]: /serverless/enhanced_lambda_metrics
[4]: /serverless/custom_metrics
[5]: /serverless/distributed_tracing
[6]: /serverless/deployment_tracking
[7]: /infrastructure/serverless/azure_app_services/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /integrations/azure/#log-collection
[10]: /serverless/azure_container_apps
[11]: /integrations/google_cloud_platform/
[12]: /serverless/google_cloud_run
[13]: /integrations/amazon_step_functions
[14]: /serverless/step_functions/installation
