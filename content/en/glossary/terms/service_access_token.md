---
id: service_access_token
title: service access token (SAT)
synonyms:
  - SAT
  - service account token
related_terms:
  - api_key
  - application_key
  - personal_access_token
  - service_account
---
A service access token (SAT) authenticates Datadog API calls on behalf of a service account rather than an individual user. Because a SAT is not tied to a person, it remains valid when team members join or leave the organization. Like a personal access token, a SAT does not need to be paired with an API key and is scoped by default. Its time-to-live (TTL) is optional, so a SAT can be long-lived. For more information, see the <a href="/account_management/service-access-tokens/">Service Access Tokens documentation</a>.
