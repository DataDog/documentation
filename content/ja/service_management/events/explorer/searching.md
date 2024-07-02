---
title: Search Syntax
kind: Documentation
further_reading:
- link: logs/explorer/search_syntax
  tag: Documentation
  text: Log Search Syntax
---

## Overview

Events search uses the [logs search syntax][1]. Like logs search, events search permits:

- `AND`, `OR`, and `-` operators
- Wildcards
- Escape characters
- Searching tags and facets with `key:value`
- Searching within attributes with the `@` prefix

## Example queries

`source:(github OR chef)`
: Show events from GitHub OR Chef.

`host:(i-0ade23e6 AND db.myapp.com)`
: Show events from `i-0ade23e6` AND `db.myapp.com`.

`service:kafka`
: Show events from the `kafka` service.

`status:error`
: Show events with an `error` status (supports: `error`, `warning`, `info`, `ok`).

`availability-zone:us-east-1a`
: Show events in the `us-east-1a` AWS availability zone (AZ).

`container_id:foo*`
: Show events from all containers with an ID beginning with `foo`.

`@evt.name:foo`
: Show the events with attribute `evt.name` equal to `foo`.

See [Logs Search Syntax][1] for more details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search_syntax/