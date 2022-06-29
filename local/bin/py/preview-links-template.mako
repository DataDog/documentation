<%
import re
import os

h2 = "##"
h3 = '###'
p = re.compile('content/en/(.*?).md')

branch = os.environ["branch"]
%>

${h2} Preview links (active after the `build_preview` check completes)

% if added:
${h3} New or renamed files
    % for filename in added:
        % if p.match(filename):
<% filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '') %>\
* https://docs-staging.datadoghq.com/${branch}/${filename}
        % endif         
    % endfor
% endif

% if deleted:
${h3} Removed or renamed files (these should redirect)
    % for filename in deleted:
        % if p.match(filename):
<% filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '') %>\
* https://docs-staging.datadoghq.com/${branch}/${filename}     
        % endif         
    % endfor
% endif

% if renamed:
${h3} Renamed files
    % for filename in renamed:
        % if p.match(filename):
<% filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '') %>\
* https://docs-staging.datadoghq.com/${branch}/${filename} 
        % endif         
    % endfor
% endif

% if modified:
${h3} Modified Files
    % for filename in modified:
        % if p.match(filename):
<% filename = filename.replace('content/en/', '').replace('_index', '').replace('.md', '') %>\
* https://docs-staging.datadoghq.com/${branch}/${filename}
        % endif         
    % endfor
% endif