# Datadog site

## Prompt

Datadog has many data centers ("Datadog sites"). Each Datadog user exists on a certain Datadog site.

The Hugo site has a mechanism where the user can select their Datadog site (for example, `US1`), and this influences the content on the page through various shortcodes, partials, etc. that reference the active Datadog site and make decisions on what content to hide or display.

The API pages specifically, which is our current scope for Astro, display different endpoints based on the selected Datadog site. In contrast, the site dropdown on the Astro site does not do anything yet, and the alternative endpoint URLs are just dormant.

For example, this site-switching functionality is available on the Hugo site at `localhost:1313/api/latest/action-connection/`, but the equivalent Astro page (`http://localhost:4321/api/latest/action-connection/`) does not have this feature yet.

Review how Hugo is implementing this mechanism, and plan an Astro equivalent. Update the API page logic to display the correct endpoint based on the user's choice of Datadog site.

## Claude's plan