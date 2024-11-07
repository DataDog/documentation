from mako.template import Template
from docutils import nodes
import argparse
import re

parser=argparse.ArgumentParser()

parser.add_argument('--deleted', help="A list of deleted files")
parser.add_argument('--renamed', help="A list of renamed files")
parser.add_argument('--modified', help="A list of modified files")
parser.add_argument('--added', help="A list of added files")

args=parser.parse_args()

comment_template = Template(filename='local/bin/py/preview-links-template.mako')

pattern1 = re.compile('content/en/(.*?).md')
pattern2 = re.compile('content/en/glossary/terms/(.*?).md')

# Grab YAML frontmatter from markdown file
def grab_glossary_title(filename):
    with open(filename) as f:
        anchor = f.read().split('---')[1].split('title: ')[1].split('\n')[0]
        anchor = nodes.make_id(anchor)
    new_filename = 'glossary/#' + anchor
    return new_filename

def compile_filename(filename):
    if pattern2.match(filename):
        return grab_glossary_title(filename)
    elif pattern1.match(filename):
        filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '')
        return filename

def sort_files(file_string):
    final_array = []
    initial_array = file_string.split(" ")
    for filename in initial_array:
        if filename.endswith('.md'):
            if pattern1.match(filename) or pattern2.match(filename):
                final_array.append(compile_filename(filename))
    return final_array

# It looks like renamed files are counted as removed/added. I'm going to leave "renamed" in for
# now to see if this behavior is consistent. 
with open('.github/preview-links-template.md', 'w') as f:
    f.write(comment_template.render(
                deleted = sort_files(args.deleted) if args.deleted else False,
                renamed = sort_files(args.renamed) if args.renamed else False,
                modified = sort_files(args.modified) if args.modified else False,
                added = sort_files(args.added) if args.added else False
                )
            )
