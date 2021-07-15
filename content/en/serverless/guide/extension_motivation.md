---
title: Deciding to migrate to the Datadog Lambda Extension
kind: guide
---

## Should I migrate to the Datadog Lambda Extension?

### Advantages

The Datadog Lambda Extension offers the following advantages over the Datadog Forwarder:

- **Cost savings**: The Forwarder converts logs to metrics and traces, which are then sent to Datadog. The Datadog Lambda Extension sends traces, metrics, and logs directly to Datadog, which diminishes the expense of CloudWatch Logs.
- **Easy to set up**: Triggers need to be set up on the Forwarder for every new Lambda function. The Datadog Lambda Extension can be easily added as a Lambda layer. 

### Trade-offs

Migration from the Forwarder to the Extension can be an involved process. There is one Forwarder setup per region and account, but there is one Extension setup **per function**. That is, if you are shipping data from *N* functions using the Forwarder, you must set up the Extension *N* times before the migration is complete. Since you must reconfigure and redeploy **each** function, the full process of migration may take some time.

If this is a significant deterrent to migration, but you still wish to benefit from the advantages of the Datadog Lambda Extension, you may consider a [hybrid approach][1].

[1]: /serverless/guide/forwarder_extension_migration/#hybrid-approach
