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

This guide covers three use cases for conditional branching. Each use case applies one or more of these step execution options:
- **If this step fails, continue to next step**
- **If this step succeeds, stop this test and mark it as passed**
- **Always run this step**

## Run different test paths based on application state

Use this pattern when your application can show different UI states, such as in A/B tests, and you want a single test that executes different steps depending on which state it encounters.

**Example logic:**
- If journey A header is found, run journey A steps.
- Otherwise, if journey B header is found, run journey B steps.

To set up this pattern:

1. Create a subtest that represents journey A:
   1. Add a step that checks for the journey A element (for example, a step that asserts or clicks on a journey A header). 
   1. Add the remaining journey A steps inside that subtest.
2. In the subtest's advanced options, enable the following:
   - **If this step fails, continue to next step**: Prevents a failure from stopping the entire test.
   - **If this step succeeds, stop this test and mark it as passed**: Ends the test and does not run the other journey when journey A is found.
3. Add a second subtest for journey B: a step that checks for the journey B element, followed by the journey B steps.
4. Enable **If this step fails, continue to next step** on the journey B subtest.
5. Order the subtests so the test runs journey A first, then journey B. Whichever condition matches runs to completion; the other subtest fails silently and the test continues.

{{< img src="synthetics/guide/conditional_logic/subtests.png" alt="Subtest configuration showing if/else step execution options" style="width:60%;" >}}

For more information on subtest configuration options, see [Subtests][1].

## Interact with the first available element

Use this pattern when you need to interact with the first available option, such as selecting an in-stock product size or the first available item in a list.

**Example logic:**
- If product A is available, proceed to purchase.
- Otherwise, if product B is available, proceed with product B.
- Otherwise, skip to the next available product.

To set up this pattern:

1. Add a step that interacts with the target element (for example, clicking an **Add to Cart** button or selecting a size from a **Select a Size** dropdown).
2. In the step's advanced options, set a **User Specified Locator** using XPath or CSS that targets only available elements (for example, `.size.available` or a class that indicates in-stock status).
3. Enable **If this step fails, continue to next step** so the test continues if no matching element is found.
4. Add a follow-up step or subtest that tries the next option (for example, a different size or product).
5. If the UI has filters or search, add steps that narrow the page to available items first so the locator targets only the correct elements.

{{< img src="synthetics/guide/conditional_logic/if_this_step_fails.png" alt="Step advanced options showing User Specified Locator and allow failure settings" style="width:60%;" >}}

## Always run specific steps

Use this pattern when certain steps must always run regardless of earlier results, such as logging out, releasing resources, or capturing error state.
**Note**: Applies only to Browser and Mobile App tests.

To set up this pattern:

1. Add a subtest at the end of your test that contains only the cleanup or teardown steps.
2. In the subtest's advanced options, enable **Always run this step**.
3. Save the test. The cleanup subtest runs even when earlier steps have failed.

{{< img src="synthetics/guide/conditional_logic/always_run_step.png" alt="Subtest advanced options with Always run this step enabled" style="width:60%;" >}}

For more information, see [Set execution behavior][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options#subtests
[2]: /synthetics/browser_tests/advanced_options#set-execution-behavior
