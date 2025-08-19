---
title: Plain Markdown Elements
---

## Expected .md output

- Most of this should remains unchanged, or uses a format that does not meaningfully differ from the original. 
  - Some spacing changes can be difficult to avoid.
  - OOTB Markdoc does not support description lists, but a similar structure can be used. (Longer term, Markdoc can be patched to support it, as we've already done with Cdocs, but it introduces complexity that we probably don't want to deal with at this stage.)
- In some cases, content may be slightly optimized for agents (for example, links will become inline).

## Headings

### Heading level 3

Some text.

#### Heading level 4 {#heading-level-4}

Some text, with a custom heading ID.

##### Heading level 5

Some text.

###### Heading level 6

Some text.

## Inline text formatting

You can *italicize* text, or **bold** it. You can also use underscores to _italicize_ or __bold__ it.

Text can also be formatted as a [plain link][1], **[bold link][1]**, or *[italic link][1]*.

## Lists

### Ordered

Here's an ordered list of steps:

1. Figure out how to migrate to [Astro][2].
2. Make some *incredible docs*.
3. **Profit.**

### Unordered

Here's an unordered version of the same list, which doesn't make as much sense, but that's okay.

- Figure out how to migrate to [Astro][2].
- Make some *incredible docs*.
- **Profit.**

## Code

### Inline code

Here's some `inline code`.

### Code fence

```javascript
console.log("Hello, world!");
```

## Description list

Service
: Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of building your application.

Resource
: Resources represent a particular domain of a customer application - they are typically an instrumented web endpoint, database query, or background job.

`clusterChecksRunner.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: Required. A list of node selector terms. The terms are ORed.


[1]: https://www.google.com
[2]: https://astro.build/
