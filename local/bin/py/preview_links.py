from mako.template import Template
import argparse

parser=argparse.ArgumentParser()

parser.add_argument('--deleted', help="A list of deleted files")
parser.add_argument('--renamed', help="A list of renamed files")
parser.add_argument('--modified', help="A list of modified files")
parser.add_argument('--added', help="A list of added files")

args=parser.parse_args()

comment_template = Template(filename='local/bin/py/preview-links-template.mako')

# It looks like renamed files are counted as removed/added. I'm going to leave "renamed" in for
# now to see if this behavior is consistent. 
with open('.github/preview-links-template.md', 'w') as f:
    f.write(comment_template.render(
                deleted = args.deleted.split(" ") if args.deleted else False,
                renamed = args.renamed.split(" ") if args.renamed else False,
                modified = args.modified.split(" ") if args.modified else False,
                added = args.added.split(" ") if args.added else False            
                )
            )
