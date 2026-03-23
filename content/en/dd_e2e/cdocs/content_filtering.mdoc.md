---
title: Content filtering tests
content_filters:
  - trait_id: prog_lang
    option_group_id: dd_e2e_backend_prog_lang_options
  - trait_id: database
    option_group_id: dd_e2e_database_options
---

## User stories covered by this page

- When the user updates a filter selection, the content changes as expected.
- Conditions using the following functions are returning `true` and `false` as expected:
  - `and`
  - `or`
  - `includes`
  - `not`
- The filters are usable through keyboard-only navigation.

## Basic filtering

This section verifies that the page's content changes when the user updates a filter.

{% if equals($prog_lang, "python") %}
The selected programming language is Python.
{% /if %}

{% if equals($prog_lang, "ruby") %}
The selected programming language is Ruby.
{% /if %}

{% if equals($prog_lang, "go") %}
The selected programming language is Go.
{% /if %}

{% if equals($prog_lang, "javascript") %}
The selected programming language is JavaScript.
{% /if %}

{% if equals($prog_lang, "java") %}
The selected programming language is Java.
{% /if %}

{% if equals($database, "postgres") %}
The selected database is Postgres.
{% /if %}

{% if equals($database, "mysql") %}
The selected database is MySQL.
{% /if %}

{% if equals($database, "mongo_db") %}
The selected database is MongoDB.
{% /if %}

## Functions

### `and`

Select Go and MySQL to reveal additional content in this section.

{% if and(equals($prog_lang, "go"), equals($database, "mysql")) %}
The `and` function returned `true`: The selected programming language is Go, and the selected database is MySQL.
{% /if %}

### `or`

Select Go, Ruby, or Python to reveal additional content in this section.

{% if or(equals($prog_lang, "go"), equals($prog_lang, "ruby"), equals($prog_lang, "python")) %}
The `or` function returned `true`: The selected programming language is Go, Ruby, or Python.
{% /if %}

### `includes`

Select Go, Ruby, or Python to reveal additional content in this section.

{% if includes($prog_lang, ["go", "ruby", "python"]) %}
The `includes` function returned `true`: The selected programming language is Go, Ruby, or Python.
{% /if %}

### `not`

Select a language other than Javascript to reveal additional content in this section.

{% if not(equals($prog_lang, "javascript")) %}
The `not` function returned `true`: The selected programming language is not Javascript.
{% /if %}
