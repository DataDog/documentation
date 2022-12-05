#!/usr/bin/env python3
import glob
import json
import os
import re
from itertools import chain

import yaml
import logging
from pathlib import Path
from jinja2 import Environment, Template, select_autoescape, Undefined
from jinja2.loaders import DictLoader

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING)

TEMPLATE = """\
---
{front_matter}
---

{content}
"""


class SilentUndefined(Undefined):
    def _fail_with_undefined_error(self, *args, **kwargs):
        return None

nop = lambda *a, **k: None

def load_templated_file(f):
    # read without the import first line
    f.seek(0)
    content_without_import = ''.join(f.readlines()[1:])
    env = Environment(
        undefined=SilentUndefined,
        loader=DictLoader(dict()),
        autoescape=select_autoescape(),
        variable_start_string="{@",
        variable_end_string="@}"
    )
    template = env.from_string(content_without_import)
    data = yaml.safe_load(template.render(fim={'watch_files': nop}))
    return data

def update_global_aliases(index_path, global_aliases):
    content = ''
    new_yml = {}
    boundary = re.compile(r'^-{3,}$', re.MULTILINE)
    with open(index_path, 'r') as f:
        content = f.read()
    split = boundary.split(content, 2)
    _, fm, content = split
    new_yml = yaml.safe_load(fm)
    fm_aliases = list(set(new_yml.get("aliases", []) + global_aliases))
    new_yml['aliases'] = fm_aliases
    with open(index_path, mode='w', encoding='utf-8') as out_file:
        output_content = TEMPLATE.format(front_matter=yaml.dump(new_yml, default_flow_style=False).strip(),
                        content=content.strip())
        out_file.write(output_content)

def security_rules(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    logger.info("Starting security rules action...")
    global_aliases = []
    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):
        data = None

        if file_name.endswith(".json"):
            with open(file_name, mode="r+") as f:
                try:
                    data = json.loads(f.read())
                except:
                    logger.warn(f"Error parsing {file_name}")
        elif file_name.endswith(".yaml"):
            with open(file_name, mode="r+") as f:
                try:
                    file_text_content = f.read()
                    if 'jinja2' in file_text_content:
                        data = load_templated_file(f)
                    else:
                        data = yaml.safe_load(file_text_content)
                except:
                    logger.warn(f"Error parsing {file_name}")

        if not data:
            continue

        p = Path(f.name)
        message_file_name = p.with_suffix('.docs.md')
        if not message_file_name.exists():
            message_file_name = p.with_suffix('.md')
            if not message_file_name.exists():
                continue

        # delete file or skip if staged
        # any() will return True when at least one of the elements is Truthy
        # TODO: remove isStaged check after upstream removal
        if len(data.get('restrictedToOrgs', [])) > 0 or data.get('isStaged', False) or data.get('isShadowDeployed', False) \
            or data.get('isDeleted', False) or not data.get('isEnabled', True) or data.get('isDeprecated', False):
            if p.exists():
                logger.info(f"removing file {p.name}")
                global_aliases.append(f"/security_monitoring/default_rules/{p.stem}")
                global_aliases.append(f"/security_platform/default_rules/{p.stem}")
                p.unlink()
            else:
                logger.info(f"skipping file {p.name}")
            continue

        # The message of a detection rule is located in a Markdown file next to the rule definition
        with open(str(message_file_name), mode="r+") as message_file:
            message = message_file.read()

            # strip out [text] e.g "[CIS Docker] Ensure that.." becomes "Ensure that..."
            parsed_title = re.sub(r"\[.+\]\s?(.*)", "\\1", data.get('name', ''), 0, re.MULTILINE)
            page_data = {
                "title": parsed_title,
                "kind": "documentation",
                "type": "security_rules",
                "disable_edit": True,
                "aliases": [
                    f"{data.get('defaultRuleId', '').strip()}",
                    f"/security_monitoring/default_rules/{data.get('defaultRuleId', '').strip()}",
                    f"/security_monitoring/default_rules/{p.stem}"
                ],
                "rule_category": [],
                "integration_id": ""
            }

            # we need to get the path relative to the repo root for comparisons
            extract_dir, relative_path = str(p.parent).split(f"/{content['repo_name']}/")
            # lets build up this categorization for filtering purposes

            # previous categorization
            if relative_path.startswith('configuration'):
                page_data['rule_category'].append('Posture Management (Cloud)')
                page_data['rule_category'].append('Cloud Security Management')
            elif relative_path.startswith('runtime'):
                if 'compliance' in relative_path:
                    page_data['rule_category'].append('Posture Management (Infra)')
                    page_data['rule_category'].append('Cloud Security Management')
                else:
                    page_data['rule_category'].append('Workload Security')
                    page_data['rule_category'].append('Cloud Security Management')

            # new categorization
            if any(sub_path in relative_path for sub_path in ['security-monitoring', 'cloud-siem']):
                if 'signal-correlation/production' in relative_path:
                    page_data['rule_category'].append('Cloud SIEM (Signal Correlation)')
                else:
                    page_data['rule_category'].append('Cloud SIEM (Log Detection)')

            if 'posture-management' in relative_path:
                if 'cloud-configuration' in relative_path:
                    page_data['rule_category'].append('Posture Management (Cloud)')
                    page_data['rule_category'].append('Cloud Security Management')
                if 'infrastructure-configuration' in relative_path:
                    page_data['rule_category'].append('Posture Management (Infra)')
                    page_data['rule_category'].append('Cloud Security Management')

            if 'workload-security' in relative_path:
                page_data['rule_category'].append('Workload Security')
                page_data['rule_category'].append('Cloud Security Management')

            if 'application-security' in relative_path:
                page_data['rule_category'].append('Application Security')

            tags = data.get('tags', [])
            if tags:
                for tag in tags:
                    if ':' in tag:
                        key, value = tag.split(':')
                        page_data[key] = value
                if data.get('source', ''):
                    page_data["source"] = data.get('source', '')
            else:
                # try build up manually
                source = data.get('source', None)
                tech = data.get('framework', {}).get('name', '').replace('cis-', '')
                page_data["source"] = source or tech
                page_data["security"] = "compliance"
                page_data["framework"] = data.get('framework', {}).get('name', '')
                page_data["control"] = data.get('control', '')
                page_data["scope"] = tech

            # Hardcoded rules in cloud siem which can span several different log sources do not include a source tag
            if any(sub_path in relative_path for sub_path in ['security-monitoring', 'cloud-siem']):
                is_hardcoded = not page_data.get("source", None)
                if is_hardcoded:
                    page_data["source"] = "multi Log Sources"

            # lowercase them
            if page_data.get("source", None):
                page_data["source"] = page_data["source"].lower()
            if page_data.get("scope", None):
                page_data["scope"] = page_data["scope"].lower()

            # integration id
            page_data["integration_id"] = page_data.get("scope", None) or page_data.get("source", "")
            cloud = page_data.get("cloud", None)
            if cloud and cloud == 'aws':
                page_data["integration_id"] = "amazon-{}".format(page_data["integration_id"])

            front_matter = yaml.dump(page_data, default_flow_style=False).strip()
            output_content = TEMPLATE.format(front_matter=front_matter, content=message.strip())

            dest_dir = Path(f"{content_dir}{content['options']['dest_path']}")
            dest_dir.mkdir(exist_ok=True)
            dest_file = dest_dir.joinpath(p.name).with_suffix('.md')
            logger.info(dest_file)
            with open(dest_file, mode='w', encoding='utf-8') as out_file:
                out_file.write(output_content)

    # add global aliases from deleted files to _index.md
    if os.environ.get('CI_ENVIRONMENT_NAME', '') in ('live', 'preview'):
        index_path = Path(f"{content_dir}{content['options']['dest_path']}_index.md")
        update_global_aliases(index_path, global_aliases)
