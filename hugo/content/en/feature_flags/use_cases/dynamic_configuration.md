---
title: Dynamic Configuration
description: Change application behavior with feature flag configuration instead of code deployments.
---

A feature flag becomes **dynamic configuration** when you store application settings in its variants instead of code. Rather than hardcoding a value and deploying a new build to change it, you update the variant in Datadog and your application reads the new value on the next SDK refresh. Product, marketing, and operations teams can update strings, numbers, or JSON-backed settings directly, without involving engineering.

## Set up a JSON configuration flag

1. Navigate to [**Create Feature Flag**][1].
2. In the **Variants** section, set the variant type to **JSON**.
3. Optionally add a [JSON Schema][2] to validate variant values. Datadog recommends adding a schema to catch invalid values early.
4. Add variants with values that conform to the schema, and give each a descriptive name.

{{< img src="feature_flags/dynamic_config_json_variants.png" alt="The Variants section of the create flag form showing a JSON schema and two variants: All items price asc and In stock top rated." style="width:100%;" >}}

## Next steps

After your flag is set up, you can use it as a foundation for more advanced workflows:

- **Target by segment**: Use targeting rules to serve different configuration values to different user segments — for example, serving different sort defaults by region or subscription tier.
- **Roll out gradually**: Use a [progressive rollout][3] to incrementally expose subjects to a new configuration variant, and roll back immediately if something goes wrong.
- **Run an experiment**: Add an [experiment][4] targeting rule to serve different variants to different groups and measure the impact on your key metrics.

[1]: https://app.datadoghq.com/feature-flags/create
[2]: https://json-schema.org/overview/what-is-jsonschema
[3]: /feature_flags/use_cases/progressive_rollouts/
[4]: /experiments/
