---
title: Troubleshooting Serverless Monitoring for Azure Logic Apps
---

## I cannot see any traces

Follow these steps to diagnose why traces are not appearing in Datadog:

### 1. Verify that Diagnostic Settings are configured

Check that the Logic App has the required diagnostic setting:

1. In the Azure Portal, open your Logic App
2. Navigate to **Diagnostic settings** in the left menu
3. Verify that a diagnostic setting named `datadog_log_forwarding_<ID>` exists

{{< img src="serverless/logic_apps/diagnostic_settings.png" alt="Azure Logic App diagnostic settings showing datadog_log_forwarding configuration" style="width:100%;" >}}

This setting is automatically created by the [Datadog Azure Automated Log Forwarding][1] service. If it's missing, verify that you have installed the Azure Automated Log Forwarding service correctly. For support, contact `#support-azure-integrations` or [Datadog support][5].

### 2. Verify that Logic Apps logs are in Datadog

Check that logs are being forwarded to Datadog:

1. In Datadog, go to [**Logs > Live Tail**][2]
2. Search for `@properties.resource.workflowId:*`
3. Trigger your Logic App workflow a few times if needed

If you don't see any logs:
- Verify that the Azure Automated Log Forwarding service is properly configured
- Check the Event Hubs namespace for any error messages
- Ensure your Datadog API key is correctly configured

### 3. Verify that APM spans exist

Check that traces are being generated from the logs:

1. In Datadog, go to [**APM > Traces**][3]
2. Select **Live Search** in the upper right corner
3. Search for `operation_name:azure.logicapps`

If you see logs but no traces:
- Wait a few minutes for logs to be processed and traces to be generated
- Verify that the logs contain the necessary workflow execution data
- Contact [Datadog support][5] for further assistance

## Additional troubleshooting tips

### Logs are not appearing in Datadog

If logs are not appearing in Datadog:

1. **Verify the Azure Automated Log Forwarding setup**: Ensure that the Event Hubs namespace and Datadog destination are properly configured
2. **Check Event Hubs metrics**: In the Azure Portal, check the Event Hubs namespace metrics to verify that messages are being sent
3. **Verify API key**: Ensure that the Datadog API key configured in the Azure Automated Log Forwarding setup is valid and has the correct permissions
4. **Check diagnostic settings logs category**: The diagnostic setting should be capturing `WorkflowRuntime` logs

### Traces are missing intermittently

If traces appear inconsistently:

1. **Add a retention filter**: Create a [retention filter][4] with the query `operation_name:azure.logicapps` to ensure traces are retained
2. **Set retention rate**: For debugging, set the retention rate to 100%
3. **Check sampling**: Verify that traces aren't being dropped due to sampling configurations

### Tags are not appearing on traces

If `env` and `service` tags are not appearing on your traces:

1. **Verify tags in Azure**: Check that the tags are correctly set on the Logic App in the Azure Portal
2. **Wait for propagation**: Tag changes may take a few minutes to propagate to new executions
3. **Trigger new executions**: Invoke the workflow again after setting tags

## Need more help?

For further questions or issues not covered here, contact [Datadog support][5].

[1]: /logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[4]: /tracing/trace_pipeline/trace_retention/#retention-filters
[5]: /help/
