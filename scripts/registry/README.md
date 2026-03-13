# Registry Scripts

Two scripts fetch configuration data from the [Feature Parity Registry API](https://dd-feature-parity.azurewebsites.net/configurations/) and produce JSON files consumed by Hugo templates.

## Prerequisites

- Python 3
- `requests` library (`pip install requests`)

## Scripts

### 1. `registry_generate_categories.py`

Fetches all configuration keys, classifies them into 20 semantic categories (general, tracing core, profiling, appsec, etc.), and identifies integration-specific keys following the `DD_TRACE_<INTEGRATION>_*` pattern.

**Outputs** (in `data/registry/`):
- `config_category_descriptions_registry.json` — full categories reference with all keys, integration details, and kind counts.
- `categories.json` — slim ordered array of category metadata used by the Hugo template to render collapsible sections.

**Run:**

```sh
python3 scripts/registry/registry_generate_categories.py
```

### 2. `registry_extract_configurations_by_language.py`

Fetches configuration entries and filters them by language. Each entry gets a `category` field (and `integration_name`/`integration_pattern` for integration keys) based on the categories file produced by step 1.

**Outputs** (in `data/registry/`):
- One JSON file per language: `go.json`, `java.json`, `nodejs.json`, `python.json`, `ruby.json`, `dotnet-core.json`, `dotnet-framework.json`, `php.json`, `rust.json`, `cpp.json`.

**Run all languages:**

```sh
python3 scripts/registry/registry_extract_configurations_by_language.py
```

**Run a single language:**

```sh
python3 scripts/registry/registry_extract_configurations_by_language.py --language golang
```

## Execution Order

Always run the category script first — the extract script reads its output to assign categories:

```sh
python3 scripts/registry/registry_generate_categories.py
python3 scripts/registry/registry_extract_configurations_by_language.py
```
