# Site footer

## Prompt

The Hugo site has a footer that it sources from `websites-modules`. These files are written as Go templates, which won't be useful to us in Astro. These Go templates reference data that is also kept in `websites-modules`. For example, `websites-modules/layouts/partials/nav/main-nav.html` references `websites-modules/data/menu_data`.

We recently implemented the site header (see the [plan file](./07_header.md) for that feature). The footer is under very similar constraints: needing to be identical to Hugo, but needing to be formatted as an Astro template, etc.

The data you need is probably already in [the mocked_dependencies folder](../src/mocked_dependencies/), since you needed to add the data to support the header. But if not, you can create new mocked dependencies as needed.

## Claude's plan