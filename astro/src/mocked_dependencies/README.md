# Mocked dependencies

The Astro site sometimes needs to refer to shared or single-sourced resources that it cannot access yet in development. For now, we keep a snapshot of each referenced resource in this folder so the site can build and render locally. 

These stubs must be replaced with the live dependencies before the site goes live.

## Inventory

- `api/` — OpenAPI spec and SDK examples