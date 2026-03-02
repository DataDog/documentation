---
title: Implement Conditional Logic in Synthetic Tests
further_reading:
    - link: '/synthetics/browser_tests/advanced_options'
      tag: 'Documentation'
      text: 'Configure Advanced Options for Browser Test Steps'
    - link: '/synthetics/browser_tests/test_steps#subtests'
      tag: 'Documentation'
      text: 'Browser Test Steps'
    - link: '/synthetics/multistep'
      tag: 'Documentation'
      text: 'Multistep API Tests'
products:
- name: Browser Tests
  url: /synthetics/browser_tests/
  icon: browser
- name: Multistep API Tests
  url: /synthetics/multistep/
  icon: synthetics
- name: Mobile App Testing
  url: /synthetics/mobile_app_testing/
  icon: mobile
---

{{< product-availability >}}

## Overview

Conditional branching allows your Synthetic Monitoring tests to adapt to different application states and execute different paths based on runtime conditions. Instead of following a single linear sequence, a test can decide which steps to run, skip, or continue after failures.

This guide covers three patterns using subtests and step execution options:
- If this step fails, continue to next step
- If this step succeeds, stop this test and mark it as passed
- Always run this step

## Run different test paths based on application state

Use this pattern when your application can show different UI states, such as in A/B tests, and you want a single test to cover both paths.

**Example logic:**
- IF journey A header is found, run journey A steps
- ELSE IF journey B header is found, run journey B steps

To set up this pattern:

1. Create a subtest that represents journey A. Add a step that checks for the journey A element (for example, an assertion or click on a journey A header), then add the remaining journey A steps inside that subtest.
2. In the subtest's advanced options, enable **If this step fails, continue to next step** so a failure does not stop the whole test.
3. In the same subtest, enable **If this step succeeds, stop this test and mark it as passed** so the test ends and does not run the other journey when journey A is found.
4. Add a second subtest for journey B: a step that checks for the journey B element, followed by the journey B steps.
5. Enable **If this step fails, continue to next step** on the journey B subtest as well.
6. Order the subtests so the test runs journey A first, then journey B. Whichever condition matches runs to completion; the other subtest fails silently and the test continues.

{{< img src="synthetics/guide/conditional_logic/subtests.png" alt="Subtest configuration showing if/else step execution options" style="width:60%;" >}}

For more information on subtest configuration options, see [subtests][1].

## Interact with the first available element

Use this pattern when you need to act on the first available option, such as selecting an in-stock product size or the first available item in a list.

**Example logic:**
- IF product A is available, proceed to purchase
- ELSE IF product B is available, proceed with product B
- ELSE skip to the next available product

To set up this pattern:

1. Add a step that interacts with the target element (for example, click **Add to cart** or select a size).
2. In the step's advanced options, set a **User Specified Locator** using XPath or CSS that targets only available elements (for example, `.size.available` or a class that indicates in-stock status).
3. Enable **If this step fails, continue to next step** so the test continues if no matching element is found.
4. Add a follow-up step or subtest that tries the next option (for example, a different size or product).
5. If the UI has filters or search, add steps that narrow the page to available items first so the locator targets only the correct elements.

{{< img src="synthetics/guide/conditional_logic/if_this_step_fails.png" alt="Step advanced options showing User Specified Locator and allow failure settings" style="width:60%;" >}}

## Always run cleanup steps

Use this pattern when certain steps must run at the end of a test regardless of whether earlier steps passed or failed, such as logging out, releasing resources, or capturing error state.

To set up this pattern:

1. Add a subtest at the end of your test that contains only the cleanup or teardown steps.
2. In the subtest's advanced options, enable **Always run this step**.
3. Save the test. The cleanup subtest runs even when earlier steps have failed.

{{< img src="synthetics/guide/conditional_logic/always_run_step.png" alt="Subtest advanced options with Always run this step enabled" style="width:60%;" >}}

For more information, see [set execution behavior][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options#subtests
[2]: /synthetics/browser_tests/advanced_options#set-execution-behavior
