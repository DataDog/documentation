---
title: Region param
---

## Overview

This page contains examples of the region param component.

## Test cases

This is just a simple rendering test that checks whether anything is amiss on initial page load.

## Examples

### Plain text

{% region-param key="dd_site" code=false link=false text="Datadog site" /%}

### Code format

{% region-param key="dd_site" code=true link=false text="Datadog site" /%}

### Link format

{% region-param key="dd_site" code=false link=true text="Visit your Datadog site" /%}

### Code and link combined

{% region-param key="dd_site" code=true link=true text="Go to your site" /%}
