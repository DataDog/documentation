import argparse
import io
import unittest
from pathlib import PosixPath
from unittest import mock

from format_link import parse_file, Node, init_args, assemble_nodes, main, format_link_file, process_nodes, adjust_one_liner_shortcodes


class TestParse(unittest.TestCase):

    @mock.patch('format_link.open', new=mock.mock_open(read_data='This is some text'))
    def test_no_shortcodes_parses(self):
        actual = parse_file('/content/en/foo.md')
        expected = Node("root")
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(
        read_data='**Note**: Mention ```@zenduty``` as a channel under **Notify your team**'))
    def test_inline_triple_backtick_parses(self):
        actual = parse_file('/content/en/foo.md')
        # inline triple backtick shouldn't parse as a node
        self.assertEqual(len(actual.children), 0)

    @mock.patch('format_link.open', new=mock.mock_open(
        read_data='## Further Reading\n{{< partial name="whats-next/whats-next.html" >}}'))
    def test_non_closing_shortcode_ignored(self):
        actual = parse_file('/content/en/foo.md')
        expected = Node("root")
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(
        read_data='{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}{{< programming-lang lang="java" >}}{{< /programming-lang >}}{{< /programming-lang-wrapper >}}'))
    def test_lang_shortcode_oneline(self):
        actual = parse_file('/content/en/foo.md')
        self.assertEqual(len(actual.children), 1)
        self.assertEqual(actual.children[0].name, 'programming-lang-wrapper')
        self.assertEqual(len(actual.children[0].children), 1)
        self.assertEqual(actual.children[0].children[0].name, 'programming-lang')
        self.assertEqual(len(actual.children[0].children[0].children), 0)

    @mock.patch('format_link.open', new=mock.mock_open(
            read_data="""
Root text
{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}
{{< programming-lang lang="java" >}}
Java text
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}
Text after
    """))
    def test_lang_shortcode_multiline(self):
        actual = parse_file('/content/en/foo.md')
        self.assertEqual(len(actual.children), 1)
        self.assertEqual(actual.children[0].name, 'programming-lang-wrapper')
        self.assertEqual(len(actual.children[0].children), 1)
        self.assertEqual(actual.children[0].children[0].name, 'programming-lang')
        self.assertEqual(len(actual.children[0].children[0].children), 0)


    @mock.patch('format_link.open', new=mock.mock_open(
        read_data='{{< programming-lang-wrapper langs="java,dotnet,go,ruby,php,nodejs,python" >}}{{< programming-lang lang="java" >}}{{< tabs >}}{{% tab "set_tag" %}}{{% /tab %}}{{< /tabs >}}{{< /programming-lang >}}{{< /programming-lang-wrapper >}}'))
    def test_lang_tab_shortcode_oneline(self):
        actual = parse_file('/content/en/foo.md')
        self.assertEqual(len(actual.children), 1)
        self.assertEqual(actual.children[0].name, 'programming-lang-wrapper')
        self.assertEqual(len(actual.children[0].children), 1)
        self.assertEqual(actual.children[0].children[0].name, 'programming-lang')
        self.assertEqual(len(actual.children[0].children[0].children), 1)
        self.assertEqual(actual.children[0].children[0].children[0].name, 'tabs')
        self.assertEqual(len(actual.children[0].children[0].children[0].children), 1)
        self.assertEqual(actual.children[0].children[0].children[0].children[0].name, 'tab')
        self.assertEqual(len(actual.children[0].children[0].children[0].children[0].children), 0)

    @mock.patch('format_link.open', new=mock.mock_open(
        read_data="""
Root text
{{< site-region region="us3" >}}
    Root site region
    {{< site-region region="us,us5,eu,gov" >}}Nested Region 1{{< /site-region >}}
    {{< site-region region="us3" >}}Nested Region 2{{< /site-region >}}
{{< /site-region >}}
Text after
    """))
    def test_nested_site_region(self):
        actual = parse_file('/content/en/foo.md')
        expected = Node("root")
        self.assertEqual(actual, expected)

    # one liner shortcode we didn't define
    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
This
{{< tab "blah" >}}
Stuff here
{{</ tab >}}
is text {{< foobar test="stuff" >}} and more
{{< tab "durp" >}}
Stuff here
{{</ tab >}}"""))
    def test_non_closing_shortcode_unknown(self):
        """
        we expect everything to get nested when we encounter a single/non closing shortcode
        so for now we expect 1
        """
        parsed = parse_file('/content/en/foo.md')
        actual = len(parsed.children)
        expected = 1
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
Here is some root text
{{< tab "MySQL < 4.0" >}}
Text here
{{< /tab >}}
and after
{{< tab "foo" >}}
Stuff here
{{</ tab >}}"""))
    def test_shortcode_argument_containing_arrow(self):
        parsed = parse_file('/content/en/foo.md')
        actual = len(parsed.children)
        expected = 2
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
Here is text
{{% tab "ドライバーのみ" %}}
Hello world
{{% /tab %}}
{{% tab "標準" %}}
Hello world 2
{{% /tab %}}"""))
    def test_ja_shortcode(self):
        parsed = parse_file('/content/en/foo.md')
        actual = len(parsed.children)
        expected = 2
        self.assertEqual(actual, expected)
    # test unclosed shortcode, with and without more shortcodes inside it

    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}
  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}
  {{< nextlink href="/containers/cluster_agent">}}<u>Cluster Agent</u>: Install and configure the Cluster Agent for Kubernetes, a version of the Datadog Agent built to efficiently gather monitoring data from across an orchestrated cluster.{{< /nextlink >}}
  {{< nextlink href="/containers/amazon_ecs">}}<u>Amazon ECS</u>: Install and configure the Datadog Agent on Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Install and configure the Datadog Agent with Amazon ECS on AWS Fargate{{< /nextlink >}}
{{< /whatsnext >}}
"""))
    def test_common_whatsnext_shortcodes(self):
        parsed = parse_file('/content/en/foo.md')
        whatsnext = parsed.children[0]
        actual = len(whatsnext.children)
        expected = 5
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
## Overview

To start receiving daily data, an administrator needs to create a new report with the user interface.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Getting Started with Usage Attribution in Datadog" style="width:100%;" >}}

The **Applied Tags** section enables the following:

{{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Applied tags in Datadog" style="width:80%;" >}}

Once the reports start to be generated, they are updated daily and aggregated monthly in this table.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-v2-Total-Usage.png" alt="Applied tags in Datadog" style="width:100%;" >}}

{{< site-region region="us,eu" >}}

More here

{{< img src="account_management/billing/usage_attribution/daily-usage-attribution.png" alt="Daily Usage Attribution data" style="width:100%;" >}}

see the [API endpoint documentation][2].

[2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-hourly-usage-attribution
{{< /site-region >}}

## Tracking usage

{{< img src="account_management/billing/usage_attribution/graph-by-tags.png" alt="Infra Hosts graphs separated by tags" style="width:100%;" >}}
"""))
    def test_multiple_one_line_shortcodes_nesting(self):
        parsed = parse_file('/content/en/foo.md')
        site_region = parsed.children[0].children[0].children[0].children[0]
        actual = len(site_region.children)
        expected = 1
        self.assertEqual(actual, expected)

    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
### Dynamic links

Use template variables to dynamically link to a related resource for your investigation.

For example, if a signal detects a suspicious user login, use `{{@user.id}}` to create a dynamic link to another resource:

```
* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})
```

Or, if a signal is tagged with a specific service, use the `{{@service}}` variable to create a dynamic link:

```
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```
"""))
    def test_multiline_triple_back_tick_with_links_ignored(self):
        actual = parse_file('/content/en/foo.md')
        self.assertEqual(len(actual.children), 2)
        self.assertEqual(actual.children[0].ignore, True)
        self.assertEqual(actual.children[1].ignore, True)


class TestInitArgs(unittest.TestCase):

    @mock.patch('sys.argv', ['-f', 'content/en/foo/bar.md', '-d', 'content/en/'])
    def test_file_dir_both_exist_error(self):
        with self.assertRaises(SystemExit):
            init_args()


class TestAdjustOneLinerShortcodes(unittest.TestCase):

    # TODO: we should take the result of the parse instead of actually running parse here.
    @mock.patch('format_link.open', new=mock.mock_open(read_data="""
    ## Overview

    To start receiving daily data, an administrator needs to create a new report with the user interface.

    {{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Getting Started with Usage Attribution in Datadog" style="width:100%;" >}}

    The **Applied Tags** section enables the following:

    {{< img src="account_management/billing/advanced-usage-reporting-02.png" alt="Applied tags in Datadog" style="width:80%;" >}}

    Once the reports start to be generated, they are updated daily and aggregated monthly in this table.

    {{< img src="account_management/billing/usage_attribution/Usage-Attribution-v2-Total-Usage.png" alt="Applied tags in Datadog" style="width:100%;" >}}

    {{< site-region region="us,eu" >}}

    More here

    {{< img src="account_management/billing/usage_attribution/daily-usage-attribution.png" alt="Daily Usage Attribution data" style="width:100%;" >}}

    see the [API endpoint documentation][2].

    [2]: https://docs.datadoghq.com/api/v1/usage-metering/#get-hourly-usage-attribution
    {{< /site-region >}}

    ## Tracking usage

    {{< img src="account_management/billing/usage_attribution/graph-by-tags.png" alt="Infra Hosts graphs separated by tags" style="width:100%;" >}}
    """))
    def test_multiple_one_line_shortcodes_nesting(self):
        parsed = parse_file('/content/en/foo.md')
        adjust_one_liner_shortcodes(parsed)
        expected = 5
        self.assertEqual(expected, len(parsed.children))

class TestAssembleNodes(unittest.TestCase):

    def test_should_return_list(self):
        node = Node('root')
        node.modified_lines = ['foo']
        actual = type(assemble_nodes(node))
        expected = list
        self.assertEqual(actual, expected)

    def test_should_return_root_text(self):
        node = Node('root')
        node.modified_lines = ['foo']
        actual = assemble_nodes(node)
        expected = ['foo']
        self.assertEqual(actual, expected)

    def test_should_return_nested_text(self):
        node = Node('root')
        node.name = "root"
        node.line_start = 0
        node.line_end = 0
        node.char_start = 0
        node.char_end = 0
        node.lines = ['This is root\n', 'and some more\n', '{{% tab "test" %}}\n']
        node.modified_lines = ['This is root\n', 'and some more\n', '{{% tab "test" %}}\n']
        tab_node = Node('tab')
        tab_node.name = "test"
        tab_node.line_start = 2
        tab_node.line_end = 3
        tab_node.char_start = 0
        tab_node.char_end = 12
        tab_node.lines = ['This is root\n', 'and some more\n', '{{% tab "test" %}}\n']
        tab_node.modified_lines = ['{{% tab "test" %}}\n', 'Here is some text\n', '{{% /tab %}}\n']
        node.children.append(tab_node)
        actual = assemble_nodes(node)
        expected = ['This is root\n', 'and some more\n', '{{% tab "test" %}}\n', 'Here is some text\n', '{{% /tab %}}\n']
        self.assertEqual(expected, actual)

    def test_indentation(self):
        root = Node('root')
        root.lines = [
            '5. After you upload the IdP Meta-data and configure your IdP, enable SAML in Datadog by clicking the **Enable** button.\n',
            '    {{< img src="account_management/saml/saml_enable.png" alt="saml enable"  >}}\n'
            '6. Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in:'
        ]
        root.modified_lines = [
            '5. After you upload the IdP Meta-data and configure your IdP, enable SAML in Datadog by clicking the **Enable** button.\n',
            '    {{< img src="account_management/saml/saml_enable.png" alt="saml enable"  >}}\n'
            '6. Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in:'
        ]
        actual = assemble_nodes(root)
        self.assertEqual(''.join(root.modified_lines), ''.join(actual))

    def test_whatsnext_block(self):
        root = Node('root')
        root.lines = [
            '{{< whatsnext desc="This section includes the following topics:">}}\n',
            '  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n',
            '  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}\n',
            '{{< /whatsnext >}}\n'
        ]
        # create whats next
        whatsnext = Node('whatsnext')
        whatsnext.char_start = 2
        whatsnext.char_end = 18
        whatsnext.line_end = 2
        whatsnext.line_start = 1
        whatsnext.ignore = False
        whatsnext.is_closing_shortcode = True
        whatsnext.lines = [
            '{{< whatsnext desc="This section includes the following topics:">}}\n',
            '  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n',
            '  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}\n',
            '{{< /whatsnext >}}\n'
        ]
        whatsnext.modified_lines = [
            '{{< whatsnext desc="This section includes the following topics:">}}\n',
            '  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n',
            '  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}\n',
            '{{< /whatsnext >}}\n'
        ]
        # create 2 nextlinks and add to whatsnext
        nextlink1 = Node('nextlink')
        nextlink1.char_start = 0
        nextlink1.char_end = 125
        nextlink1.line_start = 1
        nextlink1.line_end = 1
        nextlink1.ignore = False
        nextlink1.is_closing_shortcode = True
        nextlink1.lines = ['  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n']
        nextlink1.modified_lines = ['  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n']
        whatsnext.add(nextlink1)
        nextlink2 = Node('nextlink')
        nextlink2.char_start = 0
        nextlink2.char_end = 138
        nextlink2.line_start = 2
        nextlink2.line_end = 2
        nextlink2.ignore = False
        nextlink2.is_closing_shortcode = True
        nextlink2.lines = ['  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}\n']
        nextlink2.modified_lines = ['  {{< nextlink href="/containers/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes. {{< /nextlink >}}\n']
        nextlink2.parent = whatsnext
        whatsnext.add(nextlink2)
        root.add(whatsnext)
        actual = assemble_nodes(root)
        self.assertIn('href="/containers/docker"', ''.join(actual))


class TestProcessNodes(unittest.TestCase):
    def test_process_shortcodes_on_same_line(self):
        node = Node('root')
        node.name = 'root'
        node.char_start = 2
        node.char_end = 18
        node.line_end = 0
        node.line_start = 0
        node.lines = ['---\n', 'title: Container Monitoring\n', 'kind: documentation\n', 'description: Install & configure the Agent to collect data on containerized infrastructures\n', '---\n', '\n', '## Overview\n', '\n', 'Container Monitoring provides real-time visibility into the health and performance of containerized environments.\n', '\n', '{{< whatsnext desc="This section includes the following topics:">}}\n', '  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n', '{{< /whatsnext >}}\n']
        nextlink_node = Node('nextlink')
        nextlink_node.lines = ['  {{< nextlink href="/containers/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker.{{< /nextlink >}}\n']
        nextlink_node.char_end = 125
        nextlink_node.line_end = 12
        nextlink_node.char_start = 0
        nextlink_node.line_start = 11
        node.children = [
            nextlink_node
        ]
        process_nodes(node)
        self.assertIn("nextlink", ''.join(node.modified_lines))

    def test_skips_code_block_nodes(self):
        pass

    def test_does_not_modify_when_order_only_changes(self):
        node = Node('root')
        node.lines = ['## Overview\n', '\n',
                      'Lorem ipsum dolor [sit amet][1], consectetur adipiscing elit.\n', '\n',
                      'Suspendisse [odio augue][2], posuere commodo faucibus non, elementum et metus.\n',
                      '[1]: /events/\n',
                      '[2]: /logs/\n']
        process_nodes(node)
        self.assertIn("[1]: /events/", ''.join(node.modified_lines))


    # test if link used in section e.g [blah][1] but not footer link in that section
    # try to pull it from the root as that is most likely location
    # Also we should do a warning too?
    # content/en/logs/explorer/visualize.md

    def test_node_inline_link_creates_footer(self):
        """A tab with one inline link and nothing else should create footer links and reference it"""
        node = Node('root')
        node.lines = [
            "## Overview\n", "\n",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n",
            "{{< foobar >}}\n",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n",
            "Suspendisse odio augue, posuere commodo faucibus non, elementum et metus.\n",
            "Lorem ipsum dolor sit amet, [consectetur](https://duckduckgo.com) adipiscing elit.\n",
            "{{< /foobar >}}\n",
            "\n",
        ]
        process_nodes(node)
        self.assertIn("[1]: https://duckduckgo.com", ''.join(node.modified_lines))

    # test should remove duplicate urls and condense them
    def test_duplicate_links_cleaned(self):
        """We should remove the duplicate foot urls as we encounter them"""
        node = Node('root')
        node.lines = [
            "## Overview\n", "\n",
            "Lorem ipsum dolor [sit amet][1], consectetur adipiscing elit.\n",
            "Suspendisse [odio augue][2], posuere commodo faucibus non, elementum et metus.\n",
            "Lorem [ipsum dolor][3] sit amet, consectetur adipiscing elit.\n",
            "Suspendisse odio augue, posuere commodo faucibus non, [elementum et metus][4].\n",
            "Lorem ipsum dolor sit amet, [consectetur][5] adipiscing elit.\n",
            "[Suspendisse][6] odio augue, posuere commodo faucibus non, elementum et metus.\n",
            "\n",
            "[1]: https://app.datadoghq.com/dashboard/lists\n",
            "[2]: https://app.datadoghq.com/notebook/list\n",
            "[3]: /continuous_integration/pipelines/\n",
            "[4]: /continuous_integration/tests/\n",
            "[5]: /continuous_integration/pipelines/\n",
            "[6]: /continuous_integration/tests/\n",
        ]
        process_nodes(node)
        self.assertIn("[3]: /continuous_integration/pipelines/", ''.join(node.modified_lines))
        self.assertIn("[4]: /continuous_integration/tests/", ''.join(node.modified_lines))
        self.assertNotIn("[5]: /continuous_integration/pipelines/", ''.join(node.modified_lines))
        self.assertNotIn("[6]: /continuous_integration/tests/", ''.join(node.modified_lines))

    def test_footer_numbers_reordered_after(self):
        """if we have 1,2,3,4,5 and we remove 3 items to the right should reorder only"""
        node = Node('root')
        node.lines = [
            "## Overview\n", "\n",
            "Lorem ipsum dolor [sit amet][1], consectetur adipiscing elit.\n",
            "Suspendisse [odio augue][2], posuere commodo faucibus non, elementum et metus.\n",
            "Suspendisse odio augue, posuere commodo faucibus non, [elementum et metus][4].\n",
            "Lorem ipsum dolor sit amet, [consectetur][5] adipiscing elit.\n",
            "\n",
            "[1]: https://app.datadoghq.com/dashboard/lists\n",
            "[2]: https://app.datadoghq.com/notebook/list\n",
            "[3]: /this/will/be/removed/\n",
            "[4]: /continuous_integration/tests/\n",
            "[5]: /continuous_integration/pipelines/\n",
        ]
        process_nodes(node)
        self.assertIn("[3]: /continuous_integration/tests/", ''.join(node.modified_lines))
        self.assertIn("[4]: /continuous_integration/pipelines/", ''.join(node.modified_lines))

    def test_complex_text_link(self):
        node = Node('root')
        node.lines = [
            "---\n",
            "title: Config-provided hostname starting with `ip-` or `domu`\n",
            "kind: faq\n",
            "---\n",
            "\n",
            "See [Config-provided hostname starting with `ip-` or `domu`](https://github.com/DataDog/datadog-agent/blob/master/docs/agent/hostname_force_config_as_canonical.md)."
        ]
        process_nodes(node)
        expected = [
            "---\n",
            "title: Config-provided hostname starting with `ip-` or `domu`\n",
            "kind: faq\n",
            "---\n",
            '\n',
            'See [Config-provided hostname starting with `ip-` or `domu`][1].\n',
            '[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/hostname_force_config_as_canonical.md\n'
        ]
        self.assertEqual(expected, node.modified_lines)

    # we should make the code understand single quote code blocks and ignore `\b[4|5][0-9][0-9]\b`
    def test_square_bracket_values_in_text(self):
        node = Node('root')
        node.lines = ['\n', '## Foo\n', '\n', '1. Push to your fork and [submit a pull request][https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master]\n', '\n', 'Some examples of regular expressions that can be used for log filtering:\n', '\n', '- Include (or exclude) Lambda platform logs: `"(START|END) RequestId:\\s`. Note: The preceding `"` is needed to match the start of the log message, which is in a json blob (`{"message": "START RequestId...."}`). Datadog recommends keeping the `REPORT` logs, as they are used to populate the invocations list in the serverless function views.\n', '- Include CloudTrail error messages only: `errorMessage`\n', '- Include only logs containing an HTTP 4XX or 5XX error code: `\x08[4|5][0-9][0-9]\x08`\n', '- Include only CloudWatch logs where the `message` field contains a specific JSON key/value pair: `\\"awsRegion\\":\\"us-east-1\\"`\n', '  - The message field of a CloudWatch log event is encoded as a string. `{"awsRegion": "us-east-1"}` is encoded as `{"awsRegion":"us-east-1"}`.\n', '    The pattern you provide must therefore include extra `\\` escape characters.\n', '\n']
        with self.assertLogs('format_link', level='INFO') as cm:
            process_nodes(node)
            expected = [
                "WARNING:format_link:'<root>' has no footer links but references "
                'them:\n'
                '\t[submit a pull '
                'request][https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master]\n'
            ]
            self.assertEqual(expected, cm.output)

    def test_hashtag_link(self):
        node = Node('root')
        node.lines = [
            "---\n",
            "title: foo\n",
            "kind: foo\n",
            "---\n",
            "\n",
            "See [Providing metadata with XPath expressions](#providing-metadata-with-xpath-expressions)"
        ]
        process_nodes(node)
        expected = [
            "---\n",
            "title: foo\n",
            "kind: foo\n",
            "---\n",
            '\n',
            'See [Providing metadata with XPath '
            'expressions][1]\n'
            '[1]: #providing-metadata-with-xpath-expressions\n'
        ]
        self.assertEqual(expected, node.modified_lines)

    def test_ignored_blocks_do_not_process(self):
        root = Node('root')
        c1 = Node('```')
        c1.ignore = True
        c1.is_closing_shortcode = True
        c1.line_start = 7
        c1.line_end = 8
        c1.lines = ['```\n', '* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})\n', '```\n']
        c1.parent = root
        c2 = Node('```')
        c2.ignore = True
        c2.is_closing_shortcode = True
        c2.line_start = 12
        c2.line_end = 13
        c2.lines = ['```\n', '* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})\n', '```\n']
        c2.parent = root
        root.children = [c1, c2]
        root.lines = ['\n', '### Dynamic links\n', '\n',
                      'Use template variables to dynamically link to a related resource for your investigation.\n',
                      '\n',
                      'For example, if a signal detects a suspicious user login, use `{{@user.id}}` to create a dynamic link to another resource:\n',
                      '\n', '```\n', '```\n', '\n',
                      'Or, if a signal is tagged with a specific service, use the `{{@service}}` variable to create a dynamic link:\n',
                      '\n', '```\n', '```\n']
        process_nodes(root)
        self.assertNotIn("[Investigate user in the authentication dashboard][1]", ''.join(root.modified_lines))

    def test_special_chars(self):
        """ we should be able to parse `@notification` """
        root = Node('root')
        root.lines = ['`\x1d@notification`\x1c']
        process_nodes(root)
        actual = ''.join(root.modified_lines)
        expected = "`@notification`"
        self.assertEqual(actual, expected)

    def test_footlink_with_parenthesis_unchanged(self):
        """[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)"""
        node = Node('root')
        node.lines = [
            'See [here][1]'
            '\n',
            '[1]: http://en.wikipedia.org/wiki/Norm_(mathematics)',
            '\n'
        ]
        process_nodes(node)
        actual = ''.join(node.modified_lines)
        expected = ''.join(node.lines)
        self.assertEqual(actual, expected)

    def test_footlinks_amongst_text_retains_all_content(self):
        node = Node('root')
        node.lines = [
            '#### Programmatic Management\n',
            'The instructions on this page outline the process to configure the Azure Native integration through the Azure Portal. If you prefer programmatic options, you can also leverage:\n',
            '- [Azure CLI for Datadog][62]\n'
            '- [Azure Terraform Provider for Datadog][63] (make sure to include the [Role assignment block][64])\n',
            'If you have many subscriptions you want to monitor with the Azure Native integration, Datadog recommends using Terraform to create the Datadog resources. To learn about configuring Terraform across multiple subscriptions, see this blog post about [Deploying to multiple Azure subscriptions using Terraform][65].\n',
            '\n',
            '[62]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest\n',
            '[63]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors\n',
            '[64]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment\n',
            '[65]: https://medium.com/codex/deploying-to-multiple-azure-subscriptions-using-terraform-81249a58a600\n',
            '\n',
            '#### Create Datadog resource\n',
            'To start monitoring an Azure subscription, navigate to the [Datadog Service page in Azure][8] and select the option to create a new Datadog resource:\n',
            '{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}\n',
            '\n',
            '[8]: https://www.google.com\n'
        ]
        process_nodes(node)
        expected = [
            '#### Programmatic Management\n',
            'The instructions on this page outline the process to configure the Azure '
            'Native integration through the Azure Portal. If you prefer programmatic '
            'options, you can also leverage:\n',
            '- [Azure CLI for Datadog][2]\n',
            '- [Azure Terraform Provider for Datadog][3] (make sure to include the [Role '
            'assignment block][4])\n',
            'If you have many subscriptions you want to monitor with the Azure Native '
            'integration, Datadog recommends using Terraform to create the Datadog '
            'resources. To learn about configuring Terraform across multiple '
            'subscriptions, see this blog post about [Deploying to multiple Azure '
            'subscriptions using Terraform][5].\n',
            '\n',
            '#### Create Datadog resource\n',
            'To start monitoring an Azure subscription, navigate to the [Datadog Service page in Azure][8] and select the option to create a new Datadog resource:\n',
            '{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog Service" responsive="true" style="width:90%;">}}\n',
            '\n',
            '[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors\n',
            '[2]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest\n',
            '[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors\n',
            '[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment\n',
            '[5]: https://medium.com/codex/deploying-to-multiple-azure-subscriptions-using-terraform-81249a58a600\n',
            '[8]: https://www.google.com\n'
        ]
        self.assertEqual(expected, node.modified_lines)


class TestFormatLinkFile(unittest.TestCase):

    def test_should_error_when_no_args(self):
        with self.assertRaises(ValueError):
            actual = format_link_file()

    @mock.patch('argparse.ArgumentParser.parse_args', return_value=argparse.Namespace(source='content/en/foo/bar.md'))
    @mock.patch('format_link.parse_file', return_value=Node('fakeroot'))
    @mock.patch('format_link.process_nodes')
    @mock.patch('format_link.assemble_nodes')
    @mock.patch('format_link.open', new_callable=mock.mock_open())
    def test_should_return_string(self, mock_open, mock_assemble_nodes, mock_process_nodes, mock_parse_file,
                                      mock_parse_args):
        response = format_link_file('path/to/file.md')
        actual = type(response)
        expected = str
        self.assertEqual(actual, expected)


class TestMain(unittest.TestCase):

    @mock.patch('argparse.ArgumentParser.parse_args', return_value=argparse.Namespace(source='content/en/foo/bar.md'))
    @mock.patch('format_link.format_link_file', return_value='Hello fake text')
    @mock.patch('format_link.open', new_callable=mock.mock_open())
    @mock.patch('pathlib.Path.is_file', return_value=lambda x: True)
    def test_file_passed_is_processed(self, mock_path, mock_open, mock_format_link_file_response, mock_parse_args):
        """
        Mock all the actual processing and lets check that passing a file does actually attempt to write to file
        """
        main()
        mock_open.assert_called_once_with(PosixPath('content/en/foo/bar.md'), 'w')

    # @mock.patch('argparse.ArgumentParser.parse_args', return_value=argparse.Namespace(source='content/en/foo/'))
    # @mock.patch('format_link.format_link_file', return_value='Hello fake text')
    # @mock.patch('format_link.open', new_callable=mock.mock_open())
    # def test_dir_passed_is_processed(self, mock_open, mock_format_link_file_response, mock_parse_args):
    #     with self.assertRaises(TypeError):
    #         main()


if __name__ == '__main__':
    unittest.main()


# shouldn't erase the nextlinks content/en/containers/_index.md
# weird table added at bottom in content/en/database_monitoring/setup_mysql/_index.md
# weird ending on en/dashboards/widgets/timeseries.md
# if we don't need to modify the file we shouldn't e.g all links are in table already
# oneliner/inline shortcodes?
