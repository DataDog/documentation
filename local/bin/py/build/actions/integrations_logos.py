#!/usr/bin/env python3

import glob
import os
from shutil import copyfile
from itertools import chain


def integrations_logos(content, integrations_logo_dir):

    for file_name in chain.from_iterable(glob.iglob(pattern, recursive=True) for pattern in content["globs"]):
        if not (file_name.endswith(("@2x.png", "_files")) or file_name.endswith(("_reversed.png", "_files"))):
            copyfile(file_name, integrations_logo_dir + os.path.basename(file_name))