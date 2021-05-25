---
title: Why are browser tests self-maintaining?
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/browser_tests/actions'
      tag: 'Documentation'
      text: 'Create Browser Test Steps'
    - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
      tag: 'Blog'
      text: 'Best practices for creating end-to-end tests'

---

Flakiness is one of the biggest pain points associated with end-to-end testing. Oftentimes end-to-end tests fail not because of an actual application issue, but because a frontend team performed changes that cause an identifier used by your test not to work anymore.

## How do browser tests target elements?

Datadog’s Synthetic browser tests address this pain point through an in-house algorithm that leverages a set of locators to target elements. When a test searches for a specific element to interact with (e.g., a checkout button), instead of looking at an element with a specific XPath or a specific CSS selector, browser tests actually use several different points of reference to help find it (XPath, text, classes, what other elements are near it, etc.). These points of reference are turned into a set of locators, each uniquely defining the element.

If there a small UI change modifies an element (e.g., moves it to another location), the test automatically locates the element again based on the points of reference that were not affected by the change. Once the test completes successfully, browser tests recompute, or "self-heal", any broken locators with updated values. This ensures that your tests do not break because of a simple UI change and can automatically adapt to the evolution of your application’s UI.

## How do I make sure my browser test does not validate an unexpected change?

That is exactly why using assertions is so important. Assertions allow you to define what is and is not the expected behavior associated with the journey your test is testing.

## What if I still want to use a specific identifier?

In some rare use cases (for example, if you want to click on the `nth` element of a dropdown menu, regardless of what the content of the element is), it makes sense to have your step rely on a user defined locator.

For that you do have the ability to use the [User Specified Locator][1] feature that is available in the [advanced options][2] of your browser test steps.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options/#user-specified-locator
[2]: /synthetics/browser_tests/advanced_options/
