# Valid mock site

This site is used to test the compilation golden path. It should not cause any compilation errors.

This folder contains the bare minimum of directories and content files required to make a customizable site work:

- The `content` folder, which contains any `.mdoc` files that represent pages on the site (not partials).
- The `partials` folder, which contains any `.mdoc` content snippets used by the `content` files.
- The `preferences_config` folder, which contains
    - The `sitewide_preferences` file, which simply notes the list of valid sitewide preference identifiers.
    - The `preference_options` folder, which contains options sets divided across any number of files.
