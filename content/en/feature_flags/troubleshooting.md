---
title: Feature Flags Troubleshooting
description: Troubleshoot common issues with Datadog Feature Flags.
further_reading:
- link: "/feature_flags/server/"
  tag: "Documentation"
  text: "Server-Side Feature Flags"
- link: "/feature_flags/client/"
  tag: "Documentation"
  text: "Client-Side Feature Flags"
- link: "/remote_configuration/"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/tracing/troubleshooting/connection_errors/"
  tag: "Documentation"
  text: "APM Connection Errors"
---

If you experience unexpected behavior with Datadog Feature Flags, use this guide to resolve common issues. If you continue to have trouble, contact [Datadog Support][1].

## Start here: verify prerequisites

Before investigating specific errors, confirm these prerequisites are in place:

1. **The Datadog Agent is running** and reachable from your application. See <a href="/tracing/troubleshooting/connection_errors/" target="_blank">APM Connection Errors</a> for steps to verify Agent connectivity.
2. **Remote Configuration is enabled on the Agent**: Set `remote_configuration.enabled: true` in `datadog.yaml` or `DD_REMOTE_CONFIG_ENABLED=true`. See [Remote Configuration][2].
3. **The experimental flagging provider is enabled on the tracer**: Set `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`.
4. **Required tracer environment variables are set**: `DD_API_KEY`, `DD_ENV`, and `DD_SITE`.
5. **The Agent is configured for the correct site**: Set `site` in `datadog.yaml` or `DD_SITE` on the Agent. See [Check Agent Site][3].
6. **Your `DD_ENV` value appears in the Feature Flag environments list**: Confirm your environment is visible in the [Environments][6] list in Feature Flags Settings.

After confirming all prerequisites, continue with the following sections if feature flags still aren't working.

## Flags not updating

**Problem**: Flag configuration changes aren't reflected in the application.

**Solutions**:
1. Check Remote Configuration is enabled on both the Agent and the application
2. Verify the Agent can connect to the Datadog backend
3. Check application logs for Remote Configuration activity
4. Verify flags are published (not saved as drafts) in the Datadog UI
5. Verify service and environment tags match between the application and flag targeting rules

## No exposures in Datadog

**Problem**: Experiment exposures aren't appearing in Datadog.

**Solutions**:
1. Verify the flag is associated with an experiment in the Datadog UI. Exposures are only recorded for flags that are part of an experiment—standard feature flags without an experiment association do not generate exposure events.
2. Check the Datadog Agent is receiving exposure events
3. Verify `DD_API_KEY` is correct
4. Check Agent logs for exposure upload errors

## Trace Remote Configuration through the Agent

If the other troubleshooting steps fail to resolve the issue, trace the Remote Configuration path from the Datadog backend to your Agent.

**Check Agent RC status in Fleet Automation**

The [Fleet Automation][7] page shows the Remote Configuration status for each Agent. Select the Agent your application connects to and confirm Remote Configuration is active. For more detail on what Fleet Automation exposes, see the [Fleet Automation documentation][4].

**Check Agent RC status from the CLI**

Run `datadog-agent status` on the host running the Agent and review the Remote Configuration section of the output. For the full list of Agent CLI commands, see [Agent Commands][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /remote_configuration/
[3]: /agent/troubleshooting/site/
[4]: /agent/fleet_automation/
[5]: /agent/configuration/agent-commands/
[6]: https://app.datadoghq.com/feature-flags/settings/environments
[7]: https://app.datadoghq.com/fleet
