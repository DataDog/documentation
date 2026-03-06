# Schema to Documentation Generator

This script converts the security findings JSON schema into formatted markdown documentation similar to the RUM data collected pages.

## Usage

```bash
python3 schema_to_docs.py <schema_url_or_file> <output_dir>
```

### Arguments

- `schema_url_or_file`: URL or local file path to the JSON schema
- `output_dir`: Directory where the generated `data_collected.md` file will be written

### Examples

**From GitHub (recommended):**
```bash
python3 local/bin/py/schema_to_docs.py \
  https://raw.githubusercontent.com/DataDog/security-findings-schema/main/jsonschema.json \
  content/en/security/findings/
```

**From local file:**
```bash
python3 local/bin/py/schema_to_docs.py \
  /path/to/jsonschema.json \
  content/en/security/findings/
```

## What it does

The script:

1. Fetches the JSON schema from a URL or reads from a local file
2. Parses the schema structure including all `$defs` (definitions)
3. Organizes attributes into logical sections:
   - Core attributes (severity, status, finding type, etc.)
   - Workflow (triage, muting, integrations)
   - Risk (exposure, impact factors)
   - Vulnerability information (rules, advisories, CVEs)
   - Remediation
   - Compliance
   - Resource identification (cloud, K8s, host, service, container)
   - Code context (git, code location, packages, secrets)
   - Tags
4. Generates markdown tables with:
   - Attribute names
   - Types (including nested objects and arrays)
   - Descriptions
   - Enum values (when applicable)
5. Handles nested objects and creates subsections
6. Outputs a complete markdown file with frontmatter

## Output

The script generates a `data_collected.md` file in the specified output directory with:

- Hugo frontmatter (title, description, further_reading)
- Overview section
- Organized attribute tables grouped by namespace
- Proper markdown formatting compatible with the Datadog docs site

## Features

- **Enum value expansion**: Automatically extracts and displays possible enum values
- **Nested object handling**: Creates subsections for nested objects
- **Reference resolution**: Follows `$ref` pointers to definitions
- **Type detection**: Properly identifies arrays, objects, strings, integers, etc.
- **Description preservation**: Maintains all descriptions from the schema

## Requirements

- Python 3.6+
- No external dependencies (uses only standard library)

## Notes

- The output directory will be created if it doesn't exist
- Existing `data_collected.md` files will be overwritten
- The script handles both HTTP/HTTPS URLs and local file paths
- Descriptions are sanitized to work properly in markdown tables
