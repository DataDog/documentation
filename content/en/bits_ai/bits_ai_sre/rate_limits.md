# Rate Limits

Rate limits let you control how many investigations Bits AI SRE will automatically run. You can configure limits both **per monitor** and **across your entire organization**, applied over a rolling 24-hour window.

Once a rate limit is reached, automatic investigations stop until the window resets. Manual investigations—triggered from the Datadog app or Slack—are still allowed even when limits are reached.

## Types of Rate Limits

### Monitor Limits

Monitor limits control how often a specific monitor can trigger an investigation.
While usage is tracked per monitor, the limit value is set globally and applies to all monitors.

**Default:** Each monitor can trigger one automatic investigation per 24 hours.

### Org-wide Limits

Org-wide limits define the total number of investigations Bits AI SRE can run across your entire organization within 24 hours.

**Default:** No limit — Bits AI SRE can run an unlimited number of investigations organization-wide.

## Set a rate limit

To set a rate limit:
1. Navigate to [Bits AI SRE > Settings](https://app.datadoghq.com/bits-ai/settings/)
2. Click Rate Limits
3. Toggle on the rate limit you want to enable
4. Set the maximum number of investigations that can run within a 24-hour window
5. Click Save

<p align="center">
<img width="504" height="246" alt="image" src="https://github.com/user-attachments/assets/71a7d267-88dd-4b7d-8cba-7f74957f44d2" />
</p>

Once enabled, Bits AI SRE will automatically enforce your configured limits. You can update or disable limits at any time from the same page.
