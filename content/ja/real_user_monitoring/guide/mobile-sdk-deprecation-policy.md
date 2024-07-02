---
title: RUM Mobile SDKs Deprecation Policy
kind: documentation
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualize your RUM data in the Explorer
- link: /real_user_monitoring/guide/mobile-sdk-upgrade
  tag: Documentation
  text: Upgrade your Datadog Mobile SDK
---

## Overview

Datadog understands the importance of maintaining a robust and up-to-date mobile development ecosystem for you. The following mobile deprecation policy ensures the continued improvement and stability of Datadog mobile SDKs. These deprecation practices align with industry best practices while ensuring a reasonable transition period for you.

## Versioning
Datadog Mobile SDKs follow [semantic versioning][1]. A change in major version signals a non-backward-compatible change to public API or behavior.

When updating from one major version to the next, it's important to closely follow the [SDK upgrade guidelines][2].

## Lifecycle of major SDK versions

### General Availability (GA) release

* **Start date**: The GA release marks the moment when a major version of an SDK is officially launched and made available.
* **Support level**: During the GA phase, the major version is fully supported, including the addition of new features and bug fixes.

### Deprecation phase

* **Start date**: The deprecation phase commences immediately after the release of the subsequent major GA version.
* **Support level**: In this phase, the primary focus is addressing critical bug fixes and ensuring the stability of the deprecated major version. While no new features are planned, we continue to provide support for critical issues.

### End of Support (EOS)

* **Start date**: Six months after the release of the subsequent major GA version, the End of Support (EOS) phase begins.
* **Support level**: In this phase, we cease to provide support for the EOS major version. No bug fixes or updates are released for the version.

## Minimum support duration
To ensure a reasonable time frame for migrations and allow for planning, we guarantee a minimum support duration for each major version. This means that every major version is fully supported for at least six months after its GA release.

During this support period, we provide new features and bug fixes, in addition to addressing critical issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://semver.org/
[2]: /real_user_monitoring/guide/mobile-sdk-upgrade
