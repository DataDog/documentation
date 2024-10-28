# Test document

Anything with a YES in front of it should display normally, with no visible background color.

Anything with a NO in front of it should have a dark background (to indicate that it has been given the `markdoc__hidden` class, and would be hidden in a real document).

For easier checking, each section has its YESes at the top, and NOs at the bottom.

## Variable values

- `test_string`: {% $test_string %}
- `always_true`: {% $always_true %}
- `always_false`: {% $always_false %}

## Dynamic variables test

## `equals` test

{% if equals($always_true, true) %}
YES: Display if `equals($always_true, true)`.
{% /if %}

{% if equals($test_string, "Datadog") %}
YES: Display if `equals($test_string, "Datadog")`.
{% /if %}

{% if equals($always_false, true) %}
NO: Display if `equals($always_false, true)`.
{% /if %}

{% if equals($test_string, "Hello") %}
NO: Display if `equals($test_string, "Hello")`.
{% /if %}

## `default` test

{% if default($notDefined, true) %}
YES: Display if `default($notDefined, true)`.
{% /if %}

{% if default($always_true, false) %}
YES: Display if `default($always_true, false)`.
{% /if %}

{% if default($notDefined, false) %}
NO: Display if `default($notDefined, false)`.
{% /if %}

## `or` test

{% if or($always_true, $always_false) %}
YES: Display if `or($always_true, $always_false)`.
{% /if %}

{% if or(equals($test_string, "Hello"), equals($test_string, "Datadog")) %}
YES: Display if `or(equals($test_string, "Hello"), equals($test_string, "Datadog"))`.
{% /if %}

{% if or($missingVarOne, $missingVarTwo) %}
NO: Display if `or($missingVarOne, $missingVarTwo)`.
{% /if %}

## `and` test

{% if and($always_true, $always_true) %}
YES: Display if `and($always_true, $always_true)`.
{% /if %}

{% if and($always_true, $always_false) %}
NO: Display if `and($always_true, $always_false)`.
{% /if %}

{% if and(equals($test_string, "Hello"), equals($test_string, "Datadog")) %}
NO: Display if `and(equals($test_string, "Hello"), equals($test_string, "Datadog"))`.
{% /if %}

## `not` test

{% if not($always_false) %}
YES: Display if `not($always_false)`.
{% /if %}

{% if not(equals($test_string, "Hello")) %}
YES: Display if `not(equals($test_string, "Hello"))`.
{% /if %}

{% if not($always_true) %}
NO: Display if `not($always_true)`.
{% /if %}

{% if not(equals($test_string, "Datadog")) %}
NO: Display if `not(equals($test_string, "Datadog"))`.
{% /if %}

## Nested functions

{% if or(not($always_false), not($always_true)) %}
YES: Display if `or(not($always_false), not($always_true))`.
{% /if %}

{% if or(equals($test_string, "Datadog"), equals($test_string, "Hello")) %}
YES: Display if `or(equals($test_string, "Datadog"), equals($test_string, "Hello"))`.
{% /if %}

{% if and(or(not($always_false), not($always_true)), or(not($always_false), not($always_true))) %}
YES: Display if `and(or(not($always_false), not($always_true)), or(not($always_false), not($always_true)))`.
{% /if %}

{% if equals(not($always_false), true) %}
YES: Display if `equals(not($always_false), true)`.
{% /if %}

{% if and(and($always_false, not($always_true)), or(not($always_false), not($always_true))) %}
NO: Display if `and(and($always_false, not($always_true)), or(not($always_false), not($always_true)))`.
{% /if %}

{% if and(not($always_false), not($always_true)) %}
NO: Display if `and(not($always_false), not($always_true))`.
{% /if %}

{% if and(equals($test_string, "Datadog"), equals($test_string, "Hello")) %}
NO: Display if `and(equals($test_string, "Datadog"), equals($test_string, "Hello"))`.
{% /if %}