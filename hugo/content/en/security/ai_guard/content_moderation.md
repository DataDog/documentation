---
title: Content Moderation
description: Detect and block harmful content in prompts and model responses with AI Guard content moderation.
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/policies/
  tag: Documentation
  text: Manage AI Guard Policies
- link: /security/ai_guard/signals/
  tag: Documentation
  text: Triage and Investigate AI Guard Signals
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard content moderation screens user prompts and assistant responses for harmful content across 16 built-in categories, such as hate, violence, self-harm, and fraud. When enabled in a policy, AI Guard detects and reports every harmful content category it finds on the AI Guard span, and blocks requests that match the categories you choose to block.

Content moderation is off by default. Enable it per policy scope on the AI Guard {{< ui >}}Policies{{< /ui >}} tab.

## How content moderation works

When content moderation is enabled for the matching policy scope, AI Guard runs a content moderation classifier in parallel with its standard threat evaluation.

Content moderation evaluates only the **last message** in the conversation, not the full conversation history. Whether a message is evaluated depends on its role:

| Last message | Evaluated |
| --- | --- |
| User prompt (`user`) | Yes |
| Assistant response without tool calls (`assistant`) | Yes |
| Assistant message with tool calls, tool result (`tool`), `system`, or `developer` | No |

### Detection and blocking

Each content moderation category has two thresholds: a detection threshold and a stricter blocking threshold.

- **Detect and report**: When a message meets or exceeds a category's detection threshold, AI Guard reports that category on the AI Guard span without changing the evaluation action. Enabling content moderation with no blocking categories selected runs in detect-and-report mode.
- **Block selected categories**: When a message meets or exceeds a category's blocking threshold and that category is in the policy's blocking list, AI Guard returns `DENY` with blocking enabled (`is_blocking_enabled: true`) and a reason naming the blocked categories (`content moderation: <categories>`).

Content moderation merges with AI Guard's threat evaluation as follows:

| Threat evaluation | Content moderation result | Outcome |
| --- | --- | --- |
| `ALLOW` | No category detected | `ALLOW` |
| `ALLOW` | Categories detected, none in the blocking list | `ALLOW`; detected categories are reported on the span |
| `ALLOW` | At least one category in the blocking list meets the blocking threshold | `DENY` with blocking enabled; categories are reported on the span |
| `DENY` | Categories detected | `DENY`; both attack categories and content moderation categories are reported on the span. If a category in the blocking list meets the blocking threshold, blocking is enabled. |
| Any | Error or timeout | Fails open for content moderation; AI Guard returns the threat evaluation result without content moderation categories |

<div class="alert alert-info">Before you add categories to the blocking list, update every agent in the policy scope to handle blocked requests. Otherwise, a blocked request can make the agent fail or let the request through. See <a href="/security/ai_guard/policies/#handle-blocked-requests">Handle blocked requests</a>.</div>

## Content moderation categories

AI Guard content moderation detects these 16 categories:

| Category | Tag | Description |
| --- | --- | --- |
| Criminal planning | `criminal_planning` | Planning, instructing, or confessing to criminal acts. |
| Violence | `violence` | Depicting, promoting, or inciting physical violence or harm. |
| Hate | `hate` | Promoting hatred, discrimination, or demeaning language targeting protected groups or identities. |
| Harassment | `harassment` | Abusive, bullying, intimidating, or threatening behavior directed at individuals. |
| Profanity | `profanity` | Explicit swear words, slurs, or vulgar language. |
| Sexual | `sexual` | Sexually explicit or adult content. |
| Controlled substances | `controlled_substances` | Promoting, facilitating, or instructing on illegal drugs or regulated substances. |
| PII and privacy | `pii` | Exposing, requesting, or misusing personally identifiable information or private data. |
| Weapons | `weapons` | Instructions, acquisition, or misuse involving firearms and illegal weapons. |
| Self-harm | `self_harm` | Encouraging, instructing, or depicting suicide or self-harm. |
| Unauthorized advice | `unauthorized_advice` | Providing regulated professional advice, such as medical, legal, or financial advice, without authorization. |
| Fraud | `fraud` | Deceptive schemes, scams, phishing, or fraudulent activity. |
| Sexual content involving minors | `sexual_minor` | Any sexualized content involving minors. |
| Immoral or unethical | `immoral_unethical` | Promoting unethical, harmful, or socially destructive behavior that falls outside explicit illegality. |
| Illegal activity | `illegal_activity` | Facilitating or encouraging unlawful activities not covered by other categories. |
| Copyright | `copyright` | Infringing copyrights or trademarks, or facilitating plagiarism. |

## Configure content moderation

Configuring content moderation requires the {{< ui >}}AI Guard Write{{< /ui >}} permission.

1. Go to the AI Guard {{< ui >}}Policies{{< /ui >}} tab and open a policy:
   - Edit the default policy to apply content moderation across your organization.
   - Edit or create a custom policy to apply content moderation to a specific service, environment, or service and environment.
1. Turn on {{< ui >}}Content moderation{{< /ui >}}.
1. (Optional) Select the categories you want AI Guard to block. Leave the blocking list empty to detect and report harmful content without blocking requests.
1. Save the policy.

### Policy scope and inheritance

Content moderation follows the same scope precedence as other [AI Guard policies][1]:

1. Default policy
2. Policy for a specific service in all environments
3. Policy for all services in a specific environment
4. Policy for a specific service in a specific environment

The most specific matching policy wins as a whole. Overriding content moderation in a custom policy replaces the parent policy's content moderation setting rather than merging category lists.

Policies match the `DD_SERVICE` and `DD_ENV` values configured on the Datadog SDK (or `service` and `env` in `data.attributes.meta` for the HTTP API), not a service name set on an individual span.

## Investigate and alert on moderated content

When content moderation detects harmful content, AI Guard displays the detected categories on the AI Guard span panel alongside attack categories.

Use these span attributes to filter spans on the [Investigate][2] page, build [detection rules][3], or create [Datadog Monitors][4]:

| Attribute | Description | Example |
| --- | --- | --- |
| `@ai_guard.content_moderation.categories` | Harmful content categories detected in the evaluated message. | `hate`, `violence` |
| `@ai_guard.content_moderation.blocked_categories` | Categories that caused AI Guard to block the request. Always a subset of `categories`. | `hate` |
| `@ai_guard.content_moderation.truncated` | Set to `true` when the message exceeded the input length limit and was only partially evaluated. | `true` |

## Limitations

- **Text only**: Content moderation evaluates text messages and skips images.
- **Last message only**: Content moderation evaluates only the last message in each evaluation call, and only when that message is a user prompt or an assistant response without tool calls.
- **Input length**: Long messages are evaluated in overlapping windows up to approximately 7,200 tokens. When a message exceeds that limit, AI Guard evaluates the covered portion, applies any detected categories, and sets `@ai_guard.content_moderation.truncated` to `true` on the span.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/ai_guard/policies/#policy-scope-and-inheritance
[2]: https://app.datadoghq.com/security/ai-guard/investigate
[3]: /security/ai_guard/signals/#create-detection-rules
[4]: /security/ai_guard/signals/#set-up-datadog-monitors
