# Option sets

## Overview

Option sets are used to provide the list of choices for a content preference on a page. While content preferences represent the user's general characteristics regardless of what page they're on or product they're learning about, option sets represent a content preference selection the user is making in the context of a specific product or specific page.

For example, two different products may support different options for the `host` preference, so we may need to define a distinct option set for each product, such as `apm_host_options` and `dbm_host_options`. Both option sets will influence the host preference, updating it as needed depending on the user's location in the docs.

## Defining an option set

You can define a new option set anywhere in this folder. You can create a new file or folder if that makes sense, or add to an existing file or folder.

As long as your option set definition meets the following requirements, it will be available for use:

- It must be defined in a `.yaml` file inside the options set folder (this folder).
- It must use a unique ID that is not used anywhere else in the options set folder.
- Its ID must end in `_options`, such as `dbm_database_options`.
- One of its options must be marked as the default.
- All of its option IDs should appear in [the options allowlist](../allowlists/options.yaml).

### Options set example

```yaml
logging_host_options:
  - id: aws
    # one choice must be marked as the default
    default: true
  - id: gcp
    # if the default display name in the options allowlist won't work
    # for this particular choice, you can overwrite it 
    # with the optional display_name key here
    display_name: "GCP"
  - id: azure
```