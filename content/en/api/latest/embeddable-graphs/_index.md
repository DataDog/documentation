---
title: Embeddable Graphs
---
Interact with embeddable graphs through the API.

## Get all embeds

Gets a list of previously created embeddable graphs.

## Create embed

Creates a new embeddable graph.

Note: If an embed already exists for the exact same query in a given organization,
the older embed is returned instead of creating a new embed.

If you are interested in using template variables, see
[Embeddable Graphs with Template Variables](https://docs.datadoghq.com/dashboards/faq/embeddable-graphs-with-template-variables).

## Get specific embed

Get the HTML fragment for a previously generated embed with `embed_id`.

## Enable embed

Enable a specified embed.

## Revoke embed

Revoke a specified embed.

