For logs coming from the Datadog Agent, use this processor to exclude or include specific tags in the Datadog tags (`ddtags`) array. Tags that are excluded or not included are dropped and may reduce your outbound log volume.

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Optionally, input a Datadog tags array for the **Configure tags** section. The supported formats are `["key:value", "key"]`. See [Define Tags][10200] for more information about the `key:value` format.
1. In the **Configure tags** section, select whether you want to **Exclude tags** or **Include tags**. If you added an array in the previous step, you can select the tag keys that you want to exclude or include. Alternatively, you can manually add tag keys that you want to exclude or include. **Note**: You can select up to 100 tags.

[10200]: /getting_started/tagging/#define-tags