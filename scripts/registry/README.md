# Registry Scripts

A single script fetches configuration data from the [Feature Parity Registry API](https://dd-feature-parity.azurewebsites.net/configurations/) and produces JSON files consumed by Hugo templates.

## Prerequisites

- Python 3 (stdlib only, no extra dependencies)

## Script

### `registry_generate.py`

Fetches all configuration keys, classifies them into 20 semantic categories, detects integration-specific keys (`DD_TRACE_<INTEGRATION>_*`), and extracts per-language configuration files.

**Outputs** (in `data/registry/`):
- `config_category_descriptions_registry.json` — full categories reference with all keys, integration details, and kind counts. (only in `debug` mode)
- `categories.json` — slim ordered array of category metadata used by the Hugo template to render collapsible sections.
- One JSON file per language: `go.json`, `java.json`, `nodejs.json`, `python.json`, `ruby.json`, `dotnet-core.json`, `dotnet-framework.json`, `php.json`, `rust.json`, `cpp.json`.

**Run all languages:**

```sh
python3 scripts/registry/registry_generate.py
```

**Run a single language:**

```sh
python3 scripts/registry/registry_generate.py --language golang
```
