<!DOCTYPE html>

<html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;&display=swap" rel="stylesheet">
        <style>
            html {
                background-color: linen;
                padding: 25px;
            }
            h2, table {
                font-family: 'Roboto', sans-serif;
            }
            th, td {
                padding: 15px;
                border: 1px solid black;
                border-collapse: collapse;
            }
            table {
                border: 1px solid black;
                border-collapse: collapse;
            }
        </style>
    </head>
    <title>Docs config file</title>
    <h1>Docs config file</h1>

<%
import yaml
import requests
r = requests.get('https://github.com/DataDog/documentation/raw/master/local/bin/py/build/configurations/pull_config.yaml')
data = yaml.safe_load(r.content)
%>

% for org in data:
    % for repo in org['repos']:
    <h2>${org['org_name']+'/'+repo['repo_name']}</h2>
    <table>
        <tr>
            <th>Action</th>
            <th>From</th>
            <th>To</th>
        </tr>
        % for content in repo['contents']:
            % if content['action'] in ['pull-and-push-file', 'security-rules']:
                % for glob in content['globs']:
                    <% from_file = "https://github.com/" + org['org_name'] + '/' + repo['repo_name'] + "/blob/" + content['branch']+ '/' + glob %>
                    <% to_file = "https://docs.datadoghq.com" %>
                    % if 'dest_path' in content['options']:
                        <% to_file = to_file + content['options']['dest_path'] %>
                        % if 'file_name' in content['options']:
                            <% to_file = to_file + content['options']['file_name'] %>
                        % endif
                    % elif 'dest path' not in content['options']:
                        <% to_file = "N/A"%>
                    % endif
        <tr>
            <td>${content['action']}</td>
            <td>${from_file}</td>
            <td>${to_file}</td>
        </tr>
                % endfor
            % elif content['action']=='pull-and-push-folder':
                % for glob in content['globs']:
                    <% from_file = "https://github.com/" + org['org_name'] + '/' + repo['repo_name'] + "/blob/" + content['branch'] + '/' + glob %>
                    <% to_remove = content['options']['path_to_remove'] %>
                    % if to_remove in glob:
                        <% glob = glob.replace(to_remove,'') %>
                    % endif
                    % if 'dest_dir' in content['options']:
                        <% dest = content['options']['dest_dir'].replace('/','',1) %>
                        <% glob = dest + glob %>
                        <% to_file = "https://docs.datadoghq.com/" + glob %>
                    % endif
        <tr>
            <td>${content['action']}</td>
            <td>${from_file}</td>
            <td>${to_file}</td>
        </tr>
                % endfor
            % else:
                % for glob in content['globs']:
                    <% from_file = "https://github.com/" + org['org_name'] + '/' + repo['repo_name'] + "/blob/" + content['branch'] + '/' + glob %>
                    <% to_file = "N/A"%>
        <tr>
            <td>${content['action']}</td>
            <td>${from_file}</td>
            <td>${to_file}</td>
        </tr>
                % endfor
            % endif
        % endfor
    </table>
    % endfor
% endfor
</html>