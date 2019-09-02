---
title: Troubleshooting
type: apicontent
order: 5
external_redirect: /api/#troubleshooting
aliases:
- /developers/faq/i-m-receiving-a-202-but-not-seeing-data
---

## Troubleshooting

Datadog does a very minimal error checking on the API front-end, as all data is queued for asynchronous processing (the goal being to always, always accept your data in production situations and decouple the Datadog systems from yours).

Thus it is possible you could receive a 202 'success' response but not see your data in Datadog. The cause of this is most likely:

*   Problems with the timestamp (either not in seconds or in the past, etc.)
*   Using the application key instead of API key

To check your timestamp is correct run:

`date -u && curl -s -v https://app.datadoghq.com 2>&1 | grep -i '< date'`

This outputs the current system's date, then makes a request to an API endpoint to grab the date on the Datadog end. If these are more than a few minutes apart, you may want to look at the time settings on your server.

**Note**: Datadog API keys are case-sensitive. All your JSON attributes for POST endpoints should be in lowercase.
