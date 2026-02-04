---
title: Version test
content_filters:
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_advanced_config_options
---

<!-- Version must meet version -->
{% if semverIsAtLeast($rum_browser_sdk_version, "2.17.0") %}
Content shown if version is met
{% /if %}
<!-- ends  version -->


More content