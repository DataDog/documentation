/**
 * AST-based plaintext rendering of the using-the-api page.
 *
 * Equivalent to `using-the-api.md.ts`. The source markdown is parsed into a
 * Markdoc AST and re-emitted via `format()`, so the round trip is exercised
 * for the same static content the string version returns directly.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, parseLangParam } from '@lib/i18n/locale';
import { format, parse } from '@lib/plaintext/helpers';

export const getStaticPaths: GetStaticPaths = () => {
  return LOCALES.map((lang) => ({
    params: { lang: lang === 'en' ? undefined : lang },
  }));
};

const SOURCE = `# Using the API

## Using the API

Use the Datadog HTTP API to access the Datadog platform programmatically. You can use the API to send data to Datadog, build data visualizations, and manage your account.

## Send data to Datadog

Use the API to begin to send integrations data to Datadog. With some additional setup of the Agent, you can also use the API to send Synthetic test data, Logs, and Traces to Datadog.

**Integrations endpoints**

Available integrations endpoints:

- [AWS Integration](/api/v1/aws-integration/)
- [AWS Logs Integration](/api/v1/aws-logs-integration/)
- [Azure Integration](/api/v1/azure-integration/)
- [Cloudflare Integration](/api/latest/cloudflare-integration/)
- [Fastly Integration](/api/latest/fastly-integration/)
- [Google Cloud Integration](/api/v1/gcp-integration/)
- [Jira Integration](/api/latest/jira-integration/)
- [Microsoft Teams Integration](/api/latest/microsoft-teams-integration/)
- [Okta Integration](/api/latest/okta-integration/)
- [Opsgenie Integration](/api/latest/opsgenie-integration/)
- [PagerDuty Integration](/api/v1/pagerduty-integration/)
- [Slack Integration](/api/v1/slack-integration/)
- [Webhooks Integration](/api/v1/webhooks-integration/)

**Platform endpoints**

Use these endpoints to post and fetch data to and from other parts of the Datadog platform:

- The [metrics](/api/v1/metrics/) endpoints allow you to post [metrics](/metrics/introduction/) data so it can be graphed on Datadog's dashboards and query metrics from any time period.
- The [events](/api/v1/events/) endpoints allow you to post and fetch events to and from the [Datadog event explorer](/events/).
- Use the [Synthetic Monitoring](/api/v1/synthetics/) endpoints to create, start, stop, and see [Synthetic tests](/synthetics/) results.
- Use the [Tracing Agent API](/tracing/guide/send_traces_to_agent_by_api/) to send traces to your Datadog Agent, which then forwards them to Datadog.
- Use the [LLM Observability Export API](/llm_observability/evaluations/export_api) to access your LLM Observability data for running external evaluations and exporting spans for offline storage.

## Visualize your data

After you are sending data to Datadog, you can use the API to build data visualizations programmatically:

- Build [Dashboards](/api/v1/dashboards/) and view [Dashboard Lists](/api/v1/dashboard-lists/)
- Manage [host tags](/api/v1/hosts/)
- Create [Embeddable Graphs](/api/v1/embeddable-graphs/)
- Take a [graph snapshot](/api/v1/snapshots/)
- [Service Dependencies](/api/v1/service-dependencies/) - see a list of your APM services and their dependencies
- Create [Monitors](/api/v1/monitors/)
- [Service Checks](/api/v1/service-checks/) - post check statuses for use with monitors
- Create and manage [Logs](/api/v1/logs/), [Logs Indexes](/api/v1/logs-indexes/), and [Logs Pipelines](/api/v1/logs-pipelines/)
- Get [Host](/api/v1/hosts/) information for your organization
- Create and manage [Service Level Objectives](/api/v1/service-level-objectives/)
- Generate [Security Monitoring](/api/v2/security-monitoring/) signals

## Manage your account

You can also use the Datadog API to manage your account programmatically:

- Manage [Users](/api/v1/users/)
- Manage [Roles](/api/v1/roles/)
- Manage your [Organization](/api/v1/organizations/)
- Verify API and app keys with the [Authentication](/api/v1/authentication/) endpoint
- Grant specific logs access with the [Logs Restriction Queries](/api/v2/logs-restriction-queries/)
- Manage existing keys with [Key Management](/api/v1/key-management/)
- Get hourly, daily, and monthly usage across multiple facets of Datadog with the [Usage Metering](/api/v1/usage-metering/) endpoints
- See the list of IP prefixes belonging to Datadog with [IP Ranges](/api/v1/ip-ranges/)
`;

const BODY = format(parse(SOURCE)).trim() + '\n';

export const GET: APIRoute = ({ params }) => {
  const lang = parseLangParam(params.lang);
  if (!lang) {
    return new Response(null, { status: 404 });
  }
  return new Response(BODY, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
