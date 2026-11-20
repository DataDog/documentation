<!-- op-desc-heading: /api/latest/rendering-shapes/search-security-findings/ -->

### Overview

Get a list of security findings that match a search query. [See the schema for security findings](https://docs.datadoghq.com/security/guide/findings-schema.md).

### Query Syntax

The API uses the logs query syntax. Findings attributes (living in the attributes.attributes. namespace) are prefixed by @ when queried. Tags are queried without a prefix.

Example: `@severity:(critical OR high) @status:open team:platform`
