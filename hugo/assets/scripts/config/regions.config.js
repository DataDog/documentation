// Region config for the region selector, region-param, and code tabs.
//
// The data comes from `shared/regions.yaml`, which Hugo mounts as
// `site.Data.regions` and passes to this bundle through the `params` option of
// `js.Build` (see layouts/partials/header-scripts.html and footer-scripts.html).
// Edit the YAML file, not this one.
import * as params from '@params';

// Reshape the per-region list into the lookup the scripts use:
// { allowedRegions: ['us', ...], dd_site: { us: 'datadoghq.com', ... }, ... }
const toRegionConfig = (regions) => {
    const config = { allowedRegions: regions.map((region) => region.key) };

    regions.forEach((region) => {
        Object.entries(region.values).forEach(([name, value]) => {
            config[name] = config[name] || {};
            config[name][region.key] = value;
        });
    });

    return config;
};

export default toRegionConfig(params.regions);
