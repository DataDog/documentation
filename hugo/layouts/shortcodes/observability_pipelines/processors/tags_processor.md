For logs coming from the Datadog Agent, use this processor to exclude or include specific tags in the Datadog tags (`ddtags`) array. Tags that are excluded or not included are dropped and may reduce your outbound log volume.

To set up the processor:

1. Define a filter query. Only matching logs are processed by this processor, but all logs continue to the next step in the pipeline.
1. Optionally, input a Datadog tags array for the **Configure tags** section. The supported formats are `["key:value", "key"]`. See [Define Tags][10200] for more information about the `key:value` format.
1. In the **Configure tags** section, choose whether to **Exclude tags** or **Include tags**. If you provided a tag array in the previous step, select the tag keys you want to configure. You can also manually add tag keys. **Note**: You can select up to 100 tags.

[10200]: /getting_started/tagging/#define-tags