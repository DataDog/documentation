#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os
import re
import glob
from collections import OrderedDict, namedtuple
import logging
import sys
from pathlib import Path


class Formatter(logging.Formatter):
    def format(self, record):
        reset = "\x1b[0m"
        color = {
            logging.INFO: 32,
            logging.WARNING: 33,
            logging.ERROR: 31,
            logging.FATAL: 31,
            logging.DEBUG: 36
        }.get(record.levelno, 0)
        self._style._fmt = f"\x1b[{color}m%(levelname)s:{reset} [%(file_processing)s] %(message)s"
        return super().format(record)


current_file_processing = ""


class ContextFilter(logging.Filter):
    def filter(self, record):
        record.file_processing = current_file_processing
        return True


logger = logging.getLogger(__name__)
logger.propagate = False
f = ContextFilter()
logger.addFilter(f)

if not logger.handlers:
    # log colored streams
    stream_handler = logging.StreamHandler(stream=sys.stdout)
    stream_handler.setFormatter(Formatter())
    stream_handler.setLevel(logging.INFO)
    logger.addHandler(stream_handler)

# log only debug messages to file in ci
if os.getenv("CI_COMMIT_REF_NAME"):
    file_handler = logging.FileHandler(os.path.join(os.getenv("CI_PROJECT_DIR", ''), 'format_link.debug.log'))
    file_handler.setLevel(logging.DEBUG)
    file_handler.addFilter(lambda record: record.levelno == logging.DEBUG)
    logger.addHandler(file_handler)


class Node:
    __slots__ = ['name', 'children', 'parent', 'lines', 'modified_lines', 'position', 'ignore', 'is_closing_shortcode',
                 'line_start', 'line_end', 'char_start', 'char_end']

    def __init__(self, name, ignore=False):
        self.name = name
        self.parent = None
        self.children, self.lines, self.modified_lines = [], [], []
        self.line_start, self.line_end, self.char_start, self.char_end = 0, 0, 0, 0
        self.ignore = ignore
        self.is_closing_shortcode = False

    def add(self, child):
        child.parent = self
        self.children.append(child)

    def push_line(self, line):
        self.lines.append(line)

    def pop_line(self):
        return self.lines.pop()

    def reparent_children(self, node):
        # moves nodes children and put it adjacent to node
        children, self.children[:] = self.children[:], []
        self.parent.children += children
        for child in children:
            # adjust child line offsets
            child.line_start += self.line_start
            child.line_end += self.line_start
            # re-parent
            child.parent = node

    def __repr__(self):
        return repr(f"<{self.name}>")

    def __eq__(self, other):
        return self.name == other.name


def parse_file(file):
    """
    Goes through a file and parses it into different sections. Those sections are a list of lines and are put within an Array.
    The first item of the Array is the main section, all other item if any are sub sections, a.k.a tabs within the page.

    :param file: file to break down into sections.
    :return root: Root node from parsing
    """
    root = Node("root")
    current_node = root

    open_tag_regex = r"{{[<|%]\s+([A-Za-z0-9-_]+)(.*?)\s*[%|>]}}"
    closed_tag_regex = r"{{[<|%]\s+/([A-Za-z0-9-_]+)(.*?)\s*[%|>]}}"
    ignore_shortcodes = ('code-block', )

    with open(file, 'r', encoding='utf-8') as f:
        new_line_number = 0
        for line_number, line in enumerate(f):

            # store the current line in the current node
            current_node.push_line(line)
            new_node = None

            # is this an opening triple backtick code block
            tickmatches = list(re.finditer("^\s*```", line, re.MULTILINE))
            if tickmatches and current_node.name != "```":
                current_node.char_start = 0
                new_node = Node("```", True)

                # if we entered a new node lets set it as the current
                if new_node:
                    current_node.add(new_node)
                    current_node = new_node
                    current_node.push_line(line)
                    current_node.line_start = new_line_number
                    new_line_number = 0

            # find new open shortcode tags and create a node
            if not current_node.ignore:
                matches = re.finditer(open_tag_regex, line, re.MULTILINE)
                for matchNum, match in enumerate(matches, start=1):
                    tag_name, current_node.char_start, current_node.char_end = match.group(1), match.start(0), match.end()
                    new_node = Node(tag_name, tag_name in ignore_shortcodes)

                    # if we entered a new node lets set it as the current
                    if new_node:
                        current_node.add(new_node)
                        current_node = new_node
                        current_node.push_line(line)
                        current_node.line_start = new_line_number
                        new_line_number = 0

            # is this a closing triple backtick code block
            if current_node.name == "```" and tickmatches and not new_node:
                current_node.is_closing_shortcode = True
                current_node.char_end = 0
                current_node.line_end = current_node.line_start + 1
                new_line_number = current_node.line_end
                current_node = current_node.parent
                current_node.push_line(line)

            # check for closing node and return up the chain to the parent node for next iteration
            matches = re.finditer(closed_tag_regex, line, re.MULTILINE)
            is_same_line = new_line_number == 0
            for matchNum, match in enumerate(matches, start=1):
                tag_name, current_node.char_end = match.group(1), match.end(0)
                if is_same_line and tag_name == current_node.name:
                    node_to_close = current_node
                else:
                    # we need to go to each parent to match the closer
                    node_to_close = find_matching_closer(current_node, tag_name)
                if node_to_close:
                    node_to_close.char_end = current_node.char_end
                    node_to_close.is_closing_shortcode = True
                    # if we closed on the same line we don't want to add the line again and end_line is the same
                    node_to_close.line_end = node_to_close.line_start if is_same_line else node_to_close.line_start + 1
                    new_line_number = node_to_close.line_end
                    current_node = node_to_close.parent
                    if not is_same_line:
                        current_node.push_line(line)
                else:
                    logger.warning(f'Failed to find closing tag {tag_name} (Skipping Format):\n\t{line}')
                    raise SystemExit(0)

            new_line_number += 1

    return root


def find_matching_closer(node, tag_name):
    out = None
    if node:
        if tag_name == node.name and node.parent:
            out = node
        else:
            out = find_matching_closer(node.parent, tag_name)
    return out


def adjust_one_liner_shortcodes(node):
    """
    Problem: As we can't find a closing tag for a one liner shortcode everything becomes nested under this shortcode
    Solution: Now we have finished parsing the file, this functions purpose is to adjust the hierarchy knowing that
    children of a one lined shortcode should really be adjacent nodes
    @param node: node

    e.g where partial is a one lined unclosed shortcode
    this:
    <root>
        <partial>
            <site-region>

    becomes this:
    <root>
        <partial>
        <site-region>
    """
    for i, n in enumerate(node.children):
        if not n.is_closing_shortcode:
            n.line_end = n.line_start
            n.reparent_children(node)
            # move lines of text to parent
            lines_without_first, n.lines = n.lines[1:], n.lines[0:1]
            n.char_end = len(n.lines[0])
            node.lines += lines_without_first
            # adjust child content to just be the tag
            # e.g 'Lorem ipsum {{ something foo="bar" }} foobar\n' becomes '{{ something foo="bar" }}'
            n.lines = [n.lines[0][n.char_start:n.char_end]]
        adjust_one_liner_shortcodes(n)


def process_nodes(node):
    """
    TODO: this function is way too big
    Takes the parsed node structure and processes the link formatting we desire throughout each node.
    @param node: node
    """
    if node.name != 'root' and (node.ignore or not node.is_closing_shortcode):
        # ignored nodes we still need to return its original text or its removed
        node.modified_lines = node.lines
    else:
        content = ''.join(node.lines)

        # extract footer reference links
        refs = {}
        ref_nums = []
        matches = re.finditer(r"^\s*\[(\d*?)\]: (\S*)", content, re.MULTILINE)
        for matchNum, match in enumerate(matches, start=1):
            ref_num, ref_link = int(match.group(1)), match.group(2)
            # alert on duplicate reference numbers
            if ref_num in ref_nums:
                logger.warning(f'{node} has duplicated reference index numbers (Skipping Format):\n\t[{ref_num}]: {ref_link}\n\t[{ref_num}]: {refs[ref_num]}')
                raise SystemExit(0)
            else:
                refs[ref_num] = ref_link
                ref_nums.append(ref_num)
        all_references = OrderedDict(sorted(refs.items()))

        # if we have [foo][1] in a section but no footer links its referencing
        # it's likely the user put the footer link in the root of the document
        # TODO: as well as this warning we should attempt to source the link from the root of document
        if not all_references and re.search(r"\[.*?\]\[(?![#?])(\S*?)\]", content) is not None:
            matches = re.finditer(r"\[.*?\]\[(?![#?])(\S*?)\]", content, re.MULTILINE)
            logger.warning(f"{node} has no footer links but references them:\n" + "\n".join([f"\t{match.group(0)}" for match in matches]))

        # remove footer reference links
        # content = re.sub(r"^\s*\[(\d*?)\]: (\S*)", "", content, 0, re.MULTILINE)
        start_line, end_line = 0, 0
        prev_line_non_link = True
        for ln, line in enumerate(node.lines):
            if re.search(r"^\s*\[(\d*?)\]: (\S*)", line):
                if prev_line_non_link:
                    start_line = ln
                else:
                    end_line = ln + 1
                prev_line_non_link = False
            else:
                prev_line_non_link = True

        # inline existing footer reference links
        for reference_index, reference_val in all_references.items():
            current_link = f'][{reference_index}]'
            content = content.replace(current_link, f']({reference_val})')

        # extract all inlined links it can find and try and maintain their number if we can so there is less of a diff
        all_references_flipped = {}
        for x, y in all_references.items():
            if y not in all_references_flipped.keys():
                all_references_flipped[y] = x
        refs = {}
        matches = re.finditer(r"\[.*?\]\((?![#?])(\S*?)\)", content, re.MULTILINE)
        for match in matches:
            inline_ref_link = match.group(1)
            inline_ref_num = all_references_flipped.get(inline_ref_link, None)
            if inline_ref_num:
                refs[inline_ref_num] = inline_ref_link
            else:
                # link that wasn't in existing footer list, start at 1000 to avoid conflicts.
                refs[len(refs) + 1000] = inline_ref_link
        inline_refs = OrderedDict(sorted(refs.items()))

        # re-order numbers where needed
        #for index, val in inline_refs.items():
        from itertools import groupby
        from operator import itemgetter
        data = inline_refs.keys()
        new = {}
        for k, g in groupby(enumerate(data), lambda ix : ix[0] - ix[1]):
            #print(list(map(itemgetter(1), g)))
            #print(list(g))
            for x in g:
                new[x[0] + 1] = inline_refs[x[1]]
        #print(new)
        inline_refs = OrderedDict(sorted(new.items()))


        # create reference footer section again
        for reference_index, reference_val in inline_refs.items():
            link_to_reference = '](' + str(reference_val) + ')'
            # i is incremented by one in order to start references indexes at 1
            content = content.replace(link_to_reference, '][' + str(reference_index) + ']')

        # assign completed content changes
        # splitlines splits on other weird characters that are sometimes copied and pasted in md files, lets remove
        # https://docs.python.org/3/library/stdtypes.html#str.splitlines
        # TODO: better way to do this?
        cleaned_content = content.replace("\u2029", "") # Paragraph Separator
        cleaned_content = cleaned_content.replace("\u2028", "") # Line Separator
        cleaned_content = cleaned_content.replace("\x85", "") # Next Line (C1 Control Code)
        cleaned_content = cleaned_content.replace("\x1e", "") # Record Separator
        cleaned_content = cleaned_content.replace("\x1d", "") # Group Separator
        cleaned_content = cleaned_content.replace("\x1c", "") # File Separator
        cleaned_content = cleaned_content.replace("\x0c", "") # Form Feed
        cleaned_content = cleaned_content.replace("\x0b", "") # Line Tabulation
        node.modified_lines = cleaned_content.splitlines(keepends=True)

        if not start_line:
            start_line = len(node.modified_lines) - 1 if node.parent else len(node.modified_lines)
            end_line = start_line
        if end_line == 0:
            end_line = start_line + 1
        if inline_refs:
            node.modified_lines[start_line:end_line] = [f"[{i}]: {link}\n" for i, link in inline_refs.items()]

    # process children
    for child in node.children:
        process_nodes(child)


def assemble_nodes(node):
    """
    Takes a node and assembles the text contents of itself and children nodes into a final string
    This allows us to modify each node individually and inject it into the parent.
    we process in reverse so that we don't introduce offsets
    @param node: node
    @return: list of strings
    """
    output = [] + node.modified_lines
    for child in reversed(node.children):
        child_output = assemble_nodes(child)
        is_same_line = child.line_start == child.line_end
        if is_same_line:
            if child.is_closing_shortcode:
                # single line shortcode closed e.g foo bar {{< shortcode >}}inside{{< /shortcode >}} baz durp
                # TODO: we are temporarily returning the whole line, we should do the else clause with some work
                # TODO: we need to add support for parsing single line closed shortcodes and then the else will work
                output[child.line_start:child.line_end + 1] = child_output
            else:
                # single line shortcode open e.g {{< img src="foo.mp4" >}}
                line: str = output[child.line_start]
                output[child.line_start] = line[:child.char_start] + "".join(child_output) + line[child.char_end:]
        else:
            # multi line shortcode
            output[child.line_start:child.line_end + 1] = child_output
    return output


def init_args():
    """
    Sets up argument parsing and returns the arguments
    :return: argparse values
    """
    parser = argparse.ArgumentParser(description='Format links in markdown file')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-f', '--file', action='store', default=None, dest='source', help='File to format link in reference')
    group.add_argument('-d', '--directory', action='store', default=None, dest='source', help='Directory to format link in reference for all markdown file')
    args = parser.parse_args()
    return args


def format_link_file(*args):
    """
    Kept for legacy usage in other scripts
    Takes a filepath and parses/processes and returns the string text
    @param args: filepath, (we don't care about other args passed from legacy scripts)
    @return: string of changed file
    """
    global current_file_processing
    if len(args) == 0:
        raise ValueError("Filepath is required argument")
    filepath = args[0]
    # set global for logger
    current_file_processing = filepath
    logger.info(f'Formating file')
    # parse the file shortcode hierarchy
    root = parse_file(filepath)
    # any node that is false still is a one liner
    adjust_one_liner_shortcodes(root)
    # process each node text contents, each node will store original and modified content
    process_nodes(root)
    # reassemble the file with the changes we have made
    contents_list = assemble_nodes(root)
    reassembled_file = ''.join(contents_list)

    if not root.lines:
        logger.warning(f'Parsing file returned empty content (Skipping Format)')
        return ''.join(root.lines)

    return reassembled_file


def main():
    """
    Entry point taking args and processing directory of files or file
    and responsible for writing the new contents back out to filesystem
    """
    options = init_args()
    if options.source:
        source_path = Path(options.source)
        files = [source_path] if source_path.is_file() else glob.iglob(str(source_path / '**/*.md'), recursive=True)
        if not list(files):
            logger.warning('No files found to process')
        for filepath in files:
            final_text = format_link_file(filepath)
            # overwrite the original file with our changes
            with open(filepath, 'w') as final_file:
                final_file.write(final_text)


if __name__ == '__main__':
    main()

