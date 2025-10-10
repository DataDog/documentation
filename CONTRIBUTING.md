# Datadog documentation style guide

This guide explains how to write and edit content for the [Datadog documentation][7]. While it's helpful for standardizing large bodies of work with multiple contributors, a style guide can't tell you how to write for your specific context. If you find that these guidelines get in the way of writing clearly, break the rules! Just do so thoughtfully.

The Datadog documentation [implementation of the Vale linter][4] has rules corresponding to some of these guidelines. After you make a PR, check its **Files changed** tab to see and fix warnings and errors it flagged.

See the Datadog documentation [README][9] for additional contribution requirements, including the `<name>/<description>` branch naming convention for all internal Datadog contributors.

## Language

- Use the American English **en_US** dialect when writing documentation, code comments, [wiki entries][1], and more in the English language. This is the default language for all `*.md` files.
- Don't contribute updates to translated files (the `fr`, `ja`, `ko`, or `es` directories for French, Japanese, Korean, or Spanish), as the content in GitHub is not the managed source. If there's a mistake in a translated file, let the documentation team know so we can fix it through the translation service. Automatic workflows later pull that content into GitHub.

## General principles

### Content

**Be direct and specific**: Say exactly what you mean using simple phrasing. Don't leave the reader guessing!
- **Not recommended**: Please note the Datadog Agent includes DogStatsD, which serves as a StatsD forwarder. This integration is intended for monitoring external StatsD servers, and is not needed to send metrics to Datadog using the StatsD protocol.
- **Recommended**: This integration does **not** help you forward application metrics from StatsD servers to Datadog. To do that, configure your StatsD server to forward metrics to DogStatsD.

**Be objective**: The purpose of the Docs site is to clearly inform readers about how to use Datadog. Avoid overt marketing language and focus on providing clear instructions.

**Be concise**: Rephrase complicated sentences to simplify them. Less is more:
- **Not recommended**: This integration offers you the ability to monitor the health and availability of a StatsD server.
- **Recommended**: This integration monitors the health and availability of a StatsD server.
- **Not recommended**: The `ddtrace` library includes support for a number of web frameworks.
- **Recommended**: The `ddtrace` library supports several web frameworks.

**Be empathetic**: It can be tempting to say that a task is "easy" or "quick", or to "just" or "simply" do something, but different users may have different experiences. Avoid those words to avoid frustrating users who are in the docs because they're struggling.

**Treat the reader as an equal**: Assume the reader is knowledgeable. Datadog has a technical audience, so don't spend too many words on something that's fairly common knowledge; for example, you don't have to spell out `URL`. On the other hand, don't assume the reader already knows everything—that's why they're reading your docs!

**Provide explicit instructions and examples**: Don't make an abstract statement or provide conceptual descriptions and then leave the reader guessing.
- **Not recommended**: "Often, two monitors grouped by different tags have reporting sources whose tag values never overlap."
- **Recommended**: "Often, two monitors grouped by different tags have reporting sources whose tag values never overlap; for example, `web04` and `web05` for a monitor grouped by host, or `dev` and `prod` for a monitor grouped by environment."

**Be imperative, not beckoning**: When leading into a discussion of a feature, phrases like "you can" are okay, but when you finally get to the step-by-step instructions, command the reader:
- **Not recommended**: You must configure this thing, and you may want to configure that thing.
- **Recommended**: Configure this thing. Optionally, configure that thing.

**Don't re-explain basic Datadog features**: Outside of introductory material, don't repeat information like "metrics submitted to Datadog may be graphed alongside other metrics or have events overlaid onto them," etc. It's okay to point out cases that are compelling and specific, such as "Overlay Jenkins deploys onto a graph of your application response times", but don't re-explain Datadog; instead, provide a useful description that enhances understanding of the feature.

**Don't refer to multi-part integrations as a singular thing**: For multi-component integrations—especially those whose components are not interdependent—do not refer vaguely to "the integration".
- **Not recommended**: Installing the Cloud Foundry Integration could increase the number of VMs...
- **Recommended**: [describe which component]: Installing the Datadog Agent BOSH release could increase the number of VMs...
- **OK**: Integrating with Cloud Foundry could increase the number of VMs...

## Wording and grammar

### Abbreviations

Avoid using Latin abbreviations to introduce examples:
- Instead of "i.e.", use "that is".
- Instead of "e.g.", use "for example".

### Active voice

Use active instead of passive voice. If you think your sentence is in passive voice, add the phrase "by zombies" to the end. If it still makes grammatical sense, it's in passive voice. For example, "metrics are sent to the Datadog Agent `by zombies`".
- **Not recommended**: With Datadog infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog Agent.
- **Recommended**: With infrastructure monitoring, the Datadog Agent receives metrics and forwards them to Datadog. Similarly, the Datadog Agent can also receive tracing metrics.

### Inclusive language

Use inclusive language unless you are referencing third-party technologies such as Redis' master/slave nodes. The Datadog docs follow the inclusive language best practices described in the [Terminology, Power and Inclusive Language](https://datatracker.ietf.org/doc/draft-knodel-terminology) document from the Center for Democracy & Technology.
- **Not recommended**: Master/slave, blacklist/whitelist
- **Recommended**: Primary/secondary, disallow list/allow list

### Pronouns

#### Gender

Use gender-neutral pronouns as appropriate. Avoid using "he", "him", "his", "she", and "her". Also avoid using combination pronouns such as "he/she" or "(s)he" or similar. Use "they" or "them" instead, for both singular and plural pronouns.

#### First- and second-person pronouns

Avoid first-person pronouns such as "I", "me", "mine", "we", "us", and "our". Use second-person pronouns "you" and "your" (often implied).
- **Not recommended**: Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. Pro plan members can go to the APM page in Datadog to begin a free 14-day trial.
- **Recommended**: Datadog APM is included in Enterprise plans or as an upgrade from Pro plans. If you have a Pro plan, go to the APM page in Datadog to begin a free 14-day trial.

Adding "You can" to the start of an instruction changes it to a suggestion. Be intentional about your use of each kind of sentence:
- **Instruction**: Change the environment variable value in your `datadog.yaml` file.
- **Suggestion**: You can change the environment variable value in your `datadog.yaml` file.

Don't overuse "your" when talking about the items a person interacts with when using Datadog. "Your infrastructure" is okay in moderation. Too much "your Agent" or "your application" is overly familiar. Try "the" instead and see if it works just as well.

### Tense

Avoid temporal words like "currently", "now", "will", etc. Describe the present state of the product.
- **Not recommended**: "Once you enable the integration, the Agent will start sending metrics to Datadog."
- **Recommended**: "After you enable the integration, the Agent starts sending metrics to Datadog."
- **Not recommended**: Currently, you can add up to 10 monitors in a composite monitor (more will be supported in the future).
- **Recommended**: You can add up to 10 monitors in a composite monitor.
- **Not recommended**: You can now add up to 20 monitors in a composite monitor.
- **Recommended**: You can add up to 20 monitors in a composite monitor.

**Note**: When Datadog implements or deprecates a major feature, it's good to point it out, for example: "The `docker` check replaces the `docker_daemon` check beginning with Agent version X.Y.Z.".

### Words and phrases

The [datadog-vale][4] repo contains a set of linting rules for Vale based on the Documentation Style Guide. You can refer to the rules when writing for the Docs site.

Otherwise, here are some words and phrases to avoid or use sparingly:

| Word to avoid        | Workaround                                                                               |
|----------------------|------------------------------------------------------------------------------------------|
| Refer to/visit       | When preceding a link; use "see" or "read".                                              |
| Once                 | Clarify causal relationships by saying "after" instead.                                  |
| A number of          | This is vague. Slightly less vague: "a few", "several", "many".                          |
| [in the] Datadog app | No need for the definite article; use "[in] Datadog".                                    |
| Product              | When referencing Datadog (for example, "the Datadog product"), omit it or use "service". |
| Please               | We don't need to plead our users to do anything; don't use "please".                     |
| Utilize              | Don't utilize "utilize" when you can use "use".                                          |
| Create a new...      | If you're creating it, it's inherently new. Just say "Create a..."                       |

#### RFC 2119

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the documentation are to be interpreted as described in [RFC 2119][2]. When writing in languages other than English, a best-effort must be made to adhere to this RFC.

#### RFC 2606

A top level domain (TLD) in an example must reference a TLD permanently reserved for such purposes. As described in [RFC 2606][3] four TLD names are reserved:
- `.test`
- `.example`
- `.invalid`
- `.localhost`

Same goes for second level domain names, three are reserved:
- `example.com`
- `example.net`
- `example.org`

## Punctuation

This section contains recommendations on grammar and punctuation details that are often a matter of subjective preference.

### Commas

Use the Oxford/Harvard/serial comma:
- **Not recommended**: "Metrics, events and service checks".
- **Recommended**: "Metrics, events, and service checks."

### Dashes

Use the em dash (—) with no spaces between adjacent words
- **Not recommended**: "The rest - Ok, Skipped, and No Data - are not alert-worthy".
- **Recommended**: "The rest—Ok, Skipped, and No Data—are not alert-worthy."

### Spaces

Use one space between sentences (not two).

## Formatting

### Code substitution

When adding something to a code block that isn't meant literally, use the format `<DATADOG_API_KEY>`. Don't use `$DATADOG_API_KEY`, `{DATADOG API KEY}`, or `DATADOG_API_KEY`.

### Headers

| Level                    | Case          |
|--------------------------|---------------|
| `<h1>` / `# Header`      | Title Case    |
| `<h2>` / `## Header`     | Sentence case |
| `<h3>` / `### Header`    | Sentence case |
| `<h4>` / `#### Header`   | Sentence case |
| `<h5>` / `##### Header`  | Sentence case |
| `<h6>` / `###### Header` | Sentence case |

### Images

Images are displayed on the full width of a page by default. If your image doesn't need to be that large, use the `style="width:XX%;"` parameter within the image partial to scale the image proportionally.

See the documentation wiki to learn more about [image partials][6].

### Links

Format links using numbered [reference-style links][8], and use relative paths for other pages published on the documentation site.
- **Not recommended**: `read the [Getting Started with Azure](/getting_started/azure/)`
- **Recommended**: `read the [Getting Started with Azure][1]` with a link reference at the bottom of the file: `[1]: /getting_started/azure/`.

Avoid vague link text; let readers know where you're sending them. This is particularly important for anyone using assistive technology to scroll through links; descriptive link text helps them find what they're looking for. Any sentence containing a link should read just as well if it didn't have the link.
- **Recommended**: To learn more about tagging, see the `[Guide to Tagging]`.
- **Not recommended**: To learn more about tagging, see `[here]`.

### Numbers and measurements

Use words for single-digit numbers (zero through nine). Use numerals for multiple-digit numbers (10 and above), decimals (0.9), and percents (1%). Use this approach with ordinal numbers too (first, second, etc.; 10th, 11th, etc.) Don't use commas in four-digit numbers (5000); use them in numbers that have five digits or more (50,000).

If a number precedes a unit of measurement, use numerals, and include a space between the number and the unit of measurement (1 ms).

### Text

Use text formatting to clarify and enhance content.

| Formatting   | Rule                                                                                | Example                                      |
|--------------|-------------------------------------------------------------------------------------|----------------------------------------------|
| `` `code` `` | Use code formatting for code-related content within a sentence.                     | Use the `foo` parameter.                     |
| `**bold**`   | Bold important text, like parts of the UI users need to interact with.              | Click **Settings**.                          |
| `*italics*`  | Use italics when you're introducing a product on a landing page for the first time. | The *Datadog Agent* runs on your hosts to... |


[1]: https://github.com/DataDog/documentation/wiki
[2]: https://tools.ietf.org/html/rfc2119
[3]: https://tools.ietf.org/html/rfc2606
[4]: https://github.com/DataDog/datadog-vale
[5]: https://github.com/DataDog/documentation/wiki/Translations-Overview
[6]: https://github.com/DataDog/documentation/wiki/Import-an-Image-or-a-mp4-video
[7]: https://docs.datadoghq.com/
[8]: https://www.markdownguide.org/basic-syntax/#reference-style-links
[9]: https://github.com/DataDog/documentation/blob/master/README.md
