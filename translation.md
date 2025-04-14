# Translation guidance

## YAML configuration files

### Overview

YAML files end in `.yaml`, and contain pairs of keys and values (`<KEY>: <VALUE>`). The value of a given key can be some text, a list, or a more complex data structure.

```yaml
title: "Some title"
path: path/to/file
an_example_list:
  - item one
  - item two
  - item three
```

### Translation guidance

#### Do not translate

Without exception, no YAML keys should be translated. Values are usually not translated, but a few exceptions are listed in the next section.

#### Do translate

Do translate these _values_ (but not their corresponding keys):

- The value of any `label` key found in the `customization_config` directory (or any nested directories).
- The value of any `name` key found in the `config/_default/menus` directory.

## Markdown files

### Overview

Markdown files end in `.md` (not `.mdoc.md` -- that's a Markdoc file, covered in a later section). They contain a mix of YAML, Markdown, HTML, and [Hugo shortcode](https://gohugo.io/content-management/shortcodes/) syntax.

### Frontmatter

The frontmatter of a file includes metadata such as the page's title:

```
---
title: "Reticulating Splines"
description: "A document that summarizes the spine-reticulation process."
disable_toc: true
aliases:
    - /some/url
---
```

Frontmatter appears at the top of the file, beginning and ending with `---` appearing on its own line. Its contents are in YAML ([overview section of YAML spec](https://yaml.org/spec/1.2.2#chapter-2-language-overview)). It contains key-value pairs that differ from page to page.

#### Translation guidance

##### Do not translate

Do not translate any keys.

##### Do translate

Translate only the _values_ listed below:
- The value of the `title` key.
- The value of the `description` key.
- The value of the `short_description` key.
- The quoted text inside the `algolia > tags` key:
    ```
    algolia:
        tags: ["translate me", "translate me too"]
    ```
- The values of the `tag` and `text` keys nested inside the `further_reading` key:
    ```
    further_reading:
        - link: "/some/url"
          tag: "TRANSLATE_ME"
          text: Translate me
    ```

### HTML tags

Markdown files can contain standard HTML tags, such as `<div class="alert alert-info">Text containing an <a href="https://google.com">HTML link.</a></div>`.

#### Translation guidance

##### Do not translate

Most markup between `<` and its corresponding `>` should not be translated. Exceptions are listed in the next section.

##### Do translate

Translate only these attribute values (but not the name of the attribute):

- The value of the `alt` attribute on `img` tags
- The value of the `title` attribute on `a` tags

Translate any plaintext content inside of the tag:

```html
<div>Translate me <a href="some/url">and translate me too</a>.</div>
```

### Shortcodes

Shortcodes in Hugo follow the formats below.

#### Shortcode with opening and closing

```
{{< tag-name some-attribute="some-value" another-attribute="another-value" >}}
Some contents written in Markdown. A nested tag might appear here.
{{< /tag-name >}}
```

#### Shortcode with opening and closing (alternative syntax)

```
{{% tag-name "Text attribute" %}}
Some contents written in Markdown. A nested tag might appear here.
{{% /tag-name %}}
```

#### Self-closing shortcode

```
{{< tag-name >}}
```

### Translation guidance

#### Do not translate

Most markup between `{{<` and `>}}` (or `{{%` and `%}}`) should not be translated. Exceptions are listed in the next section.

#### Do translate

Translate any Markdown contents inside the tag:

{{% tag-name some-attribute="some value" %}}
Translate me!
{{% /tag-name %}}

Translate only the _values_ of these attributes (not the attribute name itself):
- The contents of the unlabeled attribute in a `tab` tag. 
  - For example, in the tag `{{% tab "Other libraries" %}}`, the text "Other libraries" should be translated.
- The contents of the `alt` attribute in an `img` shortcode.
  - For example, in the tag `{{< img src="path/to/your/image-name-here.png" alt="A basket of strawberries" style="width:100%;" >}}`, the text "A basket of strawberries" should be translated.

## Markdoc files (`.mdoc.md` files)

### Overview

Markdoc files are similar to the Markdown files described above, except they contain Markdoc tags instead of shortcodes and HTML tags. For example:

```
{% alert level="warning" %}
Do not feed the bears.
{% /alert %}
```

Tags can be nested within one another, similar to HTML tags. They can also self-close with a slash, like this: `{% partial "some/file/path" /%}`.

Some tags can contain functions as attributes, such as the `if` tag:

```
{% if equals($color, "red") %}
This content will only show if the page's `$color` variable is set to "red".
{% /if %}
```

### Translation guidance

#### Do translate

Translate frontmatter according to the guidelines for Markdown. Additionally, translate the value of any `label` keys:

```
title: "Some Document"
content_filters:
  - trait_id: some_trait_id
    option_id: some_option_id
    label: Translate me
```

Translate any text contents in between the tag's opening and closing, such as the sentence "Do not feed the bears":

```
{% alert level="warning" %}
Do not feed the bears.
{% /alert %}
```

Translate these attribute _values_ (not the attribute names):

- The value of any `label` attribute. For example, `{% tab label="Translate me" %}`.
- The `alt` attribute on any `img` tag.

#### Do not translate

Unless an exception is listed above, do not translate any other part of the tag (anything appearing between `{%` and `%}`). 

For example, do not translate text that appears as an argument to a function inside a tag, such as "red" in the tag `{% if equals($color, "red") %}`.