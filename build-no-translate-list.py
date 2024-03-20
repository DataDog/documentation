import yaml

def find_no_translate(node):
    if isinstance(node, list):
        for i in node:
            find_no_translate(i)
    elif isinstance(node, dict):
        for k, v in node.items():
            if isinstance(v, str) and '#no-translate' in v:
                print(k)
            else:
                find_no_translate(v)

with open('/Users/colin.cole/webops/documentation/config/_default/menus/menus.en.yaml', 'r') as file:
    data = yaml.safe_load(file)
    find_no_translate(data)