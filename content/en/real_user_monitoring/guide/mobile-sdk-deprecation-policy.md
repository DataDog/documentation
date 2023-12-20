---
title: RUM Mobile SDKs Deprecation Policy
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
- link: '/real_user_monitoring/guide/mobile-sdk-upgrade'
  tag: 'Documentation'
  text: 'Upgrade your Datadog Mobile SDK'
---

## Overview

Datadog understands the importance of maintaining a robust and up-to-date mobile development ecosystem for you. The following mobile deprecation policy ensures the continued improvement and stability of Datadog mobile SDKs.
These deprecation practices align with industry best practices while ensuring a reasonable transition period for you.

## Versioning
Datadog Mobile SDKs follow [Semantic Versioning][1]. A change in Major version signals a non-backwards compatible change to Public API or behaviour.
When updating from one Major version to the next it's important to closely follow the [SDK Upgrade guidelines][2].



## SDK Lifecycle of Major Versions

### General Availability (GA) Release

* **Start Date**: The GA release marks the moment when a major version of an SDK is officially launched and made available.
* **Support Level**: During the GA phase, the major version is fully supported, including the addition of new features and bug fixes.


### Deprecation Phase

* **Start Date**: The deprecation phase commences immediately after the release of the subsequent major GA version.
* **Support Level**: In this phase, the primary focus is addressing critical bug fixes and ensuring the stability of the deprecated major version. This means that while no new features will be planned, we will continue to provide support for critical issues.

### End of Support (EOS)

* **Start Date**: Six months after the release of the subsequent major GA version, the End of Support (EOS) phase begins.
* **Support Level**: In this phase, we cease to provide any further support for the EOS major version. This means that no further bug fixes or updates will be released for the version.

## Minimum Support Duration
To ensure a reasonable timeframe for migrations and allow for planning, we guarantee a minimum support duration for each major version. This means that every major version released will be fully supported for at least 6 months from its GA release.

During this support period, we continue to provide new features and bug fixes, in addition to addressing critical issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: /real_user_monitoring/guide/mobile-sdk-upgrade
