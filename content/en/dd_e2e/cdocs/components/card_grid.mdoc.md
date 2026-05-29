---
title: Card Grid
draft: true
private: true
---

## Image grid (4 cards, default card_width)

{% card-grid %}
{% image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" /%}
{% image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" /%}
{% image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" /%}
{% image-card href="/getting_started/" src="integrations_logos/python.png" alt="Python" /%}
{% /card-grid %}

## Image grid (7 cards, last row centering)

{% card-grid %}
{% image-card href="/getting_started/" src="integrations_logos/go-metro.png" alt="Go" /%}
{% image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" /%}
{% image-card href="/getting_started/" src="integrations_logos/python.png" alt="Python" /%}
{% image-card href="/getting_started/" src="integrations_logos/ruby.png" alt="Ruby" /%}
{% image-card href="/getting_started/" src="integrations_logos/nodejs.png" alt="Node.js" /%}
{% image-card href="/getting_started/" src="integrations_logos/dotnet_text.png" alt=".NET" /%}
{% image-card href="/getting_started/" src="integrations_logos/php.png" alt="PHP" /%}
{% /card-grid %}

## Text-only grid

{% card-grid card_width="200px" %}
{% image-card href="/getting_started/" title="Containers" /%}
{% image-card href="/getting_started/" title="Jobs" subtitle="(Preview)" /%}
{% image-card href="/getting_started/" title="Functions" /%}
{% /card-grid %}

## Custom card_width (200px)

{% card-grid card_width="200px" %}
{% image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" /%}
{% image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" /%}
{% image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" /%}
{% /card-grid %}

## Custom image_width

{% card-grid %}
{% image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" image_width="50" /%}
{% image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" image_width="50" /%}
{% image-card href="/getting_started/" src="integrations_logos/java.png" alt="Java" image_width="50" /%}
{% /card-grid %}

## Single card

{% card-grid %}
{% image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" /%}
{% /card-grid %}

## Tooltips

{% card-grid %}
{% image-card href="/getting_started/" src="integrations_logos/linux.png" alt="Linux" tooltip="Linux" /%}
{% image-card href="/getting_started/" src="integrations_logos/docker.png" alt="Docker" tooltip="Docker" /%}
{% /card-grid %}
