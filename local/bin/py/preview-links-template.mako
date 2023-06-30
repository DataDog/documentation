<%
import re
import os

h2 = "##"
h3 = '###'
pattern1 = re.compile('content/en/(.*?).md')
pattern2 = re.compile('content/en/glossary/terms/(.*?).md')

branch = os.environ["branch"]

def compile_filename(filename):
    if pattern2.match(filename):
        filename = filename.replace('content/en/', '').replace('terms/', '#').replace('.md', '')
    elif pattern1.match(filename):
        filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '')
    return filename    
%>

${h2} Preview links (active after the `build_preview` check completes)

% if added:
${h3} New or renamed files
% for filename in added:
* https://docs-staging.datadoghq.com/${branch}/${compile_filename(filename)}
% endfor 
% endif

% if deleted:
${h3} Removed or renamed files (these should redirect)
% for filename in added:
* https://docs-staging.datadoghq.com/${branch}/${compile_filename(filename)}
% endfor 
% endif

% if renamed:
${h3} Renamed files
% for filename in added:
* https://docs-staging.datadoghq.com/${branch}/${compile_filename(filename)}
% endfor 
% endif

% if modified:
${h3} Modified Files
% for filename in added:
* https://docs-staging.datadoghq.com/${branch}/${compile_filename(filename)}
% endfor 
% endif